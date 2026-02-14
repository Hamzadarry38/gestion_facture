const { ipcMain } = require('electron');
const apiClient = require('./api-client');

// Register dynamic IPC handlers that work with ANY company code
// This allows new PDF companies to work immediately without creating new handler files
async function registerDynamicCompanyHandlers() {
    console.log('🔌 Registering Dynamic Company IPC handlers (for all PDF companies)');

    // Generic Devis Numbers handlers (works with any company code)
    ipcMain.handle('db:dynamic:devis:exists', async (event, companyCode, devisNumber, year) => {
        try {
            const result = await apiClient.getDevis(companyCode);
            if (!result.success) throw new Error(result.error);
            const exists = result.data.some(d => d.devis_number === devisNumber && d.year === year);
            return { success: true, data: exists };
        } catch (error) {
            console.error(`❌ [${companyCode}] Error checking devis exists:`, error.message);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:dynamic:devis:add', async (event, companyCode, devisNumber, year) => {
        try {
            return await apiClient.addDevis(companyCode, devisNumber, year);
        } catch (error) {
            console.error(`❌ [${companyCode}] Error adding devis:`, error.message);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:dynamic:devis:getAll', async (event, companyCode) => {
        try {
            return await apiClient.getDevis(companyCode);
        } catch (error) {
            console.error(`❌ [${companyCode}] Error getting all devis:`, error.message);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:dynamic:devis:getLast', async (event, companyCode, year) => {
        try {
            return await apiClient.getLastDevis(companyCode, year);
        } catch (error) {
            console.error(`❌ [${companyCode}] Error getting last devis:`, error.message);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:dynamic:devis:getMax', async (event, companyCode, year) => {
        try {
            const result = await apiClient.getDevis(companyCode);
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
            console.error(`❌ [${companyCode}] Error getting max devis:`, error.message);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:dynamic:devis:delete', async (event, companyCode, devisNumber, year) => {
        try {
            return await apiClient.deleteDevis(companyCode, devisNumber, year);
        } catch (error) {
            console.error(`❌ [${companyCode}] Error deleting devis:`, error.message);
            return { success: false, error: error.message };
        }
    });

    // Generic PDF Path handlers
    ipcMain.handle('db:dynamic:pdf:savePath', async (event, companyCode, devisNumber, year, filePath, createdBy) => {
        try {
            return await apiClient.savePdfPath(companyCode, devisNumber, year, filePath, createdBy);
        } catch (error) {
            console.error(`❌ [${companyCode}] Error saving PDF path:`, error.message);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:dynamic:pdf:getPath', async (event, companyCode, devisNumber, year) => {
        try {
            return await apiClient.getPdfPath(companyCode, devisNumber, year);
        } catch (error) {
            console.error(`❌ [${companyCode}] Error getting PDF path:`, error.message);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:dynamic:pdf:upload', async (event, companyCode, pdfBlob, filename) => {
        try {
            return await apiClient.uploadPdf(companyCode, pdfBlob, filename);
        } catch (error) {
            console.error(`❌ [${companyCode}] Error uploading PDF:`, error.message);
            return { success: false, error: error.message };
        }
    });

    // Generic PDF Settings handlers
    ipcMain.handle('db:dynamic:pdfSettings:get', async (event, companyCode) => {
        try {
            return await apiClient.getPdfSettings(companyCode);
        } catch (error) {
            console.error(`❌ [${companyCode}] Error getting PDF settings:`, error.message);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:dynamic:pdfSettings:save', async (event, companyCode, percentage, productNames) => {
        try {
            return await apiClient.savePdfSettings(companyCode, percentage, productNames);
        } catch (error) {
            console.error(`❌ [${companyCode}] Error saving PDF settings:`, error.message);
            return { success: false, error: error.message };
        }
    });

    // Generic Devis Data handlers (full devis/facture data with products)
    ipcMain.handle('db:dynamic:devisData:getAll', async (event, companyCode, year) => {
        try {
            return await apiClient.getDevisData(companyCode, year);
        } catch (error) {
            console.error(`❌ [${companyCode}] Error getting devis data:`, error.message);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:dynamic:devisData:getByNumber', async (event, companyCode, number, year) => {
        try {
            return await apiClient.getDevisDataByNumber(companyCode, number, year);
        } catch (error) {
            console.error(`❌ [${companyCode}] Error getting devis data by number:`, error.message);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:dynamic:devisData:save', async (event, companyCode, data) => {
        try {
            return await apiClient.saveDevisData(companyCode, data);
        } catch (error) {
            console.error(`❌ [${companyCode}] Error saving devis data:`, error.message);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:dynamic:devisData:delete', async (event, companyCode, id) => {
        try {
            return await apiClient.deleteDevisData(companyCode, id);
        } catch (error) {
            console.error(`❌ [${companyCode}] Error deleting devis data:`, error.message);
            return { success: false, error: error.message };
        }
    });

    console.log('✅ Dynamic Company IPC handlers registered');
}

module.exports = {
    registerDynamicCompanyHandlers
};
