const { ipcMain } = require('electron');
const { initDatabase, clientOps, invoiceOps, attachmentOps, globalInvoiceOps, prefixOps, orderPrefixOps, simpleOrderPrefixOps, auditLogOps, getMissingInvoiceNumbers, getMissingDevisNumbers, getMissingOrderNumbers, getMissingBonLivraisonNumbers } = require('./db_chaimae');
const apiClient = require('./api-client');

// Register all IPC handlers for CHAIMAE
async function registerChaimaeHandlers() {
    // Initialize CHAIMAE database first - REQUIRED for legacy features (Global Invoices etc.)
    await initDatabase();
    console.log('🔌 Registering CHAIMAE handlers with API Backend (Postgres) + SQLite Fallback');

    const COMPANY_CODE = 'CHAIMAE';

    // Client handlers for CHAIMAE
    ipcMain.handle('db:chaimae:clients:search', async (event, query) => {
        try {
            // API doesn't have search yet, but we can getAll and filter.
            const result = await apiClient.getClients(COMPANY_CODE);
            if (!result.success) throw new Error(result.error);
            const clients = result.data.filter(c => c.nom.toLowerCase().includes(query.toLowerCase()));
            return { success: true, data: clients };
        } catch (error) {
            console.error('❌ Error searching CHAIMAE clients (API):', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:chaimae:clients:getAll', async () => {
        try {
            const result = await apiClient.getClients(COMPANY_CODE);
            return result; // result is { success: true, data: [...] }
        } catch (error) {
            console.error('❌ Error getting CHAIMAE clients (API):', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:chaimae:clients:delete', async (event, clientId) => {
        try {
            return await apiClient.deleteClient(clientId);
        } catch (error) {
            console.error('❌ Error deleting CHAIMAE client (API):', error);
            return { success: false, error: error.message };
        }
    });

    // Invoice handlers for CHAIMAE
    ipcMain.handle('db:chaimae:invoices:create', async (event, invoiceData) => {
        try {
            invoiceData.company_code = COMPANY_CODE;
            return await apiClient.createInvoice(invoiceData);
        } catch (error) {
            console.error('❌ Error creating CHAIMAE invoice (API):', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:chaimae:invoices:getById', async (event, id, userEmail) => {
        try {
            return await apiClient.getInvoiceById(id, userEmail);
        } catch (error) {
            console.error('❌ Error getting CHAIMAE invoice (API):', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:chaimae:invoices:getAll', async () => {
        try {
            return await apiClient.getInvoices(COMPANY_CODE);
        } catch (error) {
            console.error('❌ Error getting CHAIMAE invoices (API):', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:chaimae:invoices:update', async (event, id, invoiceData) => {
        try {
            return await apiClient.updateInvoice(id, invoiceData);
        } catch (error) {
            console.error('❌ Error updating CHAIMAE invoice (API):', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:chaimae:invoices:delete', async (event, id) => {
        try {
            return await apiClient.deleteInvoice(id);
        } catch (error) {
            console.error('❌ Error deleting CHAIMAE invoice (API):', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:chaimae:invoices:getNextNumber', async (event, documentType, year) => {
        try {
            return await apiClient.getNextInvoiceNumber(COMPANY_CODE, year, documentType);
        } catch (error) {
            console.error('❌ Error getting next CHAIMAE invoice number (API):', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:chaimae:invoices:getAvailableYears', async () => {
        try {
            return await apiClient.getAvailableYears(COMPANY_CODE);
        } catch (error) {
            console.error('❌ Error getting CHAIMAE available years (API):', error);
            return { success: false, error: error.message };
        }
    });

    // Attachment handlers for CHAIMAE
    ipcMain.handle('db:chaimae:attachments:add', async (event, invoiceId, filename, fileType, fileData, filePath, fileSize) => {
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
            console.error('❌ Error adding CHAIMAE attachment (API):', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:chaimae:attachments:get', async (event, id) => {
        try {
            return await apiClient.getAttachment(id);
        } catch (error) {
            console.error('❌ Error getting CHAIMAE attachment (API):', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:chaimae:attachments:delete', async (event, id) => {
        try {
            return await apiClient.deleteAttachment(id);
        } catch (error) {
            console.error('❌ Error deleting CHAIMAE attachment (API):', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:chaimae:attachments:getByInvoice', async (event, invoiceId) => {
        try {
            return await apiClient.getAttachments(invoiceId);
        } catch (error) {
            console.error('❌ Error getting CHAIMAE attachments (API):', error);
            return { success: false, error: error.message };
        }
    });

    // --- LEGACY SQLITE HANDLERS (Unchanged) ---

    // --- Global Invoices (PostgreSQL Cloud Version) ---
    ipcMain.handle('db:chaimae:globalInvoices:create', async (event, globalInvoiceData) => {
        try {
            const giData = {
                ...globalInvoiceData,
                company_code: COMPANY_CODE
            };
            const apiRes = await apiClient.createGlobalInvoice(giData);
            if (apiRes.success) {
                return { success: true, data: { id: apiRes.data.id } };
            }
            return { success: false, error: apiRes.error || 'API Error' };
        } catch (error) {
            console.error('❌ Error in db:chaimae:globalInvoices:create:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:chaimae:globalInvoices:getById', async (event, id) => {
        try {
            const apiRes = await apiClient.getGlobalInvoiceById(id);
            if (apiRes.success) {
                return { success: true, data: apiRes.data };
            }
            return { success: true, data: null };
        } catch (error) {
            console.error('❌ Error in db:chaimae:globalInvoices:getById:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:chaimae:globalInvoices:getAll', async () => {
        try {
            const apiRes = await apiClient.getGlobalInvoices(COMPANY_CODE);
            return apiRes;
        } catch (error) {
            console.error('❌ Error in db:chaimae:globalInvoices:getAll:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:chaimae:globalInvoices:update', async (event, id, globalInvoiceData) => {
        try {
            return await apiClient.updateGlobalInvoice(id, globalInvoiceData);
        } catch (error) {
            console.error('❌ Error in db:chaimae:globalInvoices:update:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:chaimae:globalInvoices:delete', async (event, id) => {
        try {
            return await apiClient.deleteGlobalInvoice(id);
        } catch (error) {
            console.error('❌ Error in db:chaimae:globalInvoices:delete:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:chaimae:globalInvoices:getBonsByClient', async (event, clientId) => {
        try {
            // Standard approach: fetch all invoices for this client from PG and filter by type 'bon_livraison'
            const apiRes = await apiClient.getInvoices(COMPANY_CODE);
            const clientBons = apiRes.data.filter(inv =>
                inv.client_id === clientId && inv.document_type === 'bon_livraison'
            ).map(inv => ({
                ...inv,
                document_numero: inv.document_numero || inv.document_numero_bl
            }));
            return { success: true, data: clientBons };
            return { success: false, error: apiRes.error || 'API Error' };
        } catch (error) {
            console.error('❌ Error in db:chaimae:globalInvoices:getBonsByClient:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:chaimae:globalInvoices:checkBonNumeroExists', async (event, numero, year, excludeId) => {
        try {
            const apiRes = await apiClient.getInvoices(COMPANY_CODE);
            if (apiRes.success && apiRes.data) {
                const exists = apiRes.data.some(inv =>
                    inv.document_numero === numero &&
                    inv.year === year &&
                    inv.id !== excludeId
                );
                return { exists };
            }
            return { exists: false };
        } catch (error) {
            console.error('❌ Error in db:chaimae:globalInvoices:checkBonNumeroExists:', error);
            return { exists: false, error: error.message };
        }
    });

    // Prefix handlers for CHAIMAE
    ipcMain.handle('db:chaimae:prefixes:getAll', async () => {
        try {
            const prefixes = prefixOps.getAll();
            return { success: true, data: prefixes };
        } catch (error) {
            console.error('❌ Error getting CHAIMAE prefixes:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:chaimae:prefixes:add', async (event, prefix) => {
        try {
            const result = prefixOps.add(prefix);
            return result;
        } catch (error) {
            console.error('❌ Error adding CHAIMAE prefix:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:chaimae:prefixes:delete', async (event, prefix) => {
        try {
            const result = prefixOps.delete(prefix);
            return result;
        } catch (error) {
            console.error('❌ Error deleting CHAIMAE prefix:', error);
            return { success: false, error: error.message };
        }
    });

    // Order Prefix handlers for CHAIMAE
    ipcMain.handle('db:chaimae:orderPrefixes:getAll', async () => {
        try {
            const prefixes = orderPrefixOps.getAll();
            return { success: true, data: prefixes };
        } catch (error) {
            console.error('❌ Error getting CHAIMAE order prefixes:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:chaimae:orderPrefixes:add', async (event, prefix) => {
        try {
            const result = orderPrefixOps.add(prefix);
            return result;
        } catch (error) {
            console.error('❌ Error adding CHAIMAE order prefix:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:chaimae:orderPrefixes:delete', async (event, prefix) => {
        try {
            const result = orderPrefixOps.delete(prefix);
            return result;
        } catch (error) {
            console.error('❌ Error deleting CHAIMAE order prefix:', error);
            return { success: false, error: error.message };
        }
    });

    // Simple Order Prefix handlers for CHAIMAE
    ipcMain.handle('db:chaimae:simpleOrderPrefixes:getAll', async () => {
        try {
            const prefixes = simpleOrderPrefixOps.getAll();
            return { success: true, data: prefixes };
        } catch (error) {
            console.error('❌ Error getting CHAIMAE simple order prefixes:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:chaimae:simpleOrderPrefixes:add', async (event, prefix) => {
        try {
            const result = simpleOrderPrefixOps.add(prefix);
            return result;
        } catch (error) {
            console.error('❌ Error adding CHAIMAE simple order prefix:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:chaimae:simpleOrderPrefixes:delete', async (event, prefix) => {
        try {
            const result = simpleOrderPrefixOps.delete(prefix);
            return result;
        } catch (error) {
            console.error('❌ Error deleting CHAIMAE simple order prefix:', error);
            return { success: false, error: error.message };
        }
    });

    // Get missing invoice numbers
    ipcMain.handle('db:chaimae:getMissingNumbers', async (event, year) => {
        try {
            return await apiClient.getMissingNumbers(COMPANY_CODE, year, 'facture');
        } catch (error) {
            console.error('❌ Error getting missing numbers (API):', error);
            return { success: false, error: error.message };
        }
    });

    // Get missing devis numbers
    ipcMain.handle('db:chaimae:getMissingDevisNumbers', async (event, year) => {
        try {
            return await apiClient.getMissingNumbers(COMPANY_CODE, year, 'devis');
        } catch (error) {
            console.error('❌ Error getting missing devis numbers (API):', error);
            return { success: false, error: error.message };
        }
    });

    // Get missing order numbers
    ipcMain.handle('db:chaimae:getMissingOrderNumbers', async () => {
        // Order numbers handle differently in legacy, but for Postgres we'll use same logic if applicable
        // Or if 'order' is a docType
        try {
            return await apiClient.getMissingNumbers(COMPANY_CODE, new Date().getFullYear(), 'order');
        } catch (error) {
            console.error('❌ Error getting missing order numbers (API):', error);
            return { success: false, error: error.message };
        }
    });

    // Get missing Bon de livraison numbers
    ipcMain.handle('db:chaimae:getMissingBonLivraisonNumbers', async (event, year) => {
        try {
            return await apiClient.getMissingNumbers(COMPANY_CODE, year, 'bon_livraison');
        } catch (error) {
            console.error('❌ Error getting missing Bon de livraison numbers (API):', error);
            return { success: false, error: error.message };
        }
    });

    // Delete all data handler for CHAIMAE - WARNING: THIS DELETES SQLITE DATA.
    // IF WE WANT TO DELETE POSTGRES DATA, WE SHOULD UPDATE THIS.
    // User asked to dispense with old files, but global features still use SQLite.
    // We should probably leave this as SQLite delete for now or implement API delete All.
    ipcMain.handle('db:chaimae:deleteAllData', async () => {
        try {
            const { deleteAllData } = require('./db_chaimae');
            deleteAllData();
            return { success: true, message: 'Toutes les données LOCALES ont été supprimées' };
        } catch (error) {
            console.error('❌ Error deleting all CHAIMAE data:', error);
            return { success: false, error: error.message };
        }
    });

    // Notes handlers for CHAIMAE
    ipcMain.handle('db:chaimae:saveNote', async (event, invoiceId, noteText) => {
        try {
            const { noteOps } = require('./db_chaimae');
            const result = await noteOps.saveNote(invoiceId, noteText);
            return result;
        } catch (error) {
            console.error('[CHAIMAE] Error saving note:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:chaimae:getNote', async (event, invoiceId) => {
        try {
            const { noteOps } = require('./db_chaimae');
            const result = await noteOps.getNote(invoiceId);
            return result;
        } catch (error) {
            console.error('[CHAIMAE] Error getting note:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:chaimae:deleteNote', async (event, invoiceId) => {
        try {
            const { noteOps } = require('./db_chaimae');
            const result = await noteOps.deleteNote(invoiceId);
            return result;
        } catch (error) {
            console.error('[CHAIMAE] Error deleting note:', error);
            return { success: false, error: error.message };
        }
    });

    // Audit Log handlers
    ipcMain.handle('db:chaimae:auditLog:add', async (event, invoiceId, action, userId, userName, userEmail, changes) => {
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
            console.error('[CHAIMAE] Error adding audit log (API):', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:chaimae:getAuditLog', async (event, invoiceId) => {
        try {
            return await apiClient.getAuditLog(invoiceId);
        } catch (error) {
            console.error('[CHAIMAE] Error getting audit logs (API):', error);
            return { success: false, error: error.message };
        }
    });

    // Delivery Persons Handlers
    ipcMain.handle('db:chaimae:deliveryPersons:getAll', async (event, company) => {
        try {
            return await apiClient.getDeliveryPersons(company);
        } catch (error) {
            console.error('❌ Error getting CHAIMAE delivery persons (API):', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:chaimae:deliveryPersons:add', async (event, name, company) => {
        try {
            return await apiClient.addDeliveryPerson(name, company);
        } catch (error) {
            console.error('❌ Error adding CHAIMAE delivery person (API):', error);
            return { success: false, error: error.message };
        }
    });

    // Validation & Permissions Handlers
    ipcMain.handle('db:chaimae:invoices:getPending', async () => {
        try {
            return await apiClient.getPendingInvoices(COMPANY_CODE);
        } catch (error) {
            console.error('❌ Error getting pending CHAIMAE invoices (API):', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:chaimae:invoices:validate', async (event, id, status, userEmail) => {
        try {
            return await apiClient.validateInvoice(id, status, userEmail);
        } catch (error) {
            console.error('❌ Error validating CHAIMAE invoice (API):', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:chaimae:users:getAll', async () => {
        try {
            return await apiClient.getUsers();
        } catch (error) {
            console.error('❌ Error getting users (API):', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:chaimae:users:updatePermissions', async (event, id, can_auto_validate) => {
        try {
            return await apiClient.updateUserPermissions(id, can_auto_validate);
        } catch (error) {
            console.error('❌ Error updating user permissions (API):', error);
            return { success: false, error: error.message };
        }
    });

    // console.log('✅ CHAIMAE Database IPC handlers registered');
}

module.exports = { registerChaimaeHandlers };
