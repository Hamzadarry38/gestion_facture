const { ipcMain } = require('electron');
const { initDatabase, smartSDevisOps, smartSPdfOps } = require('./db_smarts');
const apiClient = require('./api-client');

// Register all SMART SERVICES IPC handlers
async function registerSmartSHandlers() {
    // Initialize SMART SERVICES database first
    await initDatabase();
    console.log('🔌 Registering SMARTS handlers with API Backend (Postgres)');

    const COMPANY_CODE = 'SMARTS';

    // SMART SERVICES Devis Numbers handlers
    ipcMain.handle('db:smarts:devis:exists', async (event, devisNumber, year) => {
        try {
            const result = await apiClient.getDevis(COMPANY_CODE);
            if (!result.success) throw new Error(result.error);
            const exists = result.data.some(d => d.devis_number === devisNumber && d.year === year);
            return { success: true, data: exists };
        } catch (error) {
            console.error('❌ [SMART SERVICES] Error checking devis number (API):', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:smarts:devis:add', async (event, devisNumber, year) => {
        try {
            return await apiClient.addDevis(COMPANY_CODE, devisNumber, year);
        } catch (error) {
            console.error('❌ [SMART SERVICES] Error adding devis number (API):', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:smarts:devis:getByYear', async (event, year) => {
        try {
            const result = await apiClient.getDevis(COMPANY_CODE);
            if (!result.success) throw new Error(result.error);
            const data = result.data.filter(d => d.year === year);
            return { success: true, data };
        } catch (error) {
            console.error('❌ [SMART SERVICES] Error getting devis by year (API):', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:smarts:devis:getAll', async () => {
        try {
            return await apiClient.getDevis(COMPANY_CODE);
        } catch (error) {
            console.error('❌ [SMART SERVICES] Error getting all devis (API):', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:smarts:devis:getLast', async (event, year) => {
        try {
            return await apiClient.getLastDevis(COMPANY_CODE, year);
        } catch (error) {
            console.error('❌ [SMART SERVICES] Error getting last devis (API):', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:smarts:devis:getMax', async (event, year) => {
        try {
            const result = await apiClient.getDevis(COMPANY_CODE);
            if (!result.success) throw new Error(result.error);

            const allDevis = result.data.filter(d => d.year === year);
            if (allDevis.length === 0) return { success: true, data: null };

            let maxDevis = null;
            let maxNumber = 0;

            allDevis.forEach(item => {
                const match = item.devis_number.trim().match(/^(\d+)\s*\/\s*\d+$/);
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
            console.error('❌ [SMART SERVICES] Error getting max devis (API):', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:smarts:devis:delete', async (event, devisNumber, year) => {
        try {
            return await apiClient.deleteDevis(COMPANY_CODE, devisNumber, year);
        } catch (error) {
            console.error('❌ [SMART SERVICES] Error deleting devis number (API):', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:smarts:devis:clearAll', async () => {
        try {
            throw new Error('API clearAll not implemented');
        } catch (error) {
            console.error('❌ [SMART SERVICES] Error clearing all devis (API):', error);
            return { success: false, error: error.message };
        }
    });

    // SMART SERVICES PDF Files handlers
    ipcMain.handle('db:smarts:pdf:savePath', async (event, devisNumber, year, filePath, createdBy) => {
        try {
            return await apiClient.savePdfPath(COMPANY_CODE, devisNumber, year, filePath, createdBy);
        } catch (error) {
            console.error('❌ [SMART SERVICES] Error saving PDF path (API):', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:smarts:pdf:getPath', async (event, devisNumber, year) => {
        try {
            return await apiClient.getPdfPath(COMPANY_CODE, devisNumber, year);
        } catch (error) {
            console.error('❌ [SMART SERVICES] Error getting PDF path (API):', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:smarts:pdf:deletePath', async (event, devisNumber, year) => {
        try {
            throw new Error('API deletePath not implemented');
        } catch (error) {
            console.error('❌ [SMART SERVICES] Error deleting PDF path (API):', error);
            return { success: false, error: error.message };
        }
    });

    console.log('✅ [SMART SERVICES] IPC handlers registered (API Edition)');
}

module.exports = {
    registerSmartSHandlers
};
