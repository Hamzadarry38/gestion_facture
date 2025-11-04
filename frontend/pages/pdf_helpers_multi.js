// PDF Helper Functions for Multi Company

// Format number for PDF display
function formatNumberForPDF(number) {
    if (number === null || number === undefined) return '0.00';
    const num = parseFloat(number);
    if (isNaN(num)) return '0.00';
    return num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

// Convert number to French words
function numberToFrenchWords(number) {
    const units = ['', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf'];
    const teens = ['dix', 'onze', 'douze', 'treize', 'quatorze', 'quinze', 'seize', 'dix-sept', 'dix-huit', 'dix-neuf'];
    const tens = ['', '', 'vingt', 'trente', 'quarante', 'cinquante', 'soixante', 'soixante', 'quatre-vingt', 'quatre-vingt'];
    
    function convertLessThanThousand(n) {
        if (n === 0) return '';
        
        let result = '';
        
        // Hundreds
        const hundreds = Math.floor(n / 100);
        if (hundreds > 0) {
            if (hundreds === 1) {
                result += 'cent';
            } else {
                result += units[hundreds] + ' cent';
            }
            if (n % 100 !== 0) result += ' ';
            else if (hundreds > 1) result += 's';
        }
        
        n %= 100;
        
        // Tens and units
        if (n >= 10 && n < 20) {
            result += teens[n - 10];
        } else if (n >= 20) {
            const tensDigit = Math.floor(n / 10);
            const unitsDigit = n % 10;
            
            if (tensDigit === 7 || tensDigit === 9) {
                result += tens[tensDigit];
                if (tensDigit === 7) {
                    result += '-' + (unitsDigit === 0 ? 'dix' : teens[unitsDigit]);
                } else {
                    result += (unitsDigit === 0 ? '-dix' : '-' + teens[unitsDigit]);
                }
            } else {
                result += tens[tensDigit];
                if (unitsDigit === 1 && tensDigit !== 8) {
                    result += ' et un';
                } else if (unitsDigit > 1) {
                    result += '-' + units[unitsDigit];
                } else if (tensDigit === 8 && unitsDigit === 0) {
                    result += 's';
                }
            }
        } else if (n > 0) {
            result += units[n];
        }
        
        return result;
    }
    
    const integerPart = Math.floor(number);
    const decimalPart = Math.round((number - integerPart) * 100);
    
    let result = '';
    
    if (integerPart === 0) {
        result = 'zéro dirham';
    } else {
        // Billions (milliards)
        const billions = Math.floor(integerPart / 1000000000);
        if (billions > 0) {
            if (billions === 1) {
                result += 'un milliard';
            } else {
                result += convertLessThanThousand(billions) + ' milliards';
            }
        }
        
        // Millions
        const millions = Math.floor((integerPart % 1000000000) / 1000000);
        if (millions > 0) {
            if (result) result += ' ';
            if (millions === 1) {
                result += 'un million';
            } else {
                result += convertLessThanThousand(millions) + ' millions';
            }
        }
        
        // Thousands
        const thousands = Math.floor((integerPart % 1000000) / 1000);
        if (thousands > 0) {
            if (result) result += ' ';
            if (thousands === 1) {
                result += 'mille';
            } else {
                result += convertLessThanThousand(thousands) + ' mille';
            }
        }
        
        // Remaining
        const remainder = integerPart % 1000;
        if (remainder > 0) {
            if (result) result += ' ';
            result += convertLessThanThousand(remainder);
        }
        
        result += integerPart > 1 ? ' dirhams' : ' dirham';
    }
    
    if (decimalPart > 0) {
        result += ' et ' + convertLessThanThousand(decimalPart) + ' centime';
        if (decimalPart > 1) result += 's';
    } else {
        result += ' et zéro centime';
    }
    
    return result.charAt(0).toUpperCase() + result.slice(1);
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

// Download invoice as PDF - MULTI TRAVAUX TETOUAN Design
window.downloadInvoicePDFMulti = async function(invoiceId) {
    try {
        console.log('📥 Generating PDF for invoice:', invoiceId);
        
        // Get invoice data
        const result = await window.electron.dbMulti.getInvoiceById(invoiceId);
        
        if (!result.success || !result.data) {
            throw new Error('Facture introuvable');
        }
        
        const invoice = result.data;
        
        console.log('🔍 Invoice type:', invoice.document_type);
        console.log('🔍 Current Order number:', invoice.document_numero_Order);
        
        // Show dialog with checkbox for FACTURE type (only if Order exists)
        if (invoice.document_type === 'facture' && invoice.document_numero_Order && invoice.document_numero_Order.trim() !== '') {
            const includeOrder = await new Promise((resolve) => {
                const overlay = document.createElement('div');
                overlay.className = 'custom-modal-overlay';
                
                overlay.innerHTML = `
                    <div class="custom-modal">
                        <div class="custom-modal-header">
                            <span class="custom-modal-icon info">📋</span>
                            <h3 class="custom-modal-title">Télécharger PDF</h3>
                        </div>
                        <div class="custom-modal-body">
                            <p style="margin-bottom:1.25rem;color:#e0e0e0;font-size:0.95rem;">N° Order actuel: <strong style="color:#2196F3;font-size:1.05rem;">${invoice.document_numero_Order}</strong></p>
                            <label style="display:flex;align-items:center;cursor:pointer;padding:1rem;background:#1e1e1e;border:2px solid #2196F3;border-radius:10px;transition:all 0.2s ease;">
                                <input type="checkbox" id="includeOrderCheckbox" checked style="width:20px;height:20px;margin-right:1rem;cursor:pointer;accent-color:#2196F3;">
                                <span style="font-size:0.95rem;color:#e0e0e0;font-weight:500;">
                                    Inclure le N° Order dans le PDF
                                </span>
                            </label>
                        </div>
                        <div class="custom-modal-footer">
                            <button class="custom-modal-btn primary" id="continueBtn" style="padding:0.75rem 2rem;font-size:1rem;">Télécharger</button>
                        </div>
                    </div>
                `;
                
                document.body.appendChild(overlay);
                
                const checkbox = overlay.querySelector('#includeOrderCheckbox');
                const continueBtn = overlay.querySelector('#continueBtn');
                
                continueBtn.addEventListener('click', () => {
                    const include = checkbox.checked;
                    overlay.remove();
                    resolve(include);
                });
                
                overlay.addEventListener('click', (e) => {
                    if (e.target === overlay) {
                        const include = checkbox.checked;
                        overlay.remove();
                        resolve(include);
                    }
                });
                
                setTimeout(() => continueBtn.focus(), 100);
            });
            
            // Temporarily remove Order number if user doesn't want it in PDF
            if (!includeOrder) {
                console.log('⚠️ User chose not to include Order number in PDF');
                invoice.document_numero_Order = null;
            } else {
                console.log('✅ Including Order number in PDF:', invoice.document_numero_Order);
            }
        }
        
        console.log('📄 Continuing with PDF generation...');
        
        // Check if jsPDF is loaded
        if (typeof window.jspdf === 'undefined') {
            await loadJsPDF();
        }
        
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        // Colors - New design
        const darkGrayColor = [96, 125, 139]; // #607D8B
        const lightGrayBg = [236, 239, 241]; // #ECEFF1
        
        const dateStr = new Date(invoice.document_date).toLocaleDateString('fr-FR');
        
        // Function to add header to any page
        const addHeader = (isFirstPage = true) => {
            // Company Name - Left aligned, large
            doc.setFontSize(18);
            doc.setTextColor(96, 125, 139);
            doc.setFont(undefined, 'bold');
            doc.text('MULTI TRAVAUX TETOUAN', 15, 18);
            
            // Document Type - Right aligned, underlined
            doc.setFontSize(18);
            doc.setFont(undefined, 'bold');
            const docType = invoice.document_type === 'devis' ? 'DEVIS' : 'FACTURE';
            doc.text(docType, 195, 18, { align: 'right' });
            doc.setLineWidth(0.5);
            doc.line(195 - doc.getTextWidth(docType), 19, 195, 19);
            
            // Document Number and Date - Right side, smaller
            doc.setFontSize(9);
            doc.setFont(undefined, 'normal');
            doc.setTextColor(0, 0, 0);
            if (invoice.document_type === 'devis') {
                doc.text(`Numéro de devis : ${invoice.document_numero_devis || '-'}`, 195, 26, { align: 'right' });
                doc.text(`Date de devis : ${dateStr}`, 195, 31, { align: 'right' });
            } else {
                doc.text(`Numéro de facture : ${invoice.document_numero || '-'}`, 195, 26, { align: 'right' });
                
                // Add Order number on new line below invoice number if exists
                if (invoice.document_numero_Order && invoice.document_numero_Order.trim() !== '') {
                    doc.text(`N° Order : ${invoice.document_numero_Order}`, 195, 31, { align: 'right' });
                    doc.text(`Date de facture : ${dateStr}`, 195, 36, { align: 'right' });
                } else {
                    doc.text(`Date de facture : ${dateStr}`, 195, 31, { align: 'right' });
                }
            }
            
            // Email and Address - Left side with gray background (ONE BOX)
            doc.setFillColor(...darkGrayColor);
            doc.rect(15, 38, 80, 6, 'F');
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(8);
            doc.text('Email: multitravauxtetouan@gmail.com', 17, 42);
            
            doc.setFillColor(...lightGrayBg);
            doc.rect(15, 44, 80, 6, 'F');
            doc.setTextColor(0, 0, 0);
            doc.setFontSize(7);
            doc.text('AV 10 MAI IMM 04 APPART 01 A DROIT - TETOUAN , TETOUAN', 17, 48);
            
            // Client Info - Right side with gray background (ONE BOX)
            doc.setFillColor(...darkGrayColor);
            doc.rect(115, 38, 80, 6, 'F');
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(8);
            const devisLabel = invoice.document_type === 'devis' ? 'DEVIS à :' : 'FACTURE à :';
            doc.text(`${devisLabel} ${invoice.client_nom}`, 117, 42);
            
            doc.setFillColor(...lightGrayBg);
            doc.rect(115, 44, 80, 6, 'F');
            doc.setTextColor(0, 0, 0);
            doc.setFontSize(7);
            doc.text(`ICE : ${invoice.client_ice}`, 117, 48);
        };
        
        // Function to add footer to any page
        const addFooter = (pageNum, totalPages) => {
            doc.setTextColor(0, 0, 0);
            doc.setFontSize(9);
            doc.setFont(undefined, 'normal');
            doc.text('NIF 68717422 | TP 51001343 | RC 38633 | CNSS 6446237', 105, 280, { align: 'center' });
            doc.text('ICE : 00380950500031', 105, 286, { align: 'center' });
        };
        
        // Add header to first page
        addHeader(true);
        
        // Products Table
        const startY = 60;
        
        // Table Header - Gray background
        doc.setFillColor(...darkGrayColor);
        doc.rect(15, startY, 180, 7, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(9);
        doc.setFont(undefined, 'bold');
        doc.text('Description', 18, startY + 5);
        doc.text('Quantité', 115, startY + 5, { align: 'center' });
        doc.text('Prix unitaire HT', 150, startY + 5, { align: 'right' });
        doc.text('Prix total HT', 188, startY + 5, { align: 'right' });
        
        // Table Body
        let currentY = startY + 10;
        doc.setTextColor(0, 0, 0);
        doc.setFont(undefined, 'normal');
        doc.setFontSize(9);
        
        let pageCount = 1;
        const pages = [];
        
        invoice.products.forEach((product, index) => {
            // Wrap long text - limit width to 75 for description column only
            const designation = product.designation || '';
            const lines = doc.splitTextToSize(designation, 75);
            
            // Calculate row height based on text lines - more space per line
            const rowHeight = Math.max(8, lines.length * 5.5);
            
            // Check if we need a new page BEFORE drawing
            if (currentY + rowHeight > 220) {
                pages.push(pageCount);
                doc.addPage();
                addHeader(false);
                pageCount++;
                
                // Re-draw table header on new page
                let newStartY = 60;
                
                doc.setFillColor(...darkGrayColor);
                doc.rect(15, newStartY, 180, 7, 'F');
                doc.setTextColor(255, 255, 255);
                doc.setFontSize(9);
                doc.setFont(undefined, 'bold');
                doc.text('Description', 18, newStartY + 5);
                doc.text('Quantité', 115, newStartY + 5, { align: 'center' });
                doc.text('Prix unitaire HT', 150, newStartY + 5, { align: 'right' });
                doc.text('Prix total HT', 188, newStartY + 5, { align: 'right' });
                
                currentY = newStartY + 10;
                doc.setTextColor(0, 0, 0);
                doc.setFont(undefined, 'normal');
                doc.setFontSize(9);
            }
            
            // Alternate row colors
            if (index % 2 === 0) {
                doc.setFillColor(245, 245, 245);
                doc.rect(15, currentY - 3, 180, rowHeight, 'F');
            }
            
            doc.setFontSize(7.5);
            // Draw each line separately with proper spacing - show full text
            lines.forEach((line, lineIndex) => {
                doc.text(line, 18, currentY + 3 + (lineIndex * 4.5));
            });
            
            // Center vertically for multi-line products
            const centerOffset = (lines.length > 1) ? ((lines.length - 1) * 2.25) : 0;
            
            doc.setFontSize(8);
            doc.text(String(product.quantite || ''), 115, currentY + 3 + centerOffset, { align: 'center' });
            
            // Use smaller font for large numbers
            doc.setFontSize(7.5);
            doc.text(`${formatNumberForPDF(product.prix_unitaire_ht)} DH`, 150, currentY + 3 + centerOffset, { align: 'right' });
            doc.text(`${formatNumberForPDF(product.total_ht)} DH`, 188, currentY + 3 + centerOffset, { align: 'right' });
            
            currentY += rowHeight;
        });
        
        // Fixed position for Remarques and Totals (always at same Y position)
        const fixedBottomY = 235;
        
        // Remarques section - Left side
        doc.setFillColor(...darkGrayColor);
        doc.rect(15, fixedBottomY, 85, 6, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(8);
        doc.setFont(undefined, 'bold');
        doc.text('Remarques et instructions de paiement :', 17, fixedBottomY + 4);
        
        doc.setFillColor(255, 255, 255);
        doc.rect(15, fixedBottomY + 6, 85, 12, 'F');
        doc.setDrawColor(200, 200, 200);
        doc.setLineWidth(0.1);
        doc.rect(15, fixedBottomY + 6, 85, 12);
        doc.setTextColor(0, 0, 0);
        doc.setFont(undefined, 'normal');
        doc.setFontSize(8);
        doc.text('ATTIJARI WAFA BANQ', 17, fixedBottomY + 10);
        doc.text('RIB : 007 720 0005979000000953 03', 17, fixedBottomY + 15);
        
        // Totals - Right side with gray background (same Y position)
        doc.setFillColor(...darkGrayColor);
        doc.rect(110, fixedBottomY, 85, 6, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(9);
        doc.setFont(undefined, 'bold');
        doc.text('TOTALE HT', 113, fixedBottomY + 4);
        doc.text(`${formatNumberForPDF(invoice.total_ht)} DH`, 192, fixedBottomY + 4, { align: 'right' });
        
        doc.setFillColor(255, 255, 255);
        doc.rect(110, fixedBottomY + 6, 85, 6, 'F');
        doc.setDrawColor(200, 200, 200);
        doc.rect(110, fixedBottomY + 6, 85, 6);
        doc.setTextColor(0, 0, 0);
        doc.text(`TVA ${invoice.tva_rate}%`, 113, fixedBottomY + 10);
        doc.text(`${formatNumberForPDF(invoice.montant_tva)} DH`, 192, fixedBottomY + 10, { align: 'right' });
        
        doc.setFillColor(...darkGrayColor);
        doc.rect(110, fixedBottomY + 12, 85, 6, 'F');
        doc.setTextColor(255, 255, 255);
        doc.text('TOTALE TTC', 113, fixedBottomY + 16);
        doc.text(`${formatNumberForPDF(invoice.total_ttc)} DH`, 192, fixedBottomY + 16, { align: 'right' });
        
        // Amount in words - below both sections
        const amountWordsY = fixedBottomY + 25;
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(8);
        doc.setFont(undefined, 'normal');
        const amountInWords = numberToFrenchWords(invoice.total_ttc);
        const docTypeText = invoice.document_type === 'devis' ? 'devis' : 'facture';
        doc.text(`La Présente ${docTypeText} est Arréte à la somme de : ${amountInWords}`, 15, amountWordsY, { maxWidth: 180 });
        
        // Add page numbering to all pages
        pages.push(pageCount);
        const totalPages = pages.length;
        
        for (let i = 0; i < totalPages; i++) {
            doc.setPage(i + 1);
            addFooter(i + 1, totalPages);
        }
        
        // Save PDF
        const docNumero = invoice.document_numero || invoice.document_numero_devis || 'N';
        const filename = `${invoice.document_type === 'devis' ? 'Devis' : 'Facture'}_${docNumero}_${invoice.client_nom}.pdf`;
        doc.save(filename);
        
        window.notify.success('Succès', 'PDF téléchargé avec succès', 3000);
        
    } catch (error) {
        console.error('❌ Error generating PDF:', error);
        window.notify.error('Erreur', 'Impossible de générer le PDF: ' + error.message, 4000);
    }
}
