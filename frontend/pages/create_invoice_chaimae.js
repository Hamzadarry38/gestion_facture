// Create Invoice Page - Chaimae Company
function CreateInvoiceChaimaePage() {
    return `
        <div class="desktop-app">
            <div class="window-header">
                <div class="window-title">
                    <img src="assets/logos/chaimae.png" class="header-logo" alt="Chaimae Company" data-asset="assets/logos/chaimae.png">
                    <span>Chaimae Company - Créer un document</span>
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
                                           autocomplete="off" required oninput="searchClientsChaimae(this.value)" 
                                           onfocus="showClientsListChaimae()" onblur="hideClientsListChaimae()">
                                    <div id="clientsDropdownChaimae" class="clients-dropdown" style="display: none;"></div>
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
                                    <select id="documentType" required onchange="handleDocumentTypeChangeChaimae()">
                                        <option value="">Choisir le type de document</option>
                                        <option value="facture">Facture</option>
                                        <option value="devis">Devis</option>
                                        <option value="bon_livraison">Bon de livraison</option>
                                    </select>
                                </div>
                                <div class="form-field">
                                    <label>Date <span class="required">*</span></label>
                                    <input type="date" id="documentDate" required>
                                </div>
                            </div>

                            <!-- Dynamic Fields Container -->
                            <div id="dynamicFieldsChaimae"></div>
                        </div>
                    </div>

                    <!-- Section 3: Attachments -->
                    <div class="invoice-section">
                        <div class="section-header">
                            <h2>📎 Pièces jointes</h2>
                        </div>
                        <div class="section-body">
                            <div class="file-upload-area">
                                <input type="file" id="fileInputChaimae" accept=".png,.jpg,.jpeg,.pdf" multiple style="display: none;">
                                <button type="button" class="upload-btn" onclick="document.getElementById('fileInputChaimae').click()">
                                    <span>📁 Choisir des fichiers (PNG, JPG, PDF)</span>
                                </button>
                                <div id="filesListChaimae" class="files-list"></div>
                            </div>
                        </div>
                    </div>

                    <!-- Section 4: Products -->
                    <div class="invoice-section">
                        <div class="section-header">
                            <h2>📊 Produits et services</h2>
                            <button type="button" class="add-product-btn" onclick="addProductRowChaimae()">
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
                                    <tbody id="productsTableBodyChaimae">
                                        <!-- Products will be added here -->
                                    </tbody>
                                </table>
                            </div>

                            <!-- Summary -->
                            <div class="invoice-summary">
                                <div class="summary-row">
                                    <span>Total HT:</span>
                                    <span id="totalHTChaimae">0.00 DH</span>
                                </div>
                                <div class="summary-row">
                                    <span>TVA:</span>
                                    <div class="tva-input">
                                        <input type="number" id="tvaRateChaimae" value="20" min="0" max="100" onchange="calculateTotalsChaimae()">
                                        <span>%</span>
                                    </div>
                                </div>
                                <div class="summary-row">
                                    <span>Montant TVA:</span>
                                    <span id="montantTVAChaimae">0.00 DH</span>
                                </div>
                                <div class="summary-row total">
                                    <span>Total TTC:</span>
                                    <span id="totalTTCChaimae">0.00 DH</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Form Actions -->
                    <div class="form-actions">
                        <button type="button" class="btn-secondary" onclick="router.navigate('/dashboard-chaimae')">
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

// Handle document type change for Chaimae (Global)
window.handleDocumentTypeChangeChaimae = async function() {
    const type = document.getElementById('documentType').value;
    const container = document.getElementById('dynamicFieldsChaimae');
    
    if (!type) {
        container.innerHTML = '';
        return;
    }

    // Get last numbers from database for all fields
    let lastNumbers = {
        main: 'Aucun',
        order: 'Aucun',
        bonLivraison: 'Aucun',
        bonCommande: 'Aucun'
    };
    
    try {
        const invoicesResult = await window.electron.dbChaimae.getAllInvoices();
        if (invoicesResult.success && invoicesResult.data && invoicesResult.data.length > 0) {
            const invoices = invoicesResult.data;
            
            // Get last main number based on type - filter by type first!
            if (type === 'facture') {
                // Get only factures and sort by ID descending to get the most recent
                const factures = invoices.filter(inv => inv.document_type === 'facture' && inv.document_numero);
                if (factures.length > 0) {
                    // Sort by ID descending to get the latest
                    factures.sort((a, b) => b.id - a.id);
                    lastNumbers.main = factures[0].document_numero;
                }
                
                // Get last N° Order from factures only
                const facturesWithOrder = invoices.filter(inv => inv.document_type === 'facture' && inv.document_numero_Order);
                if (facturesWithOrder.length > 0) {
                    facturesWithOrder.sort((a, b) => b.id - a.id);
                    lastNumbers.order = facturesWithOrder[0].document_numero_Order;
                }
                
                // Get last Bon de livraison from factures only
                const facturesWithBL = invoices.filter(inv => inv.document_type === 'facture' && inv.document_bon_de_livraison);
                if (facturesWithBL.length > 0) {
                    facturesWithBL.sort((a, b) => b.id - a.id);
                    lastNumbers.bonLivraison = facturesWithBL[0].document_bon_de_livraison;
                }
            } else if (type === 'devis') {
                // Get only devis and sort by ID descending
                const devisList = invoices.filter(inv => inv.document_type === 'devis' && inv.document_numero_devis);
                if (devisList.length > 0) {
                    devisList.sort((a, b) => b.id - a.id);
                    lastNumbers.main = devisList[0].document_numero_devis;
                }
            } else if (type === 'bon_livraison') {
                // Get only bon_livraison and sort by ID descending
                const bonsList = invoices.filter(inv => 
                    (inv.document_type === 'bon_livraison' || inv.document_type === 'bon de livraison') && 
                    (inv.document_numero || inv.document_bon_de_livraison || inv.document_numero_bl)
                );
                if (bonsList.length > 0) {
                    bonsList.sort((a, b) => b.id - a.id);
                    lastNumbers.main = bonsList[0].document_numero || bonsList[0].document_bon_de_livraison || bonsList[0].document_numero_bl;
                }
                
                // Get last N° Order from bon_livraison only
                const bonsWithCommande = invoices.filter(inv => 
                    (inv.document_type === 'bon_livraison' || inv.document_type === 'bon de livraison') && 
                    inv.document_numero_commande
                );
                if (bonsWithCommande.length > 0) {
                    bonsWithCommande.sort((a, b) => b.id - a.id);
                    lastNumbers.bonCommande = bonsWithCommande[0].document_numero_commande;
                }
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
                <input type="text" id="documentNumeroChaimae" placeholder="Ex: 123" required 
                       onblur="autoFormatDocumentNumberOnBlurChaimae(this)" style="width: 100%;">
                <small style="color: #999; font-size: 0.85rem;">Ex: 123 → 123/2025</small>
                ${lastNumbers.main !== 'Aucun' ? `<small style="color: #4caf50; font-size: 0.8rem; display: block; margin-top: 0.25rem;">📌 Dernier numéro: ${lastNumbers.main}</small>` : ''}
            </div>
        `;
        html += '</div>';
        
        // Optional fields: N° Order + Bon de livraison
        html += `
            <div class="form-row optional-field">
                <div class="toggle-container">
                    <label class="toggle-label">
                        <input type="checkbox" id="toggleOrderChaimae" onchange="toggleOptionalFieldChaimae('Order')">
                        <span class="toggle-switch"></span>
                        <span class="toggle-text">N° Order</span>
                    </label>
                    <small style="color: #999; margin-left: 0.5rem;">Entrez le numéro et l'année sera ajoutée automatiquement (2025)</small>
                </div>
                <div class="form-field" id="fieldOrderChaimae" style="display: none;">
                    <label>N° Order</label>
                    <input type="text" id="documentNumeroOrderChaimae" placeholder="Ex: 123" 
                           onblur="autoFormatDocumentNumberOnBlurChaimae(this)">
                    ${lastNumbers.order !== 'Aucun' ? `<small style="color: #2196f3; font-size: 0.8rem; display: block; margin-top: 0.25rem;">📌 Dernier N° Order: ${lastNumbers.order}</small>` : ''}
                </div>
            </div>
            
            <div class="form-row optional-field">
                <div class="toggle-container">
                    <label class="toggle-label">
                        <input type="checkbox" id="toggleBonLivraisonChaimae" onchange="toggleOptionalFieldChaimae('BonLivraison')">
                        <span class="toggle-switch"></span>
                        <span class="toggle-text">Bon de livraison</span>
                    </label>
                    <small style="color: #999; margin-left: 0.5rem;">Entrez le numéro et l'année sera ajoutée automatiquement (2025)</small>
                </div>
                <div class="form-field" id="fieldBonLivraisonChaimae" style="display: none;">
                    <label>Bon de livraison</label>
                    <input type="text" id="documentBonLivraisonChaimae" placeholder="Ex: 123" 
                           onblur="autoFormatDocumentNumberOnBlurChaimae(this)">
                    ${lastNumbers.bonLivraison !== 'Aucun' ? `<small style="color: #4caf50; font-size: 0.8rem; display: block; margin-top: 0.25rem;">📌 Dernier Bon de livraison: ${lastNumbers.bonLivraison}</small>` : ''}
                </div>
            </div>
        `;
    } else if (type === 'devis') {
        html += `
            <div class="form-field">
                <label>N° Devis <span class="required">*</span></label>
                <input type="text" id="documentNumeroChaimae" placeholder="Ex: 123" required 
                       onblur="autoFormatDocumentNumberOnBlurChaimae(this)" style="width: 100%;">
                <small style="color: #999; font-size: 0.85rem;">Ex: 123 → 123/2025</small>
                ${lastNumbers.main !== 'Aucun' ? `<small style="color: #9c27b0; font-size: 0.8rem; display: block; margin-top: 0.25rem;">📌 Dernier numéro: ${lastNumbers.main}</small>` : ''}
            </div>
        `;
        html += '</div>';
    } else if (type === 'bon_livraison') {
        // Bon de livraison: Numéro de bon de livraison (required) with prefix selector
        html += `
            <div class="form-field" style="position: relative;">
                <label>Numéro de bon de livraison <span class="required">*</span></label>
                <div style="display: flex; gap: 0.5rem; align-items: flex-start;">
                    <div style="position: relative; flex: 0 0 auto;">
                        <input type="text" id="prefixInputChaimae" placeholder="MG" 
                               style="width: 80px; padding: 0.75rem; background: #2d2d30; border: 2px solid #3e3e42; border-radius: 8px; color: #fff; font-size: 1rem; outline: none; cursor: pointer; font-weight: 600;"
                               readonly onclick="togglePrefixDropdownChaimae()">
                        <div id="prefixDropdownChaimae" style="display: none; position: absolute; top: 100%; left: 0; background: linear-gradient(135deg, #1e1e1e 0%, #2d2d30 100%); border: 2px solid #667eea; border-radius: 12px; margin-top: 0.5rem; box-shadow: 0 8px 24px rgba(102, 126, 234, 0.3), 0 0 0 1px rgba(102, 126, 234, 0.1); z-index: 1000; min-width: 200px; max-height: 350px; overflow: hidden;">
                            <div style="padding: 0.75rem 1rem; background: linear-gradient(90deg, #667eea 0%, #764ba2 100%); border-bottom: 2px solid rgba(102, 126, 234, 0.3);">
                                <h4 style="margin: 0; color: #fff; font-size: 0.95rem; font-weight: 600; letter-spacing: 0.5px;">📋 Choisir un Prefix</h4>
                            </div>
                            <div id="prefixListChaimae" style="max-height: 200px; overflow-y: auto; padding: 0.5rem;"></div>
                            <div style="padding: 0.75rem; border-top: 2px solid rgba(102, 126, 234, 0.2); background: rgba(0,0,0,0.2);">
                                <input type="text" id="newPrefixInputChaimae" placeholder="Nouveau prefix (ex: ABC)" 
                                       style="width: 100%; padding: 0.65rem; background: #1e1e1e; border: 2px solid #3e3e42; border-radius: 6px; color: #fff; font-size: 0.9rem; outline: none; transition: all 0.3s;"
                                       onfocus="this.style.borderColor='#667eea'; this.style.boxShadow='0 0 0 3px rgba(102, 126, 234, 0.1)';"
                                       onblur="this.style.borderColor='#3e3e42'; this.style.boxShadow='none';"
                                       onkeypress="if(event.key==='Enter'){addNewPrefixChaimae(); event.preventDefault();}">
                                <button type="button" onclick="addNewPrefixChaimae()" 
                                        style="width: 100%; margin-top: 0.5rem; padding: 0.65rem; background: linear-gradient(90deg, #667eea 0%, #764ba2 100%); color: #fff; border: none; border-radius: 6px; cursor: pointer; font-size: 0.9rem; font-weight: 600; transition: all 0.3s; box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);"
                                        onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 12px rgba(102, 126, 234, 0.4)';"
                                        onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 8px rgba(102, 126, 234, 0.3)';">
                                    ➕ Ajouter le Prefix
                                </button>
                            </div>
                        </div>
                    </div>
                    <input type="text" id="documentNumeroChaimae" placeholder="123/2025" required 
                           style="flex: 1; padding: 0.75rem; background: #2d2d30; border: 2px solid #3e3e42; border-radius: 8px; color: #fff; font-size: 1rem; outline: none;"
                           onblur="formatBonLivraisonWithPrefixChaimae(this)">
                </div>
                <small style="color: #999; font-size: 0.85rem; display: block; margin-top: 0.5rem;">Ex: 123 → <span id="prefixExampleChaimae">MG</span>123/2025</small>
                ${lastNumbers.main !== 'Aucun' ? `<small style="color: #ff9800; font-size: 0.8rem; display: block; margin-top: 0.25rem;">📌 Dernier numéro: ${lastNumbers.main}</small>` : ''}
            </div>
        `;
        html += '</div>';
        
        // Optional field: N° Order
        html += `
            <div class="form-row optional-field">
                <div class="toggle-container">
                    <label class="toggle-label">
                        <input type="checkbox" id="toggleBonCommandeChaimae" onchange="toggleOptionalFieldChaimae('BonCommande')">
                        <span class="toggle-switch"></span>
                        <span class="toggle-text">N° Order</span>
                    </label>
                </div>
                <div class="form-field" id="fieldBonCommandeChaimae" style="display: none;">
                    <label>N° Order</label>
                    <input type="text" id="documentBonCommandeChaimae" placeholder="Exemple: BC-456">
                    ${lastNumbers.bonCommande !== 'Aucun' ? `<small style="color: #ff9800; font-size: 0.8rem; display: block; margin-top: 0.25rem;">📌 Dernier N° Order: ${lastNumbers.bonCommande}</small>` : ''}
                </div>
            </div>
        `;
    }

    container.innerHTML = html;
}

// Use suggested number for Chaimae (Global)
window.useSuggestedNumberChaimae = function(number) {
    const input = document.getElementById('documentNumeroChaimae');
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

// Toggle optional field visibility for Chaimae (Global)
window.toggleOptionalFieldChaimae = function(fieldName) {
    const checkbox = document.getElementById(`toggle${fieldName}Chaimae`);
    const field = document.getElementById(`field${fieldName}Chaimae`);
    const inputId = fieldName === 'Order' ? 'documentNumeroOrderChaimae' : 
                    fieldName === 'BonLivraison' ? 'documentBonLivraisonChaimae' : 
                    'documentBonCommandeChaimae';
    const input = document.getElementById(inputId);
    
    if (checkbox.checked) {
        field.style.display = 'block';
        input.required = false;
    } else {
        field.style.display = 'none';
        input.value = '';
        input.required = false;
    }
}

// Auto-format document number on blur for Chaimae (Global)
window.autoFormatDocumentNumberOnBlurChaimae = function(input) {
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

// Initialize prefixes for Bon de livraison (Global)
if (!window.bonLivraisonPrefixes) {
    window.bonLivraisonPrefixes = ['MG', 'TL', 'BL'];
    window.selectedPrefix = 'MG';
    window.prefixesLoaded = false;
}

// Load prefixes from database (async)
async function loadPrefixesFromDB() {
    if (window.prefixesLoaded) return;
    
    try {
        const result = await window.electron.dbChaimae.getAllPrefixes();
        if (result.success && result.data.length > 0) {
            window.bonLivraisonPrefixes = result.data;
            window.selectedPrefix = result.data[0];
            window.prefixesLoaded = true;
        }
    } catch (error) {
        console.error('Error loading prefixes:', error);
    }
}

// Toggle prefix dropdown (Global)
window.togglePrefixDropdownChaimae = async function() {
    const dropdown = document.getElementById('prefixDropdownChaimae');
    if (!dropdown) return;
    
    if (dropdown.style.display === 'none') {
        // Load prefixes from database first
        await loadPrefixesFromDB();
        renderPrefixListChaimae();
        dropdown.style.display = 'block';
    } else {
        dropdown.style.display = 'none';
    }
}

// Render prefix list (Global)
window.renderPrefixListChaimae = function() {
    const listContainer = document.getElementById('prefixListChaimae');
    if (!listContainer) return;
    
    listContainer.innerHTML = window.bonLivraisonPrefixes.map((prefix, index) => `
        <div onclick="selectPrefixChaimae('${prefix}')" 
             style="margin: 0.35rem; padding: 0.75rem 1rem; cursor: pointer; border-radius: 8px; transition: all 0.3s; color: #fff; display: flex; justify-content: space-between; align-items: center; background: ${prefix === window.selectedPrefix ? 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)' : 'rgba(255,255,255,0.05)'}; border: 2px solid ${prefix === window.selectedPrefix ? '#667eea' : 'transparent'}; box-shadow: ${prefix === window.selectedPrefix ? '0 2px 8px rgba(102, 126, 234, 0.3)' : 'none'};"
             onmouseover="if('${prefix}' !== window.selectedPrefix) { this.style.background='rgba(102, 126, 234, 0.2)'; this.style.borderColor='#667eea'; this.style.transform='translateX(5px)'; }" 
             onmouseout="if('${prefix}' !== window.selectedPrefix) { this.style.background='rgba(255,255,255,0.05)'; this.style.borderColor='transparent'; this.style.transform='translateX(0)'; }">
            <div style="display: flex; align-items: center; gap: 0.75rem;">
                <span style="font-size: 1.2rem;">${prefix === window.selectedPrefix ? '✓' : '📌'}</span>
                <span style="font-weight: ${prefix === window.selectedPrefix ? '700' : '500'}; font-size: 1rem; letter-spacing: 1px;">${prefix}</span>
            </div>
            ${window.bonLivraisonPrefixes.length > 1 ? `
                <button onclick="event.stopPropagation(); deletePrefixChaimae('${prefix}')" 
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

// Select prefix (Global)
window.selectPrefixChaimae = function(prefix) {
    window.selectedPrefix = prefix;
    const prefixInput = document.getElementById('prefixInputChaimae');
    const prefixExample = document.getElementById('prefixExampleChaimae');
    
    if (prefixInput) prefixInput.value = prefix;
    if (prefixExample) prefixExample.textContent = prefix;
    
    const dropdown = document.getElementById('prefixDropdownChaimae');
    if (dropdown) dropdown.style.display = 'none';
    
    renderPrefixListChaimae();
}

// Add new prefix (Global)
window.addNewPrefixChaimae = async function() {
    const newPrefixInput = document.getElementById('newPrefixInputChaimae');
    if (!newPrefixInput) return;
    
    const newPrefix = newPrefixInput.value.trim().toUpperCase();
    
    if (!newPrefix) {
        window.notify.warning('Attention', 'Veuillez saisir un prefix', 2000);
        return;
    }
    
    if (window.bonLivraisonPrefixes.includes(newPrefix)) {
        window.notify.warning('Attention', 'Ce prefix existe déjà', 2000);
        return;
    }
    
    // Add to database
    const result = await window.electron.dbChaimae.addPrefix(newPrefix);
    
    if (result.success) {
        window.bonLivraisonPrefixes.push(newPrefix);
        window.bonLivraisonPrefixes.sort();
        newPrefixInput.value = '';
        
        renderPrefixListChaimae();
        window.notify.success('Succès', `Prefix "${newPrefix}" ajouté`, 2000);
    } else {
        window.notify.error('Erreur', result.error || 'Impossible d\'ajouter le prefix', 3000);
    }
}

// Delete prefix (Global)
window.deletePrefixChaimae = async function(prefix) {
    if (window.bonLivraisonPrefixes.length <= 1) {
        window.notify.warning('Attention', 'Vous devez garder au moins un prefix', 2000);
        return;
    }
    
    // Delete from database
    const result = await window.electron.dbChaimae.deletePrefix(prefix);
    
    if (result.success) {
        const index = window.bonLivraisonPrefixes.indexOf(prefix);
        if (index > -1) {
            window.bonLivraisonPrefixes.splice(index, 1);
            
            // If deleted prefix was selected, select the first one
            if (window.selectedPrefix === prefix) {
                window.selectedPrefix = window.bonLivraisonPrefixes[0];
                const prefixInput = document.getElementById('prefixInputChaimae');
                const prefixExample = document.getElementById('prefixExampleChaimae');
                if (prefixInput) prefixInput.value = window.selectedPrefix;
                if (prefixExample) prefixExample.textContent = window.selectedPrefix;
            }
            
            renderPrefixListChaimae();
            window.notify.success('Succès', `Prefix "${prefix}" supprimé`, 2000);
        }
    } else {
        window.notify.error('Erreur', result.error || 'Impossible de supprimer le prefix', 3000);
    }
}

// Format Bon de livraison number with selected prefix (Global)
window.formatBonLivraisonWithPrefixChaimae = function(input) {
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

// Initialize prefixes when page loads
window.addEventListener('DOMContentLoaded', async () => {
    await loadPrefixesFromDB();
});

// Close dropdown when clicking outside (Global)
document.addEventListener('click', function(event) {
    const dropdown = document.getElementById('prefixDropdownChaimae');
    const prefixInput = document.getElementById('prefixInputChaimae');
    
    if (dropdown && prefixInput && 
        !dropdown.contains(event.target) && 
        event.target !== prefixInput) {
        dropdown.style.display = 'none';
    }
});

// Add year only (without MG prefix) for Chaimae (Global)
window.addYearOnBlurChaimae = function(input) {
    let value = input.value.trim();
    
    // إذا كان الحقل فارغاً، لا تفعل شيئاً
    if (!value) return;
    
    // إذا كان الرقم يحتوي بالفعل على /, لا تفعل شيئاً
    if (value.includes('/')) return;
    
    // أضف السنة الحالية فقط
    const year = new Date().getFullYear();
    input.value = `${value}/${year}`;
}

// Add product row for Chaimae (Global)
let productRowCounterChaimae = 0;
window.addProductRowChaimae = function() {
    const tbody = document.getElementById('productsTableBodyChaimae');
    const rowId = `product-chaimae-${productRowCounterChaimae++}`;
    
    const row = document.createElement('tr');
    row.id = rowId;
    row.innerHTML = `
        <td>
            <input type="text" class="product-designation" placeholder="Description du produit...">
        </td>
        <td>
            <input type="text" class="product-quantity" placeholder="ex: 50 Kg, F, 10"
                   onchange="calculateRowTotalChaimae('${rowId}')" onblur="calculateRowTotalChaimae('${rowId}')">
        </td>
        <td>
            <input type="number" class="product-price" step="0.01" placeholder="0.00"
                   onchange="calculateRowTotalChaimae('${rowId}')" onblur="calculateRowTotalChaimae('${rowId}')">
        </td>
        <td>
            <span class="product-total">0.00 DH</span>
        </td>
        <td>
            <button type="button" class="btn-delete" onclick="deleteProductRowChaimae('${rowId}')">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                </svg>
            </button>
        </td>
    `;
    
    tbody.appendChild(row);
}

// Calculate row total for Chaimae (Global)
window.calculateRowTotalChaimae = function(rowId) {
    const row = document.getElementById(rowId);
    const quantityInput = row.querySelector('.product-quantity');
    const priceInput = row.querySelector('.product-price');
    
    // Get quantity text
    let quantityText = quantityInput.value.trim();
    
    console.log('🔍 CHAIMAE Row Calc - Original quantity:', quantityText);
    
    // Convert 'F' or 'f' to '1' FIRST
    if (quantityText.toUpperCase() === 'F') {
        console.log('✅ CHAIMAE Row Calc - Converting F to 1');
        quantityText = '1';
    }
    
    // Extract numeric value from quantity (remove units like "Kg", etc)
    const quantity = quantityText.replace(/[^0-9.]/g, '');
    
    let price = parseFloat(priceInput.value) || 0;
    let qty = parseFloat(quantity) || 0;
    
    console.log('🔍 CHAIMAE Row Calc - qty:', qty, 'price:', price);
    
    const total = qty * price;
    
    console.log('🔍 CHAIMAE Row Calc - total:', total);
    
    // Use simple format without spaces for calculations
    row.querySelector('.product-total').textContent = total.toFixed(2) + ' DH';
    
    calculateTotalsChaimae();
}

// Delete product row for Chaimae (Global)
window.deleteProductRowChaimae = function(rowId) {
    document.getElementById(rowId).remove();
    calculateTotalsChaimae();
}

// Calculate totals for Chaimae (Global)
window.calculateTotalsChaimae = function() {
    const rows = document.querySelectorAll('#productsTableBodyChaimae tr');
    let totalHT = 0;
    
    rows.forEach(row => {
        const totalText = row.querySelector('.product-total').textContent;
        console.log('📊 Row total text:', totalText);
        
        // Remove ALL spaces, commas, and 'DH'
        const cleanText = totalText
            .replace(/\s/g, '')  // Remove all spaces
            .replace(/,/g, '.')  // Replace comma with dot
            .replace('DH', '')
            .trim();
        console.log('📊 Clean text:', cleanText);
        
        const total = parseFloat(cleanText) || 0;
        console.log('📊 Parsed total:', total);
        
        totalHT += total;
    });
    
    console.log('📊 TOTAL HT:', totalHT);
    
    const tvaRate = parseFloat(document.getElementById('tvaRateChaimae').value) || 0;
    const montantTVA = totalHT * (tvaRate / 100);
    const totalTTC = totalHT + montantTVA;
    
    console.log('📊 TVA Rate:', tvaRate);
    console.log('📊 Montant TVA:', montantTVA);
    console.log('📊 Total TTC:', totalTTC);
    
    const formattedHT = formatNumberChaimae(totalHT);
    const formattedTVA = formatNumberChaimae(montantTVA);
    const formattedTTC = formatNumberChaimae(totalTTC);
    
    console.log('📊 Formatted HT:', formattedHT);
    console.log('📊 Formatted TVA:', formattedTVA);
    console.log('📊 Formatted TTC:', formattedTTC);
    
    // Use simple format without spaces for display in creation page
    document.getElementById('totalHTChaimae').textContent = totalHT.toFixed(2) + ' DH';
    document.getElementById('montantTVAChaimae').textContent = montantTVA.toFixed(2) + ' DH';
    document.getElementById('totalTTCChaimae').textContent = totalTTC.toFixed(2) + ' DH';
}

// Format number - simple format without thousands separator to avoid parsing issues
function formatNumberChaimae(number) {
    const num = parseFloat(number) || 0;
    return num.toFixed(2);
}

// Store all clients for Chaimae
let allClientsChaimae = [];
let filteredClientsChaimae = [];

// Load all clients from database
async function loadAllClientsChaimae() {
    console.log('🔄 Loading all clients from database for Chaimae...');
    try {
        const result = await window.electron.dbChaimae.getAllClients();
        console.log('📊 Database result for Chaimae:', result);
        if (result.success) {
            allClientsChaimae = result.data;
            filteredClientsChaimae = result.data;
            console.log('✅ Loaded clients for Chaimae:', allClientsChaimae.length);
            if (allClientsChaimae.length > 0) {
                console.log('📝 Sample client:', allClientsChaimae[0]);
            }
        } else {
            console.error('❌ Database returned error:', result.error);
        }
    } catch (error) {
        console.error('❌ Error loading clients for Chaimae:', error);
    }
}

// Client search functions for Chaimae (Global)
window.searchClientsChaimae = function(query) {
    console.log('🔍 Searching clients with query:', query);
    const dropdown = document.getElementById('clientsDropdownChaimae');
    
    if (!dropdown) {
        console.error('❌ Dropdown element not found!');
        return;
    }
    
    if (!query || query.trim().length === 0) {
        filteredClientsChaimae = allClientsChaimae;
    } else {
        const searchTerm = query.toLowerCase().trim();
        filteredClientsChaimae = allClientsChaimae.filter(client => 
            client.nom.toLowerCase().includes(searchTerm) || 
            client.ice.toLowerCase().includes(searchTerm)
        );
    }
    
    console.log('📋 Filtered clients:', filteredClientsChaimae.length);
    displayClientsListChaimae();
}

// Display clients list
function displayClientsListChaimae() {
    console.log('📋 Displaying clients list for Chaimae...');
    const dropdown = document.getElementById('clientsDropdownChaimae');
    
    if (!dropdown) {
        console.error('❌ Dropdown element not found in displayClientsListChaimae!');
        return;
    }
    
    if (filteredClientsChaimae.length === 0) {
        dropdown.innerHTML = '<div class="dropdown-item no-results">Aucun client trouvé</div>';
        dropdown.style.display = 'block';
        console.log('ℹ️ No clients found');
        return;
    }
    
    dropdown.innerHTML = filteredClientsChaimae.slice(0, 10).map(client => `
        <div class="dropdown-item" onmousedown="selectClientChaimae('${client.nom.replace(/'/g, "\\'")}', '${client.ice}')">
            <div class="client-name">${client.nom}</div>
            <div class="client-ice">ICE: ${client.ice}</div>
        </div>
    `).join('');
    
    dropdown.style.display = 'block';
    console.log('✅ Dropdown displayed with', filteredClientsChaimae.slice(0, 10).length, 'clients');
}

window.showClientsListChaimae = function() {
    if (allClientsChaimae.length > 0) {
        filteredClientsChaimae = allClientsChaimae;
        displayClientsListChaimae();
    }
}

window.hideClientsListChaimae = function() {
    setTimeout(() => {
        const dropdown = document.getElementById('clientsDropdownChaimae');
        if (dropdown) dropdown.style.display = 'none';
    }, 200);
}

// Select client from dropdown
window.selectClientChaimae = function(nom, ice) {
    document.getElementById('clientNom').value = nom;
    document.getElementById('clientICE').value = ice;
    
    const dropdown = document.getElementById('clientsDropdownChaimae');
    if (dropdown) dropdown.style.display = 'none';
}

// Initialize page for Chaimae (Global)
window.initCreateInvoiceChaimaePage = function() {
    console.log('🔄 Initializing create invoice page for Chaimae...');
    
    // Set today's date
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('documentDate').value = today;
    
    // Load clients for autocomplete
    loadAllClientsChaimae();
    
    // Add first product row
    addProductRowChaimae();
    
    // Handle form submission
    const form = document.getElementById('invoiceForm');
    form.addEventListener('submit', handleFormSubmitChaimae);
    
    // Handle file input
    const fileInput = document.getElementById('fileInputChaimae');
    fileInput.addEventListener('change', handleFileSelectChaimae);
}

// Handle form submission for Chaimae (Global)
async function handleFormSubmitChaimae(e) {
    e.preventDefault();
    
    try {
        // Collect form data
        const formData = {
            client: {
                nom: document.getElementById('clientNom').value,
                ICE: document.getElementById('clientICE').value
            },
            document: {
                type: document.getElementById('documentType').value,
                date: document.getElementById('documentDate').value,
                numero: null,
                numero_devis: null,
                numero_Order: null,
                bon_livraison: null,
                bon_commande: null
            },
            products: [],
            totals: {
                total_ht: parseFloat(document.getElementById('totalHTChaimae').textContent.replace('DH', '').trim()) || 0,
                tva_rate: parseFloat(document.getElementById('tvaRateChaimae').value) || 0,
                montant_tva: parseFloat(document.getElementById('montantTVAChaimae').textContent.replace('DH', '').trim()) || 0,
                total_ttc: parseFloat(document.getElementById('totalTTCChaimae').textContent.replace('DH', '').trim()) || 0
            }
        };
        
        // Get document numbers based on type
        const docType = formData.document.type;
        const mainNumero = document.getElementById('documentNumeroChaimae')?.value;
        
        if (docType === 'facture') {
            formData.document.numero = mainNumero;
            formData.document.numero_Order = document.getElementById('documentNumeroOrderChaimae')?.value || null;
            formData.document.bon_de_livraison = document.getElementById('documentBonLivraisonChaimae')?.value || null;
        } else if (docType === 'devis') {
            formData.document.numero_devis = mainNumero;
        } else if (docType === 'bon_livraison') {
            // Get selected prefix and combine with numero
            const selectedPrefix = window.selectedPrefix || 'MG';
            const fullNumero = selectedPrefix + mainNumero;
            
            formData.document.numero = fullNumero;
            formData.document.numero_BL = fullNumero; // Save to document_numero_bl field
            formData.document.numero_commande = document.getElementById('documentBonCommandeChaimae')?.value || null;
        }
        
        // Collect products
        const rows = document.querySelectorAll('#productsTableBodyChaimae tr');
        rows.forEach(row => {
            const designation = row.querySelector('.product-designation').value.trim();
            let quantite = row.querySelector('.product-quantity').value.trim();
            const prix_unitaire_ht = parseFloat(row.querySelector('.product-price').value) || 0;
            
            console.log('🔍 CHAIMAE BEFORE conversion - Quantite:', quantite, 'Type:', typeof quantite);
            
            // Convert 'F' or 'f' to '1'
            if (quantite.toUpperCase() === 'F') {
                console.log('✅ CHAIMAE Converting F to 1');
                quantite = '1';
            }
            
            console.log('🔍 CHAIMAE AFTER conversion - Quantite:', quantite, 'Type:', typeof quantite);
            
            // Calculate total_ht directly from quantity and price
            const qty = parseFloat(quantite) || 0;
            const total_ht = qty * prix_unitaire_ht;
            
            console.log('💾 CHAIMAE Saving product:', {
                designation,
                quantite,
                qty_parsed: qty,
                prix_unitaire_ht,
                calculated_total: total_ht
            });
            
            // Save product if it has at least a designation
            if (designation) {
                formData.products.push({
                    designation,
                    quantite: quantite || '0',
                    prix_unitaire_ht,
                    total_ht
                });
            }
        });
        
        // Products are optional now - no validation needed
        console.log('📤 Creating invoice for Chaimae:', formData);
        
        // Check for duplicate document numbers
        const allInvoicesResult = await window.electron.dbChaimae.getAllInvoices();
        if (allInvoicesResult.success) {
            const invoices = allInvoicesResult.data;
            
            // Check main document number
            if (mainNumero) {
                const duplicateMain = invoices.find(inv => {
                    if (docType === 'facture') {
                        return inv.document_type === 'facture' && inv.document_numero === mainNumero;
                    } else if (docType === 'devis') {
                        return inv.document_type === 'devis' && inv.document_numero_devis === mainNumero;
                    } else if (docType === 'bon_livraison') {
                        // For bon_livraison, check if it's the same type AND has the same numero
                        // The numero is saved with prefix (e.g., "HA01/2025")
                        const selectedPrefix = window.selectedPrefix || 'MG';
                        const fullNumero = selectedPrefix + mainNumero;
                        
                        return (inv.document_type === 'bon_livraison' || inv.document_type === 'bon de livraison') && 
                               (inv.document_numero === fullNumero || 
                                inv.document_numero_bl === fullNumero || 
                                inv.document_bon_de_livraison === fullNumero);
                    }
                    return false;
                });
                
                if (duplicateMain) {
                    console.log('❌ [DUPLICATE CHECK] Found duplicate:', {
                        docType,
                        mainNumero,
                        duplicate: duplicateMain
                    });
                    window.notify.error('Erreur', `Le numéro "${mainNumero}" existe déjà pour le type ${docType}`, 5000);
                    return;
                } else {
                    console.log('✅ [DUPLICATE CHECK] No duplicate found for:', {
                        docType,
                        mainNumero
                    });
                }
            }
            
            // Check N° Order if provided (for facture)
            if (docType === 'facture' && formData.document.numero_Order) {
                const duplicateOrder = invoices.find(inv => 
                    inv.document_numero_Order === formData.document.numero_Order
                );
                if (duplicateOrder) {
                    window.notify.error('Erreur', `Le N° Order "${formData.document.numero_Order}" existe déjà`, 5000);
                    return;
                }
            }
            
            // Check Bon de livraison if provided (for facture)
            if (docType === 'facture' && formData.document.bon_de_livraison) {
                const duplicateBL = invoices.find(inv => 
                    inv.document_bon_de_livraison === formData.document.bon_de_livraison
                );
                if (duplicateBL) {
                    window.notify.error('Erreur', `Le Bon de livraison "${formData.document.bon_de_livraison}" existe déjà`, 5000);
                    return;
                }
            }
            
            // Check N° Order if provided (for bon_livraison)
            if (docType === 'bon_livraison' && formData.document.numero_commande) {
                const duplicateBC = invoices.find(inv => 
                    inv.document_numero_commande === formData.document.numero_commande
                );
                if (duplicateBC) {
                    window.notify.error('Erreur', `Le N° Order "${formData.document.numero_commande}" existe déjà`, 5000);
                    return;
                }
            }
        }
        
        // Save to database
        const result = await window.electron.dbChaimae.createInvoice(formData);
        
        if (result.success) {
            const invoiceId = result.data.id;
            console.log('✅ Invoice saved with ID:', invoiceId);
            
            // Upload attachments if any
            const fileInput = document.getElementById('fileInputChaimae');
            if (fileInput && fileInput.files.length > 0) {
                console.log(`📎 Uploading ${fileInput.files.length} attachments...`);
                
                for (const file of fileInput.files) {
                    const arrayBuffer = await file.arrayBuffer();
                    const uint8Array = new Uint8Array(arrayBuffer);
                    
                    const attachResult = await window.electron.dbChaimae.addAttachment(
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
            
            window.notify.success('Succès', 'Document créé avec succès!', 3000);
            setTimeout(() => {
                router.navigate('/dashboard-chaimae');
            }, 1500);
        } else {
            window.notify.error('Erreur', result.error || 'Erreur lors de la création', 4000);
        }
        
    } catch (error) {
        console.error('Error creating invoice for Chaimae:', error);
        window.notify.error('Erreur', 'Une erreur est survenue: ' + error.message, 5000);
    }
}

// Handle file selection for Chaimae (Global)
function handleFileSelectChaimae(e) {
    const files = Array.from(e.target.files);
    const filesList = document.getElementById('filesListChaimae');
    
    filesList.innerHTML = '';
    
    files.forEach((file, index) => {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        fileItem.innerHTML = `
            <span>📄 ${file.name}</span>
            <button type="button" onclick="removeFileChaimae(${index})">✕</button>
        `;
        filesList.appendChild(fileItem);
    });
}

// Remove file for Chaimae (Global)
window.removeFileChaimae = function(index) {
    const fileInput = document.getElementById('fileInputChaimae');
    const dt = new DataTransfer();
    const files = Array.from(fileInput.files);
    
    files.forEach((file, i) => {
        if (i !== index) dt.items.add(file);
    });
    
    fileInput.files = dt.files;
    handleFileSelectChaimae({ target: fileInput });
}
