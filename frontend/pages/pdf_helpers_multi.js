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
    if (number === null || number === undefined) return 'zéro dirham';
    number = parseFloat(number);
    if (isNaN(number)) return 'zéro dirham';

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

// Load Multi signature image for PDF (helper version) - direct load without compression
async function loadMultiSignatureHelper() {
    try {
        const response = await fetch('Signature/Multi.png');
        if (!response.ok) throw new Error('Failed to fetch');
        const blob = await response.blob();
        return await new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = () => resolve(null);
            reader.readAsDataURL(blob);
        });
    } catch (e) {
        console.warn('Could not load Multi signature image:', e);
        return null;
    }
}

// Function to generate a flattened footer (text + signature in one image)
async function generateFlattenedFooterMulti(signatureDataUrl, nif, ice, tel) {
    return new Promise((resolve) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // High resolution for 300 DPI (approx 210mm x 50mm)
        canvas.width = 2480;
        canvas.height = 600;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw Text
        ctx.fillStyle = 'black';
        ctx.textAlign = 'center';
        const centerX = canvas.width / 2;

        // NIF Line
        ctx.font = 'normal 42px Arial';
        ctx.fillText(nif, centerX, 440);

        // ICE Line
        ctx.fillText(ice, centerX, 490);

        // Tel Line
        ctx.fillText(tel, centerX, 540);

        // Draw Signature if it's a Devis (passed as signatureDataUrl)
        if (signatureDataUrl) {
            const img = new Image();
            img.onload = () => {
                // Signature position (right side)
                const sigWidth = 700;
                const sigHeight = (img.height / img.width) * sigWidth;
                ctx.drawImage(img, 1700, 80, sigWidth, sigHeight);
                resolve(canvas.toDataURL('image/png'));
            };
            img.onerror = () => resolve(canvas.toDataURL('image/png'));
            img.src = signatureDataUrl;
        } else {
            resolve(canvas.toDataURL('image/png'));
        }
    });
}


// Download invoice as PDF - MULTI TRAVAUX TETOUAN Design
window.downloadInvoicePDFMulti = async function (invoiceId) {
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
        // Show dialog with checkbox for FACTURE type (only if Order exists)
        if (invoice.document_type === 'facture' && invoice.document_numero_Order && invoice.document_numero_Order.trim() !== '') {
            const includeOrderResult = await new Promise((resolve) => {
                const overlay = document.createElement('div');
                overlay.className = 'custom-modal-overlay';

                overlay.innerHTML = `
                    <div class="custom-modal">
                        <div class="custom-modal-header">
                            <span class="custom-modal-icon info">🎨</span>
                            <h3 class="custom-modal-title">Paramètres du PDF</h3>
                        </div>
                        <div class="custom-modal-body">
                            <!-- Order Number Toggle -->
                             <p style="margin-bottom:1.25rem;color:#e0e0e0;font-size:0.95rem;">N° Order actuel: <strong style="color:#2196F3;font-size:1.05rem;">${invoice.document_numero_Order}</strong></p>
                            <label style="display:flex;align-items:center;cursor:pointer;padding:1rem;background:#1e1e1e;border:2px solid #2196F3;border-radius:10px;transition:all 0.2s ease; margin-bottom: 1.5rem;">
                                <input type="checkbox" id="includeOrderCheckbox" checked style="width:20px;height:20px;margin-right:1rem;cursor:pointer;accent-color:#2196F3;">
                                <span style="font-size:0.95rem;color:#e0e0e0;font-weight:500;">
                                    Inclure le N° Order dans le PDF
                                </span>
                            </label>

                            <!-- Font Size Selection -->
                            <div style="margin-bottom: 0.5rem;">
                                <label style="display: block; margin-bottom: 0.8rem; color: #e0e0e0; font-weight: 600;">
                                    Taille de police des Notes :
                                </label>
                                <div style="display: flex; gap: 0.5rem; background: #1e1e1e; padding: 0.5rem; border-radius: 8px; border: 1px solid #3e3e42;">
                                    <label style="flex: 1; display: flex; flex-direction: column; align-items: center; cursor: pointer; padding: 0.5rem; border-radius: 6px; transition: all 0.2s;">
                                        <input type="radio" name="multiNotesFontSize" value="small" style="margin-bottom: 0.4rem; cursor: pointer;">
                                        <span style="font-size: 0.75rem; color: #999;">Petit</span>
                                    </label>
                                    <label style="flex: 1; display: flex; flex-direction: column; align-items: center; cursor: pointer; padding: 0.5rem; border-radius: 6px; transition: all 0.2s; background: #2d2d30;">
                                        <input type="radio" name="multiNotesFontSize" value="medium" checked style="margin-bottom: 0.4rem; cursor: pointer;">
                                        <span style="font-size: 0.85rem; color: #fff;">Moyen</span>
                                    </label>
                                    <label style="flex: 1; display: flex; flex-direction: column; align-items: center; cursor: pointer; padding: 0.5rem; border-radius: 6px; transition: all 0.2s;">
                                        <input type="radio" name="multiNotesFontSize" value="large" style="margin-bottom: 0.4rem; cursor: pointer;">
                                        <span style="font-size: 0.95rem; color: #999;">Grand</span>
                                    </label>
                                    <label style="flex: 1; display: flex; flex-direction: column; align-items: center; cursor: pointer; padding: 0.5rem; border-radius: 6px; transition: all 0.2s;">
                                        <input type="radio" name="multiNotesFontSize" value="xlarge" style="margin-bottom: 0.4rem; cursor: pointer;">
                                        <span style="font-size: 1.05rem; color: #999;">Très G.</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="custom-modal-footer">
                            <button class="custom-modal-btn primary" id="continueBtn" style="padding:0.75rem 2rem;font-size:1rem;">Télécharger</button>
                        </div>
                    </div>
                `;

                document.body.appendChild(overlay);

                const checkbox = overlay.querySelector('#includeOrderCheckbox');
                const continueBtn = overlay.querySelector('#continueBtn');

                const radioLabels = overlay.querySelectorAll('input[name="multiNotesFontSize"]');
                radioLabels.forEach(radio => {
                    radio.addEventListener('change', (e) => {
                        radioLabels.forEach(r => {
                            const label = r.parentElement;
                            label.style.background = 'transparent';
                            label.querySelector('span').style.color = '#999';
                        });
                        if (e.target.checked) {
                            const label = e.target.parentElement;
                            label.style.background = '#2d2d30';
                            label.querySelector('span').style.color = '#fff';
                        }
                    });
                });

                continueBtn.addEventListener('click', () => {
                    const include = checkbox.checked;
                    const selectedSize = overlay.querySelector('input[name="multiNotesFontSize"]:checked').value;
                    overlay.remove();
                    resolve({ includeOrder: include, notesFontSize: selectedSize });
                });

                overlay.addEventListener('click', (e) => {
                    if (e.target === overlay) {
                        const include = checkbox.checked;
                        const selectedSize = overlay.querySelector('input[name="multiNotesFontSize"]:checked').value;
                        overlay.remove();
                        resolve({ includeOrder: include, notesFontSize: selectedSize });
                    }
                });

                setTimeout(() => continueBtn.focus(), 100);
            });

            // Temporarily remove Order number if user doesn't want it in PDF
            if (!includeOrderResult.includeOrder) {
                console.log('⚠️ User chose not to include Order number in PDF');
                invoice.document_numero_Order = null;
            } else {
                console.log('✅ Including Order number in PDF:', invoice.document_numero_Order);
            }
            // Store font size for later use
            var selectedNotesFontSize = includeOrderResult.notesFontSize;
        }

        // Dedicated Prompt for Signature (Yes/No) - ONLY FOR DEVIS
        let includeSignature = false;
        if (invoice.document_type === 'devis') {
            includeSignature = await new Promise((resolve) => {
                const overlay = document.createElement('div');
                overlay.className = 'custom-modal-overlay';

                overlay.innerHTML = `
                    <div class="custom-modal">
                        <div class="custom-modal-header">
                            <span class="custom-modal-icon info">✍️</span>
                            <h3 class="custom-modal-title">Signature du PDF</h3>
                        </div>
                        <div class="custom-modal-body">
                            <p style="margin-bottom:1.5rem;color:#e0e0e0;font-size:1.1rem;text-align:center;">
                                Voulez-vous inclure la <strong>signature</strong> dans le document PDF ?
                            </p>
                            <!-- Font Size Selection -->
                            <div style="margin-bottom: 0.5rem; text-align: left;">
                                <label style="display: block; margin-bottom: 0.8rem; color: #e0e0e0; font-weight: 600;">
                                    Taille de police des Notes :
                                </label>
                                <div style="display: flex; gap: 0.5rem; background: #1e1e1e; padding: 0.5rem; border-radius: 8px; border: 1px solid #3e3e42;">
                                    <label style="flex: 1; display: flex; flex-direction: column; align-items: center; cursor: pointer; padding: 0.5rem; border-radius: 6px; transition: all 0.2s;">
                                        <input type="radio" name="multiNotesFontSizeDevis" value="small" style="margin-bottom: 0.4rem; cursor: pointer;">
                                        <span style="font-size: 0.75rem; color: #999;">Petit</span>
                                    </label>
                                    <label style="flex: 1; display: flex; flex-direction: column; align-items: center; cursor: pointer; padding: 0.5rem; border-radius: 6px; transition: all 0.2s; background: #2d2d30;">
                                        <input type="radio" name="multiNotesFontSizeDevis" value="medium" checked style="margin-bottom: 0.4rem; cursor: pointer;">
                                        <span style="font-size: 0.85rem; color: #fff;">Moyen</span>
                                    </label>
                                    <label style="flex: 1; display: flex; flex-direction: column; align-items: center; cursor: pointer; padding: 0.5rem; border-radius: 6px; transition: all 0.2s;">
                                        <input type="radio" name="multiNotesFontSizeDevis" value="large" style="margin-bottom: 0.4rem; cursor: pointer;">
                                        <span style="font-size: 0.95rem; color: #999;">Grand</span>
                                    </label>
                                    <label style="flex: 1; display: flex; flex-direction: column; align-items: center; cursor: pointer; padding: 0.5rem; border-radius: 6px; transition: all 0.2s;">
                                        <input type="radio" name="multiNotesFontSizeDevis" value="xlarge" style="margin-bottom: 0.4rem; cursor: pointer;">
                                        <span style="font-size: 1.05rem; color: #999;">Très G.</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="custom-modal-footer" style="display:flex;justify-content:center;gap:1.5rem;">
                            <button class="custom-modal-btn secondary" id="noSignatureBtn" style="padding:0.75rem 2rem;font-size:1.1rem;min-width:120px;">Non</button>
                            <button class="custom-modal-btn primary" id="yesSignatureBtn" style="padding:0.75rem 2rem;font-size:1.1rem;min-width:120px;">Oui</button>
                        </div>
                    </div>
                `;

                document.body.appendChild(overlay);

                const yesBtn = overlay.querySelector('#yesSignatureBtn');
                const noBtn = overlay.querySelector('#noSignatureBtn');

                const radioLabels = overlay.querySelectorAll('input[name="multiNotesFontSizeDevis"]');
                radioLabels.forEach(radio => {
                    radio.addEventListener('change', (e) => {
                        radioLabels.forEach(r => {
                            const label = r.parentElement;
                            label.style.background = 'transparent';
                            label.querySelector('span').style.color = '#999';
                        });
                        if (e.target.checked) {
                            const label = e.target.parentElement;
                            label.style.background = '#2d2d30';
                            label.querySelector('span').style.color = '#fff';
                        }
                    });
                });

                yesBtn.addEventListener('click', () => {
                    const selectedSize = overlay.querySelector('input[name="multiNotesFontSizeDevis"]:checked').value;
                    overlay.remove();
                    resolve({ include: true, notesFontSize: selectedSize });
                });

                noBtn.addEventListener('click', () => {
                    const selectedSize = overlay.querySelector('input[name="multiNotesFontSizeDevis"]:checked').value;
                    overlay.remove();
                    resolve({ include: false, notesFontSize: selectedSize });
                });

                overlay.addEventListener('click', (e) => {
                    if (e.target === overlay) {
                        const selectedSize = overlay.querySelector('input[name="multiNotesFontSizeDevis"]:checked').value;
                        overlay.remove();
                        resolve({ include: true, notesFontSize: selectedSize });
                    }
                });

                setTimeout(() => yesBtn.focus(), 100);
            });
            console.log('📄 User choice for signature (Multi Devis):', includeSignature.include ? 'Yes' : 'No');
            // Store font size from Devis modal
            var selectedNotesFontSize = includeSignature.notesFontSize;
            // Update includeSignature to boolean
            includeSignature = includeSignature.include;
        } else if (!selectedNotesFontSize) {
            // If normal invoice WITHOUT order number (no first modal shown), show simple font size modal
            if (invoice.document_type === 'facture' && (!invoice.document_numero_Order || invoice.document_numero_Order.trim() === '')) {
                const fontSizeResult = await new Promise((resolve) => {
                    const overlay = document.createElement('div');
                    overlay.className = 'custom-modal-overlay';
                    overlay.innerHTML = `
                        <div class="custom-modal" style="max-width: 400px;">
                            <div class="custom-modal-header">
                                <span class="custom-modal-icon info">🎨</span>
                                <h3 class="custom-modal-title">Paramètres</h3>
                            </div>
                            <div class="custom-modal-body">
                                <div style="margin-bottom: 0.5rem;">
                                    <label style="display: block; margin-bottom: 0.8rem; color: #e0e0e0; font-weight: 600;">
                                        Taille de police des Notes :
                                    </label>
                                    <div style="display: flex; gap: 0.5rem; background: #1e1e1e; padding: 0.5rem; border-radius: 8px; border: 1px solid #3e3e42;">
                                        <label style="flex: 1; display: flex; flex-direction: column; align-items: center; cursor: pointer; padding: 0.5rem; border-radius: 6px; transition: all 0.2s;">
                                            <input type="radio" name="multiNotesFontSizeSimple" value="small" style="margin-bottom: 0.4rem; cursor: pointer;">
                                            <span style="font-size: 0.75rem; color: #999;">Petit</span>
                                        </label>
                                        <label style="flex: 1; display: flex; flex-direction: column; align-items: center; cursor: pointer; padding: 0.5rem; border-radius: 6px; transition: all 0.2s; background: #2d2d30;">
                                            <input type="radio" name="multiNotesFontSizeSimple" value="medium" checked style="margin-bottom: 0.4rem; cursor: pointer;">
                                            <span style="font-size: 0.85rem; color: #fff;">Moyen</span>
                                        </label>
                                        <label style="flex: 1; display: flex; flex-direction: column; align-items: center; cursor: pointer; padding: 0.5rem; border-radius: 6px; transition: all 0.2s;">
                                            <input type="radio" name="multiNotesFontSizeSimple" value="large" style="margin-bottom: 0.4rem; cursor: pointer;">
                                            <span style="font-size: 0.95rem; color: #999;">Grand</span>
                                        </label>
                                        <label style="flex: 1; display: flex; flex-direction: column; align-items: center; cursor: pointer; padding: 0.5rem; border-radius: 6px; transition: all 0.2s;">
                                            <input type="radio" name="multiNotesFontSizeSimple" value="xlarge" style="margin-bottom: 0.4rem; cursor: pointer;">
                                            <span style="font-size: 1.05rem; color: #999;">Très G.</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="custom-modal-footer">
                                <button class="custom-modal-btn primary" id="simpleContinueBtn">Continuer</button>
                            </div>
                        </div>
                    `;
                    document.body.appendChild(overlay);

                    const continueBtn = overlay.querySelector('#simpleContinueBtn');
                    const radioLabels = overlay.querySelectorAll('input[name="multiNotesFontSizeSimple"]');

                    radioLabels.forEach(radio => {
                        radio.addEventListener('change', (e) => {
                            radioLabels.forEach(r => {
                                const label = r.parentElement;
                                label.style.background = 'transparent';
                                label.querySelector('span').style.color = '#999';
                            });
                            if (e.target.checked) {
                                const label = e.target.parentElement;
                                label.style.background = '#2d2d30';
                                label.querySelector('span').style.color = '#fff';
                            }
                        });
                    });

                    continueBtn.addEventListener('click', () => {
                        const selectedSize = overlay.querySelector('input[name="multiNotesFontSizeSimple"]:checked').value;
                        overlay.remove();
                        resolve(selectedSize);
                    });
                    setTimeout(() => continueBtn.focus(), 100);
                });
                var selectedNotesFontSize = fontSizeResult;
            } else {
                console.log('📄 Document type is not devis, skipping signature prompt for Multi.');
            }
        }

        console.log('📄 Continuing with PDF generation...');

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
                                Voulez-vous les afficher dans le PDF ?
                            </p>
                        </div>
                        <div class="custom-modal-footer">
                            <button id="excludeZeroBtn" class="custom-modal-btn secondary">
                                ❌ Non, masquer
                            </button>
                            <button id="includeZeroBtn" class="custom-modal-btn primary">
                                ✅ Oui, afficher
                            </button>
                        </div>
                    </div>
                `;

                document.body.appendChild(overlay);

                const excludeBtn = document.getElementById('excludeZeroBtn');
                const includeBtn = document.getElementById('includeZeroBtn');

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

        // Mark products with zero values for special display (don't remove them)
        const showZeroValues = includeZeroProducts;
        console.log('📊 Show zero values in PDF:', showZeroValues);

        // Check if jsPDF is loaded
        if (typeof window.jspdf === 'undefined') {
            await loadJsPDF();
        }

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        // Load signature image
        const signatureImgMultiHelper = await loadMultiSignatureHelper();

        // Generate flattened footer image (Text + Signature)
        // Use the user's choice (includeSignature) AND verify it's a devis (though prompt only appears for devis)
        const shouldAddSignature = invoice.document_type === 'devis' && includeSignature;

        const flattenedFooterData = await generateFlattenedFooterMulti(
            shouldAddSignature ? signatureImgMultiHelper : null,
            'NIF 68717422 | TP 51001343 | RC 38633 | CNSS 6446237',
            'ICE : 00380950500031',
            'Tel: +212 661 307 323'
        );

        // Colors - New design
        const darkGrayColor = [96, 125, 139]; // #607D8B
        const lightGrayBg = [236, 239, 241]; // #ECEFF1

        const dateStr = (window.safeParseDate||function(d){return new Date(d)})(invoice.document_date).toLocaleDateString('fr-FR');

        // Function to add header to any page
        const addHeader = (isFirstPage = true) => {
            // Add company logo - Left side (synchronous approach)
            try {
                const logoImg = document.querySelector('img[src*="multi.png"]') ||
                    document.querySelector('img[alt="Multi Company"]');
                if (logoImg && logoImg.src && logoImg.complete) {
                    // Image is already loaded
                    const canvas = document.createElement('canvas');
                    canvas.width = logoImg.naturalWidth || 200;
                    canvas.height = logoImg.naturalHeight || 200;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(logoImg, 0, 0);
                    const imgData = canvas.toDataURL('image/png');
                    doc.addImage(imgData, 'PNG', 15, 8, 20, 20);
                }
            } catch (error) {
                console.log('Logo not available:', error.message);
            }

            // Company Name - Left aligned, large (moved right to make space for logo)
            doc.setFontSize(18);
            doc.setTextColor(96, 125, 139);
            doc.setFont(undefined, 'bold');
            doc.text('MULTI TRAVAUX TETOUAN', 40, 22);

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
            doc.text('Email: errbahiabderrahim@gmail.com', 17, 42);

            doc.setFillColor(...lightGrayBg);
            doc.rect(15, 44, 80, 6, 'F');
            doc.setTextColor(0, 0, 0);
            doc.setFontSize(7);
            doc.text('AV 10 MAI IMM 04 APPART 01 A DROIT - TETOUAN , TETOUAN', 17, 48);

            // Client Info - Right side with gray background (ONE BOX - dynamic height for wrapping)
            doc.setFontSize(8);
            const devisLabel = invoice.document_type === 'devis' ? 'DEVIS à :' : 'FACTURE à :';
            const fullClientText = `${devisLabel} ${invoice.client_nom}`;

            // Wrap text (max width ~76mm to fit in 80mm box with padding)
            const clientLines = doc.splitTextToSize(fullClientText, 76);

            // Calculate box height dynamically (base 6mm + 4mm for each extra line)
            // 4mm is roughly appropriate for 8pt font with default line spacing
            const extraLineHeight = 4;
            const clientBoxHeight = 6 + (clientLines.length - 1) * extraLineHeight;

            doc.setFillColor(...darkGrayColor);
            doc.rect(115, 38, 80, clientBoxHeight, 'F');
            doc.setTextColor(255, 255, 255);
            doc.text(clientLines, 117, 42);

            // ICE Box - Position depends on client box height
            const iceStartY = 38 + clientBoxHeight;

            // Only show ICE if it exists and is not "0"
            if (invoice.client_ice && invoice.client_ice !== '0') {
                doc.setFillColor(...lightGrayBg);
                doc.rect(115, iceStartY, 80, 6, 'F');
                doc.setTextColor(0, 0, 0);
                doc.setFontSize(7);
                doc.text(`ICE : ${invoice.client_ice}`, 117, iceStartY + 4);
            }
        };

        // Function to add footer to any page
        const addFooter = (pageNum, totalPages) => {
            // Add Flattened Footer (Contains Signature + Company Info as one image)
            if (flattenedFooterData) {
                doc.addImage(flattenedFooterData, 'PNG', 0, 245, 210, 50);
            }

            // Page numbering
            doc.setTextColor(100, 100, 100);
            doc.setFontSize(7.5);
            doc.text(`Page ${pageNum} / ${totalPages}`, 105, 293, { align: 'center' });
        };

        // Add header to first page
        addHeader(true);

        // Products Table
        const startY = 65;

        // Table Layout - Percentage Based (Total Width = 180)
        // Description: 55% (~99 width)
        // Quantity: 15% (~27 width)
        // Unit Price: 15% (~27 width)
        // Total: 15% (~27 width)

        const TABLE_X = 15;
        const TABLE_WIDTH = 180;

        const COL_1_WIDTH = TABLE_WIDTH * 0.55;
        const COL_2_WIDTH = TABLE_WIDTH * 0.15;
        const COL_3_WIDTH = TABLE_WIDTH * 0.15;
        const COL_4_WIDTH = TABLE_WIDTH * 0.15;

        // X Positions (Start of each column)
        const POS_DESC = TABLE_X + 2; // Padding left
        const POS_QTY = TABLE_X + COL_1_WIDTH + COL_2_WIDTH / 2; // Center aligned
        const POS_PU = TABLE_X + COL_1_WIDTH + COL_2_WIDTH + 2; // Left aligned with padding
        const POS_TOTAL = TABLE_X + COL_1_WIDTH + COL_2_WIDTH + COL_3_WIDTH + 2; // Left aligned with padding

        const DESC_MAX_WIDTH = COL_1_WIDTH - 4; // Padding

        // Table Header - Gray background
        doc.setFillColor(...darkGrayColor);
        doc.rect(TABLE_X, startY, TABLE_WIDTH, 7, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(9);
        doc.setFont(undefined, 'bold');

        // Headers
        doc.text('Description', POS_DESC, startY + 5);
        doc.text('Quantité', POS_QTY, startY + 5, { align: 'center' });
        doc.text('Prix unitaire HT', POS_PU, startY + 5);
        doc.text('Prix total HT', POS_TOTAL, startY + 5);

        // Table Body
        let currentY = startY + 7; // Start exactly where header ends
        doc.setTextColor(0, 0, 0);
        doc.setFont(undefined, 'normal');
        doc.setFontSize(7.5); // Set font size before splitTextToSize

        let pageCount = 1;
        const pages = [];

        invoice.products.forEach((product, index) => {
            // Description wrapping
            const designation = product.designation || '';
            const lines = doc.splitTextToSize(designation, DESC_MAX_WIDTH);

            // Calculate row height based on text lines
            const rowHeight = Math.max(8, (lines.length * 4.5) + 4);

            // Handle page breaks for long items
            let remainingLines = [...lines];
            let isFirstPart = true;

            while (remainingLines.length > 0) {
                const availableSpace = 220 - currentY;

                // New page if space is too tight
                if (availableSpace < 15) {
                    pages.push(pageCount);
                    doc.addPage();
                    addHeader(false); // Helper function adds logo, company info etc.
                    pageCount++;

                    let newStartY = 65;

                    // Draw Header on new page
                    doc.setFillColor(...darkGrayColor);
                    doc.rect(TABLE_X, newStartY, TABLE_WIDTH, 7, 'F');
                    doc.setTextColor(255, 255, 255);
                    doc.setFontSize(9);
                    doc.setFont(undefined, 'bold');
                    doc.text('Description', POS_DESC, newStartY + 5);
                    doc.text('Quantité', POS_QTY, newStartY + 5, { align: 'center' });
                    doc.text('Prix unitaire HT', POS_PU, newStartY + 5);
                    doc.text('Prix total HT', POS_TOTAL, newStartY + 5);

                    currentY = newStartY + 7;
                    doc.setTextColor(0, 0, 0);
                    doc.setFont(undefined, 'normal');
                    doc.setFontSize(9);

                    // IMPORTANT: continue loop with new page set up
                    continue;
                }

                const maxLinesPerPage = Math.floor((availableSpace - 10) / 4.5);
                const linesToDraw = remainingLines.splice(0, Math.max(1, maxLinesPerPage));
                const partialRowHeight = Math.max(8, (linesToDraw.length * 4.5) + 4);

                // Row border and Alternate row colors
                doc.setDrawColor(200, 200, 200);
                doc.setLineWidth(0.1);
                doc.rect(TABLE_X, currentY, TABLE_WIDTH, partialRowHeight);

                if (isFirstPart && index % 2 === 0) {
                    doc.setFillColor(245, 245, 245);
                    doc.rect(TABLE_X, currentY, TABLE_WIDTH, partialRowHeight, 'F');
                    doc.rect(TABLE_X, currentY, TABLE_WIDTH, partialRowHeight); // Redraw border over background
                }

                // Vertical Column Lines
                doc.line(TABLE_X + COL_1_WIDTH, currentY, TABLE_X + COL_1_WIDTH, currentY + partialRowHeight);
                doc.line(TABLE_X + COL_1_WIDTH + COL_2_WIDTH, currentY, TABLE_X + COL_1_WIDTH + COL_2_WIDTH, currentY + partialRowHeight);
                doc.line(TABLE_X + COL_1_WIDTH + COL_2_WIDTH + COL_3_WIDTH, currentY, TABLE_X + COL_1_WIDTH + COL_2_WIDTH + COL_3_WIDTH, currentY + partialRowHeight);

                // No need to set font size here again as it's set before the loop

                // Draw Description Lines
                linesToDraw.forEach((line, lineIndex) => {
                    doc.text(line, POS_DESC, currentY + 5 + (lineIndex * 4.5));
                });

                // Draw numeric values (Only on the first part of the row)
                if (isFirstPart) {
                    // Center vertically relative to the text lines
                    const centerOffset = (linesToDraw.length > 1) ? ((linesToDraw.length - 1) * 2.25) : 0;

                    // Quantité
                    doc.setFontSize(8);
                    const qty = parseFloat(product.quantite);
                    if (showZeroValues || qty !== 0) {
                        doc.text(String(product.quantite || ''), POS_QTY, currentY + 5 + centerOffset, { align: 'center' });
                    }

                    // Prices
                    doc.setFontSize(7.5);
                    const price = parseFloat(product.prix_unitaire_ht);
                    if (showZeroValues || price !== 0) {
                        doc.text(`${formatNumberForPDF(product.prix_unitaire_ht)} DH`, POS_PU, currentY + 5 + centerOffset);
                    }

                    const total = parseFloat(product.total_ht);
                    if (showZeroValues || total !== 0) {
                        doc.text(`${formatNumberForPDF(product.total_ht)} DH`, POS_TOTAL, currentY + 5 + centerOffset);
                    }
                }

                currentY += partialRowHeight;
                isFirstPart = false;
            }
        });

        // Fixed position for Remarques and Totals (always at same Y position)
        const fixedBottomY = 220; // Moved up to give more space for notes

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
        doc.setFontSize(8);
        doc.setFont(undefined, 'bold');
        doc.text('TOTAL HT', 113, fixedBottomY + 4);
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
        doc.text('TOTAL TTC', 113, fixedBottomY + 16);
        doc.text(`${formatNumberForPDF(invoice.total_ttc)} DH`, 192, fixedBottomY + 16, { align: 'right' });

        // Amount in words - below both sections
        const amountWordsY = fixedBottomY + 25;
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(8);
        doc.setFont(undefined, 'normal');
        const amountInWords = numberToFrenchWords(invoice.total_ttc);
        const docTypeText = invoice.document_type === 'devis' ? 'devis' : 'facture';
        doc.text(`La Présente ${docTypeText} est Arrêté à la somme de : ${amountInWords}`, 15, amountWordsY, { maxWidth: 130 });

        // Add notes if any
        const noteResult = await window.electron.dbMulti.getNote(invoiceId);
        if (noteResult.success && noteResult.data) {
            // Font size mapping
            const fontSizeMap = {
                'small': { size: 7, lineheight: 3.5 },
                'medium': { size: 9, lineheight: 4.5 },
                'large': { size: 12, lineheight: 5.5 },
                'xlarge': { size: 14, lineheight: 6.5 }
            };
            // Default to medium if undefined (fallback)
            const fontSizeKey = selectedNotesFontSize || 'medium';
            const selectedFont = fontSizeMap[fontSizeKey] || fontSizeMap['medium'];

            // Force new page for Notes
            pages.push(pageCount);
            doc.addPage();
            addHeader(false);
            pageCount++;

            const notesY = 60; // Start at top of new page
            const footerTopY = 270;

            // Title for notes block
            doc.setFontSize(10);
            doc.setFont(undefined, 'bold');
            doc.setTextColor(96, 125, 139); // Dark gray color matching the theme
            doc.text('Notes:', 15, notesY);

            // Prepare text rendering
            doc.setTextColor(0, 0, 0);
            doc.setFont(undefined, 'bold');
            doc.setFontSize(selectedFont.size);
            const noteLines = doc.splitTextToSize(noteResult.data, 180); // Use full width

            let lineY = notesY + 6;
            const lineStep = selectedFont.lineheight;

            // Render line by line and add pages if needed
            for (let i = 0; i < noteLines.length; i++) {
                // If next line would collide with footer, break to a new page
                if (lineY > footerTopY) {
                    // track current page and add a fresh one
                    pages.push(pageCount);
                    doc.addPage();
                    addHeader(false);
                    pageCount++;

                    // Start notes continuation at top area of new page
                    let contStartY = 60; // below header
                    doc.setFontSize(10);
                    doc.setFont(undefined, 'bold');
                    doc.setTextColor(96, 125, 139);
                    doc.text('Notes (suite) :', 15, contStartY);

                    doc.setTextColor(0, 0, 0);
                    doc.setFont(undefined, 'bold');
                    doc.setFontSize(selectedFont.size);
                    lineY = contStartY + 6;
                }

                doc.text(noteLines[i], 15, lineY);
                lineY += lineStep;
            }
        }

        // Add page numbering to all pages
        pages.push(pageCount);
        const totalPages = pages.length;

        for (let i = 0; i < totalPages; i++) {
            doc.setPage(i + 1);
            addFooter(i + 1, totalPages);
        }

        // Save PDF
        const docNumero = invoice.document_numero || invoice.document_numero_devis || 'N';
        const filename = `${invoice.document_type === 'devis' ? 'Devis' : 'Facture'}_${docNumero}_${invoice.client_nom}-MULTI.pdf`;
        doc.save(filename);

        window.notify.success('Succès', 'PDF téléchargé avec succès', 3000);

    } catch (error) {
        console.error('❌ Error generating PDF:', error);
        window.notify.error('Erreur', 'Impossible de générer le PDF: ' + error.message, 4000);
    }
}
