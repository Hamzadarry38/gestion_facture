// Create Global Invoice Page - Chaimae Company
function CreateGlobalInvoiceChaimaePage() {
    return `
        <div class="desktop-app">
            <div class="window-header">
                <div class="window-title">
                    <img src="assets/logos/chaimae.png" class="header-logo" alt="Chaimae Company" data-asset="assets/logos/chaimae.png">
                    <span>Chaimae Company - Créer une Facture Globale</span>
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
                <form id="globalInvoiceForm" class="invoice-form">
                    <!-- Section 1: Client Information -->
                    <div class="invoice-section">
                        <div class="section-header">
                            <h2>📦 Informations du client</h2>
                        </div>
                        <div class="section-body">
                            <div class="form-row">
                                <div class="form-field" style="position: relative;">
                                    <label>Nom du client <span class="required">*</span></label>
                                    <input type="text" id="clientNomGlobal" placeholder="Rechercher ou saisir un client" 
                                           autocomplete="off" required oninput="searchClientsGlobal(this.value)" 
                                           onfocus="showClientsListGlobal()" onblur="hideClientsListGlobal()">
                                    <div id="clientsDropdownGlobal" class="clients-dropdown" style="display: none;"></div>
                                </div>
                                <div class="form-field">
                                    <label>N° ICE <span class="required">*</span></label>
                                    <input type="text" id="clientICEGlobal" placeholder="Numéro ICE" required readonly>
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
                                    <input type="text" id="documentNumeroGlobal" placeholder="Entrez le numéro et l'année sera ajoutée automatiquement (2025)" required 
                                           oninput="autoFormatDocumentNumberGlobal(this)" maxlength="8">
                                    <small style="color: #999; font-size: 0.85rem;">Ex: 123 → 123/2025</small>
                                </div>
                                <div class="form-field">
                                    <label>Date <span class="required">*</span></label>
                                    <input type="date" id="documentDateGlobal" required>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Section 3: Select Bon de Livraison -->
                    <div class="invoice-section">
                        <div class="section-header">
                            <h2>📦 Sélectionner les Bons de Livraison</h2>
                            <button type="button" class="add-product-btn" onclick="loadBonsForClientGlobal()" id="loadBonsBtn" disabled>
                                <span>🔍 Charger les Bons de Livraison</span>
                            </button>
                        </div>
                        <div class="section-body">
                            <div id="bonsListContainer" style="display: none;">
                                <div style="margin-bottom: 1rem;">
                                    <p style="color: #999; font-size: 0.9rem;">Sélectionnez les bons de livraison à inclure dans cette facture globale:</p>
                                </div>
                                <div class="products-table-container">
                                    <table class="products-table" id="bonsTable">
                                        <thead>
                                            <tr>
                                                <th style="width: 50px;">
                                                    <input type="checkbox" id="selectAllBons" onchange="toggleAllBonsGlobal(this)" 
                                                           style="width: 18px; height: 18px; cursor: pointer;">
                                                </th>
                                                <th>Numéro de bon de livraison</th>
                                                <th>N° Order</th>
                                                <th>Date de livraison</th>
                                                <th>Total TTC</th>
                                            </tr>
                                        </thead>
                                        <tbody id="bonsTableBody">
                                        </tbody>
                                    </table>
                                </div>
                                <div id="emptyBonsMessage" style="display: none; text-align: center; padding: 2rem; color: #999;">
                                    <p>Aucun bon de livraison trouvé pour ce client.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Section 4: Totals -->
                    <div class="invoice-section">
                        <div class="section-header">
                            <h2>💰 Totaux</h2>
                        </div>
                        <div class="section-body">
                            <div class="totals-container">
                                <div class="total-row">
                                    <span class="total-label">Total HT:</span>
                                    <span class="total-value" id="totalHTGlobal">0,00 DH</span>
                                </div>
                                <div class="total-row">
                                    <span class="total-label">TVA:</span>
                                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                                        <input type="number" id="tvaRateGlobal" value="20" min="0" max="100" 
                                               style="width: 80px; padding: 0.5rem; background: #3e3e42; border: 1px solid #555; color: #fff; border-radius: 4px;"
                                               onchange="calculateTotalsGlobal()">
                                        <span style="color: #cccccc;">%</span>
                                    </div>
                                </div>
                                <div class="total-row">
                                    <span class="total-label">Montant TVA:</span>
                                    <span class="total-value" id="montantTVAGlobal">0,00 DH</span>
                                </div>
                                <div class="total-row total-final">
                                    <span class="total-label">Total TTC:</span>
                                    <span class="total-value" id="totalTTCGlobal">0,00 DH</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Submit Button -->
                    <div class="form-actions">
                        <button type="button" class="btn-secondary" onclick="router.navigate('/dashboard-chaimae')">
                            Annuler
                        </button>
                        <button type="submit" class="btn-primary">
                            Créer la Facture Globale
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `;
}

// Global variables
let allClientsGlobal = [];
let selectedClientIdGlobal = null;
let availableBonsGlobal = [];

// Load all clients for autocomplete
async function loadAllClientsGlobal() {
    try {
        const result = await window.electron.dbChaimae.getAllClients();
        if (result.success) {
            allClientsGlobal = result.data;
        }
    } catch (error) {
        console.error('Error loading clients:', error);
    }
}

// Search clients
window.searchClientsGlobal = function(query) {
    const dropdown = document.getElementById('clientsDropdownGlobal');
    
    if (!query || query.length < 2) {
        dropdown.style.display = 'none';
        return;
    }
    
    const filtered = allClientsGlobal.filter(client => 
        client.nom.toLowerCase().includes(query.toLowerCase()) ||
        client.ice.toLowerCase().includes(query.toLowerCase())
    );
    
    if (filtered.length === 0) {
        dropdown.style.display = 'none';
        return;
    }
    
    dropdown.innerHTML = filtered.map(client => `
        <div class="client-item" onmousedown="selectClientGlobal('${client.nom}', '${client.ice}', ${client.id})">
            <strong>${client.nom}</strong>
            <small>ICE: ${client.ice}</small>
        </div>
    `).join('');
    
    dropdown.style.display = 'block';
}

// Show clients list
window.showClientsListGlobal = function() {
    const query = document.getElementById('clientNomGlobal').value;
    if (query.length >= 2) {
        searchClientsGlobal(query);
    }
}

// Hide clients list
window.hideClientsListGlobal = function() {
    setTimeout(() => {
        const dropdown = document.getElementById('clientsDropdownGlobal');
        if (dropdown) dropdown.style.display = 'none';
    }, 200);
}

// Select client from dropdown
window.selectClientGlobal = function(nom, ice, clientId) {
    document.getElementById('clientNomGlobal').value = nom;
    document.getElementById('clientICEGlobal').value = ice;
    selectedClientIdGlobal = clientId;
    
    const dropdown = document.getElementById('clientsDropdownGlobal');
    if (dropdown) dropdown.style.display = 'none';
    
    // Enable load bons button
    document.getElementById('loadBonsBtn').disabled = false;
    
    // Clear previous bons
    document.getElementById('bonsTableBody').innerHTML = '';
    document.getElementById('bonsListContainer').style.display = 'none';
    availableBonsGlobal = [];
    calculateTotalsGlobal();
}

// Load bons de livraison for selected client
window.loadBonsForClientGlobal = async function() {
    if (!selectedClientIdGlobal) {
        window.notify.error('Erreur', 'Veuillez sélectionner un client', 3000);
        return;
    }
    
    try {
        const result = await window.electron.dbChaimae.getBonsByClient(selectedClientIdGlobal);
        
        if (result.success) {
            availableBonsGlobal = result.data;
            
            if (availableBonsGlobal.length === 0) {
                document.getElementById('bonsListContainer').style.display = 'block';
                document.getElementById('bonsTable').style.display = 'none';
                document.getElementById('emptyBonsMessage').style.display = 'block';
                return;
            }
            
            document.getElementById('bonsTable').style.display = 'table';
            document.getElementById('emptyBonsMessage').style.display = 'none';
            document.getElementById('bonsListContainer').style.display = 'block';
            
            const tbody = document.getElementById('bonsTableBody');
            tbody.innerHTML = availableBonsGlobal.map(bon => {
                const bonNumero = bon.document_numero || '-';
                const bonCommande = bon.document_numero_commande || '-';
                const bonDate = new Date(bon.document_date).toLocaleDateString('fr-FR');
                const bonTotal = formatNumberGlobal(bon.total_ttc || 0);
                
                return `
                    <tr>
                        <td style="text-align: center;">
                            <input type="checkbox" class="bon-checkbox" data-bon-id="${bon.id}" 
                                   onchange="calculateTotalsGlobal()" 
                                   style="width: 18px; height: 18px; cursor: pointer;">
                        </td>
                        <td><strong style="color: #2196f3;">${bonNumero}</strong></td>
                        <td>${bonCommande}</td>
                        <td>${bonDate}</td>
                        <td><strong style="color: #4caf50;">${bonTotal} DH</strong></td>
                    </tr>
                `;
            }).join('');
            
            calculateTotalsGlobal();
        }
    } catch (error) {
        console.error('Error loading bons:', error);
        window.notify.error('Erreur', 'Erreur lors du chargement des bons de livraison', 3000);
    }
}

// Toggle all bons
window.toggleAllBonsGlobal = function(checkbox) {
    const checkboxes = document.querySelectorAll('.bon-checkbox');
    checkboxes.forEach(cb => cb.checked = checkbox.checked);
    calculateTotalsGlobal();
}

// Calculate totals
window.calculateTotalsGlobal = function() {
    const selectedCheckboxes = document.querySelectorAll('.bon-checkbox:checked');
    const selectedBonIds = Array.from(selectedCheckboxes).map(cb => parseInt(cb.dataset.bonId));
    
    let totalHT = 0;
    
    selectedBonIds.forEach(bonId => {
        const bon = availableBonsGlobal.find(b => b.id === bonId);
        if (bon) {
            totalHT += bon.total_ht || 0;
        }
    });
    
    const tvaRate = parseFloat(document.getElementById('tvaRateGlobal').value) || 0;
    const montantTVA = totalHT * (tvaRate / 100);
    const totalTTC = totalHT + montantTVA;
    
    document.getElementById('totalHTGlobal').textContent = formatNumberGlobal(totalHT) + ' DH';
    document.getElementById('montantTVAGlobal').textContent = formatNumberGlobal(montantTVA) + ' DH';
    document.getElementById('totalTTCGlobal').textContent = formatNumberGlobal(totalTTC) + ' DH';
}

// Auto-format document number
window.autoFormatDocumentNumberGlobal = function(input) {
    let value = input.value.replace(/[^0-9]/g, '');
    
    if (value.length === 3) {
        const year = new Date().getFullYear();
        input.value = `${value}/${year}`;
        input.setAttribute('readonly', 'true');
        setTimeout(() => {
            input.removeAttribute('readonly');
        }, 100);
    } else if (value.length < 3) {
        input.value = value;
    }
}

// Format number with thousands separator
function formatNumberGlobal(number) {
    return new Intl.NumberFormat('fr-FR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(number);
}

// Initialize page
window.initCreateGlobalInvoiceChaimaePage = function() {
    console.log('🔄 Initializing create global invoice page for Chaimae...');
    
    // Set today's date
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('documentDateGlobal').value = today;
    
    // Load clients for autocomplete
    loadAllClientsGlobal();
    
    // Handle form submission
    const form = document.getElementById('globalInvoiceForm');
    form.addEventListener('submit', handleFormSubmitGlobal);
}

// Handle form submission
async function handleFormSubmitGlobal(e) {
    e.preventDefault();
    
    try {
        // Get selected bon de livraison IDs
        const selectedCheckboxes = document.querySelectorAll('.bon-checkbox:checked');
        const selectedBonIds = Array.from(selectedCheckboxes).map(cb => parseInt(cb.dataset.bonId));
        
        if (selectedBonIds.length === 0) {
            window.notify.error('Erreur', 'Veuillez sélectionner au moins un bon de livraison', 3000);
            return;
        }
        
        const formData = {
            client: {
                nom: document.getElementById('clientNomGlobal').value,
                ICE: document.getElementById('clientICEGlobal').value
            },
            document_numero: document.getElementById('documentNumeroGlobal').value,
            document_date: document.getElementById('documentDateGlobal').value,
            total_ht: parseFloat(document.getElementById('totalHTGlobal').textContent.replace(' DH', '').replace(',', '.')),
            tva_rate: parseFloat(document.getElementById('tvaRateGlobal').value),
            montant_tva: parseFloat(document.getElementById('montantTVAGlobal').textContent.replace(' DH', '').replace(',', '.')),
            total_ttc: parseFloat(document.getElementById('totalTTCGlobal').textContent.replace(' DH', '').replace(',', '.')),
            bon_livraison_ids: selectedBonIds
        };
        
        console.log('📤 Creating global invoice for Chaimae:', formData);
        
        // Check for duplicate document number in global invoices
        const allGlobalInvoicesResult = await window.electron.dbChaimae.getAllGlobalInvoices();
        if (allGlobalInvoicesResult.success) {
            const duplicateGlobal = allGlobalInvoicesResult.data.find(inv => 
                inv.document_numero === formData.document_numero
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
        
        // Save to database
        const result = await window.electron.dbChaimae.createGlobalInvoice(formData);
        
        if (result.success) {
            window.notify.success('Succès', 'Facture globale créée avec succès!', 3000);
            setTimeout(() => {
                router.navigate('/invoices-list-chaimae');
            }, 1500);
        } else {
            window.notify.error('Erreur', result.error || 'Erreur lors de la création', 4000);
        }
        
    } catch (error) {
        console.error('Error creating global invoice:', error);
        window.notify.error('Erreur', 'Erreur lors de la création de la facture globale', 4000);
    }
}
