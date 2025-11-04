// Create Invoice Page - Multi Company
function CreateInvoiceMultiPage() {
    return `
        <div class="desktop-app">
            <div class="window-header">
                <div class="window-title">
                    <img src="assets/logos/multi.png" class="header-logo" alt="Multi Company" data-asset="assets/logos/multi.png">
                    <span>Multi Company - Créer une facture</span>
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
                <!-- Last Invoice Info -->
                
                <form id="invoiceFormMulti" class="invoice-form">
                    <!-- Section 1: Client Information -->
                    <div class="invoice-section">
                        <div class="section-header">
                            <h2>📦 Informations du client</h2>
                        </div>
                        <div class="section-body">
                            <div class="form-row">
                                <div class="form-field" style="position: relative;">
                                    <label>Nom du client <span class="required">*</span></label>
                                    <input type="text" id="clientNomMulti" placeholder="Rechercher ou saisir un client" 
                                           autocomplete="off" required oninput="searchClientsMulti(this.value)" 
                                           onfocus="showClientsListMulti()" onblur="hideClientsListMulti()">
                                    <div id="clientsDropdownMulti" class="clients-dropdown" style="display: none;"></div>
                                </div>
                                <div class="form-field">
                                    <label>N° ICE <span class="required">*</span></label>
                                    <input type="text" id="clientICEMulti" placeholder="Numéro ICE" required>
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
                                    <select id="documentTypeMulti" required onchange="handleDocumentTypeChangeMulti()">
                                        <option value="">Sélectionner...</option>
                                        <option value="facture">Facture</option>
                                        <option value="devis">Devis</option>
                                    </select>
                                </div>
                                <div class="form-field">
                                    <label>Date <span class="required">*</span></label>
                                    <input type="date" id="documentDateMulti" required>
                                </div>
                            </div>

                            <!-- Dynamic Fields Container -->
                            <div id="dynamicFieldsMulti"></div>
                        </div>
                    </div>

                    <!-- Section 3: Attachments -->
                    <div class="invoice-section">
                        <div class="section-header">
                            <h2>📎 Pièces jointes</h2>
                        </div>
                        <div class="section-body">
                            <div class="file-upload-area">
                                <input type="file" id="fileInputMulti" accept=".png,.jpg,.jpeg,.pdf" multiple style="display: none;">
                                <button type="button" class="upload-btn" onclick="document.getElementById('fileInputMulti').click()">
                                    <span>📁 Choisir des fichiers (PNG, JPG, PDF)</span>
                                </button>
                                <div id="filesListMulti" class="files-list"></div>
                            </div>
                        </div>
                    </div>

                    <!-- Section 4: Products -->
                    <div class="invoice-section">
                        <div class="section-header">
                            <h2>📊 Produits et services</h2>
                            <button type="button" class="add-product-btn" onclick="addProductRowMulti()">
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
                                    <tbody id="productsTableBodyMulti">
                                        <!-- Products will be added here -->
                                    </tbody>
                                </table>
                            </div>

                            <!-- Summary -->
                            <div class="invoice-summary">
                                <div class="summary-row">
                                    <span>Total HT:</span>
                                    <span id="totalHTMulti">0.00 DH</span>
                                </div>
                                <div class="summary-row">
                                    <span>TVA:</span>
                                    <div class="tva-input">
                                        <input type="number" id="tvaRateMulti" value="20" min="0" max="100" onchange="calculateTotalsMulti()">
                                        <span>%</span>
                                    </div>
                                </div>
                                <div class="summary-row">
                                    <span>Montant TVA:</span>
                                    <span id="montantTVAMulti">0.00 DH</span>
                                </div>
                                <div class="summary-row total">
                                    <span>Total TTC:</span>
                                    <span id="totalTTCMulti">0.00 DH</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Form Actions -->
                    <div class="form-actions">
                        <button type="button" class="btn-secondary" onclick="router.navigate('/dashboard-multi')">
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

// Call initialization when page is rendered
window.initCreateInvoiceMultiPage = function() {
    console.log('🔄 [MULTI] Initializing invoice form page...');
    initializeInvoiceFormMulti();
};
