const { ipcMain } = require('electron');
const apiClient = require('./api-client');

// Register all SKM IPC handlers
async function registerSKMHandlers() {
    console.log('🔌 Registering SKM handlers with API Backend (Postgres) - Online Only');

    const COMPANY_CODE = 'SKM';

    // SKM Devis Numbers handlers
    ipcMain.handle('db:skm:devis:exists', async (event, devisNumber, year) => {
        try {
            const result = await apiClient.getDevis(COMPANY_CODE);
            if (!result.success) throw new Error(result.error);
            const exists = result.data.some(d => d.devis_number === devisNumber && d.year === year);
            return { success: true, data: exists };
        } catch (error) {
            console.error('❌ [SKM] Error checking devis number (API):', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:skm:devis:add', async (event, devisNumber, year) => {
        try {
            return await apiClient.addDevis(COMPANY_CODE, devisNumber, year);
        } catch (error) {
            console.error('❌ [SKM] Error adding devis number (API):', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:skm:devis:getByYear', async (event, year) => {
        try {
            const result = await apiClient.getDevis(COMPANY_CODE);
            if (!result.success) throw new Error(result.error);
            const data = result.data.filter(d => d.year === year);
            return { success: true, data };
        } catch (error) {
            console.error('❌ [SKM] Error getting devis by year (API):', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:skm:devis:getAll', async () => {
        try {
            return await apiClient.getDevis(COMPANY_CODE);
        } catch (error) {
            console.error('❌ [SKM] Error getting all devis (API):', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:skm:devis:getLast', async (event, year) => {
        try {
            return await apiClient.getLastDevis(COMPANY_CODE, year);
        } catch (error) {
            console.error('❌ [SKM] Error getting last devis (API):', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:skm:devis:getMax', async (event, year) => {
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
            console.error('❌ [SKM] Error getting max devis (API):', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:skm:devis:delete', async (event, devisNumber, year) => {
        try {
            return await apiClient.deleteDevis(COMPANY_CODE, devisNumber, year);
        } catch (error) {
            console.error('❌ [SKM] Error deleting devis number (API):', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:skm:devis:clearAll', async () => {
        try {
            throw new Error('API clearAll not implemented');
        } catch (error) {
            console.error('❌ [SKM] Error clearing all devis (API):', error);
            return { success: false, error: error.message };
        }
    });

    // SKM PDF Files handlers
    ipcMain.handle('db:skm:pdf:savePath', async (event, devisNumber, year, filePath, createdBy) => {
        try {
            return await apiClient.savePdfPath(COMPANY_CODE, devisNumber, year, filePath, createdBy);
        } catch (error) {
            console.error('❌ [SKM] Error saving PDF path (API):', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:skm:pdf:getPath', async (event, devisNumber, year) => {
        try {
            return await apiClient.getPdfPath(COMPANY_CODE, devisNumber, year);
        } catch (error) {
            console.error('❌ [SKM] Error getting PDF path (API):', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:skm:pdf:getAllPaths', async () => {
        try {
            return await apiClient.getAllPdfPaths(COMPANY_CODE);
        } catch (error) {
            console.error('❌ [SKM] Error getting all PDF paths (API):', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:skm:pdf:deletePath', async (event, devisNumber, year) => {
        try {
            throw new Error('API deletePath not implemented');
        } catch (error) {
            console.error('❌ [SKM] Error deleting PDF path (API):', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:smarts:pdf:upload', async (event, pdfData, filename) => {
        try {
            // pdfData arrives as a Buffer from Electron IPC if sent as Uint8Array/ArrayBuffer from frontend
            console.log('📤 [IPC SMARTS] Receiving PDF upload for:', filename);

            // Validate that we got a Buffer or Uint8Array
            if (!pdfData || !(pdfData instanceof Uint8Array || Buffer.isBuffer(pdfData))) {
                throw new Error('Données PDF invalides (Buffer/Uint8Array requis)');
            }

            return await apiClient.uploadPdf(COMPANY_CODE, pdfData, filename);
        } catch (error) {
            console.error('❌ [SMARTS] Error uploading PDF (API):', error);
            return { success: false, error: error.message };
        }
    });

    console.log('✅ [SKM] IPC handlers registered (API Edition)');
}

module.exports = {
    registerSKMHandlers
};
