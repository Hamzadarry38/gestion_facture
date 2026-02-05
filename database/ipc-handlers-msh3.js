const { ipcMain } = require('electron');
const { initDatabase, msh3DevisOps, msh3PdfOps } = require('./db_msh3');
const apiClient = require('./api-client');

// Register all MSH3 SERVICES IPC handlers
async function registerMsh3Handlers() {
    // Initialize MSH3 SERVICES database first
    await initDatabase();
    console.log('🔌 Registering MSH3 handlers with API Backend (Postgres)');

    const COMPANY_CODE = 'MSH3';

    // MSH3 SERVICES Devis Numbers handlers
    ipcMain.handle('db:msh3:devis:exists', async (event, devisNumber, year) => {
        try {
            const result = await apiClient.getDevis(COMPANY_CODE);
            if (!result.success) throw new Error(result.error);
            const exists = result.data.some(d => d.devis_number === devisNumber && d.year === year);
            return { success: true, data: exists };
        } catch (error) {
            console.error('❌ [MSH3 SERVICES] Error checking devis number (API):', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:msh3:devis:add', async (event, devisNumber, year) => {
        try {
            return await apiClient.addDevis(COMPANY_CODE, devisNumber, year);
        } catch (error) {
            console.error('❌ [MSH3 SERVICES] Error adding devis number (API):', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:msh3:devis:getByYear', async (event, year) => {
        try {
            const result = await apiClient.getDevis(COMPANY_CODE);
            if (!result.success) throw new Error(result.error);
            const data = result.data.filter(d => d.year === year);
            return { success: true, data };
        } catch (error) {
            console.error('❌ [MSH3 SERVICES] Error getting devis by year (API):', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:msh3:devis:getAll', async () => {
        try {
            return await apiClient.getDevis(COMPANY_CODE);
        } catch (error) {
            console.error('❌ [MSH3 SERVICES] Error getting all devis (API):', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:msh3:devis:getLast', async (event, year) => {
        try {
            return await apiClient.getLastDevis(COMPANY_CODE, year);
        } catch (error) {
            console.error('❌ [MSH3 SERVICES] Error getting last devis (API):', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:msh3:devis:getMax', async (event, year) => {
        try {
            const result = await apiClient.getDevis(COMPANY_CODE);
            if (!result.success) throw new Error(result.error);

            const allDevis = result.data.filter(d => d.year === year);
            if (allDevis.length === 0) return { success: true, data: null };

            let maxDevis = null;
            let maxNumber = 0;

            allDevis.forEach(item => {
                const match = item.devis_number.match(/^(\d+)\/\d+$/);
                if (match) {
                    const number = parseInt(match[1]);
                    if (number > maxNumber) {
                        maxNumber = number;
                        maxDevis = item;
                    }
                }
            });

            return { success: true, data: maxDevis };
        } catch (error) {
            console.error('❌ [MSH3 SERVICES] Error getting max devis (API):', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:msh3:devis:delete', async (event, devisNumber, year) => {
        try {
            return await apiClient.deleteDevis(COMPANY_CODE, devisNumber, year);
        } catch (error) {
            console.error('❌ [MSH3 SERVICES] Error deleting devis number (API):', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:msh3:devis:clearAll', async () => {
        try {
            throw new Error('API clearAll not implemented');
        } catch (error) {
            console.error('❌ [MSH3 SERVICES] Error clearing all devis (API):', error);
            return { success: false, error: error.message };
        }
    });

    // MSH3 SERVICES PDF Files handlers
    ipcMain.handle('db:msh3:pdf:savePath', async (event, devisNumber, year, filePath, createdBy) => {
        try {
            return await apiClient.savePdfPath(COMPANY_CODE, devisNumber, year, filePath, createdBy);
        } catch (error) {
            console.error('❌ [MSH3 SERVICES] Error saving PDF path (API):', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:msh3:pdf:getPath', async (event, devisNumber, year) => {
        try {
            return await apiClient.getPdfPath(COMPANY_CODE, devisNumber, year);
        } catch (error) {
            console.error('❌ [MSH3 SERVICES] Error getting PDF path (API):', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:msh3:pdf:deletePath', async (event, devisNumber, year) => {
        try {
            throw new Error('API deletePath not implemented');
        } catch (error) {
            console.error('❌ [MSH3 SERVICES] Error deleting PDF path (API):', error);
            return { success: false, error: error.message };
        }
    });

    console.log('✅ [MSH3 SERVICES] IPC handlers registered (API Edition)');
}

module.exports = {
    registerMsh3Handlers
};
