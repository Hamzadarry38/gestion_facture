// PDF Text Editor - Edit Header/Footer text for MULTI, MRY, CHAIMAE
// Accessible from dashboard pages

const DEFAULT_PDF_TEXT = {
    MULTI: {
        company_name: 'MULTI TRAVAUX TETOUAN',
        header_line1: '',
        header_line2: '',
        header_line3: '',
        header_email: 'errbahiabderrahim@gmail.com',
        header_address: 'AV 10 MAI IMM 04 APPART 01 A DROIT - TETOUAN , TETOUAN',
        footer_line1: 'NIF 68717422 | TP 51001343 | RC 38633 | CNSS 6446237',
        footer_line2: 'ICE : 003809505000031',
        footer_line3: 'Tel: +212 661 307 323',
        footer_line4: ''
    },
    MRY: {
        company_name: 'MRY TRAV SARL (AU)',
        header_line1: 'TRAVAUX DIVERS DE CONSTRUCTION',
        header_line2: 'VENTE DE MATERIAUX DE CONSTRUCTION',
        header_line3: 'VENTE DE QUINCAILLERIE & DE DROGUERIE',
        header_email: '',
        header_address: '',
        footer_line1: 'NIF : 25077370  TP : 51200166  R.C : 23181  CNSS : 5679058  ICE : 002036664000051',
        footer_line2: 'R.I.B : 007 720 0005973000000519 74  ATTIJARI WAFA BANK',
        footer_line3: 'AV, BNI IDDER RUE 14 N°10 COELMA - TÉTOUAN.',
        footer_line4: 'EMAIL: errbahiabderrahim@gmail.com  TEL : 0661307323'
    },
    CHAIMAE: {
        company_name: 'CHAIMAE ERRBAHI MDIQ sarl (AU)',
        header_line1: 'Patente N° 52003366 - NIF : 40190505',
        header_line2: 'RC N° : 10487 - CNSS : 8721591',
        header_line3: 'ICE : 001544861000014',
        header_email: '',
        header_address: '',
        footer_line1: 'RIB : 007 720 00 05979000000368 12  ATTIJARI WAFA BANK',
        footer_line2: 'Email: errbahiabderrahim@gmail.com',
        footer_line3: 'ADRESSE: LOT ALBAHR AV TETOUAN N94 GARAGE 2 M\'DIQ',
        footer_line4: 'Tel: +212 661 307 323'
    }
};

// Cache for loaded PDF text
window._pdfTextCache = {};

// Load PDF text for a company (with caching)
window.loadCompanyPdfText = async function(companyCode) {
    const code = companyCode.toUpperCase();
    if (window._pdfTextCache[code]) return window._pdfTextCache[code];
    
    // Try API first
    try {
        if (window.electron?.pdfText) {
            const result = await window.electron.pdfText.get(code);
            if (result?.success && result?.data) {
                window._pdfTextCache[code] = result.data;
                return result.data;
            }
        }
    } catch (err) {
        console.warn('Could not load PDF text from API, trying localStorage:', err.message);
    }
    
    // Fallback: localStorage
    try {
        const saved = localStorage.getItem('pdfText_' + code);
        if (saved) {
            const parsed = JSON.parse(saved);
            window._pdfTextCache[code] = parsed;
            return parsed;
        }
    } catch (e) {
        console.warn('Could not load PDF text from localStorage:', e.message);
    }
    
    return DEFAULT_PDF_TEXT[code] || DEFAULT_PDF_TEXT.MRY;
};

// Clear cache when text is saved
window.clearPdfTextCache = function(companyCode) {
    if (companyCode) {
        delete window._pdfTextCache[companyCode.toUpperCase()];
    } else {
        window._pdfTextCache = {};
    }
};

window.renderPdfTextEditor = function(container) {
    // Auto-detect company from localStorage
    const sc = JSON.parse(localStorage.getItem('selectedCompany') || '{}');
    let selectedCompany = (sc.code || 'MULTI').toUpperCase();
    let isLoading = false;

    const companyRoutes = {
        MRY:     { name: 'MRY Company',   code: 'MRY',     route: '/dashboard-mry' },
        CHAIMAE: { name: 'Chaimae Company', code: 'CHAIMAE', route: '/dashboard-chaimae' },
        MULTI:   { name: 'Multi Company',  code: 'MULTI',   route: '/dashboard-multi' }
    };

    const goBack = () => {
        const sc = JSON.parse(localStorage.getItem('selectedCompany') || '{}');
        const code = (sc.code || 'MULTI').toUpperCase();
        const target = companyRoutes[code] || companyRoutes.MULTI;
        localStorage.setItem('selectedCompany', JSON.stringify(target));
        router.navigate(target.route);
    };
    window._pdfTextGoBack = goBack;

    const render = () => {
        const inputStyle = "width:100%;padding:0.7rem 1rem;background:#1a1a1a;border:1px solid #3e3e42;border-radius:8px;color:#e0e0e0;font-size:0.95rem;outline:none;transition:border-color 0.2s;box-sizing:border-box;";
        const labelStyle = "display:block;color:#b0b0b0;font-weight:600;font-size:0.8rem;margin-bottom:0.4rem;text-transform:uppercase;letter-spacing:0.5px;";

        container.innerHTML = `
            <style>
                body, html, #app { background: #1e1e1e !important; min-height: 100vh; }
            </style>
            <div style="background:#1e1e1e;min-height:100vh;padding:2rem 0;">
            <div style="max-width: 850px; margin: 0 auto; padding: 0 2rem 3rem;">

                <!-- Title Section -->
                <div style="margin-bottom:2rem;">
                    <h1 style="color:#fff;font-size:1.5rem;margin:0 0 0.3rem 0;font-weight:700;display:flex;align-items:center;gap:0.6rem;">
                        <div style="width:36px;height:36px;background:linear-gradient(135deg,#4caf50,#2e7d32);border-radius:10px;display:flex;align-items:center;justify-content:center;">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                        </div>
                        Modifier les textes PDF
                    </h1>
                    <p style="color:#777;margin:0;font-size:0.9rem;padding-left:2.9rem;">Personnaliser l'en-tête et le pied de page pour chaque société</p>
                </div>

                <!-- Company Selector Tabs -->
                <div style="display:flex;gap:0;margin-bottom:2rem;background:#1a1a1a;border-radius:12px;padding:4px;border:1px solid #2d2d30;">
                    ${['MULTI', 'MRY', 'CHAIMAE'].map(c => {
                        const isActive = selectedCompany === c;
                        const colors = { MULTI: '#2196f3', MRY: '#4caf50', CHAIMAE: '#ff9800' };
                        const color = colors[c];
                        return `<button id="pdfTextCompanyBtn_${c}" onclick="selectPdfTextCompany('${c}')" 
                            style="flex:1;padding:0.75rem 1rem;border-radius:9px;border:none;
                            background:${isActive ? color : 'transparent'};
                            color:${isActive ? '#fff' : '#888'};
                            cursor:pointer;font-size:0.95rem;font-weight:700;transition:all 0.25s;letter-spacing:0.5px;"
                            onmouseover="if(!${isActive})this.style.color='#ccc';this.style.background='${isActive ? color : 'rgba(255,255,255,0.05)'}'" 
                            onmouseout="if(!${isActive})this.style.color='#888';this.style.background='${isActive ? color : 'transparent'}'">
                            ${c}
                        </button>`;
                    }).join('')}
                </div>

                <!-- Loading -->
                <div id="pdfTextLoading" style="display:${isLoading ? 'flex' : 'none'};align-items:center;justify-content:center;padding:4rem;color:#888;">
                    <div style="text-align:center;">
                        <div style="width:32px;height:32px;border:3px solid #3e3e42;border-top-color:#4caf50;border-radius:50%;animation:spin 0.8s linear infinite;margin:0 auto 1rem;"></div>
                        <span>Chargement des données...</span>
                    </div>
                    <style>@keyframes spin{to{transform:rotate(360deg)}}</style>
                </div>

                <!-- Form -->
                <div id="pdfTextForm" style="display:${isLoading ? 'none' : 'block'};">
                    <!-- Header Section -->
                    <div style="background:linear-gradient(180deg,#252526 0%,#222 100%);border:1px solid #333;border-radius:12px;padding:1.5rem;margin-bottom:1.25rem;box-shadow:0 2px 8px rgba(0,0,0,0.2);">
                        <div style="display:flex;align-items:center;gap:0.6rem;margin-bottom:1.2rem;padding-bottom:0.8rem;border-bottom:1px solid #333;">
                            <div style="width:30px;height:30px;background:linear-gradient(135deg,#4caf50,#2e7d32);border-radius:8px;display:flex;align-items:center;justify-content:center;">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/></svg>
                            </div>
                            <h2 style="color:#fff;font-size:1.05rem;margin:0;font-weight:600;">Header (En-tête)</h2>
                        </div>
                        
                        <div style="display:grid;grid-template-columns:1fr;gap:0.9rem;">
                            <div>
                                <label style="${labelStyle}">Nom de la société</label>
                                <input type="text" id="pdfText_company_name" style="${inputStyle}font-weight:600;font-size:1rem;" onfocus="this.style.borderColor='#4caf50'" onblur="this.style.borderColor='#3e3e42'" />
                            </div>
                            ${selectedCompany === 'MULTI' ? `
                            <div>
                                <label style="${labelStyle}">Email</label>
                                <input type="text" id="pdfText_header_email" style="${inputStyle}" onfocus="this.style.borderColor='#4caf50'" onblur="this.style.borderColor='#3e3e42'" placeholder="email@exemple.com" />
                            </div>
                            <div>
                                <label style="${labelStyle}">Adresse</label>
                                <input type="text" id="pdfText_header_address" style="${inputStyle}" onfocus="this.style.borderColor='#4caf50'" onblur="this.style.borderColor='#3e3e42'" />
                            </div>
                            <input type="hidden" id="pdfText_header_line1" value="" />
                            <input type="hidden" id="pdfText_header_line2" value="" />
                            <input type="hidden" id="pdfText_header_line3" value="" />
                            ` : `
                            <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.9rem;">
                                <div>
                                    <label style="${labelStyle}">Ligne 1</label>
                                    <input type="text" id="pdfText_header_line1" style="${inputStyle}" onfocus="this.style.borderColor='#4caf50'" onblur="this.style.borderColor='#3e3e42'" />
                                </div>
                                <div>
                                    <label style="${labelStyle}">Ligne 2</label>
                                    <input type="text" id="pdfText_header_line2" style="${inputStyle}" onfocus="this.style.borderColor='#4caf50'" onblur="this.style.borderColor='#3e3e42'" />
                                </div>
                            </div>
                            <div>
                                <label style="${labelStyle}">Ligne 3</label>
                                <input type="text" id="pdfText_header_line3" style="${inputStyle}" onfocus="this.style.borderColor='#4caf50'" onblur="this.style.borderColor='#3e3e42'" />
                            </div>
                            <input type="hidden" id="pdfText_header_email" value="" />
                            <input type="hidden" id="pdfText_header_address" value="" />
                            `}
                        </div>
                    </div>

                    <!-- Footer Section -->
                    <div style="background:linear-gradient(180deg,#252526 0%,#222 100%);border:1px solid #333;border-radius:12px;padding:1.5rem;margin-bottom:1.5rem;box-shadow:0 2px 8px rgba(0,0,0,0.2);">
                        <div style="display:flex;align-items:center;gap:0.6rem;margin-bottom:1.2rem;padding-bottom:0.8rem;border-bottom:1px solid #333;">
                            <div style="width:30px;height:30px;background:linear-gradient(135deg,#ff9800,#e65100);border-radius:8px;display:flex;align-items:center;justify-content:center;">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="15" x2="21" y2="15"/></svg>
                            </div>
                            <h2 style="color:#fff;font-size:1.05rem;margin:0;font-weight:600;">Footer (Pied de page)</h2>
                        </div>
                        
                        <div style="display:grid;gap:0.9rem;">
                            <div>
                                <label style="${labelStyle}">Ligne 1 (NIF / TP / RC / etc.)</label>
                                <input type="text" id="pdfText_footer_line1" style="${inputStyle}" onfocus="this.style.borderColor='#ff9800'" onblur="this.style.borderColor='#3e3e42'" />
                            </div>
                            <div>
                                <label style="${labelStyle}">Ligne 2 (RIB / ICE / etc.)</label>
                                <input type="text" id="pdfText_footer_line2" style="${inputStyle}" onfocus="this.style.borderColor='#ff9800'" onblur="this.style.borderColor='#3e3e42'" />
                            </div>
                            <div>
                                <label style="${labelStyle}">Ligne 3 (Adresse / Email)</label>
                                <input type="text" id="pdfText_footer_line3" style="${inputStyle}" onfocus="this.style.borderColor='#ff9800'" onblur="this.style.borderColor='#3e3e42'" />
                            </div>
                            ${selectedCompany !== 'MULTI' ? `
                            <div>
                                <label style="${labelStyle}">Ligne 4 (Tel / etc.)</label>
                                <input type="text" id="pdfText_footer_line4" style="${inputStyle}" onfocus="this.style.borderColor='#ff9800'" onblur="this.style.borderColor='#3e3e42'" />
                            </div>
                            ` : `
                            <input type="hidden" id="pdfText_footer_line4" value="" />
                            `}
                        </div>
                    </div>

                    <!-- Actions -->
                    <div style="display:flex;gap:0.75rem;justify-content:space-between;padding-top:0.5rem;">
                        <button onclick="window._pdfTextGoBack()" style="padding:0.7rem 1.4rem;background:#2d2d30;color:#ccc;border:1px solid #3e3e42;border-radius:8px;cursor:pointer;font-size:0.9rem;font-weight:500;display:flex;align-items:center;gap:0.5rem;transition:all 0.2s;" onmouseover="this.style.background='#3e3e42';this.style.borderColor='#555'" onmouseout="this.style.background='#2d2d30';this.style.borderColor='#3e3e42'">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                            Retour
                        </button>
                        <button onclick="savePdfText()" id="savePdfTextBtn" style="padding:0.7rem 2rem;background:linear-gradient(135deg,#4caf50,#2e7d32);color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:0.95rem;font-weight:600;display:flex;align-items:center;gap:0.5rem;transition:all 0.2s;box-shadow:0 2px 8px rgba(76,175,80,0.3);" onmouseover="this.style.transform='translateY(-1px)';this.style.boxShadow='0 4px 12px rgba(76,175,80,0.4)'" onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='0 2px 8px rgba(76,175,80,0.3)'">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
                            Enregistrer
                        </button>
                    </div>
                </div>
            </div>
            </div>
        `;
    };

    render();

    window.selectPdfTextCompany = async function(company) {
        selectedCompany = company;
        isLoading = true;
        render();
        await loadPdfTextForCompany(company);
        isLoading = false;
        render();
        fillPdfTextForm(company);
    };

    window.resetPdfTextToDefaults = function() {
        const defaults = DEFAULT_PDF_TEXT[selectedCompany];
        if (!defaults) return;
        const fields = ['company_name', 'header_line1', 'header_line2', 'header_line3', 'header_email', 'header_address', 'footer_line1', 'footer_line2', 'footer_line3', 'footer_line4'];
        fields.forEach(f => {
            const el = document.getElementById('pdfText_' + f);
            if (el) el.value = defaults[f] || '';
        });
        window.notify.info('Info', 'Valeurs par défaut restaurées. Cliquez sur Enregistrer pour sauvegarder.', 3000);
    };

    window.savePdfText = async function() {
        const btn = document.getElementById('savePdfTextBtn');
        if (btn) { btn.disabled = true; btn.textContent = 'Enregistrement...'; }

        const fields = ['company_name', 'header_line1', 'header_line2', 'header_line3', 'header_email', 'header_address', 'footer_line1', 'footer_line2', 'footer_line3', 'footer_line4'];
        const data = {};
        fields.forEach(f => {
            const el = document.getElementById('pdfText_' + f);
            data[f] = el ? el.value : '';
        });

        try {
            let savedToApi = false;
            // Try API first
            try {
                if (window.electron?.pdfText) {
                    const result = await window.electron.pdfText.save(selectedCompany, data);
                    if (result?.success) {
                        savedToApi = true;
                    }
                }
            } catch (apiErr) {
                console.warn('API save failed, using localStorage fallback:', apiErr.message);
            }
            
            // Always save to localStorage as backup/fallback
            localStorage.setItem('pdfText_' + selectedCompany, JSON.stringify(data));
            
            window.clearPdfTextCache(selectedCompany);
            window._pdfTextCache[selectedCompany] = data;
            window.notify.success('Succès', `Textes PDF de ${selectedCompany} enregistrés avec succès${savedToApi ? '' : ' (local)'}`, 2000);
        } catch (err) {
            console.error('Error saving PDF text:', err);
            window.notify.error('Erreur', 'Impossible de sauvegarder: ' + err.message, 3000);
        } finally {
            if (btn) { btn.disabled = false; btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg> Enregistrer'; }
        }
    };

    // Initial load
    loadPdfTextForCompany(selectedCompany).then(() => {
        isLoading = false;
        render();
        fillPdfTextForm(selectedCompany);
    });
};

async function loadPdfTextForCompany(company) {
    try {
        if (window.electron?.pdfText) {
            const result = await window.electron.pdfText.get(company);
            if (result?.success && result?.data) {
                window._pdfTextCache[company] = result.data;
                return;
            }
        }
    } catch (err) {
        console.warn('Could not load PDF text:', err.message);
    }
}

function fillPdfTextForm(company) {
    const data = window._pdfTextCache[company] || DEFAULT_PDF_TEXT[company] || {};
    const defaults = DEFAULT_PDF_TEXT[company] || {};
    const fields = ['company_name', 'header_line1', 'header_line2', 'header_line3', 'header_email', 'header_address', 'footer_line1', 'footer_line2', 'footer_line3', 'footer_line4'];
    fields.forEach(f => {
        const el = document.getElementById('pdfText_' + f);
        if (el) el.value = data[f] || defaults[f] || '';
    });
}
