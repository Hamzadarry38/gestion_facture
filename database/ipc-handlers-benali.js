const { ipcMain } = require('electron');
const apiClient = require('./api-client');

// Register all BEN ALI IPC handlers
async function registerBenAliHandlers() {
    console.log('🔌 Registering BENALI handlers with API Backend (Postgres) - Online Only');

    const COMPANY_CODE = 'BENALI';

    // BEN ALI Devis Numbers handlers
    ipcMain.handle('db:benali:devis:exists', async (event, devisNumber, year) => {
        try {
            const result = await apiClient.getDevis(COMPANY_CODE);
            if (!result.success) throw new Error(result.error);
            const exists = result.data.some(d => d.devis_number === devisNumber && d.year === year);
            return { success: true, data: exists };
        } catch (error) {
            console.error('❌ [BEN ALI] Error checking devis number (API):', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:benali:devis:add', async (event, devisNumber, year) => {
        try {
            return await apiClient.addDevis(COMPANY_CODE, devisNumber, year);
        } catch (error) {
            console.error('❌ [BEN ALI] Error adding devis number (API):', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:benali:devis:getByYear', async (event, year) => {
        try {
            const result = await apiClient.getDevis(COMPANY_CODE);
            if (!result.success) throw new Error(result.error);
            const data = result.data.filter(d => d.year === year);
            return { success: true, data };
        } catch (error) {
            console.error('❌ [BEN ALI] Error getting devis by year (API):', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:benali:devis:getAll', async () => {
        try {
            return await apiClient.getDevis(COMPANY_CODE);
        } catch (error) {
            console.error('❌ [BEN ALI] Error getting all devis (API):', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:benali:devis:getLast', async (event, year) => {
        try {
            return await apiClient.getLastDevis(COMPANY_CODE, year);
        } catch (error) {
            console.error('❌ [BEN ALI] Error getting last devis (API):', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:benali:devis:getMax', async (event, year) => {
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
            console.error('❌ [BEN ALI] Error getting max devis (API):', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:benali:devis:delete', async (event, devisNumber, year) => {
        try {
            return await apiClient.deleteDevis(COMPANY_CODE, devisNumber, year);
        } catch (error) {
            console.error('❌ [BEN ALI] Error deleting devis number (API):', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:benali:devis:clearAll', async () => {
        try {
            throw new Error('API clearAll not implemented');
        } catch (error) {
            console.error('❌ [BEN ALI] Error clearing all devis (API):', error);
            return { success: false, error: error.message };
        }
    });

    // BEN ALI PDF Files handlers
    ipcMain.handle('db:benali:pdf:savePath', async (event, devisNumber, year, filePath, createdBy) => {
        try {
            return await apiClient.savePdfPath(COMPANY_CODE, devisNumber, year, filePath, createdBy);
        } catch (error) {
            console.error('❌ [BEN ALI] Error saving PDF path (API):', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:benali:pdf:getPath', async (event, devisNumber, year) => {
        try {
            return await apiClient.getPdfPath(COMPANY_CODE, devisNumber, year);
        } catch (error) {
            console.error('❌ [BEN ALI] Error getting PDF path (API):', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:benali:pdf:getAllPaths', async () => {
        try {
            return await apiClient.getAllPdfPaths(COMPANY_CODE);
        } catch (error) {
            console.error('❌ [BEN ALI] Error getting all PDF paths (API):', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:benali:pdf:deletePath', async (event, devisNumber, year) => {
        try {
            throw new Error('API deletePath not implemented');
        } catch (error) {
            console.error('❌ [BEN ALI] Error deleting PDF path (API):', error);
            return { success: false, error: error.message };
        }
    });

    // BEN ALI PDF Settings (percentage, product names)
    ipcMain.handle('db:benali:pdfSettings:get', async () => {
        try {
            return await apiClient.getPdfSettings('BENALI');
        } catch (error) {
            console.error('❌ [BEN ALI] Error getting PDF settings:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:benali:pdfSettings:save', async (event, percentage, productNames) => {
        try {
            return await apiClient.savePdfSettings('BENALI', percentage, productNames);
        } catch (error) {
            console.error('❌ [BEN ALI] Error saving PDF settings:', error);
            return { success: false, error: error.message };
        }
    });

    console.log('✅ [BEN ALI] IPC handlers registered (API Edition)');
}

module.exports = {
    registerBenAliHandlers
};
