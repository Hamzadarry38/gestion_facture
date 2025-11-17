// SAAISS PDF Generator
// Generate PDF with SAAISS company design and branding

// Main function to download SAAISS Devis PDF for MULTI
window.downloadMultiSAAISSDevisPDF = async function(invoiceId) {
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
                                Voulez-vous les afficher dans le PDF SAAISS ?
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
        
        // Show simple customization modal
        const customizationData = await showSimpleSAAISSModal(invoice);
        if (!customizationData) {
            console.log('❌ User cancelled SAAISS PDF generation');
            return;
        }
        
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
        
        // Apply modified product names
        if (customizationData.modifiedProducts) {
            customizedInvoice.products = customizedInvoice.products.map((product, index) => ({
                ...product,
                designation: customizationData.modifiedProducts[index] || product.designation
            }));
        }
        
        // Check if devis number already exists
        try {
            const currentYear = new Date().getFullYear();
            const existsResult = await window.electron.dbSaaiss.checkDevisExists(customizationData.customDevisNumber, currentYear);
            if (existsResult.success && existsResult.data) {
                throw new Error(`Le numéro de Devis "${customizationData.customDevisNumber}" existe déjà pour l'année ${currentYear}`);
            }
        } catch (error) {
            showSAAISSErrorModal('Numéro de Devis en doublon', error.message);
            return;
        }
        
        // Add Devis number to SAAISS database
        try {
            const currentYear = new Date().getFullYear();
            await window.electron.dbSaaiss.addDevisNumber(customizationData.customDevisNumber, currentYear);
        } catch (error) {
            console.error('Error saving devis number:', error);
        }
        
        // Generate SAAISS PDF with special design
        await generateSAAISSPDF(doc, customizedInvoice, includeZeroProducts);
        
        // Save the PDF
        const fileName = `SAAISS_Devis_${customizedInvoice.document_numero_devis}_${new Date().toISOString().slice(0, 10)}.pdf`;
        
        // Get PDF as blob and save to disk
        const pdfBlob = doc.output('blob');
        const pdfArrayBuffer = await pdfBlob.arrayBuffer();
        const pdfUint8Array = new Uint8Array(pdfArrayBuffer);
        
        // Get the company that created this PDF
        const selectedCompany = JSON.parse(localStorage.getItem('selectedCompany') || '{}');
        const createdBy = selectedCompany.code || selectedCompany.name || 'Unknown';
        
        // Save PDF to disk using electron API (save in 'saaiss' folder, but mark creator as MULTI)
        const saveResult = await window.electron.pdf.savePdf(pdfUint8Array, 'saaiss', customizedInvoice.document_numero_devis, createdBy);
        
        if (saveResult.success) {
            console.log('✅ SAAISS PDF saved to disk:', saveResult.filePath);
            // Also save to downloads
            doc.save(fileName);
            console.log('✅ SAAISS PDF generated successfully:', fileName);
            showSAAISSSuccessModal('PDF généré avec succès', `Le fichier ${fileName} a été téléchargé et sauvegardé avec succès !`);
        } else {
            console.error('❌ Error saving PDF to disk:', saveResult.error);
            showSAAISSWarningModal('Avertissement', 'PDF généré mais erreur lors de la sauvegarde: ' + saveResult.error);
        }
        
    } catch (error) {
        console.error('❌ Error generating SAAISS PDF:', error);
        showSAAISSErrorModal('Erreur de génération', 'Une erreur est survenue lors de la génération du PDF SAAISS: ' + error.message);
    }
};

// Show simple SAAISS modal
async function showSimpleSAAISSModal(invoice) {
    // Get last used devis number
    let lastDevisNumber = 'Aucun';
    try {
        const currentYear = new Date().getFullYear();
        // Use SAAISS database for MULTI company devis numbers (shared database)
        const result = await window.electron.dbSaaiss.getMaxDevisNumber(currentYear);
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
    
    return new Promise((resolve) => {
        const overlay = document.createElement('div');
        overlay.className = 'custom-modal-overlay';
        
        const modal = document.createElement('div');
        modal.className = 'custom-modal';
        modal.style.maxWidth = '700px';
        
        // Extract next devis number and add current year
        let nextDevisNumber = lastDevisNumber;
        const currentYear = new Date().getFullYear();
        if (lastDevisNumber && lastDevisNumber !== 'Aucun') {
            // Extract number before the year (format: number/year)
            // Example: "1/2025" -> extract 1, increment to 2, then add current year
            const match = lastDevisNumber.match(/^(\d+)\/\d+$/);
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
                <h3 class="custom-modal-title">PDF SAAISS - Personnalisation</h3>
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
                        <input type="text" id="devisInput" value="${nextDevisNumber}" placeholder="S2025-001"
                               style="width: 100%; padding: 0.75rem; background: #2d2d30; border: 1px solid #3e3e42; border-radius: 6px; color: #fff; font-size: 1rem;">
                        <small style="color: #4CAF50; display: block; margin-top: 0.5rem; font-weight: 500;">
                            📋 Plus grand N°: <strong>${lastDevisNumber}</strong>
                        </small>
                    </div>
                </div>
                
                <div style="margin-bottom: 1.5rem;">
                    <label style="display: block; margin-bottom: 0.5rem; color: #e0e0e0; font-weight: 600;">
                        Modifier les noms des produits :
                    </label>
                    <div id="productsContainer" style="background: #1e1e1e; border: 1px solid #3e3e42; border-radius: 6px; padding: 1rem; max-height: 250px; overflow-y: auto;">
                        ${invoice.products.map((product, index) => `
                            <div style="margin-bottom: 0.75rem; display: flex; gap: 0.5rem; align-items: center;">
                                <input type="text" class="product-name-input" data-index="${index}" value="${product.designation}" 
                                       style="flex: 1; padding: 0.5rem; background: #2d2d30; border: 1px solid #3e3e42; border-radius: 4px; color: #fff; font-size: 0.9rem;">
                                <span style="color: #999; font-size: 0.85rem; min-width: 60px;">Qté: ${product.quantite}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
            <div class="custom-modal-footer">
                <button id="cancelBtn" class="custom-modal-btn secondary">Annuler</button>
                <button id="generateBtn" class="custom-modal-btn primary">Générer PDF</button>
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
        
        generateBtn.addEventListener('click', () => {
            const percentage = parseFloat(percentageInput.value) || 0;
            const customDate = dateInput.value;
            const customDevisNumber = devisInput.value.trim();
            
            if (!customDevisNumber) {
                alert('Veuillez saisir un numéro de devis');
                return;
            }
            
            // Collect modified product names
            const productNameInputs = document.querySelectorAll('.product-name-input');
            const modifiedProducts = {};
            productNameInputs.forEach(input => {
                const index = input.getAttribute('data-index');
                const newName = input.value.trim();
                if (newName && newName !== invoice.products[index].designation) {
                    modifiedProducts[index] = newName;
                }
            });
            
            overlay.remove();
            resolve({
                percentage,
                customDate,
                customDevisNumber,
                modifiedProducts
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
async function generateSAAISSPDF(doc, invoice, includeZeroProducts = true) {
    try {
        // Load SAAISS assets from SAAISS folder
        const headerImg = await loadSAAISSImage('SAAISS/Hesder.png');
        const footerImg = await loadSAAISSImage('SAAISS/Footer.png');
        const signatureImg = await loadSAAISSImage('SAAISS/signature.png');
        
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
        
        // Function to add SAAISS footer with large signature in center
        const addSAAISSFooter = (pageNum, totalPages) => {
            const footerHeight = 45; // Footer height
            const footerY = pageHeight - footerHeight - 5; // Position footer at bottom
            
            // Large signature - centered (in the middle) - positioned ABOVE footer
            if (signatureImg) {
                const signatureWidth = 45;
                const signatureHeight = 28;
                const signatureX = (pageWidth / 2) - (signatureWidth / 2) - 10; // Center horizontally, slightly left
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
        
        // Client info section - New elegant design without frame
        const addClientInfoSection = () => {
            const infoY = currentY;
            
            // Left column - Client info (CLIENT label + name on same line)
            doc.setFontSize(10);
            doc.setFont(undefined, 'bold');
            doc.setTextColor(0, 0, 0); // Black color for labels
            doc.text('CLIENT:', 20, infoY);
            
            doc.setFont(undefined, 'normal');
            doc.setTextColor(0, 0, 0); // Black text
            doc.setFontSize(11);
            doc.text(invoice.client_nom, 50, infoY); // Name next to CLIENT label
            
            // ICE below client name
            if (invoice.client_ice && invoice.client_ice !== '0') {
                doc.setFontSize(10);
                doc.setFont(undefined, 'normal');
                doc.setTextColor(0, 0, 0); // Black for ICE
                doc.text('ICE: ' + invoice.client_ice, 20, infoY + 7);
            }
            
            // Right column - Date (on the right side)
            doc.setFontSize(10);
            doc.setFont(undefined, 'bold');
            doc.setTextColor(0, 0, 0); // Black
            doc.text('DATE:', pageWidth - 60, infoY);
            
            doc.setFont(undefined, 'normal');
            doc.setTextColor(0, 0, 0); // Black text
            doc.setFontSize(11);
            doc.text(new Date(invoice.document_date).toLocaleDateString('fr-FR'), pageWidth - 30, infoY, { align: 'right' });
            
            // No separator line - clean design
            currentY += 20;
        };
        
        addClientInfoSection();
        
        // Add Devis number near table (LARGE and prominent)
        const addDevisNumberSection = () => {
            doc.setFontSize(14); // Much larger
            doc.setFont(undefined, 'bold');
            doc.setTextColor(0, 0, 0); // Black color
            doc.text('N° Devis: ' + invoice.document_numero_devis, 20, currentY + 3);
            currentY += 10;
        };
        
        addDevisNumberSection();
        
        // Table setup with new design
        const tableHeaders = ['Désignation', 'Qté', 'Prix U. HT', 'Total HT'];
        const colWidths = [95, 20, 30, 30];
        const colPositions = [20, 115, 135, 165];
        
        const addCompleteTableSection = () => {
            const tableStartY = currentY;
            
            // New table header design with orange background
            doc.setFillColor(255, 140, 0); // Orange header
            doc.rect(20, currentY, 175, 12, 'F');
            
            // Header text - white on orange
            doc.setTextColor(255, 255, 255); // White text
            doc.setFont(undefined, 'bold');
            doc.setFontSize(11);
            
            tableHeaders.forEach((header, index) => {
                const align = index > 0 ? 'right' : 'left';
                const x = align === 'right' ? colPositions[index] + colWidths[index] - 2 : colPositions[index] + 2;
                doc.text(header, x, currentY + 8, { align });
            });
            
            currentY += 12;
            return tableStartY;
        };
        
        const firstTableStartY = addCompleteTableSection();
        
        // Process products
        doc.setTextColor(...textColor);
        doc.setFont(undefined, 'normal');
        doc.setFontSize(9);
        
        let tableSegments = [];
        let currentSegmentStart = firstTableStartY;
        const productsToShow = invoice.products;
        
        productsToShow.forEach((product, index) => {
            const maxWidth = colWidths[0] - 4;
            const descriptionLines = doc.splitTextToSize(product.designation, maxWidth);
            const isZeroProduct = parseFloat(product.quantite) === 0 || parseFloat(product.prix_unitaire_ht) === 0;
            const quantityText = includeZeroProducts || !isZeroProduct ? product.quantite : '0';
            const unitPriceText = includeZeroProducts || !isZeroProduct
                ? formatNumberForPDF(product.prix_unitaire_ht) + ' DH'
                : '0.00 DH';
            const totalHtText = includeZeroProducts || !isZeroProduct
                ? formatNumberForPDF(product.total_ht) + ' DH'
                : '0.00 DH';

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
                    addClientInfoSection();
                    addDevisNumberSection();
                    currentSegmentStart = addCompleteTableSection();
                    doc.setTextColor(...textColor);
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

                // Alternate row background color for better readability (per product)
                const isEvenRow = index % 2 === 0;
                if (isEvenRow) {
                    doc.setFillColor(245, 245, 245); // Light gray background
                    doc.rect(20, rowY, 175, rowHeight, 'F');
                }

                // Set text color for row
                doc.setTextColor(...textColor);
                doc.setFont(undefined, 'normal');
                doc.setFontSize(9);

                // Draw description chunk (only the lines that fit on this page)
                const descriptionChunk = descriptionLines.slice(lineIndex, lineIndex + linesForThisRow);
                descriptionChunk.forEach((line, chunkIndex) => {
                    doc.text(line, colPositions[0] + 2, rowY + 6 + (chunkIndex * 4));
                });

                // Draw quantity, unit price and total for this visual row
                const otherColumns = [quantityText, unitPriceText, totalHtText];
                otherColumns.forEach((data, offset) => {
                    const colIndex = offset + 1; // columns 1,2,3
                    const align = colIndex > 1 ? 'right' : 'left';
                    const x = align === 'right'
                        ? colPositions[colIndex] + colWidths[colIndex] - 2
                        : colPositions[colIndex] + 2;
                    doc.text(data, x, rowY + 6, { align });
                });

                // Bottom border for this visual row
                doc.setDrawColor(200, 200, 200); // Light gray border
                doc.setLineWidth(0.2);
                doc.line(20, rowY + rowHeight, 195, rowY + rowHeight);

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
        
        const totalsX = pageWidth - 95;
        const totalsWidth = 90;
        const totalsHeight = 35;
        const totalsStartY = currentY;
        
        // New elegant totals design with orange header
        doc.setFillColor(255, 140, 0); // Orange header
        doc.rect(totalsX - 10, totalsStartY - 5, totalsWidth, 8, 'F');
        
        // Header text
        doc.setFontSize(10);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(255, 255, 255); // White text
        doc.text('RÉSUMÉ', totalsX - 5, totalsStartY + 1);
        
        // White background for totals
        doc.setFillColor(255, 255, 255);
        doc.rect(totalsX - 10, totalsStartY + 3, totalsWidth, totalsHeight - 8, 'F');
        
        // Border
        doc.setDrawColor(255, 140, 0); // Orange border
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
        
        // Draw borders and add footers
        const totalPages = pageCount;
        
        doc.setDrawColor(0, 0, 0);
        doc.setLineWidth(0.5);
        
        tableSegments.forEach(segment => {
            doc.setPage(segment.page);
            doc.rect(20, segment.startY, 175, segment.endY - segment.startY);
            
            let xPos = 20;
            colWidths.forEach((width, index) => {
                if (index < colWidths.length - 1) {
                    xPos += width;
                    doc.line(xPos, segment.startY, xPos, segment.endY);
                }
            });
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
