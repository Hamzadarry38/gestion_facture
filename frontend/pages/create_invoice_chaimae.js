// Create Invoice Page - Chaimae Company
function CreateInvoiceChaimaePage() {
    return `
        <style>
            .input-with-icon {
                position: relative;
                display: flex;
                align-items: center;
            }
            .input-icon {
                position: absolute;
                left: 12px;
                font-size: 1.2rem;
                color: #2196f3;
                pointer-events: none;
                z-index: 5;
            }
            .input-with-icon input {
                padding-left: 45px !important;
            }
            #suiviSectionChaimae {
                border-left: 4px solid #2196f3;
                background: rgba(33, 150, 243, 0.03);
            }
        </style>
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
                                    <label>N° ICE</label>
                                    <input type="text" id="clientICE" placeholder="Numéro ICE (optionnel)">
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
                    
                    <!-- Section 3: Suivi & Logistique -->
                    <div class="invoice-section" id="suiviSectionChaimae">
                        <div class="section-header">
                            <h2>👤 Suivi & Logistique</h2>
                        </div>
                        <div class="section-body">
                            <div class="form-row">
                                <div class="form-field">
                                    <label>Créé par</label>
                                    <div class="input-with-icon">
                                        <span class="input-icon">👤</span>
                                        <input type="text" id="createdByChaimae" readonly style="background: #1e1e1e; color: #aaa; cursor: not-allowed;" placeholder="Chargement...">
                                    </div>
                                </div>
                                <div class="form-field" id="deliveredByContainerChaimae">
                                    <label>Livré par</label>
                                    <div class="input-with-icon">
                                        <span class="input-icon">🚛</span>
                                        <input type="text" id="deliveredByChaimae" placeholder="Nom du livreur (Ex: Abderrahim)" list="deliveryPersonsListChaimae" required>
                                        <datalist id="deliveryPersonsListChaimae"></datalist>
                                    </div>
                                </div>
                            </div>
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
                        <div class="section-header" style="display: flex; justify-content: space-between; align-items: center;">
                            <h2>📊 Produits et services</h2>
                            <div style="display: flex; gap: 0.5rem;">
                                <button type="button" id="toggleDragCreateChaimae" onclick="toggleDragModeCreateChaimae()" title="Activer/Désactiver le glisser-déposer" style="background:#3e3e42; border:1px solid #555; color:#aaa; border-radius:6px; cursor:pointer; padding:0.4rem 0.8rem; font-size:0.85rem; display:flex; align-items:center; gap:0.4rem;">
                                    <span>⋮⋮</span><span id="toggleDragLabelCreateChaimae">Réorganiser: OFF</span>
                                </button>
                                <button type="button" class="add-product-btn" onclick="addProductRowChaimae()">
                                    <span>+ Ajouter un produit</span>
                                </button>
                            </div>
                        </div>
                        <div class="section-body">
                            <div class="products-table-container">
                                <table class="products-table">
                                    <thead>
                                        <tr>
                                            <th style="width: 20px; padding: 0.5rem 0.25rem;"></th>
                                            <th style="width: 50%;">Désignation</th>
                                            <th style="width: 120px;">Quantité</th>
                                            <th style="width: 140px;">Prix unitaire HT</th>
                                            <th style="width: 120px;">Total HT</th>
                                            <th style="width: 60px;">Actions</th>
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

                    <!-- Section 6: Notes & Options -->
                    <div class="invoice-section">
                        <div class="section-header">
                            <h2>📝 Notes & Options</h2>
                        </div>
                        <div class="section-body">
                            <!-- Featured & Private Notes - Admin Only -->
                            <div id="adminFieldsChaimae" style="display: none;">
                                <!-- Featured Checkbox -->
                                <div class="form-field" style="margin-bottom: 1.5rem;">
                                    <label style="display: flex; align-items: center; cursor: pointer; user-select: none;">
                                        <input type="checkbox" id="invoiceFeaturedChaimae" 
                                               style="width: 20px; height: 20px; margin-right: 0.75rem; cursor: pointer; accent-color: #ffa726;">
                                        <span style="font-size: 1rem; font-weight: 600;">
                                            ⭐ Marquer comme facture importante/prioritaire
                                        </span>
                                    </label>
                                    <small style="color: #999; font-size: 0.85rem; display: block; margin-top: 0.5rem; margin-left: 2rem;">
                                        Les factures marquées peuvent être filtrées dans la liste des factures.
                                    </small>
                                </div>

                                <!-- Private Notes -->
                                <div class="form-field" style="margin-bottom: 1.5rem;">
                                    <label>📋 Notes privées (usage interne uniquement)</label>
                                    <textarea id="invoicePrivateNotesChaimae" rows="3" 
                                              placeholder="Notes internes pour identifier ou classer cette facture (ne s'affichent PAS dans le PDF)..."
                                              style="width: 100%; padding: 0.75rem; background: #2d2d30; border: 2px solid #3e3e42; border-radius: 8px; color: #fff; font-size: 0.95rem; resize: vertical; font-family: inherit;"></textarea>
                                    <small style="color: #ff9800; font-size: 0.85rem; display: block; margin-top: 0.5rem;">
                                        ⚠️ Ces notes sont privées et ne seront JAMAIS affichées dans le PDF généré.
                                    </small>
                                </div>
                            </div>

                            <!-- Public Notes -->
                            <div class="form-field">
                                <label>📄 Notes pour le PDF (optionnel)</label>
                                <textarea id="invoiceNotesChaimae" rows="4" 
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
window.handleDocumentTypeChangeChaimae = async function () {
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

            // Helper function to extract numeric value from document number
            const extractNumber = (docNumber) => {
                if (!docNumber) return 0;
                const match = docNumber.toString().match(/\d+/);
                return match ? parseInt(match[0], 10) : 0;
            };

            // Helper function to get max for a specific year
            const getMaxForYear = (list, field, year) => {
                const yearStr = year.toString();
                const filtered = list.filter(inv => {
                    const val = inv[field];
                    return val && val.toString().endsWith(yearStr);
                });
                if (filtered.length === 0) return 'Aucun';
                filtered.sort((a, b) => extractNumber(b[field]) - extractNumber(a[field]));
                return filtered[0][field];
            };

            const currentYear = new Date().getFullYear();

            if (type === 'facture') {
                const factures = invoices.filter(inv => inv.document_type === 'facture' && inv.document_numero);
                lastNumbers.main = getMaxForYear(factures, 'document_numero', currentYear);

                const facturesWithOrder = invoices.filter(inv => inv.document_type === 'facture' && inv.document_numero_Order);
                lastNumbers.order = getMaxForYear(facturesWithOrder, 'document_numero_Order', currentYear);

                const facturesWithBL = invoices.filter(inv => inv.document_type === 'facture' && inv.document_bon_de_livraison);
                lastNumbers.bonLivraison = getMaxForYear(facturesWithBL, 'document_bon_de_livraison', currentYear);

            } else if (type === 'devis') {
                const devisList = invoices.filter(inv => inv.document_type === 'devis' && inv.document_numero_devis);
                lastNumbers.main = getMaxForYear(devisList, 'document_numero_devis', currentYear);

            } else if (type === 'bon_livraison') {
                const bonsList = invoices.filter(inv =>
                    (inv.document_type === 'bon_livraison' || inv.document_type === 'bon de livraison') &&
                    (inv.document_numero || inv.document_bon_de_livraison || inv.document_numero_bl)
                );

                window.createHighestByPrefix = {};
                const currentPrefix = window.selectedPrefix || 'MG';

                // Process all prefixes
                bonsList.forEach(inv => {
                    const blNum = inv.document_numero_bl || inv.document_numero || inv.document_bon_de_livraison;
                    if (blNum) {
                        const match = blNum.match(/^([A-Z]+)(\d+)\/(\d+)$/);
                        if (match) {
                            const prefix = match[1];
                            const num = parseInt(match[2], 10);
                            const year = parseInt(match[3], 10);

                            if (!window.createHighestByPrefix[prefix]) window.createHighestByPrefix[prefix] = {};
                            if (!window.createHighestByPrefix[prefix][year] || num > window.createHighestByPrefix[prefix][year].num) {
                                window.createHighestByPrefix[prefix][year] = { num, full: blNum };
                            }
                        }
                    }
                });

                // Update lastNumbers.main for the current prefix
                if (window.createHighestByPrefix[currentPrefix]) {
                    const pCurrent = window.createHighestByPrefix[currentPrefix][currentYear];
                    lastNumbers.main = pCurrent ? pCurrent.full : 'Aucun';
                }

                const bonsWithCommande = invoices.filter(inv =>
                    (inv.document_type === 'bon_livraison' || inv.document_type === 'bon de livraison') &&
                    inv.document_numero_commande
                );
                lastNumbers.bonCommande = getMaxForYear(bonsWithCommande, 'document_numero_commande', currentYear);
            }
        }
    } catch (error) {
        console.error('Error getting last numbers:', error);
    }

    let html = '<div class="form-row">';

    if (type === 'facture') {
        html += `
            <div class="form-field">
                <label>N° Facture<span class="required">*</span></label>
                <div style="display: flex; gap: 0.5rem; align-items: stretch;">
                    <input type="text" id="documentNumeroChaimae" placeholder="Ex: 123" required 
                           onblur="autoFormatDocumentNumberOnBlurChaimae(this)" style="flex: 1;">
                    <button type="button" onclick="showMissingNumbersChaimae()" 
                            style="padding: 0.75rem 1rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #fff; border: none; border-radius: 8px; cursor: pointer; font-size: 1.1rem; transition: all 0.3s; box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3); display: flex; align-items: center; justify-content: center; min-width: 50px;"
                            onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 12px rgba(102, 126, 234, 0.5)';"
                            onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 8px rgba(102, 126, 234, 0.3)';"
                            title="Voir les numéros manquants">
                        🔍
                    </button>
                </div>
                <small style="color: #999; font-size: 0.85rem;">Ex: 123 → 123/2025</small>
                ${lastNumbers.main !== 'Aucun' ? `<small style="color: #4caf50; font-size: 0.8rem; display: block; margin-top: 0.25rem;">📌 Plus grand numéro: ${lastNumbers.main}</small>` : ''}
            </div>
        `;
        html += '</div>';

        // Optional fields: N° Order + Bon de livraison
        const selectedSimpleOrderPrefix = window.selectedSimpleOrderPrefix || window.simpleOrderPrefixes?.[0] || '';
        html += `
            <div class="form-row optional-field">
                <div class="toggle-container">
                    <label class="toggle-label">
                        <input type="checkbox" id="toggleOrderChaimae" onchange="toggleOptionalFieldChaimae('Order')">
                        <span class="toggle-switch"></span>
                        <span class="toggle-text">N° Order</span>
                    </label>
                </div>
                <div class="form-field" id="fieldOrderChaimae" style="display: none; position: relative;">
                    <label>N° Order</label>
                    <div style="display: flex; gap: 0.5rem; align-items: flex-start;">
                        <div style="position: relative; flex: 0 0 auto;">
                            <input type="text" id="simpleOrderPrefixInputChaimae" value="${selectedSimpleOrderPrefix}" placeholder="" 
                                   style="width: 80px; padding: 0.75rem; background: #2d2d30; border: 2px solid #3e3e42; border-radius: 8px; color: #fff; font-size: 1rem; outline: none; cursor: pointer; font-weight: 600;"
                                   readonly onclick="toggleSimpleOrderPrefixDropdownChaimae()">
                            <div id="simpleOrderPrefixDropdownChaimae" style="display: none; position: absolute; top: 100%; left: 0; background: linear-gradient(135deg, #1e1e1e 0%, #2d2d30 100%); border: 2px solid #2196f3; border-radius: 12px; margin-top: 0.5rem; box-shadow: 0 8px 24px rgba(33, 150, 243, 0.3), 0 0 0 1px rgba(33, 150, 243, 0.1); z-index: 1000; min-width: 200px; max-height: 350px; overflow: hidden;">
                                <div style="padding: 0.75rem 1rem; background: linear-gradient(90deg, #2196f3 0%, #1976d2 100%); border-bottom: 2px solid rgba(33, 150, 243, 0.3);">
                                    <h4 style="margin: 0; color: #fff; font-size: 0.95rem; font-weight: 600; letter-spacing: 0.5px;">📋 Choisir un Prefix</h4>
                                </div>
                                <div id="simpleOrderPrefixListChaimae" style="max-height: 200px; overflow-y: auto; padding: 0.5rem;"></div>
                                <div style="padding: 0.75rem; border-top: 2px solid rgba(33, 150, 243, 0.2); background: rgba(0,0,0,0.2);">
                                    <input type="text" id="newSimpleOrderPrefixInputChaimae" placeholder="Nouveau prefix (ex: ORD)" 
                                           style="width: 100%; padding: 0.65rem; background: #1e1e1e; border: 2px solid #3e3e42; border-radius: 6px; color: #fff; font-size: 0.9rem; outline: none; transition: all 0.3s;"
                                           onfocus="this.style.borderColor='#2196f3'; this.style.boxShadow='0 0 0 3px rgba(33, 150, 243, 0.1)';"
                                           onblur="this.style.borderColor='#3e3e42'; this.style.boxShadow='none';"
                                           onkeypress="if(event.key==='Enter'){addNewSimpleOrderPrefixChaimae(); event.preventDefault();}">
                                    <button type="button" onclick="addNewSimpleOrderPrefixChaimae()" 
                                            style="width: 100%; margin-top: 0.5rem; padding: 0.65rem; background: linear-gradient(90deg, #2196f3 0%, #1976d2 100%); color: #fff; border: none; border-radius: 6px; cursor: pointer; font-size: 0.9rem; font-weight: 600; transition: all 0.3s; box-shadow: 0 2px 8px rgba(33, 150, 243, 0.3);"
                                            onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 12px rgba(33, 150, 243, 0.4)';"
                                            onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 8px rgba(33, 150, 243, 0.3)';">
                                        ➕ Ajouter le Prefix
                                    </button>
                                </div>
                            </div>
                        </div>
                        <input type="text" id="documentNumeroOrderChaimae" placeholder="123" 
                               style="flex: 1; padding: 0.75rem; background: #2d2d30; border: 2px solid #3e3e42; border-radius: 8px; color: #fff; font-size: 1rem; outline: none;">
                    </div>
                    <small style="color: #999; font-size: 0.85rem; display: block; margin-top: 0.5rem;">Ex: 123 → <span id="simpleOrderPrefixExampleChaimae"></span>123</small>
                    ${lastNumbers.order !== 'Aucun' ? `<small style="color: #2196f3; font-size: 0.8rem; display: block; margin-top: 0.25rem;">📌 Plus grand N° Order: ${lastNumbers.order}</small>` : ''}
                </div>
            </div>
            
            <div class="form-row optional-field">
                <div class="toggle-container">
                    <label class="toggle-label">
                        <input type="checkbox" id="toggleBonLivraisonChaimae" onchange="toggleOptionalFieldChaimae('BonLivraison')">
                        <span class="toggle-switch"></span>
                        <span class="toggle-text">Bon de livraison</span>
                    </label>
                </div>
                <div class="form-field" id="fieldBonLivraisonChaimae" style="display: none;">
                    <label>Bon de livraison</label>
                    <input type="text" id="documentBonLivraisonChaimae" placeholder="Ex: 123">
                    ${lastNumbers.bonLivraison !== 'Aucun' ? `<small style="color: #4caf50; font-size: 0.8rem; display: block; margin-top: 0.25rem;">📌 Plus grand Bon de livraison: ${lastNumbers.bonLivraison}</small>` : ''}
                </div>
            </div>
        `;
    } else if (type === 'devis') {
        html += `
            <div class="form-field">
                <label>N° Devis <span class="required">*</span></label>
                <div style="display: flex; gap: 0.5rem; align-items: stretch;">
                    <input type="text" id="documentNumeroChaimae" placeholder="Ex: 123" required 
                           onblur="autoFormatDocumentNumberOnBlurChaimae(this)" style="flex: 1;">
                    <button type="button" onclick="showMissingDevisNumbersChaimae()" 
                            style="padding: 0.75rem 1rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #fff; border: none; border-radius: 8px; cursor: pointer; font-size: 1.1rem; transition: all 0.3s; box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3); display: flex; align-items: center; justify-content: center; min-width: 50px;"
                            onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 12px rgba(102, 126, 234, 0.5)';"
                            onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 8px rgba(102, 126, 234, 0.3)';"
                            title="Voir les numéros manquants">
                        🔍
                    </button>
                </div>
                <small style="color: #999; font-size: 0.85rem;">Ex: 123 → 123/2025</small>
                ${lastNumbers.main !== 'Aucun' ? `<small style="color: #9c27b0; font-size: 0.8rem; display: block; margin-top: 0.25rem;">📌 Plus grand numéro: ${lastNumbers.main}</small>` : ''}
            </div>
        `;
        html += '</div>';
    } else if (type === 'bon_livraison') {
        // Get the selected prefix or default to first one
        const selectedPrefix = window.selectedPrefix || window.bonLivraisonPrefixes[0] || 'MG';
        console.log('🔵 [BON LIVRAISON] Using prefix:', selectedPrefix);

        // Bon de livraison: Numéro de bon de livraison (required) with prefix selector
        html += `
            <div class="form-field" style="position: relative;">
                <label>Numéro de bon de livraison <span class="required">*</span></label>
                <div style="display: flex; gap: 0.5rem; align-items: flex-start;">
                    <div style="position: relative; flex: 0 0 auto;">
                        <input type="text" id="prefixInputChaimae" value="${selectedPrefix}" placeholder="MG" 
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
                    <button type="button" onclick="showMissingBonLivraisonNumbersChaimae()" 
                            style="padding: 0.75rem 1rem; background: linear-gradient(135deg, #4caf50 0%, #388e3c 100%); color: #fff; border: none; border-radius: 8px; cursor: pointer; font-size: 1.1rem; transition: all 0.3s; box-shadow: 0 2px 8px rgba(76, 175, 80, 0.3); display: flex; align-items: center; justify-content: center; min-width: 50px;"
                            onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 12px rgba(76, 175, 80, 0.5)';"
                            onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 8px rgba(76, 175, 80, 0.3)';"
                            title="Voir les numéros manquants par prefix">
                        🔍
                    </button>
                </div>
                <small style="color: #999; font-size: 0.85rem; display: block; margin-top: 0.5rem;">Ex: 123 → <span id="prefixExampleChaimae">MG</span>123/2025</small>
                <small id="createHighestNumberContainerChaimae" style="color: #ff9800; font-size: 0.8rem; display: ${lastNumbers.main !== 'Aucun' ? 'block' : 'none'}; margin-top: 0.25rem;">📌 Plus grand numéro actuel: <span id="createHighestNumberChaimae">${lastNumbers.main}</span></small>
            </div>
        `;
        html += '</div>';

        // Optional field: N° Order with Prefix
        const selectedOrderPrefix = window.selectedOrderPrefix || window.orderPrefixes?.[0] || 'BC';
        html += `
            <div class="form-row optional-field">
                <div class="toggle-container">
                    <label class="toggle-label">
                        <input type="checkbox" id="toggleBonCommandeChaimae" onchange="toggleOptionalFieldChaimae('BonCommande')">
                        <span class="toggle-switch"></span>
                        <span class="toggle-text">N° Order</span>
                    </label>
                </div>
                <div class="form-field" id="fieldBonCommandeChaimae" style="display: none; position: relative;">
                    <label>N° Order</label>
                    <div style="display: flex; gap: 0.5rem; align-items: flex-start;">
                        <div style="position: relative; flex: 0 0 auto;">
                            <input type="text" id="orderPrefixInputChaimae" value="${selectedOrderPrefix}" placeholder="BC" 
                                   style="width: 80px; padding: 0.75rem; background: #2d2d30; border: 2px solid #3e3e42; border-radius: 8px; color: #fff; font-size: 1rem; outline: none; cursor: pointer; font-weight: 600;"
                                   readonly onclick="toggleOrderPrefixDropdownChaimae()">
                            <div id="orderPrefixDropdownChaimae" style="display: none; position: absolute; top: 100%; left: 0; background: linear-gradient(135deg, #1e1e1e 0%, #2d2d30 100%); border: 2px solid #2196f3; border-radius: 12px; margin-top: 0.5rem; box-shadow: 0 8px 24px rgba(33, 150, 243, 0.3), 0 0 0 1px rgba(33, 150, 243, 0.1); z-index: 1000; min-width: 200px; max-height: 350px; overflow: hidden;">
                                <div style="padding: 0.75rem 1rem; background: linear-gradient(90deg, #2196f3 0%, #1976d2 100%); border-bottom: 2px solid rgba(33, 150, 243, 0.3);">
                                    <h4 style="margin: 0; color: #fff; font-size: 0.95rem; font-weight: 600; letter-spacing: 0.5px;">📋 Choisir un Prefix</h4>
                                </div>
                                <div id="orderPrefixListChaimae" style="max-height: 200px; overflow-y: auto; padding: 0.5rem;"></div>
                                <div style="padding: 0.75rem; border-top: 2px solid rgba(33, 150, 243, 0.2); background: rgba(0,0,0,0.2);">
                                    <input type="text" id="newOrderPrefixInputChaimae" placeholder="Nouveau prefix (ex: BC)" 
                                           style="width: 100%; padding: 0.65rem; background: #1e1e1e; border: 2px solid #3e3e42; border-radius: 6px; color: #fff; font-size: 0.9rem; outline: none; transition: all 0.3s;"
                                           onfocus="this.style.borderColor='#2196f3'; this.style.boxShadow='0 0 0 3px rgba(33, 150, 243, 0.1)';"
                                           onblur="this.style.borderColor='#3e3e42'; this.style.boxShadow='none';"
                                           onkeypress="if(event.key==='Enter'){addNewOrderPrefixChaimae(); event.preventDefault();}">
                                    <button type="button" onclick="addNewOrderPrefixChaimae()" 
                                            style="width: 100%; margin-top: 0.5rem; padding: 0.65rem; background: linear-gradient(90deg, #2196f3 0%, #1976d2 100%); color: #fff; border: none; border-radius: 6px; cursor: pointer; font-size: 0.9rem; font-weight: 600; transition: all 0.3s; box-shadow: 0 2px 8px rgba(33, 150, 243, 0.3);"
                                            onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 12px rgba(33, 150, 243, 0.4)';"
                                            onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 8px rgba(33, 150, 243, 0.3)';">
                                        ➕ Ajouter le Prefix
                                    </button>
                                </div>
                            </div>
                        </div>
                        <input type="text" id="documentBonCommandeChaimae" placeholder="456" 
                               style="flex: 1; padding: 0.75rem; background: #2d2d30; border: 2px solid #3e3e42; border-radius: 8px; color: #fff; font-size: 1rem; outline: none;">
                    </div>
                    <small style="color: #999; font-size: 0.85rem; display: block; margin-top: 0.5rem;">Ex: 456 → <span id="orderPrefixExampleChaimae">BC</span>456</small>
                    ${lastNumbers.bonCommande !== 'Aucun' ? `<small style="color: #ff9800; font-size: 0.8rem; display: block; margin-top: 0.25rem;">📌 Plus grand N° Order: ${lastNumbers.bonCommande}</small>` : ''}
                </div>
            </div>
        `;
    }

    container.innerHTML = html;

    // Show/Hide "Livré par" field based on document type
    const deliveredByContainer = document.getElementById('deliveredByContainerChaimae');
    const deliveredByInput = document.getElementById('deliveredByChaimae');

    if (deliveredByContainer && deliveredByInput) {
        if (type === 'devis') {
            deliveredByContainer.style.display = 'none';
            deliveredByInput.required = false;
        } else {
            deliveredByContainer.style.display = 'block';
            deliveredByInput.required = true;
        }
    }
}

// Use suggested number for Chaimae (Global)
window.useSuggestedNumberChaimae = function (number) {
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
window.toggleOptionalFieldChaimae = function (fieldName) {
    const checkbox = document.getElementById(`toggle${fieldName}Chaimae`);
    const field = document.getElementById(`field${fieldName}Chaimae`);
    if (!field) return;

    const inputId = fieldName === 'Order' ? 'documentNumeroOrderChaimae' :
        fieldName === 'BonLivraison' ? 'documentBonLivraisonChaimae' :
            'documentBonCommandeChaimae';
    const input = document.getElementById(inputId);

    if (checkbox && checkbox.checked) {
        field.style.display = 'block';
        if (input) input.required = false;
    } else {
        field.style.display = 'none';
        if (input) {
            input.value = '';
            input.required = false;
        }
    }
}

// Auto-format document number on blur for Chaimae (Global)
window.autoFormatDocumentNumberOnBlurChaimae = function (input) {
    let value = input.value.trim();

    // إذا كان الحقل فارغاً، لا تفعل شيئاً
    if (!value) return;

    // إذا كان يحتوي بالفعل على سلاش، لا تفعل شيئاً
    if (value.includes('/')) return;

    // استخراج الأرقام فقط
    let numbers = value.replace(/[^0-9]/g, '');

    // إذا كان هناك أرقام، أضف السنة
    if (numbers) {
        // استخراج السنة من حقل التاريخ بدلاً من السنة الحالية
        const dateInput = document.getElementById('documentDate');
        let year = new Date().getFullYear(); // القيمة الافتراضية

        if (dateInput && dateInput.value) {
            // استخراج السنة من التاريخ المختار (YYYY-MM-DD)
            const selectedDate = new Date(dateInput.value);
            year = selectedDate.getFullYear();
            console.log('📅 [AUTO FORMAT] Using year from date field:', year);
        } else {
            console.log('📅 [AUTO FORMAT] Using current year:', year);
        }

        input.value = `${numbers}/${year}`;
    }
}

// Initialize prefixes for Bon de livraison (Global)
if (!window.bonLivraisonPrefixes) {
    window.bonLivraisonPrefixes = ['MG', 'TL', 'BL'];
    window.selectedPrefix = 'MG';
    window.prefixesLoaded = false;
}

// Initialize prefixes for Order (Global)
if (!window.orderPrefixes) {
    window.orderPrefixes = ['BC', 'CMD', 'ORD'];
    window.selectedOrderPrefix = 'BC';
    window.orderPrefixesLoaded = false;
}

// Initialize prefixes for Simple Order (Global)
if (!window.simpleOrderPrefixes) {
    window.simpleOrderPrefixes = [];
    window.selectedSimpleOrderPrefix = null;
    window.simpleOrderPrefixesLoaded = false;
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
window.togglePrefixDropdownChaimae = async function () {
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
window.renderPrefixListChaimae = function () {
    const listContainer = document.getElementById('prefixListChaimae');
    if (!listContainer) return;

    // Add "Sans Prefix" option at the beginning
    const sansPrefixOption = `
        <div onclick="selectPrefixChaimae('')" 
             style="margin: 0.35rem; padding: 0.75rem 1rem; cursor: pointer; border-radius: 8px; transition: all 0.3s; color: #fff; display: flex; justify-content: space-between; align-items: center; background: ${window.selectedPrefix === '' ? 'linear-gradient(90deg, #ff9800 0%, #f57c00 100%)' : 'rgba(255,255,255,0.05)'}; border: 2px solid ${window.selectedPrefix === '' ? '#ff9800' : 'transparent'}; box-shadow: ${window.selectedPrefix === '' ? '0 2px 8px rgba(255, 152, 0, 0.3)' : 'none'};"
             onmouseover="if(window.selectedPrefix !== '') { this.style.background='rgba(255, 152, 0, 0.2)'; this.style.borderColor='#ff9800'; this.style.transform='translateX(5px)'; }" 
             onmouseout="if(window.selectedPrefix !== '') { this.style.background='rgba(255,255,255,0.05)'; this.style.borderColor='transparent'; this.style.transform='translateX(0)'; }">
            <div style="display: flex; align-items: center; gap: 0.75rem;">
                <span style="font-size: 1.2rem;">${window.selectedPrefix === '' ? '✓' : '🚫'}</span>
                <span style="font-weight: ${window.selectedPrefix === '' ? '700' : '500'}; font-size: 1rem; letter-spacing: 1px;">Sans Prefix</span>
            </div>
        </div>
    `;

    const prefixOptions = window.bonLivraisonPrefixes.map((prefix, index) => `
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

    listContainer.innerHTML = sansPrefixOption + prefixOptions;
}

// Select prefix (Global)
window.selectPrefixChaimae = function (prefix) {
    console.log('🔵 [PREFIX SELECT] Selecting prefix:', prefix);
    window.selectedPrefix = prefix;

    const prefixInput = document.getElementById('prefixInputChaimae');
    const prefixExample = document.getElementById('prefixExampleChaimae');

    if (prefixInput) {
        prefixInput.value = prefix;
        console.log('✅ [PREFIX SELECT] Updated prefixInput to:', prefix === '' ? '(empty)' : prefix);
    } else {
        console.log('❌ [PREFIX SELECT] prefixInput not found');
    }

    if (prefixExample) {
        prefixExample.textContent = prefix === '' ? '' : prefix;
        console.log('✅ [PREFIX SELECT] Updated prefixExample to:', prefix === '' ? '(aucun)' : prefix);
    }

    // Update highest number display based on selected prefix
    const highestDisplay = document.getElementById('createHighestNumberChaimae');
    const highestContainer = document.getElementById('createHighestNumberContainerChaimae');
    if (highestDisplay && highestContainer && window.createHighestByPrefix) {
        if (prefix === '') {
            // For "Sans Prefix", hide the highest number display
            highestContainer.style.display = 'none';
        } else if (window.createHighestByPrefix[prefix]) {
            const currentYear = 2026;
            const pCurrent = window.createHighestByPrefix[prefix][currentYear];
            highestDisplay.textContent = pCurrent ? pCurrent.full : 'Aucun';
            highestContainer.style.display = 'block';
        } else {
            highestContainer.style.display = 'none';
        }
    }

    const dropdown = document.getElementById('prefixDropdownChaimae');
    if (dropdown) {
        dropdown.style.display = 'none';
        console.log('✅ [PREFIX SELECT] Closed dropdown');
    }

    renderPrefixListChaimae();
    console.log('✅ [PREFIX SELECT] Rendered prefix list');
}

// Add new prefix (Global)
window.addNewPrefixChaimae = async function () {
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
window.deletePrefixChaimae = async function (prefix) {
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

// ==================== ORDER PREFIX FUNCTIONS ====================

// Toggle order prefix dropdown (Global)
window.toggleOrderPrefixDropdownChaimae = async function () {
    const dropdown = document.getElementById('orderPrefixDropdownChaimae');
    if (!dropdown) return;

    if (dropdown.style.display === 'none') {
        // Load order prefixes from database first
        await loadOrderPrefixesFromDB();
        renderOrderPrefixListChaimae();
        dropdown.style.display = 'block';
    } else {
        dropdown.style.display = 'none';
    }
}

// Render order prefix list (Global)
window.renderOrderPrefixListChaimae = function () {
    const listContainer = document.getElementById('orderPrefixListChaimae');
    if (!listContainer) return;

    // Add "Sans Prefix" option at the beginning
    const sansPrefixOption = `
        <div onclick="selectOrderPrefixChaimae('')" 
             style="margin: 0.35rem; padding: 0.75rem 1rem; cursor: pointer; border-radius: 8px; transition: all 0.3s; color: #fff; display: flex; justify-content: space-between; align-items: center; background: ${window.selectedOrderPrefix === '' ? 'linear-gradient(90deg, #ff9800 0%, #f57c00 100%)' : 'rgba(255,255,255,0.05)'}; border: 2px solid ${window.selectedOrderPrefix === '' ? '#ff9800' : 'transparent'}; box-shadow: ${window.selectedOrderPrefix === '' ? '0 2px 8px rgba(255, 152, 0, 0.3)' : 'none'};"
             onmouseover="if(window.selectedOrderPrefix !== '') { this.style.background='rgba(255, 152, 0, 0.2)'; this.style.borderColor='#ff9800'; this.style.transform='translateX(5px)'; }" 
             onmouseout="if(window.selectedOrderPrefix !== '') { this.style.background='rgba(255,255,255,0.05)'; this.style.borderColor='transparent'; this.style.transform='translateX(0)'; }">
            <div style="display: flex; align-items: center; gap: 0.75rem;">
                <span style="font-size: 1.2rem;">${window.selectedOrderPrefix === '' ? '✓' : '🚫'}</span>
                <span style="font-weight: ${window.selectedOrderPrefix === '' ? '700' : '500'}; font-size: 1rem; letter-spacing: 1px;">Sans Prefix</span>
            </div>
        </div>
    `;

    const prefixOptions = window.orderPrefixes.map((prefix, index) => `
        <div onclick="selectOrderPrefixChaimae('${prefix}')" 
             style="margin: 0.35rem; padding: 0.75rem 1rem; cursor: pointer; border-radius: 8px; transition: all 0.3s; color: #fff; display: flex; justify-content: space-between; align-items: center; background: ${prefix === window.selectedOrderPrefix ? 'linear-gradient(90deg, #2196f3 0%, #1976d2 100%)' : 'rgba(255,255,255,0.05)'}; border: 2px solid ${prefix === window.selectedOrderPrefix ? '#2196f3' : 'transparent'}; box-shadow: ${prefix === window.selectedOrderPrefix ? '0 2px 8px rgba(33, 150, 243, 0.3)' : 'none'};"
             onmouseover="if('${prefix}' !== window.selectedOrderPrefix) { this.style.background='rgba(33, 150, 243, 0.2)'; this.style.borderColor='#2196f3'; this.style.transform='translateX(5px)'; }" 
             onmouseout="if('${prefix}' !== window.selectedOrderPrefix) { this.style.background='rgba(255,255,255,0.05)'; this.style.borderColor='transparent'; this.style.transform='translateX(0)'; }">
            <div style="display: flex; align-items: center; gap: 0.75rem;">
                <span style="font-size: 1.2rem;">${prefix === window.selectedOrderPrefix ? '✓' : '📌'}</span>
                <span style="font-weight: ${prefix === window.selectedOrderPrefix ? '700' : '500'}; font-size: 1rem; letter-spacing: 1px;">${prefix}</span>
            </div>
            ${window.orderPrefixes.length > 1 ? `
                <button onclick="event.stopPropagation(); deleteOrderPrefixChaimae('${prefix}')" 
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

    listContainer.innerHTML = sansPrefixOption + prefixOptions;
}

// Select order prefix (Global)
window.selectOrderPrefixChaimae = function (prefix) {
    console.log('🔵 [ORDER PREFIX SELECT] Selecting prefix:', prefix);
    window.selectedOrderPrefix = prefix;

    const prefixInput = document.getElementById('orderPrefixInputChaimae');
    const prefixExample = document.getElementById('orderPrefixExampleChaimae');

    if (prefixInput) {
        prefixInput.value = prefix;
        console.log('✅ [ORDER PREFIX SELECT] Updated orderPrefixInput to:', prefix);
    }

    if (prefixExample) {
        prefixExample.textContent = prefix;
        console.log('✅ [ORDER PREFIX SELECT] Updated orderPrefixExample to:', prefix);
    }

    const dropdown = document.getElementById('orderPrefixDropdownChaimae');
    if (dropdown) {
        dropdown.style.display = 'none';
    }

    renderOrderPrefixListChaimae();
}

// Add new order prefix (Global)
window.addNewOrderPrefixChaimae = async function () {
    const newPrefixInput = document.getElementById('newOrderPrefixInputChaimae');
    if (!newPrefixInput) return;

    const newPrefix = newPrefixInput.value.trim().toUpperCase();

    if (!newPrefix) {
        window.notify.warning('Attention', 'Veuillez saisir un prefix', 2000);
        return;
    }

    if (window.orderPrefixes.includes(newPrefix)) {
        window.notify.warning('Attention', 'Ce prefix existe déjà', 2000);
        return;
    }

    // Add to database
    const result = await window.electron.dbChaimae.addOrderPrefix(newPrefix);

    if (result.success) {
        window.orderPrefixes.push(newPrefix);
        window.orderPrefixes.sort();
        newPrefixInput.value = '';

        renderOrderPrefixListChaimae();
        window.notify.success('Succès', `Prefix "${newPrefix}" ajouté`, 2000);
    } else {
        window.notify.error('Erreur', result.error || 'Impossible d\'ajouter le prefix', 3000);
    }
}

// Delete order prefix (Global)
window.deleteOrderPrefixChaimae = async function (prefix) {
    if (window.orderPrefixes.length <= 1) {
        window.notify.warning('Attention', 'Vous devez garder au moins un prefix', 2000);
        return;
    }

    // Delete from database
    const result = await window.electron.dbChaimae.deleteOrderPrefix(prefix);

    if (result.success) {
        const index = window.orderPrefixes.indexOf(prefix);
        if (index > -1) {
            window.orderPrefixes.splice(index, 1);

            // If deleted prefix was selected, select the first one
            if (window.selectedOrderPrefix === prefix) {
                window.selectedOrderPrefix = window.orderPrefixes[0];
                const prefixInput = document.getElementById('orderPrefixInputChaimae');
                const prefixExample = document.getElementById('orderPrefixExampleChaimae');
                if (prefixInput) prefixInput.value = window.selectedOrderPrefix;
                if (prefixExample) prefixExample.textContent = window.selectedOrderPrefix;
            }

            renderOrderPrefixListChaimae();
            window.notify.success('Succès', `Prefix "${prefix}" supprimé`, 2000);
        }
    } else {
        window.notify.error('Erreur', result.error || 'Impossible de supprimer le prefix', 3000);
    }
}

// Load order prefixes from database
async function loadOrderPrefixesFromDB() {
    try {
        const result = await window.electron.dbChaimae.getOrderPrefixes();
        if (result.success && result.data && result.data.length > 0) {
            window.orderPrefixes = result.data;
            console.log('✅ [ORDER PREFIX] Loaded from DB:', window.orderPrefixes);

            // Set selected prefix if not set
            if (!window.selectedOrderPrefix) {
                window.selectedOrderPrefix = window.orderPrefixes[0];
            }
        } else {
            // Initialize with default if no prefixes in DB
            window.orderPrefixes = ['BC', 'CMD', 'ORD'];
            window.selectedOrderPrefix = 'BC';
            console.log('ℹ️ [ORDER PREFIX] Using default prefixes');
        }
    } catch (error) {
        console.error('❌ [ORDER PREFIX] Error loading from DB:', error);
        window.orderPrefixes = ['BC', 'CMD', 'ORD'];
        window.selectedOrderPrefix = 'BC';
    }
}

// ==================== END ORDER PREFIX FUNCTIONS ====================

// ==================== SIMPLE ORDER PREFIX FUNCTIONS ====================

// Toggle simple order prefix dropdown (Global)
window.toggleSimpleOrderPrefixDropdownChaimae = async function () {
    const dropdown = document.getElementById('simpleOrderPrefixDropdownChaimae');
    if (!dropdown) return;

    if (dropdown.style.display === 'none') {
        // Load simple order prefixes from database first
        await loadSimpleOrderPrefixesFromDB();
        renderSimpleOrderPrefixListChaimae();
        dropdown.style.display = 'block';
    } else {
        dropdown.style.display = 'none';
    }
}

// Render simple order prefix list (Global)
window.renderSimpleOrderPrefixListChaimae = function () {
    const listContainer = document.getElementById('simpleOrderPrefixListChaimae');
    if (!listContainer) return;

    // Add "No Prefix" option at the beginning
    const noPrefixOption = `
        <div onclick="selectSimpleOrderPrefixChaimae('')" 
             style="margin: 0.35rem; padding: 0.75rem 1rem; cursor: pointer; border-radius: 8px; transition: all 0.3s; color: #fff; display: flex; justify-content: space-between; align-items: center; background: ${'' === window.selectedSimpleOrderPrefix ? 'linear-gradient(90deg, #9c27b0 0%, #7b1fa2 100%)' : 'rgba(255,255,255,0.05)'}; border: 2px solid ${'' === window.selectedSimpleOrderPrefix ? '#9c27b0' : 'transparent'}; box-shadow: ${'' === window.selectedSimpleOrderPrefix ? '0 2px 8px rgba(156, 39, 176, 0.3)' : 'none'};"
             onmouseover="if('' !== window.selectedSimpleOrderPrefix) { this.style.background='rgba(156, 39, 176, 0.2)'; this.style.borderColor='#9c27b0'; this.style.transform='translateX(5px)'; }" 
             onmouseout="if('' !== window.selectedSimpleOrderPrefix) { this.style.background='rgba(255,255,255,0.05)'; this.style.borderColor='transparent'; this.style.transform='translateX(0)'; }">
            <div style="display: flex; align-items: center; gap: 0.75rem;">
                <span style="font-size: 1.2rem;">${'' === window.selectedSimpleOrderPrefix ? '✓' : '🚫'}</span>
                <span style="font-weight: ${'' === window.selectedSimpleOrderPrefix ? '700' : '500'}; font-size: 1rem; letter-spacing: 1px; font-style: italic; color: #9c27b0;">Sans Prefix</span>
            </div>
        </div>
    `;

    listContainer.innerHTML = noPrefixOption + window.simpleOrderPrefixes.map((prefix, index) => `
        <div onclick="selectSimpleOrderPrefixChaimae('${prefix}')" 
             style="margin: 0.35rem; padding: 0.75rem 1rem; cursor: pointer; border-radius: 8px; transition: all 0.3s; color: #fff; display: flex; justify-content: space-between; align-items: center; background: ${prefix === window.selectedSimpleOrderPrefix ? 'linear-gradient(90deg, #2196f3 0%, #1976d2 100%)' : 'rgba(255,255,255,0.05)'}; border: 2px solid ${prefix === window.selectedSimpleOrderPrefix ? '#2196f3' : 'transparent'}; box-shadow: ${prefix === window.selectedSimpleOrderPrefix ? '0 2px 8px rgba(33, 150, 243, 0.3)' : 'none'};"
             onmouseover="if('${prefix}' !== window.selectedSimpleOrderPrefix) { this.style.background='rgba(33, 150, 243, 0.2)'; this.style.borderColor='#2196f3'; this.style.transform='translateX(5px)'; }" 
             onmouseout="if('${prefix}' !== window.selectedSimpleOrderPrefix) { this.style.background='rgba(255,255,255,0.05)'; this.style.borderColor='transparent'; this.style.transform='translateX(0)'; }">
            <div style="display: flex; align-items: center; gap: 0.75rem;">
                <span style="font-size: 1.2rem;">${prefix === window.selectedSimpleOrderPrefix ? '✓' : '📌'}</span>
                <span style="font-weight: ${prefix === window.selectedSimpleOrderPrefix ? '700' : '500'}; font-size: 1rem; letter-spacing: 1px;">${prefix}</span>
            </div>
            ${window.simpleOrderPrefixes.length > 1 ? `
                <button onclick="event.stopPropagation(); deleteSimpleOrderPrefixChaimae('${prefix}')" 
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

// Select simple order prefix (Global)
window.selectSimpleOrderPrefixChaimae = function (prefix) {
    console.log('🔵 [SIMPLE ORDER PREFIX SELECT] Selecting prefix:', prefix);
    window.selectedSimpleOrderPrefix = prefix;

    // Save to localStorage
    try {
        localStorage.setItem('lastSelectedChaimaeOrderPrefix', prefix);
        console.log('💾 [CHAIMAE ORDER PREFIX] Saved to localStorage:', prefix);
    } catch (error) {
        console.error('❌ [CHAIMAE ORDER PREFIX] Error saving to localStorage:', error);
    }

    const prefixInput = document.getElementById('simpleOrderPrefixInputChaimae');
    const prefixExample = document.getElementById('simpleOrderPrefixExampleChaimae');

    if (prefixInput) {
        prefixInput.value = prefix;
        console.log('✅ [SIMPLE ORDER PREFIX SELECT] Updated simpleOrderPrefixInput to:', prefix);
    }

    if (prefixExample) {
        prefixExample.textContent = prefix;
        console.log('✅ [SIMPLE ORDER PREFIX SELECT] Updated simpleOrderPrefixExample to:', prefix);
    }

    const dropdown = document.getElementById('simpleOrderPrefixDropdownChaimae');
    if (dropdown) {
        dropdown.style.display = 'none';
    }

    renderSimpleOrderPrefixListChaimae();
}

// Add new simple order prefix (Global)
window.addNewSimpleOrderPrefixChaimae = async function () {
    const newPrefixInput = document.getElementById('newSimpleOrderPrefixInputChaimae');
    if (!newPrefixInput) return;

    const newPrefix = newPrefixInput.value.trim().toUpperCase();

    if (!newPrefix) {
        window.notify.warning('Attention', 'Veuillez saisir un prefix', 2000);
        return;
    }

    if (window.simpleOrderPrefixes.includes(newPrefix)) {
        window.notify.warning('Attention', 'Ce prefix existe déjà', 2000);
        return;
    }

    // Add to database
    const result = await window.electron.dbChaimae.addSimpleOrderPrefix(newPrefix);

    if (result.success) {
        window.simpleOrderPrefixes.push(newPrefix);
        window.simpleOrderPrefixes.sort();
        newPrefixInput.value = '';

        renderSimpleOrderPrefixListChaimae();
        window.notify.success('Succès', `Prefix "${newPrefix}" ajouté`, 2000);
    } else {
        window.notify.error('Erreur', result.error || 'Impossible d\'ajouter le prefix', 3000);
    }
}

// Delete simple order prefix (Global)
window.deleteSimpleOrderPrefixChaimae = async function (prefix) {
    if (window.simpleOrderPrefixes.length <= 1) {
        window.notify.warning('Attention', 'Vous devez garder au moins un prefix', 2000);
        return;
    }

    // Delete from database
    const result = await window.electron.dbChaimae.deleteSimpleOrderPrefix(prefix);

    if (result.success) {
        const index = window.simpleOrderPrefixes.indexOf(prefix);
        if (index > -1) {
            window.simpleOrderPrefixes.splice(index, 1);

            // If deleted prefix was selected, select the first one
            if (window.selectedSimpleOrderPrefix === prefix) {
                window.selectedSimpleOrderPrefix = window.simpleOrderPrefixes[0];
                const prefixInput = document.getElementById('simpleOrderPrefixInputChaimae');
                const prefixExample = document.getElementById('simpleOrderPrefixExampleChaimae');
                if (prefixInput) prefixInput.value = window.selectedSimpleOrderPrefix;
                if (prefixExample) prefixExample.textContent = window.selectedSimpleOrderPrefix;
            }

            renderSimpleOrderPrefixListChaimae();
            window.notify.success('Succès', `Prefix "${prefix}" supprimé`, 2000);
        }
    } else {
        window.notify.error('Erreur', result.error || 'Impossible de supprimer le prefix', 3000);
    }
}

// Load simple order prefixes from database
async function loadSimpleOrderPrefixesFromDB() {
    try {
        const result = await window.electron.dbChaimae.getSimpleOrderPrefixes();
        if (result.success && result.data && result.data.length > 0) {
            window.simpleOrderPrefixes = result.data;
            console.log('✅ [SIMPLE ORDER PREFIX] Loaded from DB:', window.simpleOrderPrefixes);

            // Set selected prefix if not set
            if (!window.selectedSimpleOrderPrefix) {
                window.selectedSimpleOrderPrefix = window.simpleOrderPrefixes[0];
            }

            // Try to load last selected prefix from localStorage
            let lastSelected = null;
            try {
                lastSelected = localStorage.getItem('lastSelectedChaimaeOrderPrefix');
                console.log('💾 [CHAIMAE ORDER PREFIX] Retrieved from localStorage:', lastSelected);
            } catch (error) {
                console.error('❌ [CHAIMAE ORDER PREFIX] Error reading from localStorage:', error);
            }

            // Use last selected if it exists in the list, otherwise use first
            if (lastSelected && window.simpleOrderPrefixes.includes(lastSelected)) {
                window.selectedSimpleOrderPrefix = lastSelected;
                console.log('✅ [CHAIMAE ORDER PREFIX] Using last selected:', lastSelected);
            } else {
                window.selectedSimpleOrderPrefix = window.simpleOrderPrefixes[0] || null;
                console.log('✅ [CHAIMAE ORDER PREFIX] Using first prefix:', window.selectedSimpleOrderPrefix);
            }
        } else {
            window.simpleOrderPrefixes = [];
            window.selectedSimpleOrderPrefix = null;
            console.log('ℹ️ [CHAIMAE ORDER PREFIX] No prefixes found in database');
        }
    } catch (error) {
        console.error('❌ [CHAIMAE ORDER PREFIX] Error loading from DB:', error);
        window.simpleOrderPrefixes = [];
        window.selectedSimpleOrderPrefix = null;
    }
}

// ==================== END SIMPLE ORDER PREFIX FUNCTIONS ====================

// Bon de livraison field in Facture - No auto-formatting (user enters value as-is)

// Format Bon de livraison number with selected prefix (Global)
window.formatBonLivraisonWithPrefixChaimae = function (input) {
    let value = input.value.trim();

    // 🔍 DEBUG: Log input value
    console.log('🔴 [FORMAT BON LIVRAISON] Input value:', value);
    console.log('🔴 [FORMAT BON LIVRAISON] Selected prefix:', window.selectedPrefix);

    // إذا كان الحقل فارغاً، لا تفعل شيئاً
    if (!value) {
        console.log('⚠️ [FORMAT BON LIVRAISON] Empty value, returning');
        return;
    }

    // إذا كان يحتوي بالفعل على سلاش، لا تفعل شيئاً
    if (value.includes('/')) {
        console.log('⚠️ [FORMAT BON LIVRAISON] Already has slash, returning:', value);
        return;
    }

    // استخراج الأرقام فقط
    let numbers = value.replace(/[^0-9]/g, '');

    console.log('🔴 [FORMAT BON LIVRAISON] Extracted numbers:', numbers);

    // إذا كان هناك أرقام، أضف السنة
    if (numbers) {
        const year = new Date().getFullYear();
        const formatted = `${numbers}/${year}`;
        input.value = formatted;
        console.log('✅ [FORMAT BON LIVRAISON] Formatted value (without prefix in input):', formatted);
    }
}

// Initialize prefixes when page loads
window.addEventListener('DOMContentLoaded', async () => {
    await loadPrefixesFromDB();
});

// Close dropdown when clicking outside (Global)
document.addEventListener('click', function (event) {
    const dropdown = document.getElementById('prefixDropdownChaimae');
    const prefixInput = document.getElementById('prefixInputChaimae');

    if (dropdown && prefixInput &&
        !dropdown.contains(event.target) &&
        event.target !== prefixInput) {
        dropdown.style.display = 'none';
    }
});

// Add year only (without MG prefix) for Chaimae (Global)
window.addYearOnBlurChaimae = function (input) {
    let value = input.value.trim();

    // إذا كان الحقل فارغاً، لا تفعل شيئاً
    if (!value) return;

    // إذا كان الرقم يحتوي بالفعل على /, لا تفعل شيئاً
    if (value.includes('/')) return;

    // أضف السنة الحالية فقط
    const year = new Date().getFullYear();
    input.value = `${value}/${year}`;
}

// Handle arrow key navigation in products table (Global)
window.handleArrowNavigationChaimae = function (event, currentRowId, currentCellIndex) {
    // Only handle arrow keys
    if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
        return;
    }

    const currentRow = document.getElementById(currentRowId);
    const tbody = document.getElementById('productsTableBodyChaimae');
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
            addProductRowChaimae();
            setTimeout(() => {
                const newRows = Array.from(tbody.querySelectorAll('tr'));
                targetRow = newRows[newRows.length - 1];
                focusCell(targetRow, targetCellIndex);
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
        focusCell(targetRow, targetCellIndex);
    }
};

// Helper function to focus a specific cell in a row
function focusCell(row, cellIndex) {
    const cells = row.querySelectorAll('td');
    // cellIndex: 0=designation, 1=quantity, 2=price
    // But table has drag handle as first column, so add +1
    const actualIndex = cellIndex + 1;
    if (cells[actualIndex]) {
        const input = cells[actualIndex].querySelector('textarea, input');
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

// Add product row for Chaimae (Global)
let productRowCounterChaimae = 0;
let dragModeCreateChaimae = false;
let draggedRowCreateChaimae = null;
let draggedIndexCreateChaimae = null;

window.addProductRowChaimae = function () {
    const tbody = document.getElementById('productsTableBodyChaimae');
    const rowId = `product-chaimae-${productRowCounterChaimae++}`;

    const row = document.createElement('tr');
    row.id = rowId;
    row.setAttribute('draggable', 'false');
    row.innerHTML = `
        <td style="cursor: default; user-select: none; width: 20px; padding: 0.5rem 0.25rem; text-align: center; color: #444; font-size: 16px;" class="drag-handle" title="Activer Réorganiser pour glisser">
            ⋮⋮
        </td>
        <td>
            <textarea class="product-designation" rows="2" placeholder="Description du produit..." onkeydown="handleArrowNavigationChaimae(event, '${rowId}', 0)"></textarea>
        </td>
        <td>
            <input type="text" class="product-quantity" placeholder="ex: 50 Kg, F, 10"
                   onchange="calculateRowTotalChaimae('${rowId}')" onblur="calculateRowTotalChaimae('${rowId}')"
                   onkeydown="handleArrowNavigationChaimae(event, '${rowId}', 1)">
        </td>
        <td>
            <input type="number" class="product-price" step="0.01" placeholder="0.00"
                   onchange="calculateRowTotalChaimae('${rowId}')" onblur="calculateRowTotalChaimae('${rowId}')"
                   onkeydown="handleArrowNavigationChaimae(event, '${rowId}', 2)">
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

    row.addEventListener('dragstart', handleDragStartCreateChaimae);
    row.addEventListener('dragover', handleDragOverCreateChaimae);
    row.addEventListener('drop', handleDropCreateChaimae);
    row.addEventListener('dragend', handleDragEndCreateChaimae);

    const inputs = row.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('mousedown', () => row.setAttribute('draggable', 'false'));
        input.addEventListener('blur', () => { if (dragModeCreateChaimae) row.setAttribute('draggable', 'true'); });
    });

    tbody.appendChild(row);

    if (dragModeCreateChaimae) {
        row.setAttribute('draggable', 'true');
        row.querySelector('.drag-handle').style.cursor = 'grab';
        row.querySelector('.drag-handle').style.color = '#888';
    }
}

// Calculate row total for Chaimae (Global)
window.calculateRowTotalChaimae = function (rowId) {
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
window.deleteProductRowChaimae = function (rowId) {
    document.getElementById(rowId).remove();
    calculateTotalsChaimae();
}

// Drag mode toggle for create
window.toggleDragModeCreateChaimae = function () {
    dragModeCreateChaimae = !dragModeCreateChaimae;
    const btn = document.getElementById('toggleDragCreateChaimae');
    const label = document.getElementById('toggleDragLabelCreateChaimae');
    const tbody = document.getElementById('productsTableBodyChaimae');
    Array.from(tbody.querySelectorAll('tr')).forEach(row => {
        row.setAttribute('draggable', dragModeCreateChaimae ? 'true' : 'false');
        const handle = row.querySelector('.drag-handle');
        if (handle) {
            handle.style.cursor = dragModeCreateChaimae ? 'grab' : 'default';
            handle.style.color = dragModeCreateChaimae ? '#888' : '#444';
        }
    });
    if (dragModeCreateChaimae) {
        btn.style.background = '#9c27b0'; btn.style.color = '#fff'; btn.style.borderColor = '#9c27b0';
        label.textContent = 'Réorganiser: ON';
    } else {
        btn.style.background = '#3e3e42'; btn.style.color = '#aaa'; btn.style.borderColor = '#555';
        label.textContent = 'Réorganiser: OFF';
    }
}

// Drag and drop handlers for create
function handleDragStartCreateChaimae(e) {
    if (!dragModeCreateChaimae) return;
    draggedRowCreateChaimae = e.currentTarget;
    const rows = Array.from(document.getElementById('productsTableBodyChaimae').querySelectorAll('tr'));
    draggedIndexCreateChaimae = rows.indexOf(draggedRowCreateChaimae);
    e.currentTarget.style.opacity = '0.5';
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', draggedIndexCreateChaimae);
}

function handleDragOverCreateChaimae(e) {
    if (!dragModeCreateChaimae) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    const targetRow = e.target.closest('tr');
    if (targetRow && targetRow !== draggedRowCreateChaimae) targetRow.style.borderTop = '2px solid #9c27b0';
}

function handleDropCreateChaimae(e) {
    if (!dragModeCreateChaimae) return;
    e.preventDefault(); e.stopPropagation();
    const targetRow = e.target.closest('tr');
    if (!targetRow || targetRow === draggedRowCreateChaimae) return;
    targetRow.style.borderTop = '';
    const tbody = document.getElementById('productsTableBodyChaimae');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    const dropIndex = rows.indexOf(targetRow);
    if (draggedIndexCreateChaimae === null || draggedIndexCreateChaimae === dropIndex) return;
    if (draggedIndexCreateChaimae < dropIndex) tbody.insertBefore(draggedRowCreateChaimae, targetRow.nextSibling);
    else tbody.insertBefore(draggedRowCreateChaimae, targetRow);
    calculateTotalsChaimae();
}

function handleDragEndCreateChaimae(e) {
    e.currentTarget.style.opacity = '1';
    Array.from(document.getElementById('productsTableBodyChaimae').querySelectorAll('tr')).forEach(r => r.style.borderTop = '');
    draggedRowCreateChaimae = null; draggedIndexCreateChaimae = null;
}

// Calculate totals for Chaimae (Global)
window.calculateTotalsChaimae = function () {
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

    const tvaInput = document.getElementById('tvaRateChaimae');
    let tvaRate = parseFloat(tvaInput.value) || 0;

    // FIX: prevent year (2026) or huge numbers from breaking calculations
    if (tvaRate < 0 || tvaRate > 100) {
        console.warn('⚠️ [CHAIMAE] Invalid TVA Rate detected:', tvaRate, 'Resetting to 20');
        tvaRate = 20;
        tvaInput.value = '20';
    }

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
window.searchClientsChaimae = function (query) {
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
            (client.nom || '').toLowerCase().includes(searchTerm) ||
            (client.ice || '').toLowerCase().includes(searchTerm)
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
        <div class="dropdown-item" style="display: flex; justify-content: space-between; align-items: center;">
            <div style="flex: 1;" onmousedown="selectClientChaimae('${client.nom.replace(/'/g, "\\'")}', '${client.ice}')">
                <div class="client-name">${client.nom}</div>
                <div class="client-ice">ICE: ${client.ice}</div>
            </div>
            <button class="delete-client-btn" onclick="event.stopPropagation(); deleteClientChaimae(${client.id}, '${client.nom.replace(/'/g, "\\'")}');" 
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
    console.log('✅ Dropdown displayed with', filteredClientsChaimae.slice(0, 10).length, 'clients');
}

window.showClientsListChaimae = function () {
    if (allClientsChaimae.length > 0) {
        filteredClientsChaimae = allClientsChaimae;
        displayClientsListChaimae();
    }
}

window.hideClientsListChaimae = function () {
    setTimeout(() => {
        const dropdown = document.getElementById('clientsDropdownChaimae');
        if (dropdown) dropdown.style.display = 'none';
    }, 200);
}

// Select client from dropdown
window.selectClientChaimae = function (nom, ice) {
    document.getElementById('clientNom').value = nom;
    document.getElementById('clientICE').value = ice;

    const dropdown = document.getElementById('clientsDropdownChaimae');
    if (dropdown) dropdown.style.display = 'none';
}

// Show custom delete error modal
function showDeleteErrorModal(clientName, errorMessage) {
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

    // Close on overlay click
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.remove();
        }
    });

    // Close on Escape key
    const escapeHandler = (e) => {
        if (e.key === 'Escape') {
            overlay.remove();
            document.removeEventListener('keydown', escapeHandler);
        }
    };
    document.addEventListener('keydown', escapeHandler);
}

// Delete a client
window.deleteClientChaimae = async function (clientId, clientName) {
    // Create custom confirmation modal
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

    // Handle cancel
    modal.querySelector('#cancelDeleteBtn').addEventListener('click', () => {
        overlay.remove();
    });

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.remove();
        }
    });

    // Handle confirm
    modal.querySelector('#confirmDeleteBtn').addEventListener('click', async () => {
        overlay.remove();

        try {
            const result = await window.electron.dbChaimae.deleteClient(clientId);

            if (result.success) {
                window.notify.success('تم الحذف', `تم حذف الزبون "${clientName}" بنجاح`);
                // Reload clients list
                await loadAllClientsChaimae();
                // Refresh dropdown
                searchClientsChaimae(document.getElementById('clientNom').value);
            } else {
                // Show custom error modal
                showDeleteErrorModal(clientName, result.error || 'فشل حذف الزبون');
            }
        } catch (error) {
            console.error('Error deleting client:', error);
            showDeleteErrorModal(clientName, 'حدث خطأ أثناء حذف الزبون');
        }
    });
}

// Initialize page for Chaimae (Global)
window.initCreateInvoiceChaimaePage = function () {
    console.log('🔄 Initializing create invoice page for Chaimae...');

    // Show admin-only fields (Featured & Private Notes) for super users
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const isSuperUser = (user.email === 'redouanerrebbahi99@gmail.com' || user.can_auto_validate === true);
    const adminFields = document.getElementById('adminFieldsChaimae');
    if (adminFields && isSuperUser) {
        adminFields.style.display = 'block';
    }

    // Set today's date
    const today = (window.todayDateString ? window.todayDateString() : new Date().toISOString().split('T')[0]);
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

    // 👤 Populate "Créé par" with current user name
    try {
        const currentUser = JSON.parse(localStorage.getItem('user'));
        if (currentUser && currentUser.name) {
            document.getElementById('createdByChaimae').value = currentUser.name;
        }
    } catch (e) {
        console.error('Error getting user for Créé par:', e);
    }

    // Load delivery persons for autocomplete
    loadDeliveryPersonsChaimae();
}

// Handle form submission for Chaimae (Global)
// Handle form submission for Chaimae (Global)
async function handleFormSubmitChaimae(e) {
    e.preventDefault();

    // 🚀 High-Visibility Loading Overlay
    const overlay = document.createElement('div');
    overlay.id = 'global-loading-overlay-chaimae-create';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        z-index: 99999;
        color: white;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    `;
    overlay.innerHTML = `
        <div style="margin-bottom: 20px;">
            <svg width="60" height="60" viewBox="0 0 50 50" style="animation: rotate 2s linear infinite;">
                <circle cx="25" cy="25" r="20" fill="none" stroke="#2196F3" stroke-width="5" stroke-dasharray="80, 200" stroke-dashoffset="0" stroke-linecap="round">
                    <animateTransform attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="1.5s" repeatCount="indefinite"/>
                </circle>
            </svg>
        </div>
        <h2 style="margin: 0; font-size: 1.5rem; font-weight: 600;">Enregistrement...</h2>
        <p style="margin: 10px 0 0; opacity: 0.8;">Veuillez patienter pendant la création de votre facture</p>
        <style>
            @keyframes rotate { 100% { transform: rotate(360deg); } }
        </style>
    `;
    document.body.appendChild(overlay);

    // Validation: Livré par is mandatory unless it's a Devis
    const docType = document.getElementById('documentType').value;
    const deliveredByValue = document.getElementById('deliveredByChaimae')?.value;
    if (docType !== 'devis' && !deliveredByValue) {
        if (overlay) overlay.remove();
        window.notify.warning('Attention', 'Le champ "Livré par" est obligatoire', 3000);
        return;
    }

    try {
        // Get current user info
        const currentUser = JSON.parse(localStorage.getItem('user'));

        // Determine validation status: automatic for specific super user or users with can_auto_validate permission
        const validationStatus = (currentUser?.email === 'redouanerrebbahi99@gmail.com' || currentUser?.can_auto_validate === true)
            ? 'validated'
            : 'pending';

        // Collect form data
        const formData = {
            company_code: 'CHAIMAE',
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
                bon_commande: null,
                // 👤 Add user tracking
                created_by_user_id: currentUser?.id || null,
                created_by_user_name: currentUser?.name || 'Unknown',
                created_by_user_email: currentUser?.email || null,
                // 📦 Add Chaimae specific fields
                created_by: document.getElementById('createdByChaimae')?.value || null,
                delivered_by: document.getElementById('deliveredByChaimae')?.value || null,
                // ✅ Add validation status
                validation_status: validationStatus
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
        // const docType is already defined above
        const mainNumero = document.getElementById('documentNumeroChaimae')?.value;

        if (docType === 'facture') {
            formData.document.numero = mainNumero;
            const numeroOrderChaimae = document.getElementById('documentNumeroOrderChaimae');
            if (numeroOrderChaimae && numeroOrderChaimae.value) {
                const prefix = window.selectedSimpleOrderPrefix;
                // Only add prefix if it's not empty (Sans Prefix)
                if (prefix && prefix !== '' && prefix !== 'Sans Prefix') {
                    formData.document.numero_Order = `${prefix}${numeroOrderChaimae.value}`;
                } else {
                    formData.document.numero_Order = numeroOrderChaimae.value;
                }
            } else {
                formData.document.numero_Order = null;
            }
            formData.document.bon_de_livraison = document.getElementById('documentBonLivraisonChaimae')?.value || null;
        } else if (docType === 'devis') {
            formData.document.numero_devis = mainNumero;
        } else if (docType === 'bon_livraison') {
            // Get selected prefix and combine with numero
            const selectedPrefix = window.selectedPrefix !== undefined ? window.selectedPrefix : 'MG';

            // 🔍 DEBUG: Log what we're getting
            console.log('🔴 [CREATE DEBUG] SELECTED PREFIX:', selectedPrefix);
            console.log('🔴 [CREATE DEBUG] MAIN NUMERO:', mainNumero);
            console.log('🔴 [CREATE DEBUG] MAIN NUMERO contains prefix?', mainNumero?.startsWith(selectedPrefix));

            // ✅ FIX: Check if mainNumero already contains the prefix OR if "Sans Prefix" is selected
            let fullNumero;
            if (selectedPrefix === '' || selectedPrefix === 'Sans Prefix') {
                // Sans Prefix selected - use number as-is without any prefix
                fullNumero = mainNumero;
                console.log('🚫 [CREATE DEBUG] Sans Prefix selected, using numero without prefix:', fullNumero);
            } else if (mainNumero?.startsWith(selectedPrefix)) {
                fullNumero = mainNumero; // Already has prefix, don't add it again
                console.log('⚠️ [CREATE DEBUG] NUMERO already has prefix, using as-is:', fullNumero);
            } else {
                fullNumero = selectedPrefix + mainNumero;
                console.log('✅ [CREATE DEBUG] Adding prefix to numero:', fullNumero);
            }

            console.log('📝 [CREATE DEBUG] Final Full numero:', fullNumero);

            formData.document.numero = null; // Don't set numero for bon_livraison
            formData.document.numero_bl = fullNumero; // Save to document_numero_bl field

            // Format N° Order with prefix if provided
            const orderValue = document.getElementById('documentBonCommandeChaimae')?.value?.trim();
            if (orderValue) {
                const selectedOrderPrefix = window.selectedOrderPrefix !== undefined ? window.selectedOrderPrefix : 'BC';

                // Remove any existing prefix from all known prefixes
                let cleanValue = orderValue;
                if (window.orderPrefixes && window.orderPrefixes.length > 0) {
                    for (const prefix of window.orderPrefixes) {
                        if (cleanValue.startsWith(prefix)) {
                            cleanValue = cleanValue.substring(prefix.length);
                            break;
                        }
                    }
                }

                // Add the selected prefix (or leave empty if "Sans Prefix" is selected)
                if (selectedOrderPrefix === '' || selectedOrderPrefix === 'Sans Prefix') {
                    formData.document.numero_commande = cleanValue;
                } else {
                    formData.document.numero_commande = `${selectedOrderPrefix}${cleanValue}`;
                }
            } else {
                formData.document.numero_commande = null;
            }
        }

        // Collect products
        const rows = document.querySelectorAll('#productsTableBodyChaimae tr');
        rows.forEach(row => {
            const designation = row.querySelector('.product-designation').value.trim();
            const quantiteOriginal = row.querySelector('.product-quantity').value.trim();
            const prix_unitaire_ht = parseFloat(row.querySelector('.product-price').value) || 0;

            console.log('🔍 CHAIMAE BEFORE conversion - Quantite:', quantiteOriginal, 'Type:', typeof quantiteOriginal);

            // For calculation: convert F to 1
            let quantiteForCalc = quantiteOriginal;
            if (quantiteForCalc.toUpperCase() === 'F') {
                console.log('✅ CHAIMAE Converting F to 1 for calculation');
                quantiteForCalc = '1';
            }

            console.log('🔍 CHAIMAE AFTER conversion - QuantiteForCalc:', quantiteForCalc, 'Original:', quantiteOriginal);

            // Calculate total_ht directly from quantity and price
            const qty = parseFloat(quantiteForCalc) || 0;
            const total_ht = qty * prix_unitaire_ht;

            console.log('💾 CHAIMAE Saving product:', {
                designation,
                quantiteOriginal,
                qty_parsed: qty,
                prix_unitaire_ht,
                calculated_total: total_ht
            });

            // Save product if it has at least a designation
            if (designation) {
                formData.products.push({
                    designation,
                    quantite: quantiteOriginal || '0',  // Save original value (F, 10 Kg, etc.)
                    prix_unitaire_ht,
                    total_ht
                });
            }
        });

        // Products are optional now - no validation needed
        console.log('📤 Creating invoice for Chaimae:', formData);

        // Check for duplicate document numbers in regular invoices
        const allInvoicesResult = await window.electron.dbChaimae.getAllInvoices();
        if (allInvoicesResult.success) {
            const invoices = allInvoicesResult.data;

            // Check main document number
            if (mainNumero) {
                const searchNum = mainNumero.toLowerCase().trim();
                const duplicateMain = invoices.find(inv => {
                    if (docType === 'facture') {
                        return inv.document_type === 'facture' &&
                            inv.document_numero &&
                            inv.document_numero.toLowerCase().trim() === searchNum;
                    } else if (docType === 'devis') {
                        return inv.document_type === 'devis' &&
                            inv.document_numero_devis &&
                            inv.document_numero_devis.toLowerCase().trim() === searchNum;
                    } else if (docType === 'bon_livraison') {
                        const selectedPrefix = window.selectedPrefix !== undefined ? window.selectedPrefix : 'MG';
                        let fullNumero;
                        if (selectedPrefix === '' || selectedPrefix === 'Sans Prefix') {
                            fullNumero = mainNumero;
                        } else if (mainNumero?.startsWith(selectedPrefix)) {
                            fullNumero = mainNumero;
                        } else {
                            fullNumero = selectedPrefix + mainNumero;
                        }
                        const searchFull = fullNumero.toLowerCase().trim();

                        return (inv.document_type === 'bon_livraison' || inv.document_type === 'bon de livraison') &&
                            ((inv.document_numero && inv.document_numero.toLowerCase().trim() === searchFull) ||
                                (inv.document_numero_bl && inv.document_numero_bl.toLowerCase().trim() === searchFull) ||
                                (inv.document_bon_de_livraison && inv.document_bon_de_livraison.toLowerCase().trim() === searchFull));
                    }
                    return false;
                });

                if (duplicateMain) {
                    if (overlay) overlay.remove();
                    window.notify.error('Erreur', `Le numéro "${mainNumero}" existe déjà pour le type ${docType} (Insensible à la casse)`, 5000);
                    return;
                }
            }
        }

        // Check for duplicate in global invoices (for facture only)
        if (docType === 'facture' && mainNumero) {
            const allGlobalInvoicesResult = await window.electron.dbChaimae.getAllGlobalInvoices();
            if (allGlobalInvoicesResult.success) {
                const searchNumGlobal = mainNumero.toLowerCase().trim();
                const duplicateGlobal = allGlobalInvoicesResult.data.find(inv =>
                    inv.document_numero && inv.document_numero.toLowerCase().trim() === searchNumGlobal
                );

                if (duplicateGlobal) {
                    if (overlay) overlay.remove();
                    window.notify.error('Erreur', `Le numéro "${mainNumero}" existe déjà dans una facture globale (Insensible à la casse)`, 5000);
                    return;
                }
            }
        }

        if (allInvoicesResult.success) {
            const invoices = allInvoicesResult.data;

            // Check N° Order if provided (for facture)
            if (docType === 'facture' && formData.document.numero_Order) {
                const searchOrder = formData.document.numero_Order.toLowerCase().trim();
                const duplicateOrder = invoices.find(inv =>
                    (inv.document_numero_Order || inv.document_numero_order) &&
                    (inv.document_numero_Order || inv.document_numero_order).toLowerCase().trim() === searchOrder
                );
                if (duplicateOrder) {
                    if (overlay) overlay.remove();
                    window.notify.error('Erreur', `Le N° Order "${formData.document.numero_Order}" existe déjà (Insensible à la casse)`, 5000);
                    return;
                }
            }

            // Check Bon de livraison if provided (for facture)
            if (docType === 'facture' && formData.document.bon_de_livraison) {
                const searchBL = formData.document.bon_de_livraison.toLowerCase().trim();
                const duplicateBL = invoices.find(inv =>
                    inv.document_bon_de_livraison && inv.document_bon_de_livraison.toLowerCase().trim() === searchBL
                );
                if (duplicateBL) {
                    if (overlay) overlay.remove();
                    window.notify.error('Erreur', `Le Bon de livraison "${formData.document.bon_de_livraison}" existe déjà (Insensible à la casse)`, 5000);
                    return;
                }
            }

            // Check N° Order if provided (for bon_livraison)
            if (docType === 'bon_livraison' && formData.document.numero_commande) {
                const searchBC = formData.document.numero_commande.toLowerCase().trim();
                const duplicateBC = invoices.find(inv =>
                    (inv.document_type === 'bon_livraison' || inv.document_type === 'bon de livraison') &&
                    inv.document_numero_commande &&
                    inv.document_numero_commande.toLowerCase().trim() === searchBC
                );
                if (duplicateBC) {
                    if (overlay) overlay.remove();
                    window.notify.error('Erreur', `Le N° Order "${formData.document.numero_commande}" existe déjà (Insensible à la casse)`, 5000);
                    return;
                }
            }
        }

        // Save to database
        console.log('📋 [CREATE BL] formData.document object:', formData.document);
        console.log('📋 [CREATE BL] Checking BL field:', {
            'numero_BL': formData.document.numero_BL,
            'numero_bl': formData.document.numero_bl,
            'document_type': formData.document.type
        });

        const result = await window.electron.dbChaimae.createInvoice(formData);

        if (result.success) {
            const invoiceId = result.data.id;
            console.log('✅ Invoice saved with ID:', invoiceId);
            console.log('👤 Created by:', currentUser?.name || 'Unknown');

            // Upload attachments if any
            const fileInput = document.getElementById('fileInputChaimae');
            if (fileInput && fileInput.files.length > 0) {
                console.log(`📎 Uploading ${fileInput.files.length} attachments...`);

                for (const file of fileInput.files) {
                    const arrayBuffer = await file.arrayBuffer();
                    const uint8Array = new Uint8Array(arrayBuffer);

                    // 1. Save to disk
                    const saveResult = await window.electron.attachments.save({
                        company: 'CHAIMAE',
                        filename: file.name,
                        data: uint8Array
                    });

                    if (saveResult.success) {
                        // 2. Add to database with path
                        const attachResult = await window.electron.dbChaimae.addAttachment(
                            invoiceId,
                            file.name,
                            file.type,
                            null, // No BLOB
                            saveResult.filePath,
                            file.size
                        );

                        if (attachResult.success) {
                            console.log(`✅ Attachment uploaded: ${file.name}`);
                        } else {
                            console.error(`❌ Failed to upload: ${file.name}`, attachResult.error);
                        }
                    } else {
                        console.error(`❌ Failed to save to disk: ${file.name}`, saveResult.error);
                    }
                }
            }

            // Save notes if any
            const noteText = document.getElementById('invoiceNotesChaimae')?.value?.trim();
            if (noteText) {
                await window.electron.dbChaimae.saveNote(invoiceId, noteText);
            }

            // Save featured status and private notes
            const isFeatured = document.getElementById('invoiceFeaturedChaimae')?.checked ? 1 : 0;
            const privateNotes = document.getElementById('invoicePrivateNotesChaimae')?.value?.trim() || '';
            if (isFeatured || privateNotes) {
                await window.electron.dbChaimae.updateInvoiceMetadata(invoiceId, {
                    is_featured: isFeatured,
                    private_notes: privateNotes
                });
            }

            // Remove loading overlay
            if (overlay) overlay.remove();

            window.notify.success('Succès', 'Document créé avec succès!', 3000);
            setTimeout(() => {
                router.navigate('/dashboard-chaimae');
            }, 1500);
        } else {
            // Remove loading overlay on error
            if (overlay) overlay.remove();
            window.notify.error('Erreur', result.error || 'Erreur lors de la création', 4000);
        }

    } catch (error) {
        console.error('Error creating invoice for Chaimae:', error);
        // Remove loading overlay on catch
        if (overlay) overlay.remove();
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

// Show missing invoice numbers (Global)
window.showMissingNumbersChaimae = async function (selectedYear = null) {
    const currentYear = selectedYear || new Date().getFullYear();

    try {
        const result = await window.electron.dbChaimae.getMissingNumbers(currentYear);

        if (!result.success) {
            window.notify.error('Erreur', result.error || 'Impossible de charger les numéros manquants', 3000);
            return;
        }

        const missingNumbers = result.data || [];
        const stats = result.stats || {};

        // Get all available years from invoices
        const invoicesResult = await window.electron.dbChaimae.getAllInvoices('CHAIMAE');
        let availableYears = [new Date().getFullYear()];
        if (invoicesResult.success && invoicesResult.data) {
            const years = invoicesResult.data.map(inv => {
                const year = (window.safeParseDate||function(d){return new Date(d)})(inv.document_date).getFullYear();
                return year;
            });
            availableYears = [...new Set([...years, new Date().getFullYear()])].sort((a, b) => b - a);
        }

        // Create modal
        const modal = document.createElement('div');
        modal.id = 'missingNumbersModalChaimae';
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
                    <select id="yearFilterChaimaeMissing" onchange="window.showMissingNumbersChaimae(this.value === 'all' ? null : parseInt(this.value))" 
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
                    <button type="button" onclick="selectMissingNumberChaimae(${num})" 
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
            
            <button type="button" onclick="document.getElementById('missingNumbersModalChaimae').remove()" 
                    style="width: 100%; padding: 0.75rem; background: #3e3e42; color: #fff; border: none; border-radius: 8px; cursor: pointer; font-size: 1rem; transition: all 0.3s;"
                    onmouseover="this.style.background='#4e4e52';"
                    onmouseout="this.style.background='#3e3e42';">
                Fermer
            </button>
        `;

        modal.appendChild(content);

        // Remove existing modal if any
        const existingModal = document.getElementById('missingNumbersModalChaimae');
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

// Select missing number and fill input (Global)
window.selectMissingNumberChaimae = function (number) {
    console.log('🔍 [CHAIMAE] selectMissingNumberChaimae called with number:', number);
    console.log('🔍 [CHAIMAE] Type of number:', typeof number);

    const input = document.getElementById('documentNumeroChaimae');
    console.log('🔍 [CHAIMAE] Input element found:', !!input);

    if (input) {
        console.log('🔍 [CHAIMAE] Setting input value to:', number);
        input.value = number;
        console.log('🔍 [CHAIMAE] Input value after setting:', input.value);

        input.focus();
        console.log('🔍 [CHAIMAE] Input focused');

        // Close modal
        const modal = document.querySelector('[style*="position: fixed"]');
        console.log('🔍 [CHAIMAE] Modal found:', !!modal);
        if (modal) {
            modal.remove();
            console.log('🔍 [CHAIMAE] Modal removed');
        }

        console.log('🔍 [CHAIMAE] Showing success notification for number:', number);
        window.notify.success('Succès', `Numéro ${number} sélectionné`, 2000);
    } else {
        console.error('❌ [CHAIMAE] Input element NOT found!');
    }
};

// Show missing devis numbers (Global)
window.showMissingDevisNumbersChaimae = async function (selectedYear = null) {
    const currentYear = selectedYear || new Date().getFullYear();
    console.log('🔍 [FRONTEND] showMissingDevisNumbersChaimae called for year:', currentYear);

    try {
        console.log('🔍 [FRONTEND] Calling getMissingDevisNumbers...');
        const result = await window.electron.dbChaimae.getMissingDevisNumbers(currentYear);
        console.log('🔍 [FRONTEND] Result:', result);
        console.log('🔍 [FRONTEND] Result.data:', result.data);
        console.log('🔍 [FRONTEND] Result.data type:', Array.isArray(result.data) ? 'Array' : typeof result.data);
        console.log('🔍 [FRONTEND] Result.data length:', result.data ? result.data.length : 'N/A');

        if (!result.success) {
            window.notify.error('Erreur', result.error || 'Impossible de charger les numéros manquants', 3000);
            return;
        }

        const missingNumbers = result.data || [];
        const stats = result.stats || {};

        console.log('🔍 [FRONTEND] Missing Numbers to display:', missingNumbers);
        console.log('🔍 [FRONTEND] Stats:', stats);

        // Get all available years from invoices
        const invoicesResult = await window.electron.dbChaimae.getAllInvoices('CHAIMAE');
        let availableYears = [new Date().getFullYear()];
        if (invoicesResult.success && invoicesResult.data) {
            const years = invoicesResult.data.map(inv => {
                const year = (window.safeParseDate||function(d){return new Date(d)})(inv.document_date).getFullYear();
                return year;
            });
            availableYears = [...new Set([...years, new Date().getFullYear()])].sort((a, b) => b - a);
        }

        // Create modal
        const modal = document.createElement('div');
        modal.id = 'missingDevisNumbersModalChaimae';
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
                    <select id="yearFilterChaimaeDevisMissing" onchange="window.showMissingDevisNumbersChaimae(this.value === 'all' ? null : parseInt(this.value))" 
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
                    <button type="button" onclick="selectMissingNumberChaimae(${num})" 
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
            
            <button type="button" onclick="document.getElementById('missingDevisNumbersModalChaimae').remove()" 
                    style="width: 100%; padding: 0.75rem; background: #3e3e42; color: #fff; border: none; border-radius: 8px; cursor: pointer; font-size: 1rem; transition: all 0.3s;"
                    onmouseover="this.style.background='#4e4e52';"
                    onmouseout="this.style.background='#3e3e42';">
                Fermer
            </button>
        `;

        modal.appendChild(content);

        // Remove existing modal if any
        const existingModal = document.getElementById('missingDevisNumbersModalChaimae');
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

// Show missing order numbers (Global)
window.showMissingOrderNumbersChaimae = async function () {
    try {
        const result = await window.electron.dbChaimae.getMissingOrderNumbers();

        if (!result.success) {
            window.notify.error('Erreur', result.error || 'Impossible de charger les numéros manquants', 3000);
            return;
        }

        const missingNumbers = result.data || [];
        const stats = result.stats || {};

        if (missingNumbers.length === 0) {
            window.notify.info('Info', 'Aucun numéro manquant trouvé', 2500);
            return;
        }

        // Create modal
        const modal = document.createElement('div');
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
            border: 2px solid #2196f3;
        `;

        content.innerHTML = `
            <div style="margin-bottom: 1.5rem;">
                <h2 style="margin: 0 0 0.5rem 0; color: #fff; font-size: 1.5rem; display: flex; align-items: center; gap: 0.5rem;">
                    <span style="font-size: 1.8rem;">📊</span>
                    N° Order manquants (${missingNumbers.length})
                </h2>
                <p style="margin: 0; color: #999; font-size: 0.9rem;">
                    Min: ${stats.min || 0} | Max: ${stats.max || 0} | Utilisés: ${stats.used || 0} | Manquants: ${stats.missing || 0}
                </p>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(60px, 1fr)); gap: 0.75rem; margin-bottom: 1.5rem;">
                ${missingNumbers.map(num => `
                    <button type="button" onclick="selectMissingOrderNumberChaimae(${num})" 
                            style="padding: 0.75rem; background: linear-gradient(135deg, #2196f3 0%, #1976d2 100%); color: #fff; border: none; border-radius: 8px; cursor: pointer; font-size: 1rem; font-weight: 600; transition: all 0.3s; box-shadow: 0 2px 8px rgba(33, 150, 243, 0.3);"
                            onmouseover="this.style.transform='translateY(-3px) scale(1.05)'; this.style.boxShadow='0 6px 16px rgba(33, 150, 243, 0.5)';"
                            onmouseout="this.style.transform='translateY(0) scale(1)'; this.style.boxShadow='0 2px 8px rgba(33, 150, 243, 0.3)';">
                        ${num}
                    </button>
                `).join('')}
            </div>
            
            <button type="button" onclick="this.closest('[style*=\\'position: fixed\\']').remove()" 
                    style="width: 100%; padding: 0.75rem; background: #3e3e42; color: #fff; border: none; border-radius: 8px; cursor: pointer; font-size: 1rem; transition: all 0.3s;"
                    onmouseover="this.style.background='#4e4e52';"
                    onmouseout="this.style.background='#3e3e42';">
                Fermer
            </button>
        `;

        modal.appendChild(content);
        document.body.appendChild(modal);

        // Close on outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });

    } catch (error) {
        console.error('Error showing missing order numbers:', error);
        window.notify.error('Erreur', 'Une erreur est survenue', 3000);
    }
};

// Select missing order number and fill input (Global)
window.selectMissingOrderNumberChaimae = function (number) {
    // Try both possible inputs
    let input = document.getElementById('documentBonCommandeChaimae');
    if (!input) {
        input = document.getElementById('documentNumeroOrderChaimae');
    }

    if (input) {
        input.value = number;
        input.focus();

        // Close modal
        const modal = document.querySelector('[style*="position: fixed"]');
        if (modal) modal.remove();

        window.notify.success('Succès', `N° Order ${number} sélectionné`, 2000);
    }
};

// Show missing Bon de livraison numbers grouped by prefix (Global)
window.showMissingBonLivraisonNumbersChaimae = async function () {
    const currentYear = new Date().getFullYear();

    try {
        const result = await window.electron.dbChaimae.getMissingBonLivraisonNumbers(currentYear);

        if (!result.success) {
            window.notify.error('Erreur', result.error || 'Impossible de charger les numéros manquants', 3000);
            return;
        }

        const missingByPrefix = result.byPrefix || {};
        const stats = result.stats || {};

        if (Object.keys(missingByPrefix).length === 0) {
            window.notify.info('Info', 'Aucun numéro manquant trouvé', 2500);
            return;
        }

        // Create modal
        const modal = document.createElement('div');
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
            max-width: 700px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
            border: 2px solid #4caf50;
        `;

        // Generate HTML for each prefix group
        const prefixSections = Object.keys(missingByPrefix).sort().map(prefix => {
            const numbers = missingByPrefix[prefix];
            return `
                <div style="margin-bottom: 1.5rem; padding: 1rem; background: rgba(76, 175, 80, 0.1); border-radius: 12px; border: 2px solid rgba(76, 175, 80, 0.3);">
                    <h3 style="margin: 0 0 1rem 0; color: #4caf50; font-size: 1.2rem; display: flex; align-items: center; gap: 0.5rem;">
                        <span style="background: linear-gradient(90deg, #4caf50 0%, #388e3c 100%); padding: 0.5rem 1rem; border-radius: 8px; font-weight: 700; letter-spacing: 1px;">${prefix}</span>
                        <span style="color: #999; font-size: 0.9rem; font-weight: 400;">(${numbers.length} manquant${numbers.length > 1 ? 's' : ''})</span>
                    </h3>
                    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(60px, 1fr)); gap: 0.5rem;">
                        ${numbers.map(num => `
                            <button type="button" onclick="selectMissingBonLivraisonNumberChaimae('${prefix}', ${num})" 
                                    style="padding: 0.65rem; background: linear-gradient(135deg, #4caf50 0%, #388e3c 100%); color: #fff; border: none; border-radius: 8px; cursor: pointer; font-size: 0.95rem; font-weight: 600; transition: all 0.3s; box-shadow: 0 2px 8px rgba(76, 175, 80, 0.3);"
                                    onmouseover="this.style.transform='translateY(-3px) scale(1.05)'; this.style.boxShadow='0 6px 16px rgba(76, 175, 80, 0.5)';"
                                    onmouseout="this.style.transform='translateY(0) scale(1)'; this.style.boxShadow='0 2px 8px rgba(76, 175, 80, 0.3)';">
                                ${num}
                            </button>
                        `).join('')}
                    </div>
                </div>
            `;
        }).join('');

        content.innerHTML = `
            <div style="margin-bottom: 1.5rem;">
                <h2 style="margin: 0 0 0.5rem 0; color: #fff; font-size: 1.5rem; display: flex; align-items: center; gap: 0.5rem;">
                    <span style="font-size: 1.8rem;">📊</span>
                    Bon de livraison manquants par Prefix
                </h2>
                <p style="margin: 0; color: #999; font-size: 0.9rem;">
                    Total: ${stats.totalMissing || 0} manquants | ${stats.prefixCount || 0} prefix différents
                </p>
            </div>
            
            ${prefixSections}
            
            <button type="button" onclick="this.closest('[style*=\\'position: fixed\\']').remove()" 
                    style="width: 100%; padding: 0.75rem; background: #3e3e42; color: #fff; border: none; border-radius: 8px; cursor: pointer; font-size: 1rem; transition: all 0.3s;"
                    onmouseover="this.style.background='#4e4e52';"
                    onmouseout="this.style.background='#3e3e42';">
                Fermer
            </button>
        `;

        modal.appendChild(content);
        document.body.appendChild(modal);

        // Close on outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });

    } catch (error) {
        console.error('Error showing missing Bon de livraison numbers:', error);
        window.notify.error('Erreur', 'Une erreur est survenue', 3000);
    }
};

// Select missing Bon de livraison number and fill input with prefix (Global)
window.selectMissingBonLivraisonNumberChaimae = function (prefix, number) {
    // Set the prefix
    window.selectedPrefix = prefix;
    const prefixInput = document.getElementById('prefixInputChaimae');
    const prefixExample = document.getElementById('prefixExampleChaimae');
    if (prefixInput) {
        prefixInput.value = prefix;
    }
    if (prefixExample) {
        prefixExample.textContent = prefix;
    }

    // Set the number
    const input = document.getElementById('documentNumeroChaimae');
    if (input) {
        const currentYear = new Date().getFullYear();
        input.value = `${number}/${currentYear}`;
        input.focus();

        // Close modal
        const modal = document.querySelector('[style*="position: fixed"]');
        if (modal) modal.remove();

        window.notify.success('Succès', `Bon de livraison ${number} sélectionné`, 2000);
    }
};

// Remove file for Chaimae (Global)
window.removeFileChaimae = function (index) {
    const fileInput = document.getElementById('fileInputChaimae');
    const dt = new DataTransfer();
    const files = Array.from(fileInput.files);

    files.forEach((file, i) => {
        if (i !== index) dt.items.add(file);
    });

    fileInput.files = dt.files;
    handleFileSelectChaimae({ target: fileInput });
}

// Delivery Persons for Chaimae
let allDeliveryPersonsChaimae = [];

// Load delivery persons from API
async function loadDeliveryPersonsChaimae() {
    console.log('🔄 Loading delivery persons for Chaimae...');
    try {
        const result = await window.electron.dbChaimae.getDeliveryPersons('CHAIMAE');
        if (result && result.success && result.data) {
            allDeliveryPersonsChaimae = result.data;
            console.log('✅ Loaded delivery persons:', allDeliveryPersonsChaimae.length);
            populateDeliveryPersonsDatalistChaimae();
        }
    } catch (error) {
        console.error('❌ Error loading delivery persons:', error);
    }
}

// Populate datalist with delivery persons
function populateDeliveryPersonsDatalistChaimae() {
    const datalist = document.getElementById('deliveryPersonsListChaimae');
    if (!datalist) return;

    datalist.innerHTML = allDeliveryPersonsChaimae.map(person =>
        `<option value="${person}">`
    ).join('');
}

// Search delivery persons (used for filtering if needed)
window.searchDeliveryPersonsChaimae = function (query) {
    // The datalist already handles filtering, this is a placeholder for future enhancements
    console.log('🔍 Searching delivery persons:', query);
}
