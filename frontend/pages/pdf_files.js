// Unified PDF Files Page - View all PDFs from all companies with filter

function PDFFilesPage() {
    return `
        <div class="dashboard-container">
            <aside class="sidebar">
                <div class="sidebar-header">
                    <div class="logo">⚡</div>
                    <h2>Gestion Factures</h2>
                </div>
                <nav class="sidebar-nav">
                    <a href="#" data-route="/company-select" class="nav-item">
                        <span class="icon">🏠</span>
                        <span>Accueil</span>
                    </a>
                    <a href="#" data-route="/pdf-settings" class="nav-item">
                        <span class="icon">⚙️</span>
                        <span>PDF Settings</span>
                    </a>
                    <a href="#" data-route="/pdf-files" class="nav-item active">
                        <span class="icon">📁</span>
                        <span>Fichiers PDF</span>
                    </a>
                </nav>
                <div class="sidebar-footer">
                    <button onclick="router.navigate('/company-select')" class="btn btn-logout">
                        <span class="icon">↩️</span>
                        <span>Retour</span>
                    </button>
                </div>
            </aside>

            <main class="main-content">
                <header class="top-bar" style="display: flex; justify-content: space-between; align-items: center;">
                    <h2>📁 Fichiers PDF - Toutes les Sociétés</h2>
                    <div style="display: flex; align-items: center; gap: 1rem;">
                        <label style="color: #aaa; font-size: 0.9rem;">Filtrer par société:</label>
                        <select id="pdfFilesCompanyFilter" onchange="filterPdfFilesByCompany()" style="
                            padding: 0.5rem 1rem; background: #2d2d30; border: 1px solid #3e3e42;
                            border-radius: 8px; color: #fff; font-size: 0.95rem; cursor: pointer; min-width: 200px;
                        ">
                            <option value="all">📋 Toutes les sociétés</option>
                        </select>
                        <button onclick="loadAllPdfFiles()" style="
                            padding: 0.5rem 1rem; background: #2196F3; color: #fff; border: none;
                            border-radius: 8px; cursor: pointer; font-weight: 600; font-size: 0.9rem;
                        ">🔄 Actualiser</button>
                    </div>
                </header>

                <div class="content-area" style="padding: 1.5rem;">
                    <!-- Stats Bar -->
                    <div id="pdfFilesStats" style="
                        display: flex; gap: 1rem; margin-bottom: 1.5rem;
                    ">
                        <div style="flex: 1; background: #2d2d30; border-radius: 10px; padding: 1rem 1.5rem; border: 1px solid #3e3e42; display: flex; align-items: center; gap: 1rem;">
                            <span style="font-size: 1.5rem;">📄</span>
                            <div>
                                <div style="color: #aaa; font-size: 0.8rem;">Total fichiers</div>
                                <div id="statsTotalFiles" style="color: #fff; font-size: 1.3rem; font-weight: 700;">0</div>
                            </div>
                        </div>
                        <div style="flex: 1; background: #2d2d30; border-radius: 10px; padding: 1rem 1.5rem; border: 1px solid #3e3e42; display: flex; align-items: center; gap: 1rem;">
                            <span style="font-size: 1.5rem;">🏭</span>
                            <div>
                                <div style="color: #aaa; font-size: 0.8rem;">Société filtrée</div>
                                <div id="statsFilteredCompany" style="color: #fff; font-size: 1.3rem; font-weight: 700;">Toutes</div>
                            </div>
                        </div>
                        <div style="flex: 1; background: #2d2d30; border-radius: 10px; padding: 1rem 1.5rem; border: 1px solid #3e3e42; display: flex; align-items: center; gap: 1rem;">
                            <span style="font-size: 1.5rem;">📦</span>
                            <div>
                                <div style="color: #aaa; font-size: 0.8rem;">Taille totale</div>
                                <div id="statsTotalSize" style="color: #fff; font-size: 1.3rem; font-weight: 700;">0 KB</div>
                            </div>
                        </div>
                    </div>

                    <!-- PDF Files List -->
                    <div id="pdfFilesList" style="
                        background: #2d2d30; border-radius: 12px; border: 1px solid #3e3e42;
                        overflow: hidden;
                    ">
                        <div style="padding: 3rem; text-align: center; color: #666;">
                            <span style="font-size: 2rem;">⏳</span>
                            <p>Chargement des fichiers PDF...</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    `;
}

// All loaded PDF files (for filtering)
let allPdfFilesData = [];

// Build company folder keys dynamically from the companies list
function getPdfCompanyFolders() {
    const companies = window.getAllPdfCompanies ? window.getAllPdfCompanies() : [];
    const folders = [];
    companies.forEach(c => {
        const key = c.code.toLowerCase();
        folders.push({ key: key, settingsKey: c.code, defaultName: c.name, color: c.color, enabled: c.enabled });
        // Also add chaimae_ variant for built-in companies
        if (['SKM', 'SAAISS', 'BENALI'].includes(c.code)) {
            folders.push({ key: `chaimae_${key}`, settingsKey: c.code, defaultName: c.name, color: c.color, enabled: c.enabled });
        }
    });
    // Fallback if no companies loaded yet
    if (folders.length === 0) {
        return [
            { key: 'skm', settingsKey: 'SKM', defaultName: 'SMART SERVICES', color: '#FF9800', enabled: true },
            { key: 'saaiss', settingsKey: 'SAAISS', defaultName: 'MSH3 SERVICES', color: '#9C27B0', enabled: true },
            { key: 'benali', settingsKey: 'BENALI', defaultName: 'BEN ALI', color: '#4CAF50', enabled: true },
            { key: 'chaimae_skm', settingsKey: 'SKM', defaultName: 'SMART SERVICES', color: '#FF9800', enabled: true },
            { key: 'chaimae_saaiss', settingsKey: 'SAAISS', defaultName: 'MSH3 SERVICES', color: '#9C27B0', enabled: true },
            { key: 'chaimae_benali', settingsKey: 'BENALI', defaultName: 'BEN ALI', color: '#4CAF50', enabled: true }
        ];
    }
    return folders;
}

// Get display name for a company folder
function getCompanyDisplayName(folderKey) {
    const folders = getPdfCompanyFolders();
    const folder = folders.find(f => f.key === folderKey);
    if (!folder) return folderKey.toUpperCase();
    if (window.getPdfCompanyName) return window.getPdfCompanyName(folder.settingsKey);
    return folder.defaultName;
}

// Get color for a company folder
function getCompanyColor(folderKey) {
    const folders = getPdfCompanyFolders();
    const folder = folders.find(f => f.key === folderKey);
    return folder ? folder.color : '#666';
}

// Get settings key for a company folder
function getCompanySettingsKey(folderKey) {
    const folders = getPdfCompanyFolders();
    const folder = folders.find(f => f.key === folderKey);
    return folder ? folder.settingsKey : folderKey.toUpperCase();
}

// Update the filter dropdown labels dynamically from enabled companies
function updateFilterDropdownLabels() {
    const select = document.getElementById('pdfFilesCompanyFilter');
    if (!select) return;
    
    // Get all enabled companies
    const enabledCompanies = window.getEnabledCompanies ? window.getEnabledCompanies() : [];
    
    let options = '<option value="all">📋 Toutes les sociétés</option>';
    enabledCompanies.forEach(c => {
        const displayName = window.getPdfCompanyName ? window.getPdfCompanyName(c.code) : c.name;
        options += `<option value="${c.code.toLowerCase()}">🏭 ${displayName}</option>`;
    });
    
    select.innerHTML = options;
}

// Load all PDF files from all companies
window.loadAllPdfFiles = async function() {
    const listEl = document.getElementById('pdfFilesList');
    if (!listEl) return;

    listEl.innerHTML = `
        <div style="padding: 3rem; text-align: center; color: #666;">
            <span style="font-size: 2rem;">⏳</span>
            <p>Chargement des fichiers PDF...</p>
        </div>
    `;

    allPdfFilesData = [];

    // Get the current company (creator) for filtering
    const selectedCompany = JSON.parse(localStorage.getItem('selectedCompany') || '{}');
    const createdBy = selectedCompany.code || selectedCompany.name || null;

    // Load PDFs from all company folders (dynamic)
    const PDF_COMPANY_FOLDERS = getPdfCompanyFolders();
    for (const folder of PDF_COMPANY_FOLDERS) {
        try {
            const result = await window.electron.pdf.getPdfFiles(folder.key, createdBy);
            if (result.success && result.files) {
                result.files.forEach(file => {
                    file._companyFolder = folder.key;
                    file._companySettingsKey = folder.settingsKey;
                    file._companyColor = folder.color;
                });
                allPdfFilesData = allPdfFilesData.concat(result.files);
            }
        } catch (e) {
            console.warn(`Could not load PDFs for ${folder.key}:`, e);
        }
    }

    // Sort by date (newest first)
    allPdfFilesData.sort((a, b) => new Date(b.created) - new Date(a.created));

    // Apply current filter
    filterPdfFilesByCompany();
};

// Filter PDF files by company
window.filterPdfFilesByCompany = function() {
    const select = document.getElementById('pdfFilesCompanyFilter');
    const filterValue = select ? select.value : 'all';

    let filtered = allPdfFilesData;
    if (filterValue !== 'all') {
        // Filter by settings key (SKM, SAAISS, BENALI)
        const settingsKey = filterValue.toUpperCase();
        filtered = allPdfFilesData.filter(f => {
            const fKey = getCompanySettingsKey(f._companyFolder);
            return fKey === settingsKey;
        });
    }

    // Update stats
    const totalEl = document.getElementById('statsTotalFiles');
    const companyEl = document.getElementById('statsFilteredCompany');
    const sizeEl = document.getElementById('statsTotalSize');

    if (totalEl) totalEl.textContent = filtered.length;
    if (companyEl) {
        if (filterValue === 'all') {
            companyEl.textContent = 'Toutes';
        } else {
            const settingsKey = filterValue.toUpperCase();
            companyEl.textContent = window.getPdfCompanyName ? window.getPdfCompanyName(settingsKey) : settingsKey;
        }
    }
    if (sizeEl) {
        const totalSize = filtered.reduce((sum, f) => sum + (f.size || 0), 0);
        if (totalSize > 1024 * 1024) {
            sizeEl.textContent = (totalSize / (1024 * 1024)).toFixed(1) + ' MB';
        } else {
            sizeEl.textContent = (totalSize / 1024).toFixed(1) + ' KB';
        }
    }

    // Render list
    renderPdfFilesList(filtered);
};

// Render the PDF files list
function renderPdfFilesList(files) {
    const listEl = document.getElementById('pdfFilesList');
    if (!listEl) return;

    if (files.length === 0) {
        listEl.innerHTML = `
            <div style="padding: 3rem; text-align: center; color: #666;">
                <span style="font-size: 2.5rem;">📭</span>
                <p style="font-size: 1.1rem; margin-top: 1rem;">Aucun fichier PDF trouvé</p>
            </div>
        `;
        return;
    }

    let html = '';
    files.forEach((file, index) => {
        const companyName = getCompanyDisplayName(file._companyFolder);
        const companyColor = file._companyColor || '#666';
        const fileDate = new Date(file.created).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
        const fileSize = (file.size / 1024).toFixed(1);
        const escapedPath = file.path.replace(/\\/g, '\\\\');

        html += `
            <div style="
                display: flex; align-items: center; gap: 1rem;
                padding: 0.8rem 1.5rem;
                border-bottom: 1px solid #3e3e42;
                transition: background 0.2s;
            " onmouseover="this.style.background='rgba(255,255,255,0.03)'" onmouseout="this.style.background='transparent'">
                <!-- Company Badge -->
                <div style="
                    min-width: 120px; padding: 0.3rem 0.6rem; border-radius: 6px;
                    background: ${companyColor}22; border: 1px solid ${companyColor}44;
                    color: ${companyColor}; font-size: 0.75rem; font-weight: 700; text-align: center;
                    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
                ">${companyName}</div>

                <!-- File Icon -->
                <div style="font-size: 1.3rem;">📄</div>

                <!-- File Info -->
                <div style="flex: 1; min-width: 0;">
                    <div style="color: #fff; font-weight: 500; font-size: 0.95rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                        ${file.name}
                    </div>
                    <div style="color: #888; font-size: 0.8rem; display: flex; gap: 1rem; margin-top: 0.2rem;">
                        <span>📅 ${fileDate}</span>
                        <span>📦 ${fileSize} KB</span>
                        <span style="color: #0078d4;">👤 ${file.creator || 'Système'}</span>
                    </div>
                </div>

                <!-- Actions -->
                <div style="display: flex; gap: 0.5rem;">
                    <button onclick="openPdfFile('${escapedPath}')" style="
                        padding: 0.4rem 0.8rem; background: rgba(76,175,80,0.15); color: #4CAF50;
                        border: 1px solid rgba(76,175,80,0.3); border-radius: 4px; cursor: pointer;
                        font-size: 0.85rem; font-weight: 500; transition: all 0.2s;
                    " onmouseover="this.style.background='rgba(76,175,80,0.25)'" onmouseout="this.style.background='rgba(76,175,80,0.15)'">
                        Ouvrir
                    </button>
                    <button onclick="deletePdfFileFromList('${escapedPath}', '${file._companyFolder}')" style="
                        padding: 0.4rem 0.8rem; background: rgba(244,67,54,0.15); color: #f44336;
                        border: 1px solid rgba(244,67,54,0.3); border-radius: 4px; cursor: pointer;
                        font-size: 0.85rem; font-weight: 500; transition: all 0.2s;
                    " onmouseover="this.style.background='rgba(244,67,54,0.25)'" onmouseout="this.style.background='rgba(244,67,54,0.15)'">
                        Supprimer
                    </button>
                </div>
            </div>
        `;
    });

    listEl.innerHTML = html;
}

// Delete PDF from the unified list
window.deletePdfFileFromList = async function(filePath, companyFolder) {
    try {
        if (!confirm('Êtes-vous sûr de vouloir supprimer ce fichier?\n\nCette action ne peut pas être annulée.')) {
            return;
        }

        const result = await window.electron.pdf.deletePdf(filePath);
        if (result.success) {
            if (window.notify) {
                window.notify.success('Succès', 'Le fichier a été supprimé avec succès', 3000);
            }
            // Reload all files
            await loadAllPdfFiles();
        } else {
            if (window.notify) {
                window.notify.error('Erreur', 'Impossible de supprimer le fichier: ' + result.error, 4000);
            }
        }
    } catch (error) {
        console.error('Error deleting PDF:', error);
        if (window.notify) {
            window.notify.error('Erreur', 'Une erreur s\'est produite: ' + error.message, 4000);
        }
    }
};

// Initialize PDF Files page
window.initPdfFilesPage = function() {
    console.log('✅ PDF Files page initialized');
    updateFilterDropdownLabels();
    loadAllPdfFiles();
};
