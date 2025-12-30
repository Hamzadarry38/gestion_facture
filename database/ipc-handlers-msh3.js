const { ipcMain } = require('electron');
const { initDatabase, msh3DevisOps, msh3PdfOps } = require('./db_msh3');

// Register all MSH3 SERVICES IPC handlers
async function registerMsh3Handlers() {
    // Initialize MSH3 SERVICES database first
    await initDatabase();

    // MSH3 SERVICES Devis Numbers handlers
    ipcMain.handle('db:msh3:devis:exists', async (event, devisNumber, year) => {
        try {
            const exists = msh3DevisOps.exists(devisNumber, year);
            return { success: true, data: exists };
        } catch (error) {
            console.error('❌ [MSH3 SERVICES] Error checking devis number:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:msh3:devis:add', async (event, devisNumber, year) => {
        try {
            const result = msh3DevisOps.add(devisNumber, year);
            return { success: true, data: result };
        } catch (error) {
            console.error('❌ [MSH3 SERVICES] Error adding devis number:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:msh3:devis:getByYear', async (event, year) => {
        try {
            const data = msh3DevisOps.getByYear(year);
            return { success: true, data };
        } catch (error) {
            console.error('❌ [MSH3 SERVICES] Error getting devis by year:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:msh3:devis:getAll', async () => {
        try {
            const data = msh3DevisOps.getAll();
            return { success: true, data };
        } catch (error) {
            console.error('❌ [MSH3 SERVICES] Error getting all devis:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:msh3:devis:getLast', async (event, year) => {
        try {
            console.log('🔍 [MSH3 SERVICES] Getting last devis for year:', year);
            const data = msh3DevisOps.getLast(year);
            console.log('📋 [MSH3 SERVICES] Last devis result:', data);
            return { success: true, data };
        } catch (error) {
            console.error('❌ [MSH3 SERVICES] Error getting last devis:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:msh3:devis:getMax', async (event, year) => {
        try {
            console.log('🔍 [MSH3 SERVICES] Getting max devis for year:', year);
            const data = msh3DevisOps.getMax(year);
            console.log('📋 [MSH3 SERVICES] Max devis result:', data);
            return { success: true, data };
        } catch (error) {
            console.error('❌ [MSH3 SERVICES] Error getting max devis:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:msh3:devis:delete', async (event, devisNumber, year) => {
        try {
            const result = msh3DevisOps.delete(devisNumber, year);
            return { success: true, data: result };
        } catch (error) {
            console.error('❌ [MSH3 SERVICES] Error deleting devis number:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:msh3:devis:clearAll', async () => {
        try {
            const result = msh3DevisOps.clearAll();
            return { success: true, data: result };
        } catch (error) {
            console.error('❌ [MSH3 SERVICES] Error clearing all devis:', error);
            return { success: false, error: error.message };
        }
    });

    // MSH3 SERVICES PDF Files handlers
    ipcMain.handle('db:msh3:pdf:savePath', async (event, devisNumber, year, filePath, createdBy) => {
        try {
            const result = msh3PdfOps.savePdfPath(devisNumber, year, filePath, createdBy);
            return { success: true, data: result };
        } catch (error) {
            console.error('❌ [MSH3 SERVICES] Error saving PDF path:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:msh3:pdf:getPath', async (event, devisNumber, year) => {
        try {
            const data = msh3PdfOps.getPdfPath(devisNumber, year);
            return { success: true, data };
        } catch (error) {
            console.error('❌ [MSH3 SERVICES] Error getting PDF path:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:msh3:pdf:deletePath', async (event, devisNumber, year) => {
        try {
            const result = msh3PdfOps.deletePdfPath(devisNumber, year);
            return { success: true, data: result };
        } catch (error) {
            console.error('❌ [MSH3 SERVICES] Error deleting PDF path:', error);
            return { success: false, error: error.message };
        }
    });

    console.log('✅ [MSH3 SERVICES] IPC handlers registered successfully');
}

module.exports = {
    registerMsh3Handlers
};
