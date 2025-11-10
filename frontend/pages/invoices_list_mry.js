// MRY Invoices List Page
function InvoicesListMRYPage() {
    return `
        <div class="desktop-app">
            <div class="window-header">
                <div class="window-title">
                    <img src="assets/logos/mry.png" class="header-logo" alt="MRY Company" data-asset="assets/logos/mry.png">
                    <span>Liste des Factures - MRY TRAV SARL (AU)</span>
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
                            <button id="changeYearBtnMRY" onclick="router.navigate('/year-selector-mry')" style="background: #2d2d30; color: white; padding: 0.75rem 1.5rem; border: 2px solid #667eea; border-radius: 6px; cursor: pointer; font-weight: 600; display: flex; align-items: center; gap: 0.5rem; transition: all 0.3s; margin-right: 1rem;" onmouseover="this.style.background='#3e3e42'" onmouseout="this.style.background='#2d2d30'">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                                </svg>
                                <span id="currentYearDisplayMRY">Toutes</span>
                            </button>
                            <button class="btn-situation" onclick="showSituationMensuelleModalMRY()" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 0.75rem 1.5rem; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; display: flex; align-items: center; gap: 0.5rem; transition: all 0.3s;" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 12px rgba(102, 126, 234, 0.5)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'">
                                📊 Situation Mensuelle
                            </button>
                            <button class="btn-primary" onclick="router.navigate('/create-invoice-mry')">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style="margin-right: 0.5rem;">
                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                </svg>
                                <span>Nouvelle Facture</span>
                            </button>
                            <button class="btn-secondary" onclick="router.navigate('/dashboard-mry')">
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
                            <select id="filterType" onchange="filterInvoices()">
                                <option value="">Tous</option>
                                <option value="facture">Factures</option>
                                <option value="devis">Devis</option>
                            </select>
                        </div>
                        
                        <div class="filter-group">
                            <label>📅 Année:</label>
                            <select id="filterYear" onchange="filterInvoices()">
                                <option value="">Toutes</option>
                            </select>
                        </div>
                        
                        <div class="filter-group">
                            <label>📆 Mois:</label>
                            <select id="filterMonth" onchange="filterInvoices()">
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
                            <select id="filterClient" onchange="filterInvoices()">
                                <option value="">Tous</option>
                            </select>
                        </div>
                        
                        <div class="filter-group" style="grid-column: 1 / -1;">
                            <label>🔍 Recherche avancée:</label>
                            <div style="display: grid; grid-template-columns: 200px 1fr; gap: 0.5rem;">
                                <select id="searchType" onchange="filterInvoices()" style="padding: 0.75rem; background: #1e1e1e; border: 1px solid #3e3e42; border-radius: 4px; color: #ffffff; font-size: 0.95rem;">
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
                                <input type="text" id="searchInput" placeholder="Tapez votre recherche..." onkeyup="filterInvoices()" style="width: 100%; padding: 0.75rem; background: #1e1e1e; border: 1px solid #3e3e42; border-radius: 4px; color: #ffffff; font-size: 0.95rem;">
                            </div>
                        </div>
                        
                        <div class="filter-group">
                            <button class="btn-refresh" onclick="loadInvoices()" style="margin-top: 1.5rem;">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style="margin-right: 0.5rem;">
                                    <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
                                    <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
                                </svg>
                                <span>Actualiser</span>
                            </button>
                        </div>
                    </div>

                    <!-- Loading -->
                    <div id="loadingSpinner" class="loading-spinner" style="display: none;">
                        <div class="spinner"></div>
                        <p>Chargement des données...</p>
                    </div>

                    <!-- Results Counter & Bulk Actions -->
                    <div style="display: flex; gap: 1rem; align-items: center; margin-bottom: 1rem;">
                        <div id="resultsCounter" style="flex: 1; padding: 0.75rem 1rem; background: #2d2d30; border: 1px solid #3e3e42; border-radius: 6px; color: #cccccc; font-size: 0.95rem; display: none;">
                            <strong>📊 Résultats:</strong> <span id="resultCount">0</span> facture(s) trouvée(s)
                        </div>
                        <div style="display: flex; gap: 0.5rem; align-items: center;">
                            <label style="color: #cccccc; font-size: 0.9rem;">Afficher:</label>
                            <select id="itemsPerPage" onchange="changeItemsPerPage()" style="padding: 0.5rem; background: #2d2d30; border: 1px solid #3e3e42; border-radius: 4px; color: #ffffff; cursor: pointer;">
                                <option value="10">10</option>
                                <option value="20">20</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                                <option value="all">Tout</option>
                            </select>
                        </div>
                        <button id="bulkDownloadBtn" onclick="showBulkDownloadModal()" 
                                style="display: none; padding: 0.75rem 1.5rem; background: #2196f3; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 0.95rem; transition: all 0.3s;"
                                onmouseover="this.style.background='#1976d2'" onmouseout="this.style.background='#2196f3'">
                            📥 Télécharger (<span id="selectedCount">0</span>)
                        </button>
                        <button id="bulkDeleteBtnMRY" onclick="handleBulkDeleteMRY()" 
                                style="display: none; padding: 0.75rem 1.5rem; background: #f44336; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 0.95rem; transition: all 0.3s; align-items: center; gap: 0.5rem;"
                                onmouseover="this.style.background='#d32f2f'" onmouseout="this.style.background='#f44336'">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                            </svg>
                            Supprimer (<span id="selectedDeleteCount">0</span>)
                        </button>
                    </div>

                    <!-- Invoices Table -->
                    <div class="table-container">
                        <table class="invoices-table">
                            <thead>
                                <tr>
                                    <th>
                                        <input type="checkbox" id="selectAllInvoices" 
                                               style="width: 18px; height: 18px; cursor: pointer;"
                                               title="Sélectionner tout">
                                    </th>
                                    <th>ID</th>
                                    <th>Type</th>
                                    <th onclick="sortTableMry('numero')" style="cursor: pointer; user-select: none;" title="Cliquez pour trier">
                                        N° Document <span id="sortIconNumeroMry">⇅</span>
                                    </th>
                                    <th>Client</th>
                                    <th>ICE</th>
                                    <th onclick="sortTableMry('date')" style="cursor: pointer; user-select: none;" title="Cliquez pour trier">
                                        Date <span id="sortIconDateMry">⇅</span>
                                    </th>
                                    <th onclick="sortTableMry('total_ht')" style="cursor: pointer; user-select: none;" title="Cliquez pour trier">
                                        Total HT <span id="sortIconTotalHTMry">⇅</span>
                                    </th>
                                    <th>TVA</th>
                                    <th onclick="sortTableMry('total_ttc')" style="cursor: pointer; user-select: none;" title="Cliquez pour trier">
                                        Total TTC <span id="sortIconTotalTTCMry">⇅</span>
                                    </th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody id="invoicesTableBody">
                                <!-- Invoices will be loaded here -->
                            </tbody>
                        </table>
                    </div>

                    <!-- Pagination -->
                    <div id="pagination" style="display: none; margin-top: 1.5rem; padding: 1rem; background: #2d2d30; border: 1px solid #3e3e42; border-radius: 6px;">
                        <div style="display: flex; justify-content: center; align-items: center; gap: 0.5rem;">
                            <button id="prevPage" onclick="changePaginationPage('prev')" style="padding: 0.5rem 1rem; background: #3e3e42; color: #ffffff; border: none; border-radius: 4px; cursor: pointer; transition: all 0.3s;" onmouseover="this.style.background='#4e4e52'" onmouseout="this.style.background='#3e3e42'">
                                ← Précédent
                            </button>
                            <div id="pageNumbers" style="display: flex; gap: 0.25rem;">
                                <!-- Page numbers will be inserted here -->
                            </div>
                            <button id="nextPage" onclick="changePaginationPage('next')" style="padding: 0.5rem 1rem; background: #3e3e42; color: #ffffff; border: none; border-radius: 4px; cursor: pointer; transition: all 0.3s;" onmouseover="this.style.background='#4e4e52'" onmouseout="this.style.background='#3e3e42'">
                                Suivant →
                            </button>
                        </div>
                    </div>

                    <!-- Empty State -->
                    <div id="emptyState" class="empty-state" style="display: none;">
                        <div class="empty-icon">📄</div>
                        <h3>Aucune facture trouvée</h3>
                        <p>Commencez par créer votre première facture</p>
                        <button class="btn-primary" onclick="router.navigate('/create-invoice-mry')">
                            <span>➕ Créer une facture</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Store all invoices
let allInvoices = [];
let filteredInvoices = [];
let currentPage = 1;
let itemsPerPage = 10;

// Format number for display with proper formatting
function formatNumber(number) {
    const num = parseFloat(number) || 0;
    return num.toLocaleString('fr-FR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

// Load invoices from database
window.loadInvoices = async function() {
    console.log('🔄 [LOAD] Starting to load invoices from database...');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const tableBody = document.getElementById('invoicesTableBody');
    const emptyState = document.getElementById('emptyState');
    
    if (!loadingSpinner || !tableBody || !emptyState) {
        console.error('❌ Required elements not found in DOM');
        return;
    }
    
    try {
        // Show loading
        loadingSpinner.style.display = 'flex';
        tableBody.innerHTML = '';
        emptyState.style.display = 'none';
        
        // Get invoices from database
        const result = await window.electron.db.getAllInvoices('MRY');
        
        console.log('📥 [LOAD] Received from database:', result.success ? `${result.data.length} invoices` : 'Failed');
        
        if (result.success) {
            let invoices = result.data;
            
            // Check if a year was selected from year selector
            const selectedYear = sessionStorage.getItem('mry_current_year');
            if (selectedYear && selectedYear !== '') {
                // Filter invoices by selected year
                invoices = invoices.filter(inv => {
                    const year = inv.year || new Date(inv.document_date).getFullYear();
                    return year.toString() === selectedYear;
                });
                console.log(`📊 [LOAD] Filtered to year ${selectedYear}:`, invoices.length, 'invoices');
                
                // Update the year display button
                const yearDisplay = document.getElementById('currentYearDisplayMRY');
                if (yearDisplay) {
                    yearDisplay.textContent = selectedYear;
                }
            }
            
            allInvoices = invoices;
            console.log('✅ [LOAD] All invoices stored in memory:', allInvoices.length);
            
            // Log first 3 invoices for debugging
            if (allInvoices.length > 0) {
                console.log('📋 [LOAD] Sample invoices:', allInvoices.slice(0, 3).map(inv => ({
                    id: inv.id,
                    type: inv.document_type,
                    numero: inv.document_numero,
                    numero_devis: inv.document_numero_devis
                })));
            }
            
            // Populate filters
            populateFilters();
            
            // Hide loading
            loadingSpinner.style.display = 'none';
            
            if (allInvoices.length === 0) {
                emptyState.style.display = 'flex';
            } else {
                filteredInvoices = allInvoices;
                displayInvoices(allInvoices);
            }
        } else {
            throw new Error(result.error);
        }
    } catch (error) {
        console.error('❌ Error loading invoices:', error);
        loadingSpinner.style.display = 'none';
        
        window.notify.error(
            'Erreur de chargement',
            'Impossible de charger les factures: ' + error.message,
            5000
        );
    }
}

// Display invoices in table with pagination
function displayInvoices(invoices) {
    const tableBody = document.getElementById('invoicesTableBody');
    const emptyState = document.getElementById('emptyState');
    const pagination = document.getElementById('pagination');
    
    if (invoices.length === 0) {
        tableBody.innerHTML = '';
        emptyState.style.display = 'flex';
        if (pagination) pagination.style.display = 'none';
        return;
    }
    
    emptyState.style.display = 'none';
    
    // Calculate pagination
    const totalItems = invoices.length;
    const itemsPerPageNum = itemsPerPage === 'all' ? totalItems : parseInt(itemsPerPage);
    const totalPages = itemsPerPage === 'all' ? 1 : Math.ceil(totalItems / itemsPerPageNum);
    
    // Adjust current page if needed
    if (currentPage > totalPages) {
        currentPage = totalPages || 1;
    }
    
    // Get items for current page
    const startIndex = (currentPage - 1) * itemsPerPageNum;
    const endIndex = itemsPerPage === 'all' ? totalItems : startIndex + itemsPerPageNum;
    const paginatedInvoices = invoices.slice(startIndex, endIndex);
    
    tableBody.innerHTML = paginatedInvoices.map(invoice => {
        console.log('📊 [DISPLAY] Invoice data:', {
            id: invoice.id,
            document_type: invoice.document_type,
            document_numero: invoice.document_numero,
            document_numero_devis: invoice.document_numero_devis,
            total_ht: invoice.total_ht,
            total_ttc: invoice.total_ttc
        });
        
        const typeLabel = invoice.document_type === 'facture' ? '📄 Facture' : '📋 Devis';
        const typeBadge = invoice.document_type === 'facture' ? 'badge-facture' : 'badge-devis';
        const numero = invoice.document_numero || invoice.document_numero_devis || '-';
        const numeroOrder = invoice.document_numero_Order;
        
        console.log('📊 [DISPLAY] Displaying numero:', numero, 'for invoice', invoice.id);
        const date = new Date(invoice.document_date).toLocaleDateString('fr-FR');
        
        // Build document number display with N° Order below if exists
        let documentDisplay = `<strong>${numero}</strong>`;
        if (numeroOrder) {
            documentDisplay += `<br><small style="color: #2196f3; font-weight: 500;">N° Order: ${numeroOrder}</small>`;
        }
        
        const totalHT = formatNumber(invoice.total_ht || 0);
        const totalTTC = formatNumber(invoice.total_ttc || 0);
        
        console.log('📊 MRY Formatted values:', {
            totalHT,
            totalTTC
        });
        
        return `
            <tr>
                <td>
                    <input type="checkbox" class="invoice-checkbox" data-invoice-id="${invoice.id}" 
                           style="width: 18px; height: 18px; cursor: pointer;">
                </td>
                <td><strong>#${invoice.id}</strong></td>
                <td><span class="badge ${typeBadge}">${typeLabel}</span></td>
                <td>${documentDisplay}</td>
                <td>${invoice.client_nom}</td>
                <td>${invoice.client_ice}</td>
                <td>${date}</td>
                <td>${formatNumber(invoice.total_ht)} DH</td>
                <td>${invoice.tva_rate}%</td>
                <td><strong>${formatNumber(invoice.total_ttc)} DH</strong></td>
                <td>
                    <div class="action-buttons">
                        <button class="btn-icon btn-view" onclick="viewInvoice(${invoice.id})" title="Voir">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M8 2C4.5 2 1.5 4.5 0 8c1.5 3.5 4.5 6 8 6s6.5-2.5 8-6c-1.5-3.5-4.5-6-8-6zm0 10c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4zm0-6.5c-1.4 0-2.5 1.1-2.5 2.5s1.1 2.5 2.5 2.5 2.5-1.1 2.5-2.5-1.1-2.5-2.5-2.5z"/>
                            </svg>
                        </button>
                        <button class="btn-icon btn-download" onclick="downloadInvoicePDF(${invoice.id})" title="Télécharger PDF">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                                <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                            </svg>
                        </button>
                        <button class="btn-icon btn-edit" onclick="editInvoice(${invoice.id})" title="Modifier">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                            </svg>
                        </button>
                        <button class="btn-icon btn-delete" onclick="deleteInvoice(${invoice.id})" title="Supprimer">
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
    
    // Update pagination controls
    updatePaginationControls(totalPages);
}

// Update pagination controls
function updatePaginationControls(totalPages) {
    const pagination = document.getElementById('pagination');
    const pageNumbers = document.getElementById('pageNumbers');
    const prevBtn = document.getElementById('prevPage');
    const nextBtn = document.getElementById('nextPage');
    
    if (!pagination || !pageNumbers) return;
    
    // Show/hide pagination
    if (totalPages <= 1 && itemsPerPage !== 'all') {
        pagination.style.display = 'none';
        return;
    }
    
    if (itemsPerPage === 'all') {
        pagination.style.display = 'none';
        return;
    }
    
    pagination.style.display = 'block';
    
    // Update prev/next buttons
    if (prevBtn) {
        prevBtn.disabled = currentPage === 1;
        prevBtn.style.opacity = currentPage === 1 ? '0.5' : '1';
        prevBtn.style.cursor = currentPage === 1 ? 'not-allowed' : 'pointer';
    }
    
    if (nextBtn) {
        nextBtn.disabled = currentPage === totalPages;
        nextBtn.style.opacity = currentPage === totalPages ? '0.5' : '1';
        nextBtn.style.cursor = currentPage === totalPages ? 'not-allowed' : 'pointer';
    }
    
    // Generate page numbers
    let pagesHTML = '';
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage < maxVisiblePages - 1) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    // First page
    if (startPage > 1) {
        pagesHTML += `<button onclick="goToPage(1)" style="padding: 0.5rem 0.75rem; background: #3e3e42; color: #ffffff; border: none; border-radius: 4px; cursor: pointer;">1</button>`;
        if (startPage > 2) {
            pagesHTML += `<span style="color: #cccccc; padding: 0 0.5rem;">...</span>`;
        }
    }
    
    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
        const isActive = i === currentPage;
        pagesHTML += `<button onclick="goToPage(${i})" style="padding: 0.5rem 0.75rem; background: ${isActive ? '#2196f3' : '#3e3e42'}; color: #ffffff; border: none; border-radius: 4px; cursor: pointer; font-weight: ${isActive ? '600' : 'normal'};">${i}</button>`;
    }
    
    // Last page
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            pagesHTML += `<span style="color: #cccccc; padding: 0 0.5rem;">...</span>`;
        }
        pagesHTML += `<button onclick="goToPage(${totalPages})" style="padding: 0.5rem 0.75rem; background: #3e3e42; color: #ffffff; border: none; border-radius: 4px; cursor: pointer;">${totalPages}</button>`;
    }
    
    pageNumbers.innerHTML = pagesHTML;
}

// Change items per page
window.changeItemsPerPage = function() {
    const select = document.getElementById('itemsPerPage');
    itemsPerPage = select.value;
    currentPage = 1;
    displayInvoices(filteredInvoices);
}

// Go to specific page
window.goToPage = function(page) {
    currentPage = page;
    displayInvoices(filteredInvoices);
}

// Change page (prev/next)
window.changePaginationPage = function(direction) {
    if (direction === 'prev' && currentPage > 1) {
        currentPage--;
    } else if (direction === 'next') {
        const totalItems = filteredInvoices.length;
        const itemsPerPageNum = itemsPerPage === 'all' ? totalItems : parseInt(itemsPerPage);
        const totalPages = Math.ceil(totalItems / itemsPerPageNum);
        if (currentPage < totalPages) {
            currentPage++;
        }
    }
    displayInvoices(filteredInvoices);
}

// Populate filter dropdowns
function populateFilters() {
    // Get unique years from invoices
    const invoiceYears = [...new Set(allInvoices.map(inv => new Date(inv.document_date).getFullYear()))];
    
    // Add current year and previous 2 years if not present
    const currentYear = new Date().getFullYear();
    const defaultYears = [currentYear, currentYear - 1, currentYear - 2];
    
    // Combine and remove duplicates
    const allYears = [...new Set([...invoiceYears, ...defaultYears])].sort((a, b) => b - a);
    
    const yearSelect = document.getElementById('filterYear');
    yearSelect.innerHTML = '<option value="">Toutes</option>' + 
        allYears.map(year => `<option value="${year}">${year}</option>`).join('');
    
    // Populate clients
    const clients = [...new Set(allInvoices.map(inv => inv.client_nom))].sort();
    const clientSelect = document.getElementById('filterClient');
    clientSelect.innerHTML = '<option value="">Tous</option>' + 
        clients.map(client => `<option value="${client}">${client}</option>`).join('');
}

// Reset filters
window.resetFilters = function() {
    document.getElementById('filterType').value = '';
    document.getElementById('filterYear').value = '';
    document.getElementById('filterMonth').value = '';
    document.getElementById('filterClient').value = '';
    document.getElementById('searchType').value = 'all';
    document.getElementById('searchInput').value = '';
    currentPage = 1;
    filterInvoices();
}

// Filter invoices
window.filterInvoices = async function() {
    currentPage = 1; // Reset to first page when filtering
    const filterType = document.getElementById('filterType').value;
    const filterYear = document.getElementById('filterYear').value;
    const filterMonth = document.getElementById('filterMonth').value;
    const filterClient = document.getElementById('filterClient').value;
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    
    // Show loading if search is active
    const loadingSpinner = document.getElementById('loadingSpinner');
    if (searchInput) {
        loadingSpinner.style.display = 'flex';
    }
    
    let filtered = allInvoices;
    
    // Filter by type
    if (filterType) {
        filtered = filtered.filter(inv => inv.document_type === filterType);
    }
    
    // Filter by year
    if (filterYear) {
        filtered = filtered.filter(inv => {
            const year = new Date(inv.document_date).getFullYear().toString();
            return year === filterYear;
        });
    }
    
    // Filter by month
    if (filterMonth) {
        filtered = filtered.filter(inv => {
            const month = new Date(inv.document_date).getMonth() + 1;
            const monthStr = month.toString().padStart(2, '0');
            return monthStr === filterMonth;
        });
    }
    
    // Filter by client
    if (filterClient) {
        filtered = filtered.filter(inv => inv.client_nom === filterClient);
    }
    
    // Advanced search
    if (searchInput) {
        const searchType = document.getElementById('searchType').value;
        
        // Get all invoices with their products for product/price search
        const needProducts = searchType === 'all' || searchType === 'product' || searchType === 'price';
        const invoicesWithProducts = needProducts ? await Promise.all(
            filtered.map(async inv => {
                const result = await window.electron.db.getInvoiceById(inv.id);
                return result.success ? result.data : inv;
            })
        ) : filtered;
        
        filtered = invoicesWithProducts.filter(inv => {
            const numero = (inv.document_numero || inv.document_numero_devis || '').toLowerCase();
            const numeroOrder = (inv.document_numero_Order || '').toLowerCase();
            const client = inv.client_nom.toLowerCase();
            const ice = inv.client_ice.toLowerCase();
            const totalTTC = inv.total_ttc.toString();
            
            // Search based on selected type
            switch(searchType) {
                case 'numero':
                    return numero.includes(searchInput);
                
                case 'order':
                    return numeroOrder.includes(searchInput);
                
                case 'client':
                    return client.includes(searchInput);
                
                case 'ice':
                    return ice.includes(searchInput);
                
                case 'product':
                    if (inv.products && inv.products.length > 0) {
                        return inv.products.some(p => {
                            const designation = (p.designation || '').toLowerCase();
                            return designation.includes(searchInput);
                        });
                    }
                    return false;
                
                case 'price':
                    if (inv.products && inv.products.length > 0) {
                        return inv.products.some(p => {
                            const price = p.prix_unitaire_ht.toString();
                            const total = p.total_ht.toString();
                            return price.includes(searchInput) || total.includes(searchInput);
                        });
                    }
                    return false;
                
                case 'total_ht':
                    // Search from the beginning of the number
                    const searchNumberHT = searchInput.trim();
                    const totalHTStr = (inv.total_ht || 0).toString();
                    
                    // Check if total HT starts with the search number
                    return totalHTStr.startsWith(searchNumberHT);
                
                case 'total':
                    // Search from the beginning of the number
                    const searchNumber = searchInput.trim();
                    const totalStr = (inv.total_ttc || 0).toString();
                    
                    // Check if total starts with the search number
                    return totalStr.startsWith(searchNumber);
                
                case 'all':
                default:
                    // Search in products
                    let productMatch = false;
                    if (inv.products && inv.products.length > 0) {
                        productMatch = inv.products.some(p => {
                            const designation = (p.designation || '').toLowerCase();
                            const price = p.prix_unitaire_ht.toString();
                            const total = p.total_ht.toString();
                            
                            return designation.includes(searchInput) || 
                                   price.includes(searchInput) || 
                                   total.includes(searchInput);
                        });
                    }
                    
                    // Search in ALL fields when "Tout" is selected
                    const totalHT = (inv.total_ht || 0).toString();
                    
                    return numero.includes(searchInput) || 
                           numeroOrder.includes(searchInput) ||
                           client.includes(searchInput) || 
                           ice.includes(searchInput) ||
                           totalHT.includes(searchInput) ||
                           totalTTC.includes(searchInput) ||
                           productMatch;
            }
        });
    }
    
    // Hide loading
    if (searchInput) {
        loadingSpinner.style.display = 'none';
    }
    
    filteredInvoices = filtered;
    displayInvoices(filtered);
    
    // Update result counter
    const resultsCounter = document.getElementById('resultsCounter');
    const resultCount = document.getElementById('resultCount');
    
    if (filterType || filterYear || filterMonth || filterClient || searchInput) {
        resultsCounter.style.display = 'block';
        resultCount.textContent = filtered.length;
    } else {
        resultsCounter.style.display = 'none';
    }
    
    console.log(`🔍 Filtered: ${filtered.length} / ${allInvoices.length} invoices`);
}

// Sort table by column
let currentSortColumnMry = null;
let currentSortDirectionMry = 'asc';

window.sortTableMry = function(column) {
    // Toggle sort direction if clicking same column
    if (currentSortColumnMry === column) {
        currentSortDirectionMry = currentSortDirectionMry === 'asc' ? 'desc' : 'asc';
    } else {
        currentSortColumnMry = column;
        currentSortDirectionMry = 'asc';
    }
    
    // Update sort icons
    ['numero', 'date', 'total_ht', 'total_ttc'].forEach(col => {
        const iconId = `sortIcon${col.charAt(0).toUpperCase() + col.slice(1).replace('_', '')}Mry`;
        const icon = document.getElementById(iconId);
        if (icon) {
            if (col === column) {
                icon.textContent = currentSortDirectionMry === 'asc' ? '↑' : '↓';
                icon.style.color = '#4caf50';
            } else {
                icon.textContent = '⇅';
                icon.style.color = '';
            }
        }
    });
    
    // Sort the filtered invoices
    const sorted = [...filteredInvoices].sort((a, b) => {
        let valueA, valueB;
        
        switch (column) {
            case 'numero':
                // Extract numeric part from document number
                const getNumero = (inv) => {
                    const numero = inv.document_numero || inv.document_numero_devis || '';
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
        
        if (currentSortDirectionMry === 'asc') {
            return valueA - valueB;
        } else {
            return valueB - valueA;
        }
    });
    
    // Update filtered invoices and display
    filteredInvoices = sorted;
    currentPage = 1; // Reset to first page
    displayInvoices(sorted);
    
    console.log(`📊 [MRY] Sorted by ${column} (${currentSortDirectionMry})`);
};

// View invoice details
window.viewInvoice = async function(id) {
    try {
        console.log('👁️ [VIEW] Opening invoice details for ID:', id);
        const result = await window.electron.db.getInvoiceById(id);
        
        if (!result.success || !result.data) {
            window.notify.error('Erreur', 'Facture introuvable', 3000);
            return;
        }
        
        const invoice = result.data;
        const date = new Date(invoice.document_date).toLocaleDateString('fr-FR');
        const docNumber = invoice.document_numero || invoice.document_numero_devis || '-';
        const typeLabel = invoice.document_type === 'facture' ? 'Facture' : 'Devis';
        
        console.log('👁️ [VIEW] Creating overlay and modal...');
        const overlay = document.createElement('div');
        overlay.className = 'invoice-view-overlay'; // Add class for easy selection
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
                    <button onclick="downloadInvoicePDF(${id})" style="padding:0.6rem 1.2rem;background:#2196F3;color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:0.9rem;font-weight:600;display:flex;align-items:center;gap:0.5rem;transition:all 0.2s;" onmouseover="this.style.background='#1976D2'" onmouseout="this.style.background='#2196F3'">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                        </svg>
                        Télécharger PDF
                    </button>
                    <button onclick="downloadBonDeTravauxPDF(${id})" style="padding:0.6rem 1.2rem;background:#E91E63;color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:0.9rem;font-weight:600;display:flex;align-items:center;gap:0.5rem;transition:all 0.2s;" onmouseover="this.style.background='#C2185B'" onmouseout="this.style.background='#E91E63'">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                        </svg>
                        Télécharger Bon de travaux
                    </button>
                    <button id="closeViewModal" onclick="console.log('🔴🔴🔴 [BUTTON] Close button X clicked directly from HTML!');" style="background:none;border:none;color:#999;cursor:pointer;font-size:1.5rem;padding:0;width:32px;height:32px;display:flex;align-items:center;justify-content:center;border-radius:4px;transition:all 0.2s;" onmouseover="this.style.background='#3e3e42';this.style.color='#fff'" onmouseout="this.style.background='none';this.style.color='#999'">×</button>
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
                                    // Escape HTML to prevent rendering issues
                                    const designation = (p.designation || '').replace(/</g, '&lt;').replace(/>/g, '&gt;');
                                    
                                    return `
                                    <tr style="border-bottom:1px solid #3e3e42;">
                                        <td style="padding:0.75rem;color:#fff;word-break:break-word;max-width:400px;overflow-wrap:break-word;white-space:pre-wrap;">${designation}</td>
                                        <td style="padding:0.75rem;text-align:center;color:#fff;white-space:nowrap;">${p.quantite}</td>
                                        <td style="padding:0.75rem;text-align:right;color:#fff;white-space:nowrap;">${formatNumber(parseFloat(p.prix_unitaire_ht))} DH</td>
                                        <td style="padding:0.75rem;text-align:right;color:#fff;font-weight:500;white-space:nowrap;">${formatNumber(parseFloat(p.total_ht))} DH</td>
                                    </tr>
                                    `;
                                }).join('')}
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
                            <span style="color:#fff;font-weight:600;">${formatNumber(invoice.total_ht)} DH</span>
                        </div>
                        <div style="display:flex;justify-content:space-between;margin-bottom:0.75rem;">
                            <span style="color:#999;">TVA (${invoice.tva_rate}%):</span>
                            <span style="color:#fff;font-weight:600;">${formatNumber(invoice.montant_tva)} DH</span>
                        </div>
                        <div style="display:flex;justify-content:space-between;padding-top:0.75rem;border-top:1px solid #3e3e42;">
                            <span style="color:#fff;font-weight:600;">Total TTC:</span>
                            <span style="color:#4CAF50;font-weight:700;font-size:1.1rem;">${formatNumber(invoice.total_ttc)} DH</span>
                        </div>
                    </div>
                </div>
                
                <!-- Notes Section -->
                <div style="margin-bottom:2rem;" id="notesSectionMRY${id}">
                    <h3 style="color:#fff;font-size:1.1rem;margin:0 0 1rem 0;font-weight:600;">📝 Notes</h3>
                    <div style="background:#1e1e1e;padding:1rem;border-radius:8px;">
                        <div style="color:#999;font-size:0.9rem;font-style:italic;">Chargement...</div>
                    </div>
                </div>
                
                <!-- Attachments Section -->
                <div>
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;">
                        <h3 style="color:#fff;font-size:1.1rem;margin:0;font-weight:600;">Pièces jointes (${invoice.attachments ? invoice.attachments.length : 0})</h3>
                        <button onclick="addNewAttachment(${id})" style="padding:0.5rem 1rem;background:#4CAF50;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:0.85rem;font-weight:600;display:flex;align-items:center;gap:0.5rem;transition:all 0.2s;" onmouseover="this.style.background='#45a049'" onmouseout="this.style.background='#4CAF50'">
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
                                        <button onclick="openAttachment(${a.id})" style="padding:0.4rem 0.8rem;background:#2196F3;color:#fff;border:none;border-radius:4px;cursor:pointer;font-size:0.8rem;">
                                            👁️ Ouvrir
                                        </button>
                                        <button onclick="deleteAttachment(${a.id}, ${id})" style="padding:0.4rem 0.8rem;background:#f44336;color:#fff;border:none;border-radius:4px;cursor:pointer;font-size:0.8rem;display:flex;align-items:center;gap:0.4rem;">
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
        console.log('👁️ [VIEW] Overlay added to DOM');
        
        const closeBtn = document.getElementById('closeViewModal');
        console.log('👁️ [VIEW] Close button found:', closeBtn ? 'Yes' : 'No');
        
        if (closeBtn) {
            closeBtn.onclick = () => {
                console.log('🔴🔴🔴 [CLOSE] Close button clicked from JavaScript event listener!');
                console.log('🔴 [CLOSE] Overlay exists:', overlay ? 'Yes' : 'No');
                console.log('🔴 [CLOSE] Overlay parent:', overlay.parentElement ? 'Yes' : 'No');
                overlay.remove();
                console.log('🔴 [CLOSE] Overlay removed');
            };
        } else {
            console.error('❌ [VIEW] Close button not found!');
        }
        overlay.onclick = (e) => {
            if (e.target === overlay) {
                console.log('🔴 [CLOSE] Overlay clicked');
                overlay.remove();
            }
        };
        
        // Load notes asynchronously
        console.log('📝 [NOTES VIEW MRY] Loading notes for invoice:', id);
        const noteResult = await window.electron.db.getNote(id);
        console.log('📥 [NOTES VIEW MRY] Note result:', noteResult);
        const notesSection = document.getElementById(`notesSectionMRY${id}`);
        if (notesSection) {
            const notesContent = notesSection.querySelector('div > div');
            if (noteResult.success && noteResult.data) {
                console.log('✅ [NOTES VIEW MRY] Displaying note:', noteResult.data);
                notesContent.style.color = '#fff';
                notesContent.style.fontStyle = 'normal';
                notesContent.style.whiteSpace = 'pre-wrap';
                notesContent.textContent = noteResult.data;
            } else {
                console.log('ℹ️ [NOTES VIEW MRY] No note found');
                notesContent.textContent = 'Aucune note';
            }
        }
        
    } catch (error) {
        console.error('Error viewing invoice:', error);
        window.notify.error('Erreur', 'Impossible de charger les détails', 3000);
    }
}

// Edit invoice
window.editInvoice = async function(id) {
    try {
        console.log('✏️ [EDIT] Opening edit modal for invoice ID:', id);
        const result = await window.electron.db.getInvoiceById(id);
        
        console.log('📥 [EDIT] Data received from database:', result);
        
        if (!result.success || !result.data) {
            throw new Error('Facture introuvable');
        }
        
        const invoice = result.data;
        console.log('📄 [EDIT] Invoice data:', {
            id: invoice.id,
            document_type: invoice.document_type,
            document_numero: invoice.document_numero,
            document_numero_devis: invoice.document_numero_devis,
            document_date: invoice.document_date
        });
        
        // Determine document type labels
        const isDevis = invoice.document_type === 'devis';
        const docTypeLabel = isDevis ? 'Devis' : 'Facture';
        const docNumeroLabel = isDevis ? 'N° Devis' : 'N° Facture';
        const docNumeroValue = isDevis ? (invoice.document_numero_devis || '') : (invoice.document_numero || '');
        
        console.log('🏷️ [EDIT] Document info:', {
            isDevis,
            docTypeLabel,
            docNumeroLabel,
            docNumeroValue
        });
        
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
                    <form id="editInvoiceForm">
                        <!-- Client Info -->
                        <div class="edit-section">
                            <h3>Client</h3>
                            <div class="form-row">
                                <div class="form-field">
                                    <label>Nom du client</label>
                                    <input type="text" id="editClientNom" value="${invoice.client_nom}" required>
                                </div>
                                <div class="form-field">
                                    <label>N° ICE</label>
                                    <input type="text" id="editClientICE" value="${invoice.client_ice}" required>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Document Info -->
                        <div class="edit-section">
                            <h3>Document</h3>
                            <div class="form-row">
                                <div class="form-field">
                                    <label>Date</label>
                                    <input type="date" id="editDate" value="${invoice.document_date}" required>
                                </div>
                                <div class="form-field">
                                    <label>${docNumeroLabel}</label>
                                    <input type="text" id="editNumero" value="${docNumeroValue}" required
                                           onblur="autoFormatDocumentNumberOnBlur(this)">
                                </div>
                            </div>
                            ${!isDevis ? `
                            <div class="form-row">
                                <div class="form-field">
                                    <label>N° Order (optionnel)</label>
                                    <input type="text" id="editNumeroOrder" value="${invoice.document_numero_Order || ''}" placeholder="Ex: 123">
                                </div>
                            </div>
                            ` : ''}
                        </div>
                        
                        <!-- Products -->
                        <div class="edit-section">
                            <h3>Produits</h3>
                            <div id="editProductsList">
                                ${invoice.products.map((p, index) => `
                                    <div class="edit-product-row" data-index="${index}">
                                        <textarea placeholder="Désignation" rows="2" onkeydown="handleArrowNavigationEdit(event, 0)">${p.designation || ''}</textarea>
                                        <input type="text" placeholder="Quantité" value="${p.quantite || ''}" onchange="recalculateEditTotals()" onkeydown="handleArrowNavigationEdit(event, 1)">
                                        <input type="number" step="0.01" placeholder="Prix HT" value="${p.prix_unitaire_ht || 0}" onchange="recalculateEditTotals()" onkeydown="handleArrowNavigationEdit(event, 2)">
                                        <button type="button" onclick="this.closest('.edit-product-row').remove(); recalculateEditTotals()">
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                            </svg>
                                        </button>
                                    </div>
                                `).join('')}
                            </div>
                            <button type="button" class="btn-add-product" onclick="addEditProductRow()">+ Ajouter un produit</button>
                        </div>
                        
                        <!-- Totals -->
                        <div class="edit-section">
                            <h3>Totaux</h3>
                            <div class="form-row">
                                <div class="form-field">
                                    <label>Taux TVA (%)</label>
                                    <input type="number" id="editTvaRate" value="${invoice.tva_rate}" min="0" max="100" onchange="recalculateEditTotals()">
                                </div>
                            </div>
                            <div class="totals-display">
                                <p><strong>Total HT:</strong> <span id="editTotalHT">${formatNumber(invoice.total_ht)} DH</span></p>
                                <p><strong>TVA:</strong> <span id="editMontantTVA">${formatNumber(invoice.montant_tva)} DH</span></p>
                                <p><strong>Total TTC:</strong> <span id="editTotalTTC">${formatNumber(invoice.total_ttc)} DH</span></p>
                            </div>
                        </div>
                        
                        <!-- Notes Section -->
                        <div class="edit-section">
                            <h3>📝 Notes</h3>
                            <div class="form-field">
                                <label>Notes supplémentaires (optionnel)</label>
                                <textarea id="editNotesMRY" rows="4" 
                                          placeholder="Ajoutez des notes ou remarques concernant cette facture..."
                                          style="width: 100%; padding: 0.75rem; background: #2d2d30; border: 2px solid #3e3e42; border-radius: 8px; color: #fff; font-size: 0.95rem; resize: vertical; font-family: inherit;"></textarea>
                                <small style="color: #999; font-size: 0.85rem; display: block; margin-top: 0.5rem;">
                                    Ces notes seront affichées dans le PDF sous le texte de clôture de la facture.
                                </small>
                            </div>
                        </div>
                        
                        <div class="form-actions" style="margin-top: 2rem; display: flex; justify-content: space-between; align-items: center;">
                            <button type="button" class="btn-convert" onclick="convertInvoiceType(${invoice.id}, '${invoice.document_type}')" style="background: #9c27b0; color: white; padding: 0.75rem 1.5rem; border: none; border-radius: 6px; cursor: pointer; font-weight: 500; display: flex; align-items: center; gap: 0.5rem;">
                                🔄 Convertir en ${isDevis ? 'Facture' : 'Devis'}
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
        
        // Attach form submit handler
        document.getElementById('editInvoiceForm').addEventListener('submit', (e) => handleEditSubmit(e, id));
        
        // Initial calculation
        recalculateEditTotals();
        
        // Load notes asynchronously
        console.log('📝 [NOTES EDIT MRY] Loading notes for invoice:', id);
        const noteResult = await window.electron.db.getNote(id);
        console.log('📥 [NOTES EDIT MRY] Note result:', noteResult);
        if (noteResult.success && noteResult.data) {
            const notesTextarea = document.getElementById('editNotesMRY');
            if (notesTextarea) {
                notesTextarea.value = noteResult.data;
                console.log('✅ [NOTES EDIT MRY] Loaded note into textarea:', noteResult.data);
            }
        } else {
            console.log('ℹ️ [NOTES EDIT MRY] No note found for this invoice');
        }
        
    } catch (error) {
        console.error('Error editing invoice:', error);
        window.notify.error('Erreur', 'Impossible de charger la facture', 3000);
    }
}

// Handle arrow key navigation in edit modal products (Global)
window.handleArrowNavigationEdit = function(event, currentCellIndex) {
    // Only handle arrow keys
    if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
        return;
    }
    
    const currentRow = event.target.closest('.edit-product-row');
    const container = document.getElementById('editProductsList');
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
            addEditProductRow();
            setTimeout(() => {
                const newRows = Array.from(container.querySelectorAll('.edit-product-row'));
                targetRow = newRows[newRows.length - 1];
                focusCellEdit(targetRow, targetCellIndex);
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
        focusCellEdit(targetRow, targetCellIndex);
    }
};

// Helper function to focus a specific cell in edit modal
function focusCellEdit(row, cellIndex) {
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
window.addEditProductRow = function() {
    const container = document.getElementById('editProductsList');
    const row = document.createElement('div');
    row.className = 'edit-product-row';
    row.innerHTML = `
        <textarea placeholder="Désignation" rows="2" onkeydown="handleArrowNavigationEdit(event, 0)"></textarea>
        <input type="text" placeholder="Quantité" onchange="recalculateEditTotals()" onkeydown="handleArrowNavigationEdit(event, 1)">
        <input type="number" step="0.01" placeholder="Prix HT" value="0" onchange="recalculateEditTotals()" onkeydown="handleArrowNavigationEdit(event, 2)">
        <button type="button" onclick="this.closest('.edit-product-row').remove(); recalculateEditTotals()">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
            </svg>
        </button>
    `;
    container.appendChild(row);
}

// Recalculate totals in edit modal
window.recalculateEditTotals = function() {
    const rows = document.querySelectorAll('.edit-product-row');
    let totalHT = 0;
    
    rows.forEach(row => {
        const qty = parseFloat(row.querySelector('input[type="text"]').value) || 1;
        const price = parseFloat(row.querySelector('input[type="number"]').value) || 0;
        totalHT += qty * price;
    });
    
    const tvaRate = parseFloat(document.getElementById('editTvaRate').value) || 0;
    const montantTVA = totalHT * (tvaRate / 100);
    const totalTTC = totalHT + montantTVA;
    
    // Use simple format without spaces in edit modal
    document.getElementById('editTotalHT').textContent = totalHT.toFixed(2) + ' DH';
    document.getElementById('editMontantTVA').textContent = montantTVA.toFixed(2) + ' DH';
    document.getElementById('editTotalTTC').textContent = totalTTC.toFixed(2) + ' DH';
}

// Check if document number is unique (for edit)
async function checkEditDocumentNumberUnique(invoiceId, currentInvoice, newNumero, newNumeroOrder) {
    try {
        console.log('🔍 [CHECK] Starting uniqueness check:', {
            invoiceId,
            documentType: currentInvoice.document_type,
            newNumero,
            currentNumero: currentInvoice.document_numero,
            currentNumeroDevis: currentInvoice.document_numero_devis
        });
        
        const result = await window.electron.db.getAllInvoices('MRY');
        if (!result.success) return true;
        
        const invoices = result.data.filter(inv => inv.id !== invoiceId); // Exclude current invoice
        console.log('🔍 [CHECK] Checking against', invoices.length, 'other invoices');
        
        // Check based on document type
        if (currentInvoice.document_type === 'facture') {
            // Check N° Facture
            if (newNumero && newNumero !== currentInvoice.document_numero) {
                console.log('🔍 [CHECK] Checking facture numero:', newNumero);
                const duplicateFacture = invoices.find(inv => 
                    inv.document_type === 'facture' && inv.document_numero === newNumero
                );
                if (duplicateFacture) {
                    console.log('❌ [CHECK] Duplicate facture found:', duplicateFacture.id);
                    window.notify.error(
                        'Numéro de facture déjà utilisé',
                        `Le N° Facture "${newNumero}" existe déjà. Veuillez utiliser un autre numéro.`,
                        5000
                    );
                    return false;
                }
            } else {
                console.log('✅ [CHECK] Facture numero unchanged, skipping check');
            }
            
            // Check N° Order if provided (only in factures)
            if (newNumeroOrder && newNumeroOrder.trim() !== '') {
                // Normalize current value (null or empty string to null)
                const currentOrder = currentInvoice.document_numero_Order?.trim() || null;
                const newOrder = newNumeroOrder.trim();
                
                // Only check if the value actually changed
                if (newOrder !== currentOrder) {
                    const duplicateOrder = invoices.find(inv => 
                        inv.document_type === 'facture' &&
                        inv.document_numero_Order &&
                        inv.document_numero_Order.trim() === newOrder
                    );
                    if (duplicateOrder) {
                        window.notify.error(
                            'Numéro de commande déjà utilisé',
                            `Le N° Order "${newNumeroOrder}" existe déjà. Veuillez utiliser un autre numéro.`,
                            5000
                        );
                        return false;
                    }
                }
            }
        } else if (currentInvoice.document_type === 'devis') {
            // Check N° Devis
            if (newNumero && newNumero !== currentInvoice.document_numero_devis) {
                console.log('🔍 [CHECK] Checking devis numero:', newNumero, 'vs current:', currentInvoice.document_numero_devis);
                const duplicateDevis = invoices.find(inv => 
                    inv.document_type === 'devis' && inv.document_numero_devis === newNumero
                );
                if (duplicateDevis) {
                    console.log('❌ [CHECK] Duplicate devis found:', duplicateDevis.id);
                    window.notify.error(
                        'Numéro de devis déjà utilisé',
                        `Le N° Devis "${newNumero}" existe déjà. Veuillez utiliser un autre numéro.`,
                        5000
                    );
                    return false;
                }
                console.log('✅ [CHECK] No duplicate devis found');
            } else {
                console.log('✅ [CHECK] Devis numero unchanged, skipping check');
            }
        }
        
        console.log('✅ [CHECK] All checks passed, update allowed');
        return true;
    } catch (error) {
        console.error('Error checking document number:', error);
        return true; // Allow if check fails
    }
}

// Handle edit form submit
async function handleEditSubmit(e, invoiceId) {
    e.preventDefault();
    
    try {
        // Get current invoice data for comparison
        const currentInvoice = allInvoices.find(inv => inv.id === invoiceId);
        if (!currentInvoice) {
            throw new Error('Invoice not found');
        }
        
        // Collect data
        const products = [];
        document.querySelectorAll('.edit-product-row').forEach(row => {
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
        
        const newNumero = document.getElementById('editNumero').value;
        const newNumeroOrder = document.getElementById('editNumeroOrder')?.value || null;
        
        console.log('🔍 [UPDATE] Values from form:', {
            newNumero,
            newNumeroOrder,
            currentType: currentInvoice.document_type
        });
        
        // Check uniqueness before proceeding
        console.log('🔍 [UPDATE] Checking uniqueness...');
        const isUnique = await checkEditDocumentNumberUnique(
            invoiceId,
            currentInvoice,
            newNumero,
            newNumeroOrder
        );
        
        console.log('🔍 [UPDATE] Uniqueness check result:', isUnique);
        
        if (!isUnique) {
            console.log('❌ [UPDATE] Update blocked - duplicate number detected');
            return;
        }
        
        // Prepare document data based on type
        const documentData = {
            date: document.getElementById('editDate').value
        };
        
        // Set the correct numero field based on document type
        if (currentInvoice.document_type === 'facture') {
            documentData.numero = newNumero;
            documentData.numero_Order = newNumeroOrder;
            documentData.numero_devis = null;  // Clear devis numero for facture
        } else {
            documentData.numero_devis = newNumero;
            documentData.numero = null;  // Clear facture numero for devis
            documentData.numero_Order = null;
        }
        
        console.log('📝 [UPDATE] Document data prepared:', documentData);
        
        const updateData = {
            client: {
                nom: document.getElementById('editClientNom').value,
                ICE: document.getElementById('editClientICE').value
            },
            document: documentData,
            products,
            totals: {
                total_ht: parseFloat(document.getElementById('editTotalHT').textContent.replace(' DH', '')),
                tva_rate: parseFloat(document.getElementById('editTvaRate').value),
                montant_tva: parseFloat(document.getElementById('editMontantTVA').textContent.replace(' DH', '')),
                total_ttc: parseFloat(document.getElementById('editTotalTTC').textContent.replace(' DH', ''))
            }
        };
        
        console.log('📝 Updating invoice:', invoiceId);
        console.log('📊 Update data:', updateData);
        
        // Update in database
        const result = await window.electron.db.updateInvoice(invoiceId, updateData);
        
        console.log('📥 Update result:', result);
        
        if (result.success) {
            console.log('✅ [UPDATE] Invoice updated successfully in database');
            
            // Save or delete notes
            const noteText = document.getElementById('editNotesMRY')?.value?.trim();
            console.log('📝 [NOTES MRY] Saving note for invoice:', invoiceId, 'Text:', noteText);
            if (noteText) {
                const noteResult = await window.electron.db.saveNote(invoiceId, noteText);
                console.log('✅ [NOTES MRY] Save result:', noteResult);
            } else {
                // Delete note if textarea is empty
                const deleteResult = await window.electron.db.deleteNote(invoiceId);
                console.log('🗑️ [NOTES MRY] Delete result:', deleteResult);
            }
            
            window.notify.success('Succès', 'Facture mise à jour avec succès!', 3000);
            
            // Close modal
            document.querySelector('.modal-overlay').remove();
            
            // Reload list immediately to ensure fresh data
            console.log('🔄 [UPDATE] Reloading invoice list...');
            await loadInvoices();
            console.log('✅ [UPDATE] Invoice list reloaded successfully');
        } else {
            console.error('❌ [UPDATE] Update failed:', result.error);
            throw new Error(result.error || 'Échec de la mise à jour');
        }
        
    } catch (error) {
        console.error('Error updating invoice:', error);
        window.notify.error('Erreur', 'Impossible de mettre à jour', 3000);
    }
}

// Show input modal for conversion - INLINE EDIT VERSION
function showConvertInputModal(newType, newTypeLabel, prefillNumero = '') {
    return new Promise((resolve) => {
        // Close edit modal temporarily
        const editModal = document.querySelector('.modal-overlay');
        const wasVisible = editModal && editModal.style.display !== 'none';
        if (editModal) {
            editModal.style.display = 'none';
        }
        
        // Create floating input box
        const overlay = document.createElement('div');
        overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.95);z-index:999999;display:flex;align-items:center;justify-content:center;animation:fadeIn 0.2s;';
        
        const container = document.createElement('div');
        container.style.cssText = 'background:#1e1e1e;border:3px solid #2196f3;border-radius:16px;padding:2.5rem;min-width:500px;box-shadow:0 20px 60px rgba(0,0,0,0.9);animation:slideIn 0.3s;';
        
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
                <label style="display:block;color:#2196F3;margin-bottom:0.75rem;font-weight:600;font-size:1.1rem;">${newType === 'facture' ? 'N° Facture' : 'N° Devis'}</label>
                <input type="text" id="convertInput1" placeholder="Exemple: 548" value="${prefillNumero}"
                       style="width:100%;padding:1rem;background:#2d2d30;border:2px solid #3e3e42;border-radius:8px;color:#fff;font-size:1.1rem;box-sizing:border-box;outline:none;transition:all 0.3s;"
                       onfocus="this.style.borderColor='#2196F3';this.style.background='#1e1e1e';"
                       onblur="this.style.borderColor='#3e3e42';this.style.background='#2d2d30';autoFormatDocumentNumberOnBlur(this);">
            </div>
            
            ${newType === 'facture' ? `
            <div style="margin-bottom:2rem;">
                <label style="display:block;color:#9e9e9e;margin-bottom:0.75rem;font-weight:500;font-size:1rem;">N° Order (optionnel)</label>
                <input type="text" id="convertInput2" placeholder="Exemple: 555"
                       style="width:100%;padding:1rem;background:#2d2d30;border:2px solid #3e3e42;border-radius:8px;color:#fff;font-size:1.1rem;box-sizing:border-box;outline:none;transition:all 0.3s;"
                       onfocus="this.style.borderColor='#2196f3';this.style.background='#1e1e1e';"
                       onblur="this.style.borderColor='#3e3e42';this.style.background='#2d2d30';">
            </div>
            ` : ''}
            
            <div style="display:flex;gap:1rem;margin-top:2rem;">
                <button id="convertBtnCancel" style="flex:1;padding:1rem;background:#3e3e42;color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:1.1rem;font-weight:600;transition:all 0.3s;"
                        onmouseover="this.style.background='#4e4e52';" onmouseout="this.style.background='#3e3e42';">
                    Annuler
                </button>
                <button id="convertBtnConfirm" style="flex:1;padding:1rem;background:#2196f3;color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:1.1rem;font-weight:600;transition:all 0.3s;"
                        onmouseover="this.style.background='#1976d2';" onmouseout="this.style.background='#2196f3';">
                    ✓ Confirmer
                </button>
            </div>
        `;
        
        overlay.appendChild(container);
        document.body.appendChild(overlay);
        
        const input1 = document.getElementById('convertInput1');
        const input2 = document.getElementById('convertInput2');
        const btnConfirm = document.getElementById('convertBtnConfirm');
        const btnCancel = document.getElementById('convertBtnCancel');
        
        // Multiple focus attempts
        const doFocus = () => {
            if (input1) {
                input1.focus();
                input1.select();
            }
        };
        
        setTimeout(doFocus, 10);
        setTimeout(doFocus, 100);
        setTimeout(doFocus, 300);
        
        const cleanup = () => {
            overlay.remove();
            if (editModal && wasVisible) {
                editModal.style.display = '';
            }
        };
        
        const handleConfirm = () => {
            let val1 = input1.value.trim();
            let val2 = input2 ? input2.value.trim() : '';
            
            // Auto-add year if not present
            const currentYear = new Date().getFullYear();
            if (val1 && !val1.includes('/')) {
                val1 = val1 + '/' + currentYear;
            }
            if (val2 && !val2.includes('/')) {
                val2 = val2 + '/' + currentYear;
            }
            
            // Check if empty or only slash
            if (!val1 || val1.startsWith('/')) {
                input1.style.borderColor = '#f44336';
                input1.style.background = '#3d1f1f';
                input1.focus();
                window.notify.warning('Attention', 'Veuillez entrer un numéro', 3000);
                return;
            }
            
            cleanup();
            resolve({ 
                newNumero: val1, 
                newNumeroOrder: val2 || null 
            });
        };
        
        const handleCancel = () => {
            cleanup();
            resolve(null);
        };
        
        btnConfirm.onclick = handleConfirm;
        btnCancel.onclick = handleCancel;
        
        input1.onkeydown = (e) => {
            if (e.key === 'Enter') handleConfirm();
            if (e.key === 'Escape') handleCancel();
        };
        
        if (input2) {
            input2.onkeydown = (e) => {
                if (e.key === 'Enter') handleConfirm();
                if (e.key === 'Escape') handleCancel();
            };
        }
    });
}

// Custom confirm dialog
function showConfirmDialog(message) {
    return new Promise((resolve) => {
        const overlay = document.createElement('div');
        overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.9);z-index:999998;display:flex;align-items:center;justify-content:center;';
        
        const box = document.createElement('div');
        box.style.cssText = 'background:#2d2d30;border:2px solid #ff9800;border-radius:12px;padding:2rem;max-width:450px;box-shadow:0 20px 60px rgba(0,0,0,0.9);';
        
        box.innerHTML = `
            <div style="text-align:center;margin-bottom:1.5rem;">
                <div style="font-size:3rem;margin-bottom:0.5rem;">⚠️</div>
                <p style="color:#fff;margin:0;font-size:1.1rem;line-height:1.6;">${message}</p>
            </div>
            <div style="display:flex;gap:1rem;">
                <button id="confirmNo" style="flex:1;padding:0.75rem;background:#3e3e42;color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:1rem;font-weight:600;">Non</button>
                <button id="confirmYes" style="flex:1;padding:0.75rem;background:#ff9800;color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:1rem;font-weight:600;">Oui</button>
            </div>
        `;
        
        overlay.appendChild(box);
        document.body.appendChild(overlay);
        
        document.getElementById('confirmYes').onclick = () => {
            overlay.remove();
            resolve(true);
        };
        
        document.getElementById('confirmNo').onclick = () => {
            overlay.remove();
            resolve(false);
        };
        
        // Removed overlay.onclick to prevent closing when clicking outside
        // Modal should only close via Cancel or Confirm buttons
    });
}

// Add attachment in edit modal
window.addEditAttachment = async function(invoiceId) {
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
                
                const result = await window.electron.db.addAttachment(
                    invoiceId,
                    file.name,
                    file.type,
                    uint8Array
                );
                
                if (result.success) {
                    window.notify.success('Succès', `${file.name} ajouté`, 2000);
                    // Refresh the edit modal
                    document.querySelector('.modal-overlay').remove();
                    setTimeout(() => editInvoice(invoiceId), 300);
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
window.deleteEditAttachment = async function(attachmentId, invoiceId) {
    const confirmed = await customConfirm('Confirmation', 'Êtes-vous sûr de vouloir supprimer cette pièce jointe ?', 'warning');
    if (!confirmed) {
        return;
    }
    
    try {
        const result = await window.electron.db.deleteAttachment(attachmentId);
        
        if (result.success) {
            window.notify.success('Succès', 'Pièce jointe supprimée', 2000);
            // Refresh the edit modal
            document.querySelector('.modal-overlay').remove();
            setTimeout(() => editInvoice(invoiceId), 300);
        } else {
            window.notify.error('Erreur', result.error || 'Impossible de supprimer', 3000);
        }
    } catch (error) {
        console.error('Error deleting attachment:', error);
        window.notify.error('Erreur', 'Une erreur est survenue', 3000);
    }
}

// Convert invoice type (Facture ↔ Devis)
window.convertInvoiceType = async function(invoiceId, currentType) {
    console.log('🔄 [CONVERT] Starting conversion for invoice:', invoiceId);
    
    const newType = currentType === 'facture' ? 'devis' : 'facture';
    const newTypeLabel = newType === 'facture' ? 'Facture' : 'Devis';
    const currentTypeLabel = currentType === 'facture' ? 'Facture' : 'Devis';
    
    // Ask for confirmation with custom dialog
    const confirmMsg = `Voulez-vous vraiment convertir ce ${currentTypeLabel} en ${newTypeLabel} ?<br><br>Cela créera un nouveau document avec les mêmes produits.`;
    const confirmed = await showConfirmDialog(confirmMsg);
    
    if (!confirmed) {
        console.log('❌ [CONVERT] User cancelled confirmation');
        return;
    }
    
    console.log('✅ [CONVERT] User confirmed conversion');
    
    try {
        // Get current invoice data
        const result = await window.electron.db.getInvoiceById(invoiceId);
        if (!result.success || !result.data) {
            throw new Error('Document introuvable');
        }
        
        const invoice = result.data;
        console.log('📊 [CONVERT] Invoice data loaded:', invoice);
        
        // Validate invoice data
        if (!invoice.client_nom || !invoice.client_ice) {
            throw new Error('Données client manquantes');
        }
        
        // Get current document number
        let currentNumero = '';
        if (currentType === 'facture') {
            currentNumero = invoice.document_numero || '';
        } else if (currentType === 'devis') {
            currentNumero = invoice.document_numero_devis || '';
        }
        
        // Show input modal for document numbers with pre-filled number
        console.log('🎯 [CONVERT] Calling showConvertInputModal...');
        const inputData = await showConvertInputModal(newType, newTypeLabel, currentNumero);
        console.log('📊 [CONVERT] Input data received:', inputData);
        
        if (!inputData) {
            window.notify.warning('Annulé', 'Conversion annulée', 3000);
            return;
        }
        
        const { newNumero, newNumeroOrder } = inputData;
        
        // Check if numbers are unique
        const allInvoicesResult = await window.electron.db.getAllInvoices('MRY');
        if (allInvoicesResult.success) {
            // Check document number
            const duplicateNumero = allInvoicesResult.data.find(inv => {
                if (newType === 'facture') {
                    return inv.document_type === 'facture' && inv.document_numero === newNumero;
                } else {
                    return inv.document_type === 'devis' && inv.document_numero_devis === newNumero;
                }
            });
            
            if (duplicateNumero) {
                const label = newType === 'facture' ? 'N° Facture' : 'N° Devis';
                window.notify.error('Erreur', `Ce ${label} existe déjà`, 5000);
                return;
            }
            
            // Check N° Order if provided (only for facture)
            if (newType === 'facture' && newNumeroOrder) {
                const duplicateOrder = allInvoicesResult.data.find(inv => 
                    inv.document_type === 'facture' &&
                    inv.document_numero_Order === newNumeroOrder
                );
                
                if (duplicateOrder) {
                    window.notify.error('Erreur', `Ce N° Order existe déjà`, 5000);
                    return;
                }
            }
        }
        
        // Prepare data for new document
        console.log('📦 [CONVERT] Preparing invoice data...');
        console.log('📦 [CONVERT] client_nom:', invoice.client_nom);
        console.log('📦 [CONVERT] client_ice:', invoice.client_ice);
        console.log('📦 [CONVERT] products:', invoice.products);
        
        const newInvoiceData = {
            company_code: 'MRY',
            client: {
                nom: invoice.client_nom || invoice.client?.nom || '',
                ICE: invoice.client_ice || invoice.client?.ICE || ''
            },
            document: {
                type: newType,
                date: invoice.document_date || new Date().toISOString().split('T')[0],
                numero: newType === 'facture' ? newNumero : null,
                numero_devis: newType === 'devis' ? newNumero : null,
                numero_Order: newType === 'facture' ? newNumeroOrder : null
            },
            products: (invoice.products || []).map(p => ({
                designation: p.designation || '',
                quantite: p.quantite || 0,
                prix_unitaire_ht: p.prix_unitaire_ht || 0,
                total_ht: p.total_ht || 0
            })),
            totals: {
                total_ht: invoice.total_ht,
                tva_rate: invoice.tva_rate,
                montant_tva: invoice.montant_tva,
                total_ttc: invoice.total_ttc
            }
        };
        
        // Create new invoice
        console.log('📤 [CONVERT] Sending data to backend:', JSON.stringify(newInvoiceData, null, 2));
        const createResult = await window.electron.db.createInvoice(newInvoiceData);
        console.log('📥 [CONVERT] Backend response:', createResult);
        
        if (createResult.success) {
            window.notify.success(
                'Succès',
                `${newTypeLabel} créé(e) avec succès à partir du ${currentTypeLabel}`,
                4000
            );
            
            // Close modal and reload
            document.querySelector('.modal-overlay')?.remove();
            await loadInvoices();
        } else {
            throw new Error(createResult.error);
        }
        
    } catch (error) {
        console.error('Error converting invoice:', error);
        window.notify.error('Erreur', 'Erreur lors de la conversion: ' + error.message, 5000);
    }
}

// Delete invoice
window.deleteInvoice = async function(id) {
    const confirmed = await customConfirm('Confirmation', 'Êtes-vous sûr de vouloir supprimer cette facture ?', 'warning');
    if (!confirmed) {
        return;
    }
    
    try {
        const result = await window.electron.db.deleteInvoice(id);
        
        if (result.success) {
            window.notify.success('Supprimé', 'Facture supprimée avec succès', 3000);
            loadInvoices(); // Reload list
        } else {
            throw new Error(result.error);
        }
    } catch (error) {
        console.error('Error deleting invoice:', error);
        window.notify.error('Erreur', 'Impossible de supprimer la facture', 3000);
    }
}

// Open attachment
window.openAttachment = async function(attachmentId) {
    try {
        console.log('📂 Opening attachment:', attachmentId);
        const result = await window.electron.db.getAttachment(attachmentId);
        
        if (result.success && result.data) {
            const attachment = result.data;
            console.log('📄 Full attachment object:', attachment);
            console.log('📄 File data details:', {
                filename: attachment.filename,
                type: attachment.file_type,
                size: attachment.file_size,
                dataType: typeof attachment.file_data,
                isUint8Array: attachment.file_data instanceof Uint8Array,
                isArray: Array.isArray(attachment.file_data),
                isArrayBuffer: attachment.file_data instanceof ArrayBuffer,
                hasDataProperty: attachment.file_data && attachment.file_data.data !== undefined,
                constructor: attachment.file_data?.constructor?.name,
                keys: attachment.file_data ? Object.keys(attachment.file_data).slice(0, 10) : [],
                firstValues: attachment.file_data ? (Array.isArray(attachment.file_data) ? attachment.file_data.slice(0, 5) : Object.values(attachment.file_data).slice(0, 5)) : []
            });
            
            // Convert base64 string to binary
            console.log('🔄 Converting base64 to binary...');
            const binaryString = atob(attachment.file_data);
            const bytes = new Uint8Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) {
                bytes[i] = binaryString.charCodeAt(i);
            }
            
            console.log('✅ File data converted, size:', bytes.length);
            
            // Create blob from binary data
            const blob = new Blob([bytes], { type: attachment.file_type });
            console.log('✅ Blob created, size:', blob.size, 'type:', blob.type);
            
            const url = URL.createObjectURL(blob);
            console.log('✅ URL created:', url);
            
            // Open in new window
            window.open(url, '_blank');
            
            // Clean up after a delay
            setTimeout(() => URL.revokeObjectURL(url), 60000);
        } else {
            throw new Error(result.error || 'Fichier introuvable');
        }
    } catch (error) {
        console.error('❌ Error opening attachment:', error);
        window.notify.error('Erreur', 'Impossible d\'ouvrir le fichier: ' + error.message, 4000);
    }
}

// Delete attachment
window.deleteAttachment = async function(attachmentId, invoiceId) {
    console.log('🗑️ [DELETE] Delete attachment requested:', attachmentId, 'for invoice:', invoiceId);
    
    const confirmed = await customConfirm('Confirmation', 'Êtes-vous sûr de vouloir supprimer ce fichier ?', 'warning');
    if (!confirmed) {
        console.log('🗑️ [DELETE] User cancelled deletion');
        return;
    }
    
    try {
        console.log('🗑️ [DELETE] Deleting attachment from database...');
        const result = await window.electron.db.deleteAttachment(attachmentId);
        
        if (result.success) {
            console.log('🗑️ [DELETE] Attachment deleted successfully');
            window.notify.success('Supprimé', 'Fichier supprimé avec succès', 3000);
            
            // Close modal and reopen to refresh
            console.log('🗑️ [DELETE] Closing modal...');
            const modalToClose = document.querySelector('.invoice-view-overlay');
            console.log('🗑️ [DELETE] Modal found:', modalToClose ? 'Yes' : 'No');
            if (modalToClose) {
                modalToClose.remove();
                console.log('🗑️ [DELETE] Modal removed');
            } else {
                console.warn('🗑️ [DELETE] Warning: Modal not found!');
            }
            console.log('🗑️ [DELETE] Reopening invoice view in 300ms...');
            setTimeout(() => {
                console.log('🗑️ [DELETE] Calling viewInvoice(' + invoiceId + ')');
                viewInvoice(invoiceId);
            }, 300);
        } else {
            throw new Error(result.error);
        }
    } catch (error) {
        console.error('❌ [DELETE] Error deleting attachment:', error);
        window.notify.error('Erreur', 'Impossible de supprimer le fichier', 3000);
    }
}

// Add new attachment
window.addNewAttachment = async function(invoiceId) {
    // Create file input
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.png,.jpg,.jpeg,.pdf';
    input.multiple = true;
    
    input.onchange = async (e) => {
        const files = Array.from(e.target.files);
        
        if (files.length === 0) return;
        
        try {
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
                const result = await window.electron.db.addAttachment(
                    invoiceId,
                    file.name,
                    file.type,
                    uint8Array
                );
                
                if (result.success) {
                    console.log('✅ Attachment uploaded:', file.name);
                } else {
                    console.error('❌ Failed to upload:', file.name, result.error);
                }
            }
            
            window.notify.success('Succès', 'Fichier(s) ajouté(s) avec succès', 3000);
            
            // Close modal and reopen to refresh
            console.log('📎 [UPLOAD] Files uploaded, closing modal...');
            const modalToClose = document.querySelector('.invoice-view-overlay');
            console.log('📎 [UPLOAD] Modal found:', modalToClose ? 'Yes' : 'No');
            if (modalToClose) {
                modalToClose.remove();
                console.log('📎 [UPLOAD] Modal removed');
            } else {
                console.warn('📎 [UPLOAD] Warning: Modal not found!');
            }
            console.log('📎 [UPLOAD] Reopening invoice view in 300ms...');
            setTimeout(() => {
                console.log('📎 [UPLOAD] Calling viewInvoice(' + invoiceId + ')');
                viewInvoice(invoiceId);
            }, 300);
            
        } catch (error) {
            console.error('Error uploading attachments:', error);
            window.notify.error('Erreur', 'Impossible d\'ajouter les fichiers', 3000);
        }
    };
    
    input.click();
}

// Format number with spaces for thousands - Fixed for PDF Arabic numerals
function formatNumberForPDF(number) {
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
window.downloadInvoicePDF = async function(invoiceId) {
    try {
        console.log('📥 Generating PDF for invoice:', invoiceId);
        
        // Get invoice data
        const result = await window.electron.db.getInvoiceById(invoiceId);
        
        if (!result.success || !result.data) {
            throw new Error('Facture introuvable');
        }
        
        const invoice = result.data;
        
        console.log('🔍 Invoice type:', invoice.document_type);
        console.log('🔍 Current Order number:', invoice.document_numero_Order);
        
        // Show dialog with checkbox for FACTURE type (only if Order exists)
        if (invoice.document_type === 'facture' && invoice.document_numero_Order && invoice.document_numero_Order.trim() !== '') {
            const includeOrder = await new Promise((resolve) => {
                const overlay = document.createElement('div');
                overlay.className = 'custom-modal-overlay';
                
                overlay.innerHTML = `
                    <div class="custom-modal">
                        <div class="custom-modal-header">
                            <span class="custom-modal-icon info">📋</span>
                            <h3 class="custom-modal-title">Télécharger PDF</h3>
                        </div>
                        <div class="custom-modal-body">
                            <p style="margin-bottom:1.25rem;color:#e0e0e0;font-size:0.95rem;">N° Order actuel: <strong style="color:#2196F3;font-size:1.05rem;">${invoice.document_numero_Order}</strong></p>
                            <label style="display:flex;align-items:center;cursor:pointer;padding:1rem;background:#1e1e1e;border:2px solid #2196F3;border-radius:10px;transition:all 0.2s ease;">
                                <input type="checkbox" id="includeOrderCheckbox" checked style="width:20px;height:20px;margin-right:1rem;cursor:pointer;accent-color:#2196F3;">
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
                
                const checkbox = overlay.querySelector('#includeOrderCheckbox');
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
            
            // Temporarily remove Order number if user doesn't want it in PDF
            if (!includeOrder) {
                console.log('⚠️ User chose not to include Order number in PDF');
                invoice.document_numero_Order = null;
            } else {
                console.log('✅ Including Order number in PDF:', invoice.document_numero_Order);
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
                            <button id="excludeZeroBtnMRY" class="custom-modal-btn secondary">
                                ❌ Non, masquer
                            </button>
                            <button id="includeZeroBtnMRY" class="custom-modal-btn primary">
                                ✅ Oui, afficher
                            </button>
                        </div>
                    </div>
                `;
                
                document.body.appendChild(overlay);
                
                const excludeBtn = document.getElementById('excludeZeroBtnMRY');
                const includeBtn = document.getElementById('includeZeroBtnMRY');
                
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
            // Load jsPDF from CDN
            await loadJsPDF();
        }
        
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        // Colors
        const blueColor = [33, 97, 140]; // #21618C
        const greenColor = [16, 172, 132]; // #10AC84
        const orangeColor = [255, 152, 0]; // #FF9800
        
        const dateStr = new Date(invoice.document_date).toLocaleDateString('fr-FR');
        
        // Function to add header to any page
        const addHeader = (isFirstPage = true) => {
            // Add Logo
            try {
                const logoImg = document.querySelector('img[src*="mry.png"]') || 
                               document.querySelector('img[data-asset="mry"]') ||
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
            doc.text('MRY TRAV SARL (AU)', 105, 20, { align: 'center' });
            
            doc.setFontSize(10);
            doc.setFont(undefined, 'normal');
            doc.setTextColor(0, 0, 0);
            doc.text('TRAVAUX DIVERS DE CONSTRUCTION', 105, 27, { align: 'center' });
            doc.text('VENTE DE MATERIAUX DE CONSTRUCTION', 105, 32, { align: 'center' });
            doc.text('VENTE DE QUINCAILLERIE & DE DROGUERIE', 105, 37, { align: 'center' });
            
            // Client Info
            doc.setFontSize(11);
            doc.setFont(undefined, 'bold');
            doc.text('CLIENT :', 15, 50);
            doc.setTextColor(...greenColor);
            doc.text(invoice.client_nom, 40, 50);
            
            doc.setTextColor(0, 0, 0);
            doc.text('ICE :', 15, 57);
            doc.setTextColor(...greenColor);
            doc.text(invoice.client_ice, 40, 57);
            
            // Date
            doc.setTextColor(0, 0, 0);
            doc.text(`Date: ${dateStr}`, 150, 50);
            
            // Document Number (Facture or Devis)
            doc.setFontSize(14);
            doc.setFont(undefined, 'bold');
            
            // Check document type
            if (invoice.document_type === 'devis') {
                doc.text('DEVIS N°:', 15, 70);
                doc.setTextColor(...orangeColor);
                doc.text(invoice.document_numero_devis || '-', 50, 70);
            } else {
                doc.text('FACTURE N°:', 15, 70);
                doc.setTextColor(...orangeColor);
                doc.text(invoice.document_numero || '-', 55, 70);
            }
            
            // Order Number if exists
            if (invoice.document_numero_Order) {
                doc.setFontSize(12);
                doc.setFont(undefined, 'bold');
                doc.setTextColor(0, 0, 0);
                doc.text('N° Order :', 15, 77);
                doc.setTextColor(33, 150, 243);
                doc.setFont(undefined, 'bold');
                doc.text(invoice.document_numero_Order, 42, 77);
            }
        };
        
        // Function to add footer to any page
        const addFooter = (pageNum, totalPages) => {
            doc.setTextColor(0, 0, 0);
            doc.setFontSize(7);
            doc.setFont(undefined, 'normal');
            doc.text('NIF : 25077370  TP : 51200166  R.C : 23181  CNSS : 5679058  ICE : 002036664000051', 15, 275);
            doc.text('R.I.B : 007 720 0005973000000519 74  ATTIJARI WAFA BANQ', 15, 279);
            doc.text('AV, BNI IDDER RUE 14 N°10 COELMA - TÉTOUAN.', 15, 283);
            doc.text('EMAIL: errbahiabderrahim@gmail.com  TEL : 0661307323', 15, 287);
            
            // Page numbering
            if (pageNum && totalPages) {
                doc.setFontSize(8);
                doc.setTextColor(128, 128, 128);
                doc.text(`Page ${pageNum} / ${totalPages}`, 105, 293, { align: 'center' });
            }
        };
        
        // Add header to first page
        addHeader(true);
        
        // Products Table
        const startY = invoice.document_numero_Order ? 85 : 80;
        
        // Table Header - Redesigned with better column widths
        doc.setFillColor(...blueColor);
        doc.rect(15, startY, 180, 8, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(9);
        doc.setFont(undefined, 'bold');
        doc.text('Désignation', 18, startY + 5.5);
        doc.text('QTE', 125, startY + 5.5, { align: 'center' });
        doc.text('PU HT', 160, startY + 5.5, { align: 'right' });
        doc.text('TOTAL HT', 188, startY + 5.5, { align: 'right' });
        
        // Table Body
        let currentY = startY + 10;
        doc.setTextColor(0, 0, 0);
        doc.setFont(undefined, 'normal');
        doc.setFontSize(9);
        
        let pageCount = 1;
        const pages = [];
        
        console.log('=== PDF Generation Started (MRY) ===');
        console.log('Document Type:', invoice.document_type);
        console.log('Initial startY (Page 1):', startY);
        console.log('Continuation pages will use same calculation as Page 1');
        console.log('Has N° Order:', !!invoice.document_numero_Order);
        console.log('Total Products:', invoice.products.length);
        
        invoice.products.forEach((product, index) => {
            // Wrap long text - limit width to prevent overlap with QTE column
            const designation = product.designation || '';
            
            // Width set to 85 to ensure text stays within Désignation column (QTE is at position 125)
            const lines = doc.splitTextToSize(designation, 85);
            
            // Calculate row height based on text lines - each line needs 4.5 units + padding
            const rowHeight = Math.max(8, (lines.length * 4.5) + 4);
            
            // Split very long products across multiple pages if needed
            let remainingLines = [...lines];
            let isFirstPart = true;
            
            while (remainingLines.length > 0) {
                const availableSpace = 250 - currentY;
                
                // If not enough space for even one line, create new page first
                if (availableSpace < 15) {
                    pages.push(pageCount);
                    doc.addPage();
                    addHeader(false);
                    pageCount++;
                    
                    let newStartY = 80;
                    if (invoice.document_numero_Order) {
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
                    continue; // Re-check available space on new page
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
                        doc.text(String(product.quantite || ''), 125, currentY + 3 + centerOffset, { align: 'center' });
                    }
                    
                    doc.setFontSize(7.5);
                    const price = parseFloat(product.prix_unitaire_ht);
                    if (showZeroValues || price !== 0) {
                        doc.text(`${formatNumberForPDF(product.prix_unitaire_ht)} DH`, 160, currentY + 3 + centerOffset, { align: 'right' });
                    }
                    
                    const total = parseFloat(product.total_ht);
                    if (showZeroValues || total !== 0) {
                        doc.text(`${formatNumberForPDF(product.total_ht)} DH`, 188, currentY + 3 + centerOffset, { align: 'right' });
                    }
                }
                
                currentY += partialRowHeight;
                isFirstPart = false;
                
                // If there are more lines and we're near the bottom, create new page
                if (remainingLines.length > 0 && currentY > 230) {
                    pages.push(pageCount);
                    doc.addPage();
                    addHeader(false);
                    pageCount++;
                    
                    let newStartY = 80;
                    if (invoice.document_numero_Order) {
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
        doc.text(`${formatNumberForPDF(invoice.total_ht)} DH`, 192, currentY + 5.5, { align: 'right' });
        
        // MONTANT TVA
        currentY += 8;
        doc.setFillColor(255, 255, 255);
        doc.rect(110, currentY, 85, 8, 'F');
        doc.setFontSize(9);
        doc.text(`MONTANT TVA ${invoice.tva_rate}% :`, 113, currentY + 5.5);
        doc.setFontSize(8);
        doc.text(`${formatNumberForPDF(invoice.montant_tva)} DH`, 192, currentY + 5.5, { align: 'right' });
        
        // MONTANT T.T.C
        currentY += 8;
        doc.setFillColor(173, 216, 230);
        doc.rect(110, currentY, 85, 8, 'F');
        doc.setTextColor(...blueColor);
        doc.setFontSize(9);
        doc.text('MONTANT T.T.C :', 113, currentY + 5.5);
        doc.setFontSize(8.5);
        doc.text(`${formatNumberForPDF(invoice.total_ttc)} DH`, 192, currentY + 5.5, { align: 'right' });
        
        // Amount in words
        currentY += 15;
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(9);
        doc.setFont(undefined, 'italic');
        const amountInWords = numberToFrenchWords(invoice.total_ttc);
        const docTypeText = invoice.document_type === 'facture' ? 'Facture' : 'Devis';
        doc.text(`La Présente ${docTypeText} est Arrêtée à la somme de : ${amountInWords}`, 15, currentY, { maxWidth: 180 });
        
        // Add notes if any
        const noteResult = await window.electron.db.getNote(invoiceId);
        if (noteResult.success && noteResult.data) {
            currentY += 15;
            doc.setFontSize(8);
            doc.setFont(undefined, 'bold');
            doc.setTextColor(96, 125, 139);
            doc.text('Notes:', 15, currentY);
            
            doc.setFont(undefined, 'normal');
            doc.setTextColor(0, 0, 0);
            doc.setFontSize(7.5);
            const noteLines = doc.splitTextToSize(noteResult.data, 180);
            doc.text(noteLines, 15, currentY + 4);
        }
        
        // Add page numbering to all pages
        pages.push(pageCount);
        const totalPages = pages.length;
        
        for (let i = 0; i < totalPages; i++) {
            doc.setPage(i + 1);
            addFooter(i + 1, totalPages);
        }
        
        // Save PDF with appropriate filename
        let filename;
        if (invoice.document_type === 'devis') {
            filename = `Devis_${invoice.document_numero_devis || invoice.id}_${invoice.client_nom}.pdf`;
        } else {
            filename = `Facture_${invoice.document_numero || invoice.id}_${invoice.client_nom}.pdf`;
        }
        doc.save(filename);
        
        window.notify.success('Succès', 'PDF téléchargé avec succès', 3000);
        
    } catch (error) {
        console.error('❌ Error generating PDF:', error);
        window.notify.error('Erreur', 'Impossible de générer le PDF: ' + error.message, 4000);
    }
}

// Download Bon de travaux as PDF (without prices)
window.downloadBonDeTravauxPDF = async function(invoiceId) {
    try {
        console.log('📥 Generating Bon de travaux PDF for invoice:', invoiceId);
        
        // Get invoice data
        const result = await window.electron.db.getInvoiceById(invoiceId);
        
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
                            <button id="excludeZeroBtnBonTravauxMRY" class="custom-modal-btn secondary">
                                ❌ Non, masquer
                            </button>
                            <button id="includeZeroBtnBonTravauxMRY" class="custom-modal-btn primary">
                                ✅ Oui, afficher
                            </button>
                        </div>
                    </div>
                `;
                
                document.body.appendChild(overlay);
                
                const excludeBtn = document.getElementById('excludeZeroBtnBonTravauxMRY');
                const includeBtn = document.getElementById('includeZeroBtnBonTravauxMRY');
                
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
            await loadJsPDF();
        }
        
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        // Colors
        const blueColor = [33, 97, 140];
        const greenColor = [16, 172, 132];
        const purpleColor = [156, 39, 176]; // For "Bon de travaux"
        
        const dateStr = new Date(invoice.document_date).toLocaleDateString('fr-FR');
        
        // Function to add header
        const addHeader = (isFirstPage = true) => {
            // Add Logo
            try {
                const logoImg = document.querySelector('img[src*="mry.png"]') || 
                               document.querySelector('img[data-asset="mry"]') ||
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
            doc.text('MRY TRAV SARL (AU)', 105, 20, { align: 'center' });
            
            doc.setFontSize(10);
            doc.setFont(undefined, 'normal');
            doc.setTextColor(0, 0, 0);
            doc.text('TRAVAUX DIVERS DE CONSTRUCTION', 105, 27, { align: 'center' });
            doc.text('VENTE DE MATERIAUX DE CONSTRUCTION', 105, 32, { align: 'center' });
            doc.text('VENTE DE QUINCAILLERIE & DE DROGUERIE', 105, 37, { align: 'center' });
            
            // Client Info
            doc.setFontSize(11);
            doc.setFont(undefined, 'bold');
            doc.setTextColor(0, 0, 0);
            doc.text('CLIENT :', 15, 50);
            doc.setTextColor(...greenColor);
            doc.text(invoice.client_nom, 40, 50);
            
            doc.setTextColor(0, 0, 0);
            doc.text('ICE :', 15, 57);
            doc.setTextColor(...greenColor);
            doc.text(invoice.client_ice, 40, 57);
            
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
            doc.text('NIF : 25077370  TP : 51200166  R.C : 23181  CNSS : 5679058  ICE : 002036664000051', 15, 275);
            doc.text('R.I.B : 007 720 0005973000000519 74  ATTIJARI WAFA BANQ', 15, 279);
            doc.text('AV, BNI IDDER RUE 14 N°10 COELMA - TÉTOUAN.', 15, 283);
            doc.text('EMAIL: errbahiabderrahim@gmail.com  TEL : 0661307323', 15, 287);
            
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
        doc.text('QTE', 125, startY + 5.5, { align: 'center' });
        doc.text('Prix unitaire HT', 160, startY + 5.5, { align: 'right' });
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
            
            const lines = doc.splitTextToSize(designation, 85);
            
            // Calculate row height based on text lines - each line needs 4.5 units + padding
            const rowHeight = Math.max(8, (lines.length * 4.5) + 4);
            
            // Check if we need a new page
            if (currentY + rowHeight > 220) {
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
                doc.text('QTE', 125, startY + 5.5, { align: 'center' });
                doc.text('Prix unitaire HT', 160, startY + 5.5, { align: 'right' });
                doc.text('Prix total HT', 188, startY + 5.5, { align: 'right' });
                
                currentY = startY + 10;
                doc.setTextColor(0, 0, 0);
                doc.setFont(undefined, 'normal');
                doc.setFontSize(9);
            }
            
            // Alternate row colors
            if (index % 2 === 0) {
                doc.setFillColor(245, 245, 245);
                doc.rect(15, currentY - 3, 180, rowHeight, 'F');
            }
            
            doc.setFontSize(8);
            // Draw each line separately
            lines.forEach((line, lineIndex) => {
                doc.text(line, 18, currentY + 3 + (lineIndex * 4.5));
            });
            
            // Center vertically for multi-line products
            const centerOffset = (lines.length > 1) ? ((lines.length - 1) * 2.25) : 0;
            
            // Show quantity only if it's not zero OR if user chose to show zero values
            const qty = parseFloat(product.quantite);
            if (showZeroValues || qty !== 0) {
                doc.text(String(product.quantite || ''), 125, currentY + 3 + centerOffset, { align: 'center' });
            }
            
            doc.setFontSize(7.5);
            // Show price only if it's not zero OR if user chose to show zero values
            const price = parseFloat(product.prix_unitaire_ht);
            if (showZeroValues || price !== 0) {
                doc.text(`${formatNumberForPDF(product.prix_unitaire_ht)} DH`, 160, currentY + 3 + centerOffset, { align: 'right' });
            }
            
            // Show total only if it's not zero OR if user chose to show zero values
            const total = parseFloat(product.total_ht);
            if (showZeroValues || total !== 0) {
                doc.text(`${formatNumberForPDF(product.total_ht)} DH`, 188, currentY + 3 + centerOffset, { align: 'right' });
            }
            
            currentY += rowHeight;
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
        const docNumero = invoice.document_numero || invoice.document_numero_devis || 'N';
        const filename = `Bon_de_travaux_${docNumero}_${invoice.client_nom}.pdf`;
        doc.save(filename);
        
        window.notify.success('Succès', 'Bon de travaux téléchargé avec succès', 3000);
        
    } catch (error) {
        console.error('❌ Error generating Bon de travaux PDF:', error);
        window.notify.error('Erreur', 'Impossible de générer le PDF: ' + error.message, 4000);
    }
}

// Convert number to French words
function numberToFrenchWords(number) {
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
    
    let result = convertNumber(dirhams) + ' dirham';
    if (dirhams > 1) result += 's';
    
    if (centimes > 0) {
        result += ' et ' + convertNumber(centimes) + ' centime';
        if (centimes > 1) result += 's';
    } else {
        result += ' et zéro centime';
    }
    
    return result.charAt(0).toUpperCase() + result.slice(1);
}

// Load jsPDF library
async function loadJsPDF() {
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

// Show bulk download modal
window.showBulkDownloadModal = function() {
    const checkedBoxes = document.querySelectorAll('.invoice-checkbox:checked');
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
                
                <label class="org-option" onclick="selectOrganization(this, 'client-month-type')">
                    <input type="radio" name="organization" value="client-month-type">
                    <div class="org-option-content">
                        <strong style="color:#fff;display:block;margin-bottom:0.25rem;">Par Client → Mois → Type</strong>
                        <div style="color:#999;font-size:0.85rem;">📁 Client_Ahmed/ → 📁 2025-10/ → 📁 Facture/ → 📄 Facture_548.pdf</div>
                    </div>
                </label>
                
                <label class="org-option" onclick="selectOrganization(this, 'client-type-month')">
                    <input type="radio" name="organization" value="client-type-month">
                    <div class="org-option-content">
                        <strong style="color:#fff;display:block;margin-bottom:0.25rem;">Par Client → Type → Mois</strong>
                        <div style="color:#999;font-size:0.85rem;">📁 Client_Ahmed/ → 📁 Facture/ → 📁 2025-10/ → 📄 Facture_548.pdf</div>
                    </div>
                </label>
                
                <label class="org-option" onclick="selectOrganization(this, 'type-month-client')">
                    <input type="radio" name="organization" value="type-month-client">
                    <div class="org-option-content">
                        <strong style="color:#fff;display:block;margin-bottom:0.25rem;">Par Type → Mois → Client</strong>
                        <div style="color:#999;font-size:0.85rem;">📁 Facture/ → 📁 2025-10/ → 📁 Client_Ahmed/ → 📄 Facture_548.pdf</div>
                    </div>
                </label>
                
                <label class="org-option" onclick="selectOrganization(this, 'type-client-month')">
                    <input type="radio" name="organization" value="type-client-month">
                    <div class="org-option-content">
                        <strong style="color:#fff;display:block;margin-bottom:0.25rem;">Par Type → Client → Mois</strong>
                        <div style="color:#999;font-size:0.85rem;">📁 Facture/ → 📁 Client_Ahmed/ → 📁 2025-10/ → 📄 Facture_548.pdf</div>
                    </div>
                </label>
                
                <label class="org-option" onclick="selectOrganization(this, 'month-type-client')">
                    <input type="radio" name="organization" value="month-type-client">
                    <div class="org-option-content">
                        <strong style="color:#fff;display:block;margin-bottom:0.25rem;">Par Mois → Type → Client</strong>
                        <div style="color:#999;font-size:0.85rem;">📁 2025-10/ → 📁 Facture/ → 📁 Client_Ahmed/ → 📄 Facture_548.pdf</div>
                    </div>
                </label>
                
                <label class="org-option" onclick="selectOrganization(this, 'month-client-type')">
                    <input type="radio" name="organization" value="month-client-type">
                    <div class="org-option-content">
                        <strong style="color:#fff;display:block;margin-bottom:0.25rem;">Par Mois → Client → Type</strong>
                        <div style="color:#999;font-size:0.85rem;">📁 2025-10/ → 📁 Client_Ahmed/ → 📁 Facture/ → 📄 Facture_548.pdf</div>
                    </div>
                </label>
                
                <label class="org-option" onclick="selectOrganization(this, 'flat')">
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
                <button id="bulkDownloadConfirmBtn"
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
    document.getElementById('bulkDownloadConfirmBtn').onclick = () => {
        const organizationType = document.querySelector('input[name="organization"]:checked').value;
        overlay.remove();
        showOrderSelectionModalBeforeDownloadMRY(selectedIds, organizationType);
    };
};

// Select organization option
window.selectOrganization = function(element, value) {
    document.querySelectorAll('.org-option').forEach(opt => opt.classList.remove('selected'));
    element.classList.add('selected');
    element.querySelector('input').checked = true;
};

// Show Order selection modal before download for MRY
window.showOrderSelectionModalBeforeDownloadMRY = function(selectedIds, organizationType) {
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
                <label style="display:flex;align-items:center;cursor:pointer;padding:1rem;background:#1e1e1e;border:2px solid #2196F3;border-radius:10px;transition:all 0.2s ease;">
                    <input type="checkbox" id="includeOrderCheckboxDownloadMRY" checked style="width:20px;height:20px;margin-right:1rem;cursor:pointer;accent-color:#2196F3;">
                    <span style="font-size:0.95rem;color:#e0e0e0;font-weight:500;">
                        Afficher les N° Order dans les PDFs
                    </span>
                </label>
            </div>
            <div class="custom-modal-footer">
                <button class="custom-modal-btn primary" id="continueBtnDownloadMRY" style="padding:0.75rem 2rem;font-size:1rem;">Télécharger</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(selectionOverlay);
    
    const orderCheckbox = selectionOverlay.querySelector('#includeOrderCheckboxDownloadMRY');
    const continueBtn = selectionOverlay.querySelector('#continueBtnDownloadMRY');
    
    continueBtn.addEventListener('click', async () => {
        const includeOrder = orderCheckbox.checked;
        
        console.log('✅ [MRY DOWNLOAD] Include Order:', includeOrder);
        
        selectionOverlay.remove();
        
        await startBulkDownload(selectedIds, organizationType, includeOrder);
    });
    
    selectionOverlay.addEventListener('click', (e) => {
        if (e.target === selectionOverlay) {
            const includeOrder = orderCheckbox.checked;
            selectionOverlay.remove();
            startBulkDownload(selectedIds, organizationType, includeOrder);
        }
    });
    
    setTimeout(() => continueBtn.focus(), 100);
};

// Load JSZip library
async function loadJSZip() {
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
window.startBulkDownload = async function(selectedIds, organizationType, includeOrder = true) {
    try {
        
        // Close modal
        document.querySelector('.modal-overlay')?.remove();
        
        // Show progress notification
        window.notify.info('Téléchargement', `Génération de ${selectedIds.length} PDF(s)...`, 10000);
        
        // Get all selected invoices data
        const invoicesData = [];
        for (const id of selectedIds) {
            const result = await window.electron.db.getInvoiceById(id);
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
            await loadJsPDF();
        }
        await loadJSZip();
        
        // Create ZIP file
        const zip = new JSZip();
        const timestamp = new Date().toISOString().split('T')[0];
        const folderName = `Factures_Export_${timestamp}`;
        
        // Generate all PDFs and add to ZIP
        let successCount = 0;
        
        for (const invoice of invoicesData) {
            try {
                const pdfBlob = await generateSinglePDFBlob(invoice, organizationType, folderName, includeOrder);
                
                // Organize in folders based on type
                const invoiceDate = new Date(invoice.document_date);
                const yearMonth = `${invoiceDate.getFullYear()}-${String(invoiceDate.getMonth() + 1).padStart(2, '0')}`;
                const clientName = invoice.client_nom.replace(/[^a-zA-Z0-9]/g, '_');
                const numero = (invoice.document_numero || invoice.document_numero_devis || invoice.id).replace(/\//g, '_');
                
                // Determine document type folder
                const docType = invoice.document_type === 'facture' ? 'Factures' : 'Devis';
                const docPrefix = invoice.document_type === 'facture' ? 'Facture' : 'Devis';
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
        document.querySelectorAll('.invoice-checkbox').forEach(cb => cb.checked = false);
        document.getElementById('selectAllInvoices').checked = false;
        updateSelectedCount();
        
    } catch (error) {
        console.error('Error in bulk download:', error);
        window.notify.error('Erreur', 'Erreur lors du téléchargement: ' + error.message, 5000);
    }
};

// Generate single PDF as Blob (for ZIP)
async function generateSinglePDFBlob(invoice, organizationType, folderName, includeOrder = true) {
    // This will use the same PDF generation logic as downloadInvoicePDF
    // but with custom filename based on organization type and includeOrder parameter
    
    // For bulk PDF, always hide zero values (no prompt)
    const showZeroValues = false;
    
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Colors
    const blueColor = [33, 97, 140];
    const greenColor = [16, 172, 132];
    const orangeColor = [255, 152, 0];
    const dateStr = new Date(invoice.document_date).toLocaleDateString('fr-FR');
    
    // Add header function (same as before)
    const addHeader = () => {
        try {
            const logoImg = document.querySelector('img[src*="mry.png"]') || 
                           document.querySelector('img[data-asset="mry"]') ||
                           document.querySelector('img[src^="data:image"]');
            if (logoImg && logoImg.src && logoImg.src.startsWith('data:')) {
                doc.addImage(logoImg.src, 'PNG', 15, 10, 35, 35);
            }
        } catch (error) {}
        
        doc.setFontSize(18);
        doc.setTextColor(...blueColor);
        doc.setFont(undefined, 'bold');
        doc.text('MRY TRAV SARL (AU)', 105, 20, { align: 'center' });
        
        doc.setFontSize(10);
        doc.setFont(undefined, 'normal');
        doc.setTextColor(0, 0, 0);
        doc.text('TRAVAUX DIVERS DE CONSTRUCTION', 105, 27, { align: 'center' });
        doc.text('VENTE DE MATERIAUX DE CONSTRUCTION', 105, 32, { align: 'center' });
        doc.text('VENTE DE QUINCAILLERIE & DE DROGUERIE', 105, 37, { align: 'center' });
        
        doc.setFontSize(11);
        doc.setFont(undefined, 'bold');
        doc.text('CLIENT :', 15, 50);
        doc.setTextColor(...greenColor);
        doc.text(invoice.client_nom, 40, 50);
        
        doc.setTextColor(0, 0, 0);
        doc.text('ICE :', 15, 57);
        doc.setTextColor(...greenColor);
        doc.text(invoice.client_ice, 40, 57);
        
        doc.setTextColor(0, 0, 0);
        doc.text(`Date: ${dateStr}`, 150, 50);
        
        doc.setFontSize(14);
        doc.setFont(undefined, 'bold');
        
        // Show correct label based on document type
        const docLabel = invoice.document_type === 'devis' ? 'DEVIS N°:' : 'FACTURE N°:';
        const docNumero = invoice.document_type === 'devis' 
            ? (invoice.document_numero_devis || invoice.document_numero || '-')
            : (invoice.document_numero || invoice.document_numero_devis || '-');
        
        doc.text(docLabel, 15, 70);
        doc.setTextColor(...orangeColor);
        doc.text(docNumero, 55, 70);
        
        if (includeOrder && invoice.document_numero_Order) {
            doc.setFontSize(12);
            doc.setFont(undefined, 'bold');
            doc.setTextColor(0, 0, 0);
            doc.text('N° Order :', 15, 77);
            doc.setTextColor(33, 150, 243);
            doc.text(invoice.document_numero_Order, 42, 77);
        }
    };
    
    const addFooter = () => {
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(7);
        doc.setFont(undefined, 'normal');
        doc.text('NIF : 25077370  TP : 51200166  R.C : 23181  CNSS : 5679058  ICE : 002036664000051', 15, 280);
        doc.text('R.I.B : 007 720 0005973000000519 74  ATTIJARI WAFA BANQ', 15, 284);
        doc.text('AV, BNI IDDER RUE 14 N°10 COELMA - TÉTOUAN.', 15, 288);
        doc.text('EMAIL: errbahiabderrahim@gmail.com  TEL : 0661307323', 15, 292);
    };
    
    addHeader();
    
    // Add products table (simplified version)
    const startY = (includeOrder && invoice.document_numero_Order) ? 85 : 80;
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
    
    let pageCount = 0;
    
    invoice.products.forEach((product, index) => {
        const designation = product.designation || '';
        const lines = doc.splitTextToSize(designation, 85);
        const rowHeight = Math.max(8, (lines.length * 4.5) + 4);
        
        if (currentY + rowHeight > 250) {
            addFooter();
            doc.addPage();
            addHeader();
            pageCount++;
            
            // Re-draw table header on new page
            let newStartY = 80;
            if (invoice.document_numero_Order) newStartY += 7;
            
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
        
        if (index % 2 === 0) {
            doc.setFillColor(245, 245, 245);
            doc.rect(15, currentY - 3, 180, rowHeight, 'F');
        }
        
        doc.setFontSize(8);
        // Draw each line separately with proper spacing - show full text
        lines.forEach((line, lineIndex) => {
            doc.text(line, 18, currentY + 3 + (lineIndex * 4.5));
        });
        
        // Center vertically for multi-line products
        const centerOffset = (lines.length > 1) ? ((lines.length - 1) * 2.25) : 0;
        
        // Show quantity only if it's not zero (bulk PDF always shows all values)
        const qty = parseFloat(product.quantite);
        if (qty !== 0) {
            doc.text(String(product.quantite || ''), 125, currentY + 3 + centerOffset, { align: 'center' });
        }
        
        doc.setFontSize(7.5);
        // Show price only if it's not zero
        const price = parseFloat(product.prix_unitaire_ht);
        if (price !== 0) {
            doc.text(`${formatNumberForPDF(product.prix_unitaire_ht)} DH`, 160, currentY + 3 + centerOffset, { align: 'right' });
        }
        
        // Show total only if it's not zero
        const total = parseFloat(product.total_ht);
        if (total !== 0) {
            doc.text(`${formatNumberForPDF(product.total_ht)} DH`, 188, currentY + 3 + centerOffset, { align: 'right' });
        }
        
        currentY += rowHeight;
    });
    
    // Add totals
    currentY += 10;
    
    doc.setFillColor(245, 245, 245);
    doc.rect(110, currentY, 85, 8, 'F');
    doc.setFont(undefined, 'bold');
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(9);
    doc.text('TOTAL HT :', 113, currentY + 5.5);
    doc.setFontSize(8);
    doc.text(`${formatNumberForPDF(invoice.total_ht)} DH`, 192, currentY + 5.5, { align: 'right' });
    
    currentY += 8;
    doc.setFillColor(255, 255, 255);
    doc.rect(110, currentY, 85, 8, 'F');
    doc.setFontSize(9);
    doc.text(`MONTANT TVA ${invoice.tva_rate}% :`, 113, currentY + 5.5);
    doc.setFontSize(8);
    doc.text(`${formatNumberForPDF(invoice.montant_tva)} DH`, 192, currentY + 5.5, { align: 'right' });
    
    currentY += 8;
    doc.setFillColor(173, 216, 230);
    doc.rect(110, currentY, 85, 8, 'F');
    doc.setTextColor(...blueColor);
    doc.setFontSize(9);
    doc.text('MONTANT T.T.C :', 113, currentY + 5.5);
    doc.setFontSize(8.5);
    doc.text(`${formatNumberForPDF(invoice.total_ttc)} DH`, 192, currentY + 5.5, { align: 'right' });
    
    currentY += 15;
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(9);
    doc.setFont(undefined, 'italic');
    const amountInWords = numberToFrenchWords(invoice.total_ttc);
    const docTypeText = invoice.document_type === 'facture' ? 'Facture' : 'Devis';
    doc.text(`La Présente ${docTypeText} est Arrêtée à la somme de : ${amountInWords}`, 15, currentY, { maxWidth: 180 });
    
    // Add notes if invoice has an id (for bulk download, notes might not be loaded)
    if (invoice.id) {
        try {
            const noteResult = await window.electron.db.getNote(invoice.id);
            if (noteResult.success && noteResult.data) {
                currentY += 15;
                doc.setFontSize(8);
                doc.setFont(undefined, 'bold');
                doc.setTextColor(96, 125, 139);
                doc.text('Notes:', 15, currentY);
                
                doc.setFont(undefined, 'normal');
                doc.setTextColor(0, 0, 0);
                doc.setFontSize(7.5);
                const noteLines = doc.splitTextToSize(noteResult.data, 180);
                doc.text(noteLines, 15, currentY + 4);
            }
        } catch (error) {
            console.log('Note not loaded for bulk PDF:', error);
        }
    }
    
    addFooter();
    
    // Return PDF as Blob instead of downloading
    return doc.output('blob');
};

// Update selected invoices count
function updateSelectedCount() {
    const checkboxes = document.querySelectorAll('.invoice-checkbox:checked');
    const count = checkboxes.length;
    const selectedCountSpan = document.getElementById('selectedCount');
    const selectedDeleteCountSpan = document.getElementById('selectedDeleteCount');
    const bulkDownloadBtn = document.getElementById('bulkDownloadBtn');
    const bulkDeleteBtn = document.getElementById('bulkDeleteBtnMRY');
    
    if (selectedCountSpan) selectedCountSpan.textContent = count;
    if (selectedDeleteCountSpan) selectedDeleteCountSpan.textContent = count;
    if (bulkDownloadBtn) {
        bulkDownloadBtn.style.display = count > 0 ? 'block' : 'none';
    }
    if (bulkDeleteBtn) {
        bulkDeleteBtn.style.display = count > 0 ? 'block' : 'none';
    }
}

// Select/Deselect all invoices
document.addEventListener('change', (e) => {
    if (e.target.id === 'selectAllInvoices') {
        const checkboxes = document.querySelectorAll('.invoice-checkbox');
        checkboxes.forEach(cb => cb.checked = e.target.checked);
        updateSelectedCount();
    } else if (e.target.classList.contains('invoice-checkbox')) {
        updateSelectedCount();
        
        // Update "select all" checkbox
        const allCheckboxes = document.querySelectorAll('.invoice-checkbox');
        const checkedCheckboxes = document.querySelectorAll('.invoice-checkbox:checked');
        const selectAllCheckbox = document.getElementById('selectAllInvoices');
        if (selectAllCheckbox) {
            selectAllCheckbox.checked = allCheckboxes.length === checkedCheckboxes.length && allCheckboxes.length > 0;
        }
    }
});

// Export database
window.exportDatabaseMRY = async function() {
    try {
        window.notify.info('Export', 'Exportation en cours...', 2000);
        const result = await window.electron.db.exportDatabase();
        
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
window.importDatabaseMRY = async function() {
    const confirmed = await customConfirm('Attention', '⚠️ ATTENTION: L\'importation remplacera toutes les données actuelles.\n\nUne sauvegarde automatique sera créée.\n\nVoulez-vous continuer?', 'warning');
    
    if (!confirmed) return;
    
    try {
        window.notify.info('Import', 'Importation en cours...', 2000);
        const result = await window.electron.db.importDatabase();
        
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

// Handle bulk delete for MRY
window.handleBulkDeleteMRY = async function() {
    const checkedBoxes = document.querySelectorAll('.invoice-checkbox:checked');
    
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
                <div id="deleteProgressBarMRY" style="background:linear-gradient(90deg, #f44336, #e91e63);height:100%;width:0%;transition:width 0.3s;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:600;font-size:0.9rem;"></div>
            </div>
            <p id="deleteProgressTextMRY" style="color:#aaa;margin:0 0 1rem 0;text-align:center;font-size:0.95rem;">Préparation...</p>
            <div style="text-align:center;">
                <button id="cancelDeleteBtnMRY" style="padding:0.75rem 1.5rem;background:#ff9800;color:#fff;border:none;border-radius:6px;cursor:pointer;font-weight:600;font-size:0.95rem;transition:all 0.3s;" onmouseover="this.style.background='#f57c00'" onmouseout="this.style.background='#ff9800'">
                    ⚠️ Annuler
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(progressOverlay);
    
    const progressBar = document.getElementById('deleteProgressBarMRY');
    const progressText = document.getElementById('deleteProgressTextMRY');
    const cancelBtn = document.getElementById('cancelDeleteBtnMRY');
    
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
        
        const selectedInvoices = Array.from(checkedBoxes).map(cb => parseInt(cb.dataset.invoiceId));
        const total = selectedInvoices.length;
        
        // Delete each invoice
        for (let i = 0; i < selectedInvoices.length; i++) {
            // Check if cancel was requested
            if (cancelRequested) {
                progressText.textContent = `Annulé après ${successCount} suppression(s)`;
                await new Promise(resolve => setTimeout(resolve, 1500));
                break;
            }
            
            const invoiceId = selectedInvoices[i];
            
            try {
                const result = await window.electron.db.deleteInvoice(invoiceId);
                
                if (result.success) {
                    successCount++;
                } else {
                    errorCount++;
                }
            } catch (error) {
                console.error(`Error deleting invoice ${invoiceId}:`, error);
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
            loadInvoices();
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

// Initialize page
window.initInvoicesListMRYPage = function() {
    console.log('🔄 Initializing invoices list page...');
    
    // Get selected year from session or localStorage
    const sessionYear = sessionStorage.getItem('mry_current_year');
    const savedYear = localStorage.getItem('mry_selected_year');
    const rememberYear = localStorage.getItem('mry_remember_year');
    
    // Use session year first, then saved year if remember is enabled
    let selectedYear = '';
    if (sessionYear) {
        selectedYear = sessionYear;
    } else if (rememberYear === 'true' && savedYear) {
        selectedYear = savedYear;
    }
    
    // Update year display button
    setTimeout(() => {
        const yearDisplay = document.getElementById('currentYearDisplayMRY');
        if (yearDisplay) {
            yearDisplay.textContent = selectedYear ? `Année ${selectedYear}` : 'Toutes';
        }
    }, 100);
    
    setTimeout(() => {
        loadInvoices();
    }, 100);
};