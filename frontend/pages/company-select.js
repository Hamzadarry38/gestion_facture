// Company Selection Page Component
function CompanySelectPage() {
    return `
        <div class="desktop-app">
            <div class="window-header">
                <div class="window-title">
                    <span class="app-icon">🏢</span>
                    <span>Select Company</span>
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
                <div class="content-header">
                    <h1 id="welcomeUserName">Welcome</h1>
                    <p>Choose your company to continue</p>
                    
                    <div style="display: flex; gap: 1rem; justify-content: center; margin-top: 2rem; flex-wrap: wrap;">
                        <button onclick="exportDatabaseMRY()" style="background: #4caf50; color: white; padding: 0.75rem 1.5rem; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; display: flex; align-items: center; gap: 0.5rem;">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                                <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>
                            </svg>
                            <span>Exporter MRY</span>
                        </button>
                        <button onclick="importDatabaseMRY()" style="background: #ff9800; color: white; padding: 0.75rem 1.5rem; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; display: flex; align-items: center; gap: 0.5rem;">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                                <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                            </svg>
                            <span>Importer MRY</span>
                        </button>
                        <button onclick="exportDatabaseChaimae()" style="background: #4caf50; color: white; padding: 0.75rem 1.5rem; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; display: flex; align-items: center; gap: 0.5rem;">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                                <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>
                            </svg>
                            <span>Exporter CHAIMAE</span>
                        </button>
                        <button onclick="importDatabaseChaimae()" style="background: #ff9800; color: white; padding: 0.75rem 1.5rem; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; display: flex; align-items: center; gap: 0.5rem;">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                                <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                            </svg>
                            <span>Importer CHAIMAE</span>
                        </button>
                        <button onclick="exportDatabaseMulti()" style="background: #4caf50; color: white; padding: 0.75rem 1.5rem; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; display: flex; align-items: center; gap: 0.5rem;">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                                <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>
                            </svg>
                            <span>Exporter MULTI</span>
                        </button>
                        <button onclick="importDatabaseMulti()" style="background: #ff9800; color: white; padding: 0.75rem 1.5rem; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; display: flex; align-items: center; gap: 0.5rem;">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                                <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                            </svg>
                            <span>Importer MULTI</span>
                        </button>
                    </div>
                </div>

                <div class="companies-grid">
                    <div class="company-card" data-company="mry" onclick="selectCompany('mry')">
                        <div class="company-logo">
                            <img src="assets/logos/mry.png" alt="MRY Company" data-asset="assets/logos/mry.png">
                        </div>
                        <h2 class="company-name">MRY Company</h2>
                    </div>

                    <div class="company-card" data-company="chaimae" onclick="selectCompany('chaimae')">
                        <div class="company-logo">
                            <img src="assets/logos/chaimae.png" alt="Chaimae Company" data-asset="assets/logos/chaimae.png">
                        </div>
                        <h2 class="company-name">Chaimae Company</h2>
                    </div>

                    <div class="company-card" data-company="multi" onclick="selectCompany('multi')">
                        <div class="company-logo">
                            <img src="assets/logos/multi.png" alt="Multi Company" data-asset="assets/logos/multi.png">
                        </div>
                        <h2 class="company-name">Multi Company</h2>
                    </div>
                </div>

                <div class="window-footer">
                    <button class="footer-btn" id="logoutBtn">
                        <span class="icon">←</span>
                        <span>Logout</span>
                    </button>
                    <div class="footer-info">
                        <span class="status-dot"></span>
                        <span>System Online</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Initialize page - load user name when page is rendered
function initCompanySelectPage() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userName = user.name || 'User';
    const welcomeElement = document.getElementById('welcomeUserName');
    if (welcomeElement) {
        welcomeElement.textContent = `Welcome, ${userName}`;
    }
}

// Handle company selection
function selectCompany(company) {
    const companyData = {
        mry: { name: 'MRY Company', code: 'MRY', route: '/dashboard-mry' },
        chaimae: { name: 'Chaimae Company', code: 'CHAIMAE', route: '/dashboard-chaimae' },
        multi: { name: 'Multi Company', code: 'MULTI', route: '/dashboard-multi' }
    };

    // Save selected company
    const selectedCompany = companyData[company];
    localStorage.setItem('selectedCompany', JSON.stringify(selectedCompany));
    
    // Navigate to company-specific dashboard
    router.navigate(selectedCompany.route);
}
