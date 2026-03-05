// Unified Company PDF Generator
// Supports SKM, SAAISS, and BEN ALI companies with custom headers/footers

// Company configurations
const COMPANY_CONFIGS = {
    SKM: {
        name: 'SKM',
        displayName: 'CONSAZIZ',
        color: '#FF9800',
        headerPath: 'SKM/Hesder.png',
        footerPath: 'SKM/Footer.png',
        signaturePath: 'SKM/signature.png',
        dbName: 'dbSmartS'
    },
    SAAISS: {
        name: 'SAAISS',
        displayName: 'SAAISS',
        color: '#9C27B0',
        headerPath: 'SAAISS/Hesder.png',
        footerPath: 'SAAISS/Footer.png',
        signaturePath: 'SAAISS/signature.png',
        dbName: 'dbMsh3'
    },
    BENALI: {
        name: 'BEN ALI',
        displayName: 'BEN ALI',
        color: '#4CAF50',
        headerPath: 'BEN ALI/Hesder.png',
        footerPath: 'BEN ALI/Footer.png',
        signaturePath: 'BEN ALI/signature.png',
        dbName: 'dbBenAli'
    }
};

// Load image as data URL
async function loadCompanyImage(path) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            resolve(canvas.toDataURL('image/png'));
        };
        img.onerror = () => {
            console.warn(`Could not load image: ${path}`);
            resolve(null);
        };
        img.src = path;
    });
}

// Show company selection modal (dynamic - only enabled companies)
window.showCompanySelectionModal = async function (invoiceId, sourceCompany) {
    console.log('🟢 [Company Modal] Opening modal for invoice:', invoiceId, 'from source:', sourceCompany);
    
    // Ensure companies are loaded from API before showing modal
    let enabledCompanies = window.getEnabledCompanies ? window.getEnabledCompanies() : [];
    
    if (!enabledCompanies || enabledCompanies.length === 0) {
        console.log('🟡 [Company Modal] No companies cached, loading from API...');
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
                    enabledCompanies = window.getEnabledCompanies();
                } else {
                    // Build enabledCompanies directly from API data
                    enabledCompanies = result.data
                        .filter(c => c.enabled !== false)
                        .map(c => ({
                            code: c.company_code,
                            name: c.company_name,
                            color: c.color || '#2196F3'
                        }));
                }
                console.log('✅ [Company Modal] Loaded', enabledCompanies.length, 'companies from API');
            }
        } catch (e) {
            console.error('❌ [Company Modal] Failed to load companies from API:', e);
        }
    }
    
    // Final fallback if still empty
    if (!enabledCompanies || enabledCompanies.length === 0) {
        console.log('🟡 [Company Modal] Using hardcoded fallback companies');
        enabledCompanies = [
            { code: 'SKM', name: 'SMART SERVICES', color: '#FF9800' },
            { code: 'SAAISS', name: 'MSH3 SERVICES', color: '#9C27B0' },
            { code: 'BENALI', name: 'BEN ALI', color: '#4CAF50' }
        ];
    }
    
    console.log('🟢 [Company Modal] Available companies:', enabledCompanies.length);
    console.log('🟢 [Company Modal] Companies list:', enabledCompanies.map(c => `${c.code} (${c.name})`).join(', '));

    return new Promise((resolve) => {
        const overlay = document.createElement('div');
        overlay.className = 'custom-modal-overlay';

        // Build company buttons dynamically
        const cols = enabledCompanies.length <= 3 ? enabledCompanies.length : 3;
        let buttonsHtml = '';
        enabledCompanies.forEach(c => {
            const displayName = window.getPdfCompanyName ? window.getPdfCompanyName(c.code) : c.name;
            buttonsHtml += `
                <button class="company-select-btn" data-company="${c.code}" style="
                    background: linear-gradient(135deg, ${c.color}, ${c.color}dd);
                    border: none; border-radius: 12px; padding: 1.5rem 1rem; cursor: pointer;
                    transition: all 0.3s; display: flex; flex-direction: column; align-items: center; gap: 0.5rem;
                " onmouseover="this.style.transform='scale(1.05)'; this.style.boxShadow='0 8px 25px ${c.color}66'"
                   onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='none'">
                    <span style="font-size: 2rem;">🏭</span>
                    <span style="color: #fff; font-weight: 700; font-size: 0.85rem;">${displayName}</span>
                </button>
            `;
        });

        overlay.innerHTML = `
            <div class="custom-modal" style="max-width: 500px;">
                <div class="custom-modal-header" style="background: linear-gradient(135deg, #FF9800, #9C27B0, #4CAF50); padding: 1.5rem;">
                    <span class="custom-modal-icon" style="background: rgba(255,255,255,0.2);">🏢</span>
                    <h3 class="custom-modal-title" style="color: #fff;">Télécharger comme autre société</h3>
                </div>
                <div class="custom-modal-body" style="padding: 2rem;">
                    <p style="margin-bottom: 1.5rem; color: #b0b0b0; font-size: 0.95rem; text-align: center;">
                        Choisissez la société pour générer le PDF :
                    </p>
                    <div style="display: grid; grid-template-columns: repeat(${cols}, 1fr); gap: 1rem;">
                        ${buttonsHtml}
                    </div>
                </div>
                <div class="custom-modal-footer" style="justify-content: center;">
                    <button id="cancelCompanySelect" class="custom-modal-btn secondary">Annuler</button>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);

        // Event handlers for all company buttons
        overlay.querySelectorAll('.company-select-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const companyCode = btn.dataset.company;
                console.log('🟢 [Company Modal] User clicked company button:', companyCode);
                overlay.remove();
                console.log('🟢 [Company Modal] Modal closed, returning selection');
                resolve({ company: companyCode, invoiceId, sourceCompany });
            });
        });

        document.getElementById('cancelCompanySelect').addEventListener('click', () => {
            overlay.remove();
            resolve(null);
        });

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.remove();
                resolve(null);
            }
        });
    });
};

// Main function to download PDF as another company
window.downloadAsOtherCompany = async function (invoiceId, sourceDb) {
    console.log('🔵 [Download Other Company] Button clicked!');
    console.log('🔵 [Download Other Company] Invoice ID:', invoiceId);
    console.log('🔵 [Download Other Company] Source DB:', sourceDb);
    
    try {
        // Show company selection modal
        const selectedCompanyData = JSON.parse(localStorage.getItem('selectedCompany') || '{}');
        const sourceCompany = selectedCompanyData.name || 'Unknown';
        console.log('🔵 [Download Other Company] Current selected company:', sourceCompany);

        console.log('🔵 [Download Other Company] Opening company selection modal...');
        const selection = await window.showCompanySelectionModal(invoiceId, sourceCompany);

        if (!selection) {
            console.log('❌ [Download Other Company] User cancelled company selection');
            return;
        }

        console.log('✅ [Download Other Company] User selected company:', selection.company);
        console.log(`📥 [Download Other Company] Generating ${selection.company} PDF for invoice:`, invoiceId, 'from source:', sourceDb);

        // Route to the exact same functions that were used before
        // Each function has its own loading overlay that shows AFTER the user clicks 'Générer' in the modal
        if (selection.company === 'SKM') {
            // SMART SERVICES (was SKM)
            if (sourceDb === 'multi') {
                await window.downloadMultiSKMDevisPDF(invoiceId);
            } else if (sourceDb === 'chaimae') {
                await window.downloadChaimaeSKMDevisPDF(invoiceId);
            } else {
                await window.downloadSKMDevisPDF(invoiceId);
            }
        } else if (selection.company === 'SAAISS') {
            // MSH3 SERVICES (was SAAISS)
            if (sourceDb === 'multi') {
                await window.downloadMultiSAAISSDevisPDF(invoiceId);
            } else if (sourceDb === 'chaimae') {
                await window.downloadChaimaeSAAISSDevisPDF(invoiceId);
            } else {
                await window.downloadSAAISSDevisPDF(invoiceId);
            }
        } else if (selection.company === 'BENALI') {
            // BEN ALI (new)
            await generateBenAliPDF(invoiceId, sourceDb);
        } else {
            // Custom company - use generic PDF generation
            await generateCustomCompanyPDF(invoiceId, sourceDb, selection.company);
        }

    } catch (error) {
        console.error('❌ Error in downloadAsOtherCompany:', error);
        window.notify.error('Erreur', 'Impossible de générer le PDF: ' + error.message, 4000);
    }
};

// Create a loading overlay for PDF generation
function createPDFLoadingOverlay(companyCode) {
    const name = window.getPdfCompanyName ? window.getPdfCompanyName(companyCode) : companyCode;
    // Get color dynamically from company list
    let color = '#2196F3';
    if (window.getAllPdfCompanies) {
        const comp = window.getAllPdfCompanies().find(c => c.code === companyCode);
        if (comp) color = comp.color;
    }

    const overlay = document.createElement('div');
    overlay.id = 'pdfLoadingOverlay';
    overlay.style.cssText = `
        position: fixed; top: 0; left: 0; right: 0; bottom: 0;
        background: rgba(0, 0, 0, 0.7);
        display: flex; align-items: center; justify-content: center;
        z-index: 99999; backdrop-filter: blur(4px);
    `;
    overlay.innerHTML = `
        <div style="
            background: #1e1e1e; border-radius: 16px; padding: 2.5rem 3rem;
            text-align: center; box-shadow: 0 20px 60px rgba(0,0,0,0.5);
            border: 1px solid ${color}33; min-width: 300px;
        ">
            <div style="
                width: 56px; height: 56px; border: 4px solid #333;
                border-top-color: ${color}; border-radius: 50%;
                animation: pdfSpin 0.8s linear infinite;
                margin: 0 auto 1.5rem;
            "></div>
            <div style="color: #fff; font-size: 1.15rem; font-weight: 600; margin-bottom: 0.5rem;">
                Génération du PDF en cours...
            </div>
            <div style="color: ${color}; font-size: 0.95rem; font-weight: 700;">
                🏭 ${name}
            </div>
        </div>
        <style>
            @keyframes pdfSpin {
                to { transform: rotate(360deg); }
            }
        </style>
    `;
    return overlay;
}

// Generate BEN ALI PDF (new company)
async function generateBenAliPDF(invoiceId, sourceDb) {
    try {
        console.log('📥 Generating BEN ALI PDF for invoice:', invoiceId);

        // Get invoice data from source database
        let result;
        if (sourceDb === 'multi' && window.electron.dbMulti) {
            result = await window.electron.dbMulti.getInvoiceById(invoiceId);
        } else if (sourceDb === 'chaimae' && window.electron.dbChaimae) {
            result = await window.electron.dbChaimae.getInvoiceById(invoiceId);
        } else if (window.electron.db) {
            // Default fallback to main db (MRY)
            result = await window.electron.db.getInvoiceById(invoiceId);
        } else {
            throw new Error('Base de données non disponible');
        }

        if (!result.success || !result.data) {
            throw new Error('Document introuvable');
        }

        const invoice = result.data;

        // Only allow for devis type
        if (invoice.document_type !== 'devis') {
            window.notify.warning('Type incorrect', 'Cette fonction est disponible uniquement pour les devis.', 4000);
            return;
        }

        // Show customization modal
        const customizationData = await showBenAliModal(invoice);
        if (!customizationData) {
            console.log('❌ User cancelled BEN ALI PDF generation');
            return;
        }

        // Show loading overlay immediately after modal closes
        let loadingOverlay = null;
        try {
            loadingOverlay = document.createElement('div');
            loadingOverlay.id = 'pdfLoadingOverlay';
            loadingOverlay.style.cssText = `
                position: fixed; top: 0; left: 0; right: 0; bottom: 0;
                background: rgba(0, 0, 0, 0.7);
                display: flex; align-items: center; justify-content: center;
                z-index: 99999; backdrop-filter: blur(4px);
            `;
            loadingOverlay.innerHTML = `
                <div style="
                    background: #1e1e1e; border-radius: 16px; padding: 2.5rem 3rem;
                    text-align: center; box-shadow: 0 20px 60px rgba(0,0,0,0.5);
                    border: 1px solid rgba(76,175,80,0.3); min-width: 300px;
                ">
                    <div style="
                        width: 56px; height: 56px; border: 4px solid #333;
                        border-top-color: #4CAF50; border-radius: 50%;
                        animation: pdfSpin 0.8s linear infinite;
                        margin: 0 auto 1.5rem;
                    "></div>
                    <div style="color: #fff; font-size: 1.15rem; font-weight: 600; margin-bottom: 0.5rem;">
                        Génération du PDF en cours...
                    </div>
                    <div style="color: #4CAF50; font-size: 0.95rem; font-weight: 700;">
                        🏭 ${window.getPdfCompanyName ? window.getPdfCompanyName('BENALI') : 'BEN ALI'}
                    </div>
                </div>
                <style>
                    @keyframes pdfSpin {
                        to { transform: rotate(360deg); }
                    }
                </style>
            `;
            document.body.appendChild(loadingOverlay);
        } catch (e) {
            console.warn('Could not show loading overlay:', e);
        }

        try {
            // Check if jsPDF is loaded
            if (typeof window.jspdf === 'undefined') {
                await loadJsPDF();
            }

            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();

            // Apply customizations
            const customizedInvoice = { ...invoice };

            if (customizationData.percentage && customizationData.percentage > 0) {
                customizedInvoice.products = customizedInvoice.products.map(product => ({
                    ...product,
                    prix_unitaire_ht: parseFloat(product.prix_unitaire_ht) * (1 + customizationData.percentage / 100),
                    total_ht: parseFloat(product.total_ht) * (1 + customizationData.percentage / 100)
                }));

                const newTotalHT = customizedInvoice.products.reduce((sum, p) => sum + parseFloat(p.total_ht), 0);
                const newMontantTVA = newTotalHT * (parseFloat(customizedInvoice.tva_rate) / 100);
                const newTotalTTC = newTotalHT + newMontantTVA;

                customizedInvoice.total_ht = newTotalHT;
                customizedInvoice.montant_tva = newMontantTVA;
                customizedInvoice.total_ttc = newTotalTTC;
            }

            if (customizationData.customDate) {
                customizedInvoice.document_date = customizationData.customDate;
            }
            if (customizationData.customDevisNumber) {
                customizedInvoice.document_numero_devis = customizationData.customDevisNumber;
            }

            // Apply modified product names
            if (customizationData.modifiedProducts) {
                customizedInvoice.products = customizedInvoice.products.map((product, index) => ({
                    ...product,
                    designation: customizationData.modifiedProducts[index] || product.designation
                }));
            }

            // Add Devis number to BEN ALI database
            try {
                const currentYear = new Date().getFullYear();
                await window.electron.dbBenAli.addDevisNumber(customizationData.customDevisNumber, currentYear);
                console.log('✅ BEN ALI Devis number added to database:', customizationData.customDevisNumber);
            } catch (error) {
                console.error('Error saving BEN ALI devis number:', error);
            }

            // Generate BEN ALI PDF
            await generateBenAliPDFContent(doc, customizedInvoice);

            // Save the PDF
            const docType = customizedInvoice.document_type === 'devis' ? 'Devis' : 'Facture';
            const invoiceNumber = customizedInvoice.document_numero_devis || customizedInvoice.document_numero || 'N-A';
            const companyFileName = window.getPdfCompanyFileName ? window.getPdfCompanyFileName('BENALI') : 'BENALI';
            const fileName = `${companyFileName}_${docType}_${customizedInvoice.client_nom}_${invoiceNumber}.pdf`;

            // Get PDF as ArrayBuffer and save to backend
            const pdfArrayBuffer = doc.output('arraybuffer');
            const pdfUint8Array = new Uint8Array(pdfArrayBuffer);
            const currentYear = new Date().getFullYear();

            // Get createdBy
            const selectedCompany = JSON.parse(localStorage.getItem('selectedCompany') || '{}');
            const createdBy = selectedCompany.code || selectedCompany.name || 'Unknown';

            // Upload PDF to Server (Cloud Storage)
            console.log('☁️ Uploading BEN ALI PDF to server...');
            // Using dbSmartS.uploadPdf as a generic uploader because we haven't exposed it on dbBenAli yet
            // Ideally we should expose it on window.electron.dbBenAli.uploadPdf too
            const uploadResult = await window.electron.dbSmartS.uploadPdf(pdfUint8Array, fileName);

            if (uploadResult.success) {
                console.log('✅ BEN ALI PDF uploaded to server:', uploadResult.filePath);

                // Record PDF path in database for metadata tracking
                try {
                    await window.electron.dbBenAli.savePdfPath(invoiceNumber, currentYear, uploadResult.filePath, createdBy);
                    console.log('✅ BEN ALI PDF metadata synced to PostgreSQL');
                } catch (dbErr) {
                    console.error('⚠️ Failed to sync BEN ALI PDF metadata to PostgreSQL:', dbErr);
                }

                // Also download in browser
                doc.save(fileName);

                // Remove loading overlay BEFORE showing notification
                if (loadingOverlay && loadingOverlay.parentNode) {
                    loadingOverlay.remove();
                    loadingOverlay = null;
                }

                window.notify.success('Succès', `PDF ${window.getPdfCompanyName ? window.getPdfCompanyName('BENALI') : 'BEN ALI'} généré et sauvegardé en ligne: ${fileName}`, 3000);
            } else {
                console.error('❌ Error uploading BEN ALI PDF to server:', uploadResult.error);

                // Fallback: save locally
                // Determine save folder: 'chaimae_benali' if source is chaimae, else 'benali'
                const saveFolder = sourceDb === 'chaimae' ? 'chaimae_benali' : 'benali';
                const pdfUint8ArrayFallback = new Uint8Array(doc.output('arraybuffer'));

                const saveResult = await window.electron.pdf.savePdf(pdfUint8ArrayFallback, saveFolder, invoiceNumber, createdBy);

                doc.save(fileName);

                // Remove loading overlay BEFORE showing notification
                if (loadingOverlay && loadingOverlay.parentNode) {
                    loadingOverlay.remove();
                    loadingOverlay = null;
                }

                if (saveResult.success) {
                    window.notify.warning('Mode Hors Ligne', 'Le PDF a été sauvegardé localement.', 4000);
                } else {
                    window.notify.error('Erreur', 'Erreur lors de la sauvegarde du PDF: ' + saveResult.error, 4000);
                }
            }

        } catch (innerError) {
            // Remove loading overlay on error
            if (loadingOverlay && loadingOverlay.parentNode) {
                loadingOverlay.remove();
                loadingOverlay = null;
            }
            throw innerError;
        } finally {
            // Safety net: always remove loading overlay if still present
            if (loadingOverlay && loadingOverlay.parentNode) {
                loadingOverlay.remove();
            }
        }

    } catch (error) {
        console.error('❌ Error generating BEN ALI PDF:', error);
        window.notify.error('Erreur', `Impossible de générer le PDF ${window.getPdfCompanyName ? window.getPdfCompanyName('BENALI') : 'BEN ALI'}: ` + error.message, 4000);
    }
}

// Show BEN ALI customization modal
async function showBenAliModal(invoice) {
    // Get last used devis number
    let lastDevisNumber = 'Aucun';
    let nextDevisNumber = '';
    const currentYear = new Date().getFullYear();

    try {
        // Use BEN ALI database for devis numbers
        const result = await window.electron.dbBenAli.getMaxDevisNumber(currentYear);
        console.log('📋 BEN ALI DB Result:', result);

        if (result && result.success && result.data && result.data.devis_number) {
            lastDevisNumber = result.data.devis_number;

            // Extract number before the year (format: number/year)
            // Example: "11/2025" -> extract 11, increment to 12, then add current year
            const match = lastDevisNumber.trim().match(/^(\d+)\s*\/\s*\d+$/);
            if (match) {
                const lastNumber = parseInt(match[1]);
                const nextNumber = lastNumber + 1;
                nextDevisNumber = nextNumber + '/' + currentYear;
            } else {
                // Fallback: try to extract any number and increment
                const numberMatch = lastDevisNumber.match(/(\d+)/);
                if (numberMatch) {
                    const lastNumber = parseInt(numberMatch[1]);
                    const nextNumber = lastNumber + 1;
                    nextDevisNumber = nextNumber + '/' + currentYear;
                } else {
                    nextDevisNumber = '1/' + currentYear;
                }
            }
        } else {
            // If no last devis, start with 1/currentYear
            nextDevisNumber = '1/' + currentYear;
        }
    } catch (error) {
        console.log('Could not get last devis number:', error);
        nextDevisNumber = '1/' + currentYear;
    }

    // Ensure nextDevisNumber is in correct format (number/year only)
    if (nextDevisNumber && !nextDevisNumber.match(/^(\d+)\/\d{4}$/)) {
        nextDevisNumber = '1/' + currentYear;
    }

    // Load last saved settings (percentage from PostgreSQL, product names per-invoice from localStorage)
    let savedPercentage = '';
    let savedProductNames = {};
    try {
        const settingsResult = await window.electron.dbBenAli.getPdfSettings();
        if (settingsResult && settingsResult.success && settingsResult.data) {
            savedPercentage = settingsResult.data.percentage || '';
        }
    } catch (e) { console.warn('Could not load BEN ALI settings:', e); }
    try {
        const savedProducts = localStorage.getItem(`customPdfProducts_BENALI_${invoice.id}`);
        if (savedProducts) {
            savedProductNames = JSON.parse(savedProducts);
        }
    } catch (e) {}

    return new Promise((resolve) => {
        const overlay = document.createElement('div');
        overlay.className = 'custom-modal-overlay';

        const selectedCompany = JSON.parse(localStorage.getItem('selectedCompany') || '{}');
        const companyName = selectedCompany.name || 'Inconnue';

        // Generate product inputs HTML - use saved names if available
        const productsHtml = invoice.products.map((product, index) => {
            const displayName = savedProductNames[index] || product.designation || '';
            return `
            <div style="margin-bottom: 0.5rem;">
                <label style="display: block; margin-bottom: 0.2rem; color: #aaa; font-size: 0.8rem;">
                    Produit ${index + 1}: Quantité: ${product.quantite}
                </label>
                <textarea class="product-name-input" data-index="${index}"
                       style="width: 100%; padding: 0.5rem; background: #2d2d30; border: 1px solid #3e3e42; border-radius: 4px; color: #fff; font-size: 0.9rem; resize: vertical; min-height: 40px;"
                       placeholder="Nom du produit">${displayName}</textarea>
            </div>
        `}).join('');

        overlay.innerHTML = `
            <div class="custom-modal" style="max-width: 600px; max-height: 80vh; display: flex; flex-direction: column;">
                <div class="custom-modal-header" style="background: linear-gradient(135deg, #4CAF50, #388E3C);">
                    <span class="custom-modal-icon info">🎨</span>
                    <h3 class="custom-modal-title" style="color: #fff;">PDF ${window.getPdfCompanyName ? window.getPdfCompanyName('BENALI') : 'BEN ALI'} - Personnalisation</h3>
                    <div style="position: absolute; top: 1rem; right: 1rem; background: rgba(255,255,255,0.2); color: #fff; padding: 0.4rem 0.8rem; border-radius: 4px; font-size: 0.85rem; font-weight: 600;">
                        🏢 Créé par: <strong>${companyName}</strong>
                    </div>
                </div>
                <div class="custom-modal-body" style="overflow-y: auto; flex: 1; max-height: calc(80vh - 140px);">
                    <div style="margin-bottom: 1.5rem;">
                        <label style="display: block; margin-bottom: 0.5rem; color: #e0e0e0; font-weight: 600;">
                            Pourcentage d'ajustement (%) :
                        </label>
                        <input type="number" id="benaliPercentageInput" placeholder="0" min="0" max="100" step="0.1" value="${savedPercentage}"
                               style="width: 100%; padding: 0.75rem; background: #2d2d30; border: 1px solid #3e3e42; border-radius: 6px; color: #fff; font-size: 1rem;">
                        <small style="color: #888; display: block; margin-top: 0.3rem;">Ce pourcentage sera appliqué aux prix mais ne sera pas visible dans le PDF</small>
                    </div>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem;">
                        <div>
                            <label style="display: block; margin-bottom: 0.5rem; color: #e0e0e0; font-weight: 600;">
                                Date personnalisée :
                            </label>
                            <input type="date" id="benaliDateInput" value="${window.todayDateString ? window.todayDateString() : new Date().toISOString().slice(0, 10)}"
                                   style="width: 100%; padding: 0.75rem; background: #2d2d30; border: 1px solid #3e3e42; border-radius: 6px; color: #fff; font-size: 1rem;">
                        </div>
                        <div>
                            <label style="display: block; margin-bottom: 0.5rem; color: #e0e0e0; font-weight: 600;">
                                N° Devis personnalisé :
                            </label>
                            <input type="text" id="benaliDevisInput" value="${nextDevisNumber}" placeholder="D2025-001" autocomplete="off"
                                   style="width: 100%; padding: 0.75rem; background: #2d2d30; border: 1px solid #3e3e42; border-radius: 6px; color: #fff; font-size: 1rem;">
                            <small style="color: #4CAF50; display: block; margin-top: 0.5rem; font-weight: 500;">
                                📋 Plus grand N°: <strong>${lastDevisNumber}</strong>
                            </small>
                        </div>
                    </div>

                    <div style="margin-top: 1.5rem;">
                        <label style="display: block; margin-bottom: 0.5rem; color: #e0e0e0; font-weight: 600;">
                            Modifier les noms des produits :
                        </label>
                        <div style="background: #252526; padding: 1rem; border-radius: 6px; max-height: 200px; overflow-y: auto; border: 1px solid #3e3e42;">
                            ${productsHtml}
                        </div>
                    </div>
                </div>
                <div class="custom-modal-footer">
                    <button id="benaliCancelBtn" class="custom-modal-btn secondary">Annuler</button>
                    <button id="benaliGenerateBtn" class="custom-modal-btn primary" style="background: linear-gradient(135deg, #4CAF50, #388E3C);">Générer PDF ${window.getPdfCompanyName ? window.getPdfCompanyName('BENALI') : 'BEN ALI'}</button>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);

        const benaliDevisInput = document.getElementById('benaliDevisInput');

        // Auto-add current year when user leaves the devis input field
        benaliDevisInput.addEventListener('blur', () => {
            let value = benaliDevisInput.value.trim();
            if (value && !value.includes('/')) {
                benaliDevisInput.value = value + '/' + currentYear;
            }
        });

        document.getElementById('benaliCancelBtn').addEventListener('click', () => {
            overlay.remove();
            resolve(null);
        });

        document.getElementById('benaliGenerateBtn').addEventListener('click', async () => {
            try {
                const percentage = parseFloat(document.getElementById('benaliPercentageInput').value) || 0;
                const customDate = document.getElementById('benaliDateInput').value;
                const customDevisNumber = document.getElementById('benaliDevisInput').value.trim();

                if (!customDevisNumber) {
                    window.notify.warning('Champ requis', 'Veuillez saisir un numéro de Devis avant de continuer.');
                    benaliDevisInput.focus();
                    return;
                }

                // Check if Devis number already exists
                const existsResult = await window.electron.dbBenAli.checkDevisExists(customDevisNumber, currentYear);
                if (existsResult.success && existsResult.data) {
                    window.notify.error('Numéro déjà utilisé', 'Ce numéro de Devis a déjà été utilisé cette année. Veuillez choisir un autre numéro unique.');
                    benaliDevisInput.focus();
                    benaliDevisInput.style.borderColor = '#ff4444';
                    return;
                }

                // Reset border color if valid
                benaliDevisInput.style.borderColor = '#3e3e42';

                // Collect ALL product names (modified or not)
                const productNameInputs = document.querySelectorAll('.product-name-input');
                const modifiedProducts = {};
                productNameInputs.forEach(input => {
                    const indexStr = input.getAttribute('data-index');
                    if (indexStr !== null) {
                        const index = parseInt(indexStr);
                        // Verify index is within bounds of products array
                        if (!isNaN(index) && invoice.products[index]) {
                            const newName = input.value.trim();
                            // Always include the product name, whether changed or not
                            modifiedProducts[index] = newName || invoice.products[index].designation;
                        }
                    }
                });

                // Save settings: percentage to PostgreSQL, product names per-invoice to localStorage
                try {
                    await window.electron.dbBenAli.savePdfSettings(percentage, {});
                } catch (e) { console.warn('Could not save BEN ALI settings:', e); }
                try {
                    localStorage.setItem(`customPdfProducts_BENALI_${invoice.id}`, JSON.stringify(modifiedProducts));
                } catch (e) {}

                overlay.remove();
                resolve({ percentage, customDate, customDevisNumber, modifiedProducts });

            } catch (error) {
                console.error('Error in modal:', error);
                window.notify.error('Erreur', 'Une erreur est survenue: ' + error.message);
            }
        });

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.remove();
                resolve(null);
            }
        });
    });
}

// Generate BEN ALI PDF content
async function generateBenAliPDFContent(doc, invoice) {
    const config = COMPANY_CONFIGS.BENALI;

    // Load BEN ALI assets (use custom images from settings if available)
    const headerSrc = window.getPdfCompanyImage ? window.getPdfCompanyImage('BENALI', 'header') : config.headerPath;
    const footerSrc = window.getPdfCompanyImage ? window.getPdfCompanyImage('BENALI', 'footer') : config.footerPath;
    const signatureSrc = window.getPdfCompanyImage ? window.getPdfCompanyImage('BENALI', 'signature') : config.signaturePath;
    const headerImg = await loadCompanyImage(headerSrc);
    const footerImg = await loadCompanyImage(footerSrc);
    const signatureImg = await loadCompanyImage(signatureSrc);

    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;

    let currentY = 20;
    let pageCount = 1;

    // Function to add header
    const addHeader = () => {
        if (headerImg) {
            const headerHeight = 40;
            doc.addImage(headerImg, 'PNG', 0, 0, pageWidth, headerHeight);
            currentY = headerHeight + 10;
        } else {
            currentY = 20;
        }
    };

    // Function to add footer
    const addFooter = (pageNum, totalPages) => {
        if (footerImg) {
            const footerHeight = 35;
            const footerY = pageHeight - footerHeight - 5;
            doc.addImage(footerImg, 'PNG', 0, footerY, pageWidth, footerHeight);

            // Add signature above footer
            if (signatureImg) {
                const signatureWidth = 60;
                const signatureHeight = 30;
                const signatureX = (pageWidth - signatureWidth) / 2;
                const signatureY = footerY - 25;
                doc.addImage(signatureImg, 'PNG', signatureX, signatureY, signatureWidth, signatureHeight);
            }

            // Page number
            doc.setFontSize(10);
            doc.setTextColor(100, 100, 100);
            const pageText = `${pageNum}/${totalPages}`;
            doc.text(pageText, pageWidth / 2, pageHeight - 8, { align: 'center' });
        }
    };

    // Function to add client/invoice header info
    const addInfoSection = () => {
        const dateStr = (window.safeParseDate||function(d){return new Date(d)})(invoice.document_date).toLocaleDateString('fr-FR');

        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.setFont(undefined, 'bold');
        doc.text(`CLIENT: ${invoice.client_nom}`, 20, currentY);
        doc.text(`Date: ${dateStr}`, pageWidth - 20, currentY, { align: 'right' });
        currentY += 6;

        doc.setFont(undefined, 'normal');
        doc.setFontSize(10);
        const iceValue = invoice.client_ice && invoice.client_ice !== '0' ? invoice.client_ice : 'Non spécifié';
        doc.text(`ICE: ${iceValue}`, 20, currentY);
        currentY += 14;

        doc.setFontSize(14);
        doc.setFont(undefined, 'bold');
        doc.text(`N° Devis: ${invoice.document_numero_devis}`, 20, currentY);
        currentY += 10;
    };

    // Table configuration
    const colWidths = [100, 25, 35, 30]; // Designation, Quantité, P.U HT, Total HT
    const tableStartX = 15;
    const tableWidth = 180;

    // Function to add table header row
    const addTableHeader = () => {
        const headerStartY = currentY;

        doc.setFillColor(76, 175, 80);
        doc.rect(tableStartX, currentY, tableWidth, 8, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(9);
        doc.setFont(undefined, 'bold');
        doc.text('Désignation', 18, currentY + 5.5);
        doc.text('Quantité', 120, currentY + 5.5);
        doc.text('P.U HT', 145, currentY + 5.5);
        doc.text('Total HT', 178, currentY + 5.5);
        currentY += 10;

        return headerStartY;
    };

    // Add first page header
    addHeader();
    currentY += 5;

    // Add client info
    addInfoSection();

    // Add table header
    const firstTableStartY = addTableHeader();

    // Track table segments for border drawing
    let tableSegments = [];
    let currentSegmentStart = firstTableStartY;

    // Process products with multi-page description support
    doc.setTextColor(0, 0, 0);
    doc.setFont(undefined, 'normal');

    invoice.products.forEach((product, index) => {
        const designation = product.designation || '';
        const descriptionLines = doc.splitTextToSize(designation, 95);
        const quantityText = String(product.quantite || '');
        const unitPriceText = parseFloat(product.prix_unitaire_ht).toFixed(2);
        const totalHtText = parseFloat(product.total_ht).toFixed(2);

        let lineIndex = 0;
        let isFirstChunkOfProduct = true;

        while (lineIndex < descriptionLines.length) {
            // Check available height on this page (reserve 80px for footer/signature)
            let availableHeight = pageHeight - 80 - currentY;

            if (availableHeight < 12) {
                // Save current table segment before page break
                tableSegments.push({
                    startY: currentSegmentStart,
                    endY: currentY,
                    page: pageCount
                });

                // New page
                doc.addPage();
                pageCount++;
                addHeader();
                currentY += 5;
                addInfoSection();
                currentSegmentStart = addTableHeader();

                // Reset text style after header
                doc.setTextColor(0, 0, 0);
                doc.setFont(undefined, 'normal');
                doc.setFontSize(8);

                availableHeight = pageHeight - 80 - currentY;
            }

            // Calculate how many description lines fit on this page
            const remainingLines = descriptionLines.length - lineIndex;
            const maxLinesThisPage = Math.max(1, Math.floor((availableHeight - 4) / 4));
            const linesForThisRow = Math.min(remainingLines, maxLinesThisPage);
            const rowHeight = Math.max(8, linesForThisRow * 4 + 4);

            const rowY = currentY;

            // Alternating row background - only on first chunk of product
            if (isFirstChunkOfProduct && index % 2 === 0) {
                doc.setFillColor(245, 245, 245);
                doc.rect(tableStartX, rowY - 2, tableWidth, rowHeight, 'F');
            }

            // Draw description chunk
            doc.setFontSize(8);
            doc.setTextColor(0, 0, 0);
            doc.setFont(undefined, 'normal');
            const descriptionChunk = descriptionLines.slice(lineIndex, lineIndex + linesForThisRow);
            descriptionChunk.forEach((line, i) => {
                doc.text(line, 18, rowY + 3 + i * 4);
            });

            // Draw quantity, price, and total ONLY on the first chunk of each product
            if (isFirstChunkOfProduct) {
                doc.setFontSize(9);
                doc.text(quantityText, 120, rowY + 4);
                doc.text(unitPriceText, 155, rowY + 4, { align: 'right' });
                doc.text(totalHtText, 193, rowY + 4, { align: 'right' });
            }

            // Draw bottom border for this row
            doc.setDrawColor(220, 220, 220);
            doc.setLineWidth(0.2);
            doc.line(tableStartX, rowY + rowHeight - 2, tableStartX + tableWidth, rowY + rowHeight - 2);

            currentY = rowY + rowHeight;
            lineIndex += linesForThisRow;
            isFirstChunkOfProduct = false;
        }
    });

    // Save the last table segment
    tableSegments.push({
        startY: currentSegmentStart,
        endY: currentY,
        page: pageCount
    });

    // Draw outer table borders and column dividers for all segments
    tableSegments.forEach(segment => {
        doc.setPage(segment.page);
        doc.setDrawColor(200, 200, 200);
        doc.setLineWidth(0.3);
        doc.rect(tableStartX, segment.startY, tableWidth, segment.endY - segment.startY);
    });

    // Ensure we are on the last page for totals
    doc.setPage(pageCount);
    console.log('🔍 [BEN ALI PDF] Before totals check:');
    console.log('   currentY:', currentY);
    console.log('   pageHeight:', pageHeight);
    console.log('   pageHeight - 45:', pageHeight - 45);
    console.log('   currentY + 35:', currentY + 35);
    console.log('   Will fit on same page?', currentY + 35 <= pageHeight - 45);

    // Check if totals fit on this page (need ~35px for totals, footer starts at ~pageHeight-45)
    if (currentY + 35 > pageHeight - 45) {
        console.log('   ❌ Totals do NOT fit - adding new page');
        tableSegments.push({
            startY: currentSegmentStart,
            endY: currentY,
            page: pageCount
        });
        doc.addPage();
        pageCount++;
        addHeader();
        // On new page: place totals near footer
        currentY = pageHeight - 45 - 35;
        console.log('   New page created. currentY set to:', currentY);
    } else {
        console.log('   ✅ Totals fit on same page');
        // Same page: place totals right after table
        currentY = currentY + 8;
        console.log('   currentY set to:', currentY);
    }
    const totalsX = 130;

    doc.setFillColor(76, 175, 80);
    doc.rect(totalsX, currentY, 65, 7, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.setFont(undefined, 'bold');
    doc.text('Total HT', totalsX + 3, currentY + 5);
    doc.text(parseFloat(invoice.total_ht).toFixed(2) + ' DH', totalsX + 62, currentY + 5, { align: 'right' });
    currentY += 8;

    // Only show TVA row if tva_rate > 0
    if (parseFloat(invoice.tva_rate) > 0) {
        doc.setFillColor(220, 220, 220);
        doc.rect(totalsX, currentY, 65, 7, 'F');
        doc.setTextColor(0, 0, 0);
        doc.text('TVA ' + invoice.tva_rate + '%', totalsX + 3, currentY + 5);
        doc.text(parseFloat(invoice.montant_tva).toFixed(2) + ' DH', totalsX + 62, currentY + 5, { align: 'right' });
        currentY += 8;

        doc.setFillColor(56, 142, 60);
        doc.rect(totalsX, currentY, 65, 7, 'F');
        doc.setTextColor(255, 255, 255);
        doc.text('Total TTC', totalsX + 3, currentY + 5);
        doc.text(parseFloat(invoice.total_ttc).toFixed(2) + ' DH', totalsX + 62, currentY + 5, { align: 'right' });
    } else {
        // If TVA is 0%, show only TOTAL (which equals HT)
        doc.setFillColor(56, 142, 60);
        doc.rect(totalsX, currentY, 65, 7, 'F');
        doc.setTextColor(255, 255, 255);
        doc.text('TOTAL', totalsX + 3, currentY + 5);
        doc.text(parseFloat(invoice.total_ht).toFixed(2) + ' DH', totalsX + 62, currentY + 5, { align: 'right' });
    }

    // Add footer to all pages
    const totalPages = pageCount;
    for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        addFooter(i, totalPages);
    }
}

// ==========================================
// Generic Custom Company PDF Generation
// ==========================================

// Generate PDF for any custom company
async function generateCustomCompanyPDF(invoiceId, sourceDb, companyCode) {
    const companyName = window.getPdfCompanyName ? window.getPdfCompanyName(companyCode) : companyCode;
    const allCompanies = window.getAllPdfCompanies ? window.getAllPdfCompanies() : [];
    const companyData = allCompanies.find(c => c.code === companyCode);
    const companyColor = companyData ? companyData.color : '#2196F3';

    try {
        console.log(`📥 Generating ${companyCode} PDF for invoice:`, invoiceId);

        // Get invoice data from source database
        let result;
        if (sourceDb === 'multi' && window.electron.dbMulti) {
            result = await window.electron.dbMulti.getInvoiceById(invoiceId);
        } else if (sourceDb === 'chaimae' && window.electron.dbChaimae) {
            result = await window.electron.dbChaimae.getInvoiceById(invoiceId);
        } else if (window.electron.db) {
            result = await window.electron.db.getInvoiceById(invoiceId);
        } else {
            throw new Error('Base de données non disponible');
        }

        if (!result.success || !result.data) {
            throw new Error('Document introuvable');
        }

        const invoice = result.data;

        if (invoice.document_type !== 'devis') {
            window.notify.warning('Type incorrect', 'Cette fonction est disponible uniquement pour les devis.', 4000);
            return;
        }

        // Show customization modal
        const customizationData = await showCustomCompanyModal(invoice, companyCode, companyName, companyColor);
        if (!customizationData) {
            console.log(`❌ User cancelled ${companyCode} PDF generation`);
            return;
        }

        // Show loading overlay
        let loadingOverlay = null;
        try {
            loadingOverlay = createPDFLoadingOverlay(companyCode);
            document.body.appendChild(loadingOverlay);
        } catch (e) {
            console.warn('Could not show loading overlay:', e);
        }

        try {
            if (typeof window.jspdf === 'undefined') {
                await loadJsPDF();
            }

            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();

            // Apply customizations
            const customizedInvoice = { ...invoice };

            if (customizationData.percentage && customizationData.percentage > 0) {
                customizedInvoice.products = customizedInvoice.products.map(product => ({
                    ...product,
                    prix_unitaire_ht: parseFloat(product.prix_unitaire_ht) * (1 + customizationData.percentage / 100),
                    total_ht: parseFloat(product.total_ht) * (1 + customizationData.percentage / 100)
                }));

                const newTotalHT = customizedInvoice.products.reduce((sum, p) => sum + parseFloat(p.total_ht), 0);
                const newMontantTVA = newTotalHT * (parseFloat(customizedInvoice.tva_rate) / 100);
                const newTotalTTC = newTotalHT + newMontantTVA;

                customizedInvoice.total_ht = newTotalHT;
                customizedInvoice.montant_tva = newMontantTVA;
                customizedInvoice.total_ttc = newTotalTTC;
            }

            if (customizationData.customDate) {
                customizedInvoice.document_date = customizationData.customDate;
            }
            if (customizationData.customDevisNumber) {
                customizedInvoice.document_numero_devis = customizationData.customDevisNumber;
            }

            if (customizationData.modifiedProducts) {
                customizedInvoice.products = customizedInvoice.products.map((product, index) => ({
                    ...product,
                    designation: customizationData.modifiedProducts[index] || product.designation
                }));
            }

            // Exclude products marked for deletion
            if (customizationData.excludedIndices && customizationData.excludedIndices.length > 0) {
                const excluded = new Set(customizationData.excludedIndices);
                customizedInvoice.products = customizedInvoice.products.filter((_, index) => !excluded.has(index));
                // Recalculate totals after exclusion
                const newTotalHT = customizedInvoice.products.reduce((sum, p) => sum + parseFloat(p.total_ht || 0), 0);
                const tvaRateValue = parseFloat(customizedInvoice.tva_rate);
                const newMontantTVA = newTotalHT * ((isNaN(tvaRateValue) ? 20 : tvaRateValue) / 100);
                customizedInvoice.total_ht = newTotalHT;
                customizedInvoice.montant_tva = newMontantTVA;
                customizedInvoice.total_ttc = newTotalHT + newMontantTVA;
            }

            // If downloadAsOther: use current logged-in company header instead of target company
            const effectiveCompanyCode = customizationData.downloadAsOther
                ? (JSON.parse(localStorage.getItem('selectedCompany') || '{}').code || companyCode)
                : companyCode;
            const effectiveCompanyColor = customizationData.downloadAsOther ? '#2196f3' : companyColor;

            // Generate PDF content with dynamic company color and table style
            const tableStyle = companyData ? (companyData.tableStyle || 'style1') : 'style1';
            console.log(`📊 [${companyCode}] Using table style: ${tableStyle}`);
            await generateGenericPDFContent(doc, customizedInvoice, effectiveCompanyCode, effectiveCompanyColor, tableStyle);

            // Save devis number to database for auto-increment tracking
            const invoiceNumber = customizationData.customDevisNumber || customizedInvoice.document_numero_devis || customizedInvoice.document_numero || 'N-A';
            try {
                const currentYear = new Date().getFullYear();
                await window.electron.dbDynamic.addDevisNumber(companyCode, invoiceNumber, currentYear);
                console.log(`✅ [${companyCode}] Devis number '${invoiceNumber}' saved to database`);
            } catch (dbErr) {
                console.warn(`⚠️ [${companyCode}] Could not save devis number to DB:`, dbErr);
            }

            // Save the PDF
            const docType = customizedInvoice.document_type === 'devis' ? 'Devis' : 'Facture';
            const companyFileName = window.getPdfCompanyFileName ? window.getPdfCompanyFileName(companyCode) : companyCode;
            // Sanitize filename: replace / with - to avoid path separator issues
            const safeInvoiceNumber = invoiceNumber.replace(/\//g, '-');
            const safeClientName = (customizedInvoice.client_nom || 'Client').replace(/[\/\\:*?"<>|]/g, '_');
            const fileName = `${companyFileName}_${docType}_${safeClientName}_${safeInvoiceNumber}.pdf`;
            
            console.log(`📄 [${companyCode}] Generating PDF filename:`);
            console.log(`   - Company file name: ${companyFileName}`);
            console.log(`   - Doc type: ${docType}`);
            console.log(`   - Client: ${safeClientName}`);
            console.log(`   - Invoice number: ${invoiceNumber} → sanitized: ${safeInvoiceNumber}`);
            console.log(`   - Final filename: ${fileName}`);

            // Try to upload to server
            const pdfArrayBuffer = doc.output('arraybuffer');
            const pdfUint8Array = new Uint8Array(pdfArrayBuffer);

            const selectedCompany = JSON.parse(localStorage.getItem('selectedCompany') || '{}');
            const createdBy = selectedCompany.code || selectedCompany.name || 'Unknown';

            let uploaded = false;
            try {
                // Use dbDynamic.uploadPdf with companyCode (NOT dbSmartS which hardcodes SKM)
                console.log(`☁️ [${companyCode}] Uploading PDF to server with filename: ${fileName} (company: ${companyCode})`);
                const uploadResult = await window.electron.dbDynamic.uploadPdf(companyCode, pdfUint8Array, fileName);
                if (uploadResult.success) {
                    console.log(`✅ [${companyCode}] PDF uploaded successfully!`);
                    console.log(`   - Server path: ${uploadResult.filePath}`);
                    console.log(`   - Company folder: ${companyCode}`);
                    uploaded = true;
                    
                    // Save PDF path to database for tracking
                    try {
                        const currentYear = new Date().getFullYear();
                        await window.electron.dbDynamic.savePdfPath(companyCode, invoiceNumber, currentYear, uploadResult.filePath, createdBy);
                        console.log(`✅ ${companyCode} PDF metadata synced to PostgreSQL`);
                    } catch (dbErr) {
                        console.error(`⚠️ Failed to sync ${companyCode} PDF metadata to PostgreSQL:`, dbErr);
                    }
                    
                    doc.save(fileName);
                }
            } catch (e) {
                console.warn(`Could not upload ${companyCode} PDF:`, e);
            }

            if (!uploaded) {
                // Fallback: save locally
                const saveFolder = companyCode.toLowerCase();
                const pdfUint8ArrayFallback = new Uint8Array(doc.output('arraybuffer'));

                try {
                    const saveResult = await window.electron.pdf.savePdf(pdfUint8ArrayFallback, saveFolder, safeInvoiceNumber, createdBy);
                    if (saveResult.success) {
                        console.log(`✅ ${companyCode} PDF saved locally`);
                    }
                } catch (e) {
                    console.warn('Local save failed:', e);
                }
                doc.save(fileName);
            }

            // Remove loading overlay BEFORE showing notification
            if (loadingOverlay && loadingOverlay.parentNode) {
                loadingOverlay.remove();
                loadingOverlay = null;
            }

            if (uploaded) {
                window.notify.success('Succès', `PDF ${companyName} généré et sauvegardé: ${fileName}`, 3000);
            } else {
                window.notify.warning('Mode Hors Ligne', 'Le PDF a été sauvegardé localement.', 4000);
            }

        } catch (innerError) {
            console.error(`❌ Error in ${companyCode} PDF generation:`, innerError);
            // Remove loading overlay on error
            if (loadingOverlay && loadingOverlay.parentNode) {
                loadingOverlay.remove();
                loadingOverlay = null;
            }
            throw innerError;
        } finally {
            // Safety net: always remove loading overlay if still present
            if (loadingOverlay && loadingOverlay.parentNode) {
                loadingOverlay.remove();
            }
        }

    } catch (error) {
        console.error(`❌ Error generating ${companyCode} PDF:`, error);
        window.notify.error('Erreur', `Impossible de générer le PDF ${companyName}: ` + error.message, 4000);
    }
}

// Show customization modal for any custom company
async function showCustomCompanyModal(invoice, companyCode, companyName, companyColor) {
    const selectedCompany = JSON.parse(localStorage.getItem('selectedCompany') || '{}');
    const creatorName = selectedCompany.name || 'Inconnue';

    // Load saved settings from localStorage (percentage is per-company, product names are per-invoice)
    let savedPercentage = '';
    let savedProductNames = {};
    try {
        const saved = localStorage.getItem(`customPdfSettings_${companyCode}`);
        if (saved) {
            const parsed = JSON.parse(saved);
            savedPercentage = parsed.percentage || '';
        }
    } catch (e) {}
    try {
        const savedProducts = localStorage.getItem(`customPdfProducts_${companyCode}_${invoice.id}`);
        if (savedProducts) {
            savedProductNames = JSON.parse(savedProducts);
        }
    } catch (e) {}

    const currentYear = new Date().getFullYear();

    // Get last/max devis number from database for auto-increment
    let lastDevisNumber = 'Aucun';
    let nextDevisNumber = '1/' + currentYear;
    try {
        const result = await window.electron.dbDynamic.getMaxDevisNumber(companyCode, currentYear);
        console.log(`📋 [${companyCode}] DB Max Devis Result:`, result);
        if (result && result.success && result.data && result.data.devis_number) {
            lastDevisNumber = result.data.devis_number;
            // Extract the numeric part before '/' and increment
            const match = lastDevisNumber.match(/^(\d+)/);
            if (match) {
                const nextNum = parseInt(match[1]) + 1;
                nextDevisNumber = nextNum + '/' + currentYear;
            }
        }
    } catch (e) {
        console.warn(`⚠️ Could not get max devis number for ${companyCode}:`, e);
    }
    console.log(`📋 [${companyCode}] Last devis: ${lastDevisNumber}, Next suggested: ${nextDevisNumber}`);

    return new Promise((resolve) => {
        const overlay = document.createElement('div');
        overlay.className = 'custom-modal-overlay';

        // Track deleted product indices
        const deletedProductIndices = new Set();

        // Generate product inputs
        const productsHtml = invoice.products.map((product, index) => {
            const displayName = savedProductNames[index] || product.designation || '';
            return `
            <div id="product-row-${index}" style="margin-bottom: 0.5rem; display: flex; align-items: flex-start; gap: 0.5rem;">
                <div style="flex: 1;">
                    <label style="display: block; margin-bottom: 0.2rem; color: #aaa; font-size: 0.8rem;">
                        Produit ${index + 1}: Quantité: ${product.quantite}
                    </label>
                    <textarea class="product-name-input" data-index="${index}"
                           style="width: 100%; padding: 0.5rem; background: #2d2d30; border: 1px solid #3e3e42; border-radius: 4px; color: #fff; font-size: 0.9rem; resize: vertical; min-height: 40px;"
                           placeholder="Nom du produit">${displayName}</textarea>
                </div>
                <button type="button" onclick="(function(){
                    var row = document.getElementById('product-row-${index}');
                    if(row.style.opacity === '0.3') {
                        row.style.opacity = '1';
                        row.querySelector('textarea').disabled = false;
                        row.querySelector('button').title = 'Exclure ce produit du PDF';
                        row.querySelector('button').style.background = '#c0392b';
                        row.querySelector('button').textContent = '🗑️';
                        window._deletedProductIndices_custom = window._deletedProductIndices_custom || new Set();
                        window._deletedProductIndices_custom.delete(${index});
                    } else {
                        row.style.opacity = '0.3';
                        row.querySelector('textarea').disabled = true;
                        row.querySelector('button').title = 'Restaurer ce produit';
                        row.querySelector('button').style.background = '#27ae60';
                        row.querySelector('button').textContent = '↩️';
                        window._deletedProductIndices_custom = window._deletedProductIndices_custom || new Set();
                        window._deletedProductIndices_custom.add(${index});
                    }
                })()"
                    title="Exclure ce produit du PDF"
                    style="margin-top: 1.4rem; padding: 0.4rem 0.6rem; background: #c0392b; border: none; border-radius: 4px; color: #fff; cursor: pointer; font-size: 0.85rem; flex-shrink: 0;">🗑️</button>
            </div>
        `}).join('');

        overlay.innerHTML = `
            <div class="custom-modal" style="max-width: 600px; max-height: 80vh; display: flex; flex-direction: column;">
                <div class="custom-modal-header" style="background: linear-gradient(135deg, ${companyColor}, ${companyColor}cc);">
                    <span class="custom-modal-icon info">🎨</span>
                    <h3 class="custom-modal-title" style="color: #fff;">PDF ${companyName} - Personnalisation</h3>
                    <div style="position: absolute; top: 1rem; right: 1rem; background: rgba(255,255,255,0.2); color: #fff; padding: 0.4rem 0.8rem; border-radius: 4px; font-size: 0.85rem; font-weight: 600;">
                        🏢 Créé par: <strong>${creatorName}</strong>
                    </div>
                </div>
                <div class="custom-modal-body" style="overflow-y: auto; flex: 1; max-height: calc(80vh - 140px);">
                    <div style="margin-bottom: 1.5rem;">
                        <label style="display: block; margin-bottom: 0.5rem; color: #e0e0e0; font-weight: 600;">
                            Pourcentage d'ajustement (%) :
                        </label>
                        <input type="number" id="customPercentageInput" placeholder="0" min="0" max="100" step="0.1" value="${savedPercentage}"
                               style="width: 100%; padding: 0.75rem; background: #2d2d30; border: 1px solid #3e3e42; border-radius: 6px; color: #fff; font-size: 1rem;">
                        <small style="color: #888; display: block; margin-top: 0.3rem;">Ce pourcentage sera appliqué aux prix mais ne sera pas visible dans le PDF</small>
                    </div>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem;">
                        <div>
                            <label style="display: block; margin-bottom: 0.5rem; color: #e0e0e0; font-weight: 600;">
                                Date personnalisée :
                            </label>
                            <input type="date" id="customDateInput" value="${window.todayDateString ? window.todayDateString() : new Date().toISOString().slice(0, 10)}"
                                   style="width: 100%; padding: 0.75rem; background: #2d2d30; border: 1px solid #3e3e42; border-radius: 6px; color: #fff; font-size: 1rem;">
                        </div>
                        <div>
                            <label style="display: block; margin-bottom: 0.5rem; color: #e0e0e0; font-weight: 600;">
                                N° Devis personnalisé :
                            </label>
                            <input type="text" id="customDevisInput" value="${nextDevisNumber}" placeholder="${nextDevisNumber}" autocomplete="off"
                                   style="width: 100%; padding: 0.75rem; background: #2d2d30; border: 1px solid #3e3e42; border-radius: 6px; color: #fff; font-size: 1rem;">
                            <small style="color: #4CAF50; display: block; margin-top: 0.5rem; font-weight: 500;">
                                📋 Plus grand N°: <strong>${lastDevisNumber}</strong>
                            </small>
                        </div>
                    </div>

                    <div style="margin-top: 1.5rem;">
                        <label style="display: block; margin-bottom: 0.5rem; color: #e0e0e0; font-weight: 600;">
                            Modifier les noms des produits :
                        </label>
                        <div style="background: #252526; padding: 1rem; border-radius: 6px; max-height: 200px; overflow-y: auto; border: 1px solid #3e3e42;">
                            ${productsHtml}
                        </div>
                    </div>
                </div>
                <div class="custom-modal-footer">
                    <button id="customCancelBtn" class="custom-modal-btn secondary">Annuler</button>
                    <button id="customGenerateBtn" class="custom-modal-btn primary" style="background: linear-gradient(135deg, ${companyColor}, ${companyColor}cc);">Générer PDF ${companyName}</button>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);

        const devisInput = document.getElementById('customDevisInput');

        devisInput.addEventListener('blur', () => {
            let value = devisInput.value.trim();
            if (value && !value.includes('/')) {
                devisInput.value = value + '/' + currentYear;
            }
        });

        document.getElementById('customCancelBtn').addEventListener('click', () => {
            overlay.remove();
            window._deletedProductIndices_custom = new Set();
            resolve(null);
        });

        // Helper to collect form data
        function collectCustomFormData() {
            const percentage = parseFloat(document.getElementById('customPercentageInput').value) || 0;
            const customDate = document.getElementById('customDateInput').value;
            const customDevisNumber = devisInput.value.trim();
            const productNameInputs = document.querySelectorAll('.product-name-input');
            const modifiedProducts = {};
            const excludedIndices = Array.from(window._deletedProductIndices_custom || []);
            productNameInputs.forEach(input => {
                const indexStr = input.getAttribute('data-index');
                if (indexStr !== null) {
                    const index = parseInt(indexStr);
                    if (!isNaN(index) && invoice.products[index]) {
                        modifiedProducts[index] = input.value.trim() || invoice.products[index].designation;
                    }
                }
            });
            return { percentage, customDate, customDevisNumber, modifiedProducts, excludedIndices };
        }

        document.getElementById('customGenerateBtn').addEventListener('click', async () => {
            const { percentage, customDate, customDevisNumber, modifiedProducts, excludedIndices } = collectCustomFormData();

            if (!customDevisNumber) {
                window.notify.warning('Champ requis', 'Veuillez saisir un numéro de Devis.');
                devisInput.focus();
                return;
            }

            // Check if devis number already exists in database
            try {
                const existsResult = await window.electron.dbDynamic.checkDevisExists(companyCode, customDevisNumber, currentYear);
                if (existsResult && existsResult.success && existsResult.data) {
                    window.notify.error('Numéro déjà utilisé', `Le N° "${customDevisNumber}" existe déjà pour ${companyName}. Veuillez choisir un autre numéro.`);
                    devisInput.focus();
                    devisInput.style.borderColor = '#ff4444';
                    return;
                }
            } catch (e) {
                console.warn('Could not check devis existence:', e);
            }
            devisInput.style.borderColor = '#3e3e42';

            // Save settings to localStorage for next time
            try {
                localStorage.setItem(`customPdfSettings_${companyCode}`, JSON.stringify({ percentage }));
                localStorage.setItem(`customPdfProducts_${companyCode}_${invoice.id}`, JSON.stringify(modifiedProducts));
            } catch (e) {}

            overlay.remove();
            window._deletedProductIndices_custom = new Set();
            resolve({ percentage, customDate, customDevisNumber, modifiedProducts, excludedIndices });
        });

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.remove();
                resolve(null);
            }
        });
    });
}

// Generate PDF content for any company (generic version)
async function generateGenericPDFContent(doc, invoice, companyCode, companyColor, tableStyle) {
    tableStyle = tableStyle || 'style1';

    // Load company assets
    const headerSrc = window.getPdfCompanyImage ? window.getPdfCompanyImage(companyCode, 'header') : null;
    const footerSrc = window.getPdfCompanyImage ? window.getPdfCompanyImage(companyCode, 'footer') : null;
    const signatureSrc = window.getPdfCompanyImage ? window.getPdfCompanyImage(companyCode, 'signature') : null;
    const headerImg = headerSrc ? await loadCompanyImage(headerSrc) : null;
    const footerImg = footerSrc ? await loadCompanyImage(footerSrc) : null;
    const signatureImg = signatureSrc ? await loadCompanyImage(signatureSrc) : null;

    // Parse company color to RGB
    const hexToRgb = (hex) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return [r, g, b];
    };
    const [ccr, ccg, ccb] = hexToRgb(companyColor); // raw company color

    // Fixed color palettes per style (so PDF matches SVG preview exactly)
    // Only style2 uses company color; others have their own fixed palette
    let cr, cg, cb, dr, dg, db, lr, lg, lb;
    if (tableStyle === 'style2') {
        // Moderne: uses company color
        [cr, cg, cb] = [ccr, ccg, ccb];
    } else if (tableStyle === 'style5') {
        // Coloré: fixed blue palette
        [cr, cg, cb] = [33, 150, 243]; // #2196F3
    } else if (tableStyle === 'style6') {
        // Compact: fixed dark grey
        [cr, cg, cb] = [100, 100, 100]; // #666666
    } else {
        // style1, style3, style4, style7: grey/black (company color not used for these)
        [cr, cg, cb] = [80, 80, 80];
    }
    [dr, dg, db] = [Math.max(0, cr - 30), Math.max(0, cg - 30), Math.max(0, cb - 30)]; // darker variant
    [lr, lg, lb] = [Math.min(255, cr + 180), Math.min(255, cg + 180), Math.min(255, cb + 180)]; // lighter variant for zebra

    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;

    let currentY = 20;
    let pageCount = 1;

    // Font sizes based on style
    const fontSize = tableStyle === 'style6' ? 7 : 8;
    const headerFontSize = tableStyle === 'style6' ? 8 : 9;
    const rowPadding = tableStyle === 'style6' ? 3 : 4;
    const headerHeight = tableStyle === 'style6' ? 7 : 8;

    const addHeader = () => {
        if (headerImg) {
            const hdrHeight = 40;
            doc.addImage(headerImg, 'PNG', 0, 0, pageWidth, hdrHeight);
            currentY = hdrHeight + 10;
        } else {
            currentY = 20;
        }
    };

    const addFooter = (pageNum, totalPages) => {
        if (footerImg) {
            const ftrHeight = 35;
            const footerY = pageHeight - ftrHeight - 5;
            doc.addImage(footerImg, 'PNG', 0, footerY, pageWidth, ftrHeight);

            if (signatureImg) {
                const signatureWidth = 60;
                const signatureHeight = 30;
                const signatureX = (pageWidth - signatureWidth) / 2;
                const signatureY = footerY - 25;
                doc.addImage(signatureImg, 'PNG', signatureX, signatureY, signatureWidth, signatureHeight);
            }

            doc.setFontSize(10);
            doc.setTextColor(100, 100, 100);
            doc.text(`${pageNum}/${totalPages}`, pageWidth / 2, pageHeight - 8, { align: 'center' });
        }
    };

    const addInfoSection = () => {
        const dateStr = (window.safeParseDate||function(d){return new Date(d)})(invoice.document_date).toLocaleDateString('fr-FR');

        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.setFont(undefined, 'bold');
        doc.text(`CLIENT: ${invoice.client_nom}`, 20, currentY);
        doc.text(`Date: ${dateStr}`, pageWidth - 20, currentY, { align: 'right' });
        currentY += 6;

        doc.setFont(undefined, 'normal');
        doc.setFontSize(10);
        const iceValue = invoice.client_ice && invoice.client_ice !== '0' ? invoice.client_ice : 'Non spécifié';
        doc.text(`ICE: ${iceValue}`, 20, currentY);
        currentY += 14;

        doc.setFontSize(14);
        doc.setFont(undefined, 'bold');
        doc.text(`N° Devis: ${invoice.document_numero_devis}`, 20, currentY);
        currentY += 10;
    };

    const tableStartX = 15;
    const tableWidth = 180;

    // ========== TABLE HEADER - varies by style ==========
    const addTableHeader = () => {
        const headerStartY = currentY;

        if (tableStyle === 'style1') {
            // Classique: grey header with borders
            doc.setFillColor(80, 80, 80);
            doc.rect(tableStartX, currentY, tableWidth, headerHeight, 'F');
            doc.setTextColor(255, 255, 255);
        } else if (tableStyle === 'style2') {
            // Moderne: company color header
            doc.setFillColor(cr, cg, cb);
            doc.rect(tableStartX, currentY, tableWidth, headerHeight, 'F');
            doc.setTextColor(255, 255, 255);
        } else if (tableStyle === 'style3') {
            // Minimal: no background, just bottom line
            doc.setTextColor(0, 0, 0);
            doc.setDrawColor(180, 180, 180);
            doc.setLineWidth(0.5);
            doc.line(tableStartX, currentY + headerHeight, tableStartX + tableWidth, currentY + headerHeight);
        } else if (tableStyle === 'style4') {
            // Professionnel: black header, thick borders
            doc.setFillColor(0, 0, 0);
            doc.rect(tableStartX, currentY, tableWidth, headerHeight, 'F');
            doc.setTextColor(255, 255, 255);
        } else if (tableStyle === 'style5') {
            // Coloré: gradient-like (company color to darker)
            doc.setFillColor(cr, cg, cb);
            doc.rect(tableStartX, currentY, tableWidth / 2, headerHeight, 'F');
            doc.setFillColor(dr, dg, db);
            doc.rect(tableStartX + tableWidth / 2, currentY, tableWidth / 2, headerHeight, 'F');
            doc.setTextColor(255, 255, 255);
        } else if (tableStyle === 'style6') {
            // Compact: small grey header
            doc.setFillColor(100, 100, 100);
            doc.rect(tableStartX, currentY, tableWidth, headerHeight, 'F');
            doc.setTextColor(255, 255, 255);
        } else if (tableStyle === 'style7') {
            // Sans couleur: white header with black text, bottom border only
            doc.setTextColor(0, 0, 0);
            doc.setDrawColor(0, 0, 0);
            doc.setLineWidth(0.8);
            doc.line(tableStartX, currentY + headerHeight, tableStartX + tableWidth, currentY + headerHeight);
        }

        doc.setFontSize(headerFontSize);
        doc.setFont(undefined, 'bold');
        doc.text('Désignation', 18, currentY + headerHeight - 2.5);
        doc.text('Quantité', 120, currentY + headerHeight - 2.5);
        doc.text('P.U HT', 145, currentY + headerHeight - 2.5);
        doc.text('Total HT', 178, currentY + headerHeight - 2.5);
        currentY += headerHeight + 2;

        return headerStartY;
    };

    addHeader();
    currentY += 5;
    addInfoSection();
    const firstTableStartY = addTableHeader();

    let tableSegments = [];
    let currentSegmentStart = firstTableStartY;

    doc.setTextColor(0, 0, 0);
    doc.setFont(undefined, 'normal');

    invoice.products.forEach((product, index) => {
        const designation = product.designation || '';
        const descriptionLines = doc.splitTextToSize(designation, 95);
        const quantityText = String(product.quantite || '');
        const unitPriceText = parseFloat(product.prix_unitaire_ht).toFixed(2);
        const totalHtText = parseFloat(product.total_ht).toFixed(2);

        let lineIndex = 0;
        let isFirstChunkOfProduct = true;

        while (lineIndex < descriptionLines.length) {
            let availableHeight = pageHeight - 80 - currentY;

            if (availableHeight < 12) {
                tableSegments.push({ startY: currentSegmentStart, endY: currentY, page: pageCount });
                doc.addPage();
                pageCount++;
                addHeader();
                currentY += 5;
                addInfoSection();
                currentSegmentStart = addTableHeader();
                doc.setTextColor(0, 0, 0);
                doc.setFont(undefined, 'normal');
                doc.setFontSize(fontSize);
                availableHeight = pageHeight - 80 - currentY;
            }

            const remainingLines = descriptionLines.length - lineIndex;
            const maxLinesThisPage = Math.max(1, Math.floor((availableHeight - rowPadding) / rowPadding));
            const linesForThisRow = Math.min(remainingLines, maxLinesThisPage);
            const rowHeight = Math.max(headerHeight, linesForThisRow * rowPadding + rowPadding);
            const rowY = currentY;

            // ========== ROW BACKGROUND - varies by style ==========
            if (isFirstChunkOfProduct) {
                if (tableStyle === 'style1') {
                    // Classique: light grey alternating
                    if (index % 2 === 0) {
                        doc.setFillColor(245, 245, 245);
                        doc.rect(tableStartX, rowY - 2, tableWidth, rowHeight, 'F');
                    }
                } else if (tableStyle === 'style2') {
                    // Moderne: company-tinted zebra stripes
                    if (index % 2 === 0) {
                        doc.setFillColor(lr, lg, lb);
                        doc.rect(tableStartX, rowY - 2, tableWidth, rowHeight, 'F');
                    }
                } else if (tableStyle === 'style3') {
                    // Minimal: no row background
                } else if (tableStyle === 'style4') {
                    // Professionnel: subtle alternating
                    if (index % 2 === 0) {
                        doc.setFillColor(240, 240, 240);
                        doc.rect(tableStartX, rowY - 2, tableWidth, rowHeight, 'F');
                    }
                } else if (tableStyle === 'style5') {
                    // Coloré: colored alternating
                    if (index % 2 === 0) {
                        doc.setFillColor(lr, lg, lb);
                        doc.rect(tableStartX, rowY - 2, tableWidth, rowHeight, 'F');
                    } else {
                        doc.setFillColor(250, 250, 250);
                        doc.rect(tableStartX, rowY - 2, tableWidth, rowHeight, 'F');
                    }
                } else if (tableStyle === 'style6') {
                    // Compact: very light alternating
                    if (index % 2 === 0) {
                        doc.setFillColor(248, 248, 248);
                        doc.rect(tableStartX, rowY - 2, tableWidth, rowHeight, 'F');
                    }
                } else if (tableStyle === 'style7') {
                    // Sans couleur: no row background
                }
            }

            // Draw description chunk
            doc.setFontSize(fontSize);
            doc.setTextColor(0, 0, 0);
            doc.setFont(undefined, 'normal');
            const descriptionChunk = descriptionLines.slice(lineIndex, lineIndex + linesForThisRow);
            descriptionChunk.forEach((line, i) => {
                doc.text(line, 18, rowY + 3 + i * rowPadding);
            });

            // Draw quantity, price, and total ONLY on the first chunk of each product
            if (isFirstChunkOfProduct) {
                doc.setFontSize(headerFontSize);
                doc.text(quantityText, 120, rowY + 4);
                doc.text(unitPriceText, 155, rowY + 4, { align: 'right' });
                doc.text(totalHtText, 193, rowY + 4, { align: 'right' });
            }

            // ========== ROW BORDER - varies by style ==========
            // Skip the bottom border when it would overlap with the outer table border:
            // 1) Last chunk of the last product (bottom of entire table)
            // 2) Last row before a page break (bottom of page segment)
            const isLastProduct = index === invoice.products.length - 1;
            const isLastChunk = lineIndex + linesForThisRow >= descriptionLines.length;
            const nextY = rowY + rowHeight;
            const remainingAfterRow = pageHeight - 80 - nextY;
            const isLastRowOnPage = remainingAfterRow < 12;
            const skipBorder = (isLastProduct && isLastChunk) || isLastRowOnPage;
            if (!skipBorder) {
                if (tableStyle === 'style3') {
                    // Minimal: thin light separator
                    doc.setDrawColor(210, 210, 210);
                    doc.setLineWidth(0.1);
                    doc.line(tableStartX, rowY + rowHeight - 2, tableStartX + tableWidth, rowY + rowHeight - 2);
                } else if (tableStyle === 'style4') {
                    // Professionnel: darker row borders
                    doc.setDrawColor(150, 150, 150);
                    doc.setLineWidth(0.3);
                    doc.line(tableStartX, rowY + rowHeight - 2, tableStartX + tableWidth, rowY + rowHeight - 2);
                } else if (tableStyle === 'style7') {
                    // Sans couleur: thin black separator
                    doc.setDrawColor(150, 150, 150);
                    doc.setLineWidth(0.2);
                    doc.line(tableStartX, rowY + rowHeight - 2, tableStartX + tableWidth, rowY + rowHeight - 2);
                } else {
                    // Default row border
                    doc.setDrawColor(220, 220, 220);
                    doc.setLineWidth(0.2);
                    doc.line(tableStartX, rowY + rowHeight - 2, tableStartX + tableWidth, rowY + rowHeight - 2);
                }
            }

            currentY = rowY + rowHeight;
            lineIndex += linesForThisRow;
            isFirstChunkOfProduct = false;
        }
    });

    tableSegments.push({ startY: currentSegmentStart, endY: currentY, page: pageCount });

    // ========== OUTER TABLE BORDERS - varies by style ==========
    tableSegments.forEach(segment => {
        doc.setPage(segment.page);
        if (tableStyle === 'style3') {
            // Minimal: no outer border
        } else if (tableStyle === 'style7') {
            // Sans couleur: simple black border
            doc.setDrawColor(0, 0, 0);
            doc.setLineWidth(0.5);
            doc.rect(tableStartX, segment.startY, tableWidth, segment.endY - segment.startY);
        } else if (tableStyle === 'style4') {
            // Professionnel: thick black border
            doc.setDrawColor(0, 0, 0);
            doc.setLineWidth(0.8);
            doc.rect(tableStartX, segment.startY, tableWidth, segment.endY - segment.startY);
        } else if (tableStyle === 'style5') {
            // Coloré: company color border
            doc.setDrawColor(cr, cg, cb);
            doc.setLineWidth(0.5);
            doc.rect(tableStartX, segment.startY, tableWidth, segment.endY - segment.startY);
        } else {
            // Default outer border
            doc.setDrawColor(200, 200, 200);
            doc.setLineWidth(0.3);
            doc.rect(tableStartX, segment.startY, tableWidth, segment.endY - segment.startY);
        }
    });

    doc.setPage(pageCount);
    console.log('🔍 [Generic PDF] Before totals check:');
    console.log('   currentY:', currentY);
    console.log('   pageHeight:', pageHeight);
    console.log('   pageHeight - 45:', pageHeight - 45);
    console.log('   currentY + 35:', currentY + 35);
    console.log('   Will fit on same page?', currentY + 35 <= pageHeight - 45);

    if (currentY + 35 > pageHeight - 45) {
        console.log('   ❌ Totals do NOT fit - adding new page');
        doc.addPage();
        pageCount++;
        addHeader();
        // On new page: place totals near footer
        currentY = pageHeight - 45 - 35;
        console.log('   New page created. currentY set to:', currentY);
    } else {
        console.log('   ✅ Totals fit on same page');
        // Same page: place totals right after table
        currentY = currentY + 8;
        console.log('   currentY set to:', currentY);
    }

    // ========== TOTALS SECTION - varies by style ==========
    const totalsX = 130;

    if (tableStyle === 'style3') {
        // Minimal: no background, just text with lines
        doc.setDrawColor(180, 180, 180);
        doc.setLineWidth(0.3);
        doc.line(totalsX, currentY, totalsX + 65, currentY);

        doc.setTextColor(0, 0, 0);
        doc.setFontSize(10);
        doc.setFont(undefined, 'bold');
        doc.text('Total HT', totalsX + 3, currentY + 5);
        doc.text(parseFloat(invoice.total_ht).toFixed(2) + ' DH', totalsX + 62, currentY + 5, { align: 'right' });
        currentY += 8;

        // Only show TVA row if tva_rate > 0
        if (parseFloat(invoice.tva_rate) > 0) {
            doc.setFont(undefined, 'normal');
            doc.text('TVA ' + invoice.tva_rate + '%', totalsX + 3, currentY + 5);
            doc.text(parseFloat(invoice.montant_tva).toFixed(2) + ' DH', totalsX + 62, currentY + 5, { align: 'right' });
            currentY += 8;
        }

        doc.setDrawColor(0, 0, 0);
        doc.setLineWidth(0.5);
        doc.line(totalsX, currentY, totalsX + 65, currentY);
        doc.setFont(undefined, 'bold');
        doc.text(parseFloat(invoice.tva_rate) > 0 ? 'Total TTC' : 'TOTAL', totalsX + 3, currentY + 5);
        doc.text(parseFloat(invoice.tva_rate) > 0 ? parseFloat(invoice.total_ttc).toFixed(2) + ' DH' : parseFloat(invoice.total_ht).toFixed(2) + ' DH', totalsX + 62, currentY + 5, { align: 'right' });
    } else if (tableStyle === 'style4') {
        // Professionnel: black header totals
        doc.setFillColor(0, 0, 0);
        doc.rect(totalsX, currentY, 65, 7, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(10);
        doc.setFont(undefined, 'bold');
        doc.text('Total HT', totalsX + 3, currentY + 5);
        doc.text(parseFloat(invoice.total_ht).toFixed(2) + ' DH', totalsX + 62, currentY + 5, { align: 'right' });
        currentY += 8;

        // Only show TVA row if tva_rate > 0
        if (parseFloat(invoice.tva_rate) > 0) {
            doc.setFillColor(220, 220, 220);
            doc.rect(totalsX, currentY, 65, 7, 'F');
            doc.setTextColor(0, 0, 0);
            doc.text('TVA ' + invoice.tva_rate + '%', totalsX + 3, currentY + 5);
            doc.text(parseFloat(invoice.montant_tva).toFixed(2) + ' DH', totalsX + 62, currentY + 5, { align: 'right' });
            currentY += 8;
        }

        doc.setFillColor(40, 40, 40);
        doc.rect(totalsX, currentY, 65, 7, 'F');
        doc.setTextColor(255, 255, 255);
        doc.text(parseFloat(invoice.tva_rate) > 0 ? 'Total TTC' : 'TOTAL', totalsX + 3, currentY + 5);
        doc.text(parseFloat(invoice.tva_rate) > 0 ? parseFloat(invoice.total_ttc).toFixed(2) + ' DH' : parseFloat(invoice.total_ht).toFixed(2) + ' DH', totalsX + 62, currentY + 5, { align: 'right' });
    } else if (tableStyle === 'style7') {
        // Sans couleur: no background, just black text with lines
        doc.setDrawColor(0, 0, 0);
        doc.setLineWidth(0.5);
        doc.line(totalsX, currentY, totalsX + 65, currentY);

        doc.setTextColor(0, 0, 0);
        doc.setFontSize(10);
        doc.setFont(undefined, 'bold');
        doc.text('Total HT', totalsX + 3, currentY + 5);
        doc.text(parseFloat(invoice.total_ht).toFixed(2) + ' DH', totalsX + 62, currentY + 5, { align: 'right' });
        currentY += 8;

        // Only show TVA row if tva_rate > 0
        if (parseFloat(invoice.tva_rate) > 0) {
            doc.setFont(undefined, 'normal');
            doc.text('TVA ' + invoice.tva_rate + '%', totalsX + 3, currentY + 5);
            doc.text(parseFloat(invoice.montant_tva).toFixed(2) + ' DH', totalsX + 62, currentY + 5, { align: 'right' });
            currentY += 8;
        }

        doc.setDrawColor(0, 0, 0);
        doc.setLineWidth(1);
        doc.line(totalsX, currentY, totalsX + 65, currentY);
        doc.setFont(undefined, 'bold');
        doc.text(parseFloat(invoice.tva_rate) > 0 ? 'Total TTC' : 'TOTAL', totalsX + 3, currentY + 5);
        doc.text(parseFloat(invoice.tva_rate) > 0 ? parseFloat(invoice.total_ttc).toFixed(2) + ' DH' : parseFloat(invoice.total_ht).toFixed(2) + ' DH', totalsX + 62, currentY + 5, { align: 'right' });
    } else if (tableStyle === 'style1') {
        // Classique: grey totals (no company color)
        doc.setFillColor(80, 80, 80);
        doc.rect(totalsX, currentY, 65, 7, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(10);
        doc.setFont(undefined, 'bold');
        doc.text('Total HT', totalsX + 3, currentY + 5);
        doc.text(parseFloat(invoice.total_ht).toFixed(2) + ' DH', totalsX + 62, currentY + 5, { align: 'right' });
        currentY += 8;

        // Only show TVA row if tva_rate > 0
        if (parseFloat(invoice.tva_rate) > 0) {
            doc.setFillColor(220, 220, 220);
            doc.rect(totalsX, currentY, 65, 7, 'F');
            doc.setTextColor(0, 0, 0);
            doc.text('TVA ' + invoice.tva_rate + '%', totalsX + 3, currentY + 5);
            doc.text(parseFloat(invoice.montant_tva).toFixed(2) + ' DH', totalsX + 62, currentY + 5, { align: 'right' });
            currentY += 8;
        }

        doc.setFillColor(60, 60, 60);
        doc.rect(totalsX, currentY, 65, 7, 'F');
        doc.setTextColor(255, 255, 255);
        doc.text(parseFloat(invoice.tva_rate) > 0 ? 'Total TTC' : 'TOTAL', totalsX + 3, currentY + 5);
        doc.text(parseFloat(invoice.tva_rate) > 0 ? parseFloat(invoice.total_ttc).toFixed(2) + ' DH' : parseFloat(invoice.total_ht).toFixed(2) + ' DH', totalsX + 62, currentY + 5, { align: 'right' });
    } else {
        // Default (style2, style5, style6): company color totals
        doc.setFillColor(cr, cg, cb);
        doc.rect(totalsX, currentY, 65, 7, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(10);
        doc.setFont(undefined, 'bold');
        doc.text('Total HT', totalsX + 3, currentY + 5);
        doc.text(parseFloat(invoice.total_ht).toFixed(2) + ' DH', totalsX + 62, currentY + 5, { align: 'right' });
        currentY += 8;

        // Only show TVA row if tva_rate > 0
        if (parseFloat(invoice.tva_rate) > 0) {
            doc.setFillColor(220, 220, 220);
            doc.rect(totalsX, currentY, 65, 7, 'F');
            doc.setTextColor(0, 0, 0);
            doc.text('TVA ' + invoice.tva_rate + '%', totalsX + 3, currentY + 5);
            doc.text(parseFloat(invoice.montant_tva).toFixed(2) + ' DH', totalsX + 62, currentY + 5, { align: 'right' });
            currentY += 8;
        }

        doc.setFillColor(dr, dg, db);
        doc.rect(totalsX, currentY, 65, 7, 'F');
        doc.setTextColor(255, 255, 255);
        doc.text(parseFloat(invoice.tva_rate) > 0 ? 'Total TTC' : 'TOTAL', totalsX + 3, currentY + 5);
        doc.text(parseFloat(invoice.tva_rate) > 0 ? parseFloat(invoice.total_ttc).toFixed(2) + ' DH' : parseFloat(invoice.total_ht).toFixed(2) + ' DH', totalsX + 62, currentY + 5, { align: 'right' });
    }

    const totalPages = pageCount;
    for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        addFooter(i, totalPages);
    }
}

// Load jsPDF library
async function loadJsPDF() {
    return new Promise((resolve, reject) => {
        if (typeof window.jspdf !== 'undefined') {
            resolve();
            return;
        }

        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load jsPDF'));
        document.head.appendChild(script);
    });
}

console.log('✅ Unified Company PDF Generator loaded');
