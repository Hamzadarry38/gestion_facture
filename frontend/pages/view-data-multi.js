// View Data Page for Multi Company
function ViewDataMultiPage() {
    return `
        <div class="desktop-app">
            <div class="window-header">
                <div class="window-title">
                    <img src="assets/logos/multi.png" class="header-logo" alt="Multi Company" data-asset="assets/logos/multi.png">
                    <span>Liste des Données - Multi Company</span>
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
                        <div style="display: flex; align-items: center; gap: 1rem;">
                            <h1>📋 Liste des Données</h1>
                        </div>
                        <div class="header-actions">
                            <button class="btn-primary" onclick="router.navigate('/create-data-multi')">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style="margin-right: 0.5rem;">
                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                </svg>
                                <span>Nouvelle Donnée</span>
                            </button>
                            <button class="btn-secondary" onclick="router.navigate('/dashboard-multi')">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style="margin-right: 0.5rem;">
                                    <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                                </svg>
                                <span>Retour</span>
                            </button>
                        </div>
                    </div>

                    <!-- Search Bar -->
                    <div class="search-section">
                        <div class="search-box">
                            <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                            </svg>
                            <input type="text" id="searchInput" placeholder="Rechercher par titre, description..." oninput="filterDataMulti()">
                        </div>
                    </div>

                    <!-- Stats Cards -->
                    <div class="stats-grid">
                        <div class="stat-card">
                            <div class="stat-icon" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">📊</div>
                            <div class="stat-info">
                                <div class="stat-value" id="totalDataCount">0</div>
                                <div class="stat-label">Total Données</div>
                            </div>
                        </div>
                    </div>

                    <!-- Data Table -->
                    <div class="table-container">
                        <table class="invoices-table">
                            <thead>
                                <tr>
                                    <th style="width: 60px;">#</th>
                                    <th>Titre</th>
                                    <th>Description</th>
                                    <th style="width: 150px;">Date</th>
                                    <th style="width: 150px;">Actions</th>
                                </tr>
                            </thead>
                            <tbody id="dataTableBody">
                                <tr>
                                    <td colspan="5" class="empty-state">
                                        <div class="empty-icon">📭</div>
                                        <div class="empty-text">Aucune donnée disponible</div>
                                        <div class="empty-subtext">Commencez par créer une nouvelle donnée</div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Initialize View Data Page
function initViewDataMultiPage() {
    // Load initial data
    loadDataListMulti();
}

// Function to load and display data
function loadDataListMulti() {
    // Here you can add logic to fetch data from database
    // For now, it will show "No data available"
    console.log('Loading data list for Multi Company...');
    
    // Example data structure (you can replace this with actual database calls)
    const sampleData = [];
    
    updateDataTableMulti(sampleData);
    updateStatsMulti(sampleData);
}

// Update the data table
function updateDataTableMulti(data) {
    const tableBody = document.getElementById('dataTableBody');
    
    if (!data || data.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="5" class="empty-state">
                    <div class="empty-icon">📭</div>
                    <div class="empty-text">Aucune donnée disponible</div>
                    <div class="empty-subtext">Commencez par créer une nouvelle donnée</div>
                </td>
            </tr>
        `;
        return;
    }
    
    tableBody.innerHTML = data.map((item, index) => `
        <tr>
            <td>${index + 1}</td>
            <td><strong>${item.title || 'N/A'}</strong></td>
            <td>${item.description || '-'}</td>
            <td>${item.date ? new Date(item.date).toLocaleDateString('fr-FR') : '-'}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn-icon btn-view" onclick="viewDataMulti(${item.id})" title="Voir">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                        </svg>
                    </button>
                    <button class="btn-icon btn-delete" onclick="deleteDataMulti(${item.id})" title="Supprimer">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                        </svg>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

// Update statistics
function updateStatsMulti(data) {
    document.getElementById('totalDataCount').textContent = data.length;
}

// Filter data based on search
function filterDataMulti() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    // Add your filter logic here
    console.log('Filtering data with:', searchTerm);
}

// View data details
function viewDataMulti(id) {
    console.log('Viewing data:', id);
    // Add your view logic here
}

// Delete data
async function deleteDataMulti(id) {
    if (typeof customConfirm === 'function') {
        const confirmed = await customConfirm('Confirmation', 'Êtes-vous sûr de vouloir supprimer cette donnée?', 'warning');
        if (confirmed) {
            console.log('Deleting data:', id);
            // Add your delete logic here
            if (typeof customAlert === 'function') {
                await customAlert('Succès', 'Donnée supprimée avec succès!', 'success');
            }
            loadDataListMulti();
        }
    } else {
        if (confirm('Êtes-vous sûr de vouloir supprimer cette donnée?')) {
            console.log('Deleting data:', id);
            // Add your delete logic here
            alert('Donnée supprimée avec succès!');
            loadDataListMulti();
        }
    }
}
