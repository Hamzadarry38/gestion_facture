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
                                    <option>Français</option>
                                </select>
                            </div>
                            <div class="form-group" style="margin-top: 2rem;">
                                <label>Portail Web</label>
                                <div style="display: flex; align-items: center; gap: 0.5rem; margin-top: 0.5rem;">
                                    <span class="icon">🌐</span>
                                    <a id="webPortalLink" href="#" onclick="(function(e){e.preventDefault();var u=localStorage.getItem('API_BASE_URL')||'https://anpe-web-api.ddns.net/facture';window.open(u.replace(/\/api$/,'')+'/','_blank');})(event)" style="color: #2196f3; text-decoration: none; font-weight: 500;">Ouvrir le portail web</a>
                                </div>
                            </div>
                            <button class="btn btn-primary" style="margin-top: 1.5rem;">Save Settings</button>

                            <div style="margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid #3e3e42;">
                                <label>Paramètres PDF</label>
                                <div style="display: flex; align-items: center; gap: 0.5rem; margin-top: 0.5rem;">
                                    <span class="icon">📄</span>
                                    <a href="#" data-route="/pdf-settings" style="color: #2196f3; text-decoration: none; font-weight: 500;">⚙️ Gérer les paramètres PDF (Header, Footer, Tableau)</a>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </main>
        </div>
    `;
}
