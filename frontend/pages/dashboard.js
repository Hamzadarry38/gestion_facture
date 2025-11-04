// Dashboard Page Component
function DashboardPage() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const username = user.username || 'User';
    const company = JSON.parse(localStorage.getItem('selectedCompany') || '{}');
    const companyName = company.name || 'Company';
    const companyCode = company.code || '';

    // Get company display name
    let companyDisplay = companyName;
    if (companyCode === 'MRY') {
        companyDisplay = 'MRY TRAV SARL (AU)';
    } else if (companyCode === 'CHAIMAE') {
        companyDisplay = 'Chaimae Company';
    }

    return `
        <div class="desktop-app">
            <div class="window-header">
                <div class="window-title">
                    <img src="assets/logos/${companyCode.toLowerCase()}.png" class="header-logo" alt="${companyName}">
                    <span>${companyDisplay}</span>
                </div>
                <div class="window-controls">
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
                        <img src="assets/logos/${companyCode.toLowerCase()}.png" alt="${companyName}">
                    </div>
                    <h1>${companyDisplay}</h1>
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
                </div>
            </div>
        </div>
    `;
}

// Navigation functions
function navigateToCreateInvoice() {
    alert('Créer une nouvelle facture - En cours de développement');
}

function navigateToViewInvoices() {
    alert('Afficher les factures - En cours de développement');
}

function backToCompanySelect() {
    localStorage.removeItem('selectedCompany');
    router.navigate('/company-select');
}

