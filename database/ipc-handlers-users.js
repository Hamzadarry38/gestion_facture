const { ipcMain } = require('electron');
const { initializeDatabase, createUser, verifyUser, hasUsers, getAllUsers } = require('./db_users');

async function registerUsersHandlers() {
    // console.log('📝 Registering Users IPC handlers...');
    
    // Initialize database first
    await initializeDatabase();

    // Register new user
    ipcMain.handle('users:register', async (event, { name, email, password }) => {
        try {
            const user = await createUser(name, email, password);
            return { success: true, user };
        } catch (error) {
            console.error('Error registering user:', error);
            return { success: false, error: error.message };
        }
    });

    // Login user
    ipcMain.handle('users:login', async (event, { email, password }) => {
        try {
            const user = await verifyUser(email, password);
            if (user) {
                return { success: true, user };
            } else {
                return { success: false, error: 'Invalid email or password' };
            }
        } catch (error) {
            console.error('Error logging in:', error);
            return { success: false, error: error.message };
        }
    });

    // Check if any users exist
    ipcMain.handle('users:hasUsers', async () => {
        try {
            const exists = await hasUsers();
            return { success: true, hasUsers: exists };
        } catch (error) {
            console.error('Error checking users:', error);
            return { success: false, error: error.message };
        }
    });

    // Get all users
    ipcMain.handle('users:getAll', async () => {
        try {
            const users = await getAllUsers();
            return { success: true, users };
        } catch (error) {
            console.error('Error getting users:', error);
            return { success: false, error: error.message };
        }
    });

    // console.log('✅ Users IPC handlers registered');
}

module.exports = { registerUsersHandlers };
