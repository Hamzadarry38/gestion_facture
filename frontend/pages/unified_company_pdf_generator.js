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

// Show company selection modal
window.showCompanySelectionModal = function (invoiceId, sourceCompany) {
    return new Promise((resolve) => {
        const overlay = document.createElement('div');
        overlay.className = 'custom-modal-overlay';

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
                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;">
                        <button id="selectSKM" class="company-select-btn" style="
                            background: linear-gradient(135deg, #FF9800, #F57C00);
                            border: none;
                            border-radius: 12px;
                            padding: 1.5rem 1rem;
                            cursor: pointer;
                            transition: all 0.3s;
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            gap: 0.5rem;
                        " onmouseover="this.style.transform='scale(1.05)'; this.style.boxShadow='0 8px 25px rgba(255,152,0,0.4)'" 
                           onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='none'">
                            <span style="font-size: 2rem;">🏭</span>
                            <span style="color: #fff; font-weight: 700; font-size: 0.9rem;">SMART</span>
                            <span style="color: rgba(255,255,255,0.8); font-size: 0.7rem;">SERVICES</span>
                        </button>
                        
                        <button id="selectSAAISS" class="company-select-btn" style="
                            background: linear-gradient(135deg, #9C27B0, #7B1FA2);
                            border: none;
                            border-radius: 12px;
                            padding: 1.5rem 1rem;
                            cursor: pointer;
                            transition: all 0.3s;
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            gap: 0.5rem;
                        " onmouseover="this.style.transform='scale(1.05)'; this.style.boxShadow='0 8px 25px rgba(156,39,176,0.4)'" 
                           onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='none'">
                            <span style="font-size: 2rem;">🏭</span>
                            <span style="color: #fff; font-weight: 700; font-size: 0.8rem;">MSH3</span>
                            <span style="color: rgba(255,255,255,0.8); font-size: 0.7rem;">SERVICES</span>
                        </button>
                        
                        <button id="selectBENALI" class="company-select-btn" style="
                            background: linear-gradient(135deg, #4CAF50, #388E3C);
                            border: none;
                            border-radius: 12px;
                            padding: 1.5rem 1rem;
                            cursor: pointer;
                            transition: all 0.3s;
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            gap: 0.5rem;
                        " onmouseover="this.style.transform='scale(1.05)'; this.style.boxShadow='0 8px 25px rgba(76,175,80,0.4)'" 
                           onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='none'">
                            <span style="font-size: 2rem;">🏭</span>
                            <span style="color: #fff; font-weight: 700; font-size: 0.9rem;">BEN ALI</span>
                            <span style="color: rgba(255,255,255,0.8); font-size: 0.7rem;"> </span>
                        </button>
                    </div>
                </div>
                <div class="custom-modal-footer" style="justify-content: center;">
                    <button id="cancelCompanySelect" class="custom-modal-btn secondary">Annuler</button>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);

        // Event handlers
        document.getElementById('selectSKM').addEventListener('click', () => {
            overlay.remove();
            resolve({ company: 'SKM', invoiceId, sourceCompany });
        });

        document.getElementById('selectSAAISS').addEventListener('click', () => {
            overlay.remove();
            resolve({ company: 'SAAISS', invoiceId, sourceCompany });
        });

        document.getElementById('selectBENALI').addEventListener('click', () => {
            overlay.remove();
            resolve({ company: 'BENALI', invoiceId, sourceCompany });
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
    try {
        // Show company selection modal
        const selectedCompanyData = JSON.parse(localStorage.getItem('selectedCompany') || '{}');
        const sourceCompany = selectedCompanyData.name || 'Unknown';

        const selection = await window.showCompanySelectionModal(invoiceId, sourceCompany);

        if (!selection) {
            console.log('❌ User cancelled company selection');
            return;
        }

        console.log(`📥 Generating ${selection.company} PDF for invoice:`, invoiceId, 'from source:', sourceDb);

        // Route to the exact same functions that were used before
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
        }

    } catch (error) {
        console.error('❌ Error in downloadAsOtherCompany:', error);
        window.notify.error('Erreur', 'Impossible de générer le PDF: ' + error.message, 4000);
    }
};

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
        const fileName = `BENALI_${docType}_${customizedInvoice.client_nom}_${invoiceNumber}.pdf`;

        // Get PDF as blob and save to backend
        const pdfBlob = doc.output('blob');
        const pdfArrayBuffer = await pdfBlob.arrayBuffer();
        const pdfUint8Array = new Uint8Array(pdfArrayBuffer);

        // Get createdBy
        const selectedCompany = JSON.parse(localStorage.getItem('selectedCompany') || '{}');
        const createdBy = selectedCompany.code || selectedCompany.name || 'Unknown';

        // Determine save folder: 'chaimae_benali' if source is chaimae, else 'benali'
        const saveFolder = sourceDb === 'chaimae' ? 'chaimae_benali' : 'benali';

        // Save to correct folder
        const saveResult = await window.electron.pdf.savePdf(pdfUint8Array, saveFolder, invoiceNumber, createdBy);

        if (saveResult.success) {
            console.log(`✅ BEN ALI PDF saved to disk (${saveFolder}):`, saveResult.filePath);

            // Record PDF path in database for metadata tracking
            try {
                const currentYear = new Date().getFullYear();
                await window.electron.dbBenAli.savePdfPath(invoiceNumber, currentYear, saveResult.filePath, createdBy);
                console.log('✅ BEN ALI PDF metadata synced to PostgreSQL');
            } catch (dbErr) {
                console.error('⚠️ Failed to sync BEN ALI PDF metadata to PostgreSQL:', dbErr);
            }

            // Also download in browser
            doc.save(fileName);
            window.notify.success('Succès', `PDF BEN ALI généré et sauvegardé: ${fileName}`, 3000);
        } else {
            console.error('❌ Error saving BEN ALI PDF to disk:', saveResult.error);
            window.notify.error('Erreur', 'Erreur lors de la sauvegarde du PDF: ' + saveResult.error, 4000);
            // Fallback: download anyway
            doc.save(fileName);
        }

    } catch (error) {
        console.error('❌ Error generating BEN ALI PDF:', error);
        window.notify.error('Erreur', 'Impossible de générer le PDF BEN ALI: ' + error.message, 4000);
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

    return new Promise((resolve) => {
        const overlay = document.createElement('div');
        overlay.className = 'custom-modal-overlay';

        const selectedCompany = JSON.parse(localStorage.getItem('selectedCompany') || '{}');
        const companyName = selectedCompany.name || 'Inconnue';

        // Generate product inputs HTML
        const productsHtml = invoice.products.map((product, index) => `
            <div style="margin-bottom: 0.5rem;">
                <label style="display: block; margin-bottom: 0.2rem; color: #aaa; font-size: 0.8rem;">
                    Produit ${index + 1}: Quantité: ${product.quantite}
                </label>
                <textarea class="product-name-input" data-index="${index}"
                       style="width: 100%; padding: 0.5rem; background: #2d2d30; border: 1px solid #3e3e42; border-radius: 4px; color: #fff; font-size: 0.9rem; resize: vertical; min-height: 40px;"
                       placeholder="Nom du produit">${product.designation || ''}</textarea>
            </div>
        `).join('');

        overlay.innerHTML = `
            <div class="custom-modal" style="max-width: 600px; max-height: 90vh; overflow-y: auto;">
                <div class="custom-modal-header" style="background: linear-gradient(135deg, #4CAF50, #388E3C);">
                    <span class="custom-modal-icon info">🎨</span>
                    <h3 class="custom-modal-title" style="color: #fff;">PDF BEN ALI - Personnalisation</h3>
                    <div style="position: absolute; top: 1rem; right: 1rem; background: rgba(255,255,255,0.2); color: #fff; padding: 0.4rem 0.8rem; border-radius: 4px; font-size: 0.85rem; font-weight: 600;">
                        🏢 Créé par: <strong>${companyName}</strong>
                    </div>
                </div>
                <div class="custom-modal-body">
                    <div style="margin-bottom: 1.5rem;">
                        <label style="display: block; margin-bottom: 0.5rem; color: #e0e0e0; font-weight: 600;">
                            Pourcentage d'ajustement (%) :
                        </label>
                        <input type="number" id="benaliPercentageInput" placeholder="0" min="0" max="100" step="0.1" 
                               style="width: 100%; padding: 0.75rem; background: #2d2d30; border: 1px solid #3e3e42; border-radius: 6px; color: #fff; font-size: 1rem;">
                        <small style="color: #888; display: block; margin-top: 0.3rem;">Ce pourcentage sera appliqué aux prix mais ne sera pas visible dans le PDF</small>
                    </div>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem;">
                        <div>
                            <label style="display: block; margin-bottom: 0.5rem; color: #e0e0e0; font-weight: 600;">
                                Date personnalisée :
                            </label>
                            <input type="date" id="benaliDateInput" value="${new Date().toISOString().slice(0, 10)}"
                                   style="width: 100%; padding: 0.75rem; background: #2d2d30; border: 1px solid #3e3e42; border-radius: 6px; color: #fff; font-size: 1rem;">
                        </div>
                        <div>
                            <label style="display: block; margin-bottom: 0.5rem; color: #e0e0e0; font-weight: 600;">
                                N° Devis personnalisé :
                            </label>
                            <input type="text" id="benaliDevisInput" value="${nextDevisNumber}" placeholder="D2025-001"
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
                    <button id="benaliGenerateBtn" class="custom-modal-btn primary" style="background: linear-gradient(135deg, #4CAF50, #388E3C);">Générer PDF BEN ALI</button>
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

    // Load BEN ALI assets
    const headerImg = await loadCompanyImage(config.headerPath);
    const footerImg = await loadCompanyImage(config.footerPath);
    const signatureImg = await loadCompanyImage(config.signaturePath);

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

    // Add first page header
    addHeader();
    currentY += 5;

    // Client info
    const dateStr = new Date(invoice.document_date).toLocaleDateString('fr-FR');

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

    // Products table header
    const tableStartY = currentY;
    const colWidths = [100, 25, 35, 30];
    const colX = [15, 115, 140, 175];

    doc.setFillColor(76, 175, 80);
    doc.rect(15, currentY, 180, 8, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(9);
    doc.setFont(undefined, 'bold');
    doc.text('Désignation', 18, currentY + 5.5);
    doc.text('Quantité', 120, currentY + 5.5);
    doc.text('P.U HT', 145, currentY + 5.5);
    doc.text('Total HT', 178, currentY + 5.5);
    currentY += 10;

    // Products
    doc.setTextColor(0, 0, 0);
    doc.setFont(undefined, 'normal');

    invoice.products.forEach((product, index) => {
        const designation = product.designation || '';
        const lines = doc.splitTextToSize(designation, 95);
        const rowHeight = Math.max(8, lines.length * 4 + 4);

        if (currentY + rowHeight > pageHeight - 80) {
            addFooter(pageCount, 'temp');
            doc.addPage();
            pageCount++;
            addHeader();
            currentY += 10;
        }

        if (index % 2 === 0) {
            doc.setFillColor(245, 245, 245);
            doc.rect(15, currentY - 2, 180, rowHeight, 'F');
        }

        doc.setFontSize(8);
        lines.forEach((line, i) => {
            doc.text(line, 18, currentY + 3 + i * 4);
        });

        doc.setFontSize(9);
        doc.text(String(product.quantite || ''), 120, currentY + 4);
        doc.text(parseFloat(product.prix_unitaire_ht).toFixed(2), 155, currentY + 4, { align: 'right' });
        doc.text(parseFloat(product.total_ht).toFixed(2), 193, currentY + 4, { align: 'right' });

        currentY += rowHeight;
    });

    // Totals
    currentY += 10;
    const totalsX = 130;

    doc.setFillColor(76, 175, 80);
    doc.rect(totalsX, currentY, 65, 7, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.setFont(undefined, 'bold');
    doc.text('Total HT', totalsX + 3, currentY + 5);
    doc.text(parseFloat(invoice.total_ht).toFixed(2) + ' DH', totalsX + 62, currentY + 5, { align: 'right' });
    currentY += 8;

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

    // Add footer to all pages
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
