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
                <input type="text" id="documentNumero" placeholder="Ex: 123" required 
                       onblur="autoFormatDocumentNumberOnBlur(this)" style="width: 100%;">
                <small style="color: #999; font-size: 0.85rem;">Ex: 123 → 123/2025</small>
                ${lastNumbers.main !== 'Aucun' ? `<small style="color: #4caf50; font-size: 0.8rem; display: block; margin-top: 0.25rem;">📌 Dernier numéro: ${lastNumbers.main}</small>` : ''}
            </div>
        `;
        html += '</div>';
        
        // Optional field with toggle
        html += `
            <div class="form-row optional-field">
                <div class="toggle-container">
                    <label class="toggle-label">
                        <input type="checkbox" id="toggleOrder" onchange="toggleOptionalField('Order')">
                        <span class="toggle-switch"></span>
                        <span class="toggle-text">N° Order</span>
                    </label>
                </div>
                <div class="form-field" id="fieldOrder" style="display: none;">
                    <label>N° Order</label>
                    <input type="text" id="documentNumeroOrder" placeholder="Ex: 123">
                    ${lastNumbers.order !== 'Aucun' ? `<small style="color: #2196f3; font-size: 0.8rem; display: block; margin-top: 0.25rem;">📌 Dernier N° Order: ${lastNumbers.order}</small>` : ''}
                </div>
            </div>
        `;
    } else if (type === 'devis') {
        html += `
            <div class="form-field">
                <label>N° Devis <span class="required">*</span></label>
                <input type="text" id="documentNumero" placeholder="Ex: 123" required 
                       onblur="autoFormatDocumentNumberOnBlur(this)" style="width: 100%;">
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

// Add product row (Global)
let productRowCounter = 0;
window.addProductRow = function() {
    const tbody = document.getElementById('productsTableBody');
    const rowId = `product-${productRowCounter++}`;
    
    const row = document.createElement('tr');
    row.id = rowId;
    row.innerHTML = `
        <td>
            <input type="text" class="product-designation" placeholder="Description du produit...">
        </td>
        <td>
            <input type="text" class="product-quantity" placeholder="ex: 50 Kg, F, 10"
                   onchange="calculateRowTotal('${rowId}')" onblur="calculateRowTotal('${rowId}')">
        </td>
        <td>
            <input type="number" class="product-price" step="0.01" placeholder="0.00"
                   onchange="calculateRowTotal('${rowId}')" onblur="calculateRowTotal('${rowId}')">
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
            formData.document.numero_Order = numeroOrder.value;
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
            let quantity = row.querySelector('.product-quantity').value.trim();
            const price = parseFloat(row.querySelector('.product-price').value) || 0;
            
            console.log('🔍 MRY BEFORE conversion - Quantity:', quantity, 'Type:', typeof quantity);
            
            // Convert 'F' or 'f' to '1'
            if (quantity.toUpperCase() === 'F') {
                console.log('✅ MRY Converting F to 1');
                quantity = '1';
            }
            
            console.log('🔍 MRY AFTER conversion - Quantity:', quantity, 'Type:', typeof quantity);
            
            // Calculate total_ht directly from quantity and price
            const qty = parseFloat(quantity) || 0;
            const total_ht = qty * price;
            
            console.log('💾 MRY Saving product:', {
                designation,
                quantity,
                qty_parsed: qty,
                price,
                calculated_total: total_ht
            });
            
            // Save product if it has at least a designation
            if (designation) {
                formData.products.push({
                    designation,
                    quantite: quantity || '0',
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
