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
                        <button onclick="window.electron.db.exportDatabase()" style="background: #4caf50; color: white; padding: 0.75rem 1.5rem; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; display: flex; align-items: center; gap: 0.5rem;">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                                <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>
                            </svg>
                            <span>Exporter MRY</span>
                        </button>
                        <button onclick="window.electron.db.importDatabase()" style="background: #ff9800; color: white; padding: 0.75rem 1.5rem; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; display: flex; align-items: center; gap: 0.5rem;">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                                <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                            </svg>
                            <span>Importer MRY</span>
                        </button>
                        <button onclick="window.electron.dbChaimae.exportDatabase()" style="background: #4caf50; color: white; padding: 0.75rem 1.5rem; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; display: flex; align-items: center; gap: 0.5rem;">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                                <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>
                            </svg>
                            <span>Exporter CHAIMAE</span>
                        </button>
                        <button onclick="window.electron.dbChaimae.importDatabase()" style="background: #ff9800; color: white; padding: 0.75rem 1.5rem; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; display: flex; align-items: center; gap: 0.5rem;">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                                <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                            </svg>
                            <span>Importer CHAIMAE</span>
                        </button>
                        <button onclick="window.electron.dbMulti.exportDatabase()" style="background: #4caf50; color: white; padding: 0.75rem 1.5rem; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; display: flex; align-items: center; gap: 0.5rem;">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                                <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>
                            </svg>
                            <span>Exporter MULTI</span>
                        </button>
                        <button onclick="window.electron.dbMulti.importDatabase()" style="background: #ff9800; color: white; padding: 0.75rem 1.5rem; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; display: flex; align-items: center; gap: 0.5rem;">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                                <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                            </svg>
                            <span>Importer MULTI</span>
                        </button>
                        <button id="migrateToPostgresBtn" style="background: #9c27b0; color: white; padding: 0.75rem 1.5rem; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; display: flex; align-items: center; gap: 0.5rem; width: 100%; justify-content: center;">
                            <span class="icon">🚀</span>
                            <span>Migrer vers PostgreSQL (Online Mode)</span>
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
                    <div class="footer-buttons-group">
                        <button class="footer-btn" id="manageUsersBtn" style="display: none;">
                            <span class="icon">👥</span>
                            <span>Gérer les utilisateurs</span>
                        </button>
                        <button class="footer-btn" id="changePasswordBtn">
                            <span class="icon">🔐</span>
                            <span>Change Password</span>
                        </button>
                        <button class="footer-btn" id="logoutBtn">
                            <span class="icon">←</span>
                            <span>Logout</span>
                        </button>
                    </div>
                    <div class="footer-info">
                        <span class="status-dot"></span>
                        <span>System Online</span>
                    </div>
                </div>

                <!-- Change Password Modal -->
                <div id="changePasswordModal" class="modal" style="display: none;">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h2>Change Password</h2>
                            <button class="modal-close" onclick="document.getElementById('changePasswordModal').style.display = 'none';">&times;</button>
                        </div>
                        <div class="modal-body">
                            <form id="changePasswordForm">
                                <div class="form-group">
                                    <label for="oldPassword">Old Password</label>
                                    <input type="password" id="oldPassword" name="oldPassword" required>
                                </div>
                                <div class="form-group">
                                    <label for="newPassword">New Password</label>
                                    <input type="password" id="newPassword" name="newPassword" required>
                                </div>
                                <div class="form-group">
                                    <label for="confirmPassword">Confirm New Password</label>
                                    <input type="password" id="confirmPassword" name="confirmPassword" required>
                                </div>
                                <div class="form-group">
                                    <button type="submit" class="btn btn-primary">Update Password</button>
                                    <button type="button" class="btn btn-secondary" onclick="document.getElementById('changePasswordModal').style.display = 'none';">Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <!-- Manage Users Modal -->
                <div id="manageUsersModal" class="modal" style="display: none;">
                    <div class="modal-content" style="max-width: 800px;">
                        <div class="modal-header">
                            <h2>User Management</h2>
                            <button class="modal-close" onclick="document.getElementById('manageUsersModal').style.display = 'none';">&times;</button>
                        </div>
                        <div class="modal-body" style="padding: 1.5rem;">
                            <div style="display: flex; justify-content: flex-end; margin-bottom: 1.5rem;">
                                <button class="btn btn-primary" onclick="router.navigate('/register')" style="background: #4caf50; border: none; padding: 0.6rem 1.2rem; border-radius: 6px; color: white; cursor: pointer; font-weight: 600; display: flex; align-items: center; gap: 0.5rem;">
                                    <span>➕ Add New User</span>
                                </button>
                            </div>
                            <div id="adminUsersList" style="background: #1e1e1e; border-radius: 8px; border: 1px solid #333; overflow: hidden;">
                                <div style="padding: 2rem; text-align: center; color: #999;">Chargement des utilisateurs...</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Postgres Migration Modal -->
                <div id="pgMigrationModal" class="modal" style="display: none;">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h2>Migration PostgreSQL</h2>
                            <button class="modal-close" onclick="document.getElementById('pgMigrationModal').style.display = 'none';">&times;</button>
                        </div>
                        <div class="modal-body">
                            <p style="margin-bottom: 1rem; color: #ccc;">Veuillez entrer votre mot de passe PostgreSQL pour commencer le transfert des données.</p>
                            <div class="form-group">
                                <label for="pgPass">Mot de passe Postgres</label>
                                <input type="password" id="pgPass" placeholder="Ex: Azer190@" style="width: 100%; padding: 0.75rem; border-radius: 4px; background: #333; border: 1px solid #444; color: white;">
                            </div>
                            <div class="form-group" style="margin-top: 1.5rem; display: flex; gap: 1rem;">
                                <button id="confirmMigrateBtn" class="btn btn-primary" style="flex: 1;">Démarrer la Migration</button>
                                <button type="button" class="btn btn-secondary" onclick="document.getElementById('pgMigrationModal').style.display = 'none';" style="flex: 1;">Annuler</button>
                            </div>
                            <div style="margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid #333;">
                                <h4 style="margin-bottom: 1rem; color: #888; font-size: 0.85rem; text-transform: uppercase;">Transfert Complet (Nouveau PC)</h4>
                                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                                    <button id="exportEverythingBtn" class="btn btn-primary" style="background: #007acc; border: none; padding: 0.5rem; font-size: 0.85rem;">📦 Exporter Pack</button>
                                    <button id="importEverythingBtn" class="btn btn-primary" style="background: #d32f2f; border: none; padding: 0.5rem; font-size: 0.85rem;">📥 Importer Pack</button>
                                </div>
                                <p style="margin-top: 0.8rem; font-size: 0.75rem; color: #666; font-style: italic;">
                                    * Le pack inclut toutes les bases, PDFs et pièces jointes.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
                /* Notification Animation */
                @keyframes popIn {
                    0% { transform: scale(0); opacity: 0; }
                    80% { transform: scale(1.1); opacity: 1; }
                    100% { transform: scale(1); }
                }
            </style>
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

    // Show Manage Users button if admin
    const manageUsersBtn = document.getElementById('manageUsersBtn');

    // Check permission (either superuser email OR can_auto_validate permission)
    const canManageUsers = (user.email === 'redouanerrebbahi99@gmail.com' || user.can_auto_validate === true);

    if (canManageUsers) {
        if (manageUsersBtn) manageUsersBtn.style.display = 'flex';
        // Only update counts for admins
        updatePendingCounts();
    }
}

// Fetch and display pending counts
async function updatePendingCounts() {
    const companies = ['mry', 'chaimae', 'multi'];

    for (const company of companies) {
        try {
            // Fetch pending invoices count
            // We use the exposed API which should work for all companies
            const result = await window.electron.api.getPendingInvoices(company.toUpperCase());

            if (result.success && result.data && result.data.length > 0) {
                const card = document.querySelector(`.company-card[data-company="${company}"]`);
                if (card) {
                    let badge = card.querySelector('.notification-badge');

                    // Create badge if it doesn't exist
                    if (!badge) {
                        badge = document.createElement('div');
                        badge.className = 'notification-badge';
                        badge.style.cssText = `
                            position: absolute;
                            top: -10px;
                            right: -10px;
                            background: #f44336;
                            color: white;
                            border-radius: 50%;
                            width: 25px;
                            height: 25px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            font-size: 12px;
                            font-weight: bold;
                            box-shadow: 0 4px 8px rgba(0,0,0,0.5);
                            z-index: 100;
                            border: 2px solid #2d2d30;
                            animation: popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                            pointer-events: none;
                        `;

                        // Ensure card has relative positioning
                        const currentPosition = window.getComputedStyle(card).position;
                        if (currentPosition === 'static') {
                            card.style.position = 'relative';
                        }

                        card.appendChild(badge);
                    }

                    // Update count
                    badge.textContent = result.data.length;
                    badge.style.display = 'flex';
                }
            } else {
                // Remove badge if count is 0
                const card = document.querySelector(`.company-card[data-company="${company}"]`);
                if (card) {
                    const badge = card.querySelector('.notification-badge');
                    if (badge) badge.remove();
                }
            }
        } catch (error) {
            console.error(`Failed to load pending count for ${company}:`, error);
        }
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

// Helper function to show notifications
window.showPasswordNotification = function (type, message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        font-size: 0.95rem;
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        max-width: 400px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    `;

    if (type === 'success') {
        notification.style.background = '#4caf50';
        notification.style.color = 'white';
    } else {
        notification.style.background = '#f44336';
        notification.style.color = 'white';
    }

    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
};

// Initialize page event listeners
if (!window.companySelectInitialized) {
    window.companySelectInitialized = true;
    console.log('🔐 [Company Select] Initializing password change listeners');

    // Handle change password button click
    document.addEventListener('click', function (e) {
        if (e.target.closest('#changePasswordBtn')) {
            console.log('🔐 [Company Select] Change password button clicked');
            e.preventDefault();
            const modal = document.getElementById('changePasswordModal');
            if (modal) {
                modal.style.display = 'flex';
                console.log('🔐 [Company Select] Modal opened');
            }
        }

        if (e.target.closest('#manageUsersBtn')) {
            console.log('👥 [Company Select] Manage users button clicked');
            e.preventDefault();
            const modal = document.getElementById('manageUsersModal');
            if (modal) {
                modal.style.display = 'flex';
                loadAdminUsersList();
            }
        }
    }, true);

    // Initialize global flag if not exists
    if (!window.isUpdatingPassword) {
        window.isUpdatingPassword = false;
    }

    // Create named handler function to allow removal
    const handlePasswordFormSubmit = async function (e) {
        if (e.target.id === 'changePasswordForm') {
            console.log('🔐 [Company Select] Form submitted');
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();

            // Prevent concurrent requests
            if (window.isUpdatingPassword) {
                console.log('⚠️ [Company Select] Password update already in progress');
                window.showPasswordNotification('error', 'Veuillez patienter, mise à jour du mot de passe en cours...');
                return;
            }

            const oldPassword = document.getElementById('oldPassword').value;
            const newPassword = document.getElementById('newPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            console.log('🔐 [Company Select] Validating passwords...');
            console.log('  - Old password entered:', !!oldPassword);
            console.log('  - New password entered:', !!newPassword);
            console.log('  - Confirm password entered:', !!confirmPassword);

            // Validate passwords
            if (!oldPassword || !newPassword || !confirmPassword) {
                console.log('❌ [Company Select] Validation failed: Missing fields');
                window.showPasswordNotification('error', 'Tous les champs sont obligatoires');
                return;
            }

            if (newPassword !== confirmPassword) {
                console.log('❌ [Company Select] Validation failed: Passwords do not match');
                window.showPasswordNotification('error', 'Les nouveaux mots de passe ne correspondent pas');
                return;
            }

            if (newPassword.length < 6) {
                console.log('❌ [Company Select] Validation failed: Password too short');
                window.showPasswordNotification('error', 'Le mot de passe doit contenir au moins 6 caractères');
                return;
            }

            console.log('✅ [Company Select] All validations passed, sending to server...');
            window.isUpdatingPassword = true;

            try {
                const user = JSON.parse(localStorage.getItem('user') || '{}');
                console.log('🔐 [Company Select] User email:', user.email);

                const result = await window.electron.users.updatePassword(user.email, oldPassword, newPassword);
                console.log('🔐 [Company Select] Server response:', result);

                if (result.success) {
                    console.log('✅ [Company Select] Password updated successfully');
                    window.showPasswordNotification('success', 'Mot de passe mis à jour avec succès - Rechargement...');
                    document.getElementById('changePasswordModal').style.display = 'none';
                    document.getElementById('changePasswordForm').reset();
                    window.isUpdatingPassword = false;
                    // Reload page after 2 seconds to ensure new password is used
                    setTimeout(() => {
                        console.log('🔄 [Company Select] Reloading page...');
                        location.reload();
                    }, 2000);
                } else {
                    console.log('❌ [Company Select] Server error:', result.error);
                    const errorMessage = result.error === 'Old password is incorrect'
                        ? 'L\'ancien mot de passe est incorrect'
                        : (result.error || 'Échec de la mise à jour du mot de passe');
                    window.showPasswordNotification('error', errorMessage);
                    window.isUpdatingPassword = false;
                }
            } catch (error) {
                console.error('❌ [Company Select] Error updating password:', error);
                window.showPasswordNotification('error', 'Une erreur s\'est produite lors de la mise à jour du mot de passe');
                window.isUpdatingPassword = false;
            }
        }
    };

    // Remove old handler if exists
    document.removeEventListener('submit', window.companySelectPasswordHandler);

    // Store handler reference and add new one
    window.companySelectPasswordHandler = handlePasswordFormSubmit;
    document.addEventListener('submit', window.companySelectPasswordHandler, true);

    // Handle Migrate to Postgres button click
    document.addEventListener('click', async function (e) {
        if (e.target.closest('#migrateToPostgresBtn')) {
            const modal = document.getElementById('pgMigrationModal');
            if (modal) {
                modal.style.display = 'flex';
                document.getElementById('pgPass').focus();
            }
        }

        if (e.target.id === 'confirmMigrateBtn') {
            const btn = document.getElementById('migrateToPostgresBtn');
            const password = document.getElementById('pgPass').value;

            if (!password) {
                await customAlert("Erreur", "Veuillez entrer le mot de passe.", "error");
                return;
            }

            document.getElementById('pgMigrationModal').style.display = 'none';
            btn.disabled = true;
            btn.innerHTML = `<span class="icon">⌛</span> <span>Migration en cours...</span>`;

            try {
                const pgConfig = {
                    user: 'postgres',
                    host: 'localhost',
                    database: 'facture_db',
                    password: password,
                    port: 5432
                };

                const result = await window.electron.db.migrateToPostgres(pgConfig);

                if (result.success) {
                    const totalInvoices = result.results.reduce((acc, r) => acc + (r.count || 0), 0);
                    await customAlert("Succès", `✅ Migration terminée avec succès!\n\n${result.results.map(r => `- ${r.name}: ${r.count || 0} factures`).join('\n')}\n\nTotal: ${totalInvoices} factures transférées.`, "success");
                    window.showPasswordNotification('success', 'Migration réussie!');
                } else {
                    await customAlert("Erreur", `❌ Échec de la migration: ${result.error}`, "error");
                    window.showPasswordNotification('error', 'Échec de la migration');
                }
            } catch (error) {
                console.error('Migration UI Error:', error);
                await customAlert("Erreur", "❌ Une erreur est survenue lors de la migration.", "error");
            } finally {
                btn.disabled = false;
                btn.innerHTML = `<span class="icon">🚀</span> <span>Migrer vers PostgreSQL (Online Mode)</span>`;
                document.getElementById('pgPass').value = '';
            }
        }
    }, true);
}

// Load users list for admin management
async function loadAdminUsersList() {
    const listContainer = document.getElementById('adminUsersList');
    if (!listContainer) return;

    try {
        const result = await window.electron.users.getAll();
        if (result.success && result.users) {
            if (result.users.length === 0) {
                listContainer.innerHTML = '<div style="padding: 2rem; text-align: center; color: #999;">Aucun utilisateur trouvé</div>';
                return;
            }

            listContainer.innerHTML = `
                <table style="width: 100%; border-collapse: collapse; color: #ccc; font-size: 0.9rem;">
                    <thead>
                        <tr style="background: #2d2d30; border-bottom: 1px solid #333;">
                            <th style="padding: 1rem; text-align: left;">Nom</th>
                            <th style="padding: 1rem; text-align: left;">Email</th>
                            <th style="padding: 1rem; text-align: center;">Validation Automatique</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${result.users.map(user => `
                            <tr style="border-bottom: 1px solid #2d2d30; transition: background 0.2s;" onmouseover="this.style.background='#252526'" onmouseout="this.style.background='transparent'">
                                <td style="padding: 1rem; font-weight: 600;">${user.name}</td>
                                <td style="padding: 1rem; color: #999;">${user.email}</td>
                                <td style="padding: 1rem; text-align: center;">
                                    <label class="switch" style="position: relative; display: inline-block; width: 44px; height: 24px; ${user.email === 'redouanerrebbahi99@gmail.com' ? 'opacity: 0.8; cursor: not-allowed;' : ''}">
                                        <input type="checkbox" 
                                            class="permission-toggle"
                                            ${user.can_auto_validate || user.email === 'redouanerrebbahi99@gmail.com' ? 'checked' : ''} 
                                            ${user.email === 'redouanerrebbahi99@gmail.com' ? 'disabled' : ''}
                                            onchange="if('${user.email}' !== 'redouanerrebbahi99@gmail.com') updateUserPermission(${user.id}, 'can_auto_validate', this.checked)"
                                            style="opacity: 0; width: 0; height: 0; position: absolute;">
                                        <span class="slider round" style="position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #444; transition: .4s; border-radius: 24px;"></span>
                                        <style>
                                            .permission-toggle:checked + .slider { background-color: #4caf50 !important; }
                                            .permission-toggle:disabled + .slider { background-color: #4caf50 !important; cursor: not-allowed; }
                                            .permission-toggle:focus + .slider { box-shadow: 0 0 1px #4caf50; }
                                            .permission-toggle:checked + .slider:before { transform: translateX(20px); }
                                            .slider:before { position: absolute; content: ""; height: 18px; width: 18px; left: 3px; bottom: 3px; background-color: white; transition: .4s; border-radius: 50%; }
                                        </style>
                                    </label>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
        } else {
            listContainer.innerHTML = `<div style="padding: 2rem; text-align: center; color: #f44336;">Erreur: ${result.error}</div>`;
        }
    } catch (error) {
        console.error('Error loading admin users list:', error);
        listContainer.innerHTML = '<div style="padding: 2rem; text-align: center; color: #f44336;">Erreur lors du chargement des utilisateurs</div>';
    }
}

// Update user permission
async function updateUserPermission(userId, permission, value) {
    try {
        console.log(`🔄 Updating permission ${permission} for user ${userId} to ${value}`);
        const result = await window.electron.users.updatePermission(userId, permission, value);

        if (result.success) {
            window.showPasswordNotification('success', 'Permission mise à jour');
        } else {
            window.showPasswordNotification('error', 'Erreur lors de la mise à jour');
            // Revert toggle if failed (optional, but good UX)
            loadAdminUsersList();
        }
    } catch (error) {
        console.error('Error updating permission:', error);
        window.showPasswordNotification('error', 'Erreur serveur');
    }
}

// Global Sync Listeners
document.addEventListener('click', async (e) => {
    if (e.target.id === 'exportEverythingBtn') {
        try {
            const btn = e.target;
            const originalText = btn.innerHTML;
            btn.disabled = true;
            btn.innerHTML = `⌛ Exportation...`;

            const result = await window.electron.pdf.exportEverything();
            if (result.success) {
                await customAlert("Succès", `✅ Pack complet exporté avec succès!\n\nEmplacement: ${result.path}`, "success");
            } else if (!result.canceled) {
                await customAlert("Erreur", `❌ Échec de l'exportation: ${result.error}`, "error");
            }
        } catch (err) {
            console.error('Export Everything Error:', err);
            await customAlert("Erreur", "❌ Une erreur est survenue.", "error");
        } finally {
            const btn = document.getElementById('exportEverythingBtn');
            if (btn) {
                btn.disabled = false;
                btn.innerHTML = `📦 Exporter Pack`;
            }
        }
    }

    if (e.target.id === 'importEverythingBtn') {
        const confirmed = await customConfirm(
            "Restauration Complète",
            "⚠️ ATTENTION: L'importation d'un pack complet remplacera TOUTES vos données actuelles et redémarrera l'application.\n\nVoulez-vous continuer ?",
            "warning"
        );

        if (confirmed) {
            try {
                const result = await window.electron.pdf.importEverything();
                if (result && !result.success && !result.canceled) {
                    await customAlert("Erreur", `❌ Échec de l'importation: ${result.error}`, "error");
                }
            } catch (err) {
                console.error('Import Everything Error:', err);
                await customAlert("Erreur", "❌ Une erreur est survenue.", "error");
            }
        }
    }
});

// Export for global access
window.loadAdminUsersList = loadAdminUsersList;
window.updateUserPermission = updateUserPermission;
