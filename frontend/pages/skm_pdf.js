// SKM PDF Generator - Professional design for SKM company
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
            alert('Cette fonction est disponible uniquement pour les devis');
            return;
        }
        
        console.log('🔍 Invoice type:', invoice.document_type);
        
        // Show simple customization modal
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
        await generateSKMPDF(doc, customizedInvoice);
        
        // Save the PDF
        const fileName = `SKM_Devis_${customizedInvoice.document_numero_devis}_${new Date().toISOString().slice(0, 10)}.pdf`;
        doc.save(fileName);
        
        console.log('✅ SKM PDF generated successfully:', fileName);
        alert(`✅ PDF généré avec succès!\nFichier: ${fileName}`);
        
    } catch (error) {
        console.error('❌ Error generating SKM PDF:', error);
        alert('Erreur lors de la génération du PDF: ' + error.message);
    }
};

// Show simple SKM modal
async function showSimpleSKMModal(invoice) {
    return new Promise((resolve) => {
        const overlay = document.createElement('div');
        overlay.className = 'custom-modal-overlay';
        
        const modal = document.createElement('div');
        modal.className = 'custom-modal';
        modal.style.maxWidth = '600px';
        
        modal.innerHTML = `
            <div class="custom-modal-header">
                <span class="custom-modal-icon info">🎨</span>
                <h3 class="custom-modal-title">PDF SKM - Personnalisation</h3>
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
                        <input type="text" id="devisInput" value="${invoice.document_numero_devis || ''}" placeholder="D2025-001"
                               style="width: 100%; padding: 0.75rem; background: #2d2d30; border: 1px solid #3e3e42; border-radius: 6px; color: #fff; font-size: 1rem;">
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
                    alert('Veuillez saisir un numéro de Devis');
                    return;
                }
                
                // Check if Devis number already exists
                const currentYear = new Date().getFullYear();
                const existsResult = await window.electron.dbSkm.checkDevisExists(customDevisNumber, currentYear);
                if (existsResult.success && existsResult.data) {
                    alert('❌ Ce numéro de Devis a déjà été utilisé!\nVeuillez choisir un autre numéro.');
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
                alert('Erreur: ' + error.message);
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

// Generate SKM PDF with professional design
async function generateSKMPDF(doc, invoice) {
    try {
        // Load SKM assets
        const headerImg = await loadSKMImage('SKM/Hesder.png');
        const footerImg = await loadSKMImage('SKM/Footer.png');
        const signatureImg = await loadSKMImage('SKM/signature.png');
        
        const pageWidth = doc.internal.pageSize.width;
        const pageHeight = doc.internal.pageSize.height;
        
        // Professional color scheme
        const colors = {
            primary: [41, 128, 185],     // Professional blue
            secondary: [52, 73, 94],     // Dark gray
            accent: [231, 76, 60],       // Red accent
            text: [44, 62, 80],          // Dark text
            lightGray: [236, 240, 241],  // Light background
            border: [189, 195, 199]      // Border gray
        };
        
        let currentY = 20;
        let pageNum = 1;
        
        // Function to add professional header
        const addProfessionalHeader = (pageNumber) => {
            if (headerImg) {
                const headerHeight = 35;
                doc.addImage(headerImg, 'PNG', 0, 0, pageWidth, headerHeight);
                currentY = headerHeight + 15;
            } else {
                currentY = 25;
            }
            
            // Page number in top right
            doc.setFontSize(9);
            doc.setTextColor(...colors.text);
            doc.text(`Page ${pageNumber}`, pageWidth - 20, 15, { align: 'right' });
        };
        
        // Function to add professional footer
        const addProfessionalFooter = () => {
            if (footerImg) {
                const footerHeight = 25;
                const footerY = pageHeight - footerHeight - 5;
                doc.addImage(footerImg, 'PNG', 0, footerY, pageWidth, footerHeight);
                
                // Add signature
                if (signatureImg) {
                    const signatureWidth = 35;
                    const signatureHeight = 18;
                    const signatureX = pageWidth - signatureWidth - 15;
                    const signatureY = footerY - signatureHeight - 3;
                    doc.addImage(signatureImg, 'PNG', signatureX, signatureY, signatureWidth, signatureHeight);
                }
            }
        };
        
        // Function to add client info section
        const addClientInfo = () => {
            const dateStr = new Date(invoice.document_date).toLocaleDateString('fr-FR');
            
            // Client info box
            doc.setFillColor(...colors.lightGray);
            doc.rect(20, currentY, pageWidth - 40, 25, 'F');
            doc.setDrawColor(...colors.border);
            doc.rect(20, currentY, pageWidth - 40, 25);
            
            currentY += 8;
            
            // Client name
            doc.setFontSize(12);
            doc.setTextColor(...colors.primary);
            doc.setFont(undefined, 'bold');
            doc.text(`CLIENT: ${invoice.client_nom}`, 25, currentY);
            
            // Date
            doc.text(`Date: ${dateStr}`, pageWidth - 25, currentY, { align: 'right' });
            currentY += 8;
            
            // ICE
            doc.setFontSize(10);
            doc.setTextColor(...colors.text);
            doc.setFont(undefined, 'normal');
            const iceValue = invoice.client_ice && invoice.client_ice !== '0' ? invoice.client_ice : 'Non spécifié';
            doc.text(`ICE: ${iceValue}`, 25, currentY);
            
            // Devis number
            doc.setFont(undefined, 'bold');
            doc.setTextColor(...colors.accent);
            doc.text(`N° Devis: ${invoice.document_numero_devis}`, pageWidth - 25, currentY, { align: 'right' });
            
            currentY += 15;
        };
        
        // Function to add table header
        const addTableHeader = () => {
            const headers = ['Désignation', 'Qté', 'Prix U. HT', 'Total HT'];
            const colWidths = [100, 25, 35, 35];
            const colPositions = [20, 120, 145, 180];
            
            // Header background
            doc.setFillColor(...colors.primary);
            doc.rect(20, currentY, 175, 12, 'F');
            
            // Header text
            doc.setTextColor(255, 255, 255);
            doc.setFont(undefined, 'bold');
            doc.setFontSize(10);
            
            headers.forEach((header, index) => {
                const align = index === 0 ? 'left' : 'center';
                const x = index === 0 ? colPositions[index] + 3 : colPositions[index] + colWidths[index] / 2;
                doc.text(header, x, currentY + 8, { align });
            });
            
            currentY += 12;
            return { colWidths, colPositions };
        };
        
        // Start first page
        addProfessionalHeader(pageNum);
        addClientInfo();
        
        // Add table
        const { colWidths, colPositions } = addTableHeader();
        
        // Table rows
        doc.setTextColor(...colors.text);
        doc.setFont(undefined, 'normal');
        doc.setFontSize(9);
        
        let rowCount = 0;
        const maxRowsPerPage = Math.floor((pageHeight - currentY - 80) / 12);
        
        // Add products
        invoice.products.forEach((product, index) => {
            // Check if we need a new page
            if (rowCount >= maxRowsPerPage && index < invoice.products.length - 1) {
                // Add footer to current page
                addProfessionalFooter();
                
                // New page
                doc.addPage();
                pageNum++;
                currentY = 20;
                addProfessionalHeader(pageNum);
                addClientInfo();
                addTableHeader();
                rowCount = 0;
            }
            
            const rowY = currentY;
            
            // Alternating row colors
            if (index % 2 === 1) {
                doc.setFillColor(248, 249, 250);
                doc.rect(20, rowY, 175, 12, 'F');
            }
            
            // Row border
            doc.setDrawColor(...colors.border);
            doc.rect(20, rowY, 175, 12);
            
            // Row data
            const rowData = [
                product.designation,
                product.quantite.toString(),
                formatNumberForPDF(product.prix_unitaire_ht) + ' DH',
                formatNumberForPDF(product.total_ht) + ' DH'
            ];
            
            rowData.forEach((data, colIndex) => {
                const maxWidth = colWidths[colIndex] - 6;
                
                if (colIndex === 0) { // Description
                    const lines = doc.splitTextToSize(data, maxWidth);
                    doc.text(lines[0], colPositions[colIndex] + 3, rowY + 8);
                } else {
                    const align = colIndex === 1 ? 'center' : 'right';
                    const x = colIndex === 1 ? 
                        colPositions[colIndex] + colWidths[colIndex] / 2 : 
                        colPositions[colIndex] + colWidths[colIndex] - 3;
                    doc.text(data, x, rowY + 8, { align });
                }
            });
            
            currentY += 12;
            rowCount++;
        });
        
        // Add totals inside table
        const totalsData = [
            ['Total HT', '', '', formatNumberForPDF(invoice.total_ht) + ' DH'],
            [`TVA (${invoice.tva_rate}%)`, '', '', formatNumberForPDF(invoice.montant_tva) + ' DH'],
            ['Total TTC', '', '', formatNumberForPDF(invoice.total_ttc) + ' DH']
        ];
        
        totalsData.forEach((row, index) => {
            // Check if we need a new page for totals
            if (currentY > pageHeight - 60) {
                addProfessionalFooter();
                doc.addPage();
                pageNum++;
                currentY = 20;
                addProfessionalHeader(pageNum);
                addClientInfo();
                addTableHeader();
            }
            
            const rowY = currentY;
            
            // Special styling for totals
            if (index === 2) { // Total TTC
                doc.setFillColor(...colors.accent);
                doc.rect(20, rowY, 175, 12, 'F');
                doc.setTextColor(255, 255, 255);
                doc.setFont(undefined, 'bold');
            } else {
                doc.setFillColor(...colors.lightGray);
                doc.rect(20, rowY, 175, 12, 'F');
                doc.setTextColor(...colors.text);
                doc.setFont(undefined, 'bold');
            }
            
            // Border
            doc.setDrawColor(...colors.border);
            doc.rect(20, rowY, 175, 12);
            
            // Text
            doc.text(row[0], colPositions[0] + 3, rowY + 8);
            doc.text(row[3], colPositions[3] + colWidths[3] - 3, rowY + 8, { align: 'right' });
            
            currentY += 12;
        });
        
        // Add vertical lines for table
        let xPos = 20;
        colWidths.forEach((width, index) => {
            xPos += width;
            if (index < colWidths.length - 1) {
                doc.line(xPos, currentY - (invoice.products.length + 3) * 12 - 12, xPos, currentY);
            }
        });
        
        // Add footer to last page
        addProfessionalFooter();
        
        console.log('✅ Professional SKM PDF generation completed');
        
    } catch (error) {
        console.error('❌ Error generating SKM PDF:', error);
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

// Format number for PDF
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
            reject(new Error('Failed to load jsPDF library'));
        };
        document.head.appendChild(script);
    });
}