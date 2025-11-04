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
                            <h2>Sign In</h2>
                        </div>

                        <form id="loginForm" class="desktop-form">
                            <div class="input-group">
                                <label>Email Address</label>
                                <div class="input-wrapper">
                                    <span class="input-icon">📧</span>
                                    <input type="email" id="username" placeholder="Enter your email" required>
                                </div>
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

                            <div style="text-align: center; margin-top: 1.5rem; color: #999;">
                                Don't have an account? 
                                <a href="#" onclick="router.navigate('/register'); return false;" style="color: #2196f3; text-decoration: none; font-weight: 600;">Create Account</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Handle login form
document.addEventListener('submit', async (e) => {
    if (e.target.id === 'loginForm') {
        e.preventDefault();
        
        const email = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;

        if (!email || !password) {
            showError('Please fill in all fields');
            return;
        }

        try {
            const result = await window.electron.users.login(email, password);
            
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
                showError(result.error || 'Invalid email or password');
            }
        } catch (error) {
            console.error('Login error:', error);
            showError('An error occurred. Please try again.');
        }
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
