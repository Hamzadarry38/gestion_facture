const { ipcMain } = require('electron');
const { initDatabase, clientOps, invoiceOps, attachmentOps, mryOrderPrefixOps, auditLogOps, getMissingMRYInvoiceNumbers, getMissingMRYDevisNumbers } = require('./db');

// Register all IPC handlers
async function registerDatabaseHandlers() {
    // Initialize database first
    await initDatabase();
    // Client handlers
    ipcMain.handle('db:clients:search', async (event, query) => {
        try {
            return { success: true, data: clientOps.search(query) };
        } catch (error) {
            console.error('❌ Error searching clients:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:clients:getAll', async () => {
        try {
            return { success: true, data: clientOps.getAll() };
        } catch (error) {
            console.error('❌ Error getting clients:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:clients:delete', async (event, clientId) => {
        try {
            clientOps.delete(clientId);
            return { success: true };
        } catch (error) {
            console.error('❌ Error deleting client:', error);
            return { success: false, error: error.message };
        }
    });

    // Invoice handlers
    ipcMain.handle('db:invoices:create', async (event, invoiceData) => {
        try {
            // console.log('📝 Creating invoice:', invoiceData);
            const invoiceId = invoiceOps.create(invoiceData);
            // console.log('✅ Invoice created with ID:', invoiceId);
            return { success: true, data: { id: invoiceId } };
        } catch (error) {
            console.error('❌ Error creating invoice:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:invoices:getById', async (event, id) => {
        try {
            const invoice = invoiceOps.getById(id);
            return { success: true, data: invoice };
        } catch (error) {
            console.error('❌ Error getting invoice:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:invoices:getAll', async (event, companyCode) => {
        try {
            const invoices = invoiceOps.getAll(companyCode);
            return { success: true, data: invoices };
        } catch (error) {
            console.error('❌ Error getting invoices:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:invoices:update', async (event, id, invoiceData) => {
        try {
            // console.log('📝 Updating invoice:', id, invoiceData);
            invoiceOps.update(id, invoiceData);
            // console.log('✅ Invoice updated:', id);
            return { success: true };
        } catch (error) {
            console.error('❌ Error updating invoice:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:invoices:delete', async (event, id) => {
        try {
            invoiceOps.delete(id);
            // console.log('✅ Invoice deleted:', id);
            return { success: true };
        } catch (error) {
            console.error('❌ Error deleting invoice:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:invoices:getNextNumber', async (event, companyCode, documentType, year) => {
        try {
            const nextNumber = invoiceOps.getNextInvoiceNumber(companyCode, documentType, year);
            return { success: true, data: nextNumber };
        } catch (error) {
            console.error('❌ Error getting next invoice number:', error);
            return { success: false, error: error.message };
        }
    });

    // Attachment handlers
    ipcMain.handle('db:attachments:add', async (event, invoiceId, filename, fileType, fileData, filePath, fileSize) => {
        try {
            // console.log(`📎 Adding attachment: ${filename} (${fileType})`);
            const id = attachmentOps.add(invoiceId, filename, fileType, fileData ? Buffer.from(fileData) : null, filePath, fileSize || 0);
            // console.log('✅ Attachment added with ID:', id);
            return { success: true, data: { id } };
        } catch (error) {
            console.error('❌ Error adding attachment:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:attachments:get', async (event, id) => {
        try {
            const attachment = attachmentOps.get(id);
            if (attachment && attachment.file_data) {
                // Convert Uint8Array to Buffer then to base64
                const buffer = Buffer.from(attachment.file_data);
                attachment.file_data = buffer.toString('base64');
            }
            return { success: true, data: attachment };
        } catch (error) {
            console.error('❌ Error getting attachment:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:attachments:delete', async (event, id) => {
        try {
            attachmentOps.delete(id);
            // console.log('✅ Attachment deleted:', id);
            return { success: true };
        } catch (error) {
            console.error('❌ Error deleting attachment:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:attachments:getByInvoice', async (event, invoiceId) => {
        try {
            const attachments = attachmentOps.getByInvoice(invoiceId);
            return { success: true, data: attachments };
        } catch (error) {
            console.error('❌ Error getting attachments:', error);
            return { success: false, error: error.message };
        }
    });

    // MRY Order Prefix handlers
    ipcMain.handle('db:mryOrderPrefixes:getAll', async () => {
        try {
            const prefixes = mryOrderPrefixOps.getAll();
            return { success: true, data: prefixes };
        } catch (error) {
            console.error('❌ Error getting MRY order prefixes:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:mryOrderPrefixes:add', async (event, prefix) => {
        try {
            const result = mryOrderPrefixOps.add(prefix);
            return result;
        } catch (error) {
            console.error('❌ Error adding MRY order prefix:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:mryOrderPrefixes:delete', async (event, prefix) => {
        try {
            const result = mryOrderPrefixOps.delete(prefix);
            return result;
        } catch (error) {
            console.error('❌ Error deleting MRY order prefix:', error);
            return { success: false, error: error.message };
        }
    });

    // MRY Missing Numbers handler
    ipcMain.handle('db:mry:getMissingNumbers', async (event, year) => {
        try {
            const result = await getMissingMRYInvoiceNumbers(year);
            return result;
        } catch (error) {
            console.error('❌ Error getting MRY missing numbers:', error);
            return { success: false, error: error.message };
        }
    });

    // MRY Missing Devis Numbers handler
    ipcMain.handle('db:mry:getMissingDevisNumbers', async (event, year) => {
        try {
            const result = await getMissingMRYDevisNumbers(year);
            return result;
        } catch (error) {
            console.error('❌ Error getting MRY missing devis numbers:', error);
            return { success: false, error: error.message };
        }
    });

    // Delete all data handler
    ipcMain.handle('db:deleteAllData', async () => {
        try {
            const { deleteAllData } = require('./db');
            deleteAllData();
            return { success: true, message: 'Toutes les données ont été supprimées' };
        } catch (error) {
            console.error('❌ Error deleting all data:', error);
            return { success: false, error: error.message };
        }
    });

    // Notes handlers for MRY
    ipcMain.handle('db:saveNote', async (event, invoiceId, noteText) => {
        try {
            const { noteOps } = require('./db');
            const result = await noteOps.saveNote(invoiceId, noteText);
            return result;
        } catch (error) {
            console.error('[MRY] Error saving note:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:getNote', async (event, invoiceId) => {
        try {
            const { noteOps } = require('./db');
            const result = await noteOps.getNote(invoiceId);
            return result;
        } catch (error) {
            console.error('[MRY] Error getting note:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:deleteNote', async (event, invoiceId) => {
        try {
            const { noteOps } = require('./db');
            const result = await noteOps.deleteNote(invoiceId);
            return result;
        } catch (error) {
            console.error('[MRY] Error deleting note:', error);
            return { success: false, error: error.message };
        }
    });

    // Audit Log handlers
    ipcMain.handle('db:auditLog:add', async (event, invoiceId, action, userId, userName, userEmail, changes) => {
        try {
            const result = await auditLogOps.addLog(invoiceId, action, userId, userName, userEmail, changes);
            return result;
        } catch (error) {
            console.error('[MRY] Error adding audit log:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:auditLog:getForInvoice', async (event, invoiceId) => {
        try {
            const result = await auditLogOps.getLogsForInvoice(invoiceId);
            return result;
        } catch (error) {
            console.error('[MRY] Error getting audit logs:', error);
            return { success: false, error: error.message };
        }
    });

    // Alias for getForInvoice
    ipcMain.handle('db:getAuditLog', async (event, invoiceId) => {
        try {
            const result = await auditLogOps.getLogsForInvoice(invoiceId);
            return result;
        } catch (error) {
            console.error('[MRY] Error getting audit logs:', error);
            return { success: false, error: error.message };
        }
    });

    // console.log('✅ Database IPC handlers registered');
}

module.exports = { registerDatabaseHandlers };
