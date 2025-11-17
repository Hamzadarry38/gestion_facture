const { ipcMain } = require('electron');
const { initDatabase, saaissDevisOps, saaissPdfOps } = require('./db_saaiss');

// Register all SAAISS IPC handlers
async function registerSAAISSHandlers() {
    // Initialize SAAISS database first
    await initDatabase();
    
    // SAAISS Devis Numbers handlers
    ipcMain.handle('db:saaiss:devis:exists', async (event, devisNumber, year) => {
        try {
            const exists = saaissDevisOps.exists(devisNumber, year);
            return { success: true, data: exists };
        } catch (error) {
            console.error('❌ [SAAISS] Error checking devis number:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:saaiss:devis:add', async (event, devisNumber, year) => {
        try {
            const result = saaissDevisOps.add(devisNumber, year);
            return { success: true, data: result };
        } catch (error) {
            console.error('❌ [SAAISS] Error adding devis number:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:saaiss:devis:getByYear', async (event, year) => {
        try {
            const data = saaissDevisOps.getByYear(year);
            return { success: true, data };
        } catch (error) {
            console.error('❌ [SAAISS] Error getting devis by year:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:saaiss:devis:getAll', async () => {
        try {
            const data = saaissDevisOps.getAll();
            return { success: true, data };
        } catch (error) {
            console.error('❌ [SAAISS] Error getting all devis:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:saaiss:devis:getLast', async (event, year) => {
        try {
            console.log('🔍 [SAAISS] Getting last devis for year:', year);
            const data = saaissDevisOps.getLast(year);
            console.log('📋 [SAAISS] Last devis result:', data);
            return { success: true, data };
        } catch (error) {
            console.error('❌ [SAAISS] Error getting last devis:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:saaiss:devis:getMax', async (event, year) => {
        try {
            console.log('🔍 [SAAISS] Getting max devis for year:', year);
            const data = saaissDevisOps.getMax(year);
            console.log('📋 [SAAISS] Max devis result:', data);
            return { success: true, data };
        } catch (error) {
            console.error('❌ [SAAISS] Error getting max devis:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:saaiss:devis:delete', async (event, devisNumber, year) => {
        try {
            const result = saaissDevisOps.delete(devisNumber, year);
            return { success: true, data: result };
        } catch (error) {
            console.error('❌ [SAAISS] Error deleting devis number:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:saaiss:devis:clearAll', async () => {
        try {
            const result = saaissDevisOps.clearAll();
            return { success: true, data: result };
        } catch (error) {
            console.error('❌ [SAAISS] Error clearing all devis:', error);
            return { success: false, error: error.message };
        }
    });

    // SAAISS PDF Files handlers
    ipcMain.handle('db:saaiss:pdf:savePath', async (event, devisNumber, year, filePath, createdBy) => {
        try {
            const result = saaissPdfOps.savePdfPath(devisNumber, year, filePath, createdBy);
            return { success: true, data: result };
        } catch (error) {
            console.error('❌ [SAAISS] Error saving PDF path:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:saaiss:pdf:getPath', async (event, devisNumber, year) => {
        try {
            const data = saaissPdfOps.getPdfPath(devisNumber, year);
            return { success: true, data };
        } catch (error) {
            console.error('❌ [SAAISS] Error getting PDF path:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:saaiss:pdf:deletePath', async (event, devisNumber, year) => {
        try {
            const result = saaissPdfOps.deletePdfPath(devisNumber, year);
            return { success: true, data: result };
        } catch (error) {
            console.error('❌ [SAAISS] Error deleting PDF path:', error);
            return { success: false, error: error.message };
        }
    });

    console.log('✅ [SAAISS] IPC handlers registered successfully');
}

module.exports = {
    registerSAAISSHandlers
};
