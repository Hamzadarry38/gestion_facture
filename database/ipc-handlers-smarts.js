const { ipcMain } = require('electron');
const { initDatabase, smartSDevisOps, smartSPdfOps } = require('./db_smarts');

// Register all SMART SERVICES IPC handlers
async function registerSmartSHandlers() {
    // Initialize SMART SERVICES database first
    await initDatabase();

    // SMART SERVICES Devis Numbers handlers
    ipcMain.handle('db:smarts:devis:exists', async (event, devisNumber, year) => {
        try {
            const exists = smartSDevisOps.exists(devisNumber, year);
            return { success: true, data: exists };
        } catch (error) {
            console.error('❌ [SMART SERVICES] Error checking devis number:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:smarts:devis:add', async (event, devisNumber, year) => {
        try {
            const result = smartSDevisOps.add(devisNumber, year);
            return { success: true, data: result };
        } catch (error) {
            console.error('❌ [SMART SERVICES] Error adding devis number:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:smarts:devis:getByYear', async (event, year) => {
        try {
            const data = smartSDevisOps.getByYear(year);
            return { success: true, data };
        } catch (error) {
            console.error('❌ [SMART SERVICES] Error getting devis by year:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:smarts:devis:getAll', async () => {
        try {
            const data = smartSDevisOps.getAll();
            return { success: true, data };
        } catch (error) {
            console.error('❌ [SMART SERVICES] Error getting all devis:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:smarts:devis:getLast', async (event, year) => {
        try {
            console.log('🔍 [SMART SERVICES] Getting last devis for year:', year);
            const data = smartSDevisOps.getLast(year);
            console.log('📋 [SMART SERVICES] Last devis result:', data);
            return { success: true, data };
        } catch (error) {
            console.error('❌ [SMART SERVICES] Error getting last devis:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:smarts:devis:getMax', async (event, year) => {
        try {
            console.log('🔍 [SMART SERVICES] Getting max devis for year:', year);
            const data = smartSDevisOps.getMax(year);
            console.log('📋 [SMART SERVICES] Max devis result:', data);
            return { success: true, data };
        } catch (error) {
            console.error('❌ [SMART SERVICES] Error getting max devis:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:smarts:devis:delete', async (event, devisNumber, year) => {
        try {
            const result = smartSDevisOps.delete(devisNumber, year);
            return { success: true, data: result };
        } catch (error) {
            console.error('❌ [SMART SERVICES] Error deleting devis number:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:smarts:devis:clearAll', async () => {
        try {
            const result = smartSDevisOps.clearAll();
            return { success: true, data: result };
        } catch (error) {
            console.error('❌ [SMART SERVICES] Error clearing all devis:', error);
            return { success: false, error: error.message };
        }
    });

    // SMART SERVICES PDF Files handlers
    ipcMain.handle('db:smarts:pdf:savePath', async (event, devisNumber, year, filePath, createdBy) => {
        try {
            const result = smartSPdfOps.savePdfPath(devisNumber, year, filePath, createdBy);
            return { success: true, data: result };
        } catch (error) {
            console.error('❌ [SMART SERVICES] Error saving PDF path:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:smarts:pdf:getPath', async (event, devisNumber, year) => {
        try {
            const data = smartSPdfOps.getPdfPath(devisNumber, year);
            return { success: true, data };
        } catch (error) {
            console.error('❌ [SMART SERVICES] Error getting PDF path:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:smarts:pdf:deletePath', async (event, devisNumber, year) => {
        try {
            const result = smartSPdfOps.deletePdfPath(devisNumber, year);
            return { success: true, data: result };
        } catch (error) {
            console.error('❌ [SMART SERVICES] Error deleting PDF path:', error);
            return { success: false, error: error.message };
        }
    });

    console.log('✅ [SMART SERVICES] IPC handlers registered successfully');
}

module.exports = {
    registerSmartSHandlers
};
