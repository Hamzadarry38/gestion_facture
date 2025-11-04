// Chaimae Company Dashboard
function DashboardChaimaePage() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const username = user.username || 'User';

    return `
        <div class="desktop-app">
            <div class="window-header">
                <div class="window-title">
                    <img src="assets/logos/chaimae.png" class="header-logo" alt="Chaimae Company" data-asset="assets/logos/chaimae.png">
                    <span>Chaimae Company</span>
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
                        <img src="assets/logos/chaimae.png" alt="Chaimae Company" data-asset="assets/logos/chaimae.png">
                    </div>
                    <h1>Chaimae Company</h1>
                    <h2>Bienvenue dans votre tableau de bord</h2>
                    <p>Sélectionnez une option pour continuer</p>
                </div>

                <div class="dashboard-options">
                    <div class="option-card" onclick="navigateToCreateInvoice()">
                        <div class="option-icon">📄</div>
                        <div class="option-info">
                            <h2>Créer une nouvelle facture</h2>
                            <p>Créer une facture, un devis ou une situation pour les clients</p>
                        </div>
                        <div class="option-arrow">→</div>
                    </div>

                    <div class="option-card" onclick="navigateToViewInvoices()">
                        <div class="option-icon">📋</div>
                        <div class="option-info">
                            <h2>Afficher les factures</h2>
                            <p>Liste de toutes les factures, devis et situations</p>
                        </div>
                        <div class="option-arrow">→</div>
                    </div>
                </div>

                <div class="dashboard-footer">
                    <button class="back-btn" onclick="backToCompanySelect()">
                        <span class="icon">←</span>
                        <span>Retour à l'accueil</span>
                    </button>
                    <!-- <button class="back-btn" onclick="deleteAllDataChaimae()" style="background: #e81123; border-color: #e81123; margin-left: 1rem;">
                        <span class="icon">
                            <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                            </svg>
                        </span>
                        <span>Supprimer toutes les données</span>
                    </button> -->
                </div>
            </div>
        </div>
    `;
}

// Navigation functions for Chaimae (Global scope)
window.navigateToCreateInvoice = function() {
    router.navigate('/create-invoice-chaimae');
};

window.navigateToViewInvoices = function() {
    // Check if user has a saved year preference
    const rememberYear = localStorage.getItem('chaimae_remember_year');
    const savedYear = localStorage.getItem('chaimae_selected_year');
    
    if (rememberYear === 'true' && savedYear !== null) {
        // User has saved preference, go directly to invoices list
        sessionStorage.setItem('chaimae_current_year', savedYear);
        router.navigate('/invoices-list-chaimae');
    } else {
        // No saved preference, go to year selector first
        router.navigate('/year-selector-chaimae');
    }
};

window.navigateToCreateGlobalInvoice = function() {
    router.navigate('/create-global-invoice-chaimae');
};

window.navigateToViewGlobalInvoices = function() {
    router.navigate('/invoices-list-chaimae');
};

window.backToCompanySelect = function() {
    localStorage.removeItem('selectedCompany');
    router.navigate('/company-select');
};

// Delete all data function for CHAIMAE
window.deleteAllDataChaimae = async function() {
    const confirmed = await customConfirm('Attention', '⚠️ ATTENTION!\n\nÊtes-vous sûr de vouloir supprimer TOUTES les données?\n\n• Toutes les factures\n• Toutes les factures globales\n• Tous les clients\n• Tous les produits\n• Toutes les pièces jointes\n\nCette action est IRRÉVERSIBLE!', 'error');
    
    if (!confirmed) return;
    
    const doubleConfirm = await customConfirm('Dernière Confirmation', '🚨 DERNIÈRE CONFIRMATION!\n\nConfirmez pour supprimer définitivement toutes les données CHAIMAE.', 'error');
    
    if (!doubleConfirm) return;
    
    try {
        const result = await window.electron.dbChaimae.deleteAllData();
        
        if (result.success) {
            await customAlert('Succès', 'Toutes les données CHAIMAE ont été supprimées avec succès!', 'success');
            router.navigate('/company-select');
        } else {
            await customAlert('Erreur', 'Erreur lors de la suppression: ' + result.error, 'error');
        }
    } catch (error) {
        console.error('Error deleting data:', error);
        await customAlert('Erreur', 'Erreur lors de la suppression des données', 'error');
    }
};
