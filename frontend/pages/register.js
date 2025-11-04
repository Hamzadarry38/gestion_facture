// Register Page Component
function RegisterPage() {
    return `
        <div class="desktop-app">
            <div class="window-header">
                <div class="window-title">
                    <span class="app-icon">📝</span>
                    <span>Create Account</span>
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
                            <div class="brand-icon">🎉</div>
                            <h1>Welcome!</h1>
                            <p style="color: #cccccc; margin-top: 1rem; font-size: 0.95rem;">Create your account to get started</p>
                        </div>
                    </div>

                    <div class="login-form-container" style="overflow-y: auto; max-height: calc(100vh - 100px);">
                        <div class="form-header">
                            <h2>Create Account</h2>
                            <p style="color: #999; font-size: 0.9rem; margin-top: 0.5rem;">Fill in your details below</p>
                        </div>

                        <form id="registerForm" class="desktop-form" style="padding-bottom: 2rem;">
                            <div class="input-group">
                                <label>Full Name</label>
                                <div class="input-wrapper">
                                    <span class="input-icon">👤</span>
                                    <input type="text" id="registerName" placeholder="Enter your full name" required>
                                </div>
                            </div>

                            <div class="input-group">
                                <label>Email Address</label>
                                <div class="input-wrapper">
                                    <span class="input-icon">📧</span>
                                    <input type="email" id="registerEmail" placeholder="Enter your email" required>
                                </div>
                            </div>

                            <div class="input-group">
                                <label>Password</label>
                                <div class="input-wrapper">
                                    <span class="input-icon">🔒</span>
                                    <input type="password" id="registerPassword" placeholder="Create a password" required minlength="6">
                                </div>
                                <small style="color: #999; font-size: 0.85rem; margin-top: 0.25rem; display: block;">Minimum 6 characters</small>
                            </div>

                            <div class="input-group">
                                <label>Confirm Password</label>
                                <div class="input-wrapper">
                                    <span class="input-icon">🔒</span>
                                    <input type="password" id="registerConfirmPassword" placeholder="Confirm your password" required minlength="6">
                                </div>
                            </div>

                            <button type="submit" class="desktop-btn primary">
                                <span>Create Account</span>
                                <span class="btn-arrow">→</span>
                            </button>

                            <div style="text-align: center; margin-top: 1.5rem; color: #999;">
                                Already have an account? 
                                <a href="#" onclick="router.navigate('/login'); return false;" style="color: #2196f3; text-decoration: none; font-weight: 600;">Sign In</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Handle register form
document.addEventListener('submit', async (e) => {
    if (e.target.id === 'registerForm') {
        e.preventDefault();
        
        const name = document.getElementById('registerName').value.trim();
        const email = document.getElementById('registerEmail').value.trim();
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('registerConfirmPassword').value;

        // Validation
        if (!name || !email || !password) {
            showRegisterError('Please fill in all fields');
            return;
        }

        if (password.length < 6) {
            showRegisterError('Password must be at least 6 characters');
            return;
        }

        if (password !== confirmPassword) {
            showRegisterError('Passwords do not match');
            return;
        }

        // Register user
        try {
            const result = await window.electron.users.register(name, email, password);
            
            if (result.success) {
                // Save user data
                localStorage.setItem('user', JSON.stringify({ 
                    id: result.user.id,
                    name: result.user.name,
                    email: result.user.email
                }));
                localStorage.setItem('isAuthenticated', 'true');
                
                // Show success message
                showRegisterSuccess('Account created successfully!');
                
                // Navigate to company selection after 1 second
                setTimeout(() => {
                    router.navigate('/company-select');
                }, 1000);
            } else {
                showRegisterError(result.error || 'Failed to create account');
            }
        } catch (error) {
            console.error('Registration error:', error);
            showRegisterError('An error occurred. Please try again.');
        }
    }
});

// Show error notification
function showRegisterError(message) {
    const existingError = document.querySelector('.error-notification');
    if (existingError) {
        existingError.remove();
    }

    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-notification';
    errorDiv.innerHTML = `
        <div class="error-content">
            <span class="error-icon">⚠️</span>
            <span class="error-message">${message}</span>
        </div>
    `;
    
    document.body.appendChild(errorDiv);

    setTimeout(() => {
        errorDiv.classList.add('fade-out');
        setTimeout(() => errorDiv.remove(), 300);
    }, 3000);
}

// Show success notification
function showRegisterSuccess(message) {
    const existingSuccess = document.querySelector('.success-notification');
    if (existingSuccess) {
        existingSuccess.remove();
    }

    const successDiv = document.createElement('div');
    successDiv.className = 'success-notification';
    successDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #4caf50, #45a049);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
    `;
    successDiv.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.75rem;">
            <span style="font-size: 1.5rem;">✅</span>
            <span style="font-weight: 600;">${message}</span>
        </div>
    `;
    
    document.body.appendChild(successDiv);

    setTimeout(() => {
        successDiv.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => successDiv.remove(), 300);
    }, 2000);
}
