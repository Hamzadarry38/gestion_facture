// Settings Page Component
function SettingsPage() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const username = user.username || 'User';

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
                    <a href="#" data-route="/profile" class="nav-item">
                        <span class="icon">👤</span>
                        <span>Profile</span>
                    </a>
                    <a href="#" data-route="/settings" class="nav-item active">
                        <span class="icon">⚙️</span>
                        <span>Settings</span>
                    </a>
                </nav>

                <div class="sidebar-footer">
                    <button id="logoutBtn" class="btn btn-logout">
                        <span class="icon">🚪</span>
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            <main class="main-content">
                <header class="top-bar">
                    <h2>Settings</h2>
                    <div class="user-info">
                        <span>${username}</span>
                        <div class="avatar">👤</div>
                    </div>
                </header>

                <div class="content-area">
                    <div class="card">
                        <h3>Application Settings</h3>
                        <div class="form">
                            <div class="form-group">
                                <label>Theme</label>
                                <select>
                                    <option>Light</option>
                                    <option>Dark</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Language</label>
                                <select>
                                    <option>English</option>
                                    <option>العربية</option>
                                    <option>Français</option>
                                </select>
                            </div>
                            <button class="btn btn-primary">Save Settings</button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    `;
}
