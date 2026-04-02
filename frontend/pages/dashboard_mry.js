// MRY Company Dashboard
function DashboardMRYPage() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const username = user.username || 'User';

    return `
        <div class="desktop-app">
            <div class="window-header">
                <div class="window-title">
                    <img src="assets/logos/mry.png" class="header-logo" alt="MRY Company" data-asset="assets/logos/mry.png">
                    <span>MRY TRAV SARL (AU)</span>
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
                        <img src="assets/logos/mry.png" alt="MRY Company" data-asset="assets/logos/mry.png">
                    </div>
                    <h1>MRY TRAV SARL (AU)</h1>
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

                    <div class="option-card" data-action="pdf-text-editor">
                        <div class="option-icon">✏️</div>
                        <div class="option-info">
                            <h2>Modifier les textes PDF</h2>
                            <p>Modifier le header et footer des fichiers PDF</p>
                        </div>
                        <div class="option-arrow">→</div>
                    </div>

                    ${(window.getEnabledCompanies ? window.getEnabledCompanies() : [
                        { code: 'SKM', name: 'SMART SERVICES' },
                        { code: 'SAAISS', name: 'MSH3 SERVICES' },
                        { code: 'BENALI', name: 'BEN ALI' }
                    ]).map(c => {
                        const name = window.getPdfCompanyName ? window.getPdfCompanyName(c.code) : c.name;
                        return `<div class="option-card" data-action="view-pdf-${c.code.toLowerCase()}">
                            <div class="option-icon">📁</div>
                            <div class="option-info">
                                <h2>Fichiers PDF - ${name}</h2>
                                <p>Afficher tous les fichiers PDF sauvegardés pour ${name}</p>
                            </div>
                            <div class="option-arrow">→</div>
                        </div>`;
                    }).join('')}
                </div>

                <div class="dashboard-footer">
                    <button class="back-btn" data-action="back-to-select">
                        <span class="icon">←</span>
                        <span>Retour à l'accueil</span>
                    </button>
                    <!-- <button class="back-btn" data-action="delete-all-data" style="background: #e81123; border-color: #e81123; margin-left: 1rem;">
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

// Event delegation for dashboard actions
document.addEventListener('click', function (e) {
    const card = e.target.closest('[data-action]');
    if (!card) return;

    const action = card.dataset.action;

    // Check if we're on MRY dashboard
    const selectedCompany = JSON.parse(localStorage.getItem('selectedCompany') || '{}');
    if (selectedCompany.code !== 'MRY') return;

    if (action === 'create-invoice') {
        console.log('✅ Creating invoice...');
        router.navigate('/create-invoice-mry');
    } else if (action === 'view-invoices') {
        console.log('✅ Button clicked: Afficher les factures');
        // Check if user has a saved year preference
        const rememberYear = localStorage.getItem('mry_remember_year');
        const savedYear = localStorage.getItem('mry_selected_year');

        if (rememberYear === 'true' && savedYear !== null) {
            // User has saved preference, go directly to invoices list
            sessionStorage.setItem('mry_current_year', savedYear);
            router.navigate('/invoices-list-mry');
        } else {
            // No saved preference, go to year selector first
            router.navigate('/year-selector-mry');
        }
        console.log('✅ Navigation completed');
    } else if (action === 'pdf-text-editor') {
        router.navigate('/pdf-text-editor');
    } else if (action.startsWith('view-pdf-')) {
        const companyCode = action.replace('view-pdf-', '');
        console.log('📁 Opening PDF Manager for company:', companyCode);
        window.showPdfManager(companyCode);
    } else if (action === 'back-to-select') {
        localStorage.removeItem('selectedCompany');
        router.navigate('/company-select');
    } else if (action === 'delete-all-data') {
        deleteAllDataMRY();
    }
});

// Delete all data function for MRY
async function deleteAllDataMRY() {
    const confirmed = await customConfirm('Attention', '⚠️ ATTENTION!\n\nÊtes-vous sûr de vouloir supprimer TOUTES les données?\n\n• Toutes les factures\n• Tous les clients\n• Tous les produits\n• Toutes les pièces jointes\n\nCette action est IRRÉVERSIBLE!', 'error');

    if (!confirmed) return;

    const doubleConfirm = await customConfirm('Dernière Confirmation', '🚨 DERNIÈRE CONFIRMATION!\n\nConfirmez pour supprimer définitivement toutes les données MRY.', 'error');

    if (!doubleConfirm) return;

    try {
        const result = await window.electron.db.deleteAllData();

        if (result.success) {
            await customAlert('Succès', 'Toutes les données MRY ont été supprimées avec succès!', 'success');
            router.navigate('/company-select');
        } else {
            await customAlert('Erreur', 'Erreur lors de la suppression: ' + result.error, 'error');
        }
    } catch (error) {
        console.error('Error deleting data:', error);
        await customAlert('Erreur', 'Erreur lors de la suppression des données', 'error');
    }
}
