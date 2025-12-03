// Edit Global Invoice Page - Chaimae Company
function EditGlobalInvoiceChaimaePage() {
    return `
        <div class="desktop-app">
            <div class="window-header">
                <div class="window-title">
                    <img src="assets/logos/chaimae.png" class="header-logo" alt="Chaimae Company" data-asset="assets/logos/chaimae.png">
                    <span>Chaimae Company - Modifier la Facture Globale</span>
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
                <form id="editGlobalInvoiceForm" class="invoice-form">
                    <!-- Section 1: Client Information -->
                    <div class="invoice-section">
                        <div class="section-header">
                            <h2>📦 Informations du client</h2>
                        </div>
                        <div class="section-body">
                            <div class="form-row">
                                <div class="form-field">
                                    <label>Nom du client <span class="required">*</span></label>
                                    <input type="text" id="clientNomEditGlobal" placeholder="Nom du client" required readonly style="background: #3e3e42; cursor: not-allowed;">
                                </div>
                                <div class="form-field">
                                    <label>N° ICE <span class="required">*</span></label>
                                    <input type="text" id="clientICEEditGlobal" placeholder="Numéro ICE" required readonly style="background: #3e3e42; cursor: not-allowed;">
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Section 2: Document Details -->
                    <div class="invoice-section">
                        <div class="section-header">
                            <h2>📄 Détails de la facture</h2>
                        </div>
                        <div class="section-body">
                            <div class="form-row">
                                <div class="form-field">
                                    <label>N° Facture <span class="required">*</span></label>
                                    <input type="text" id="documentNumeroEditGlobal" placeholder="Numéro de facture" required 
                                           onblur="if(this.value && !this.value.includes('/')) { this.value = this.value + '/' + new Date().getFullYear(); }">
                                </div>
                                <div class="form-field">
                                    <label>Date <span class="required">*</span></label>
                                    <input type="date" id="documentDateEditGlobal" required>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Section 3: Current Bons de Livraison -->
                    <div class="invoice-section">
                        <div class="section-header" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 1.25rem; border-radius: 8px 8px 0 0; display: flex; justify-content: space-between; align-items: center;">
                            <h2 style="color: #fff; margin: 0; font-size: 1.1rem; display: flex; align-items: center; gap: 0.5rem;">
                                <span style="font-size: 1.5rem;">📦</span>
                                Bons de Livraison Actuels
                            </h2>
                            <button type="button" onclick="showAddManualBonForm()" 
                                    style="padding: 0.5rem 1rem; background: #fff; color: #667eea; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 0.9rem; display: flex; align-items: center; gap: 0.5rem;"
                                    title="Ajouter un BL manuellement">
                                <span>✍️</span>
                                Ajouter Manuellement
                            </button>
                        </div>
                        <div class="section-body" style="padding: 1.5rem;">
                            <!-- Manual BL Form (Hidden by default) -->
                            <div id="manualBonForm" style="display: none; margin-bottom: 1.5rem; padding: 1.5rem; background: #2d2d30; border-radius: 8px; border: 2px solid #667eea;">
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                                    <h3 style="color: #667eea; margin: 0; font-size: 1rem;">✍️ Ajouter un BL manuellement</h3>
                                    <button type="button" onclick="hideAddManualBonForm()" 
                                            style="background: transparent; border: none; color: #999; cursor: pointer; font-size: 1.5rem; padding: 0; width: 30px; height: 30px;">
                                        ✕
                                    </button>
                                </div>
                                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                                    <div>
                                        <label style="display: block; color: #cccccc; margin-bottom: 0.5rem; font-size: 0.9rem;">N° Bon de livraison *</label>
                                        <div style="display: flex; gap: 0.5rem; align-items: flex-start;">
                                            <div style="position: relative; flex: 0 0 auto;">
                                                <input type="text" id="prefixInputEdit" placeholder="MG" 
                                                       style="width: 80px; padding: 0.75rem; background: #2d2d30; border: 2px solid #3e3e42; border-radius: 8px; color: #fff; font-size: 1rem; outline: none; cursor: pointer; font-weight: 600;"
                                                       readonly onclick="togglePrefixDropdownEdit()">
                                                <div id="prefixDropdownEdit" style="display: none; position: absolute; top: 100%; left: 0; background: linear-gradient(135deg, #1e1e1e 0%, #2d2d30 100%); border: 2px solid #667eea; border-radius: 12px; margin-top: 0.5rem; box-shadow: 0 8px 24px rgba(102, 126, 234, 0.3), 0 0 0 1px rgba(102, 126, 234, 0.1); z-index: 1000; min-width: 200px; max-height: 350px; overflow: hidden;">
                                                    <div style="padding: 0.75rem 1rem; background: linear-gradient(90deg, #667eea 0%, #764ba2 100%); border-bottom: 2px solid rgba(102, 126, 234, 0.3);">
                                                        <h4 style="margin: 0; color: #fff; font-size: 0.95rem; font-weight: 600; letter-spacing: 0.5px;">📋 Choisir un Prefix</h4>
                                                    </div>
                                                    <div id="prefixListEdit" style="max-height: 200px; overflow-y: auto; padding: 0.5rem;"></div>
                                                    <div style="padding: 0.75rem; border-top: 2px solid rgba(102, 126, 234, 0.2); background: rgba(0,0,0,0.2);">
                                                        <input type="text" id="newPrefixInputEdit" placeholder="Nouveau prefix (ex: ABC)" 
                                                               style="width: 100%; padding: 0.65rem; background: #1e1e1e; border: 2px solid #3e3e42; border-radius: 6px; color: #fff; font-size: 0.9rem; outline: none; transition: all 0.3s;"
                                                               onfocus="this.style.borderColor='#667eea'; this.style.boxShadow='0 0 0 3px rgba(102, 126, 234, 0.1)';"
                                                               onblur="this.style.borderColor='#3e3e42'; this.style.boxShadow='none';"
                                                               onkeypress="if(event.key==='Enter'){addNewPrefixEdit(); event.preventDefault();}">
                                                        <button type="button" onclick="addNewPrefixEdit()" 
                                                                style="width: 100%; margin-top: 0.5rem; padding: 0.65rem; background: linear-gradient(90deg, #667eea 0%, #764ba2 100%); color: #fff; border: none; border-radius: 6px; cursor: pointer; font-size: 0.9rem; font-weight: 600; transition: all 0.3s; box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);"
                                                                onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 12px rgba(102, 126, 234, 0.4)';"
                                                                onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 8px rgba(102, 126, 234, 0.3)';">
                                                            ➕ Ajouter le Prefix
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <input type="text" id="manualBonNumero" placeholder="123/2025" 
                                                   onblur="formatBonNumeroWithPrefixEdit(this)"
                                                   style="flex: 1; padding: 0.75rem; background: #3e3e42; border: 1px solid #555; color: #fff; border-radius: 4px;">
                                        </div>
                                        <small style="color: #999; font-size: 0.85rem; display: block; margin-top: 0.5rem;">Ex: 123 → <span id="prefixExampleEdit">MG</span>123/2025</small>
                                    </div>
                                    <div>
                                        <label style="display: block; color: #cccccc; margin-bottom: 0.5rem; font-size: 0.9rem;">N° Order</label>
                                        <input type="text" id="manualBonCommande" placeholder="Ex: BC001" 
                                               style="width: 100%; padding: 0.75rem; background: #3e3e42; border: 1px solid #555; color: #fff; border-radius: 4px;">
                                    </div>
                                    <div>
                                        <label style="display: block; color: #cccccc; margin-bottom: 0.5rem; font-size: 0.9rem;">Date de livraison *</label>
                                        <input type="date" id="manualBonDate" 
                                               style="width: 100%; padding: 0.75rem; background: #3e3e42; border: 1px solid #555; color: #fff; border-radius: 4px;">
                                    </div>
                                </div>
                                
                                <!-- Products Table -->
                                <div style="margin-bottom: 1rem;">
                                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
                                        <label style="color: #cccccc; font-size: 0.9rem; font-weight: 600;">📦 Produits</label>
                                        <button type="button" onclick="addManualProductRow()" 
                                                style="padding: 0.5rem 1rem; background: #4CAF50; color: #fff; border: none; border-radius: 4px; cursor: pointer; font-size: 0.85rem;">
                                            + Ajouter produit
                                        </button>
                                    </div>
                                    <div style="background: #1e1e1e; border-radius: 6px; overflow: hidden; border: 1px solid #3e3e42;">
                                        <table id="manualProductsTable" style="width: 100%; border-collapse: collapse;">
                                            <thead>
                                                <tr style="background: #3e3e42;">
                                                    <th style="padding: 0.75rem; text-align: left; color: #cccccc; font-size: 0.85rem; width: 40%;">Désignation</th>
                                                    <th style="padding: 0.75rem; text-align: left; color: #cccccc; font-size: 0.85rem; width: 15%;">Quantité</th>
                                                    <th style="padding: 0.75rem; text-align: left; color: #cccccc; font-size: 0.85rem; width: 20%;">Prix Unit. HT</th>
                                                    <th style="padding: 0.75rem; text-align: right; color: #cccccc; font-size: 0.85rem; width: 20%;">Total HT</th>
                                                    <th style="padding: 0.75rem; text-align: center; color: #cccccc; font-size: 0.85rem; width: 5%;"></th>
                                                </tr>
                                            </thead>
                                            <tbody id="manualProductsTableBody">
                                                <!-- Products will be added here -->
                                            </tbody>
                                        </table>
                                    </div>
                                    <div style="margin-top: 0.75rem; padding: 0.75rem; background: #3e3e42; border-radius: 4px; display: flex; justify-content: space-between; align-items: center;">
                                        <span style="color: #cccccc; font-weight: 600;">Total HT:</span>
                                        <span id="manualBonTotalDisplay" style="color: #4CAF50; font-weight: 700; font-size: 1.1rem;">0.00 DH</span>
                                    </div>
                                </div>
                                
                                <div style="display: flex; gap: 0.5rem; justify-content: flex-end;">
                                    <button type="button" onclick="hideAddManualBonForm()" 
                                            style="padding: 0.75rem 1.5rem; background: #fff; color: #333; border: 2px solid #ddd; border-radius: 6px; cursor: pointer; font-weight: 600; transition: all 0.3s;"
                                            onmouseover="this.style.background='#f5f5f5';this.style.borderColor='#bbb';"
                                            onmouseout="this.style.background='#fff';this.style.borderColor='#ddd';">
                                        Annuler
                                    </button>
                                    <button type="button" onclick="addManualBonToList()" 
                                            style="padding: 0.75rem 1.5rem; background: #667eea; color: #fff; border: none; border-radius: 6px; cursor: pointer; font-weight: 600;">
                                        ✅ Ajouter
                                    </button>
                                </div>
                            </div>
                            
                            <div id="currentBonsContainer">
                                <div style="background: #1e1e1e; border-radius: 8px; overflow: hidden; border: 1px solid #3e3e42;">
                                    <table style="width: 100%; border-collapse: collapse;">
                                        <thead>
                                            <tr style="background: #2d2d30;">
                                                <th style="width: 60px; padding: 1rem; text-align: center; border-bottom: 2px solid #667eea;">
                                                    <input type="checkbox" id="selectAllCurrentBons" onchange="toggleAllCurrentBonsEdit(this)" 
                                                           style="width: 20px; height: 20px; cursor: pointer; accent-color: #667eea;">
                                                </th>
                                                <th style="padding: 1rem; text-align: left; color: #667eea; font-weight: 600; border-bottom: 2px solid #667eea;">N° Bon de livraison</th>
                                                <th style="padding: 1rem; text-align: left; color: #667eea; font-weight: 600; border-bottom: 2px solid #667eea;">N° Order</th>
                                                <th style="padding: 1rem; text-align: left; color: #667eea; font-weight: 600; border-bottom: 2px solid #667eea;">Date de livraison</th>
                                                <th style="padding: 1rem; text-align: right; color: #667eea; font-weight: 600; border-bottom: 2px solid #667eea;">Total TTC</th>
                                            </tr>
                                        </thead>
                                        <tbody id="currentBonsTableBody">
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Section 4: Add More Bons -->
                    <div class="invoice-section">
                        <div class="section-header" style="background: linear-gradient(135deg, #4caf50 0%, #45a049 100%); padding: 1.25rem; border-radius: 8px 8px 0 0; display: flex; justify-content: space-between; align-items: center;">
                            <h2 style="color: #fff; margin: 0; font-size: 1.1rem; display: flex; align-items: center; gap: 0.5rem;">
                                <span style="font-size: 1.5rem;">➕</span>
                                Ajouter d'autres Bons de Livraison
                            </h2>
                            <button type="button" onclick="loadAvailableBonsEdit()" id="loadMoreBonsBtn"
                                    style="padding: 0.75rem 1.5rem; background: #fff; color: #4caf50; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 0.95rem; display: flex; align-items: center; gap: 0.5rem; transition: all 0.3s; box-shadow: 0 2px 4px rgba(0,0,0,0.2);"
                                    onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 8px rgba(0,0,0,0.3)'"
                                    onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 4px rgba(0,0,0,0.2)'">
                                <span style="font-size: 1.1rem;">🔍</span>
                                Charger les Bons Disponibles
                            </button>
                        </div>
                        <div class="section-body" style="padding: 1.5rem;">
                            <div id="availableBonsContainer" style="display: none;">
                                <div style="margin-bottom: 1.5rem; padding: 1rem; background: #2d2d30; border-left: 4px solid #4caf50; border-radius: 4px;">
                                    <p style="color: #e0e0e0; font-size: 0.95rem; margin: 0;">
                                        <strong>💡 Info:</strong> Sélectionnez les bons de livraison supplémentaires à inclure dans cette facture globale.
                                    </p>
                                </div>
                                <div style="background: #1e1e1e; border-radius: 8px; overflow: hidden; border: 1px solid #3e3e42;">
                                    <table id="availableBonsTable" style="width: 100%; border-collapse: collapse;">
                                        <thead>
                                            <tr style="background: #2d2d30;">
                                                <th style="width: 60px; padding: 1rem; text-align: center; border-bottom: 2px solid #4caf50;">
                                                    <input type="checkbox" id="selectAllAvailableBons" onchange="toggleAllAvailableBonsEdit(this)" 
                                                           style="width: 20px; height: 20px; cursor: pointer; accent-color: #4caf50;">
                                                </th>
                                                <th style="padding: 1rem; text-align: left; color: #4caf50; font-weight: 600; border-bottom: 2px solid #4caf50;">N° Bon de livraison</th>
                                                <th style="padding: 1rem; text-align: left; color: #4caf50; font-weight: 600; border-bottom: 2px solid #4caf50;">N° Order</th>
                                                <th style="padding: 1rem; text-align: left; color: #4caf50; font-weight: 600; border-bottom: 2px solid #4caf50;">Date de livraison</th>
                                                <th style="padding: 1rem; text-align: right; color: #4caf50; font-weight: 600; border-bottom: 2px solid #4caf50;">Total TTC</th>
                                            </tr>
                                        </thead>
                                        <tbody id="availableBonsTableBody">
                                        </tbody>
                                    </table>
                                </div>
                                <div id="emptyAvailableBonsMessage" style="display: none; text-align: center; padding: 3rem; background: #2d2d30; border-radius: 8px; margin-top: 1rem;">
                                    <div style="font-size: 3rem; margin-bottom: 1rem;">📦</div>
                                    <p style="color: #999; font-size: 1rem; margin: 0;">Aucun bon de livraison disponible pour ce client.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Section 5: Totals -->
                    <div class="invoice-section">
                        <div class="section-header">
                            <h2>💰 Totaux</h2>
                        </div>
                        <div class="section-body">
                            <div class="totals-container" style="max-width: 400px; margin-left: auto; background: #2d2d30; padding: 1.5rem; border-radius: 8px;">
                                <div style="display: flex; justify-content: space-between; padding: 0.75rem 0; border-bottom: 1px solid #3e3e42;">
                                    <span style="color: #cccccc;">Total HT:</span>
                                    <span id="totalHTEditGlobal" style="color: #fff; font-weight: 600;">0,00 DH</span>
                                </div>
                                <div style="display: flex; justify-content: space-between; padding: 0.75rem 0; border-bottom: 1px solid #3e3e42; align-items: center;">
                                    <span style="color: #cccccc;">TVA:</span>
                                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                                        <input type="number" id="tvaRateEditGlobal" value="20" min="0" max="100" 
                                               style="width: 70px; padding: 0.5rem; background: #3e3e42; border: 1px solid #555; color: #fff; border-radius: 4px; text-align: center;"
                                               onchange="calculateTotalsEdit()">
                                        <span style="color: #cccccc;">%</span>
                                    </div>
                                </div>
                                <div style="display: flex; justify-content: space-between; padding: 0.75rem 0; border-bottom: 1px solid #3e3e42;">
                                    <span style="color: #cccccc;">Montant TVA:</span>
                                    <span id="montantTVAEditGlobal" style="color: #fff; font-weight: 600;">0,00 DH</span>
                                </div>
                                <div style="display: flex; justify-content: space-between; padding: 1rem 0; margin-top: 0.5rem;">
                                    <span style="color: #fff; font-weight: 700; font-size: 1.1rem;">Total TTC:</span>
                                    <span id="totalTTCEditGlobal" style="color: #4caf50; font-weight: 700; font-size: 1.2rem;">0,00 DH</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Submit Button -->
                    <div class="form-actions">
                        <button type="button" class="btn-secondary" onclick="router.navigate('/invoices-list-chaimae')">
                            Annuler
                        </button>
                        <button type="submit" class="btn-primary">
                            💾 Enregistrer les Modifications
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `;
}

// Global variables
let currentInvoiceEdit = null;
let currentBonsEdit = [];
let availableBonsEdit = [];
let selectedClientIdEdit = null;

// Initialize page
window.initEditGlobalInvoiceChaimaePage = async function() {
    console.log('🔄 Initializing edit global invoice page for Chaimae...');
    
    // Get invoice ID from sessionStorage
    const invoiceId = sessionStorage.getItem('editGlobalInvoiceId');
    
    if (!invoiceId) {
        window.notify.error('Erreur', 'ID de facture introuvable', 3000);
        router.navigate('/invoices-list-chaimae');
        return;
    }
    
    try {
        // Load invoice data
        console.log('🔄 [EDIT PAGE] Loading invoice ID:', invoiceId);
        const result = await window.electron.dbChaimae.getGlobalInvoiceById(parseInt(invoiceId));
        
        console.log('📦 [EDIT PAGE - API RESPONSE]:', JSON.stringify(result, null, 2));
        
        if (!result.success || !result.data) {
            window.notify.error('Erreur', 'Facture introuvable', 3000);
            router.navigate('/invoices-list-chaimae');
            return;
        }
        
        currentInvoiceEdit = result.data;
        selectedClientIdEdit = currentInvoiceEdit.client_id;
        currentBonsEdit = currentInvoiceEdit.bons || [];
        
        console.log('📋 [EDIT PAGE - LOADED DATA]:', {
            invoice_id: currentInvoiceEdit.id,
            numero: currentInvoiceEdit.document_numero,
            client: currentInvoiceEdit.client_nom,
            bon_count: currentInvoiceEdit.bon_count,
            bons_array_length: currentBonsEdit.length,
            has_bons: !!currentInvoiceEdit.bons
        });
        
        if (currentBonsEdit.length > 0) {
            console.log('📦 [EDIT PAGE - CURRENT BONS]:');
            currentBonsEdit.forEach((bon, index) => {
                console.log(`  ${index + 1}. ID: ${bon.id}, Numero: ${bon.document_numero_bl || bon.document_numero}, Total HT: ${bon.total_ht}, isManual: ${bon.isManual || false}`);
            });
        } else {
            console.warn('⚠️ [EDIT PAGE] No bons found in currentBonsEdit array!');
        }
        
        // Populate form fields
        document.getElementById('clientNomEditGlobal').value = currentInvoiceEdit.client_nom;
        document.getElementById('clientICEEditGlobal').value = currentInvoiceEdit.client_ice;
        document.getElementById('documentNumeroEditGlobal').value = currentInvoiceEdit.document_numero;
        document.getElementById('documentDateEditGlobal').value = currentInvoiceEdit.document_date;
        document.getElementById('tvaRateEditGlobal').value = currentInvoiceEdit.tva_rate;
        
        // Display current bons
        displayCurrentBonsEdit();
        
        // Calculate totals
        calculateTotalsEdit();
        
        // Handle form submission
        const form = document.getElementById('editGlobalInvoiceForm');
        form.addEventListener('submit', handleFormSubmitEdit);
        
    } catch (error) {
        console.error('Error loading invoice:', error);
        window.notify.error('Erreur', 'Erreur lors du chargement de la facture', 3000);
        router.navigate('/invoices-list-chaimae');
    }
}

// Display current bons
function displayCurrentBonsEdit() {
    const tbody = document.getElementById('currentBonsTableBody');
    
    if (currentBonsEdit.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 2rem; color: #999;">Aucun bon de livraison</td></tr>';
        return;
    }
    
    tbody.innerHTML = currentBonsEdit.map((bon, index) => {
        const bonNumero = bon.document_numero_bl || bon.document_numero || '-';
        const bonCommande = bon.document_numero_commande || '-';
        const bonDate = new Date(bon.document_date).toLocaleDateString('fr-FR');
        const bonTotal = formatNumberEdit(bon.total_ttc || 0);
        
        const bgColor = index % 2 === 0 ? '#252526' : '#2d2d30';
        
        return `
            <tr style="background: ${bgColor}; transition: all 0.2s;" 
                onmouseover="this.style.background='#3e3e42'" 
                onmouseout="this.style.background='${bgColor}'">
                <td style="text-align: center; padding: 1rem; border-bottom: 1px solid #3e3e42;">
                    <input type="checkbox" class="current-bon-checkbox" data-bon-id="${bon.id}" 
                           checked onchange="calculateTotalsEdit()" 
                           style="width: 20px; height: 20px; cursor: pointer; accent-color: #667eea;">
                </td>
                <td style="padding: 1rem; border-bottom: 1px solid #3e3e42;">
                    <strong style="color: #667eea; font-size: 0.95rem;">${bonNumero}</strong>
                </td>
                <td style="padding: 1rem; color: #cccccc; border-bottom: 1px solid #3e3e42;">${bonCommande}</td>
                <td style="padding: 1rem; color: #cccccc; border-bottom: 1px solid #3e3e42;">${bonDate}</td>
                <td style="padding: 1rem; text-align: right; border-bottom: 1px solid #3e3e42;">
                    <strong style="color: #4caf50; font-size: 1rem;">${bonTotal} DH</strong>
                </td>
            </tr>
        `;
    }).join('');
}

// Load available bons for client
window.loadAvailableBonsEdit = async function() {
    if (!selectedClientIdEdit) {
        window.notify.error('Erreur', 'Client introuvable', 3000);
        return;
    }
    
    try {
        const result = await window.electron.dbChaimae.getBonsByClient(selectedClientIdEdit);
        
        if (result.success) {
            // Filter out bons that are already in the current invoice
            const currentBonIds = currentBonsEdit.map(b => b.id);
            availableBonsEdit = result.data.filter(bon => !currentBonIds.includes(bon.id));
            
            if (availableBonsEdit.length === 0) {
                document.getElementById('availableBonsContainer').style.display = 'block';
                document.getElementById('availableBonsTable').style.display = 'none';
                document.getElementById('emptyAvailableBonsMessage').style.display = 'block';
                return;
            }
            
            document.getElementById('availableBonsTable').style.display = 'table';
            document.getElementById('emptyAvailableBonsMessage').style.display = 'none';
            document.getElementById('availableBonsContainer').style.display = 'block';
            
            const tbody = document.getElementById('availableBonsTableBody');
            tbody.innerHTML = availableBonsEdit.map((bon, index) => {
                const bonNumero = bon.document_numero_bl || bon.document_numero || '-';
                const bonCommande = bon.document_numero_commande || '-';
                const bonDate = new Date(bon.document_date).toLocaleDateString('fr-FR');
                const bonTotal = formatNumberEdit(bon.total_ttc || 0);
                
                const bgColor = index % 2 === 0 ? '#252526' : '#2d2d30';
                
                return `
                    <tr style="background: ${bgColor}; transition: all 0.2s;" 
                        onmouseover="this.style.background='#3e3e42'" 
                        onmouseout="this.style.background='${bgColor}'">
                        <td style="text-align: center; padding: 1rem; border-bottom: 1px solid #3e3e42;">
                            <input type="checkbox" class="available-bon-checkbox" data-bon-id="${bon.id}" 
                                   onchange="calculateTotalsEdit()" 
                                   style="width: 20px; height: 20px; cursor: pointer; accent-color: #4caf50;">
                        </td>
                        <td style="padding: 1rem; border-bottom: 1px solid #3e3e42;">
                            <strong style="color: #4caf50; font-size: 0.95rem;">${bonNumero}</strong>
                        </td>
                        <td style="padding: 1rem; color: #cccccc; border-bottom: 1px solid #3e3e42;">${bonCommande}</td>
                        <td style="padding: 1rem; color: #cccccc; border-bottom: 1px solid #3e3e42;">${bonDate}</td>
                        <td style="padding: 1rem; text-align: right; border-bottom: 1px solid #3e3e42;">
                            <strong style="color: #4caf50; font-size: 1rem;">${bonTotal} DH</strong>
                        </td>
                    </tr>
                `;
            }).join('');
        }
    } catch (error) {
        console.error('Error loading available bons:', error);
        window.notify.error('Erreur', 'Erreur lors du chargement des bons disponibles', 3000);
    }
}

// Toggle all current bons
window.toggleAllCurrentBonsEdit = function(checkbox) {
    const checkboxes = document.querySelectorAll('.current-bon-checkbox');
    checkboxes.forEach(cb => cb.checked = checkbox.checked);
    calculateTotalsEdit();
}

// Toggle all available bons
window.toggleAllAvailableBonsEdit = function(checkbox) {
    const checkboxes = document.querySelectorAll('.available-bon-checkbox');
    checkboxes.forEach(cb => cb.checked = checkbox.checked);
    calculateTotalsEdit();
}

// Calculate totals
window.calculateTotalsEdit = function() {
    // Get selected current bons
    const selectedCurrentCheckboxes = document.querySelectorAll('.current-bon-checkbox:checked');
    const selectedCurrentBonIds = Array.from(selectedCurrentCheckboxes).map(cb => parseInt(cb.dataset.bonId));
    
    // Get selected available bons
    const selectedAvailableCheckboxes = document.querySelectorAll('.available-bon-checkbox:checked');
    const selectedAvailableBonIds = Array.from(selectedAvailableCheckboxes).map(cb => parseInt(cb.dataset.bonId));
    
    let totalHT = 0;
    
    // Add current bons
    selectedCurrentBonIds.forEach(bonId => {
        const bon = currentBonsEdit.find(b => b.id === bonId);
        if (bon) {
            totalHT += bon.total_ht || 0;
        }
    });
    
    // Add available bons
    selectedAvailableBonIds.forEach(bonId => {
        const bon = availableBonsEdit.find(b => b.id === bonId);
        if (bon) {
            totalHT += bon.total_ht || 0;
        }
    });
    
    const tvaRate = parseFloat(document.getElementById('tvaRateEditGlobal').value) || 0;
    const montantTVA = totalHT * (tvaRate / 100);
    const totalTTC = totalHT + montantTVA;
    
    document.getElementById('totalHTEditGlobal').textContent = formatNumberEdit(totalHT) + ' DH';
    document.getElementById('montantTVAEditGlobal').textContent = formatNumberEdit(montantTVA) + ' DH';
    document.getElementById('totalTTCEditGlobal').textContent = formatNumberEdit(totalTTC) + ' DH';
}

// Format number
function formatNumberEdit(number) {
    return new Intl.NumberFormat('fr-FR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(number);
}

// Use global prefixes (shared with create page)
if (!window.bonLivraisonPrefixes) {
    window.bonLivraisonPrefixes = ['MG', 'TL', 'BL'];
    window.selectedPrefix = 'MG';
    window.prefixesLoaded = false;
}

// Toggle prefix dropdown for Edit page (Global)
window.togglePrefixDropdownEdit = async function() {
    const dropdown = document.getElementById('prefixDropdownEdit');
    if (!dropdown) return;
    
    if (dropdown.style.display === 'none') {
        // Load prefixes from database first
        if (!window.prefixesLoaded) {
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
        renderPrefixListEdit();
        dropdown.style.display = 'block';
    } else {
        dropdown.style.display = 'none';
    }
}

// Render prefix list for Edit page (Global)
window.renderPrefixListEdit = function() {
    const listContainer = document.getElementById('prefixListEdit');
    if (!listContainer) return;
    
    listContainer.innerHTML = window.bonLivraisonPrefixes.map((prefix, index) => `
        <div onclick="selectPrefixEdit('${prefix}')" 
             style="margin: 0.35rem; padding: 0.75rem 1rem; cursor: pointer; border-radius: 8px; transition: all 0.3s; color: #fff; display: flex; justify-content: space-between; align-items: center; background: ${prefix === window.selectedPrefix ? 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)' : 'rgba(255,255,255,0.05)'}; border: 2px solid ${prefix === window.selectedPrefix ? '#667eea' : 'transparent'}; box-shadow: ${prefix === window.selectedPrefix ? '0 2px 8px rgba(102, 126, 234, 0.3)' : 'none'};"
             onmouseover="if('${prefix}' !== window.selectedPrefix) { this.style.background='rgba(102, 126, 234, 0.2)'; this.style.borderColor='#667eea'; this.style.transform='translateX(5px)'; }" 
             onmouseout="if('${prefix}' !== window.selectedPrefix) { this.style.background='rgba(255,255,255,0.05)'; this.style.borderColor='transparent'; this.style.transform='translateX(0)'; }">
            <div style="display: flex; align-items: center; gap: 0.75rem;">
                <span style="font-size: 1.2rem;">${prefix === window.selectedPrefix ? '✓' : '📌'}</span>
                <span style="font-weight: ${prefix === window.selectedPrefix ? '700' : '500'}; font-size: 1rem; letter-spacing: 1px;">${prefix}</span>
            </div>
            ${window.bonLivraisonPrefixes.length > 1 ? `
                <button onclick="event.stopPropagation(); deletePrefixEdit('${prefix}')" 
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

// Select prefix for Edit page (Global)
window.selectPrefixEdit = function(prefix) {
    window.selectedPrefix = prefix;
    const prefixInput = document.getElementById('prefixInputEdit');
    const prefixExample = document.getElementById('prefixExampleEdit');
    
    if (prefixInput) prefixInput.value = prefix;
    if (prefixExample) prefixExample.textContent = prefix;
    
    const dropdown = document.getElementById('prefixDropdownEdit');
    if (dropdown) dropdown.style.display = 'none';
    
    renderPrefixListEdit();
}

// Add new prefix for Edit page (Global)
window.addNewPrefixEdit = async function() {
    const newPrefixInput = document.getElementById('newPrefixInputEdit');
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
        
        renderPrefixListEdit();
        window.notify.success('Succès', `Prefix "${newPrefix}" ajouté`, 2000);
    } else {
        window.notify.error('Erreur', result.error || 'Impossible d\'ajouter le prefix', 3000);
    }
}

// Delete prefix for Edit page (Global)
window.deletePrefixEdit = async function(prefix) {
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
                const prefixInput = document.getElementById('prefixInputEdit');
                const prefixExample = document.getElementById('prefixExampleEdit');
                if (prefixInput) prefixInput.value = window.selectedPrefix;
                if (prefixExample) prefixExample.textContent = window.selectedPrefix;
            }
            
            renderPrefixListEdit();
            window.notify.success('Succès', `Prefix "${prefix}" supprimé`, 2000);
        }
    } else {
        window.notify.error('Erreur', result.error || 'Impossible de supprimer le prefix', 3000);
    }
}

// Format Bon numero with selected prefix for Edit page (Global)
window.formatBonNumeroWithPrefixEdit = function(input) {
    let value = input.value.trim();
    
    // 🔍 DEBUG: Log input value
    console.log('🔴 [EDIT FORMAT BON NUMERO] Input value:', value);
    
    // إذا كان الحقل فارغاً، لا تفعل شيئاً
    if (!value) {
        console.log('⚠️ [EDIT FORMAT BON NUMERO] Empty value, returning');
        return;
    }
    
    // إذا كان يحتوي بالفعل على سلاش، لا تفعل شيئاً
    if (value.includes('/')) {
        console.log('⚠️ [EDIT FORMAT BON NUMERO] Already has slash, returning:', value);
        return;
    }
    
    // استخراج الأرقام فقط
    let numbers = value.replace(/[^0-9]/g, '');
    
    console.log('🔴 [EDIT FORMAT BON NUMERO] Extracted numbers:', numbers);
    
    // إذا كان هناك أرقام، أضف السنة
    if (numbers) {
        const year = new Date().getFullYear();
        const formatted = `${numbers}/${year}`;
        input.value = formatted;
        console.log('✅ [EDIT FORMAT BON NUMERO] Formatted value:', formatted);
    }
}

// Show manual bon form
window.showAddManualBonForm = function() {
    document.getElementById('manualBonForm').style.display = 'block';
    // Set today's date as default
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('manualBonDate').value = today;
}

// Hide manual bon form
window.hideAddManualBonForm = function() {
    document.getElementById('manualBonForm').style.display = 'none';
    // Clear form
    document.getElementById('manualBonNumero').value = '';
    document.getElementById('manualBonCommande').value = '';
    document.getElementById('manualBonDate').value = '';
    document.getElementById('manualProductsTableBody').innerHTML = '';
    document.getElementById('manualBonTotalDisplay').textContent = '0.00 DH';
}

// Add product row to manual form
window.addManualProductRow = function() {
    const tbody = document.getElementById('manualProductsTableBody');
    const row = document.createElement('tr');
    row.style.borderBottom = '1px solid #3e3e42';
    
    row.innerHTML = `
        <td style="padding: 0.75rem;">
            <textarea class="manual-product-designation" placeholder="Désignation du produit" rows="2"
                   style="width: 100%; padding: 0.5rem; background: #3e3e42; border: 1px solid #555; color: #fff; border-radius: 4px; font-size: 0.85rem; resize: vertical; font-family: inherit;"></textarea>
        </td>
        <td style="padding: 0.75rem;">
            <input type="text" class="manual-product-quantity" placeholder="0"
                   oninput="calculateManualProductTotal(this)"
                   style="width: 100%; padding: 0.5rem; background: #3e3e42; border: 1px solid #555; color: #fff; border-radius: 4px; font-size: 0.85rem;">
        </td>
        <td style="padding: 0.75rem;">
            <input type="number" class="manual-product-price" placeholder="0.00" step="0.01" min="0"
                   oninput="calculateManualProductTotal(this)"
                   style="width: 100%; padding: 0.5rem; background: #3e3e42; border: 1px solid #555; color: #fff; border-radius: 4px; font-size: 0.85rem;">
        </td>
        <td style="padding: 0.75rem; text-align: right;">
            <span class="manual-product-total" style="color: #4CAF50; font-weight: 600;">0.00 DH</span>
        </td>
        <td style="padding: 0.75rem; text-align: center;">
            <button type="button" onclick="removeManualProductRow(this)" 
                    style="background: #f44336; color: #fff; border: none; border-radius: 4px; padding: 0.25rem 0.5rem; cursor: pointer; font-size: 0.85rem; display: flex; align-items: center; justify-content: center;">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                </svg>
            </button>
        </td>
    `;
    
    tbody.appendChild(row);
}

// Remove product row
window.removeManualProductRow = function(btn) {
    btn.closest('tr').remove();
    calculateManualBonTotal();
}

// Calculate product total
window.calculateManualProductTotal = function(input) {
    const row = input.closest('tr');
    const quantityValue = row.querySelector('.manual-product-quantity').value.trim();
    const quantityUpper = quantityValue.toUpperCase();
    const quantity = (quantityUpper === 'F') ? 1 : (parseFloat(quantityValue) || 0);
    const price = parseFloat(row.querySelector('.manual-product-price').value) || 0;
    const total = quantity * price;
    
    row.querySelector('.manual-product-total').textContent = total.toFixed(2) + ' DH';
    calculateManualBonTotal();
}

// Calculate total for manual bon
window.calculateManualBonTotal = function() {
    const rows = document.querySelectorAll('#manualProductsTableBody tr');
    let total = 0;
    
    rows.forEach(row => {
        const quantityValue = row.querySelector('.manual-product-quantity').value.trim();
        const quantityUpper = quantityValue.toUpperCase();
        const quantity = (quantityUpper === 'F') ? 1 : (parseFloat(quantityValue) || 0);
        const price = parseFloat(row.querySelector('.manual-product-price').value) || 0;
        total += quantity * price;
    });
    
    document.getElementById('manualBonTotalDisplay').textContent = total.toFixed(2) + ' DH';
    return total;
}

// Add manual bon to list
window.addManualBonToList = async function() {
    console.log('✍️ [MANUAL BL] Starting addManualBonToList function...');
    
    // Get selected prefix and combine with numero
    const selectedPrefix = window.selectedPrefix || 'MG';
    const numeroValue = document.getElementById('manualBonNumero').value.trim();
    const fullNumero = selectedPrefix + numeroValue;
    const commande = document.getElementById('manualBonCommande').value.trim();
    const date = document.getElementById('manualBonDate').value;
    
    // Get products
    const productRows = document.querySelectorAll('#manualProductsTableBody tr');
    const products = [];
    productRows.forEach(row => {
        const designation = row.querySelector('.manual-product-designation').value.trim();
        const quantite = row.querySelector('.manual-product-quantity').value.trim();
        const prix_unitaire_ht = parseFloat(row.querySelector('.manual-product-price').value) || 0;
        
        if (designation) {
            // For calculation: convert 'F' or 'f' to 1, otherwise parse as number
            const quantiteUpper = quantite.toUpperCase();
            const qtyForCalculation = (quantiteUpper === 'F') ? 1 : (parseFloat(quantite) || 0);
            
            products.push({
                designation,
                quantite: quantite || '0', // Keep original value for saving
                prix_unitaire_ht,
                total_ht: qtyForCalculation * prix_unitaire_ht
            });
        }
    });
    
    const total = calculateManualBonTotal();
    
    console.log('📝 [MANUAL BL - INPUT DATA]:', {
        fullNumero,
        commande,
        date,
        total
    });
    
    // Validation
    if (!fullNumero) {
        console.error('❌ [MANUAL BL] Validation failed: No numero');
        window.notify.error('Erreur', 'Le numéro de BL est requis', 3000);
        return;
    }
    
    // Check format PREFIX+XXX/YYYY (accept any prefix and any number of digits)
    const prefixPattern = new RegExp(`^[A-Z]+\\d+\\/\\d{4}$`);
    if (!fullNumero.match(prefixPattern)) {
        console.error('❌ [MANUAL BL] Validation failed: Invalid format', fullNumero);
        window.notify.error('Erreur', `Format invalide. Entrez des chiffres (ex: 2 → ${selectedPrefix}2/2025)`, 3000);
        return;
    }
    
    if (!date) {
        console.error('❌ [MANUAL BL] Validation failed: No date');
        window.notify.error('Erreur', 'La date est requise', 3000);
        return;
    }
    
    if (isNaN(total) || total < 0) {
        console.error('❌ [MANUAL BL] Validation failed: Invalid total', total);
        window.notify.error('Erreur', 'Le montant doit être un nombre valide', 3000);
        return;
    }
    
    console.log('✅ [MANUAL BL] All validations passed');
    
    // Check if numero already exists in database
    try {
        console.log('🔍 [MANUAL BL] Checking if numero exists in database...');
        const checkResult = await window.electron.dbChaimae.checkBonNumeroExists(fullNumero);
        console.log('📦 [MANUAL BL] Database check result:', checkResult);
        
        if (checkResult && checkResult.exists) {
            console.error('❌ [MANUAL BL] Numero already exists in database');
            window.notify.error('Erreur', `Le numéro ${fullNumero} existe déjà dans la base de données`, 4000);
            return;
        }
    } catch (error) {
        console.error('❌ [MANUAL BL] Error checking bon numero:', error);
        // Continue anyway if check fails
    }
    
    // Check if Order already exists in database (if provided)
    if (commande) {
        try {
            console.log('🔍 [MANUAL BL] Checking if Order exists in database...');
            const allInvoicesResult = await window.electron.dbChaimae.getAllInvoices();
            
            if (allInvoicesResult.success) {
                const duplicate = allInvoicesResult.data.find(inv => 
                    inv.document_numero_commande === commande && 
                    inv.document_type === 'bon_livraison'
                );
                
                if (duplicate) {
                    console.error('❌ [MANUAL BL] N° Order already exists');
                    window.notify.error('Erreur', `Le N° Order "${commande}" existe déjà dans la base de données`, 4000);
                    return;
                }
            }
        } catch (error) {
            console.error('❌ [MANUAL BL] Error checking Order:', error);
            // Continue anyway if check fails
        }
    }
    
    // Check if numero already exists in current list
    console.log('🔍 [MANUAL BL] Checking if numero exists in current list...');
    console.log('📋 [MANUAL BL] Current bons count:', currentBonsEdit.length);
    
    const existsInList = currentBonsEdit.some(bon => 
        (bon.document_numero_bl === fullNumero || bon.document_numero === fullNumero)
    );
    
    if (existsInList) {
        console.error('❌ [MANUAL BL] Numero already exists in current list');
        window.notify.error('Erreur', `Le numéro ${fullNumero} est déjà dans la liste`, 3000);
        return;
    }
    
    console.log('✅ [MANUAL BL] Numero is unique, creating manual bon...');
    
    // Create manual bon object with negative ID to distinguish from DB bons
    const manualBon = {
        id: -Date.now(), // Negative ID for manual entries
        document_numero_bl: fullNumero,
        document_numero: fullNumero,
        document_numero_commande: commande || '-',
        document_date: date,
        total_ht: total, // Calculated from products
        total_ttc: total * 1.2, // Calculate TTC for database
        isManual: true,
        products: products // Store products for later saving
    };
    
    console.log('📦 [MANUAL BL] Created manual bon object:', manualBon);
    
    // Add to current bons
    currentBonsEdit.push(manualBon);
    console.log('✅ [MANUAL BL] Added to currentBonsEdit. New count:', currentBonsEdit.length);
    
    // Refresh display
    console.log('🔄 [MANUAL BL] Refreshing display...');
    displayCurrentBonsEdit();
    
    console.log('💰 [MANUAL BL] Calculating totals...');
    calculateTotalsEdit();
    
    // Hide form and show success message
    console.log('✅ [MANUAL BL] Hiding form and showing success message');
    hideAddManualBonForm();
    window.notify.success('Succès', `BL ${fullNumero} ajouté avec succès`, 3000);
    
    console.log('🎉 [MANUAL BL] Manual BL added successfully!');
}

// Handle form submission
async function handleFormSubmitEdit(e) {
    e.preventDefault();
    
    try {
        console.log('💾 [SAVE] Starting form submission...');
        
        // First, save manual bons to database
        const manualBons = currentBonsEdit.filter(bon => bon.isManual && bon.id < 0);
        console.log('📝 [SAVE] Manual bons to save:', manualBons.length);
        
        const manualBonIds = [];
        for (const manualBon of manualBons) {
            console.log('💾 [SAVE] Saving manual bon:', manualBon.document_numero_bl);
            
            const bonData = {
                client: {
                    nom: currentInvoiceEdit.client_nom,
                    ICE: currentInvoiceEdit.client_ice
                },
                document: {
                    type: 'bon_livraison',
                    date: manualBon.document_date,
                    numero: manualBon.document_numero_bl, // For bon_livraison, this goes to document_numero
                    numero_BL: manualBon.document_numero_bl, // This should go to document_numero_bl
                    numero_devis: null,
                    numero_Order: null,
                    bon_de_livraison: null,
                    numero_commande: manualBon.document_numero_commande === '-' ? null : manualBon.document_numero_commande
                },
                products: manualBon.products || [],
                totals: {
                    total_ht: manualBon.total_ht,
                    tva_rate: 20,
                    montant_tva: manualBon.total_ht * 0.2,
                    total_ttc: manualBon.total_ttc
                }
            };
            
            console.log('📤 [SAVE] Bon data to save:', bonData);
            
            try {
                const result = await window.electron.dbChaimae.createInvoice(bonData);
                if (result.success) {
                    console.log('✅ [SAVE] Manual bon saved with ID:', result.data.id);
                    manualBonIds.push(result.data.id);
                    // Update the bon in currentBonsEdit with real ID
                    manualBon.id = result.data.id;
                    manualBon.isManual = false;
                } else {
                    console.error('❌ [SAVE] Failed to save manual bon:', result.error);
                }
            } catch (error) {
                console.error('❌ [SAVE] Error saving manual bon:', error);
            }
        }
        
        console.log('✅ [SAVE] All manual bons saved. New IDs:', manualBonIds);
        
        // Refresh display to update checkboxes with real IDs
        if (manualBonIds.length > 0) {
            console.log('🔄 [SAVE] Refreshing display to update IDs...');
            displayCurrentBonsEdit();
        }
        
        // Get all selected bon IDs (current + available)
        const selectedCurrentCheckboxes = document.querySelectorAll('.current-bon-checkbox:checked');
        const selectedCurrentBonIds = Array.from(selectedCurrentCheckboxes).map(cb => parseInt(cb.dataset.bonId));
        
        const selectedAvailableCheckboxes = document.querySelectorAll('.available-bon-checkbox:checked');
        const selectedAvailableBonIds = Array.from(selectedAvailableCheckboxes).map(cb => parseInt(cb.dataset.bonId));
        
        const allSelectedBonIds = [...selectedCurrentBonIds, ...selectedAvailableBonIds];
        
        console.log('📦 [SAVE] Selected bon IDs after refresh:', allSelectedBonIds);
        
        if (allSelectedBonIds.length === 0) {
            window.notify.error('Erreur', 'Veuillez sélectionner au moins un bon de livraison', 3000);
            return;
        }
        
        // Parse totals (remove formatting)
        const totalHTText = document.getElementById('totalHTEditGlobal').textContent.replace(/\s/g, '').replace('DH', '').replace(',', '.');
        const montantTVAText = document.getElementById('montantTVAEditGlobal').textContent.replace(/\s/g, '').replace('DH', '').replace(',', '.');
        const totalTTCText = document.getElementById('totalTTCEditGlobal').textContent.replace(/\s/g, '').replace('DH', '').replace(',', '.');
        
        const formData = {
            document_numero: document.getElementById('documentNumeroEditGlobal').value,
            document_date: document.getElementById('documentDateEditGlobal').value,
            total_ht: parseFloat(totalHTText),
            tva_rate: parseFloat(document.getElementById('tvaRateEditGlobal').value),
            montant_tva: parseFloat(montantTVAText),
            total_ttc: parseFloat(totalTTCText),
            bon_livraison_ids: allSelectedBonIds
        };
        
        console.log('📤 [EDIT SUBMIT] Updating global invoice ID:', currentInvoiceEdit.id);
        console.log('📋 [FORM DATA]:', formData);
        console.log('📦 [SELECTED BONS]:', {
            current_bons: selectedCurrentBonIds,
            available_bons: selectedAvailableBonIds,
            total_selected: allSelectedBonIds.length,
            bon_ids: allSelectedBonIds
        });
        console.log('💰 [TOTALS]:', {
            total_ht: formData.total_ht,
            tva_rate: formData.tva_rate,
            montant_tva: formData.montant_tva,
            total_ttc: formData.total_ttc
        });
        
        // Check for duplicate document number in global invoices (excluding current invoice)
        const allGlobalInvoicesResult = await window.electron.dbChaimae.getAllGlobalInvoices();
        if (allGlobalInvoicesResult.success) {
            const duplicateGlobal = allGlobalInvoicesResult.data.find(inv => 
                inv.document_numero === formData.document_numero && inv.id !== currentInvoiceEdit.id
            );
            
            if (duplicateGlobal) {
                window.notify.error('Erreur', `Le numéro "${formData.document_numero}" existe déjà dans une autre facture globale`, 5000);
                return;
            }
        }
        
        // Check for duplicate document number in regular invoices
        const allRegularInvoicesResult = await window.electron.dbChaimae.getAllInvoices();
        if (allRegularInvoicesResult.success) {
            const duplicateRegular = allRegularInvoicesResult.data.find(inv => 
                inv.document_type === 'facture' && inv.document_numero === formData.document_numero
            );
            
            if (duplicateRegular) {
                window.notify.error('Erreur', `Le numéro "${formData.document_numero}" existe déjà dans une facture normale`, 5000);
                return;
            }
        }
        
        // Update in database
        const result = await window.electron.dbChaimae.updateGlobalInvoice(currentInvoiceEdit.id, formData);
        
        if (result.success) {
            window.notify.success('Succès', 'Facture globale modifiée avec succès!', 3000);
            sessionStorage.removeItem('editGlobalInvoiceId');
            setTimeout(() => {
                router.navigate('/invoices-list-chaimae');
            }, 1500);
        } else {
            window.notify.error('Erreur', result.error || 'Erreur lors de la modification', 4000);
        }
        
    } catch (error) {
        console.error('Error updating global invoice:', error);
        window.notify.error('Erreur', 'Erreur lors de la modification de la facture globale', 4000);
    }
}
