// Edit Invoice Page - MRY Company
function EditInvoiceMRYPage() {
    return `
        <div class="desktop-app">
            <div class="window-header">
                <div class="window-title">
                    <img src="assets/logos/mry.png" class="header-logo" alt="MRY Company" data-asset="assets/logos/mry.png">
                    <span>MRY TRAV SARL - Modifier une facture</span>
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

            <div class="window-content invoice-content">
                <form id="editInvoiceFormMRY" class="invoice-form">
                    <!-- Section 1: Client Information -->
                    <div class="invoice-section">
                        <div class="section-header">
                            <h2>📦 Informations du client</h2>
                        </div>
                        <div class="section-body">
                            <div class="form-row">
                                <div class="form-field" style="position: relative;">
                                    <label>Nom du client <span class="required">*</span></label>
                                    <input type="text" id="editClientNomMRY" placeholder="Rechercher ou saisir un client" 
                                           autocomplete="off" required oninput="searchClientsEditMRY(this.value)" 
                                           onfocus="showClientsListEditMRY()" onblur="hideClientsListEditMRY()">
                                    <div id="clientsDropdownEditMRY" class="clients-dropdown" style="display: none;"></div>
                                </div>
                                <div class="form-field">
                                    <label>N° ICE</label>
                                    <input type="text" id="editClientICEMRY" placeholder="Numéro ICE (optionnel)">
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Section 2: Document Details -->
                    <div class="invoice-section">
                        <div class="section-header">
                            <h2>📄 Détails du document</h2>
                        </div>
                        <div class="section-body">
                            <div class="form-row">
                                <div class="form-field">
                                    <label>Type de document <span class="required">*</span></label>
                                    <input type="text" id="editDocumentTypeMRY" readonly style="background: #2d2d30; cursor: not-allowed;">
                                </div>
                                <div class="form-field">
                                    <label>Date <span class="required">*</span></label>
                                    <input type="date" id="editDocumentDateMRY" required>
                                </div>
                            </div>

                            <div class="form-row">
                                <div class="form-field">
                                    <label id="editDocumentNumeroLabelMRY">N° Document <span class="required">*</span></label>
                                    <input type="text" id="editDocumentNumeroMRY" required placeholder="Saisir les chiffres (ex: 001)" onblur="formatEditInvoiceNumberMRY(this)">
                                </div>
                            </div>
                            
                            <div class="form-row" id="editFieldOrderMRY" style="display: none;">
                                <div class="form-field" style="max-width: 50%;">
                                    <label>📋 N° Order <span style="color: #999; font-size: 0.85rem; font-weight: normal;">(optionnel)</span></label>
                                    <input type="text" id="editDocumentNumeroOrderMRY" placeholder="Ex: 123" style="border: 1px solid #3e3e42;">
                                </div>
                                <div class="form-field" style="max-width: 50%; visibility: hidden;">
                                    <!-- Empty space for alignment -->
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Section 3: Products -->
                    <div class="invoice-section">
                        <div class="section-header">
                            <h2>📊 Produits et services</h2>
                            <button type="button" class="add-product-btn" onclick="addProductRowEditMRY()">
                                <span>+ Ajouter un produit</span>
                            </button>
                        </div>
                        <div class="section-body">
                            <div class="products-table-container">
                                <table class="products-table">
                                    <thead>
                                        <tr>
                                            <th>Désignation</th>
                                            <th>Quantité</th>
                                            <th>Prix unitaire HT</th>
                                            <th>Total HT</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody id="editProductsTableBodyMRY">
                                        <!-- Products will be loaded here -->
                                    </tbody>
                                </table>
                            </div>

                            <!-- Summary -->
                            <div class="invoice-summary">
                                <div class="summary-row">
                                    <span>Total HT:</span>
                                    <span id="editTotalHTMRY">0.00 DH</span>
                                </div>
                                <div class="summary-row">
                                    <span>TVA:</span>
                                    <div class="tva-input">
                                        <input type="number" id="editTvaRateMRY" value="20" min="0" max="100" onchange="calculateTotalsEditMRY()">
                                        <span>%</span>
                                    </div>
                                </div>
                                <div class="summary-row">
                                    <span>Montant TVA:</span>
                                    <span id="editMontantTVAMRY">0.00 DH</span>
                                </div>
                                <div class="summary-row total">
                                    <span>Total TTC:</span>
                                    <span id="editTotalTTCMRY">0.00 DH</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Section 4: Notes -->
                    <div class="invoice-section">
                        <div class="section-header">
                            <h2>📝 Notes</h2>
                        </div>
                        <div class="section-body">
                            <div class="form-field">
                                <label>Notes supplémentaires (optionnel)</label>
                                <textarea id="editInvoiceNotesMRY" rows="4" 
                                          placeholder="Ajoutez des notes ou remarques concernant cette facture..."
                                          style="width: 100%; padding: 0.75rem; background: #2d2d30; border: 2px solid #3e3e42; border-radius: 8px; color: #fff; font-size: 0.95rem; resize: vertical; font-family: inherit;"></textarea>
                                <small style="color: #999; font-size: 0.85rem; display: block; margin-top: 0.5rem;">
                                    Ces notes seront affichées dans le PDF sous le texte de clôture de la facture.
                                </small>
                            </div>
                        </div>
                    </div>

                    <!-- Form Actions -->
                    <div class="form-actions" style="display: flex; justify-content: space-between; align-items: center; gap: 1rem; padding-top: 1.5rem; border-top: 1px solid #3e3e42;">
                        <button type="button" class="btn-convert-bottom" onclick="showConvertDocumentTypeModalMRY()" style="background: #9c27b0; color: white; padding: 0.5rem 1rem; border: none; border-radius: 6px; cursor: pointer; font-weight: 500; font-size: 0.85rem; display: flex; align-items: center; gap: 0.3rem; transition: all 0.3s;" onmouseover="this.style.background='#7b1fa2'; this.style.transform='translateY(-2px)'" onmouseout="this.style.background='#9c27b0'; this.style.transform='translateY(0)'">
                            🔄 <span id="convertButtonTextMRY">Convertir</span>
                        </button>
                        <div style="display: flex; gap: 0.5rem; margin-left: auto;">
                            <button type="button" class="btn-secondary" onclick="router.navigate('/invoices-list-mry')" style="padding: 0.5rem 1rem; font-size: 0.85rem; display: flex; align-items: center; gap: 0.3rem;">
                                <span>← Annuler</span>
                            </button>
                            <button type="submit" class="btn-primary" style="padding: 0.5rem 1rem; font-size: 0.85rem; display: flex; align-items: center; gap: 0.3rem;">
                                <span>💾 Enregistrer</span>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    `;
}

// Global variables for edit
let currentInvoiceIdMRY = null;
let productRowCounterEditMRY = 0;
let allClientsEditMRY = [];
let filteredClientsEditMRY = [];
let currentDocumentTypeMRY = null;
let currentNumeroOrderMRY = null;

// Load invoice data
async function loadInvoiceDataMRY(invoiceId) {
    try {
        const result = await window.electron.db.getInvoiceById(invoiceId);
        
        if (!result.success || !result.data) {
            throw new Error('Facture introuvable');
        }
        
        const invoice = result.data;
        
        // Store current document type and N° Order
        currentDocumentTypeMRY = invoice.document_type;
        currentNumeroOrderMRY = invoice.document_numero_Order?.trim() || null;
        
        // Fill client info
        document.getElementById('editClientNomMRY').value = invoice.client_nom;
        document.getElementById('editClientICEMRY').value = invoice.client_ice;
        
        // Fill document info
        const docTypeDisplay = invoice.document_type === 'facture' ? 'Facture' : 'Devis';
        document.getElementById('editDocumentTypeMRY').value = docTypeDisplay;
        document.getElementById('editDocumentDateMRY').value = invoice.document_date;
        
        // Update convert button text
        const convertBtnText = invoice.document_type === 'facture' ? 'Convertir en Devis' : 'Convertir en Facture';
        const convertBtn = document.getElementById('convertButtonTextMRY');
        if (convertBtn) {
            convertBtn.textContent = convertBtnText;
        }
        
        // Fill document number
        const docNumero = invoice.document_type === 'facture' ? invoice.document_numero : invoice.document_numero_devis;
        document.getElementById('editDocumentNumeroMRY').value = docNumero || '';
        
        const label = invoice.document_type === 'facture' ? 'N° Facture' : 'N° Devis';
        document.getElementById('editDocumentNumeroLabelMRY').innerHTML = `${label} <span class="required">*</span>`;
        
        // Show Order field if facture
        if (invoice.document_type === 'facture') {
            document.getElementById('editFieldOrderMRY').style.display = 'block';
            document.getElementById('editDocumentNumeroOrderMRY').value = invoice.document_numero_Order || '';
        } else {
            document.getElementById('editFieldOrderMRY').style.display = 'none';
        }
        
        // Fill TVA
        document.getElementById('editTvaRateMRY').value = invoice.tva_rate;
        
        // Load products
        const tbody = document.getElementById('editProductsTableBodyMRY');
        tbody.innerHTML = '';
        
        if (invoice.products && invoice.products.length > 0) {
            invoice.products.forEach(product => {
                addProductRowEditMRY(product);
            });
        }
        
        calculateTotalsEditMRY();
        
        // Load notes if any
        const noteResult = await window.electron.db.getNote(invoiceId);
        if (noteResult.success && noteResult.data) {
            const noteTextarea = document.getElementById('editInvoiceNotesMRY');
            if (noteTextarea) {
                noteTextarea.value = noteResult.data;
            }
        }
        
    } catch (error) {
        console.error('[MRY] Error loading invoice:', error);
        window.notify.error('Erreur', 'Impossible de charger la facture', 3000);
        router.navigate('/invoices-list-mry');
    }
}

// Add product row
window.addProductRowEditMRY = function(productData = null) {
    const tbody = document.getElementById('editProductsTableBodyMRY');
    const rowId = `edit-product-mry-${productRowCounterEditMRY++}`;
    
    const row = document.createElement('tr');
    row.id = rowId;
    row.innerHTML = `
        <td>
            <textarea class="product-designation" rows="2" placeholder="Description du produit..." onkeydown="handleArrowNavigationEditMRY(event, '${rowId}', 0)">${productData ? productData.designation : ''}</textarea>
        </td>
        <td>
            <input type="text" class="product-quantity" placeholder="ex: 50 Kg, F, 10" value="${productData ? productData.quantite : ''}"
                   onchange="calculateRowTotalEditMRY('${rowId}')" onblur="calculateRowTotalEditMRY('${rowId}')"
                   onkeydown="handleArrowNavigationEditMRY(event, '${rowId}', 1)">
        </td>
        <td>
            <input type="number" class="product-price" step="0.01" placeholder="0.00" value="${productData ? productData.prix_unitaire_ht : ''}"
                   onchange="calculateRowTotalEditMRY('${rowId}')" onblur="calculateRowTotalEditMRY('${rowId}')"
                   onkeydown="handleArrowNavigationEditMRY(event, '${rowId}', 2)">
        </td>
        <td>
            <span class="product-total">${productData ? (productData.total_ht || 0).toFixed(2) : '0.00'} DH</span>
        </td>
        <td>
            <button type="button" class="btn-delete" onclick="deleteProductRowEditMRY('${rowId}')">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                </svg>
            </button>
        </td>
    `;
    
    tbody.appendChild(row);
    
    if (productData) {
        calculateRowTotalEditMRY(rowId);
    }
}

// Calculate row total
window.calculateRowTotalEditMRY = function(rowId) {
    const row = document.getElementById(rowId);
    const quantityInput = row.querySelector('.product-quantity');
    const priceInput = row.querySelector('.product-price');
    
    let quantityText = quantityInput.value.trim();
    
    if (quantityText.toUpperCase() === 'F') {
        quantityText = '1';
    }
    
    const quantity = quantityText.replace(/[^0-9.]/g, '');
    let price = parseFloat(priceInput.value) || 0;
    let qty = parseFloat(quantity) || 0;
    const total = qty * price;
    
    row.querySelector('.product-total').textContent = total.toFixed(2) + ' DH';
    calculateTotalsEditMRY();
}

// Delete product row
window.deleteProductRowEditMRY = function(rowId) {
    document.getElementById(rowId).remove();
    calculateTotalsEditMRY();
}

// Calculate totals
window.calculateTotalsEditMRY = function() {
    const rows = document.querySelectorAll('#editProductsTableBodyMRY tr');
    let totalHT = 0;
    
    rows.forEach(row => {
        const totalText = row.querySelector('.product-total').textContent;
        const cleanText = totalText.replace(/\s/g, '').replace(/,/g, '.').replace('DH', '').trim();
        const total = parseFloat(cleanText) || 0;
        totalHT += total;
    });
    
    const tvaRate = parseFloat(document.getElementById('editTvaRateMRY').value) || 0;
    const montantTVA = totalHT * (tvaRate / 100);
    const totalTTC = totalHT + montantTVA;
    
    document.getElementById('editTotalHTMRY').textContent = totalHT.toFixed(2) + ' DH';
    document.getElementById('editMontantTVAMRY').textContent = montantTVA.toFixed(2) + ' DH';
    document.getElementById('editTotalTTCMRY').textContent = totalTTC.toFixed(2) + ' DH';
}

// Arrow key navigation
window.handleArrowNavigationEditMRY = function(event, currentRowId, currentCellIndex) {
    if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
        return;
    }
    
    const currentRow = document.getElementById(currentRowId);
    const tbody = document.getElementById('editProductsTableBodyMRY');
    const allRows = Array.from(tbody.querySelectorAll('tr'));
    const currentRowIndex = allRows.indexOf(currentRow);
    
    let targetRow = null;
    let targetCellIndex = currentCellIndex;
    
    if (event.key === 'ArrowUp') {
        if (currentRowIndex > 0) {
            targetRow = allRows[currentRowIndex - 1];
            event.preventDefault();
        }
    } else if (event.key === 'ArrowDown') {
        if (currentRowIndex < allRows.length - 1) {
            targetRow = allRows[currentRowIndex + 1];
            event.preventDefault();
        } else {
            addProductRowEditMRY();
            setTimeout(() => {
                const newRows = Array.from(tbody.querySelectorAll('tr'));
                targetRow = newRows[newRows.length - 1];
                focusCellEditMRY(targetRow, targetCellIndex);
            }, 50);
            event.preventDefault();
            return;
        }
    } else if (event.key === 'ArrowLeft') {
        if (currentCellIndex > 0) {
            targetRow = currentRow;
            targetCellIndex = currentCellIndex - 1;
            event.preventDefault();
        }
    } else if (event.key === 'ArrowRight') {
        if (currentCellIndex < 2) {
            targetRow = currentRow;
            targetCellIndex = currentCellIndex + 1;
            event.preventDefault();
        }
    }
    
    if (targetRow) {
        focusCellEditMRY(targetRow, targetCellIndex);
    }
};

// Focus cell helper
function focusCellEditMRY(row, cellIndex) {
    const cells = row.querySelectorAll('td');
    if (cells[cellIndex]) {
        const input = cells[cellIndex].querySelector('textarea, input');
        if (input) {
            input.focus();
            if (input.type === 'text' || input.tagName === 'TEXTAREA') {
                const length = input.value.length;
                input.setSelectionRange(length, length);
            } else if (input.type === 'number') {
                input.select();
            }
        }
    }
}

// Client autocomplete
async function loadAllClientsEditMRY() {
    try {
        const result = await window.electron.db.getAllClients();
        if (result.success) {
            allClientsEditMRY = result.data;
        }
    } catch (error) {
        console.error('[MRY] Error loading clients:', error);
    }
}

window.searchClientsEditMRY = function(query) {
    const dropdown = document.getElementById('clientsDropdownEditMRY');
    if (!dropdown) return;
    
    if (!query || query.trim().length === 0) {
        filteredClientsEditMRY = allClientsEditMRY;
    } else {
        const searchTerm = query.toLowerCase().trim();
        filteredClientsEditMRY = allClientsEditMRY.filter(client => 
            client.nom.toLowerCase().includes(searchTerm) || 
            client.ice.toLowerCase().includes(searchTerm)
        );
    }
    displayClientsListEditMRY();
}

function displayClientsListEditMRY() {
    const dropdown = document.getElementById('clientsDropdownEditMRY');
    if (!dropdown) return;
    
    if (filteredClientsEditMRY.length === 0) {
        dropdown.innerHTML = '<div class="dropdown-item no-results">Aucun client trouvé</div>';
        dropdown.style.display = 'block';
        return;
    }
    
    dropdown.innerHTML = filteredClientsEditMRY.slice(0, 10).map(client => `
        <div class="dropdown-item" style="display: flex; justify-content: space-between; align-items: center;">
            <div style="flex: 1;" onmousedown="selectClientEditMRY('${client.nom.replace(/'/g, "\\'")}', '${client.ice}')">
                <div class="client-name">${client.nom}</div>
                <div class="client-ice">ICE: ${client.ice}</div>
            </div>
        </div>
    `).join('');
    dropdown.style.display = 'block';
}

window.showClientsListEditMRY = function() {
    if (allClientsEditMRY.length > 0) {
        filteredClientsEditMRY = allClientsEditMRY;
        displayClientsListEditMRY();
    }
}

window.hideClientsListEditMRY = function() {
    setTimeout(() => {
        const dropdown = document.getElementById('clientsDropdownEditMRY');
        if (dropdown) dropdown.style.display = 'none';
    }, 200);
}

window.selectClientEditMRY = function(nom, ice) {
    document.getElementById('editClientNomMRY').value = nom;
    document.getElementById('editClientICEMRY').value = ice;
    const dropdown = document.getElementById('clientsDropdownEditMRY');
    if (dropdown) dropdown.style.display = 'none';
}

// Handle form submission
async function handleEditInvoiceSubmitMRY(e) {
    e.preventDefault();
    
    const loadingNotif = window.notify.loading('Mise à jour en cours...', 'Veuillez patienter');
    
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span>⏳ Enregistrement...</span>';
    submitBtn.disabled = true;
    
    try {
        const documentNumeroValue = document.getElementById('editDocumentNumeroMRY').value;
        
        const formData = {
            client: {
                nom: document.getElementById('editClientNomMRY').value,
                ICE: document.getElementById('editClientICEMRY').value
            },
            document: {
                type: currentDocumentTypeMRY,
                date: document.getElementById('editDocumentDateMRY').value
            },
            products: [],
            totals: {
                total_ht: parseFloat(document.getElementById('editTotalHTMRY').textContent.replace(/\s/g, '').replace('DH', '').replace(',', '.')) || 0,
                tva_rate: parseFloat(document.getElementById('editTvaRateMRY').value) || 20,
                montant_tva: parseFloat(document.getElementById('editMontantTVAMRY').textContent.replace(/\s/g, '').replace('DH', '').replace(',', '.')) || 0,
                total_ttc: parseFloat(document.getElementById('editTotalTTCMRY').textContent.replace(/\s/g, '').replace('DH', '').replace(',', '.')) || 0
            }
        };
        
        // Set document number
        if (currentDocumentTypeMRY === 'facture') {
            formData.document.numero = documentNumeroValue;
            formData.document.numero_devis = null;
        } else {
            formData.document.numero_devis = documentNumeroValue;
            formData.document.numero = null;
        }
        
        const numeroOrder = document.getElementById('editDocumentNumeroOrderMRY');
        if (numeroOrder && numeroOrder.value) {
            formData.document.numero_Order = numeroOrder.value;
        } else {
            formData.document.numero_Order = null;
        }
        
        // Collect products
        const rows = document.querySelectorAll('#editProductsTableBodyMRY tr');
        rows.forEach(row => {
            const designation = row.querySelector('.product-designation').value.trim();
            const quantityOriginal = row.querySelector('.product-quantity').value.trim();
            const price = parseFloat(row.querySelector('.product-price').value) || 0;
            
            let quantityForCalc = quantityOriginal;
            if (quantityForCalc.toUpperCase() === 'F') {
                quantityForCalc = '1';
            }
            
            const qty = parseFloat(quantityForCalc) || 0;
            const total_ht = qty * price;
            
            if (designation) {
                formData.products.push({
                    designation,
                    quantite: quantityOriginal || '0',
                    prix_unitaire_ht: price,
                    total_ht: total_ht
                });
            }
        });
        
        // Check for duplicates
        const currentInvoiceResult = await window.electron.db.getInvoiceById(currentInvoiceIdMRY);
        if (!currentInvoiceResult.success) {
            throw new Error('Impossible de charger les données actuelles de la facture');
        }
        const currentInvoice = currentInvoiceResult.data;
        
        const currentNumero = currentDocumentTypeMRY === 'facture' 
            ? currentInvoice.document_numero 
            : currentInvoice.document_numero_devis;
        
        const newNumero = currentDocumentTypeMRY === 'facture'
            ? formData.document.numero
            : formData.document.numero_devis;
        
        if (newNumero !== currentNumero) {
            const allInvoicesResult = await window.electron.db.getAllInvoices();
            if (allInvoicesResult.success) {
                const duplicateNumero = allInvoicesResult.data.find(inv => 
                    inv.id !== currentInvoiceIdMRY && 
                    inv.document_type === currentDocumentTypeMRY &&
                    (currentDocumentTypeMRY === 'facture' 
                        ? inv.document_numero === newNumero
                        : inv.document_numero_devis === newNumero)
                );
                
                if (duplicateNumero) {
                    const docLabel = currentDocumentTypeMRY === 'facture' ? 'Facture' : 'Devis';
                    throw new Error(`Le N° ${docLabel} "${newNumero}" existe déjà pour ${docLabel.toLowerCase()} #${duplicateNumero.id}!`);
                }
            }
        }
        
        // Update invoice
        const result = await window.electron.db.updateInvoice(currentInvoiceIdMRY, formData);
        
        if (result.success) {
            // Save notes
            const noteText = document.getElementById('editInvoiceNotesMRY')?.value?.trim();
            if (noteText) {
                await window.electron.db.saveNote(currentInvoiceIdMRY, noteText);
            }
            
            // Add audit log entry for the update
            const user = JSON.parse(localStorage.getItem('user'));
            if (user && window.electron.db.addAuditLog) {
                try {
                    const changes = {
                        client: formData.client,
                        document: formData.document,
                        totals: formData.totals
                    };
                    await window.electron.db.addAuditLog(
                        currentInvoiceIdMRY,
                        'UPDATE',
                        user.id,
                        user.name,
                        user.email,
                        JSON.stringify(changes)
                    );
                    console.log('✅ [AUDIT LOG MRY] Audit log entry added');
                } catch (auditError) {
                    console.error('❌ [AUDIT LOG MRY] Error adding audit log:', auditError);
                }
            }
            
            window.notify.remove(loadingNotif);
            window.notify.success('Succès', 'Facture mise à jour avec succès!', 3000);
            
            setTimeout(() => {
                router.navigate('/invoices-list-mry');
            }, 1000);
        } else {
            throw new Error(result.error);
        }
    } catch (error) {
        console.error('[MRY] Error updating invoice:', error);
        window.notify.remove(loadingNotif);
        window.notify.error('Erreur', error.message || 'Une erreur est survenue.', 5000);
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

// Format invoice number
window.formatEditInvoiceNumberMRY = function(input) {
    let value = input.value.trim();
    
    // If empty, do nothing
    if (!value) return;
    
    // If already has slash, do nothing
    if (value.includes('/')) return;
    
    // Extract only numbers
    let numbers = value.replace(/[^0-9]/g, '');
    
    if (numbers) {
        const dateInput = document.getElementById('editDocumentDateMRY');
        let year = new Date().getFullYear();
        
        if (dateInput && dateInput.value) {
            const selectedDate = new Date(dateInput.value);
            year = selectedDate.getFullYear();
        }
        
        // Format: numbers/year (e.g., 123/2025) - NO MTT prefix
        input.value = `${numbers}/${year}`;
        input.style.color = '#4caf50';
        input.style.fontWeight = '600';
    }
}

// Convert document type
window.showConvertDocumentTypeModalMRY = async function() {
    const currentType = currentDocumentTypeMRY;
    const newType = currentType === 'facture' ? 'devis' : 'facture';
    const currentTypeText = currentType === 'facture' ? 'Facture' : 'Devis';
    const newTypeText = newType === 'facture' ? 'Facture' : 'Devis';
    
    const confirmMsg = `Voulez-vous vraiment convertir ce ${currentTypeText} en ${newTypeText} ?<br><br>Cela créera un nouveau document avec les mêmes produits.`;
    const confirmed = await showConfirmDialogMRY(confirmMsg);
    
    if (!confirmed) return;
    
    try {
        const result = await window.electron.db.getInvoiceById(currentInvoiceIdMRY);
        if (!result.success || !result.data) {
            throw new Error('Document introuvable');
        }
        
        const invoice = result.data;
        let currentNumero = currentType === 'facture' ? invoice.document_numero : invoice.document_numero_devis;
        
        // Use current number as prefill (user can modify if needed)
        const inputData = await showConvertInputModalMRY(newType, newTypeText, currentNumero);
        
        if (!inputData) {
            window.notify.warning('Annulé', 'Conversion annulée', 3000);
            return;
        }
        
        const { newNumero, newNumeroOrder } = inputData;
        
        // Check uniqueness
        const allInvoicesResult = await window.electron.db.getAllInvoices('MRY');
        if (allInvoicesResult.success) {
            const duplicateNumero = allInvoicesResult.data.find(inv => {
                if (newType === 'facture') {
                    return inv.document_type === 'facture' && inv.document_numero === newNumero;
                } else {
                    return inv.document_type === 'devis' && inv.document_numero_devis === newNumero;
                }
            });
            
            if (duplicateNumero) {
                const label = newType === 'facture' ? 'N° Facture' : 'N° Devis';
                window.notify.error('Erreur', `Ce ${label} existe déjà`, 5000);
                return;
            }
        }
        
        const user = JSON.parse(localStorage.getItem('user'));
        
        const newInvoiceData = {
            company_code: 'MRY',
            client: {
                nom: invoice.client_nom || '',
                ICE: invoice.client_ice || ''
            },
            document: {
                type: newType,
                date: invoice.document_date || new Date().toISOString().split('T')[0],
                numero: newType === 'facture' ? newNumero : null,
                numero_devis: newType === 'devis' ? newNumero : null,
                numero_Order: newType === 'facture' ? (newNumeroOrder || null) : null,
                created_by_user_id: user?.id || null,
                created_by_user_name: user?.name || null,
                created_by_user_email: user?.email || null
            },
            products: (invoice.products || []).map(p => ({
                designation: p.designation || '',
                quantite: p.quantite || 0,
                prix_unitaire_ht: p.prix_unitaire_ht || 0,
                total_ht: p.total_ht || 0
            })),
            totals: {
                total_ht: invoice.total_ht || 0,
                tva_rate: invoice.tva_rate || 20,
                montant_tva: invoice.montant_tva || 0,
                total_ttc: invoice.total_ttc || 0
            }
        };
        
        const createResult = await window.electron.db.createInvoice(newInvoiceData, 'MRY');
        
        if (createResult.success) {
            window.notify.success(
                'Succès',
                `${newTypeText} créé(e) avec succès à partir du ${currentTypeText}`,
                4000
            );
            
            setTimeout(() => {
                router.navigate('/invoices-list-mry');
            }, 1500);
        } else {
            throw new Error(createResult.error || 'Erreur lors de la création du document');
        }
        
    } catch (error) {
        console.error('[MRY] Error converting invoice:', error);
        window.notify.error('Erreur', 'Erreur lors de la conversion: ' + error.message, 5000);
    }
}

// Confirm dialog
function showConfirmDialogMRY(message) {
    return new Promise((resolve) => {
        const overlay = document.createElement('div');
        overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.9);z-index:999998;display:flex;align-items:center;justify-content:center;';
        
        const dialog = document.createElement('div');
        dialog.style.cssText = 'background:#1e1e1e;border-radius:12px;padding:2rem;max-width:500px;width:90%;box-shadow:0 20px 60px rgba(0,0,0,0.8);';
        
        dialog.innerHTML = `
            <div style="text-align:center;margin-bottom:1.5rem;">
                <div style="font-size:3rem;margin-bottom:0.5rem;">⚠️</div>
                <h2 style="color:#fff;margin:0;font-size:1.3rem;">Confirmation</h2>
            </div>
            <p style="color:#ccc;text-align:center;line-height:1.6;margin-bottom:2rem;">${message}</p>
            <div style="display:flex;gap:1rem;">
                <button id="confirmNo" style="flex:1;padding:0.75rem;background:#3e3e42;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:1rem;font-weight:600;">
                    Annuler
                </button>
                <button id="confirmYes" style="flex:1;padding:0.75rem;background:#2196f3;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:1rem;font-weight:600;">
                    Confirmer
                </button>
            </div>
        `;
        
        overlay.appendChild(dialog);
        document.body.appendChild(overlay);
        
        document.getElementById('confirmYes').onclick = () => {
            overlay.remove();
            resolve(true);
        };
        
        document.getElementById('confirmNo').onclick = () => {
            overlay.remove();
            resolve(false);
        };
    });
}

// Convert input modal
function showConvertInputModalMRY(newType, newTypeLabel, prefillNumero = '') {
    return new Promise(async (resolve) => {
        let highestNumber = 'Aucun';
        try {
            const invoicesResult = await window.electron.db.getAllInvoices();
            if (invoicesResult.success && invoicesResult.data && invoicesResult.data.length > 0) {
                const invoices = invoicesResult.data;
                
                const extractNumber = (docNumber) => {
                    if (!docNumber) return 0;
                    const match = docNumber.toString().match(/\d+/);
                    return match ? parseInt(match[0], 10) : 0;
                };

                if (newType === 'facture') {
                    const factures = invoices.filter(inv => inv.document_type === 'facture' && inv.document_numero);
                    if (factures.length > 0) {
                        factures.sort((a, b) => extractNumber(b.document_numero) - extractNumber(a.document_numero));
                        highestNumber = factures[0].document_numero;
                    }
                } else if (newType === 'devis') {
                    const devisList = invoices.filter(inv => inv.document_type === 'devis' && inv.document_numero_devis);
                    if (devisList.length > 0) {
                        devisList.sort((a, b) => extractNumber(b.document_numero_devis) - extractNumber(a.document_numero_devis));
                        highestNumber = devisList[0].document_numero_devis;
                    }
                }
            }
        } catch (error) {
            console.error('Error getting highest numbers for conversion:', error);
        }

        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay';
        overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.85);display:flex;align-items:center;justify-content:center;z-index:10000;';
        
        const container = document.createElement('div');
        container.style.cssText = 'background:#1e1e1e;border-radius:12px;padding:2.5rem;max-width:500px;width:90%;box-shadow:0 10px 40px rgba(0,0,0,0.5);';
        
        container.innerHTML = `
            <div style="text-align:center;margin-bottom:2rem;">
                <div style="font-size:3rem;margin-bottom:0.5rem;">🔄</div>
                <h2 style="color:#fff;margin:0;font-size:1.5rem;font-weight:600;">Convertir en ${newTypeLabel}</h2>
            </div>
            
            <div style="margin-bottom:2rem;">
                <label style="display:block;color:#2196F3;margin-bottom:0.75rem;font-weight:600;font-size:1.1rem;">${newType === 'facture' ? 'N° Facture' : 'N° Devis'}</label>
                <input type="text" id="convertInputMRY1" placeholder="Exemple: 548" value="${prefillNumero}"
                       style="width:100%;padding:1rem;background:#2d2d30;border:2px solid #3e3e42;border-radius:8px;color:#fff;font-size:1.1rem;box-sizing:border-box;outline:none;transition:all 0.3s;">
                <small style="color: #999; font-size: 0.85rem; display: block; margin-top: 0.5rem;">Ex: 123 → 123/2025</small>
                ${highestNumber !== 'Aucun' ? `<div style="margin-top:0.5rem;color:${newType === 'facture' ? '#4caf50' : '#9c27b0'};font-size:0.85rem;font-weight:500;">📌 Plus grand numéro actuel: ${highestNumber}</div>` : ''}
            </div>
            
            ${newType === 'facture' ? `
            <div style="margin-bottom:2rem;">
                <label style="display:block;color:#9e9e9e;margin-bottom:0.75rem;font-weight:500;font-size:1rem;">N° Order (optionnel)</label>
                <input type="text" id="convertInputMRY2" placeholder="Exemple: 555"
                       style="width:100%;padding:1rem;background:#2d2d30;border:2px solid #3e3e42;border-radius:8px;color:#fff;font-size:1.1rem;box-sizing:border-box;outline:none;transition:all 0.3s;">
            </div>
            ` : ''}
            
            <div style="display:flex;gap:1rem;margin-top:2rem;">
                <button id="convertBtnCancelMRY" style="flex:1;padding:1rem;background:#3e3e42;color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:1.1rem;font-weight:600;transition:all 0.3s;">
                    Annuler
                </button>
                <button id="convertBtnConfirmMRY" style="flex:1;padding:1rem;background:#2196f3;color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:1.1rem;font-weight:600;transition:all 0.3s;">
                    ✓ Confirmer
                </button>
            </div>
        `;
        
        overlay.appendChild(container);
        document.body.appendChild(overlay);
        
        const input1 = document.getElementById('convertInputMRY1');
        const input2 = document.getElementById('convertInputMRY2');
        const btnConfirm = document.getElementById('convertBtnConfirmMRY');
        const btnCancel = document.getElementById('convertBtnCancelMRY');
        
        setTimeout(() => input1?.focus(), 100);
        
        btnConfirm.onclick = () => {
            const newNumero = input1.value.trim();
            const newNumeroOrder = input2?.value.trim() || null;
            
            if (!newNumero) {
                window.notify.error('Erreur', 'Veuillez saisir un numéro de document', 3000);
                return;
            }
            
            overlay.remove();
            resolve({ newNumero, newNumeroOrder });
        };
        
        btnCancel.onclick = () => {
            overlay.remove();
            resolve(null);
        };
    });
}

// Initialize page
window.initEditInvoiceMRYPage = function() {
    console.log('🔄 [MRY] Initializing edit invoice page...');
    
    currentInvoiceIdMRY = localStorage.getItem('editInvoiceIdMRY');
    
    if (!currentInvoiceIdMRY) {
        window.notify.error('Erreur', 'Aucune facture sélectionnée', 3000);
        router.navigate('/invoices-list-mry');
        return;
    }
    
    setTimeout(() => {
        const form = document.getElementById('editInvoiceFormMRY');
        if (form) {
            form.addEventListener('submit', handleEditInvoiceSubmitMRY);
        }
        
        loadAllClientsEditMRY();
        loadInvoiceDataMRY(parseInt(currentInvoiceIdMRY));
    }, 100);
};

// ============================================
// PDF & Helper Functions (from invoices_list_mry.js)
// ============================================

// Download invoice as PDF
window.downloadInvoicePDF = async function(invoiceId) {
    try {
        console.log('📥 Generating PDF for invoice:', invoiceId);
        
        // Get invoice data
        const result = await window.electron.db.getInvoiceById(invoiceId);
        
        if (!result.success || !result.data) {
            throw new Error('Facture introuvable');
        }
        
        const invoice = result.data;
        
        // Check if jsPDF is loaded
        if (typeof window.jspdf === 'undefined') {
            await loadJsPDF();
        }
        
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        // Colors
        const blueColor = [33, 97, 140];
        const greenColor = [16, 172, 132];
        const orangeColor = [255, 152, 0];
        
        const dateStr = new Date(invoice.document_date).toLocaleDateString('fr-FR');
        
        // Helper function to format numbers
        const formatNumberForPDF = (num) => {
            return parseFloat(num).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
        };
        
        // Add header
        doc.setFontSize(18);
        doc.setTextColor(...blueColor);
        doc.setFont(undefined, 'bold');
        doc.text('MRY TRAV SARL (AU)', 105, 20, { align: 'center' });
        
        doc.setFontSize(10);
        doc.setFont(undefined, 'normal');
        doc.setTextColor(0, 0, 0);
        doc.text('TRAVAUX DIVERS DE CONSTRUCTION', 105, 27, { align: 'center' });
        doc.text('VENTE DE MATERIAUX DE CONSTRUCTION', 105, 32, { align: 'center' });
        doc.text('VENTE DE QUINCAILLERIE & DE DROGUERIE', 105, 37, { align: 'center' });
        
        // Client Info
        doc.setFontSize(11);
        doc.setFont(undefined, 'bold');
        doc.text('CLIENT :', 15, 50);
        doc.setTextColor(...greenColor);
        doc.text(invoice.client_nom, 40, 50);
        
        if (invoice.client_ice && invoice.client_ice !== '0') {
            doc.setTextColor(0, 0, 0);
            doc.text('ICE :', 15, 57);
            doc.setTextColor(...greenColor);
            doc.text(invoice.client_ice, 40, 57);
        }
        
        // Date
        doc.setTextColor(0, 0, 0);
        doc.text(`Date: ${dateStr}`, 150, 50);
        
        // Document number
        doc.setFontSize(14);
        doc.setFont(undefined, 'bold');
        if (invoice.document_type === 'devis') {
            doc.text('DEVIS N°:', 15, 70);
            doc.setTextColor(...orangeColor);
            doc.text(invoice.document_numero_devis || '-', 50, 70);
        } else {
            doc.text('FACTURE N°:', 15, 70);
            doc.setTextColor(...orangeColor);
            doc.text(invoice.document_numero || '-', 55, 70);
        }
        
        // Products Table
        const startY = 80;
        doc.setFillColor(...blueColor);
        doc.rect(15, startY, 180, 8, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(9);
        doc.setFont(undefined, 'bold');
        doc.text('Désignation', 18, startY + 5.5);
        doc.text('QTE', 125, startY + 5.5, { align: 'center' });
        doc.text('PU HT', 160, startY + 5.5, { align: 'right' });
        doc.text('TOTAL HT', 188, startY + 5.5, { align: 'right' });
        
        let currentY = startY + 10;
        doc.setTextColor(0, 0, 0);
        doc.setFont(undefined, 'normal');
        doc.setFontSize(9);
        
        invoice.products.forEach((product, index) => {
            if (currentY > 200) {
                doc.addPage();
                currentY = 20;
            }
            
            if (index % 2 === 0) {
                doc.setFillColor(245, 245, 245);
                doc.rect(15, currentY - 3, 180, 8, 'F');
            }
            
            doc.text((product.designation || '').substring(0, 50), 18, currentY);
            doc.text(String(product.quantite || ''), 125, currentY, { align: 'center' });
            doc.text(`${formatNumberForPDF(product.prix_unitaire_ht)} DH`, 160, currentY, { align: 'right' });
            doc.text(`${formatNumberForPDF(product.total_ht)} DH`, 188, currentY, { align: 'right' });
            
            currentY += 8;
        });
        
        // Totals
        currentY += 10;
        doc.setFillColor(245, 245, 245);
        doc.rect(110, currentY, 85, 8, 'F');
        doc.setFont(undefined, 'bold');
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(9);
        doc.text('TOTAL HT :', 113, currentY + 5.5);
        doc.text(`${formatNumberForPDF(invoice.total_ht)} DH`, 192, currentY + 5.5, { align: 'right' });
        
        currentY += 8;
        doc.setFillColor(255, 255, 255);
        doc.rect(110, currentY, 85, 8, 'F');
        doc.setFontSize(9);
        doc.text(`MONTANT TVA ${invoice.tva_rate}% :`, 113, currentY + 5.5);
        doc.text(`${formatNumberForPDF(invoice.montant_tva)} DH`, 192, currentY + 5.5, { align: 'right' });
        
        currentY += 8;
        doc.setFillColor(173, 216, 230);
        doc.rect(110, currentY, 85, 8, 'F');
        doc.setTextColor(...blueColor);
        doc.setFontSize(9);
        doc.text('MONTANT T.T.C :', 113, currentY + 5.5);
        doc.text(`${formatNumberForPDF(invoice.total_ttc)} DH`, 192, currentY + 5.5, { align: 'right' });
        
        // Save PDF
        const selectedCompany = JSON.parse(localStorage.getItem('selectedCompany') || '{}');
        const companyName = selectedCompany.name ? selectedCompany.name.replace(' Company', '') : 'Unknown';
        let filename;
        if (invoice.document_type === 'devis') {
            filename = `Devis_${invoice.document_numero_devis || invoice.id}_${invoice.client_nom}_${companyName}.pdf`;
        } else {
            filename = `Facture_${invoice.document_numero || invoice.id}_${invoice.client_nom}_${companyName}.pdf`;
        }
        doc.save(filename);
        
        window.notify.success('Succès', 'PDF téléchargé avec succès', 3000);
        
    } catch (error) {
        console.error('❌ Error generating PDF:', error);
        window.notify.error('Erreur', 'Erreur lors de la génération du PDF', 3000);
    }
};

// Download Bon de travaux as PDF
window.downloadBonDeTravauxPDF = async function(invoiceId) {
    try {
        console.log('📥 Generating Bon de travaux PDF for invoice:', invoiceId);
        
        const result = await window.electron.db.getInvoiceById(invoiceId);
        
        if (!result.success || !result.data) {
            throw new Error('Document introuvable');
        }
        
        const invoice = result.data;
        
        if (typeof window.jspdf === 'undefined') {
            await loadJsPDF();
        }
        
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        const blueColor = [33, 97, 140];
        const greenColor = [16, 172, 132];
        const dateStr = new Date(invoice.document_date).toLocaleDateString('fr-FR');
        
        const formatNumberForPDF = (num) => {
            return parseFloat(num).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
        };
        
        // Header
        doc.setFontSize(18);
        doc.setTextColor(...blueColor);
        doc.setFont(undefined, 'bold');
        doc.text('MRY TRAV SARL (AU)', 105, 20, { align: 'center' });
        
        doc.setFontSize(10);
        doc.setFont(undefined, 'normal');
        doc.setTextColor(0, 0, 0);
        doc.text('TRAVAUX DIVERS DE CONSTRUCTION', 105, 27, { align: 'center' });
        doc.text('VENTE DE MATERIAUX DE CONSTRUCTION', 105, 32, { align: 'center' });
        doc.text('VENTE DE QUINCAILLERIE & DE DROGUERIE', 105, 37, { align: 'center' });
        
        doc.setFontSize(11);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(0, 0, 0);
        doc.text('CLIENT :', 15, 50);
        doc.setTextColor(...greenColor);
        doc.text(invoice.client_nom, 40, 50);
        
        if (invoice.client_ice && invoice.client_ice !== '0') {
            doc.setTextColor(0, 0, 0);
            doc.text('ICE :', 15, 57);
            doc.setTextColor(...greenColor);
            doc.text(invoice.client_ice, 40, 57);
        }
        
        doc.setTextColor(0, 0, 0);
        doc.text(`Date: ${dateStr}`, 150, 50);
        
        doc.setFontSize(20);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(...blueColor);
        doc.text('BON DE TRAVAUX', 105, 70, { align: 'center' });
        
        const startY = 85;
        doc.setFillColor(...blueColor);
        doc.rect(15, startY, 180, 8, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(9);
        doc.setFont(undefined, 'bold');
        doc.text('Désignation', 18, startY + 5.5);
        doc.text('QTE', 125, startY + 5.5, { align: 'center' });
        doc.text('Prix unitaire HT', 160, startY + 5.5, { align: 'right' });
        doc.text('Prix total HT', 188, startY + 5.5, { align: 'right' });
        
        let currentY = startY + 10;
        doc.setTextColor(0, 0, 0);
        doc.setFont(undefined, 'normal');
        doc.setFontSize(9);
        
        invoice.products.forEach((product, index) => {
            if (currentY > 200) {
                doc.addPage();
                currentY = 20;
            }
            
            if (index % 2 === 0) {
                doc.setFillColor(245, 245, 245);
                doc.rect(15, currentY - 3, 180, 8, 'F');
            }
            
            doc.text((product.designation || '').substring(0, 50), 18, currentY);
            doc.text(String(product.quantite || ''), 125, currentY, { align: 'center' });
            doc.text(`${formatNumberForPDF(product.prix_unitaire_ht)} DH`, 160, currentY, { align: 'right' });
            doc.text(`${formatNumberForPDF(product.total_ht)} DH`, 188, currentY, { align: 'right' });
            
            currentY += 8;
        });
        
        currentY += 10;
        doc.setFillColor(...blueColor);
        doc.rect(110, currentY, 85, 7, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(9);
        doc.setFont(undefined, 'bold');
        doc.text('Total HT', 113, currentY + 5);
        doc.text(`${formatNumberForPDF(invoice.total_ht)} DH`, 192, currentY + 5, { align: 'right' });
        
        currentY += 7;
        doc.setFillColor(245, 245, 245);
        doc.rect(110, currentY, 85, 7, 'F');
        doc.setTextColor(0, 0, 0);
        doc.text(`TVA ${invoice.tva_rate}%`, 113, currentY + 5);
        doc.text(`${formatNumberForPDF(invoice.montant_tva)} DH`, 192, currentY + 5, { align: 'right' });
        
        currentY += 7;
        doc.setFillColor(...greenColor);
        doc.rect(110, currentY, 85, 7, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFont(undefined, 'bold');
        doc.text('Total TTC', 113, currentY + 5);
        doc.text(`${formatNumberForPDF(invoice.total_ttc)} DH`, 192, currentY + 5, { align: 'right' });
        
        const selectedCompany = JSON.parse(localStorage.getItem('selectedCompany') || '{}');
        const companyName = selectedCompany.name ? selectedCompany.name.replace(' Company', '') : 'Unknown';
        const filename = `BonDeTravauxMRY_${invoice.document_numero || invoice.id}_${invoice.client_nom}_${companyName}.pdf`;
        doc.save(filename);
        
        window.notify.success('Succès', 'Bon de travaux téléchargé avec succès', 3000);
        
    } catch (error) {
        console.error('❌ Error generating Bon de travaux:', error);
        window.notify.error('Erreur', 'Erreur lors de la génération du Bon de travaux', 3000);
    }
};

// Load jsPDF library
async function loadJsPDF() {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load jsPDF'));
        document.head.appendChild(script);
    });
}

// Format number helper
function formatNumber(num) {
    return parseFloat(num).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

// Convert number to French words
function numberToFrenchWords(number) {
    const units = ['', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf'];
    const teens = ['dix', 'onze', 'douze', 'treize', 'quatorze', 'quinze', 'seize', 'dix-sept', 'dix-huit', 'dix-neuf'];
    const tens = ['', '', 'vingt', 'trente', 'quarante', 'cinquante', 'soixante', 'soixante', 'quatre-vingt', 'quatre-vingt'];
    
    function convertLessThanThousand(n) {
        if (n === 0) return '';
        if (n < 10) return units[n];
        if (n < 20) return teens[n - 10];
        if (n < 70) {
            const ten = Math.floor(n / 10);
            const unit = n % 10;
            if (unit === 0) return tens[ten];
            if (unit === 1 && ten === 2) return 'vingt et un';
            if (unit === 1 && ten > 2) return tens[ten] + ' et un';
            return tens[ten] + '-' + units[unit];
        }
        if (n < 80) {
            const remainder = n - 60;
            if (remainder < 10) return 'soixante-' + units[remainder];
            return 'soixante-' + teens[remainder - 10];
        }
        if (n < 100) {
            const remainder = n - 80;
            if (remainder === 0) return 'quatre-vingts';
            if (remainder < 10) return 'quatre-vingt-' + units[remainder];
            return 'quatre-vingt-' + teens[remainder - 10];
        }
        
        const hundred = Math.floor(n / 100);
        const remainder = n % 100;
        let result = hundred === 1 ? 'cent' : units[hundred] + ' cent';
        if (hundred > 1 && remainder === 0) result += 's';
        if (remainder > 0) result += ' ' + convertLessThanThousand(remainder);
        return result;
    }
    
    function convertNumber(n) {
        if (n === 0) return 'zéro';
        if (n < 1000) return convertLessThanThousand(n);
        
        if (n >= 1000000000) {
            const billion = Math.floor(n / 1000000000);
            const remainder = n % 1000000000;
            let result = billion === 1 ? 'un milliard' : convertLessThanThousand(billion) + ' milliards';
            if (remainder > 0) result += ' ' + convertNumber(remainder);
            return result;
        }
        
        if (n >= 1000000) {
            const million = Math.floor(n / 1000000);
            const remainder = n % 1000000;
            let result = million === 1 ? 'un million' : convertLessThanThousand(million) + ' millions';
            if (remainder > 0) result += ' ' + convertNumber(remainder);
            return result;
        }
        
        const thousand = Math.floor(n / 1000);
        const remainder = n % 1000;
        let result = thousand === 1 ? 'mille' : convertLessThanThousand(thousand) + ' mille';
        if (remainder > 0) result += ' ' + convertLessThanThousand(remainder);
        return result;
    }
    
    const parts = number.toFixed(2).split('.');
    const dirhams = parseInt(parts[0]);
    const centimes = parseInt(parts[1]);
    
    let result = convertNumber(dirhams) + ' dirham';
    if (dirhams > 1) result += 's';
    
    if (centimes > 0) {
        result += ' et ' + convertNumber(centimes) + ' centime';
        if (centimes > 1) result += 's';
    } else {
        result += ' et zéro centime';
    }
    
    return result.charAt(0).toUpperCase() + result.slice(1);
}

// Download SKM Devis PDF
window.downloadSKMDevisPDF = async function(invoiceId) {
    try {
        const result = await window.electron.db.getInvoiceById(invoiceId);
        if (!result.success || !result.data) {
            throw new Error('Document introuvable');
        }
        
        // Call the SKM PDF generator
        if (typeof window.generateSKMDevisPDF === 'function') {
            await window.generateSKMDevisPDF(result.data);
        } else {
            window.notify.error('Erreur', 'Générateur SKM non disponible', 3000);
        }
    } catch (error) {
        console.error('Error generating SKM PDF:', error);
        window.notify.error('Erreur', 'Erreur lors de la génération du PDF SKM', 3000);
    }
};

// Download SAAISS Devis PDF
window.downloadSAAISSDevisPDF = async function(invoiceId) {
    try {
        const result = await window.electron.db.getInvoiceById(invoiceId);
        if (!result.success || !result.data) {
            throw new Error('Document introuvable');
        }
        
        // Call the SAAISS PDF generator
        if (typeof window.generateSAAISSDevisPDF === 'function') {
            await window.generateSAAISSDevisPDF(result.data);
        } else {
            window.notify.error('Erreur', 'Générateur SAAISS non disponible', 3000);
        }
    } catch (error) {
        console.error('Error generating SAAISS PDF:', error);
        window.notify.error('Erreur', 'Erreur lors de la génération du PDF SAAISS', 3000);
    }
};

// Open attachment
window.openAttachment = async function(attachmentId) {
    try {
        console.log('📂 Opening attachment:', attachmentId);
        const result = await window.electron.db.getAttachment(attachmentId);
        
        if (result.success && result.data) {
            const attachment = result.data;
            const blob = new Blob([Buffer.from(attachment.file_data, 'base64')], { type: attachment.file_type });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.target = '_blank';
            a.click();
            URL.revokeObjectURL(url);
        }
    } catch (error) {
        console.error('Error opening attachment:', error);
        window.notify.error('Erreur', 'Impossible d\'ouvrir le fichier', 3000);
    }
};

// Delete attachment
window.deleteAttachment = async function(attachmentId, invoiceId) {
    console.log('🗑️ [DELETE] Delete attachment requested:', attachmentId, 'for invoice:', invoiceId);
    
    const confirmed = await customConfirm('Confirmation', 'Êtes-vous sûr de vouloir supprimer ce fichier ?', 'warning');
    
    if (!confirmed) {
        console.log('🚫 [DELETE] Deletion cancelled by user');
        return;
    }
    
    try {
        const result = await window.electron.db.deleteAttachment(attachmentId);
        
        if (result.success) {
            console.log('✅ [DELETE] Attachment deleted successfully');
            window.notify.success('Succès', 'Fichier supprimé avec succès', 3000);
            
            // Reload invoice details
            if (typeof viewInvoice === 'function') {
                viewInvoice(invoiceId);
            }
        } else {
            throw new Error(result.error || 'Erreur lors de la suppression');
        }
    } catch (error) {
        console.error('❌ [DELETE] Error deleting attachment:', error);
        window.notify.error('Erreur', 'Impossible de supprimer le fichier', 3000);
    }
};

// Add new attachment
window.addNewAttachment = async function(invoiceId) {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        try {
            const reader = new FileReader();
            reader.onload = async (event) => {
                const fileData = event.target.result;
                const base64Data = fileData.split(',')[1];
                
                const result = await window.electron.db.addAttachment(invoiceId, {
                    filename: file.name,
                    file_type: file.type,
                    file_size: file.size,
                    file_data: base64Data
                });
                
                if (result.success) {
                    window.notify.success('Succès', 'Fichier ajouté avec succès', 3000);
                    if (typeof viewInvoice === 'function') {
                        viewInvoice(invoiceId);
                    }
                } else {
                    throw new Error(result.error);
                }
            };
            reader.readAsDataURL(file);
        } catch (error) {
            console.error('Error adding attachment:', error);
            window.notify.error('Erreur', 'Impossible d\'ajouter le fichier', 3000);
        }
    };
    input.click();
};

// Custom confirm dialog
async function customConfirm(title, message, type = 'info') {
    return new Promise((resolve) => {
        const overlay = document.createElement('div');
        overlay.className = 'custom-modal-overlay';
        overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.85);z-index:9999;display:flex;align-items:center;justify-content:center;';
        
        const modal = document.createElement('div');
        modal.className = 'custom-modal';
        modal.style.cssText = 'background:#2d2d30;border-radius:12px;padding:2rem;max-width:400px;width:90%;box-shadow:0 10px 40px rgba(0,0,0,0.5);';
        
        const iconMap = {
            'warning': '⚠️',
            'info': 'ℹ️',
            'success': '✅',
            'error': '❌'
        };
        
        const icon = iconMap[type] || '❓';
        
        modal.innerHTML = `
            <div style="text-align:center;margin-bottom:1.5rem;">
                <div style="font-size:3rem;margin-bottom:0.5rem;">${icon}</div>
                <h2 style="color:#fff;margin:0;font-size:1.2rem;">${title}</h2>
            </div>
            <p style="color:#ccc;text-align:center;line-height:1.6;margin-bottom:2rem;">${message}</p>
            <div style="display:flex;gap:1rem;">
                <button id="confirmNo" style="flex:1;padding:0.75rem;background:#3e3e42;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:1rem;font-weight:600;">
                    Annuler
                </button>
                <button id="confirmYes" style="flex:1;padding:0.75rem;background:#f44336;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:1rem;font-weight:600;">
                    Confirmer
                </button>
            </div>
        `;
        
        overlay.appendChild(modal);
        document.body.appendChild(overlay);
        
        document.getElementById('confirmYes').onclick = () => {
            overlay.remove();
            resolve(true);
        };
        
        document.getElementById('confirmNo').onclick = () => {
            overlay.remove();
            resolve(false);
        };
    });
}
