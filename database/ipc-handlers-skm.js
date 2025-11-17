const { ipcMain } = require('electron');
const { initDatabase, skmDevisOps, skmPdfOps } = require('./db_skm');

// Register all SKM IPC handlers
async function registerSKMHandlers() {
    // Initialize SKM database first
    await initDatabase();
    
    // SKM Devis Numbers handlers
    ipcMain.handle('db:skm:devis:exists', async (event, devisNumber, year) => {
        try {
            const exists = skmDevisOps.exists(devisNumber, year);
            return { success: true, data: exists };
        } catch (error) {
            console.error('❌ [SKM] Error checking devis number:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:skm:devis:add', async (event, devisNumber, year) => {
        try {
            const result = skmDevisOps.add(devisNumber, year);
            return { success: true, data: result };
        } catch (error) {
            console.error('❌ [SKM] Error adding devis number:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:skm:devis:getByYear', async (event, year) => {
        try {
            const data = skmDevisOps.getByYear(year);
            return { success: true, data };
        } catch (error) {
            console.error('❌ [SKM] Error getting devis by year:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:skm:devis:getAll', async () => {
        try {
            const data = skmDevisOps.getAll();
            return { success: true, data };
        } catch (error) {
            console.error('❌ [SKM] Error getting all devis:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:skm:devis:getLast', async (event, year) => {
        try {
            console.log('🔍 [SKM] Getting last devis for year:', year);
            const data = skmDevisOps.getLast(year);
            console.log('📋 [SKM] Last devis result:', data);
            return { success: true, data };
        } catch (error) {
            console.error('❌ [SKM] Error getting last devis:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:skm:devis:getMax', async (event, year) => {
        try {
            console.log('🔍 [SKM] Getting max devis for year:', year);
            const data = skmDevisOps.getMax(year);
            console.log('📋 [SKM] Max devis result:', data);
            return { success: true, data };
        } catch (error) {
            console.error('❌ [SKM] Error getting max devis:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:skm:devis:delete', async (event, devisNumber, year) => {
        try {
            const result = skmDevisOps.delete(devisNumber, year);
            return { success: true, data: result };
        } catch (error) {
            console.error('❌ [SKM] Error deleting devis number:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:skm:devis:clearAll', async () => {
        try {
            const result = skmDevisOps.clearAll();
            return { success: true, data: result };
        } catch (error) {
            console.error('❌ [SKM] Error clearing all devis:', error);
            return { success: false, error: error.message };
        }
    });

    // SKM PDF Files handlers
    ipcMain.handle('db:skm:pdf:savePath', async (event, devisNumber, year, filePath, createdBy) => {
        try {
            const result = skmPdfOps.savePdfPath(devisNumber, year, filePath, createdBy);
            return { success: true, data: result };
        } catch (error) {
            console.error('❌ [SKM] Error saving PDF path:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:skm:pdf:getPath', async (event, devisNumber, year) => {
        try {
            const data = skmPdfOps.getPdfPath(devisNumber, year);
            return { success: true, data };
        } catch (error) {
            console.error('❌ [SKM] Error getting PDF path:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:skm:pdf:deletePath', async (event, devisNumber, year) => {
        try {
            const result = skmPdfOps.deletePdfPath(devisNumber, year);
            return { success: true, data: result };
        } catch (error) {
            console.error('❌ [SKM] Error deleting PDF path:', error);
            return { success: false, error: error.message };
        }
    });

    console.log('✅ [SKM] IPC handlers registered successfully');
}

module.exports = {
    registerSKMHandlers
};
