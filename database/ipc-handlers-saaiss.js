const { ipcMain } = require('electron');
const apiClient = require('./api-client');

// Register all SAAISS IPC handlers
async function registerSAAISSHandlers() {
    console.log('🔌 Registering SAAISS handlers with API Backend (Postgres) - Online Only');

    const COMPANY_CODE = 'SAAISS';

    // SAAISS Devis Numbers handlers
    ipcMain.handle('db:saaiss:devis:exists', async (event, devisNumber, year) => {
        try {
            const result = await apiClient.getDevis(COMPANY_CODE);
            if (!result.success) throw new Error(result.error);
            const exists = result.data.some(d => d.devis_number === devisNumber && d.year === year);
            return { success: true, data: exists };
        } catch (error) {
            console.error('❌ [SAAISS] Error checking devis number (API):', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:saaiss:devis:add', async (event, devisNumber, year) => {
        try {
            return await apiClient.addDevis(COMPANY_CODE, devisNumber, year);
        } catch (error) {
            console.error('❌ [SAAISS] Error adding devis number (API):', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:saaiss:devis:getByYear', async (event, year) => {
        try {
            const result = await apiClient.getDevis(COMPANY_CODE);
            if (!result.success) throw new Error(result.error);
            const data = result.data.filter(d => d.year === year);
            return { success: true, data };
        } catch (error) {
            console.error('❌ [SAAISS] Error getting devis by year (API):', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:saaiss:devis:getAll', async () => {
        try {
            return await apiClient.getDevis(COMPANY_CODE);
        } catch (error) {
            console.error('❌ [SAAISS] Error getting all devis (API):', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:saaiss:devis:getLast', async (event, year) => {
        try {
            return await apiClient.getLastDevis(COMPANY_CODE, year);
        } catch (error) {
            console.error('❌ [SAAISS] Error getting last devis (API):', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:saaiss:devis:getMax', async (event, year) => {
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
            console.error('❌ [SAAISS] Error getting max devis (API):', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:saaiss:devis:delete', async (event, devisNumber, year) => {
        try {
            return await apiClient.deleteDevis(COMPANY_CODE, devisNumber, year);
        } catch (error) {
            console.error('❌ [SAAISS] Error deleting devis number (API):', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:saaiss:devis:clearAll', async () => {
        try {
            // API doesn't have clearAll for secondary companies yet, but we could add it.
            // For now, let's keep it locally or log not implemented.
            throw new Error('API clearAll not implemented');
        } catch (error) {
            console.error('❌ [SAAISS] Error clearing all devis (API):', error);
            return { success: false, error: error.message };
        }
    });

    // SAAISS PDF Files handlers
    ipcMain.handle('db:saaiss:pdf:savePath', async (event, devisNumber, year, filePath, createdBy) => {
        try {
            return await apiClient.savePdfPath(COMPANY_CODE, devisNumber, year, filePath, createdBy);
        } catch (error) {
            console.error('❌ [SAAISS] Error saving PDF path (API):', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:saaiss:pdf:getPath', async (event, devisNumber, year) => {
        try {
            return await apiClient.getPdfPath(COMPANY_CODE, devisNumber, year);
        } catch (error) {
            console.error('❌ [SAAISS] Error getting PDF path (API):', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:saaiss:pdf:getAllPaths', async () => {
        try {
            return await apiClient.getAllPdfPaths(COMPANY_CODE);
        } catch (error) {
            console.error('❌ [SAAISS] Error getting all PDF paths (API):', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:saaiss:pdf:deletePath', async (event, devisNumber, year) => {
        try {
            // API doesn't have delete PDF path, but we could add it.
            throw new Error('API deletePath not implemented');
        } catch (error) {
            console.error('❌ [SAAISS] Error deleting PDF path (API):', error);
            return { success: false, error: error.message };
        }
    });

    console.log('✅ [SAAISS] IPC handlers registered (API Edition)');
}

module.exports = {
    registerSAAISSHandlers
};
