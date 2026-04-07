const { app, BrowserWindow, ipcMain, dialog, shell } = require('electron');
const path = require('path');
const fs = require('fs');
const { registerDatabaseHandlers } = require('./database/ipc-handlers');
const { registerChaimaeHandlers } = require('./database/ipc-handlers-chaimae');
const { registerUsersHandlers } = require('./database/ipc-handlers-users');
const { registerMultiHandlers } = require('./database/ipc-handlers-multi');
const { registerSmartSHandlers } = require('./database/ipc-handlers-smarts');
const { registerMsh3Handlers } = require('./database/ipc-handlers-msh3');
const { registerBenAliHandlers } = require('./database/ipc-handlers-benali');
const { registerSAAISSHandlers } = require('./database/ipc-handlers-saaiss');
const { registerSKMHandlers } = require('./database/ipc-handlers-skm');
const { registerDynamicCompanyHandlers } = require('./database/ipc-handlers-dynamic');
const { initAutoUpdater, checkForUpdates, setLanguage } = require('./updater');
const { migrateAllToPostgres } = require('./database/migration-utils');

let mainWindow;

// Create desktop shortcut on first run
function createDesktopShortcut() {
  try {
    const desktopPath = path.join(app.getPath('home'), 'Desktop');
    const shortcutPath = path.join(desktopPath, 'Gestion des Factures.lnk');

    // Check if shortcut already exists
    if (fs.existsSync(shortcutPath)) {
      console.log('✅ Desktop shortcut already exists');
      return;
    }

    // Get the executable path
    const exePath = process.execPath;

    // Create shortcut using Windows API
    const { execSync } = require('child_process');
    const iconPath = path.join(__dirname, 'assets/icon.png');

    // PowerShell script to create shortcut
    const psScript = `
      $WshShell = New-Object -ComObject WScript.Shell
      $Shortcut = $WshShell.CreateShortcut("${shortcutPath}")
      $Shortcut.TargetPath = "${exePath}"
      $Shortcut.WorkingDirectory = "${path.dirname(exePath)}"
      $Shortcut.Description = "Gestion des Factures - Application de gestion des factures"
      $Shortcut.Save()
    `;

    // Execute PowerShell script
    execSync(`powershell -Command "${psScript.replace(/"/g, '\\"')}"`, {
      stdio: 'pipe',
      shell: true
    });

    console.log('✅ Desktop shortcut created successfully');
  } catch (error) {
    console.error('⚠️ Error creating desktop shortcut:', error.message);
    // Don't fail the app if shortcut creation fails
  }
}

function createWindow() {
  const packageJson = require('./package.json');
  const appVersion = packageJson.version;

  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    frame: false, // Remove default frame for custom title bar
    title: `Gestion des Factures - v${appVersion}`,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
    icon: path.join(__dirname, 'assets/icon.png'),
    backgroundColor: '#1e1e1e',
    show: false // Don't show until ready
  });

  // Load the index.html file
  mainWindow.loadFile('index.html');

  // Maximize window when ready
  mainWindow.once('ready-to-show', () => {
    mainWindow.maximize();
    mainWindow.show();
  });

  // Open DevTools only in development mode
  // Always open DevTools for testing updates
  // mainWindow.webContents.openDevTools(); // Disabled - DevTools will not open automatically

  // Auto reload on file changes (Hot Reload)
  if (process.argv.includes('--dev')) {
    const watchPaths = [
      path.join(__dirname, 'index.html'),
      path.join(__dirname, 'frontend')
    ];

    watchPaths.forEach(watchPath => {
      fs.watch(watchPath, { recursive: true }, (eventType, filename) => {
        if (filename) {
          // console.log(`File changed: ${filename}`);
          mainWindow.reload();
        }
      });
    });
  }

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

// Window control handlers
function setupIpcHandlers() {
  ipcMain.on('window-minimize', () => {
    if (mainWindow) mainWindow.minimize();
  });

  ipcMain.on('window-maximize', () => {
    if (mainWindow) {
      if (mainWindow.isMaximized()) {
        mainWindow.unmaximize();
      } else {
        mainWindow.maximize();
      }
    }
  });

  ipcMain.on('window-close', async () => {
    if (mainWindow) {
      // Check if we should clear authentication on close
      const shouldClear = await mainWindow.webContents.executeJavaScript(`
        (async () => {
          try {
            const result = await window.electron.users.count();
            return result.success && result.count > 1;
          } catch (e) {
            return false;
          }
        })()
      `);

      if (shouldClear) {
        // Clear authentication data if multiple users exist
        await mainWindow.webContents.executeJavaScript(`
          localStorage.removeItem('isAuthenticated');
          localStorage.removeItem('user');
          localStorage.removeItem('selectedCompany');
        `);
      }

      mainWindow.close();
    }
  });

  // Handle loading assets (images)
  ipcMain.handle('get-asset-path', (event, assetPath) => {
    try {
      // console.log('📂 Asset Request:', assetPath);

      // Remove any leading slash or backslash if present
      const cleanPath = assetPath.replace(/^[\\\/]/, '');

      // Build candidate absolute paths that could contain the asset
      const appPath = app.getAppPath();
      const resourcesPath = process.resourcesPath;

      const candidates = [
        path.join(appPath, cleanPath),                          // works in dev and sometimes in prod
        path.join(__dirname, cleanPath),                        // fallback to __dirname
        path.join(resourcesPath, 'app.asar', cleanPath),        // packaged inside app.asar
        path.join(resourcesPath, cleanPath)                     // assets copied via extraResources
      ];

      // console.log('🔎 Asset candidates:', candidates);

      for (const candidate of candidates) {
        try {
          if (fs.existsSync(candidate)) {
            // console.log('✅ Using asset path:', candidate);
            const fileData = fs.readFileSync(candidate);
            const ext = path.extname(candidate).toLowerCase();
            let mimeType = 'image/png';
            if (ext === '.jpg' || ext === '.jpeg') mimeType = 'image/jpeg';
            else if (ext === '.gif') mimeType = 'image/gif';
            else if (ext === '.svg') mimeType = 'image/svg+xml';

            const base64Data = fileData.toString('base64');
            return `data:${mimeType};base64,${base64Data}`;
          }
        } catch (innerErr) {
          console.error('⚠️ Error probing asset path:', candidate, innerErr);
        }
      }

      console.error('❌ Asset not found. Probed candidates:', candidates);
      return null;
    } catch (error) {
      console.error('❌ Error loading asset:', error);
      console.error('Error details:', error.message, error.stack);
      return null;
    }
  });
}

// PDF Files handlers
function setupPdfHandlers() {
  // Schema Import Handler
  ipcMain.handle('schema:import', async (event, filePath) => {
    try {
      console.log('📥 Importing schema from:', filePath);

      const formData = new FormData();
      const fileBuffer = fs.readFileSync(filePath);
      const blob = new Blob([fileBuffer], { type: 'application/sql' });
      formData.append('schema', blob, path.basename(filePath));

      // Import fetch for Node environment (Electron main process)
      const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

      const response = await fetch('http://localhost:3000/api/schema/import', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('❌ Error handling schema import:', error);
      return { success: false, error: 'Failed to import schema: ' + error.message };
    }
  });

  // Save PDF file
  ipcMain.handle('pdf:savePdf', async (event, pdfData, company, devisNumber, createdBy) => {
    try {
      // Create PDF directory structure
      const pdfDir = path.join(app.getPath('userData'), 'pdfs', company);

      if (!fs.existsSync(pdfDir)) {
        fs.mkdirSync(pdfDir, { recursive: true });
      }

      // Create filename with devis number and timestamp
      // Replace / with - in devis number to avoid path issues
      const sanitizedDevisNumber = devisNumber.replace(/\//g, '-');
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0];
      // Include the creator company in the filename (e.g., MRY or MULTI)
      const creatorPrefix = createdBy ? `[${createdBy}]` : '';
      const filename = `${creatorPrefix}_${sanitizedDevisNumber}_${timestamp}.pdf`;
      const filePath = path.join(pdfDir, filename);

      // Save PDF file
      fs.writeFileSync(filePath, pdfData);

      return { success: true, filePath };
    } catch (error) {
      return { success: false, error: error.message };
    }
  });

  // Get all PDF files for a company, filtered by creator
  ipcMain.handle('pdf:getPdfFiles', async (event, company, createdBy) => {
    try {
      let pdfFiles = [];

      // 1. Load local files if they exist
      const pdfDir = path.join(app.getPath('userData'), 'pdfs', company);
      if (fs.existsSync(pdfDir)) {
        const files = fs.readdirSync(pdfDir);
        pdfFiles = files.filter(f => f.endsWith('.pdf')).map(f => {
          const creatorMatch = f.match(/^\[([^\]]+)\]/);
          const creator = creatorMatch ? creatorMatch[1] : 'Unknown';
          return {
            name: f,
            path: path.join(pdfDir, f),
            size: fs.statSync(path.join(pdfDir, f)).size,
            created: fs.statSync(path.join(pdfDir, f)).birthtime,
            creator: creator,
            source: 'local'
          };
        });
      }

      // 2. Map folder key to DB company code
      const companyCodeMap = {
        'skm': 'SKM',
        'chaimae_skm': 'SKM',
        'smarts': 'SMARTS',
        'chaimae_smarts': 'SMARTS',
        'saaiss': 'SAAISS',
        'chaimae_saaiss': 'SAAISS',
        'msh3': 'MSH3',
        'chaimae_msh3': 'MSH3',
        'benali': 'BENALI',
        'chaimae_benali': 'BENALI'
      };

      // Also try the company key itself (uppercase) for dynamic companies
      const dbCompanyCode = companyCodeMap[company] || company.toUpperCase();

      // 3. Load PDF records from PostgreSQL
      try {
        const apiClient = require('./database/api-client');
        const dbResult = await apiClient.getAllPdfPaths(dbCompanyCode);

        if (dbResult.success && dbResult.data && dbResult.data.length > 0) {
          // Build a set of local file paths for dedup
          const localPaths = new Set(pdfFiles.map(f => f.path.replace(/\\/g, '/').toLowerCase()));

          dbResult.data.forEach(item => {
            // Enrich existing local files with DB metadata
            const normalizedDbPath = (item.file_path || '').replace(/\\/g, '/').toLowerCase();
            const localMatch = pdfFiles.find(f => f.path.replace(/\\/g, '/').toLowerCase() === normalizedDbPath);

            if (localMatch) {
              localMatch.creator = item.created_by || localMatch.creator;
              localMatch.dbRecord = true;
            } else {
              // This file exists in DB but not locally (server-hosted)
              const fileName = item.file_path ? item.file_path.split('/').pop() : `${item.devis_number}_${item.year}.pdf`;
              pdfFiles.push({
                name: fileName,
                path: item.file_path || '',
                size: 0,
                created: item.created_at || new Date().toISOString(),
                creator: item.created_by || 'Unknown',
                source: 'server',
                dbRecord: true,
                serverPath: item.file_path
              });
            }
          });
        }
      } catch (dbErr) {
        console.error('⚠️ Failed to fetch PDF metadata from DB for', dbCompanyCode, ':', dbErr.message);
      }

      // Filter by creator if specified
      if (createdBy) {
        pdfFiles = pdfFiles.filter(f => f.creator === createdBy);
      }

      return { success: true, files: pdfFiles };
    } catch (error) {
      return { success: false, error: error.message };
    }
  });

  console.log('✅ PDF handlers registered successfully');

  // Open PDF file
  ipcMain.handle('pdf:openPdf', async (event, filePath) => {
    try {
      await shell.openPath(filePath);
      return { success: true };
    } catch (error) {
      console.error('❌ Error opening PDF:', error);
      return { success: false, error: error.message };
    }
  });

  // Delete PDF file
  ipcMain.handle('pdf:deletePdf', async (event, filePath) => {
    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log('✅ PDF deleted:', filePath);
      }
      return { success: true };
    } catch (error) {
      console.error('❌ Error deleting PDF:', error);
      return { success: false, error: error.message };
    }
  });

  // Attachment Storage Handlers
  ipcMain.handle('attachment:save', async (event, { company, filename, data }) => {
    try {
      const attachmentsDir = path.join(app.getPath('userData'), 'attachments', company.toLowerCase(), 'Pièces jointes');
      if (!fs.existsSync(attachmentsDir)) {
        fs.mkdirSync(attachmentsDir, { recursive: true });
      }

      const uniqueName = `${Date.now()}_${filename}`;
      const filePath = path.join(attachmentsDir, uniqueName);

      // data is a Buffer or Uint8Array
      fs.writeFileSync(filePath, Buffer.from(data));

      return { success: true, filePath, filename: uniqueName };
    } catch (error) {
      console.error('❌ Error saving attachment:', error);
      return { success: false, error: error.message };
    }
  });

  // Upload attachment file to server (multipart), returns { success, file_url }
  ipcMain.handle('attachment:uploadToServer', async (event, { company, filename, data, mimeType }) => {
    try {
      const apiClient = require('./database/api-client');
      const buffer = Buffer.from(data);
      const result = await apiClient.uploadAttachmentFile(company, buffer, filename, mimeType);
      return result;
    } catch (error) {
      console.error('❌ Error uploading attachment to server:', error);
      return { success: false, error: error.message };
    }
  });

  // Migrate local attachments (file_path on disk OR file_data BLOB) to server
  ipcMain.handle('attachment:migrateToServer', async (event, { company }) => {
    try {
      const apiClient = require('./database/api-client');
      const axios = require('axios');
      const API_URL = apiClient.getBaseUrl();

      // Fetch all attachments needing migration (no file_url yet) from server DB
      const dbRes = await axios.get(`${API_URL}/attachments/needs-migration/${company.toUpperCase()}`, {
        httpsAgent: new (require('https')).Agent({ rejectUnauthorized: false })
      });
      if (!dbRes.data.success) return { success: false, error: 'Could not fetch attachments list' };

      const attachments = dbRes.data.data;
      let migrated = 0;
      const errors = [];

      for (const att of attachments) {
        try {
          let fileBuffer = null;
          const mimeType = att.file_type || 'application/octet-stream';

          if (att.file_path && fs.existsSync(att.file_path)) {
            // Local file on disk
            fileBuffer = fs.readFileSync(att.file_path);
          } else if (att.file_data) {
            // BLOB stored as base64 from server
            fileBuffer = Buffer.from(att.file_data, 'base64');
          }

          if (!fileBuffer) {
            errors.push({ id: att.id, error: 'No file data or path found' });
            continue;
          }

          // Upload file to server (pass att.id so server updates file_url in DB)
          const uploadResult = await apiClient.uploadAttachmentFile(
            company.toUpperCase(),
            fileBuffer,
            att.filename,
            mimeType,
            att.id
          );

          if (uploadResult.success) {
            migrated++;
          } else {
            errors.push({ id: att.id, error: uploadResult.error || 'Upload failed' });
          }
        } catch (e) {
          errors.push({ id: att.id, error: e.message });
        }
      }
      return { success: true, migrated, errors };
    } catch (error) {
      console.error('❌ Error migrating attachments to server:', error);
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle('attachment:open', async (event, filePath) => {
    try {
      if (fs.existsSync(filePath)) {
        await shell.openPath(filePath);
        return { success: true };
      }
      return { success: false, error: 'File not found' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  });

  // Open attachment URL in default browser
  ipcMain.handle('attachment:openUrl', async (event, url) => {
    try {
      await shell.openExternal(url);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle('attachment:delete', async (event, filePath) => {
    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        return { success: true };
      }
      return { success: true }; // Already gone
    } catch (error) {
      return { success: false, error: error.message };
    }
  });

  // Global Migration Handler
  ipcMain.handle('attachment:migrate', async (event, company) => {
    try {
      console.log(`🚀 Starting migration for company: ${company}`);
      const companyKey = company.toLowerCase();

      // Dynamically get the appropriate database module
      let dbModule;
      switch (companyKey) {
        case 'multi': dbModule = require('./database/db_multi'); break;
        case 'chaimae': dbModule = require('./database/db_chaimae'); break;
        case 'mry': dbModule = require('./database/db'); break;
        default: throw new Error(`Unknown company: ${company}`);
      }

      const db = dbModule.getDatabase();
      if (!db) throw new Error('Database not initialized');

      // Ensure file_path column exists
      try {
        db.run("ALTER TABLE attachments ADD COLUMN file_path TEXT");
      } catch (e) {
        // Column might already exist
      }

      // First, let's see ALL attachments for debugging
      const allAttachments = db.exec("SELECT id, filename, file_path, CASE WHEN file_data IS NOT NULL THEN 'HAS_DATA' ELSE 'NO_DATA' END as has_data FROM attachments");
      console.log('📊 [MIGRATION] All attachments in database:');
      if (allAttachments.length > 0 && allAttachments[0].values.length > 0) {
        allAttachments[0].values.forEach(row => {
          console.log(`   ID: ${row[0]}, File: ${row[1]}, Path: ${row[2] || 'NULL'}, Data: ${row[3]}`);
        });
      } else {
        console.log('   No attachments found in database at all!');
      }

      // Fetch all attachments with BLOB data that haven't been migrated yet
      const results = db.exec("SELECT id, filename, file_data FROM attachments WHERE file_data IS NOT NULL AND (file_path IS NULL OR file_path = '')");
      console.log(`📊 [MIGRATION] Attachments needing migration: ${results.length > 0 ? results[0].values.length : 0}`);

      if (results.length === 0 || results[0].values.length === 0) {
        return { success: true, migrated: 0, message: 'No attachments to migrate (all already migrated or no data)' };
      }

      const attachmentsDir = path.join(app.getPath('userData'), 'attachments', companyKey, 'Pièces jointes');
      if (!fs.existsSync(attachmentsDir)) fs.mkdirSync(attachmentsDir, { recursive: true });

      let count = 0;
      for (const row of results[0].values) {
        const [id, originalName, blobData] = row;
        const uniqueName = `${id}_${originalName.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
        const filePath = path.join(attachmentsDir, uniqueName);

        // Save file
        fs.writeFileSync(filePath, Buffer.from(blobData));

        // Update DB: clear BLOB, set path
        db.run("UPDATE attachments SET file_data = NULL, file_path = ? WHERE id = ?", [filePath, id]);
        count++;
      }

      // Vacuum to reclaim space
      db.run("VACUUM");

      // Save the database file
      // In these modules, saveDatabase is usually exported or called internally. 
      // Checking db_multi/db/db_chaimae, they have a saveDatabase function.
      if (typeof dbModule.saveDatabase === 'function') {
        dbModule.saveDatabase();
      }

      return { success: true, migrated: count };
    } catch (error) {
      console.error('❌ Migration failed:', error);
      return { success: false, error: error.message };
    }
  });
}

// Company PDF Text handlers (Header/Footer editor)
function setupPdfTextHandlers() {
  ipcMain.handle('pdfText:get', async (event, companyCode) => {
    try {
      const apiClient = require('./database/api-client');
      const result = await apiClient.getCompanyPdfText(companyCode);
      return result;
    } catch (error) {
      console.error('❌ Error getting company PDF text:', error.message);
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle('pdfText:save', async (event, companyCode, data) => {
    try {
      const apiClient = require('./database/api-client');
      const result = await apiClient.saveCompanyPdfText(companyCode, data);
      return result;
    } catch (error) {
      console.error('❌ Error saving company PDF text:', error.message);
      return { success: false, error: error.message };
    }
  });
}

// PDF Export/Import handlers
function setupPdfExportImportHandlers() {
  // Export all PDFs for a company as ZIP
  ipcMain.handle('pdf:exportAll', async (event, company, userCompany) => {
    try {
      const companyName = company.toLowerCase();
      const userCompanyName = userCompany ? userCompany.toUpperCase() : '';
      const dateStr = new Date().toISOString().split('T')[0];

      // Build filename: if userCompany is different, include it
      let filename = `${companyName}_PDFs_${dateStr}.zip`;
      if (userCompanyName && userCompanyName !== company.toUpperCase()) {
        filename = `${userCompanyName}_${companyName.toUpperCase()}_PDFs_${dateStr}.zip`;
      }

      const result = await dialog.showSaveDialog(mainWindow, {
        title: `Exporter tous les PDFs ${company}`,
        defaultPath: filename,
        filters: [
          { name: 'ZIP Files', extensions: ['zip'] },
          { name: 'All Files', extensions: ['*'] }
        ]
      });

      if (result.canceled || !result.filePath) {
        return { success: false, canceled: true };
      }

      const pdfDir = path.join(app.getPath('userData'), 'pdfs', company);

      if (!fs.existsSync(pdfDir)) {
        return { success: false, error: 'Aucun dossier PDF trouvé pour cette entreprise' };
      }

      // Use archiver to create ZIP
      const archiver = require('archiver');
      const output = fs.createWriteStream(result.filePath);
      const archive = archiver('zip', { zlib: { level: 9 } });

      return new Promise((resolve, reject) => {
        output.on('close', () => {
          console.log(`✅ PDFs exported to: ${result.filePath}`);
          resolve({ success: true, path: result.filePath, size: archive.pointer() });
        });

        archive.on('error', (err) => {
          console.error('❌ Archive error:', err);
          reject(err);
        });

        archive.pipe(output);
        archive.directory(pdfDir, company);
        archive.finalize();
      }).catch(error => {
        return { success: false, error: error.message };
      });
    } catch (error) {
      console.error('Export error:', error);
      return { success: false, error: error.message };
    }
  });

  // Import PDFs from ZIP
  ipcMain.handle('pdf:importAll', async (event, company) => {
    try {
      const result = await dialog.showOpenDialog(mainWindow, {
        title: `Importer les PDFs ${company}`,
        filters: [
          { name: 'ZIP Files', extensions: ['zip'] },
          { name: 'All Files', extensions: ['*'] }
        ],
        properties: ['openFile']
      });

      if (result.canceled || result.filePaths.length === 0) {
        return { success: false, canceled: true };
      }

      const zipPath = result.filePaths[0];
      const pdfDir = path.join(app.getPath('userData'), 'pdfs', company);

      // Create backup of existing PDFs
      const backupDir = path.join(app.getPath('userData'), 'pdfs', `${company}_backup_${Date.now()}`);
      if (fs.existsSync(pdfDir)) {
        fs.mkdirSync(backupDir, { recursive: true });
        const files = fs.readdirSync(pdfDir);
        files.forEach(file => {
          fs.copyFileSync(path.join(pdfDir, file), path.join(backupDir, file));
        });
      }

      // Extract ZIP
      const extract = require('extract-zip');

      return new Promise((resolve, reject) => {
        extract(zipPath, { dir: path.join(app.getPath('userData'), 'pdfs') })
          .then(() => {
            console.log(`✅ PDFs imported from: ${zipPath}`);
            resolve({ success: true, message: 'PDFs importés avec succès', backupPath: backupDir });
          })
          .catch(err => {
            console.error('❌ Extract error:', err);
            reject(err);
          });
      }).catch(error => {
        return { success: false, error: error.message };
      });
    } catch (error) {
      console.error('Import error:', error);
      return { success: false, error: error.message };
    }
  });

  console.log('✅ PDF Export/Import handlers registered');
}

// Excel Export handler
function setupExcelExportHandler() {
  const { exportInvoicesToExcel } = require('./database/excel-export');

  ipcMain.handle('excel:exportInvoices', async (event, invoices, companyCode) => {
    try {
      const companyName = companyCode.toUpperCase();
      const dateStr = new Date().toISOString().split('T')[0];
      const filename = `${companyName}_Factures_${dateStr}.xlsx`;

      const result = await dialog.showSaveDialog(mainWindow, {
        title: `Exporter les factures ${companyName} en Excel`,
        defaultPath: filename,
        filters: [
          { name: 'Excel Files', extensions: ['xlsx'] },
          { name: 'All Files', extensions: ['*'] }
        ]
      });

      if (result.canceled || !result.filePath) {
        return { success: false, canceled: true };
      }

      const exportResult = await exportInvoicesToExcel(result.filePath, invoices, companyCode);
      if (exportResult.success) {
        console.log(`✅ Excel exported: ${result.filePath} (${exportResult.count} factures)`);
        return { success: true, path: result.filePath, count: exportResult.count };
      } else {
        return { success: false, error: exportResult.error };
      }
    } catch (error) {
      console.error('❌ Excel export error:', error);
      // Check if file is locked/busy (open in Excel)
      if (error.code === 'EBUSY' || error.message.includes('EBUSY')) {
        return { 
          success: false, 
          error: 'Le fichier est déjà ouvert dans Excel ou un autre programme. Veuillez le fermer et réessayer.' 
        };
      }
      return { success: false, error: error.message };
    }
  });

  console.log('✅ Excel Export handler registered');
}

// Backup & Restore handlers for MRY
function setupBackupHandlers() {
  ipcMain.handle('db:backup:export', async () => {
    return exportDatabaseWithAttachments('mry', path.join(app.getPath('userData'), 'invoices.db'), `MRY_Backup_${new Date().toISOString().split('T')[0]}.db`);
  });

  ipcMain.handle('db:backup:import', async () => {
    return importDatabaseWithAttachments('mry', 'invoices.db');
  });

  ipcMain.handle('db:migrate:postgres', async (event, pgConfig) => {
    try {
      const appDataPath = app.getPath('userData');
      const results = await migrateAllToPostgres(pgConfig, appDataPath);
      return { success: true, results };
    } catch (error) {
      console.error('Migration error:', error);
      return { success: false, error: error.message };
    }
  });



  // Helper function for ZIP Export
  async function exportDatabaseWithAttachments(companyKey, dbPath, defaultFilename) {
    try {
      const { response, checkboxChecked } = await dialog.showMessageBox(mainWindow, {
        type: 'question',
        buttons: ['Exporter avec Pièces Jointes (ZIP)', 'Exporter Base seule (.db)', 'Annuler'],
        defaultId: 0,
        title: 'Options d\'exportation',
        message: 'Voulez-vous inclure les pièces jointes ?',
        detail: 'L\'exportation avec pièces jointes créera un fichier ZIP contenant la base de données et tous les fichiers associés.',
        cancelId: 2
      });

      if (response === 2) return { success: false, canceled: true };

      const includeAttachments = response === 0;
      const extension = includeAttachments ? 'zip' : 'db';
      const finalFilename = defaultFilename.replace('.db', `.${extension}`);

      const result = await dialog.showSaveDialog(mainWindow, {
        title: `Exporter la base de données ${companyKey.toUpperCase()}`,
        defaultPath: finalFilename,
        filters: [
          { name: includeAttachments ? 'ZIP Archive' : 'Database Files', extensions: [extension] },
          { name: 'All Files', extensions: ['*'] }
        ]
      });

      if (result.canceled || !result.filePath) return { success: false, canceled: true };

      if (!fs.existsSync(dbPath)) return { success: false, error: 'Base de données introuvable' };

      if (includeAttachments) {
        // Export as ZIP
        const archiver = require('archiver');
        const output = fs.createWriteStream(result.filePath);
        const archive = archiver('zip', { zlib: { level: 9 } });

        return new Promise((resolve, reject) => {
          output.on('close', () => {
            console.log(`✅ Export successful: ${result.filePath}`);
            resolve({ success: true, path: result.filePath });
          });

          archive.on('error', (err) => reject(err));

          archive.pipe(output);

          // Add DB file
          archive.file(dbPath, { name: path.basename(dbPath) });

          // Add attachments folder
          const attachmentsDir = path.join(app.getPath('userData'), 'attachments', companyKey.toLowerCase());
          if (fs.existsSync(attachmentsDir)) {
            archive.directory(attachmentsDir, 'attachments');
          }

          archive.finalize();
        });
      } else {
        // simple copy
        fs.copyFileSync(dbPath, result.filePath);
        return { success: true, path: result.filePath };
      }
    } catch (error) {
      console.error('Export error:', error);
      return { success: false, error: error.message };
    }
  }

  // Helper function for ZIP Import
  async function importDatabaseWithAttachments(companyKey, dbFilename) {
    try {
      const result = await dialog.showOpenDialog(mainWindow, {
        title: `Importer la base de données ${companyKey.toUpperCase()}`,
        filters: [
          { name: 'Supported Files', extensions: ['db', 'zip'] },
          { name: 'Database Files', extensions: ['db'] },
          { name: 'ZIP Archives', extensions: ['zip'] },
          { name: 'All Files', extensions: ['*'] }
        ],
        properties: ['openFile']
      });

      if (result.canceled || result.filePaths.length === 0) return { success: false, canceled: true };

      const sourcePath = result.filePaths[0];
      const isZip = sourcePath.toLowerCase().endsWith('.zip');
      const targetDbPath = path.join(app.getPath('userData'), dbFilename);

      // Backup logic
      const backupDir = path.join(app.getPath('userData'), 'backups');
      if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir);
      const timestamp = Date.now();

      // Backup existing DB
      if (fs.existsSync(targetDbPath)) {
        fs.copyFileSync(targetDbPath, path.join(backupDir, `${dbFilename}.backup.${timestamp}`));
      }

      if (isZip) {
        // Extract ZIP
        const extract = require('extract-zip');
        const tempDir = path.join(app.getPath('userData'), 'temp_restore', timestamp.toString());

        await extract(sourcePath, { dir: tempDir });

        // 1. Restore DB
        // Look for .db file in the root of extracted folder
        const files = fs.readdirSync(tempDir);
        const dbFile = files.find(f => f.endsWith('.db')); // Assuming only one DB file or simple structure

        if (dbFile) {
          fs.copyFileSync(path.join(tempDir, dbFile), targetDbPath);
        } else {
          // Fallback: check if the expected db filename exists
          if (fs.existsSync(path.join(tempDir, dbFilename))) {
            fs.copyFileSync(path.join(tempDir, dbFilename), targetDbPath);
          }
        }

        // 2. Restore Attachments
        const extractedAttachmentsDir = path.join(tempDir, 'attachments');
        if (fs.existsSync(extractedAttachmentsDir)) {
          const targetAttachmentsDir = path.join(app.getPath('userData'), 'attachments', companyKey.toLowerCase());
          if (!fs.existsSync(targetAttachmentsDir)) fs.mkdirSync(targetAttachmentsDir, { recursive: true });

          // Copy recursively equivalent
          const { cpSync } = require('fs'); // Node 16.7+
          if (cpSync) {
            cpSync(extractedAttachmentsDir, targetAttachmentsDir, { recursive: true, force: true });
          } else {
            // Fallback for older nodes if needed, but electron usually has modern node
            // For now, let's assume simple implementation or use ncp/fs-extra if available.
            // Given the context, we'll try basic approach or rely on fs.cpSync if available in this electron version.
            // If not, we iterate.
            // Actually, let's just move the new folder to replace/merge.
            // Safe merge:
            const ncp = (reqSrc, reqDest) => {
              if (!fs.existsSync(reqDest)) fs.mkdirSync(reqDest, { recursive: true });
              const entries = fs.readdirSync(reqSrc, { withFileTypes: true });
              for (let entry of entries) {
                const srcPath = path.join(reqSrc, entry.name);
                const destPath = path.join(reqDest, entry.name);
                if (entry.isDirectory()) {
                  ncp(srcPath, destPath);
                } else {
                  fs.copyFileSync(srcPath, destPath);
                }
              }
            };
            ncp(extractedAttachmentsDir, targetAttachmentsDir);
          }
        }

        // Cleanup temp
        fs.rmSync(tempDir, { recursive: true, force: true });

      } else {
        // Simple DB copy
        fs.copyFileSync(sourcePath, targetDbPath);
      }

      app.relaunch();
      app.exit(0);
      return { success: true, needsReload: true };

    } catch (error) {
      console.error('Import error:', error);
      return { success: false, error: error.message };
    }
  }

  // Backup & Restore handlers for CHAIMAE
  ipcMain.handle('db:chaimae:backup:export', async () => {
    return exportDatabaseWithAttachments('chaimae', path.join(app.getPath('userData'), 'invoices_chaimae.db'), `CHAIMAE_Backup_${new Date().toISOString().split('T')[0]}.db`);
  });

  ipcMain.handle('db:chaimae:backup:import', async () => {
    return importDatabaseWithAttachments('chaimae', 'invoices_chaimae.db');
  });

  // Backup & Restore handlers for MULTI
  ipcMain.handle('db:multi:backup:export', async () => {
    return exportDatabaseWithAttachments('multi', path.join(app.getPath('userData'), 'multi.db'), `MULTI_Backup_${new Date().toISOString().split('T')[0]}.db`);
  });

  ipcMain.handle('db:multi:backup:import', async () => {
    return importDatabaseWithAttachments('multi', 'multi.db');
  });
}

// This method will be called when Electron has finished initialization
app.whenReady().then(async () => {
  // Create desktop shortcut on first run
  createDesktopShortcut();

  // Register database handlers for all companies (async)
  await registerDatabaseHandlers(); // MRY database
  await registerChaimaeHandlers(); // CHAIMAE database
  await registerMultiHandlers(); // MULTI database
  await registerUsersHandlers(); // Users database
  await registerSmartSHandlers(); // SMART SERVICES database
  await registerMsh3Handlers(); // MSH3 SERVICES database
  await registerBenAliHandlers(); // BEN ALI database
  await registerSAAISSHandlers(); // SAAISS database
  await registerSKMHandlers(); // SKM database
  await registerDynamicCompanyHandlers(); // Dynamic handlers for any new PDF company

  // Setup IPC handlers after window is ready
  createWindow();

  // Setup handlers after window is created
  setupIpcHandlers();
  setupPdfHandlers();
  setupPdfExportImportHandlers();
  setupPdfTextHandlers();
  setupExcelExportHandler();
  setupBackupHandlers();

  // Initialize auto-updater (only in production)
  // Temporarily enabled for testing
  initAutoUpdater();
  // if (!process.argv.includes('--dev')) {
  //   initAutoUpdater();
  // }

  app.on('activate', function () {
    // On macOS it's common to re-create a window when the dock icon is clicked
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed
app.on('window-all-closed', function () {
  // On macOS it's common for applications to stay open until the user quits explicitly
  if (process.platform !== 'darwin') app.quit();
});

// Auto-updater IPC handlers
ipcMain.handle('check-for-updates', async () => {
  checkForUpdates();
});

ipcMain.handle('set-update-language', async (event, language) => {
  setLanguage(language);
});

ipcMain.handle('download-update', async () => {
  const { autoUpdater } = require('electron-updater');
  autoUpdater.downloadUpdate();
});

ipcMain.handle('install-update', async () => {
  const { autoUpdater } = require('electron-updater');
  autoUpdater.quitAndInstall();
});

ipcMain.handle('get-app-version', async () => {
  const packageJson = require('./package.json');
  return packageJson.version;
});
