const { ipcMain } = require('electron');
const dbMulti = require('./db_multi');

async function registerMultiHandlers() {
    console.log('🔄 [MULTI] Registering Multi Company database handlers...');
    
    // Initialize database
    await dbMulti.initDatabase();
    console.log('✅ [MULTI] Multi Company database initialized');
    
    // Create invoice
    ipcMain.handle('dbMulti:createInvoice', async (event, invoiceData) => {
        try {
            console.log('[MULTI] Received invoice data:', JSON.stringify(invoiceData, null, 2));
            const invoiceId = dbMulti.invoiceOps.create(invoiceData);
            return { success: true, data: { id: invoiceId } };
        } catch (error) {
            console.error('[MULTI] Error creating invoice:', error);
            console.error('[MULTI] Error stack:', error.stack);
            return { success: false, error: error.message };
        }
    });
    
    // Get invoice by ID
    ipcMain.handle('dbMulti:getInvoice', async (event, id) => {
        try {
            const invoice = dbMulti.invoiceOps.getById(id);
            return { success: true, data: invoice };
        } catch (error) {
            console.error('[MULTI] Error getting invoice:', error);
            return { success: false, error: error.message };
        }
    });
    
    // Get all invoices
    ipcMain.handle('dbMulti:getAllInvoices', async (event, companyCode) => {
        try {
            const invoices = dbMulti.invoiceOps.getAll(companyCode);
            return { success: true, data: invoices };
        } catch (error) {
            console.error('[MULTI] Error getting all invoices:', error);
            return { success: false, error: error.message };
        }
    });
    
    // Update invoice
    ipcMain.handle('dbMulti:updateInvoice', async (event, id, invoiceData) => {
        try {
            const result = dbMulti.invoiceOps.update(id, invoiceData);
            return { success: true, data: result };
        } catch (error) {
            console.error('[MULTI] Error updating invoice:', error);
            return { success: false, error: error.message };
        }
    });
    
    // Delete invoice
    ipcMain.handle('dbMulti:deleteInvoice', async (event, id) => {
        try {
            const result = dbMulti.invoiceOps.delete(id);
            return { success: true, data: result };
        } catch (error) {
            console.error('[MULTI] Error deleting invoice:', error);
            return { success: false, error: error.message };
        }
    });
    
    // Get next invoice number
    ipcMain.handle('dbMulti:getNextInvoiceNumber', async (event, companyCode, documentType, year) => {
        try {
            const result = dbMulti.invoiceOps.getNextInvoiceNumber(companyCode, documentType, year);
            return { success: true, data: result };
        } catch (error) {
            console.error('[MULTI] Error getting next invoice number:', error);
            return { success: false, error: error.message };
        }
    });
    
    // Client operations
    ipcMain.handle('dbMulti:getAllClients', async () => {
        try {
            const clients = dbMulti.clientOps.getAll();
            return { success: true, data: clients };
        } catch (error) {
            console.error('[MULTI] Error getting all clients:', error);
            return { success: false, error: error.message };
        }
    });
    
    ipcMain.handle('dbMulti:searchClients', async (event, query) => {
        try {
            const clients = dbMulti.clientOps.search(query);
            return { success: true, data: clients };
        } catch (error) {
            console.error('[MULTI] Error searching clients:', error);
            return { success: false, error: error.message };
        }
    });
    
    // Attachment operations
    ipcMain.handle('dbMulti:addAttachment', async (event, invoiceId, filename, fileType, fileData) => {
        try {
            const attachmentId = dbMulti.attachmentOps.add(invoiceId, filename, fileType, fileData);
            return { success: true, data: { id: attachmentId } };
        } catch (error) {
            console.error('[MULTI] Error adding attachment:', error);
            return { success: false, error: error.message };
        }
    });
    
    ipcMain.handle('dbMulti:getAttachment', async (event, id) => {
        try {
            const attachment = dbMulti.attachmentOps.get(id);
            return { success: true, data: attachment };
        } catch (error) {
            console.error('[MULTI] Error getting attachment:', error);
            return { success: false, error: error.message };
        }
    });
    
    ipcMain.handle('dbMulti:deleteAttachment', async (event, id) => {
        try {
            const result = dbMulti.attachmentOps.delete(id);
            return { success: true, data: result };
        } catch (error) {
            console.error('[MULTI] Error deleting attachment:', error);
            return { success: false, error: error.message };
        }
    });
    
    ipcMain.handle('dbMulti:getAttachmentsByInvoice', async (event, invoiceId) => {
        try {
            const attachments = dbMulti.attachmentOps.getByInvoice(invoiceId);
            return { success: true, data: attachments };
        } catch (error) {
            console.error('[MULTI] Error getting attachments by invoice:', error);
            return { success: false, error: error.message };
        }
    });
    
    // Delete all data
    ipcMain.handle('dbMulti:deleteAllData', async () => {
        try {
            dbMulti.deleteAllData();
            return { success: true };
        } catch (error) {
            console.error('[MULTI] Error deleting all data:', error);
            return { success: false, error: error.message };
        }
    });
    
    console.log('✅ [MULTI] All Multi Company handlers registered successfully');
}

module.exports = { registerMultiHandlers };
