const { ipcMain } = require('electron');
const dbMulti = require('./db_multi');
const { getMissingMultiInvoiceNumbers, getMissingMultiDevisNumbers, auditLogOps } = require('./db_multi');
const apiClient = require('./api-client');

async function registerMultiHandlers() {
    console.log('🔄 [MULTI] Registering Multi Company database handlers (API Edition)...');

    // Initialize database - REQUIRED for legacy features
    await dbMulti.initDatabase();
    console.log('✅ [MULTI] Multi Company database initialized (Lite Fallback)');

    const COMPANY_CODE = 'MULTI';

    // Create invoice
    ipcMain.handle('dbMulti:createInvoice', async (event, invoiceData) => {
        try {
            invoiceData.company_code = COMPANY_CODE;
            return await apiClient.createInvoice(invoiceData);
        } catch (error) {
            console.error('[MULTI] Error creating invoice (API):', error);
            return { success: false, error: error.message };
        }
    });

    // Get invoice by ID
    ipcMain.handle('dbMulti:getInvoice', async (event, id) => {
        try {
            return await apiClient.getInvoiceById(id);
        } catch (error) {
            console.error('[MULTI] Error getting invoice (API):', error);
            return { success: false, error: error.message };
        }
    });

    // Get all invoices
    ipcMain.handle('dbMulti:getAllInvoices', async (event, companyCode) => {
        try {
            const code = companyCode || COMPANY_CODE;
            return await apiClient.getInvoices(code);
        } catch (error) {
            console.error('[MULTI] Error getting all invoices (API):', error);
            return { success: false, error: error.message };
        }
    });

    // Update invoice
    ipcMain.handle('dbMulti:updateInvoice', async (event, id, invoiceData) => {
        try {
            return await apiClient.updateInvoice(id, invoiceData);
        } catch (error) {
            console.error('[MULTI] Error updating invoice (API):', error);
            return { success: false, error: error.message };
        }
    });

    // Delete invoice
    ipcMain.handle('dbMulti:deleteInvoice', async (event, id) => {
        try {
            return await apiClient.deleteInvoice(id);
        } catch (error) {
            console.error('[MULTI] Error deleting invoice (API):', error);
            return { success: false, error: error.message };
        }
    });

    // Get next invoice number
    ipcMain.handle('dbMulti:getNextInvoiceNumber', async (event, companyCode, documentType, year) => {
        try {
            const code = companyCode || COMPANY_CODE;
            return await apiClient.getNextInvoiceNumber(code, year, documentType);
        } catch (error) {
            console.error('[MULTI] Error getting next invoice number (API):', error);
            return { success: false, error: error.message };
        }
    });

    // Client operations
    ipcMain.handle('dbMulti:getAllClients', async () => {
        try {
            return await apiClient.getClients(COMPANY_CODE);
        } catch (error) {
            console.error('[MULTI] Error getting all clients (API):', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('dbMulti:searchClients', async (event, query) => {
        try {
            const result = await apiClient.getClients(COMPANY_CODE);
            if (!result.success) throw new Error(result.error);
            const clients = result.data.filter(c => c.nom.toLowerCase().includes(query.toLowerCase()));
            return { success: true, data: clients };
        } catch (error) {
            console.error('[MULTI] Error searching clients (API):', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('dbMulti:deleteClient', async (event, clientId) => {
        try {
            return await apiClient.deleteClient(clientId);
        } catch (error) {
            console.error('[MULTI] Error deleting client (API):', error);
            return { success: false, error: error.message };
        }
    });

    // Attachment operations
    ipcMain.handle('dbMulti:addAttachment', async (event, invoiceId, filename, fileType, fileData, filePath, fileSize) => {
        try {
            let base64Data = fileData;
            if (Buffer.isBuffer(fileData)) {
                base64Data = fileData.toString('base64');
            } else if (fileData instanceof Uint8Array) {
                base64Data = Buffer.from(fileData).toString('base64');
            }

            const attachmentData = {
                invoice_id: invoiceId,
                filename,
                file_type: fileType,
                file_size: fileSize,
                file_data: base64Data,
                file_path: filePath
            };
            return await apiClient.addAttachment(attachmentData);
        } catch (error) {
            console.error('[MULTI] Error adding attachment (API):', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('dbMulti:getAttachment', async (event, id) => {
        try {
            return await apiClient.getAttachment(id);
        } catch (error) {
            console.error('[MULTI] Error getting attachment (API):', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('dbMulti:deleteAttachment', async (event, id) => {
        try {
            return await apiClient.deleteAttachment(id);
        } catch (error) {
            console.error('[MULTI] Error deleting attachment (API):', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('dbMulti:getAttachmentsByInvoice', async (event, invoiceId) => {
        try {
            return await apiClient.getAttachments(invoiceId);
        } catch (error) {
            console.error('[MULTI] Error getting attachments by invoice (API):', error);
            return { success: false, error: error.message };
        }
    });

    // MULTI Order Prefix handlers (Legacy)
    ipcMain.handle('dbMulti:multiOrderPrefixes:getAll', async () => {
        try {
            const prefixes = dbMulti.multiOrderPrefixOps.getAll();
            return { success: true, data: prefixes };
        } catch (error) {
            console.error('❌ [MULTI] Error getting order prefixes:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('dbMulti:multiOrderPrefixes:add', async (event, prefix) => {
        try {
            const result = dbMulti.multiOrderPrefixOps.add(prefix);
            return result;
        } catch (error) {
            console.error('❌ [MULTI] Error adding order prefix:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('dbMulti:multiOrderPrefixes:delete', async (event, prefix) => {
        try {
            const result = dbMulti.multiOrderPrefixOps.delete(prefix);
            return result;
        } catch (error) {
            console.error('❌ [MULTI] Error deleting order prefix:', error);
            return { success: false, error: error.message };
        }
    });

    // MULTI Missing Numbers handler (Postgres Sync)
    ipcMain.handle('dbMulti:getMissingNumbers', async (event, year) => {
        try {
            return await apiClient.getMissingNumbers(COMPANY_CODE, year, 'facture');
        } catch (error) {
            console.error('❌ [MULTI] Error getting missing numbers (API):', error);
            return { success: false, error: error.message };
        }
    });

    // MULTI Missing Devis Numbers handler (Postgres Sync)
    ipcMain.handle('dbMulti:getMissingDevisNumbers', async (event, year) => {
        try {
            return await apiClient.getMissingNumbers(COMPANY_CODE, year, 'devis');
        } catch (error) {
            console.error('❌ [MULTI] Error getting missing devis numbers (API):', error);
            return { success: false, error: error.message };
        }
    });

    // Delete all data
    ipcMain.handle('dbMulti:deleteAllData', async () => {
        try {
            dbMulti.deleteAllData();
            return { success: true, message: 'Toutes les données LOCALES ont été supprimées' };
        } catch (error) {
            console.error('[MULTI] Error deleting all data:', error);
            return { success: false, error: error.message };
        }
    });

    // Notes handlers
    ipcMain.handle('dbMulti:saveNote', async (event, invoiceId, noteText) => {
        try {
            const result = await dbMulti.noteOps.saveNote(invoiceId, noteText);
            return result;
        } catch (error) {
            console.error('[MULTI] Error saving note:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('dbMulti:getNote', async (event, invoiceId) => {
        try {
            const result = await dbMulti.noteOps.getNote(invoiceId);
            return result;
        } catch (error) {
            console.error('[MULTI] Error getting note:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('dbMulti:deleteNote', async (event, invoiceId) => {
        try {
            const result = await dbMulti.noteOps.deleteNote(invoiceId);
            return result;
        } catch (error) {
            console.error('[MULTI] Error deleting note:', error);
            return { success: false, error: error.message };
        }
    });

    // Audit Log handlers
    ipcMain.handle('dbMulti:auditLog:add', async (event, invoiceId, action, userId, userName, userEmail, changes) => {
        try {
            const result = await auditLogOps.addLog(invoiceId, action, userId, userName, userEmail, changes);
            return result;
        } catch (error) {
            console.error('[MULTI] Error adding audit log:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('dbMulti:auditLog:getForInvoice', async (event, invoiceId) => {
        try {
            const result = await auditLogOps.getLogsForInvoice(invoiceId);
            return result;
        } catch (error) {
            console.error('[MULTI] Error getting audit logs:', error);
            return { success: false, error: error.message };
        }
    });

    // Alias for getForInvoice
    ipcMain.handle('dbMulti:getAuditLog', async (event, invoiceId) => {
        try {
            const result = await auditLogOps.getLogsForInvoice(invoiceId);
            return result;
        } catch (error) {
            console.error('[MULTI] Error getting audit logs:', error);
            return { success: false, error: error.message };
        }
    });

    // Validation API (Global)
    ipcMain.handle('api:invoices:getPending', async (event, companyCode) => {
        try {
            return await apiClient.getPendingInvoices(companyCode);
        } catch (error) {
            console.error('[API] Error getting pending invoices:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('api:invoices:validate', async (event, id, status) => {
        try {
            return await apiClient.validateInvoice(id, status);
        } catch (error) {
            console.error('[API] Error validating invoice:', error);
            return { success: false, error: error.message };
        }
    });

    console.log('✅ [MULTI] All Multi Company handlers registered successfully (API Edition)');
}

module.exports = { registerMultiHandlers };
