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
        console.error('[MULTI] Error getting last numbers:', error);
    }

    let html = '<div class="form-row">';

    if (type === 'facture') {
        html += `
            <div class="form-field">
                <label>N° Facture <span class="required">*</span></label>
                <input type="text" id="documentNumeroMulti" placeholder="Saisir les chiffres (ex: 001)" required 
                       onblur="formatInvoiceNumberMulti(this)" 
                       style="width: 100%;">
                <small style="color: #999; font-size: 0.85rem;">Saisir uniquement les chiffres, MTT et l'année seront ajoutés automatiquement</small>
                ${lastNumbers.main !== 'Aucun' ? `<small style="color: #4caf50; font-size: 0.8rem; display: block; margin-top: 0.25rem;">📌 Dernier numéro: ${lastNumbers.main}</small>` : ''}
            </div>
        `;
        html += '</div>';
        
        html += `
            <div class="form-row optional-field">
                <div class="toggle-container">
                    <label class="toggle-label">
                        <input type="checkbox" id="toggleOrderMulti" onchange="toggleOptionalFieldMulti('Order')">
                        <span class="toggle-switch"></span>
                        <span class="toggle-text">N° Order</span>
                    </label>
                </div>
                <div class="form-field" id="fieldOrderMulti" style="display: none;">
                    <label>N° Order</label>
                    <input type="text" id="documentNumeroOrderMulti" placeholder="Ex: 123" onblur="autoFormatOrderNumberMulti(this)">
                    <small style="color: #999; font-size: 0.85rem;">Ex: 123 → 123/2025</small>
                    ${lastNumbers.order !== 'Aucun' ? `<small style="color: #2196f3; font-size: 0.8rem; display: block; margin-top: 0.25rem;">📌 Dernier N° Order: ${lastNumbers.order}</small>` : ''}
                </div>
            </div>
        `;
    } else if (type === 'devis') {
        html += `
            <div class="form-field">
                <label>N° Devis <span class="required">*</span></label>
                <input type="text" id="documentNumeroMulti" placeholder="Saisir les chiffres (ex: 001)" required 
                       onblur="formatInvoiceNumberMulti(this)" 
                       style="width: 100%;">
                <small style="color: #999; font-size: 0.85rem;">Saisir uniquement les chiffres, MTT et l'année seront ajoutés automatiquement</small>
                ${lastNumbers.main !== 'Aucun' ? `<small style="color: #9c27b0; font-size: 0.8rem; display: block; margin-top: 0.25rem;">📌 Dernier numéro: ${lastNumbers.main}</small>` : ''}
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

// Auto-format N° Order to add /year when user leaves the field
window.autoFormatOrderNumberMulti = function(input) {
    const value = input.value.trim();
    if (value && !value.includes('/')) {
        const numbers = value.replace(/[^0-9]/g, '');
        if (numbers) {
            const year = new Date().getFullYear();
            input.value = `${numbers}/${year}`;
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
            <textarea class="product-designation" rows="2" placeholder="Description du produit..."></textarea>
        </td>
        <td>
            <input type="text" class="product-quantity" placeholder="ex: 50 Kg, F, 10"
                   onchange="calculateRowTotalMulti('${rowId}')" onblur="calculateRowTotalMulti('${rowId}')">
        </td>
        <td>
            <input type="number" class="product-price" step="0.01" placeholder="0.00"
                   onchange="calculateRowTotalMulti('${rowId}')" onblur="calculateRowTotalMulti('${rowId}')">
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
        <div class="dropdown-item" onmousedown="selectClientMulti('${client.nom.replace(/'/g, "\\'")}', '${client.ice}')">
            <div class="client-name">${client.nom}</div>
            <div class="client-ice">ICE: ${client.ice}</div>
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
            formData.document.numero_Order = numeroOrder.value;
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
            let quantity = row.querySelector('.product-quantity').value.trim();
            const price = parseFloat(row.querySelector('.product-price').value) || 0;
            
            if (quantity.toUpperCase() === 'F') {
                quantity = '1';
            }
            
            const qty = parseFloat(quantity) || 0;
            const total_ht = qty * price;
            
            if (designation) {
                formData.products.push({
                    designation,
                    quantite: quantity || '0',
                    prix_unitaire_ht: price,
                    total_ht: total_ht
                });
            }
        });
        
        const result = await window.electron.dbMulti.createInvoice(formData);
        
        if (result.success) {
            const invoiceId = result.data.id;
            
            if (selectedFilesMulti.length > 0) {
                for (const file of selectedFilesMulti) {
                    const arrayBuffer = await file.arrayBuffer();
                    const uint8Array = new Uint8Array(arrayBuffer);
                    await window.electron.dbMulti.addAttachment(invoiceId, file.name, file.type, uint8Array);
                }
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
