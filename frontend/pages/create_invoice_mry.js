// Create Invoice Page - MRY Company
function CreateInvoiceMRYPage() {
    return `
        <div class="desktop-app">
            <div class="window-header">
                <div class="window-title">
                    <img src="assets/logos/mry.png" class="header-logo" alt="MRY Company" data-asset="assets/logos/mry.png">
                    <span>MRY TRAV SARL (AU) - Créer une facture</span>
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
                <form id="invoiceForm" class="invoice-form">
                    <!-- Section 1: Client Information -->
                    <div class="invoice-section">
                        <div class="section-header">
                            <h2>📦 Informations du client</h2>
                        </div>
                        <div class="section-body">
                            <div class="form-row">
                                <div class="form-field" style="position: relative;">
                                    <label>Nom du client <span class="required">*</span></label>
                                    <input type="text" id="clientNom" placeholder="Rechercher ou saisir un client" 
                                           autocomplete="off" required oninput="searchClients(this.value)" 
                                           onfocus="showClientsList()" onblur="hideClientsList()">
                                    <div id="clientsDropdown" class="clients-dropdown" style="display: none;"></div>
                                </div>
                                <div class="form-field">
                                    <label>N° ICE <span class="required">*</span></label>
                                    <input type="text" id="clientICE" placeholder="Numéro ICE" required>
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
                                    <select id="documentType" required onchange="handleDocumentTypeChange()">
                                        <option value="">Sélectionner...</option>
                                        <option value="facture">Facture</option>
                                        <option value="devis">Devis</option>
                                    </select>
                                </div>
                                <div class="form-field">
                                    <label>Date <span class="required">*</span></label>
                                    <input type="date" id="documentDate" required>
                                </div>
                            </div>

                            <!-- Dynamic Fields Container -->
                            <div id="dynamicFields"></div>
                        </div>
                    </div>

                    <!-- Section 3: Attachments -->
                    <div class="invoice-section">
                        <div class="section-header">
                            <h2>📎 Pièces jointes</h2>
                        </div>
                        <div class="section-body">
                            <div class="file-upload-area">
                                <input type="file" id="fileInput" accept=".png,.jpg,.jpeg,.pdf" multiple style="display: none;">
                                <button type="button" class="upload-btn" onclick="document.getElementById('fileInput').click()">
                                    <span>📁 Choisir des fichiers (PNG, JPG, PDF)</span>
                                </button>
                                <div id="filesList" class="files-list"></div>
                            </div>
                        </div>
                    </div>

                    <!-- Section 4: Products -->
                    <div class="invoice-section">
                        <div class="section-header">
                            <h2>📊 Produits et services</h2>
                            <button type="button" class="add-product-btn" onclick="addProductRow()">
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
                                    <tbody id="productsTableBody">
                                        <!-- Products will be added here -->
                                    </tbody>
                                </table>
                            </div>

                            <!-- Summary -->
                            <div class="invoice-summary">
                                <div class="summary-row">
                                    <span>Total HT:</span>
                                    <span id="totalHT">0.00 DH</span>
                                </div>
                                <div class="summary-row">
                                    <span>TVA:</span>
                                    <div class="tva-input">
                                        <input type="number" id="tvaRate" value="20" min="0" max="100" onchange="calculateTotals()">
                                        <span>%</span>
                                    </div>
                                </div>
                                <div class="summary-row">
                                    <span>Montant TVA:</span>
                                    <span id="montantTVA">0.00 DH</span>
                                </div>
                                <div class="summary-row total">
                                    <span>Total TTC:</span>
                                    <span id="totalTTC">0.00 DH</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Section 5: Notes -->
                    <div class="invoice-section">
                        <div class="section-header">
                            <h2>📝 Notes</h2>
                        </div>
                        <div class="section-body">
                            <div class="form-field">
                                <label>Notes supplémentaires (optionnel)</label>
                                <textarea id="invoiceNotesMRY" rows="4" 
                                          placeholder="Ajoutez des notes ou remarques concernant cette facture..."
                                          style="width: 100%; padding: 0.75rem; background: #2d2d30; border: 2px solid #3e3e42; border-radius: 8px; color: #fff; font-size: 0.95rem; resize: vertical; font-family: inherit;"></textarea>
                                <small style="color: #999; font-size: 0.85rem; display: block; margin-top: 0.5rem;">
                                    Ces notes seront affichées dans le PDF sous le texte de clôture de la facture.
                                </small>
                            </div>
                        </div>
                    </div>

                    <!-- Form Actions -->
                    <div class="form-actions">
                        <button type="button" class="btn-secondary" onclick="router.navigate('/dashboard-mry')">
                            <span>← Annuler</span>
                        </button>
                        <button type="submit" class="btn-primary">
                            <span>💾 Enregistrer</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `;
}

// Handle document type change (Global)
window.handleDocumentTypeChange = async function() {
    const type = document.getElementById('documentType').value;
    const container = document.getElementById('dynamicFields');
    
    if (!type) {
        container.innerHTML = '';
        return;
    }

    // Get last numbers from database for all fields
    let lastNumbers = {
        main: 'Aucun',
        order: 'Aucun'
    };
    
    try {
        const invoicesResult = await window.electron.db.getAllInvoices('MRY');
        if (invoicesResult.success && invoicesResult.data && invoicesResult.data.length > 0) {
            const invoices = invoicesResult.data;
            
            // Get last main number based on type
            if (type === 'facture') {
                const lastFacture = invoices.find(inv => inv.document_numero);
                if (lastFacture) lastNumbers.main = lastFacture.document_numero;
                
                // Get last N° Order
                const lastOrder = invoices.find(inv => inv.document_numero_Order);
                if (lastOrder) lastNumbers.order = lastOrder.document_numero_Order;
            } else if (type === 'devis') {
                const lastDevis = invoices.find(inv => inv.document_numero_devis);
                if (lastDevis) lastNumbers.main = lastDevis.document_numero_devis;
            }
        }
    } catch (error) {
        console.error('Error getting last numbers:', error);
    }

    let html = '<div class="form-row">';

    if (type === 'facture') {
        html += `
            <div class="form-field">
                <label>N° Facture <span class="required">*</span></label>
                <div style="display: flex; gap: 0.5rem; align-items: stretch;">
                    <input type="text" id="documentNumero" placeholder="Ex: 123" required 
                           onblur="autoFormatDocumentNumberOnBlur(this)" style="flex: 1;">
                    <button type="button" onclick="showMissingNumbersMRY()" 
                            style="padding: 0.75rem 1rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #fff; border: none; border-radius: 8px; cursor: pointer; font-size: 1.1rem; transition: all 0.3s; box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3); display: flex; align-items: center; justify-content: center; min-width: 50px;"
                            onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 12px rgba(102, 126, 234, 0.5)';"
                            onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 8px rgba(102, 126, 234, 0.3)';"
                            title="Voir les numéros manquants">
                        🔍
                    </button>
                </div>
                <small style="color: #999; font-size: 0.85rem;">Ex: 123 → 123/2025</small>
                ${lastNumbers.main !== 'Aucun' ? `<small style="color: #4caf50; font-size: 0.8rem; display: block; margin-top: 0.25rem;">📌 Dernier numéro: ${lastNumbers.main}</small>` : ''}
            </div>
        `;
        html += '</div>';
        
        // Optional field with toggle
        const selectedMryOrderPrefix = window.selectedMryOrderPrefix || window.mryOrderPrefixes?.[0] || '';
        html += `
            <div class="form-row optional-field">
                <div class="toggle-container">
                    <label class="toggle-label">
                        <input type="checkbox" id="toggleOrder" onchange="toggleOptionalField('Order')">
                        <span class="toggle-switch"></span>
                        <span class="toggle-text">N° Order</span>
                    </label>
                </div>
                <div class="form-field" id="fieldOrder" style="display: none; position: relative;">
                    <label>N° Order</label>
                    <div style="display: flex; gap: 0.5rem; align-items: flex-start;">
                        <div style="position: relative; flex: 0 0 auto;">
                            <input type="text" id="mryOrderPrefixInput" value="${selectedMryOrderPrefix}" placeholder="" 
                                   style="width: 80px; padding: 0.75rem; background: #2d2d30; border: 2px solid #3e3e42; border-radius: 8px; color: #fff; font-size: 1rem; outline: none; cursor: pointer; font-weight: 600;"
                                   readonly onclick="toggleMryOrderPrefixDropdown()">
                            <div id="mryOrderPrefixDropdown" style="display: none; position: absolute; top: 100%; left: 0; background: linear-gradient(135deg, #1e1e1e 0%, #2d2d30 100%); border: 2px solid #2196f3; border-radius: 12px; margin-top: 0.5rem; box-shadow: 0 8px 24px rgba(33, 150, 243, 0.3), 0 0 0 1px rgba(33, 150, 243, 0.1); z-index: 1000; min-width: 200px; max-height: 350px; overflow: hidden;">
                                <div style="padding: 0.75rem 1rem; background: linear-gradient(90deg, #2196f3 0%, #1976d2 100%); border-bottom: 2px solid rgba(33, 150, 243, 0.3);">
                                    <h4 style="margin: 0; color: #fff; font-size: 0.95rem; font-weight: 600; letter-spacing: 0.5px;">📋 Choisir un Prefix</h4>
                                </div>
                                <div id="mryOrderPrefixList" style="max-height: 200px; overflow-y: auto; padding: 0.5rem;"></div>
                                <div style="padding: 0.75rem; border-top: 2px solid rgba(33, 150, 243, 0.2); background: rgba(0,0,0,0.2);">
                                    <input type="text" id="newMryOrderPrefixInput" placeholder="Nouveau prefix (ex: ORD)" 
                                           style="width: 100%; padding: 0.65rem; background: #1e1e1e; border: 2px solid #3e3e42; border-radius: 6px; color: #fff; font-size: 0.9rem; outline: none; transition: all 0.3s;"
                                           onfocus="this.style.borderColor='#2196f3'; this.style.boxShadow='0 0 0 3px rgba(33, 150, 243, 0.1)';"
                                           onblur="this.style.borderColor='#3e3e42'; this.style.boxShadow='none';"
                                           onkeypress="if(event.key==='Enter'){addNewMryOrderPrefix(); event.preventDefault();}">
                                    <button type="button" onclick="addNewMryOrderPrefix()" 
                                            style="width: 100%; margin-top: 0.5rem; padding: 0.65rem; background: linear-gradient(90deg, #2196f3 0%, #1976d2 100%); color: #fff; border: none; border-radius: 6px; cursor: pointer; font-size: 0.9rem; font-weight: 600; transition: all 0.3s; box-shadow: 0 2px 8px rgba(33, 150, 243, 0.3);"
                                            onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 12px rgba(33, 150, 243, 0.4)';"
                                            onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 8px rgba(33, 150, 243, 0.3)';">
                                        ➕ Ajouter le Prefix
                                    </button>
                                </div>
                            </div>
                        </div>
                        <input type="text" id="documentNumeroOrder" placeholder="123" 
                               style="flex: 1; padding: 0.75rem; background: #2d2d30; border: 2px solid #3e3e42; border-radius: 8px; color: #fff; font-size: 1rem; outline: none;">
                    </div>
                    <small style="color: #999; font-size: 0.85rem; display: block; margin-top: 0.5rem;">Ex: 123 → <span id="mryOrderPrefixExample"></span>123</small>
                    ${lastNumbers.order !== 'Aucun' ? `<small style="color: #2196f3; font-size: 0.8rem; display: block; margin-top: 0.25rem;">📌 Dernier N° Order: ${lastNumbers.order}</small>` : ''}
                </div>
            </div>
        `;
    } else if (type === 'devis') {
        html += `
            <div class="form-field">
                <label>N° Devis<span class="required">*</span></label>
                <div style="display: flex; gap: 0.5rem; align-items: stretch;">
                    <input type="text" id="documentNumero" placeholder="Ex: 123" required 
                           onblur="autoFormatDocumentNumberOnBlur(this)" style="flex: 1;">
                    <button type="button" onclick="showMissingDevisNumbersMRY()" 
                            style="padding: 0.75rem 1rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #fff; border: none; border-radius: 8px; cursor: pointer; font-size: 1.1rem; transition: all 0.3s; box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3); display: flex; align-items: center; justify-content: center; min-width: 50px;"
                            onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 12px rgba(102, 126, 234, 0.5)';"
                            onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 8px rgba(102, 126, 234, 0.3)';"
                            title="Voir les numéros manquants">
                        🔍
                    </button>
                </div>
                <small style="color: #999; font-size: 0.85rem;">Ex: 123 → 123/2025</small>
                ${lastNumbers.main !== 'Aucun' ? `<small style="color: #9c27b0; font-size: 0.8rem; display: block; margin-top: 0.25rem;">📌 Dernier numéro: ${lastNumbers.main}</small>` : ''}
            </div>
        `;
        html += '</div>';
    }

    container.innerHTML = html;
}

// Use suggested number (Global)
window.useSuggestedNumber = function(number) {
    const input = document.getElementById('documentNumero');
    if (input) {
        input.value = number;
        input.focus();
        
        // Visual feedback
        input.style.background = 'rgba(102, 126, 234, 0.1)';
        input.style.borderColor = '#667eea';
        setTimeout(() => {
            input.style.background = '';
            input.style.borderColor = '';
        }, 1000);
    }
}

// Toggle optional field visibility (Global)
window.toggleOptionalField = function(fieldName) {
    const checkbox = document.getElementById(`toggle${fieldName}`);
    const field = document.getElementById(`field${fieldName}`);
    const input = document.getElementById(`documentNumero${fieldName}`);
    
    if (checkbox.checked) {
        field.style.display = 'block';
        input.required = false;
    } else {
        field.style.display = 'none';
        input.value = '';
        input.required = false;
    }
}

// Auto-format document number on blur (Global)
window.autoFormatDocumentNumberOnBlur = function(input) {
    let value = input.value.trim();
    
    // إذا كان الحقل فارغاً، لا تفعل شيئاً
    if (!value) return;
    
    // إذا كان يحتوي بالفعل على سلاش، لا تفعل شيئاً
    if (value.includes('/')) return;
    
    // استخراج الأرقام فقط
    let numbers = value.replace(/[^0-9]/g, '');
    
    // إذا كان هناك أرقام، أضف السنة
    if (numbers) {
        const year = new Date().getFullYear();
        input.value = `${numbers}/${year}`;
    }
}

// Format document number (add /2025 if not present) - Legacy function (Global)
window.formatDocumentNumber = function(input) {
    let value = input.value.trim();
    if (value && !value.includes('/')) {
        const year = new Date().getFullYear();
        input.value = `${value}/${year}`;
    }
}

// Handle arrow key navigation in products table (Global)
window.handleArrowNavigation = function(event, currentRowId, currentCellIndex) {
    // Only handle arrow keys
    if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
        return;
    }
    
    const currentRow = document.getElementById(currentRowId);
    const tbody = document.getElementById('productsTableBody');
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
            addProductRow();
            setTimeout(() => {
                const newRows = Array.from(tbody.querySelectorAll('tr'));
                targetRow = newRows[newRows.length - 1];
                focusCellMry(targetRow, targetCellIndex);
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
        focusCellMry(targetRow, targetCellIndex);
    }
};

// Helper function to focus a specific cell in a row
function focusCellMry(row, cellIndex) {
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

// Add product row (Global)
let productRowCounter = 0;
window.addProductRow = function() {
    const tbody = document.getElementById('productsTableBody');
    const rowId = `product-${productRowCounter++}`;
    
    const row = document.createElement('tr');
    row.id = rowId;
    row.innerHTML = `
        <td>
            <textarea class="product-designation" rows="2" placeholder="Description du produit..." onkeydown="handleArrowNavigation(event, '${rowId}', 0)"></textarea>
        </td>
        <td>
            <input type="text" class="product-quantity" placeholder="ex: 50 Kg, F, 10"
                   onchange="calculateRowTotal('${rowId}')" onblur="calculateRowTotal('${rowId}')"
                   onkeydown="handleArrowNavigation(event, '${rowId}', 1)">
        </td>
        <td>
            <input type="number" class="product-price" step="0.01" placeholder="0.00"
                   onchange="calculateRowTotal('${rowId}')" onblur="calculateRowTotal('${rowId}')"
                   onkeydown="handleArrowNavigation(event, '${rowId}', 2)">
        </td>
        <td>
            <span class="product-total">0.00 DH</span>
        </td>
        <td>
            <button type="button" class="btn-delete" onclick="deleteProductRow('${rowId}')">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                </svg>
            </button>
        </td>
    `;
    
    tbody.appendChild(row);
}

// Calculate row total (Global)
window.calculateRowTotal = function(rowId) {
    const row = document.getElementById(rowId);
    const quantityInput = row.querySelector('.product-quantity');
    const priceInput = row.querySelector('.product-price');
    
    // Get quantity text
    let quantityText = quantityInput.value.trim();
    
    console.log('🔍 MRY Row Calc - Original quantity:', quantityText);
    
    // Convert 'F' or 'f' to '1' FIRST
    if (quantityText.toUpperCase() === 'F') {
        console.log('✅ MRY Row Calc - Converting F to 1');
        quantityText = '1';
    }
    
    // Extract numeric value from quantity (remove units like "Kg", etc)
    const quantity = quantityText.replace(/[^0-9.]/g, '');
    
    let price = parseFloat(priceInput.value) || 0;
    let qty = parseFloat(quantity) || 0;
    
    console.log('🔍 MRY Row Calc - qty:', qty, 'price:', price);
    
    const total = qty * price;
    
    console.log('🔍 MRY Row Calc - total:', total);
    
    // Use simple format without spaces for calculations
    row.querySelector('.product-total').textContent = total.toFixed(2) + ' DH';
    
    calculateTotals();
}

// Delete product row (Global)
window.deleteProductRow = function(rowId) {
    document.getElementById(rowId).remove();
    calculateTotals();
}

// Calculate all totals (Global)
window.calculateTotals = function() {
    const rows = document.querySelectorAll('#productsTableBody tr');
    let totalHT = 0;
    
    rows.forEach(row => {
        const totalText = row.querySelector('.product-total').textContent;
        // Remove ALL spaces, commas, and 'DH'
        const cleanText = totalText
            .replace(/\s/g, '')  // Remove all spaces
            .replace(/,/g, '.')  // Replace comma with dot
            .replace('DH', '')
            .trim();
        const total = parseFloat(cleanText) || 0;
        totalHT += total;
    });
    
    const tvaRate = parseFloat(document.getElementById('tvaRate').value) || 0;
    const montantTVA = totalHT * (tvaRate / 100);
    const totalTTC = totalHT + montantTVA;
    
    // Use simple format without spaces for display in creation page
    document.getElementById('totalHT').textContent = totalHT.toFixed(2) + ' DH';
    document.getElementById('montantTVA').textContent = montantTVA.toFixed(2) + ' DH';
    document.getElementById('totalTTC').textContent = totalTTC.toFixed(2) + ' DH';
}

// Format number - simple format to avoid parsing issues
function formatNumber(number) {
    const num = parseFloat(number) || 0;
    return num.toFixed(2);
}

// Store selected files
let selectedFiles = [];

// Store all clients for autocomplete
let allClients = [];
let filteredClients = [];

// Load all clients from database
async function loadAllClients() {
    console.log('🔄 Loading all clients from database...');
    try {
        const result = await window.electron.db.getAllClients();
        console.log('📊 Database result:', result);
        if (result.success) {
            allClients = result.data;
            console.log('✅ Loaded clients:', allClients.length);
            if (allClients.length > 0) {
                console.log('📝 Sample client:', allClients[0]);
            }
        } else {
            console.error('❌ Database returned error:', result.error);
        }
    } catch (error) {
        console.error('❌ Error loading clients:', error);
    }
}

// Search clients based on input
window.searchClients = function(query) {
    console.log('🔍 Searching clients with query:', query);
    const dropdown = document.getElementById('clientsDropdown');
    
    if (!dropdown) {
        console.error('❌ Dropdown element not found!');
        return;
    }
    
    if (!query || query.trim().length === 0) {
        filteredClients = allClients;
    } else {
        const searchTerm = query.toLowerCase().trim();
        filteredClients = allClients.filter(client => 
            client.nom.toLowerCase().includes(searchTerm) || 
            client.ice.toLowerCase().includes(searchTerm)
        );
    }
    
    console.log('📋 Filtered clients:', filteredClients.length);
    displayClientsList();
}

// Display clients list
function displayClientsList() {
    console.log('📋 Displaying clients list...');
    const dropdown = document.getElementById('clientsDropdown');
    
    if (!dropdown) {
        console.error('❌ Dropdown element not found in displayClientsList!');
        return;
    }
    
    if (filteredClients.length === 0) {
        dropdown.innerHTML = '<div class="dropdown-item no-results">Aucun client trouvé</div>';
        dropdown.style.display = 'block';
        console.log('ℹ️ No clients found');
        return;
    }
    
    dropdown.innerHTML = filteredClients.slice(0, 10).map(client => `
        <div class="dropdown-item" onmousedown="selectClient('${client.nom.replace(/'/g, "\\'")}', '${client.ice}')">
            <div class="client-name">${client.nom}</div>
            <div class="client-ice">ICE: ${client.ice}</div>
        </div>
    `).join('');
    
    dropdown.style.display = 'block';
    console.log('✅ Dropdown displayed with', filteredClients.slice(0, 10).length, 'clients');
}

// Show clients list
window.showClientsList = function() {
    if (allClients.length > 0) {
        filteredClients = allClients;
        displayClientsList();
    }
}

// Hide clients list
window.hideClientsList = function() {
    setTimeout(() => {
        const dropdown = document.getElementById('clientsDropdown');
        dropdown.style.display = 'none';
    }, 200);
}

// Select a client from the list
window.selectClient = function(nom, ice) {
    document.getElementById('clientNom').value = nom;
    document.getElementById('clientICE').value = ice;
    
    const dropdown = document.getElementById('clientsDropdown');
    dropdown.style.display = 'none';
}

// Initialize form after page renders
function initializeInvoiceForm() {
    setTimeout(() => {
        const dateInput = document.getElementById('documentDate');
        if (dateInput) {
            // Set today's date as default
            const today = new Date().toISOString().split('T')[0];
            dateInput.value = today;
        }
        
        // Attach form submit handler
        const form = document.getElementById('invoiceForm');
        if (form) {
            form.addEventListener('submit', handleInvoiceSubmit);
        }
        
        // Attach file input handler
        const fileInput = document.getElementById('fileInput');
        if (fileInput) {
            fileInput.addEventListener('change', handleFileSelect);
        }
        
        // Reset selected files
        selectedFiles = [];
        
        // Load all clients for autocomplete
        loadAllClients();
    }, 100);
}

// Handle file selection
function handleFileSelect(event) {
    const files = Array.from(event.target.files);
    const filesList = document.getElementById('filesList');
    
    files.forEach(file => {
        // Check file type
        const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf'];
        if (!validTypes.includes(file.type)) {
            window.notify.warning(
                'Type de fichier non supporté',
                `Le fichier "${file.name}" n'est pas accepté. Formats acceptés: PNG, JPG, PDF`,
                4000
            );
            return;
        }
        
        // Check file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
            window.notify.warning(
                'Fichier trop volumineux',
                `Le fichier "${file.name}" dépasse la taille maximale de 10MB`,
                4000
            );
            return;
        }
        
        // Add to selected files
        selectedFiles.push(file);
        
        // Display file
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        fileItem.innerHTML = `
            <span class="file-icon">${file.type.includes('pdf') ? '📄' : '🖼️'}</span>
            <span class="file-name">${file.name}</span>
            <span class="file-size">${(file.size / 1024).toFixed(2)} KB</span>
            <button type="button" class="btn-delete-file" onclick="removeFile(${selectedFiles.length - 1})">
                ✕
            </button>
        `;
        filesList.appendChild(fileItem);
    });
    
    // Reset input
    event.target.value = '';
}

// Remove file
window.removeFile = function(index) {
    selectedFiles.splice(index, 1);
    updateFilesList();
};

// Update files list display
function updateFilesList() {
    const filesList = document.getElementById('filesList');
    filesList.innerHTML = '';
    
    selectedFiles.forEach((file, index) => {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        fileItem.innerHTML = `
            <span class="file-icon">${file.type.includes('pdf') ? '📄' : '🖼️'}</span>
            <span class="file-name">${file.name}</span>
            <span class="file-size">${(file.size / 1024).toFixed(2)} KB</span>
            <button type="button" class="btn-delete-file" onclick="removeFile(${index})">
                ✕
            </button>
        `;
        filesList.appendChild(fileItem);
    });
}

// Check if document number is unique
async function checkDocumentNumberUnique(type, numero, numeroOrder = null) {
    try {
        const result = await window.electron.db.getAllInvoices('MRY');
        if (!result.success) return true;
        
        const invoices = result.data;
        
        // Check based on document type
        if (type === 'facture') {
            // Check N° Facture
            const duplicateFacture = invoices.find(inv => 
                inv.document_type === 'facture' && inv.document_numero === numero
            );
            if (duplicateFacture) {
                window.notify.error(
                    'Numéro de facture déjà utilisé',
                    `Le N° Facture "${numero}" existe déjà. Veuillez utiliser un autre numéro.`,
                    5000
                );
                return false;
            }
            
            // Check N° Order if provided
            if (numeroOrder) {
                const duplicateOrder = invoices.find(inv => 
                    inv.document_numero_Order === numeroOrder
                );
                if (duplicateOrder) {
                    window.notify.error(
                        'Numéro de commande déjà utilisé',
                        `Le N° Order "${numeroOrder}" existe déjà. Veuillez utiliser un autre numéro.`,
                        5000
                    );
                    return false;
                }
            }
        } else if (type === 'devis') {
            // Check N° Devis
            const duplicateDevis = invoices.find(inv => 
                inv.document_type === 'devis' && inv.document_numero_devis === numero
            );
            if (duplicateDevis) {
                window.notify.error(
                    'Numéro de devis déjà utilisé',
                    `Le N° Devis "${numero}" existe déjà. Veuillez utiliser un autre numéro.`,
                    5000
                );
                return false;
            }
        }
        
        return true;
    } catch (error) {
        console.error('Error checking document number:', error);
        return true; // Allow if check fails
    }
}

// Handle form submission
async function handleInvoiceSubmit(e) {
    e.preventDefault();
    
    // Show loading notification
    const loadingNotif = window.notify.loading(
        'Enregistrement en cours...',
        'Veuillez patienter pendant que nous sauvegardons votre facture'
    );
    
    // Disable submit button
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span>⏳ Enregistrement...</span>';
    submitBtn.disabled = true;
    
    try {
        // Collect form data
        const formData = {
            company_code: 'MRY',
            client: {
                nom: document.getElementById('clientNom').value,
                ICE: document.getElementById('clientICE').value
            },
            document: {
                type: document.getElementById('documentType').value,
                date: document.getElementById('documentDate').value,
                numero: document.getElementById('documentNumero')?.value || ''
            },
            products: [],
            totals: {
                total_ht: parseFloat(document.getElementById('totalHT').textContent.replace('DH', '').trim()) || 0,
                tva_rate: parseFloat(document.getElementById('tvaRate').value) || 20,
                montant_tva: parseFloat(document.getElementById('montantTVA').textContent.replace('DH', '').trim()) || 0,
                total_ttc: parseFloat(document.getElementById('totalTTC').textContent.replace('DH', '').trim()) || 0
            }
        };
        
        // Add optional fields if present
        const numeroOrder = document.getElementById('documentNumeroOrder');
        if (numeroOrder && numeroOrder.value) {
            // Add the selected prefix to the order number
            const prefix = window.selectedMryOrderPrefix;
            if (prefix) {
                formData.document.numero_Order = `${prefix}${numeroOrder.value}`;
            } else {
                formData.document.numero_Order = numeroOrder.value;
            }
        }
        
        // Check uniqueness before proceeding
        const isUnique = await checkDocumentNumberUnique(
            formData.document.type,
            formData.document.numero,
            formData.document.numero_Order
        );
        
        if (!isUnique) {
            // Remove loading notification
            window.notify.remove(loadingNotif);
            // Restore button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            return;
        }
        
        // Convert numero to numero_devis for devis type
        if (formData.document.type === 'devis') {
            formData.document.numero_devis = formData.document.numero;
            delete formData.document.numero;
        }
        
        // Collect products
        const rows = document.querySelectorAll('#productsTableBody tr');
        rows.forEach(row => {
            const designation = row.querySelector('.product-designation').value.trim();
            const quantityOriginal = row.querySelector('.product-quantity').value.trim();
            const price = parseFloat(row.querySelector('.product-price').value) || 0;
            
            console.log('🔍 MRY BEFORE conversion - Quantity:', quantityOriginal, 'Type:', typeof quantityOriginal);
            
            // For calculation: convert F to 1
            let quantityForCalc = quantityOriginal;
            if (quantityForCalc.toUpperCase() === 'F') {
                console.log('✅ MRY Converting F to 1 for calculation');
                quantityForCalc = '1';
            }
            
            console.log('🔍 MRY AFTER conversion - QuantityForCalc:', quantityForCalc, 'Original:', quantityOriginal);
            
            // Calculate total_ht directly from quantity and price
            const qty = parseFloat(quantityForCalc) || 0;
            const total_ht = qty * price;
            
            console.log('💾 MRY Saving product:', {
                designation,
                quantityOriginal,
                qty_parsed: qty,
                price,
                calculated_total: total_ht
            });
            
            // Save product if it has at least a designation
            if (designation) {
                formData.products.push({
                    designation,
                    quantite: quantityOriginal || '0',  // Save original value (F, 10 Kg, etc.)
                    prix_unitaire_ht: price,
                    total_ht: total_ht
                });
            }
        });
        
        console.log('📝 Saving invoice:', formData);
        
        // Save to database
        const result = await window.electron.db.createInvoice(formData);
        
        if (result.success) {
            const invoiceId = result.data.id;
            console.log('✅ Invoice saved with ID:', invoiceId);
            
            // Upload attachments if any
            if (selectedFiles.length > 0) {
                console.log(`📎 Uploading ${selectedFiles.length} attachments...`);
                
                for (const file of selectedFiles) {
                    const arrayBuffer = await file.arrayBuffer();
                    const uint8Array = new Uint8Array(arrayBuffer);
                    
                    const attachResult = await window.electron.db.addAttachment(
                        invoiceId,
                        file.name,
                        file.type,
                        uint8Array
                    );
                    
                    if (attachResult.success) {
                        console.log(`✅ Attachment uploaded: ${file.name}`);
                    } else {
                        console.error(`❌ Failed to upload: ${file.name}`, attachResult.error);
                    }
                }
            }
            
            // Save notes if any
            const noteText = document.getElementById('invoiceNotesMRY')?.value?.trim();
            if (noteText) {
                await window.electron.db.saveNote(invoiceId, noteText);
            }
            
            // Remove loading notification
            window.notify.remove(loadingNotif);
            
            // Show success notification
            window.notify.success(
                'Facture enregistrée avec succès!',
                `ID: ${invoiceId} - ${formData.client.nom}`,
                4000
            );
            
            // Navigate after a short delay
            setTimeout(() => {
                router.navigate('/dashboard-mry');
            }, 1000);
        } else {
            throw new Error(result.error);
        }
    } catch (error) {
        console.error('❌ Error saving invoice:', error);
        
        // Remove loading notification
        window.notify.remove(loadingNotif);
        
        // Show error notification
        window.notify.error(
            'Erreur lors de l\'enregistrement',
            error.message || 'Une erreur est survenue. Veuillez réessayer.',
            5000
        );
        
        // Restore button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

// Call initialization when page is rendered
window.initInvoiceFormPage = function() {
    console.log('🔄 Initializing invoice form page...');
    initializeInvoiceForm();
};

// ==================== MRY ORDER PREFIX FUNCTIONS ====================

// Initialize prefixes for MRY Order (Global)
if (!window.mryOrderPrefixes) {
    window.mryOrderPrefixes = [];
    window.selectedMryOrderPrefix = null;
    window.mryOrderPrefixesLoaded = false;
}

// Toggle MRY order prefix dropdown (Global)
window.toggleMryOrderPrefixDropdown = async function() {
    const dropdown = document.getElementById('mryOrderPrefixDropdown');
    if (!dropdown) return;
    
    if (dropdown.style.display === 'none') {
        await loadMryOrderPrefixesFromDB();
        renderMryOrderPrefixList();
        dropdown.style.display = 'block';
    } else {
        dropdown.style.display = 'none';
    }
}

// Render MRY order prefix list (Global)
window.renderMryOrderPrefixList = function() {
    const listContainer = document.getElementById('mryOrderPrefixList');
    if (!listContainer) return;
    
    // Add "No Prefix" option at the beginning
    const noPrefixOption = `
        <div onclick="selectMryOrderPrefix('')" 
             style="margin: 0.35rem; padding: 0.75rem 1rem; cursor: pointer; border-radius: 8px; transition: all 0.3s; color: #fff; display: flex; justify-content: space-between; align-items: center; background: ${'' === window.selectedMryOrderPrefix ? 'linear-gradient(90deg, #9c27b0 0%, #7b1fa2 100%)' : 'rgba(255,255,255,0.05)'}; border: 2px solid ${'' === window.selectedMryOrderPrefix ? '#9c27b0' : 'transparent'}; box-shadow: ${'' === window.selectedMryOrderPrefix ? '0 2px 8px rgba(156, 39, 176, 0.3)' : 'none'};"
             onmouseover="if('' !== window.selectedMryOrderPrefix) { this.style.background='rgba(156, 39, 176, 0.2)'; this.style.borderColor='#9c27b0'; this.style.transform='translateX(5px)'; }" 
             onmouseout="if('' !== window.selectedMryOrderPrefix) { this.style.background='rgba(255,255,255,0.05)'; this.style.borderColor='transparent'; this.style.transform='translateX(0)'; }">
            <div style="display: flex; align-items: center; gap: 0.75rem;">
                <span style="font-size: 1.2rem;">${'' === window.selectedMryOrderPrefix ? '✓' : '🚫'}</span>
                <span style="font-weight: ${'' === window.selectedMryOrderPrefix ? '700' : '500'}; font-size: 1rem; letter-spacing: 1px; font-style: italic; color: #9c27b0;">Sans Prefix</span>
            </div>
        </div>
    `;
    
    listContainer.innerHTML = noPrefixOption + window.mryOrderPrefixes.map((prefix, index) => `
        <div onclick="selectMryOrderPrefix('${prefix}')" 
             style="margin: 0.35rem; padding: 0.75rem 1rem; cursor: pointer; border-radius: 8px; transition: all 0.3s; color: #fff; display: flex; justify-content: space-between; align-items: center; background: ${prefix === window.selectedMryOrderPrefix ? 'linear-gradient(90deg, #2196f3 0%, #1976d2 100%)' : 'rgba(255,255,255,0.05)'}; border: 2px solid ${prefix === window.selectedMryOrderPrefix ? '#2196f3' : 'transparent'}; box-shadow: ${prefix === window.selectedMryOrderPrefix ? '0 2px 8px rgba(33, 150, 243, 0.3)' : 'none'};"
             onmouseover="if('${prefix}' !== window.selectedMryOrderPrefix) { this.style.background='rgba(33, 150, 243, 0.2)'; this.style.borderColor='#2196f3'; this.style.transform='translateX(5px)'; }" 
             onmouseout="if('${prefix}' !== window.selectedMryOrderPrefix) { this.style.background='rgba(255,255,255,0.05)'; this.style.borderColor='transparent'; this.style.transform='translateX(0)'; }">
            <div style="display: flex; align-items: center; gap: 0.75rem;">
                <span style="font-size: 1.2rem;">${prefix === window.selectedMryOrderPrefix ? '✓' : '📌'}</span>
                <span style="font-weight: ${prefix === window.selectedMryOrderPrefix ? '700' : '500'}; font-size: 1rem; letter-spacing: 1px;">${prefix}</span>
            </div>
            ${window.mryOrderPrefixes.length > 1 ? `
                <button onclick="event.stopPropagation(); deleteMryOrderPrefix('${prefix}')" 
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

// Select MRY order prefix (Global)
window.selectMryOrderPrefix = function(prefix) {
    console.log('🔵 [MRY ORDER PREFIX SELECT] Selecting prefix:', prefix);
    window.selectedMryOrderPrefix = prefix;
    
    // Save to localStorage
    try {
        localStorage.setItem('lastSelectedMryOrderPrefix', prefix);
        console.log('💾 [MRY ORDER PREFIX] Saved to localStorage:', prefix);
    } catch (error) {
        console.error('❌ [MRY ORDER PREFIX] Error saving to localStorage:', error);
    }
    
    const prefixInput = document.getElementById('mryOrderPrefixInput');
    const prefixExample = document.getElementById('mryOrderPrefixExample');
    
    if (prefixInput) {
        prefixInput.value = prefix;
        console.log('✅ [MRY ORDER PREFIX SELECT] Updated mryOrderPrefixInput to:', prefix);
    }
    
    if (prefixExample) {
        prefixExample.textContent = prefix;
        console.log('✅ [MRY ORDER PREFIX SELECT] Updated mryOrderPrefixExample to:', prefix);
    }
    
    const dropdown = document.getElementById('mryOrderPrefixDropdown');
    if (dropdown) {
        dropdown.style.display = 'none';
    }
    
    renderMryOrderPrefixList();
}

// Add new MRY order prefix (Global)
window.addNewMryOrderPrefix = async function() {
    const newPrefixInput = document.getElementById('newMryOrderPrefixInput');
    if (!newPrefixInput) return;
    
    const newPrefix = newPrefixInput.value.trim().toUpperCase();
    
    if (!newPrefix) {
        window.notify.warning('Attention', 'Veuillez saisir un prefix', 2000);
        return;
    }
    
    if (window.mryOrderPrefixes.includes(newPrefix)) {
        window.notify.warning('Attention', 'Ce prefix existe déjà', 2000);
        return;
    }
    
    const result = await window.electron.db.addMryOrderPrefix(newPrefix);
    
    if (result.success) {
        window.mryOrderPrefixes.push(newPrefix);
        window.mryOrderPrefixes.sort();
        newPrefixInput.value = '';
        
        renderMryOrderPrefixList();
        window.notify.success('Succès', `Prefix "${newPrefix}" ajouté`, 2000);
    } else {
        window.notify.error('Erreur', result.error || 'Impossible d\'ajouter le prefix', 3000);
    }
}

// Delete MRY order prefix (Global)
window.deleteMryOrderPrefix = async function(prefix) {
    if (window.mryOrderPrefixes.length <= 1) {
        window.notify.warning('Attention', 'Vous devez garder au moins un prefix', 2000);
        return;
    }
    
    const result = await window.electron.db.deleteMryOrderPrefix(prefix);
    
    if (result.success) {
        const index = window.mryOrderPrefixes.indexOf(prefix);
        if (index > -1) {
            window.mryOrderPrefixes.splice(index, 1);
            
            if (window.selectedMryOrderPrefix === prefix) {
                window.selectedMryOrderPrefix = window.mryOrderPrefixes[0];
                const prefixInput = document.getElementById('mryOrderPrefixInput');
                const prefixExample = document.getElementById('mryOrderPrefixExample');
                if (prefixInput) prefixInput.value = window.selectedMryOrderPrefix;
                if (prefixExample) prefixExample.textContent = window.selectedMryOrderPrefix;
            }
            
            renderMryOrderPrefixList();
            window.notify.success('Succès', `Prefix "${prefix}" supprimé`, 2000);
        }
    } else {
        window.notify.error('Erreur', result.error || 'Impossible de supprimer le prefix', 3000);
    }
}

// Load MRY order prefixes from database
async function loadMryOrderPrefixesFromDB() {
    try {
        const result = await window.electron.db.getMryOrderPrefixes();
        if (result.success && result.data && result.data.length > 0) {
            window.mryOrderPrefixes = result.data;
            console.log('✅ [MRY ORDER PREFIX] Loaded from DB:', window.mryOrderPrefixes);
            
            if (!window.selectedMryOrderPrefix) {
                window.selectedMryOrderPrefix = window.mryOrderPrefixes[0];
            }
            
            // Try to load last selected prefix from localStorage
            let lastSelected = null;
            try {
                lastSelected = localStorage.getItem('lastSelectedMryOrderPrefix');
                console.log('💾 [MRY ORDER PREFIX] Retrieved from localStorage:', lastSelected);
            } catch (error) {
                console.error('❌ [MRY ORDER PREFIX] Error reading from localStorage:', error);
            }
            
            // Use last selected if it exists in the list, otherwise use first
            if (lastSelected && window.mryOrderPrefixes.includes(lastSelected)) {
                window.selectedMryOrderPrefix = lastSelected;
                console.log('✅ [MRY ORDER PREFIX] Using last selected:', lastSelected);
            } else {
                window.selectedMryOrderPrefix = window.mryOrderPrefixes[0] || null;
                console.log('✅ [MRY ORDER PREFIX] Using first prefix:', window.selectedMryOrderPrefix);
            }
        } else {
            window.mryOrderPrefixes = [];
            window.selectedMryOrderPrefix = null;
            console.log('ℹ️ [MRY ORDER PREFIX] No prefixes found in database');
        }
    } catch (error) {
        console.error('❌ [MRY ORDER PREFIX] Error loading from DB:', error);
        window.mryOrderPrefixes = [];
        window.selectedMryOrderPrefix = null;
    }
}

// ==================== END MRY ORDER PREFIX FUNCTIONS ====================

// ==================== MRY MISSING NUMBERS FUNCTIONS ====================

// Show missing invoice numbers for MRY (Global)
window.showMissingNumbersMRY = async function(selectedYear = null) {
    const currentYear = selectedYear || new Date().getFullYear();
    console.log('🔍 [MRY FRONTEND] showMissingNumbersMRY called for year:', currentYear);
    
    try {
        console.log('🔍 [MRY FRONTEND] Calling getMryMissingNumbers...');
        const result = await window.electron.db.getMryMissingNumbers(currentYear);
        console.log('🔍 [MRY FRONTEND] Result:', result);
        
        if (!result.success) {
            window.notify.error('Erreur', result.error || 'Impossible de charger les numéros manquants', 3000);
            return;
        }
        
        const missingNumbers = result.data || [];
        const stats = result.stats || {};
        
        // Get all available years from invoices
        const invoicesResult = await window.electron.db.getAllInvoices('MRY');
        let availableYears = [new Date().getFullYear()];
        if (invoicesResult.success && invoicesResult.data) {
            const years = invoicesResult.data.map(inv => {
                const year = new Date(inv.document_date).getFullYear();
                return year;
            });
            availableYears = [...new Set([...years, new Date().getFullYear()])].sort((a, b) => b - a);
        }
        
        // Create modal
        const modal = document.createElement('div');
        modal.id = 'missingNumbersModalMRY';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            backdrop-filter: blur(5px);
        `;
        
        const content = document.createElement('div');
        content.style.cssText = `
            background: linear-gradient(135deg, #1e1e1e 0%, #2d2d30 100%);
            border-radius: 16px;
            padding: 2rem;
            max-width: 600px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
            border: 2px solid #667eea;
        `;
        
        content.innerHTML = `
            <div style="margin-bottom: 1.5rem;">
                <h2 style="margin: 0 0 0.5rem 0; color: #fff; font-size: 1.5rem; display: flex; align-items: center; gap: 0.5rem;">
                    <span style="font-size: 1.8rem;">📊</span>
                    Numéros manquants ${missingNumbers.length > 0 ? `(${missingNumbers.length})` : ''}
                </h2>
                <div style="margin-top: 1rem; margin-bottom: 1rem;">
                    <label style="color: #fff; font-size: 0.95rem; margin-bottom: 0.5rem; display: block;">📅 Filtrer par année:</label>
                    <select id="yearFilterMRYMissing" onchange="window.showMissingNumbersMRY(this.value === 'all' ? null : parseInt(this.value))" 
                            style="width: 100%; padding: 0.75rem; background: #2d2d30; border: 2px solid #3e3e42; border-radius: 8px; color: #fff; font-size: 1rem; outline: none; cursor: pointer;">
                        <option value="all" ${!selectedYear ? 'selected' : ''}>🌐 Toutes les années</option>
                        ${availableYears.map(year => `<option value="${year}" ${currentYear === year ? 'selected' : ''}>${year}</option>`).join('')}
                    </select>
                </div>
                ${missingNumbers.length > 0 ? `
                <p style="margin: 0.5rem 0 0 0; color: #999; font-size: 0.9rem;">
                    Min: ${stats.min || 0} | Max: ${stats.max || 0} | Utilisés: ${stats.used || 0} | Manquants: ${stats.missing || 0}
                </p>
                ` : ''}
            </div>
            
            ${missingNumbers.length > 0 ? `
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(60px, 1fr)); gap: 0.75rem; margin-bottom: 1.5rem;">
                ${missingNumbers.map(num => `
                    <button type="button" onclick="selectMissingNumberMRY(${num})" 
                            style="padding: 0.75rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #fff; border: none; border-radius: 8px; cursor: pointer; font-size: 1rem; font-weight: 600; transition: all 0.3s; box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);"
                            onmouseover="this.style.transform='translateY(-3px) scale(1.05)'; this.style.boxShadow='0 6px 16px rgba(102, 126, 234, 0.5)';"
                            onmouseout="this.style.transform='translateY(0) scale(1)'; this.style.boxShadow='0 2px 8px rgba(102, 126, 234, 0.3)';">
                        ${num}
                    </button>
                `).join('')}
            </div>
            ` : `
            <div style="padding: 2rem; text-align: center; color: #999;">
                <span style="font-size: 3rem; display: block; margin-bottom: 1rem;">✅</span>
                <p style="font-size: 1.1rem; margin: 0;">Aucun numéro manquant trouvé</p>
            </div>
            `}
            
            <button type="button" onclick="document.getElementById('missingNumbersModalMRY').remove()" 
                    style="width: 100%; padding: 0.75rem; background: #3e3e42; color: #fff; border: none; border-radius: 8px; cursor: pointer; font-size: 1rem; transition: all 0.3s;"
                    onmouseover="this.style.background='#4e4e52';"
                    onmouseout="this.style.background='#3e3e42';">
                Fermer
            </button>
        `;
        
        modal.appendChild(content);
        
        // Remove existing modal if any
        const existingModal = document.getElementById('missingNumbersModalMRY');
        if (existingModal) existingModal.remove();
        
        document.body.appendChild(modal);
        
        // Close on outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
        
    } catch (error) {
        console.error('Error showing missing numbers:', error);
        window.notify.error('Erreur', 'Une erreur est survenue', 3000);
    }
};

// Select missing number and fill input for MRY (Global)
window.selectMissingNumberMRY = function(number) {
    const input = document.getElementById('documentNumero');
    if (input) {
        input.value = number;
        input.focus();
        
        // Close modal
        const modal = document.querySelector('[style*="position: fixed"]');
        if (modal) modal.remove();
        
        window.notify.success('Succès', `Numéro ${number} sélectionné`, 2000);
    }
};

// Show missing devis numbers for MRY (Global)
window.showMissingDevisNumbersMRY = async function(selectedYear = null) {
    const currentYear = selectedYear || new Date().getFullYear();
    console.log('🔍 [MRY DEVIS FRONTEND] showMissingDevisNumbersMRY called for year:', currentYear);
    
    try {
        console.log('🔍 [MRY DEVIS FRONTEND] Calling getMryMissingDevisNumbers...');
        const result = await window.electron.db.getMryMissingDevisNumbers(currentYear);
        console.log('🔍 [MRY DEVIS FRONTEND] Result:', result);
        
        if (!result.success) {
            window.notify.error('Erreur', result.error || 'Impossible de charger les numéros manquants', 3000);
            return;
        }
        
        const missingNumbers = result.data || [];
        const stats = result.stats || {};
        
        // Get all available years from invoices
        const invoicesResult = await window.electron.db.getAllInvoices('MRY');
        let availableYears = [new Date().getFullYear()];
        if (invoicesResult.success && invoicesResult.data) {
            const years = invoicesResult.data.map(inv => {
                const year = new Date(inv.document_date).getFullYear();
                return year;
            });
            availableYears = [...new Set([...years, new Date().getFullYear()])].sort((a, b) => b - a);
        }
        
        // Create modal
        const modal = document.createElement('div');
        modal.id = 'missingDevisNumbersModalMRY';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            backdrop-filter: blur(5px);
        `;
        
        const content = document.createElement('div');
        content.style.cssText = `
            background: linear-gradient(135deg, #1e1e1e 0%, #2d2d30 100%);
            border-radius: 16px;
            padding: 2rem;
            max-width: 600px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
            border: 2px solid #667eea;
        `;
        
        content.innerHTML = `
            <div style="margin-bottom: 1.5rem;">
                <h2 style="margin: 0 0 0.5rem 0; color: #fff; font-size: 1.5rem; display: flex; align-items: center; gap: 0.5rem;">
                    <span style="font-size: 1.8rem;">📊</span>
                    Numéros manquants ${missingNumbers.length > 0 ? `(${missingNumbers.length})` : ''}
                </h2>
                <div style="margin-top: 1rem; margin-bottom: 1rem;">
                    <label style="color: #fff; font-size: 0.95rem; margin-bottom: 0.5rem; display: block;">📅 Filtrer par année:</label>
                    <select id="yearFilterMRYDevisMissing" onchange="window.showMissingDevisNumbersMRY(this.value === 'all' ? null : parseInt(this.value))" 
                            style="width: 100%; padding: 0.75rem; background: #2d2d30; border: 2px solid #3e3e42; border-radius: 8px; color: #fff; font-size: 1rem; outline: none; cursor: pointer;">
                        <option value="all" ${!selectedYear ? 'selected' : ''}>🌐 Toutes les années</option>
                        ${availableYears.map(year => `<option value="${year}" ${currentYear === year ? 'selected' : ''}>${year}</option>`).join('')}
                    </select>
                </div>
                ${missingNumbers.length > 0 ? `
                <p style="margin: 0.5rem 0 0 0; color: #999; font-size: 0.9rem;">
                    Min: ${stats.min || 0} | Max: ${stats.max || 0} | Utilisés: ${stats.used || 0} | Manquants: ${stats.missing || 0}
                </p>
                ` : ''}
            </div>
            
            ${missingNumbers.length > 0 ? `
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(60px, 1fr)); gap: 0.75rem; margin-bottom: 1.5rem;">
                ${missingNumbers.map(num => `
                    <button type="button" onclick="selectMissingNumberMRY(${num})" 
                            style="padding: 0.75rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #fff; border: none; border-radius: 8px; cursor: pointer; font-size: 1rem; font-weight: 600; transition: all 0.3s; box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);"
                            onmouseover="this.style.transform='translateY(-3px) scale(1.05)'; this.style.boxShadow='0 6px 16px rgba(102, 126, 234, 0.5)';"
                            onmouseout="this.style.transform='translateY(0) scale(1)'; this.style.boxShadow='0 2px 8px rgba(102, 126, 234, 0.3)';">
                        ${num}
                    </button>
                `).join('')}
            </div>
            ` : `
            <div style="padding: 2rem; text-align: center; color: #999;">
                <span style="font-size: 3rem; display: block; margin-bottom: 1rem;">✅</span>
                <p style="font-size: 1.1rem; margin: 0;">Aucun numéro manquant trouvé</p>
            </div>
            `}
            
            <button type="button" onclick="document.getElementById('missingDevisNumbersModalMRY').remove()" 
                    style="width: 100%; padding: 0.75rem; background: #3e3e42; color: #fff; border: none; border-radius: 8px; cursor: pointer; font-size: 1rem; transition: all 0.3s;"
                    onmouseover="this.style.background='#4e4e52';"
                    onmouseout="this.style.background='#3e3e42';">
                Fermer
            </button>
        `;
        
        modal.appendChild(content);
        
        // Remove existing modal if any
        const existingModal = document.getElementById('missingDevisNumbersModalMRY');
        if (existingModal) existingModal.remove();
        
        document.body.appendChild(modal);
        
        // Close on outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
        
    } catch (error) {
        console.error('Error showing missing devis numbers:', error);
        window.notify.error('Erreur', 'Une erreur est survenue', 3000);
    }
};

// ==================== END MRY MISSING NUMBERS FUNCTIONS ====================
