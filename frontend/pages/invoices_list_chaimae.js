// Chaimae Invoices List Page - Copy from MRY Design
function InvoicesListChaimaePage() {
    return `
        <div class="desktop-app">
            <div class="window-header">
                <div class="window-title">
                    <img src="assets/logos/chaimae.png" class="header-logo" alt="Chaimae Company" data-asset="assets/logos/chaimae.png">
                    <span>Liste des Documents - Chaimae Company</span>
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

            <div class="window-content">
                <div class="invoices-list-container">
                    <!-- Header -->
                    <div class="list-header">
                        <h1>📋 Liste des Factures, Devis et Bons de Livraison</h1>
                        <div class="header-actions">
                            <button id="changeYearBtn" onclick="router.navigate('/year-selector-chaimae')" style="background: #2d2d30; color: white; padding: 0.75rem 1.5rem; border: 2px solid #667eea; border-radius: 6px; cursor: pointer; font-weight: 600; display: flex; align-items: center; gap: 0.5rem; transition: all 0.3s; margin-right: 1rem;" onmouseover="this.style.background='#3e3e42'" onmouseout="this.style.background='#2d2d30'">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                                </svg>
                                <span id="currentYearDisplay">Toutes</span>
                            </button>
                            <button class="btn-situation" onclick="showSituationMensuelleModal()" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 0.75rem 1.5rem; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; display: flex; align-items: center; gap: 0.5rem; transition: all 0.3s;" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 12px rgba(102, 126, 234, 0.5)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'">
                                📊 Situation Mensuelle
                            </button>
                            <button class="btn-primary" onclick="router.navigate('/create-invoice-chaimae')">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style="margin-right: 0.5rem;">
                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                </svg>
                                <span>Nouvelle Facture</span>
                            </button>
                            <button class="btn-secondary" onclick="router.navigate('/dashboard-chaimae')">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style="margin-right: 0.5rem;">
                                    <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                                </svg>
                                <span>Retour</span>
                            </button>
                        </div>
                    </div>

                    <!-- Filters -->
                    <div class="filters-section" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
                        <div class="filter-group">
                            <label>Type de document:</label>
                            <select id="filterTypeChaimae" onchange="filterInvoicesChaimae()">
                                <option value="">Tous</option>
                                <option value="facture">Factures</option>
                                <option value="devis">Devis</option>
                                <option value="bon_livraison">Bon de livraison</option>
                            </select>
                        </div>
                        
                        <div class="filter-group">
                            <label>📆 Mois:</label>
                            <select id="filterMonthChaimae" onchange="filterInvoicesChaimae()">
                                <option value="">Tous</option>
                                <option value="01">Janvier</option>
                                <option value="02">Février</option>
                                <option value="03">Mars</option>
                                <option value="04">Avril</option>
                                <option value="05">Mai</option>
                                <option value="06">Juin</option>
                                <option value="07">Juillet</option>
                                <option value="08">Août</option>
                                <option value="09">Septembre</option>
                                <option value="10">Octobre</option>
                                <option value="11">Novembre</option>
                                <option value="12">Décembre</option>
                            </select>
                        </div>
                        
                        <div class="filter-group">
                            <label>👤 Client:</label>
                            <select id="filterClientChaimae" onchange="filterInvoicesChaimae()">
                                <option value="">Tous</option>
                            </select>
                        </div>
                        
                        <div class="filter-group" style="grid-column: 1 / -1;">
                            <label>🔍 Recherche avancée:</label>
                            <div style="display: grid; grid-template-columns: 200px 1fr; gap: 0.5rem;">
                                <select id="searchTypeChaimae" onchange="filterInvoicesChaimae()" style="padding: 0.75rem; background: #1e1e1e; border: 1px solid #3e3e42; border-radius: 4px; color: #ffffff; font-size: 0.95rem;">
                                    <option value="all">🔍 Tout</option>
                                    <option value="numero">📄 N° Document</option>
                                    <option value="order">📋 N° Order</option>
                                    <option value="bon_livraison">📦 Bon de livraison</option>
                                    <option value="client">👤 Client</option>
                                    <option value="ice">🏢 ICE</option>
                                    <option value="product">📦 Produit</option>
                                    <option value="price">💰 Prix</option>
                                    <option value="total_ht">💵 Total H.T</option>
                                    <option value="total">💵 Total TTC</option>
                                </select>
                                <input type="text" id="searchInputChaimae" placeholder="Tapez votre recherche..." onkeyup="filterInvoicesChaimae()" style="width: 100%; padding: 0.75rem; background: #1e1e1e; border: 1px solid #3e3e42; border-radius: 4px; color: #ffffff; font-size: 0.95rem;">
                            </div>
                        </div>
                        
                        <div class="filter-group">
                            <button class="btn-refresh" onclick="loadInvoicesChaimae()" style="margin-top: 1.5rem;">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style="margin-right: 0.5rem;">
                                    <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
                                    <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
                                </svg>
                                <span>Actualiser</span>
                            </button>
                        </div>

                    </div>

                    <!-- Loading -->
                    <div id="loadingSpinnerChaimae" class="loading-spinner" style="display: none;">
                        <div class="spinner"></div>
                        <p>Chargement des données...</p>
                    </div>

                    <!-- Global Invoices Section -->
                    <div id="globalInvoicesSectionChaimae" style="display: none; margin-bottom: 2rem;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; padding: 1rem; background: #2d2d30; border: 1px solid #3e3e42; border-radius: 6px;">
                            <h3 style="margin: 0; color: #9c27b0; font-size: 1.1rem;">📦 Factures Globales (<span id="globalInvoicesCountChaimae">0</span>)</h3>
                            <button onclick="toggleGlobalInvoicesChaimae()" style="padding: 0.5rem 1rem; background: #9c27b0; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 0.9rem;">
                                <span id="toggleGlobalIconChaimae">▼</span> Afficher/Masquer
                            </button>
                        </div>
                        <div id="globalInvoicesTableChaimae" style="display: none;">
                            <table class="invoices-table" style="margin-bottom: 0;">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>N° Facture</th>
                                        <th>Client</th>
                                        <th>Date</th>
                                        <th>Bons</th>
                                        <th>Total TTC</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody id="globalInvoicesBodyChaimae">
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- Results Counter & Bulk Actions -->
                    <div style="display: flex; gap: 1rem; align-items: center; margin-bottom: 1rem;">
                        <div id="resultsCounterChaimae" style="flex: 1; padding: 0.75rem 1rem; background: #2d2d30; border: 1px solid #3e3e42; border-radius: 6px; color: #cccccc; font-size: 0.95rem; display: none;">
                            <strong>📊 Résultats:</strong> <span id="resultCountChaimae">0</span> document(s) trouvé(s)
                        </div>
                        <div style="display: flex; gap: 0.5rem; align-items: center;">
                            <label style="color: #cccccc; font-size: 0.9rem;">Afficher:</label>
                            <select id="itemsPerPageChaimae" onchange="changeItemsPerPageChaimae()" style="padding: 0.5rem; background: #2d2d30; border: 1px solid #3e3e42; border-radius: 4px; color: #ffffff; cursor: pointer;">
                                <option value="10">10</option>
                                <option value="20">20</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                                <option value="all">Tout</option>
                            </select>
                        </div>
                        <button id="bulkDeleteBtnChaimae" onclick="handleBulkDeleteChaimae()" 
                                style="padding: 0.75rem 1.5rem; background: #f44336; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 0.95rem; transition: all 0.3s; display: flex; align-items: center; gap: 0.5rem;"
                                onmouseover="this.style.background='#d32f2f'" onmouseout="this.style.background='#f44336'">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                            </svg>
                            <span id="bulkDeleteTextChaimae">Supprimer</span>
                        </button>
                        <button id="bulkDownloadBtnChaimae" onclick="handleBulkDownloadChaimae()" 
                                style="padding: 0.75rem 1.5rem; background: #2196f3; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 0.95rem; transition: all 0.3s; display: flex; align-items: center; gap: 0.5rem;"
                                onmouseover="this.style.background='#1976d2'" onmouseout="this.style.background='#2196f3'">
                            📥 <span id="bulkDownloadTextChaimae">Télécharger</span>
                        </button>
                        <button id="createGlobalInvoiceBtnChaimae" onclick="showCreateGlobalInvoiceModalChaimae()" 
                                style="padding: 0.75rem 1.5rem; background: #4caf50; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 0.95rem; transition: all 0.3s;"
                                onmouseover="this.style.background='#45a049'" onmouseout="this.style.background='#4caf50'">
                            📦 Créer Facture Globale
                        </button>
                    </div>

                    <!-- Invoices Table -->
                    <div class="table-container">
                        <table class="invoices-table">
                            <thead>
                                <tr>
                                    <th style="width: 40px;">
                                        <input type="checkbox" id="selectAllChaimae" onchange="selectAllInvoicesChaimae()"
                                               style="width: 18px; height: 18px; cursor: pointer;"
                                               title="Sélectionner tout">
                                    </th>
                                    <th>ID</th>
                                    <th>Type</th>
                                    <th onclick="sortTableChaimae('numero')" style="cursor: pointer; user-select: none;" title="Cliquez pour trier">
                                        N° Document <span id="sortIconNumeroChaimae">⇅</span>
                                    </th>
                                    <th>Client</th>
                                    <th>ICE</th>
                                    <th onclick="sortTableChaimae('date')" style="cursor: pointer; user-select: none;" title="Cliquez pour trier">
                                        Date <span id="sortIconDateChaimae">⇅</span>
                                    </th>
                                    <th onclick="sortTableChaimae('total_ht')" style="cursor: pointer; user-select: none;" title="Cliquez pour trier">
                                        Total HT <span id="sortIconTotalHTChaimae">⇅</span>
                                    </th>
                                    <th>TVA</th>
                                    <th onclick="sortTableChaimae('total_ttc')" style="cursor: pointer; user-select: none;" title="Cliquez pour trier">
                                        Total TTC <span id="sortIconTotalTTCChaimae">⇅</span>
                                    </th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody id="invoicesTableBodyChaimae">
                                <!-- Invoices will be loaded here -->
                            </tbody>
                        </table>
                    </div>

                    <!-- Pagination -->
                    <div id="paginationChaimae" style="display: none; margin-top: 1.5rem; padding: 1rem; background: #2d2d30; border: 1px solid #3e3e42; border-radius: 6px;">
                        <div style="display: flex; justify-content: center; align-items: center; gap: 0.5rem;">
                            <button id="prevPageChaimae" onclick="changePaginationPageChaimae('prev')" style="padding: 0.5rem 1rem; background: #3e3e42; color: #ffffff; border: none; border-radius: 4px; cursor: pointer; transition: all 0.3s;" onmouseover="this.style.background='#4e4e52'" onmouseout="this.style.background='#3e3e42'">
                                ← Précédent
                            </button>
                            <div id="pageNumbersChaimae" style="display: flex; gap: 0.25rem;">
                                <!-- Page numbers will be inserted here -->
                            </div>
                            <button id="nextPageChaimae" onclick="changePaginationPageChaimae('next')" style="padding: 0.5rem 1rem; background: #3e3e42; color: #ffffff; border: none; border-radius: 4px; cursor: pointer; transition: all 0.3s;" onmouseover="this.style.background='#4e4e52'" onmouseout="this.style.background='#3e3e42'">
                                Suivant →
                            </button>
                        </div>
                    </div>

                    <!-- Empty State -->
                    <div id="emptyStateChaimae" class="empty-state" style="display: none;">
                        <svg width="64" height="64" viewBox="0 0 16 16" fill="currentColor" style="opacity: 0.3; margin-bottom: 1rem;">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                        </svg>
                        <h3>Aucune facture trouvée</h3>
                        <p>Commencez par créer votre première facture</p>
                        <button class="btn-primary" onclick="router.navigate('/create-invoice-chaimae')" style="margin-top: 1rem;">
                            <span>+ Créer une facture</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Store all invoices for Chaimae
let allInvoicesChaimae = [];
let filteredInvoicesChaimae = [];
let currentPageChaimae = 1;
let itemsPerPageChaimae = 10;

// Format number for display with proper formatting
function formatNumberChaimae(number) {
    const num = parseFloat(number) || 0;
    // Use toLocaleString for better display with spaces as thousands separator
    return num.toLocaleString('fr-FR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

// Load invoices from database
window.loadInvoicesChaimae = async function() {
    const loadingSpinner = document.getElementById('loadingSpinnerChaimae');
    const tableBody = document.getElementById('invoicesTableBodyChaimae');
    const emptyState = document.getElementById('emptyStateChaimae');
    
    try {
        // Get selected year from session or localStorage
        const sessionYear = sessionStorage.getItem('chaimae_current_year');
        const savedYear = localStorage.getItem('chaimae_selected_year');
        const rememberYear = localStorage.getItem('chaimae_remember_year');
        
        // Use session year first (even if empty string for "all years"), then saved year if remember is enabled
        if (sessionYear !== null) {
            selectedYearChaimae = sessionYear;
        } else if (rememberYear === 'true' && savedYear !== null) {
            selectedYearChaimae = savedYear;
        }
        
        // Update year display button
        const yearDisplay = document.getElementById('currentYearDisplay');
        if (yearDisplay) {
            yearDisplay.textContent = selectedYearChaimae ? `Année ${selectedYearChaimae}` : 'Toutes';
        }
        
        // Show loading
        if (loadingSpinner) loadingSpinner.style.display = 'flex';
        if (tableBody) tableBody.innerHTML = '';
        if (emptyState) emptyState.style.display = 'none';
        
        // Get regular invoices from database
        const result = await window.electron.dbChaimae.getAllInvoices();
        
        // Get global invoices from database
        const globalResult = await window.electron.dbChaimae.getAllGlobalInvoices();
        
        if (result.success) {
            const regularInvoices = result.data;
            const globalInvoices = globalResult.success ? globalResult.data : [];
            
            // Store only regular invoices in main array
            allInvoicesChaimae = regularInvoices;
            
            // Display global invoices separately
            displayGlobalInvoicesChaimae(globalInvoices);
            
            console.log('📊 Loaded invoices for Chaimae:', regularInvoices.length, '+ Global:', globalInvoices.length);
            
            // Populate filters
            await populateFiltersChaimae();
            
            // Apply year filter if selected
            if (selectedYearChaimae) {
                filterInvoicesChaimae();
            } else {
                filteredInvoicesChaimae = allInvoicesChaimae;
                displayInvoicesChaimae(allInvoicesChaimae);
            }
            
            // Hide loading
            if (loadingSpinner) loadingSpinner.style.display = 'none';
            
            if (filteredInvoicesChaimae.length === 0) {
                if (emptyState) emptyState.style.display = 'flex';
            }
        } else {
            throw new Error(result.error);
        }
    } catch (error) {
        console.error('❌ Error loading invoices for Chaimae:', error);
        if (loadingSpinner) loadingSpinner.style.display = 'none';
        
        window.notify.error(
            'Erreur de chargement',
            'Impossible de charger les documents: ' + error.message,
            5000
        );
    }
}

// Store selected year globally
let selectedYearChaimae = '';

// Populate filters and year cards
async function populateFiltersChaimae() {
    // Get available years from database
    try {
        const result = await window.electron.dbChaimae.getAvailableYears();
        
        let availableYears = [];
        if (result.success && result.data.length > 0) {
            availableYears = result.data;
        } else {
            // Fallback: Get unique years from invoices
            const invoiceYears = [...new Set(allInvoicesChaimae.map(inv => {
                return inv.year || new Date(inv.document_date).getFullYear();
            }))];
            
            // Add current year and previous 2 years if not present
            const currentYear = new Date().getFullYear();
            const defaultYears = [currentYear, currentYear - 1, currentYear - 2];
            
            // Combine and remove duplicates
            availableYears = [...new Set([...invoiceYears, ...defaultYears])].sort((a, b) => b - a);
        }
        
        // Render year cards
        renderYearCardsChaimae(availableYears);
        
    } catch (error) {
        console.error('Error loading available years:', error);
    }
    
    // Get unique clients
    const clients = [...new Set(allInvoicesChaimae.map(inv => inv.client_nom))].sort();
    const clientSelect = document.getElementById('filterClientChaimae');
    if (clientSelect) {
        clientSelect.innerHTML = '<option value="">Tous</option>' + 
            clients.map(client => `<option value="${client}">${client}</option>`).join('');
    }
}

// Render year cards
function renderYearCardsChaimae(years) {
    const container = document.getElementById('yearsCardsContainer');
    if (!container) return;
    
    // Count invoices per year
    const yearCounts = {};
    allInvoicesChaimae.forEach(inv => {
        const year = inv.year || new Date(inv.document_date).getFullYear();
        yearCounts[year] = (yearCounts[year] || 0) + 1;
    });
    
    // Add "All Years" card
    const allCount = allInvoicesChaimae.length;
    let cardsHTML = `
        <div onclick="selectYearCardChaimae('')" 
             style="flex: 0 0 auto; min-width: 180px; padding: 1.5rem; background: ${selectedYearChaimae === '' ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'linear-gradient(135deg, #2d2d30 0%, #3e3e42 100%)'}; border: 2px solid ${selectedYearChaimae === '' ? '#667eea' : '#3e3e42'}; border-radius: 12px; cursor: pointer; transition: all 0.3s; box-shadow: ${selectedYearChaimae === '' ? '0 4px 12px rgba(102, 126, 234, 0.4)' : '0 2px 8px rgba(0,0,0,0.2)'};"
             onmouseover="if('${selectedYearChaimae}' !== '') { this.style.transform='translateY(-5px)'; this.style.borderColor='#667eea'; this.style.boxShadow='0 6px 16px rgba(102, 126, 234, 0.3)'; }"
             onmouseout="if('${selectedYearChaimae}' !== '') { this.style.transform='translateY(0)'; this.style.borderColor='#3e3e42'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.2)'; }">
            <div style="text-align: center;">
                <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">📊</div>
                <div style="font-size: 1.1rem; font-weight: 700; color: #fff; margin-bottom: 0.5rem;">Toutes</div>
                <div style="font-size: 2rem; font-weight: 700; color: ${selectedYearChaimae === '' ? '#fff' : '#4caf50'};">${allCount}</div>
                <div style="font-size: 0.85rem; color: ${selectedYearChaimae === '' ? 'rgba(255,255,255,0.8)' : '#999'}; margin-top: 0.25rem;">documents</div>
            </div>
        </div>
    `;
    
    // Add year cards
    years.forEach(year => {
        const count = yearCounts[year] || 0;
        const isSelected = selectedYearChaimae == year;
        
        cardsHTML += `
            <div onclick="selectYearCardChaimae('${year}')" 
                 style="flex: 0 0 auto; min-width: 180px; padding: 1.5rem; background: ${isSelected ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'linear-gradient(135deg, #2d2d30 0%, #3e3e42 100%)'}; border: 2px solid ${isSelected ? '#667eea' : '#3e3e42'}; border-radius: 12px; cursor: pointer; transition: all 0.3s; box-shadow: ${isSelected ? '0 4px 12px rgba(102, 126, 234, 0.4)' : '0 2px 8px rgba(0,0,0,0.2)'};"
                 onmouseover="if('${selectedYearChaimae}' !== '${year}') { this.style.transform='translateY(-5px)'; this.style.borderColor='#667eea'; this.style.boxShadow='0 6px 16px rgba(102, 126, 234, 0.3)'; }"
                 onmouseout="if('${selectedYearChaimae}' !== '${year}') { this.style.transform='translateY(0)'; this.style.borderColor='#3e3e42'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.2)'; }">
                <div style="text-align: center;">
                    <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">📅</div>
                    <div style="font-size: 1.5rem; font-weight: 700; color: #fff; margin-bottom: 0.5rem;">${year}</div>
                    <div style="font-size: 2rem; font-weight: 700; color: ${isSelected ? '#fff' : '#4caf50'};">${count}</div>
                    <div style="font-size: 0.85rem; color: ${isSelected ? 'rgba(255,255,255,0.8)' : '#999'}; margin-top: 0.25rem;">documents</div>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = cardsHTML;
}

// Select year card
window.selectYearCardChaimae = function(year) {
    selectedYearChaimae = year;
    
    // Re-render cards to update selection
    populateFiltersChaimae();
    
    // Filter invoices by year
    filterInvoicesChaimae();
}

// Display global invoices in separate section
function displayGlobalInvoicesChaimae(globalInvoices) {
    const section = document.getElementById('globalInvoicesSectionChaimae');
    const tbody = document.getElementById('globalInvoicesBodyChaimae');
    const count = document.getElementById('globalInvoicesCountChaimae');
    
    if (!section || !tbody || !count) return;
    
    if (globalInvoices.length === 0) {
        section.style.display = 'none';
        return;
    }
    
    section.style.display = 'block';
    count.textContent = globalInvoices.length;
    
    tbody.innerHTML = globalInvoices.map(invoice => {
        const date = new Date(invoice.document_date).toLocaleDateString('fr-FR');
        const totalTTC = formatNumberChaimae(invoice.total_ttc || 0);
        
        return `
            <tr style="background: #2d2d30; border-top: 1px solid #3e3e42;">
                <td style="text-align: center; padding: 0.75rem;"><strong style="color: #cccccc;">#${invoice.id}</strong></td>
                <td style="padding: 0.75rem;"><strong style="color: #9c27b0;">${invoice.document_numero}</strong></td>
                <td style="padding: 0.75rem; color: #cccccc;">${invoice.client_nom}</td>
                <td style="padding: 0.75rem; color: #cccccc;">${date}</td>
                <td style="text-align: center; padding: 0.75rem;"><span style="color: #9c27b0; font-weight: 600;">${invoice.bon_count || 0}</span></td>
                <td style="padding: 0.75rem;"><strong style="color: #4caf50;">${totalTTC} DH</strong></td>
                <td style="padding: 0.75rem;">
                    <div style="display: flex; gap: 0.5rem; justify-content: center;">
                        <button class="btn-icon btn-view" onclick="viewGlobalInvoiceChaimae(${invoice.id})" title="Voir">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                            </svg>
                        </button>
                        <button class="btn-icon btn-download" onclick="window.downloadGlobalInvoicePDF(${invoice.id})" title="Télécharger PDF">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                                <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                            </svg>
                        </button>
                        <button class="btn-icon btn-edit" onclick="editGlobalInvoiceChaimae(${invoice.id})" title="Modifier">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                            </svg>
                        </button>
                        <button class="btn-icon btn-delete" onclick="deleteGlobalInvoiceChaimae(${invoice.id})" title="Supprimer">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                            </svg>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

// Toggle global invoices visibility
window.toggleGlobalInvoicesChaimae = function() {
    const table = document.getElementById('globalInvoicesTableChaimae');
    const icon = document.getElementById('toggleGlobalIconChaimae');
    
    if (table && icon) {
        if (table.style.display === 'none') {
            table.style.display = 'block';
            icon.textContent = '▲';
        } else {
            table.style.display = 'none';
            icon.textContent = '▼';
        }
    }
}

// Edit global invoice
window.editGlobalInvoiceChaimae = function(id) {
    console.log('✏️✏️✏️ [EDIT BUTTON CLICKED!!!] Global Invoice ID:', id);
    console.log('📍📍📍 [LOCATION] editGlobalInvoiceChaimae function called');
    console.log('✅✅✅ [CONFIRMATION] تم الضغط على زر التعديل - الدالة تعمل!');
    
    // Store the invoice ID in sessionStorage for the edit page
    sessionStorage.setItem('editGlobalInvoiceId', id);
    
    console.log('🔄 [NAVIGATION] Navigating to edit page...');
    router.navigate('/edit-global-invoice-chaimae');
    
    console.log('✅ [DONE] Edit button action completed');
}

// Delete global invoice
window.deleteGlobalInvoiceChaimae = async function(id) {
    const confirmed = await customConfirm('Confirmation', 'Êtes-vous sûr de vouloir supprimer cette facture globale ?', 'warning');
    if (!confirmed) {
        return;
    }
    
    try {
        const result = await window.electron.dbChaimae.deleteGlobalInvoice(id);
        
        if (result.success) {
            window.notify.success('Succès', 'Facture globale supprimée avec succès', 3000);
            loadInvoicesChaimae();
        } else {
            window.notify.error('Erreur', result.error || 'Impossible de supprimer', 3000);
        }
    } catch (error) {
        console.error('Error deleting global invoice:', error);
        window.notify.error('Erreur', 'Une erreur est survenue', 3000);
    }
}

// Display invoices in table with pagination
function displayInvoicesChaimae(invoices) {
    const tableBody = document.getElementById('invoicesTableBodyChaimae');
    const emptyState = document.getElementById('emptyStateChaimae');
    const resultsCounter = document.getElementById('resultsCounterChaimae');
    const resultCount = document.getElementById('resultCountChaimae');
    const pagination = document.getElementById('paginationChaimae');
    
    if (invoices.length === 0) {
        if (tableBody) tableBody.innerHTML = '';
        if (emptyState) emptyState.style.display = 'flex';
        if (resultsCounter) resultsCounter.style.display = 'none';
        if (pagination) pagination.style.display = 'none';
        return;
    }
    
    if (emptyState) emptyState.style.display = 'none';
    if (resultsCounter) resultsCounter.style.display = 'block';
    if (resultCount) resultCount.textContent = invoices.length;
    
    if (!tableBody) return;
    
    // Use the globally selected year from card
    const selectedYear = selectedYearChaimae;
    
    // Calculate pagination
    const totalItems = invoices.length;
    const itemsPerPage = itemsPerPageChaimae === 'all' ? totalItems : parseInt(itemsPerPageChaimae);
    const totalPages = itemsPerPageChaimae === 'all' ? 1 : Math.ceil(totalItems / itemsPerPage);
    
    // Adjust current page if needed
    if (currentPageChaimae > totalPages) {
        currentPageChaimae = totalPages || 1;
    }
    
    // Get items for current page
    const startIndex = (currentPageChaimae - 1) * itemsPerPage;
    const endIndex = itemsPerPageChaimae === 'all' ? totalItems : startIndex + itemsPerPage;
    const paginatedInvoices = invoices.slice(startIndex, endIndex);
    
    tableBody.innerHTML = paginatedInvoices.map((invoice, index) => {
        // Calculate display ID: if year is selected, use sequential_id, otherwise use database id
        let displayId;
        if (selectedYear && invoice.year == selectedYear) {
            // Use sequential_id for the selected year (starts from 1)
            displayId = invoice.sequential_id || invoice.id;
        } else if (selectedYear) {
            // If year filter is active but this invoice is from different year, use sequential numbering
            displayId = startIndex + index + 1;
        } else {
            // No year filter: use database id
            displayId = invoice.id;
        }
        console.log('📊 Invoice data:', {
            id: invoice.id,
            total_ht: invoice.total_ht,
            total_ttc: invoice.total_ttc,
            type: typeof invoice.total_ht
        });
        
        const typeLabel = invoice.document_type === 'facture' ? '📄 Facture' : 
                         invoice.document_type === 'devis' ? '📋 Devis' : 
                         invoice.document_type === 'facture_globale' ? '📦 Facture Globale' :
                         '📦 Bon de livraison';
        const typeBadge = invoice.document_type === 'facture' ? 'badge-facture' : 
                         invoice.document_type === 'devis' ? 'badge-devis' : 
                         invoice.document_type === 'facture_globale' ? 'badge-global' :
                         'badge-bon';
        const numero = invoice.document_numero || invoice.document_numero_devis || invoice.document_numero_bl || '-';
        const date = new Date(invoice.document_date).toLocaleDateString('fr-FR');
        
        const totalHT = formatNumberChaimae(invoice.total_ht || 0);
        const tva = invoice.tva_rate || 20;
        const totalTTC = formatNumberChaimae(invoice.total_ttc || 0);
        
        console.log('📊 Formatted values:', {
            totalHT,
            totalTTC
        });
        
        // Additional info
        let additionalInfo = '';
        if (invoice.document_type === 'facture') {
            if (invoice.document_numero_Order) {
                additionalInfo += `<div style="font-size: 0.85rem; color: #2196f3; margin-top: 0.25rem;">📋 N° Order: ${invoice.document_numero_Order}</div>`;
            }
            if (invoice.document_bon_de_livraison) {
                additionalInfo += `<div style="font-size: 0.85rem; color: #4caf50; margin-top: 0.25rem;">📦 Bon de livraison: ${invoice.document_bon_de_livraison}</div>`;
            }
        }
        if (invoice.document_type === 'bon_livraison' && invoice.document_numero_commande && invoice.document_numero_commande.trim() !== '' && invoice.document_numero_commande !== 'null') {
            additionalInfo += `<div style="font-size: 0.85rem; color: #ff9800; margin-top: 0.25rem;">📋 N° Order: ${invoice.document_numero_commande}</div>`;
        }
        if (invoice.document_type === 'facture_globale' && invoice.bon_count) {
            additionalInfo += `<div style="font-size: 0.85rem; color: #9c27b0; margin-top: 0.25rem;">📦 ${invoice.bon_count} Bons de livraison</div>`;
        }
        
        return `
            <tr style="background: #2d2d30; border-top: 1px solid #3e3e42; border-bottom: 1px solid #3e3e42;">
                <td style="text-align: center; padding: 1rem 0.75rem; border-right: 1px solid #3e3e42;">
                    <input type="checkbox" class="invoice-checkbox-chaimae" data-invoice-id="${invoice.id}" 
                           style="width: 18px; height: 18px; cursor: pointer;">
                </td>
                <td style="text-align: center; padding: 1rem 0.75rem; border-right: 1px solid #3e3e42;"><strong style="color: #cccccc;">#${displayId}</strong></td>
                <td style="padding: 1rem 0.75rem; border-right: 1px solid #3e3e42;"><span class="badge ${typeBadge}">${typeLabel}</span></td>
                <td style="padding: 1rem 0.75rem; border-right: 1px solid #3e3e42;">
                    <strong style="color: #2196f3;">${numero}</strong>
                    ${additionalInfo}
                </td>
                <td style="padding: 1rem 0.75rem; border-right: 1px solid #3e3e42; color: #cccccc;">${invoice.client_nom}</td>
                <td style="padding: 1rem 0.75rem; border-right: 1px solid #3e3e42;"><small style="color: #999;">${invoice.client_ice || '-'}</small></td>
                <td style="padding: 1rem 0.75rem; border-right: 1px solid #3e3e42; color: #cccccc;">${date}</td>
                <td style="text-align: left; padding: 1rem 0.75rem; border-right: 1px solid #3e3e42;"><strong style="color: #cccccc;">${totalHT} DH</strong></td>
                <td style="text-align: left; padding: 1rem 0.75rem; border-right: 1px solid #3e3e42; color: #cccccc;">${tva}%</td>
                <td style="text-align: left; padding: 1rem 0.75rem; border-right: 1px solid #3e3e42;"><strong style="color: #4caf50;">${totalTTC} DH</strong></td>
                <td style="padding: 1rem 0.75rem;">
                    <div style="display: flex; gap: 0.5rem; justify-content: center;">
                        <button class="btn-icon btn-view" onclick="viewInvoiceChaimae(${invoice.id}, '${invoice.document_type}')" title="Voir">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                            </svg>
                        </button>
                        <button class="btn-icon btn-download" onclick="downloadInvoicePDFChaimae(${invoice.id})" title="Télécharger PDF">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                                <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                            </svg>
                        </button>
                        <button class="btn-icon btn-edit" onclick="editInvoiceChaimae(${invoice.id})" title="Modifier">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                            </svg>
                        </button>
                        <button class="btn-icon btn-delete" onclick="deleteInvoiceChaimae(${invoice.id}, '${invoice.document_type}')" title="Supprimer">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                            </svg>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
    
    // Add event listeners to checkboxes
    document.querySelectorAll('.invoice-checkbox-chaimae').forEach(checkbox => {
        checkbox.addEventListener('change', updateSelectAllChaimae);
    });
    
    // Update pagination controls
    updatePaginationControlsChaimae(totalPages);
}

// Update pagination controls
function updatePaginationControlsChaimae(totalPages) {
    const pagination = document.getElementById('paginationChaimae');
    const pageNumbers = document.getElementById('pageNumbersChaimae');
    const prevBtn = document.getElementById('prevPageChaimae');
    const nextBtn = document.getElementById('nextPageChaimae');
    
    if (!pagination || !pageNumbers) return;
    
    // Show/hide pagination
    if (totalPages <= 1 && itemsPerPageChaimae !== 'all') {
        pagination.style.display = 'none';
        return;
    }
    
    if (itemsPerPageChaimae === 'all') {
        pagination.style.display = 'none';
        return;
    }
    
    pagination.style.display = 'block';
    
    // Update prev/next buttons
    if (prevBtn) {
        prevBtn.disabled = currentPageChaimae === 1;
        prevBtn.style.opacity = currentPageChaimae === 1 ? '0.5' : '1';
        prevBtn.style.cursor = currentPageChaimae === 1 ? 'not-allowed' : 'pointer';
    }
    
    if (nextBtn) {
        nextBtn.disabled = currentPageChaimae === totalPages;
        nextBtn.style.opacity = currentPageChaimae === totalPages ? '0.5' : '1';
        nextBtn.style.cursor = currentPageChaimae === totalPages ? 'not-allowed' : 'pointer';
    }
    
    // Generate page numbers
    let pagesHTML = '';
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPageChaimae - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage < maxVisiblePages - 1) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    // First page
    if (startPage > 1) {
        pagesHTML += `<button onclick="goToPageChaimae(1)" style="padding: 0.5rem 0.75rem; background: #3e3e42; color: #ffffff; border: none; border-radius: 4px; cursor: pointer;">1</button>`;
        if (startPage > 2) {
            pagesHTML += `<span style="color: #cccccc; padding: 0 0.5rem;">...</span>`;
        }
    }
    
    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
        const isActive = i === currentPageChaimae;
        pagesHTML += `<button onclick="goToPageChaimae(${i})" style="padding: 0.5rem 0.75rem; background: ${isActive ? '#2196f3' : '#3e3e42'}; color: #ffffff; border: none; border-radius: 4px; cursor: pointer; font-weight: ${isActive ? '600' : 'normal'};">${i}</button>`;
    }
    
    // Last page
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            pagesHTML += `<span style="color: #cccccc; padding: 0 0.5rem;">...</span>`;
        }
        pagesHTML += `<button onclick="goToPageChaimae(${totalPages})" style="padding: 0.5rem 0.75rem; background: #3e3e42; color: #ffffff; border: none; border-radius: 4px; cursor: pointer;">${totalPages}</button>`;
    }
    
    pageNumbers.innerHTML = pagesHTML;
}

// Change items per page
window.changeItemsPerPageChaimae = function() {
    const select = document.getElementById('itemsPerPageChaimae');
    itemsPerPageChaimae = select.value;
    currentPageChaimae = 1;
    displayInvoicesChaimae(filteredInvoicesChaimae);
}

// Go to specific page
window.goToPageChaimae = function(page) {
    currentPageChaimae = page;
    displayInvoicesChaimae(filteredInvoicesChaimae);
}

// Change page (prev/next)
window.changePaginationPageChaimae = function(direction) {
    if (direction === 'prev' && currentPageChaimae > 1) {
        currentPageChaimae--;
    } else if (direction === 'next') {
        const totalItems = filteredInvoicesChaimae.length;
        const itemsPerPage = itemsPerPageChaimae === 'all' ? totalItems : parseInt(itemsPerPageChaimae);
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        if (currentPageChaimae < totalPages) {
            currentPageChaimae++;
        }
    }
    displayInvoicesChaimae(filteredInvoicesChaimae);
}

// Filter invoices
window.filterInvoicesChaimae = function() {
    const typeFilter = document.getElementById('filterTypeChaimae')?.value || '';
    const monthFilter = document.getElementById('filterMonthChaimae')?.value || '';
    const clientFilter = document.getElementById('filterClientChaimae')?.value || '';
    const searchType = document.getElementById('searchTypeChaimae')?.value || 'all';
    const searchText = document.getElementById('searchInputChaimae')?.value.toLowerCase() || '';
    
    const filtered = allInvoicesChaimae.filter(invoice => {
        // Type filter
        if (typeFilter && invoice.document_type !== typeFilter) return false;
        
        // Year filter (from card selection)
        if (selectedYearChaimae) {
            const invoiceYear = invoice.year || new Date(invoice.document_date).getFullYear();
            if (invoiceYear.toString() !== selectedYearChaimae) return false;
        }
        
        // Month filter
        if (monthFilter) {
            const invoiceMonth = String(new Date(invoice.document_date).getMonth() + 1).padStart(2, '0');
            if (invoiceMonth !== monthFilter) return false;
        }
        
        // Client filter
        if (clientFilter && invoice.client_nom !== clientFilter) return false;
        
        // Search filter
        if (searchText) {
            const numero = (invoice.document_numero || invoice.document_numero_devis || '').toLowerCase();
            const order = (invoice.document_numero_Order || '').toLowerCase();
            const bonLivraison = (invoice.document_bon_de_livraison || '').toLowerCase();
            const bonCommande = (invoice.document_numero_commande || '').toLowerCase();
            const client = invoice.client_nom.toLowerCase();
            const ice = (invoice.client_ice || '').toLowerCase();
            const totalTTC = (invoice.total_ttc || 0).toString();
            
            // Search in products
            const productsText = invoice.products ? 
                invoice.products.map(p => (p.designation || '').toLowerCase()).join(' ') : '';
            const pricesText = invoice.products ? 
                invoice.products.map(p => (p.prix_unitaire_ht || 0).toString()).join(' ') : '';
            
            switch (searchType) {
                case 'numero':
                    if (!numero.includes(searchText)) return false;
                    break;
                case 'order':
                    // Search in both Facture (document_numero_Order) and Bon de livraison (document_numero_commande)
                    if (!order.includes(searchText) && !bonCommande.includes(searchText)) return false;
                    break;
                case 'bon_livraison':
                    if (!bonLivraison.includes(searchText)) return false;
                    break;
                case 'bon_commande':
                    if (!bonCommande.includes(searchText)) return false;
                    break;
                case 'client':
                    if (!client.includes(searchText)) return false;
                    break;
                case 'ice':
                    if (!ice.includes(searchText)) return false;
                    break;
                case 'product':
                    if (!productsText.includes(searchText)) return false;
                    break;
                case 'price':
                    if (!pricesText.includes(searchText)) return false;
                    break;
                case 'total_ht':
                    // Search from the beginning of the number
                    const searchNumberHT = searchText.trim();
                    const totalHTStr = (invoice.total_ht || 0).toString();
                    
                    // Check if total HT starts with the search number
                    if (!totalHTStr.startsWith(searchNumberHT)) return false;
                    break;
                case 'total':
                    // Search from the beginning of the number
                    const searchNumber = searchText.trim();
                    const totalStr = (invoice.total_ttc || 0).toString();
                    
                    // Check if total starts with the search number
                    if (!totalStr.startsWith(searchNumber)) return false;
                    break;
                default:
                    // Search in ALL fields when "Tout" is selected
                    const totalHT = (invoice.total_ht || 0).toString();
                    
                    if (!numero.includes(searchText) && 
                        !order.includes(searchText) &&
                        !bonLivraison.includes(searchText) &&
                        !bonCommande.includes(searchText) &&
                        !client.includes(searchText) && 
                        !ice.includes(searchText) &&
                        !productsText.includes(searchText) &&
                        !pricesText.includes(searchText) &&
                        !totalHT.includes(searchText) &&
                        !totalTTC.includes(searchText)) {
                        return false;
                    }
            }
        }
        
        return true;
    });
    
    filteredInvoicesChaimae = filtered;
    currentPageChaimae = 1; // Reset to first page when filtering
    displayInvoicesChaimae(filtered);
}

// Reset filters
window.resetFiltersChaimae = function() {
    document.getElementById('filterTypeChaimae').value = '';
    document.getElementById('filterYearChaimae').value = '';
    document.getElementById('filterMonthChaimae').value = '';
    document.getElementById('filterClientChaimae').value = '';
    document.getElementById('searchTypeChaimae').value = 'all';
    document.getElementById('searchInputChaimae').value = '';
    
    filteredInvoicesChaimae = allInvoicesChaimae;
    displayInvoicesChaimae(allInvoicesChaimae);
}

// Sort table by column
let currentSortColumnChaimae = null;
let currentSortDirectionChaimae = 'asc';

window.sortTableChaimae = function(column) {
    // Toggle sort direction if clicking same column
    if (currentSortColumnChaimae === column) {
        currentSortDirectionChaimae = currentSortDirectionChaimae === 'asc' ? 'desc' : 'asc';
    } else {
        currentSortColumnChaimae = column;
        currentSortDirectionChaimae = 'asc';
    }
    
    // Update sort icons
    ['numero', 'date', 'total_ht', 'total_ttc'].forEach(col => {
        const icon = document.getElementById(`sortIcon${col.charAt(0).toUpperCase() + col.slice(1).replace('_', '')}Chaimae`);
        if (icon) {
            if (col === column) {
                icon.textContent = currentSortDirectionChaimae === 'asc' ? '↑' : '↓';
                icon.style.color = '#4caf50';
            } else {
                icon.textContent = '⇅';
                icon.style.color = '';
            }
        }
    });
    
    // Sort the filtered invoices
    const sorted = [...filteredInvoicesChaimae].sort((a, b) => {
        let valueA, valueB;
        
        switch (column) {
            case 'numero':
                // Extract numeric part from document number
                const getNumero = (inv) => {
                    const numero = inv.document_numero || inv.document_numero_devis || inv.document_numero_bl || '';
                    const match = numero.match(/\d+/);
                    return match ? parseInt(match[0]) : 0;
                };
                valueA = getNumero(a);
                valueB = getNumero(b);
                break;
                
            case 'date':
                valueA = new Date(a.document_date || 0).getTime();
                valueB = new Date(b.document_date || 0).getTime();
                break;
                
            case 'total_ht':
                valueA = parseFloat(a.total_ht || 0);
                valueB = parseFloat(b.total_ht || 0);
                break;
                
            case 'total_ttc':
                valueA = parseFloat(a.total_ttc || 0);
                valueB = parseFloat(b.total_ttc || 0);
                break;
                
            default:
                return 0;
        }
        
        if (currentSortDirectionChaimae === 'asc') {
            return valueA - valueB;
        } else {
            return valueB - valueA;
        }
    });
    
    // Update filtered invoices and display
    filteredInvoicesChaimae = sorted;
    currentPageChaimae = 1; // Reset to first page
    displayInvoicesChaimae(sorted);
    
    console.log(`📊 [CHAIMAE] Sorted by ${column} (${currentSortDirectionChaimae})`);
};

// Update select all checkbox
function updateSelectAllChaimae() {
    const selectAll = document.getElementById('selectAllChaimae');
    const checkboxes = document.querySelectorAll('.invoice-checkbox-chaimae');
    const checkedBoxes = document.querySelectorAll('.invoice-checkbox-chaimae:checked');
    
    if (selectAll && checkboxes.length > 0) {
        selectAll.checked = checkboxes.length === checkedBoxes.length;
        selectAll.indeterminate = checkedBoxes.length > 0 && checkedBoxes.length < checkboxes.length;
    }
    
    updateSelectedCountChaimae();
}

// Select all invoices
window.selectAllInvoicesChaimae = function() {
    const selectAll = document.getElementById('selectAllChaimae');
    const checkboxes = document.querySelectorAll('.invoice-checkbox-chaimae');
    
    checkboxes.forEach(cb => {
        cb.checked = selectAll.checked;
    });
    
    updateSelectedCountChaimae();
}

// Update selected count
function updateSelectedCountChaimae() {
    const checkedBoxes = document.querySelectorAll('.invoice-checkbox-chaimae:checked');
    const count = checkedBoxes.length;
    
    // Check if all selected are Bon de livraison from same client
    let allBonsFromSameClient = false;
    let selectedClient = null;
    let bonCount = 0;
    
    if (count > 0) {
        const selectedIds = Array.from(checkedBoxes).map(cb => parseInt(cb.dataset.invoiceId));
        const selectedInvoices = filteredInvoicesChaimae.filter(inv => selectedIds.includes(inv.id));
        
        // Check if all are bon_livraison
        const allAreBons = selectedInvoices.every(inv => inv.document_type === 'bon_livraison');
        
        if (allAreBons && selectedInvoices.length > 0) {
            selectedClient = selectedInvoices[0].client_nom;
            allBonsFromSameClient = selectedInvoices.every(inv => inv.client_nom === selectedClient);
            bonCount = selectedInvoices.length;
        }
    }
    
    // Update button text with count
    const deleteBtn = document.getElementById('bulkDeleteTextChaimae');
    const downloadBtn = document.getElementById('bulkDownloadTextChaimae');
    
    if (deleteBtn) {
        deleteBtn.textContent = count > 0 ? `Supprimer (${count})` : 'Supprimer';
    }
    if (downloadBtn) {
        downloadBtn.textContent = count > 0 ? `Télécharger (${count})` : 'Télécharger';
    }
}

// View invoice
window.viewInvoiceChaimae = async function(id, documentType) {
    try {
        // Check if this is a global invoice
        if (documentType === 'facture_globale') {
            viewGlobalInvoiceChaimae(id);
            return;
        }
        
        const result = await window.electron.dbChaimae.getInvoiceById(id);
        
        if (!result.success || !result.data) {
            window.notify.error('Erreur', 'Document introuvable', 3000);
            return;
        }
        
        const invoice = result.data;
        const date = new Date(invoice.document_date).toLocaleDateString('fr-FR');
        const typeLabel = invoice.document_type === 'facture' ? 'Facture' : 
                         invoice.document_type === 'devis' ? 'Devis' : 
                         'Bon de livraison';
        const docNumber = invoice.document_numero || invoice.document_numero_devis || invoice.document_numero_bl || '-';
        
        const overlay = document.createElement('div');
        overlay.className = 'invoice-view-overlay';
        overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.85);z-index:9999;display:flex;align-items:center;justify-content:center;padding:2rem;';
        
        const modal = document.createElement('div');
        modal.style.cssText = 'background:#2d2d30;border-radius:16px;max-width:900px;width:100%;max-height:90vh;overflow-y:auto;box-shadow:0 25px 50px rgba(0,0,0,0.5);';
        
        modal.innerHTML = `
            <div style="background:#1e1e1e;padding:1.5rem 2rem;border-radius:16px 16px 0 0;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #3e3e42;">
                <div style="display:flex;align-items:center;gap:1rem;">
                    <svg width="24" height="24" viewBox="0 0 16 16" fill="currentColor" style="color:#fff;">
                        <path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z"/>
                    </svg>
                    <h2 style="color:#fff;margin:0;font-size:1.3rem;font-weight:600;">Détails du ${typeLabel} #${docNumber}</h2>
                </div>
                <div style="display:flex;align-items:center;gap:1rem;">
                    <button onclick="downloadInvoicePDFChaimae(${id})" style="padding:0.6rem 1.2rem;background:#2196F3;color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:0.9rem;font-weight:600;display:flex;align-items:center;gap:0.5rem;transition:all 0.2s;" onmouseover="this.style.background='#1976D2'" onmouseout="this.style.background='#2196F3'">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                        </svg>
                        Télécharger PDF
                    </button>
                    <button onclick="downloadBonDeTravauxPDFChaimae(${id})" style="padding:0.6rem 1.2rem;background:#E91E63;color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:0.9rem;font-weight:600;display:flex;align-items:center;gap:0.5rem;transition:all 0.2s;" onmouseover="this.style.background='#C2185B'" onmouseout="this.style.background='#E91E63'">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                        </svg>
                        Télécharger Bon de travaux
                    </button>
                    <button id="closeViewModal" style="background:none;border:none;color:#999;cursor:pointer;font-size:1.5rem;padding:0;width:32px;height:32px;display:flex;align-items:center;justify-content:center;border-radius:4px;transition:all 0.2s;" onmouseover="this.style.background='#3e3e42';this.style.color='#fff'" onmouseout="this.style.background='none';this.style.color='#999'">×</button>
                </div>
            </div>
            
            <div style="padding:2rem;">
                <!-- Client Section -->
                <div style="margin-bottom:2rem;">
                    <h3 style="color:#fff;font-size:1.1rem;margin:0 0 1rem 0;font-weight:600;">Client</h3>
                    <div style="background:#1e1e1e;padding:1rem;border-radius:8px;">
                        <div style="margin-bottom:0.75rem;">
                            <span style="color:#999;font-size:0.9rem;">Nom:</span>
                            <div style="color:#fff;font-weight:500;margin-top:0.25rem;">${invoice.client_nom}</div>
                        </div>
                        <div>
                            <span style="color:#999;font-size:0.9rem;">ICE:</span>
                            <div style="color:#fff;font-weight:500;margin-top:0.25rem;">${invoice.client_ice}</div>
                        </div>
                    </div>
                </div>
                
                <!-- Document Section -->
                <div style="margin-bottom:2rem;">
                    <h3 style="color:#fff;font-size:1.1rem;margin:0 0 1rem 0;font-weight:600;">Document</h3>
                    <div style="background:#1e1e1e;padding:1rem;border-radius:8px;">
                        <div style="margin-bottom:0.75rem;">
                            <span style="color:#999;font-size:0.9rem;">Type:</span>
                            <div style="color:#fff;font-weight:500;margin-top:0.25rem;">${typeLabel}</div>
                        </div>
                        <div style="margin-bottom:0.75rem;">
                            <span style="color:#999;font-size:0.9rem;">N°:</span>
                            <div style="color:#fff;font-weight:500;margin-top:0.25rem;">${docNumber}</div>
                        </div>
                        ${invoice.document_type === 'facture' && invoice.document_numero_Order ? `
                        <div style="margin-bottom:0.75rem;">
                            <span style="color:#999;font-size:0.9rem;">N° Order:</span>
                            <div style="color:#fff;font-weight:500;margin-top:0.25rem;">${invoice.document_numero_Order}</div>
                        </div>
                        ` : ''}
                        ${invoice.document_type === 'facture' && invoice.document_bon_de_livraison ? `
                        <div style="margin-bottom:0.75rem;">
                            <span style="color:#999;font-size:0.9rem;">Bon de livraison:</span>
                            <div style="color:#fff;font-weight:500;margin-top:0.25rem;">${invoice.document_bon_de_livraison}</div>
                        </div>
                        ` : ''}
                        ${invoice.document_type === 'bon_livraison' && invoice.document_numero_commande ? `
                        <div style="margin-bottom:0.75rem;">
                            <span style="color:#999;font-size:0.9rem;">N° Order:</span>
                            <div style="color:#fff;font-weight:500;margin-top:0.25rem;">${invoice.document_numero_commande}</div>
                        </div>
                        ` : ''}
                        <div>
                            <span style="color:#999;font-size:0.9rem;">Date:</span>
                            <div style="color:#fff;font-weight:500;margin-top:0.25rem;">${date}</div>
                        </div>
                    </div>
                </div>
                
                <!-- Products Section -->
                <div style="margin-bottom:2rem;">
                    <h3 style="color:#fff;font-size:1.1rem;margin:0 0 1rem 0;font-weight:600;">Produits</h3>
                    <div style="background:#1e1e1e;border-radius:8px;overflow:hidden;">
                        <table style="width:100%;border-collapse:collapse;">
                            <thead>
                                <tr style="background:#252526;border-bottom:1px solid #3e3e42;">
                                    <th style="padding:0.75rem;text-align:left;color:#999;font-weight:500;font-size:0.85rem;">Désignation</th>
                                    <th style="padding:0.75rem;text-align:center;color:#999;font-weight:500;font-size:0.85rem;">Quantité</th>
                                    <th style="padding:0.75rem;text-align:right;color:#999;font-weight:500;font-size:0.85rem;">Prix unitaire HT</th>
                                    <th style="padding:0.75rem;text-align:right;color:#999;font-weight:500;font-size:0.85rem;">Total HT</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${invoice.products.map((p, idx) => `
                                    <tr style="border-bottom:1px solid #3e3e42;">
                                        <td style="padding:0.75rem;color:#fff;max-width:300px;word-wrap:break-word;white-space:normal;overflow-wrap:break-word;">${p.designation}</td>
                                        <td style="padding:0.75rem;text-align:center;color:#fff;white-space:nowrap;">${p.quantite}</td>
                                        <td style="padding:0.75rem;text-align:right;color:#fff;white-space:nowrap;">${formatNumberChaimae(parseFloat(p.prix_unitaire_ht))} DH</td>
                                        <td style="padding:0.75rem;text-align:right;color:#fff;font-weight:500;white-space:nowrap;">${formatNumberChaimae(parseFloat(p.total_ht))} DH</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
                
                <!-- Totals Section -->
                <div style="margin-bottom:2rem;">
                    <h3 style="color:#fff;font-size:1.1rem;margin:0 0 1rem 0;font-weight:600;">Totaux</h3>
                    <div style="background:#1e1e1e;padding:1rem;border-radius:8px;">
                        <div style="display:flex;justify-content:space-between;margin-bottom:0.75rem;">
                            <span style="color:#999;">Total HT:</span>
                            <span style="color:#fff;font-weight:600;">${formatNumberChaimae(invoice.total_ht)} DH</span>
                        </div>
                        <div style="display:flex;justify-content:space-between;margin-bottom:0.75rem;">
                            <span style="color:#999;">TVA (${invoice.tva_rate}%):</span>
                            <span style="color:#fff;font-weight:600;">${formatNumberChaimae(invoice.montant_tva)} DH</span>
                        </div>
                        <div style="display:flex;justify-content:space-between;padding-top:0.75rem;border-top:1px solid #3e3e42;">
                            <span style="color:#fff;font-weight:600;">Total TTC:</span>
                            <span style="color:#4CAF50;font-weight:700;font-size:1.1rem;">${formatNumberChaimae(invoice.total_ttc)} DH</span>
                        </div>
                    </div>
                </div>
                
                <!-- Notes Section -->
                <div style="margin-bottom:2rem;" id="notesSection${id}">
                    <h3 style="color:#fff;font-size:1.1rem;margin:0 0 1rem 0;font-weight:600;">📝 Notes</h3>
                    <div style="background:#1e1e1e;padding:1rem;border-radius:8px;">
                        <div style="color:#999;font-size:0.9rem;font-style:italic;">Chargement...</div>
                    </div>
                </div>
                
                <!-- Attachments Section -->
                <div>
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;">
                        <h3 style="color:#fff;font-size:1.1rem;margin:0;font-weight:600;"> Pièces jointes(${invoice.attachments ? invoice.attachments.length : 0})</h3>
                        <button onclick="addNewAttachmentChaimae(${id})" style="padding:0.5rem 1rem;background:#4CAF50;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:0.85rem;font-weight:600;display:flex;align-items:center;gap:0.5rem;transition:all 0.2s;" onmouseover="this.style.background='#45a049'" onmouseout="this.style.background='#4CAF50'">
                            ➕ Ajouter
                        </button>
                    </div>
                    ${invoice.attachments && invoice.attachments.length > 0 ? `
                        <div style="background:#1e1e1e;border-radius:8px;padding:1rem;">
                            ${invoice.attachments.map(a => `
                                <div style="display:flex;justify-content:space-between;align-items:center;padding:0.75rem;background:#252526;border-radius:6px;margin-bottom:0.5rem;">
                                    <div style="display:flex;align-items:center;gap:1rem;">
                                        <span style="font-size:1.5rem;">${a.file_type.includes('pdf') ? '📄' : '🖼️'}</span>
                                        <div>
                                            <div style="color:#fff;font-weight:500;">${a.filename}</div>
                                            <div style="color:#999;font-size:0.85rem;">${(a.file_size / 1024).toFixed(2)} KB</div>
                                        </div>
                                    </div>
                                    <div style="display:flex;gap:0.5rem;">
                                        <button onclick="openAttachmentChaimae(${a.id})" style="padding:0.4rem 0.8rem;background:#2196F3;color:#fff;border:none;border-radius:4px;cursor:pointer;font-size:0.8rem;">
                                            👁️ Ouvrir
                                        </button>
                                        <button onclick="deleteAttachmentChaimae(${a.id}, ${id})" style="padding:0.4rem 0.8rem;background:#f44336;color:#fff;border:none;border-radius:4px;cursor:pointer;font-size:0.8rem;display:flex;align-items:center;gap:0.4rem;">
                                            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                            </svg>
                                            Supprimer
                                        </button>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    ` : '<p style="color:#999;text-align:center;padding:2rem;background:#1e1e1e;border-radius:8px;">Aucune pièce jointe</p>'}
                </div>
            </div>
        `;
        
        overlay.appendChild(modal);
        document.body.appendChild(overlay);
        
        document.getElementById('closeViewModal').onclick = () => overlay.remove();
        overlay.onclick = (e) => {
            if (e.target === overlay) overlay.remove();
        };
        
        // Load notes asynchronously
        console.log('📝 [NOTES VIEW] Loading notes for invoice:', id);
        const noteResult = await window.electron.dbChaimae.getNote(id);
        console.log('📥 [NOTES VIEW] Note result:', noteResult);
        const notesSection = document.getElementById(`notesSection${id}`);
        if (notesSection) {
            const notesContent = notesSection.querySelector('div > div');
            if (noteResult.success && noteResult.data) {
                console.log('✅ [NOTES VIEW] Displaying note:', noteResult.data);
                notesContent.style.color = '#fff';
                notesContent.style.fontStyle = 'normal';
                notesContent.style.whiteSpace = 'pre-wrap';
                notesContent.textContent = noteResult.data;
            } else {
                console.log('ℹ️ [NOTES VIEW] No note found');
                notesContent.textContent = 'Aucune note';
            }
        }
        
    } catch (error) {
        console.error('Error viewing invoice:', error);
        window.notify.error('Erreur', 'Impossible de charger les détails', 3000);
    }
}

// Edit invoice
window.editInvoiceChaimae = async function(id) {
    try {
        console.log('✏️ Editing invoice:', id);
        
        // Load clients if not already loaded
        if (!allClientsChaimae || allClientsChaimae.length === 0) {
            console.log('🔄 Loading clients for edit modal...');
            await loadAllClientsChaimae();
        }
        
        const result = await window.electron.dbChaimae.getInvoiceById(id);
        
        if (!result.success || !result.data) {
            throw new Error('Document introuvable');
        }
        
        const invoice = result.data;
        
        // Determine document type labels
        const isDevis = invoice.document_type === 'devis';
        const isBonLivraison = invoice.document_type === 'bon_livraison';
        let docTypeLabel = 'Facture';
        let docNumeroLabel = 'N° Facture';
        let docNumeroValue = invoice.document_numero || '';
        
        if (isDevis) {
            docTypeLabel = 'Devis';
            docNumeroLabel = 'N° Devis';
            docNumeroValue = invoice.document_numero_devis || invoice.document_numero || '';
        } else if (isBonLivraison) {
            docTypeLabel = 'Bon de livraison';
            docNumeroLabel = 'N° Bon de livraison';
            docNumeroValue = invoice.document_numero_bl || invoice.document_numero || '';
        }
        
        // Create edit modal
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content invoice-edit-modal" style="max-width: 900px;">
                <div class="modal-header">
                    <h2>✏️ Modifier ${docTypeLabel} #${invoice.id}</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">✕</button>
                </div>
                <div class="modal-body">
                    <form id="editInvoiceFormChaimae">
                        <!-- Client Info -->
                        <div class="edit-section">
                            <h3>Client</h3>
                            <div class="form-row">
                                <div class="form-field" style="position: relative;">
                                    <label>Nom du client</label>
                                    <input type="text" id="editClientNomChaimae" value="${invoice.client_nom}" required
                                           autocomplete="off" oninput="searchClientsEditChaimae(this.value)" 
                                           onfocus="showClientsListEditChaimae()" onblur="hideClientsListEditChaimae()">
                                    <div id="clientsDropdownEditChaimae" class="clients-dropdown" style="display: none;"></div>
                                </div>
                                <div class="form-field">
                                    <label>N° ICE</label>
                                    <input type="text" id="editClientICEChaimae" value="${invoice.client_ice}">
                                </div>
                            </div>
                        </div>
                        
                        <!-- Document Info -->
                        <div class="edit-section">
                            <h3>Document</h3>
                            <div class="form-row">
                                <div class="form-field">
                                    <label>Date</label>
                                    <input type="date" id="editDateChaimae" value="${invoice.document_date}" required>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-field">
                                    <label id="editNumeroLabelChaimae">${docNumeroLabel}</label>
                                    ${isBonLivraison ? `
                                    <div style="display: flex; gap: 0.5rem; align-items: center;">
                                        <div style="position: relative; flex: 0 0 auto;">
                                            <input type="text" id="editPrefixInputChaimae" value="${docNumeroValue.split(/[0-9]/)[0] || 'MG'}" placeholder="MG" 
                                                   style="width: 80px; padding: 0.75rem; background: #2d2d30; border: 2px solid #3e3e42; border-radius: 8px; color: #fff; font-size: 1rem; outline: none; cursor: pointer; font-weight: 600;"
                                                   readonly onclick="toggleEditPrefixDropdownChaimae()">
                                            <div id="editPrefixDropdownChaimae" style="display: none; position: absolute; top: 100%; left: 0; background: linear-gradient(135deg, #1e1e1e 0%, #2d2d30 100%); border: 2px solid #667eea; border-radius: 12px; margin-top: 0.5rem; box-shadow: 0 8px 24px rgba(102, 126, 234, 0.3); z-index: 1000; min-width: 200px; max-height: 350px; overflow: hidden;">
                                                <div style="padding: 0.75rem 1rem; background: linear-gradient(90deg, #667eea 0%, #764ba2 100%); border-bottom: 2px solid rgba(102, 126, 234, 0.3);">
                                                    <h4 style="margin: 0; color: #fff; font-size: 0.95rem; font-weight: 600;">📋 Choisir un Prefix</h4>
                                                </div>
                                                <div id="editPrefixListChaimae" style="max-height: 200px; overflow-y: auto; padding: 0.5rem;"></div>
                                                <div style="padding: 0.75rem; border-top: 2px solid rgba(102, 126, 234, 0.2); background: rgba(0,0,0,0.2);">
                                                    <input type="text" id="editNewPrefixInputChaimae" placeholder="Nouveau prefix (ex: AB)" 
                                                           style="width: 100%; padding: 0.65rem; background: #1e1e1e; border: 2px solid #3e3e42; border-radius: 6px; color: #fff; font-size: 0.9rem; outline: none;"
                                                           onkeypress="if(event.key==='Enter'){addEditPrefixChaimae(); event.preventDefault();}">
                                                    <button type="button" onclick="addEditPrefixChaimae()" 
                                                            style="width: 100%; margin-top: 0.5rem; padding: 0.65rem; background: linear-gradient(90deg, #667eea 0%, #764ba2 100%); color: #fff; border: none; border-radius: 6px; cursor: pointer; font-size: 0.9rem; font-weight: 600;">
                                                        ➕ Ajouter le Prefix
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <input type="text" id="editNumeroChaimae" value="${docNumeroValue.replace(/^[A-Z]+/, '')}" placeholder="123/2025" required
                                               style="flex: 1; padding: 0.75rem; background: #2d2d30; border: 2px solid #3e3e42; border-radius: 8px; color: #fff; font-size: 1rem; outline: none; font-weight: 600;"
                                               onblur="autoFormatDocumentNumberOnBlurChaimae(this)">
                                    </div>
                                    ` : `
                                    <input type="text" id="editNumeroChaimae" value="${docNumeroValue}" placeholder="123/2025" required
                                           style="width: 100%; padding: 0.75rem; background: #2d2d30; border: 2px solid #3e3e42; border-radius: 8px; color: #fff; font-size: 1rem; outline: none; font-weight: 600;"
                                           onblur="autoFormatDocumentNumberOnBlurChaimae(this)">
                                    `}
                                </div>
                            </div>
                            ${invoice.document_type === 'facture' ? `
                            <div class="form-row">
                                <div class="form-field">
                                    <label>N° Order (optionnel)</label>
                                    <input type="text" id="editNumeroOrderChaimae" value="${invoice.document_numero_Order || ''}" placeholder="Ex: 123">
                                </div>
                                <div class="form-field">
                                    <label>Bon de livraison (optionnel)</label>
                                    <input type="text" id="editBonLivraisonChaimae" value="${invoice.document_bon_de_livraison || ''}" placeholder="Ex: 123">
                                </div>
                            </div>
                            ` : ''}
                            ${invoice.document_type === 'bon_livraison' ? `
                            <div class="form-row">
                                <div class="form-field" style="position: relative;">
                                    <label>N° Order (optionnel)</label>
                                    <div style="display: flex; gap: 0.5rem; align-items: flex-start;">
                                        <div style="position: relative; flex: 0 0 auto;">
                                            <input type="text" id="editOrderPrefixInputChaimae" value="${window.selectedOrderPrefix || 'BC'}" placeholder="BC" 
                                                   style="width: 80px; padding: 0.75rem; background: #2d2d30; border: 2px solid #3e3e42; border-radius: 8px; color: #fff; font-size: 1rem; outline: none; cursor: pointer; font-weight: 600;"
                                                   readonly onclick="toggleEditOrderPrefixDropdownChaimae()">
                                            <div id="editOrderPrefixDropdownChaimae" style="display: none; position: absolute; top: 100%; left: 0; background: linear-gradient(135deg, #1e1e1e 0%, #2d2d30 100%); border: 2px solid #2196f3; border-radius: 12px; margin-top: 0.5rem; box-shadow: 0 8px 24px rgba(33, 150, 243, 0.3), 0 0 0 1px rgba(33, 150, 243, 0.1); z-index: 1000; min-width: 200px; max-height: 350px; overflow: hidden;">
                                                <div style="padding: 0.75rem 1rem; background: linear-gradient(90deg, #2196f3 0%, #1976d2 100%); border-bottom: 2px solid rgba(33, 150, 243, 0.3);">
                                                    <h4 style="margin: 0; color: #fff; font-size: 0.95rem; font-weight: 600; letter-spacing: 0.5px;">📋 Choisir un Prefix</h4>
                                                </div>
                                                <div id="editOrderPrefixListChaimae" style="max-height: 200px; overflow-y: auto; padding: 0.5rem;"></div>
                                                <div style="padding: 0.75rem; border-top: 2px solid rgba(33, 150, 243, 0.2); background: rgba(0,0,0,0.2);">
                                                    <input type="text" id="editNewOrderPrefixInputChaimae" placeholder="Nouveau prefix (ex: BC)" 
                                                           style="width: 100%; padding: 0.65rem; background: #1e1e1e; border: 2px solid #3e3e42; border-radius: 6px; color: #fff; font-size: 0.9rem; outline: none; transition: all 0.3s;"
                                                           onfocus="this.style.borderColor='#2196f3'; this.style.boxShadow='0 0 0 3px rgba(33, 150, 243, 0.1)';"
                                                           onblur="this.style.borderColor='#3e3e42'; this.style.boxShadow='none';"
                                                           onkeypress="if(event.key==='Enter'){addEditNewOrderPrefixChaimae(); event.preventDefault();}">
                                                    <button type="button" onclick="addEditNewOrderPrefixChaimae()" 
                                                            style="width: 100%; margin-top: 0.5rem; padding: 0.65rem; background: linear-gradient(90deg, #2196f3 0%, #1976d2 100%); color: #fff; border: none; border-radius: 6px; cursor: pointer; font-size: 0.9rem; font-weight: 600; transition: all 0.3s; box-shadow: 0 2px 8px rgba(33, 150, 243, 0.3);"
                                                            onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 12px rgba(33, 150, 243, 0.4)';"
                                                            onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 8px rgba(33, 150, 243, 0.3)';">
                                                        ➕ Ajouter le Prefix
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <input type="text" id="editBonCommandeChaimae" value="${invoice.document_numero_commande || ''}" placeholder="456" 
                                               style="flex: 1; padding: 0.75rem; background: #2d2d30; border: 2px solid #3e3e42; border-radius: 8px; color: #fff; font-size: 1rem; outline: none;">
                                    </div>
                                    <small style="color: #999; font-size: 0.85rem; display: block; margin-top: 0.5rem;">Ex: 456 → <span id="editOrderPrefixExampleChaimae">BC</span>456</small>
                                </div>
                            </div>
                            ` : ''}
                        </div>
                        
                        <!-- Products -->
                        <div class="edit-section">
                            <h3>Produits</h3>
                            <div id="editProductsListChaimae">
                                ${invoice.products && invoice.products.length > 0 ? invoice.products.map((p, index) => `
                                    <div class="edit-product-row" data-index="${index}">
                                        <textarea placeholder="Désignation" rows="2" onkeydown="handleArrowNavigationEditChaimae(event, 0)">${p.designation || ''}</textarea>
                                        <input type="text" placeholder="Quantité" value="${p.quantite || ''}" onchange="recalculateEditTotalsChaimae()" onkeydown="handleArrowNavigationEditChaimae(event, 1)">
                                        <input type="number" step="0.01" placeholder="Prix HT" value="${p.prix_unitaire_ht || 0}" onchange="recalculateEditTotalsChaimae()" onkeydown="handleArrowNavigationEditChaimae(event, 2)">
                                        <button type="button" onclick="this.closest('.edit-product-row').remove(); recalculateEditTotalsChaimae()">
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                            </svg>
                                        </button>
                                    </div>
                                `).join('') : '<p style="color: #888; text-align: center; padding: 1rem;">Aucun produit</p>'}
                            </div>
                            <button type="button" class="btn-add-product" onclick="addEditProductRowChaimae()">+ Ajouter un produit</button>
                        </div>
                        
                        <!-- Totals -->
                        <div class="edit-section">
                            <h3>Totaux</h3>
                            <div class="form-row">
                                <div class="form-field">
                                    <label>Taux TVA (%)</label>
                                    <input type="number" id="editTvaRateChaimae" value="${invoice.tva_rate}" min="0" max="100" onchange="recalculateEditTotalsChaimae()">
                                </div>
                            </div>
                            <div class="totals-display">
                                <p><strong>Total HT:</strong> <span id="editTotalHTChaimae">${formatNumberChaimae(invoice.total_ht)} DH</span></p>
                                <p><strong>TVA:</strong> <span id="editMontantTVAChaimae">${formatNumberChaimae(invoice.montant_tva)} DH</span></p>
                                <p><strong>Total TTC:</strong> <span id="editTotalTTCChaimae">${formatNumberChaimae(invoice.total_ttc)} DH</span></p>
                            </div>
                        </div>
                        
                        <!-- Notes Section -->
                        <div class="edit-section">
                            <h3>📝 Notes</h3>
                            <div class="form-field">
                                <label>Notes supplémentaires (optionnel)</label>
                                <textarea id="editNotesChaimae" rows="4" 
                                          placeholder="Ajoutez des notes ou remarques concernant cette facture..."
                                          style="width: 100%; padding: 0.75rem; background: #2d2d30; border: 2px solid #3e3e42; border-radius: 8px; color: #fff; font-size: 0.95rem; resize: vertical; font-family: inherit;"></textarea>
                                <small style="color: #999; font-size: 0.85rem; display: block; margin-top: 0.5rem;">
                                    Ces notes seront affichées dans le PDF sous le texte de clôture de la facture.
                                </small>
                            </div>
                        </div>
                        
                        <div class="form-actions" style="margin-top: 2rem; display: flex; justify-content: space-between; align-items: center;">
                            <button type="button" class="btn-convert" onclick="convertInvoiceTypeChaimae(${invoice.id}, '${invoice.document_type}')" style="background: #9c27b0; color: white; padding: 0.75rem 1.5rem; border: none; border-radius: 6px; cursor: pointer; font-weight: 500; display: flex; align-items: center; gap: 0.5rem;">
                                🔄 Convertir
                            </button>
                            <div style="display: flex; gap: 1rem;">
                                <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">Annuler</button>
                                <button type="submit" class="btn-primary">💾 Enregistrer</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Attach form submit handler - pass invoice data including document_type
        document.getElementById('editInvoiceFormChaimae').addEventListener('submit', (e) => handleEditSubmitChaimae(e, id, invoice.document_type));
        
        // Initial calculation
        recalculateEditTotalsChaimae();
        
        // Load notes asynchronously
        console.log('📝 [NOTES EDIT] Loading notes for invoice:', id);
        const noteResult = await window.electron.dbChaimae.getNote(id);
        console.log('📥 [NOTES EDIT] Note result:', noteResult);
        if (noteResult.success && noteResult.data) {
            const notesTextarea = document.getElementById('editNotesChaimae');
            if (notesTextarea) {
                notesTextarea.value = noteResult.data;
                console.log('✅ [NOTES EDIT] Loaded note into textarea:', noteResult.data);
            }
        } else {
            console.log('ℹ️ [NOTES EDIT] No note found for this invoice');
        }
        
    } catch (error) {
        console.error('Error editing invoice:', error);
        window.notify.error('Erreur', 'Impossible de charger le document', 3000);
    }
}

// Handle arrow key navigation in edit modal products (Global)
window.handleArrowNavigationEditChaimae = function(event, currentCellIndex) {
    // Only handle arrow keys
    if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
        return;
    }
    
    const currentRow = event.target.closest('.edit-product-row');
    const container = document.getElementById('editProductsListChaimae');
    const allRows = Array.from(container.querySelectorAll('.edit-product-row'));
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
            addEditProductRowChaimae();
            setTimeout(() => {
                const newRows = Array.from(container.querySelectorAll('.edit-product-row'));
                targetRow = newRows[newRows.length - 1];
                focusCellEditChaimae(targetRow, targetCellIndex);
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
        focusCellEditChaimae(targetRow, targetCellIndex);
    }
};

// Helper function to focus a specific cell in edit modal
function focusCellEditChaimae(row, cellIndex) {
    const inputs = row.querySelectorAll('textarea, input[type="text"], input[type="number"]');
    if (inputs[cellIndex]) {
        inputs[cellIndex].focus();
        // For text inputs, move cursor to end
        if (inputs[cellIndex].type === 'text' || inputs[cellIndex].tagName === 'TEXTAREA') {
            const length = inputs[cellIndex].value.length;
            inputs[cellIndex].setSelectionRange(length, length);
        } else if (inputs[cellIndex].type === 'number') {
            inputs[cellIndex].select();
        }
    }
}

// Add product row in edit modal
window.addEditProductRowChaimae = function() {
    const container = document.getElementById('editProductsListChaimae');
    // Remove "no products" message if exists
    const noProductsMsg = container.querySelector('p');
    if (noProductsMsg) noProductsMsg.remove();
    
    const row = document.createElement('div');
    row.className = 'edit-product-row';
    row.innerHTML = `
        <textarea placeholder="Désignation" rows="2" onkeydown="handleArrowNavigationEditChaimae(event, 0)"></textarea>
        <input type="text" placeholder="Quantité" onchange="recalculateEditTotalsChaimae()" onkeydown="handleArrowNavigationEditChaimae(event, 1)">
        <input type="number" step="0.01" placeholder="Prix HT" value="0" onchange="recalculateEditTotalsChaimae()" onkeydown="handleArrowNavigationEditChaimae(event, 2)">
        <button type="button" onclick="this.closest('.edit-product-row').remove(); recalculateEditTotalsChaimae()">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
            </svg>
        </button>
    `;
    container.appendChild(row);
}

// Bon de livraison field - No auto-formatting (user enters value as-is)

// Recalculate totals in edit modal
window.recalculateEditTotalsChaimae = function() {
    const rows = document.querySelectorAll('#editProductsListChaimae .edit-product-row');
    let totalHT = 0;
    
    rows.forEach(row => {
        const qty = parseFloat(row.querySelector('input[type="text"]').value) || 1;
        const price = parseFloat(row.querySelector('input[type="number"]').value) || 0;
        totalHT += qty * price;
    });
    
    const tvaRate = parseFloat(document.getElementById('editTvaRateChaimae').value) || 0;
    const montantTVA = totalHT * (tvaRate / 100);
    const totalTTC = totalHT + montantTVA;
    
    // Use simple format without spaces in edit modal
    document.getElementById('editTotalHTChaimae').textContent = totalHT.toFixed(2) + ' DH';
    document.getElementById('editMontantTVAChaimae').textContent = montantTVA.toFixed(2) + ' DH';
    document.getElementById('editTotalTTCChaimae').textContent = totalTTC.toFixed(2) + ' DH';
}

// Toggle edit prefix dropdown
window.toggleEditPrefixDropdownChaimae = async function() {
    const dropdown = document.getElementById('editPrefixDropdownChaimae');
    if (!dropdown) return;
    
    if (dropdown.style.display === 'none') {
        // Load prefixes from DB if not loaded
        if (!window.prefixesLoaded) {
            await loadPrefixesFromDB();
        }
        dropdown.style.display = 'block';
        renderEditPrefixListChaimae();
    } else {
        dropdown.style.display = 'none';
    }
};

// Render edit prefix list
window.renderEditPrefixListChaimae = function() {
    const listContainer = document.getElementById('editPrefixListChaimae');
    if (!listContainer) return;
    
    const currentPrefix = document.getElementById('editPrefixInputChaimae').value;
    
    listContainer.innerHTML = window.bonLivraisonPrefixes.map(prefix => `
        <div onclick="selectEditPrefixChaimae('${prefix}')" 
             style="padding: 0.75rem 1rem; margin: 0.25rem 0; background: ${prefix === currentPrefix ? 'rgba(102, 126, 234, 0.3)' : 'rgba(255,255,255,0.05)'}; border: 2px solid ${prefix === currentPrefix ? '#667eea' : 'transparent'}; border-radius: 8px; cursor: pointer; transition: all 0.3s; display: flex; justify-content: space-between; align-items: center;"
             onmouseover="if('${prefix}' !== '${currentPrefix}') { this.style.background='rgba(102, 126, 234, 0.2)'; this.style.borderColor='#667eea'; }" 
             onmouseout="if('${prefix}' !== '${currentPrefix}') { this.style.background='rgba(255,255,255,0.05)'; this.style.borderColor='transparent'; }">
            <div style="display: flex; align-items: center; gap: 0.75rem;">
                <span style="font-size: 1.2rem;">${prefix === currentPrefix ? '✓' : '📌'}</span>
                <span style="font-weight: ${prefix === currentPrefix ? '700' : '500'}; font-size: 1rem; letter-spacing: 1px; color: #fff;">${prefix}</span>
            </div>
            ${window.bonLivraisonPrefixes.length > 1 ? `
                <button onclick="event.stopPropagation(); deleteEditPrefixChaimae('${prefix}')" 
                        style="background: transparent; color: #e74c3c; border: 2px solid #e74c3c; border-radius: 6px; padding: 0.3rem 0.4rem; cursor: pointer; font-size: 0.9rem; font-weight: 600; transition: all 0.3s;"
                        onmouseover="this.style.background='#e74c3c'; this.style.color='#fff';"
                        onmouseout="this.style.background='transparent'; this.style.color='#e74c3c';">
                    🗑️
                </button>
            ` : ''}
        </div>
    `).join('');
};

// Select edit prefix
window.selectEditPrefixChaimae = function(prefix) {
    console.log('🔵 [EDIT PREFIX SELECT] Selecting prefix:', prefix);
    
    const prefixInput = document.getElementById('editPrefixInputChaimae');
    if (prefixInput) {
        prefixInput.value = prefix;
        console.log('✅ [EDIT PREFIX SELECT] Updated editPrefixInputChaimae to:', prefix);
    } else {
        console.log('❌ [EDIT PREFIX SELECT] editPrefixInputChaimae not found');
    }
    
    const dropdown = document.getElementById('editPrefixDropdownChaimae');
    if (dropdown) {
        dropdown.style.display = 'none';
        console.log('✅ [EDIT PREFIX SELECT] Closed dropdown');
    }
    
    console.log('✅ [CHAIMAE EDIT] Prefix selected:', prefix);
};

// Add new prefix in edit
window.addEditPrefixChaimae = async function() {
    const newPrefixInput = document.getElementById('editNewPrefixInputChaimae');
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
        
        renderEditPrefixListChaimae();
        window.notify.success('Succès', `Prefix "${newPrefix}" ajouté`, 2000);
    } else {
        window.notify.error('Erreur', result.error || 'Impossible d\'ajouter le prefix', 3000);
    }
};

// Delete prefix in edit
window.deleteEditPrefixChaimae = async function(prefix) {
    if (window.bonLivraisonPrefixes.length <= 1) {
        window.notify.warning('Attention', 'Vous devez garder au moins un prefix', 2000);
        return;
    }
    
    // Delete from database
    const result = await window.electron.dbChaimae.deletePrefix(prefix);
    
    if (result.success) {
        window.bonLivraisonPrefixes = window.bonLivraisonPrefixes.filter(p => p !== prefix);
        
        // If deleted prefix was selected, select first available
        const currentPrefix = document.getElementById('editPrefixInputChaimae').value;
        if (currentPrefix === prefix) {
            document.getElementById('editPrefixInputChaimae').value = window.bonLivraisonPrefixes[0];
        }
        
        renderEditPrefixListChaimae();
        window.notify.success('Succès', `Prefix "${prefix}" supprimé`, 2000);
    } else {
        window.notify.error('Erreur', result.error || 'Impossible de supprimer le prefix', 3000);
    }
};

// Load prefixes from database (shared function)
async function loadPrefixesFromDB() {
    if (window.prefixesLoaded) return;
    
    try {
        const result = await window.electron.dbChaimae.getAllPrefixes();
        if (result.success && result.data.length > 0) {
            window.bonLivraisonPrefixes = result.data;
            window.prefixesLoaded = true;
        } else {
            // Initialize default prefixes if none exist
            if (!window.bonLivraisonPrefixes) {
                window.bonLivraisonPrefixes = ['MG', 'TL', 'BL'];
            }
        }
    } catch (error) {
        console.error('Error loading prefixes:', error);
        if (!window.bonLivraisonPrefixes) {
            window.bonLivraisonPrefixes = ['MG', 'TL', 'BL'];
        }
    }
}

// ==================== EDIT ORDER PREFIX FUNCTIONS ====================

// Toggle edit order prefix dropdown
window.toggleEditOrderPrefixDropdownChaimae = async function() {
    const dropdown = document.getElementById('editOrderPrefixDropdownChaimae');
    if (!dropdown) return;
    
    if (dropdown.style.display === 'none') {
        await loadEditOrderPrefixesFromDB();
        renderEditOrderPrefixListChaimae();
        dropdown.style.display = 'block';
    } else {
        dropdown.style.display = 'none';
    }
};

// Render edit order prefix list
function renderEditOrderPrefixListChaimae() {
    const listContainer = document.getElementById('editOrderPrefixListChaimae');
    if (!listContainer) return;
    
    if (!window.orderPrefixes || window.orderPrefixes.length === 0) {
        window.orderPrefixes = ['BC', 'CMD', 'ORD'];
    }
    
    listContainer.innerHTML = window.orderPrefixes.map(prefix => `
        <div onclick="selectEditOrderPrefixChaimae('${prefix}')" 
             style="margin: 0.35rem; padding: 0.75rem 1rem; cursor: pointer; border-radius: 8px; transition: all 0.3s; color: #fff; display: flex; justify-content: space-between; align-items: center; background: ${prefix === window.selectedOrderPrefix ? 'linear-gradient(90deg, #2196f3 0%, #1976d2 100%)' : 'rgba(255,255,255,0.05)'}; border: 2px solid ${prefix === window.selectedOrderPrefix ? '#2196f3' : 'transparent'};"
             onmouseover="if('${prefix}' !== window.selectedOrderPrefix) { this.style.background='rgba(33, 150, 243, 0.2)'; this.style.borderColor='#2196f3'; }" 
             onmouseout="if('${prefix}' !== window.selectedOrderPrefix) { this.style.background='rgba(255,255,255,0.05)'; this.style.borderColor='transparent'; }">
            <div style="display: flex; align-items: center; gap: 0.75rem;">
                <span style="font-size: 1.2rem;">${prefix === window.selectedOrderPrefix ? '✓' : '📌'}</span>
                <span style="font-weight: ${prefix === window.selectedOrderPrefix ? '700' : '500'}; font-size: 1rem;">${prefix}</span>
            </div>
            ${window.orderPrefixes.length > 1 ? `
                <button onclick="event.stopPropagation(); deleteEditOrderPrefixChaimae('${prefix}')" 
                        style="background: transparent; color: #e74c3c; border: 2px solid #e74c3c; border-radius: 6px; padding: 0.3rem 0.4rem; cursor: pointer; transition: all 0.3s;"
                        onmouseover="this.style.background='#e74c3c'; this.style.color='#fff';"
                        onmouseout="this.style.background='transparent'; this.style.color='#e74c3c';">
                    🗑️
                </button>
            ` : ''}
        </div>
    `).join('');
}

// Select edit order prefix
window.selectEditOrderPrefixChaimae = function(prefix) {
    window.selectedOrderPrefix = prefix;
    
    const prefixInput = document.getElementById('editOrderPrefixInputChaimae');
    const prefixExample = document.getElementById('editOrderPrefixExampleChaimae');
    
    if (prefixInput) prefixInput.value = prefix;
    if (prefixExample) prefixExample.textContent = prefix;
    
    const dropdown = document.getElementById('editOrderPrefixDropdownChaimae');
    if (dropdown) dropdown.style.display = 'none';
    
    renderEditOrderPrefixListChaimae();
};

// Add new edit order prefix
window.addEditNewOrderPrefixChaimae = async function() {
    const newPrefixInput = document.getElementById('editNewOrderPrefixInputChaimae');
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
    
    const result = await window.electron.dbChaimae.addOrderPrefix(newPrefix);
    
    if (result.success) {
        window.orderPrefixes.push(newPrefix);
        window.orderPrefixes.sort();
        newPrefixInput.value = '';
        
        renderEditOrderPrefixListChaimae();
        window.notify.success('Succès', `Prefix "${newPrefix}" ajouté`, 2000);
    } else {
        window.notify.error('Erreur', result.error || 'Impossible d\'ajouter le prefix', 3000);
    }
};

// Delete edit order prefix
window.deleteEditOrderPrefixChaimae = async function(prefix) {
    if (window.orderPrefixes.length <= 1) {
        window.notify.warning('Attention', 'Vous devez garder au moins un prefix', 2000);
        return;
    }
    
    const result = await window.electron.dbChaimae.deleteOrderPrefix(prefix);
    
    if (result.success) {
        const index = window.orderPrefixes.indexOf(prefix);
        if (index > -1) {
            window.orderPrefixes.splice(index, 1);
            
            if (window.selectedOrderPrefix === prefix) {
                window.selectedOrderPrefix = window.orderPrefixes[0];
                const prefixInput = document.getElementById('editOrderPrefixInputChaimae');
                const prefixExample = document.getElementById('editOrderPrefixExampleChaimae');
                if (prefixInput) prefixInput.value = window.selectedOrderPrefix;
                if (prefixExample) prefixExample.textContent = window.selectedOrderPrefix;
            }
            
            renderEditOrderPrefixListChaimae();
            window.notify.success('Succès', `Prefix "${prefix}" supprimé`, 2000);
        }
    } else {
        window.notify.error('Erreur', result.error || 'Impossible de supprimer le prefix', 3000);
    }
};

// Load edit order prefixes from database
async function loadEditOrderPrefixesFromDB() {
    try {
        const result = await window.electron.dbChaimae.getOrderPrefixes();
        if (result.success && result.data && result.data.length > 0) {
            window.orderPrefixes = result.data;
            if (!window.selectedOrderPrefix) {
                window.selectedOrderPrefix = window.orderPrefixes[0];
            }
        } else {
            if (!window.orderPrefixes) {
                window.orderPrefixes = ['BC', 'CMD', 'ORD'];
                window.selectedOrderPrefix = 'BC';
            }
        }
    } catch (error) {
        console.error('Error loading order prefixes:', error);
        if (!window.orderPrefixes) {
            window.orderPrefixes = ['BC', 'CMD', 'ORD'];
            window.selectedOrderPrefix = 'BC';
        }
    }
}

// ==================== END EDIT ORDER PREFIX FUNCTIONS ====================

// Format number helper (duplicate - will be removed)
function formatNumberChaimaeOld(num) {
    return parseFloat(num).toFixed(2);
}

// Handle edit form submit
async function handleEditSubmitChaimae(e, invoiceId, documentType) {
    e.preventDefault();
    
    try {
        // Get prefix and numero
        // For Bon de livraison: combine prefix + numero
        // For Facture/Devis: use numero directly (no prefix)
        const prefixInput = document.getElementById('editPrefixInputChaimae');
        const numeroInput = document.getElementById('editNumeroChaimae');
        
        let fullNumero;
        if (prefixInput && prefixInput.offsetParent !== null) {
            // Prefix input is visible (Bon de livraison)
            const prefix = prefixInput.value || '';
            const numero = numeroInput?.value || '';
            fullNumero = prefix + numero;
        } else {
            // Prefix input is hidden (Facture/Devis)
            fullNumero = numeroInput?.value || '';
        }
        
        console.log('📝 [CHAIMAE EDIT] Full numero:', fullNumero);
        
        // Collect products data
        const products = [];
        document.querySelectorAll('#editProductsListChaimae .edit-product-row').forEach(row => {
            const designation = row.querySelector('textarea').value;
            const quantiteOriginal = row.querySelector('input[type="text"]').value;
            const prix = parseFloat(row.querySelector('input[type="number"]').value) || 0;
            
            if (designation || quantiteOriginal || prix) {
                // For calculation: convert F to 1
                let quantiteForCalc = quantiteOriginal;
                if (quantiteForCalc.toUpperCase() === 'F') {
                    quantiteForCalc = '1';
                }
                
                const qty = parseFloat(quantiteForCalc) || 1;
                products.push({
                    designation,
                    quantite: quantiteOriginal,  // Save original value (F, 10 Kg, etc.)
                    prix_unitaire_ht: prix,
                    total_ht: qty * prix
                });
            }
        });
        
        const updateData = {
            client: {
                nom: document.getElementById('editClientNomChaimae').value,
                ICE: document.getElementById('editClientICEChaimae').value
            },
            document: {
                date: document.getElementById('editDateChaimae').value,
                numero: documentType === 'devis' ? null : fullNumero, // For devis, use numero_devis instead
                numero_devis: documentType === 'devis' ? fullNumero : null, // For devis, store in numero_devis
                numero_BL: documentType === 'bon_livraison' ? fullNumero : null, // For bon_livraison
                numero_Order: document.getElementById('editNumeroOrderChaimae')?.value || null,
                bon_de_livraison: document.getElementById('editBonLivraisonChaimae')?.value || null,
                numero_commande: (() => {
                    const orderValue = document.getElementById('editBonCommandeChaimae')?.value?.trim();
                    if (orderValue && documentType === 'bon_livraison') {
                        const selectedOrderPrefix = window.selectedOrderPrefix || 'BC';
                        
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
                        
                        // Add the selected prefix
                        return `${selectedOrderPrefix}${cleanValue}`;
                    }
                    return orderValue || null;
                })()
            },
            products,
            totals: {
                total_ht: parseFloat(document.getElementById('editTotalHTChaimae').textContent.replace(' DH', '')),
                tva_rate: parseFloat(document.getElementById('editTvaRateChaimae').value),
                montant_tva: parseFloat(document.getElementById('editMontantTVAChaimae').textContent.replace(' DH', '')),
                total_ttc: parseFloat(document.getElementById('editTotalTTCChaimae').textContent.replace(' DH', ''))
            }
        };
        
        // Check for duplicate document numero in regular invoices
        const allInvoicesResult = await window.electron.dbChaimae.getAllInvoices('CHAIMAE');
        if (allInvoicesResult.success) {
            // Check main document number - skip current invoice
            const duplicateNumero = allInvoicesResult.data.find(inv => {
                // Always skip the current invoice being edited
                if (inv.id === invoiceId) {
                    console.log('✅ [EDIT] Skipping current invoice:', invoiceId);
                    return false;
                }
                
                if (documentType === 'facture') {
                    return inv.document_type === 'facture' && inv.document_numero === fullNumero;
                } else if (documentType === 'devis') {
                    return inv.document_type === 'devis' && inv.document_numero_devis === fullNumero;
                } else if (documentType === 'bon_livraison') {
                    return (inv.document_type === 'bon_livraison' || inv.document_type === 'bon de livraison') && 
                           (inv.document_numero === fullNumero || 
                            inv.document_numero_bl === fullNumero || 
                            inv.document_bon_de_livraison === fullNumero);
                }
                return false;
            });
            
            if (duplicateNumero) {
                const docTypeLabel = documentType === 'facture' ? 'Facture' : 
                                   documentType === 'devis' ? 'Devis' : 
                                   'Bon de livraison';
                console.error('❌ [EDIT] Duplicate found:', duplicateNumero.id, 'Number:', fullNumero);
                window.notify.error(
                    'Numéro déjà utilisé',
                    `Le N° ${docTypeLabel} "${fullNumero}" existe déjà dans un autre document. Veuillez utiliser un autre numéro.`,
                    5000
                );
                return;
            }
        }
        
        // Check for duplicate in global invoices (for facture only)
        if (documentType === 'facture' && fullNumero) {
            const allGlobalInvoicesResult = await window.electron.dbChaimae.getAllGlobalInvoices();
            if (allGlobalInvoicesResult.success) {
                const duplicateGlobal = allGlobalInvoicesResult.data.find(inv => 
                    inv.document_numero === fullNumero
                );
                
                if (duplicateGlobal) {
                    window.notify.error(
                        'Numéro déjà utilisé',
                        `Le N° Facture "${fullNumero}" existe déjà dans une facture globale. Veuillez utiliser un autre numéro.`,
                        5000
                    );
                    return;
                }
            }
        }
        
        if (allInvoicesResult.success) {
            
            // Check for duplicate N° Order if provided (for FACTURE only)
            if (documentType === 'facture' && updateData.document.numero_Order) {
                const duplicateOrder = allInvoicesResult.data.find(inv => 
                    inv.id !== invoiceId && 
                    inv.document_type === 'facture' &&
                    inv.document_numero_Order && 
                    inv.document_numero_Order.trim() === updateData.document.numero_Order.trim()
                );
                
                if (duplicateOrder) {
                    window.notify.error(
                        'Numéro de commande déjà utilisé',
                        `Le N° Order "${updateData.document.numero_Order}" existe déjà. Veuillez utiliser un autre numéro.`,
                        5000
                    );
                    return;
                }
            }
            
            // Check for duplicate Bon de livraison if provided (for FACTURE only)
            if (documentType === 'facture' && updateData.document.bon_de_livraison) {
                const duplicateBL = allInvoicesResult.data.find(inv => 
                    inv.id !== invoiceId && 
                    inv.document_type === 'facture' &&
                    inv.document_bon_de_livraison && 
                    inv.document_bon_de_livraison.trim() === updateData.document.bon_de_livraison.trim()
                );
                
                if (duplicateBL) {
                    window.notify.error(
                        'Bon de livraison déjà utilisé',
                        `Le Bon de livraison "${updateData.document.bon_de_livraison}" existe déjà. Veuillez utiliser un autre numéro.`,
                        5000
                    );
                    return;
                }
            }
            
            // Check for duplicate N° Order if provided (for BON_LIVRAISON only)
            if (documentType === 'bon_livraison' && updateData.document.numero_commande) {
                const duplicateOrderBL = allInvoicesResult.data.find(inv => 
                    inv.id !== invoiceId && 
                    (inv.document_type === 'bon_livraison' || inv.document_type === 'bon de livraison') &&
                    inv.document_numero_commande && 
                    inv.document_numero_commande.trim() === updateData.document.numero_commande.trim()
                );
                
                if (duplicateOrderBL) {
                    window.notify.error(
                        'Numéro de commande déjà utilisé',
                        `Le N° Order "${updateData.document.numero_commande}" existe déjà dans un autre Bon de livraison. Veuillez utiliser un autre numéro.`,
                        5000
                    );
                    return;
                }
            }
        }
        
        console.log('📝 Updating invoice:', invoiceId);
        console.log('📊 Update data:', updateData);
        
        // Update in database
        const result = await window.electron.dbChaimae.updateInvoice(invoiceId, updateData);
        
        console.log('📥 Update result:', result);
        
        if (result.success) {
            // Check if this bon is part of any global invoice and update it
            const allGlobalInvoices = await window.electron.dbChaimae.getAllGlobalInvoices();
            if (allGlobalInvoices.success && allGlobalInvoices.data) {
                for (const globalInvoice of allGlobalInvoices.data) {
                    if (globalInvoice.bons && globalInvoice.bons.some(b => b.id === invoiceId)) {
                        // This bon is part of a global invoice - recalculate totals
                        let totalHT = 0;
                        let totalTTC = 0;
                        
                        for (const bon of globalInvoice.bons) {
                            if (bon.id === invoiceId) {
                                // Use updated values
                                totalHT += updateData.totals.total_ht;
                                totalTTC += updateData.totals.total_ttc;
                            } else {
                                // Use existing values
                                totalHT += parseFloat(bon.total_ht) || 0;
                                totalTTC += parseFloat(bon.total_ttc) || 0;
                            }
                        }
                        
                        const tvaRate = globalInvoice.tva_rate || 20;
                        const montantTVA = totalHT * (tvaRate / 100);
                        
                        // Update global invoice
                        await window.electron.dbChaimae.updateGlobalInvoice(globalInvoice.id, {
                            document_numero: globalInvoice.document_numero,
                            document_date: globalInvoice.document_date,
                            total_ht: totalHT,
                            tva_rate: tvaRate,
                            montant_tva: montantTVA,
                            total_ttc: totalTTC,
                            bon_livraison_ids: globalInvoice.bons.map(b => b.id)
                        });
                        
                        console.log('✅ Updated global invoice:', globalInvoice.id, 'New total:', totalTTC);
                    }
                }
            }
            
            // Save or delete notes
            const noteText = document.getElementById('editNotesChaimae')?.value?.trim();
            console.log('📝 [NOTES] Saving note for invoice:', invoiceId, 'Text:', noteText);
            if (noteText) {
                const noteResult = await window.electron.dbChaimae.saveNote(invoiceId, noteText);
                console.log('✅ [NOTES] Save result:', noteResult);
            } else {
                // Delete note if textarea is empty
                const deleteResult = await window.electron.dbChaimae.deleteNote(invoiceId);
                console.log('🗑️ [NOTES] Delete result:', deleteResult);
            }
            
            window.notify.success('Succès', 'Document mis à jour avec succès!', 3000);
            
            // Close modal
            document.querySelector('.modal-overlay').remove();
            
            // Reload list
            setTimeout(() => {
                loadInvoicesChaimae();
            }, 300);
        } else {
            console.error('❌ Update failed:', result.error);
            throw new Error(result.error || 'Échec de la mise à jour');
        }
        
    } catch (error) {
        console.error('Error updating invoice:', error);
        window.notify.error('Erreur', 'Impossible de mettre à jour', 3000);
    }
}

// Add attachment in edit modal
window.addEditAttachmentChaimae = async function(invoiceId) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.png,.jpg,.jpeg,.pdf';
    input.multiple = true;
    
    input.onchange = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;
        
        for (const file of files) {
            try {
                const arrayBuffer = await file.arrayBuffer();
                const uint8Array = new Uint8Array(arrayBuffer);
                
                const result = await window.electron.dbChaimae.addAttachment(
                    invoiceId,
                    file.name,
                    file.type,
                    uint8Array
                );
                
                if (result.success) {
                    window.notify.success('Succès', `${file.name} ajouté`, 2000);
                    // Refresh the edit modal
                    document.querySelector('.modal-overlay').remove();
                    setTimeout(() => editInvoiceChaimae(invoiceId), 300);
                } else {
                    window.notify.error('Erreur', `Échec: ${file.name}`, 3000);
                }
            } catch (error) {
                console.error('Error uploading attachment:', error);
                window.notify.error('Erreur', 'Impossible d\'ajouter le fichier', 3000);
            }
        }
    };
    
    input.click();
}

// Delete attachment from edit modal
window.deleteEditAttachmentChaimae = async function(attachmentId, invoiceId) {
    const confirmed = await customConfirm('Confirmation', 'Êtes-vous sûr de vouloir supprimer cette pièce jointe ?', 'warning');
    if (!confirmed) {
        return;
    }
    
    try {
        const result = await window.electron.dbChaimae.deleteAttachment(attachmentId);
        
        if (result.success) {
            window.notify.success('Succès', 'Pièce jointe supprimée', 2000);
            // Refresh the edit modal
            document.querySelector('.modal-overlay').remove();
            setTimeout(() => editInvoiceChaimae(invoiceId), 300);
        } else {
            window.notify.error('Erreur', result.error || 'Impossible de supprimer', 3000);
        }
    } catch (error) {
        console.error('Error deleting attachment:', error);
        window.notify.error('Erreur', 'Une erreur est survenue', 3000);
    }
}

// Show input modal for conversion - CHAIMAE VERSION
function showConvertInputModalChaimae(newType, newTypeLabel, prefillNumero = '', prefillBonLivraison = '', prefillNumeroOrder = '') {
    return new Promise(async (resolve) => {
        // Close edit modal temporarily
        const editModal = document.querySelector('.modal-overlay');
        const wasVisible = editModal && editModal.style.display !== 'none';
        if (editModal) {
            editModal.style.display = 'none';
        }

        // Get highest number for the target type
        let highestNumber = 'Aucun';
        try {
            const invoicesResult = await window.electron.dbChaimae.getAllInvoices();
            if (invoicesResult.success && invoicesResult.data && invoicesResult.data.length > 0) {
                const invoices = invoicesResult.data;
                
                // Helper function to extract numeric value
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
                    const bonsList = invoices.filter(inv => 
                        (inv.document_type === 'bon_livraison' || inv.document_type === 'bon de livraison') && 
                        (inv.document_numero || inv.document_bon_de_livraison || inv.document_numero_bl)
                    );
                    if (bonsList.length > 0) {
                        bonsList.sort((a, b) => {
                            const numA = extractNumber(a.document_numero || a.document_bon_de_livraison || a.document_numero_bl);
                            const numB = extractNumber(b.document_numero || b.document_bon_de_livraison || b.document_numero_bl);
                            return numB - numA;
                        });
                        highestNumber = bonsList[0].document_numero || bonsList[0].document_bon_de_livraison || bonsList[0].document_numero_bl;
                    }
                }
            }
        } catch (error) {
            console.error('Error getting highest numbers for conversion:', error);
        }
        
        // For bon_livraison, extract prefix and numero separately
        let extractedPrefix = 'MG';
        let numeroWithoutPrefix = prefillNumero;
        
        if (newType === 'bon_livraison' && prefillNumero) {
            // Check if prefillNumero has a prefix (MG, TL, BL, etc.)
            const match = prefillNumero.match(/^([A-Z]+)(.+)$/);
            if (match) {
                extractedPrefix = match[1]; // Extract prefix (MG, TL, BL, etc.)
                numeroWithoutPrefix = match[2]; // Extract rest (2/2025, 123/2025, etc.)
                
                // Update selected prefix
                window.selectedPrefixConvert = extractedPrefix;
            }
        }
        
        // Create floating input box
        const overlay = document.createElement('div');
        overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.95);z-index:999999;display:flex;align-items:center;justify-content:center;animation:fadeIn 0.2s;';
        
        const container = document.createElement('div');
        container.style.cssText = 'background:#1e1e1e;border:3px solid #9c27b0;border-radius:16px;padding:2.5rem;min-width:500px;box-shadow:0 20px 60px rgba(0,0,0,0.9);animation:slideIn 0.3s;';
        
        const numeroLabel = newType === 'facture' ? 'N° Facture' : 
                           newType === 'devis' ? 'N° Devis' : 
                           'N° Bon de livraison';
        
        container.innerHTML = `
            <style>
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                @keyframes slideIn { from { transform: translateY(-30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
            </style>
            <div style="text-align:center;margin-bottom:2rem;">
                <div style="font-size:3rem;margin-bottom:0.5rem;">🔄</div>
                <h2 style="color:#fff;margin:0;font-size:1.5rem;font-weight:600;">Convertir en ${newTypeLabel}</h2>
            </div>
            
            <div style="margin-bottom:2rem;">
                <label style="display:block;color:#9c27b0;margin-bottom:0.75rem;font-weight:600;font-size:1.1rem;">${numeroLabel}</label>
                ${newType === 'bon_livraison' ? `
                    <div style="display:flex;gap:0.5rem;align-items:flex-start;">
                        <div style="position:relative;flex:0 0 auto;">
                            <input type="text" id="prefixInputConvert" placeholder="MG" value="${extractedPrefix}"
                                   style="width:80px;padding:1rem;background:#2d2d30;border:2px solid #3e3e42;border-radius:8px;color:#fff;font-size:1.1rem;outline:none;cursor:pointer;font-weight:600;"
                                   readonly onclick="togglePrefixDropdownConvert()">
                            <div id="prefixDropdownConvert" style="display:none;position:absolute;top:100%;left:0;background:linear-gradient(135deg, #1e1e1e 0%, #2d2d30 100%);border:2px solid #667eea;border-radius:12px;margin-top:0.5rem;box-shadow:0 8px 24px rgba(102, 126, 234, 0.3), 0 0 0 1px rgba(102, 126, 234, 0.1);z-index:1000;min-width:200px;max-height:350px;overflow:hidden;">
                                <div style="padding:0.75rem 1rem;background:linear-gradient(90deg, #667eea 0%, #764ba2 100%);border-bottom:2px solid rgba(102, 126, 234, 0.3);">
                                    <h4 style="margin:0;color:#fff;font-size:0.95rem;font-weight:600;letter-spacing:0.5px;">📋 Choisir un Prefix</h4>
                                </div>
                                <div id="prefixListConvert" style="max-height:200px;overflow-y:auto;padding:0.5rem;"></div>
                                <div style="padding:0.75rem;border-top:2px solid rgba(102, 126, 234, 0.2);background:rgba(0,0,0,0.2);">
                                    <input type="text" id="newPrefixInputConvert" placeholder="Nouveau prefix (ex: ABC)"
                                           style="width:100%;padding:0.65rem;background:#1e1e1e;border:2px solid #3e3e42;border-radius:6px;color:#fff;font-size:0.9rem;outline:none;transition:all 0.3s;"
                                           onfocus="this.style.borderColor='#667eea';this.style.boxShadow='0 0 0 3px rgba(102, 126, 234, 0.1)';"
                                           onblur="this.style.borderColor='#3e3e42';this.style.boxShadow='none';"
                                           onkeypress="if(event.key==='Enter'){addNewPrefixConvert();event.preventDefault();}">
                                    <button type="button" onclick="addNewPrefixConvert()"
                                            style="width:100%;margin-top:0.5rem;padding:0.65rem;background:linear-gradient(90deg, #667eea 0%, #764ba2 100%);color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:0.9rem;font-weight:600;transition:all 0.3s;box-shadow:0 2px 8px rgba(102, 126, 234, 0.3);"
                                            onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 4px 12px rgba(102, 126, 234, 0.4)';"
                                            onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='0 2px 8px rgba(102, 126, 234, 0.3)';">
                                        ➕ Ajouter le Prefix
                                    </button>
                                </div>
                            </div>
                        </div>
                        <input type="text" id="convertInput1Chaimae" placeholder="123/2025" value="${numeroWithoutPrefix}"
                               style="flex:1;padding:1rem;background:#2d2d30;border:2px solid #3e3e42;border-radius:8px;color:#fff;font-size:1.1rem;box-sizing:border-box;outline:none;transition:all 0.3s;"
                               onfocus="this.style.borderColor='#9c27b0';this.style.background='#1e1e1e';"
                               onblur="this.style.borderColor='#3e3e42';this.style.background='#2d2d30';formatBonNumeroWithPrefixConvert(this);">
                    </div>
                    <div style="margin-top:0.5rem;color:#9e9e9e;font-size:0.9rem;">Ex: 123 → <span id="prefixExampleConvert">${extractedPrefix}</span>123/${new Date().getFullYear()}</div>
                    ${highestNumber !== 'Aucun' ? `<div style="margin-top:0.5rem;color:#ff9800;font-size:0.85rem;font-weight:500;">📌 Plus grand numéro actuel: ${highestNumber}</div>` : ''}
                ` : `
                    <input type="text" id="convertInput1Chaimae" placeholder="Exemple: 548" value="${prefillNumero}"
                           style="width:100%;padding:1rem;background:#2d2d30;border:2px solid #3e3e42;border-radius:8px;color:#fff;font-size:1.1rem;box-sizing:border-box;outline:none;transition:all 0.3s;"
                           onfocus="this.style.borderColor='#9c27b0';this.style.background='#1e1e1e';"
                           onblur="this.style.borderColor='#3e3e42';this.style.background='#2d2d30';autoFormatDocumentNumberOnBlurChaimae(this);">
                    ${highestNumber !== 'Aucun' ? `<div style="margin-top:0.5rem;color:${newType === 'facture' ? '#4caf50' : '#9c27b0'};font-size:0.85rem;font-weight:500;">📌 Plus grand numéro actuel: ${highestNumber}</div>` : ''}
                `}
            </div>
            
            ${newType === 'facture' ? `
            <div style="margin-bottom:1.5rem;">
                <label style="display:block;color:#9e9e9e;margin-bottom:0.75rem;font-weight:500;font-size:1rem;">N° Order (optionnel)</label>
                <input type="text" id="convertInput2Chaimae" placeholder="Exemple: 555" value="${prefillNumeroOrder}"
                       style="width:100%;padding:1rem;background:#2d2d30;border:2px solid #3e3e42;border-radius:8px;color:#fff;font-size:1.1rem;box-sizing:border-box;outline:none;transition:all 0.3s;"
                       onfocus="this.style.borderColor='#9c27b0';this.style.background='#1e1e1e';"
                       onblur="this.style.borderColor='#3e3e42';this.style.background='#2d2d30';">
            </div>
            <div style="margin-bottom:2rem;">
                <label style="display:block;color:#9e9e9e;margin-bottom:0.75rem;font-weight:500;font-size:1rem;">Bon de livraison (optionnel)</label>
                <input type="text" id="convertInput3Chaimae" placeholder="Exemple: 123, 123/2025" value="${prefillBonLivraison}"
                       style="width:100%;padding:1rem;background:#2d2d30;border:2px solid #3e3e42;border-radius:8px;color:#fff;font-size:1.1rem;box-sizing:border-box;outline:none;transition:all 0.3s;"
                       onfocus="this.style.borderColor='#9c27b0';this.style.background='#1e1e1e';"
                       onblur="this.style.borderColor='#3e3e42';this.style.background='#2d2d30';">
            </div>
            ` : ''}
            
            ${newType === 'bon_livraison' ? `
            <div style="margin-bottom:2rem;">
                <label style="display:block;color:#9e9e9e;margin-bottom:0.75rem;font-weight:500;font-size:1rem;">N° Order (optionnel)</label>
                <div style="display:flex;gap:0.5rem;align-items:flex-start;">
                    <div style="position:relative;flex:0 0 auto;">
                        <input type="text" id="convertOrderPrefixInput" placeholder="BC" value="${window.selectedOrderPrefix || 'BC'}"
                               style="width:80px;padding:1rem;background:#2d2d30;border:2px solid #3e3e42;border-radius:8px;color:#fff;font-size:1.1rem;outline:none;cursor:pointer;font-weight:600;"
                               readonly onclick="toggleConvertOrderPrefixDropdown()">
                        <div id="convertOrderPrefixDropdown" style="display:none;position:absolute;top:100%;left:0;background:linear-gradient(135deg, #1e1e1e 0%, #2d2d30 100%);border:2px solid #2196f3;border-radius:12px;margin-top:0.5rem;box-shadow:0 8px 24px rgba(33, 150, 243, 0.3), 0 0 0 1px rgba(33, 150, 243, 0.1);z-index:1000;min-width:200px;max-height:350px;overflow:hidden;">
                            <div style="padding:0.75rem 1rem;background:linear-gradient(90deg, #2196f3 0%, #1976d2 100%);border-bottom:2px solid rgba(33, 150, 243, 0.3);">
                                <h4 style="margin:0;color:#fff;font-size:0.95rem;font-weight:600;letter-spacing:0.5px;">📋 Choisir un Prefix</h4>
                            </div>
                            <div id="convertOrderPrefixList" style="max-height:200px;overflow-y:auto;padding:0.5rem;"></div>
                            <div style="padding:0.75rem;border-top:2px solid rgba(33, 150, 243, 0.2);background:rgba(0,0,0,0.2);">
                                <input type="text" id="convertNewOrderPrefixInput" placeholder="Nouveau prefix (ex: BC)"
                                       style="width:100%;padding:0.65rem;background:#1e1e1e;border:2px solid #3e3e42;border-radius:6px;color:#fff;font-size:0.9rem;outline:none;transition:all 0.3s;"
                                       onfocus="this.style.borderColor='#2196f3';this.style.boxShadow='0 0 0 3px rgba(33, 150, 243, 0.1)';"
                                       onblur="this.style.borderColor='#3e3e42';this.style.boxShadow='none';"
                                       onkeypress="if(event.key==='Enter'){addConvertNewOrderPrefix();event.preventDefault();}">
                                <button type="button" onclick="addConvertNewOrderPrefix()"
                                        style="width:100%;margin-top:0.5rem;padding:0.65rem;background:linear-gradient(90deg, #2196f3 0%, #1976d2 100%);color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:0.9rem;font-weight:600;transition:all 0.3s;box-shadow:0 2px 8px rgba(33, 150, 243, 0.3);"
                                        onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 4px 12px rgba(33, 150, 243, 0.4)';"
                                        onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='0 2px 8px rgba(33, 150, 243, 0.3)';">
                                    ➕ Ajouter le Prefix
                                </button>
                            </div>
                        </div>
                    </div>
                    <input type="text" id="convertInput2Chaimae" placeholder="456"
                           style="flex:1;padding:1rem;background:#2d2d30;border:2px solid #3e3e42;border-radius:8px;color:#fff;font-size:1.1rem;box-sizing:border-box;outline:none;transition:all 0.3s;"
                           onfocus="this.style.borderColor='#9c27b0';this.style.background='#1e1e1e';"
                           onblur="this.style.borderColor='#3e3e42';this.style.background='#2d2d30';">
                </div>
                <small style="color:#999;font-size:0.85rem;display:block;margin-top:0.5rem;">Ex: 456 → <span id="convertOrderPrefixExample">BC</span>456</small>
            </div>
            ` : ''}
            
            <div style="display:flex;gap:1rem;margin-top:2rem;">
                <button id="convertBtnCancelChaimae" style="flex:1;padding:1rem;background:#fff;color:#333;border:2px solid #ddd;border-radius:8px;cursor:pointer;font-size:1.1rem;font-weight:600;transition:all 0.3s;"
                        onmouseover="this.style.background='#f5f5f5';this.style.borderColor='#bbb';" onmouseout="this.style.background='#fff';this.style.borderColor='#ddd';">
                    Annuler
                </button>
                <button id="convertBtnConfirmChaimae" style="flex:1;padding:1rem;background:#9c27b0;color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:1.1rem;font-weight:600;transition:all 0.3s;"
                        onmouseover="this.style.background='#7b1fa2';" onmouseout="this.style.background='#9c27b0';">
                    ✓ Confirmer
                </button>
            </div>
        `;
        
        overlay.appendChild(container);
        document.body.appendChild(overlay);
        
        const input1 = document.getElementById('convertInput1Chaimae');
        const input2 = document.getElementById('convertInput2Chaimae');
        const input3 = document.getElementById('convertInput3Chaimae');
        const btnConfirm = document.getElementById('convertBtnConfirmChaimae');
        const btnCancel = document.getElementById('convertBtnCancelChaimae');
        
        // Focus on first input
        setTimeout(() => {
            if (input1) {
                input1.focus();
                input1.select();
            }
        }, 100);
        
        const cleanup = () => {
            overlay.remove();
            if (editModal && wasVisible) {
                editModal.style.display = '';
            }
        };

        const handleConfirm = () => {
            let val1 = input1.value.trim();
            let val2 = input2 ? input2.value.trim() : '';
            let val3 = input3 ? input3.value.trim() : '';
            
            // For bon_livraison, check if already formatted
            const currentYear = new Date().getFullYear();
            if (newType === 'bon_livraison') {
                // Get selected prefix and combine with numero
                const selectedPrefix = window.selectedPrefix || 'MG';
                const fullNumero = selectedPrefix + val1;
                
                // Check if already formatted as PREFIX+XXX/YYYY (accept any prefix and any number of digits)
                const prefixPattern = new RegExp(`^[A-Z]+\\d+\\/\\d{4}$`);
                if (!fullNumero || !fullNumero.match(prefixPattern)) {
                    input1.style.borderColor = '#f44336';
                    input1.focus();
                    window.notify.error('Erreur', `Format invalide. Entrez des chiffres (ex: 2 → ${selectedPrefix}2/2025)`, 3000);
                    return;
                }
                
                // Update val1 with full numero including prefix
                val1 = fullNumero;
                
                // Format val2 (Order) with prefix if provided
                if (val2) {
                    const selectedOrderPrefix = window.selectedOrderPrefix || 'BC';
                    // Remove any existing prefix from all known prefixes
                    let cleanValue = val2;
                    if (window.orderPrefixes && window.orderPrefixes.length > 0) {
                        for (const prefix of window.orderPrefixes) {
                            if (cleanValue.startsWith(prefix)) {
                                cleanValue = cleanValue.substring(prefix.length);
                                break;
                            }
                        }
                    }
                    // Add the selected prefix
                    val2 = `${selectedOrderPrefix}${cleanValue}`;
                }
            } else {
                // For facture and devis - auto-add year if not present
                if (val1 && !val1.includes('/')) {
                    val1 = val1 + '/' + currentYear;
                }
                // val2 is N° Order - keep as is, no formatting needed
                // val3 is Bon de livraison - keep as is, no year suffix needed
                // (It should be entered as-is by the user, e.g., "123" or "MG123/2025")
            }
            
            if (!val1 || val1.startsWith('/')) {
                input1.style.borderColor = '#f44336';
                input1.focus();
                return;
            }
            
            cleanup();
            resolve({
                newNumero: val1,
                newNumeroOrder: val2 || null,
                newBonLivraison: val3 || null,
                newBonCommande: val2 || null
            });
        };
        
        btnConfirm.onclick = handleConfirm;
        btnCancel.onclick = () => {
            cleanup();
            resolve(null);
        };
        
        input1.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleConfirm();
        });
        if (input2) {
            input2.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') handleConfirm();
            });
        }
        if (input3) {
            input3.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') handleConfirm();
            });
        }
        
        // Removed overlay click to close - user must use Cancel button
    });
}

// Convert invoice type (Facture ↔ Devis ↔ Bon de livraison)
window.convertInvoiceTypeChaimae = async function(invoiceId, currentType) {
    console.log('🔄 [CONVERT CHAIMAE] Starting conversion for invoice:', invoiceId);
    
    // Show conversion options based on current type
    const options = [];
    if (currentType !== 'facture') options.push({ value: 'facture', label: 'Facture' });
    if (currentType !== 'devis') options.push({ value: 'devis', label: 'Devis' });
    if (currentType !== 'bon_livraison') options.push({ value: 'bon_livraison', label: 'Bon de livraison' });
    
    // Create conversion modal
    const modal = document.createElement('div');
    modal.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.95);z-index:999999;display:flex;align-items:center;justify-content:center;animation:fadeIn 0.2s;';
    
    const container = document.createElement('div');
    container.style.cssText = 'background:#1e1e1e;border:3px solid #9c27b0;border-radius:16px;padding:2.5rem;min-width:500px;box-shadow:0 20px 60px rgba(0,0,0,0.9);';
    
    const currentTypeLabel = currentType === 'facture' ? 'Facture' : (currentType === 'devis' ? 'Devis' : 'Bon de livraison');
    
    container.innerHTML = `
        <style>
            @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        </style>
        <div style="text-align:center;margin-bottom:2rem;">
            <div style="font-size:3rem;margin-bottom:1rem;">🔄</div>
            <h2 style="color:#fff;margin:0 0 0.5rem 0;font-size:1.5rem;">Convertir le document</h2>
            <p style="color:#aaa;margin:0;">Type actuel: <strong style="color:#9c27b0;">${currentTypeLabel}</strong></p>
        </div>
        
        <div style="margin-bottom:2rem;">
            <label style="display:block;color:#fff;margin-bottom:0.5rem;font-weight:500;">Convertir en:</label>
            <select id="convertTypeSelect" style="width:100%;padding:0.75rem;background:#2a2a2a;border:2px solid #444;border-radius:8px;color:#fff;font-size:1rem;cursor:pointer;">
                ${options.map(opt => `<option value="${opt.value}">${opt.label}</option>`).join('')}
            </select>
        </div>
        
        <div style="display:flex;gap:1rem;justify-content:center;">
            <button id="cancelConvert" style="padding:0.75rem 2rem;background:#444;color:#fff;border:none;border-radius:8px;cursor:pointer;font-weight:500;font-size:1rem;">
                Annuler
            </button>
            <button id="confirmConvert" style="padding:0.75rem 2rem;background:#9c27b0;color:#fff;border:none;border-radius:8px;cursor:pointer;font-weight:500;font-size:1rem;">
                ✓ Suivant
            </button>
        </div>
    `;
    
    modal.appendChild(container);
    document.body.appendChild(modal);
    
    // Handle cancel
    document.getElementById('cancelConvert').onclick = () => {
        modal.remove();
    };
    
    // Handle confirm
    document.getElementById('confirmConvert').onclick = async () => {
        const newType = document.getElementById('convertTypeSelect').value;
        const newTypeLabel = newType === 'facture' ? 'Facture' : (newType === 'devis' ? 'Devis' : 'Bon de livraison');
        modal.remove();
        
        try {
            // Get current invoice data
            const result = await window.electron.dbChaimae.getInvoiceById(invoiceId);
            if (!result.success || !result.data) {
                throw new Error('Document introuvable');
            }
            
            const invoice = result.data;
            
            // Get current document number based on type
            let currentNumero = '';
            if (currentType === 'facture') {
                currentNumero = invoice.document_numero || '';
            } else if (currentType === 'devis') {
                currentNumero = invoice.document_numero_devis || '';
            } else if (currentType === 'bon_livraison') {
                currentNumero = invoice.document_numero || '';
            }
            
            // Process numero based on conversion direction
            let prefillBonLivraison = '';
            
            if (newType === 'bon_livraison' && currentNumero) {
                // Converting TO bon_livraison: Add MG prefix if not present
                if (!currentNumero.startsWith('MG')) {
                    // Extract just the number part (remove /year if present)
                    const numPart = currentNumero.split('/')[0];
                    const year = new Date().getFullYear();
                    currentNumero = `MG${numPart}/${year}`;
                }
            } else if ((currentType === 'bon_livraison') && (newType === 'facture' || newType === 'devis') && currentNumero) {
                // Converting FROM bon_livraison to Facture/Devis
                // Keep the original BL number WITH MG for the "Bon de livraison" field
                prefillBonLivraison = currentNumero; // Keep MG123/2025
                
                // Remove MG prefix for the main document number
                if (currentNumero.startsWith('MG')) {
                    currentNumero = currentNumero.substring(2); // Remove 'MG' -> 123/2025
                }
            }
            
            // Get N° Order from bon_livraison if converting to facture
            let prefillNumeroOrder = '';
            if (currentType === 'bon_livraison' && newType === 'facture' && invoice.document_numero_commande) {
                prefillNumeroOrder = invoice.document_numero_commande;
            }
            
            // Show input modal for document numbers with pre-filled current number
            const inputData = await showConvertInputModalChaimae(newType, newTypeLabel, currentNumero, prefillBonLivraison, prefillNumeroOrder);
            
            if (!inputData) {
                window.notify.warning('Annulé', 'Conversion annulée', 3000);
                return;
            }
            
            const { newNumero, newNumeroOrder, newBonLivraison, newBonCommande } = inputData;
            
            // Check if numbers are unique
            const allInvoicesResult = await window.electron.dbChaimae.getAllInvoices();
            if (allInvoicesResult.success) {
                const invoices = allInvoicesResult.data;
                
                // Check document number
                if (newType === 'facture') {
                    const duplicateNumero = invoices.find(inv => 
                        inv.document_type === 'facture' && inv.document_numero === newNumero
                    );
                    if (duplicateNumero) {
                        window.notify.error('Erreur', `Le N° Facture "${newNumero}" existe déjà`, 5000);
                        return;
                    }
                } else if (newType === 'devis') {
                    const duplicateNumero = invoices.find(inv => 
                        inv.document_type === 'devis' && inv.document_numero_devis === newNumero
                    );
                    if (duplicateNumero) {
                        window.notify.error('Erreur', `Le N° Devis "${newNumero}" existe déjà`, 5000);
                        return;
                    }
                } else if (newType === 'bon_livraison') {
                    const duplicateNumero = invoices.find(inv => 
                        (inv.document_type === 'bon_livraison' || inv.document_type === 'bon de livraison') && 
                        (inv.document_numero === newNumero || 
                         inv.document_numero_bl === newNumero || 
                         inv.document_bon_de_livraison === newNumero)
                    );
                    if (duplicateNumero) {
                        window.notify.error('Erreur', `Le N° Bon de livraison "${newNumero}" existe déjà`, 5000);
                        return;
                    }
                }
                
                // Check N° Order if provided (for facture only)
                if (newType === 'facture' && newNumeroOrder) {
                    const duplicateOrder = invoices.find(inv => 
                        inv.document_type === 'facture' &&
                        inv.document_numero_Order && 
                        inv.document_numero_Order.trim() === newNumeroOrder.trim()
                    );
                    if (duplicateOrder) {
                        window.notify.error('Erreur', `Le N° Order "${newNumeroOrder}" existe déjà dans une autre Facture`, 5000);
                        return;
                    }
                }
                
                // Check Bon de livraison if provided (for facture)
                if (newType === 'facture' && newBonLivraison) {
                    const duplicateBL = invoices.find(inv => 
                        inv.document_type === 'facture' &&
                        inv.document_bon_de_livraison && 
                        inv.document_bon_de_livraison.trim() === newBonLivraison.trim()
                    );
                    if (duplicateBL) {
                        window.notify.error('Erreur', `Le Bon de livraison "${newBonLivraison}" existe déjà dans une autre Facture`, 5000);
                        return;
                    }
                }
                
                // Check N° Order if provided (for bon_livraison)
                if (newType === 'bon_livraison' && newBonCommande) {
                    const duplicateBC = invoices.find(inv => 
                        (inv.document_type === 'bon_livraison' || inv.document_type === 'bon de livraison') &&
                        inv.document_numero_commande && 
                        inv.document_numero_commande.trim() === newBonCommande.trim()
                    );
                    if (duplicateBC) {
                        window.notify.error('Erreur', `Le N° Order "${newBonCommande}" existe déjà dans un autre Bon de livraison`, 5000);
                        return;
                    }
                }
            }
            
            // Prepare new document data
            const newDocData = {
                client: {
                    nom: invoice.client_nom,
                    ICE: invoice.client_ice
                },
                document: {
                    type: newType,
                    date: new Date().toISOString().split('T')[0],
                    numero: newType === 'facture' || newType === 'bon_livraison' ? newNumero : null,
                    numero_devis: newType === 'devis' ? newNumero : null,
                    numero_Order: newType === 'facture' ? newNumeroOrder : null,
                    bon_de_livraison: newType === 'facture' ? newBonLivraison : null,
                    numero_commande: newType === 'bon_livraison' ? newBonCommande : null
                },
                products: invoice.products || [],
                totals: {
                    total_ht: invoice.total_ht,
                    tva_rate: invoice.tva_rate,
                    montant_tva: invoice.montant_tva,
                    total_ttc: invoice.total_ttc
                }
            };
            
            // Create new document
            const createResult = await window.electron.dbChaimae.createInvoice(newDocData);
            
            if (createResult.success) {
                window.notify.success('Succès', `${newTypeLabel} créé(e) avec succès!`, 3000);
                
                // Close edit modal and reload list
                document.querySelector('.modal-overlay')?.remove();
                setTimeout(() => loadInvoicesChaimae(), 300);
            } else {
                throw new Error(createResult.error || 'Échec de la conversion');
            }
            
        } catch (error) {
            console.error('Error converting invoice:', error);
            window.notify.error('Erreur', 'Impossible de convertir: ' + error.message, 4000);
        }
    };
}

// Format number with spaces for thousands - Fixed for PDF Arabic numerals
function formatNumberForPDFChaimae(number) {
    const num = parseFloat(number || 0);
    // Convert to string with 2 decimals
    const formatted = num.toFixed(2);
    // Split into integer and decimal parts
    const parts = formatted.split('.');
    // Add spaces for thousands separator (use regular space, not non-breaking space)
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    // Join with regular comma (ASCII 44)
    return parts[0] + ',' + parts[1];
}

// Download invoice as PDF
window.downloadInvoicePDFChaimae = async function(invoiceId) {
    try {
        console.log('📥 Generating PDF for invoice:', invoiceId);
        
        // Get invoice data
        const result = await window.electron.dbChaimae.getInvoiceById(invoiceId);
        
        if (!result.success || !result.data) {
            throw new Error('Document introuvable');
        }
        
        const invoice = result.data;
        
        console.log('🔍 Invoice type:', invoice.document_type);
        console.log('🔍 Current Order number:', invoice.document_numero_Order);
        console.log('🔍 Current BL number:', invoice.document_bon_de_livraison);
        console.log('🔍 Current BC number:', invoice.document_numero_commande);
        
        // Show dialog with checkboxes based on document type
        if (invoice.document_type === 'facture') {
            // For FACTURE: show N° Order and Bon de livraison options
            const hasOrder = invoice.document_numero_Order && invoice.document_numero_Order.trim() !== '';
            const hasBL = invoice.document_bon_de_livraison && invoice.document_bon_de_livraison.trim() !== '';
            
            console.log('✅ hasOrder:', hasOrder, '| hasBL:', hasBL);
            
            if (hasOrder || hasBL) {
                const result = await new Promise((resolve) => {
                    const overlay = document.createElement('div');
                    overlay.className = 'custom-modal-overlay';
                    
                    overlay.innerHTML = `
                        <div class="custom-modal">
                            <div class="custom-modal-header">
                                <span class="custom-modal-icon info">📋</span>
                                <h3 class="custom-modal-title">Télécharger PDF</h3>
                            </div>
                            <div class="custom-modal-body">
                                ${hasOrder ? `
                                    <p style="margin-bottom:0.5rem;color:#e0e0e0;font-size:0.95rem;">N° Order actuel: <strong style="color:#2196F3;font-size:1.05rem;">${invoice.document_numero_Order}</strong></p>
                                ` : ''}
                                ${hasBL ? `
                                    <p style="margin-bottom:1.25rem;color:#e0e0e0;font-size:0.95rem;">Bon de livraison: <strong style="color:#4caf50;font-size:1.05rem;">${invoice.document_bon_de_livraison}</strong></p>
                                ` : ''}
                                ${hasOrder ? `
                                    <label style="display:flex;align-items:center;cursor:pointer;padding:1rem;background:#1e1e1e;border:2px solid #2196F3;border-radius:10px;margin-bottom:1rem;transition:all 0.2s ease;">
                                        <input type="checkbox" id="includeOrderCheckbox" checked style="width:20px;height:20px;margin-right:1rem;cursor:pointer;accent-color:#2196F3;">
                                        <span style="font-size:0.95rem;color:#e0e0e0;font-weight:500;">
                                            Inclure le N° Order dans le PDF
                                        </span>
                                    </label>
                                ` : ''}
                                ${hasBL ? `
                                    <label style="display:flex;align-items:center;cursor:pointer;padding:1rem;background:#1e1e1e;border:2px solid #4caf50;border-radius:10px;transition:all 0.2s ease;">
                                        <input type="checkbox" id="includeBLCheckbox" checked style="width:20px;height:20px;margin-right:1rem;cursor:pointer;accent-color:#4caf50;">
                                        <span style="font-size:0.95rem;color:#e0e0e0;font-weight:500;">
                                            Inclure le Bon de livraison dans le PDF
                                        </span>
                                    </label>
                                ` : ''}
                            </div>
                            <div class="custom-modal-footer">
                                <button class="custom-modal-btn primary" id="continueBtn" style="padding:0.75rem 2rem;font-size:1rem;">Télécharger</button>
                            </div>
                        </div>
                    `;
                    
                    document.body.appendChild(overlay);
                    
                    const orderCheckbox = overlay.querySelector('#includeOrderCheckbox');
                    const blCheckbox = overlay.querySelector('#includeBLCheckbox');
                    const continueBtn = overlay.querySelector('#continueBtn');
                    
                    continueBtn.addEventListener('click', () => {
                        const includeOrder = orderCheckbox ? orderCheckbox.checked : false;
                        const includeBL = blCheckbox ? blCheckbox.checked : false;
                        overlay.remove();
                        resolve({ includeOrder, includeBL });
                    });
                    
                    overlay.addEventListener('click', (e) => {
                        if (e.target === overlay) {
                            const includeOrder = orderCheckbox ? orderCheckbox.checked : false;
                            const includeBL = blCheckbox ? blCheckbox.checked : false;
                            overlay.remove();
                            resolve({ includeOrder, includeBL });
                        }
                    });
                    
                    setTimeout(() => continueBtn.focus(), 100);
                });
                
                if (!result.includeOrder) {
                    console.log('⚠️ User chose not to include Order number in PDF');
                    invoice.document_numero_Order = null;
                } else {
                    console.log('✅ Including Order number in PDF:', invoice.document_numero_Order);
                }
                
                if (!result.includeBL) {
                    console.log('⚠️ User chose not to include BL in PDF');
                    invoice.document_bon_de_livraison = null;
                } else {
                    console.log('✅ Including BL in PDF:', invoice.document_bon_de_livraison);
                }
            }
        } else if (invoice.document_type === 'bl' || invoice.document_type === 'bon_livraison') {
            // For BON DE LIVRAISON: show N° Order option
            const hasBC = invoice.document_numero_commande && invoice.document_numero_commande.trim() !== '';
            
            if (hasBC) {
                const includeBC = await new Promise((resolve) => {
                    const overlay = document.createElement('div');
                    overlay.className = 'custom-modal-overlay';
                    
                    overlay.innerHTML = `
                        <div class="custom-modal">
                            <div class="custom-modal-header">
                                <span class="custom-modal-icon info">📋</span>
                                <h3 class="custom-modal-title">Télécharger PDF</h3>
                            </div>
                            <div class="custom-modal-body">
                                <p style="margin-bottom:1.25rem;color:#e0e0e0;font-size:0.95rem;">N° Order: <strong style="color:#ff9800;font-size:1.05rem;">${invoice.document_numero_commande}</strong></p>
                                <label style="display:flex;align-items:center;cursor:pointer;padding:1rem;background:#1e1e1e;border:2px solid #ff9800;border-radius:10px;transition:all 0.2s ease;">
                                    <input type="checkbox" id="includeBCCheckbox" checked style="width:20px;height:20px;margin-right:1rem;cursor:pointer;accent-color:#ff9800;">
                                    <span style="font-size:0.95rem;color:#e0e0e0;font-weight:500;">
                                        Inclure le N° Order dans le PDF
                                    </span>
                                </label>
                            </div>
                            <div class="custom-modal-footer">
                                <button class="custom-modal-btn primary" id="continueBtn" style="padding:0.75rem 2rem;font-size:1rem;">Télécharger</button>
                            </div>
                        </div>
                    `;
                    
                    document.body.appendChild(overlay);
                    
                    const checkbox = overlay.querySelector('#includeBCCheckbox');
                    const continueBtn = overlay.querySelector('#continueBtn');
                    
                    continueBtn.addEventListener('click', () => {
                        const include = checkbox.checked;
                        overlay.remove();
                        resolve(include);
                    });
                    
                    overlay.addEventListener('click', (e) => {
                        if (e.target === overlay) {
                            const include = checkbox.checked;
                            overlay.remove();
                            resolve(include);
                        }
                    });
                    
                    setTimeout(() => continueBtn.focus(), 100);
                });
                
                if (!includeBC) {
                    console.log('⚠️ User chose not to include BC in PDF');
                    invoice.document_numero_commande = null;
                } else {
                    console.log('✅ Including BC in PDF:', invoice.document_numero_commande);
                }
            }
        }
        
        console.log('📄 Continuing with PDF generation...');
        
        // Check if there are products with zero quantity or price
        const hasZeroProducts = invoice.products && invoice.products.some(p => 
            parseFloat(p.quantite) === 0 || parseFloat(p.prix_unitaire_ht) === 0
        );
        
        let includeZeroProducts = true; // Default: include all products
        
        if (hasZeroProducts) {
            includeZeroProducts = await new Promise((resolve) => {
                const overlay = document.createElement('div');
                overlay.className = 'custom-modal-overlay';
                
                overlay.innerHTML = `
                    <div class="custom-modal">
                        <div class="custom-modal-header">
                            <span class="custom-modal-icon warning">⚠️</span>
                            <h3 class="custom-modal-title">Produits avec quantité ou prix zéro</h3>
                        </div>
                        <div class="custom-modal-body">
                            <p style="margin-bottom:1rem;color:#e0e0e0;font-size:0.95rem;">
                                Certains produits ont une <strong style="color:#ff9800;">quantité = 0</strong> ou un <strong style="color:#ff9800;">prix = 0</strong>.
                            </p>
                            <p style="color:#b0b0b0;font-size:0.9rem;">
                                Voulez-vous les afficher dans le PDF ?
                            </p>
                        </div>
                        <div class="custom-modal-footer">
                            <button id="excludeZeroBtnChaimae" class="custom-modal-btn secondary">
                                ❌ Non, masquer
                            </button>
                            <button id="includeZeroBtnChaimae" class="custom-modal-btn primary">
                                ✅ Oui, afficher
                            </button>
                        </div>
                    </div>
                `;
                
                document.body.appendChild(overlay);
                
                const excludeBtn = document.getElementById('excludeZeroBtnChaimae');
                const includeBtn = document.getElementById('includeZeroBtnChaimae');
                
                excludeBtn.addEventListener('click', () => {
                    overlay.remove();
                    resolve(false);
                });
                
                includeBtn.addEventListener('click', () => {
                    overlay.remove();
                    resolve(true);
                });
                
                overlay.addEventListener('click', (e) => {
                    if (e.target === overlay) {
                        overlay.remove();
                        resolve(true); // Default to include if user clicks outside
                    }
                });
                
                setTimeout(() => includeBtn.focus(), 100);
            });
            
            console.log('🔍 User choice for zero products:', includeZeroProducts ? 'Include' : 'Exclude');
        }
        
        // Mark products with zero values for special display (don't remove them)
        const showZeroValues = includeZeroProducts;
        console.log('📊 Show zero values in PDF:', showZeroValues);
        
        // Check if jsPDF is loaded
        if (typeof window.jspdf === 'undefined') {
            await loadJsPDFChaimae();
        }
        
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        // Colors
        const blueColor = [33, 97, 140]; // #21618C
        const greenColor = [76, 175, 80]; // #4caf50
        const orangeColor = [255, 152, 0]; // #FF9800
        
        const dateStr = new Date(invoice.document_date).toLocaleDateString('fr-FR');
        
        // Determine document type
        const docType = invoice.document_type === 'facture' ? 'FACTURE' : 
                       invoice.document_type === 'devis' ? 'DEVIS' : 
                       'BON DE LIVRAISON';
        const docNumero = invoice.document_numero || invoice.document_numero_devis || invoice.document_numero_bl || '-';
        
        // Function to add header
        const addHeader = (isFirstPage = true) => {
            // Add Logo
            try {
                const logoImg = document.querySelector('img[src*="chaimae.png"]') || 
                               document.querySelector('img[data-asset="chaimae"]') ||
                               document.querySelector('img[src^="data:image"]');
                if (logoImg && logoImg.src && logoImg.src.startsWith('data:')) {
                    doc.addImage(logoImg.src, 'PNG', 15, 10, 35, 35);
                }
            } catch (error) {
                console.log('Logo not added:', error);
            }
            
            // Company Header
            doc.setFontSize(18);
            doc.setTextColor(...blueColor);
            doc.setFont(undefined, 'bold');
            doc.text('CHAIMAE ERRBAHI DIQ sarl (AU)', 105, 20, { align: 'center' });
            
            doc.setFontSize(10);
            doc.setFont(undefined, 'normal');
            doc.setTextColor(0, 0, 0);
            doc.text('Patente N° 52003366 - NIF : 40190505', 105, 27, { align: 'center' });
            doc.text('RC N° : 10487 - CNSS : 8721591', 105, 32, { align: 'center' });
            doc.text('ICE : 001544861000014', 105, 37, { align: 'center' });
            
            // Client Info
            doc.setFontSize(11);
            doc.setFont(undefined, 'bold');
            doc.text('CLIENT :', 15, 55);
            doc.setTextColor(...greenColor);
            doc.text(invoice.client_nom, 40, 55);
            
            // Only show ICE if it exists and is not "0"
            if (invoice.client_ice && invoice.client_ice !== '0') {
                doc.setTextColor(0, 0, 0);
                doc.text('ICE :', 15, 62);
                doc.setTextColor(...greenColor);
                doc.text(invoice.client_ice, 40, 62);
            }
            
            // Date
            doc.setTextColor(0, 0, 0);
            doc.text(`Date: ${dateStr}`, 150, 55);
            
            // Document Number
            doc.setFontSize(14);
            doc.setFont(undefined, 'bold');
            doc.setTextColor(0, 0, 0);
            
            // Adjust position based on document type length
            if (invoice.document_type === 'bon_livraison') {
                doc.text(`${docType} N°:`, 15, 75);
                doc.setTextColor(...orangeColor);
                doc.text(docNumero, 80, 75);
            } else {
                doc.text(`${docType} N°:`, 15, 75);
                doc.setTextColor(...orangeColor);
                doc.text(docNumero, 55, 75);
            }
            
            let currentY = 75;
            
            // Additional fields based on document type
            if (invoice.document_type === 'facture') {
                if (invoice.document_numero_Order) {
                    currentY += 7;
                    doc.setFontSize(11);
                    doc.setFont(undefined, 'bold');
                    doc.setTextColor(0, 0, 0);
                    doc.text('N° Order :', 15, currentY);
                    doc.setTextColor(33, 150, 243);
                    doc.text(invoice.document_numero_Order, 45, currentY);
                }
                if (invoice.document_bon_de_livraison) {
                    currentY += 7;
                    doc.setFontSize(11);
                    doc.setFont(undefined, 'bold');
                    doc.setTextColor(0, 0, 0);
                    doc.text('Bon de livraison :', 15, currentY);
                    doc.setTextColor(...greenColor);
                    doc.text(invoice.document_bon_de_livraison, 60, currentY);
                }
            } else if (invoice.document_type === 'bon_livraison' && invoice.document_numero_commande) {
                currentY += 7;
                doc.setFontSize(11);
                doc.setFont(undefined, 'bold');
                doc.setTextColor(0, 0, 0);
                doc.text('N° Order :', 15, currentY);
                doc.setTextColor(255, 152, 0);
                doc.text(invoice.document_numero_commande, 40, currentY);
            }
        };
        
        // Function to add footer
        const addFooter = (pageNum, totalPages) => {
            doc.setTextColor(0, 0, 0);
            doc.setFontSize(7);
            doc.setFont(undefined, 'normal');
            doc.text('RIB : 007 720 00 05979000000368 12  ATTIJARI WAFA BANQ', 15, 275);
            doc.text('Email: errbahiabderrahim@gmail.com', 15, 279);
            doc.text('ADRESSE: LOT ALBAHR AV TETOUAN N94 GARAGE 2 M\'DIQ', 15, 283);
            doc.text('Tel: +212 661 307 323', 15, 287);
            
            // Page numbering
            if (pageNum && totalPages) {
                doc.setFontSize(8);
                doc.setTextColor(128, 128, 128);
                doc.text(`Page ${pageNum} / ${totalPages}`, 105, 293, { align: 'center' });
            }
        };
        
        // Add header to first page
        addHeader(true);
        
        // Calculate start Y based on additional fields
        let startY = 85;
        if (invoice.document_type === 'facture') {
            if (invoice.document_numero_Order) startY += 7;
            if (invoice.document_bon_de_livraison) startY += 7;
        } else if (invoice.document_type === 'bon_livraison' && invoice.document_numero_commande) {
            startY += 7;
        }
        
        // Products Table
        doc.setFillColor(...blueColor);
        doc.rect(15, startY, 180, 8, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(9);
        doc.setFont(undefined, 'bold');
        doc.text('Désignation', 18, startY + 5.5);
        doc.text('QTE', 115, startY + 5.5, { align: 'center' });
        doc.text('PU HT', 150, startY + 5.5, { align: 'right' });
        doc.text('TOTAL HT', 188, startY + 5.5, { align: 'right' });
        
        // Table Body
        let currentY = startY + 10;
        doc.setTextColor(0, 0, 0);
        doc.setFont(undefined, 'normal');
        doc.setFontSize(9);
        
        let pageCount = 1;
        const pages = [];
        
        console.log('=== PDF Generation Started (CHAIMAE) ===');
        console.log('Document Type:', invoice.document_type);
        console.log('Initial startY (Page 1):', startY);
        console.log('Continuation pages will use same calculation as Page 1');
        console.log('Total Products:', invoice.products.length);
        
        invoice.products.forEach((product, index) => {
            const designation = product.designation || '';
            const lines = doc.splitTextToSize(designation, 85);
            const rowHeight = Math.max(8, (lines.length * 4.5) + 4);
            
            // Split very long products across multiple pages if needed
            let remainingLines = [...lines];
            let isFirstPart = true;
            
            while (remainingLines.length > 0) {
                const availableSpace = 215 - currentY;
                
                // If not enough space for even one line, create new page first
                if (availableSpace < 15) {
                    pages.push(pageCount);
                    doc.addPage();
                    addHeader(false);
                    pageCount++;
                    
                    let newStartY = 85;
                    if (invoice.document_type === 'facture') {
                        if (invoice.document_numero_Order) newStartY += 7;
                        if (invoice.document_bon_de_livraison) newStartY += 7;
                    } else if (invoice.document_type === 'bon_livraison' && invoice.document_numero_commande) {
                        newStartY += 7;
                    }
                    
                    doc.setFillColor(...blueColor);
                    doc.rect(15, newStartY, 180, 8, 'F');
                    doc.setTextColor(255, 255, 255);
                    doc.setFontSize(9);
                    doc.setFont(undefined, 'bold');
                    doc.text('Désignation', 18, newStartY + 5.5);
                    doc.text('QTE', 115, newStartY + 5.5, { align: 'center' });
                    doc.text('PU HT', 150, newStartY + 5.5, { align: 'right' });
                    doc.text('TOTAL HT', 188, newStartY + 5.5, { align: 'right' });
                    
                    currentY = newStartY + 10;
                    doc.setTextColor(0, 0, 0);
                    doc.setFont(undefined, 'normal');
                    doc.setFontSize(9);
                    continue;
                }
                
                const maxLinesPerPage = Math.floor((availableSpace - 10) / 4.5);
                const linesToDraw = remainingLines.splice(0, Math.max(1, maxLinesPerPage));
                const partialRowHeight = Math.max(8, (linesToDraw.length * 4.5) + 4);
                
                // Alternate row colors (only for first part)
                if (isFirstPart && index % 2 === 0) {
                    doc.setFillColor(245, 245, 245);
                    doc.rect(15, currentY - 3, 180, partialRowHeight, 'F');
                }
                
                doc.setFontSize(8);
                // Draw lines
                linesToDraw.forEach((line, lineIndex) => {
                    doc.text(line, 18, currentY + 3 + (lineIndex * 4.5));
                });
                
                // Only show quantity, price, and total on the first part
                if (isFirstPart) {
                    const centerOffset = (linesToDraw.length > 1) ? ((linesToDraw.length - 1) * 2.25) : 0;
                    
                    const qty = parseFloat(product.quantite);
                    if (showZeroValues || qty !== 0) {
                        doc.text(String(product.quantite || ''), 115, currentY + 3 + centerOffset, { align: 'center' });
                    }
                    
                    doc.setFontSize(7.5);
                    const price = parseFloat(product.prix_unitaire_ht);
                    if (showZeroValues || price !== 0) {
                        doc.text(`${formatNumberForPDFChaimae(product.prix_unitaire_ht)} DH`, 150, currentY + 3 + centerOffset, { align: 'right' });
                    }
                    
                    const total = parseFloat(product.total_ht);
                    if (showZeroValues || total !== 0) {
                        doc.text(`${formatNumberForPDFChaimae(product.total_ht)} DH`, 188, currentY + 3 + centerOffset, { align: 'right' });
                    }
                }
                
                currentY += partialRowHeight;
                isFirstPart = false;
                
                // If there are more lines and we're near the bottom, create new page
                if (remainingLines.length > 0 && currentY > 200) {
                    pages.push(pageCount);
                    doc.addPage();
                    addHeader(false);
                    pageCount++;
                    
                    let newStartY = 85;
                    if (invoice.document_type === 'facture') {
                        if (invoice.document_numero_Order) {
                            newStartY += 7;
                        }
                        if (invoice.document_bon_de_livraison) {
                            newStartY += 7;
                        }
                    } else if (invoice.document_type === 'bon_livraison' && invoice.document_numero_commande) {
                        newStartY += 7;
                    }
                    
                    doc.setFillColor(...blueColor);
                    doc.rect(15, newStartY, 180, 8, 'F');
                    doc.setTextColor(255, 255, 255);
                    doc.setFontSize(9);
                    doc.setFont(undefined, 'bold');
                    doc.text('Désignation', 18, newStartY + 5.5);
                    doc.text('QTE', 115, newStartY + 5.5, { align: 'center' });
                    doc.text('PU HT', 150, newStartY + 5.5, { align: 'right' });
                    doc.text('TOTAL HT', 188, newStartY + 5.5, { align: 'right' });
                    
                    currentY = newStartY + 10;
                    doc.setTextColor(0, 0, 0);
                    doc.setFont(undefined, 'normal');
                    doc.setFontSize(9);
                }
            }
        });
        
        // Totals
        currentY += 10;
        
        // TOTAL HT
        doc.setFillColor(245, 245, 245);
        doc.rect(110, currentY, 85, 8, 'F');
        doc.setFont(undefined, 'bold');
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(9);
        doc.text('TOTAL HT :', 113, currentY + 5.5);
        doc.setFontSize(8);
        doc.text(`${formatNumberForPDFChaimae(invoice.total_ht)} DH`, 192, currentY + 5.5, { align: 'right' });
        
        // MONTANT TVA
        currentY += 8;
        doc.setFillColor(255, 255, 255);
        doc.rect(110, currentY, 85, 8, 'F');
        doc.setFontSize(9);
        doc.text(`MONTANT TVA ${invoice.tva_rate}% :`, 113, currentY + 5.5);
        doc.setFontSize(8);
        doc.text(`${formatNumberForPDFChaimae(invoice.montant_tva)} DH`, 192, currentY + 5.5, { align: 'right' });
        
        // MONTANT T.T.C
        currentY += 8;
        doc.setFillColor(173, 216, 230);
        doc.rect(110, currentY, 85, 8, 'F');
        doc.setTextColor(...blueColor);
        doc.setFontSize(9);
        doc.text('MONTANT T.T.C :', 113, currentY + 5.5);
        doc.setFontSize(8.5);
        doc.text(`${formatNumberForPDFChaimae(invoice.total_ttc)} DH`, 192, currentY + 5.5, { align: 'right' });
        
        // Amount in words
        currentY += 15;
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(9);
        doc.setFont(undefined, 'italic');
        const amountInWords = numberToFrenchWordsChaimae(invoice.total_ttc);
        // Only show amount in words for Facture and Devis, not for Bon de livraison
        if (invoice.document_type !== 'bon_livraison') {
            const docTypeText = invoice.document_type === 'facture' ? 'Facture' : 'Devis';
            doc.text(`La Présente ${docTypeText} est Arrêtée à la somme de : ${amountInWords}`, 15, currentY, { maxWidth: 180 });
        }
        
        // Add notes if any
        const noteResult = await window.electron.dbChaimae.getNote(invoiceId);
        if (noteResult.success && noteResult.data) {
            currentY += 15;
            doc.setFontSize(8);
            doc.setFont(undefined, 'bold');
            doc.setTextColor(96, 125, 139);
            doc.text('Notes:', 15, currentY);
            
            doc.setFont(undefined, 'bold');
            doc.setTextColor(0, 0, 0);
            doc.setFontSize(9);
            const noteLines = doc.splitTextToSize(noteResult.data, 180);
            const footerTopY = 270;
            let lineY = currentY + 4;
            for (let i = 0; i < noteLines.length; i++) {
                if (lineY > footerTopY) {
                    // finalize current page and start a new one
                    pages.push(pageCount);
                    doc.addPage();
                    addHeader(false);
                    pageCount++;
                    // continuation title positioned below header (same logic as table startY)
                    let notesStartY = 85;
                    if (invoice.document_type === 'facture') {
                        if (invoice.document_numero_Order) notesStartY += 7;
                        if (invoice.document_bon_de_livraison) notesStartY += 7;
                    } else if (invoice.document_type === 'bon_livraison' && invoice.document_numero_commande) {
                        notesStartY += 7;
                    }
                    // Lower slightly
                    notesStartY += 6;
                    doc.setFontSize(8);
                    doc.setFont(undefined, 'bold');
                    doc.setTextColor(96, 125, 139);
                    doc.text('Notes (suite) :', 15, notesStartY - 4);
                    doc.setTextColor(0, 0, 0);
                    doc.setFont(undefined, 'bold');
                    doc.setFontSize(9);
                    lineY = notesStartY;
                }
                doc.text(noteLines[i], 15, lineY);
                lineY += 4.5;
            }
        }
        
        // Add page numbering to all pages
        pages.push(pageCount);
        const totalPages = pages.length;
        
        for (let i = 0; i < totalPages; i++) {
            doc.setPage(i + 1);
            addFooter(i + 1, totalPages);
        }
        
        // Save PDF
        const filename = `${docType}_${docNumero}_${invoice.client_nom}.pdf`;
        doc.save(filename);
        
        window.notify.success('Succès', 'PDF téléchargé avec succès', 3000);
        
    } catch (error) {
        console.error('❌ Error generating PDF:', error);
        window.notify.error('Erreur', 'Impossible de générer le PDF: ' + error.message, 4000);
    }
}

// Download Bon de travaux as PDF (without prices)
window.downloadBonDeTravauxPDFChaimae = async function(invoiceId) {
    try {
        console.log('📥 Generating Bon de travaux PDF for invoice:', invoiceId);
        
        // Get invoice data
        const result = await window.electron.dbChaimae.getInvoiceById(invoiceId);
        
        if (!result.success || !result.data) {
            throw new Error('Document introuvable');
        }
        
        const invoice = result.data;
        
        // Check if there are products with zero quantity or price
        const hasZeroProducts = invoice.products && invoice.products.some(p => 
            parseFloat(p.quantite) === 0 || parseFloat(p.prix_unitaire_ht) === 0
        );
        
        let includeZeroProducts = true; // Default: include all products
        
        if (hasZeroProducts) {
            includeZeroProducts = await new Promise((resolve) => {
                const overlay = document.createElement('div');
                overlay.className = 'custom-modal-overlay';
                
                overlay.innerHTML = `
                    <div class="custom-modal">
                        <div class="custom-modal-header">
                            <span class="custom-modal-icon warning">⚠️</span>
                            <h3 class="custom-modal-title">Produits avec quantité ou prix zéro</h3>
                        </div>
                        <div class="custom-modal-body">
                            <p style="margin-bottom:1rem;color:#e0e0e0;font-size:0.95rem;">
                                Certains produits ont une <strong style="color:#ff9800;">quantité = 0</strong> ou un <strong style="color:#ff9800;">prix = 0</strong>.
                            </p>
                            <p style="color:#b0b0b0;font-size:0.9rem;">
                                Voulez-vous les afficher dans le Bon de travaux ?
                            </p>
                        </div>
                        <div class="custom-modal-footer">
                            <button id="excludeZeroBtnBonTravauxChaimae" class="custom-modal-btn secondary">
                                ❌ Non, masquer
                            </button>
                            <button id="includeZeroBtnBonTravauxChaimae" class="custom-modal-btn primary">
                                ✅ Oui, afficher
                            </button>
                        </div>
                    </div>
                `;
                
                document.body.appendChild(overlay);
                
                const excludeBtn = document.getElementById('excludeZeroBtnBonTravauxChaimae');
                const includeBtn = document.getElementById('includeZeroBtnBonTravauxChaimae');
                
                excludeBtn.addEventListener('click', () => {
                    overlay.remove();
                    resolve(false);
                });
                
                includeBtn.addEventListener('click', () => {
                    overlay.remove();
                    resolve(true);
                });
                
                overlay.addEventListener('click', (e) => {
                    if (e.target === overlay) {
                        overlay.remove();
                        resolve(true); // Default to include if user clicks outside
                    }
                });
                
                setTimeout(() => includeBtn.focus(), 100);
            });
            
            console.log('🔍 User choice for zero products in Bon de travaux:', includeZeroProducts ? 'Include' : 'Exclude');
        }
        
        // Mark products with zero values for special display (don't remove them)
        const showZeroValues = includeZeroProducts;
        console.log('📊 Show zero values in Bon de travaux:', showZeroValues);
        
        // Check if jsPDF is loaded
        if (typeof window.jspdf === 'undefined') {
            await loadJsPDFChaimae();
        }
        
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        // Colors
        const blueColor = [33, 97, 140];
        const greenColor = [76, 175, 80];
        const purpleColor = [156, 39, 176]; // For "Bon de travaux"
        
        const dateStr = new Date(invoice.document_date).toLocaleDateString('fr-FR');
        
        // Function to add header
        const addHeader = (isFirstPage = true) => {
            // Add Logo
            try {
                const logoImg = document.querySelector('img[src*="chaimae.png"]') || 
                               document.querySelector('img[data-asset="chaimae"]') ||
                               document.querySelector('img[src^="data:image"]');
                if (logoImg && logoImg.src && logoImg.src.startsWith('data:')) {
                    doc.addImage(logoImg.src, 'PNG', 15, 10, 35, 35);
                }
            } catch (error) {
                console.log('Logo not added:', error);
            }
            
            // Company Header
            doc.setFontSize(18);
            doc.setTextColor(...blueColor);
            doc.setFont(undefined, 'bold');
            doc.text('CHAIMAE ERRBAHI DIQ sarl (AU)', 105, 20, { align: 'center' });
            
            doc.setFontSize(10);
            doc.setFont(undefined, 'normal');
            doc.setTextColor(0, 0, 0);
            doc.text('Patente N° 52003366 - NIF : 40190505', 105, 27, { align: 'center' });
            doc.text('RC N° : 10487 - CNSS : 8721591', 105, 32, { align: 'center' });
            doc.text('ICE : 001544861000014', 105, 37, { align: 'center' });
            
            // Client Info
            doc.setFontSize(11);
            doc.setFont(undefined, 'bold');
            doc.setTextColor(0, 0, 0);
            doc.text('CLIENT :', 15, 50);
            doc.setTextColor(...greenColor);
            doc.text(invoice.client_nom, 40, 50);
            
            // Only show ICE if it exists and is not "0"
            if (invoice.client_ice && invoice.client_ice !== '0') {
                doc.setTextColor(0, 0, 0);
                doc.text('ICE :', 15, 57);
                doc.setTextColor(...greenColor);
                doc.text(invoice.client_ice, 40, 57);
            }
            
            // Date
            doc.setTextColor(0, 0, 0);
            doc.text(`Date: ${dateStr}`, 150, 50);
            
            // "BON DE TRAVAUX" title in center (below ICE)
            doc.setFontSize(20);
            doc.setFont(undefined, 'bold');
            doc.setTextColor(...blueColor);
            doc.text('BON DE TRAVAUX', 105, 70, { align: 'center' });
        };
        
        // Function to add footer
        const addFooter = (pageNum, totalPages) => {
            doc.setTextColor(0, 0, 0);
            doc.setFontSize(7);
            doc.setFont(undefined, 'normal');
            doc.text('RIB : 007 720 00 05979000000368 12  ATTIJARI WAFA BANQ', 15, 275);
            doc.text('Email: errbahiabderrahim@gmail.com', 15, 279);
            doc.text('ADRESSE: LOT ALBAHR AV TETOUAN N94 GARAGE 2 M\'DIQ', 15, 283);
            doc.text('Tel: +212 661 307 323', 15, 287);
            
            // Page numbering
            if (pageNum && totalPages) {
                doc.setFontSize(8);
                doc.setTextColor(128, 128, 128);
                doc.text(`Page ${pageNum} / ${totalPages}`, 105, 293, { align: 'center' });
            }
        };
        
        // Add header to first page
        addHeader(true);
        
        const startY = 85;
        
        // Helper function to format numbers
        const formatNumberForPDF = (num) => {
            return parseFloat(num).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
        };
        
        // Products Table (with all columns and prices)
        doc.setFillColor(...blueColor);
        doc.rect(15, startY, 180, 8, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(9);
        doc.setFont(undefined, 'bold');
        doc.text('Désignation', 18, startY + 5.5);
        doc.text('QTE', 115, startY + 5.5, { align: 'center' });
        doc.text('Prix unitaire HT', 150, startY + 5.5, { align: 'right' });
        doc.text('Prix total HT', 188, startY + 5.5, { align: 'right' });
        
        // Table Body
        let currentY = startY + 10;
        doc.setTextColor(0, 0, 0);
        doc.setFont(undefined, 'normal');
        doc.setFontSize(9);
        
        let pageCount = 1;
        const pages = [];
        
        invoice.products.forEach((product, index) => {
            const designation = product.designation || '';
            const lines = doc.splitTextToSize(designation, 75);
            const rowHeight = Math.max(8, (lines.length * 4.5) + 4);
            
            // Split very long products across multiple pages if needed
            let remainingLines = [...lines];
            let isFirstPart = true;
            
            while (remainingLines.length > 0) {
                const availableSpace = 215 - currentY;
                
                // If not enough space for even one line, create new page first
                if (availableSpace < 15) {
                    pages.push(pageCount);
                    doc.addPage();
                    addHeader(false);
                    pageCount++;
                    
                    doc.setFillColor(...blueColor);
                    doc.rect(15, startY, 180, 8, 'F');
                    doc.setTextColor(255, 255, 255);
                    doc.setFontSize(9);
                    doc.setFont(undefined, 'bold');
                    doc.text('Désignation', 18, startY + 5.5);
                    doc.text('QTE', 115, startY + 5.5, { align: 'center' });
                    doc.text('Prix unitaire HT', 150, startY + 5.5, { align: 'right' });
                    doc.text('Prix total HT', 188, startY + 5.5, { align: 'right' });
                    
                    currentY = startY + 10;
                    doc.setTextColor(0, 0, 0);
                    doc.setFont(undefined, 'normal');
                    doc.setFontSize(9);
                    continue;
                }
                
                const maxLinesPerPage = Math.floor((availableSpace - 10) / 4.5);
                const linesToDraw = remainingLines.splice(0, Math.max(1, maxLinesPerPage));
                const partialRowHeight = Math.max(8, (linesToDraw.length * 4.5) + 4);
                
                // Alternate row colors (only for first part)
                if (isFirstPart && index % 2 === 0) {
                    doc.setFillColor(245, 245, 245);
                    doc.rect(15, currentY - 3, 180, partialRowHeight, 'F');
                }
                
                doc.setFontSize(8);
                // Draw lines
                linesToDraw.forEach((line, lineIndex) => {
                    doc.text(line, 18, currentY + 3 + (lineIndex * 4.5));
                });
                
                // Only show quantity, price, and total on the first part
                if (isFirstPart) {
                    const centerOffset = (linesToDraw.length > 1) ? ((linesToDraw.length - 1) * 2.25) : 0;
                    
                    const qty = parseFloat(product.quantite);
                    if (showZeroValues || qty !== 0) {
                        doc.text(String(product.quantite || ''), 115, currentY + 3 + centerOffset, { align: 'center' });
                    }
                    
                    const price = parseFloat(product.prix_unitaire_ht);
                    if (showZeroValues || price !== 0) {
                        doc.text(`${formatNumberForPDF(product.prix_unitaire_ht)} DH`, 150, currentY + 3 + centerOffset, { align: 'right' });
                    }
                    
                    const total = parseFloat(product.total_ht);
                    if (showZeroValues || total !== 0) {
                        doc.text(`${formatNumberForPDF(product.total_ht)} DH`, 188, currentY + 3 + centerOffset, { align: 'right' });
                    }
                }
                
                currentY += partialRowHeight;
                isFirstPart = false;
                
                // If there are more lines and we're near the bottom, create new page
                if (remainingLines.length > 0 && currentY > 200) {
                    pages.push(pageCount);
                    doc.addPage();
                    addHeader(false);
                    pageCount++;
                    
                    doc.setFillColor(...blueColor);
                    doc.rect(15, startY, 180, 8, 'F');
                    doc.setTextColor(255, 255, 255);
                    doc.setFontSize(9);
                    doc.setFont(undefined, 'bold');
                    doc.text('Désignation', 18, startY + 5.5);
                    doc.text('QTE', 115, startY + 5.5, { align: 'center' });
                    doc.text('Prix unitaire HT', 150, startY + 5.5, { align: 'right' });
                    doc.text('Prix total HT', 188, startY + 5.5, { align: 'right' });
                    
                    currentY = startY + 10;
                    doc.setTextColor(0, 0, 0);
                    doc.setFont(undefined, 'normal');
                    doc.setFontSize(9);
                }
            }
        });
        
        // Totals section - directly below table (dynamic position)
        currentY += 10; // Add some spacing after table
        
        doc.setFillColor(...blueColor);
        doc.rect(110, currentY, 85, 7, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(9);
        doc.setFont(undefined, 'bold');
        doc.text('Total HT', 113, currentY + 5);
        doc.text(`${formatNumberForPDF(invoice.total_ht)} DH`, 192, currentY + 5, { align: 'right' });
        
        currentY += 7;
        doc.setFillColor(245, 245, 245);
        doc.rect(110, currentY, 85, 7, 'F');
        doc.setTextColor(0, 0, 0);
        doc.text(`TVA ${invoice.tva_rate}%`, 113, currentY + 5);
        doc.text(`${formatNumberForPDF(invoice.montant_tva)} DH`, 192, currentY + 5, { align: 'right' });
        
        currentY += 7;
        doc.setFillColor(...greenColor);
        doc.rect(110, currentY, 85, 7, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFont(undefined, 'bold');
        doc.text('Total TTC', 113, currentY + 5);
        doc.text(`${formatNumberForPDF(invoice.total_ttc)} DH`, 192, currentY + 5, { align: 'right' });
        
        // Add page numbering to all pages
        pages.push(pageCount);
        const totalPages = pages.length;
        
        for (let i = 0; i < totalPages; i++) {
            doc.setPage(i + 1);
            addFooter(i + 1, totalPages);
        }
        
        // Save PDF
        const docNumero = invoice.document_numero || invoice.document_numero_devis || invoice.document_numero_bl || 'N';
        const filename = `Bon_de_travaux_${docNumero}_${invoice.client_nom}.pdf`;
        doc.save(filename);
        
        window.notify.success('Succès', 'Bon de travaux téléchargé avec succès', 3000);
        
    } catch (error) {
        console.error('❌ Error generating Bon de travaux PDF:', error);
        window.notify.error('Erreur', 'Impossible de générer le PDF: ' + error.message, 4000);
    }
}

// Convert number to French words
function numberToFrenchWordsChaimae(number) {
    const units = ['', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf'];
    const teens = ['dix', 'onze', 'douze', 'treize', 'quatorze', 'quinze', 'seize', 'dix-sept', 'dix-huit', 'dix-neuf'];
    const tens = ['', '', 'vingt', 'trente', 'quarante', 'cinquante', 'soixante', 'soixante', 'quatre-vingt', 'quatre-vingt'];
    
    function convertLessThanThousand(n) {
        if (n === 0) return '';
        if (n < 10) return units[n];
        if (n < 20) return teens[n - 10];
        if (n < 70) {
            const ten = Math.floor(n / 10);
            const unit = n % 10;
            if (unit === 0) return tens[ten];
            if (unit === 1 && ten === 2) return 'vingt et un';
            if (unit === 1 && ten > 2) return tens[ten] + ' et un';
            return tens[ten] + '-' + units[unit];
        }
        if (n < 80) {
            const remainder = n - 60;
            if (remainder < 10) return 'soixante-' + units[remainder];
            return 'soixante-' + teens[remainder - 10];
        }
        if (n < 100) {
            const remainder = n - 80;
            if (remainder === 0) return 'quatre-vingts';
            if (remainder < 10) return 'quatre-vingt-' + units[remainder];
            return 'quatre-vingt-' + teens[remainder - 10];
        }
        
        const hundred = Math.floor(n / 100);
        const remainder = n % 100;
        let result = hundred === 1 ? 'cent' : units[hundred] + ' cent';
        if (hundred > 1 && remainder === 0) result += 's';
        if (remainder > 0) result += ' ' + convertLessThanThousand(remainder);
        return result;
    }
    
    function convertNumber(n) {
        if (n === 0) return 'zéro';
        if (n < 1000) return convertLessThanThousand(n);
        
        // Billions (milliards)
        if (n >= 1000000000) {
            const billion = Math.floor(n / 1000000000);
            const remainder = n % 1000000000;
            let result = billion === 1 ? 'un milliard' : convertLessThanThousand(billion) + ' milliards';
            if (remainder > 0) result += ' ' + convertNumber(remainder);
            return result;
        }
        
        // Millions
        if (n >= 1000000) {
            const million = Math.floor(n / 1000000);
            const remainder = n % 1000000;
            let result = million === 1 ? 'un million' : convertLessThanThousand(million) + ' millions';
            if (remainder > 0) result += ' ' + convertNumber(remainder);
            return result;
        }
        
        // Thousands
        const thousand = Math.floor(n / 1000);
        const remainder = n % 1000;
        let result = thousand === 1 ? 'mille' : convertLessThanThousand(thousand) + ' mille';
        if (remainder > 0) result += ' ' + convertLessThanThousand(remainder);
        return result;
    }
    
    const parts = number.toFixed(2).split('.');
    const dirhams = parseInt(parts[0]);
    const centimes = parseInt(parts[1]);
    
    let result = '';
    
    if (dirhams === 0) {
        result = 'zéro dirham';
    } else {
        result = convertNumber(dirhams) + ' dirham';
        if (dirhams > 1) result += 's';
    }
    
    if (centimes > 0) {
        result += ' et ' + convertNumber(centimes) + ' centime';
        if (centimes > 1) result += 's';
    } else {
        result += ' et zéro centime';
    }
    
    return result.charAt(0).toUpperCase() + result.slice(1);
}

// Generate single PDF as Blob (for ZIP)
async function generateSinglePDFBlobChaimae(invoice, organizationType, folderName, includeOrder = true, includeBL = true, includeBC = true) {
    // For bulk PDF, always hide zero values (no prompt)
    const showZeroValues = false;
    
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Colors
    const blueColor = [33, 97, 140];
    const greenColor = [76, 175, 80];
    const orangeColor = [255, 152, 0];
    const dateStr = new Date(invoice.document_date).toLocaleDateString('fr-FR');
    
    const docType = invoice.document_type === 'facture' ? 'FACTURE' : 
                   invoice.document_type === 'devis' ? 'DEVIS' : 
                   'BON DE LIVRAISON';
    const docNumero = invoice.document_numero || invoice.document_numero_devis || invoice.document_numero_bl || '-';
    
    const addHeader = (isFirstPage = true) => {
        try {
            const logoImg = document.querySelector('img[src*="chaimae.png"]') || 
                           document.querySelector('img[data-asset="chaimae"]') ||
                           document.querySelector('img[src^="data:image"]');
            if (logoImg && logoImg.src && logoImg.src.startsWith('data:')) {
                doc.addImage(logoImg.src, 'PNG', 15, 10, 35, 35);
            }
        } catch (error) {}
        
        doc.setFontSize(18);
        doc.setTextColor(...blueColor);
        doc.setFont(undefined, 'bold');
        doc.text('CHAIMAE ERRBAHI DIQ sarl (AU)', 105, 20, { align: 'center' });
        
        doc.setFontSize(10);
        doc.setFont(undefined, 'normal');
        doc.setTextColor(0, 0, 0);
        doc.text('Patente N° 52003366 - NIF : 40190505', 105, 27, { align: 'center' });
        doc.text('RC N° : 10487 - CNSS : 8721591', 105, 32, { align: 'center' });
        doc.text('ICE : 001544861000014', 105, 37, { align: 'center' });
        
        doc.setFontSize(11);
        doc.setFont(undefined, 'bold');
        doc.text('CLIENT :', 15, 55);
        doc.setTextColor(...greenColor);
        doc.text(invoice.client_nom, 40, 55);
        
        // Only show ICE if it exists and is not "0"
        if (invoice.client_ice && invoice.client_ice !== '0') {
            doc.setTextColor(0, 0, 0);
            doc.text('ICE :', 15, 62);
            doc.setTextColor(...greenColor);
            doc.text(invoice.client_ice, 40, 62);
        }
        
        doc.setTextColor(0, 0, 0);
        doc.text(`Date: ${dateStr}`, 150, 55);
        
        doc.setFontSize(14);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(0, 0, 0);
        
        if (invoice.document_type === 'bon_livraison') {
            doc.text(`${docType} N°:`, 15, 75);
            doc.setTextColor(...orangeColor);
            doc.text(docNumero, 80, 75);
        } else {
            doc.text(`${docType} N°:`, 15, 75);
            doc.setTextColor(...orangeColor);
            doc.text(docNumero, 55, 75);
        }
        
        let currentY = 75;
        
        if (invoice.document_type === 'facture') {
            if (includeOrder && invoice.document_numero_Order) {
                currentY += 7;
                doc.setFontSize(11);
                doc.setFont(undefined, 'bold');
                doc.setTextColor(0, 0, 0);
                doc.text('N° Order :', 15, currentY);
                doc.setTextColor(33, 150, 243);
                doc.text(invoice.document_numero_Order, 45, currentY);
            }
            if (includeBL && invoice.document_bon_de_livraison) {
                currentY += 7;
                doc.setFontSize(11);
                doc.setFont(undefined, 'bold');
                doc.setTextColor(0, 0, 0);
                doc.text('Bon de livraison :', 15, currentY);
                doc.setTextColor(...greenColor);
                doc.text(invoice.document_bon_de_livraison, 60, currentY);
            }
        } else if (invoice.document_type === 'bon_livraison' && includeBC && invoice.document_numero_commande) {
            currentY += 7;
            doc.setFontSize(11);
            doc.setFont(undefined, 'bold');
            doc.setTextColor(0, 0, 0);
            doc.text('N° Order :', 15, currentY);
            doc.setTextColor(...greenColor);
            doc.text(invoice.document_numero_commande, 65, currentY);
        }
    };
    
    const addFooter = (pageNum, totalPages) => {
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(7);
        doc.setFont(undefined, 'normal');
        doc.text('RIB : 007 720 00 05979000000368 12  ATTIJARI WAFA BANQ', 15, 275);
        doc.text('Email: errbahiabderrahim@gmail.com', 15, 279);
        doc.text('ADRESSE: LOT ALBAHR AV TETOUAN N94 GARAGE 2 M\'DIQ', 15, 283);
        doc.text('Tel: +212 661 307 323', 15, 287);
        
        // Page numbering
        if (pageNum && totalPages) {
            doc.setFontSize(8);
            doc.setTextColor(128, 128, 128);
            doc.text(`Page ${pageNum} / ${totalPages}`, 105, 293, { align: 'center' });
        }
    };
    
    addHeader(true);
    
    let startY = 85;
    if (invoice.document_type === 'facture') {
        if (includeOrder && invoice.document_numero_Order) startY += 7;
        if (includeBL && invoice.document_bon_de_livraison) startY += 7;
    } else if (invoice.document_type === 'bon_livraison' && includeBC && invoice.document_numero_commande) {
        startY += 7;
    }
    
    doc.setFillColor(...blueColor);
    doc.rect(15, startY, 180, 8, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(9);
    doc.setFont(undefined, 'bold');
    doc.text('Désignation', 18, startY + 5.5);
    doc.text('QTE', 125, startY + 5.5, { align: 'center' });
    doc.text('PU HT', 160, startY + 5.5, { align: 'right' });
    doc.text('TOTAL HT', 188, startY + 5.5, { align: 'right' });
    
    let currentY = startY + 10;
    doc.setTextColor(0, 0, 0);
    doc.setFont(undefined, 'normal');
    doc.setFontSize(9);
    
    let pageCount = 1;
    const pages = [];
    
    invoice.products.forEach((product, index) => {
        const designation = product.designation || '';
        const lines = doc.splitTextToSize(designation, 85);
        const rowHeight = Math.max(8, (lines.length * 4.5) + 4);
        
        // Split very long products across multiple pages if needed
        let remainingLines = [...lines];
        let isFirstPart = true;
        
        while (remainingLines.length > 0) {
            const availableSpace = 215 - currentY;
            
            // If not enough space for even one line, create new page first
            if (availableSpace < 15) {
                pages.push(pageCount);
                doc.addPage();
                addHeader(false);
                pageCount++;
                
                let newStartY = 85;
                if (invoice.document_type === 'facture') {
                    if (invoice.document_numero_Order) newStartY += 7;
                    if (invoice.document_bon_de_livraison) newStartY += 7;
                } else if (invoice.document_type === 'bon_livraison' && invoice.document_numero_commande) {
                    newStartY += 7;
                }
                
                doc.setFillColor(...blueColor);
                doc.rect(15, newStartY, 180, 8, 'F');
                doc.setTextColor(255, 255, 255);
                doc.setFontSize(9);
                doc.setFont(undefined, 'bold');
                doc.text('Désignation', 18, newStartY + 5.5);
                doc.text('QTE', 125, newStartY + 5.5, { align: 'center' });
                doc.text('PU HT', 160, newStartY + 5.5, { align: 'right' });
                doc.text('TOTAL HT', 188, newStartY + 5.5, { align: 'right' });
                
                currentY = newStartY + 10;
                doc.setTextColor(0, 0, 0);
                doc.setFont(undefined, 'normal');
                doc.setFontSize(9);
                continue;
            }
            
            const maxLinesPerPage = Math.floor((availableSpace - 10) / 4.5);
            const linesToDraw = remainingLines.splice(0, Math.max(1, maxLinesPerPage));
            const partialRowHeight = Math.max(8, (linesToDraw.length * 4.5) + 4);
            
            // Alternate row colors (only for first part)
            if (isFirstPart && index % 2 === 0) {
                doc.setFillColor(245, 245, 245);
                doc.rect(15, currentY - 3, 180, partialRowHeight, 'F');
            }
            
            doc.setFontSize(8);
            // Draw lines
            linesToDraw.forEach((line, lineIndex) => {
                doc.text(line, 18, currentY + 3 + (lineIndex * 4.5));
            });
            
            // Only show quantity, price, and total on the first part
            if (isFirstPart) {
                const centerOffset = (linesToDraw.length > 1) ? ((linesToDraw.length - 1) * 2.25) : 0;
                
                const qty = parseFloat(product.quantite);
                if (qty !== 0) {
                    doc.text(String(product.quantite || ''), 125, currentY + 3 + centerOffset, { align: 'center' });
                }
                
                doc.setFontSize(7.5);
                const price = parseFloat(product.prix_unitaire_ht);
                if (price !== 0) {
                    doc.text(`${formatNumberForPDFChaimae(product.prix_unitaire_ht)} DH`, 160, currentY + 3 + centerOffset, { align: 'right' });
                }
                
                const total = parseFloat(product.total_ht);
                if (total !== 0) {
                    doc.text(`${formatNumberForPDFChaimae(product.total_ht)} DH`, 188, currentY + 3 + centerOffset, { align: 'right' });
                }
            }
            
            currentY += partialRowHeight;
            isFirstPart = false;
            
            // If there are more lines and we're near the bottom, create new page
            if (remainingLines.length > 0 && currentY > 200) {
                pages.push(pageCount);
                doc.addPage();
                addHeader(false);
                pageCount++;
                
                let newStartY = 85;
                if (invoice.document_type === 'facture') {
                    if (invoice.document_numero_Order) newStartY += 7;
                    if (invoice.document_bon_de_livraison) newStartY += 7;
                } else if (invoice.document_type === 'bon_livraison' && invoice.document_numero_commande) {
                    newStartY += 7;
                }
                
                doc.setFillColor(...blueColor);
                doc.rect(15, newStartY, 180, 8, 'F');
                doc.setTextColor(255, 255, 255);
                doc.setFontSize(9);
                doc.setFont(undefined, 'bold');
                doc.text('Désignation', 18, newStartY + 5.5);
                doc.text('QTE', 125, newStartY + 5.5, { align: 'center' });
                doc.text('PU HT', 160, newStartY + 5.5, { align: 'right' });
                doc.text('TOTAL HT', 188, newStartY + 5.5, { align: 'right' });
                
                currentY = newStartY + 10;
                doc.setTextColor(0, 0, 0);
                doc.setFont(undefined, 'normal');
                doc.setFontSize(9);
            }
        }
    });
    
    currentY += 10;
    
    doc.setFillColor(245, 245, 245);
    doc.rect(110, currentY, 85, 8, 'F');
    doc.setFont(undefined, 'bold');
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(9);
    doc.text('TOTAL HT :', 113, currentY + 5.5);
    doc.setFontSize(8);
    doc.text(`${formatNumberForPDFChaimae(invoice.total_ht)} DH`, 192, currentY + 5.5, { align: 'right' });
    
    currentY += 8;
    doc.setFillColor(255, 255, 255);
    doc.rect(110, currentY, 85, 8, 'F');
    doc.setFontSize(9);
    doc.text(`MONTANT TVA ${invoice.tva_rate}% :`, 113, currentY + 5.5);
    doc.setFontSize(8);
    doc.text(`${formatNumberForPDFChaimae(invoice.montant_tva)} DH`, 192, currentY + 5.5, { align: 'right' });
    
    currentY += 8;
    doc.setFillColor(173, 216, 230);
    doc.rect(110, currentY, 85, 8, 'F');
    doc.setTextColor(...blueColor);
    doc.setFontSize(9);
    doc.text('MONTANT T.T.C :', 113, currentY + 5.5);
    doc.setFontSize(8.5);
    doc.text(`${formatNumberForPDFChaimae(invoice.total_ttc)} DH`, 192, currentY + 5.5, { align: 'right' });
    
    currentY += 15;
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(9);
    doc.setFont(undefined, 'italic');
    const amountInWords = numberToFrenchWordsChaimae(invoice.total_ttc);
    // Only show amount in words for Facture and Devis, not for Bon de livraison
    if (invoice.document_type !== 'bon_livraison') {
        const docTypeText = invoice.document_type === 'facture' ? 'Facture' : 'Devis';
        doc.text(`La Présente ${docTypeText} est Arrêtée à la somme de : ${amountInWords}`, 15, currentY, { maxWidth: 180 });
    }
    
    // Add notes if invoice has an id
    if (invoice.id) {
        try {
            const noteResult = await window.electron.dbChaimae.getNote(invoice.id);
            if (noteResult.success && noteResult.data) {
                currentY += 15;
                doc.setFontSize(8);
                doc.setFont(undefined, 'bold');
                doc.setTextColor(96, 125, 139);
                doc.text('Notes:', 15, currentY);
                
                doc.setFont(undefined, 'bold');
                doc.setTextColor(0, 0, 0);
                doc.setFontSize(9);
                const noteLines = doc.splitTextToSize(noteResult.data, 180);
                const footerTopY = 270;
                let lineY = currentY + 4;
                for (let i = 0; i < noteLines.length; i++) {
                    if (lineY > footerTopY) {
                        pages.push(pageCount);
                        doc.addPage();
                        addHeader(false);
                        pageCount++;
                        doc.setFontSize(8);
                        doc.setFont(undefined, 'bold');
                        doc.setTextColor(96, 125, 139);
                        doc.text('Notes (suite) :', 15, 60);
                        doc.setTextColor(0, 0, 0);
                        doc.setFont(undefined, 'bold');
                        doc.setFontSize(9);
                        lineY = 64;
                    }
                    doc.text(noteLines[i], 15, lineY);
                    lineY += 4.5;
                }
            }
        } catch (error) {
            console.log('Note not loaded for bulk PDF:', error);
        }
    }
    
    // Add page numbering to all pages
    pages.push(pageCount);
    const totalPages = pages.length;
    
    for (let i = 0; i < totalPages; i++) {
        doc.setPage(i + 1);
        addFooter(i + 1, totalPages);
    }
    
    return doc.output('blob');
}

// Load jsPDF library
async function loadJsPDFChaimae() {
    return new Promise((resolve, reject) => {
        if (typeof window.jspdf !== 'undefined') {
            resolve();
            return;
        }
        
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
        script.onload = () => {
            console.log('✅ jsPDF loaded');
            resolve();
        };
        script.onerror = () => reject(new Error('Failed to load jsPDF'));
        document.head.appendChild(script);
    });
}

// View global invoice details
async function viewGlobalInvoiceChaimae(id) {
    console.log('🔍🔍🔍 [VIEW BUTTON CLICKED!!!] Global Invoice ID:', id);
    console.log('📍📍📍 [LOCATION] viewGlobalInvoiceChaimae function called in invoices_list_chaimae.js');
    console.log('✅✅✅ [CONFIRMATION] تم الضغط على زر العرض - الدالة تعمل!');
    
    try {
        console.log('📡 [API CALL] Fetching global invoice data...');
        const result = await window.electron.dbChaimae.getGlobalInvoiceById(id);
        
        console.log('📦 [API RESPONSE]', result);
        
        if (result.success && result.data) {
            const invoice = result.data;
            console.log('✅ [SUCCESS] Invoice data loaded:', invoice);
            
            // Calculate totals dynamically from bons
            let calculatedTotalHT = 0;
            let calculatedTotalTTC = 0;
            
            if (invoice.bons && invoice.bons.length > 0) {
                invoice.bons.forEach(bon => {
                    calculatedTotalHT += parseFloat(bon.total_ht) || 0;
                    calculatedTotalTTC += parseFloat(bon.total_ttc) || 0;
                });
            }
            
            const tvaRate = invoice.tva_rate || 20;
            const calculatedMontantTVA = calculatedTotalHT * (tvaRate / 100);
            
            // Use calculated values instead of stored values
            invoice.total_ht = calculatedTotalHT;
            invoice.montant_tva = calculatedMontantTVA;
            invoice.total_ttc = calculatedTotalTTC;
            
            const modal = document.createElement('div');
            modal.className = 'modal-overlay';
            modal.innerHTML = `
                <div class="modal-content invoice-details-modal">
                    <div class="modal-header">
                        <h2>📦 Détails de la Facture Globale #${invoice.id}</h2>
                        <div style="display: flex; gap: 0.5rem; align-items: center;">
                            <button class="btn-download-pdf" onclick="window.downloadGlobalInvoicePDF(${invoice.id})" title="Télécharger PDF">
                                📥 Télécharger PDF
                            </button>
                            <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">✕</button>
                        </div>
                    </div>
                    <div class="modal-body">
                        <div class="details-section">
                            <h3>👤 Client</h3>
                            <p><strong>Nom:</strong> ${invoice.client_nom}</p>
                            <p><strong>ICE:</strong> ${invoice.client_ice}</p>
                        </div>
                        
                        <div class="details-section">
                            <h3>📄 Document</h3>
                            <p><strong>Type:</strong> Facture Globale</p>
                            <p><strong>N°:</strong> ${invoice.document_numero}</p>
                            <p><strong>Date:</strong> ${new Date(invoice.document_date).toLocaleDateString('fr-FR')}</p>
                        </div>
                        
                        <div class="details-section">
                            <h3>📦 Bons de Livraison (${invoice.bons ? invoice.bons.length : 0})</h3>
                            <table class="products-details-table">
                                <thead>
                                    <tr>
                                        <th>N° Bon de livraison</th>
                                        <th>N° Order</th>
                                        <th>Date de livraison</th>
                                        <th>Total HT</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${invoice.bons ? invoice.bons.map(bon => `
                                        <tr>
                                            <td>${bon.document_numero_bl || bon.document_numero || '-'}</td>
                                            <td>${bon.document_numero_commande || '-'}</td>
                                            <td>${new Date(bon.document_date).toLocaleDateString('fr-FR')}</td>
                                            <td>${formatNumberChaimae(bon.total_ht || 0)} DH</td>
                                        </tr>
                                    `).join('') : '<tr><td colspan="4">Aucun bon de livraison</td></tr>'}
                                </tbody>
                            </table>
                        </div>
                        
                        <div class="details-section">
                            <h3>💰 Totaux</h3>
                            <p><strong>Total HT:</strong> ${formatNumberChaimae(invoice.total_ht)} DH</p>
                            <p><strong>TVA (${invoice.tva_rate}%):</strong> ${formatNumberChaimae(invoice.montant_tva)} DH</p>
                            <p><strong>Total TTC:</strong> <span style="color: #4caf50; font-size: 1.2rem;">${formatNumberChaimae(invoice.total_ttc)} DH</span></p>
                        </div>
                    </div>
                </div>
            `;
            
            document.body.appendChild(modal);
        } else {
            window.notify.error('Erreur', 'Impossible de charger les détails', 3000);
        }
    } catch (error) {
        console.error('Error viewing global invoice:', error);
        window.notify.error('Erreur', 'Une erreur est survenue', 3000);
    }
}

// Delete invoice
window.deleteInvoiceChaimae = async function(id, documentType) {
    const confirmed = await customConfirm('Confirmation', 'Êtes-vous sûr de vouloir supprimer ce document ?', 'warning');
    if (!confirmed) {
        return;
    }
    
    try {
        let result;
        
        // Check if it's a global invoice
        if (documentType === 'facture_globale') {
            result = await window.electron.dbChaimae.deleteGlobalInvoice(id);
        } else {
            result = await window.electron.dbChaimae.deleteInvoice(id);
        }
        
        if (result.success) {
            window.notify.success('Succès', 'Document supprimé avec succès', 3000);
            loadInvoicesChaimae();
        } else {
            window.notify.error('Erreur', result.error || 'Impossible de supprimer', 3000);
        }
    } catch (error) {
        console.error('Error deleting invoice:', error);
        window.notify.error('Erreur', 'Une erreur est survenue', 3000);
    }
}

// Handle bulk delete button click
window.handleBulkDeleteChaimae = async function() {
    const checkedBoxes = document.querySelectorAll('.invoice-checkbox-chaimae:checked');
    
    if (checkedBoxes.length === 0) {
        window.notify.error('Erreur', 'Veuillez sélectionner au moins un document', 3000);
        return;
    }
    
    const count = checkedBoxes.length;
    const confirmMessage = `Êtes-vous sûr de vouloir supprimer ${count} document(s) ?\n\nCette action est irréversible.`;
    
    const confirmed = await customConfirm('Confirmation', confirmMessage, 'warning');
    if (!confirmed) {
        return;
    }
    
    // Create progress modal
    const progressOverlay = document.createElement('div');
    progressOverlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.85);z-index:10000;display:flex;align-items:center;justify-content:center;';
    
    let cancelRequested = false;
    
    progressOverlay.innerHTML = `
        <div style="background:#2d2d30;border-radius:12px;padding:2rem;min-width:400px;box-shadow:0 20px 60px rgba(0,0,0,0.9);">
            <h3 style="color:#fff;margin:0 0 1.5rem 0;font-size:1.2rem;display:flex;align-items:center;gap:0.5rem;">
                <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                </svg>
                Suppression en cours...
            </h3>
            <div style="background:#1e1e1e;border-radius:8px;height:30px;overflow:hidden;margin-bottom:1rem;">
                <div id="deleteProgressBar" style="background:linear-gradient(90deg, #f44336, #e91e63);height:100%;width:0%;transition:width 0.3s;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:600;font-size:0.9rem;"></div>
            </div>
            <p id="deleteProgressText" style="color:#aaa;margin:0 0 1rem 0;text-align:center;font-size:0.95rem;">Préparation...</p>
            <div style="text-align:center;">
                <button id="cancelDeleteBtn" style="padding:0.75rem 1.5rem;background:#ff9800;color:#fff;border:none;border-radius:6px;cursor:pointer;font-weight:600;font-size:0.95rem;transition:all 0.3s;" onmouseover="this.style.background='#f57c00'" onmouseout="this.style.background='#ff9800'">
                    ⚠️ Annuler
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(progressOverlay);
    
    const progressBar = document.getElementById('deleteProgressBar');
    const progressText = document.getElementById('deleteProgressText');
    const cancelBtn = document.getElementById('cancelDeleteBtn');
    
    // Handle cancel button
    cancelBtn.addEventListener('click', () => {
        cancelRequested = true;
        cancelBtn.disabled = true;
        cancelBtn.style.background = '#666';
        cancelBtn.textContent = '⏸️ Annulation...';
        progressText.textContent = 'Annulation en cours...';
    });
    
    try {
        let successCount = 0;
        let errorCount = 0;
        
        // Get all selected invoices with their types
        const selectedInvoices = Array.from(checkedBoxes).map(cb => {
            const invoiceId = parseInt(cb.dataset.invoiceId);
            const invoice = filteredInvoicesChaimae.find(inv => inv.id === invoiceId);
            return {
                id: invoiceId,
                type: invoice ? invoice.document_type : null
            };
        });
        
        const total = selectedInvoices.length;
        
        // Delete each invoice
        for (let i = 0; i < selectedInvoices.length; i++) {
            // Check if cancel was requested
            if (cancelRequested) {
                progressText.textContent = `Annulé après ${successCount} suppression(s)`;
                await new Promise(resolve => setTimeout(resolve, 1500));
                break;
            }
            
            const invoice = selectedInvoices[i];
            
            try {
                let result;
                
                if (invoice.type === 'facture_globale') {
                    result = await window.electron.dbChaimae.deleteGlobalInvoice(invoice.id);
                } else {
                    result = await window.electron.dbChaimae.deleteInvoice(invoice.id);
                }
                
                if (result.success) {
                    successCount++;
                } else {
                    errorCount++;
                }
            } catch (error) {
                console.error(`Error deleting invoice ${invoice.id}:`, error);
                errorCount++;
            }
            
            // Update progress
            const progress = Math.round(((i + 1) / total) * 100);
            progressBar.style.width = progress + '%';
            progressBar.textContent = progress + '%';
            progressText.textContent = `Suppression: ${i + 1} / ${total}`;
            
            // Small delay to show progress
            await new Promise(resolve => setTimeout(resolve, 10));
        }
        
        // Remove progress modal
        document.body.removeChild(progressOverlay);
        
        // Show result
        if (successCount > 0) {
            window.notify.success('Succès', `${successCount} document(s) supprimé(s) avec succès`, 3000);
            loadInvoicesChaimae();
        }
        
        if (errorCount > 0) {
            window.notify.error('Erreur', `${errorCount} document(s) n'ont pas pu être supprimés`, 3000);
        }
        
    } catch (error) {
        console.error('Error in bulk delete:', error);
        document.body.removeChild(progressOverlay);
        window.notify.error('Erreur', 'Une erreur est survenue lors de la suppression', 3000);
    }
}

// Handle bulk download button click
window.handleBulkDownloadChaimae = function() {
    const checkedBoxes = document.querySelectorAll('.invoice-checkbox-chaimae:checked');
    
    if (checkedBoxes.length === 0) {
        window.notify.error('Erreur', 'Veuillez sélectionner au moins une facture', 3000);
        return;
    }
    
    showBulkDownloadModalChaimae();
}

// Show bulk download modal
window.showBulkDownloadModalChaimae = function() {
    const checkedBoxes = document.querySelectorAll('.invoice-checkbox-chaimae:checked');
    const selectedIds = Array.from(checkedBoxes).map(cb => cb.dataset.invoiceId);
    
    if (selectedIds.length === 0) {
        window.notify.warning('Attention', 'Veuillez sélectionner au moins une facture', 3000);
        return;
    }
    
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.85);z-index:9999;display:flex;align-items:center;justify-content:center;animation:fadeIn 0.3s;';
    
    overlay.innerHTML = `
        <div style="background:#2d2d30;border-radius:12px;padding:2rem;max-width:500px;width:90%;max-height:70vh;display:flex;flex-direction:column;box-shadow:0 20px 60px rgba(0,0,0,0.9);animation:slideIn 0.3s;">
            <style>
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                @keyframes slideIn { from { transform: translateY(-30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
                .org-option { 
                    padding: 1rem; 
                    margin: 0.5rem 0; 
                    background: #1e1e1e; 
                    border: 2px solid #3e3e42; 
                    border-radius: 8px; 
                    cursor: pointer; 
                    transition: all 0.3s;
                    display: flex;
                    align-items: flex-start;
                    gap: 0.75rem;
                }
                .org-option:hover { border-color: #2196f3; background: #252526; }
                .org-option.selected { border-color: #2196f3; background: #1a3a52; }
                .org-option input[type="radio"] { 
                    margin: 0;
                    width: 18px; 
                    height: 18px; 
                    cursor: pointer;
                    flex-shrink: 0;
                    margin-top: 2px;
                }
                .org-option-content {
                    flex: 1;
                    min-width: 0;
                }
            </style>
            
            <div style="text-align:center;margin-bottom:1.5rem;flex-shrink:0;">
                <div style="font-size:3rem;margin-bottom:0.5rem;">📥</div>
                <h2 style="color:#fff;margin:0;font-size:1.5rem;font-weight:600;">Télécharger les factures</h2>
                <p style="color:#999;margin:0.5rem 0 0 0;">${selectedIds.length} facture(s) sélectionnée(s)</p>
            </div>
            
            <div style="margin-bottom:1.5rem;overflow-y:auto;flex:1;padding-right:0.5rem;">
                <div style="position:sticky;top:0;background:#2d2d30;padding-bottom:0.5rem;z-index:1;">
                    <label style="display:block;color:#2196f3;margin-bottom:1rem;font-weight:600;">Choisir l'organisation:</label>
                </div>
                
                <label class="org-option" onclick="selectOrganizationChaimae(this, 'client-month-type')">
                    <input type="radio" name="organization" value="client-month-type">
                    <div class="org-option-content">
                        <strong style="color:#fff;display:block;margin-bottom:0.25rem;">Par Client → Mois → Type</strong>
                        <div style="color:#999;font-size:0.85rem;">📁 Client_Ahmed/ → 📁 2025-10/ → 📁 Facture/ → 📄 Facture_548.pdf</div>
                    </div>
                </label>
                
                <label class="org-option" onclick="selectOrganizationChaimae(this, 'client-type-month')">
                    <input type="radio" name="organization" value="client-type-month">
                    <div class="org-option-content">
                        <strong style="color:#fff;display:block;margin-bottom:0.25rem;">Par Client → Type → Mois</strong>
                        <div style="color:#999;font-size:0.85rem;">📁 Client_Ahmed/ → 📁 Facture/ → 📁 2025-10/ → 📄 Facture_548.pdf</div>
                    </div>
                </label>
                
                <label class="org-option" onclick="selectOrganizationChaimae(this, 'type-month-client')">
                    <input type="radio" name="organization" value="type-month-client">
                    <div class="org-option-content">
                        <strong style="color:#fff;display:block;margin-bottom:0.25rem;">Par Type → Mois → Client</strong>
                        <div style="color:#999;font-size:0.85rem;">📁 Facture/ → 📁 2025-10/ → 📁 Client_Ahmed/ → 📄 Facture_548.pdf</div>
                    </div>
                </label>
                
                <label class="org-option" onclick="selectOrganizationChaimae(this, 'type-client-month')">
                    <input type="radio" name="organization" value="type-client-month">
                    <div class="org-option-content">
                        <strong style="color:#fff;display:block;margin-bottom:0.25rem;">Par Type → Client → Mois</strong>
                        <div style="color:#999;font-size:0.85rem;">📁 Facture/ → 📁 Client_Ahmed/ → 📁 2025-10/ → 📄 Facture_548.pdf</div>
                    </div>
                </label>
                
                <label class="org-option" onclick="selectOrganizationChaimae(this, 'month-type-client')">
                    <input type="radio" name="organization" value="month-type-client">
                    <div class="org-option-content">
                        <strong style="color:#fff;display:block;margin-bottom:0.25rem;">Par Mois → Type → Client</strong>
                        <div style="color:#999;font-size:0.85rem;">📁 2025-10/ → 📁 Facture/ → 📁 Client_Ahmed/ → 📄 Facture_548.pdf</div>
                    </div>
                </label>
                
                <label class="org-option" onclick="selectOrganizationChaimae(this, 'month-client-type')">
                    <input type="radio" name="organization" value="month-client-type">
                    <div class="org-option-content">
                        <strong style="color:#fff;display:block;margin-bottom:0.25rem;">Par Mois → Client → Type</strong>
                        <div style="color:#999;font-size:0.85rem;">📁 2025-10/ → 📁 Client_Ahmed/ → 📁 Facture/ → 📄 Facture_548.pdf</div>
                    </div>
                </label>
                
                <label class="org-option" onclick="selectOrganizationChaimae(this, 'flat')">
                    <input type="radio" name="organization" value="flat" checked>
                    <div class="org-option-content">
                        <strong style="color:#fff;display:block;margin-bottom:0.25rem;">Tout dans un dossier</strong>
                        <div style="color:#999;font-size:0.85rem;">📁 Factures/ → 📄 Facture_548_Ahmed.pdf</div>
                    </div>
                </label>
            </div>
            
            <div style="display:flex;gap:1rem;flex-shrink:0;margin-top:1rem;">
                <button onclick="this.closest('.modal-overlay').remove()" 
                        style="flex:1;padding:0.75rem;background:#3e3e42;color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:1rem;font-weight:600;transition:all 0.3s;"
                        onmouseover="this.style.background='#4e4e52'" onmouseout="this.style.background='#3e3e42'">
                    Annuler
                </button>
                <button id="bulkDownloadConfirmBtnChaimae"
                        style="flex:1;padding:0.75rem;background:#2196f3;color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:1rem;font-weight:600;transition:all 0.3s;"
                        onmouseover="this.style.background='#1976d2'" onmouseout="this.style.background='#2196f3'">
                    ✓ Télécharger
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(overlay);
    
    // Auto-select default option
    document.querySelector('.org-option input[checked]').closest('.org-option').classList.add('selected');
    
    // Add click event to confirm button
    document.getElementById('bulkDownloadConfirmBtnChaimae').onclick = () => {
        const organizationType = document.querySelector('input[name="organization"]:checked').value;
        overlay.remove();
        showOrderBLBCSelectionModalBeforeDownloadChaimae(selectedIds, organizationType);
    };
};

// Select organization option
window.selectOrganizationChaimae = function(element, value) {
    document.querySelectorAll('.org-option').forEach(opt => opt.classList.remove('selected'));
    element.classList.add('selected');
    element.querySelector('input').checked = true;
};

// Show Order/BL/BC selection modal before download for Chaimae
window.showOrderBLBCSelectionModalBeforeDownloadChaimae = function(selectedIds, organizationType) {
    const selectionOverlay = document.createElement('div');
    selectionOverlay.className = 'custom-modal-overlay';
    selectionOverlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.95);z-index:10000;display:flex;align-items:center;justify-content:center;';
    
    selectionOverlay.innerHTML = `
        <div class="custom-modal">
            <div class="custom-modal-header">
                <span class="custom-modal-icon info">📋</span>
                <h3 class="custom-modal-title">Options d'affichage PDF</h3>
            </div>
            <div class="custom-modal-body">
                <p style="margin-bottom:1.25rem;color:#e0e0e0;font-size:0.95rem;">Choisissez les informations à afficher dans les PDFs:</p>
                <label style="display:flex;align-items:center;cursor:pointer;padding:1rem;background:#1e1e1e;border:2px solid #2196F3;border-radius:10px;margin-bottom:1rem;transition:all 0.2s ease;">
                    <input type="checkbox" id="includeOrderCheckboxDownloadChaimae" checked style="width:20px;height:20px;margin-right:1rem;cursor:pointer;accent-color:#2196F3;">
                    <span style="font-size:0.95rem;color:#e0e0e0;font-weight:500;">
                        Afficher les N° Order dans les PDFs
                    </span>
                </label>
                <label style="display:flex;align-items:center;cursor:pointer;padding:1rem;background:#1e1e1e;border:2px solid #4caf50;border-radius:10px;margin-bottom:1rem;transition:all 0.2s ease;">
                    <input type="checkbox" id="includeBLCheckboxDownloadChaimae" checked style="width:20px;height:20px;margin-right:1rem;cursor:pointer;accent-color:#4caf50;">
                    <span style="font-size:0.95rem;color:#e0e0e0;font-weight:500;">
                        Afficher les Bon de livraison dans les PDFs
                    </span>
                </label>
                <label style="display:flex;align-items:center;cursor:pointer;padding:1rem;background:#1e1e1e;border:2px solid #ff9800;border-radius:10px;transition:all 0.2s ease;">
                    <input type="checkbox" id="includeBCCheckboxDownloadChaimae" checked style="width:20px;height:20px;margin-right:1rem;cursor:pointer;accent-color:#ff9800;">
                    <span style="font-size:0.95rem;color:#e0e0e0;font-weight:500;">
                        Afficher les N° Order dans les PDFs
                    </span>
                </label>
            </div>
            <div class="custom-modal-footer">
                <button class="custom-modal-btn primary" id="continueBtnDownloadChaimae" style="padding:0.75rem 2rem;font-size:1rem;">Télécharger</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(selectionOverlay);
    
    const orderCheckbox = selectionOverlay.querySelector('#includeOrderCheckboxDownloadChaimae');
    const blCheckbox = selectionOverlay.querySelector('#includeBLCheckboxDownloadChaimae');
    const bcCheckbox = selectionOverlay.querySelector('#includeBCCheckboxDownloadChaimae');
    const continueBtn = selectionOverlay.querySelector('#continueBtnDownloadChaimae');
    
    continueBtn.addEventListener('click', async () => {
        const includeOrder = orderCheckbox.checked;
        const includeBL = blCheckbox.checked;
        const includeBC = bcCheckbox.checked;
        
        console.log('✅ [CHAIMAE DOWNLOAD] Include Order:', includeOrder, '| Include BL:', includeBL, '| Include BC:', includeBC);
        
        selectionOverlay.remove();
        
        await startBulkDownloadChaimae(selectedIds, organizationType, includeOrder, includeBL, includeBC);
    });
    
    selectionOverlay.addEventListener('click', (e) => {
        if (e.target === selectionOverlay) {
            const includeOrder = orderCheckbox.checked;
            const includeBL = blCheckbox.checked;
            const includeBC = bcCheckbox.checked;
            selectionOverlay.remove();
            startBulkDownloadChaimae(selectedIds, organizationType, includeOrder, includeBL, includeBC);
        }
    });
    
    setTimeout(() => continueBtn.focus(), 100);
};

// Load JSZip library
async function loadJSZipChaimae() {
    return new Promise((resolve, reject) => {
        if (typeof window.JSZip !== 'undefined') {
            resolve();
            return;
        }
        
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js';
        script.onload = () => {
            console.log('✅ JSZip loaded');
            resolve();
        };
        script.onerror = () => reject(new Error('Failed to load JSZip'));
        document.head.appendChild(script);
    });
}

// Start bulk download
window.startBulkDownloadChaimae = async function(selectedIds, organizationType, includeOrder = true, includeBL = true, includeBC = true) {
    try {
        
        // Close modal
        document.querySelector('.modal-overlay')?.remove();
        
        // Show progress notification
        window.notify.info('Téléchargement', `Génération de ${selectedIds.length} PDF(s)...`, 10000);
        
        // Get all selected invoices data
        const invoicesData = [];
        for (const id of selectedIds) {
            const result = await window.electron.dbChaimae.getInvoiceById(id);
            if (result.success && result.data) {
                invoicesData.push(result.data);
            }
        }
        
        if (invoicesData.length === 0) {
            window.notify.error('Erreur', 'Aucune facture trouvée', 3000);
            return;
        }
        
        // Load libraries
        if (typeof window.jspdf === 'undefined') {
            await loadJsPDFChaimae();
        }
        await loadJSZipChaimae();
        
        // Create ZIP file
        const zip = new JSZip();
        const timestamp = new Date().toISOString().split('T')[0];
        const folderName = `Factures_CHAIMAE_Export_${timestamp}`;
        
        // Generate all PDFs and add to ZIP
        let successCount = 0;
        
        for (const invoice of invoicesData) {
            try {
                const pdfBlob = await generateSinglePDFBlobChaimae(invoice, organizationType, folderName, includeOrder, includeBL, includeBC);
                
                // Organize in folders based on type
                const invoiceDate = new Date(invoice.document_date);
                const yearMonth = `${invoiceDate.getFullYear()}-${String(invoiceDate.getMonth() + 1).padStart(2, '0')}`;
                const clientName = invoice.client_nom.replace(/[^a-zA-Z0-9]/g, '_');
                const numero = (invoice.document_numero || invoice.document_numero_devis || invoice.document_numero_bl || invoice.id).toString().replace(/\//g, '_');
                
                // Determine document type folder
                let docType = 'Documents';
                let docPrefix = 'Document';
                if (invoice.document_type === 'facture') {
                    docType = 'Factures';
                    docPrefix = 'Facture';
                } else if (invoice.document_type === 'devis') {
                    docType = 'Devis';
                    docPrefix = 'Devis';
                } else if (invoice.document_type === 'bon_livraison') {
                    docType = 'Bons_de_livraison';
                    docPrefix = 'BL';
                }
                
                const filename = `${docPrefix}_${numero}_${clientName}.pdf`;
                
                let zipPath = '';
                if (organizationType === 'client-month-type') {
                    // Client → Mois → Type
                    zipPath = `${clientName}/${yearMonth}/${docType}/${filename}`;
                } else if (organizationType === 'client-type-month') {
                    // Client → Type → Mois
                    zipPath = `${clientName}/${docType}/${yearMonth}/${filename}`;
                } else if (organizationType === 'type-month-client') {
                    // Type → Mois → Client
                    zipPath = `${docType}/${yearMonth}/${clientName}/${filename}`;
                } else if (organizationType === 'type-client-month') {
                    // Type → Client → Mois
                    zipPath = `${docType}/${clientName}/${yearMonth}/${filename}`;
                } else if (organizationType === 'month-type-client') {
                    // Mois → Type → Client
                    zipPath = `${yearMonth}/${docType}/${clientName}/${filename}`;
                } else if (organizationType === 'month-client-type') {
                    // Mois → Client → Type
                    zipPath = `${yearMonth}/${clientName}/${docType}/${filename}`;
                } else {
                    // Tout dans un dossier (flat)
                    zipPath = `${docType}/${filename}`;
                }
                
                zip.file(zipPath, pdfBlob);
                successCount++;
            } catch (error) {
                console.error(`Error generating PDF for invoice ${invoice.id}:`, error);
            }
        }
        
        // Generate and download ZIP
        window.notify.info('Téléchargement', 'Création du fichier ZIP...', 3000);
        const zipBlob = await zip.generateAsync({ type: 'blob' });
        
        // Download ZIP file
        const link = document.createElement('a');
        link.href = URL.createObjectURL(zipBlob);
        link.download = `${folderName}.zip`;
        link.click();
        URL.revokeObjectURL(link.href);
        
        window.notify.success('Succès', `${successCount} PDF(s) téléchargé(s) dans ${folderName}.zip`, 4000);
        
        // Uncheck all checkboxes
        document.querySelectorAll('.invoice-checkbox-chaimae').forEach(cb => cb.checked = false);
        const selectAllCheckbox = document.getElementById('selectAllInvoicesChaimae');
        if (selectAllCheckbox) selectAllCheckbox.checked = false;
        updateSelectedCountChaimae();
        
    } catch (error) {
        console.error('Error in bulk download:', error);
        window.notify.error('Erreur', 'Erreur lors du téléchargement: ' + error.message, 5000);
    }
};

// Add new attachment
window.addNewAttachmentChaimae = function(invoiceId) {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.accept = 'image/*,application/pdf';
    
    input.onchange = async (e) => {
        const files = Array.from(e.target.files);
        
        if (files.length === 0) return;
        
        window.notify.info('Upload', `Upload de ${files.length} fichier(s)...`, 2000);
        
        for (const file of files) {
            // Check file type
            const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf'];
            if (!validTypes.includes(file.type)) {
                window.notify.warning('Type non supporté', `${file.name} n'est pas accepté`, 3000);
                continue;
            }
            
            // Check file size (max 10MB)
            if (file.size > 10 * 1024 * 1024) {
                window.notify.warning('Fichier trop volumineux', `${file.name} dépasse 10MB`, 3000);
                continue;
            }
            
            // Read file as array buffer
            const arrayBuffer = await file.arrayBuffer();
            const uint8Array = new Uint8Array(arrayBuffer);
            
            // Upload to database
            const result = await window.electron.dbChaimae.addAttachment(
                invoiceId,
                file.name,
                file.type,
                uint8Array
            );
            
            if (result.success) {
                window.notify.success('Succès', `${file.name} ajouté`, 2000);
            } else {
                window.notify.error('Erreur', `Échec: ${file.name}`, 3000);
            }
        }
        
        // Close modal and reopen to refresh
        document.querySelector('.invoice-view-overlay')?.remove();
        setTimeout(() => viewInvoiceChaimae(invoiceId), 300);
    };
    
    input.click();
}

// Open attachment
window.openAttachmentChaimae = async function(attachmentId) {
    try {
        const result = await window.electron.dbChaimae.getAttachment(attachmentId);
        
        if (result.success && result.data) {
            const attachment = result.data;
            
            // Convert base64 to binary
            const binaryString = atob(attachment.file_data);
            const bytes = new Uint8Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) {
                bytes[i] = binaryString.charCodeAt(i);
            }
            
            // Create blob from binary data
            const blob = new Blob([bytes], {
                type: attachment.file_type
            });
            
            // Create URL and open
            const url = URL.createObjectURL(blob);
            window.open(url, '_blank');
            
            // Clean up URL after a delay
            setTimeout(() => URL.revokeObjectURL(url), 10000);
        } else {
            window.notify.error('Erreur', 'Impossible d\'ouvrir le fichier', 3000);
        }
    } catch (error) {
        console.error('Error opening attachment:', error);
        window.notify.error('Erreur', 'Une erreur est survenue', 3000);
    }
}

// Delete attachment
window.deleteAttachmentChaimae = async function(attachmentId, invoiceId) {
    const confirmed = await customConfirm('Confirmation', 'Êtes-vous sûr de vouloir supprimer cette pièce jointe ?', 'warning');
    if (!confirmed) {
        return;
    }
    
    try {
        const result = await window.electron.dbChaimae.deleteAttachment(attachmentId);
        
        if (result.success) {
            window.notify.success('Succès', 'Pièce jointe supprimée', 2000);
            
            // Close modal and reopen to refresh
            document.querySelector('.invoice-view-overlay')?.remove();
            setTimeout(() => viewInvoiceChaimae(invoiceId), 300);
        } else {
            window.notify.error('Erreur', result.error || 'Impossible de supprimer', 3000);
        }
    } catch (error) {
        console.error('Error deleting attachment:', error);
        window.notify.error('Erreur', 'Une erreur est survenue', 3000);
    }
}

// Show create global invoice modal
window.showCreateGlobalInvoiceModalChaimae = async function() {
    // Check if client filter is selected
    const clientFilter = document.getElementById('filterClientChaimae').value;
    if (!clientFilter) {
        window.notify.error('Erreur', 'Veuillez sélectionner un client dans les filtres', 4000);
        return;
    }
    
    // Check if type filter is set to bon_livraison
    const typeFilter = document.getElementById('filterTypeChaimae').value;
    if (typeFilter !== 'bon_livraison') {
        window.notify.error('Erreur', 'Veuillez sélectionner "Bon de livraison" dans le filtre Type', 4000);
        return;
    }
    
    // Get all bon de livraison for the selected client
    const clientBons = filteredInvoicesChaimae.filter(inv => 
        inv.document_type === 'bon_livraison' && inv.client_nom === clientFilter
    );
    
    if (clientBons.length === 0) {
        window.notify.error('Erreur', 'Aucun bon de livraison trouvé pour ce client', 3000);
        return;
    }
    
    const clientName = clientBons[0].client_nom;
    const clientICE = clientBons[0].client_ice;
    
    // Show modal with checkboxes for selecting bons
    const bonsListHtml = clientBons.map(inv => `
        <tr style="border-bottom: 1px solid #3e3e42;">
            <td style="padding: 0.75rem; text-align: center;">
                <input type="checkbox" class="bon-select-checkbox" data-bon-id="${inv.id}" 
                       onchange="updateGlobalInvoiceTotals()" 
                       style="width: 18px; height: 18px; cursor: pointer;">
            </td>
            <td style="padding: 0.75rem; color: #2196f3;">${inv.document_numero || '-'}</td>
            <td style="padding: 0.75rem; color: #cccccc;">${inv.document_numero_commande || '-'}</td>
            <td style="padding: 0.75rem; color: #cccccc;">${new Date(inv.document_date).toLocaleDateString('fr-FR')}</td>
            <td style="padding: 0.75rem; color: #4caf50;">${formatNumberChaimae(inv.total_ttc || 0)} DH</td>
        </tr>
    `).join('');
    
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.8); display: flex; align-items: center; justify-content: center; z-index: 10000;';
    
    modal.innerHTML = `
        <div style="background: #2d2d30; border-radius: 12px; padding: 2rem; max-width: 700px; width: 90%; max-height: 90vh; overflow-y: auto;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                <h2 style="color: #fff; margin: 0;">📦 Créer une Facture Globale</h2>
                <button onclick="this.closest('.modal-overlay').remove()" 
                        style="background: none; border: none; color: #999; font-size: 1.5rem; cursor: pointer;">✕</button>
            </div>
            
            <div style="background: #1e1e1e; border-radius: 8px; padding: 1.5rem; margin-bottom: 1.5rem;">
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin-bottom: 1rem;">
                    <div>
                        <p style="color: #999; margin: 0 0 0.25rem 0; font-size: 0.85rem;">Client</p>
                        <p style="color: #cccccc; margin: 0; font-weight: 600;">${clientName}</p>
                    </div>
                    <div>
                        <p style="color: #999; margin: 0 0 0.25rem 0; font-size: 0.85rem;">ICE</p>
                        <p style="color: #cccccc; margin: 0;">${clientICE}</p>
                    </div>
                </div>
                
                <div style="margin-bottom: 1rem;">
                    <label style="display: block; color: #999; margin-bottom: 0.5rem;">N° Facture <span style="color: #f44336;">*</span></label>
                    <input type="text" id="globalInvoiceNumeroModal" placeholder="Ex: 123 → 123/2025" 
                           style="width: 100%; padding: 0.75rem; background: #3e3e42; border: 1px solid #555; color: #fff; border-radius: 8px;"
                           onblur="autoFormatGlobalInvoiceNumberOnBlur(this)">
                </div>
                
                <div>
                    <label style="display: block; color: #999; margin-bottom: 0.5rem;">Date <span style="color: #f44336;">*</span></label>
                    <input type="date" id="globalInvoiceDateModal" value="${new Date().toISOString().split('T')[0]}"
                           style="width: 100%; padding: 0.75rem; background: #3e3e42; border: 1px solid #555; color: #fff; border-radius: 8px;">
                </div>
            </div>
            
            <h3 style="color: #fff; margin: 0 0 1rem 0;">Sélectionner les Bons de Livraison (${clientBons.length})</h3>
            <div style="background: #1e1e1e; border-radius: 8px; overflow: hidden; margin-bottom: 1.5rem; max-height: 300px; overflow-y: auto;">
                <table style="width: 100%; border-collapse: collapse;">
                    <thead>
                        <tr style="background: #252526; position: sticky; top: 0;">
                            <th style="padding: 0.75rem; text-align: center; color: #2196f3;">
                                <input type="checkbox" id="selectAllBonsModal" onchange="toggleAllBonsModal(this)" 
                                       style="width: 18px; height: 18px; cursor: pointer;">
                            </th>
                            <th style="padding: 0.75rem; text-align: left; color: #2196f3;">N° BL</th>
                            <th style="padding: 0.75rem; text-align: left; color: #2196f3;">N° Order</th>
                            <th style="padding: 0.75rem; text-align: left; color: #2196f3;">Date</th>
                            <th style="padding: 0.75rem; text-align: left; color: #2196f3;">Total TTC</th>
                        </tr>
                    </thead>
                    <tbody>${bonsListHtml}</tbody>
                </table>
            </div>
            
            <div style="background: #1e1e1e; border-radius: 8px; padding: 1.5rem; margin-bottom: 1.5rem;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                    <span style="color: #999;">Total HT:</span>
                    <span id="modalTotalHT" style="color: #cccccc; font-weight: 600;">0,00 DH</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                    <span style="color: #999;">TVA (20%):</span>
                    <span id="modalTotalTVA" style="color: #cccccc; font-weight: 600;">0,00 DH</span>
                </div>
                <div style="display: flex; justify-content: space-between; padding-top: 0.5rem; border-top: 2px solid #3e3e42;">
                    <span style="color: #fff; font-weight: 600;">Total TTC:</span>
                    <span id="modalTotalTTC" style="color: #4caf50; font-weight: 600; font-size: 1.25rem;">0,00 DH</span>
                </div>
            </div>
            
            <div style="display: flex; gap: 1rem; justify-content: flex-end;">
                <button onclick="this.closest('.modal-overlay').remove()" 
                        style="padding: 0.75rem 1.5rem; background: #3e3e42; color: #fff; border: none; border-radius: 8px; cursor: pointer;">
                    Annuler
                </button>
                <button onclick="saveGlobalInvoiceFromModal()" 
                        style="padding: 0.75rem 1.5rem; background: #4caf50; color: #fff; border: none; border-radius: 8px; cursor: pointer; font-weight: 600;">
                    ✓ Créer
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Store all available bons for this client
    window.globalInvoiceModalData = { clientBons, clientName, clientICE };
}

// Toggle all bons in modal
window.toggleAllBonsModal = function(checkbox) {
    const checkboxes = document.querySelectorAll('.bon-select-checkbox');
    checkboxes.forEach(cb => cb.checked = checkbox.checked);
    updateGlobalInvoiceTotals();
}

// Update totals based on selected bons
window.updateGlobalInvoiceTotals = function() {
    const selectedCheckboxes = document.querySelectorAll('.bon-select-checkbox:checked');
    const selectedIds = Array.from(selectedCheckboxes).map(cb => parseInt(cb.dataset.bonId));
    const clientBons = window.globalInvoiceModalData.clientBons;
    
    let totalHT = 0;
    selectedIds.forEach(bonId => {
        const bon = clientBons.find(b => b.id === bonId);
        if (bon) {
            totalHT += bon.total_ht || 0;
        }
    });
    
    const tvaRate = 20;
    const montantTVA = totalHT * (tvaRate / 100);
    const totalTTC = totalHT + montantTVA;
    
    document.getElementById('modalTotalHT').textContent = formatNumberChaimae(totalHT) + ' DH';
    document.getElementById('modalTotalTVA').textContent = formatNumberChaimae(montantTVA) + ' DH';
    document.getElementById('modalTotalTTC').textContent = formatNumberChaimae(totalTTC) + ' DH';
}

// Auto-format global invoice number on blur
window.autoFormatGlobalInvoiceNumberOnBlur = function(input) {
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

window.saveGlobalInvoiceFromModal = async function() {
    const numero = document.getElementById('globalInvoiceNumeroModal').value.trim();
    const date = document.getElementById('globalInvoiceDateModal').value;
    
    if (!numero || !date) {
        window.notify.error('Erreur', 'Veuillez remplir tous les champs', 3000);
        return;
    }
    
    // Get selected bons
    const selectedCheckboxes = document.querySelectorAll('.bon-select-checkbox:checked');
    const selectedIds = Array.from(selectedCheckboxes).map(cb => parseInt(cb.dataset.bonId));
    
    if (selectedIds.length === 0) {
        window.notify.error('Erreur', 'Veuillez sélectionner au moins un bon de livraison', 3000);
        return;
    }
    
    const data = window.globalInvoiceModalData;
    const clientBons = data.clientBons;
    
    // Calculate totals
    let totalHT = 0;
    selectedIds.forEach(bonId => {
        const bon = clientBons.find(b => b.id === bonId);
        if (bon) {
            totalHT += bon.total_ht || 0;
        }
    });
    
    const tvaRate = 20;
    const montantTVA = totalHT * (tvaRate / 100);
    const totalTTC = totalHT + montantTVA;
    
    try {
        // Check in both global invoices AND regular invoices
        const allGlobalInvoicesResult = await window.electron.dbChaimae.getAllGlobalInvoices();
        const allRegularInvoicesResult = await window.electron.dbChaimae.getAllInvoices();
        
        // Check in global invoices
        if (allGlobalInvoicesResult.success) {
            const duplicate = allGlobalInvoicesResult.data.find(inv => inv.document_numero === numero);
            if (duplicate) {
                window.notify.error('Erreur', `Le numéro "${numero}" existe déjà dans les factures globales`, 5000);
                return;
            }
        }
        
        // Check in regular invoices (facture type only)
        if (allRegularInvoicesResult.success) {
            const duplicate = allRegularInvoicesResult.data.find(inv => 
                inv.document_type === 'facture' && inv.document_numero === numero
            );
            if (duplicate) {
                window.notify.error('Erreur', `Le numéro "${numero}" existe déjà dans les factures normales`, 5000);
                return;
            }
        }
        
        const formData = {
            client: { nom: data.clientName, ICE: data.clientICE },
            document_numero: numero,
            document_date: date,
            total_ht: totalHT,
            tva_rate: tvaRate,
            montant_tva: montantTVA,
            total_ttc: totalTTC,
            bon_livraison_ids: selectedIds
        };
        
        const result = await window.electron.dbChaimae.createGlobalInvoice(formData);
        
        if (result.success) {
            window.notify.success('Succès', 'Facture globale créée!', 3000);
            document.querySelector('.modal-overlay')?.remove();
            await loadInvoicesChaimae();
        } else {
            window.notify.error('Erreur', result.error || 'Erreur lors de la création', 4000);
        }
    } catch (error) {
        console.error('Error:', error);
        window.notify.error('Erreur', 'Erreur lors de la création', 4000);
    }
}

// Removed duplicate - using the main formatNumberChaimae function above

// Export database
window.exportDatabaseChaimae = async function() {
    try {
        window.notify.info('Export', 'Exportation en cours...', 2000);
        const result = await window.electron.dbChaimae.exportDatabase();
        
        if (result.success) {
            window.notify.success('Succès', 'Base de données exportée avec succès!', 3000);
        } else if (result.canceled) {
            window.notify.warning('Annulé', 'Exportation annulée', 2000);
        } else {
            window.notify.error('Erreur', result.error || 'Échec de l\'exportation', 3000);
        }
    } catch (error) {
        console.error('Export error:', error);
        window.notify.error('Erreur', 'Une erreur est survenue', 3000);
    }
}

// Import database
window.importDatabaseChaimae = async function() {
    const confirmed = await customConfirm('Attention', '⚠️ ATTENTION: L\'importation remplacera toutes les données actuelles.\n\nUne sauvegarde automatique sera créée.\n\nVoulez-vous continuer?', 'warning');
    
    if (!confirmed) return;
    
    try {
        window.notify.info('Import', 'Importation en cours...', 2000);
        const result = await window.electron.dbChaimae.importDatabase();
        
        if (result.success) {
            window.notify.success('Succès', 'Base de données importée! Rechargement...', 3000);
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } else if (result.canceled) {
            window.notify.warning('Annulé', 'Importation annulée', 2000);
        } else {
            window.notify.error('Erreur', result.error || 'Échec de l\'importation', 3000);
        }
    } catch (error) {
        console.error('Import error:', error);
        window.notify.error('Erreur', 'Une erreur est survenue', 3000);
    }
}

// Initialize page
window.initInvoicesListChaimaePage = function() {
    console.log('🔄 Initializing invoices list page for Chaimae...');
    
    // Define downloadGlobalInvoicePDF function if not already defined
    if (typeof window.downloadGlobalInvoicePDF === 'undefined') {
        window.downloadGlobalInvoicePDF = async function(invoiceId, sortOrder = null) {
            try {
                console.log('📥 Generating PDF for global invoice:', invoiceId);
                
                const result = await window.electron.dbChaimae.getGlobalInvoiceById(invoiceId);
                
                if (!result.success || !result.data) {
                    throw new Error('Facture globale introuvable');
                }
                
                const invoice = result.data;
                
                // If sortOrder not provided, ask user
                if (sortOrder === null && invoice.bons && invoice.bons.length > 1) {
                    return new Promise((resolve) => {
                        const modal = document.createElement('div');
                        modal.className = 'modal-overlay';
                        modal.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.7);display:flex;align-items:center;justify-content:center;z-index:10000;';
                        modal.innerHTML = `
                            <div style="background:#2d2d30;border-radius:12px;padding:2rem;max-width:500px;width:90%;box-shadow:0 10px 40px rgba(0,0,0,0.5);">
                                <h2 style="color:#fff;margin:0 0 1.5rem 0;font-size:1.5rem;text-align:center;">
                                    📋 Ordre des Bons de Livraison
                                </h2>
                                <p style="color:#ccc;margin-bottom:2rem;text-align:center;line-height:1.6;">
                                    Comment souhaitez-vous trier les bons de livraison dans le PDF ?
                                </p>
                                <div style="display:flex;flex-direction:column;gap:1rem;">
                                    <button onclick="this.closest('.modal-overlay').remove(); window.downloadGlobalInvoicePDF(${invoiceId}, 'numero_asc')" 
                                            style="padding:1rem;background:linear-gradient(135deg, #11998e 0%, #38ef7d 100%);color:#fff;border:none;border-radius:8px;font-size:1rem;cursor:pointer;transition:transform 0.2s;"
                                            onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform='scale(1)'">
                                        🔢 Par numéro croissant (1 → 99)
                                    </button>
                                    <button onclick="this.closest('.modal-overlay').remove(); window.downloadGlobalInvoicePDF(${invoiceId}, 'numero_desc')" 
                                            style="padding:1rem;background:linear-gradient(135deg, #fa709a 0%, #fee140 100%);color:#fff;border:none;border-radius:8px;font-size:1rem;cursor:pointer;transition:transform 0.2s;"
                                            onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform='scale(1)'">
                                        🔢 Par numéro décroissant (99 → 1)
                                    </button>
                                    <button onclick="this.closest('.modal-overlay').remove(); window.downloadGlobalInvoicePDF(${invoiceId}, 'oldest')" 
                                            style="padding:1rem;background:linear-gradient(135deg, #667eea 0%, #764ba2 100%);color:#fff;border:none;border-radius:8px;font-size:1rem;cursor:pointer;transition:transform 0.2s;"
                                            onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform='scale(1)'">
                                        📅 Du plus ancien au plus récent
                                    </button>
                                    <button onclick="this.closest('.modal-overlay').remove(); window.downloadGlobalInvoicePDF(${invoiceId}, 'newest')" 
                                            style="padding:1rem;background:linear-gradient(135deg, #f093fb 0%, #f5576c 100%);color:#fff;border:none;border-radius:8px;font-size:1rem;cursor:pointer;transition:transform 0.2s;"
                                            onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform='scale(1)'">
                                        📅 Du plus récent au plus ancien
                                    </button>
                                    <button onclick="this.closest('.modal-overlay').remove()" 
                                            style="padding:0.75rem;background:#fff;color:#333;border:2px solid #ddd;border-radius:8px;font-size:0.9rem;cursor:pointer;margin-top:0.5rem;font-weight:600;transition:all 0.3s;"
                                            onmouseover="this.style.background='#f5f5f5';this.style.borderColor='#bbb';"
                                            onmouseout="this.style.background='#fff';this.style.borderColor='#ddd';">
                                        ✕ Annuler
                                    </button>
                                </div>
                            </div>
                        `;
                        document.body.appendChild(modal);
                    });
                }
                
                if (typeof window.jspdf === 'undefined') {
                    window.notify.info('Info', 'Chargement de jsPDF...', 2000);
                    const script = document.createElement('script');
                    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
                    script.onload = () => window.downloadGlobalInvoicePDF(invoiceId);
                    document.head.appendChild(script);
                    return;
                }
                
                // Wait for logo to load if not already loaded
                const logoImg = document.querySelector('img[src*="chaimae.png"]');
                if (logoImg && !logoImg.src.startsWith('data:')) {
                    console.log('⏳ Waiting for logo to load...');
                    await new Promise(resolve => setTimeout(resolve, 500));
                }
                
                const { jsPDF } = window.jspdf;
                const doc = new jsPDF();
                const blueColor = [52, 103, 138];
                const dateStr = new Date(invoice.document_date).toLocaleDateString('fr-FR');
                
                const addHeader = () => {
                    // Add Logo with detailed logging
                    console.log('🔍 === LOGO DEBUG START ===');
                    try {
                        // Try multiple selectors to find the logo
                        let logoImg = document.querySelector('img[src*="chaimae.png"]') || 
                                     document.querySelector('img[data-asset="chaimae"]') ||
                                     document.querySelector('img[src^="data:image"]');
                        
                        console.log('🖼️ Logo element found:', !!logoImg);
                        
                        if (logoImg) {
                            console.log('📍 Logo src type:', typeof logoImg.src);
                            console.log('📍 Logo src length:', logoImg.src?.length);
                            console.log('📍 Logo src starts with data:', logoImg.src?.startsWith('data:'));
                            console.log('📍 Logo src preview:', logoImg.src?.substring(0, 100));
                            console.log('📍 Logo complete:', logoImg.complete);
                            console.log('📍 Logo naturalWidth:', logoImg.naturalWidth);
                            console.log('📍 Logo naturalHeight:', logoImg.naturalHeight);
                            
                            if (logoImg.src && logoImg.src.startsWith('data:')) {
                                doc.addImage(logoImg.src, 'PNG', 15, 10, 35, 35);
                                console.log('✅ Logo successfully added to PDF');
                            } else {
                                console.warn('⚠️ Logo src is not base64 data URL');
                                console.warn('⚠️ Current src:', logoImg.src);
                            }
                        } else {
                            console.error('❌ Logo element not found in DOM');
                            console.log('📋 Available images:', document.querySelectorAll('img').length);
                            document.querySelectorAll('img').forEach((img, i) => {
                                console.log(`  Image ${i}:`, img.src?.substring(0, 50));
                            });
                        }
                    } catch (error) {
                        console.error('❌ Error adding logo:', error);
                        console.error('❌ Error stack:', error.stack);
                    }
                    console.log('🔍 === LOGO DEBUG END ===');
                    console.log('');
                    
                    // Company Header
                    doc.setFontSize(16);
                    doc.setTextColor(...blueColor);
                    doc.setFont(undefined, 'bold');
                    doc.text('CHAIMAE ERRBAHI M\'DIQ sarl (AU)', 105, 18, { align: 'center' });
                    
                    doc.setFontSize(8);
                    doc.setFont(undefined, 'normal');
                    doc.setTextColor(0, 0, 0);
                    doc.text('Patente N° 52003366 - NIF : 40190505', 105, 25, { align: 'center' });
                    doc.text('RC N° : 10487 - CNSS : 8721591', 105, 30, { align: 'center' });
                    doc.text('ICE : 001544861000014', 105, 35, { align: 'center' });
                    
                    doc.setFontSize(11);
                    doc.setFont(undefined, 'bold');
                    doc.text('CLIENT :', 15, 50);
                    doc.setTextColor(0, 128, 0); // Green color
                    doc.text(invoice.client_nom, 40, 50);
                    
                    // Only show ICE if it exists and is not "0"
                    if (invoice.client_ice && invoice.client_ice !== '0') {
                        doc.setTextColor(0, 0, 0);
                        doc.text('ICE :', 15, 57);
                        doc.setTextColor(0, 128, 0); // Green color
                        doc.text(invoice.client_ice, 40, 57);
                    }
                    
                    doc.setTextColor(0, 0, 0);
                    doc.text(`Date: ${dateStr}`, 150, 50);
                    
                    doc.setFontSize(14);
                    doc.setFont(undefined, 'bold');
                    doc.text('FACTURE N°:', 15, 70);
                    doc.setTextColor(...blueColor);
                    doc.text(invoice.document_numero, 50, 70);
                };
                
                const addFooter = (pageNum, totalPages) => {
                    doc.setTextColor(0, 0, 0);
                    doc.setFontSize(7);
                    doc.setFont(undefined, 'normal');
                    doc.text('RIB : 007 720 00 05979000000368 12  ATTIJARI WAFA BANQ', 15, 275);
                    doc.text('Email: errbahiabderrahim@gmail.com', 15, 279);
                    doc.text('ADRESSE: LOT ALBAHR AV TETOUAN N94 GARAGE 2 M\'DIQ', 15, 283);
                    doc.text('Tel: +212 661 307 323', 15, 287);
                    
                    // Page numbering
                    if (pageNum && totalPages) {
                        doc.setFontSize(8);
                        doc.setTextColor(128, 128, 128);
                        doc.text(`Page ${pageNum} / ${totalPages}`, 105, 293, { align: 'center' });
                    }
                };
                
                addHeader();
                
                const startY = 80;
                doc.setFillColor(...blueColor);
                doc.rect(15, startY, 180, 8, 'F');
                doc.setTextColor(255, 255, 255);
                doc.setFontSize(9);
                doc.setFont(undefined, 'bold');
                doc.text('N° Bon de livraison', 20, startY + 5.5);
                doc.text('N° Order', 70, startY + 5.5);
                doc.text('Date de livraison', 120, startY + 5.5);
                doc.text('Total HT', 180, startY + 5.5, { align: 'right' });
                
                let currentY = startY + 10;
                doc.setTextColor(0, 0, 0);
                doc.setFont(undefined, 'normal');
                doc.setFontSize(9);
                
                let pageCount = 1;
                const pages = [];
                
                const formatNumber = (num) => num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
                
                // Sort bons based on user selection
                if (invoice.bons && invoice.bons.length > 0) {
                    let sortedBons = [...invoice.bons];
                    
                    if (sortOrder === 'oldest') {
                        // Sort from oldest to newest (ascending by date)
                        sortedBons.sort((a, b) => new Date(a.document_date) - new Date(b.document_date));
                    } else if (sortOrder === 'newest') {
                        // Sort from newest to oldest (descending by date)
                        sortedBons.sort((a, b) => new Date(b.document_date) - new Date(a.document_date));
                    } else if (sortOrder === 'numero_asc') {
                        // Sort by document number ascending (1 → 99)
                        sortedBons.sort((a, b) => {
                            const getNumero = (bon) => {
                                const numero = bon.document_numero_bl || bon.document_numero || '0';
                                const match = numero.match(/(\d+)(?:\/|$)/);
                                return match ? parseInt(match[1]) : 0;
                            };
                            const numA = getNumero(a);
                            const numB = getNumero(b);
                            const numCompare = numA - numB;
                            if (numCompare !== 0) return numCompare;
                            // Secondary sort by date if numbers are equal
                            return new Date(a.document_date) - new Date(b.document_date);
                        });
                    } else if (sortOrder === 'numero_desc') {
                        // Sort by document number descending (99 → 1)
                        sortedBons.sort((a, b) => {
                            const getNumero = (bon) => {
                                const numero = bon.document_numero_bl || bon.document_numero || '0';
                                const match = numero.match(/(\d+)(?:\/|$)/);
                                return match ? parseInt(match[1]) : 0;
                            };
                            const numA = getNumero(a);
                            const numB = getNumero(b);
                            const numCompare = numB - numA;
                            if (numCompare !== 0) return numCompare;
                            // Secondary sort by date if numbers are equal
                            return new Date(b.document_date) - new Date(a.document_date);
                        });
                    }
                    // If sortOrder is null, keep original order
                    
                    sortedBons.forEach((bon, index) => {
                        if (currentY > 240) {
                            pages.push(pageCount);
                            doc.addPage();
                            addHeader();
                            pageCount++;
                            doc.setFillColor(...blueColor);
                            doc.rect(15, startY, 180, 8, 'F');
                            doc.setTextColor(255, 255, 255);
                            doc.setFontSize(9);
                            doc.setFont(undefined, 'bold');
                            doc.text('N° Bon de livraison', 20, startY + 5.5);
                            doc.text('N° Order', 70, startY + 5.5);
                            doc.text('Date de livraison', 120, startY + 5.5);
                            doc.text('Total HT', 180, startY + 5.5, { align: 'right' });
                            currentY = startY + 10;
                            doc.setTextColor(0, 0, 0);
                            doc.setFont(undefined, 'normal');
                            doc.setFontSize(9);
                        }
                        
                        if (index % 2 === 0) {
                            doc.setFillColor(245, 245, 245);
                            doc.rect(15, currentY - 3, 180, 8, 'F');
                        }
                        
                        const bonHT = parseFloat(bon.total_ht) || 0;
                        doc.text(bon.document_numero_bl || bon.document_numero || '-', 20, currentY + 3);
                        doc.text(bon.document_numero_commande || '-', 70, currentY + 3);
                        doc.text(new Date(bon.document_date).toLocaleDateString('fr-FR'), 120, currentY + 3);
                        doc.text(`${formatNumber(bonHT)} DH`, 180, currentY + 3, { align: 'right' });
                        currentY += 8;
                    });
                }
                
                currentY += 10;
                doc.setFillColor(245, 245, 245);
                doc.rect(110, currentY, 85, 8, 'F');
                doc.setFont(undefined, 'bold');
                doc.setTextColor(0, 0, 0);
                doc.setFontSize(9);
                doc.text('TOTAL HT :', 113, currentY + 5.5);
                doc.setFontSize(8);
                doc.text(`${formatNumber(invoice.total_ht)} DH`, 192, currentY + 5.5, { align: 'right' });
                
                currentY += 8;
                doc.setFillColor(255, 255, 255);
                doc.rect(110, currentY, 85, 8, 'F');
                doc.setFontSize(9);
                doc.text(`MONTANT TVA ${invoice.tva_rate}% :`, 113, currentY + 5.5);
                doc.setFontSize(8);
                doc.text(`${formatNumber(invoice.montant_tva)} DH`, 192, currentY + 5.5, { align: 'right' });
                
                currentY += 8;
                doc.setFillColor(173, 216, 230);
                doc.rect(110, currentY, 85, 8, 'F');
                doc.setTextColor(...blueColor);
                doc.setFontSize(9);
                doc.text('MONTANT T.T.C :', 113, currentY + 5.5);
                doc.setFontSize(8.5);
                doc.text(`${formatNumber(invoice.total_ttc)} DH`, 192, currentY + 5.5, { align: 'right' });
                
                // Amount in words (French)
                currentY += 15;
                doc.setTextColor(0, 0, 0);
                doc.setFontSize(9);
                doc.setFont(undefined, 'italic');
                const amountInWords = numberToFrenchWordsChaimae(invoice.total_ttc);
                
                console.log('🔍 [GLOBAL INVOICE PDF] Invoice type:', invoice.document_type);
                console.log('🔍 [GLOBAL INVOICE PDF] Has bons:', !!invoice.bons);
                console.log('🔍 [GLOBAL INVOICE PDF] Bons count:', invoice.bons?.length);
                
                // For Global Invoice (has bons array), always show "Facture Globale"
                if (invoice.bons && invoice.bons.length > 0) {
                    console.log('✅ [GLOBAL INVOICE PDF] This is a Global Invoice - showing "Facture Globale"');
                    doc.text(`La Présente Facture est Arrêtée à la somme de : ${amountInWords}`, 15, currentY, { maxWidth: 180 });
                } else if (invoice.document_type !== 'bon_livraison') {
                    // For regular invoices (not global)
                    const docTypeText = invoice.document_type === 'facture' ? 'Facture' : 'Devis';
                    console.log('📄 [REGULAR INVOICE PDF] Regular invoice type:', docTypeText);
                    doc.text(`La Présente ${docTypeText} est Arrêtée à la somme de : ${amountInWords}`, 15, currentY, { maxWidth: 180 });
                }
                
                // Add notes if any
                const noteResult = await window.electron.dbChaimae.getNote(invoiceId);
                if (noteResult.success && noteResult.data) {
                    currentY += 15;
                    doc.setFontSize(8);
                    doc.setFont(undefined, 'bold');
                    doc.setTextColor(96, 125, 139);
                    doc.text('Notes:', 15, currentY);
                    
                    doc.setFont(undefined, 'bold');
                    doc.setTextColor(0, 0, 0);
                    doc.setFontSize(9);
                    const noteLines = doc.splitTextToSize(noteResult.data, 180);
                    const footerTopY = 270;
                    let lineY = currentY + 4;
                    for (let i = 0; i < noteLines.length; i++) {
                        if (lineY > footerTopY) {
                            pages.push(pageCount);
                            doc.addPage();
                            addHeader(false);
                            pageCount++;
                            doc.setFontSize(8);
                            doc.setFont(undefined, 'bold');
                            doc.setTextColor(96, 125, 139);
                            doc.text('Notes (suite) :', 15, 60);
                            doc.setTextColor(0, 0, 0);
                            doc.setFont(undefined, 'bold');
                            doc.setFontSize(9);
                            lineY = 64;
                        }
                        doc.text(noteLines[i], 15, lineY);
                        lineY += 4.5;
                    }
                }
                
                // Add page numbering to all pages
                pages.push(pageCount);
                const totalPages = pages.length;
                
                for (let i = 0; i < totalPages; i++) {
                    doc.setPage(i + 1);
                    addFooter(i + 1, totalPages);
                }
                
                const filename = `Facture_Globale_${invoice.document_numero}_${invoice.client_nom}.pdf`;
                doc.save(filename);
                
                window.notify.success('Succès', 'PDF téléchargé avec succès', 3000);
                
            } catch (error) {
                console.error('❌ Error generating PDF:', error);
                window.notify.error('Erreur', 'Impossible de générer le PDF: ' + error.message, 4000);
            }
        };
    }
    
    setTimeout(() => {
        loadInvoicesChaimae();
        
        // Add event listeners
        const selectAll = document.getElementById('selectAllInvoicesChaimae');
        if (selectAll) {
            selectAll.addEventListener('change', selectAllInvoicesChaimae);
        }
        
        // Add checkbox change listeners
        document.addEventListener('change', (e) => {
            if (e.target.classList.contains('invoice-checkbox-chaimae')) {
                updateSelectAllChaimae();
            }
        });
    }, 100);
}

// Use global prefixes (shared with create and edit pages)
if (!window.bonLivraisonPrefixes) {
    window.bonLivraisonPrefixes = ['MG', 'TL', 'BL'];
    window.selectedPrefix = 'MG';
    window.prefixesLoaded = false;
}

// Toggle prefix dropdown for Convert modal (Global)
window.togglePrefixDropdownConvert = async function() {
    const dropdown = document.getElementById('prefixDropdownConvert');
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
        renderPrefixListConvert();
        dropdown.style.display = 'block';
    } else {
        dropdown.style.display = 'none';
    }
}

// Render prefix list for Convert modal (Global)
window.renderPrefixListConvert = function() {
    const listContainer = document.getElementById('prefixListConvert');
    if (!listContainer) return;
    
    listContainer.innerHTML = window.bonLivraisonPrefixes.map((prefix, index) => `
        <div onclick="selectPrefixConvert('${prefix}')" 
             style="margin: 0.35rem; padding: 0.75rem 1rem; cursor: pointer; border-radius: 8px; transition: all 0.3s; color: #fff; display: flex; justify-content: space-between; align-items: center; background: ${prefix === window.selectedPrefix ? 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)' : 'rgba(255,255,255,0.05)'}; border: 2px solid ${prefix === window.selectedPrefix ? '#667eea' : 'transparent'}; box-shadow: ${prefix === window.selectedPrefix ? '0 2px 8px rgba(102, 126, 234, 0.3)' : 'none'};"
             onmouseover="if('${prefix}' !== window.selectedPrefix) { this.style.background='rgba(102, 126, 234, 0.2)'; this.style.borderColor='#667eea'; this.style.transform='translateX(5px)'; }" 
             onmouseout="if('${prefix}' !== window.selectedPrefix) { this.style.background='rgba(255,255,255,0.05)'; this.style.borderColor='transparent'; this.style.transform='translateX(0)'; }">
            <div style="display: flex; align-items: center; gap: 0.75rem;">
                <span style="font-size: 1.2rem;">${prefix === window.selectedPrefix ? '✓' : '📌'}</span>
                <span style="font-weight: ${prefix === window.selectedPrefix ? '700' : '500'}; font-size: 1rem; letter-spacing: 1px;">${prefix}</span>
            </div>
            ${window.bonLivraisonPrefixes.length > 1 ? `
                <button onclick="event.stopPropagation(); deletePrefixConvert('${prefix}')" 
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

// Select prefix for Convert modal (Global)
window.selectPrefixConvert = function(prefix) {
    window.selectedPrefix = prefix;
    const prefixInput = document.getElementById('prefixInputConvert');
    const prefixExample = document.getElementById('prefixExampleConvert');
    
    if (prefixInput) prefixInput.value = prefix;
    if (prefixExample) prefixExample.textContent = prefix;
    
    const dropdown = document.getElementById('prefixDropdownConvert');
    if (dropdown) dropdown.style.display = 'none';
    
    renderPrefixListConvert();
}

// Add new prefix for Convert modal (Global)
window.addNewPrefixConvert = async function() {
    const newPrefixInput = document.getElementById('newPrefixInputConvert');
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
        
        renderPrefixListConvert();
        window.notify.success('Succès', `Prefix "${newPrefix}" ajouté`, 2000);
    } else {
        window.notify.error('Erreur', result.error || 'Impossible d\'ajouter le prefix', 3000);
    }
}

// Delete prefix for Convert modal (Global)
window.deletePrefixConvert = async function(prefix) {
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
                const prefixInput = document.getElementById('prefixInputConvert');
                const prefixExample = document.getElementById('prefixExampleConvert');
                if (prefixInput) prefixInput.value = window.selectedPrefix;
                if (prefixExample) prefixExample.textContent = window.selectedPrefix;
            }
            
            renderPrefixListConvert();
            window.notify.success('Succès', `Prefix "${prefix}" supprimé`, 2000);
        }
    } else {
        window.notify.error('Erreur', result.error || 'Impossible de supprimer le prefix', 3000);
    }
}

// ==================== CONVERT ORDER PREFIX FUNCTIONS ====================

// Toggle convert order prefix dropdown
window.toggleConvertOrderPrefixDropdown = async function() {
    const dropdown = document.getElementById('convertOrderPrefixDropdown');
    if (!dropdown) return;
    
    if (dropdown.style.display === 'none') {
        await loadConvertOrderPrefixes();
        renderConvertOrderPrefixList();
        dropdown.style.display = 'block';
    } else {
        dropdown.style.display = 'none';
    }
};

// Render convert order prefix list
function renderConvertOrderPrefixList() {
    const listContainer = document.getElementById('convertOrderPrefixList');
    if (!listContainer) return;
    
    if (!window.orderPrefixes || window.orderPrefixes.length === 0) {
        window.orderPrefixes = ['BC', 'CMD', 'ORD'];
    }
    
    listContainer.innerHTML = window.orderPrefixes.map(prefix => `
        <div onclick="selectConvertOrderPrefix('${prefix}')" 
             style="margin: 0.35rem; padding: 0.75rem 1rem; cursor: pointer; border-radius: 8px; transition: all 0.3s; color: #fff; display: flex; justify-content: space-between; align-items: center; background: ${prefix === window.selectedOrderPrefix ? 'linear-gradient(90deg, #2196f3 0%, #1976d2 100%)' : 'rgba(255,255,255,0.05)'}; border: 2px solid ${prefix === window.selectedOrderPrefix ? '#2196f3' : 'transparent'};"
             onmouseover="if('${prefix}' !== window.selectedOrderPrefix) { this.style.background='rgba(33, 150, 243, 0.2)'; this.style.borderColor='#2196f3'; }" 
             onmouseout="if('${prefix}' !== window.selectedOrderPrefix) { this.style.background='rgba(255,255,255,0.05)'; this.style.borderColor='transparent'; }">
            <div style="display: flex; align-items: center; gap: 0.75rem;">
                <span style="font-size: 1.2rem;">${prefix === window.selectedOrderPrefix ? '✓' : '📌'}</span>
                <span style="font-weight: ${prefix === window.selectedOrderPrefix ? '700' : '500'}; font-size: 1rem;">${prefix}</span>
            </div>
            ${window.orderPrefixes.length > 1 ? `
                <button onclick="event.stopPropagation(); deleteConvertOrderPrefix('${prefix}')" 
                        style="background: transparent; color: #e74c3c; border: 2px solid #e74c3c; border-radius: 6px; padding: 0.3rem 0.4rem; cursor: pointer; transition: all 0.3s;"
                        onmouseover="this.style.background='#e74c3c'; this.style.color='#fff';"
                        onmouseout="this.style.background='transparent'; this.style.color='#e74c3c';">
                    🗑️
                </button>
            ` : ''}
        </div>
    `).join('');
}

// Select convert order prefix
window.selectConvertOrderPrefix = function(prefix) {
    window.selectedOrderPrefix = prefix;
    
    const prefixInput = document.getElementById('convertOrderPrefixInput');
    const prefixExample = document.getElementById('convertOrderPrefixExample');
    
    if (prefixInput) prefixInput.value = prefix;
    if (prefixExample) prefixExample.textContent = prefix;
    
    const dropdown = document.getElementById('convertOrderPrefixDropdown');
    if (dropdown) dropdown.style.display = 'none';
    
    renderConvertOrderPrefixList();
};

// Add new convert order prefix
window.addConvertNewOrderPrefix = async function() {
    const newPrefixInput = document.getElementById('convertNewOrderPrefixInput');
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
    
    const result = await window.electron.dbChaimae.addOrderPrefix(newPrefix);
    
    if (result.success) {
        window.orderPrefixes.push(newPrefix);
        window.orderPrefixes.sort();
        newPrefixInput.value = '';
        
        renderConvertOrderPrefixList();
        window.notify.success('Succès', `Prefix "${newPrefix}" ajouté`, 2000);
    } else {
        window.notify.error('Erreur', result.error || 'Impossible d\'ajouter le prefix', 3000);
    }
};

// Delete convert order prefix
window.deleteConvertOrderPrefix = async function(prefix) {
    if (window.orderPrefixes.length <= 1) {
        window.notify.warning('Attention', 'Vous devez garder au moins un prefix', 2000);
        return;
    }
    
    const result = await window.electron.dbChaimae.deleteOrderPrefix(prefix);
    
    if (result.success) {
        const index = window.orderPrefixes.indexOf(prefix);
        if (index > -1) {
            window.orderPrefixes.splice(index, 1);
            
            if (window.selectedOrderPrefix === prefix) {
                window.selectedOrderPrefix = window.orderPrefixes[0];
                const prefixInput = document.getElementById('convertOrderPrefixInput');
                const prefixExample = document.getElementById('convertOrderPrefixExample');
                if (prefixInput) prefixInput.value = window.selectedOrderPrefix;
                if (prefixExample) prefixExample.textContent = window.selectedOrderPrefix;
            }
            
            renderConvertOrderPrefixList();
            window.notify.success('Succès', `Prefix "${prefix}" supprimé`, 2000);
        }
    } else {
        window.notify.error('Erreur', result.error || 'Impossible de supprimer le prefix', 3000);
    }
};

// Load convert order prefixes from database
async function loadConvertOrderPrefixes() {
    try {
        const result = await window.electron.dbChaimae.getOrderPrefixes();
        if (result.success && result.data && result.data.length > 0) {
            window.orderPrefixes = result.data;
            if (!window.selectedOrderPrefix) {
                window.selectedOrderPrefix = window.orderPrefixes[0];
            }
        } else {
            if (!window.orderPrefixes) {
                window.orderPrefixes = ['BC', 'CMD', 'ORD'];
                window.selectedOrderPrefix = 'BC';
            }
        }
    } catch (error) {
        console.error('Error loading order prefixes:', error);
        if (!window.orderPrefixes) {
            window.orderPrefixes = ['BC', 'CMD', 'ORD'];
            window.selectedOrderPrefix = 'BC';
        }
    }
}

// ==================== END CONVERT ORDER PREFIX FUNCTIONS ====================

// Search clients in edit mode for Chaimae
let filteredClientsEditChaimae = [];
window.searchClientsEditChaimae = function(query) {
    const dropdown = document.getElementById('clientsDropdownEditChaimae');
    if (!dropdown) return;
    
    if (!query || query.trim().length === 0) {
        filteredClientsEditChaimae = allClientsChaimae;
    } else {
        const searchTerm = query.toLowerCase().trim();
        filteredClientsEditChaimae = allClientsChaimae.filter(client => 
            client.nom.toLowerCase().includes(searchTerm) || 
            client.ice.toLowerCase().includes(searchTerm)
        );
    }
    
    displayClientsListEditChaimae();
}

function displayClientsListEditChaimae() {
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
            <button class="delete-client-btn" onclick="event.stopPropagation(); deleteClientEditChaimae(${client.id}, '${client.nom.replace(/'/g, "\\'")}');" 
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

window.showClientsListEditChaimae = function() {
    if (allClientsChaimae.length > 0) {
        filteredClientsEditChaimae = allClientsChaimae;
        displayClientsListEditChaimae();
    }
}

window.hideClientsListEditChaimae = function() {
    setTimeout(() => {
        const dropdown = document.getElementById('clientsDropdownEditChaimae');
        if (dropdown) dropdown.style.display = 'none';
    }, 200);
}

window.selectClientEditChaimae = function(nom, ice) {
    document.getElementById('editClientNomChaimae').value = nom;
    document.getElementById('editClientICEChaimae').value = ice;
    const dropdown = document.getElementById('clientsDropdownEditChaimae');
    if (dropdown) dropdown.style.display = 'none';
}

// Delete a client from edit mode
window.deleteClientEditChaimae = async function(clientId, clientName) {
    if (!confirm(`هل أنت متأكد من حذف الزبون "${clientName}"؟`)) {
        return;
    }
    
    try {
        const response = await fetch(`http://localhost:3000/api/clients/${clientId}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            window.notify.success('تم الحذف', `تم حذف الزبون "${clientName}" بنجاح`);
            // Reload clients list
            await loadAllClientsChaimae();
            // Refresh dropdown
            searchClientsEditChaimae(document.getElementById('editClientNomChaimae').value);
        } else {
            window.notify.error('خطأ', 'فشل حذف الزبون');
        }
    } catch (error) {
        console.error('Error deleting client:', error);
        window.notify.error('خطأ', 'حدث خطأ أثناء حذف الزبون');
    }
}

// Format Bon numero with selected prefix for Convert modal (Global)
window.formatBonNumeroWithPrefixConvert = function(input) {
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