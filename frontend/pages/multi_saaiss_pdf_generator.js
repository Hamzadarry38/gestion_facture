// SAAISS PDF Generator
// Generate PDF with SAAISS company design and branding

// Main function to download SAAISS Devis PDF for MULTI
window.downloadMultiSAAISSDevisPDF = async function (invoiceId) {
    try {
        console.log('📥 Generating SAAISS PDF for MULTI invoice:', invoiceId);

        // Get invoice data from MULTI database
        const result = await window.electron.dbMulti.getInvoiceById(invoiceId);

        if (!result.success || !result.data) {
            throw new Error('Facture introuvable');
        }

        const invoice = result.data;

        // Only allow for devis type
        if (invoice.document_type !== 'devis') {
            showSAAISSWarningModal('Type de document incorrect', 'Cette fonction est disponible uniquement pour les devis.');
            return;
        }

        console.log('🔍 Invoice type:', invoice.document_type);

        // Check if there are products with zero quantity or price
        const hasZeroProducts = invoice.products && invoice.products.some(p =>
            parseFloat(p.quantite) === 0 || parseFloat(p.prix_unitaire_ht) === 0
        );

        let includeZeroProducts = true; // Default: include all products

        if (hasZeroProducts) {
            includeZeroProducts = await new Promise((resolve) => {
                const overlay = document.createElement('div');
                overlay.className = 'custom-modal-overlay';

                overlay.innerHTML = `
                    <div class="custom-modal">
                        <div class="custom-modal-header">
                            <span class="custom-modal-icon warning">⚠️</span>
                            <h3 class="custom-modal-title">Produits avec quantité ou prix zéro</h3>
                        </div>
                        <div class="custom-modal-body">
                            <p style="margin-bottom:1rem;color:#e0e0e0;font-size:0.95rem;">
                                Certains produits ont une <strong style="color:#ff9800;">quantité = 0</strong> ou un <strong style="color:#ff9800;">prix = 0</strong>.
                            </p>
                            <p style="color:#b0b0b0;font-size:0.9rem;">
                                Voulez-vous les afficher dans le PDF ${window.getPdfCompanyName ? window.getPdfCompanyName('SAAISS') : 'MSH3 SERVICES'} ?
                            </p>
                        </div>
                        <div class="custom-modal-footer">
                            <button id="excludeZeroSAAISS" class="custom-modal-btn secondary">
                                ❌ Non, masquer
                            </button>
                            <button id="includeZeroSAAISS" class="custom-modal-btn primary">
                                ✅ Oui, afficher
                            </button>
                        </div>
                    </div>
                `;

                document.body.appendChild(overlay);

                const excludeBtn = document.getElementById('excludeZeroSAAISS');
                const includeBtn = document.getElementById('includeZeroSAAISS');

                excludeBtn.addEventListener('click', () => {
                    overlay.remove();
                    resolve(false);
                });

                includeBtn.addEventListener('click', () => {
                    overlay.remove();
                    resolve(true);
                });

                overlay.addEventListener('click', (e) => {
                    if (e.target === overlay) {
                        overlay.remove();
                        resolve(true); // Default to include if user clicks outside
                    }
                });

                setTimeout(() => includeBtn.focus(), 100);
            });

            console.log('🔍 User choice for zero products:', includeZeroProducts ? 'Include' : 'Exclude');
        }


        // Get notes
        const notesResult = await window.electron.dbMulti.getNote(invoiceId);
        const notesText = notesResult.success ? notesResult.data : '';

        // Show simple customization modal
        const customizationData = await window.showSimpleSAAISSModal(invoice, notesText);
        if (!customizationData) {
            console.log('❌ User cancelled SAAISS PDF generation');
            return;
        }

        // Add notes to customizationData
        customizationData.notes = notesText;

        // Use global generation function
        await window.generateSAAISSPDFWithCustomization(invoice, customizationData, 'multi');

    } catch (error) {
        console.error('❌ Error generating SAAISS PDF:', error);
        showSAAISSErrorModal('Erreur de génération', `Une erreur est survenue lors de la génération du PDF ${window.getPdfCompanyName ? window.getPdfCompanyName('SAAISS') : 'MSH3 SERVICES'}: ` + error.message);
    }
};

// Global function to generate SAAISS PDF with customizations
window.generateSAAISSPDFWithCustomization = async function (invoice, customizationData, context = 'multi') {
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
                border: 1px solid rgba(156,39,176,0.3); min-width: 300px;
            ">
                <div style="
                    width: 56px; height: 56px; border: 4px solid #333;
                    border-top-color: #9C27B0; border-radius: 50%;
                    animation: pdfSpin 0.8s linear infinite;
                    margin: 0 auto 1.5rem;
                "></div>
                <div style="color: #fff; font-size: 1.15rem; font-weight: 600; margin-bottom: 0.5rem;">
                    Génération du PDF en cours...
                </div>
                <div style="color: #9C27B0; font-size: 0.95rem; font-weight: 700;">
                    🏭 ${window.getPdfCompanyName ? window.getPdfCompanyName('SAAISS') : 'MSH3 SERVICES'}
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

        // Create customized invoice copy
        const customizedInvoice = JSON.parse(JSON.stringify(invoice));
        customizedInvoice.document_numero_devis = customizationData.customDevisNumber;
        customizedInvoice.document_date = customizationData.customDate;

        // Apply percentage to products (but don't show percentage in PDF)
        if (customizationData.percentage && customizationData.percentage > 0) {
            customizedInvoice.products = customizedInvoice.products.map(product => ({
                ...product,
                prix_unitaire_ht: parseFloat(product.prix_unitaire_ht) * (1 + customizationData.percentage / 100),
                total_ht: parseFloat(product.total_ht) * (1 + customizationData.percentage / 100)
            }));
            // Recalculate totals
            const newTotalHT = customizedInvoice.products.reduce((sum, p) => sum + parseFloat(p.total_ht), 0);
            const newMontantTVA = newTotalHT * (parseFloat(customizedInvoice.tva_rate) / 100);
            const newTotalTTC = newTotalHT + newMontantTVA;
            customizedInvoice.total_ht = newTotalHT;
            customizedInvoice.montant_tva = newMontantTVA;
            customizedInvoice.total_ttc = newTotalTTC;
        }
        // Apply modified product names
        if (customizationData.modifiedProducts) {
            customizedInvoice.products = customizedInvoice.products.map((product, index) => ({
                ...product,
                designation: customizationData.modifiedProducts[index] || product.designation
            }));
        }

        // Check if devis number already exists (only if not Chaimae context, or if we want strict check)
        // Note: The modal already checks for existence, so we can probably skip strict check here or keep it.
        // For Chaimae, we are adding to SAAISS sequence so we should check SAAISS DB.
        try {
            const currentYear = new Date().getFullYear();
            // We can skip check here if we trust the modal or just let the add fail if unique constraint
            // But let's keep it for safety if context is multi
            if (context === 'multi') {
                const existsResult = await window.electron.dbMsh3.checkDevisExists(customizationData.customDevisNumber, currentYear);
                if (existsResult.success && existsResult.data) {
                    // Only throw if it's NOT the same devis number (which shouldn't happen for new custom number)
                    // Actually, if we are here, we proceeded from modal which checked it.
                }
            }
        } catch (error) {
            // handle error
        }

        // Add Devis number to SAAISS database (Sequence management)
        try {
            const currentYear = new Date().getFullYear();
            await window.electron.dbMsh3.addDevisNumber(customizationData.customDevisNumber, currentYear);
        } catch (error) {
            console.error('Error saving devis number:', error);
        }

        // Generate SAAISS PDF with special design
        // Default includeZeroProducts to true for Chaimae
        await generateSAAISSPDF(doc, customizedInvoice, true, customizationData.notesFontSize, customizationData.notes);

        // Save the PDF with new format: SAAISS_TYPE_ClientName_InvoiceNumber
        const docType = customizedInvoice.document_type === 'devis' ? 'Devis' : 'Facture';
        const invoiceNumber = customizedInvoice.document_numero_devis || customizedInvoice.document_numero || 'N-A';
        const companyFileName = window.getPdfCompanyFileName ? window.getPdfCompanyFileName('SAAISS') : 'STé_MSH3_SERVICES';
        const fileName = `${companyFileName}_${docType}_${customizedInvoice.client_nom}_${invoiceNumber}.pdf`;

        // Get PDF as ArrayBuffer
        const pdfArrayBuffer = doc.output('arraybuffer');
        const pdfUint8Array = new Uint8Array(pdfArrayBuffer);

        // Get the company that created this PDF
        const selectedCompany = JSON.parse(localStorage.getItem('selectedCompany') || '{}');
        const createdBy = selectedCompany.code || selectedCompany.name || 'Unknown';

        // Folder to save: 'chaimae_saaiss' if context is chaimae, else 'saaiss' 
        const saveFolder = context === 'chaimae' ? 'chaimae_saaiss' : 'saaiss';

        // Save PDF to disk using electron API
        const saveResult = await window.electron.pdf.savePdf(pdfUint8Array, saveFolder, customizedInvoice.document_numero_devis, createdBy);

        if (saveResult.success) {
            console.log(`✅ SAAISS PDF saved to disk (${saveFolder}):`, saveResult.filePath);

            // Record PDF path in database for metadata tracking
            try {
                const currentYear = new Date().getFullYear();
                await window.electron.dbMsh3.savePdfPath(customizedInvoice.document_numero_devis, currentYear, saveResult.filePath, createdBy);
                console.log('✅ PDF metadata synced to PostgreSQL');
            } catch (dbErr) {
                console.error('⚠️ Failed to sync PDF metadata to PostgreSQL:', dbErr);
            }

            // Also save to downloads
            doc.save(fileName);
            console.log('✅ SAAISS PDF generated successfully:', fileName);

            // Remove loading overlay BEFORE showing alert
            if (loadingOverlay && loadingOverlay.parentNode) {
                loadingOverlay.remove();
                loadingOverlay = null;
            }

            if (context === 'multi') {
                showSAAISSSuccessModal('PDF généré avec succès', `Le fichier ${fileName} a été téléchargé et sauvegardé avec succès !`);
            } else {
                window.notify.success('Succès', `PDF ${window.getPdfCompanyName ? window.getPdfCompanyName('SAAISS') : 'MSH3 SERVICES'} généré et sauvegardé avec succès !`);
            }
        } else {
            console.error('❌ Error saving PDF to disk:', saveResult.error);

            // Remove loading overlay BEFORE showing alert
            if (loadingOverlay && loadingOverlay.parentNode) {
                loadingOverlay.remove();
                loadingOverlay = null;
            }

            if (context === 'multi') {
                showSAAISSWarningModal('Avertissement', 'PDF généré mais erreur lors de la sauvegarde: ' + saveResult.error);
            } else {
                window.notify.warning('Avertissement', 'PDF généré mais erreur lors de la sauvegarde: ' + saveResult.error);
                doc.save(fileName);
            }
        }

    } catch (error) {
        console.error('❌ Error in generateSAAISSPDFWithCustomization:', error);
        // Remove loading overlay on error
        if (loadingOverlay && loadingOverlay.parentNode) {
            loadingOverlay.remove();
            loadingOverlay = null;
        }
        throw error;
    } finally {
        // Safety net: always remove loading overlay if still present
        if (loadingOverlay && loadingOverlay.parentNode) {
            loadingOverlay.remove();
        }
    }
};

// Show simple SAAISS modal
// Show simple SAAISS modal
window.showSimpleSAAISSModal = async function (invoice, notesText = '') {
    // Get last used devis number
    let lastDevisNumber = 'Aucun';
    try {
        const currentYear = new Date().getFullYear();
        // Use SAAISS database for MULTI company devis numbers (shared database)
        const result = await window.electron.dbMsh3.getMaxDevisNumber(currentYear);
        console.log('📋 SAAISS DB Result:', result);
        if (result && result.success && result.data && result.data.devis_number) {
            lastDevisNumber = result.data.devis_number;

            // Extract number and increment by 1 for suggestion
            const match = lastDevisNumber.match(/(\D*)(\d+)(\D*)$/);
            if (match) {
                const prefix = match[1];
                const number = parseInt(match[2]) + 1;
                const suffix = match[3];
                const suggestedNumber = prefix + number.toString().padStart(match[2].length, '0') + suffix;

                // Set suggested number as default value
                setTimeout(() => {
                    const devisInput = document.getElementById('devisInput');
                    if (devisInput && !devisInput.value.trim()) {
                        devisInput.value = suggestedNumber;
                    }
                }, 100);
            }
        }
    } catch (error) {
        console.log('Could not get last devis number:', error);
    }

    // Load last saved settings (percentage from PostgreSQL, product names per-invoice from localStorage)
    let savedPercentage = '';
    let savedProductNames = {};
    try {
        const settingsResult = await window.electron.dbSaaiss.getPdfSettings();
        if (settingsResult && settingsResult.success && settingsResult.data) {
            savedPercentage = settingsResult.data.percentage || '';
        }
    } catch (e) { console.warn('Could not load SAAISS settings:', e); }
    try {
        const savedProducts = localStorage.getItem(`customPdfProducts_SAAISS_${invoice.id}`);
        if (savedProducts) {
            savedProductNames = JSON.parse(savedProducts);
        }
    } catch (e) {}

    return new Promise((resolve) => {
        const overlay = document.createElement('div');
        overlay.className = 'custom-modal-overlay';

        const modal = document.createElement('div');
        modal.className = 'custom-modal';
        modal.style.maxWidth = '700px';
        modal.style.maxHeight = '80vh';
        modal.style.display = 'flex';
        modal.style.flexDirection = 'column';

        // Extract next devis number and add current year
        let nextDevisNumber = lastDevisNumber;
        const currentYear = new Date().getFullYear();
        if (lastDevisNumber && lastDevisNumber !== 'Aucun') {
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
            nextDevisNumber = '1/' + currentYear;
        }

        // Get the company that created this PDF
        const selectedCompany = JSON.parse(localStorage.getItem('selectedCompany') || '{}');
        const companyName = selectedCompany.name || 'Inconnue';

        modal.innerHTML = `
            <div class="custom-modal-header">
                <span class="custom-modal-icon info">🎨</span>
                <h3 class="custom-modal-title">🏭 ${window.getPdfCompanyName ? window.getPdfCompanyName('SAAISS') : 'MSH3 SERVICES'} - Personnalisation</h3>
                <div style="position: absolute; top: 1rem; right: 1rem; background: #0078d4; color: #fff; padding: 0.4rem 0.8rem; border-radius: 4px; font-size: 0.85rem; font-weight: 600;">
                    🏢 Créé par: <strong>${companyName}</strong>
                </div>
            </div>
            <div class="custom-modal-body" style="overflow-y: auto; flex: 1; max-height: calc(80vh - 140px);">
                <div style="margin-bottom: 1.5rem;">
                    <label style="display: block; margin-bottom: 0.5rem; color: #e0e0e0; font-weight: 600;">
                        Pourcentage d'ajustement (%) :
                    </label>
                    <input type="number" id="percentageInput" placeholder="0" min="0" max="100" step="0.1" value="${savedPercentage}"
                           style="width: 100%; padding: 0.75rem; background: #2d2d30; border: 1px solid #3e3e42; border-radius: 6px; color: #fff; font-size: 1rem;">
                    <small style="color: #999; display: block; margin-top: 0.5rem;">
                        Ce pourcentage sera appliqué aux prix mais ne sera pas visible dans le PDF
                    </small>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem;">
                    <div>
                        <label style="display: block; margin-bottom: 0.5rem; color: #e0e0e0; font-weight: 600;">
                            Date personnalisée :
                        </label>
                        <input type="date" id="dateInput" value="${window.todayDateString ? window.todayDateString() : new Date().toISOString().slice(0, 10)}"
                               style="width: 100%; padding: 0.75rem; background: #2d2d30; border: 1px solid #3e3e42; border-radius: 6px; color: #fff; font-size: 1rem;">
                    </div>
                    <div>
                        <label style="display: block; margin-bottom: 0.5rem; color: #e0e0e0; font-weight: 600;">
                            N° Devis personnalisé :
                        </label>
                        <input type="text" id="devisInput" value="${nextDevisNumber}" placeholder="S2025-001"
                               style="width: 100%; padding: 0.75rem; background: #2d2d30; border: 1px solid #3e3e42; border-radius: 6px; color: #fff; font-size: 1rem;">
                        <small style="color: #4CAF50; display: block; margin-top: 0.5rem; font-weight: 500;">
                            📋 Plus grand N°: <strong>${lastDevisNumber}</strong>
                        </small>
                    </div>
                </div>

                <!-- Font Size Selection -->
                <div style="margin-bottom: 1.5rem;">
                    <label style="display: block; margin-bottom: 0.8rem; color: #e0e0e0; font-weight: 600;">
                        Taille de police des Notes :
                    </label>
                    <div style="display: flex; gap: 0.5rem; background: #1e1e1e; padding: 0.5rem; border-radius: 8px; border: 1px solid #3e3e42;">
                        <label style="flex: 1; display: flex; flex-direction: column; align-items: center; cursor: pointer; padding: 0.5rem; border-radius: 6px; transition: all 0.2s;">
                            <input type="radio" name="notesFontSize" value="small" style="margin-bottom: 0.4rem; cursor: pointer;">
                            <span style="font-size: 0.75rem; color: #999;">Petit</span>
                        </label>
                        <label style="flex: 1; display: flex; flex-direction: column; align-items: center; cursor: pointer; padding: 0.5rem; border-radius: 6px; transition: all 0.2s; background: #2d2d30;">
                            <input type="radio" name="notesFontSize" value="medium" checked style="margin-bottom: 0.4rem; cursor: pointer;">
                            <span style="font-size: 0.85rem; color: #fff;">Moyen</span>
                        </label>
                        <label style="flex: 1; display: flex; flex-direction: column; align-items: center; cursor: pointer; padding: 0.5rem; border-radius: 6px; transition: all 0.2s;">
                            <input type="radio" name="notesFontSize" value="large" style="margin-bottom: 0.4rem; cursor: pointer;">
                            <span style="font-size: 0.95rem; color: #999;">Grand</span>
                        </label>
                        <label style="flex: 1; display: flex; flex-direction: column; align-items: center; cursor: pointer; padding: 0.5rem; border-radius: 6px; transition: all 0.2s;">
                            <input type="radio" name="notesFontSize" value="xlarge" style="margin-bottom: 0.4rem; cursor: pointer;">
                            <span style="font-size: 1.05rem; color: #999;">Très G.</span>
                        </label>
                    </div>
                </div>
                
                <div style="margin-bottom: 1.5rem;">
                    <label style="display: block; margin-bottom: 0.5rem; color: #e0e0e0; font-weight: 600;">
                        Modifier les noms des produits :
                    </label>
                    <div id="productsContainer" style="background: #1e1e1e; border: 1px solid #3e3e42; border-radius: 6px; padding: 1rem; max-height: 250px; overflow-y: auto;">
                        ${invoice.products.map((product, index) => {
            const displayName = savedProductNames[index] || product.designation;
            return `
                            <div style="margin-bottom: 0.75rem;">
                                <div style="display: flex; gap: 0.5rem; align-items: center; margin-bottom: 0.5rem;">
                                    <label style="color: #999; font-size: 0.85rem;">Produit ${index + 1}:</label>
                                    <span style="color: #999; font-size: 0.85rem;">Quantité: ${product.quantite}</span>
                                </div>
                                <textarea class="product-name-input" data-index="${index}" 
                                       style="width: 100%; padding: 0.5rem; background: #2d2d30; border: 1px solid #3e3e42; border-radius: 4px; color: #fff; font-size: 0.9rem; font-family: inherit; resize: vertical; min-height: 60px;">${displayName}</textarea>
                            </div>
                        `}).join('')}
                    </div>
                </div>
            </div>
            <div class="custom-modal-footer">
                <button id="cancelBtn" class="custom-modal-btn secondary">Annuler</button>
                <button id="generateBtn" class="custom-modal-btn primary">Générer PDF ${window.getPdfCompanyName ? window.getPdfCompanyName('SAAISS') : 'MSH3 SERVICES'}</button>
            </div>
        `;

        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        const cancelBtn = document.getElementById('cancelBtn');
        const generateBtn = document.getElementById('generateBtn');
        const percentageInput = document.getElementById('percentageInput');
        const dateInput = document.getElementById('dateInput');
        const devisInput = document.getElementById('devisInput');

        // Auto-add current year when user leaves the devis input field
        devisInput.addEventListener('blur', () => {
            let value = devisInput.value.trim();
            if (value && !value.includes('/')) {
                devisInput.value = value + '/' + currentYear;
            }
        });

        generateBtn.addEventListener('click', async () => {
            const percentage = parseFloat(percentageInput.value) || 0;
            const customDate = dateInput.value;
            const customDevisNumber = devisInput.value.trim();

            if (!customDevisNumber) {
                await customAlert('Attention', 'Veuillez saisir un numéro de devis', 'warning');
                return;
            }

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

            // Get selected font size
            const notesFontSize = document.querySelector('input[name="notesFontSize"]:checked')?.value || 'medium';

            // Save settings: percentage to PostgreSQL, product names per-invoice to localStorage
            try {
                await window.electron.dbSaaiss.savePdfSettings(percentage, {});
            } catch (e) { console.warn('Could not save SAAISS settings:', e); }
            try {
                localStorage.setItem(`customPdfProducts_SAAISS_${invoice.id}`, JSON.stringify(modifiedProducts));
            } catch (e) {}

            overlay.remove();
            resolve({
                percentage,
                customDate,
                customDevisNumber,
                modifiedProducts,
                notesFontSize
            });
        });

        cancelBtn.addEventListener('click', () => {
            overlay.remove();
            resolve(null);
        });

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.remove();
                resolve(null);
            }
        });

        setTimeout(() => generateBtn.focus(), 100);
    });
}

// Helper functions for SAAISS modals - Modern design
function createModernNotification(title, message, type = 'info') {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10001;
    `;

    const modal = document.createElement('div');
    const colors = {
        success: { bg: '#4CAF50', icon: '✓', light: '#E8F5E9' },
        error: { bg: '#F44336', icon: '✕', light: '#FFEBEE' },
        warning: { bg: '#FF9800', icon: '⚠', light: '#FFF3E0' },
        info: { bg: '#2196F3', icon: 'ℹ', light: '#E3F2FD' }
    };
    const color = colors[type] || colors.info;

    modal.style.cssText = `
        background: white;
        border-radius: 12px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        max-width: 450px;
        width: 90%;
        overflow: hidden;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        animation: slideUp 0.3s ease-out;
    `;

    modal.innerHTML = `
        <div style="background: ${color.bg}; padding: 20px; color: white; display: flex; align-items: center; gap: 15px;">
            <div style="font-size: 32px; width: 40px; height: 40px; background: rgba(255,255,255,0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                ${color.icon}
            </div>
            <div>
                <h3 style="margin: 0; font-size: 16px; font-weight: 600;">${title}</h3>
            </div>
        </div>
        <div style="padding: 20px; color: #333;">
            <p style="margin: 0; font-size: 14px; line-height: 1.5;">${message}</p>
        </div>
        <div style="background: #f5f5f5; padding: 12px 20px; text-align: right; border-top: 1px solid #e0e0e0;">
            <button id="okBtn" style="padding: 8px 20px; background: ${color.bg}; color: white; border: none; border-radius: 6px; font-weight: 600; font-size: 14px; cursor: pointer; transition: all 0.3s;">
                OK
            </button>
        </div>
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    const okBtn = document.getElementById('okBtn');
    okBtn.addEventListener('mouseenter', () => {
        okBtn.style.transform = 'translateY(-2px)';
        okBtn.style.boxShadow = `0 4px 12px ${color.bg}40`;
    });
    okBtn.addEventListener('mouseleave', () => {
        okBtn.style.transform = 'translateY(0)';
        okBtn.style.boxShadow = 'none';
    });

    const closeModal = () => {
        overlay.style.animation = 'slideDown 0.3s ease-in';
        setTimeout(() => overlay.remove(), 300);
    };

    okBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal();
    });
}

function showSAAISSSuccessModal(title, message) {
    if (window.notify && typeof window.notify === 'function') {
        window.notify(message, 'success');
    } else if (window.showNotification && typeof window.showNotification === 'function') {
        window.showNotification(message, 'success');
    } else {
        createModernNotification(title, message, 'success');
    }
}

function showSAAISSErrorModal(title, message) {
    if (window.notify && typeof window.notify === 'function') {
        window.notify(message, 'error');
    } else if (window.showNotification && typeof window.showNotification === 'function') {
        window.showNotification(message, 'error');
    } else {
        createModernNotification(title, message, 'error');
    }
}

function showSAAISSWarningModal(title, message) {
    if (window.notify && typeof window.notify === 'function') {
        window.notify(message, 'warning');
    } else if (window.showNotification && typeof window.showNotification === 'function') {
        window.showNotification(message, 'warning');
    } else {
        createModernNotification(title, message, 'warning');
    }
}

// Load SAAISS image helper
async function loadSAAISSImage(imagePath) {
    try {
        const fullPath = await window.electron.getAssetPath(imagePath);
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
                resolve(canvas.toDataURL('image/png'));
            };
            img.onerror = reject;
            img.src = fullPath;
        });
    } catch (error) {
        console.error('Error loading SAAISS image:', imagePath, error);
        return null;
    }
}

// Format number for PDF display
function formatNumberForPDF(number) {
    const num = parseFloat(number);
    // Simple formatting: use toFixed and replace . with ,
    const formatted = num.toFixed(2).replace('.', ',');
    // Add space as thousands separator
    return formatted.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

// Generate SAAISS PDF with special design
async function generateSAAISSPDF(doc, invoice, includeZeroProducts = true, notesFontSize = 'medium', notesText = '') {
    try {
        // Load SAAISS assets (use custom images from settings if available)
        const headerSrc = window.getPdfCompanyImage ? window.getPdfCompanyImage('SAAISS', 'header') : 'SAAISS/Hesder.png';
        const footerSrc = window.getPdfCompanyImage ? window.getPdfCompanyImage('SAAISS', 'footer') : 'SAAISS/Footer.png';
        const signatureSrc = window.getPdfCompanyImage ? window.getPdfCompanyImage('SAAISS', 'signature') : 'SAAISS/signature.png';
        const headerImg = await loadSAAISSImage(headerSrc);
        const footerImg = await loadSAAISSImage(footerSrc);
        const signatureImg = await loadSAAISSImage(signatureSrc);

        const pageWidth = doc.internal.pageSize.width;
        const pageHeight = doc.internal.pageSize.height;

        // Colors for SAAISS design
        const primaryColor = [60, 60, 60]; // Dark gray
        const accentColor = [100, 100, 100]; // Medium gray
        const textColor = [80, 80, 80]; // Dark gray text

        let currentY = 20;
        let pageCount = 1;

        // Function to add SAAISS header
        const addSAAISSHeader = () => {
            if (headerImg) {
                doc.addImage(headerImg, 'PNG', 0, 0, pageWidth, 60);
            }
            currentY = 70;
        };

        // Function to add SAAISS footer with signature on the RIGHT side
        const addSAAISSFooter = (pageNum, totalPages) => {
            const footerHeight = 45; // Footer height
            const footerY = pageHeight - footerHeight - 5; // Position footer at bottom

            // Signature - positioned at BOTTOM-RIGHT, above footer
            if (signatureImg) {
                const signatureWidth = 60;
                const signatureHeight = 30;
                const signatureX = pageWidth - signatureWidth - 15; // Right side with 15px margin
                const signatureY = footerY - 32; // Positioned above footer
                doc.addImage(signatureImg, 'PNG', signatureX, signatureY, signatureWidth, signatureHeight);
            }

            // Footer image
            if (footerImg) {
                doc.addImage(footerImg, 'PNG', 0, footerY, pageWidth, footerHeight);
            }

            // Page numbering ON the footer (at the bottom center) - lower position
            doc.setFontSize(10);
            doc.setTextColor(100, 100, 100);
            const pageText = totalPages === 'temp' ? `Page ${pageNum}` : `Page ${pageNum}/${totalPages}`;
            doc.text(pageText, pageWidth / 2, footerY + footerHeight + 2, { align: 'center' });
        };

        // Add header to first page
        addSAAISSHeader();

        // Function to add header section (DEVIS, N°, DATE, CLIENT)
        const addHeaderSection = () => {
            // Add "DEVIS" title at top
            doc.setFontSize(14);
            doc.setFont(undefined, 'bold');
            doc.setTextColor(0, 0, 0);
            doc.text('DEVIS', 20, currentY);

            // Date on the right
            doc.setFontSize(9);
            doc.setFont(undefined, 'bold');
            const dateStr = (window.safeParseDate||function(d){return new Date(d)})(invoice.document_date).toLocaleDateString('fr-FR');
            doc.text(`DATE : ${dateStr}`, pageWidth - 20, currentY, { align: 'right' });

            currentY += 6;

            // Devis number on the left (below DEVIS)
            doc.setFontSize(9);
            doc.setFont(undefined, 'bold');
            doc.text(`N°: ${invoice.document_numero_devis}`, 20, currentY);
            currentY += 10;

            // Client info section - in a box with rounded corners
            const boxX = 20;
            const boxY = currentY;
            const boxWidth = 100;
            const boxHeight = 20;
            const borderRadius = 2;

            // Draw rounded rectangle border
            doc.setDrawColor(0, 0, 0);
            doc.setLineWidth(0.5);
            doc.roundedRect(boxX, boxY, boxWidth, boxHeight, borderRadius, borderRadius);

            // Client info inside box
            doc.setFontSize(10);
            doc.setFont(undefined, 'bold');
            doc.setTextColor(0, 0, 0);
            doc.text(`CLIENT :${invoice.client_nom}`, boxX + 3, boxY + 6);

            if (invoice.client_ice && invoice.client_ice !== '0') {
                doc.setFontSize(8);
                doc.setFont(undefined, 'bold');
                doc.text(`ICE:${invoice.client_ice}`, boxX + 3, boxY + 13);
            }

            currentY += boxHeight + 8;
        };

        addHeaderSection();

        // Table setup with new design - matching image exactly
        const tableHeaders = ['QTE', 'DESCRIPTION', 'PRIX HT', 'TOTAL HT'];
        const colWidths = [25, 85, 30, 30];
        const colPositions = [20, 45, 130, 160];
        const tableEndX = 190;

        console.log('📊 TABLE CONFIGURATION (MULTI SAAISS):');
        console.log('  Headers:', tableHeaders);
        console.log('  Column Widths:', colWidths);
        console.log('  Column Positions:', colPositions);
        console.log('  Total Width:', colWidths.reduce((a, b) => a + b, 0));

        const addCompleteTableSection = () => {
            const tableStartY = currentY;

            // Simple black borders header - matching SKM design
            doc.setDrawColor(0, 0, 0);
            doc.setLineWidth(0.3);
            doc.rect(20, currentY, 170, 8);

            // Header text - black on white
            doc.setTextColor(0, 0, 0); // Black text
            doc.setFont(undefined, 'bold');
            doc.setFontSize(9);

            tableHeaders.forEach((header, index) => {
                let align, x;
                if (index === 0) {
                    align = 'center';
                    x = colPositions[index] + colWidths[index] / 2;
                } else if (index > 1) {
                    align = 'right';
                    x = colPositions[index] + colWidths[index] - 2;
                } else {
                    align = 'left';
                    x = colPositions[index] + 2;
                }
                doc.text(header, x, currentY + 6, { align });
            });

            // Draw vertical lines for columns
            let xPos = 20;
            for (let i = 0; i < colWidths.length - 1; i++) {
                xPos += colWidths[i];
                doc.line(xPos, currentY, xPos, currentY + 8);
            }

            currentY += 8;
            return tableStartY;
        };

        const firstTableStartY = addCompleteTableSection();

        // Process products
        doc.setTextColor(0, 0, 0); // Black text
        doc.setFont(undefined, 'normal');
        doc.setFontSize(9);

        let tableSegments = [];
        let currentSegmentStart = firstTableStartY;
        const productsToShow = invoice.products;

        productsToShow.forEach((product, index) => {
            const maxWidth = colWidths[1] - 4;
            const descriptionLines = doc.splitTextToSize(product.designation, maxWidth);
            const isZeroProduct = parseFloat(product.quantite) === 0 || parseFloat(product.prix_unitaire_ht) === 0;

            console.log(`\n📦 PRODUCT ${index + 1} (MULTI SAAISS):`);
            console.log(`  Designation: "${product.designation}"`);
            console.log(`  Max Width for Description: ${maxWidth}`);
            console.log(`  Description Lines:`, descriptionLines);
            console.log(`  Lines Count: ${descriptionLines.length}`);
            const quantityText = includeZeroProducts || !isZeroProduct ? product.quantite : '';
            const unitPriceText = includeZeroProducts || !isZeroProduct
                ? formatNumberForPDF(product.prix_unitaire_ht) + ' DH'
                : '';
            const totalHtText = includeZeroProducts || !isZeroProduct
                ? formatNumberForPDF(product.total_ht) + ' DH'
                : '';

            let lineIndex = 0;

            while (lineIndex < descriptionLines.length) {
                // If there is almost no space left on the page, start a new one before drawing
                // Use a smaller bottom margin so the table is visually closer to the footer
                let availableHeight = pageHeight - 80 - currentY;
                if (availableHeight < 10) {
                    tableSegments.push({
                        startY: currentSegmentStart,
                        endY: currentY,
                        page: pageCount
                    });

                    doc.addPage();
                    pageCount++;
                    addSAAISSHeader();
                    addHeaderSection();
                    currentSegmentStart = addCompleteTableSection();
                    doc.setTextColor(0, 0, 0); // Black text
                    doc.setFont(undefined, 'normal');
                    doc.setFontSize(9);

                    availableHeight = pageHeight - 60 - currentY;
                }

                // Calculate how many description lines can fit on the current page
                const remainingLines = descriptionLines.length - lineIndex;
                const maxLinesThisPage = Math.max(1, Math.floor((availableHeight - 5) / 4));
                const linesForThisRow = Math.min(remainingLines, maxLinesThisPage);
                const rowHeight = Math.max(10, linesForThisRow * 4 + 5);

                const rowY = currentY;

                // Set text color for row
                doc.setTextColor(0, 0, 0); // Black text
                doc.setFont(undefined, 'normal');
                doc.setFontSize(9);

                // Draw quantity in first column - ONLY ON FIRST PAGE OF PRODUCT
                if (lineIndex === 0) {
                    doc.text(quantityText, colPositions[0] + colWidths[0] / 2, rowY + 6, { align: 'center' });
                }

                console.log(`  Row Y: ${rowY}, Row Height: ${rowHeight}`);
                console.log(`  QTE Position: X=${colPositions[0] + 2}, Y=${rowY + 6}`);

                // Draw description chunk in second column (only the lines that fit on this page)
                const descriptionChunk = descriptionLines.slice(lineIndex, lineIndex + linesForThisRow);
                console.log(`  Description Chunk (lines ${lineIndex}-${lineIndex + linesForThisRow}):`, descriptionChunk);
                console.log(`  Description Position: X=${colPositions[1] + 2}, Max Width=${colWidths[1] - 4}`);

                descriptionChunk.forEach((line, chunkIndex) => {
                    console.log(`    Line ${chunkIndex}: "${line}" at Y=${rowY + 6 + (chunkIndex * 4)}`);
                    doc.text(line, colPositions[1] + 2, rowY + 6 + (chunkIndex * 4), {
                        maxWidth: colWidths[1] - 4,
                        align: 'left'
                    });
                });

                // Draw unit price and total for this visual row - ONLY ON FIRST PAGE OF PRODUCT
                if (lineIndex === 0) {
                    const otherColumns = [unitPriceText, totalHtText];
                    otherColumns.forEach((data, offset) => {
                        const colIndex = offset + 2; // columns 2,3
                        const align = 'right';
                        const x = colPositions[colIndex] + colWidths[colIndex] - 2;
                        console.log(`  Column ${colIndex} (${tableHeaders[colIndex]}): "${data}" at X=${x}, Y=${rowY + 6}`);
                        doc.text(data, x, rowY + 6, { align });
                    });
                }

                // Bottom border for this visual row
                doc.setDrawColor(0, 0, 0); // Black border
                doc.setLineWidth(0.3);
                doc.line(20, rowY + rowHeight, 190, rowY + rowHeight);

                // Draw vertical lines for columns
                let xPos = 20;
                console.log(`  Drawing vertical lines at Y: ${rowY} to ${rowY + rowHeight}`);
                for (let i = 0; i < colWidths.length - 1; i++) {
                    xPos += colWidths[i];
                    console.log(`    Vertical line ${i + 1} at X=${xPos}`);
                    doc.line(xPos, rowY, xPos, rowY + rowHeight);
                }

                currentY += rowHeight;
                lineIndex += linesForThisRow;
            }
        });

        tableSegments.push({
            startY: currentSegmentStart,
            endY: currentY,
            page: pageCount
        });

        // Add totals
        doc.setPage(pageCount);
        currentY += 10;

        if (!includeZeroProducts) {
            const displayedTotalHT = productsToShow.reduce((sum, p) => {
                const isZero = parseFloat(p.quantite) === 0 || parseFloat(p.prix_unitaire_ht) === 0;
                return sum + (isZero ? 0 : parseFloat(p.total_ht));
            }, 0);
            const displayedMontantTVA = displayedTotalHT * (parseFloat(invoice.tva_rate) / 100);
            const displayedTotalTTC = displayedTotalHT + displayedMontantTVA;

            invoice.total_ht = displayedTotalHT;
            invoice.montant_tva = displayedMontantTVA;
            invoice.total_ttc = displayedTotalTTC;
        }

        const totalsStartY = currentY;
        const totalsX = 130; // Start position for totals (right side)
        const totalsWidth = 60; // Width of totals box

        // Row 1: TOTAL H.T
        doc.setDrawColor(0, 0, 0);
        doc.setLineWidth(0.3);
        doc.line(totalsX, totalsStartY, totalsX + totalsWidth, totalsStartY); // Top border
        doc.line(totalsX, totalsStartY, totalsX, totalsStartY + 8); // Left border
        doc.line(totalsX + totalsWidth, totalsStartY, totalsX + totalsWidth, totalsStartY + 8); // Right border
        doc.line(totalsX + 25, totalsStartY, totalsX + 25, totalsStartY + 8); // Middle vertical separator
        doc.setTextColor(0, 0, 0);
        doc.setFont(undefined, 'bold');
        doc.setFontSize(8);
        doc.text('TOTAL H.T', totalsX + 2, totalsStartY + 5.5);
        doc.text(formatNumberForPDF(invoice.total_ht) + ' DH', totalsX + totalsWidth - 2, totalsStartY + 5.5, { align: 'right' });
        doc.line(totalsX, totalsStartY + 8, totalsX + totalsWidth, totalsStartY + 8); // Bottom border

        // Row 2: TVA
        const tvaY = totalsStartY + 8;
        doc.line(totalsX, tvaY, totalsX + totalsWidth, tvaY); // Top border
        doc.line(totalsX, tvaY, totalsX, tvaY + 8); // Left border
        doc.line(totalsX + totalsWidth, tvaY, totalsX + totalsWidth, tvaY + 8); // Right border
        doc.line(totalsX + 25, tvaY, totalsX + 25, tvaY + 8); // Middle vertical separator
        doc.setTextColor(0, 0, 0);
        doc.setFont(undefined, 'normal');
        doc.setFontSize(8);
        doc.text(`TVA ${invoice.tva_rate}%`, totalsX + 2, tvaY + 5.5);
        doc.text(formatNumberForPDF(invoice.montant_tva) + ' DH', totalsX + totalsWidth - 2, tvaY + 5.5, { align: 'right' });
        doc.line(totalsX, tvaY + 8, totalsX + totalsWidth, tvaY + 8); // Bottom border

        // Row 3: TOTAL T.T.C
        const ttcY = tvaY + 8;
        doc.line(totalsX, ttcY, totalsX + totalsWidth, ttcY); // Top border
        doc.line(totalsX, ttcY, totalsX, ttcY + 8); // Left border
        doc.line(totalsX + totalsWidth, ttcY, totalsX + totalsWidth, ttcY + 8); // Right border
        doc.line(totalsX + 25, ttcY, totalsX + 25, ttcY + 8); // Middle vertical separator
        doc.setTextColor(0, 0, 0);
        doc.setFont(undefined, 'bold');
        doc.setFontSize(8);
        doc.text('TOTAL T.T.C', totalsX + 2, ttcY + 5.5);
        doc.text(formatNumberForPDF(invoice.total_ttc) + ' DH', totalsX + totalsWidth - 2, ttcY + 5.5, { align: 'right' });
        doc.line(totalsX, ttcY + 8, totalsX + totalsWidth, ttcY + 8); // Bottom border

        // Add Notes Section
        if (notesText) {
            currentY = Math.max(currentY, ttcY + 15);

            // Font size mapping for notes
            const fontSizeMap = {
                'small': { size: 7, lineheight: 3.5 },
                'medium': { size: 9, lineheight: 4.5 },
                'large': { size: 12, lineheight: 5.5 },
                'xlarge': { size: 14, lineheight: 6.5 }
            };
            const selectedFont = fontSizeMap[notesFontSize] || fontSizeMap['medium'];

            // Check if we need a new page for notes header
            if (currentY > pageHeight - 60) {
                tableSegments.push({
                    startY: currentSegmentStart, // This is not quite right if we're after table, but good for rect
                    endY: currentY,
                    page: pageCount
                });
                doc.addPage();
                pageCount++;
                addSAAISSHeader();
                currentY = 70;
            }

            doc.setFontSize(10);
            doc.setFont(undefined, 'bold');
            doc.setTextColor(0, 0, 0);
            doc.text('Notes:', 20, currentY);
            currentY += 6;

            doc.setFontSize(selectedFont.size);
            doc.setFont(undefined, 'normal');
            const noteLines = doc.splitTextToSize(notesText, 170);

            for (let i = 0; i < noteLines.length; i++) {
                if (currentY > pageHeight - 50) {
                    doc.addPage();
                    pageCount++;
                    addSAAISSHeader();
                    currentY = 70;

                    doc.setFontSize(10);
                    doc.setFont(undefined, 'bold');
                    doc.text('Notes (suite):', 20, currentY);
                    currentY += 6;
                    doc.setFontSize(selectedFont.size);
                    doc.setFont(undefined, 'normal');
                }
                doc.text(noteLines[i], 20, currentY);
                currentY += selectedFont.lineheight;
            }
        }

        // Draw borders and add footers
        const totalPages = pageCount;

        doc.setDrawColor(0, 0, 0);
        doc.setLineWidth(0.5);

        tableSegments.forEach(segment => {
            doc.setPage(segment.page);
            doc.rect(20, segment.startY, 170, segment.endY - segment.startY);

            let xPos = 20;
            for (let i = 0; i < colWidths.length - 1; i++) {
                xPos += colWidths[i];
                doc.line(xPos, segment.startY, xPos, segment.endY);
            }
        });

        for (let i = 1; i <= totalPages; i++) {
            doc.setPage(i);
            addSAAISSFooter(i, totalPages);
        }

        console.log('✅ SAAISS PDF generation completed');

    } catch (error) {
        console.error('❌ Error in generateSAAISSPDF:', error);
        throw error;
    }
}
