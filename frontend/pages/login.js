// Login Page Component
function LoginPage() {
    return `
        <div class="desktop-app">
            <div class="window-header">
                <div class="window-title">
                    <span class="app-icon">🔐</span>
                    <span>Authentication</span>
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

            <div class="window-content login-window">
                <div class="login-container-desktop">
                    <div class="login-side">
                        <div class="login-brand">
                            <div class="brand-icon">🔐</div>
                            <h1>Welcome</h1>
                        </div>
                    </div>

                    <div class="login-form-container">
                        <div class="form-header">
                            <h2 id="formTitle">Select Account</h2>
                        </div>

                        <!-- Users List Screen -->
                        <div id="usersListScreen" class="users-list-screen">
                            <div id="usersList" class="users-grid">
                                <!-- Users will be loaded here -->
                            </div>
                            <div class="add-account-section">
                                <a href="#" onclick="router.navigate('/register'); return false;" class="add-account-btn">
                                    <span class="add-icon">➕</span>
                                    <span class="add-text">Add New Account</span>
                                </a>
                            </div>
                        </div>

                        <!-- Password Screen -->
                        <form id="passwordForm" class="desktop-form" style="display: none;">
                            <div style="text-align: center; margin-bottom: 1.5rem;">
                                <div id="selectedUserAvatar" class="user-avatar-large"></div>
                                <p id="selectedUserName" style="margin-top: 0.5rem; color: #ccc;"></p>
                            </div>

                            <div class="input-group">
                                <label>Password</label>
                                <div class="input-wrapper">
                                    <span class="input-icon">🔒</span>
                                    <input type="password" id="password" placeholder="Enter your password" required>
                                </div>
                            </div>

                            <button type="submit" class="desktop-btn primary">
                                <span>Sign In</span>
                                <span class="btn-arrow">→</span>
                            </button>

                            <button type="button" id="backBtn" class="desktop-btn secondary" style="margin-top: 0.5rem;">
                                <span>← Back</span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Store selected user
let selectedUser = null;

// Initialize login page
async function initializeLoginPage() {
    const usersList = document.getElementById('usersList');
    
    try {
        const result = await window.electron.users.getAll();
        
        if (result.success && result.users && result.users.length > 0) {
            // Display users
            usersList.innerHTML = result.users.map(user => `
                <div class="user-card" onclick="selectUser('${user.id}', '${user.name}', '${user.email}')">
                    <div class="user-avatar">${user.name.charAt(0).toUpperCase()}</div>
                    <div class="user-name">${user.name}</div>
                    <div class="user-email">${user.email}</div>
                </div>
            `).join('');
        } else {
            // No users, show register option
            usersList.innerHTML = `
                <div style="text-align: center; padding: 2rem; color: #999;">
                    <p>No accounts found</p>
                </div>
            `;
        }
    } catch (error) {
        console.error('Error loading users:', error);
        usersList.innerHTML = `<div style="color: #f44336; padding: 1rem;">Error loading accounts</div>`;
    }
}

// Select user and show password form
function selectUser(userId, userName, userEmail) {
    selectedUser = { id: userId, name: userName, email: userEmail };
    
    // Hide users list, show password form
    document.getElementById('usersListScreen').style.display = 'none';
    document.getElementById('passwordForm').style.display = 'block';
    document.getElementById('formTitle').textContent = 'Sign In';
    
    // Update selected user display
    const avatar = document.getElementById('selectedUserAvatar');
    avatar.textContent = userName.charAt(0).toUpperCase();
    avatar.style.display = 'flex';
    
    document.getElementById('selectedUserName').textContent = userName;
    document.getElementById('password').value = '';
    document.getElementById('password').focus();
}

// Go back to users list
function goBackToUsersList() {
    selectedUser = null;
    document.getElementById('passwordForm').style.display = 'none';
    document.getElementById('usersListScreen').style.display = 'block';
    document.getElementById('formTitle').textContent = 'Select Account';
    document.getElementById('password').value = '';
}

// Handle password form submission
document.addEventListener('submit', async (e) => {
    if (e.target.id === 'passwordForm') {
        e.preventDefault();
        
        if (!selectedUser) {
            showError('Please select a user first');
            return;
        }
        
        const password = document.getElementById('password').value;

        if (!password) {
            showError('Please enter your password');
            return;
        }

        try {
            const result = await window.electron.users.login(selectedUser.email, password);
            
            if (result.success) {
                // Save user data
                localStorage.setItem('user', JSON.stringify({ 
                    id: result.user.id,
                    name: result.user.name,
                    email: result.user.email
                }));
                localStorage.setItem('isAuthenticated', 'true');
                
                // Navigate to company selection
                router.navigate('/company-select');
            } else {
                showError(result.error || 'Invalid password');
            }
        } catch (error) {
            console.error('Login error:', error);
            showError('An error occurred. Please try again.');
        }
    }
});

// Back button handler
document.addEventListener('click', (e) => {
    if (e.target.id === 'backBtn' || e.target.closest('#backBtn')) {
        goBackToUsersList();
    }
});

// Show custom error notification
function showError(message) {
    // Remove existing error if any
    const existingError = document.querySelector('.error-notification');
    if (existingError) {
        existingError.remove();
    }

    // Create error notification
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-notification';
    errorDiv.innerHTML = `
        <div class="error-content">
            <span class="error-icon">⚠️</span>
            <span class="error-message">${message}</span>
        </div>
    `;
    
    document.body.appendChild(errorDiv);

    // Auto remove after 3 seconds
    setTimeout(() => {
        errorDiv.classList.add('fade-out');
        setTimeout(() => errorDiv.remove(), 300);
    }, 3000);
}
