// Edit Invoice Page - Multi Company
function EditInvoiceMultiPage() {
    return `
        <div class="desktop-app">
            <div class="window-header">
                <div class="window-title">
                    <img src="assets/logos/multi.png" class="header-logo" alt="Multi Company" data-asset="assets/logos/multi.png">
                    <span>Multi Company - Modifier une facture</span>
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
                <form id="editInvoiceFormMulti" class="invoice-form">
                    <!-- Section 1: Client Information -->
                    <div class="invoice-section">
                        <div class="section-header">
                            <h2>📦 Informations du client</h2>
                        </div>
                        <div class="section-body">
                            <div class="form-row">
                                <div class="form-field" style="position: relative;">
                                    <label>Nom du client <span class="required">*</span></label>
                                    <input type="text" id="editClientNomMulti" placeholder="Rechercher ou saisir un client" 
                                           autocomplete="off" required oninput="searchClientsEditMulti(this.value)" 
                                           onfocus="showClientsListEditMulti()" onblur="hideClientsListEditMulti()">
                                    <div id="clientsDropdownEditMulti" class="clients-dropdown" style="display: none;"></div>
                                </div>
                                <div class="form-field">
                                    <label>N° ICE</label>
                                    <input type="text" id="editClientICEMulti" placeholder="Numéro ICE (optionnel)">
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
                                    <input type="text" id="editDocumentTypeMulti" readonly style="background: #2d2d30; cursor: not-allowed;">
                                </div>
                                <div class="form-field">
                                    <label>Date <span class="required">*</span></label>
                                    <input type="date" id="editDocumentDateMulti" required>
                                </div>
                            </div>

                            <div class="form-row">
                                <div class="form-field">
                                    <label id="editDocumentNumeroLabelMulti">N° Document <span class="required">*</span></label>
                                    <input type="text" id="editDocumentNumeroMulti" required placeholder="Saisir les chiffres (ex: 001)" onblur="formatEditInvoiceNumberMulti(this)">
                                    <small style="color: #999; font-size: 0.85rem; display: block; margin-top: 0.25rem;">Saisir uniquement les chiffres, MTT et l'année seront ajoutés automatiquement</small>
                                </div>
                            </div>
                            
                            <div class="form-row" id="editFieldOrderMulti" style="display: none;">
                                <div class="form-field" style="max-width: 50%;">
                                    <label>📋 N° Order <span style="color: #999; font-size: 0.85rem; font-weight: normal;">(optionnel)</span></label>
                                    <input type="text" id="editDocumentNumeroOrderMulti" placeholder="Ex: 123" style="border: 1px solid #3e3e42;">
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
                            <button type="button" class="add-product-btn" onclick="addProductRowEditMulti()">
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
                                    <tbody id="editProductsTableBodyMulti">
                                        <!-- Products will be loaded here -->
                                    </tbody>
                                </table>
                            </div>

                            <!-- Summary -->
                            <div class="invoice-summary">
                                <div class="summary-row">
                                    <span>Total HT:</span>
                                    <span id="editTotalHTMulti">0.00 DH</span>
                                </div>
                                <div class="summary-row">
                                    <span>TVA:</span>
                                    <div class="tva-input">
                                        <input type="number" id="editTvaRateMulti" value="20" min="0" max="100" onchange="calculateTotalsEditMulti()">
                                        <span>%</span>
                                    </div>
                                </div>
                                <div class="summary-row">
                                    <span>Montant TVA:</span>
                                    <span id="editMontantTVAMulti">0.00 DH</span>
                                </div>
                                <div class="summary-row total">
                                    <span>Total TTC:</span>
                                    <span id="editTotalTTCMulti">0.00 DH</span>
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
                                <textarea id="editInvoiceNotesMulti" rows="4" 
                                          placeholder="Ajoutez des notes ou remarques concernant cette facture..."
                                          style="width: 100%; padding: 0.75rem; background: #2d2d30; border: 2px solid #3e3e42; border-radius: 8px; color: #fff; font-size: 0.95rem; resize: vertical; font-family: inherit;"></textarea>
                                <small style="color: #999; font-size: 0.85rem; display: block; margin-top: 0.5rem;">
                                    Ces notes seront affichées dans le PDF sous le texte de clôture de la facture.
                                </small>
                            </div>
                        </div>
                    </div>

                    <!-- Form Actions -->
                    <div class="form-actions" style="display: flex; justify-content: space-between; align-items: center;">
                        <button type="button" class="btn-convert-bottom" onclick="showConvertDocumentTypeModal()" style="background: #9c27b0; color: white; padding: 0.75rem 1.5rem; border: none; border-radius: 6px; cursor: pointer; font-weight: 500; display: flex; align-items: center; gap: 0.5rem; transition: all 0.3s;" onmouseover="this.style.background='#7b1fa2'" onmouseout="this.style.background='#9c27b0'">
                            🔄 <span id="convertButtonTextMulti">Convertir en Devis</span>
                        </button>
                        <div style="display: flex; gap: 1rem;">
                            <button type="button" class="btn-secondary" onclick="router.navigate('/invoices-list-multi')">
                                <span>← Annuler</span>
                            </button>
                            <button type="submit" class="btn-primary">
                                <span>💾 Enregistrer les modifications</span>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    `;
}

// Global variables for edit
let currentInvoiceIdMulti = null;
let productRowCounterEditMulti = 0;
let allClientsEditMulti = [];
let filteredClientsEditMulti = [];
let currentDocumentTypeMulti = null;
let currentNumeroOrderMulti = null; // Store original N° Order

// Load invoice data
async function loadInvoiceDataMulti(invoiceId) {
    try {
        const result = await window.electron.dbMulti.getInvoiceById(invoiceId);
        
        if (!result.success || !result.data) {
            throw new Error('Facture introuvable');
        }
        
        const invoice = result.data;
        
        // Store current document type and N° Order
        currentDocumentTypeMulti = invoice.document_type;
        currentNumeroOrderMulti = invoice.document_numero_Order?.trim() || null;
        
        // Fill client info
        document.getElementById('editClientNomMulti').value = invoice.client_nom;
        document.getElementById('editClientICEMulti').value = invoice.client_ice;
        
        // Fill document info
        const docTypeDisplay = invoice.document_type === 'facture' ? 'Facture' : 'Devis';
        document.getElementById('editDocumentTypeMulti').value = docTypeDisplay;
        document.getElementById('editDocumentDateMulti').value = invoice.document_date;
        
        // Update convert button text
        const convertBtnText = invoice.document_type === 'facture' ? 'Convertir en Devis' : 'Convertir en Facture';
        const convertBtn = document.getElementById('convertButtonTextMulti');
        if (convertBtn) {
            convertBtn.textContent = convertBtnText;
        }
        
        // Fill document number
        const docNumero = invoice.document_type === 'facture' ? invoice.document_numero : invoice.document_numero_devis;
        document.getElementById('editDocumentNumeroMulti').value = docNumero || '';
        
        const label = invoice.document_type === 'facture' ? 'N° Facture' : 'N° Devis';
        document.getElementById('editDocumentNumeroLabelMulti').innerHTML = `${label} <span class="required">*</span>`;
        
        // Show Order field if facture (always show for facture, even if empty)
        if (invoice.document_type === 'facture') {
            document.getElementById('editFieldOrderMulti').style.display = 'block';
            document.getElementById('editDocumentNumeroOrderMulti').value = invoice.document_numero_Order || '';
        } else {
            document.getElementById('editFieldOrderMulti').style.display = 'none';
        }
        
        // Fill TVA
        document.getElementById('editTvaRateMulti').value = invoice.tva_rate;
        
        // Load products
        const tbody = document.getElementById('editProductsTableBodyMulti');
        tbody.innerHTML = '';
        
        if (invoice.products && invoice.products.length > 0) {
            invoice.products.forEach(product => {
                addProductRowEditMulti(product);
            });
        }
        
        calculateTotalsEditMulti();
        
        // Load notes if any
        const noteResult = await window.electron.dbMulti.getNote(invoiceId);
        if (noteResult.success && noteResult.data) {
            const noteTextarea = document.getElementById('editInvoiceNotesMulti');
            if (noteTextarea) {
                noteTextarea.value = noteResult.data;
            }
        }
        
    } catch (error) {
        console.error('[MULTI] Error loading invoice:', error);
        window.notify.error('Erreur', 'Impossible de charger la facture', 3000);
        router.navigate('/invoices-list-multi');
    }
}

// Handle arrow key navigation in edit products table (Global)
window.handleArrowNavigationEditMulti = function(event, currentRowId, currentCellIndex) {
    // Only handle arrow keys
    if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
        return;
    }
    
    const currentRow = document.getElementById(currentRowId);
    const tbody = document.getElementById('editProductsTableBodyMulti');
    const allRows = Array.from(tbody.querySelectorAll('tr'));
    const currentRowIndex = allRows.indexOf(currentRow);
    
    let targetRow = null;
    let targetCellIndex = currentCellIndex;
    
    // Handle arrow keys
    if (event.key === 'ArrowUp') {
        // Move to row above
        if (currentRowIndex > 0) {
            targetRow = allRows[currentRowIndex - 1];
            event.preventDefault();
        }
    } else if (event.key === 'ArrowDown') {
        // Move to row below
        if (currentRowIndex < allRows.length - 1) {
            targetRow = allRows[currentRowIndex + 1];
            event.preventDefault();
        } else {
            // If on last row, add new row and move to it
            addProductRowEditMulti();
            setTimeout(() => {
                const newRows = Array.from(tbody.querySelectorAll('tr'));
                targetRow = newRows[newRows.length - 1];
                focusCellEditMulti(targetRow, targetCellIndex);
            }, 50);
            event.preventDefault();
            return;
        }
    } else if (event.key === 'ArrowLeft') {
        // Move to cell on the left
        if (currentCellIndex > 0) {
            targetRow = currentRow;
            targetCellIndex = currentCellIndex - 1;
            event.preventDefault();
        }
    } else if (event.key === 'ArrowRight') {
        // Move to cell on the right
        if (currentCellIndex < 2) { // 0=designation, 1=quantity, 2=price
            targetRow = currentRow;
            targetCellIndex = currentCellIndex + 1;
            event.preventDefault();
        }
    }
    
    // Focus the target cell
    if (targetRow) {
        focusCellEditMulti(targetRow, targetCellIndex);
    }
};

// Helper function to focus a specific cell in edit row
function focusCellEditMulti(row, cellIndex) {
    const cells = row.querySelectorAll('td');
    if (cells[cellIndex]) {
        const input = cells[cellIndex].querySelector('textarea, input');
        if (input) {
            input.focus();
            // For text inputs, move cursor to end
            if (input.type === 'text' || input.tagName === 'TEXTAREA') {
                const length = input.value.length;
                input.setSelectionRange(length, length);
            } else if (input.type === 'number') {
                input.select();
            }
        }
    }
}

// Add product row
window.addProductRowEditMulti = function(productData = null) {
    const tbody = document.getElementById('editProductsTableBodyMulti');
    const rowId = `edit-product-multi-${productRowCounterEditMulti++}`;
    
    const row = document.createElement('tr');
    row.id = rowId;
    row.innerHTML = `
        <td>
            <textarea class="product-designation" rows="2" placeholder="Description du produit..." onkeydown="handleArrowNavigationEditMulti(event, '${rowId}', 0)">${productData ? productData.designation : ''}</textarea>
        </td>
        <td>
            <input type="text" class="product-quantity" placeholder="ex: 50 Kg, F, 10" value="${productData ? productData.quantite : ''}"
                   onchange="calculateRowTotalEditMulti('${rowId}')" onblur="calculateRowTotalEditMulti('${rowId}')"
                   onkeydown="handleArrowNavigationEditMulti(event, '${rowId}', 1)">
        </td>
        <td>
            <input type="number" class="product-price" step="0.01" placeholder="0.00" value="${productData ? productData.prix_unitaire_ht : ''}"
                   onchange="calculateRowTotalEditMulti('${rowId}')" onblur="calculateRowTotalEditMulti('${rowId}')"
                   onkeydown="handleArrowNavigationEditMulti(event, '${rowId}', 2)">
        </td>
        <td>
            <span class="product-total">${productData ? (productData.total_ht || 0).toFixed(2) : '0.00'} DH</span>
        </td>
        <td>
            <button type="button" class="btn-delete" onclick="deleteProductRowEditMulti('${rowId}')">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                </svg>
            </button>
        </td>
    `;
    
    tbody.appendChild(row);
    
    if (productData) {
        calculateRowTotalEditMulti(rowId);
    }
}

// Calculate row total
window.calculateRowTotalEditMulti = function(rowId) {
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
    calculateTotalsEditMulti();
}

// Delete product row
window.deleteProductRowEditMulti = function(rowId) {
    document.getElementById(rowId).remove();
    calculateTotalsEditMulti();
}

// Calculate totals
window.calculateTotalsEditMulti = function() {
    const rows = document.querySelectorAll('#editProductsTableBodyMulti tr');
    let totalHT = 0;
    
    rows.forEach(row => {
        const totalText = row.querySelector('.product-total').textContent;
        const cleanText = totalText.replace(/\s/g, '').replace(/,/g, '.').replace('DH', '').trim();
        const total = parseFloat(cleanText) || 0;
        totalHT += total;
    });
    
    const tvaRate = parseFloat(document.getElementById('editTvaRateMulti').value) || 0;
    const montantTVA = totalHT * (tvaRate / 100);
    const totalTTC = totalHT + montantTVA;
    
    document.getElementById('editTotalHTMulti').textContent = totalHT.toFixed(2) + ' DH';
    document.getElementById('editMontantTVAMulti').textContent = montantTVA.toFixed(2) + ' DH';
    document.getElementById('editTotalTTCMulti').textContent = totalTTC.toFixed(2) + ' DH';
}

// Client autocomplete functions
async function loadAllClientsEditMulti() {
    try {
        const result = await window.electron.dbMulti.getAllClients();
        if (result.success) {
            allClientsEditMulti = result.data;
        }
    } catch (error) {
        console.error('[MULTI] Error loading clients:', error);
    }
}

window.searchClientsEditMulti = function(query) {
    const dropdown = document.getElementById('clientsDropdownEditMulti');
    if (!dropdown) return;
    
    if (!query || query.trim().length === 0) {
        filteredClientsEditMulti = allClientsEditMulti;
    } else {
        const searchTerm = query.toLowerCase().trim();
        filteredClientsEditMulti = allClientsEditMulti.filter(client => 
            client.nom.toLowerCase().includes(searchTerm) || 
            client.ice.toLowerCase().includes(searchTerm)
        );
    }
    displayClientsListEditMulti();
}

function displayClientsListEditMulti() {
    const dropdown = document.getElementById('clientsDropdownEditMulti');
    if (!dropdown) return;
    
    if (filteredClientsEditMulti.length === 0) {
        dropdown.innerHTML = '<div class="dropdown-item no-results">Aucun client trouvé</div>';
        dropdown.style.display = 'block';
        return;
    }
    
    dropdown.innerHTML = filteredClientsEditMulti.slice(0, 10).map(client => `
        <div class="dropdown-item" style="display: flex; justify-content: space-between; align-items: center;">
            <div style="flex: 1;" onmousedown="selectClientEditMulti('${client.nom.replace(/'/g, "\\'")}', '${client.ice}')">
                <div class="client-name">${client.nom}</div>
                <div class="client-ice">ICE: ${client.ice}</div>
            </div>
            <button class="delete-client-btn" onclick="event.stopPropagation(); deleteClientEditMulti(${client.id}, '${client.nom.replace(/'/g, "\\'")}');" 
                    style="background: #dc3545; color: white; border: none; padding: 0.4rem 0.5rem; border-radius: 4px; cursor: pointer; margin-left: 0.5rem; display: flex; align-items: center; justify-content: center;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    <line x1="10" y1="11" x2="10" y2="17"></line>
                    <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
            </button>
        </div>
    `).join('');
    dropdown.style.display = 'block';
}

window.showClientsListEditMulti = function() {
    if (allClientsEditMulti.length > 0) {
        filteredClientsEditMulti = allClientsEditMulti;
        displayClientsListEditMulti();
    }
}

window.hideClientsListEditMulti = function() {
    setTimeout(() => {
        const dropdown = document.getElementById('clientsDropdownEditMulti');
        if (dropdown) dropdown.style.display = 'none';
    }, 200);
}

window.selectClientEditMulti = function(nom, ice) {
    document.getElementById('editClientNomMulti').value = nom;
    document.getElementById('editClientICEMulti').value = ice;
    const dropdown = document.getElementById('clientsDropdownEditMulti');
    if (dropdown) dropdown.style.display = 'none';
}

// Delete a client from edit mode
window.deleteClientEditMulti = async function(clientId, clientName) {
    if (!confirm(`هل أنت متأكد من حذف الزبون "${clientName}"؟`)) {
        return;
    }
    
    try {
        const response = await fetch(`http://localhost:3000/api/clients/${clientId}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            window.notify.success('تم الحذف', `تم حذف الزبون "${clientName}" بنجاح`);
            // Reload clients list
            await loadClientsEditMulti();
            // Refresh dropdown
            searchClientsEditMulti(document.getElementById('editClientNomMulti').value);
        } else {
            window.notify.error('خطأ', 'فشل حذف الزبون');
        }
    } catch (error) {
        console.error('Error deleting client:', error);
        window.notify.error('خطأ', 'حدث خطأ أثناء حذف الزبون');
    }
}

// Handle form submission
async function handleEditInvoiceSubmitMulti(e) {
    e.preventDefault();
    
    const loadingNotif = window.notify.loading('Mise à jour en cours...', 'Veuillez patienter');
    
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span>⏳ Enregistrement...</span>';
    submitBtn.disabled = true;
    
    try {
        const documentNumeroValue = document.getElementById('editDocumentNumeroMulti').value;
        
        const formData = {
            company_code: 'MULTI',
            client: {
                nom: document.getElementById('editClientNomMulti').value,
                ICE: document.getElementById('editClientICEMulti').value
            },
            document: {
                type: currentDocumentTypeMulti,
                date: document.getElementById('editDocumentDateMulti').value
            },
            products: [],
            totals: {
                total_ht: parseFloat(document.getElementById('editTotalHTMulti').textContent.replace(/\s/g, '').replace('DH', '').replace(',', '.')) || 0,
                tva_rate: parseFloat(document.getElementById('editTvaRateMulti').value) || 20,
                montant_tva: parseFloat(document.getElementById('editMontantTVAMulti').textContent.replace(/\s/g, '').replace('DH', '').replace(',', '.')) || 0,
                total_ttc: parseFloat(document.getElementById('editTotalTTCMulti').textContent.replace(/\s/g, '').replace('DH', '').replace(',', '.')) || 0
            }
        };
        
        // Set document number in correct field based on type
        if (currentDocumentTypeMulti === 'facture') {
            formData.document.numero = documentNumeroValue;
            formData.document.numero_devis = null;
        } else {
            formData.document.numero_devis = documentNumeroValue;
            formData.document.numero = null;
        }
        
        const numeroOrder = document.getElementById('editDocumentNumeroOrderMulti');
        if (numeroOrder && numeroOrder.value) {
            formData.document.numero_Order = numeroOrder.value;
        } else {
            formData.document.numero_Order = null;
        }
        
        const rows = document.querySelectorAll('#editProductsTableBodyMulti tr');
        rows.forEach(row => {
            const designation = row.querySelector('.product-designation').value.trim();
            const quantityOriginal = row.querySelector('.product-quantity').value.trim();
            const price = parseFloat(row.querySelector('.product-price').value) || 0;
            
            // For calculation: convert F to 1
            let quantityForCalc = quantityOriginal;
            if (quantityForCalc.toUpperCase() === 'F') {
                quantityForCalc = '1';
            }
            
            const qty = parseFloat(quantityForCalc) || 0;
            const total_ht = qty * price;
            
            if (designation) {
                formData.products.push({
                    designation,
                    quantite: quantityOriginal || '0',  // Save original value (F, 10 Kg, etc.)
                    prix_unitaire_ht: price,
                    total_ht: total_ht
                });
            }
        });
        
        // Get current invoice data to check what changed
        const currentInvoiceResult = await window.electron.dbMulti.getInvoiceById(currentInvoiceIdMulti);
        if (!currentInvoiceResult.success) {
            throw new Error('Impossible de charger les données actuelles de la facture');
        }
        const currentInvoice = currentInvoiceResult.data;
        
        // Get current document number based on type
        const currentNumero = currentDocumentTypeMulti === 'facture' 
            ? currentInvoice.document_numero 
            : currentInvoice.document_numero_devis;
        
        // Get new document number from correct field
        const newNumero = currentDocumentTypeMulti === 'facture'
            ? formData.document.numero
            : formData.document.numero_devis;
        
        // Check for duplicate document number only if it changed
        if (newNumero !== currentNumero) {
            const allInvoicesResult = await window.electron.dbMulti.getAllInvoices();
            if (allInvoicesResult.success) {
                const duplicateNumero = allInvoicesResult.data.find(inv => 
                    inv.id !== currentInvoiceIdMulti && 
                    inv.document_type === currentDocumentTypeMulti &&
                    (currentDocumentTypeMulti === 'facture' 
                        ? inv.document_numero === newNumero
                        : inv.document_numero_devis === newNumero)
                );
                
                if (duplicateNumero) {
                    const docLabel = currentDocumentTypeMulti === 'facture' ? 'Facture' : 'Devis';
                    throw new Error(`Le N° ${docLabel} "${newNumero}" existe déjà pour ${docLabel.toLowerCase()} #${duplicateNumero.id}!`);
                }
            }
        }
        
        // Check for duplicate N° Order if provided (for FACTURE only)
        if (currentDocumentTypeMulti === 'facture' && formData.document.numero_Order) {
            const newOrder = formData.document.numero_Order.trim();
            
            // Only check if the value actually changed
            if (newOrder !== currentNumeroOrderMulti) {
                const allInvoicesResult = await window.electron.dbMulti.getAllInvoices();
                if (allInvoicesResult.success) {
                    const duplicateOrder = allInvoicesResult.data.find(inv => 
                        inv.id !== currentInvoiceIdMulti && 
                        inv.document_type === 'facture' &&
                        inv.document_numero_Order && 
                        inv.document_numero_Order.trim() === newOrder
                    );
                    
                    if (duplicateOrder) {
                        throw new Error(`Le N° Order "${formData.document.numero_Order}" existe déjà pour la facture #${duplicateOrder.id}!`);
                    }
                }
            }
        }
        
        const result = await window.electron.dbMulti.updateInvoice(currentInvoiceIdMulti, formData);
        
        if (result.success) {
            // Save notes if any
            const noteText = document.getElementById('editInvoiceNotesMulti')?.value?.trim();
            if (noteText) {
                await window.electron.dbMulti.saveNote(currentInvoiceIdMulti, noteText);
            }
            
            window.notify.remove(loadingNotif);
            window.notify.success('Succès', 'Facture mise à jour avec succès!', 3000);
            
            setTimeout(() => {
                router.navigate('/invoices-list-multi');
            }, 1000);
        } else {
            throw new Error(result.error);
        }
    } catch (error) {
        console.error('[MULTI] Error updating invoice:', error);
        window.notify.remove(loadingNotif);
        window.notify.error('Erreur', error.message || 'Une erreur est survenue.', 5000);
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

// Show input modal for conversion
function showConvertInputModalMulti(newType, newTypeLabel, prefillNumero = '') {
    return new Promise(async (resolve) => {
        // Get highest number for the target type
        let highestNumber = 'Aucun';
        try {
            const invoicesResult = await window.electron.dbMulti.getAllInvoices('MULTI');
            if (invoicesResult.success && invoicesResult.data && invoicesResult.data.length > 0) {
                const invoices = invoicesResult.data;
                
                // Helper function to extract numeric value
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
            <style>
                #convertInputMulti1:focus, #convertInputMulti2:focus {
                    border-color: #2196F3 !important;
                    background: #1e1e1e !important;
                }
            </style>
            <div style="text-align:center;margin-bottom:2rem;">
                <div style="font-size:3rem;margin-bottom:0.5rem;">🔄</div>
                <h2 style="color:#fff;margin:0;font-size:1.5rem;font-weight:600;">Convertir en ${newTypeLabel}</h2>
            </div>
            
            <div style="margin-bottom:2rem;">
                <label style="display:block;color:#2196F3;margin-bottom:0.75rem;font-weight:600;font-size:1.1rem;">${newType === 'facture' ? 'N° Facture' : 'N° Devis'}</label>
                <input type="text" id="convertInputMulti1" placeholder="Exemple: 548" value="${prefillNumero}"
                       style="width:100%;padding:1rem;background:#2d2d30;border:2px solid #3e3e42;border-radius:8px;color:#fff;font-size:1.1rem;box-sizing:border-box;outline:none;transition:all 0.3s;"
                       onblur="formatEditInvoiceNumberMulti(this)">
                <small style="color: #999; font-size: 0.85rem; display: block; margin-top: 0.25rem;">Saisir uniquement les chiffres, MTT et l'année seront ajoutés automatiquement</small>
                ${highestNumber !== 'Aucun' ? `<div style="margin-top:0.5rem;color:${newType === 'facture' ? '#4caf50' : '#9c27b0'};font-size:0.85rem;font-weight:500;">📌 Plus grand numéro actuel: ${highestNumber}</div>` : ''}
            </div>
            
            ${newType === 'facture' ? `
            <div style="margin-bottom:2rem;">
                <label style="display:block;color:#9e9e9e;margin-bottom:0.75rem;font-weight:500;font-size:1rem;">N° Order (optionnel)</label>
                <input type="text" id="convertInputMulti2" placeholder="Exemple: 555"
                       style="width:100%;padding:1rem;background:#2d2d30;border:2px solid #3e3e42;border-radius:8px;color:#fff;font-size:1.1rem;box-sizing:border-box;outline:none;transition:all 0.3s;">
            </div>
            ` : ''}
            
            <div style="display:flex;gap:1rem;margin-top:2rem;">
                <button id="convertBtnCancelMulti" style="flex:1;padding:1rem;background:#3e3e42;color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:1.1rem;font-weight:600;transition:all 0.3s;">
                    Annuler
                </button>
                <button id="convertBtnConfirmMulti" style="flex:1;padding:1rem;background:#2196f3;color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:1.1rem;font-weight:600;transition:all 0.3s;">
                    ✓ Confirmer
                </button>
            </div>
        `;
        
        overlay.appendChild(container);
        document.body.appendChild(overlay);
        
        const input1 = document.getElementById('convertInputMulti1');
        const input2 = document.getElementById('convertInputMulti2');
        const btnConfirm = document.getElementById('convertBtnConfirmMulti');
        const btnCancel = document.getElementById('convertBtnCancelMulti');
        
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
        
        // Removed overlay.onclick to prevent closing when clicking outside
        // Modal should only close via Cancel or Confirm buttons
    });
}

// Custom confirm dialog for Multi
function showConfirmDialogMulti(message) {
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
        
        // Removed overlay.onclick to prevent closing when clicking outside
        // Dialog should only close via Yes or No buttons
    });
}

// Convert invoice type - Create NEW document
window.showConvertDocumentTypeModal = async function() {
    console.log('🔄 [CONVERT MULTI] Starting conversion...');
    
    const currentType = currentDocumentTypeMulti;
    const newType = currentType === 'facture' ? 'devis' : 'facture';
    const currentTypeText = currentType === 'facture' ? 'Facture' : 'Devis';
    const newTypeText = newType === 'facture' ? 'Facture' : 'Devis';
    
    const confirmMsg = `Voulez-vous vraiment convertir ce ${currentTypeText} en ${newTypeText} ?<br><br>Cela créera un nouveau document avec les mêmes produits.`;
    const confirmed = await showConfirmDialogMulti(confirmMsg);
    
    if (!confirmed) return;
    
    try {
        // Get current invoice data
        const result = await window.electron.dbMulti.getInvoiceById(currentInvoiceIdMulti);
        if (!result.success || !result.data) {
            throw new Error('Document introuvable');
        }
        
        const invoice = result.data;
        
        // Get current document number
        let currentNumero = '';
        if (currentType === 'facture') {
            currentNumero = invoice.document_numero || '';
        } else if (currentType === 'devis') {
            currentNumero = invoice.document_numero_devis || '';
        }
        
        // Show input modal for new document numbers
        const inputData = await showConvertInputModalMulti(newType, newTypeText, currentNumero);
        
        if (!inputData) {
            window.notify.warning('Annulé', 'Conversion annulée', 3000);
            return;
        }
        
        const { newNumero, newNumeroOrder } = inputData;
        
        // Check if numbers are unique
        const allInvoicesResult = await window.electron.dbMulti.getAllInvoices('MULTI');
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
            
            if (newType === 'facture' && newNumeroOrder) {
                const duplicateOrder = allInvoicesResult.data.find(inv => 
                    inv.document_type === 'facture' &&
                    inv.document_numero_Order === newNumeroOrder
                );
                
                if (duplicateOrder) {
                    window.notify.error('Erreur', `Ce N° Order existe déjà`, 5000);
                    return;
                }
            }
        }
        
        // Prepare data for new document
        const newInvoiceData = {
            company_code: 'MULTI',
            client: {
                nom: invoice.client_nom || '',
                ICE: invoice.client_ice || ''
            },
            document: {
                type: newType,
                date: invoice.document_date || new Date().toISOString().split('T')[0],
                numero: newType === 'facture' ? newNumero : null,
                numero_devis: newType === 'devis' ? newNumero : null,
                numero_Order: newType === 'facture' ? newNumeroOrder : null
            },
            products: (invoice.products || []).map(p => ({
                designation: p.designation || '',
                quantite: p.quantite || 0,
                prix_unitaire_ht: p.prix_unitaire_ht || 0,
                total_ht: p.total_ht || 0
            })),
            totals: {
                total_ht: invoice.total_ht,
                tva_rate: invoice.tva_rate,
                montant_tva: invoice.montant_tva,
                total_ttc: invoice.total_ttc
            }
        };
        
        // Create new invoice
        const createResult = await window.electron.dbMulti.createInvoice(newInvoiceData);
        
        if (createResult.success) {
            window.notify.success(
                'Succès',
                `${newTypeText} créé(e) avec succès à partir du ${currentTypeText}`,
                4000
            );
            
            // Navigate to invoices list
            setTimeout(() => {
                router.navigate('/invoices-list-multi');
            }, 1500);
        } else {
            throw new Error(createResult.error);
        }
        
    } catch (error) {
        console.error('[MULTI] Error converting invoice:', error);
        window.notify.error('Erreur', 'Erreur lors de la conversion: ' + error.message, 5000);
    }
}

// Format invoice number on blur - add MTT prefix and year suffix
window.formatEditInvoiceNumberMulti = function(input) {
    let value = input.value.trim();
    
    // Check if already fully formatted (MTT + numbers + year)
    if (value.startsWith('MTT') && /MTT\d+\d{4}$/.test(value)) {
        input.style.color = '#4caf50';
        input.style.fontWeight = '600';
        return; // Already formatted correctly
    }
    
    // Remove MTT and year if user added them
    value = value.replace(/^MTT/i, '').replace(/\d{4}$/, '').trim();
    
    if (value) {
        const currentYear = new Date().getFullYear();
        // Format: MTT + numbers + year
        input.value = `MTT${value}${currentYear}`;
        input.style.color = '#4caf50';
        input.style.fontWeight = '600';
    }
}

// Initialize page
window.initEditInvoiceMultiPage = function() {
    console.log('🔄 [MULTI] Initializing edit invoice page...');
    
    currentInvoiceIdMulti = localStorage.getItem('editInvoiceIdMulti');
    
    if (!currentInvoiceIdMulti) {
        window.notify.error('Erreur', 'Aucune facture sélectionnée', 3000);
        router.navigate('/invoices-list-multi');
        return;
    }
    
    setTimeout(() => {
        const form = document.getElementById('editInvoiceFormMulti');
        if (form) {
            form.addEventListener('submit', handleEditInvoiceSubmitMulti);
        }
        
        loadAllClientsEditMulti();
        loadInvoiceDataMulti(parseInt(currentInvoiceIdMulti));
    }, 100);
};
