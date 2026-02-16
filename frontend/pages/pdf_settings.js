// PDF Settings Page - Manage Companies with Enable/Disable + Header, Footer, Signature
// *** ONLINE VERSION - All data stored in PostgreSQL via API ***

// Available colors for new companies
const COMPANY_COLORS = ['#FF9800', '#9C27B0', '#4CAF50', '#2196F3', '#f44336', '#E91E63', '#00BCD4', '#FF5722', '#795548', '#607D8B'];

// In-memory cache of companies (loaded from API)
let _cachedCompanies = [];
let _companiesLoaded = false;

// Auto-load companies from API at startup so they're available on all pages
(async function _preloadCompanies() {
    try {
        if (window.electron && window.electron.pdfCompanies) {
            const result = await window.electron.pdfCompanies.getAll();
            if (result && result.success && Array.isArray(result.data) && !_companiesLoaded) {
                _cachedCompanies = result.data.map(c => ({
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
                    tableStyle: c.table_style || 'style1'
                }));
                _companiesLoaded = true;
                console.log('✅ [PDF Settings] Auto-preloaded', _cachedCompanies.length, 'companies from API at startup');
            }
        }
    } catch (e) {
        console.warn('⚠️ [PDF Settings] Could not preload companies at startup:', e);
    }
})();

// Get all companies from API (cached)
async function _loadCompaniesFromAPI() {
    try {
        const result = await window.electron.pdfCompanies.getAll();
        if (result && result.success && Array.isArray(result.data)) {
            _cachedCompanies = result.data.map(c => ({
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
                tableStyle: c.table_style || 'style1'
            }));
            _companiesLoaded = true;
            console.log('✅ [PDF Settings] Loaded', _cachedCompanies.length, 'companies from API');
        }
    } catch (e) {
        console.error('❌ [PDF Settings] Error loading companies from API:', e);
    }
    return _cachedCompanies;
}

// Get all companies (sync from cache, async first load)
function _getAllCompanies() {
    return _cachedCompanies;
}

// Get only enabled companies
function _getEnabledCompanies() {
    return _cachedCompanies.filter(c => c.enabled);
}

// Current selected company for editing
let currentPdfSettingsCompany = null;

// Legacy compat: PDF_COMPANY_INFO object (dynamically built)
function buildCompanyInfoMap() {
    const map = {};
    _cachedCompanies.forEach(c => {
        map[c.code] = { name: c.name, color: c.color, headerPath: c.headerPath || '', footerPath: c.footerPath || '', signaturePath: c.signaturePath || '' };
    });
    return map;
}
let PDF_COMPANY_INFO = buildCompanyInfoMap();

function PDFSettingsPage() {
    return `
        <div class="desktop-app">
            <div class="window-header">
                <div class="window-title">
                    <span style="font-size: 1.1rem;">⚙️</span>
                    <span>Paramètres PDF - Sociétés</span>
                </div>
                <div class="window-controls">
                    <button class="control-btn reload" title="Recharger la page">
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
                            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
                        </svg>
                    </button>
                    <button class="control-btn minimize">
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8z"/>
                        </svg>
                    </button>
                    <button class="control-btn maximize">
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M1.5 1a.5.5 0 0 0-.5.5v13a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-13a.5.5 0 0 0-.5-.5h-13zM2 2h12v12H2V2z"/>
                        </svg>
                    </button>
                    <button class="control-btn close">
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854z"/>
                        </svg>
                    </button>
                </div>
            </div>

            <div class="window-content" style="padding: 0;">
                <!-- Top Header Bar -->
                <div style="background: #2d2d30; border-bottom: 1px solid #3e3e42; padding: 1rem 2rem; display: flex; justify-content: space-between; align-items: center;">
                    <h2 style="color: #fff; margin: 0; font-size: 1.25rem; font-weight: 500;">⚙️ Paramètres PDF - Sociétés</h2>
                    <button onclick="showAddCompanyModal()" style="
                        padding: 0.6rem 1.2rem; background: linear-gradient(135deg, #4CAF50, #388E3C); color: #fff;
                        border: none; border-radius: 8px; cursor: pointer; font-weight: 700; font-size: 0.95rem;
                        transition: all 0.3s;
                    " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 12px rgba(76,175,80,0.4)'"
                       onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'">➕ Ajouter une société</button>
                </div>

                <!-- Content Area -->
                <div style="padding: 1.5rem 2rem; overflow-y: auto; flex: 1;">
                    <!-- Company List with Toggles -->
                    <div id="pdfCompanyList" style="margin-bottom: 2rem;"></div>

                    <!-- Company Settings Editor (shown when a company is selected) -->
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
                                <!-- Header Image -->
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

                                <!-- Footer Image -->
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

                                <!-- Signature Image -->
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
                                    " onfocus="this.style.borderColor='#2196F3'" onblur="this.style.borderColor='#3e3e42'">
                                </div>

                                <!-- Table Style Selector -->
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

                                <!-- Info Panel -->
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

                <!-- Footer -->
                <div style="padding: 0.75rem 2rem; background: #2d2d30; border-top: 1px solid #3e3e42; display: flex; justify-content: space-between; align-items: center;">
                    <button onclick="router.navigate('/company-select')" style="
                        background: transparent; border: 1px solid #3e3e42; color: #cccccc;
                        padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer;
                        display: flex; align-items: center; gap: 0.5rem; font-size: 0.9rem;
                        transition: all 0.2s;
                    " onmouseover="this.style.background='#3e3e42'; this.style.borderColor='#007acc'"
                       onmouseout="this.style.background='transparent'; this.style.borderColor='#3e3e42'">
                        ↩️ Retour
                    </button>
                    <div style="display: flex; align-items: center; gap: 0.5rem; color: #8e8e8e; font-size: 0.85rem;">
                        <div style="width: 8px; height: 8px; border-radius: 50%; background: #4ec9b0;"></div>
                        <span>PDF Settings</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Render the company list with toggles
function renderCompanyList() {
    const container = document.getElementById('pdfCompanyList');
    if (!container) return;

    const companies = _getAllCompanies();
    let html = '';

    if (companies.length === 0) {
        html = '<div style="color: #888; text-align: center; padding: 2rem; font-size: 1rem;">📭 Aucune société configurée. Cliquez sur "➕ Ajouter une société" pour commencer.</div>';
    }

    companies.forEach((company) => {
        const isEnabled = company.enabled;
        const displayName = company.name;

        html += `
            <div style="
                display: flex; align-items: center; gap: 1rem; padding: 1rem 1.2rem;
                background: ${isEnabled ? '#2d2d30' : '#1e1e1e'}; border: 2px solid ${isEnabled ? company.color : '#3e3e42'};
                border-radius: 12px; margin-bottom: 0.8rem; transition: all 0.3s;
                opacity: ${isEnabled ? '1' : '0.5'};
            ">
                <!-- ID badge -->
                <div style="
                    min-width: 36px; height: 36px; border-radius: 50%; background: ${company.color};
                    display: flex; align-items: center; justify-content: center;
                    color: #fff; font-weight: 800; font-size: 0.95rem; flex-shrink: 0;
                ">${company.id}</div>

                <!-- Color indicator -->
                <div style="width: 8px; height: 50px; border-radius: 4px; background: ${company.color}; flex-shrink: 0;"></div>

                <!-- Company info -->
                <div style="flex: 1; min-width: 0;">
                    <div style="color: #fff; font-weight: 700; font-size: 1.05rem;">${displayName}</div>
                    <div style="color: #888; font-size: 0.8rem;">Code: ${company.code} &nbsp;|&nbsp; ID: #${company.id}</div>
                </div>

                <!-- Toggle switch -->
                <div style="display: flex; align-items: center; gap: 0.5rem; flex-shrink: 0;">
                    <span style="color: ${isEnabled ? '#4CAF50' : '#f44336'}; font-size: 0.85rem; font-weight: 600;">
                        ${isEnabled ? '✅ Activée' : '❌ Désactivée'}
                    </span>
                    <button onclick="toggleCompanyEnabled('${company.code}')" style="
                        width: 52px; height: 28px; border-radius: 14px; border: none; cursor: pointer;
                        background: ${isEnabled ? '#4CAF50' : '#555'}; position: relative; transition: all 0.3s;
                    ">
                        <div style="
                            width: 22px; height: 22px; border-radius: 50%; background: #fff;
                            position: absolute; top: 3px; ${isEnabled ? 'right: 3px;' : 'left: 3px;'}
                            transition: all 0.3s; box-shadow: 0 2px 4px rgba(0,0,0,0.3);
                        "></div>
                    </button>
                </div>

                <!-- Edit button -->
                <button onclick="editCompanySettings('${company.code}')" style="
                    padding: 0.5rem 1rem; background: linear-gradient(135deg, ${company.color}, ${company.color}dd);
                    color: #fff; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; font-size: 0.85rem;
                    flex-shrink: 0;
                ">⚙️ Modifier</button>

                <!-- Delete button -->
                <button onclick="deleteCompany('${company.code}')" style="
                    padding: 0.5rem 0.8rem; background: #f44336; color: #fff; border: none;
                    border-radius: 8px; cursor: pointer; font-weight: 600; font-size: 0.85rem; flex-shrink: 0;
                ">🗑️</button>
            </div>
        `;
    });

    container.innerHTML = html;
}

// Toggle company enabled/disabled (ONLINE)
window.toggleCompanyEnabled = async function(code) {
    const companies = _getAllCompanies();
    const company = companies.find(c => c.code === code);
    if (company) {
        const newEnabled = !company.enabled;
        try {
            const result = await window.electron.pdfCompanies.update(code, { enabled: newEnabled });
            if (result && result.success) {
                company.enabled = newEnabled;
                renderCompanyList();
                Object.assign(PDF_COMPANY_INFO, buildCompanyInfoMap());
                if (window.notify) {
                    window.notify.success('✅', `${company.name} ${newEnabled ? 'activée' : 'désactivée'}`, 2000);
                }
            } else {
                if (window.notify) window.notify.error('Erreur', result?.error || 'Erreur serveur', 3000);
            }
        } catch (e) {
            console.error('Error toggling company:', e);
            if (window.notify) window.notify.error('Erreur', 'Impossible de modifier le statut', 3000);
        }
    }
};

// Edit company settings (ONLINE)
window.editCompanySettings = function(code) {
    currentPdfSettingsCompany = code;
    document.getElementById('pdfCompanyList').style.display = 'none';
    document.getElementById('pdfCompanyEditor').style.display = 'block';

    const companies = _getAllCompanies();
    const company = companies.find(c => c.code === code);
    if (!company) return;

    const displayName = company.name;

    document.getElementById('editorCompanyTitle').innerHTML = `<span style="color: ${company.color};">🏭 ${displayName}</span> <span style="color: #888; font-size: 0.85rem;">(${code}) - ID: #${company.id}</span>`;

    // Load name
    const nameInput = document.getElementById('pdfCompanyNameInput');
    if (nameInput) {
        nameInput.value = company.name;
        nameInput.placeholder = company.name;
    }

    // Load info
    document.getElementById('infoCompanyName').textContent = displayName;

    // Load table style selector
    const currentStyle = company.tableStyle || 'style1';
    console.log(`📊 [Edit] Loading table style for ${code}: "${currentStyle}" (raw: "${company.tableStyle}")`);
    const styleGrid = document.getElementById('editTableStyleGrid');
    const styleInput = document.getElementById('editSelectedTableStyle');
    if (styleGrid && styleInput) {
        styleInput.value = currentStyle;
        styleGrid.innerHTML = TABLE_STYLES.map(style => {
            const isSelected = style.id === currentStyle;
            return `<button class="edit-table-style-btn" data-style="${style.id}" style="
                padding: 0.5rem; background: ${isSelected ? '#1a2e1a' : '#1e1e1e'}; 
                border: ${isSelected ? '2px solid #4CAF50' : '1px solid #3e3e42'};
                border-radius: 8px; cursor: pointer; text-align: center; transition: all 0.2s;
            ">
                <div style="display:flex;justify-content:center;margin-bottom:0.3rem;">${getTableStylePreviewSVG(style.id, company.color)}</div>
                <div style="color: #fff; font-size: 0.8rem; font-weight: 600;">${style.name}</div>
                <div style="color: #888; font-size: 0.65rem; margin-top: 0.1rem;">${style.desc}</div>
            </button>`;
        }).join('');

        // Add click handlers for style buttons
        styleGrid.querySelectorAll('.edit-table-style-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                styleGrid.querySelectorAll('.edit-table-style-btn').forEach(b => {
                    b.style.border = '1px solid #3e3e42';
                    b.style.background = '#1e1e1e';
                });
                this.style.border = '2px solid #4CAF50';
                this.style.background = '#1a2e1a';
                styleInput.value = this.dataset.style;
            });
        });
    }

    // Load image previews from company data (stored in DB)
    loadImagePreview('header', company);
    loadImagePreview('footer', company);
    loadImagePreview('signature', company);
};

// Hide company editor, show list
window.hideCompanyEditor = async function() {
    document.getElementById('pdfCompanyList').style.display = 'block';
    document.getElementById('pdfCompanyEditor').style.display = 'none';
    currentPdfSettingsCompany = null;
    await _loadCompaniesFromAPI();
    renderCompanyList();
};

// Table style definitions (7 styles)
const TABLE_STYLES = [
    { id: 'style1', name: 'Classique', desc: 'Gris, bordures simples' },
    { id: 'style2', name: 'Moderne', desc: 'Couleur de votre société' },
    { id: 'style3', name: 'Minimal', desc: 'Sans bordures, lignes fines' },
    { id: 'style4', name: 'Professionnel', desc: 'Noir, bordures épaisses' },
    { id: 'style5', name: 'Coloré', desc: 'Bleu dégradé, couleurs vives' },
    { id: 'style6', name: 'Compact', desc: 'Petit texte, dense' },
    { id: 'style7', name: 'Sans couleur', desc: 'Noir et blanc uniquement' }
];

// Helper: lighten a hex color for zebra rows
function lightenColor(hex, amount) {
    hex = hex.replace('#', '');
    const r = Math.min(255, parseInt(hex.substring(0, 2), 16) + amount);
    const g = Math.min(255, parseInt(hex.substring(2, 4), 16) + amount);
    const b = Math.min(255, parseInt(hex.substring(4, 6), 16) + amount);
    return `rgb(${r},${g},${b})`;
}
// Helper: darken a hex color for gradient
function darkenColor(hex, amount) {
    hex = hex.replace('#', '');
    const r = Math.max(0, parseInt(hex.substring(0, 2), 16) - amount);
    const g = Math.max(0, parseInt(hex.substring(2, 4), 16) - amount);
    const b = Math.max(0, parseInt(hex.substring(4, 6), 16) - amount);
    return `rgb(${r},${g},${b})`;
}

// Generate inline SVG mini-table preview for each style
function getTableStylePreviewSVG(styleId, companyColor) {
    // Each style has its own FIXED color palette (matching PDF output exactly)
    // Only style2 (Moderne) uses the company color
    let cc;
    if (styleId === 'style2') {
        cc = companyColor || '#2196F3';
    } else if (styleId === 'style5') {
        cc = '#2196F3'; // fixed blue
    } else {
        cc = '#505050'; // not used for other styles
    }
    const ccLight = lightenColor(cc, 180);
    const ccDark = darkenColor(cc, 50);
    const w = 120, h = 60;
    const hdrH = 12, rowH = 10;

    if (styleId === 'style1') {
        return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
            <rect x="0" y="0" width="${w}" height="${h}" rx="3" fill="#fff" stroke="#ccc" stroke-width="1"/>
            <rect x="1" y="1" width="${w-2}" height="${hdrH}" fill="#505050"/>
            <text x="6" y="9" fill="#fff" font-size="6" font-weight="bold">Désignation</text>
            <text x="80" y="9" fill="#fff" font-size="5">Qté</text>
            <text x="100" y="9" fill="#fff" font-size="5">Total</text>
            <rect x="1" y="${hdrH+1}" width="${w-2}" height="${rowH}" fill="#f5f5f5"/>
            <text x="6" y="${hdrH+8}" fill="#333" font-size="5">Produit A</text>
            <text x="82" y="${hdrH+8}" fill="#333" font-size="5">10</text>
            <text x="100" y="${hdrH+8}" fill="#333" font-size="5">500</text>
            <line x1="1" y1="${hdrH+rowH+1}" x2="${w-1}" y2="${hdrH+rowH+1}" stroke="#ddd" stroke-width="0.5"/>
            <rect x="1" y="${hdrH+rowH+1}" width="${w-2}" height="${rowH}" fill="#fff"/>
            <text x="6" y="${hdrH+rowH+8}" fill="#333" font-size="5">Produit B</text>
            <text x="82" y="${hdrH+rowH+8}" fill="#333" font-size="5">5</text>
            <text x="100" y="${hdrH+rowH+8}" fill="#333" font-size="5">250</text>
            <line x1="1" y1="${hdrH+2*rowH+1}" x2="${w-1}" y2="${hdrH+2*rowH+1}" stroke="#ddd" stroke-width="0.5"/>
            <rect x="60" y="${h-14}" width="58" height="12" rx="2" fill="#505050"/>
            <text x="64" y="${h-6}" fill="#fff" font-size="5" font-weight="bold">Total: 750 DH</text>
        </svg>`;
    } else if (styleId === 'style2') {
        return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
            <rect x="0" y="0" width="${w}" height="${h}" rx="3" fill="#fff" stroke="#ccc" stroke-width="1"/>
            <rect x="1" y="1" width="${w-2}" height="${hdrH}" fill="${cc}"/>
            <text x="6" y="9" fill="#fff" font-size="6" font-weight="bold">Désignation</text>
            <text x="80" y="9" fill="#fff" font-size="5">Qté</text>
            <text x="100" y="9" fill="#fff" font-size="5">Total</text>
            <rect x="1" y="${hdrH+1}" width="${w-2}" height="${rowH}" fill="${ccLight}"/>
            <text x="6" y="${hdrH+8}" fill="#333" font-size="5">Produit A</text>
            <text x="82" y="${hdrH+8}" fill="#333" font-size="5">10</text>
            <text x="100" y="${hdrH+8}" fill="#333" font-size="5">500</text>
            <rect x="1" y="${hdrH+rowH+1}" width="${w-2}" height="${rowH}" fill="#fff"/>
            <text x="6" y="${hdrH+rowH+8}" fill="#333" font-size="5">Produit B</text>
            <text x="82" y="${hdrH+rowH+8}" fill="#333" font-size="5">5</text>
            <text x="100" y="${hdrH+rowH+8}" fill="#333" font-size="5">250</text>
            <rect x="60" y="${h-14}" width="58" height="12" rx="2" fill="${cc}"/>
            <text x="64" y="${h-6}" fill="#fff" font-size="5" font-weight="bold">Total: 750 DH</text>
        </svg>`;
    } else if (styleId === 'style3') {
        return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
            <rect x="0" y="0" width="${w}" height="${h}" rx="3" fill="#fff" stroke="#eee" stroke-width="1"/>
            <text x="6" y="9" fill="#333" font-size="6" font-weight="bold">Désignation</text>
            <text x="80" y="9" fill="#333" font-size="5">Qté</text>
            <text x="100" y="9" fill="#333" font-size="5">Total</text>
            <line x1="4" y1="${hdrH}" x2="${w-4}" y2="${hdrH}" stroke="#bbb" stroke-width="0.5"/>
            <text x="6" y="${hdrH+8}" fill="#555" font-size="5">Produit A</text>
            <text x="82" y="${hdrH+8}" fill="#555" font-size="5">10</text>
            <text x="100" y="${hdrH+8}" fill="#555" font-size="5">500</text>
            <line x1="4" y1="${hdrH+rowH+1}" x2="${w-4}" y2="${hdrH+rowH+1}" stroke="#ddd" stroke-width="0.3"/>
            <text x="6" y="${hdrH+rowH+8}" fill="#555" font-size="5">Produit B</text>
            <text x="82" y="${hdrH+rowH+8}" fill="#555" font-size="5">5</text>
            <text x="100" y="${hdrH+rowH+8}" fill="#555" font-size="5">250</text>
            <line x1="60" y1="${h-14}" x2="${w-4}" y2="${h-14}" stroke="#333" stroke-width="0.5"/>
            <text x="64" y="${h-6}" fill="#333" font-size="5" font-weight="bold">Total: 750 DH</text>
        </svg>`;
    } else if (styleId === 'style4') {
        return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
            <rect x="0" y="0" width="${w}" height="${h}" rx="3" fill="#fff" stroke="#000" stroke-width="1.5"/>
            <rect x="1" y="1" width="${w-2}" height="${hdrH}" fill="#000"/>
            <text x="6" y="9" fill="#fff" font-size="6" font-weight="bold">Désignation</text>
            <text x="80" y="9" fill="#fff" font-size="5">Qté</text>
            <text x="100" y="9" fill="#fff" font-size="5">Total</text>
            <rect x="1" y="${hdrH+1}" width="${w-2}" height="${rowH}" fill="#f0f0f0"/>
            <text x="6" y="${hdrH+8}" fill="#000" font-size="5">Produit A</text>
            <text x="82" y="${hdrH+8}" fill="#000" font-size="5">10</text>
            <text x="100" y="${hdrH+8}" fill="#000" font-size="5">500</text>
            <line x1="1" y1="${hdrH+rowH+1}" x2="${w-1}" y2="${hdrH+rowH+1}" stroke="#999" stroke-width="0.5"/>
            <rect x="1" y="${hdrH+rowH+1}" width="${w-2}" height="${rowH}" fill="#fff"/>
            <text x="6" y="${hdrH+rowH+8}" fill="#000" font-size="5">Produit B</text>
            <text x="82" y="${hdrH+rowH+8}" fill="#000" font-size="5">5</text>
            <text x="100" y="${hdrH+rowH+8}" fill="#000" font-size="5">250</text>
            <rect x="60" y="${h-14}" width="58" height="12" rx="1" fill="#000"/>
            <text x="64" y="${h-6}" fill="#fff" font-size="5" font-weight="bold">Total: 750 DH</text>
        </svg>`;
    } else if (styleId === 'style5') {
        return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
            <defs><linearGradient id="g5_${cc.replace('#','')}" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" style="stop-color:${cc}"/><stop offset="100%" style="stop-color:${ccDark}"/></linearGradient></defs>
            <rect x="0" y="0" width="${w}" height="${h}" rx="3" fill="#fff" stroke="${cc}" stroke-width="1"/>
            <rect x="1" y="1" width="${w-2}" height="${hdrH}" fill="url(#g5_${cc.replace('#','')})"/>
            <text x="6" y="9" fill="#fff" font-size="6" font-weight="bold">Désignation</text>
            <text x="80" y="9" fill="#fff" font-size="5">Qté</text>
            <text x="100" y="9" fill="#fff" font-size="5">Total</text>
            <rect x="1" y="${hdrH+1}" width="${w-2}" height="${rowH}" fill="${ccLight}"/>
            <text x="6" y="${hdrH+8}" fill="#333" font-size="5">Produit A</text>
            <text x="82" y="${hdrH+8}" fill="#333" font-size="5">10</text>
            <text x="100" y="${hdrH+8}" fill="#333" font-size="5">500</text>
            <rect x="1" y="${hdrH+rowH+1}" width="${w-2}" height="${rowH}" fill="#fafafa"/>
            <text x="6" y="${hdrH+rowH+8}" fill="#333" font-size="5">Produit B</text>
            <text x="82" y="${hdrH+rowH+8}" fill="#333" font-size="5">5</text>
            <text x="100" y="${hdrH+rowH+8}" fill="#333" font-size="5">250</text>
            <rect x="60" y="${h-14}" width="58" height="12" rx="2" fill="url(#g5_${cc.replace('#','')})"/>
            <text x="64" y="${h-6}" fill="#fff" font-size="5" font-weight="bold">Total: 750 DH</text>
        </svg>`;
    } else if (styleId === 'style6') {
        return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
            <rect x="0" y="0" width="${w}" height="${h}" rx="3" fill="#fff" stroke="#ccc" stroke-width="1"/>
            <rect x="1" y="1" width="${w-2}" height="10" fill="#666"/>
            <text x="6" y="8" fill="#fff" font-size="5" font-weight="bold">Désignation</text>
            <text x="80" y="8" fill="#fff" font-size="4">Qté</text>
            <text x="100" y="8" fill="#fff" font-size="4">Total</text>
            <rect x="1" y="12" width="${w-2}" height="8" fill="#f8f8f8"/>
            <text x="6" y="18" fill="#333" font-size="4">Produit A</text>
            <text x="82" y="18" fill="#333" font-size="4">10</text>
            <text x="100" y="18" fill="#333" font-size="4">500</text>
            <line x1="1" y1="20" x2="${w-1}" y2="20" stroke="#ddd" stroke-width="0.3"/>
            <rect x="1" y="20" width="${w-2}" height="8" fill="#fff"/>
            <text x="6" y="26" fill="#333" font-size="4">Produit B</text>
            <text x="82" y="26" fill="#333" font-size="4">5</text>
            <text x="100" y="26" fill="#333" font-size="4">250</text>
            <line x1="1" y1="28" x2="${w-1}" y2="28" stroke="#ddd" stroke-width="0.3"/>
            <rect x="1" y="28" width="${w-2}" height="8" fill="#f8f8f8"/>
            <text x="6" y="34" fill="#333" font-size="4">Produit C</text>
            <text x="82" y="34" fill="#333" font-size="4">3</text>
            <text x="100" y="34" fill="#333" font-size="4">150</text>
            <rect x="60" y="${h-14}" width="58" height="12" rx="2" fill="#666"/>
            <text x="64" y="${h-6}" fill="#fff" font-size="5" font-weight="bold">Total: 900 DH</text>
        </svg>`;
    } else if (styleId === 'style7') {
        return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
            <rect x="0" y="0" width="${w}" height="${h}" rx="3" fill="#fff" stroke="#999" stroke-width="1"/>
            <rect x="1" y="1" width="${w-2}" height="${hdrH}" fill="#fff" stroke-width="0"/>
            <text x="6" y="9" fill="#000" font-size="6" font-weight="bold">Désignation</text>
            <text x="80" y="9" fill="#000" font-size="5" font-weight="bold">Qté</text>
            <text x="100" y="9" fill="#000" font-size="5" font-weight="bold">Total</text>
            <line x1="1" y1="${hdrH}" x2="${w-1}" y2="${hdrH}" stroke="#000" stroke-width="1"/>
            <text x="6" y="${hdrH+8}" fill="#000" font-size="5">Produit A</text>
            <text x="82" y="${hdrH+8}" fill="#000" font-size="5">10</text>
            <text x="100" y="${hdrH+8}" fill="#000" font-size="5">500</text>
            <line x1="1" y1="${hdrH+rowH+1}" x2="${w-1}" y2="${hdrH+rowH+1}" stroke="#999" stroke-width="0.3"/>
            <text x="6" y="${hdrH+rowH+8}" fill="#000" font-size="5">Produit B</text>
            <text x="82" y="${hdrH+rowH+8}" fill="#000" font-size="5">5</text>
            <text x="100" y="${hdrH+rowH+8}" fill="#000" font-size="5">250</text>
            <line x1="60" y1="${h-15}" x2="${w-4}" y2="${h-15}" stroke="#000" stroke-width="1"/>
            <text x="64" y="${h-6}" fill="#000" font-size="5" font-weight="bold">Total: 750 DH</text>
        </svg>`;
    }
    return '';
}

// Generate auto code from company name
function generateAutoCode(name) {
    if (!name) return '';
    // Take first letters of each word, uppercase, max 8 chars
    const words = name.trim().split(/\s+/);
    if (words.length === 1) {
        return words[0].substring(0, 8).toUpperCase().replace(/[^A-Z0-9]/g, '');
    }
    return words.map(w => w[0]).join('').substring(0, 8).toUpperCase().replace(/[^A-Z0-9]/g, '');
}

// Show add company modal
window.showAddCompanyModal = function() {
    const overlay = document.createElement('div');
    overlay.id = 'addCompanyOverlay';
    overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.7);display:flex;align-items:center;justify-content:center;z-index:10000;overflow-y:auto;';

    const usedColors = _getAllCompanies().map(c => c.color);
    const availableColor = COMPANY_COLORS.find(c => !usedColors.includes(c)) || '#2196F3';

    // Auto-generate next ID
    const existingIds = _getAllCompanies().map(c => c.id || 0);
    const nextId = existingIds.length > 0 ? Math.max(...existingIds) + 1 : 1;

    overlay.innerHTML = `
        <div style="background: #2d2d30; border-radius: 16px; padding: 2rem; width: 520px; max-width: 95%; border: 1px solid #3e3e42; margin: 1rem auto; max-height: 90vh; overflow-y: auto;">
            <h3 style="color: #fff; margin: 0 0 1.5rem 0; font-size: 1.2rem;">➕ Ajouter une nouvelle société</h3>
            
            <div style="display: flex; gap: 1rem; margin-bottom: 1rem;">
                <div style="flex: 0 0 80px;">
                    <label style="color: #ccc; font-size: 0.9rem; display: block; margin-bottom: 0.4rem;">ID :</label>
                    <div style="
                        padding: 0.7rem; background: #1a1a1a; border: 1px solid #3e3e42;
                        border-radius: 8px; color: #4CAF50; font-size: 1rem; font-weight: 700;
                        text-align: center;
                    ">#${nextId}</div>
                    <div style="color: #666; font-size: 0.7rem; text-align: center; margin-top: 0.2rem;">Auto</div>
                </div>
                <div style="flex: 1;">
                    <label style="color: #ccc; font-size: 0.9rem; display: block; margin-bottom: 0.4rem;">Nom de la société :</label>
                    <input type="text" id="newCompanyName" placeholder="Ex: Ma Société" oninput="
                        const code = document.getElementById('newCompanyCode');
                        if (code && !code.dataset.manual) code.value = this.value.trim().split(/\\s+/).map(w=>w[0]||'').join('').substring(0,8).toUpperCase().replace(/[^A-Z0-9]/g,'');
                    " style="
                        width: 100%; padding: 0.7rem; background: #1e1e1e; border: 1px solid #3e3e42;
                        border-radius: 8px; color: #fff; font-size: 1rem; outline: none; box-sizing: border-box;
                    ">
                </div>
            </div>

            <div style="margin-bottom: 1rem;">
                <label style="color: #ccc; font-size: 0.9rem; display: block; margin-bottom: 0.4rem;">Code (identifiant unique) : <span style="color: #666; font-size: 0.8rem;">— auto-généré, modifiable</span></label>
                <input type="text" id="newCompanyCode" placeholder="Auto-généré du nom" oninput="this.dataset.manual='1'" style="
                    width: 100%; padding: 0.7rem; background: #1e1e1e; border: 1px solid #3e3e42;
                    border-radius: 8px; color: #fff; font-size: 1rem; font-weight: 700; text-transform: uppercase;
                    outline: none; box-sizing: border-box;
                ">
            </div>

            <div style="margin-bottom: 1rem;">
                <label style="color: #ccc; font-size: 0.9rem; display: block; margin-bottom: 0.4rem;">Couleur :</label>
                <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                    ${COMPANY_COLORS.map(color => `
                        <button class="color-pick-btn" data-color="${color}" onclick="
                            document.querySelectorAll('.color-pick-btn').forEach(b=>b.style.outline='none');
                            this.style.outline='3px solid #fff';
                            document.getElementById('selectedNewColor').value='${color}';
                            if(window._refreshAddStylePreviews) window._refreshAddStylePreviews('${color}');
                        " style="
                            width: 36px; height: 36px; border-radius: 50%; background: ${color}; border: 2px solid #555;
                            cursor: pointer; ${color === availableColor ? 'outline: 3px solid #fff;' : ''}
                        "></button>
                    `).join('')}
                    <input type="hidden" id="selectedNewColor" value="${availableColor}">
                </div>
            </div>

            <div style="margin-bottom: 1.5rem;">
                <label style="color: #ccc; font-size: 0.9rem; display: block; margin-bottom: 0.6rem;">Style du tableau PDF :</label>
                <div id="addTableStyleGrid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.6rem;">
                </div>
                <input type="hidden" id="selectedTableStyle" value="style1">
            </div>

            <div style="background: #1a2e1a; border: 1px solid #4CAF5044; border-radius: 8px; padding: 0.8rem; margin-bottom: 1rem;">
                <div style="color: #4CAF50; font-size: 0.85rem; font-weight: 600;">📦 Base de données auto-créée</div>
                <div style="color: #888; font-size: 0.75rem; margin-top: 0.3rem;">
                    Les tables <code style="color:#aaa;">devis_numbers</code>, <code style="color:#aaa;">pdf_paths</code>, <code style="color:#aaa;">devis_data</code> et <code style="color:#aaa;">devis_products</code> seront créées automatiquement.
                </div>
            </div>

            <div style="display: flex; gap: 1rem;">
                <button onclick="document.getElementById('addCompanyOverlay').remove();" style="
                    flex: 1; padding: 0.8rem; background: #555; color: #fff; border: none;
                    border-radius: 8px; cursor: pointer; font-weight: 600;
                ">Annuler</button>
                <button onclick="addNewCompany()" style="
                    flex: 1; padding: 0.8rem; background: linear-gradient(135deg, #4CAF50, #388E3C); color: #fff;
                    border: none; border-radius: 8px; cursor: pointer; font-weight: 700;
                ">✅ Ajouter</button>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);

    // Populate style grid with SVG previews using the initial color
    function renderAddStyleGrid(color) {
        const grid = document.getElementById('addTableStyleGrid');
        const currentSelected = document.getElementById('selectedTableStyle')?.value || 'style1';
        if (!grid) return;
        grid.innerHTML = TABLE_STYLES.map((style, i) => {
            const isSelected = style.id === currentSelected;
            return `<button class="table-style-btn" data-style="${style.id}" style="
                padding: 0.5rem; background: ${isSelected ? '#1a2e1a' : '#1e1e1e'}; 
                border: ${isSelected ? '2px solid #4CAF50' : '1px solid #3e3e42'};
                border-radius: 8px; cursor: pointer; text-align: center; transition: all 0.2s;
            ">
                <div style="display:flex;justify-content:center;margin-bottom:0.3rem;">${getTableStylePreviewSVG(style.id, color)}</div>
                <div style="color: #fff; font-size: 0.8rem; font-weight: 600;">${style.name}</div>
                <div style="color: #888; font-size: 0.65rem; margin-top: 0.1rem;">${style.desc}</div>
            </button>`;
        }).join('');
        // Add click handlers
        grid.querySelectorAll('.table-style-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                grid.querySelectorAll('.table-style-btn').forEach(b => {
                    b.style.border = '1px solid #3e3e42';
                    b.style.background = '#1e1e1e';
                });
                this.style.border = '2px solid #4CAF50';
                this.style.background = '#1a2e1a';
                document.getElementById('selectedTableStyle').value = this.dataset.style;
            });
        });
    }
    renderAddStyleGrid(availableColor);
    window._refreshAddStylePreviews = renderAddStyleGrid;
};

// Add new company (ONLINE)
window.addNewCompany = async function() {
    const codeInput = document.getElementById('newCompanyCode');
    const nameInput = document.getElementById('newCompanyName');
    const colorInput = document.getElementById('selectedNewColor');
    const tableStyleInput = document.getElementById('selectedTableStyle');

    const code = (codeInput.value || '').trim().toUpperCase().replace(/[^A-Z0-9_]/g, '');
    const name = (nameInput.value || '').trim();
    const color = colorInput.value || '#2196F3';
    const tableStyle = tableStyleInput ? tableStyleInput.value : 'style1';

    if (!code || !name) {
        if (window.notify) window.notify.error('Erreur', 'Veuillez remplir le code et le nom de la société.', 3000);
        return;
    }

    try {
        const result = await window.electron.pdfCompanies.create({
            company_code: code,
            company_name: name,
            color: color,
            enabled: true,
            table_style: tableStyle
        });

        if (result && result.success) {
            // Reload from API to get the new ID
            await _loadCompaniesFromAPI();
            Object.assign(PDF_COMPANY_INFO, buildCompanyInfoMap());

            document.getElementById('addCompanyOverlay').remove();
            renderCompanyList();

            const newCompany = _cachedCompanies.find(c => c.code === code);
            const newId = newCompany ? newCompany.id : '?';
            if (window.notify) window.notify.success('✅', `Société "${name}" ajoutée avec ID #${newId} — Tables DB créées automatiquement!`, 4000);
        } else {
            if (window.notify) window.notify.error('Erreur', result?.error || 'Erreur serveur', 3000);
        }
    } catch (e) {
        console.error('Error creating company:', e);
        if (window.notify) window.notify.error('Erreur', 'Impossible de créer la société', 3000);
    }
};

// Delete a company (ONLINE)
window.deleteCompany = async function(code) {
    const companies = _getAllCompanies();
    const company = companies.find(c => c.code === code);
    if (!company) return;

    const displayName = company.name;
    if (!confirm(`Êtes-vous sûr de vouloir supprimer "${displayName}" ?`)) return;

    try {
        const result = await window.electron.pdfCompanies.delete(code);
        if (result && result.success) {
            await _loadCompaniesFromAPI();
            Object.keys(PDF_COMPANY_INFO).forEach(k => { if (!_cachedCompanies.find(c => c.code === k)) delete PDF_COMPANY_INFO[k]; });
            Object.assign(PDF_COMPANY_INFO, buildCompanyInfoMap());
            renderCompanyList();
            if (window.notify) window.notify.success('✅', `Société "${displayName}" supprimée.`, 3000);
        } else {
            if (window.notify) window.notify.error('Erreur', result?.error || 'Impossible de supprimer', 3000);
        }
    } catch (e) {
        console.error('Error deleting company:', e);
        if (window.notify) window.notify.error('Erreur', 'Impossible de supprimer la société', 3000);
    }
};

// Load image preview (from company data stored in DB)
function loadImagePreview(type, company) {
    const previewEl = document.getElementById(`pdf${capitalize(type)}Preview`);
    const statusEl = document.getElementById(`info${capitalize(type)}Status`);
    if (!previewEl) return;

    // Priority: base64 image stored in DB > file path
    const imageKey = `${type}Image`;
    const pathKey = `${type}Path`;
    const imgSrc = company[imageKey] || company[pathKey] || '';

    if (!imgSrc) {
        previewEl.innerHTML = '<div style="color: #888; font-size: 0.85rem;">📷 Aucune image configurée</div>';
        if (statusEl) statusEl.innerHTML = '<span style="color: #888;">— Non configuré</span>';
        return;
    }

    const img = new Image();
    img.onload = function() {
        previewEl.innerHTML = `<img src="${imgSrc}" style="max-width: 100%; max-height: 120px; border-radius: 4px;">`;
        if (statusEl) statusEl.innerHTML = '<span style="color: #4CAF50;">✅ Chargé</span>';
    };
    img.onerror = function() {
        previewEl.innerHTML = `<div style="color: #f44336; font-size: 0.85rem;">❌ Image non trouvée</div>`;
        if (statusEl) statusEl.innerHTML = '<span style="color: #f44336;">❌ Non trouvé</span>';
    };
    img.src = imgSrc;
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Upload PDF image (ONLINE - saves base64 to DB)
window.uploadPdfImage = function(type) {
    const fileInput = document.getElementById(`pdf${capitalize(type)}Upload`);
    const file = fileInput.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async function(e) {
        const dataUrl = e.target.result;

        // Save image to DB via API
        const updateData = {};
        updateData[`${type}_image`] = dataUrl;
        try {
            const result = await window.electron.pdfCompanies.update(currentPdfSettingsCompany, updateData);
            if (result && result.success) {
                // Update local cache
                const company = _cachedCompanies.find(c => c.code === currentPdfSettingsCompany);
                if (company) company[`${type}Image`] = dataUrl;

                const previewEl = document.getElementById(`pdf${capitalize(type)}Preview`);
                if (previewEl) previewEl.innerHTML = `<img src="${dataUrl}" style="max-width: 100%; max-height: 120px; border-radius: 4px;">`;

                const statusEl = document.getElementById(`info${capitalize(type)}Status`);
                if (statusEl) statusEl.innerHTML = '<span style="color: #4CAF50;">✅ Sauvegardé en ligne</span>';

                if (window.notify) window.notify.success('✅', `Image ${type} sauvegardée en ligne`, 2000);
            } else {
                if (window.notify) window.notify.error('Erreur', result?.error || 'Erreur serveur', 3000);
            }
        } catch (err) {
            console.error('Error uploading image:', err);
            if (window.notify) window.notify.error('Erreur', 'Impossible de sauvegarder l\'image', 3000);
        }
    };
    reader.readAsDataURL(file);
};

// Save PDF settings for current company (ONLINE)
window.savePdfSettings = async function() {
    if (!currentPdfSettingsCompany) return;

    const nameInput = document.getElementById('pdfCompanyNameInput');
    const newName = nameInput ? nameInput.value.trim() : '';

    if (!newName) {
        if (window.notify) window.notify.error('Erreur', 'Le nom de la société ne peut pas être vide.', 3000);
        return;
    }

    // Get selected table style
    const tableStyleInput = document.getElementById('editSelectedTableStyle');
    const tableStyle = tableStyleInput ? tableStyleInput.value : 'style1';
    console.log(`💾 [Save] Company: ${currentPdfSettingsCompany}, Name: ${newName}, Table Style: ${tableStyle}`);
    console.log(`💾 [Save] Hidden input element:`, tableStyleInput);

    try {
        const updateData = {
            company_name: newName,
            table_style: tableStyle
        };
        console.log(`💾 [Save] Sending update data:`, JSON.stringify(updateData));
        const result = await window.electron.pdfCompanies.update(currentPdfSettingsCompany, updateData);

        console.log(`💾 [Save] Result:`, JSON.stringify(result));
        if (result && result.success) {
            // Reload from API to ensure cache is in sync with DB
            await _loadCompaniesFromAPI();
            Object.assign(PDF_COMPANY_INFO, buildCompanyInfoMap());

            const company = _cachedCompanies.find(c => c.code === currentPdfSettingsCompany);
            console.log(`💾 [Save] After reload - company tableStyle: "${company?.tableStyle}"`);

            const infoEl = document.getElementById('infoCompanyName');
            if (infoEl) infoEl.textContent = newName;

            const titleEl = document.getElementById('editorCompanyTitle');
            if (titleEl && company) {
                titleEl.innerHTML = `<span style="color: ${company.color};">🏭 ${newName}</span> <span style="color: #888; font-size: 0.85rem;">(${company.code}) - ID: #${company.id}</span>`;
            }

            if (window.notify) window.notify.success('✅ Sauvegardé', `Paramètres pour "${newName}" sauvegardés (style: ${tableStyle})`, 3000);
        } else {
            if (window.notify) window.notify.error('Erreur', result?.error || 'Erreur serveur', 3000);
        }
    } catch (e) {
        console.error('Error saving PDF settings:', e);
        if (window.notify) window.notify.error('Erreur', 'Impossible de sauvegarder', 3000);
    }
};

// Get PDF settings from cache (for backward compatibility)
function getPdfSettings(company) {
    const c = _cachedCompanies.find(co => co.code === company);
    if (c) {
        return {
            companyName: c.name,
            headerImage: c.headerImage || null,
            footerImage: c.footerImage || null,
            signatureImage: c.signatureImage || null
        };
    }
    return {};
}

// Global function to get PDF settings for a company
window.getPdfCompanySettings = function(company) {
    return getPdfSettings(company);
};

// Global function to get custom company name or fallback
window.getPdfCompanyName = function(company) {
    const companies = _getAllCompanies();
    const c = companies.find(co => co.code === company);
    if (c) return c.name;
    const info = PDF_COMPANY_INFO[company];
    return info ? info.name : company;
};

// Global function to get custom company name for filename
window.getPdfCompanyFileName = function(company) {
    const name = window.getPdfCompanyName(company);
    return name.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_éèêëàâäùûüôöîïçÉÈÊËÀÂÄÙÛÜÔÖÎÏÇ]/g, '');
};

// Global function to get custom image or fallback
window.getPdfCompanyImage = function(company, type) {
    const companies = _getAllCompanies();
    const c = companies.find(co => co.code === company);
    if (!c) return null;

    // Priority: base64 image from DB > file path
    const imageKey = `${type}Image`;
    const pathKey = `${type}Path`;
    return c[imageKey] || c[pathKey] || null;
};

// Global function to check if a company is enabled
window.isCompanyEnabled = function(companyCode) {
    const companies = _getAllCompanies();
    const c = companies.find(co => co.code === companyCode);
    return c ? c.enabled : false;
};

// Global function to get all enabled companies
window.getEnabledCompanies = function() {
    return _getEnabledCompanies();
};

// Global function to get all companies
window.getAllPdfCompanies = function() {
    return _getAllCompanies();
};

// Initialize PDF Settings page (ONLINE - load from API first)
window.initPdfSettingsPage = async function() {
    console.log('🔄 [PDF Settings] Loading companies from API...');
    await _loadCompaniesFromAPI();
    Object.assign(PDF_COMPANY_INFO, buildCompanyInfoMap());
    renderCompanyList();
    console.log('✅ PDF Settings page initialized (ONLINE)');
};
