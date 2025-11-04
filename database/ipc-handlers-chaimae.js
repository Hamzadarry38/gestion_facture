const { ipcMain } = require('electron');
const { initDatabase, clientOps, invoiceOps, attachmentOps, globalInvoiceOps, prefixOps } = require('./db_chaimae');

// Register all IPC handlers for CHAIMAE
async function registerChaimaeHandlers() {
    // Initialize CHAIMAE database first
    await initDatabase();
    
    // Client handlers for CHAIMAE
    ipcMain.handle('db:chaimae:clients:search', async (event, query) => {
        try {
            return { success: true, data: clientOps.search(query) };
        } catch (error) {
            console.error('❌ Error searching CHAIMAE clients:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:chaimae:clients:getAll', async () => {
        try {
            return { success: true, data: clientOps.getAll() };
        } catch (error) {
            console.error('❌ Error getting CHAIMAE clients:', error);
            return { success: false, error: error.message };
        }
    });

    // Invoice handlers for CHAIMAE
    ipcMain.handle('db:chaimae:invoices:create', async (event, invoiceData) => {
        try {
            // console.log('📝 Creating CHAIMAE invoice:', invoiceData);
            const invoiceId = invoiceOps.create(invoiceData);
            // console.log('✅ CHAIMAE Invoice created with ID:', invoiceId);
            return { success: true, data: { id: invoiceId } };
        } catch (error) {
            console.error('❌ Error creating CHAIMAE invoice:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:chaimae:invoices:getById', async (event, id) => {
        try {
            const invoice = invoiceOps.getById(id);
            return { success: true, data: invoice };
        } catch (error) {
            console.error('❌ Error getting CHAIMAE invoice:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:chaimae:invoices:getAll', async () => {
        try {
            const invoices = invoiceOps.getAll();
            return { success: true, data: invoices };
        } catch (error) {
            console.error('❌ Error getting CHAIMAE invoices:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:chaimae:invoices:update', async (event, id, invoiceData) => {
        try {
            // console.log('📝 Updating CHAIMAE invoice:', id, invoiceData);
            invoiceOps.update(id, invoiceData);
            // console.log('✅ CHAIMAE Invoice updated:', id);
            return { success: true };
        } catch (error) {
            console.error('❌ Error updating CHAIMAE invoice:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:chaimae:invoices:delete', async (event, id) => {
        try {
            invoiceOps.delete(id);
            // console.log('✅ CHAIMAE Invoice deleted:', id);
            return { success: true };
        } catch (error) {
            console.error('❌ Error deleting CHAIMAE invoice:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:chaimae:invoices:getNextNumber', async (event, documentType, year) => {
        try {
            const nextNumber = invoiceOps.getNextInvoiceNumber(documentType, year);
            return { success: true, data: nextNumber };
        } catch (error) {
            console.error('❌ Error getting next CHAIMAE invoice number:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:chaimae:invoices:getAvailableYears', async () => {
        try {
            const years = invoiceOps.getAvailableYears();
            return { success: true, data: years };
        } catch (error) {
            console.error('❌ Error getting CHAIMAE available years:', error);
            return { success: false, error: error.message };
        }
    });

    // Attachment handlers for CHAIMAE
    ipcMain.handle('db:chaimae:attachments:add', async (event, invoiceId, filename, fileType, fileData) => {
        try {
            // console.log(`📎 Adding CHAIMAE attachment: ${filename} (${fileType})`);
            const id = attachmentOps.add(invoiceId, filename, fileType, Buffer.from(fileData));
            // console.log('✅ CHAIMAE Attachment added with ID:', id);
            return { success: true, data: { id } };
        } catch (error) {
            console.error('❌ Error adding CHAIMAE attachment:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:chaimae:attachments:get', async (event, id) => {
        try {
            const attachment = attachmentOps.get(id);
            if (attachment && attachment.file_data) {
                // Convert Uint8Array to Buffer then to base64
                const buffer = Buffer.from(attachment.file_data);
                attachment.file_data = buffer.toString('base64');
            }
            return { success: true, data: attachment };
        } catch (error) {
            console.error('❌ Error getting CHAIMAE attachment:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:chaimae:attachments:delete', async (event, id) => {
        try {
            attachmentOps.delete(id);
            // console.log('✅ CHAIMAE Attachment deleted:', id);
            return { success: true };
        } catch (error) {
            console.error('❌ Error deleting CHAIMAE attachment:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:chaimae:attachments:getByInvoice', async (event, invoiceId) => {
        try {
            const attachments = attachmentOps.getByInvoice(invoiceId);
            return { success: true, data: attachments };
        } catch (error) {
            console.error('❌ Error getting CHAIMAE attachments:', error);
            return { success: false, error: error.message };
        }
    });

    // Global Invoice handlers for CHAIMAE
    ipcMain.handle('db:chaimae:globalInvoices:create', async (event, globalInvoiceData) => {
        try {
            // console.log('📝 Creating CHAIMAE global invoice:', globalInvoiceData);
            const globalInvoiceId = globalInvoiceOps.create(globalInvoiceData);
            // console.log('✅ CHAIMAE Global Invoice created with ID:', globalInvoiceId);
            return { success: true, data: { id: globalInvoiceId } };
        } catch (error) {
            console.error('❌ Error creating CHAIMAE global invoice:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:chaimae:globalInvoices:getById', async (event, id) => {
        try {
            const globalInvoice = globalInvoiceOps.getById(id);
            return { success: true, data: globalInvoice };
        } catch (error) {
            console.error('❌ Error getting CHAIMAE global invoice:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:chaimae:globalInvoices:getAll', async () => {
        try {
            const globalInvoices = globalInvoiceOps.getAll();
            return { success: true, data: globalInvoices };
        } catch (error) {
            console.error('❌ Error getting CHAIMAE global invoices:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:chaimae:globalInvoices:update', async (event, id, globalInvoiceData) => {
        try {
            // console.log('📝 Updating CHAIMAE global invoice:', id, globalInvoiceData);
            globalInvoiceOps.update(id, globalInvoiceData);
            // console.log('✅ CHAIMAE Global Invoice updated:', id);
            return { success: true };
        } catch (error) {
            console.error('❌ Error updating CHAIMAE global invoice:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:chaimae:globalInvoices:delete', async (event, id) => {
        try {
            globalInvoiceOps.delete(id);
            // console.log('✅ CHAIMAE Global Invoice deleted:', id);
            return { success: true };
        } catch (error) {
            console.error('❌ Error deleting CHAIMAE global invoice:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:chaimae:globalInvoices:getBonsByClient', async (event, clientId) => {
        try {
            const bons = globalInvoiceOps.getBonsByClient(clientId);
            return { success: true, data: bons };
        } catch (error) {
            console.error('❌ Error getting CHAIMAE bons by client:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('db:chaimae:globalInvoices:checkBonNumeroExists', async (event, numero) => {
        try {
            const result = globalInvoiceOps.checkBonNumeroExists(numero);
            return result;
        } catch (error) {
            console.error('❌ Error checking CHAIMAE bon numero:', error);
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

    // Delete all data handler for CHAIMAE
    ipcMain.handle('db:chaimae:deleteAllData', async () => {
        try {
            const { deleteAllData } = require('./db_chaimae');
            deleteAllData();
            return { success: true, message: 'Toutes les données ont été supprimées' };
        } catch (error) {
            console.error('❌ Error deleting all CHAIMAE data:', error);
            return { success: false, error: error.message };
        }
    });

    // console.log('✅ CHAIMAE Database IPC handlers registered');
}

module.exports = { registerChaimaeHandlers };
