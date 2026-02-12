const { ipcMain } = require('electron');
const apiClient = require('./api-client');

async function registerUsersHandlers() {
    // console.log('📝 Registering Users IPC handlers (API Version)...');

    // API client doesn't need explicit initialization like SQLite

    // Register new user
    ipcMain.handle('users:register', async (event, { name, email, password }) => {
        try {
            const result = await apiClient.register(name, email, password);
            if (result.success) {
                return { success: true, user: result.user };
            } else {
                return { success: false, error: result.error || 'Registration failed' };
            }
        } catch (error) {
            console.error('Error registering user (API):', error);
            return { success: false, error: error.message };
        }
    });

    // Login user
    ipcMain.handle('users:login', async (event, { email, password }) => {
        try {
            const result = await apiClient.login(email, password);
            if (result.success) {
                return { success: true, user: result.user };
            } else {
                return { success: false, error: result.message || 'Invalid email or password' };
            }
        } catch (error) {
            // Check for 401 specifically
            if (error.response && error.response.status === 401) {
                return { success: false, error: 'Invalid email or password' };
            }
            console.error('Error logging in (API):', error);
            return { success: false, error: error.message };
        }
    });

    // Check if any users exist
    ipcMain.handle('users:hasUsers', async () => {
        try {
            const result = await apiClient.getUsersCount();
            if (result.success) {
                return { success: true, hasUsers: result.count > 0 };
            } else {
                return { success: false, error: result.error };
            }
        } catch (error) {
            console.error('Error checking users (API):', error);
            // Fallback: assume false if API error? Or report error.
            // Be safe, return error so UI handle it.
            return { success: false, error: error.message };
        }
    });

    // Get all users
    ipcMain.handle('users:getAll', async () => {
        try {
            const result = await apiClient.getUsers();
            if (result.success) {
                return {
                    success: true,
                    data: result.users, // For new features (data)
                    users: result.users  // For legacy (login.js)
                };
            } else {
                return { success: false, error: result.error };
            }
        } catch (error) {
            console.error('Error getting users (API):', error);
            return { success: false, error: error.message };
        }
    });

    // Get users count
    ipcMain.handle('users:count', async () => {
        try {
            const result = await apiClient.getUsersCount();
            return result;
        } catch (error) {
            console.error('Error counting users (API):', error);
            return { success: false, error: error.message };
        }
    });

    // Update password
    ipcMain.handle('users:updatePassword', async (event, { email, oldPassword, newPassword }) => {
        try {
            console.log('🔐 [IPC] Password update request for:', email);
            const result = await apiClient.updatePassword(email, oldPassword, newPassword);
            if (result.success) {
                console.log('✅ [IPC] Password update successful for:', email);
                return { success: true, message: result.message };
            } else {
                return { success: false, error: result.message || result.error };
            }
        } catch (error) {
            console.error('❌ [IPC] Error updating password (API):', error.message);
            if (error.response && error.response.status === 401) {
                return { success: false, error: 'Ancien mot de passe incorrect' };
            }
            return { success: false, error: error.message };
        }
    });

    // Update user permissions
    ipcMain.handle('users:updatePermissions', async (event, id, canAutoValidate) => {
        try {
            const result = await apiClient.updateUserPermissions(id, canAutoValidate);
            if (result.success) {
                return { success: true, message: result.message };
            } else {
                return { success: false, error: result.error };
            }
        } catch (error) {
            console.error('Error updating user permissions (API):', error);
            return { success: false, error: error.message };
        }
    });

    // console.log('✅ Users IPC handlers registered (API)');
}

module.exports = { registerUsersHandlers };
