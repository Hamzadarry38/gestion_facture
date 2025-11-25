// Global Invoices List Page - Chaimae Company
function GlobalInvoicesListChaimaePage() {
    return `
        <div class="desktop-app">
            <div class="window-header">
                <div class="window-title">
                    <img src="assets/logos/chaimae.png" class="header-logo" alt="Chaimae Company" data-asset="assets/logos/chaimae.png">
                    <span>Chaimae Company - Factures Globales</span>
                </div>
                <div class="window-controls">
                    <button class="control-btn minimize">─</button>
                    <button class="control-btn maximize">□</button>
                    <button class="control-btn close">✕</button>
                </div>
            </div>

            <div class="window-content" style="padding: 2rem;">
                <!-- Header Actions -->
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
                    <h1 style="color: #fff; margin: 0; font-size: 1.75rem;">📋 Factures Globales</h1>
                    <div style="display: flex; gap: 1rem;">
                        <button onclick="router.navigate('/dashboard-chaimae')" 
                                style="padding: 0.75rem 1.5rem; background: #3e3e42; color: #fff; border: none; border-radius: 8px; cursor: pointer; font-size: 1rem; transition: all 0.3s;"
                                onmouseover="this.style.background='#4e4e52'" onmouseout="this.style.background='#3e3e42'">
                            ← Retour
                        </button>
                        <button onclick="router.navigate('/create-global-invoice-chaimae')" 
                                style="padding: 0.75rem 1.5rem; background: #2196f3; color: #fff; border: none; border-radius: 8px; cursor: pointer; font-size: 1rem; font-weight: 600; transition: all 0.3s;"
                                onmouseover="this.style.background='#1976d2'" onmouseout="this.style.background='#2196f3'">
                            + Nouvelle Facture Globale
                        </button>
                    </div>
                </div>

                <!-- Filters -->
                <div style="background: #2d2d30; border-radius: 12px; padding: 1.5rem; margin-bottom: 2rem;">
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
                        <div>
                            <label style="display: block; color: #999; margin-bottom: 0.5rem; font-size: 0.9rem;">Année</label>
                            <select id="filterYearGlobalInvoices" onchange="filterGlobalInvoices()" 
                                    style="width: 100%; padding: 0.75rem; background: #3e3e42; border: 1px solid #555; color: #fff; border-radius: 8px; cursor: pointer;">
                                <option value="">Toutes les années</option>
                            </select>
                        </div>
                        <div>
                            <label style="display: block; color: #999; margin-bottom: 0.5rem; font-size: 0.9rem;">Mois</label>
                            <select id="filterMonthGlobalInvoices" onchange="filterGlobalInvoices()" 
                                    style="width: 100%; padding: 0.75rem; background: #3e3e42; border: 1px solid #555; color: #fff; border-radius: 8px; cursor: pointer;">
                                <option value="">Tous les mois</option>
                                <option value="1">Janvier</option>
                                <option value="2">Février</option>
                                <option value="3">Mars</option>
                                <option value="4">Avril</option>
                                <option value="5">Mai</option>
                                <option value="6">Juin</option>
                                <option value="7">Juillet</option>
                                <option value="8">Août</option>
                                <option value="9">Septembre</option>
                                <option value="10">Octobre</option>
                                <option value="11">Novembre</option>
                                <option value="12">Décembre</option>
                            </select>
                        </div>
                        <div>
                            <label style="display: block; color: #999; margin-bottom: 0.5rem; font-size: 0.9rem;">Client</label>
                            <select id="filterClientGlobalInvoices" onchange="filterGlobalInvoices()" 
                                    style="width: 100%; padding: 0.75rem; background: #3e3e42; border: 1px solid #555; color: #fff; border-radius: 8px; cursor: pointer;">
                                <option value="">Tous les clients</option>
                            </select>
                        </div>
                        <div>
                            <label style="display: block; color: #999; margin-bottom: 0.5rem; font-size: 0.9rem;">Recherche</label>
                            <input type="text" id="searchGlobalInvoices" placeholder="Rechercher..." onkeyup="filterGlobalInvoices()"
                                   style="width: 100%; padding: 0.75rem; background: #3e3e42; border: 1px solid #555; color: #fff; border-radius: 8px;">
                        </div>
                    </div>
                </div>

                <!-- Bulk Actions -->
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                    <div id="resultsCounterGlobalInvoices" style="color: #999; font-size: 0.9rem;"></div>
                    <div style="display: flex; gap: 1rem; align-items: center;">
                        <label style="display: flex; align-items: center; gap: 0.5rem; color: #ccc; cursor: pointer;">
                            <input type="checkbox" id="selectAllGlobalInvoices" style="width: 18px; height: 18px; cursor: pointer;">
                            <span>Sélectionner tout</span>
                        </label>
                        <button id="bulkDeleteBtnGlobal" onclick="handleBulkDeleteGlobal()" 
                                style="padding: 0.75rem 1.5rem; background: #f44336; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 0.95rem; transition: all 0.3s; display: flex; align-items: center; gap: 0.5rem;"
                                onmouseover="this.style.background='#d32f2f'" onmouseout="this.style.background='#f44336'">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                            </svg>
                            Supprimer
                        </button>
                    </div>
                </div>

                <!-- Loading Spinner -->
                <div id="loadingSpinnerGlobalInvoices" style="text-align: center; padding: 3rem; display: none;">
                    <div style="display: inline-block; width: 50px; height: 50px; border: 4px solid #3e3e42; border-top-color: #2196f3; border-radius: 50%; animation: spin 1s linear infinite;"></div>
                    <p style="color: #999; margin-top: 1rem;">Chargement...</p>
                </div>

                <!-- Invoices Table -->
                <div id="globalInvoicesTableContainer" style="background: #2d2d30; border-radius: 12px; overflow: hidden;">
                    <table style="width: 100%; border-collapse: collapse;">
                        <thead>
                            <tr style="background: #1e1e1e; border-bottom: 2px solid #3e3e42;">
                                <th style="text-align: center; padding: 1rem; color: #2196f3; font-weight: 600; width: 50px;">☑</th>
                                <th style="text-align: center; padding: 1rem; color: #2196f3; font-weight: 600;">#</th>
                                <th style="padding: 1rem; color: #2196f3; font-weight: 600;">N° Facture</th>
                                <th style="padding: 1rem; color: #2196f3; font-weight: 600;">Client</th>
                                <th style="padding: 1rem; color: #2196f3; font-weight: 600;">Date</th>
                                <th style="padding: 1rem; color: #2196f3; font-weight: 600;">Nb. BL</th>
                                <th style="padding: 1rem; color: #2196f3; font-weight: 600;">Total TTC</th>
                                <th style="text-align: center; padding: 1rem; color: #2196f3; font-weight: 600;">Actions</th>
                            </tr>
                        </thead>
                        <tbody id="globalInvoicesTableBody">
                        </tbody>
                    </table>
                </div>

                <!-- Empty State -->
                <div id="emptyStateGlobalInvoices" style="display: none; text-align: center; padding: 4rem; color: #999;">
                    <div style="font-size: 4rem; margin-bottom: 1rem;">📋</div>
                    <h3 style="color: #cccccc; margin-bottom: 0.5rem;">Aucune facture globale</h3>
                    <p>Créez votre première facture globale pour commencer</p>
                    <button onclick="router.navigate('/create-global-invoice-chaimae')" 
                            style="margin-top: 1.5rem; padding: 0.75rem 1.5rem; background: #2196f3; color: #fff; border: none; border-radius: 8px; cursor: pointer; font-size: 1rem; font-weight: 600;">
                        + Créer une Facture Globale
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Global variables
let allGlobalInvoices = [];
let filteredGlobalInvoices = [];

// Initialize page
window.initGlobalInvoicesListChaimaePage = async function() {
    console.log('🔄 Initializing global invoices list page for Chaimae...');
    await loadGlobalInvoices();
}

// Load all global invoices
async function loadGlobalInvoices() {
    try {
        document.getElementById('loadingSpinnerGlobalInvoices').style.display = 'block';
        document.getElementById('globalInvoicesTableContainer').style.display = 'none';
        document.getElementById('emptyStateGlobalInvoices').style.display = 'none';
        
        const result = await window.electron.dbChaimae.getAllGlobalInvoices();
        
        if (result.success) {
            allGlobalInvoices = result.data;
            
            // Sort all invoices by document number (ascending - smallest to largest)
            allGlobalInvoices.sort((a, b) => {
                const getNumero = (invoice) => {
                    const numero = invoice.document_numero || '0';
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
            
            // Populate year filter
            const years = [...new Set(allGlobalInvoices.map(inv => new Date(inv.document_date).getFullYear()))].sort((a, b) => b - a);
            const yearFilter = document.getElementById('filterYearGlobalInvoices');
            yearFilter.innerHTML = '<option value="">Toutes les années</option>' + 
                years.map(year => `<option value="${year}">${year}</option>`).join('');
            
            // Populate client filter
            const clients = [...new Set(allGlobalInvoices.map(inv => inv.client_nom))].sort();
            const clientFilter = document.getElementById('filterClientGlobalInvoices');
            clientFilter.innerHTML = '<option value="">Tous les clients</option>' + 
                clients.map(client => `<option value="${client}">${client}</option>`).join('');
            
            filterGlobalInvoices();
        }
        
        document.getElementById('loadingSpinnerGlobalInvoices').style.display = 'none';
        
    } catch (error) {
        console.error('Error loading global invoices:', error);
        document.getElementById('loadingSpinnerGlobalInvoices').style.display = 'none';
        window.notify.error('Erreur', 'Erreur lors du chargement des factures globales', 3000);
    }
}

// Filter global invoices
window.filterGlobalInvoices = function() {
    const yearFilter = document.getElementById('filterYearGlobalInvoices').value;
    const monthFilter = document.getElementById('filterMonthGlobalInvoices').value;
    const clientFilter = document.getElementById('filterClientGlobalInvoices').value;
    const searchText = document.getElementById('searchGlobalInvoices').value.toLowerCase();
    
    filteredGlobalInvoices = allGlobalInvoices.filter(invoice => {
        const invoiceDate = new Date(invoice.document_date);
        const invoiceYear = invoiceDate.getFullYear().toString();
        const invoiceMonth = (invoiceDate.getMonth() + 1).toString();
        
        // Year filter
        if (yearFilter && invoiceYear !== yearFilter) return false;
        
        // Month filter
        if (monthFilter && invoiceMonth !== monthFilter) return false;
        
        // Client filter
        if (clientFilter && invoice.client_nom !== clientFilter) return false;
        
        // Search filter
        if (searchText) {
            const numero = (invoice.document_numero || '').toLowerCase();
            const client = invoice.client_nom.toLowerCase();
            const ice = (invoice.client_ice || '').toLowerCase();
            
            if (!numero.includes(searchText) && !client.includes(searchText) && !ice.includes(searchText)) {
                return false;
            }
        }
        
        return true;
    });
    
    // Sort by document number (ascending - smallest to largest)
    filteredGlobalInvoices.sort((a, b) => {
        const getNumero = (invoice) => {
            const numero = invoice.document_numero || '0';
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
    
    displayGlobalInvoices();
}

// Display global invoices
function displayGlobalInvoices() {
    console.log('🎨 [DISPLAY] displayGlobalInvoices function called');
    console.log('📊 [DATA] Number of invoices to display:', filteredGlobalInvoices.length);
    
    const tbody = document.getElementById('globalInvoicesTableBody');
    const counter = document.getElementById('resultsCounterGlobalInvoices');
    const tableContainer = document.getElementById('globalInvoicesTableContainer');
    const emptyState = document.getElementById('emptyStateGlobalInvoices');
    
    if (filteredGlobalInvoices.length === 0) {
        tableContainer.style.display = 'none';
        emptyState.style.display = 'block';
        counter.textContent = '';
        console.log('⚠️ [DISPLAY] No invoices to display');
        return;
    }
    
    tableContainer.style.display = 'block';
    emptyState.style.display = 'none';
    counter.textContent = `${filteredGlobalInvoices.length} facture(s) globale(s) trouvée(s)`;
    
    console.log('✅ [DISPLAY] Table will be rendered with', filteredGlobalInvoices.length, 'invoices');
    
    console.log('🔘 [BUTTONS] Buttons rendered with onclick handlers');
    
    tbody.innerHTML = filteredGlobalInvoices.map((invoice, index) => {
        const date = new Date(invoice.document_date).toLocaleDateString('fr-FR');
        
        console.log(`📋 [INVOICE ${index + 1}] Rendering invoice #${invoice.id}`);
        console.log('📊 Global Invoice:', {
            id: invoice.id,
            has_bons: !!invoice.bons,
            bons_count: invoice.bons ? invoice.bons.length : 0,
            stored_total: invoice.total_ttc
        });
        console.log('🔘 [BUTTONS] Creating 5 buttons for invoice #' + invoice.id);
        
        // Calculate total dynamically from bons
        let calculatedTotalTTC = 0;
        if (invoice.bons && invoice.bons.length > 0) {
            invoice.bons.forEach(bon => {
                calculatedTotalTTC += parseFloat(bon.total_ttc) || 0;
            });
        } else {
            // Fallback to stored value if no bons data
            calculatedTotalTTC = parseFloat(invoice.total_ttc) || 0;
        }
        
        console.log('📊 Calculated Total TTC:', calculatedTotalTTC);
        
        const totalTTC = formatNumberGlobalList(calculatedTotalTTC);
        
        return `
            <tr style="background: #2d2d30; border-top: 1px solid #3e3e42; border-bottom: 1px solid #3e3e42;">
                <td style="text-align: center; padding: 1rem 0.75rem; border-right: 1px solid #3e3e42;">
                    <input type="checkbox" class="global-invoice-checkbox" data-invoice-id="${invoice.id}" style="width: 18px; height: 18px; cursor: pointer;">
                </td>
                <td style="text-align: center; padding: 1rem 0.75rem; border-right: 1px solid #3e3e42;">
                    <strong style="color: #cccccc;">#${invoice.id}</strong>
                </td>
                <td style="padding: 1rem 0.75rem; border-right: 1px solid #3e3e42;">
                    <strong style="color: #2196f3;">${invoice.document_numero}</strong>
                </td>
                <td style="padding: 1rem 0.75rem; border-right: 1px solid #3e3e42; color: #cccccc;">
                    ${invoice.client_nom}
                </td>
                <td style="padding: 1rem 0.75rem; border-right: 1px solid #3e3e42; color: #cccccc;">
                    ${date}
                </td>
                <td style="padding: 1rem 0.75rem; border-right: 1px solid #3e3e42; text-align: center;">
                    <span style="background: #2196f3; color: #fff; padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.85rem;">
                        ${invoice.bon_count || 0} BL
                    </span>
                </td>
                <td style="padding: 1rem 0.75rem; border-right: 1px solid #3e3e42;">
                    <strong style="color: #4caf50;">${totalTTC} DH</strong>
                </td>
                <td style="padding: 1rem 0.75rem;">
                    <div style="display: flex; gap: 0.5rem; justify-content: center;">
                        <button class="btn-icon btn-view" onclick="viewGlobalInvoice(${invoice.id})" title="Voir">
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
                        <button class="btn-icon btn-edit" onclick="editGlobalInvoice(${invoice.id})" title="Modifier">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                            </svg>
                        </button>
                        <button class="btn-icon btn-delete" onclick="deleteGlobalInvoice(${invoice.id})" title="Supprimer">
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

// View global invoice
window.viewGlobalInvoice = async function(id) {
    console.log('🔍 [VIEW BUTTON CLICKED] Global Invoice ID:', id);
    console.log('📍 [LOCATION] viewGlobalInvoice function called');
    
    try {
        console.log('📡 [API CALL] Fetching global invoice data...');
        const result = await window.electron.dbChaimae.getGlobalInvoiceById(id);
        
        console.log('📦 [API RESPONSE - FULL DATA]', JSON.stringify(result, null, 2));
        
        if (result.success && result.data) {
            const invoice = result.data;
            console.log('✅ [SUCCESS] Invoice data loaded');
            console.log('📋 [INVOICE DETAILS]:', {
                id: invoice.id,
                numero: invoice.document_numero,
                client: invoice.client_nom,
                bon_count: invoice.bon_count,
                bons_array_length: invoice.bons ? invoice.bons.length : 0,
                has_bons: !!invoice.bons
            });
            
            const formatNumber = (num) => num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
            
            // Sort bons by document number (ascending by default)
            const sortOrder = 'numero_asc'; // Default sort order
            
            if (invoice.bons && invoice.bons.length > 0) {
                let sortedBons = [...invoice.bons];
                
                if (sortOrder === 'numero_asc') {
                    // Sort by document number ascending (smallest to largest)
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
                    // Sort by document number descending (largest to smallest)
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
                } else if (sortOrder === 'oldest') {
                    // Sort from oldest to newest (ascending by date)
                    sortedBons.sort((a, b) => new Date(a.document_date) - new Date(b.document_date));
                } else if (sortOrder === 'newest') {
                    // Sort from newest to oldest (descending by date)
                    sortedBons.sort((a, b) => new Date(b.document_date) - new Date(a.document_date));
                }
                // If sortOrder is null, keep original order
                
                console.log('📋 Drawing bons:', sortedBons.length);
                sortedBons.forEach((bon, index) => {
                    console.log(`  ${index + 1}. ID: ${bon.id}, Numero: ${bon.document_numero_bl || bon.document_numero}, Total HT: ${formatNumber(bon.total_ht)}`);
                });
            } else {
                console.warn('⚠️ [WARNING] No bons found in invoice.bons array!');
            }
            
            showGlobalInvoiceDetailsModal(invoice);
        } else {
            console.error('❌ [ERROR] No invoice data found');
        }
    } catch (error) {
        console.error('❌ [ERROR] Error viewing global invoice:', error);
        window.notify.error('Erreur', 'Erreur lors du chargement de la facture', 3000);
    }
}

// Show global invoice details modal
function showGlobalInvoiceDetailsModal(invoice) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.8); display: flex; align-items: center; justify-content: center; z-index: 10000;';
    
    const bonsHtml = invoice.bon_livraisons && invoice.bon_livraisons.length > 0 
        ? invoice.bon_livraisons.map(bon => `
            <tr style="border-bottom: 1px solid #3e3e42;">
                <td style="padding: 0.75rem; color: #2196f3;">${bon.document_numero || '-'}</td>
                <td style="padding: 0.75rem; color: #cccccc;">${bon.document_numero_commande || '-'}</td>
                <td style="padding: 0.75rem; color: #cccccc;">${new Date(bon.document_date).toLocaleDateString('fr-FR')}</td>
                <td style="padding: 0.75rem; color: #4caf50;">${formatNumberGlobalList(bon.total_ttc || 0)} DH</td>
            </tr>
        `).join('')
        : '<tr><td colspan="4" style="padding: 1rem; text-align: center; color: #999;">Aucun bon de livraison</td></tr>';
    
    modal.innerHTML = `
        <div style="background: #2d2d30; border-radius: 12px; padding: 2rem; max-width: 800px; width: 90%; max-height: 90vh; overflow-y: auto;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                <h2 style="color: #fff; margin: 0;">📋 Détails de la Facture Globale #${invoice.id}</h2>
                <div style="display: flex; gap: 0.75rem; align-items: center;">
                    <button id="downloadPdfBtn${invoice.id}" 
                            style="padding: 0.75rem 1.5rem; background: #2196f3; color: #fff; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; display: flex; align-items: center; gap: 0.5rem; transition: all 0.3s;"
                            onmouseover="this.style.background='#1976d2'" onmouseout="this.style.background='#2196f3'">
                        📥 Télécharger PDF
                    </button>
                    <button onclick="this.closest('.modal-overlay').remove()" 
                            style="background: none; border: none; color: #999; font-size: 1.5rem; cursor: pointer; padding: 0; width: 30px; height: 30px;">✕</button>
                </div>
            </div>
            
            <div style="background: #1e1e1e; border-radius: 8px; padding: 1.5rem; margin-bottom: 1.5rem;">
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;">
                    <div>
                        <p style="color: #999; margin: 0 0 0.25rem 0; font-size: 0.85rem;">N° Facture</p>
                        <p style="color: #2196f3; margin: 0; font-weight: 600;">${invoice.document_numero}</p>
                    </div>
                    <div>
                        <p style="color: #999; margin: 0 0 0.25rem 0; font-size: 0.85rem;">Date</p>
                        <p style="color: #cccccc; margin: 0;">${new Date(invoice.document_date).toLocaleDateString('fr-FR')}</p>
                    </div>
                    <div>
                        <p style="color: #999; margin: 0 0 0.25rem 0; font-size: 0.85rem;">Client</p>
                        <p style="color: #cccccc; margin: 0;">${invoice.client_nom}</p>
                    </div>
                    <div>
                        <p style="color: #999; margin: 0 0 0.25rem 0; font-size: 0.85rem;">ICE</p>
                        <p style="color: #cccccc; margin: 0;">${invoice.client_ice}</p>
                    </div>
                </div>
            </div>
            
            <h3 style="color: #fff; margin: 0 0 1rem 0;">Bons de Livraison</h3>
            <div style="background: #1e1e1e; border-radius: 8px; overflow: hidden; margin-bottom: 1.5rem;">
                <table style="width: 100%; border-collapse: collapse;">
                    <thead>
                        <tr style="background: #252526; border-bottom: 2px solid #3e3e42;">
                            <th style="padding: 0.75rem; text-align: left; color: #2196f3; font-weight: 600;">N° BL</th>
                            <th style="padding: 0.75rem; text-align: left; color: #2196f3; font-weight: 600;">N° Order</th>
                            <th style="padding: 0.75rem; text-align: left; color: #2196f3; font-weight: 600;">Date</th>
                            <th style="padding: 0.75rem; text-align: left; color: #2196f3; font-weight: 600;">Total TTC</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${bonsHtml}
                    </tbody>
                </table>
            </div>
            
            <div style="background: #1e1e1e; border-radius: 8px; padding: 1.5rem;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                    <span style="color: #999;">Total HT:</span>
                    <span style="color: #cccccc; font-weight: 600;">${formatNumberGlobalList(invoice.total_ht || 0)} DH</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                    <span style="color: #999;">TVA (${invoice.tva_rate}%):</span>
                    <span style="color: #cccccc; font-weight: 600;">${formatNumberGlobalList(invoice.montant_tva || 0)} DH</span>
                </div>
                <div style="display: flex; justify-content: space-between; padding-top: 0.5rem; border-top: 2px solid #3e3e42;">
                    <span style="color: #fff; font-weight: 600;">Total TTC:</span>
                    <span style="color: #4caf50; font-weight: 600; font-size: 1.25rem;">${formatNumberGlobalList(invoice.total_ttc || 0)} DH</span>
                </div>
            </div>
            
            <div style="margin-top: 1.5rem; text-align: right;">
                <button onclick="this.closest('.modal-overlay').remove()" 
                        style="padding: 0.75rem 1.5rem; background: #3e3e42; color: #fff; border: none; border-radius: 8px; cursor: pointer;">
                    Fermer
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add event listener for download button
    const downloadBtn = document.getElementById(`downloadPdfBtn${invoice.id}`);
    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            window.downloadGlobalInvoicePDF(invoice.id);
        });
    }
}

// Add Bon to Global Invoice
window.addBonToGlobalInvoice = async function(globalInvoiceId) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.8); display: flex; align-items: center; justify-content: center; z-index: 10000;';
    
    modal.innerHTML = `
        <div style="background: #2d2d30; border-radius: 12px; padding: 2rem; max-width: 600px; width: 90%;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                <h2 style="color: #fff; margin: 0;">➕ Ajouter un Bon de Livraison</h2>
                <button onclick="this.closest('.modal-overlay').remove()" 
                        style="background: none; border: none; color: #999; font-size: 1.5rem; cursor: pointer; padding: 0; width: 30px; height: 30px;">✕</button>
            </div>
            
            <p style="color: #999; margin-bottom: 2rem;">Choisissez la méthode d'ajout:</p>
            
            <div style="display: grid; gap: 1rem;">
                <button onclick="addBonAutomatic(${globalInvoiceId})" 
                        style="padding: 1.5rem; background: #2196f3; color: #fff; border: none; border-radius: 8px; cursor: pointer; font-size: 1rem; font-weight: 600; display: flex; align-items: center; gap: 1rem; transition: all 0.3s;"
                        onmouseover="this.style.background='#1976d2'" onmouseout="this.style.background='#2196f3'">
                    <svg width="24" height="24" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                        <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
                    </svg>
                    <div style="text-align: left;">
                        <div style="font-size: 1.1rem; margin-bottom: 0.25rem;">🤖 Automatique</div>
                        <div style="font-size: 0.85rem; opacity: 0.8;">Sélectionner des BL existants dans le système</div>
                    </div>
                </button>
                
                <button onclick="addBonManual(${globalInvoiceId})" 
                        style="padding: 1.5rem; background: #4caf50; color: #fff; border: none; border-radius: 8px; cursor: pointer; font-size: 1rem; font-weight: 600; display: flex; align-items: center; gap: 1rem; transition: all 0.3s;"
                        onmouseover="this.style.background='#388e3c'" onmouseout="this.style.background='#4caf50'">
                    <svg width="24" height="24" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                    </svg>
                    <div style="text-align: left;">
                        <div style="font-size: 1.1rem; margin-bottom: 0.25rem;">✍️ Manuel</div>
                        <div style="font-size: 0.85rem; opacity: 0.8;">Saisir manuellement les informations du BL</div>
                    </div>
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// Add Bon Automatic - Select from existing BLs
window.addBonAutomatic = async function(globalInvoiceId) {
    // Close current modal
    document.querySelector('.modal-overlay').remove();
    
    try {
        // Get all available Bons de Livraison (not already in a global invoice)
        const result = await window.electron.dbChaimae.getAvailableBonsForGlobal();
        
        if (!result.success || !result.data || result.data.length === 0) {
            window.notify.info('Info', 'Aucun bon de livraison disponible', 3000);
            return;
        }
        
        const bons = result.data;
        
        // Show selection modal
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.8); display: flex; align-items: center; justify-content: center; z-index: 10000;';
        
        const bonsHtml = bons.map(bon => `
            <div style="background: #1e1e1e; padding: 1rem; border-radius: 8px; display: flex; align-items: center; gap: 1rem;">
                <input type="checkbox" id="bon_${bon.id}" value="${bon.id}" 
                       style="width: 20px; height: 20px; cursor: pointer;">
                <label for="bon_${bon.id}" style="flex: 1; cursor: pointer; color: #cccccc;">
                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;">
                        <div>
                            <strong style="color: #2196f3;">${bon.document_numero}</strong>
                        </div>
                        <div>
                            ${new Date(bon.document_date).toLocaleDateString('fr-FR')}
                        </div>
                        <div style="text-align: right;">
                            <strong style="color: #4caf50;">${formatNumberGlobalList(bon.total_ttc)} DH</strong>
                        </div>
                    </div>
                </label>
            </div>
        `).join('');
        
        modal.innerHTML = `
            <div style="background: #2d2d30; border-radius: 12px; padding: 2rem; max-width: 800px; width: 90%; max-height: 80vh; overflow-y: auto;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                    <h2 style="color: #fff; margin: 0;">📋 Sélectionner les Bons de Livraison</h2>
                    <button onclick="this.closest('.modal-overlay').remove()" 
                            style="background: none; border: none; color: #999; font-size: 1.5rem; cursor: pointer; padding: 0; width: 30px; height: 30px;">✕</button>
                </div>
                
                <div style="display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 1.5rem;">
                    ${bonsHtml}
                </div>
                
                <div style="display: flex; gap: 1rem; justify-content: flex-end;">
                    <button onclick="this.closest('.modal-overlay').remove()" 
                            style="padding: 0.75rem 1.5rem; background: #3e3e42; color: #fff; border: none; border-radius: 8px; cursor: pointer;">
                        Annuler
                    </button>
                    <button onclick="confirmAddBons(${globalInvoiceId})" 
                            style="padding: 0.75rem 1.5rem; background: #2196f3; color: #fff; border: none; border-radius: 8px; cursor: pointer; font-weight: 600;">
                        Ajouter les BL sélectionnés
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
    } catch (error) {
        console.error('Error loading bons:', error);
        window.notify.error('Erreur', 'Erreur lors du chargement des bons', 3000);
    }
}

// Confirm adding selected bons
window.confirmAddBons = async function(globalInvoiceId) {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    const selectedBonIds = Array.from(checkboxes).map(cb => parseInt(cb.value));
    
    if (selectedBonIds.length === 0) {
        window.notify.warning('Attention', 'Veuillez sélectionner au moins un bon', 3000);
        return;
    }
    
    try {
        const result = await window.electron.dbChaimae.addBonsToGlobalInvoice(globalInvoiceId, selectedBonIds);
        
        if (result.success) {
            window.notify.success('Succès', `${selectedBonIds.length} bon(s) ajouté(s) avec succès`, 3000);
            document.querySelector('.modal-overlay').remove();
            await loadGlobalInvoices();
        } else {
            window.notify.error('Erreur', result.error || 'Erreur lors de l\'ajout', 3000);
        }
    } catch (error) {
        console.error('Error adding bons:', error);
        window.notify.error('Erreur', 'Erreur lors de l\'ajout des bons', 3000);
    }
}

// Add Bon Manual - Enter data manually
window.addBonManual = function(globalInvoiceId) {
    // Close current modal
    document.querySelector('.modal-overlay').remove();
    
    window.notify.info('Info', 'Fonctionnalité d\'ajout manuel en cours de développement', 3000);
}

// Edit global invoice
window.editGlobalInvoice = function(id) {
    console.log('✏️ [EDIT BUTTON CLICKED] Global Invoice ID:', id);
    console.log('📍 [LOCATION] editGlobalInvoice function called');
    console.log('💾 [ACTION] Storing invoice ID in sessionStorage');
    
    // Store the invoice ID in sessionStorage for the edit page
    sessionStorage.setItem('editGlobalInvoiceId', id);
    
    console.log('🔄 [NAVIGATION] Navigating to edit page...');
    router.navigate('/edit-global-invoice-chaimae');
    
    console.log('✅ [DONE] Edit button action completed');
}

// Delete global invoice
window.deleteGlobalInvoice = async function(id) {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette facture globale ?')) {
        return;
    }
    
    try {
        // Get invoice details before deletion to recalculate bons
        const invoiceResult = await window.electron.dbChaimae.getGlobalInvoiceById(id);
        
        if (invoiceResult.success && invoiceResult.data && invoiceResult.data.bons) {
            // Update each bon to recalculate its totals
            for (const bon of invoiceResult.data.bons) {
                // Get full bon details
                const bonDetails = await window.electron.dbChaimae.getInvoiceById(bon.id);
                if (bonDetails.success && bonDetails.data) {
                    // Recalculate totals from products
                    let totalHT = 0;
                    if (bonDetails.data.products && bonDetails.data.products.length > 0) {
                        bonDetails.data.products.forEach(p => {
                            totalHT += parseFloat(p.total_ht) || 0;
                        });
                    }
                    
                    const tvaRate = bonDetails.data.tva_rate || 20;
                    const montantTVA = totalHT * (tvaRate / 100);
                    const totalTTC = totalHT + montantTVA;
                    
                    // Update bon with recalculated totals
                    await window.electron.dbChaimae.updateInvoice(bon.id, {
                        ...bonDetails.data,
                        totals: {
                            total_ht: totalHT,
                            tva_rate: tvaRate,
                            montant_tva: montantTVA,
                            total_ttc: totalTTC
                        }
                    });
                }
            }
        }
        
        // Now delete the global invoice
        const result = await window.electron.dbChaimae.deleteGlobalInvoice(id);
        
        if (result.success) {
            window.notify.success('Succès', 'Facture globale supprimée avec succès', 3000);
            await loadGlobalInvoices();
        } else {
            window.notify.error('Erreur', result.error || 'Erreur lors de la suppression', 3000);
        }
    } catch (error) {
        console.error('Error deleting global invoice:', error);
        window.notify.error('Erreur', 'Erreur lors de la suppression', 3000);
    }
}

// Format number
function formatNumberGlobalList(number) {
    return new Intl.NumberFormat('fr-FR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(number);
}

// Download Global Invoice as PDF
window.downloadGlobalInvoicePDF = async function(invoiceId, sortOrder = null) {
    try {
        console.log('📥 Generating PDF for global invoice:', invoiceId);
        
        // Get global invoice data
        const result = await window.electron.dbChaimae.getGlobalInvoiceById(invoiceId);
        
        console.log('🔍 Global Invoice Result:', result);
        
        if (!result.success || !result.data) {
            throw new Error('Facture globale introuvable');
        }
        
        const invoice = result.data;
        console.log('📦 Invoice Data:', invoice);
        console.log('📋 Bons:', invoice.bons);
        
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
                                    style="padding:1rem;background:linear-gradient(135deg, #4CAF50 0%, #45a049 100%);color:#fff;border:none;border-radius:8px;font-size:1rem;cursor:pointer;transition:transform 0.2s;"
                                    onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform='scale(1)'">
                                🔢 Par numéro croissant (1 → 99)
                            </button>
                            <button onclick="this.closest('.modal-overlay').remove(); window.downloadGlobalInvoicePDF(${invoiceId}, 'numero_desc')" 
                                    style="padding:1rem;background:linear-gradient(135deg, #FF9800 0%, #F57C00 100%);color:#fff;border:none;border-radius:8px;font-size:1rem;cursor:pointer;transition:transform 0.2s;"
                                    onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform='scale(1)'">
                                🔠 Par numéro décroissant (99 → 1)
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
                                    style="padding:0.75rem;background:#3e3e42;color:#fff;border:none;border-radius:8px;font-size:0.9rem;cursor:pointer;margin-top:0.5rem;">
                                ✕ Annuler
                            </button>
                        </div>
                    </div>
                `;
                document.body.appendChild(modal);
            });
        }
        
        // Check if jsPDF is loaded
        if (typeof window.jspdf === 'undefined') {
            window.notify.info('Info', 'Chargement de jsPDF...', 2000);
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
            script.onload = () => downloadGlobalInvoicePDF(invoiceId);
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
        
        // Colors
        const blueColor = [52, 103, 138]; // #34678A - Dark blue from image
        
        const dateStr = new Date(invoice.document_date).toLocaleDateString('fr-FR');
        
        // Function to add header
        const addHeader = () => {
            // Add Logo
            try {
                // Try multiple selectors to find the logo
                let logoImg = document.querySelector('img[src*="chaimae.png"]') || 
                             document.querySelector('img[data-asset="chaimae"]') ||
                             document.querySelector('img[src^="data:image"]');
                
                if (logoImg && logoImg.src && logoImg.src.startsWith('data:')) {
                    // Logo is loaded as base64, use it directly
                    doc.addImage(logoImg.src, 'PNG', 15, 10, 35, 35);
                    console.log('✅ Logo added to PDF');
                } else {
                    console.warn('⚠️ Logo not loaded yet or not base64:', logoImg?.src?.substring(0, 50));
                }
            } catch (error) {
                console.error('❌ Error adding logo:', error);
            }
            
            // Company Header
            doc.setFontSize(16);
            doc.setTextColor(...blueColor);
            doc.setFont(undefined, 'bold');
            doc.text('CHAIMAE ERRBAHI MDIQ sarl (AU)', 105, 18, { align: 'center' });
            
            doc.setFontSize(8);
            doc.setFont(undefined, 'normal');
            doc.setTextColor(0, 0, 0);
            doc.text('Patente N° 52003366 - NIF : 40190505', 105, 25, { align: 'center' });
            doc.text('RC N° : 10487 - CNSS : 8721591', 105, 30, { align: 'center' });
            doc.text('ICE : 001544861000014', 105, 35, { align: 'center' });
            
            // Client Info
            doc.setFontSize(11);
            doc.setFont(undefined, 'bold');
            doc.text('CLIENT :', 15, 50);
            doc.setTextColor(0, 128, 0); // Green color
            doc.text(invoice.client_nom, 40, 50);
            
            doc.setTextColor(0, 0, 0);
            doc.text('ICE :', 15, 57);
            doc.setTextColor(0, 128, 0); // Green color
            doc.text(invoice.client_ice, 40, 57);
            
            // Date
            doc.setTextColor(0, 0, 0);
            doc.text(`Date: ${dateStr}`, 150, 50);
            
            // Invoice Number
            doc.setFontSize(14);
            doc.setFont(undefined, 'bold');
            doc.text('FACTURE N°:', 15, 70);
            doc.setTextColor(...blueColor);
            doc.text(invoice.document_numero, 50, 70);
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
        
        // Add header
        addHeader();
        
        // Bons de Livraison Table
        const startY = 80;
        
        // Table Header
        doc.setFillColor(...blueColor);
        doc.rect(15, startY, 180, 8, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(9);
        doc.setFont(undefined, 'bold');
        doc.text('N° Bon de livraison', 20, startY + 5.5);
        doc.text('N° Order', 70, startY + 5.5);
        doc.text('Date de livraison', 120, startY + 5.5);
        doc.text('Total HT', 180, startY + 5.5, { align: 'right' });
        
        // Table Body
        let currentY = startY + 10;
        doc.setTextColor(0, 0, 0);
        doc.setFont(undefined, 'normal');
        doc.setFontSize(9);
        
        let pageCount = 1;
        const pages = [];
        
        let totalHT = 0;
        
        // Sort bons based on user selection
        if (invoice.bons && invoice.bons.length > 0) {
            let sortedBons = [...invoice.bons];
            
            if (sortOrder === 'numero_asc') {
                // Sort by document number ascending (smallest to largest)
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
                // Sort by document number descending (largest to smallest)
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
            } else if (sortOrder === 'oldest') {
                // Sort from oldest to newest (ascending by date)
                sortedBons.sort((a, b) => new Date(a.document_date) - new Date(b.document_date));
            } else if (sortOrder === 'newest') {
                // Sort from newest to oldest (descending by date)
                sortedBons.sort((a, b) => new Date(b.document_date) - new Date(a.document_date));
            }
            // If sortOrder is null, keep original order
            
            sortedBons.forEach((bon, index) => {
                // Check if we need a new page
                if (currentY > 240) {
                    pages.push(pageCount);
                    doc.addPage();
                    addHeader();
                    pageCount++;
                    
                    // Re-draw table header
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
                
                // Alternate row colors
                if (index % 2 === 0) {
                    doc.setFillColor(245, 245, 245);
                    doc.rect(15, currentY - 3, 180, 8, 'F');
                }
                
                const bonHT = parseFloat(bon.total_ht) || 0;
                totalHT += bonHT;
                
                // Format number without HTML entities
                const formatNumber = (num) => {
                    return num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
                };
                
                doc.text(bon.document_numero_bl || bon.document_numero || '-', 20, currentY + 3);
                doc.text(bon.document_numero_commande || '-', 70, currentY + 3);
                doc.text(new Date(bon.document_date).toLocaleDateString('fr-FR'), 120, currentY + 3);
                doc.text(`${formatNumber(bonHT)} DH`, 180, currentY + 3, { align: 'right' });
                
                currentY += 8;
            });
        }
        
        // Totals
        currentY += 10;
        
        // Format number helper for totals
        const formatNumberPDF = (num) => {
            return num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
        };
        
        // TOTAL HT
        doc.setFillColor(245, 245, 245);
        doc.rect(110, currentY, 85, 8, 'F');
        doc.setFont(undefined, 'bold');
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(9);
        doc.text('TOTAL HT :', 113, currentY + 5.5);
        doc.setFontSize(8);
        doc.text(`${formatNumberPDF(invoice.total_ht)} DH`, 192, currentY + 5.5, { align: 'right' });
        
        // MONTANT TVA
        currentY += 8;
        doc.setFillColor(255, 255, 255);
        doc.rect(110, currentY, 85, 8, 'F');
        doc.setFontSize(9);
        doc.text(`MONTANT TVA ${invoice.tva_rate}% :`, 113, currentY + 5.5);
        doc.setFontSize(8);
        doc.text(`${formatNumberPDF(invoice.montant_tva)} DH`, 192, currentY + 5.5, { align: 'right' });
        
        // MONTANT T.T.C
        currentY += 8;
        doc.setFillColor(173, 216, 230);
        doc.rect(110, currentY, 85, 8, 'F');
        doc.setTextColor(...blueColor);
        doc.setFontSize(9);
        doc.text('MONTANT T.T.C :', 113, currentY + 5.5);
        doc.setFontSize(8.5);
        doc.text(`${formatNumberPDF(invoice.total_ttc)} DH`, 192, currentY + 5.5, { align: 'right' });
        
        // Amount in words (French)
        currentY += 15;
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(9);
        doc.setFont(undefined, 'italic');
        const amountInWords = numberToFrenchWordsGlobal(invoice.total_ttc);
        
        console.log('🔍 [GLOBAL INVOICE PDF] Invoice data:', invoice);
        console.log('🔍 [GLOBAL INVOICE PDF] Document type:', invoice.document_type);
        console.log('🔍 [GLOBAL INVOICE PDF] Document numero:', invoice.document_numero);
        console.log('🔍 [GLOBAL INVOICE PDF] Total TTC:', invoice.total_ttc);
        console.log('🔍 [GLOBAL INVOICE PDF] Amount in words:', amountInWords);
        console.log('📝 [GLOBAL INVOICE PDF] Text to display: La Présente Facture Globale est Arrêtée à la somme de : ' + amountInWords);
        
        doc.text(`La Présente Facture Globale est Arrêtée à la somme de : ${amountInWords}`, 15, currentY, { maxWidth: 180 });
        
        // Add page numbering to all pages
        pages.push(pageCount);
        const totalPages = pages.length;
        
        for (let i = 0; i < totalPages; i++) {
            doc.setPage(i + 1);
            addFooter(i + 1, totalPages);
        }
        
        // Save PDF
        const filename = `Facture_Globale_${invoice.document_numero}_${invoice.client_nom}.pdf`;
        doc.save(filename);
        
        window.notify.success('Succès', 'PDF téléchargé avec succès', 3000);
        
    } catch (error) {
        console.error('❌ Error generating PDF:', error);
        window.notify.error('Erreur', 'Impossible de générer le PDF: ' + error.message, 4000);
    }
}

// Convert number to French words for Global Invoices
function numberToFrenchWordsGlobal(number) {
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
    
    const amountInWords = convertNumber(dirhams) + ' dirhams';
    if (centimes > 0) {
        return amountInWords + ' et ' + convertNumber(centimes) + ' centimes';
    }
    return amountInWords;
}

// Select all global invoices
window.selectAllGlobalInvoices = function() {
    const selectAll = document.getElementById('selectAllGlobalInvoices');
    const checkboxes = document.querySelectorAll('.global-invoice-checkbox');
    
    checkboxes.forEach(checkbox => {
        checkbox.checked = selectAll.checked;
    });
}

// Update select all checkbox
function updateSelectAllGlobal() {
    const selectAll = document.getElementById('selectAllGlobalInvoices');
    const checkboxes = document.querySelectorAll('.global-invoice-checkbox');
    const checkedBoxes = document.querySelectorAll('.global-invoice-checkbox:checked');
    
    if (checkboxes.length === 0) {
        selectAll.checked = false;
        selectAll.indeterminate = false;
    } else if (checkedBoxes.length === checkboxes.length) {
        selectAll.checked = true;
        selectAll.indeterminate = false;
    } else if (checkedBoxes.length > 0) {
        selectAll.checked = false;
        selectAll.indeterminate = true;
    } else {
        selectAll.checked = false;
        selectAll.indeterminate = false;
    }
}

// Handle bulk delete for global invoices
window.handleBulkDeleteGlobal = async function() {
    const checkedBoxes = document.querySelectorAll('.global-invoice-checkbox:checked');
    
    if (checkedBoxes.length === 0) {
        window.notify.error('Erreur', 'Veuillez sélectionner au moins une facture globale', 3000);
        return;
    }
    
    const count = checkedBoxes.length;
    const confirmMessage = `Êtes-vous sûr de vouloir supprimer ${count} facture(s) globale(s) ?\n\nCette action est irréversible.`;
    
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
                <div id="deleteProgressBarGlobal" style="background:linear-gradient(90deg, #f44336, #e91e63);height:100%;width:0%;transition:width 0.3s;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:600;font-size:0.9rem;"></div>
            </div>
            <p id="deleteProgressTextGlobal" style="color:#aaa;margin:0 0 1rem 0;text-align:center;font-size:0.95rem;">Préparation...</p>
            <div style="text-align:center;">
                <button id="cancelDeleteBtnGlobal" style="padding:0.75rem 1.5rem;background:#ff9800;color:#fff;border:none;border-radius:6px;cursor:pointer;font-weight:600;font-size:0.95rem;transition:all 0.3s;" onmouseover="this.style.background='#f57c00'" onmouseout="this.style.background='#ff9800'">
                    ⚠️ Annuler
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(progressOverlay);
    
    const progressBar = document.getElementById('deleteProgressBarGlobal');
    const progressText = document.getElementById('deleteProgressTextGlobal');
    const cancelBtn = document.getElementById('cancelDeleteBtnGlobal');
    
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
        
        const selectedIds = Array.from(checkedBoxes).map(cb => parseInt(cb.dataset.invoiceId));
        const total = selectedIds.length;
        
        // Delete each global invoice
        for (let i = 0; i < selectedIds.length; i++) {
            // Check if cancel was requested
            if (cancelRequested) {
                progressText.textContent = `Annulé après ${successCount} suppression(s)`;
                await new Promise(resolve => setTimeout(resolve, 1500));
                break;
            }
            
            const id = selectedIds[i];
            
            try {
                const result = await window.electron.dbChaimae.deleteGlobalInvoice(id);
                
                if (result.success) {
                    successCount++;
                } else {
                    errorCount++;
                }
            } catch (error) {
                console.error(`Error deleting global invoice ${id}:`, error);
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
            window.notify.success('Succès', `${successCount} facture(s) globale(s) supprimée(s) avec succès`, 3000);
            await loadGlobalInvoices();
        }
        
        if (errorCount > 0) {
            window.notify.error('Erreur', `${errorCount} facture(s) n'ont pas pu être supprimées`, 3000);
        }
        
    } catch (error) {
        console.error('Error in bulk delete:', error);
        document.body.removeChild(progressOverlay);
        window.notify.error('Erreur', 'Une erreur est survenue lors de la suppression', 3000);
    }
}

// Initialize event listeners when page loads
setTimeout(() => {
    const selectAll = document.getElementById('selectAllGlobalInvoices');
    if (selectAll) {
        selectAll.addEventListener('change', selectAllGlobalInvoices);
    }
    
    // Add checkbox change listeners
    document.addEventListener('change', (e) => {
        if (e.target.classList.contains('global-invoice-checkbox')) {
            updateSelectAllGlobal();
        }
    });
}, 100);
