const { ipcMain } = require('electron');
const { initDatabase, clientOps, invoiceOps, attachmentOps, mryOrderPrefixOps, getMissingMRYInvoiceNumbers, getMissingMRYDevisNumbers } = require('./db');
const apiClient = require('./api-client');

// Register all IPC handlers for MRY
async function registerDatabaseHandlers() {
    // Initialize database first - REQUIRED for legacy features (Notes, Audit Logs etc.)
    await initDatabase();
    console.log('🔌 Registering MRY handlers with API Backend (Postgres) + SQLite Fallback');

    // Client handlers
    ipcMain.handle('db:clients:search', async (event, query) => {
        try {
            // Standard approach: Get all for MRY and filter
            const result = await apiClient.getClients('MRY');
            if (!result.success) throw new Error(result.error);
            const clients = result.data.filter(c => c.nom.toLowerCase().includes(query.toLowerCase()));
            return { success: true, data: clients };
        } catch (error) {
            console.error('❌ Error searching MRY clients (API):', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:clients:getAll', async () => {
        try {
            return await apiClient.getClients('MRY');
        } catch (error) {
            console.error('❌ Error getting MRY clients (API):', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:clients:delete', async (event, clientId) => {
        try {
            return await apiClient.deleteClient(clientId);
        } catch (error) {
            console.error('❌ Error deleting MRY client (API):', error);
            return { success: false, error: error.message };
        }
    });

    // Invoice handlers
    ipcMain.handle('db:invoices:create', async (event, invoiceData) => {
        try {
            if (!invoiceData.company_code) invoiceData.company_code = 'MRY';
            console.log('📅 [IPC DATE DEBUG] Date being sent to API:', invoiceData.document?.date, '| Type:', typeof invoiceData.document?.date);
            const result = await apiClient.createInvoice(invoiceData);
            console.log('📅 [IPC DATE DEBUG] Date received from API:', result?.data?.document_date, '| Full data:', JSON.stringify(result?.data));
            return result;
        } catch (error) {
            console.error('❌ Error creating MRY invoice (API):', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:invoices:getById', async (event, id) => {
        try {
            return await apiClient.getInvoiceById(id);
        } catch (error) {
            console.error('❌ Error getting MRY invoice (API):', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:invoices:getAll', async (event, companyCode) => {
        try {
            // MRY might pass a sub-company code like 'MRY' or something else
            const code = companyCode || 'MRY';
            return await apiClient.getInvoices(code);
        } catch (error) {
            console.error('❌ Error getting MRY invoices (API):', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:invoices:update', async (event, id, invoiceData) => {
        try {
            return await apiClient.updateInvoice(id, invoiceData);
        } catch (error) {
            console.error('❌ Error updating MRY invoice (API):', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:invoices:delete', async (event, id) => {
        try {
            return await apiClient.deleteInvoice(id);
        } catch (error) {
            console.error('❌ Error deleting MRY invoice (API):', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:invoices:getNextNumber', async (event, companyCode, documentType, year) => {
        try {
            const code = companyCode || 'MRY';
            return await apiClient.getNextInvoiceNumber(code, year, documentType);
        } catch (error) {
            console.error('❌ Error getting next MRY invoice number (API):', error);
            return { success: false, error: error.message };
        }
    });

    // Validation Handlers
    ipcMain.handle('db:invoices:getPending', async (event, company) => {
        try {
            const targetCompany = company || 'MRY';
            const result = await apiClient.getPendingInvoices(targetCompany);
            return result;
        } catch (error) {
            console.error('❌ Error getting pending MRY invoices (API):', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:invoices:validate', async (event, id, status) => {
        try {
            return await apiClient.validateInvoice(id, status);
        } catch (error) {
            console.error('❌ Error validating invoice:', error);
            return { success: false, error: error.message };
        }
    });

    // Delivery Person handlers
    ipcMain.handle('db:deliveryPersons:getAll', async (event, company) => {
        try {
            return await apiClient.getDeliveryPersons(company || 'MRY');
        } catch (error) {
            console.error('❌ Error getting delivery persons (API):', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:deliveryPersons:add', async (event, name, company) => {
        try {
            return await apiClient.addDeliveryPerson(name, company || 'MRY');
        } catch (error) {
            console.error('❌ Error adding delivery person (API):', error);
            return { success: false, error: error.message };
        }
    });

    // Attachment handlers
    ipcMain.handle('db:attachments:add', async (event, invoiceId, filename, fileType, fileData, filePath, fileSize) => {
        try {
            console.log(`🔵 [IPC] db:attachments:add called for invoice ${invoiceId}, file: ${filename}`);

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

            console.log(`📤 [IPC] Calling apiClient.addAttachment...`);
            const result = await apiClient.addAttachment(attachmentData);
            console.log(`📥 [IPC] API response:`, result);

            return result;
        } catch (error) {
            console.error('❌ Error adding MRY attachment (API):', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:attachments:get', async (event, id) => {
        try {
            return await apiClient.getAttachment(id);
        } catch (error) {
            console.error('❌ Error getting MRY attachment (API):', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:attachments:delete', async (event, id) => {
        try {
            return await apiClient.deleteAttachment(id);
        } catch (error) {
            console.error('❌ Error deleting MRY attachment (API):', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:attachments:getByInvoice', async (event, invoiceId) => {
        try {
            return await apiClient.getAttachments(invoiceId);
        } catch (error) {
            console.error('❌ Error getting MRY attachments (API):', error);
            return { success: false, error: error.message };
        }
    });

    // --- LEGACY SQLITE HANDLERS (Unchanged) ---

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

    // MRY Missing Numbers handler (Postgres Sync)
    ipcMain.handle('db:mry:getMissingNumbers', async (event, year) => {
        try {
            return await apiClient.getMissingNumbers('MRY', year, 'facture');
        } catch (error) {
            console.error('❌ [MRY] Error getting missing numbers (API):', error);
            return { success: false, error: error.message };
        }
    });

    // MRY Missing Devis Numbers handler (Postgres Sync)
    ipcMain.handle('db:mry:getMissingDevisNumbers', async (event, year) => {
        try {
            return await apiClient.getMissingNumbers('MRY', year, 'devis');
        } catch (error) {
            console.error('❌ [MRY] Error getting missing devis numbers (API):', error);
            return { success: false, error: error.message };
        }
    });

    // Delete all data handler
    ipcMain.handle('db:deleteAllData', async () => {
        try {
            const { deleteAllData } = require('./db');
            deleteAllData();
            return { success: true, message: 'Toutes les données LOCALES ont été supprimées' };
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

    // Audit Log handlers (PostgreSQL via API)
    ipcMain.handle('db:auditLog:add', async (event, invoiceId, action, userId, userName, userEmail, changes) => {
        try {
            return await apiClient.addAuditLog({
                invoice_id: invoiceId,
                action,
                user_id: userId,
                user_name: userName,
                user_email: userEmail,
                changes
            });
        } catch (error) {
            console.error('[MRY] Error adding audit log (API):', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:auditLog:getForInvoice', async (event, invoiceId) => {
        try {
            return await apiClient.getAuditLog(invoiceId);
        } catch (error) {
            console.error('[MRY] Error getting audit logs (API):', error);
            return { success: false, error: error.message };
        }
    });

    // Alias for getForInvoice
    ipcMain.handle('db:getAuditLog', async (event, invoiceId) => {
        try {
            return await apiClient.getAuditLog(invoiceId);
        } catch (error) {
            console.error('[MRY] Error getting audit logs (API):', error);
            return { success: false, error: error.message };
        }
    });

    // --- PDF Companies (Online company management) ---
    ipcMain.handle('db:pdfCompanies:getAll', async () => {
        try {
            return await apiClient.getPdfCompanies();
        } catch (error) {
            console.error('Error getting PDF companies:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:pdfCompanies:get', async (event, code) => {
        try {
            return await apiClient.getPdfCompany(code);
        } catch (error) {
            console.error('Error getting PDF company:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:pdfCompanies:create', async (event, companyData) => {
        try {
            return await apiClient.createPdfCompany(companyData);
        } catch (error) {
            console.error('Error creating PDF company:', error);
            return { success: false, error: error.response?.data?.error || error.message };
        }
    });

    ipcMain.handle('db:pdfCompanies:update', async (event, code, companyData) => {
        try {
            return await apiClient.updatePdfCompany(code, companyData);
        } catch (error) {
            console.error('Error updating PDF company:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:pdfCompanies:delete', async (event, code) => {
        try {
            return await apiClient.deletePdfCompany(code);
        } catch (error) {
            console.error('Error deleting PDF company:', error);
            return { success: false, error: error.response?.data?.error || error.message };
        }
    });
}

module.exports = { registerDatabaseHandlers };
