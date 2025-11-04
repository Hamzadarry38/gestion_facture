// Multi Company Dashboard
function DashboardMultiPage() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const username = user.username || 'User';

    return `
        <div class="desktop-app">
            <div class="window-header">
                <div class="window-title">
                    <img src="assets/logos/multi.png" class="header-logo" alt="Multi Company" data-asset="assets/logos/multi.png">
                    <span>Multi Company</span>
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

            <div class="window-content dashboard-content">
                <div class="dashboard-header">
                    <div class="dashboard-logo">
                        <img src="assets/logos/multi.png" alt="Multi Company" data-asset="assets/logos/multi.png">
                    </div>
                    <h1>Multi Company</h1>
                    <h2>Bienvenue dans votre tableau de bord</h2>
                    <p>Sélectionnez une option pour continuer</p>
                </div>

                <div class="dashboard-options">
                    <div class="option-card" data-action="create-invoice">
                        <div class="option-icon">📄</div>
                        <div class="option-info">
                            <h2>Créer une nouvelle facture</h2>
                            <p>Créer une facture, un devis ou une situation pour les clients</p>
                        </div>
                        <div class="option-arrow">→</div>
                    </div>

                    <div class="option-card" data-action="view-invoices">
                        <div class="option-icon">📋</div>
                        <div class="option-info">
                            <h2>Afficher les factures</h2>
                            <p>Liste de toutes les factures, devis et situations</p>
                        </div>
                        <div class="option-arrow">→</div>
                    </div>
                </div>

                <div class="dashboard-footer">
                    <button class="back-btn" data-action="back-to-select">
                        <span class="icon">←</span>
                        <span>Retour à l'accueil</span>
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Initialize Multi Dashboard
function initDashboardMultiPage() {
    // Event listeners are handled by global event delegation
}

// Event delegation for dashboard actions
document.addEventListener('click', function(e) {
    const card = e.target.closest('[data-action]');
    if (!card) return;
    
    const action = card.dataset.action;
    
    // Check if we're on Multi dashboard
    const selectedCompany = JSON.parse(localStorage.getItem('selectedCompany') || '{}');
    if (selectedCompany.code !== 'MULTI') return;
    
    if (action === 'create-invoice') {
        router.navigate('/create-invoice-multi');
    } else if (action === 'view-invoices') {
        // Check if user has a saved year preference
        const rememberYear = localStorage.getItem('multi_remember_year');
        const savedYear = localStorage.getItem('multi_selected_year');
        
        if (rememberYear === 'true' && savedYear !== null) {
            // User has saved preference, go directly to invoices list
            sessionStorage.setItem('multi_current_year', savedYear);
            router.navigate('/invoices-list-multi');
        } else {
            // No saved preference, go to year selector first
            router.navigate('/year-selector-multi');
        }
    } else if (action === 'back-to-select') {
        localStorage.removeItem('selectedCompany');
        router.navigate('/company-select');
    }
});
