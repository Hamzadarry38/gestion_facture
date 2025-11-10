// Multi Company Invoices List Page
function InvoicesListMultiPage() {
    return `
        <div class="desktop-app">
            <div class="window-header">
                <div class="window-title">
                    <img src="assets/logos/multi.png" class="header-logo" alt="Multi Company" data-asset="assets/logos/multi.png">
                    <span>Liste des Factures - Multi Company</span>
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
                        <h1>📋 Liste des Factures et Devis</h1>
                        <div class="header-actions">
                            <button onclick="changeYearMulti()" style="background: #2d2d30; color: white; padding: 0.75rem 1.5rem; border: 2px solid #667eea; border-radius: 6px; cursor: pointer; font-weight: 600; display: flex; align-items: center; gap: 0.5rem; transition: all 0.3s; margin-right: 1rem;" onmouseover="this.style.background='#3e3e42'" onmouseout="this.style.background='#2d2d30'">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                                </svg>
                                <span id="currentYearDisplayMulti">Toutes</span>
                            </button>
                            <button class="btn-situation" onclick="showSituationMensuelleModalMulti()" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 0.75rem 1.5rem; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; display: flex; align-items: center; gap: 0.5rem; transition: all 0.3s;" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 12px rgba(102, 126, 234, 0.5)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'">
                                📊 Situation Mensuelle
                            </button>
                            <button class="btn-primary" onclick="router.navigate('/create-invoice-multi')">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style="margin-right: 0.5rem;">
                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                </svg>
                                <span>Nouvelle Facture</span>
                            </button>
                            <button class="btn-secondary" onclick="router.navigate('/dashboard-multi')">
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
                            <select id="filterTypeMulti" onchange="filterInvoicesMulti()">
                                <option value="">Tous</option>
                                <option value="facture">Factures</option>
                                <option value="devis">Devis</option>
                            </select>
                        </div>
                        
                        <div class="filter-group">
                            <label>📅 Année:</label>
                            <select id="filterYearMulti" onchange="filterInvoicesMulti()">
                                <option value="">Toutes</option>
                            </select>
                        </div>
                        
                        <div class="filter-group">
                            <label>📆 Mois:</label>
                            <select id="filterMonthMulti" onchange="filterInvoicesMulti()">
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
                            <select id="filterClientMulti" onchange="filterInvoicesMulti()">
                                <option value="">Tous</option>
                            </select>
                        </div>
                        
                        <div class="filter-group" style="grid-column: 1 / -1;">
                            <label>🔍 Recherche avancée:</label>
                            <div style="display: grid; grid-template-columns: 200px 1fr; gap: 0.5rem;">
                                <select id="searchTypeMulti" onchange="filterInvoicesMulti()" style="padding: 0.75rem; background: #1e1e1e; border: 1px solid #3e3e42; border-radius: 4px; color: #ffffff; font-size: 0.95rem;">
                                    <option value="all">🔍 Tout</option>
                                    <option value="numero">📄 N° Document</option>
                                    <option value="order">📋 N° Order</option>
                                    <option value="client">👤 Client</option>
                                    <option value="ice">🏢 ICE</option>
                                    <option value="product">📦 Produit</option>
                                    <option value="price">💰 Prix</option>
                                    <option value="total_ht">💵 Total H.T</option>
                                    <option value="total">💵 Total TTC</option>
                                </select>
                                <input type="text" id="searchInputMulti" placeholder="Tapez votre recherche..." onkeyup="filterInvoicesMulti()" style="width: 100%; padding: 0.75rem; background: #1e1e1e; border: 1px solid #3e3e42; border-radius: 4px; color: #ffffff; font-size: 0.95rem;">
                            </div>
                        </div>
                        
                        <div class="filter-group">
                            <button class="btn-refresh" onclick="loadInvoicesMulti()" style="margin-top: 1.5rem;">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style="margin-right: 0.5rem;">
                                    <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
                                    <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
                                </svg>
                                <span>Actualiser</span>
                            </button>
                        </div>
                    </div>

                    <!-- Loading -->
                    <div id="loadingSpinnerMulti" class="loading-spinner" style="display: none;">
                        <div class="spinner"></div>
                        <p>Chargement des données...</p>
                    </div>

                    <!-- Results Counter & Bulk Actions -->
                    <div style="display: flex; gap: 1rem; align-items: center; margin-bottom: 1rem;">
                        <div id="resultsCounterMulti" style="flex: 1; padding: 0.75rem 1rem; background: #2d2d30; border: 1px solid #3e3e42; border-radius: 6px; color: #cccccc; font-size: 0.95rem; display: none;">
                            <strong>📊 Résultats:</strong> <span id="resultCountMulti">0</span> facture(s) trouvée(s)
                        </div>
                        <div style="display: flex; gap: 0.5rem; align-items: center;">
                            <label style="color: #cccccc; font-size: 0.9rem;">Afficher:</label>
                            <select id="itemsPerPageMulti" onchange="changeItemsPerPageMulti()" style="padding: 0.5rem; background: #2d2d30; border: 1px solid #3e3e42; border-radius: 4px; color: #ffffff; cursor: pointer;">
                                <option value="10">10</option>
                                <option value="20">20</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                                <option value="all">Tout</option>
                            </select>
                        </div>
                        <button id="bulkDeleteBtnMulti" onclick="handleBulkDeleteMulti()" 
                                style="padding: 0.75rem 1.5rem; background: #f44336; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 0.95rem; transition: all 0.3s; display: flex; align-items: center; gap: 0.5rem;"
                                onmouseover="this.style.background='#d32f2f'" onmouseout="this.style.background='#f44336'">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                            </svg>
                            <span id="bulkDeleteTextMulti">Supprimer</span>
                        </button>
                        <button id="bulkDownloadBtnMulti" onclick="handleBulkDownloadMulti()" 
                                style="padding: 0.75rem 1.5rem; background: #2196f3; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 0.95rem; transition: all 0.3s; display: flex; align-items: center; gap: 0.5rem;"
                                onmouseover="this.style.background='#1976d2'" onmouseout="this.style.background='#2196f3'">
                            📥 <span id="bulkDownloadTextMulti">Télécharger</span>
                        </button>
                    </div>

                    <!-- Invoices Table -->
                    <div class="table-container">
                        <table class="invoices-table">
                            <thead>
                                <tr>
                                    <th>
                                        <input type="checkbox" id="selectAllInvoicesMulti" 
                                               style="width: 18px; height: 18px; cursor: pointer;"
                                               title="Sélectionner tout">
                                    </th>
                                    <th>ID</th>
                                    <th>Type</th>
                                    <th onclick="sortTableMulti('numero')" style="cursor: pointer; user-select: none;" title="Cliquer pour trier">
                                        N° Document <span id="sortIconNumero">⇅</span>
                                    </th>
                                    <th>Client</th>
                                    <th>ICE</th>
                                    <th onclick="sortTableMulti('date')" style="cursor: pointer; user-select: none;" title="Cliquer pour trier">
                                        Date <span id="sortIconDate">⇅</span>
                                    </th>
                                    <th onclick="sortTableMulti('total_ht')" style="cursor: pointer; user-select: none;" title="Cliquer pour trier">
                                        Total HT <span id="sortIconHT">⇅</span>
                                    </th>
                                    <th>TVA</th>
                                    <th onclick="sortTableMulti('total_ttc')" style="cursor: pointer; user-select: none;" title="Cliquer pour trier">
                                        Total TTC <span id="sortIconTTC">⇅</span>
                                    </th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody id="invoicesTableBodyMulti">
                                <!-- Invoices will be loaded here -->
                            </tbody>
                        </table>
                    </div>

                    <!-- Pagination -->
                    <div id="paginationMulti" style="display: none; margin-top: 1.5rem; padding: 1rem; background: #2d2d30; border: 1px solid #3e3e42; border-radius: 6px;">
                        <div style="display: flex; justify-content: center; align-items: center; gap: 0.5rem;">
                            <button id="prevPageMulti" onclick="changePaginationPageMulti('prev')" style="padding: 0.5rem 1rem; background: #3e3e42; color: #ffffff; border: none; border-radius: 4px; cursor: pointer; transition: all 0.3s;" onmouseover="this.style.background='#4e4e52'" onmouseout="this.style.background='#3e3e42'">
                                ← Précédent
                            </button>
                            <div id="pageNumbersMulti" style="display: flex; gap: 0.25rem;">
                                <!-- Page numbers will be inserted here -->
                            </div>
                            <button id="nextPageMulti" onclick="changePaginationPageMulti('next')" style="padding: 0.5rem 1rem; background: #3e3e42; color: #ffffff; border: none; border-radius: 4px; cursor: pointer; transition: all 0.3s;" onmouseover="this.style.background='#4e4e52'" onmouseout="this.style.background='#3e3e42'">
                                Suivant →
                            </button>
                        </div>
                    </div>

                    <!-- Empty State -->
                    <div id="emptyStateMulti" class="empty-state" style="display: none;">
                        <svg width="64" height="64" viewBox="0 0 16 16" fill="currentColor" style="opacity: 0.3; margin-bottom: 1rem;">
                            <path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z"/>
                        </svg>
                        <h3>Aucune facture trouvée</h3>
                        <p>Commencez par créer votre première facture</p>
                        <button class="btn-primary" onclick="router.navigate('/create-invoice-multi')" style="margin-top: 1rem;">
                            <span>+ Créer une facture</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Global variables
let allInvoicesMulti = [];
let filteredInvoicesMulti = [];
let currentPageMulti = 1;
let itemsPerPageMulti = 10;

// Load invoices
async function loadInvoicesMulti() {
    const spinner = document.getElementById('loadingSpinnerMulti');
    const tableBody = document.getElementById('invoicesTableBodyMulti');
    const emptyState = document.getElementById('emptyStateMulti');
    
    if (spinner) spinner.style.display = 'flex';
    if (tableBody) tableBody.innerHTML = '';
    
    try {
        const result = await window.electron.dbMulti.getAllInvoices('MULTI');
        
        if (result.success) {
            let invoices = result.data;
            
            // Check if a year was selected from year selector
            const selectedYear = sessionStorage.getItem('multi_current_year');
            if (selectedYear && selectedYear !== '') {
                // Filter invoices by selected year
                invoices = invoices.filter(inv => {
                    const year = inv.year || new Date(inv.document_date).getFullYear();
                    return year.toString() === selectedYear;
                });
                console.log(`📊 [MULTI] Filtered to year ${selectedYear}:`, invoices.length, 'invoices');
                
                // Update the year display button
                const yearDisplay = document.getElementById('currentYearDisplayMulti');
                if (yearDisplay) {
                    yearDisplay.textContent = selectedYear;
                }
            }
            
            allInvoicesMulti = invoices;
            filteredInvoicesMulti = [...allInvoicesMulti];
            
            populateFiltersMulti();
            displayInvoicesMulti();
            
            if (allInvoicesMulti.length === 0 && emptyState) {
                emptyState.style.display = 'flex';
            }
        } else {
            window.notify.error('Erreur', 'Impossible de charger les factures', 3000);
        }
    } catch (error) {
        console.error('[MULTI] Error loading invoices:', error);
        window.notify.error('Erreur', 'Une erreur est survenue lors du chargement', 3000);
    } finally {
        if (spinner) spinner.style.display = 'none';
    }
}

// Populate filters
function populateFiltersMulti() {
    const yearFilter = document.getElementById('filterYearMulti');
    const clientFilter = document.getElementById('filterClientMulti');
    
    if (!yearFilter || !clientFilter) return;
    
    // Get unique years
    const years = [...new Set(allInvoicesMulti.map(inv => new Date(inv.document_date).getFullYear()))].sort((a, b) => b - a);
    yearFilter.innerHTML = '<option value="">Toutes</option>' + years.map(year => `<option value="${year}">${year}</option>`).join('');
    
    // Get unique clients
    const clients = [...new Set(allInvoicesMulti.map(inv => inv.client_nom))].sort();
    clientFilter.innerHTML = '<option value="">Tous</option>' + clients.map(client => `<option value="${client}">${client}</option>`).join('');
}

// Filter invoices
function filterInvoicesMulti() {
    const typeFilter = document.getElementById('filterTypeMulti')?.value || '';
    const yearFilter = document.getElementById('filterYearMulti')?.value || '';
    const monthFilter = document.getElementById('filterMonthMulti')?.value || '';
    const clientFilter = document.getElementById('filterClientMulti')?.value || '';
    const searchType = document.getElementById('searchTypeMulti')?.value || 'all';
    const searchInput = document.getElementById('searchInputMulti')?.value.toLowerCase() || '';
    
    filteredInvoicesMulti = allInvoicesMulti.filter(invoice => {
        const matchType = !typeFilter || invoice.document_type === typeFilter;
        const matchYear = !yearFilter || new Date(invoice.document_date).getFullYear().toString() === yearFilter;
        const matchMonth = !monthFilter || new Date(invoice.document_date).toISOString().slice(5, 7) === monthFilter;
        const matchClient = !clientFilter || invoice.client_nom === clientFilter;
        
        let searchMatch = true;
        if (searchInput) {
            switch(searchType) {
                case 'numero':
                    searchMatch = (invoice.document_numero && invoice.document_numero.toLowerCase().includes(searchInput)) ||
                                  (invoice.document_numero_devis && invoice.document_numero_devis.toLowerCase().includes(searchInput));
                    break;
                case 'order':
                    searchMatch = invoice.document_numero_Order && invoice.document_numero_Order.toLowerCase().includes(searchInput);
                    break;
                case 'client':
                    searchMatch = invoice.client_nom.toLowerCase().includes(searchInput);
                    break;
                case 'ice':
                    searchMatch = invoice.client_ice.toLowerCase().includes(searchInput);
                    break;
                case 'product':
                    searchMatch = invoice.products && invoice.products.some(p => 
                        p.designation && p.designation.toLowerCase().includes(searchInput)
                    );
                    break;
                case 'price':
                    searchMatch = invoice.products && invoice.products.some(p => 
                        p.prix_unitaire_ht && p.prix_unitaire_ht.toString().includes(searchInput)
                    );
                    break;
                case 'total_ht':
                    searchMatch = invoice.total_ht.toString().includes(searchInput);
                    break;
                case 'total':
                    searchMatch = invoice.total_ttc.toString().includes(searchInput);
                    break;
                case 'all':
                default:
                    const productMatchAll = invoice.products && invoice.products.some(p => 
                        (p.designation && p.designation.toLowerCase().includes(searchInput)) ||
                        (p.prix_unitaire_ht && p.prix_unitaire_ht.toString().includes(searchInput))
                    );
                    searchMatch = 
                        (invoice.document_numero && invoice.document_numero.toLowerCase().includes(searchInput)) ||
                        (invoice.document_numero_devis && invoice.document_numero_devis.toLowerCase().includes(searchInput)) ||
                        (invoice.document_numero_Order && invoice.document_numero_Order.toLowerCase().includes(searchInput)) ||
                        invoice.client_nom.toLowerCase().includes(searchInput) ||
                        invoice.client_ice.toLowerCase().includes(searchInput) ||
                        invoice.total_ht.toString().includes(searchInput) ||
                        invoice.total_ttc.toString().includes(searchInput) ||
                        productMatchAll;
                    break;
            }
        }
        
        return matchType && matchYear && matchMonth && matchClient && searchMatch;
    });
    
    displayInvoicesMulti();
}

// Display invoices with pagination
function displayInvoicesMulti() {
    const tableBody = document.getElementById('invoicesTableBodyMulti');
    const emptyState = document.getElementById('emptyStateMulti');
    const resultsCounter = document.getElementById('resultsCounterMulti');
    const resultCount = document.getElementById('resultCountMulti');
    const pagination = document.getElementById('paginationMulti');
    
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    if (filteredInvoicesMulti.length === 0) {
        if (emptyState) emptyState.style.display = 'flex';
        if (resultsCounter) resultsCounter.style.display = 'none';
        if (pagination) pagination.style.display = 'none';
        return;
    }
    
    if (emptyState) emptyState.style.display = 'none';
    if (resultsCounter) resultsCounter.style.display = 'block';
    if (resultCount) resultCount.textContent = filteredInvoicesMulti.length;
    
    // Calculate pagination
    const totalItems = filteredInvoicesMulti.length;
    const totalPages = itemsPerPageMulti === 'all' ? 1 : Math.ceil(totalItems / itemsPerPageMulti);
    
    // Adjust current page if needed
    if (currentPageMulti > totalPages) currentPageMulti = totalPages || 1;
    
    // Get items for current page
    let itemsToDisplay;
    if (itemsPerPageMulti === 'all') {
        itemsToDisplay = filteredInvoicesMulti;
        if (pagination) pagination.style.display = 'none';
    } else {
        const startIndex = (currentPageMulti - 1) * itemsPerPageMulti;
        const endIndex = startIndex + itemsPerPageMulti;
        itemsToDisplay = filteredInvoicesMulti.slice(startIndex, endIndex);
        if (pagination && totalPages > 1) pagination.style.display = 'block';
        else if (pagination) pagination.style.display = 'none';
    }
    
    itemsToDisplay.forEach(invoice => {
        const row = document.createElement('tr');
        
        const docNumber = invoice.document_type === 'facture' ? invoice.document_numero : invoice.document_numero_devis || invoice.document_numero;
        const typeLabel = invoice.document_type === 'facture' ? '📄 Facture' : '📋 Devis';
        const date = new Date(invoice.document_date).toLocaleDateString('fr-FR');
        
        row.innerHTML = `
            <td>
                <input type="checkbox" class="invoice-checkbox-multi" data-invoice-id="${invoice.id}" 
                       style="width: 18px; height: 18px; cursor: pointer;"
                       onchange="updateSelectedCountMulti()">
            </td>
            <td>${invoice.id}</td>
            <td><span class="badge badge-${invoice.document_type}">${typeLabel}</span></td>
            <td>
                <strong>${docNumber || 'N/A'}</strong>
                ${invoice.document_numero_Order ? `<div style="font-size:0.75rem;color:#999;margin-top:0.25rem;">Order: ${invoice.document_numero_Order}</div>` : ''}
            </td>
            <td>${invoice.client_nom}</td>
            <td>${invoice.client_ice}</td>
            <td>${date}</td>
            <td>${invoice.total_ht.toFixed(2)} DH</td>
            <td>${invoice.tva_rate}%</td>
            <td><strong>${invoice.total_ttc.toFixed(2)} DH</strong></td>
            <td>
                <div class="action-buttons">
                    <button class="btn-icon btn-view" onclick="viewInvoiceMulti(${invoice.id})" title="Voir les détails">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                        </svg>
                    </button>
                    <button class="btn-icon btn-edit" onclick="editInvoiceMulti(${invoice.id})" title="Modifier">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                        </svg>
                    </button>
                    <button class="btn-icon btn-download" onclick="downloadInvoicePDFMulti(${invoice.id})" title="Télécharger PDF">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                        </svg>
                    </button>
                    <button class="btn-icon btn-delete" onclick="deleteInvoiceMulti(${invoice.id})" title="Supprimer">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                        </svg>
                    </button>
                </div>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
    
    // Update pagination
    if (itemsPerPageMulti !== 'all' && totalPages > 1) {
        updatePaginationMulti(totalPages);
    }
    
    // Setup select all checkbox
    setupSelectAllMulti();
}

// View invoice details
window.viewInvoiceMulti = async function(id) {
    try {
        const result = await window.electron.dbMulti.getInvoiceById(id);
        
        if (!result.success || !result.data) {
            window.notify.error('Erreur', 'Facture introuvable', 3000);
            return;
        }
        
        const invoice = result.data;
        const date = new Date(invoice.document_date).toLocaleDateString('fr-FR');
        const docNumber = invoice.document_type === 'facture' ? invoice.document_numero : invoice.document_numero_devis || invoice.document_numero;
        const typeLabel = invoice.document_type === 'facture' ? 'Facture' : 'Devis';
        
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
                    <h2 style="color:#fff;margin:0;font-size:1.3rem;font-weight:600;">Détails de la ${typeLabel} #${docNumber}</h2>
                </div>
                <div style="display:flex;align-items:center;gap:1rem;">
                    <button onclick="downloadInvoicePDFMulti(${id})" style="padding:0.6rem 1.2rem;background:#2196F3;color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:0.9rem;font-weight:600;display:flex;align-items:center;gap:0.5rem;transition:all 0.2s;" onmouseover="this.style.background='#1976D2'" onmouseout="this.style.background='#2196F3'">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                        </svg>
                        Télécharger PDF
                    </button>
                    <button onclick="downloadBonDeTravaux(${id})" style="padding:0.6rem 1.2rem;background:#E91E63;color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:0.9rem;font-weight:600;display:flex;align-items:center;gap:0.5rem;transition:all 0.2s;" onmouseover="this.style.background='#C2185B'" onmouseout="this.style.background='#E91E63'">
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
                        ${invoice.document_numero_Order ? `
                        <div style="margin-bottom:0.75rem;">
                            <span style="color:#999;font-size:0.9rem;">N° Order:</span>
                            <div style="color:#fff;font-weight:500;margin-top:0.25rem;">${invoice.document_numero_Order}</div>
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
                                ${invoice.products.map((p, idx) => {
                                    const designation = String(p.designation || '').replace(/</g, '&lt;').replace(/>/g, '&gt;');
                                    return `
                                    <tr style="border-bottom:1px solid #3e3e42;">
                                        <td style="padding:0.75rem;color:#fff;max-width:400px;word-break:break-word;overflow-wrap:break-word;white-space:pre-wrap;">${designation}</td>
                                        <td style="padding:0.75rem;text-align:center;color:#fff;">${p.quantite}</td>
                                        <td style="padding:0.75rem;text-align:right;color:#fff;">${p.prix_unitaire_ht.toFixed(2)} DH</td>
                                        <td style="padding:0.75rem;text-align:right;color:#fff;font-weight:500;">${p.total_ht.toFixed(2)} DH</td>
                                    </tr>
                                `}).join('')}
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
                            <span style="color:#fff;font-weight:600;">${invoice.total_ht.toFixed(2)} DH</span>
                        </div>
                        <div style="display:flex;justify-content:space-between;margin-bottom:0.75rem;">
                            <span style="color:#999;">TVA (${invoice.tva_rate}%):</span>
                            <span style="color:#fff;font-weight:600;">${invoice.montant_tva.toFixed(2)} DH</span>
                        </div>
                        <div style="display:flex;justify-content:space-between;padding-top:0.75rem;border-top:1px solid #3e3e42;">
                            <span style="color:#fff;font-weight:600;">Total TTC:</span>
                            <span style="color:#4CAF50;font-weight:700;font-size:1.1rem;">${invoice.total_ttc.toFixed(2)} DH</span>
                        </div>
                    </div>
                </div>
                
                <!-- Notes Section -->
                <div style="margin-bottom:2rem;" id="notesSectionMulti${id}">
                    <h3 style="color:#fff;font-size:1.1rem;margin:0 0 1rem 0;font-weight:600;">📝 Notes</h3>
                    <div style="background:#1e1e1e;padding:1rem;border-radius:8px;">
                        <div style="color:#999;font-size:0.9rem;font-style:italic;">Chargement...</div>
                    </div>
                </div>
                
                <!-- Attachments Section -->
                <div>
                    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1rem;">
                        <h3 style="color:#fff;font-size:1.1rem;margin:0;font-weight:600;">Pièces jointes</h3>
                        <button onclick="addNewAttachmentMulti(${id})" style="padding:0.5rem 1rem;background:#4CAF50;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:0.85rem;font-weight:600;display:flex;align-items:center;gap:0.5rem;transition:all 0.2s;" onmouseover="this.style.background='#45a049'" onmouseout="this.style.background='#4CAF50'">
                            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                            </svg>
                            Ajouter
                        </button>
                    </div>
                    ${invoice.attachments && invoice.attachments.length > 0 ? `
                        <div style="display:grid;gap:0.75rem;">
                            ${invoice.attachments.map(a => `
                                <div style="background:#1e1e1e;padding:1rem;border-radius:8px;display:flex;align-items:center;justify-content:space-between;">
                                    <div style="display:flex;align-items:center;gap:1rem;flex:1;min-width:0;">
                                        <div style="width:40px;height:40px;background:#2d2d30;border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                                            ${a.file_type.includes('pdf') ? 
                                                '<svg width="20" height="20" viewBox="0 0 16 16" fill="#f44336"><path d="M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5L14 4.5z"/><path d="M1.6 11.85H0v3.999h.791v-1.342h.803c.287 0 .531-.057.732-.173.203-.117.358-.275.463-.474a1.42 1.42 0 0 0 .161-.677c0-.25-.053-.476-.158-.677a1.176 1.176 0 0 0-.46-.477c-.2-.12-.443-.179-.732-.179Zm.545 1.333a.795.795 0 0 1-.085.38.574.574 0 0 1-.238.241.794.794 0 0 1-.375.082H.788V12.48h.66c.218 0 .389.06.512.181.123.122.185.296.185.522Zm1.217-1.333v3.999h1.46c.401 0 .734-.08.998-.237a1.45 1.45 0 0 0 .595-.689c.13-.3.196-.662.196-1.084 0-.42-.065-.778-.196-1.075a1.426 1.426 0 0 0-.589-.68c-.264-.156-.599-.234-1.005-.234H3.362Zm.791.645h.563c.248 0 .45.05.609.152a.89.89 0 0 1 .354.454c.079.201.118.452.118.753a2.3 2.3 0 0 1-.068.592 1.14 1.14 0 0 1-.196.422.8.8 0 0 1-.334.252 1.298 1.298 0 0 1-.483.082h-.563v-2.707Zm3.743 1.763v1.591h-.79V11.85h2.548v.653H7.896v1.117h1.606v.638H7.896Z"/></svg>' :
                                                '<svg width="20" height="20" viewBox="0 0 16 16" fill="#2196F3"><path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/><path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z"/></svg>'
                                            }
                                        </div>
                                        <div style="flex:1;min-width:0;">
                                            <div style="color:#fff;font-weight:500;font-size:0.9rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${a.filename}</div>
                                            <div style="color:#999;font-size:0.8rem;margin-top:0.25rem;">${(a.file_size / 1024).toFixed(1)} KB • ${new Date(a.uploaded_at).toLocaleDateString('fr-FR')}</div>
                                        </div>
                                    </div>
                                    <div style="display:flex;gap:0.5rem;flex-shrink:0;">
                                        <button onclick="openAttachmentMulti(${a.id})" style="padding:0.4rem 0.8rem;background:#2196F3;color:#fff;border:none;border-radius:4px;cursor:pointer;font-size:0.8rem;">
                                            👁️ Ouvrir
                                        </button>
                                        <button onclick="deleteAttachmentMulti(${a.id}, ${id})" style="padding:0.4rem 0.8rem;background:#f44336;color:#fff;border:none;border-radius:4px;cursor:pointer;font-size:0.8rem;display:flex;align-items:center;gap:0.4rem;">
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
        console.log('📝 [NOTES VIEW MULTI] Loading notes for invoice:', id);
        const noteResult = await window.electron.dbMulti.getNote(id);
        console.log('📥 [NOTES VIEW MULTI] Note result:', noteResult);
        const notesSection = document.getElementById(`notesSectionMulti${id}`);
        if (notesSection) {
            const notesContent = notesSection.querySelector('div > div');
            if (noteResult.success && noteResult.data) {
                console.log('✅ [NOTES VIEW MULTI] Displaying note:', noteResult.data);
                notesContent.style.color = '#fff';
                notesContent.style.fontStyle = 'normal';
                notesContent.style.whiteSpace = 'pre-wrap';
                notesContent.textContent = noteResult.data;
            } else {
                console.log('ℹ️ [NOTES VIEW MULTI] No note found');
                notesContent.textContent = 'Aucune note';
            }
        }
        
    } catch (error) {
        console.error('[MULTI] Error viewing invoice:', error);
        window.notify.error('Erreur', 'Impossible d\'afficher la facture', 3000);
    }
}

// Delete invoice
window.deleteInvoiceMulti = async function(id) {
    const confirmed = await customConfirm('Confirmation', 'Êtes-vous sûr de vouloir supprimer cette facture ?', 'warning');
    
    if (!confirmed) return;
    
    try {
        const result = await window.electron.dbMulti.deleteInvoice(id);
        
        if (result.success) {
            window.notify.success('Succès', 'Facture supprimée avec succès', 3000);
            loadInvoicesMulti();
        } else {
            window.notify.error('Erreur', 'Impossible de supprimer la facture', 3000);
        }
    } catch (error) {
        console.error('[MULTI] Error deleting invoice:', error);
        window.notify.error('Erreur', 'Une erreur est survenue', 3000);
    }
}

// Edit invoice
window.editInvoiceMulti = function(id) {
    localStorage.setItem('editInvoiceIdMulti', id);
    router.navigate('/edit-invoice-multi');
}

// Open attachment
window.openAttachmentMulti = async function(attachmentId) {
    try {
        const result = await window.electron.dbMulti.getAttachment(attachmentId);
        
        if (result.success && result.data) {
            const blob = new Blob([result.data.file_data], { type: result.data.file_type });
            const url = URL.createObjectURL(blob);
            window.open(url, '_blank');
        } else {
            throw new Error(result.error || 'Fichier introuvable');
        }
    } catch (error) {
        console.error('❌ Error opening attachment:', error);
        window.notify.error('Erreur', 'Impossible d\'ouvrir le fichier: ' + error.message, 4000);
    }
}

// Delete attachment
window.deleteAttachmentMulti = async function(attachmentId, invoiceId) {
    const confirmed = await customConfirm('Confirmation', 'Êtes-vous sûr de vouloir supprimer ce fichier ?', 'warning');
    if (!confirmed) {
        return;
    }
    
    try {
        const result = await window.electron.dbMulti.deleteAttachment(attachmentId);
        
        if (result.success) {
            window.notify.success('Supprimé', 'Fichier supprimé avec succès', 3000);
            
            // Close modal and reopen to refresh
            const modalToClose = document.querySelector('.invoice-view-overlay');
            if (modalToClose) {
                modalToClose.remove();
            }
            setTimeout(() => viewInvoiceMulti(invoiceId), 300);
        } else {
            throw new Error(result.error);
        }
    } catch (error) {
        console.error('Error deleting attachment:', error);
        window.notify.error('Erreur', 'Impossible de supprimer le fichier', 3000);
    }
}

// Add new attachment
window.addNewAttachmentMulti = async function(invoiceId) {
    // Create file input
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.png,.jpg,.jpeg,.pdf';
    input.multiple = true;
    
    input.onchange = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;
        
        const loadingNotif = window.notify.loading('Téléchargement en cours...', 'Veuillez patienter');
        
        try {
            for (const file of files) {
                // Read file as ArrayBuffer
                const arrayBuffer = await file.arrayBuffer();
                const uint8Array = new Uint8Array(arrayBuffer);
                
                // Add attachment
                const result = await window.electron.dbMulti.addAttachment(
                    invoiceId,
                    file.name,
                    file.type,
                    uint8Array
                );
                
                if (result.success) {
                    console.log('✅ Attachment uploaded:', file.name);
                } else {
                    throw new Error(result.error);
                }
            }
            
            window.notify.remove(loadingNotif);
            window.notify.success('Succès', `${files.length} fichier(s) ajouté(s) avec succès`, 3000);
            
            // Close modal and reopen to refresh
            const modalToClose = document.querySelector('.invoice-view-overlay');
            if (modalToClose) {
                modalToClose.remove();
            }
            setTimeout(() => viewInvoiceMulti(invoiceId), 300);
            
        } catch (error) {
            window.notify.remove(loadingNotif);
            console.error('Error uploading attachments:', error);
            window.notify.error('Erreur', 'Erreur lors du téléchargement: ' + error.message, 4000);
        }
    };
    
    input.click();
}

// Download Bon de travaux as PDF (without prices) - MULTI TRAVAUX TETOUAN Design
window.downloadBonDeTravaux = async function(invoiceId) {
    try {
        console.log('📥 Generating Bon de travaux PDF for invoice:', invoiceId);
        
        // Get invoice data
        const result = await window.electron.dbMulti.getInvoiceById(invoiceId);
        
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
                            <button id="excludeZeroBtnBonTravaux" class="custom-modal-btn secondary">
                                ❌ Non, masquer
                            </button>
                            <button id="includeZeroBtnBonTravaux" class="custom-modal-btn primary">
                                ✅ Oui, afficher
                            </button>
                        </div>
                    </div>
                `;
                
                document.body.appendChild(overlay);
                
                const excludeBtn = document.getElementById('excludeZeroBtnBonTravaux');
                const includeBtn = document.getElementById('includeZeroBtnBonTravaux');
                
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
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
            script.onload = () => window.downloadBonDeTravaux(invoiceId);
            document.head.appendChild(script);
            return;
        }
        
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        // Colors - MULTI TRAVAUX TETOUAN theme
        const darkGrayColor = [96, 125, 139]; // #607D8B
        const lightGrayBg = [236, 239, 241]; // #ECEFF1
        
        const dateStr = new Date(invoice.document_date).toLocaleDateString('fr-FR');
        
        // Function to add header
        const addHeader = (isFirstPage = true) => {
            // Company Name - Left aligned, large
            doc.setFontSize(18);
            doc.setTextColor(96, 125, 139);
            doc.setFont(undefined, 'bold');
            doc.text('MULTI TRAVAUX TETOUAN', 15, 18);
            
            // Document Type - Right aligned, underlined
            doc.setFontSize(18);
            doc.setFont(undefined, 'bold');
            doc.text('BON DE TRAVAUX', 195, 18, { align: 'right' });
            doc.setLineWidth(0.5);
            doc.line(195 - doc.getTextWidth('BON DE TRAVAUX'), 19, 195, 19);
            
            // Date - Right side
            doc.setFontSize(9);
            doc.setFont(undefined, 'normal');
            doc.setTextColor(0, 0, 0);
            doc.text(`Date : ${dateStr}`, 195, 26, { align: 'right' });
            
            // Email and Address - Left side with gray background
            doc.setFillColor(...darkGrayColor);
            doc.rect(15, 38, 80, 6, 'F');
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(8);
            doc.text('Email: multitravauxtetouan@gmail.com', 17, 42);
            
            doc.setFillColor(...lightGrayBg);
            doc.rect(15, 44, 80, 6, 'F');
            doc.setTextColor(0, 0, 0);
            doc.setFontSize(7);
            doc.text('AV 10 MAI IMM 04 APPART 01 A DROIT - TETOUAN , TETOUAN', 17, 48);
            
            // Client Info - Right side with gray background
            doc.setFillColor(...darkGrayColor);
            doc.rect(115, 38, 80, 6, 'F');
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(8);
            doc.text(`BON DE TRAVAUX à : ${invoice.client_nom}`, 117, 42);
            
            doc.setFillColor(...lightGrayBg);
            doc.rect(115, 44, 80, 6, 'F');
            doc.setTextColor(0, 0, 0);
            doc.setFontSize(7);
            doc.text(`ICE : ${invoice.client_ice}`, 117, 48);
        };
        
        // Function to add footer
        const addFooter = (pageNum, totalPages) => {
            // Company info at bottom
            doc.setTextColor(0, 0, 0);
            doc.setFontSize(9);
            doc.setFont(undefined, 'normal');
            doc.text('NIF 68717422 | TP 51001343 | RC 38633 | CNSS 6446237', 105, 280, { align: 'center' });
            doc.text('ICE : 00380950500031', 105, 286, { align: 'center' });
            
            // Add page numbering at bottom in gray
            doc.setTextColor(150, 150, 150); // Gray color
            doc.setFontSize(9);
            doc.setFont(undefined, 'normal');
            doc.text(`Page ${pageNum} / ${totalPages}`, 105, 292, { align: 'center' });
        };
        
        // Add header to first page
        addHeader(true);
        
        const startY = 60;
        
        // Helper function to format numbers
        const formatNumberForPDF = (num) => {
            return parseFloat(num).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
        };
        
        // Table Header - Gray background (4 columns - same as invoice)
        doc.setFillColor(...darkGrayColor);
        doc.rect(15, startY, 180, 7, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(9);
        doc.setFont(undefined, 'bold');
        doc.text('Description', 18, startY + 5);
        doc.text('Quantité', 115, startY + 5, { align: 'center' });
        doc.text('Prix unitaire HT', 150, startY + 5, { align: 'right' });
        doc.text('Prix total HT', 188, startY + 5, { align: 'right' });
        
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
            
            // Check if we need a new page
            if (currentY + rowHeight > 220) {
                pages.push(pageCount);
                doc.addPage();
                addHeader(false);
                pageCount++;
                
                let newStartY = 60;
                doc.setFillColor(...darkGrayColor);
                doc.rect(15, newStartY, 180, 7, 'F');
                doc.setTextColor(255, 255, 255);
                doc.setFontSize(9);
                doc.setFont(undefined, 'bold');
                doc.text('Description', 18, newStartY + 5);
                doc.text('Quantité', 115, newStartY + 5, { align: 'center' });
                doc.text('Prix unitaire HT', 150, newStartY + 5, { align: 'right' });
                doc.text('Prix total HT', 188, newStartY + 5, { align: 'right' });
                
                currentY = newStartY + 10;
                doc.setTextColor(0, 0, 0);
                doc.setFont(undefined, 'normal');
                doc.setFontSize(9);
            }
            
            // Alternate row colors
            if (index % 2 === 0) {
                doc.setFillColor(245, 245, 245);
                doc.rect(15, currentY - 3, 180, rowHeight, 'F');
            }
            
            doc.setFontSize(7.5);
            lines.forEach((line, lineIndex) => {
                doc.text(line, 18, currentY + 3 + (lineIndex * 4.5));
            });
            
            const centerOffset = (lines.length > 1) ? ((lines.length - 1) * 2.25) : 0;
            
            doc.setFontSize(8);
            // Show quantity only if it's not zero OR if user chose to show zero values
            const qty = parseFloat(product.quantite);
            if (showZeroValues || qty !== 0) {
                doc.text(String(product.quantite || ''), 115, currentY + 3 + centerOffset, { align: 'center' });
            }
            
            doc.setFontSize(7.5);
            // Show price only if it's not zero OR if user chose to show zero values
            const price = parseFloat(product.prix_unitaire_ht);
            if (showZeroValues || price !== 0) {
                doc.text(`${formatNumberForPDF(product.prix_unitaire_ht)} DH`, 150, currentY + 3 + centerOffset, { align: 'right' });
            }
            
            // Show total only if it's not zero OR if user chose to show zero values
            const total = parseFloat(product.total_ht);
            if (showZeroValues || total !== 0) {
                doc.text(`${formatNumberForPDF(product.total_ht)} DH`, 188, currentY + 3 + centerOffset, { align: 'right' });
            }
            
            currentY += rowHeight;
        });
        
        // Fixed position for Remarques and Totals (always at same Y position)
        const fixedBottomY = 235;
        
        // Remarques section - Left side
        doc.setFillColor(...darkGrayColor);
        doc.rect(15, fixedBottomY, 85, 6, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(8);
        doc.setFont(undefined, 'bold');
        doc.text('Remarques et instructions de paiement :', 17, fixedBottomY + 4);
        
        doc.setFillColor(255, 255, 255);
        doc.rect(15, fixedBottomY + 6, 85, 12, 'F');
        doc.setDrawColor(200, 200, 200);
        doc.setLineWidth(0.1);
        doc.rect(15, fixedBottomY + 6, 85, 12);
        doc.setTextColor(0, 0, 0);
        doc.setFont(undefined, 'normal');
        doc.setFontSize(8);
        doc.text('ATTIJARI WAFA BANQ', 17, fixedBottomY + 10);
        doc.text('RIB : 007 720 0005979000000953 03', 17, fixedBottomY + 15);
        
        // Totals - Right side with gray background (same Y position)
        doc.setFillColor(...darkGrayColor);
        doc.rect(110, fixedBottomY, 85, 6, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(9);
        doc.setFont(undefined, 'bold');
        doc.text('TOTALE HT', 113, fixedBottomY + 4);
        doc.text(`${formatNumberForPDF(invoice.total_ht)} DH`, 192, fixedBottomY + 4, { align: 'right' });
        
        doc.setFillColor(255, 255, 255);
        doc.rect(110, fixedBottomY + 6, 85, 6, 'F');
        doc.setDrawColor(200, 200, 200);
        doc.rect(110, fixedBottomY + 6, 85, 6);
        doc.setTextColor(0, 0, 0);
        doc.text(`TVA ${invoice.tva_rate}%`, 113, fixedBottomY + 10);
        doc.text(`${formatNumberForPDF(invoice.montant_tva)} DH`, 192, fixedBottomY + 10, { align: 'right' });
        
        doc.setFillColor(...darkGrayColor);
        doc.rect(110, fixedBottomY + 12, 85, 6, 'F');
        doc.setTextColor(255, 255, 255);
        doc.text('TOTALE TTC', 113, fixedBottomY + 16);
        doc.text(`${formatNumberForPDF(invoice.total_ttc)} DH`, 192, fixedBottomY + 16, { align: 'right' });
        
        // Add page numbering to all pages
        pages.push(pageCount);
        const totalPages = pages.length;
        
        for (let i = 0; i < totalPages; i++) {
            doc.setPage(i + 1);
            addFooter(i + 1, totalPages);
        }
        
        // Save PDF
        const docNumero = invoice.document_numero || invoice.document_numero_devis || 'N';
        const filename = `Bon_de_travaux_${docNumero}_${invoice.client_nom}.pdf`;
        doc.save(filename);
        
        window.notify.success('Succès', 'Bon de travaux téléchargé avec succès', 3000);
        
    } catch (error) {
        console.error('❌ Error generating Bon de travaux PDF:', error);
        window.notify.error('Erreur', 'Impossible de générer le PDF: ' + error.message, 4000);
    }
}

// Download invoice as PDF - MULTI TRAVAUX TETOUAN Design
window.downloadInvoicePDFMulti = async function(invoiceId) {
    try {
        console.log('📥 Generating PDF for invoice:', invoiceId);
        
        // Get invoice data
        const result = await window.electron.dbMulti.getInvoiceById(invoiceId);
        console.log('📋 Invoice data:', result.data);
        console.log('📋 document_numero_Order:', result.data?.document_numero_Order);
        
        if (!result.success || !result.data) {
            throw new Error('Facture introuvable');
        }
        
        const invoice = result.data;
        
        // Check if jsPDF is loaded
        if (typeof window.jspdf === 'undefined') {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
            script.onload = () => window.downloadInvoicePDFMulti(invoiceId);
            document.head.appendChild(script);
            return;
        }
        
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        // Colors - New design
        const darkGrayColor = [96, 125, 139]; // #607D8B
        const lightGrayBg = [236, 239, 241]; // #ECEFF1
        
        const dateStr = new Date(invoice.document_date).toLocaleDateString('fr-FR');
        
        // Helper function to format numbers
        const formatNumberForPDF = (num) => {
            return parseFloat(num).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
        };
        
        // Function to add header to any page
        const addHeader = (isFirstPage = true) => {
            // Company Name - Left aligned, large
            doc.setFontSize(18);
            doc.setTextColor(96, 125, 139);
            doc.setFont(undefined, 'bold');
            doc.text('MULTI TRAVAUX TETOUAN', 15, 18);
            
            // Document Type - Right aligned, underlined
            doc.setFontSize(18);
            doc.setFont(undefined, 'bold');
            const docType = invoice.document_type === 'devis' ? 'DEVIS' : 'FACTURE';
            doc.text(docType, 195, 18, { align: 'right' });
            doc.setLineWidth(0.5);
            doc.line(195 - doc.getTextWidth(docType), 19, 195, 19);
            
            // Document Number and Date - Right side, smaller
            doc.setFontSize(9);
            doc.setFont(undefined, 'normal');
            doc.setTextColor(0, 0, 0);
            if (invoice.document_type === 'devis') {
                doc.text(`Numéro de devis : ${invoice.document_numero_devis || '-'}`, 195, 26, { align: 'right' });
                doc.text(`Date de devis : ${dateStr}`, 195, 31, { align: 'right' });
            } else {
                doc.text(`Numéro de facture : ${invoice.document_numero || '-'}`, 195, 26, { align: 'right' });
                
                // Add Order number on new line below invoice number if exists
                if (invoice.document_numero_Order && invoice.document_numero_Order.trim() !== '') {
                    doc.text(`N° Order : ${invoice.document_numero_Order}`, 195, 31, { align: 'right' });
                    doc.text(`Date de facture : ${dateStr}`, 195, 36, { align: 'right' });
                } else {
                    doc.text(`Date de facture : ${dateStr}`, 195, 31, { align: 'right' });
                }
                
                // DEBUG: Log to verify Order number
                if (invoice.document_numero_Order) {
                    console.log('✅ Order number exists in PDF generation:', invoice.document_numero_Order);
                } else {
                    console.log('❌ Order number is missing or null');
                }
            }
            
            // Email and Address - Left side with gray background (ONE BOX)
            doc.setFillColor(...darkGrayColor);
            doc.rect(15, 38, 80, 6, 'F');
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(8);
            doc.text('Email: multitravauxtetouan@gmail.com', 17, 42);
            
            doc.setFillColor(...lightGrayBg);
            doc.rect(15, 44, 80, 6, 'F');
            doc.setTextColor(0, 0, 0);
            doc.setFontSize(7);
            doc.text('AV 10 MAI IMM 04 APPART 01 A DROIT - TETOUAN , TETOUAN', 17, 48);
            
            // Client Info - Right side with gray background (ONE BOX)
            doc.setFillColor(...darkGrayColor);
            doc.rect(115, 38, 80, 6, 'F');
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(8);
            const devisLabel = invoice.document_type === 'devis' ? 'DEVIS à :' : 'FACTURE à :';
            doc.text(`${devisLabel} ${invoice.client_nom}`, 117, 42);
            
            doc.setFillColor(...lightGrayBg);
            doc.rect(115, 44, 80, 6, 'F');
            doc.setTextColor(0, 0, 0);
            doc.setFontSize(7);
            doc.text(`ICE : ${invoice.client_ice}`, 117, 48);
        };
        
        // Function to add footer to any page
        const addFooter = (pageNum, totalPages) => {
            doc.setTextColor(0, 0, 0);
            doc.setFontSize(9);
            doc.setFont(undefined, 'normal');
            doc.text('NIF 68717422 | TP 51001343 | RC 38633 | CNSS 6446237', 105, 280, { align: 'center' });
            doc.text('ICE : 00380950500031', 105, 286, { align: 'center' });
        };
        
        // Add header to first page
        addHeader(true);
        
        // Products Table
        const startY = 60;
        
        // Table Header - Gray background
        doc.setFillColor(...darkGrayColor);
        doc.rect(15, startY, 180, 7, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(9);
        doc.setFont(undefined, 'bold');
        doc.text('Description', 18, startY + 5);
        doc.text('Quantité', 115, startY + 5, { align: 'center' });
        doc.text('Prix unitaire HT', 150, startY + 5, { align: 'right' });
        doc.text('Prix total HT', 188, startY + 5, { align: 'right' });
        
        // Table Body
        let currentY = startY + 10;
        doc.setTextColor(0, 0, 0);
        doc.setFont(undefined, 'normal');
        doc.setFontSize(9);
        
        let pageCount = 1;
        const pages = [];
        
        invoice.products.forEach((product, index) => {
            // Wrap long text - limit width to 75 for description column only
            const designation = product.designation || '';
            const lines = doc.splitTextToSize(designation, 75);
            
            // Calculate row height based on text lines - more space per line
            const rowHeight = Math.max(8, (lines.length * 4.5) + 4);
            
            // Check if we need a new page BEFORE drawing
            if (currentY + rowHeight > 220) {
                pages.push(pageCount);
                doc.addPage();
                addHeader(false);
                pageCount++;
                
                // Re-draw table header on new page
                let newStartY = 60;
                
                doc.setFillColor(...darkGrayColor);
                doc.rect(15, newStartY, 180, 7, 'F');
                doc.setTextColor(255, 255, 255);
                doc.setFontSize(9);
                doc.setFont(undefined, 'bold');
                doc.text('Description', 18, newStartY + 5);
                doc.text('Quantité', 115, newStartY + 5, { align: 'center' });
                doc.text('Prix unitaire HT', 150, newStartY + 5, { align: 'right' });
                doc.text('Prix total HT', 188, newStartY + 5, { align: 'right' });
                
                currentY = newStartY + 10;
                doc.setTextColor(0, 0, 0);
                doc.setFont(undefined, 'normal');
                doc.setFontSize(9);
            }
            
            // Alternate row colors
            if (index % 2 === 0) {
                doc.setFillColor(245, 245, 245);
                doc.rect(15, currentY - 3, 180, rowHeight, 'F');
            }
            
            doc.setFontSize(7.5);
            // Draw each line separately with proper spacing - show full text
            lines.forEach((line, lineIndex) => {
                doc.text(line, 18, currentY + 3 + (lineIndex * 4.5));
            });
            
            // Center vertically for multi-line products
            const centerOffset = (lines.length > 1) ? ((lines.length - 1) * 2.25) : 0;
            
            doc.setFontSize(8);
            doc.text(String(product.quantite || ''), 115, currentY + 3 + centerOffset, { align: 'center' });
            
            // Use smaller font for large numbers
            doc.setFontSize(7.5);
            doc.text(`${formatNumberForPDF(product.prix_unitaire_ht)} DH`, 150, currentY + 3 + centerOffset, { align: 'right' });
            doc.text(`${formatNumberForPDF(product.total_ht)} DH`, 188, currentY + 3 + centerOffset, { align: 'right' });
            
            currentY += rowHeight;
        });
        
        // Fixed position for Remarques and Totals (always at same Y position)
        const fixedBottomY = 235;
        
        // Remarques section - Left side
        doc.setFillColor(...darkGrayColor);
        doc.rect(15, fixedBottomY, 85, 6, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(8);
        doc.setFont(undefined, 'bold');
        doc.text('Remarques et instructions de paiement :', 17, fixedBottomY + 4);
        
        doc.setFillColor(255, 255, 255);
        doc.rect(15, fixedBottomY + 6, 85, 12, 'F');
        doc.setDrawColor(200, 200, 200);
        doc.setLineWidth(0.1);
        doc.rect(15, fixedBottomY + 6, 85, 12);
        doc.setTextColor(0, 0, 0);
        doc.setFont(undefined, 'normal');
        doc.setFontSize(8);
        doc.text('ATTIJARI WAFA BANQ', 17, fixedBottomY + 10);
        doc.text('RIB : 007 720 0005979000000953 03', 17, fixedBottomY + 15);
        
        // Totals - Right side with gray background (same Y position)
        doc.setFillColor(...darkGrayColor);
        doc.rect(110, fixedBottomY, 85, 6, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(9);
        doc.setFont(undefined, 'bold');
        doc.text('TOTALE HT', 113, fixedBottomY + 4);
        doc.text(`${formatNumberForPDF(invoice.total_ht)} DH`, 192, fixedBottomY + 4, { align: 'right' });
        
        doc.setFillColor(255, 255, 255);
        doc.rect(110, fixedBottomY + 6, 85, 6, 'F');
        doc.setDrawColor(200, 200, 200);
        doc.rect(110, fixedBottomY + 6, 85, 6);
        doc.setTextColor(0, 0, 0);
        doc.text(`TVA ${invoice.tva_rate}%`, 113, fixedBottomY + 10);
        doc.text(`${formatNumberForPDF(invoice.montant_tva)} DH`, 192, fixedBottomY + 10, { align: 'right' });
        
        doc.setFillColor(...darkGrayColor);
        doc.rect(110, fixedBottomY + 12, 85, 6, 'F');
        doc.setTextColor(255, 255, 255);
        doc.text('TOTALE TTC', 113, fixedBottomY + 16);
        doc.text(`${formatNumberForPDF(invoice.total_ttc)} DH`, 192, fixedBottomY + 16, { align: 'right' });
        
        // Add page numbering to all pages
        pages.push(pageCount);
        const totalPages = pages.length;
        
        for (let i = 0; i < totalPages; i++) {
            doc.setPage(i + 1);
            addFooter(i + 1, totalPages);
        }
        
        // Save PDF
        const docNumero = invoice.document_numero || invoice.document_numero_devis || 'N';
        const filename = `${invoice.document_type === 'devis' ? 'Devis' : 'Facture'}_${docNumero}_${invoice.client_nom}.pdf`;
        doc.save(filename);
        
        window.notify.success('Succès', 'PDF téléchargé avec succès', 3000);
        
    } catch (error) {
        console.error('❌ Error generating PDF:', error);
        window.notify.error('Erreur', 'Impossible de générer le PDF: ' + error.message, 4000);
    }
}

// Initialize page
window.initInvoicesListMultiPage = function() {
    console.log('🔄 [MULTI] Initializing invoices list page...');
    
    // Get selected year from session or localStorage
    const sessionYear = sessionStorage.getItem('multi_current_year');
    const savedYear = localStorage.getItem('multi_selected_year');
    const rememberYear = localStorage.getItem('multi_remember_year');
    
    // Use session year first, then saved year if remember is enabled
    let selectedYear = '';
    if (sessionYear) {
        selectedYear = sessionYear;
    } else if (rememberYear === 'true' && savedYear) {
        selectedYear = savedYear;
    }
    
    // Update year display button
    setTimeout(() => {
        const yearDisplay = document.getElementById('currentYearDisplayMulti');
        if (yearDisplay) {
            yearDisplay.textContent = selectedYear ? `Année ${selectedYear}` : 'Toutes';
        }
    }, 100);
    
    loadInvoicesMulti();
};

// Change year - clear saved preference and go to year selector
window.changeYearMulti = function() {
    // Clear both session and local storage to force showing the selection modal
    sessionStorage.removeItem('multi_current_year');
    localStorage.removeItem('multi_remember_year');
    localStorage.removeItem('multi_selected_year');
    // Navigate to year selector
    router.navigate('/year-selector-multi');
};

// Sort table by column
let currentSortColumnMulti = null;
let currentSortDirectionMulti = 'asc';

window.sortTableMulti = function(column) {
    console.log('🔄 [MULTI SORT] Sorting by:', column);
    
    // Toggle sort direction if clicking same column
    if (currentSortColumnMulti === column) {
        currentSortDirectionMulti = currentSortDirectionMulti === 'asc' ? 'desc' : 'asc';
    } else {
        currentSortColumnMulti = column;
        currentSortDirectionMulti = 'asc';
    }
    
    // Update sort icons
    ['Numero', 'Date', 'HT', 'TTC'].forEach(col => {
        const icon = document.getElementById(`sortIcon${col}`);
        if (icon) icon.textContent = '⇅';
    });
    
    const iconMap = {
        'numero': 'Numero',
        'date': 'Date',
        'total_ht': 'HT',
        'total_ttc': 'TTC'
    };
    
    const currentIcon = document.getElementById(`sortIcon${iconMap[column]}`);
    if (currentIcon) {
        currentIcon.textContent = currentSortDirectionMulti === 'asc' ? '↑' : '↓';
    }
    
    // Sort the filtered invoices
    filteredInvoicesMulti.sort((a, b) => {
        let valueA, valueB;
        
        switch(column) {
            case 'numero':
                // Extract number from document_numero or document_numero_devis
                valueA = parseInt((a.document_numero || a.document_numero_devis || '0').replace(/\D/g, '')) || 0;
                valueB = parseInt((b.document_numero || b.document_numero_devis || '0').replace(/\D/g, '')) || 0;
                break;
            case 'date':
                valueA = new Date(a.document_date).getTime();
                valueB = new Date(b.document_date).getTime();
                break;
            case 'total_ht':
                valueA = parseFloat(a.total_ht) || 0;
                valueB = parseFloat(b.total_ht) || 0;
                break;
            case 'total_ttc':
                valueA = parseFloat(a.total_ttc) || 0;
                valueB = parseFloat(b.total_ttc) || 0;
                break;
            default:
                return 0;
        }
        
        if (currentSortDirectionMulti === 'asc') {
            return valueA - valueB;
        } else {
            return valueB - valueA;
        }
    });
    
    // Reset to first page and display
    currentPageMulti = 1;
    displayInvoicesMulti();
    
    console.log('✅ [MULTI SORT] Sorted successfully:', column, currentSortDirectionMulti);
};
