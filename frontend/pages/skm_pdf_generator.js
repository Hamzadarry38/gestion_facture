// SKM PDF Generator - Special design for SKM company
// This file handles PDF generation with SKM branding and custom features

// Main function to download SKM Devis PDF
window.downloadSKMDevisPDF = async function(invoiceId) {
    try {
        console.log('📥 Generating SKM PDF for devis:', invoiceId);
        
        // Get invoice data
        const result = await window.electron.db.getInvoiceById(invoiceId);
        
        if (!result.success || !result.data) {
            throw new Error('Devis introuvable');
        }
        
        const invoice = result.data;
        
        // Only allow for devis type
        if (invoice.document_type !== 'devis') {
            showSKMWarningModal('Type de document incorrect', 'Cette fonction est disponible uniquement pour les devis.');
            return;
        }
        
        console.log('🔍 Invoice type:', invoice.document_type);
        
        // Check if there are products with zero quantity or price
        const hasZeroProducts = invoice.products && invoice.products.some(p => 
            parseFloat(p.quantite) === 0 || parseFloat(p.prix_unitaire_ht) === 0
        );
        
        let includeZeroProducts = true; // Default: include all products
        
        console.log('⚙️ hasZeroProducts =', hasZeroProducts);
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
                                Voulez-vous les afficher dans le PDF SKM ?
                            </p>
                        </div>
                        <div class="custom-modal-footer">
                            <button id="excludeZeroSKM" class="custom-modal-btn secondary">
                                ❌ Non, masquer
                            </button>
                            <button id="includeZeroSKM" class="custom-modal-btn primary">
                                ✅ Oui, afficher
                            </button>
                        </div>
                    </div>
                `;
                
                document.body.appendChild(overlay);
                
                const excludeBtn = document.getElementById('excludeZeroSKM');
                const includeBtn = document.getElementById('includeZeroSKM');
                
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
        
        // Show simple customization modal
        console.log('➡️ includeZeroProducts chosen =', includeZeroProducts);
        const customizationData = await showSimpleSKMModal(invoice);
        if (!customizationData) {
            console.log('❌ User cancelled SKM PDF generation');
            return;
        }
        
        // Check if jsPDF is loaded
        if (typeof window.jspdf === 'undefined') {
            await loadJsPDF();
        }
        
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        console.log('=== SKM PDF Generation Started ===');
        
        // Apply customizations
        const customizedInvoice = { ...invoice };
        
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
        
        // Apply custom date and devis number
        if (customizationData.customDate) {
            customizedInvoice.document_date = customizationData.customDate;
        }
        if (customizationData.customDevisNumber) {
            customizedInvoice.document_numero_devis = customizationData.customDevisNumber;
        }
        
        // Apply custom product names from modal inputs
        const productInputs = document.querySelectorAll('[id^="product-name-"]');
        if (productInputs.length > 0) {
            customizedInvoice.products = customizedInvoice.products.map((product, index) => {
                const input = document.getElementById(`product-name-${index}`);
                return {
                    ...product,
                    designation: input ? input.value.trim() || product.designation : product.designation
                };
            });
        }
        
        // Add Devis number to SKM database
        try {
            const currentYear = new Date().getFullYear();
            await window.electron.dbSkm.addDevisNumber(customizationData.customDevisNumber, currentYear);
        } catch (error) {
            console.error('Error saving devis number:', error);
        }
        
        // Generate SKM PDF with special design
        console.log('🛠️ Calling generateSKMPDF with includeZeroProducts =', includeZeroProducts);
        await generateSKMPDF(doc, customizedInvoice, includeZeroProducts);
        
        // Save the PDF
        const fileName = `SKM_Devis_${customizedInvoice.document_numero_devis}_${new Date().toISOString().slice(0, 10)}.pdf`;
        
        // Get PDF as blob and save to disk
        const pdfBlob = doc.output('blob');
        const pdfArrayBuffer = await pdfBlob.arrayBuffer();
        const pdfUint8Array = new Uint8Array(pdfArrayBuffer);
        
        // Get the company that created this PDF
        const selectedCompany = JSON.parse(localStorage.getItem('selectedCompany') || '{}');
        const createdBy = selectedCompany.code || selectedCompany.name || 'Unknown';
        
        // Save PDF to disk using electron API (include creator company)
        const saveResult = await window.electron.pdf.savePdf(pdfUint8Array, 'skm', customizedInvoice.document_numero_devis, createdBy);
        
        if (saveResult.success) {
            console.log('✅ SKM PDF saved to disk:', saveResult.filePath);
            // Also save to downloads
            doc.save(fileName);
            console.log('✅ SKM PDF generated successfully:', fileName);
            showSKMSuccessModal('PDF généré avec succès', `Le fichier ${fileName} a été téléchargé et sauvegardé avec succès !`);
        } else {
            console.error('❌ Error saving PDF to disk:', saveResult.error);
            showSKMWarningModal('Avertissement', 'PDF généré mais erreur lors de la sauvegarde: ' + saveResult.error);
        }
        
    } catch (error) {
        console.error('❌ Error generating SKM PDF:', error);
        showSKMErrorModal('Erreur de génération', 'Une erreur est survenue lors de la génération du PDF SKM: ' + error.message);
    }
};

// Show simple SKM modal
async function showSimpleSKMModal(invoice) {
    // Get last used devis number
    let lastDevisNumber = 'Aucun';
    let nextDevisNumber = '';
    const currentYear = new Date().getFullYear();
    try {
        const result = await window.electron.dbSkm.getMaxDevisNumber(currentYear);
        console.log('📋 SKM DB Result:', result);
        if (result && result.success && result.data && result.data.devis_number) {
            lastDevisNumber = result.data.devis_number;
            
            // Extract number and increment by 1 for suggestion, then add current year
            const match = lastDevisNumber.match(/(\D*)(\d+)(\D*)$/);
            if (match) {
                const prefix = match[1];
                const number = parseInt(match[2]) + 1;
                const suffix = match[3];
                nextDevisNumber = prefix + number.toString().padStart(match[2].length, '0') + suffix + '/' + currentYear;
            }
        } else {
            // If no last devis, start with 1/currentYear
            nextDevisNumber = '1/' + currentYear;
        }
    } catch (error) {
        console.log('Could not get last devis number:', error);
        nextDevisNumber = '1/' + currentYear;
    }
    
    return new Promise((resolve) => {
        const overlay = document.createElement('div');
        overlay.className = 'custom-modal-overlay';
        
        const modal = document.createElement('div');
        modal.className = 'custom-modal';
        modal.style.maxWidth = '600px';
        
        // Get the company that created this PDF
        const selectedCompany = JSON.parse(localStorage.getItem('selectedCompany') || '{}');
        const companyName = selectedCompany.name || 'Inconnue';
        
        modal.innerHTML = `
            <div class="custom-modal-header">
                <span class="custom-modal-icon info">🎨</span>
                <h3 class="custom-modal-title">PDF SKM - Personnalisation</h3>
                <div style="position: absolute; top: 1rem; right: 1rem; background: #0078d4; color: #fff; padding: 0.4rem 0.8rem; border-radius: 4px; font-size: 0.85rem; font-weight: 600;">
                    🏢 Créé par: <strong>${companyName}</strong>
                </div>
            </div>
            <div class="custom-modal-body">
                <div style="margin-bottom: 1.5rem;">
                    <label style="display: block; margin-bottom: 0.5rem; color: #e0e0e0; font-weight: 600;">
                        Pourcentage d'ajustement (%) :
                    </label>
                    <input type="number" id="percentageInput" placeholder="0" min="0" max="100" step="0.1" 
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
                        <input type="date" id="dateInput" value="${new Date().toISOString().slice(0, 10)}"
                               style="width: 100%; padding: 0.75rem; background: #2d2d30; border: 1px solid #3e3e42; border-radius: 6px; color: #fff; font-size: 1rem;">
                    </div>
                    <div>
                        <label style="display: block; margin-bottom: 0.5rem; color: #e0e0e0; font-weight: 600;">
                            N° Devis personnalisé :
                        </label>
                        <input type="text" id="devisInput" value="${nextDevisNumber}" placeholder="D2025-001"
                               style="width: 100%; padding: 0.75rem; background: #2d2d30; border: 1px solid #3e3e42; border-radius: 6px; color: #fff; font-size: 1rem;">
                        <small style="color: #4CAF50; display: block; margin-top: 0.5rem; font-weight: 500;">
                            📋 Plus grand N°: <strong>${lastDevisNumber}</strong>
                        </small>
                    </div>
                </div>
                
                <div>
                    <label style="display: block; margin-bottom: 0.5rem; color: #e0e0e0; font-weight: 600;">
                        Personnalisation des produits :
                    </label>
                    <div id="productsList" style="max-height: 200px; overflow-y: auto; border: 1px solid #3e3e42; border-radius: 6px; padding: 1rem; background: #1e1e1e;">
                        ${invoice.products.map((product, index) => `
                            <div style="margin-bottom: 1rem;">
                                <label style="display: block; margin-bottom: 0.25rem; color: #999; font-size: 0.9rem;">
                                    Produit ${index + 1}:
                                </label>
                                <input type="text" id="product-name-${index}" value="${product.designation}" 
                                       style="width: 100%; padding: 0.5rem; background: #2d2d30; border: 1px solid #3e3e42; border-radius: 4px; color: #fff;">
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
            <div class="custom-modal-footer">
                <button id="cancelBtn" class="custom-modal-btn secondary">Annuler</button>
                <button id="generateBtn" class="custom-modal-btn primary">Générer PDF SKM</button>
            </div>
        `;
        
        overlay.appendChild(modal);
        document.body.appendChild(overlay);
        
        const percentageInput = document.getElementById('percentageInput');
        const dateInput = document.getElementById('dateInput');
        const devisInput = document.getElementById('devisInput');
        const cancelBtn = document.getElementById('cancelBtn');
        const generateBtn = document.getElementById('generateBtn');
        
        // Auto-add current year when user leaves the devis input field
        devisInput.addEventListener('blur', () => {
            let value = devisInput.value.trim();
            if (value && !value.includes('/')) {
                devisInput.value = value + '/' + currentYear;
            }
        });
        
        cancelBtn.onclick = () => {
            overlay.remove();
            resolve(null);
        };
        
        generateBtn.onclick = async () => {
            try {
                const percentage = parseFloat(percentageInput.value) || 0;
                const customDate = dateInput.value;
                const customDevisNumber = devisInput.value.trim();
                
                if (!customDevisNumber) {
                    showSKMWarningModal('Champ requis', 'Veuillez saisir un numéro de Devis avant de continuer.');
                    devisInput.focus();
                    return;
                }
                
                // Check if Devis number already exists
                const currentYear = new Date().getFullYear();
                const existsResult = await window.electron.dbSkm.checkDevisExists(customDevisNumber, currentYear);
                if (existsResult.success && existsResult.data) {
                    showSKMErrorModal('Numéro de Devis déjà utilisé', 'Ce numéro de Devis a déjà été utilisé cette année. Veuillez choisir un autre numéro unique.');
                    devisInput.focus();
                    devisInput.style.borderColor = '#ff4444';
                    return;
                }
                
                // Reset border color if valid
                devisInput.style.borderColor = '#3e3e42';
                
                overlay.remove();
                resolve({
                    percentage,
                    customDate,
                    customDevisNumber
                });
                
            } catch (error) {
                console.error('Error in modal:', error);
                showSKMErrorModal('Erreur', 'Une erreur est survenue: ' + error.message);
            }
        };
        
        overlay.onclick = (e) => {
            if (e.target === overlay) {
                overlay.remove();
                resolve(null);
            }
        };
        
        setTimeout(() => generateBtn.focus(), 100);
    });
}

// Old complex modal (keeping for reference)
async function showSKMCustomizationModal(invoice) {
    return new Promise((resolve) => {
        const overlay = document.createElement('div');
        overlay.className = 'custom-modal-overlay';
        
        const currentYear = new Date().getFullYear();
        const currentDate = new Date().toISOString().slice(0, 10);
        
        // Create modal content
        const modalContent = document.createElement('div');
        modalContent.className = 'custom-modal';
        modalContent.style.maxWidth = '800px';
        modalContent.style.maxHeight = '90vh';
        modalContent.style.overflowY = 'auto';
        
        // Modal header
        const header = document.createElement('div');
        header.className = 'custom-modal-header';
        header.innerHTML = `
            <span class="custom-modal-icon info">🎨</span>
            <h3 class="custom-modal-title">Personnalisation PDF SKM</h3>
        `;
        
        // Modal body
        const body = document.createElement('div');
        body.className = 'custom-modal-body';
        
        // Percentage section
        const percentageSection = document.createElement('div');
        percentageSection.style.cssText = 'margin-bottom: 2rem; padding: 1rem; background: #1e1e1e; border-radius: 8px;';
        percentageSection.innerHTML = `
            <h4 style="color: #FF9800; margin: 0 0 1rem 0; font-size: 1rem;">📊 Pourcentage d'ajustement</h4>
            <label style="display: flex; align-items: center; gap: 1rem;">
                <span style="color: #e0e0e0; min-width: 120px;">Pourcentage (%):</span>
                <input type="number" id="skmPercentage" placeholder="0" min="0" max="100" step="0.1" 
                       style="flex: 1; padding: 0.5rem; background: #2d2d30; border: 1px solid #3e3e42; border-radius: 4px; color: #fff;">
            </label>
            <small style="color: #999; display: block; margin-top: 0.5rem;">
                Ce pourcentage sera appliqué aux prix mais ne sera pas visible dans le PDF
            </small>
        `;
        
        // Date and number section
        const dateSection = document.createElement('div');
        dateSection.style.cssText = 'margin-bottom: 2rem; padding: 1rem; background: #1e1e1e; border-radius: 8px;';
        dateSection.innerHTML = `
            <h4 style="color: #2196F3; margin: 0 0 1rem 0; font-size: 1rem;">📅 Date et numéro</h4>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                <label style="display: flex; flex-direction: column; gap: 0.5rem;">
                    <span style="color: #e0e0e0;">Date personnalisée:</span>
                    <input type="date" id="skmCustomDate" value="${currentDate}"
                           style="padding: 0.5rem; background: #2d2d30; border: 1px solid #3e3e42; border-radius: 4px; color: #fff;">
                </label>
                <label style="display: flex; flex-direction: column; gap: 0.5rem;">
                    <span style="color: #e0e0e0;">N° Devis personnalisé:</span>
                    <input type="text" id="skmCustomDevisNumber" value="${invoice.document_numero_devis || ''}" placeholder="D2025-001"
                           style="padding: 0.5rem; background: #2d2d30; border: 1px solid #3e3e42; border-radius: 4px; color: #fff;">
                </label>
            </div>
        `;
        
        // Products section
        const productsSection = document.createElement('div');
        productsSection.style.cssText = 'margin-bottom: 2rem; padding: 1rem; background: #1e1e1e; border-radius: 8px;';
        
        const productsHeader = document.createElement('h4');
        productsHeader.style.cssText = 'color: #4CAF50; margin: 0 0 1rem 0; font-size: 1rem;';
        productsHeader.textContent = '🛍️ Personnalisation des produits';
        
        const productsList = document.createElement('div');
        productsList.id = 'skmProductsList';
        productsList.style.cssText = 'max-height: 200px; overflow-y: auto;';
        
        // Add products
        invoice.products.forEach((product, index) => {
            const productDiv = document.createElement('div');
            productDiv.style.cssText = 'margin-bottom: 1rem; padding: 0.75rem; background: #2d2d30; border-radius: 6px;';
            
            const label = document.createElement('label');
            label.style.cssText = 'display: flex; flex-direction: column; gap: 0.5rem;';
            
            const span = document.createElement('span');
            span.style.cssText = 'color: #999; font-size: 0.9rem;';
            span.textContent = `Produit ${index + 1}:`;
            
            const input = document.createElement('input');
            input.type = 'text';
            input.id = `skmProduct${index}`;
            input.value = product.designation;
            input.style.cssText = 'padding: 0.5rem; background: #1e1e1e; border: 1px solid #3e3e42; border-radius: 4px; color: #fff;';
            
            label.appendChild(span);
            label.appendChild(input);
            productDiv.appendChild(label);
            productsList.appendChild(productDiv);
        });
        
        productsSection.appendChild(productsHeader);
        productsSection.appendChild(productsList);
        
        // Modal footer
        const footer = document.createElement('div');
        footer.className = 'custom-modal-footer';
        
        const cancelBtn = document.createElement('button');
        cancelBtn.id = 'skmCancelBtn';
        cancelBtn.className = 'custom-modal-btn secondary';
        cancelBtn.textContent = 'Annuler';
        
        const generateBtn = document.createElement('button');
        generateBtn.id = 'skmGenerateBtn';
        generateBtn.className = 'custom-modal-btn primary';
        generateBtn.textContent = 'Générer PDF SKM';
        
        footer.appendChild(cancelBtn);
        footer.appendChild(generateBtn);
        
        // Assemble modal
        body.appendChild(percentageSection);
        body.appendChild(dateSection);
        body.appendChild(productsSection);
        
        modalContent.appendChild(header);
        modalContent.appendChild(body);
        modalContent.appendChild(footer);
        
        overlay.appendChild(modalContent);
        document.body.appendChild(overlay);
        
        const customDevisNumberInput = document.getElementById('skmCustomDevisNumber');
        
        // Check devis number uniqueness
        let isCheckingNumber = false;
        customDevisNumberInput.addEventListener('input', async () => {
            const devisNumber = customDevisNumberInput.value.trim();
            if (!devisNumber || isCheckingNumber) return;
            
            isCheckingNumber = true;
            try {
                const exists = await window.electron.invoke('db:skm:devis:exists', devisNumber, currentYear);
                if (exists.success && exists.data) {
                    customDevisNumberInput.style.borderColor = '#f44336';
                    customDevisNumberInput.title = 'Ce numéro existe déjà';
                } else {
                    customDevisNumberInput.style.borderColor = '#4CAF50';
                    customDevisNumberInput.title = 'Numéro disponible';
                }
            } catch (error) {
                console.error('Error checking devis number:', error);
            }
            isCheckingNumber = false;
        });
        
        cancelBtn.addEventListener('click', () => {
            overlay.remove();
            resolve(null);
        });
        
        generateBtn.addEventListener('click', async () => {
            const percentage = parseFloat(document.getElementById('skmPercentage').value) || 0;
            const customDate = document.getElementById('skmCustomDate').value;
            const customDevisNumber = document.getElementById('skmCustomDevisNumber').value.trim();
            
            // Validate devis number uniqueness
            if (customDevisNumber && customDevisNumber !== invoice.document_numero_devis) {
                try {
                    const exists = await window.electron.invoke('db:skm:devis:exists', customDevisNumber, currentYear);
                    if (exists.success && exists.data) {
                        window.notify.error('Erreur', 'Ce numéro de devis existe déjà');
                        return;
                    }
                    
                    // Add to SKM database
                    await window.electron.invoke('db:skm:devis:add', customDevisNumber, currentYear);
                } catch (error) {
                    console.error('Error managing devis number:', error);
                    window.notify.error('Erreur', 'Erreur lors de la vérification du numéro');
                    return;
                }
            }
            
            // Get custom product names
            const customProductNames = {};
            invoice.products.forEach((_, index) => {
                const input = document.getElementById(`skmProduct${index}`);
                if (input) {
                    customProductNames[index] = input.value.trim();
                }
            });
            
            overlay.remove();
            resolve({
                percentage,
                customDate,
                customDevisNumber,
                customProductNames
            });
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

// Generate SKM PDF with special design
async function generateSKMPDF(doc, invoice, includeZeroProducts = true) {
    try {
        // Load SKM assets
        const headerImg = await loadSKMImage('SKM/Hesder.png');
        const footerImg = await loadSKMImage('SKM/Footer.png');
        const signatureImg = await loadSKMImage('SKM/signature.png');
        
        const pageWidth = doc.internal.pageSize.width;
        const pageHeight = doc.internal.pageSize.height;
        
        // Colors for SKM design (neutral colors, no blue)
        const primaryColor = [80, 80, 80]; // Dark gray
        const secondaryColor = [120, 120, 120]; // Medium gray
        const accentColor = [200, 50, 50]; // Red accent for important text
        const textColor = [40, 40, 40]; // Very dark gray
        const borderColor = [160, 160, 160]; // Light gray
        
        let currentY = 20;
        let pageCount = 1;
        
        // Function to add header
        const addSKMHeader = () => {
            if (headerImg) {
                // Header image - full width at top
                const headerHeight = 40;
                doc.addImage(headerImg, 'PNG', 0, 0, pageWidth, headerHeight);
                currentY = headerHeight + 10;
            } else {
                currentY = 20;
            }
        };
        
        // Function to add footer
        const addSKMFooter = (pageNum, totalPages) => {
            if (footerImg) {
                const footerHeight = 35; // Increased height
                const footerY = pageHeight - footerHeight - 5; // More space from bottom
                console.log(`🦶 Adding footer to page ${pageNum} at Y: ${footerY}`);
                doc.addImage(footerImg, 'PNG', 0, footerY, pageWidth, footerHeight);
                
                // Add signature above footer (center position, rotated 5 degrees)
                if (signatureImg) {
                    const signatureWidth = 40;
                    const signatureHeight = 20;
                    const signatureX = (pageWidth - signatureWidth) / 2; // Center horizontally
                    const signatureY = footerY - 25; // 25 units above footer
                    console.log(`✍️ Adding signature to page ${pageNum} at X: ${signatureX}, Y: ${signatureY}`);
                    
                    // Rotate signature 5 degrees around its center
                    const angle = 5;
                    const centerX = signatureX + signatureWidth / 2;
                    const centerY = signatureY + signatureHeight / 2;
                    
                    // Use jsPDF's internal API to apply rotation
                    doc.saveGraphicsState();
                    const angleRad = (angle * Math.PI) / 180;
                    const cos = Math.cos(angleRad);
                    const sin = Math.sin(angleRad);
                    
                    // Apply transformation matrix for rotation
                    doc.internal.write(`q ${cos} ${sin} ${-sin} ${cos} ${centerX - centerX * cos + centerY * sin} ${centerY - centerX * sin - centerY * cos} cm`);
                    doc.addImage(signatureImg, 'PNG', signatureX, signatureY, signatureWidth, signatureHeight);
                    doc.internal.write('Q');
                    doc.restoreGraphicsState();
                }
                
                // Add page number below footer (center) - format "1/2"
                doc.setFontSize(10);
                doc.setTextColor(100, 100, 100);
                const pageText = totalPages === 'temp' ? `Page ${pageNum}` : `${pageNum}/${totalPages}`;
                doc.text(pageText, pageWidth / 2, pageHeight - 8, { align: 'center' });
            }
        };
        
        // Add first page header
        addSKMHeader();
        
        // NO title - remove "DEVIS" text
        currentY += 5; // Small space after header
        
        // Function to add client info section (original beautiful design)
        const addClientInfoSection = () => {
            const dateStr = new Date(invoice.document_date).toLocaleDateString('fr-FR');
            
            doc.setFontSize(12);
            doc.setTextColor(...textColor);
            doc.setFont(undefined, 'bold');
            
            // Client name on the left
            doc.text(`CLIENT: ${invoice.client_nom}`, 20, currentY);
            
            // Date on the right
            doc.text(`Date: ${dateStr}`, pageWidth - 20, currentY, { align: 'right' });
            currentY += 6; // Reduced space
            
            // ICE number if exists - FORCE display
            doc.setFont(undefined, 'normal');
            doc.setFontSize(10);
            const iceValue = invoice.client_ice && invoice.client_ice !== '0' ? invoice.client_ice : 'Non spécifié';
            doc.text(`ICE: ${iceValue}`, 20, currentY);
            currentY += 6; // Reduced space
            
            currentY += 8; // Reduced space
            
            // Devis number at the bottom before table
            doc.setFontSize(14);
            doc.setFont(undefined, 'bold');
            doc.setTextColor(...primaryColor);
            doc.text(`N° Devis: ${invoice.document_numero_devis}`, 20, currentY);
            currentY += 10; // Reduced space
        };
        
        // Add client info section to first page
        addClientInfoSection();
        
        // Products table - clean design (remove N° column)
        const tableHeaders = ['Désignation', 'Qté', 'Prix U. HT', 'Total HT'];
        const colWidths = [95, 20, 30, 30];
        const colPositions = [20, 115, 135, 165];
        
        // Function to add table header (exactly like first page)
        const addTableHeader = () => {
            doc.setFillColor(255, 182, 193); // Light red/pink header
            doc.rect(20, currentY, 175, 10, 'F');
            
            doc.setTextColor(0, 0, 0); // Black text on light red
            doc.setFont(undefined, 'bold');
            doc.setFontSize(10);
            
            tableHeaders.forEach((header, index) => {
                doc.text(header, colPositions[index] + 2, currentY + 7);
            });
            
            currentY += 10;
        };
        
        // Function to add complete table section (header + content area)
        const addCompleteTableSection = () => {
            const tableStartY = currentY;
            addTableHeader();
            return tableStartY;
        };
        
        // Add complete table section to first page
        const firstTableStartY = addCompleteTableSection();
        
        // Table rows - NO background colors, clean white
        doc.setTextColor(...textColor);
        doc.setFont(undefined, 'normal');
        doc.setFontSize(9);
        
        let tableSegments = []; // Track table segments for borders
        let currentSegmentStart = firstTableStartY;
        
        // Show all products but display zeros based on user choice
        const productsToShow = invoice.products;
        
        console.log(`📦 Showing ${productsToShow.length} products with zero handling: ${includeZeroProducts ? 'Show zeros' : 'Display as 0.00'}`);
        
        productsToShow.forEach((product, index) => {
            const maxWidth = colWidths[0] - 4; // Description column width
            const descriptionLines = doc.splitTextToSize(product.designation || '', maxWidth);
            
            // Row data with zero handling (fixed per product)
            const isZeroProduct = parseFloat(product.quantite) === 0 || parseFloat(product.prix_unitaire_ht) === 0;
            const quantityText = includeZeroProducts || !isZeroProduct ? product.quantite : '';
            const unitPriceText = includeZeroProducts || !isZeroProduct
                ? formatNumberForPDF(product.prix_unitaire_ht) + ' DH'
                : '';
            const totalHtText = includeZeroProducts || !isZeroProduct
                ? formatNumberForPDF(product.total_ht) + ' DH'
                : '';

            let lineIndex = 0;

            while (lineIndex < descriptionLines.length) {
                // Check if we need a new page - reserve space for footer
                // Footer will be added at the end for all pages
                let availableHeight = pageHeight - 100 - currentY; // Reserve space for footer and totals
                if (availableHeight < 10) {
                    // Close current table segment
                    tableSegments.push({
                        startY: currentSegmentStart,
                        endY: currentY,
                        page: pageCount
                    });

                    // Create new page
                    doc.addPage();
                    pageCount++;
                    console.log(`📄 Creating page ${pageCount}`);

                    // Add complete header design to new page (same as first page)
                    addSKMHeader();

                    // Add complete client info section using the same function
                    addClientInfoSection();

                    // Add complete table section using the SAME function as first page
                    console.log(`📋 Adding complete table section to page ${pageCount}`);
                    currentSegmentStart = addCompleteTableSection();
                    doc.setTextColor(...textColor);
                    doc.setFont(undefined, 'normal');
                    doc.setFontSize(9);

                    availableHeight = pageHeight - 100 - currentY;
                }

                // Calculate how many description lines can fit on the current page
                const remainingLines = descriptionLines.length - lineIndex;
                const maxLinesThisPage = Math.max(1, Math.floor((availableHeight - 4) / 4));
                const linesForThisRow = Math.min(remainingLines, maxLinesThisPage);
                const rowHeight = Math.max(8, linesForThisRow * 4 + 4); // Dynamic height

                const rowY = currentY;

                // Draw description chunk that fits on this page
                const descriptionChunk = descriptionLines.slice(lineIndex, lineIndex + linesForThisRow);
                descriptionChunk.forEach((line, chunkIndex) => {
                    doc.text(line, colPositions[0] + 2, rowY + 5 + (chunkIndex * 4));
                });

                // Draw quantity, price and total for this visual row
                const otherColumns = [quantityText, unitPriceText, totalHtText];
                otherColumns.forEach((data, offset) => {
                    const colIndex = offset + 1; // 1, 2, 3
                    const align = colIndex > 1 ? 'right' : 'left';
                    const x = align === 'right'
                        ? colPositions[colIndex] + colWidths[colIndex] - 2
                        : colPositions[colIndex] + 2;
                    doc.text(data, x, rowY + 5, { align });
                });

                // Add horizontal line after this visual row
                doc.setDrawColor(0, 0, 0);
                doc.setLineWidth(0.3);
                doc.line(20, rowY + rowHeight, 195, rowY + rowHeight);

                currentY += rowHeight;
                lineIndex += linesForThisRow;
            }
        });
        
        // Close final table segment
        tableSegments.push({
            startY: currentSegmentStart,
            endY: currentY,
            page: pageCount
        });
        
        // Return to last page for totals
        doc.setPage(pageCount);
        
        currentY += 10; // Reduced space after table
        
        // Recalculate totals based on displayed products
        let displayedTotalHT = 0;
        if (!includeZeroProducts) {
            displayedTotalHT = productsToShow.reduce((sum, p) => sum + parseFloat(p.total_ht), 0);
            const displayedMontantTVA = displayedTotalHT * (parseFloat(invoice.tva_rate) / 100);
            const displayedTotalTTC = displayedTotalHT + displayedMontantTVA;
            
            // Update invoice totals for display
            invoice.total_ht = displayedTotalHT;
            invoice.montant_tva = displayedMontantTVA;
            invoice.total_ttc = displayedTotalTTC;
            
            console.log(`💰 Recalculated totals - HT: ${displayedTotalHT}, TTC: ${displayedTotalTTC}`);
        }
        
        // Totals section with elegant design (matching SAAISS style)
        const totalsX = pageWidth - 95;
        const totalsWidth = 90;
        const totalsHeight = 35;
        const totalsStartY = currentY;
        
        // New elegant totals design with pink/red header (SKM brand color)
        doc.setFillColor(255, 182, 193); // Light pink header (SKM brand)
        doc.rect(totalsX - 10, totalsStartY - 5, totalsWidth, 8, 'F');
        
        // Header text
        doc.setFontSize(10);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(0, 0, 0); // Black text
        doc.text('RÉSUMÉ', totalsX - 5, totalsStartY + 1);
        
        // White background for totals
        doc.setFillColor(255, 255, 255);
        doc.rect(totalsX - 10, totalsStartY + 3, totalsWidth, totalsHeight - 8, 'F');
        
        // Border
        doc.setDrawColor(255, 182, 193); // Pink border (SKM brand)
        doc.setLineWidth(1);
        doc.rect(totalsX - 10, totalsStartY - 5, totalsWidth, totalsHeight);
        
        // Totals content
        doc.setFontSize(10);
        doc.setFont(undefined, 'normal');
        doc.setTextColor(...textColor);
        
        doc.text('Total HT:', totalsX - 5, totalsStartY + 10);
        doc.text(formatNumberForPDF(invoice.total_ht) + ' DH', totalsX + 75, totalsStartY + 10, { align: 'right' });
        
        doc.text(`TVA (${invoice.tva_rate}%):`, totalsX - 5, totalsStartY + 17);
        doc.text(formatNumberForPDF(invoice.montant_tva) + ' DH', totalsX + 75, totalsStartY + 17, { align: 'right' });
        
        // Total TTC - highlighted
        doc.setFontSize(12);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(0, 0, 0); // Black color
        doc.text('Total TTC:', totalsX - 5, totalsStartY + 26);
        doc.text(formatNumberForPDF(invoice.total_ttc) + ' DH', totalsX + 75, totalsStartY + 26, { align: 'right' });
        
        // Calculate total pages
        const totalPages = pageCount;
        
        // Draw borders for all table segments BEFORE adding footers
        console.log('🖼️ Drawing table borders for all pages');
        doc.setDrawColor(0, 0, 0); // Black for main borders
        doc.setLineWidth(0.5); // Standard border thickness
        
        tableSegments.forEach(segment => {
            doc.setPage(segment.page);
            console.log(`📋 Drawing borders for page ${segment.page}`);
            
            // Table border
            doc.rect(20, segment.startY, 175, segment.endY - segment.startY);
            
            // Vertical lines
            let xPos = 20;
            colWidths.forEach(width => {
                xPos += width;
                doc.line(xPos, segment.startY, xPos, segment.endY);
            });
        });
        
        // Add complete footer to all pages AFTER drawing borders
        for (let i = 1; i <= totalPages; i++) {
            doc.setPage(i);
            console.log(`🔄 Adding complete footer to page ${i}/${totalPages}`);
            
            // Add complete footer with signature and page number
            addSKMFooter(i, totalPages);
        }
        
        console.log('✅ SKM PDF generation completed');
        
    } catch (error) {
        console.error('❌ Error in SKM PDF generation:', error);
        throw error;
    }
}

// Load SKM image helper
async function loadSKMImage(imagePath) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = function() {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            resolve(canvas.toDataURL('image/png'));
        };
        img.onerror = function() {
            console.warn(`Could not load SKM image: ${imagePath}`);
            resolve(null);
        };
        img.src = imagePath;
    });
}

// Format number for PDF (reuse from main file)
function formatNumberForPDF(number) {
    const num = parseFloat(number || 0);
    const formatted = num.toFixed(2);
    const parts = formatted.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return parts[0] + ',' + parts[1];
}

// Load jsPDF if not already loaded
async function loadJsPDF() {
    return new Promise((resolve, reject) => {
        if (typeof window.jspdf !== 'undefined') {
            resolve();
            return;
        }
        
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
        script.onload = () => {
            console.log('✅ jsPDF loaded successfully');
            resolve();
        };
        script.onerror = () => {
            console.error('❌ Failed to load jsPDF');
            reject(new Error('Failed to load jsPDF'));
        };
        document.head.appendChild(script);
    });
}

// Beautiful SKM Modal Functions
function showSKMSuccessModal(title, message) {
    const overlay = document.createElement('div');
    overlay.className = 'custom-modal-overlay';
    overlay.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
        background: rgba(0,0,0,0.7); display: flex; align-items: center; 
        justify-content: center; z-index: 10000; backdrop-filter: blur(5px);
    `;
    
    const modal = document.createElement('div');
    modal.style.cssText = `
        background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
        border-radius: 20px; padding: 2rem; max-width: 450px; width: 90%;
        box-shadow: 0 20px 60px rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.1);
        transform: scale(0.9); opacity: 0; transition: all 0.3s ease;
    `;
    
    modal.innerHTML = `
        <div style="text-align: center;">
            <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #4CAF50, #45a049); 
                        border-radius: 50%; display: flex; align-items: center; justify-content: center; 
                        margin: 0 auto 1.5rem; box-shadow: 0 10px 30px rgba(76,175,80,0.3);">
                <span style="font-size: 2.5rem;">✅</span>
            </div>
            <h3 style="color: #fff; margin: 0 0 1rem; font-size: 1.5rem; font-weight: 600;">${title}</h3>
            <p style="color: rgba(255,255,255,0.9); margin: 0 0 2rem; line-height: 1.6; font-size: 1rem;">${message}</p>
            <button onclick="this.closest('.custom-modal-overlay').remove()" 
                    style="background: linear-gradient(135deg, #4CAF50, #45a049); color: white; border: none; 
                           padding: 0.75rem 2rem; border-radius: 10px; font-size: 1rem; font-weight: 600; 
                           cursor: pointer; transition: all 0.3s ease; box-shadow: 0 5px 15px rgba(76,175,80,0.3);">
                Parfait !
            </button>
        </div>
    `;
    
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    
    setTimeout(() => {
        modal.style.transform = 'scale(1)';
        modal.style.opacity = '1';
    }, 10);
    
    overlay.onclick = (e) => {
        if (e.target === overlay) overlay.remove();
    };
}

function showSKMErrorModal(title, message) {
    const overlay = document.createElement('div');
    overlay.className = 'custom-modal-overlay';
    overlay.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
        background: rgba(0,0,0,0.7); display: flex; align-items: center; 
        justify-content: center; z-index: 10000; backdrop-filter: blur(5px);
    `;
    
    const modal = document.createElement('div');
    modal.style.cssText = `
        background: linear-gradient(135deg, #c62828 0%, #d32f2f 100%);
        border-radius: 20px; padding: 2rem; max-width: 450px; width: 90%;
        box-shadow: 0 20px 60px rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.1);
        transform: scale(0.9); opacity: 0; transition: all 0.3s ease;
    `;
    
    modal.innerHTML = `
        <div style="text-align: center;">
            <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #f44336, #d32f2f); 
                        border-radius: 50%; display: flex; align-items: center; justify-content: center; 
                        margin: 0 auto 1.5rem; box-shadow: 0 10px 30px rgba(244,67,54,0.3);">
                <span style="font-size: 2.5rem;">❌</span>
            </div>
            <h3 style="color: #fff; margin: 0 0 1rem; font-size: 1.5rem; font-weight: 600;">${title}</h3>
            <p style="color: rgba(255,255,255,0.9); margin: 0 0 2rem; line-height: 1.6; font-size: 1rem;">${message}</p>
            <button onclick="this.closest('.custom-modal-overlay').remove()" 
                    style="background: linear-gradient(135deg, #f44336, #d32f2f); color: white; border: none; 
                           padding: 0.75rem 2rem; border-radius: 10px; font-size: 1rem; font-weight: 600; 
                           cursor: pointer; transition: all 0.3s ease; box-shadow: 0 5px 15px rgba(244,67,54,0.3);">
                Compris
            </button>
        </div>
    `;
    
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    
    setTimeout(() => {
        modal.style.transform = 'scale(1)';
        modal.style.opacity = '1';
    }, 10);
    
    overlay.onclick = (e) => {
        if (e.target === overlay) overlay.remove();
    };
}

function showSKMWarningModal(title, message) {
    const overlay = document.createElement('div');
    overlay.className = 'custom-modal-overlay';
    overlay.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
        background: rgba(0,0,0,0.7); display: flex; align-items: center; 
        justify-content: center; z-index: 10000; backdrop-filter: blur(5px);
    `;
    
    const modal = document.createElement('div');
    modal.style.cssText = `
        background: linear-gradient(135deg, #f57c00 0%, #ff9800 100%);
        border-radius: 20px; padding: 2rem; max-width: 450px; width: 90%;
        box-shadow: 0 20px 60px rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.1);
        transform: scale(0.9); opacity: 0; transition: all 0.3s ease;
    `;
    
    modal.innerHTML = `
        <div style="text-align: center;">
            <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #ff9800, #f57c00); 
                        border-radius: 50%; display: flex; align-items: center; justify-content: center; 
                        margin: 0 auto 1.5rem; box-shadow: 0 10px 30px rgba(255,152,0,0.3);">
                <span style="font-size: 2.5rem;">⚠️</span>
            </div>
            <h3 style="color: #fff; margin: 0 0 1rem; font-size: 1.5rem; font-weight: 600;">${title}</h3>
            <p style="color: rgba(255,255,255,0.9); margin: 0 0 2rem; line-height: 1.6; font-size: 1rem;">${message}</p>
            <button onclick="this.closest('.custom-modal-overlay').remove()" 
                    style="background: linear-gradient(135deg, #ff9800, #f57c00); color: white; border: none; 
                           padding: 0.75rem 2rem; border-radius: 10px; font-size: 1rem; font-weight: 600; 
                           cursor: pointer; transition: all 0.3s ease; box-shadow: 0 5px 15px rgba(255,152,0,0.3);">
                D'accord
            </button>
        </div>
    `;
    
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    
    setTimeout(() => {
        modal.style.transform = 'scale(1)';
        modal.style.opacity = '1';
    }, 10);
    
    overlay.onclick = (e) => {
        if (e.target === overlay) overlay.remove();
    };
}
