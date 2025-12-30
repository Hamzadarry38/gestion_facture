const { ipcMain } = require('electron');
const { initDatabase, benaliDevisOps, benaliPdfOps } = require('./db_benali');

// Register all BEN ALI IPC handlers
async function registerBenAliHandlers() {
    // Initialize BEN ALI database first
    await initDatabase();

    // BEN ALI Devis Numbers handlers
    ipcMain.handle('db:benali:devis:exists', async (event, devisNumber, year) => {
        try {
            const exists = benaliDevisOps.exists(devisNumber, year);
            return { success: true, data: exists };
        } catch (error) {
            console.error('❌ [BEN ALI] Error checking devis number:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:benali:devis:add', async (event, devisNumber, year) => {
        try {
            const result = benaliDevisOps.add(devisNumber, year);
            return { success: true, data: result };
        } catch (error) {
            console.error('❌ [BEN ALI] Error adding devis number:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:benali:devis:getByYear', async (event, year) => {
        try {
            const data = benaliDevisOps.getByYear(year);
            return { success: true, data };
        } catch (error) {
            console.error('❌ [BEN ALI] Error getting devis by year:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:benali:devis:getAll', async () => {
        try {
            const data = benaliDevisOps.getAll();
            return { success: true, data };
        } catch (error) {
            console.error('❌ [BEN ALI] Error getting all devis:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:benali:devis:getLast', async (event, year) => {
        try {
            console.log('🔍 [BEN ALI] Getting last devis for year:', year);
            const data = benaliDevisOps.getLast(year);
            console.log('📋 [BEN ALI] Last devis result:', data);
            return { success: true, data };
        } catch (error) {
            console.error('❌ [BEN ALI] Error getting last devis:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:benali:devis:getMax', async (event, year) => {
        try {
            console.log('🔍 [BEN ALI] Getting max devis for year:', year);
            const data = benaliDevisOps.getMax(year);
            console.log('📋 [BEN ALI] Max devis result:', data);
            return { success: true, data };
        } catch (error) {
            console.error('❌ [BEN ALI] Error getting max devis:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:benali:devis:delete', async (event, devisNumber, year) => {
        try {
            const result = benaliDevisOps.delete(devisNumber, year);
            return { success: true, data: result };
        } catch (error) {
            console.error('❌ [BEN ALI] Error deleting devis number:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:benali:devis:clearAll', async () => {
        try {
            const result = benaliDevisOps.clearAll();
            return { success: true, data: result };
        } catch (error) {
            console.error('❌ [BEN ALI] Error clearing all devis:', error);
            return { success: false, error: error.message };
        }
    });

    // BEN ALI PDF Files handlers
    ipcMain.handle('db:benali:pdf:savePath', async (event, devisNumber, year, filePath, createdBy) => {
        try {
            const result = benaliPdfOps.savePdfPath(devisNumber, year, filePath, createdBy);
            return { success: true, data: result };
        } catch (error) {
            console.error('❌ [BEN ALI] Error saving PDF path:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:benali:pdf:getPath', async (event, devisNumber, year) => {
        try {
            const data = benaliPdfOps.getPdfPath(devisNumber, year);
            return { success: true, data };
        } catch (error) {
            console.error('❌ [BEN ALI] Error getting PDF path:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:benali:pdf:deletePath', async (event, devisNumber, year) => {
        try {
            const result = benaliPdfOps.deletePdfPath(devisNumber, year);
            return { success: true, data: result };
        } catch (error) {
            console.error('❌ [BEN ALI] Error deleting PDF path:', error);
            return { success: false, error: error.message };
        }
    });

    console.log('✅ [BEN ALI] IPC handlers registered successfully');
}

module.exports = {
    registerBenAliHandlers
};
