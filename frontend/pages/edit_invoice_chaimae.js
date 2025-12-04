// Edit Invoice Page - Chaimae Company
window.EditInvoiceChaimaePage = function () {
    return `
        <div class="desktop-app">
            <div class="window-header">
                <div class="window-title">
                    <img src="assets/logos/chaimae.png" class="header-logo" alt="Chaimae Company" data-asset="assets/logos/chaimae.png">
                    <span>Chaimae - Modifier une facture</span>
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
                <form id="editInvoiceFormChaimae" class="invoice-form">
                    <!-- Section 1: Client Information -->
                    <div class="invoice-section">
                        <div class="section-header">
                            <h2>📦 Informations du client</h2>
                        </div>
                        <div class="section-body">
                            <div class="form-row">
                                <div class="form-field" style="position: relative;">
                                    <label>Nom du client <span class="required">*</span></label>
                                    <input type="text" id="editClientNomChaimae" placeholder="Rechercher ou saisir un client" 
                                           autocomplete="off" required oninput="searchClientsEditChaimae(this.value)" 
                                           onfocus="showClientsListEditChaimae()" onblur="hideClientsListEditChaimae()">
                                    <div id="clientsDropdownEditChaimae" class="clients-dropdown" style="display: none;"></div>
                                </div>
                                <div class="form-field">
                                    <label>N° ICE</label>
                                    <input type="text" id="editClientICEChaimae" placeholder="Numéro ICE (optionnel)">
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
                                    <input type="text" id="editDocumentTypeChaimae" readonly style="background: #2d2d30; cursor: not-allowed;">
                                </div>
                                <div class="form-field">
                                    <label>Date <span class="required">*</span></label>
                                    <input type="date" id="editDocumentDateChaimae" required>
                                </div>
                            </div>

                            <div class="form-row">
                                <div class="form-field">
                                    <label id="editDocumentNumeroLabelChaimae">N° Document <span class="required">*</span></label>
                                    <input type="text" id="editDocumentNumeroChaimae" required placeholder="Saisir les chiffres" onblur="formatEditInvoiceNumberChaimae(this)">
                                </div>
                            </div>

                            <!-- Optional fields for Facture -->
                            <div id="editOptionalFieldsFactureChaimae" style="display: none;">
                                <div class="form-row">
                                    <div class="form-field">
                                        <label>N° Order (optionnel)</label>
                                        <input type="text" id="editNumeroOrderChaimae" placeholder="Ex: 123">
                                    </div>
                                    <div class="form-field">
                                        <label>Bon de livraison (optionnel)</label>
                                        <input type="text" id="editBonLivraisonChaimae" placeholder="Ex: 123">
                                    </div>
                                </div>
                            </div>

                            <!-- Optional fields for Bon de livraison -->
                            <div id="editOptionalFieldsBonLivraisonChaimae" style="display: none;">
                                <div class="form-row">
                                    <div class="form-field">
                                        <label>N° Order (optionnel)</label>
                                        <input type="text" id="editBonCommandeChaimae" placeholder="Ex: 123">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Section 3: Products -->
                    <div class="invoice-section">
                        <div class="section-header">
                            <h2>📊 Produits et services</h2>
                            <button type="button" class="add-product-btn" onclick="addProductRowEditChaimae()">
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
                                    <tbody id="editProductsTableBodyChaimae">
                                        <!-- Products will be loaded here -->
                                    </tbody>
                                </table>
                            </div>

                            <!-- Summary -->
                            <div class="invoice-summary">
                                <div class="summary-row">
                                    <span>Total HT:</span>
                                    <span id="editTotalHTChaimae">0.00 DH</span>
                                </div>
                                <div class="summary-row">
                                    <span>TVA:</span>
                                    <div class="tva-input">
                                        <input type="number" id="editTvaRateChaimae" value="20" min="0" max="100" onchange="calculateTotalsEditChaimae()">
                                        <span>%</span>
                                    </div>
                                </div>
                                <div class="summary-row">
                                    <span>Montant TVA:</span>
                                    <span id="editMontantTVAChaimae">0.00 DH</span>
                                </div>
                                <div class="summary-row total">
                                    <span>Total TTC:</span>
                                    <span id="editTotalTTCChaimae">0.00 DH</span>
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
                                <textarea id="editInvoiceNotesChaimae" rows="4" 
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
                        <button type="button" class="btn-convert-bottom" onclick="showConvertDocumentTypeModalChaimae()" style="background: #9c27b0; color: white; padding: 0.5rem 1rem; border: none; border-radius: 6px; cursor: pointer; font-weight: 500; font-size: 0.85rem; display: flex; align-items: center; gap: 0.3rem; transition: all 0.3s;" onmouseover="this.style.background='#7b1fa2'; this.style.transform='translateY(-2px)'" onmouseout="this.style.background='#9c27b0'; this.style.transform='translateY(0)'">
                            🔄 <span id="convertButtonTextChaimae">Convertir</span>
                        </button>
                        <div style="display: flex; gap: 0.5rem; margin-left: auto;">
                            <button type="button" class="btn-secondary" onclick="router.navigate('/invoices-list-chaimae')" style="padding: 0.5rem 1rem; font-size: 0.85rem; display: flex; align-items: center; gap: 0.3rem;">
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
let currentInvoiceIdChaimae = null;
let productRowCounterEditChaimae = 0;
let currentDocumentTypeChaimae = null;

// Load invoice data
window.loadInvoiceDataChaimae = async function (invoiceId) {
    try {
        const result = await window.electron.dbChaimae.getInvoiceById(invoiceId);

        if (!result.success || !result.data) {
            throw new Error('Facture introuvable');
        }

        const invoice = result.data;

        currentDocumentTypeChaimae = invoice.document_type;

        document.getElementById('editClientNomChaimae').value = invoice.client_nom;
        document.getElementById('editClientICEChaimae').value = invoice.client_ice;

        let docTypeDisplay = 'Facture';
        if (invoice.document_type === 'devis') {
            docTypeDisplay = 'Devis';
        } else if (invoice.document_type === 'bon_livraison') {
            docTypeDisplay = 'Bon de livraison';
        }
        document.getElementById('editDocumentTypeChaimae').value = docTypeDisplay;
        document.getElementById('editDocumentDateChaimae').value = invoice.document_date;

        const convertBtnText = invoice.document_type === 'facture' ? 'Convertir' : 'Convertir';
        const convertBtn = document.getElementById('convertButtonTextChaimae');
        if (convertBtn) {
            convertBtn.textContent = convertBtnText;
        }

        // Get current document number based on type
        let currentNumero = '';
        if (currentDocumentTypeChaimae === 'facture') {
            currentNumero = invoice.document_numero || '';
        } else if (currentDocumentTypeChaimae === 'devis') {
            currentNumero = invoice.document_numero_devis || '';
        } else if (currentDocumentTypeChaimae === 'bon_livraison') {
            currentNumero = invoice.document_numero_bl || invoice.document_numero || '';
        }

        // Ensure currentNumero is not null or undefined
        if (!currentNumero) {
            currentNumero = '';
        }

        let label = 'N° Document';
        if (currentDocumentTypeChaimae === 'facture') {
            label = 'N° Facture';
        } else if (currentDocumentTypeChaimae === 'bon_livraison') {
            label = 'N° Bon de livraison';
        } else {
            label = 'N° Devis';
        }
        document.getElementById('editDocumentNumeroChaimae').value = currentNumero;
        document.getElementById('editDocumentNumeroLabelChaimae').innerHTML = `${label} <span class="required">*</span>`;

        // Show/hide optional fields based on document type
        const optionalFactureFields = document.getElementById('editOptionalFieldsFactureChaimae');
        const optionalBLFields = document.getElementById('editOptionalFieldsBonLivraisonChaimae');

        console.log('📋 [CHAIMAE EDIT] Document type:', invoice.document_type);

        if (invoice.document_type === 'facture') {
            console.log('✅ [CHAIMAE EDIT] Showing facture optional fields');
            optionalFactureFields.style.display = 'block';
            optionalBLFields.style.display = 'none';
            document.getElementById('editNumeroOrderChaimae').value = invoice.document_numero_Order || '';
            document.getElementById('editBonLivraisonChaimae').value = invoice.document_bon_de_livraison || '';
        } else if (invoice.document_type === 'bon_livraison') {
            console.log('✅ [CHAIMAE EDIT] Showing bon de livraison optional fields');
            optionalFactureFields.style.display = 'none';
            optionalBLFields.style.display = 'block';
            document.getElementById('editBonCommandeChaimae').value = invoice.document_numero_commande || '';
        } else {
            console.log('✅ [CHAIMAE EDIT] Hiding all optional fields (devis)');
            optionalFactureFields.style.display = 'none';
            optionalBLFields.style.display = 'none';
        }

        document.getElementById('editTvaRateChaimae').value = invoice.tva_rate;

        const tbody = document.getElementById('editProductsTableBodyChaimae');
        tbody.innerHTML = '';

        if (invoice.products && invoice.products.length > 0) {
            invoice.products.forEach(product => {
                addProductRowEditChaimae(product);
            });
        }

        calculateTotalsEditChaimae();

        const noteResult = await window.electron.dbChaimae.getNote(invoiceId);
        if (noteResult.success && noteResult.data) {
            const noteTextarea = document.getElementById('editInvoiceNotesChaimae');
            if (noteTextarea) {
                noteTextarea.value = noteResult.data;
            }
        }

    } catch (error) {
        console.error('[Chaimae] Error loading invoice:', error);
        window.notify.error('Erreur', 'Impossible de charger la facture', 3000);
        router.navigate('/invoices-list-chaimae');
    }
}

// Add product row
window.addProductRowEditChaimae = function (productData = null) {
    const tbody = document.getElementById('editProductsTableBodyChaimae');
    const rowId = `edit-product-chaimae-${productRowCounterEditChaimae++}`;

    const row = document.createElement('tr');
    row.id = rowId;
    row.innerHTML = `
        <td>
            <textarea class="product-designation" rows="2" placeholder="Description du produit..." onkeydown="handleArrowNavigationEditChaimae(event, '${rowId}', 0)">${productData ? productData.designation : ''}</textarea>
        </td>
        <td>
            <input type="text" class="product-quantity" placeholder="ex: 50 Kg, F, 10" value="${productData ? productData.quantite : ''}"
                   onchange="calculateRowTotalEditChaimae('${rowId}')" onblur="calculateRowTotalEditChaimae('${rowId}')"
                   onkeydown="handleArrowNavigationEditChaimae(event, '${rowId}', 1)">
        </td>
        <td>
            <input type="number" class="product-price" step="0.01" placeholder="0.00" value="${productData ? productData.prix_unitaire_ht : ''}"
                   onchange="calculateRowTotalEditChaimae('${rowId}')" onblur="calculateRowTotalEditChaimae('${rowId}')"
                   onkeydown="handleArrowNavigationEditChaimae(event, '${rowId}', 2)">
        </td>
        <td>
            <span class="product-total">${productData ? (productData.total_ht || 0).toFixed(2) : '0.00'} DH</span>
        </td>
        <td>
            <button type="button" class="btn-delete" onclick="deleteProductRowEditChaimae('${rowId}')">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                </svg>
            </button>
        </td>
    `;

    tbody.appendChild(row);

    if (productData) {
        calculateRowTotalEditChaimae(rowId);
    }
}

// Calculate row total
window.calculateRowTotalEditChaimae = function (rowId) {
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
    calculateTotalsEditChaimae();
}

// Delete product row
window.deleteProductRowEditChaimae = function (rowId) {
    document.getElementById(rowId).remove();
    calculateTotalsEditChaimae();
}

// Calculate totals
window.calculateTotalsEditChaimae = function () {
    const rows = document.querySelectorAll('#editProductsTableBodyChaimae tr');
    let totalHT = 0;

    rows.forEach(row => {
        const totalText = row.querySelector('.product-total').textContent;
        const cleanText = totalText.replace(/\s/g, '').replace(/,/g, '.').replace('DH', '').trim();
        const total = parseFloat(cleanText) || 0;
        totalHT += total;
    });

    const tvaRate = parseFloat(document.getElementById('editTvaRateChaimae').value) || 0;
    const montantTVA = totalHT * (tvaRate / 100);
    const totalTTC = totalHT + montantTVA;

    document.getElementById('editTotalHTChaimae').textContent = totalHT.toFixed(2) + ' DH';
    document.getElementById('editMontantTVAChaimae').textContent = montantTVA.toFixed(2) + ' DH';
    document.getElementById('editTotalTTCChaimae').textContent = totalTTC.toFixed(2) + ' DH';
}

// Arrow key navigation
window.handleArrowNavigationEditChaimae = function (event, currentRowId, currentCellIndex) {
    if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
        return;
    }

    const currentRow = document.getElementById(currentRowId);
    const tbody = document.getElementById('editProductsTableBodyChaimae');
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
            addProductRowEditChaimae();
            setTimeout(() => {
                const newRows = Array.from(tbody.querySelectorAll('tr'));
                targetRow = newRows[newRows.length - 1];
                focusCellEditChaimae(targetRow, targetCellIndex);
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
        focusCellEditChaimae(targetRow, targetCellIndex);
    }
};

// Focus cell helper
window.focusCellEditChaimae = function (row, cellIndex) {
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
window.loadAllClientsEditChaimae = async function () {
    try {
        const result = await window.electron.dbChaimae.getAllClients();
        if (result.success) {
            allClientsEditChaimae = result.data;
        }
    } catch (error) {
        console.error('[Chaimae] Error loading clients:', error);
    }
}

window.searchClientsEditChaimae = function (query) {
    const dropdown = document.getElementById('clientsDropdownEditChaimae');
    if (!dropdown) return;

    if (!query || query.trim().length === 0) {
        filteredClientsEditChaimae = allClientsEditChaimae;
    } else {
        const searchTerm = query.toLowerCase().trim();
        filteredClientsEditChaimae = allClientsEditChaimae.filter(client =>
            client.nom.toLowerCase().includes(searchTerm) ||
            client.ice.toLowerCase().includes(searchTerm)
        );
    }
    displayClientsListEditChaimae();
}

window.displayClientsListEditChaimae = function () {
    const dropdown = document.getElementById('clientsDropdownEditChaimae');
    if (!dropdown) return;

    if (filteredClientsEditChaimae.length === 0) {
        dropdown.innerHTML = '<div class="dropdown-item no-results">Aucun client trouvé</div>';
        dropdown.style.display = 'block';
        return;
    }

    dropdown.innerHTML = filteredClientsEditChaimae.slice(0, 10).map(client => `
        <div class="dropdown-item" style="display: flex; justify-content: space-between; align-items: center;">
            <div style="flex: 1;" onmousedown="selectClientEditChaimae('${client.nom.replace(/'/g, "\\'")}', '${client.ice}')">
                <div class="client-name">${client.nom}</div>
                <div class="client-ice">ICE: ${client.ice}</div>
            </div>
        </div>
    `).join('');
    dropdown.style.display = 'block';
}

window.showClientsListEditChaimae = function () {
    if (allClientsEditChaimae.length > 0) {
        filteredClientsEditChaimae = allClientsEditChaimae;
        displayClientsListEditChaimae();
    }
}

window.hideClientsListEditChaimae = function () {
    setTimeout(() => {
        const dropdown = document.getElementById('clientsDropdownEditChaimae');
        if (dropdown) dropdown.style.display = 'none';
    }, 200);
}

window.selectClientEditChaimae = function (nom, ice) {
    document.getElementById('editClientNomChaimae').value = nom;
    document.getElementById('editClientICEChaimae').value = ice;
    const dropdown = document.getElementById('clientsDropdownEditChaimae');
    if (dropdown) dropdown.style.display = 'none';
}

// Handle form submission
window.handleEditInvoiceSubmitChaimae = async function (e) {
    e.preventDefault();

    const loadingNotif = window.notify.loading('Mise à jour en cours...', 'Veuillez patienter');

    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span>⏳ Enregistrement...</span>';
    submitBtn.disabled = true;

    try {
        const documentNumeroValue = document.getElementById('editDocumentNumeroChaimae').value;

        const formData = {
            client: {
                nom: document.getElementById('editClientNomChaimae').value,
                ICE: document.getElementById('editClientICEChaimae').value
            },
            document: {
                type: currentDocumentTypeChaimae,
                date: document.getElementById('editDocumentDateChaimae').value
            },
            products: [],
            totals: {
                total_ht: parseFloat(document.getElementById('editTotalHTChaimae').textContent.replace(/\s/g, '').replace('DH', '').replace(',', '.')) || 0,
                tva_rate: parseFloat(document.getElementById('editTvaRateChaimae').value) || 20,
                montant_tva: parseFloat(document.getElementById('editMontantTVAChaimae').textContent.replace(/\s/g, '').replace('DH', '').replace(',', '.')) || 0,
                total_ttc: parseFloat(document.getElementById('editTotalTTCChaimae').textContent.replace(/\s/g, '').replace('DH', '').replace(',', '.')) || 0
            }
        };

        if (currentDocumentTypeChaimae === 'facture') {
            formData.document.numero = documentNumeroValue;
            formData.document.numero_devis = null;
            formData.document.numero_bl = null;
            formData.document.numero_Order = document.getElementById('editNumeroOrderChaimae')?.value || null;
            formData.document.bon_de_livraison = document.getElementById('editBonLivraisonChaimae')?.value || null;
        } else if (currentDocumentTypeChaimae === 'bon_livraison') {
            formData.document.numero_bl = documentNumeroValue;
            formData.document.numero = null;
            formData.document.numero_devis = null;
            formData.document.numero_commande = document.getElementById('editBonCommandeChaimae')?.value || null;
        } else {
            formData.document.numero_devis = documentNumeroValue;
            formData.document.numero = null;
            formData.document.numero_bl = null;
        }

        const rows = document.querySelectorAll('#editProductsTableBodyChaimae tr');
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

        const currentInvoiceResult = await window.electron.dbChaimae.getInvoiceById(currentInvoiceIdChaimae);
        if (!currentInvoiceResult.success) {
            throw new Error('Impossible de charger les données actuelles de la facture');
        }
        const currentInvoice = currentInvoiceResult.data;

        const currentNumero = currentDocumentTypeChaimae === 'facture'
            ? currentInvoice.document_numero
            : currentInvoice.document_numero_devis;

        const newNumero = currentDocumentTypeChaimae === 'facture'
            ? formData.document.numero
            : formData.document.numero_devis;

        if (newNumero !== currentNumero) {
            const allInvoicesResult = await window.electron.dbChaimae.getAllInvoices();
            if (allInvoicesResult.success) {
                const duplicateNumero = allInvoicesResult.data.find(inv =>
                    inv.id !== currentInvoiceIdChaimae &&
                    inv.document_type === currentDocumentTypeChaimae &&
                    (currentDocumentTypeChaimae === 'facture'
                        ? inv.document_numero === newNumero
                        : inv.document_numero_devis === newNumero)
                );

                if (duplicateNumero) {
                    const docLabel = currentDocumentTypeChaimae === 'facture' ? 'Facture' : 'Devis';
                    throw new Error(`Le N° ${docLabel} "${newNumero}" existe déjà pour ${docLabel.toLowerCase()} #${duplicateNumero.id}!`);
                }
            }
        }

        const result = await window.electron.dbChaimae.updateInvoice(currentInvoiceIdChaimae, formData);

        if (result.success) {
            const noteText = document.getElementById('editInvoiceNotesChaimae')?.value?.trim();
            if (noteText) {
                await window.electron.dbChaimae.saveNote(currentInvoiceIdChaimae, noteText);
            }

            const user = JSON.parse(localStorage.getItem('user'));
            if (user && window.electron.dbChaimae.addAuditLog) {
                try {
                    const changes = {
                        client: formData.client,
                        document: formData.document,
                        totals: formData.totals
                    };
                    await window.electron.dbChaimae.addAuditLog(
                        currentInvoiceIdChaimae,
                        'UPDATE',
                        user.id,
                        user.name,
                        user.email,
                        JSON.stringify(changes)
                    );
                    console.log('✅ [AUDIT LOG Chaimae] Audit log entry added');
                } catch (auditError) {
                    console.error('❌ [AUDIT LOG Chaimae] Error adding audit log:', auditError);
                }
            }

            window.notify.remove(loadingNotif);
            window.notify.success('Succès', 'Facture mise à jour avec succès!', 3000);

            setTimeout(() => {
                router.navigate('/invoices-list-chaimae');
            }, 1000);
        } else {
            throw new Error(result.error);
        }
    } catch (error) {
        console.error('[Chaimae] Error updating invoice:', error);
        window.notify.remove(loadingNotif);
        window.notify.error('Erreur', error.message || 'Une erreur est survenue.', 5000);
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

// Format invoice number - add year automatically
window.formatEditInvoiceNumberChaimae = function (input) {
    let value = input.value.trim();

    // If empty, do nothing
    if (!value) return;

    // If already has slash, do nothing
    if (value.includes('/')) return;

    // Extract only numbers
    let numbers = value.replace(/[^0-9]/g, '');

    if (numbers) {
        const dateInput = document.getElementById('editDocumentDateChaimae');
        let year = new Date().getFullYear();

        if (dateInput && dateInput.value) {
            const selectedDate = new Date(dateInput.value);
            year = selectedDate.getFullYear();
        }

        // Format: numbers/year (e.g., 123/2025)
        input.value = `${numbers}/${year}`;
        input.style.color = '#4caf50';
        input.style.fontWeight = '600';
    }
}

// Convert document type - Step 1: Choose new type
window.showConvertDocumentTypeModalChaimae = async function () {
    const currentType = currentDocumentTypeChaimae;

    // Define all available types
    const allTypes = {
        'facture': { label: 'Facture', icon: '📄', color: '#4caf50' },
        'devis': { label: 'Devis', icon: '📋', color: '#9c27b0' },
        'bon_livraison': { label: 'Bon de livraison', icon: '📦', color: '#ff9800' }
    };

    // Get available types (exclude current type)
    const availableTypes = Object.entries(allTypes)
        .filter(([type]) => type !== currentType)
        .map(([type, data]) => ({ type, ...data }));

    // Show modal to choose new type
    const selectedNewType = await showChooseDocumentTypeModalChaimae(currentType, availableTypes);

    if (!selectedNewType) {
        return;
    }

    const newTypeText = allTypes[selectedNewType].label;

    try {
        const result = await window.electron.dbChaimae.getInvoiceById(currentInvoiceIdChaimae);
        if (!result.success || !result.data) {
            throw new Error('Document introuvable');
        }

        const invoice = result.data;
        let currentNumero = currentType === 'facture' ? invoice.document_numero :
            currentType === 'devis' ? invoice.document_numero_devis :
                invoice.document_numero_bl || '';

        // If converting FROM bon_livraison, remove the prefix (e.g., MG454/2025 → 454/2025)
        if (currentType === 'bon_livraison' && currentNumero) {
            // Remove prefix (letters at the beginning)
            currentNumero = currentNumero.replace(/^[A-Z]+/i, '');
        }

        // Ensure currentNumero is not null or undefined
        if (!currentNumero) {
            currentNumero = '';
        }

        console.log('🔄 [CONVERT] Current numero:', currentNumero);
        console.log('🔄 [CONVERT] New type:', selectedNewType);

        // Use current number as prefill (user can modify if needed)
        const inputData = await showConvertInputModalChaimae(selectedNewType, newTypeText, currentNumero);

        if (!inputData) {
            window.notify.warning('Annulé', 'Conversion annulée', 3000);
            return;
        }

        const { newNumero, numeroOrder, bonLivraison } = inputData;

        // Check for duplicate numbers
        const allInvoicesResult = await window.electron.dbChaimae.getAllInvoices();
        if (allInvoicesResult.success) {
            const duplicateNumero = allInvoicesResult.data.find(inv => {
                if (selectedNewType === 'facture') {
                    return inv.document_type === 'facture' && inv.document_numero === newNumero;
                } else if (selectedNewType === 'devis') {
                    return inv.document_type === 'devis' && inv.document_numero_devis === newNumero;
                } else if (selectedNewType === 'bon_livraison') {
                    return inv.document_type === 'bon_livraison' && inv.document_numero_bl === newNumero;
                }
            });

            if (duplicateNumero) {
                const label = allTypes[selectedNewType].label;
                window.notify.error('Erreur', `Ce ${label} existe déjà`, 5000);
                return;
            }
        }

        const user = JSON.parse(localStorage.getItem('user'));

        const newInvoiceData = {
            client: {
                nom: invoice.client_nom || '',
                ICE: invoice.client_ice || ''
            },
            document: {
                type: selectedNewType,
                date: invoice.document_date || new Date().toISOString().split('T')[0],
                numero: selectedNewType === 'facture' ? newNumero : (selectedNewType === 'bon_livraison' ? null : null),
                numero_devis: selectedNewType === 'devis' ? newNumero : null,
                numero_bl: selectedNewType === 'bon_livraison' ? newNumero : null,
                numero_Order: selectedNewType === 'facture' ? (numeroOrder || null) : null,
                numero_commande: selectedNewType === 'bon_livraison' ? (numeroOrder || null) : null,
                bon_de_livraison: selectedNewType === 'facture' ? (bonLivraison || null) : null,
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
                total_ht: invoice.total_ht,
                tva_rate: invoice.tva_rate,
                montant_tva: invoice.montant_tva,
                total_ttc: invoice.total_ttc
            }
        };

        const createResult = await window.electron.dbChaimae.createInvoice(newInvoiceData);

        if (createResult.success) {
            window.notify.success(
                'Succès',
                `${newTypeText} créé(e) avec succès`,
                4000
            );

            setTimeout(() => {
                router.navigate('/invoices-list-chaimae');
            }, 1500);
        } else {
            throw new Error(createResult.error);
        }

    } catch (error) {
        console.error('[Chaimae] Error converting invoice:', error);
        window.notify.error('Erreur', 'Erreur lors de la conversion: ' + error.message, 5000);
    }
}

// Modal to choose document type
window.showChooseDocumentTypeModalChaimae = function (currentType, availableTypes) {
    return new Promise((resolve) => {
        const overlay = document.createElement('div');
        overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.85);display:flex;align-items:center;justify-content:center;z-index:10000;';

        const container = document.createElement('div');
        container.style.cssText = 'background:#1e1e1e;border-radius:12px;padding:2.5rem;max-width:600px;width:90%;box-shadow:0 10px 40px rgba(0,0,0,0.5);';

        container.innerHTML = `
            <div style="text-align:center;margin-bottom:2rem;">
                <div style="font-size:3rem;margin-bottom:0.5rem;">🔄</div>
                <h2 style="color:#fff;margin:0;font-size:1.5rem;font-weight:600;">Choisir le nouveau type</h2>
                <p style="color:#999;margin:0.5rem 0 0 0;font-size:0.95rem;">Sélectionnez le type de document à créer</p>
            </div>
            
            <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(150px, 1fr));gap:1rem;margin-bottom:2rem;">
                ${availableTypes.map(type => `
                    <div onclick="document.querySelector('[data-type-value]').value = '${type.type}'; document.getElementById('confirmTypeBtn').click();"
                         style="padding:1.5rem;background:linear-gradient(135deg, ${type.color}22 0%, ${type.color}11 100%);border:2px solid ${type.color};border-radius:10px;cursor:pointer;text-align:center;transition:all 0.3s;"
                         onmouseover="this.style.background='linear-gradient(135deg, ${type.color}33 0%, ${type.color}22 100%)';this.style.transform='translateY(-5px)';this.style.boxShadow='0 8px 20px ${type.color}40';"
                         onmouseout="this.style.background='linear-gradient(135deg, ${type.color}22 0%, ${type.color}11 100%)';this.style.transform='translateY(0)';this.style.boxShadow='none';">
                        <div style="font-size:2.5rem;margin-bottom:0.5rem;">${type.icon}</div>
                        <div style="color:#fff;font-weight:600;font-size:1.1rem;">${type.label}</div>
                    </div>
                `).join('')}
            </div>
            
            <div style="display:flex;gap:1rem;">
                <button id="cancelTypeBtn" style="flex:1;padding:1rem;background:#3e3e42;color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:1rem;font-weight:600;transition:all 0.3s;"
                        onmouseover="this.style.background='#4e4e52';" onmouseout="this.style.background='#3e3e42';">
                    Annuler
                </button>
                <button id="confirmTypeBtn" style="flex:1;padding:1rem;background:#2196f3;color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:1rem;font-weight:600;transition:all 0.3s;display:none;"
                        onmouseover="this.style.background='#1976d2';" onmouseout="this.style.background='#2196f3';">
                    Confirmer
                </button>
            </div>
            
            <input type="hidden" data-type-value="">
        `;

        overlay.appendChild(container);
        document.body.appendChild(overlay);

        const cancelBtn = document.getElementById('cancelTypeBtn');
        const confirmBtn = document.getElementById('confirmTypeBtn');
        const typeInput = document.querySelector('[data-type-value]');

        cancelBtn.onclick = () => {
            overlay.remove();
            resolve(null);
        };

        confirmBtn.onclick = () => {
            const selectedType = typeInput.value;
            overlay.remove();
            resolve(selectedType);
        };
    });
}

// Confirm dialog
window.showConfirmDialogChaimae = function (message) {
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

// Convert input modal - Step 2: Enter document details
window.showConvertInputModalChaimae = function (newType, newTypeLabel, prefillNumero = '') {
    return new Promise(async (resolve) => {
        let highestNumber = 'Aucun';
        try {
            const invoicesResult = await window.electron.dbChaimae.getAllInvoices();
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
                } else if (newType === 'bon_livraison') {
                    const bonsList = invoices.filter(inv => inv.document_type === 'bon_livraison' && inv.document_numero_bl);
                    if (bonsList.length > 0) {
                        bonsList.sort((a, b) => extractNumber(b.document_numero_bl) - extractNumber(a.document_numero_bl));
                        highestNumber = bonsList[0].document_numero_bl;
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

        // Determine label and color based on type
        const typeConfig = {
            'facture': { label: 'N° Facture', color: '#4caf50' },
            'devis': { label: 'N° Devis', color: '#9c27b0' },
            'bon_livraison': { label: 'N° Bon de livraison', color: '#ff9800' }
        };

        const config = typeConfig[newType] || { label: 'N° Document', color: '#2196f3' };

        container.innerHTML = `
            <div style="text-align:center;margin-bottom:2rem;">
                <div style="font-size:3rem;margin-bottom:0.5rem;">🔄</div>
                <h2 style="color:#fff;margin:0;font-size:1.5rem;font-weight:600;">Convertir en ${newTypeLabel}</h2>
            </div>
            
            ${newType !== 'bon_livraison' ? `
            <div style="margin-bottom:2rem;">
                <label style="display:block;color:${config.color};margin-bottom:0.75rem;font-weight:600;font-size:1.1rem;">${config.label}</label>
                <input type="text" id="convertInputChaimae1" placeholder="Exemple: 548" value="${prefillNumero}"
                       style="width:100%;padding:1rem;background:#2d2d30;border:2px solid #3e3e42;border-radius:8px;color:#fff;font-size:1.1rem;box-sizing:border-box;outline:none;transition:all 0.3s;"
                       onfocus="this.style.borderColor='${config.color}';this.style.background='#1e1e1e';"
                       onblur="this.style.borderColor='#3e3e42';this.style.background='#2d2d30';">
                <small style="color: #999; font-size: 0.85rem; display: block; margin-top: 0.5rem;">Ex: 123 → 123/2025</small>
                ${highestNumber !== 'Aucun' ? `<div style="margin-top:0.5rem;color:${config.color};font-size:0.85rem;font-weight:500;">📌 Plus grand numéro actuel: ${highestNumber}</div>` : ''}
            </div>
            ` : ''}
            
            ${newType === 'facture' ? `
            <div style="margin-bottom:2rem;">
                <label style="display:block;color:#9e9e9e;margin-bottom:0.75rem;font-weight:500;font-size:1rem;">N° Order (optionnel)</label>
                <input type="text" id="convertInputChaimae2" placeholder="Exemple: 555"
                       style="width:100%;padding:1rem;background:#2d2d30;border:2px solid #3e3e42;border-radius:8px;color:#fff;font-size:1.1rem;box-sizing:border-box;outline:none;transition:all 0.3s;"
                       onfocus="this.style.borderColor='#4caf50';this.style.background='#1e1e1e';"
                       onblur="this.style.borderColor='#3e3e42';this.style.background='#2d2d30';">
            </div>
            ` : ''}
            
            ${newType === 'bon_livraison' ? `
            <div style="margin-bottom:2rem;">
                <label style="display:block;color:#ff9800;margin-bottom:0.75rem;font-weight:600;font-size:1.1rem;">📋 N° Bon de livraison</label>
                <div style="display:flex;gap:0.5rem;align-items:flex-start;">
                    <div style="position:relative;flex:0 0 auto;">
                        <input type="text" id="convertPrefixInputChaimae" placeholder="MG" value="${window.selectedPrefix || 'MG'}"
                               style="width:80px;padding:1rem;background:#2d2d30;border:2px solid #3e3e42;border-radius:8px;color:#fff;font-size:1.1rem;outline:none;cursor:pointer;font-weight:600;"
                               readonly onclick="toggleConvertPrefixDropdownChaimae()">
                        <div id="convertPrefixDropdownChaimae" style="display:none;position:absolute;top:100%;left:0;background:linear-gradient(135deg, #1e1e1e 0%, #2d2d30 100%);border:2px solid #667eea;border-radius:12px;margin-top:0.5rem;box-shadow:0 8px 24px rgba(102, 126, 234, 0.3), 0 0 0 1px rgba(102, 126, 234, 0.1);z-index:1000;min-width:200px;max-height:350px;overflow:hidden;">
                            <div style="padding:0.75rem 1rem;background:linear-gradient(90deg, #667eea 0%, #764ba2 100%);border-bottom:2px solid rgba(102, 126, 234, 0.3);">
                                <h4 style="margin:0;color:#fff;font-size:0.95rem;font-weight:600;letter-spacing:0.5px;">📋 Choisir un Prefix</h4>
                            </div>
                            <div id="convertPrefixListChaimae" style="max-height:200px;overflow-y:auto;padding:0.5rem;"></div>
                            <div style="padding:0.75rem;border-top:2px solid rgba(102, 126, 234, 0.2);background:rgba(0,0,0,0.2);">
                                <input type="text" id="convertNewPrefixInputChaimae" placeholder="Nouveau prefix (ex: ABC)"
                                       style="width:100%;padding:0.65rem;background:#1e1e1e;border:2px solid #3e3e42;border-radius:6px;color:#fff;font-size:0.9rem;outline:none;transition:all 0.3s;"
                                       onfocus="this.style.borderColor='#667eea';this.style.boxShadow='0 0 0 3px rgba(102, 126, 234, 0.1)';"
                                       onblur="this.style.borderColor='#3e3e42';this.style.boxShadow='none';"
                                       onkeypress="if(event.key==='Enter'){addConvertNewPrefixChaimae();event.preventDefault();}">
                                <button type="button" onclick="addConvertNewPrefixChaimae()"
                                        style="width:100%;margin-top:0.5rem;padding:0.65rem;background:linear-gradient(90deg, #667eea 0%, #764ba2 100%);color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:0.9rem;font-weight:600;transition:all 0.3s;box-shadow:0 2px 8px rgba(102, 126, 234, 0.3);"
                                        onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 4px 12px rgba(102, 126, 234, 0.4)';"
                                        onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='0 2px 8px rgba(102, 126, 234, 0.3)';">
                                    ➕ Ajouter le Prefix
                                </button>
                            </div>
                        </div>
                    </div>
                    <input type="text" id="convertInputChaimae1" placeholder="123/2025" value="${prefillNumero}"
                           style="flex:1;padding:1rem;background:#2d2d30;border:2px solid #3e3e42;border-radius:8px;color:#fff;font-size:1.1rem;box-sizing:border-box;outline:none;transition:all 0.3s;"
                           onfocus="this.style.borderColor='#ff9800';this.style.background='#1e1e1e';"
                           onblur="this.style.borderColor='#3e3e42';this.style.background='#2d2d30';">
                </div>
                <small style="color:#999;font-size:0.85rem;display:block;margin-top:0.5rem;">Ex: 123 → <span id="convertPrefixExampleChaimae">${window.selectedPrefix || 'MG'}</span>123/2025</small>
            </div>
            <div style="margin-bottom:2rem;">
                <label style="display:block;color:#9e9e9e;margin-bottom:0.75rem;font-weight:500;font-size:1rem;">N° Order (optionnel)</label>
                <input type="text" id="convertInputChaimae2" placeholder="Exemple: 555"
                       style="width:100%;padding:1rem;background:#2d2d30;border:2px solid #3e3e42;border-radius:8px;color:#fff;font-size:1.1rem;box-sizing:border-box;outline:none;transition:all 0.3s;"
                       onfocus="this.style.borderColor='#ff9800';this.style.background='#1e1e1e';"
                       onblur="this.style.borderColor='#3e3e42';this.style.background='#2d2d30';">
            </div>
            ` : ''}
            
            <div style="display:flex;gap:1rem;margin-top:2rem;">
                <button id="convertBtnCancelChaimae" style="flex:1;padding:1rem;background:#3e3e42;color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:1.1rem;font-weight:600;transition:all 0.3s;"
                        onmouseover="this.style.background='#4e4e52';" onmouseout="this.style.background='#3e3e42';">
                    Annuler
                </button>
                <button id="convertBtnConfirmChaimae" style="flex:1;padding:1rem;background:${config.color};color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:1.1rem;font-weight:600;transition:all 0.3s;"
                        onmouseover="this.style.opacity='0.9';" onmouseout="this.style.opacity='1';">
                    ✓ Confirmer
                </button>
            </div>
        `;

        overlay.appendChild(container);
        document.body.appendChild(overlay);

        const input1 = document.getElementById('convertInputChaimae1');
        const input2 = document.getElementById('convertInputChaimae2');
        const input3 = document.getElementById('convertInputChaimae3');
        const btnConfirm = document.getElementById('convertBtnConfirmChaimae');
        const btnCancel = document.getElementById('convertBtnCancelChaimae');

        // Load prefixes if converting to bon_livraison
        if (newType === 'bon_livraison') {
            await loadConvertPrefixesChaimae();
            renderConvertPrefixListChaimae();
        }

        setTimeout(() => input1?.focus(), 100);

        btnConfirm.onclick = () => {
            const newNumero = input1.value.trim();

            if (!newNumero) {
                window.notify.error('Erreur', 'Veuillez saisir un numéro de document', 3000);
                return;
            }

            const numeroOrder = input2 ? input2.value.trim() : '';
            const bonLivraison = input3 ? input3.value.trim() : '';

            overlay.remove();
            resolve({
                newNumero,
                numeroOrder: numeroOrder || null,
                bonLivraison: bonLivraison || null
            });
        };

        btnCancel.onclick = () => {
            overlay.remove();
            resolve(null);
        };
    });
}

// Load prefixes for convert modal
async function loadConvertPrefixesChaimae() {
    try {
        const result = await window.electron.dbChaimae.getAllPrefixes();
        if (result.success && result.data.length > 0) {
            window.bonLivraisonPrefixes = result.data;
            if (!window.selectedPrefix) {
                window.selectedPrefix = result.data[0];
            }
        } else {
            if (!window.bonLivraisonPrefixes) {
                window.bonLivraisonPrefixes = ['MG', 'TL', 'BL'];
                window.selectedPrefix = 'MG';
            }
        }
    } catch (error) {
        console.error('Error loading prefixes:', error);
        if (!window.bonLivraisonPrefixes) {
            window.bonLivraisonPrefixes = ['MG', 'TL', 'BL'];
            window.selectedPrefix = 'MG';
        }
    }
}

// Render prefix list for convert modal
function renderConvertPrefixListChaimae() {
    const listContainer = document.getElementById('convertPrefixListChaimae');
    if (!listContainer) return;

    listContainer.innerHTML = (window.bonLivraisonPrefixes || ['MG', 'TL', 'BL']).map((prefix, index) => `
        <div onclick="selectConvertPrefixChaimae('${prefix}')" 
             style="margin: 0.35rem; padding: 0.75rem 1rem; cursor: pointer; border-radius: 8px; transition: all 0.3s; color: #fff; display: flex; justify-content: space-between; align-items: center; background: ${prefix === window.selectedPrefix ? 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)' : 'rgba(255,255,255,0.05)'}; border: 2px solid ${prefix === window.selectedPrefix ? '#667eea' : 'transparent'}; box-shadow: ${prefix === window.selectedPrefix ? '0 2px 8px rgba(102, 126, 234, 0.3)' : 'none'};"
             onmouseover="if('${prefix}' !== window.selectedPrefix) { this.style.background='rgba(102, 126, 234, 0.2)'; this.style.borderColor='#667eea'; this.style.transform='translateX(5px)'; }" 
             onmouseout="if('${prefix}' !== window.selectedPrefix) { this.style.background='rgba(255,255,255,0.05)'; this.style.borderColor='transparent'; this.style.transform='translateX(0)'; }">
            <div style="display: flex; align-items: center; gap: 0.75rem;">
                <span style="font-size: 1.2rem;">${prefix === window.selectedPrefix ? '✓' : '📌'}</span>
                <span style="font-weight: ${prefix === window.selectedPrefix ? '700' : '500'}; font-size: 1rem; letter-spacing: 1px;">${prefix}</span>
            </div>
            ${(window.bonLivraisonPrefixes || []).length > 1 ? `
                <button onclick="event.stopPropagation(); deleteConvertPrefixChaimae('${prefix}')" 
                        style="background: transparent; color: #e74c3c; border: 2px solid #e74c3c; border-radius: 6px; padding: 0.3rem 0.4rem; cursor: pointer; font-size: 0.9rem; font-weight: 600; transition: all 0.3s; display: flex; align-items: center; justify-content: center;"
                        onmouseover="this.style.background='#e74c3c'; this.style.color='#fff'; this.style.transform='scale(1.05)';"
                        onmouseout="this.style.background='transparent'; this.style.color='#e74c3c'; this.style.transform='scale(1)';">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        <line x1="10" y1="11" x2="10" y2="17"></line>
                        <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                </button>
            ` : ''}
        </div>
    `).join('');
}

// Toggle convert prefix dropdown
window.toggleConvertPrefixDropdownChaimae = function () {
    const dropdown = document.getElementById('convertPrefixDropdownChaimae');
    if (!dropdown) return;

    if (dropdown.style.display === 'none') {
        renderConvertPrefixListChaimae();
        dropdown.style.display = 'block';
    } else {
        dropdown.style.display = 'none';
    }
}

// Select convert prefix
window.selectConvertPrefixChaimae = function (prefix) {
    window.selectedPrefix = prefix;
    const prefixInput = document.getElementById('convertPrefixInputChaimae');
    const prefixExample = document.getElementById('convertPrefixExampleChaimae');

    if (prefixInput) prefixInput.value = prefix;
    if (prefixExample) prefixExample.textContent = prefix;

    const dropdown = document.getElementById('convertPrefixDropdownChaimae');
    if (dropdown) dropdown.style.display = 'none';

    renderConvertPrefixListChaimae();
}

// Add new convert prefix
window.addConvertNewPrefixChaimae = async function () {
    const newPrefixInput = document.getElementById('convertNewPrefixInputChaimae');
    if (!newPrefixInput) return;

    const newPrefix = newPrefixInput.value.trim().toUpperCase();

    if (!newPrefix) {
        window.notify.warning('Attention', 'Veuillez saisir un prefix', 2000);
        return;
    }

    if ((window.bonLivraisonPrefixes || []).includes(newPrefix)) {
        window.notify.warning('Attention', 'Ce prefix existe déjà', 2000);
        return;
    }

    const result = await window.electron.dbChaimae.addPrefix(newPrefix);

    if (result.success) {
        if (!window.bonLivraisonPrefixes) {
            window.bonLivraisonPrefixes = [];
        }
        window.bonLivraisonPrefixes.push(newPrefix);
        window.bonLivraisonPrefixes.sort();
        newPrefixInput.value = '';

        renderConvertPrefixListChaimae();
        window.notify.success('Succès', `Prefix "${newPrefix}" ajouté`, 2000);
    } else {
        window.notify.error('Erreur', result.error || 'Impossible d\'ajouter le prefix', 3000);
    }
}

// Delete convert prefix
window.deleteConvertPrefixChaimae = async function (prefix) {
    if ((window.bonLivraisonPrefixes || []).length <= 1) {
        window.notify.warning('Attention', 'Vous devez garder au moins un prefix', 2000);
        return;
    }

    const result = await window.electron.dbChaimae.deletePrefix(prefix);

    if (result.success) {
        const index = (window.bonLivraisonPrefixes || []).indexOf(prefix);
        if (index > -1) {
            window.bonLivraisonPrefixes.splice(index, 1);

            if (window.selectedPrefix === prefix) {
                window.selectedPrefix = window.bonLivraisonPrefixes[0];
                const prefixInput = document.getElementById('convertPrefixInputChaimae');
                const prefixExample = document.getElementById('convertPrefixExampleChaimae');
                if (prefixInput) prefixInput.value = window.selectedPrefix;
                if (prefixExample) prefixExample.textContent = window.selectedPrefix;
            }

            renderConvertPrefixListChaimae();
            window.notify.success('Succès', `Prefix "${prefix}" supprimé`, 2000);
        }
    } else {
        window.notify.error('Erreur', result.error || 'Impossible de supprimer le prefix', 3000);
    }
}

// Initialize page
window.initEditInvoiceChaimaePage = function () {
    console.log('🔄 [Chaimae] Initializing edit invoice page...');

    currentInvoiceIdChaimae = localStorage.getItem('editInvoiceIdChaimae');

    if (!currentInvoiceIdChaimae) {
        window.notify.error('Erreur', 'Aucune facture sélectionnée', 3000);
        router.navigate('/invoices-list-chaimae');
        return;
    }

    setTimeout(() => {
        const form = document.getElementById('editInvoiceFormChaimae');
        if (form) {
            form.addEventListener('submit', handleEditInvoiceSubmitChaimae);
        }

        loadAllClientsEditChaimae();
        loadInvoiceDataChaimae(parseInt(currentInvoiceIdChaimae));
    }, 100);
};
