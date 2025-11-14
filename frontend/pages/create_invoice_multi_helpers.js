// Helper functions for Multi Company Invoice Creation

// Handle document type change
window.handleDocumentTypeChangeMulti = async function() {
    const type = document.getElementById('documentTypeMulti').value;
    const container = document.getElementById('dynamicFieldsMulti');
    
    if (!type) {
        container.innerHTML = '';
        return;
    }

    let suggestedNumber = '';
    let lastNumbers = {
        main: 'Aucun',
        order: 'Aucun'
    };
    
    try {
        // Get the last invoice from database
        const invoicesResult = await window.electron.dbMulti.getAllInvoices('MULTI');
        if (invoicesResult.success && invoicesResult.data && invoicesResult.data.length > 0) {
            const invoices = invoicesResult.data;
            
            // Helper function to extract numeric value from document number
            const extractNumber = (docNumber) => {
                if (!docNumber) return 0;
                // Extract the first number from the document string
                // Examples: "123/2025" -> 123, "MTT456/2025" -> 456
                const match = docNumber.toString().match(/\d+/);
                return match ? parseInt(match[0], 10) : 0;
            };

            // Get highest main number based on type
            if (type === 'facture') {
                const factures = invoices.filter(inv => inv.document_numero);
                if (factures.length > 0) {
                    factures.sort((a, b) => extractNumber(b.document_numero) - extractNumber(a.document_numero));
                    lastNumbers.main = factures[0].document_numero;
                }
                
                // Get highest N° Order
                const orders = invoices.filter(inv => inv.document_numero_Order);
                if (orders.length > 0) {
                    orders.sort((a, b) => extractNumber(b.document_numero_Order) - extractNumber(a.document_numero_Order));
                    lastNumbers.order = orders[0].document_numero_Order;
                }
            } else if (type === 'devis') {
                const devisList = invoices.filter(inv => inv.document_numero_devis);
                if (devisList.length > 0) {
                    devisList.sort((a, b) => extractNumber(b.document_numero_devis) - extractNumber(a.document_numero_devis));
                    lastNumbers.main = devisList[0].document_numero_devis;
                }
            }
        }
    } catch (error) {
        console.error('[MULTI] Error getting last numbers:', error);
    }

    let html = '<div class="form-row">';

    if (type === 'facture') {
        html += `
            <div class="form-field">
                <label>N° Facture<span class="required">*</span></label>
                <div style="display: flex; gap: 0.5rem; align-items: stretch;">
                    <input type="text" id="documentNumeroMulti" placeholder="Saisir les chiffres (ex: 001)" required 
                           onblur="formatInvoiceNumberMulti(this)" style="flex: 1;">
                    <button type="button" onclick="showMissingNumbersMulti()" 
                            style="padding: 0.75rem 1rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #fff; border: none; border-radius: 8px; cursor: pointer; font-size: 1.1rem; transition: all 0.3s; box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3); display: flex; align-items: center; justify-content: center; min-width: 50px;"
                            onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 12px rgba(102, 126, 234, 0.5)';"
                            onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 8px rgba(102, 126, 234, 0.3)';"
                            title="Voir les numéros manquants">
                        🔍
                    </button>
                </div>
                <small style="color: #999; font-size: 0.85rem;">Saisir uniquement les chiffres, MTT et l'année seront ajoutés automatiquement</small>
                ${lastNumbers.main !== 'Aucun' ? `<small style="color: #4caf50; font-size: 0.8rem; display: block; margin-top: 0.25rem;">📌 Plus grand numéro: ${lastNumbers.main}</small>` : ''}
            </div>
        `;
        html += '</div>';
        
        const selectedMultiOrderPrefix = window.selectedMultiOrderPrefix || window.multiOrderPrefixes?.[0] || '';
        html += `
            <div class="form-row optional-field">
                <div class="toggle-container">
                    <label class="toggle-label">
                        <input type="checkbox" id="toggleOrderMulti" onchange="toggleOptionalFieldMulti('Order')">
                        <span class="toggle-switch"></span>
                        <span class="toggle-text">N° Order</span>
                    </label>
                </div>
                <div class="form-field" id="fieldOrderMulti" style="display: none; position: relative;">
                    <label>N° Order</label>
                    <div style="display: flex; gap: 0.5rem; align-items: flex-start;">
                        <div style="position: relative; flex: 0 0 auto;">
                            <input type="text" id="multiOrderPrefixInput" value="${selectedMultiOrderPrefix}" placeholder="" 
                                   style="width: 80px; padding: 0.75rem; background: #2d2d30; border: 2px solid #3e3e42; border-radius: 8px; color: #fff; font-size: 1rem; outline: none; cursor: pointer; font-weight: 600;"
                                   readonly onclick="toggleMultiOrderPrefixDropdown()">
                            <div id="multiOrderPrefixDropdown" style="display: none; position: absolute; top: 100%; left: 0; background: linear-gradient(135deg, #1e1e1e 0%, #2d2d30 100%); border: 2px solid #2196f3; border-radius: 12px; margin-top: 0.5rem; box-shadow: 0 8px 24px rgba(33, 150, 243, 0.3), 0 0 0 1px rgba(33, 150, 243, 0.1); z-index: 1000; min-width: 200px; max-height: 350px; overflow: hidden;">
                                <div style="padding: 0.75rem 1rem; background: linear-gradient(90deg, #2196f3 0%, #1976d2 100%); border-bottom: 2px solid rgba(33, 150, 243, 0.3);">
                                    <h4 style="margin: 0; color: #fff; font-size: 0.95rem; font-weight: 600; letter-spacing: 0.5px;">📋 Choisir un Prefix</h4>
                                </div>
                                <div id="multiOrderPrefixList" style="max-height: 200px; overflow-y: auto; padding: 0.5rem;"></div>
                                <div style="padding: 0.75rem; border-top: 2px solid rgba(33, 150, 243, 0.2); background: rgba(0,0,0,0.2);">
                                    <input type="text" id="newMultiOrderPrefixInput" placeholder="Nouveau prefix (ex: ORD)" 
                                           style="width: 100%; padding: 0.65rem; background: #1e1e1e; border: 2px solid #3e3e42; border-radius: 6px; color: #fff; font-size: 0.9rem; outline: none; transition: all 0.3s;"
                                           onfocus="this.style.borderColor='#2196f3'; this.style.boxShadow='0 0 0 3px rgba(33, 150, 243, 0.1)';"
                                           onblur="this.style.borderColor='#3e3e42'; this.style.boxShadow='none';"
                                           onkeypress="if(event.key==='Enter'){addNewMultiOrderPrefix(); event.preventDefault();}">
                                    <button type="button" onclick="addNewMultiOrderPrefix()" 
                                            style="width: 100%; margin-top: 0.5rem; padding: 0.65rem; background: linear-gradient(90deg, #2196f3 0%, #1976d2 100%); color: #fff; border: none; border-radius: 6px; cursor: pointer; font-size: 0.9rem; font-weight: 600; transition: all 0.3s; box-shadow: 0 2px 8px rgba(33, 150, 243, 0.3);"
                                            onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 12px rgba(33, 150, 243, 0.4)';"
                                            onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 8px rgba(33, 150, 243, 0.3)';">
                                        ➕ Ajouter le Prefix
                                    </button>
                                </div>
                            </div>
                        </div>
                        <input type="text" id="documentNumeroOrderMulti" placeholder="123" 
                               style="flex: 1; padding: 0.75rem; background: #2d2d30; border: 2px solid #3e3e42; border-radius: 8px; color: #fff; font-size: 1rem; outline: none;">
                    </div>
                    <small style="color: #999; font-size: 0.85rem; display: block; margin-top: 0.5rem;">Ex: 123 → <span id="multiOrderPrefixExample"></span>123</small>
                    ${lastNumbers.order !== 'Aucun' ? `<small style="color: #2196f3; font-size: 0.8rem; display: block; margin-top: 0.25rem;">📌 Plus grand N° Order: ${lastNumbers.order}</small>` : ''}
                </div>
            </div>
        `;
    } else if (type === 'devis') {
        html += `
            <div class="form-field">
                <label>N° Devis <span class="required">*</span></label>
                <div style="display: flex; gap: 0.5rem; align-items: stretch;">
                    <input type="text" id="documentNumeroMulti" placeholder="Saisir les chiffres (ex: 001)" required 
                           onblur="formatInvoiceNumberMulti(this)" style="flex: 1;">
                    <button type="button" onclick="showMissingDevisNumbersMulti()" 
                            style="padding: 0.75rem 1rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #fff; border: none; border-radius: 8px; cursor: pointer; font-size: 1.1rem; transition: all 0.3s; box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3); display: flex; align-items: center; justify-content: center; min-width: 50px;"
                            onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 12px rgba(102, 126, 234, 0.5)';"
                            onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 8px rgba(102, 126, 234, 0.3)';"
                            title="Voir les numéros manquants">
                        🔍
                    </button>
                </div>
                <small style="color: #999; font-size: 0.85rem;">Saisir uniquement les chiffres, MTT et l'année seront ajoutés automatiquement</small>
                ${lastNumbers.main !== 'Aucun' ? `<small style="color: #9c27b0; font-size: 0.8rem; display: block; margin-top: 0.25rem;">📌 Plus grand numéro: ${lastNumbers.main}</small>` : ''}
            </div>
        `;
        html += '</div>';
    }

    container.innerHTML = html;
}

// Format invoice number on blur - add MTT prefix and year suffix
window.formatInvoiceNumberMulti = function(input) {
    let value = input.value.trim();
    
    // Check if already formatted
    if (value.startsWith('MTT') && value.length > 7) {
        return; // Already formatted, don't format again
    }
    
    // Remove any non-numeric characters
    value = value.replace(/\D/g, '');
    
    if (value) {
        const currentYear = new Date().getFullYear();
        // Format: MTT + numbers + year
        input.value = `MTT${value}${currentYear}`;
        input.style.color = '#4caf50';
        input.style.fontWeight = '600';
    }
}

window.useSuggestedNumberMulti = function(number) {
    const input = document.getElementById('documentNumeroMulti');
    if (input) {
        input.value = number;
        input.focus();
        input.style.background = 'rgba(102, 126, 234, 0.1)';
        input.style.borderColor = '#667eea';
        setTimeout(() => {
            input.style.background = '';
            input.style.borderColor = '';
        }, 1000);
    }
}

window.toggleOptionalFieldMulti = function(fieldName) {
    const checkbox = document.getElementById(`toggle${fieldName}Multi`);
    const field = document.getElementById(`field${fieldName}Multi`);
    const input = document.getElementById(`documentNumero${fieldName}Multi`);
    
    if (checkbox.checked) {
        field.style.display = 'block';
        input.required = false;
    } else {
        field.style.display = 'none';
        input.value = '';
        input.required = false;
    }
}

window.autoFormatDocumentNumberOnBlurMulti = function(input) {
    let value = input.value.trim();
    if (!value) return;
    if (value.includes('/')) return;
    let numbers = value.replace(/[^0-9]/g, '');
    if (numbers) {
        const year = new Date().getFullYear();
        input.value = `${numbers}/${year}`;
    }
}

// Auto-format N° Order - removed automatic /year addition
window.autoFormatOrderNumberMulti = function(input) {
    // Just keep the value as entered by user
    input.value = input.value.trim();
}

// Handle arrow key navigation in products table (Global)
window.handleArrowNavigationMulti = function(event, currentRowId, currentCellIndex) {
    // Only handle arrow keys
    if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
        return;
    }
    
    const currentRow = document.getElementById(currentRowId);
    const tbody = document.getElementById('productsTableBodyMulti');
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
            addProductRowMulti();
            setTimeout(() => {
                const newRows = Array.from(tbody.querySelectorAll('tr'));
                targetRow = newRows[newRows.length - 1];
                focusCellMulti(targetRow, targetCellIndex);
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
        focusCellMulti(targetRow, targetCellIndex);
    }
};

// Helper function to focus a specific cell in a row
function focusCellMulti(row, cellIndex) {
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

let productRowCounterMulti = 0;
window.addProductRowMulti = function() {
    const tbody = document.getElementById('productsTableBodyMulti');
    const rowId = `product-multi-${productRowCounterMulti++}`;
    
    const row = document.createElement('tr');
    row.id = rowId;
    row.innerHTML = `
        <td>
            <textarea class="product-designation" rows="2" placeholder="Description du produit..." onkeydown="handleArrowNavigationMulti(event, '${rowId}', 0)"></textarea>
        </td>
        <td>
            <input type="text" class="product-quantity" placeholder="ex: 50 Kg, F, 10"
                   onchange="calculateRowTotalMulti('${rowId}')" onblur="calculateRowTotalMulti('${rowId}')"
                   onkeydown="handleArrowNavigationMulti(event, '${rowId}', 1)">
        </td>
        <td>
            <input type="number" class="product-price" step="0.01" placeholder="0.00"
                   onchange="calculateRowTotalMulti('${rowId}')" onblur="calculateRowTotalMulti('${rowId}')"
                   onkeydown="handleArrowNavigationMulti(event, '${rowId}', 2)">
        </td>
        <td>
            <span class="product-total">0.00 DH</span>
        </td>
        <td>
            <button type="button" class="btn-delete" onclick="deleteProductRowMulti('${rowId}')">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                </svg>
            </button>
        </td>
    `;
    tbody.appendChild(row);
}

window.calculateRowTotalMulti = function(rowId) {
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
    calculateTotalsMulti();
}

window.deleteProductRowMulti = function(rowId) {
    document.getElementById(rowId).remove();
    calculateTotalsMulti();
}

window.calculateTotalsMulti = function() {
    const rows = document.querySelectorAll('#productsTableBodyMulti tr');
    let totalHT = 0;
    
    rows.forEach(row => {
        const totalText = row.querySelector('.product-total').textContent;
        const cleanText = totalText.replace(/\s/g, '').replace(/,/g, '.').replace('DH', '').trim();
        const total = parseFloat(cleanText) || 0;
        totalHT += total;
    });
    
    const tvaRate = parseFloat(document.getElementById('tvaRateMulti').value) || 0;
    const montantTVA = totalHT * (tvaRate / 100);
    const totalTTC = totalHT + montantTVA;
    
    document.getElementById('totalHTMulti').textContent = totalHT.toFixed(2) + ' DH';
    document.getElementById('montantTVAMulti').textContent = montantTVA.toFixed(2) + ' DH';
    document.getElementById('totalTTCMulti').textContent = totalTTC.toFixed(2) + ' DH';
}

let selectedFilesMulti = [];
let allClientsMulti = [];
let filteredClientsMulti = [];

async function loadAllClientsMulti() {
    try {
        const result = await window.electron.dbMulti.getAllClients();
        if (result.success) {
            allClientsMulti = result.data;
        }
    } catch (error) {
        console.error('[MULTI] Error loading clients:', error);
    }
}

window.searchClientsMulti = function(query) {
    const dropdown = document.getElementById('clientsDropdownMulti');
    if (!dropdown) return;
    
    if (!query || query.trim().length === 0) {
        filteredClientsMulti = allClientsMulti;
    } else {
        const searchTerm = query.toLowerCase().trim();
        filteredClientsMulti = allClientsMulti.filter(client => 
            client.nom.toLowerCase().includes(searchTerm) || 
            client.ice.toLowerCase().includes(searchTerm)
        );
    }
    displayClientsListMulti();
}

function displayClientsListMulti() {
    const dropdown = document.getElementById('clientsDropdownMulti');
    if (!dropdown) return;
    
    if (filteredClientsMulti.length === 0) {
        dropdown.innerHTML = '<div class="dropdown-item no-results">Aucun client trouvé</div>';
        dropdown.style.display = 'block';
        return;
    }
    
    dropdown.innerHTML = filteredClientsMulti.slice(0, 10).map(client => `
        <div class="dropdown-item" style="display: flex; justify-content: space-between; align-items: center;">
            <div style="flex: 1;" onmousedown="selectClientMulti('${client.nom.replace(/'/g, "\\'")}', '${client.ice}')">
                <div class="client-name">${client.nom}</div>
                <div class="client-ice">ICE: ${client.ice}</div>
            </div>
            <button class="delete-client-btn" onclick="event.stopPropagation(); deleteClientMulti(${client.id}, '${client.nom.replace(/'/g, "\\'")}');" 
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

window.showClientsListMulti = function() {
    if (allClientsMulti.length > 0) {
        filteredClientsMulti = allClientsMulti;
        displayClientsListMulti();
    }
}

window.hideClientsListMulti = function() {
    setTimeout(() => {
        const dropdown = document.getElementById('clientsDropdownMulti');
        if (dropdown) dropdown.style.display = 'none';
    }, 200);
}

window.selectClientMulti = function(nom, ice) {
    document.getElementById('clientNomMulti').value = nom;
    document.getElementById('clientICEMulti').value = ice;
    const dropdown = document.getElementById('clientsDropdownMulti');
    if (dropdown) dropdown.style.display = 'none';
}

// Show custom delete error modal for MULTI
function showDeleteErrorModalMulti(clientName, errorMessage) {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.75);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        backdrop-filter: blur(4px);
        animation: fadeIn 0.2s ease-out;
    `;
    
    const isReferenceError = errorMessage.includes('referenced in existing invoices');
    
    const modal = document.createElement('div');
    modal.style.cssText = `
        background: linear-gradient(135deg, #2d2d30 0%, #1e1e1e 100%);
        border-radius: 16px;
        padding: 0;
        max-width: 500px;
        width: 90%;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        border: 1px solid #ff4444;
        animation: slideUp 0.3s ease-out;
        overflow: hidden;
    `;
    
    modal.innerHTML = `
        <style>
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes slideUp {
                from { transform: translateY(30px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
            @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.1); }
            }
        </style>
        <div style="background: linear-gradient(135deg, #ff4444 0%, #cc0000 100%); padding: 24px; text-align: center;">
            <div style="width: 64px; height: 64px; margin: 0 auto 16px; background: rgba(255, 255, 255, 0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; animation: pulse 2s infinite;">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
            </div>
            <h2 style="color: white; margin: 0; font-size: 24px; font-weight: 700;">تعذر حذف العميل</h2>
        </div>
        
        <div style="padding: 32px 24px;">
            <div style="background: rgba(255, 68, 68, 0.1); border: 1px solid rgba(255, 68, 68, 0.3); border-radius: 12px; padding: 20px; margin-bottom: 24px;">
                <div style="color: #fff; font-size: 16px; font-weight: 600; margin-bottom: 8px; display: flex; align-items: center; gap: 8px;">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff4444" stroke-width="2">
                        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"></path>
                        <line x1="12" y1="9" x2="12" y2="13"></line>
                        <line x1="12" y1="17" x2="12.01" y2="17"></line>
                    </svg>
                    <span>العميل: ${clientName}</span>
                </div>
                ${isReferenceError ? `
                    <p style="color: #ccc; margin: 12px 0 0 0; line-height: 1.6; font-size: 14px;">
                        Impossible de supprimer ce client car il est lié à des factures existantes dans le système. Vous devez d'abord supprimer toutes les factures associées à ce client.
                    </p>
                ` : `
                    <p style="color: #ccc; margin: 12px 0 0 0; line-height: 1.6; font-size: 14px;">
                        ${errorMessage}
                    </p>
                `}
            </div>
            
            ${isReferenceError ? `
                <div style="background: rgba(74, 144, 226, 0.1); border: 1px solid rgba(74, 144, 226, 0.3); border-radius: 12px; padding: 16px; margin-bottom: 24px;">
                    <div style="display: flex; align-items: start; gap: 12px;">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4a90e2" stroke-width="2" style="flex-shrink: 0; margin-top: 2px;">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="16" x2="12" y2="12"></line>
                            <line x1="12" y1="8" x2="12.01" y2="8"></line>
                        </svg>
                        <div style="color: #4a90e2; font-size: 13px; line-height: 1.5;">
                            <strong style="display: block; margin-bottom: 4px;">Conseil:</strong>
                            Vous pouvez afficher toutes les factures liées à ce client depuis la page de liste des factures, puis les supprimer si nécessaire.
                        </div>
                    </div>
                </div>
            ` : ''}
            
            <button onclick="this.closest('[style*=\\'position: fixed\\']').remove()" 
                    style="width: 100%; padding: 14px; background: linear-gradient(135deg, #4a90e2 0%, #357abd 100%); 
                           color: white; border: none; border-radius: 10px; font-size: 16px; font-weight: 600; 
                           cursor: pointer; transition: all 0.2s; box-shadow: 0 4px 12px rgba(74, 144, 226, 0.3);"
                    onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 16px rgba(74, 144, 226, 0.4)'"
                    onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 12px rgba(74, 144, 226, 0.3)'">
                فهمت
            </button>
        </div>
    `;
    
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.remove();
        }
    });
    
    const escapeHandler = (e) => {
        if (e.key === 'Escape') {
            overlay.remove();
            document.removeEventListener('keydown', escapeHandler);
        }
    };
    document.addEventListener('keydown', escapeHandler);
}

// Delete a client
window.deleteClientMulti = async function(clientId, clientName) {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.75);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        backdrop-filter: blur(4px);
        animation: fadeIn 0.2s ease-out;
    `;
    
    const modal = document.createElement('div');
    modal.style.cssText = `
        background: linear-gradient(135deg, #2d2d30 0%, #1e1e1e 100%);
        border-radius: 16px;
        padding: 0;
        max-width: 450px;
        width: 90%;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        border: 1px solid #ff9800;
        animation: slideUp 0.3s ease-out;
        overflow: hidden;
    `;
    
    modal.innerHTML = `
        <div style="background: linear-gradient(135deg, #ff9800 0%, #f57c00 100%); padding: 24px; text-align: center;">
            <div style="width: 64px; height: 64px; margin: 0 auto 16px; background: rgba(255, 255, 255, 0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5">
                    <path d="M3 6h18"></path>
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                    <line x1="10" y1="11" x2="10" y2="17"></line>
                    <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
            </div>
            <h2 style="color: white; margin: 0; font-size: 22px; font-weight: 700;">تأكيد الحذف</h2>
        </div>
        
        <div style="padding: 28px 24px;">
            <p style="color: #fff; font-size: 16px; margin: 0 0 20px 0; text-align: center; line-height: 1.6;">
                هل أنت متأكد من حذف العميل<br>
                <strong style="color: #ff9800; font-size: 18px;">"${clientName}"</strong>؟
            </p>
            
            <div style="background: rgba(255, 152, 0, 0.1); border: 1px solid rgba(255, 152, 0, 0.3); border-radius: 10px; padding: 14px; margin-bottom: 24px;">
                <p style="color: #ff9800; margin: 0; font-size: 13px; line-height: 1.5; text-align: center;">
                    ⚠️ تحذير: لا يمكن التراجع عن هذا الإجراء
                </p>
            </div>
            
            <div style="display: flex; gap: 12px;">
                <button id="cancelDeleteBtn" 
                        style="flex: 1; padding: 12px; background: #3e3e42; color: white; border: none; 
                               border-radius: 10px; font-size: 15px; font-weight: 600; cursor: pointer; 
                               transition: all 0.2s;"
                        onmouseover="this.style.background='#4e4e52'"
                        onmouseout="this.style.background='#3e3e42'">
                    إلغاء
                </button>
                <button id="confirmDeleteBtn" 
                        style="flex: 1; padding: 12px; background: linear-gradient(135deg, #ff4444 0%, #cc0000 100%); 
                               color: white; border: none; border-radius: 10px; font-size: 15px; font-weight: 600; 
                               cursor: pointer; transition: all 0.2s; box-shadow: 0 4px 12px rgba(255, 68, 68, 0.3);"
                        onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 16px rgba(255, 68, 68, 0.4)'"
                        onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 12px rgba(255, 68, 68, 0.3)'">
                    حذف
                </button>
            </div>
        </div>
    `;
    
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    
    modal.querySelector('#cancelDeleteBtn').addEventListener('click', () => {
        overlay.remove();
    });
    
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.remove();
        }
    });
    
    modal.querySelector('#confirmDeleteBtn').addEventListener('click', async () => {
        overlay.remove();
        
        try {
            const result = await window.electron.dbMulti.deleteClient(clientId);
            
            if (result.success) {
                window.notify.success('تم الحذف', `تم حذف الزبون "${clientName}" بنجاح`);
                await loadAllClientsMulti();
                searchClientsMulti(document.getElementById('clientNomMulti').value);
            } else {
                showDeleteErrorModalMulti(clientName, result.error || 'فشل حذف الزبون');
            }
        } catch (error) {
            console.error('Error deleting client:', error);
            showDeleteErrorModalMulti(clientName, 'حدث خطأ أثناء حذف الزبون');
        }
    });
}

function initializeInvoiceFormMulti() {
    setTimeout(() => {
        const dateInput = document.getElementById('documentDateMulti');
        if (dateInput) {
            dateInput.value = new Date().toISOString().split('T')[0];
        }
        
        const form = document.getElementById('invoiceFormMulti');
        if (form) {
            form.addEventListener('submit', handleInvoiceSubmitMulti);
        }
        
        const fileInput = document.getElementById('fileInputMulti');
        if (fileInput) {
            fileInput.addEventListener('change', handleFileSelectMulti);
        }
        
        selectedFilesMulti = [];
        loadAllClientsMulti();
    }, 100);
}

function handleFileSelectMulti(event) {
    const files = Array.from(event.target.files);
    const filesList = document.getElementById('filesListMulti');
    
    files.forEach(file => {
        const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf'];
        if (!validTypes.includes(file.type)) {
            window.notify.warning('Type de fichier non supporté', `Le fichier "${file.name}" n'est pas accepté.`, 4000);
            return;
        }
        
        if (file.size > 10 * 1024 * 1024) {
            window.notify.warning('Fichier trop volumineux', `Le fichier "${file.name}" dépasse 10MB`, 4000);
            return;
        }
        
        selectedFilesMulti.push(file);
        
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        fileItem.innerHTML = `
            <span class="file-icon">${file.type.includes('pdf') ? '📄' : '🖼️'}</span>
            <span class="file-name">${file.name}</span>
            <span class="file-size">${(file.size / 1024).toFixed(2)} KB</span>
            <button type="button" class="btn-delete-file" onclick="removeFileMulti(${selectedFilesMulti.length - 1})">✕</button>
        `;
        filesList.appendChild(fileItem);
    });
    
    event.target.value = '';
}

window.removeFileMulti = function(index) {
    selectedFilesMulti.splice(index, 1);
    updateFilesListMulti();
};

function updateFilesListMulti() {
    const filesList = document.getElementById('filesListMulti');
    filesList.innerHTML = '';
    
    selectedFilesMulti.forEach((file, index) => {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        fileItem.innerHTML = `
            <span class="file-icon">${file.type.includes('pdf') ? '📄' : '🖼️'}</span>
            <span class="file-name">${file.name}</span>
            <span class="file-size">${(file.size / 1024).toFixed(2)} KB</span>
            <button type="button" class="btn-delete-file" onclick="removeFileMulti(${index})">✕</button>
        `;
        filesList.appendChild(fileItem);
    });
}

async function checkDocumentNumberUniqueMulti(type, numero, numeroOrder = null) {
    try {
        const result = await window.electron.dbMulti.getAllInvoices('MULTI');
        if (!result.success) return true;
        
        const invoices = result.data;
        
        if (type === 'facture') {
            const duplicateFacture = invoices.find(inv => 
                inv.document_type === 'facture' && inv.document_numero === numero
            );
            if (duplicateFacture) {
                window.notify.error('Numéro de facture déjà utilisé', `Le N° Facture "${numero}" existe déjà.`, 5000);
                return false;
            }
            
            if (numeroOrder) {
                const duplicateOrder = invoices.find(inv => inv.document_numero_Order === numeroOrder);
                if (duplicateOrder) {
                    window.notify.error('Numéro de commande déjà utilisé', `Le N° Order "${numeroOrder}" existe déjà.`, 5000);
                    return false;
                }
            }
        } else if (type === 'devis') {
            const duplicateDevis = invoices.find(inv => 
                inv.document_type === 'devis' && inv.document_numero_devis === numero
            );
            if (duplicateDevis) {
                window.notify.error('Numéro de devis déjà utilisé', `Le N° Devis "${numero}" existe déjà.`, 5000);
                return false;
            }
        }
        
        return true;
    } catch (error) {
        console.error('[MULTI] Error checking document number:', error);
        return true;
    }
}

async function handleInvoiceSubmitMulti(e) {
    e.preventDefault();
    
    const loadingNotif = window.notify.loading('Enregistrement en cours...', 'Veuillez patienter');
    
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span>⏳ Enregistrement...</span>';
    submitBtn.disabled = true;
    
    try {
        const formData = {
            company_code: 'MULTI',
            client: {
                nom: document.getElementById('clientNomMulti').value,
                ICE: document.getElementById('clientICEMulti').value
            },
            document: {
                type: document.getElementById('documentTypeMulti').value,
                date: document.getElementById('documentDateMulti').value,
                numero: document.getElementById('documentNumeroMulti')?.value || ''
            },
            products: [],
            totals: {
                total_ht: parseFloat(document.getElementById('totalHTMulti').textContent.replace('DH', '').trim()) || 0,
                tva_rate: parseFloat(document.getElementById('tvaRateMulti').value) || 20,
                montant_tva: parseFloat(document.getElementById('montantTVAMulti').textContent.replace('DH', '').trim()) || 0,
                total_ttc: parseFloat(document.getElementById('totalTTCMulti').textContent.replace('DH', '').trim()) || 0
            }
        };
        
        const numeroOrder = document.getElementById('documentNumeroOrderMulti');
        if (numeroOrder && numeroOrder.value) {
            // Add the selected prefix to the order number
            const prefix = window.selectedMultiOrderPrefix;
            if (prefix) {
                formData.document.numero_Order = `${prefix}${numeroOrder.value}`;
            } else {
                formData.document.numero_Order = numeroOrder.value;
            }
        }
        
        const isUnique = await checkDocumentNumberUniqueMulti(
            formData.document.type,
            formData.document.numero,
            formData.document.numero_Order
        );
        
        if (!isUnique) {
            window.notify.remove(loadingNotif);
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            return;
        }
        
        if (formData.document.type === 'devis') {
            formData.document.numero_devis = formData.document.numero;
            delete formData.document.numero;
        }
        
        const rows = document.querySelectorAll('#productsTableBodyMulti tr');
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
        
        const result = await window.electron.dbMulti.createInvoice(formData);
        
        if (result.success) {
            const invoiceId = result.data.id;
            
            // Save attachments if any
            if (selectedFilesMulti.length > 0) {
                for (const file of selectedFilesMulti) {
                    const arrayBuffer = await file.arrayBuffer();
                    const uint8Array = new Uint8Array(arrayBuffer);
                    await window.electron.dbMulti.addAttachment(invoiceId, file.name, file.type, uint8Array);
                }
            }
            
            // Save notes if any
            const noteText = document.getElementById('invoiceNotesMulti')?.value?.trim();
            if (noteText) {
                await window.electron.dbMulti.saveNote(invoiceId, noteText);
            }
            
            window.notify.remove(loadingNotif);
            window.notify.success('Facture enregistrée avec succès!', `ID: ${invoiceId} - ${formData.client.nom}`, 4000);
            
            setTimeout(() => {
                router.navigate('/dashboard-multi');
            }, 1000);
        } else {
            throw new Error(result.error);
        }
    } catch (error) {
        console.error('[MULTI] Error saving invoice:', error);
        window.notify.remove(loadingNotif);
        window.notify.error('Erreur lors de l\'enregistrement', error.message || 'Une erreur est survenue.', 5000);
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

window.initCreateInvoiceMultiPage = async function() {
    console.log('🔄 [MULTI] Initializing invoice form page...');
    
    initializeInvoiceFormMulti();
    
    // Load and display last invoice number after DOM is ready
    setTimeout(async () => {
        try {
            const result = await window.electron.dbMulti.getAllInvoices('MULTI');
            console.log('📋 [MULTI] Last invoice result:', result);
            
            if (result.success && result.data && result.data.length > 0) {
                const lastInvoice = result.data[0]; // Already sorted by created_at DESC
                const lastNumber = lastInvoice.document_numero || lastInvoice.document_numero_devis || 'N/A';
                
                console.log('📋 [MULTI] Last invoice number:', lastNumber);
                
                const infoDiv = document.getElementById('lastInvoiceInfoMulti');
                const numberSpan = document.getElementById('lastInvoiceNumberMulti');
                
                console.log('📋 [MULTI] Elements found:', { infoDiv: !!infoDiv, numberSpan: !!numberSpan });
                
                if (infoDiv && numberSpan) {
                    numberSpan.textContent = lastNumber;
                    infoDiv.style.display = 'block';
                    console.log('✅ [MULTI] Last invoice number displayed');
                }
            }
        } catch (error) {
            console.error('❌ [MULTI] Error loading last invoice:', error);
        }
    }, 100);
};

// ==================== MULTI ORDER PREFIX FUNCTIONS ====================

// Initialize prefixes for MULTI Order (Global)
if (!window.multiOrderPrefixes) {
    window.multiOrderPrefixes = [];
    window.selectedMultiOrderPrefix = null;
    window.multiOrderPrefixesLoaded = false;
}

// Toggle MULTI order prefix dropdown (Global)
window.toggleMultiOrderPrefixDropdown = async function() {
    const dropdown = document.getElementById('multiOrderPrefixDropdown');
    if (!dropdown) return;
    
    if (dropdown.style.display === 'none') {
        await loadMultiOrderPrefixesFromDB();
        renderMultiOrderPrefixList();
        dropdown.style.display = 'block';
    } else {
        dropdown.style.display = 'none';
    }
}

// Render MULTI order prefix list (Global)
window.renderMultiOrderPrefixList = function() {
    const listContainer = document.getElementById('multiOrderPrefixList');
    if (!listContainer) return;
    
    // Add "No Prefix" option at the beginning
    const noPrefixOption = `
        <div onclick="selectMultiOrderPrefix('')" 
             style="margin: 0.35rem; padding: 0.75rem 1rem; cursor: pointer; border-radius: 8px; transition: all 0.3s; color: #fff; display: flex; justify-content: space-between; align-items: center; background: ${'' === window.selectedMultiOrderPrefix ? 'linear-gradient(90deg, #9c27b0 0%, #7b1fa2 100%)' : 'rgba(255,255,255,0.05)'}; border: 2px solid ${'' === window.selectedMultiOrderPrefix ? '#9c27b0' : 'transparent'}; box-shadow: ${'' === window.selectedMultiOrderPrefix ? '0 2px 8px rgba(156, 39, 176, 0.3)' : 'none'};"
             onmouseover="if('' !== window.selectedMultiOrderPrefix) { this.style.background='rgba(156, 39, 176, 0.2)'; this.style.borderColor='#9c27b0'; this.style.transform='translateX(5px)'; }" 
             onmouseout="if('' !== window.selectedMultiOrderPrefix) { this.style.background='rgba(255,255,255,0.05)'; this.style.borderColor='transparent'; this.style.transform='translateX(0)'; }">
            <div style="display: flex; align-items: center; gap: 0.75rem;">
                <span style="font-size: 1.2rem;">${'' === window.selectedMultiOrderPrefix ? '✓' : '🚫'}</span>
                <span style="font-weight: ${'' === window.selectedMultiOrderPrefix ? '700' : '500'}; font-size: 1rem; letter-spacing: 1px; font-style: italic; color: #9c27b0;">Sans Prefix</span>
            </div>
        </div>
    `;
    
    listContainer.innerHTML = noPrefixOption + window.multiOrderPrefixes.map((prefix, index) => `
        <div onclick="selectMultiOrderPrefix('${prefix}')" 
             style="margin: 0.35rem; padding: 0.75rem 1rem; cursor: pointer; border-radius: 8px; transition: all 0.3s; color: #fff; display: flex; justify-content: space-between; align-items: center; background: ${prefix === window.selectedMultiOrderPrefix ? 'linear-gradient(90deg, #2196f3 0%, #1976d2 100%)' : 'rgba(255,255,255,0.05)'}; border: 2px solid ${prefix === window.selectedMultiOrderPrefix ? '#2196f3' : 'transparent'}; box-shadow: ${prefix === window.selectedMultiOrderPrefix ? '0 2px 8px rgba(33, 150, 243, 0.3)' : 'none'};"
             onmouseover="if('${prefix}' !== window.selectedMultiOrderPrefix) { this.style.background='rgba(33, 150, 243, 0.2)'; this.style.borderColor='#2196f3'; this.style.transform='translateX(5px)'; }" 
             onmouseout="if('${prefix}' !== window.selectedMultiOrderPrefix) { this.style.background='rgba(255,255,255,0.05)'; this.style.borderColor='transparent'; this.style.transform='translateX(0)'; }">
            <div style="display: flex; align-items: center; gap: 0.75rem;">
                <span style="font-size: 1.2rem;">${prefix === window.selectedMultiOrderPrefix ? '✓' : '📌'}</span>
                <span style="font-weight: ${prefix === window.selectedMultiOrderPrefix ? '700' : '500'}; font-size: 1rem; letter-spacing: 1px;">${prefix}</span>
            </div>
            ${window.multiOrderPrefixes.length > 1 ? `
                <button onclick="event.stopPropagation(); deleteMultiOrderPrefix('${prefix}')" 
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

// Select MULTI order prefix (Global)
window.selectMultiOrderPrefix = function(prefix) {
    console.log('🔵 [MULTI ORDER PREFIX SELECT] Selecting prefix:', prefix);
    window.selectedMultiOrderPrefix = prefix;
    
    // Save to localStorage
    try {
        localStorage.setItem('lastSelectedMultiOrderPrefix', prefix);
        console.log('💾 [MULTI ORDER PREFIX] Saved to localStorage:', prefix);
    } catch (error) {
        console.error('❌ [MULTI ORDER PREFIX] Error saving to localStorage:', error);
    }
    
    const prefixInput = document.getElementById('multiOrderPrefixInput');
    const prefixExample = document.getElementById('multiOrderPrefixExample');
    
    if (prefixInput) {
        prefixInput.value = prefix;
        console.log('✅ [MULTI ORDER PREFIX SELECT] Updated multiOrderPrefixInput to:', prefix);
    }
    
    if (prefixExample) {
        prefixExample.textContent = prefix;
        console.log('✅ [MULTI ORDER PREFIX SELECT] Updated multiOrderPrefixExample to:', prefix);
    }
    
    const dropdown = document.getElementById('multiOrderPrefixDropdown');
    if (dropdown) {
        dropdown.style.display = 'none';
    }
    
    renderMultiOrderPrefixList();
}

// Add new MULTI order prefix (Global)
window.addNewMultiOrderPrefix = async function() {
    const newPrefixInput = document.getElementById('newMultiOrderPrefixInput');
    if (!newPrefixInput) return;
    
    const newPrefix = newPrefixInput.value.trim().toUpperCase();
    
    if (!newPrefix) {
        window.notify.warning('Attention', 'Veuillez saisir un prefix', 2000);
        return;
    }
    
    if (window.multiOrderPrefixes.includes(newPrefix)) {
        window.notify.warning('Attention', 'Ce prefix existe déjà', 2000);
        return;
    }
    
    const result = await window.electron.dbMulti.addMultiOrderPrefix(newPrefix);
    
    if (result.success) {
        window.multiOrderPrefixes.push(newPrefix);
        window.multiOrderPrefixes.sort();
        newPrefixInput.value = '';
        
        renderMultiOrderPrefixList();
        window.notify.success('Succès', `Prefix "${newPrefix}" ajouté`, 2000);
    } else {
        window.notify.error('Erreur', result.error || 'Impossible d\'ajouter le prefix', 3000);
    }
}

// Delete MULTI order prefix (Global)
window.deleteMultiOrderPrefix = async function(prefix) {
    if (window.multiOrderPrefixes.length <= 1) {
        window.notify.warning('Attention', 'Vous devez garder au moins un prefix', 2000);
        return;
    }
    
    const result = await window.electron.dbMulti.deleteMultiOrderPrefix(prefix);
    
    if (result.success) {
        const index = window.multiOrderPrefixes.indexOf(prefix);
        if (index > -1) {
            window.multiOrderPrefixes.splice(index, 1);
            
            if (window.selectedMultiOrderPrefix === prefix) {
                window.selectedMultiOrderPrefix = window.multiOrderPrefixes[0];
                const prefixInput = document.getElementById('multiOrderPrefixInput');
                const prefixExample = document.getElementById('multiOrderPrefixExample');
                if (prefixInput) prefixInput.value = window.selectedMultiOrderPrefix;
                if (prefixExample) prefixExample.textContent = window.selectedMultiOrderPrefix;
            }
            
            renderMultiOrderPrefixList();
            window.notify.success('Succès', `Prefix "${prefix}" supprimé`, 2000);
        }
    } else {
        window.notify.error('Erreur', result.error || 'Impossible de supprimer le prefix', 3000);
    }
}

// Load MULTI order prefixes from database
async function loadMultiOrderPrefixesFromDB() {
    try {
        const result = await window.electron.dbMulti.getMultiOrderPrefixes();
        if (result.success && result.data && result.data.length > 0) {
            window.multiOrderPrefixes = result.data;
            console.log('✅ [MULTI ORDER PREFIX] Loaded from DB:', window.multiOrderPrefixes);
            
            // Try to load last selected prefix from localStorage
            let lastSelected = null;
            try {
                lastSelected = localStorage.getItem('lastSelectedMultiOrderPrefix');
                console.log('💾 [MULTI ORDER PREFIX] Retrieved from localStorage:', lastSelected);
            } catch (error) {
                console.error('❌ [MULTI ORDER PREFIX] Error reading from localStorage:', error);
            }
            
            // Use last selected if it exists in the list, otherwise use first
            if (lastSelected && window.multiOrderPrefixes.includes(lastSelected)) {
                window.selectedMultiOrderPrefix = lastSelected;
                console.log('✅ [MULTI ORDER PREFIX] Using last selected:', lastSelected);
            } else {
                window.selectedMultiOrderPrefix = window.multiOrderPrefixes[0] || null;
                console.log('✅ [MULTI ORDER PREFIX] Using first prefix:', window.selectedMultiOrderPrefix);
            }
        } else {
            window.multiOrderPrefixes = [];
            window.selectedMultiOrderPrefix = null;
            console.log('ℹ️ [MULTI ORDER PREFIX] No prefixes found in database');
        }
    } catch (error) {
        console.error('❌ [MULTI ORDER PREFIX] Error loading from DB:', error);
        window.multiOrderPrefixes = [];
        window.selectedMultiOrderPrefix = null;
    }
}

// ==================== END MULTI ORDER PREFIX FUNCTIONS ====================

// ==================== MULTI MISSING NUMBERS FUNCTIONS ====================

// Show missing invoice numbers for MULTI (Global)
window.showMissingNumbersMulti = async function(selectedYear = null) {
    const currentYear = selectedYear || new Date().getFullYear();
    console.log('🔍 [MULTI FRONTEND] showMissingNumbersMulti called for year:', currentYear);
    
    try {
        console.log('🔍 [MULTI FRONTEND] Calling getMultiMissingNumbers...');
        const result = await window.electron.dbMulti.getMultiMissingNumbers(currentYear);
        console.log('🔍 [MULTI FRONTEND] Result:', result);
        
        if (!result.success) {
            window.notify.error('Erreur', result.error || 'Impossible de charger les numéros manquants', 3000);
            return;
        }
        
        const missingNumbers = result.data || [];
        const stats = result.stats || {};
        
        // Get all available years from invoices
        const invoicesResult = await window.electron.dbMulti.getAllInvoices('MULTI');
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
        modal.id = 'missingNumbersModalMulti';
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
                    <select id="yearFilterMultiMissing" onchange="window.showMissingNumbersMulti(this.value === 'all' ? null : parseInt(this.value))" 
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
                    <button type="button" onclick="selectMissingNumberMulti(${num})" 
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
            
            <button type="button" onclick="document.getElementById('missingNumbersModalMulti').remove()" 
                    style="width: 100%; padding: 0.75rem; background: #3e3e42; color: #fff; border: none; border-radius: 8px; cursor: pointer; font-size: 1rem; transition: all 0.3s;"
                    onmouseover="this.style.background='#4e4e52';"
                    onmouseout="this.style.background='#3e3e42';">
                Fermer
            </button>
        `;
        
        modal.appendChild(content);
        
        // Remove existing modal if any
        const existingModal = document.getElementById('missingNumbersModalMulti');
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

// Select missing number and fill input for MULTI (Global)
window.selectMissingNumberMulti = function(number) {
    const input = document.getElementById('documentNumeroMulti');
    if (input) {
        // Use number as is, without adding leading zeros
        input.value = String(number);
        input.focus();
        
        // Close modal
        const modal = document.querySelector('[style*="position: fixed"]');
        if (modal) modal.remove();
        
        window.notify.success('Succès', `Numéro ${number} sélectionné`, 2000);
    }
};

// Show missing devis numbers for MULTI (Global)
window.showMissingDevisNumbersMulti = async function(selectedYear = null) {
    const currentYear = selectedYear || new Date().getFullYear();
    console.log('🔍 [MULTI DEVIS FRONTEND] showMissingDevisNumbersMulti called for year:', currentYear);
    
    try {
        console.log('🔍 [MULTI DEVIS FRONTEND] Calling getMultiMissingDevisNumbers...');
        const result = await window.electron.dbMulti.getMultiMissingDevisNumbers(currentYear);
        console.log('🔍 [MULTI DEVIS FRONTEND] Result:', result);
        
        if (!result.success) {
            window.notify.error('Erreur', result.error || 'Impossible de charger les numéros manquants', 3000);
            return;
        }
        
        const missingNumbers = result.data || [];
        const stats = result.stats || {};
        
        // Get all available years from invoices
        const invoicesResult = await window.electron.dbMulti.getAllInvoices('MULTI');
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
        modal.id = 'missingDevisNumbersModalMulti';
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
                    <select id="yearFilterMultiDevisMissing" onchange="window.showMissingDevisNumbersMulti(this.value === 'all' ? null : parseInt(this.value))" 
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
                    <button type="button" onclick="selectMissingNumberMulti(${num})" 
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
            
            <button type="button" onclick="document.getElementById('missingDevisNumbersModalMulti').remove()" 
                    style="width: 100%; padding: 0.75rem; background: #3e3e42; color: #fff; border: none; border-radius: 8px; cursor: pointer; font-size: 1rem; transition: all 0.3s;"
                    onmouseover="this.style.background='#4e4e52';"
                    onmouseout="this.style.background='#3e3e42';">
                Fermer
            </button>
        `;
        
        modal.appendChild(content);
        
        // Remove existing modal if any
        const existingModal = document.getElementById('missingDevisNumbersModalMulti');
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

// ==================== END MULTI MISSING NUMBERS FUNCTIONS ====================
