// Simple Edit Invoice Page - MRY Company (No Extra Features)
function EditInvoiceSimpleMRYPage() {
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
                <form id="editInvoiceFormSimpleMRY" class="invoice-form">
                    <!-- Section 1: Client Information -->
                    <div class="invoice-section">
                        <div class="section-header">
                            <h2>📦 Informations du client</h2>
                        </div>
                        <div class="section-body">
                            <div class="form-row">
                                <div class="form-field" style="position: relative;">
                                    <label>Nom du client <span class="required">*</span></label>
                                    <input type="text" id="editClientNomSimpleMRY" placeholder="Rechercher ou saisir un client" 
                                           autocomplete="off" required oninput="searchClientsEditSimpleMRY(this.value)" 
                                           onfocus="showClientsListEditSimpleMRY()" onblur="hideClientsListEditSimpleMRY()">
                                    <div id="clientsDropdownEditSimpleMRY" class="clients-dropdown" style="display: none;"></div>
                                </div>
                                <div class="form-field">
                                    <label>N° ICE</label>
                                    <input type="text" id="editClientICESimpleMRY" placeholder="Numéro ICE (optionnel)">
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
                                    <input type="text" id="editDocumentTypeSimpleMRY" readonly style="background: #2d2d30; cursor: not-allowed;">
                                </div>
                                <div class="form-field">
                                    <label>Date <span class="required">*</span></label>
                                    <input type="date" id="editDocumentDateSimpleMRY" required>
                                </div>
                            </div>

                            <div class="form-row">
                                <div class="form-field">
                                    <label id="editDocumentNumeroLabelSimpleMRY">N° Document <span class="required">*</span></label>
                                    <input type="text" id="editDocumentNumeroSimpleMRY" required placeholder="Saisir les chiffres (ex: 001)" onblur="formatEditInvoiceNumberSimpleMRY(this)">
                                </div>
                            </div>
                            
                            <div class="form-row" id="editFieldOrderSimpleMRY" style="display: none;">
                                <div class="form-field" style="max-width: 50%;">
                                    <label>📋 N° Order <span style="color: #999; font-size: 0.85rem; font-weight: normal;">(optionnel)</span></label>
                                    <input type="text" id="editDocumentNumeroOrderSimpleMRY" placeholder="Ex: 123" style="border: 1px solid #3e3e42;">
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
                            <button type="button" class="add-product-btn" onclick="addProductRowEditSimpleMRY()">
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
                                    <tbody id="editProductsTableBodySimpleMRY">
                                        <!-- Products will be loaded here -->
                                    </tbody>
                                </table>
                            </div>

                            <!-- Summary -->
                            <div class="invoice-summary">
                                <div class="summary-row">
                                    <span>Total HT:</span>
                                    <span id="editTotalHTSimpleMRY">0.00 DH</span>
                                </div>
                                <div class="summary-row">
                                    <span>TVA:</span>
                                    <div class="tva-input">
                                        <input type="number" id="editTvaRateSimpleMRY" value="20" min="0" max="100" onchange="calculateTotalsEditSimpleMRY()">
                                        <span>%</span>
                                    </div>
                                </div>
                                <div class="summary-row">
                                    <span>Montant TVA:</span>
                                    <span id="editMontantTVASimpleMRY">0.00 DH</span>
                                </div>
                                <div class="summary-row total">
                                    <span>Total TTC:</span>
                                    <span id="editTotalTTCSimpleMRY">0.00 DH</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Form Actions -->
                    <div class="form-actions" style="display: flex; justify-content: space-between; align-items: center; gap: 1rem; padding-top: 1.5rem; border-top: 1px solid #3e3e42;">
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
let currentInvoiceIdSimpleMRY = null;
let productRowCounterEditSimpleMRY = 0;
let allClientsEditSimpleMRY = [];
let filteredClientsEditSimpleMRY = [];
let currentDocumentTypeSimpleMRY = null;
let currentNumeroOrderSimpleMRY = null;

// Load invoice data
async function loadInvoiceDataSimpleMRY(invoiceId) {
    try {
        const result = await window.electron.db.getInvoiceById(invoiceId);
        
        if (!result.success || !result.data) {
            throw new Error('Facture introuvable');
        }
        
        const invoice = result.data;
        
        // Store current document type and N° Order
        currentDocumentTypeSimpleMRY = invoice.document_type;
        currentNumeroOrderSimpleMRY = invoice.document_numero_Order?.trim() || null;
        
        // Fill client info
        document.getElementById('editClientNomSimpleMRY').value = invoice.client_nom;
        document.getElementById('editClientICESimpleMRY').value = invoice.client_ice;
        
        // Fill document info
        const docTypeDisplay = invoice.document_type === 'facture' ? 'Facture' : 'Devis';
        document.getElementById('editDocumentTypeSimpleMRY').value = docTypeDisplay;
        document.getElementById('editDocumentDateSimpleMRY').value = invoice.document_date;
        
        // Fill document number
        const docNumero = invoice.document_type === 'facture' ? invoice.document_numero : invoice.document_numero_devis;
        document.getElementById('editDocumentNumeroSimpleMRY').value = docNumero || '';
        
        const label = invoice.document_type === 'facture' ? 'N° Facture' : 'N° Devis';
        document.getElementById('editDocumentNumeroLabelSimpleMRY').innerHTML = `${label} <span class="required">*</span>`;
        
        // Show Order field if facture
        if (invoice.document_type === 'facture') {
            document.getElementById('editFieldOrderSimpleMRY').style.display = 'block';
            document.getElementById('editDocumentNumeroOrderSimpleMRY').value = invoice.document_numero_Order || '';
        } else {
            document.getElementById('editFieldOrderSimpleMRY').style.display = 'none';
        }
        
        // Fill TVA
        document.getElementById('editTvaRateSimpleMRY').value = invoice.tva_rate;
        
        // Load products
        const tbody = document.getElementById('editProductsTableBodySimpleMRY');
        tbody.innerHTML = '';
        
        if (invoice.products && invoice.products.length > 0) {
            invoice.products.forEach(product => {
                addProductRowEditSimpleMRY(product);
            });
        }
        
        calculateTotalsEditSimpleMRY();
        
    } catch (error) {
        console.error('[MRY] Error loading invoice:', error);
        window.notify.error('Erreur', 'Impossible de charger la facture', 3000);
        router.navigate('/invoices-list-mry');
    }
}

// Add product row
window.addProductRowEditSimpleMRY = function(productData = null) {
    const tbody = document.getElementById('editProductsTableBodySimpleMRY');
    const rowId = `edit-product-simple-mry-${productRowCounterEditSimpleMRY++}`;
    
    const row = document.createElement('tr');
    row.id = rowId;
    row.innerHTML = `
        <td>
            <textarea class="product-designation" rows="2" placeholder="Description du produit..." onkeydown="handleArrowNavigationEditSimpleMRY(event, '${rowId}', 0)">${productData ? productData.designation : ''}</textarea>
        </td>
        <td>
            <input type="text" class="product-quantity" placeholder="ex: 50 Kg, F, 10" value="${productData ? productData.quantite : ''}"
                   onchange="calculateRowTotalEditSimpleMRY('${rowId}')" onblur="calculateRowTotalEditSimpleMRY('${rowId}')"
                   onkeydown="handleArrowNavigationEditSimpleMRY(event, '${rowId}', 1)">
        </td>
        <td>
            <input type="number" class="product-price" step="0.01" placeholder="0.00" value="${productData ? productData.prix_unitaire_ht : ''}"
                   onchange="calculateRowTotalEditSimpleMRY('${rowId}')" onblur="calculateRowTotalEditSimpleMRY('${rowId}')"
                   onkeydown="handleArrowNavigationEditSimpleMRY(event, '${rowId}', 2)">
        </td>
        <td>
            <span class="product-total">${productData ? (productData.total_ht || 0).toFixed(2) : '0.00'} DH</span>
        </td>
        <td>
            <button type="button" class="btn-delete" onclick="deleteProductRowEditSimpleMRY('${rowId}')">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                </svg>
            </button>
        </td>
    `;
    
    tbody.appendChild(row);
    
    if (productData) {
        calculateRowTotalEditSimpleMRY(rowId);
    }
}

// Calculate row total
window.calculateRowTotalEditSimpleMRY = function(rowId) {
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
    calculateTotalsEditSimpleMRY();
}

// Delete product row
window.deleteProductRowEditSimpleMRY = function(rowId) {
    document.getElementById(rowId).remove();
    calculateTotalsEditSimpleMRY();
}

// Calculate totals
window.calculateTotalsEditSimpleMRY = function() {
    const rows = document.querySelectorAll('#editProductsTableBodySimpleMRY tr');
    let totalHT = 0;
    
    rows.forEach(row => {
        const totalText = row.querySelector('.product-total').textContent;
        const cleanText = totalText.replace(/\s/g, '').replace(/,/g, '.').replace('DH', '').trim();
        const total = parseFloat(cleanText) || 0;
        totalHT += total;
    });
    
    const tvaRate = parseFloat(document.getElementById('editTvaRateSimpleMRY').value) || 0;
    const montantTVA = totalHT * (tvaRate / 100);
    const totalTTC = totalHT + montantTVA;
    
    document.getElementById('editTotalHTSimpleMRY').textContent = totalHT.toFixed(2) + ' DH';
    document.getElementById('editMontantTVASimpleMRY').textContent = montantTVA.toFixed(2) + ' DH';
    document.getElementById('editTotalTTCSimpleMRY').textContent = totalTTC.toFixed(2) + ' DH';
}

// Arrow key navigation
window.handleArrowNavigationEditSimpleMRY = function(event, currentRowId, currentCellIndex) {
    if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
        return;
    }
    
    const currentRow = document.getElementById(currentRowId);
    const tbody = document.getElementById('editProductsTableBodySimpleMRY');
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
            addProductRowEditSimpleMRY();
            setTimeout(() => {
                const newRows = Array.from(tbody.querySelectorAll('tr'));
                targetRow = newRows[newRows.length - 1];
                focusCellEditSimpleMRY(targetRow, targetCellIndex);
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
        focusCellEditSimpleMRY(targetRow, targetCellIndex);
    }
};

// Focus cell helper
function focusCellEditSimpleMRY(row, cellIndex) {
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
async function loadAllClientsEditSimpleMRY() {
    try {
        const result = await window.electron.db.getAllClients();
        if (result.success) {
            allClientsEditSimpleMRY = result.data;
        }
    } catch (error) {
        console.error('[MRY] Error loading clients:', error);
    }
}

window.searchClientsEditSimpleMRY = function(query) {
    const dropdown = document.getElementById('clientsDropdownEditSimpleMRY');
    if (!dropdown) return;
    
    if (!query || query.trim().length === 0) {
        filteredClientsEditSimpleMRY = allClientsEditSimpleMRY;
    } else {
        const searchTerm = query.toLowerCase().trim();
        filteredClientsEditSimpleMRY = allClientsEditSimpleMRY.filter(client => 
            client.nom.toLowerCase().includes(searchTerm) || 
            client.ice.toLowerCase().includes(searchTerm)
        );
    }
    displayClientsListEditSimpleMRY();
}

function displayClientsListEditSimpleMRY() {
    const dropdown = document.getElementById('clientsDropdownEditSimpleMRY');
    if (!dropdown) return;
    
    if (filteredClientsEditSimpleMRY.length === 0) {
        dropdown.innerHTML = '<div class="dropdown-item no-results">Aucun client trouvé</div>';
        dropdown.style.display = 'block';
        return;
    }
    
    dropdown.innerHTML = filteredClientsEditSimpleMRY.slice(0, 10).map(client => `
        <div class="dropdown-item" style="display: flex; justify-content: space-between; align-items: center;">
            <div style="flex: 1;" onmousedown="selectClientEditSimpleMRY('${client.nom.replace(/'/g, "\\'")}', '${client.ice}')">
                <div class="client-name">${client.nom}</div>
                <div class="client-ice">ICE: ${client.ice}</div>
            </div>
        </div>
    `).join('');
    dropdown.style.display = 'block';
}

window.showClientsListEditSimpleMRY = function() {
    if (allClientsEditSimpleMRY.length > 0) {
        filteredClientsEditSimpleMRY = allClientsEditSimpleMRY;
        displayClientsListEditSimpleMRY();
    }
}

window.hideClientsListEditSimpleMRY = function() {
    setTimeout(() => {
        const dropdown = document.getElementById('clientsDropdownEditSimpleMRY');
        if (dropdown) dropdown.style.display = 'none';
    }, 200);
}

window.selectClientEditSimpleMRY = function(nom, ice) {
    document.getElementById('editClientNomSimpleMRY').value = nom;
    document.getElementById('editClientICESimpleMRY').value = ice;
    const dropdown = document.getElementById('clientsDropdownEditSimpleMRY');
    if (dropdown) dropdown.style.display = 'none';
}

// Handle form submission
async function handleEditInvoiceSubmitSimpleMRY(e) {
    e.preventDefault();
    
    const loadingNotif = window.notify.loading('Mise à jour en cours...', 'Veuillez patienter');
    
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span>⏳ Enregistrement...</span>';
    submitBtn.disabled = true;
    
    try {
        const documentNumeroValue = document.getElementById('editDocumentNumeroSimpleMRY').value;
        
        const formData = {
            client: {
                nom: document.getElementById('editClientNomSimpleMRY').value,
                ICE: document.getElementById('editClientICESimpleMRY').value
            },
            document: {
                type: currentDocumentTypeSimpleMRY,
                date: document.getElementById('editDocumentDateSimpleMRY').value
            },
            products: [],
            totals: {
                total_ht: parseFloat(document.getElementById('editTotalHTSimpleMRY').textContent.replace(/\s/g, '').replace('DH', '').replace(',', '.')) || 0,
                tva_rate: parseFloat(document.getElementById('editTvaRateSimpleMRY').value) || 20,
                montant_tva: parseFloat(document.getElementById('editMontantTVASimpleMRY').textContent.replace(/\s/g, '').replace('DH', '').replace(',', '.')) || 0,
                total_ttc: parseFloat(document.getElementById('editTotalTTCSimpleMRY').textContent.replace(/\s/g, '').replace('DH', '').replace(',', '.')) || 0
            }
        };
        
        // Set document number
        if (currentDocumentTypeSimpleMRY === 'facture') {
            formData.document.numero = documentNumeroValue;
            formData.document.numero_devis = null;
        } else {
            formData.document.numero_devis = documentNumeroValue;
            formData.document.numero = null;
        }
        
        const numeroOrder = document.getElementById('editDocumentNumeroOrderSimpleMRY');
        if (numeroOrder && numeroOrder.value) {
            formData.document.numero_Order = numeroOrder.value;
        } else {
            formData.document.numero_Order = null;
        }
        
        // Collect products
        const rows = document.querySelectorAll('#editProductsTableBodySimpleMRY tr');
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
        const currentInvoiceResult = await window.electron.db.getInvoiceById(currentInvoiceIdSimpleMRY);
        if (!currentInvoiceResult.success) {
            throw new Error('Impossible de charger les données actuelles de la facture');
        }
        const currentInvoice = currentInvoiceResult.data;
        
        const currentNumero = currentDocumentTypeSimpleMRY === 'facture' 
            ? currentInvoice.document_numero 
            : currentInvoice.document_numero_devis;
        
        const newNumero = currentDocumentTypeSimpleMRY === 'facture'
            ? formData.document.numero
            : formData.document.numero_devis;
        
        if (newNumero !== currentNumero) {
            const allInvoicesResult = await window.electron.db.getAllInvoices();
            if (allInvoicesResult.success) {
                const duplicateNumero = allInvoicesResult.data.find(inv => 
                    inv.id !== currentInvoiceIdSimpleMRY && 
                    inv.document_type === currentDocumentTypeSimpleMRY &&
                    (currentDocumentTypeSimpleMRY === 'facture' 
                        ? inv.document_numero === newNumero
                        : inv.document_numero_devis === newNumero)
                );
                
                if (duplicateNumero) {
                    const docLabel = currentDocumentTypeSimpleMRY === 'facture' ? 'Facture' : 'Devis';
                    throw new Error(`Le N° ${docLabel} "${newNumero}" existe déjà pour ${docLabel.toLowerCase()} #${duplicateNumero.id}!`);
                }
            }
        }
        
        // Update invoice
        const result = await window.electron.db.updateInvoice(currentInvoiceIdSimpleMRY, formData);
        
        if (result.success) {
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
                        currentInvoiceIdSimpleMRY,
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
window.formatEditInvoiceNumberSimpleMRY = function(input) {
    let value = input.value.trim();
    
    // If empty, do nothing
    if (!value) return;
    
    // If already has slash, do nothing
    if (value.includes('/')) return;
    
    // Extract only numbers
    let numbers = value.replace(/[^0-9]/g, '');
    
    if (numbers) {
        const dateInput = document.getElementById('editDocumentDateSimpleMRY');
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

// Initialize page
window.initEditInvoiceSimpleMRYPage = function() {
    console.log('🔄 [MRY] Initializing simple edit invoice page...');
    
    currentInvoiceIdSimpleMRY = localStorage.getItem('editInvoiceIdMRY');
    
    if (!currentInvoiceIdSimpleMRY) {
        window.notify.error('Erreur', 'Aucune facture sélectionnée', 3000);
        router.navigate('/invoices-list-mry');
        return;
    }
    
    setTimeout(() => {
        const form = document.getElementById('editInvoiceFormSimpleMRY');
        if (form) {
            form.addEventListener('submit', handleEditInvoiceSubmitSimpleMRY);
        }
        
        loadAllClientsEditSimpleMRY();
        loadInvoiceDataSimpleMRY(parseInt(currentInvoiceIdSimpleMRY));
    }, 100);
};
