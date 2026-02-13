// PDF Settings Page - Manage Companies with Enable/Disable + Header, Footer, Signature

// Default companies (built-in)
const DEFAULT_COMPANIES = [
    { code: 'SKM', name: 'SMART SERVICES', color: '#FF9800', headerPath: 'SKM/Hesder.png', footerPath: 'SKM/Footer.png', signaturePath: 'SKM/signature.png', dbName: 'dbSmartS' },
    { code: 'SAAISS', name: 'MSH3 SERVICES', color: '#9C27B0', headerPath: 'SAAISS/Hesder.png', footerPath: 'SAAISS/Footer.png', signaturePath: 'SAAISS/signature.png', dbName: 'dbMsh3' },
    { code: 'BENALI', name: 'BEN ALI', color: '#4CAF50', headerPath: 'BEN ALI/Hesder.png', footerPath: 'BEN ALI/Footer.png', signaturePath: 'BEN ALI/signature.png', dbName: 'dbBenAli' }
];

// Available colors for new companies
const COMPANY_COLORS = ['#FF9800', '#9C27B0', '#4CAF50', '#2196F3', '#f44336', '#E91E63', '#00BCD4', '#FF5722', '#795548', '#607D8B'];

// Get all companies from localStorage (or defaults)
function _getAllCompanies() {
    try {
        const saved = localStorage.getItem('pdfCompanies');
        if (saved) return JSON.parse(saved);
    } catch (e) {
        console.error('Error loading companies:', e);
    }
    // First time: initialize from defaults (all enabled)
    const companies = DEFAULT_COMPANIES.map(c => ({ ...c, enabled: true }));
    try { localStorage.setItem('pdfCompanies', JSON.stringify(companies)); } catch(e) {}
    return companies;
}

// Save all companies to localStorage
function _saveAllCompanies(companies) {
    localStorage.setItem('pdfCompanies', JSON.stringify(companies));
}

// Get only enabled companies
function _getEnabledCompanies() {
    return _getAllCompanies().filter(c => c.enabled);
}

// Current selected company for editing
let currentPdfSettingsCompany = null;

// Legacy compat: PDF_COMPANY_INFO object (dynamically built)
function buildCompanyInfoMap() {
    const map = {};
    _getAllCompanies().forEach(c => {
        map[c.code] = { name: c.name, color: c.color, headerPath: c.headerPath || '', footerPath: c.footerPath || '', signaturePath: c.signaturePath || '' };
    });
    return map;
}
const PDF_COMPANY_INFO = buildCompanyInfoMap();

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

    companies.forEach((company, index) => {
        const isEnabled = company.enabled;
        const displayName = getPdfSettings(company.code).companyName || company.name;
        const isBuiltIn = DEFAULT_COMPANIES.some(d => d.code === company.code);

        html += `
            <div style="
                display: flex; align-items: center; gap: 1rem; padding: 1rem 1.2rem;
                background: ${isEnabled ? '#2d2d30' : '#1e1e1e'}; border: 2px solid ${isEnabled ? company.color : '#3e3e42'};
                border-radius: 12px; margin-bottom: 0.8rem; transition: all 0.3s;
                opacity: ${isEnabled ? '1' : '0.5'};
            ">
                <!-- Color indicator -->
                <div style="width: 8px; height: 50px; border-radius: 4px; background: ${company.color}; flex-shrink: 0;"></div>

                <!-- Company info -->
                <div style="flex: 1; min-width: 0;">
                    <div style="color: #fff; font-weight: 700; font-size: 1.05rem;">${displayName}</div>
                    <div style="color: #888; font-size: 0.8rem;">Code: ${company.code}${!isBuiltIn ? ' (personnalisée)' : ''}</div>
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

                <!-- Delete button (only for custom companies) -->
                ${!isBuiltIn ? `
                    <button onclick="deleteCompany('${company.code}')" style="
                        padding: 0.5rem 0.8rem; background: #f44336; color: #fff; border: none;
                        border-radius: 8px; cursor: pointer; font-weight: 600; font-size: 0.85rem; flex-shrink: 0;
                    ">🗑️</button>
                ` : ''}
            </div>
        `;
    });

    container.innerHTML = html;
}

// Toggle company enabled/disabled
window.toggleCompanyEnabled = function(code) {
    const companies = _getAllCompanies();
    const company = companies.find(c => c.code === code);
    if (company) {
        company.enabled = !company.enabled;
        _saveAllCompanies(companies);
        renderCompanyList();
        // Update legacy map
        Object.assign(PDF_COMPANY_INFO, buildCompanyInfoMap());
        if (window.notify) {
            const name = getPdfSettings(code).companyName || company.name;
            window.notify.success('✅', `${name} ${company.enabled ? 'activée' : 'désactivée'}`, 2000);
        }
    }
};

// Edit company settings
window.editCompanySettings = function(code) {
    currentPdfSettingsCompany = code;
    document.getElementById('pdfCompanyList').style.display = 'none';
    document.getElementById('pdfCompanyEditor').style.display = 'block';

    const companies = _getAllCompanies();
    const company = companies.find(c => c.code === code);
    if (!company) return;

    const settings = getPdfSettings(code);
    const displayName = settings.companyName || company.name;

    document.getElementById('editorCompanyTitle').innerHTML = `<span style="color: ${company.color};">🏭 ${displayName}</span> <span style="color: #888; font-size: 0.85rem;">(${code})</span>`;

    // Load name
    const nameInput = document.getElementById('pdfCompanyNameInput');
    if (nameInput) {
        nameInput.value = settings.companyName || company.name;
        nameInput.placeholder = company.name;
    }

    // Load info
    document.getElementById('infoCompanyName').textContent = displayName;

    // Load image previews
    loadImagePreview('header', company.headerPath || '', code);
    loadImagePreview('footer', company.footerPath || '', code);
    loadImagePreview('signature', company.signaturePath || '', code);
};

// Hide company editor, show list
window.hideCompanyEditor = function() {
    document.getElementById('pdfCompanyList').style.display = 'block';
    document.getElementById('pdfCompanyEditor').style.display = 'none';
    currentPdfSettingsCompany = null;
    renderCompanyList();
};

// Show add company modal
window.showAddCompanyModal = function() {
    const overlay = document.createElement('div');
    overlay.id = 'addCompanyOverlay';
    overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.7);display:flex;align-items:center;justify-content:center;z-index:10000;';

    const usedColors = _getAllCompanies().map(c => c.color);
    const availableColor = COMPANY_COLORS.find(c => !usedColors.includes(c)) || '#2196F3';

    overlay.innerHTML = `
        <div style="background: #2d2d30; border-radius: 16px; padding: 2rem; width: 420px; max-width: 90%; border: 1px solid #3e3e42;">
            <h3 style="color: #fff; margin: 0 0 1.5rem 0; font-size: 1.2rem;">➕ Ajouter une nouvelle société</h3>
            
            <div style="margin-bottom: 1rem;">
                <label style="color: #ccc; font-size: 0.9rem; display: block; margin-bottom: 0.4rem;">Code (identifiant unique) :</label>
                <input type="text" id="newCompanyCode" placeholder="Ex: MYCOMPANY" style="
                    width: 100%; padding: 0.7rem; background: #1e1e1e; border: 1px solid #3e3e42;
                    border-radius: 8px; color: #fff; font-size: 1rem; font-weight: 700; text-transform: uppercase;
                    outline: none; box-sizing: border-box;
                ">
            </div>

            <div style="margin-bottom: 1rem;">
                <label style="color: #ccc; font-size: 0.9rem; display: block; margin-bottom: 0.4rem;">Nom de la société :</label>
                <input type="text" id="newCompanyName" placeholder="Ex: Ma Société" style="
                    width: 100%; padding: 0.7rem; background: #1e1e1e; border: 1px solid #3e3e42;
                    border-radius: 8px; color: #fff; font-size: 1rem; outline: none; box-sizing: border-box;
                ">
            </div>

            <div style="margin-bottom: 1.5rem;">
                <label style="color: #ccc; font-size: 0.9rem; display: block; margin-bottom: 0.4rem;">Couleur :</label>
                <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                    ${COMPANY_COLORS.map(color => `
                        <button class="color-pick-btn" data-color="${color}" onclick="document.querySelectorAll('.color-pick-btn').forEach(b=>b.style.outline='none');this.style.outline='3px solid #fff';document.getElementById('selectedNewColor').value='${color}';" style="
                            width: 36px; height: 36px; border-radius: 50%; background: ${color}; border: 2px solid #555;
                            cursor: pointer; ${color === availableColor ? 'outline: 3px solid #fff;' : ''}
                        "></button>
                    `).join('')}
                    <input type="hidden" id="selectedNewColor" value="${availableColor}">
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
};

// Add new company
window.addNewCompany = function() {
    const codeInput = document.getElementById('newCompanyCode');
    const nameInput = document.getElementById('newCompanyName');
    const colorInput = document.getElementById('selectedNewColor');

    const code = (codeInput.value || '').trim().toUpperCase().replace(/[^A-Z0-9_]/g, '');
    const name = (nameInput.value || '').trim();
    const color = colorInput.value || '#2196F3';

    if (!code || !name) {
        if (window.notify) window.notify.error('Erreur', 'Veuillez remplir le code et le nom de la société.', 3000);
        return;
    }

    const companies = _getAllCompanies();
    if (companies.find(c => c.code === code)) {
        if (window.notify) window.notify.error('Erreur', `Le code "${code}" existe déjà.`, 3000);
        return;
    }

    companies.push({
        code: code,
        name: name,
        color: color,
        headerPath: '',
        footerPath: '',
        signaturePath: '',
        dbName: '',
        enabled: true
    });

    _saveAllCompanies(companies);

    // Save the name in settings too
    const settings = getPdfSettings(code);
    settings.companyName = name;
    savePdfSettingsToStorage(code, settings);

    // Update legacy map
    Object.assign(PDF_COMPANY_INFO, buildCompanyInfoMap());

    document.getElementById('addCompanyOverlay').remove();
    renderCompanyList();

    if (window.notify) window.notify.success('✅', `Société "${name}" ajoutée avec succès !`, 3000);
};

// Delete a custom company
window.deleteCompany = function(code) {
    const companies = _getAllCompanies();
    const company = companies.find(c => c.code === code);
    if (!company) return;

    const isBuiltIn = DEFAULT_COMPANIES.some(d => d.code === code);
    if (isBuiltIn) {
        if (window.notify) window.notify.error('Erreur', 'Impossible de supprimer une société par défaut.', 3000);
        return;
    }

    const displayName = getPdfSettings(code).companyName || company.name;
    if (!confirm(`Êtes-vous sûr de vouloir supprimer "${displayName}" ?`)) return;

    const updated = companies.filter(c => c.code !== code);
    _saveAllCompanies(updated);

    // Remove settings
    localStorage.removeItem(`pdfSettings_${code}`);

    // Update legacy map
    Object.keys(PDF_COMPANY_INFO).forEach(k => { if (!updated.find(c => c.code === k)) delete PDF_COMPANY_INFO[k]; });
    Object.assign(PDF_COMPANY_INFO, buildCompanyInfoMap());

    renderCompanyList();
    if (window.notify) window.notify.success('✅', `Société "${displayName}" supprimée.`, 3000);
};

// Load image preview
function loadImagePreview(type, defaultPath, company) {
    const previewEl = document.getElementById(`pdf${capitalize(type)}Preview`);
    const statusEl = document.getElementById(`info${capitalize(type)}Status`);
    if (!previewEl) return;

    const settings = getPdfSettings(company);
    const customImage = settings[`${type}Image`];
    const imgSrc = customImage || defaultPath;

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

// Upload PDF image
window.uploadPdfImage = function(type) {
    const fileInput = document.getElementById(`pdf${capitalize(type)}Upload`);
    const file = fileInput.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        const dataUrl = e.target.result;
        const settings = getPdfSettings(currentPdfSettingsCompany);
        settings[`${type}Image`] = dataUrl;
        savePdfSettingsToStorage(currentPdfSettingsCompany, settings);

        const previewEl = document.getElementById(`pdf${capitalize(type)}Preview`);
        if (previewEl) previewEl.innerHTML = `<img src="${dataUrl}" style="max-width: 100%; max-height: 120px; border-radius: 4px;">`;

        const statusEl = document.getElementById(`info${capitalize(type)}Status`);
        if (statusEl) statusEl.innerHTML = '<span style="color: #4CAF50;">✅ Personnalisé</span>';

        if (window.notify) window.notify.success('Succès', `Image ${type} mise à jour`, 2000);
    };
    reader.readAsDataURL(file);
};

// Save PDF settings for current company
window.savePdfSettings = function() {
    if (!currentPdfSettingsCompany) return;

    const settings = getPdfSettings(currentPdfSettingsCompany);
    const nameInput = document.getElementById('pdfCompanyNameInput');
    if (nameInput && nameInput.value.trim()) {
        settings.companyName = nameInput.value.trim();
    }

    savePdfSettingsToStorage(currentPdfSettingsCompany, settings);

    // Also update the company name in the companies list
    const companies = _getAllCompanies();
    const company = companies.find(c => c.code === currentPdfSettingsCompany);
    if (company && settings.companyName) {
        company.name = settings.companyName;
        _saveAllCompanies(companies);
        Object.assign(PDF_COMPANY_INFO, buildCompanyInfoMap());
    }

    const infoEl = document.getElementById('infoCompanyName');
    if (infoEl) infoEl.textContent = settings.companyName || currentPdfSettingsCompany;

    const titleEl = document.getElementById('editorCompanyTitle');
    if (titleEl && company) {
        titleEl.innerHTML = `<span style="color: ${company.color};">🏭 ${settings.companyName || company.name}</span> <span style="color: #888; font-size: 0.85rem;">(${company.code})</span>`;
    }

    if (window.notify) window.notify.success('✅ Sauvegardé', `Paramètres pour "${settings.companyName || currentPdfSettingsCompany}" sauvegardés`, 3000);
};

// Get PDF settings from localStorage
function getPdfSettings(company) {
    try {
        const key = `pdfSettings_${company}`;
        const saved = localStorage.getItem(key);
        if (saved) return JSON.parse(saved);
    } catch (e) {
        console.error('Error loading PDF settings:', e);
    }
    return {};
}

// Save PDF settings to localStorage
function savePdfSettingsToStorage(company, settings) {
    try {
        const key = `pdfSettings_${company}`;
        localStorage.setItem(key, JSON.stringify(settings));
    } catch (e) {
        console.error('Error saving PDF settings:', e);
    }
}

// Global function to get PDF settings for a company
window.getPdfCompanySettings = function(company) {
    return getPdfSettings(company);
};

// Global function to get custom company name or fallback
window.getPdfCompanyName = function(company) {
    const settings = getPdfSettings(company);
    if (settings.companyName) return settings.companyName;
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
    const settings = getPdfSettings(company);
    const customImage = settings[`${type}Image`];
    if (customImage) return customImage;

    const companies = _getAllCompanies();
    const c = companies.find(co => co.code === company);
    if (!c) return null;

    switch(type) {
        case 'header': return c.headerPath || null;
        case 'footer': return c.footerPath || null;
        case 'signature': return c.signaturePath || null;
        default: return null;
    }
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

// Initialize PDF Settings page
window.initPdfSettingsPage = function() {
    console.log('✅ PDF Settings page initialized');
    renderCompanyList();
};
