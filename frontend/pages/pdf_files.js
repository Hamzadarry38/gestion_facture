// Unified PDF Page - PDF Settings + PDF Files in one page with tabs

function PDFFilesPage() {
    return `
        <div class="desktop-app" style="display: flex; flex-direction: column; height: 100vh; background: #1e1e1e;">
            <!-- Top Header Bar -->
            <div style="
                background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
                border-bottom: 1px solid #2a2a4a;
                padding: 0.8rem 2rem;
                display: flex; justify-content: space-between; align-items: center;
                flex-shrink: 0;
            ">
                <div style="display: flex; align-items: center; gap: 1rem;">
                    <div style="
                        width: 36px; height: 36px; border-radius: 10px;
                        background: linear-gradient(135deg, #667eea, #764ba2);
                        display: flex; align-items: center; justify-content: center;
                        font-size: 1.1rem; box-shadow: 0 2px 8px rgba(102,126,234,0.3);
                    ">📄</div>
                    <div>
                        <h1 style="color: #fff; margin: 0; font-size: 1.15rem; font-weight: 700; letter-spacing: 0.3px;">Gestion PDF</h1>
                        <p style="color: #8888aa; margin: 0; font-size: 0.7rem;">Paramètres & Fichiers</p>
                    </div>
                </div>
                <div style="display: flex; align-items: center; gap: 0.6rem;">
                    <button onclick="router.navigate('/company-select')" style="
                        padding: 0.45rem 1rem; background: rgba(255,255,255,0.06); color: #ccc;
                        border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; cursor: pointer;
                        font-size: 0.85rem; font-weight: 500; transition: all 0.2s;
                        display: flex; align-items: center; gap: 0.4rem;
                    " onmouseover="this.style.background='rgba(255,255,255,0.12)'; this.style.color='#fff'"
                       onmouseout="this.style.background='rgba(255,255,255,0.06)'; this.style.color='#ccc'">
                        <span>🏠</span> Accueil
                    </button>
                </div>
            </div>

            <!-- Tabs Navigation -->
            <div style="
                background: #252530; border-bottom: 1px solid #3e3e42;
                padding: 0 2rem; display: flex; gap: 0; flex-shrink: 0;
            ">
                <button id="tabBtnSettings" onclick="switchPdfTab('settings')" style="
                    padding: 0.85rem 1.8rem; background: transparent; color: #fff;
                    border: none; border-bottom: 3px solid #667eea; cursor: pointer;
                    font-size: 0.95rem; font-weight: 600; transition: all 0.2s;
                    display: flex; align-items: center; gap: 0.5rem;
                ">
                    <span style="font-size: 1.1rem;">⚙️</span> Paramètres PDF
                </button>
                <button id="tabBtnFiles" onclick="switchPdfTab('files')" style="
                    padding: 0.85rem 1.8rem; background: transparent; color: #888;
                    border: none; border-bottom: 3px solid transparent; cursor: pointer;
                    font-size: 0.95rem; font-weight: 600; transition: all 0.2s;
                    display: flex; align-items: center; gap: 0.5rem;
                ">
                    <span style="font-size: 1.1rem;">📁</span> Fichiers PDF
                    <span id="tabFilesBadge" style="
                        background: #667eea; color: #fff; font-size: 0.7rem; font-weight: 700;
                        padding: 0.1rem 0.5rem; border-radius: 10px; min-width: 18px; text-align: center;
                    ">0</span>
                </button>
            </div>

            <!-- Tab Content Area -->
            <div style="flex: 1; overflow-y: auto; padding: 0;">

                <!-- ==================== TAB: SETTINGS ==================== -->
                <div id="tabSettings" style="display: block;">
                    <!-- Settings Header -->
                    <div style="
                        background: #252530; border-bottom: 1px solid #3e3e42;
                        padding: 1rem 2rem; display: flex; justify-content: space-between; align-items: center;
                    ">
                        <h2 style="color: #fff; margin: 0; font-size: 1.1rem; font-weight: 500;">
                            ⚙️ Sociétés PDF — Gérer les paramètres
                        </h2>
                        <button onclick="showAddCompanyModal()" style="
                            padding: 0.55rem 1.2rem; background: linear-gradient(135deg, #4CAF50, #388E3C); color: #fff;
                            border: none; border-radius: 8px; cursor: pointer; font-weight: 700; font-size: 0.9rem;
                            transition: all 0.3s; box-shadow: 0 2px 8px rgba(76,175,80,0.25);
                        " onmouseover="this.style.transform='translateY(-1px)'; this.style.boxShadow='0 4px 12px rgba(76,175,80,0.4)'"
                           onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 8px rgba(76,175,80,0.25)'">
                            ➕ Ajouter une société
                        </button>
                    </div>

                    <!-- Settings Content -->
                    <div style="padding: 1.5rem 2rem;">
                        <div id="pdfCompanyList" style="margin-bottom: 2rem;"></div>

                        <div id="pdfCompanyEditor" style="display: none;">
                            <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem;">
                                <button onclick="hideCompanyEditor()" style="
                                    padding: 0.5rem 1rem; background: #3e3e42; color: #fff; border: none;
                                    border-radius: 8px; cursor: pointer; font-weight: 600;
                                ">← Retour à la liste</button>
                                <h3 id="editorCompanyTitle" style="color: #fff; margin: 0; font-size: 1.2rem;"></h3>
                            </div>

                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
                                <!-- Left Column: Images -->
                                <div>
                                    <div class="card" style="background: #2d2d30; border-radius: 12px; padding: 1.5rem; margin-bottom: 1.5rem; border: 1px solid #3e3e42;">
                                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                                            <h3 style="color: #fff; margin: 0; font-size: 1.1rem;">📋 Header (En-tête)</h3>
                                            <label style="
                                                background: linear-gradient(135deg, #2196F3, #1976D2); color: #fff;
                                                padding: 0.5rem 1rem; border-radius: 8px; cursor: pointer; font-size: 0.85rem; font-weight: 600;
                                            ">
                                                📁 Changer
                                                <input type="file" id="pdfHeaderUpload" accept="image/png,image/jpeg" style="display:none;" onchange="uploadPdfImage('header')">
                                            </label>
                                        </div>
                                        <div id="pdfHeaderPreview" style="
                                            background: #1e1e1e; border-radius: 8px; padding: 0.5rem; min-height: 80px;
                                            display: flex; align-items: center; justify-content: center; border: 1px dashed #3e3e42;
                                        "><span style="color: #666;">Chargement...</span></div>
                                    </div>

                                    <div class="card" style="background: #2d2d30; border-radius: 12px; padding: 1.5rem; margin-bottom: 1.5rem; border: 1px solid #3e3e42;">
                                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                                            <h3 style="color: #fff; margin: 0; font-size: 1.1rem;">🦶 Footer (Pied de page)</h3>
                                            <label style="
                                                background: linear-gradient(135deg, #2196F3, #1976D2); color: #fff;
                                                padding: 0.5rem 1rem; border-radius: 8px; cursor: pointer; font-size: 0.85rem; font-weight: 600;
                                            ">
                                                📁 Changer
                                                <input type="file" id="pdfFooterUpload" accept="image/png,image/jpeg" style="display:none;" onchange="uploadPdfImage('footer')">
                                            </label>
                                        </div>
                                        <div id="pdfFooterPreview" style="
                                            background: #1e1e1e; border-radius: 8px; padding: 0.5rem; min-height: 80px;
                                            display: flex; align-items: center; justify-content: center; border: 1px dashed #3e3e42;
                                        "><span style="color: #666;">Chargement...</span></div>
                                    </div>

                                    <div class="card" style="background: #2d2d30; border-radius: 12px; padding: 1.5rem; border: 1px solid #3e3e42;">
                                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                                            <h3 style="color: #fff; margin: 0; font-size: 1.1rem;">✍️ Signature</h3>
                                            <label style="
                                                background: linear-gradient(135deg, #2196F3, #1976D2); color: #fff;
                                                padding: 0.5rem 1rem; border-radius: 8px; cursor: pointer; font-size: 0.85rem; font-weight: 600;
                                            ">
                                                📁 Changer
                                                <input type="file" id="pdfSignatureUpload" accept="image/png,image/jpeg" style="display:none;" onchange="uploadPdfImage('signature')">
                                            </label>
                                        </div>
                                        <div id="pdfSignaturePreview" style="
                                            background: #1e1e1e; border-radius: 8px; padding: 0.5rem; min-height: 80px;
                                            display: flex; align-items: center; justify-content: center; border: 1px dashed #3e3e42;
                                        "><span style="color: #666;">Chargement...</span></div>
                                    </div>
                                </div>

                                <!-- Right Column: Company Name + Save -->
                                <div>
                                    <div class="card" style="background: #2d2d30; border-radius: 12px; padding: 1.5rem; margin-bottom: 1.5rem; border: 1px solid #3e3e42;">
                                        <h3 style="color: #fff; margin: 0 0 1rem 0; font-size: 1.1rem;">🏢 Nom de la Société</h3>
                                        <p style="color: #999; font-size: 0.8rem; margin: 0 0 0.8rem 0;">Ce nom sera utilisé dans le PDF et le nom du fichier.</p>
                                        <input type="text" id="pdfCompanyNameInput" placeholder="Ex: SMART SERVICES" style="
                                            width: 100%; padding: 0.8rem 1rem; background: #1e1e1e; border: 1px solid #3e3e42;
                                            border-radius: 8px; color: #fff; font-size: 1rem; font-weight: 600;
                                            outline: none; transition: border-color 0.3s; box-sizing: border-box;
                                        " onfocus="this.style.borderColor='#667eea'" onblur="this.style.borderColor='#3e3e42'">
                                    </div>

                                    <div class="card" style="background: #2d2d30; border-radius: 12px; padding: 1.5rem; margin-bottom: 1.5rem; border: 1px solid #3e3e42;">
                                        <h3 style="color: #fff; margin: 0 0 0.8rem 0; font-size: 1.1rem;">📊 Style du tableau PDF</h3>
                                        <p style="color: #999; font-size: 0.8rem; margin: 0 0 0.8rem 0;">Ce style sera utilisé pour le tableau des produits dans le PDF.</p>
                                        <div id="editTableStyleGrid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.6rem;"></div>
                                        <input type="hidden" id="editSelectedTableStyle" value="style1">
                                    </div>

                                    <button id="savePdfSettingsBtn" onclick="savePdfSettings()" style="
                                        width: 100%; padding: 1rem;
                                        background: linear-gradient(135deg, #4CAF50, #388E3C); color: #fff;
                                        border: none; border-radius: 10px; cursor: pointer; font-size: 1.1rem; font-weight: 700;
                                        transition: all 0.3s;
                                    " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 20px rgba(76,175,80,0.4)'"
                                       onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'">
                                        ✅ Sauvegarder
                                    </button>

                                    <div class="card" style="background: #2d2d30; border-radius: 12px; padding: 1.5rem; margin-top: 1.5rem; border: 1px solid #3e3e42;">
                                        <h3 style="color: #fff; margin: 0 0 1rem 0; font-size: 1.1rem;">📌 Informations</h3>
                                        <div id="pdfSettingsInfo" style="color: #b0b0b0; font-size: 0.9rem; line-height: 1.8;">
                                            <div>🏢 <strong>Société:</strong> <span id="infoCompanyName">-</span></div>
                                            <div>📋 <strong>Header:</strong> <span id="infoHeaderStatus">-</span></div>
                                            <div>🦶 <strong>Footer:</strong> <span id="infoFooterStatus">-</span></div>
                                            <div>✍️ <strong>Signature:</strong> <span id="infoSignatureStatus">-</span></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- ==================== TAB: FILES ==================== -->
                <div id="tabFiles" style="display: none;">
                    <!-- Files Header -->
                    <div style="
                        background: #252530; border-bottom: 1px solid #3e3e42;
                        padding: 1rem 2rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.8rem;
                    ">
                        <h2 style="color: #fff; margin: 0; font-size: 1.1rem; font-weight: 500;">
                            📁 Fichiers PDF — Toutes les Sociétés
                        </h2>
                        <div style="display: flex; align-items: center; gap: 0.8rem; flex-wrap: wrap;">
                            <select id="pdfFilesCompanyFilter" onchange="filterPdfFilesByCompany()" style="
                                padding: 0.45rem 0.8rem; background: #1e1e1e; border: 1px solid #3e3e42;
                                border-radius: 8px; color: #fff; font-size: 0.85rem; cursor: pointer; min-width: 180px;
                            ">
                                <option value="all">📋 Toutes les sociétés</option>
                            </select>
                            <select id="pdfFilesCreatorFilter" onchange="filterPdfFilesByCompany()" style="
                                padding: 0.45rem 0.8rem; background: #1e1e1e; border: 1px solid #3e3e42;
                                border-radius: 8px; color: #fff; font-size: 0.85rem; cursor: pointer; min-width: 160px;
                            ">
                                <option value="all">👤 Tous les créateurs</option>
                                <option value="MRY">🏭 MRY</option>
                                <option value="MULTI">🏭 MULTI</option>
                                <option value="CHAIMAE">🏭 CHAIMAE</option>
                            </select>
                            <button onclick="loadAllPdfFiles()" style="
                                padding: 0.45rem 0.9rem; background: rgba(102,126,234,0.15); color: #667eea;
                                border: 1px solid rgba(102,126,234,0.3); border-radius: 8px; cursor: pointer;
                                font-weight: 600; font-size: 0.85rem; transition: all 0.2s;
                            " onmouseover="this.style.background='rgba(102,126,234,0.25)'"
                               onmouseout="this.style.background='rgba(102,126,234,0.15)'">
                                🔄 Actualiser
                            </button>
                            <button onclick="exportDevisDataToDB()" style="
                                padding: 0.45rem 0.9rem; background: rgba(76,175,80,0.15); color: #4CAF50;
                                border: 1px solid rgba(76,175,80,0.3); border-radius: 8px; cursor: pointer;
                                font-weight: 600; font-size: 0.85rem; transition: all 0.2s;
                            " onmouseover="this.style.background='rgba(76,175,80,0.25)'"
                               onmouseout="this.style.background='rgba(76,175,80,0.15)'">
                                📤 Exporter vers DB
                            </button>
                        </div>
                    </div>

                    <!-- Files Content -->
                    <div style="padding: 1.5rem 2rem;">
                        <!-- Stats Bar -->
                        <div id="pdfFilesStats" style="display: flex; gap: 1rem; margin-bottom: 1.5rem;">
                            <div style="
                                flex: 1; background: linear-gradient(135deg, #1a1a2e, #16213e);
                                border-radius: 12px; padding: 1rem 1.5rem;
                                border: 1px solid #2a2a4a; display: flex; align-items: center; gap: 1rem;
                            ">
                                <div style="
                                    width: 40px; height: 40px; border-radius: 10px;
                                    background: rgba(102,126,234,0.15); display: flex; align-items: center; justify-content: center;
                                    font-size: 1.2rem;
                                ">📄</div>
                                <div>
                                    <div style="color: #8888aa; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.5px;">Total fichiers</div>
                                    <div id="statsTotalFiles" style="color: #fff; font-size: 1.4rem; font-weight: 700;">0</div>
                                </div>
                            </div>
                            <div style="
                                flex: 1; background: linear-gradient(135deg, #1a1a2e, #16213e);
                                border-radius: 12px; padding: 1rem 1.5rem;
                                border: 1px solid #2a2a4a; display: flex; align-items: center; gap: 1rem;
                            ">
                                <div style="
                                    width: 40px; height: 40px; border-radius: 10px;
                                    background: rgba(76,175,80,0.15); display: flex; align-items: center; justify-content: center;
                                    font-size: 1.2rem;
                                ">🏭</div>
                                <div>
                                    <div style="color: #8888aa; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.5px;">Société filtrée</div>
                                    <div id="statsFilteredCompany" style="color: #fff; font-size: 1.4rem; font-weight: 700;">Toutes</div>
                                </div>
                            </div>
                            <div style="
                                flex: 1; background: linear-gradient(135deg, #1a1a2e, #16213e);
                                border-radius: 12px; padding: 1rem 1.5rem;
                                border: 1px solid #2a2a4a; display: flex; align-items: center; gap: 1rem;
                            ">
                                <div style="
                                    width: 40px; height: 40px; border-radius: 10px;
                                    background: rgba(255,152,0,0.15); display: flex; align-items: center; justify-content: center;
                                    font-size: 1.2rem;
                                ">📦</div>
                                <div>
                                    <div style="color: #8888aa; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.5px;">Taille totale</div>
                                    <div id="statsTotalSize" style="color: #fff; font-size: 1.4rem; font-weight: 700;">0 KB</div>
                                </div>
                            </div>
                        </div>

                        <!-- PDF Files List -->
                        <div id="pdfFilesList" style="
                            background: #252530; border-radius: 12px; border: 1px solid #2a2a4a;
                            overflow: hidden;
                        ">
                            <div style="padding: 3rem; text-align: center; color: #666;">
                                <span style="font-size: 2rem;">⏳</span>
                                <p>Chargement des fichiers PDF...</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Footer -->
            <div style="
                background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
                border-top: 1px solid #2a2a4a; padding: 0.6rem 2rem;
                display: flex; justify-content: space-between; align-items: center; flex-shrink: 0;
            ">
                <div style="display: flex; align-items: center; gap: 1rem;">
                    <div style="display: flex; align-items: center; gap: 0.4rem; color: #8888aa; font-size: 0.8rem;">
                        <div style="width: 7px; height: 7px; border-radius: 50%; background: #4ec9b0; box-shadow: 0 0 6px #4ec9b0;"></div>
                        <span>Connecté</span>
                    </div>
                    <span style="color: #3e3e52;">|</span>
                    <span style="color: #6666aa; font-size: 0.75rem;">Gestion des Factures</span>
                </div>
                <div style="color: #6666aa; font-size: 0.75rem;">
                    v1.1.86
                </div>
            </div>
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

    // Refresh companies from API to include any newly added companies
    try {
        const result = await window.electron.pdfCompanies.getAll();
        if (result && result.success && Array.isArray(result.data)) {
            // Update _cachedCompanies if it exists
            if (typeof _cachedCompanies !== 'undefined') {
                _cachedCompanies.length = 0;
                result.data.forEach(c => _cachedCompanies.push({
                    id: c.id,
                    code: c.company_code,
                    name: c.company_name,
                    color: c.color || '#2196F3',
                    enabled: c.enabled !== false,
                    headerImage: c.header_image || null,
                    footerImage: c.footer_image || null,
                    signatureImage: c.signature_image || null,
                    headerPath: c.header_path || '',
                    footerPath: c.footer_path || '',
                    signaturePath: c.signature_path || '',
                    dbName: c.db_name || '',
                    isBuiltin: c.is_builtin || false,
                    table_style: c.table_style || 'style1'
                }));
            }
            updateFilterDropdownLabels();
        }
    } catch (e) {
        console.warn('⚠️ Could not refresh companies:', e);
    }

    // Load PDFs from all company folders (dynamic) - no creator filter, show ALL
    const PDF_COMPANY_FOLDERS = getPdfCompanyFolders();
    for (const folder of PDF_COMPANY_FOLDERS) {
        try {
            const result = await window.electron.pdf.getPdfFiles(folder.key, null);
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

    // Update files tab badge
    const badge = document.getElementById('tabFilesBadge');
    if (badge) badge.textContent = allPdfFilesData.length;

    // Apply current filter
    filterPdfFilesByCompany();
};

// Filter PDF files by company and creator
window.filterPdfFilesByCompany = function() {
    const select = document.getElementById('pdfFilesCompanyFilter');
    const creatorSelect = document.getElementById('pdfFilesCreatorFilter');
    const filterValue = select ? select.value : 'all';
    const creatorValue = creatorSelect ? creatorSelect.value : 'all';

    let filtered = allPdfFilesData;
    if (filterValue !== 'all') {
        // Filter by settings key (SKM, SAAISS, BENALI)
        const settingsKey = filterValue.toUpperCase();
        filtered = filtered.filter(f => {
            const fKey = getCompanySettingsKey(f._companyFolder);
            return fKey === settingsKey;
        });
    }
    if (creatorValue !== 'all') {
        filtered = filtered.filter(f => {
            const creator = (f.creator || '').toUpperCase();
            return creator === creatorValue.toUpperCase();
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
        const fileSize = file.size > 0 ? (file.size / 1024).toFixed(1) + ' KB' : '☁️ En ligne';
        const isServerFile = file.source === 'server';
        const escapedPath = file.path.replace(/\\/g, '\\\\');
        const fileIcon = isServerFile ? '☁️' : '📄';
        const serverPath = file.serverPath ? file.serverPath.replace(/'/g, "\\'") : '';

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
                <div style="font-size: 1.3rem;">${fileIcon}</div>

                <!-- File Info -->
                <div style="flex: 1; min-width: 0;">
                    <div style="color: #fff; font-weight: 500; font-size: 0.95rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                        ${file.name}
                    </div>
                    <div style="color: #888; font-size: 0.8rem; display: flex; gap: 1rem; margin-top: 0.2rem;">
                        <span>📅 ${fileDate}</span>
                        <span>📦 ${fileSize}</span>
                        <span style="color: #0078d4;">👤 ${file.creator || 'Système'}</span>
                    </div>
                </div>

                <!-- Actions -->
                <div style="display: flex; gap: 0.5rem;">
                    <button onclick="${isServerFile ? `openServerPdfFile('${serverPath}')` : `openPdfFile('${escapedPath}')`}" style="
                        padding: 0.4rem 0.8rem; background: rgba(76,175,80,0.15); color: #4CAF50;
                        border: 1px solid rgba(76,175,80,0.3); border-radius: 4px; cursor: pointer;
                        font-size: 0.85rem; font-weight: 500; transition: all 0.2s;
                    " onmouseover="this.style.background='rgba(76,175,80,0.25)'" onmouseout="this.style.background='rgba(76,175,80,0.15)'">
                        ${isServerFile ? '🌐 Ouvrir' : 'Ouvrir'}
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

// Open a server-hosted PDF file in the browser
window.openServerPdfFile = function(serverPath) {
    try {
        // Build the full URL from the API base URL
        const apiUrl = localStorage.getItem('apiUrl') || 'https://anpe-web-api.ddns.net/facture';
        const fullUrl = apiUrl + serverPath;
        console.log('🌐 Opening server PDF:', fullUrl);
        // Open in a new browser window
        window.open(fullUrl, '_blank');
    } catch (error) {
        console.error('Error opening server PDF:', error);
        if (window.notify) {
            window.notify.error('Erreur', 'Impossible d\'ouvrir le fichier: ' + error.message, 4000);
        }
    }
};

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

// Export devis data from all company databases
window.exportDevisDataToDB = async function() {
    try {
        const select = document.getElementById('pdfFilesCompanyFilter');
        const filterValue = select ? select.value : 'all';

        // Get companies to export
        let companies = [];
        if (filterValue === 'all') {
            companies = window.getAllPdfCompanies ? window.getAllPdfCompanies() : [];
        } else {
            const allCompanies = window.getAllPdfCompanies ? window.getAllPdfCompanies() : [];
            const match = allCompanies.find(c => c.code.toLowerCase() === filterValue);
            if (match) companies = [match];
        }

        if (companies.length === 0) {
            if (window.notify) window.notify.error('Erreur', 'Aucune société trouvée pour l\'export.', 3000);
            return;
        }

        // Show loading
        if (window.notify) window.notify.loading('Export', 'Chargement des données...', 0);

        const exportData = {
            exportDate: new Date().toISOString(),
            appVersion: window.electron.getAppVersion ? await window.electron.getAppVersion() : 'unknown',
            companies: []
        };

        let totalDevis = 0;
        let totalProducts = 0;

        for (const company of companies) {
            try {
                // Fetch devis data via dynamic API
                const result = await window.electron.dbDynamic.getDevisData(company.code);
                if (result && result.success && result.data) {
                    const companyExport = {
                        nameSociety: company.name,
                        code: company.code,
                        colour: company.color,
                        tableStyle: company.table_style || 'style1',
                        header: company.header_path || '',
                        footer: company.footer_path || '',
                        signature: company.signature_path || '',
                        devis: result.data.map(d => ({
                            id: d.id,
                            devis_number: d.devis_number,
                            year: d.year,
                            source_invoice_id: d.source_invoice_id,
                            source_company: d.source_company,
                            document_type: d.document_type,
                            client_nom: d.client_nom,
                            client_ice: d.client_ice,
                            date: d.document_date,
                            pourcentage_ajustement: parseFloat(d.pourcentage_ajustement) || 0,
                            tva_rate: parseFloat(d.tva_rate) || 20,
                            total_ht: parseFloat(d.total_ht) || 0,
                            montant_tva: parseFloat(d.montant_tva) || 0,
                            total_ttc: parseFloat(d.total_ttc) || 0,
                            table_style: d.table_style,
                            created_by: d.created_by,
                            created_at: d.created_at,
                            products: (d.products || []).map(p => ({
                                designation: p.designation,
                                quantite: parseFloat(p.quantite) || 0,
                                prix_unitaire_ht: parseFloat(p.prix_unitaire_ht) || 0,
                                total_ht: parseFloat(p.total_ht) || 0,
                                original_designation: p.original_designation,
                                original_prix_unitaire_ht: parseFloat(p.original_prix_unitaire_ht) || 0
                            }))
                        }))
                    };
                    totalDevis += companyExport.devis.length;
                    companyExport.devis.forEach(d => { totalProducts += (d.products || []).length; });
                    exportData.companies.push(companyExport);
                }
            } catch (e) {
                console.warn(`Could not export devis data for ${company.code}:`, e);
            }
        }

        // Also include PDF file list metadata
        exportData.pdfFiles = allPdfFilesData.map(f => ({
            name: f.name,
            company: getCompanySettingsKey(f._companyFolder),
            size: f.size,
            created: f.created,
            creator: f.creator
        }));

        // Convert to JSON and trigger download
        const jsonStr = JSON.stringify(exportData, null, 2);
        const blob = new Blob([jsonStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        const dateStr = new Date().toISOString().split('T')[0];
        const companyLabel = filterValue === 'all' ? 'ALL' : filterValue.toUpperCase();
        a.href = url;
        a.download = `export_devis_${companyLabel}_${dateStr}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        // Show success
        if (window.notify) {
            window.notify.success('✅ Export réussi',
                `${exportData.companies.length} société(s) — ${totalDevis} devis — ${totalProducts} produits — ${allPdfFilesData.length} fichiers PDF`, 5000);
        }

    } catch (error) {
        console.error('Error exporting devis data:', error);
        if (window.notify) window.notify.error('Erreur', 'Erreur lors de l\'export: ' + error.message, 4000);
    }
};

// Track whether files tab has been loaded
let _filesTabLoaded = false;

// Switch between Settings and Files tabs
window.switchPdfTab = function(tab) {
    const tabSettings = document.getElementById('tabSettings');
    const tabFiles = document.getElementById('tabFiles');
    const btnSettings = document.getElementById('tabBtnSettings');
    const btnFiles = document.getElementById('tabBtnFiles');

    if (tab === 'settings') {
        if (tabSettings) tabSettings.style.display = 'block';
        if (tabFiles) tabFiles.style.display = 'none';
        if (btnSettings) { btnSettings.style.color = '#fff'; btnSettings.style.borderBottom = '3px solid #667eea'; }
        if (btnFiles) { btnFiles.style.color = '#888'; btnFiles.style.borderBottom = '3px solid transparent'; }
    } else if (tab === 'files') {
        if (tabSettings) tabSettings.style.display = 'none';
        if (tabFiles) tabFiles.style.display = 'block';
        if (btnSettings) { btnSettings.style.color = '#888'; btnSettings.style.borderBottom = '3px solid transparent'; }
        if (btnFiles) { btnFiles.style.color = '#fff'; btnFiles.style.borderBottom = '3px solid #667eea'; }

        // Lazy-load files on first switch
        if (!_filesTabLoaded) {
            _filesTabLoaded = true;
            updateFilterDropdownLabels();
            loadAllPdfFiles();
        }
    }
};

// Initialize unified PDF page (Settings + Files)
window.initPdfFilesPage = async function() {
    console.log('🔄 Unified PDF page initializing...');
    _filesTabLoaded = false;

    // Load companies from API (needed for both tabs)
    try {
        const result = await window.electron.pdfCompanies.getAll();
        if (result && result.success && Array.isArray(result.data)) {
            if (typeof _cachedCompanies !== 'undefined') {
                _cachedCompanies.length = 0;
                result.data.forEach(c => _cachedCompanies.push({
                    id: c.id,
                    code: c.company_code,
                    name: c.company_name,
                    color: c.color || '#2196F3',
                    enabled: c.enabled !== false,
                    headerImage: c.header_image || null,
                    footerImage: c.footer_image || null,
                    signatureImage: c.signature_image || null,
                    headerPath: c.header_path || '',
                    footerPath: c.footer_path || '',
                    signaturePath: c.signature_path || '',
                    dbName: c.db_name || '',
                    isBuiltin: c.is_builtin || false,
                    table_style: c.table_style || 'style1'
                }));
            }
            console.log('✅ Loaded', result.data.length, 'companies from API');
        }
    } catch (e) {
        console.error('⚠️ Could not load companies from API:', e);
    }

    // Initialize Settings tab (company list)
    if (typeof window.initPdfSettingsPage === 'function') {
        await window.initPdfSettingsPage();
    }

    // Default to Settings tab
    switchPdfTab('settings');
    console.log('✅ Unified PDF page initialized');
};
