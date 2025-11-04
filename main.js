const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');
const { registerDatabaseHandlers } = require('./database/ipc-handlers');
const { registerChaimaeHandlers } = require('./database/ipc-handlers-chaimae');
const { registerUsersHandlers } = require('./database/ipc-handlers-users');
const { registerMultiHandlers } = require('./database/ipc-handlers-multi');
const { initAutoUpdater, checkForUpdates, setLanguage } = require('./updater');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    frame: false, // Remove default frame for custom title bar
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
  mainWindow.webContents.openDevTools();

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

  ipcMain.on('window-close', () => {
    if (mainWindow) mainWindow.close();
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

// Backup & Restore handlers for MRY
function setupBackupHandlers() {
  ipcMain.handle('db:backup:export', async () => {
    try {
      const result = await dialog.showSaveDialog(mainWindow, {
        title: 'Exporter la base de données MRY',
        defaultPath: `MRY_Backup_${new Date().toISOString().split('T')[0]}.db`,
        filters: [
          { name: 'Database Files', extensions: ['db'] },
          { name: 'All Files', extensions: ['*'] }
        ]
      });
      
      if (!result.canceled && result.filePath) {
        // Use app.getPath('userData') for database location
        const dbPath = path.join(app.getPath('userData'), 'invoices.db');
        
        // Check if database exists
        if (!fs.existsSync(dbPath)) {
          return { success: false, error: 'Base de données introuvable' };
        }
        
        fs.copyFileSync(dbPath, result.filePath);
        return { success: true, path: result.filePath };
      }
      
      return { success: false, canceled: true };
    } catch (error) {
      console.error('Export error:', error);
      return { success: false, error: error.message };
    }
  });
  
  ipcMain.handle('db:backup:import', async () => {
    try {
      const result = await dialog.showOpenDialog(mainWindow, {
        title: 'Importer la base de données MRY',
        filters: [
          { name: 'Database Files', extensions: ['db'] },
          { name: 'All Files', extensions: ['*'] }
        ],
        properties: ['openFile']
      });
      
      if (!result.canceled && result.filePaths.length > 0) {
        // Use app.getPath('userData') for database location
        const dbPath = path.join(app.getPath('userData'), 'invoices.db');
        const backupPath = path.join(app.getPath('userData'), `invoices_backup_${Date.now()}.db`);
        
        // Create backup of current database
        if (fs.existsSync(dbPath)) {
          fs.copyFileSync(dbPath, backupPath);
        }
        
        // Copy imported file to database location
        fs.copyFileSync(result.filePaths[0], dbPath);
        
        // Reload the app to apply the new database
        app.relaunch();
        app.exit(0);
        
        return { success: true, path: result.filePaths[0], needsReload: true };
      }
      
      return { success: false, canceled: true };
    } catch (error) {
      console.error('Import error:', error);
      return { success: false, error: error.message };
    }
  });
  
  // Backup & Restore handlers for CHAIMAE
  ipcMain.handle('db:chaimae:backup:export', async () => {
    try {
      const result = await dialog.showSaveDialog(mainWindow, {
        title: 'Exporter la base de données CHAIMAE',
        defaultPath: `CHAIMAE_Backup_${new Date().toISOString().split('T')[0]}.db`,
        filters: [
          { name: 'Database Files', extensions: ['db'] },
          { name: 'All Files', extensions: ['*'] }
        ]
      });
      
      if (!result.canceled && result.filePath) {
        // Use app.getPath('userData') for database location
        const dbPath = path.join(app.getPath('userData'), 'invoices_chaimae.db');
        
        // Check if database exists
        if (!fs.existsSync(dbPath)) {
          return { success: false, error: 'Base de données introuvable' };
        }
        
        fs.copyFileSync(dbPath, result.filePath);
        return { success: true, path: result.filePath };
      }
      
      return { success: false, canceled: true };
    } catch (error) {
      console.error('Export error:', error);
      return { success: false, error: error.message };
    }
  });
  
  ipcMain.handle('db:chaimae:backup:import', async () => {
    try {
      const result = await dialog.showOpenDialog(mainWindow, {
        title: 'Importer la base de données CHAIMAE',
        filters: [
          { name: 'Database Files', extensions: ['db'] },
          { name: 'All Files', extensions: ['*'] }
        ],
        properties: ['openFile']
      });
      
      if (!result.canceled && result.filePaths.length > 0) {
        // Use app.getPath('userData') for database location
        const dbPath = path.join(app.getPath('userData'), 'invoices_chaimae.db');
        const backupPath = path.join(app.getPath('userData'), `invoices_chaimae_backup_${Date.now()}.db`);
        
        // Create backup of current database
        if (fs.existsSync(dbPath)) {
          fs.copyFileSync(dbPath, backupPath);
        }
        
        // Copy imported file to database location
        fs.copyFileSync(result.filePaths[0], dbPath);
        
        // Reload the app to apply the new database
        app.relaunch();
        app.exit(0);
        
        return { success: true, path: result.filePaths[0], needsReload: true };
      }
      
      return { success: false, canceled: true };
    } catch (error) {
      console.error('Import error:', error);
      return { success: false, error: error.message };
    }
  });
  
  // Backup & Restore handlers for MULTI
  ipcMain.handle('db:multi:backup:export', async () => {
    try {
      const result = await dialog.showSaveDialog(mainWindow, {
        title: 'Exporter la base de données MULTI',
        defaultPath: `MULTI_Backup_${new Date().toISOString().split('T')[0]}.db`,
        filters: [
          { name: 'Database Files', extensions: ['db'] },
          { name: 'All Files', extensions: ['*'] }
        ]
      });
      
      if (!result.canceled && result.filePath) {
        // Use app.getPath('userData') for database location
        const dbPath = path.join(app.getPath('userData'), 'multi.db');
        
        // Check if database exists
        if (!fs.existsSync(dbPath)) {
          return { success: false, error: 'Base de données introuvable' };
        }
        
        fs.copyFileSync(dbPath, result.filePath);
        return { success: true, path: result.filePath };
      }
      
      return { success: false, canceled: true };
    } catch (error) {
      console.error('Export error:', error);
      return { success: false, error: error.message };
    }
  });
  
  ipcMain.handle('db:multi:backup:import', async () => {
    try {
      const result = await dialog.showOpenDialog(mainWindow, {
        title: 'Importer la base de données MULTI',
        filters: [
          { name: 'Database Files', extensions: ['db'] },
          { name: 'All Files', extensions: ['*'] }
        ],
        properties: ['openFile']
      });
      
      if (!result.canceled && result.filePaths.length > 0) {
        // Use app.getPath('userData') for database location
        const dbPath = path.join(app.getPath('userData'), 'multi.db');
        const backupPath = path.join(app.getPath('userData'), `multi_backup_${Date.now()}.db`);
        
        // Create backup of current database
        if (fs.existsSync(dbPath)) {
          fs.copyFileSync(dbPath, backupPath);
        }
        
        // Copy imported file to database location
        fs.copyFileSync(result.filePaths[0], dbPath);
        
        // Reload the app to apply the new database
        app.relaunch();
        app.exit(0);
        
        return { success: true, path: result.filePaths[0], needsReload: true };
      }
      
      return { success: false, canceled: true };
    } catch (error) {
      console.error('Import error:', error);
      return { success: false, error: error.message };
    }
  });
}

// This method will be called when Electron has finished initialization
app.whenReady().then(async () => {
  // Register database handlers for all companies (async)
  await registerDatabaseHandlers(); // MRY database
  await registerChaimaeHandlers(); // CHAIMAE database
  await registerMultiHandlers(); // MULTI database
  await registerUsersHandlers(); // Users database
  
  // Setup IPC handlers after window is ready
  createWindow();
  
  // Setup handlers after window is created
  setupIpcHandlers();
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
