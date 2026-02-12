// Profile Page Component
function ProfilePage() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const username = user.name || user.username || 'User';
    const email = user.email || '';

    return `
        <div class="dashboard-container">
            <aside class="sidebar">
                <div class="sidebar-header">
                    <div class="logo">⚡</div>
                    <h2>Electron App</h2>
                </div>

                <nav class="sidebar-nav">
                    <a href="#" data-route="/dashboard" class="nav-item">
                        <span class="icon">🏠</span>
                        <span>Home</span>
                    </a>
                    <a href="#" data-route="/profile" class="nav-item active">
                        <span class="icon">👤</span>
                        <span>Profile</span>
                    </a>
                    <a href="#" data-route="/settings" class="nav-item">
                        <span class="icon">⚙️</span>
                        <span>Settings</span>
                    </a>
                </nav>

                <div class="sidebar-footer">
                    <button id="changePasswordBtn" class="btn btn-secondary">
                        <span class="icon">🔐</span>
                        <span>Change Password</span>
                    </button>
                    <button id="logoutBtn" class="btn btn-logout">
                        <span class="icon">🚪</span>
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            <main class="main-content">
                <header class="top-bar">
                    <h2>Profile</h2>
                    <div class="user-info">
                        <span>${username}</span>
                        <div class="avatar">👤</div>
                    </div>
                </header>

                <div class="content-area">
                    <div class="card">
                        <h3>User Profile</h3>
                        <div class="form">
                            <div class="form-group">
                                <label>Name</label>
                                <input type="text" value="${username}" readonly>
                            </div>
                            <div class="form-group">
                                <label>Email</label>
                                <input type="email" value="${email}" readonly>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
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
    `;
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
if (!window.profileInitialized) {
    window.profileInitialized = true;
    console.log('🔐 [Profile] Initializing password change listeners');
    
    // Handle change password button click
    document.addEventListener('click', function(e) {
        if (e.target.closest('#changePasswordBtn')) {
            console.log('🔐 [Profile] Change password button clicked');
            e.preventDefault();
            const modal = document.getElementById('changePasswordModal');
            if (modal) {
                modal.style.display = 'flex';
                console.log('🔐 [Profile] Modal opened');
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
            console.log('🔐 [Profile] Form submitted');
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            
            // Prevent concurrent requests
            if (window.isUpdatingPassword) {
                console.log('⚠️ [Profile] Password update already in progress');
                window.showPasswordNotification('error', 'Veuillez patienter, mise à jour du mot de passe en cours...');
                return;
            }
            
            const oldPassword = document.getElementById('oldPassword').value;
            const newPassword = document.getElementById('newPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            console.log('🔐 [Profile] Validating passwords...');
            console.log('  - Old password entered:', !!oldPassword);
            console.log('  - New password entered:', !!newPassword);
            console.log('  - Confirm password entered:', !!confirmPassword);
            
            // Validate passwords
            if (!oldPassword || !newPassword || !confirmPassword) {
                console.log('❌ [Profile] Validation failed: Missing fields');
                window.showPasswordNotification('error', 'Tous les champs sont obligatoires');
                return;
            }
            
            if (newPassword !== confirmPassword) {
                console.log('❌ [Profile] Validation failed: Passwords do not match');
                window.showPasswordNotification('error', 'Les nouveaux mots de passe ne correspondent pas');
                return;
            }
            
            if (newPassword.length < 6) {
                console.log('❌ [Profile] Validation failed: Password too short');
                window.showPasswordNotification('error', 'Le mot de passe doit contenir au moins 6 caractères');
                return;
            }
            
            console.log('✅ [Profile] All validations passed, sending to server...');
            window.isUpdatingPassword = true;
            
            try {
                const user = JSON.parse(localStorage.getItem('user') || '{}');
                console.log('🔐 [Profile] User email:', user.email);
                
                const result = await window.electron.users.updatePassword(user.email, oldPassword, newPassword);
                console.log('🔐 [Profile] Server response:', result);
                
                if (result.success) {
                    console.log('✅ [Profile] Password updated successfully');
                    window.showPasswordNotification('success', 'Mot de passe mis à jour avec succès');
                    document.getElementById('changePasswordModal').style.display = 'none';
                    document.getElementById('changePasswordForm').reset();
                    window.isUpdatingPassword = false;
                } else {
                    console.log('❌ [Profile] Server error:', result.error);
                    const errorMessage = result.error === 'Old password is incorrect' 
                        ? 'L\'ancien mot de passe est incorrect' 
                        : (result.error || 'Échec de la mise à jour du mot de passe');
                    window.showPasswordNotification('error', errorMessage);
                    window.isUpdatingPassword = false;
                }
            } catch (error) {
                console.error('❌ [Profile] Error updating password:', error);
                window.showPasswordNotification('error', 'Une erreur s\'est produite lors de la mise à jour du mot de passe');
                window.isUpdatingPassword = false;
            }
        }
    };
    
    // Remove old handler if exists
    document.removeEventListener('submit', window.profilePasswordHandler);
    
    // Store handler reference and add new one
    window.profilePasswordHandler = handlePasswordFormSubmit;
    document.addEventListener('submit', window.profilePasswordHandler, true);
}
