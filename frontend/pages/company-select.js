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
                    <div class="footer-buttons-group">
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

// Helper function to show notifications
window.showPasswordNotification = function(type, message) {
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
    document.addEventListener('click', function(e) {
        if (e.target.closest('#changePasswordBtn')) {
            console.log('🔐 [Company Select] Change password button clicked');
            e.preventDefault();
            const modal = document.getElementById('changePasswordModal');
            if (modal) {
                modal.style.display = 'flex';
                console.log('🔐 [Company Select] Modal opened');
            }
        }
    }, true);

    // Initialize global flag if not exists
    if (!window.isUpdatingPassword) {
        window.isUpdatingPassword = false;
    }
    
    // Create named handler function to allow removal
    const handlePasswordFormSubmit = async function(e) {
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
}
