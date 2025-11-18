const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electron', {
  // Window controls
  minimize: () => ipcRenderer.send('window-minimize'),
  maximize: () => ipcRenderer.send('window-maximize'),
  close: () => ipcRenderer.send('window-close'),
  
  // Database API for MRY
  db: {
    // Clients
    searchClients: (query) => ipcRenderer.invoke('db:clients:search', query),
    getAllClients: () => ipcRenderer.invoke('db:clients:getAll'),
    deleteClient: (clientId) => ipcRenderer.invoke('db:clients:delete', clientId),
    
    // Invoices
    createInvoice: (data) => ipcRenderer.invoke('db:invoices:create', data),
    getInvoiceById: (id) => ipcRenderer.invoke('db:invoices:getById', id),
    getAllInvoices: (companyCode) => ipcRenderer.invoke('db:invoices:getAll', companyCode),
    updateInvoice: (id, data) => ipcRenderer.invoke('db:invoices:update', id, data),
    deleteInvoice: (id) => ipcRenderer.invoke('db:invoices:delete', id),
    getNextInvoiceNumber: (companyCode, documentType, year) => 
      ipcRenderer.invoke('db:invoices:getNextNumber', companyCode, documentType, year),
    
    // Attachments
    addAttachment: (invoiceId, filename, fileType, fileData) => 
      ipcRenderer.invoke('db:attachments:add', invoiceId, filename, fileType, fileData),
    getAttachment: (id) => ipcRenderer.invoke('db:attachments:get', id),
    deleteAttachment: (id) => ipcRenderer.invoke('db:attachments:delete', id),
    getAttachmentsByInvoice: (invoiceId) => ipcRenderer.invoke('db:attachments:getByInvoice', invoiceId),
    
    // MRY Order Prefixes
    getMryOrderPrefixes: () => ipcRenderer.invoke('db:mryOrderPrefixes:getAll'),
    addMryOrderPrefix: (prefix) => ipcRenderer.invoke('db:mryOrderPrefixes:add', prefix),
    deleteMryOrderPrefix: (prefix) => ipcRenderer.invoke('db:mryOrderPrefixes:delete', prefix),
    
    // MRY Missing Numbers
    getMryMissingNumbers: (year) => ipcRenderer.invoke('db:mry:getMissingNumbers', year),
    getMryMissingDevisNumbers: (year) => ipcRenderer.invoke('db:mry:getMissingDevisNumbers', year),
    
    // Notes
    saveNote: (invoiceId, noteText) => ipcRenderer.invoke('db:saveNote', invoiceId, noteText),
    getNote: (invoiceId) => ipcRenderer.invoke('db:getNote', invoiceId),
    deleteNote: (invoiceId) => ipcRenderer.invoke('db:deleteNote', invoiceId),
    
    // Backup & Restore
    exportDatabase: () => ipcRenderer.invoke('db:backup:export'),
    importDatabase: () => ipcRenderer.invoke('db:backup:import'),
    
    // Delete all data
    deleteAllData: () => ipcRenderer.invoke('db:deleteAllData')
  },
  
  // Users API
  users: {
    register: (name, email, password) => ipcRenderer.invoke('users:register', { name, email, password }),
    login: (email, password) => ipcRenderer.invoke('users:login', { email, password }),
    hasUsers: () => ipcRenderer.invoke('users:hasUsers'),
    getAll: () => ipcRenderer.invoke('users:getAll')
  },
  
  // Database API for CHAIMAE
  dbChaimae: {
    // Clients
    searchClients: (query) => ipcRenderer.invoke('db:chaimae:clients:search', query),
    getAllClients: () => ipcRenderer.invoke('db:chaimae:clients:getAll'),
    deleteClient: (clientId) => ipcRenderer.invoke('db:chaimae:clients:delete', clientId),
    
    // Invoices
    createInvoice: (data) => ipcRenderer.invoke('db:chaimae:invoices:create', data),
    getInvoiceById: (id) => ipcRenderer.invoke('db:chaimae:invoices:getById', id),
    getAllInvoices: () => ipcRenderer.invoke('db:chaimae:invoices:getAll'),
    updateInvoice: (id, data) => ipcRenderer.invoke('db:chaimae:invoices:update', id, data),
    deleteInvoice: (id) => ipcRenderer.invoke('db:chaimae:invoices:delete', id),
    getNextInvoiceNumber: (documentType, year) => 
      ipcRenderer.invoke('db:chaimae:invoices:getNextNumber', documentType, year),
    getAvailableYears: () => ipcRenderer.invoke('db:chaimae:invoices:getAvailableYears'),
    
    // Attachments
    addAttachment: (invoiceId, filename, fileType, fileData) => 
      ipcRenderer.invoke('db:chaimae:attachments:add', invoiceId, filename, fileType, fileData),
    getAttachment: (id) => ipcRenderer.invoke('db:chaimae:attachments:get', id),
    deleteAttachment: (id) => ipcRenderer.invoke('db:chaimae:attachments:delete', id),
    getAttachmentsByInvoice: (invoiceId) => ipcRenderer.invoke('db:chaimae:attachments:getByInvoice', invoiceId),
    
    // Global Invoices (Factures Globales)
    createGlobalInvoice: (data) => ipcRenderer.invoke('db:chaimae:globalInvoices:create', data),
    getGlobalInvoiceById: (id) => ipcRenderer.invoke('db:chaimae:globalInvoices:getById', id),
    getAllGlobalInvoices: () => ipcRenderer.invoke('db:chaimae:globalInvoices:getAll'),
    updateGlobalInvoice: (id, data) => ipcRenderer.invoke('db:chaimae:globalInvoices:update', id, data),
    deleteGlobalInvoice: (id) => ipcRenderer.invoke('db:chaimae:globalInvoices:delete', id),
    getBonsByClient: (clientId) => ipcRenderer.invoke('db:chaimae:globalInvoices:getBonsByClient', clientId),
    checkBonNumeroExists: (numero) => ipcRenderer.invoke('db:chaimae:globalInvoices:checkBonNumeroExists', numero),
    
    // Prefixes
    getAllPrefixes: () => ipcRenderer.invoke('db:chaimae:prefixes:getAll'),
    addPrefix: (prefix) => ipcRenderer.invoke('db:chaimae:prefixes:add', prefix),
    deletePrefix: (prefix) => ipcRenderer.invoke('db:chaimae:prefixes:delete', prefix),
    
    // Order Prefixes
    getOrderPrefixes: () => ipcRenderer.invoke('db:chaimae:orderPrefixes:getAll'),
    addOrderPrefix: (prefix) => ipcRenderer.invoke('db:chaimae:orderPrefixes:add', prefix),
    deleteOrderPrefix: (prefix) => ipcRenderer.invoke('db:chaimae:orderPrefixes:delete', prefix),
    
    // Simple Order Prefixes
    getSimpleOrderPrefixes: () => ipcRenderer.invoke('db:chaimae:simpleOrderPrefixes:getAll'),
    addSimpleOrderPrefix: (prefix) => ipcRenderer.invoke('db:chaimae:simpleOrderPrefixes:add', prefix),
    deleteSimpleOrderPrefix: (prefix) => ipcRenderer.invoke('db:chaimae:simpleOrderPrefixes:delete', prefix),
    
    // Missing Numbers
    getMissingNumbers: (year) => ipcRenderer.invoke('db:chaimae:getMissingNumbers', year),
    getMissingDevisNumbers: (year) => ipcRenderer.invoke('db:chaimae:getMissingDevisNumbers', year),
    getMissingOrderNumbers: () => ipcRenderer.invoke('db:chaimae:getMissingOrderNumbers'),
    getMissingBonLivraisonNumbers: (year) => ipcRenderer.invoke('db:chaimae:getMissingBonLivraisonNumbers', year),
    
    // Notes
    saveNote: (invoiceId, noteText) => ipcRenderer.invoke('db:chaimae:saveNote', invoiceId, noteText),
    getNote: (invoiceId) => ipcRenderer.invoke('db:chaimae:getNote', invoiceId),
    deleteNote: (invoiceId) => ipcRenderer.invoke('db:chaimae:deleteNote', invoiceId),
    
    // Backup & Restore
    exportDatabase: () => ipcRenderer.invoke('db:chaimae:backup:export'),
    importDatabase: () => ipcRenderer.invoke('db:chaimae:backup:import'),
    
    // Delete all data
    deleteAllData: () => ipcRenderer.invoke('db:chaimae:deleteAllData')
  },
  
  // Database API for MULTI
  dbMulti: {
    // Clients
    searchClients: (query) => ipcRenderer.invoke('dbMulti:searchClients', query),
    getAllClients: () => ipcRenderer.invoke('dbMulti:getAllClients'),
    deleteClient: (clientId) => ipcRenderer.invoke('dbMulti:deleteClient', clientId),
    
    // Invoices
    createInvoice: (data) => ipcRenderer.invoke('dbMulti:createInvoice', data),
    getInvoiceById: (id) => ipcRenderer.invoke('dbMulti:getInvoice', id),
    getAllInvoices: (companyCode) => ipcRenderer.invoke('dbMulti:getAllInvoices', companyCode),
    updateInvoice: (id, data) => ipcRenderer.invoke('dbMulti:updateInvoice', id, data),
    deleteInvoice: (id) => ipcRenderer.invoke('dbMulti:deleteInvoice', id),
    getNextInvoiceNumber: (companyCode, documentType, year) => 
      ipcRenderer.invoke('dbMulti:getNextInvoiceNumber', companyCode, documentType, year),
    
    // Attachments
    addAttachment: (invoiceId, filename, fileType, fileData) => 
      ipcRenderer.invoke('dbMulti:addAttachment', invoiceId, filename, fileType, fileData),
    getAttachment: (id) => ipcRenderer.invoke('dbMulti:getAttachment', id),
    deleteAttachment: (id) => ipcRenderer.invoke('dbMulti:deleteAttachment', id),
    getAttachmentsByInvoice: (invoiceId) => ipcRenderer.invoke('dbMulti:getAttachmentsByInvoice', invoiceId),
    
    // MULTI Order Prefixes
    getMultiOrderPrefixes: () => ipcRenderer.invoke('dbMulti:multiOrderPrefixes:getAll'),
    addMultiOrderPrefix: (prefix) => ipcRenderer.invoke('dbMulti:multiOrderPrefixes:add', prefix),
    deleteMultiOrderPrefix: (prefix) => ipcRenderer.invoke('dbMulti:multiOrderPrefixes:delete', prefix),
    
    // MULTI Missing Numbers
    getMultiMissingNumbers: (year) => ipcRenderer.invoke('dbMulti:getMissingNumbers', year),
    getMultiMissingDevisNumbers: (year) => ipcRenderer.invoke('dbMulti:getMissingDevisNumbers', year),
    
    // Notes
    saveNote: (invoiceId, noteText) => ipcRenderer.invoke('dbMulti:saveNote', invoiceId, noteText),
    getNote: (invoiceId) => ipcRenderer.invoke('dbMulti:getNote', invoiceId),
    deleteNote: (invoiceId) => ipcRenderer.invoke('dbMulti:deleteNote', invoiceId),
    
    // Backup & Restore
    exportDatabase: () => ipcRenderer.invoke('db:multi:backup:export'),
    importDatabase: () => ipcRenderer.invoke('db:multi:backup:import'),
    
    // Delete all data
    deleteAllData: () => ipcRenderer.invoke('dbMulti:deleteAllData')
  },
  
  // Database API for SKM
  dbSkm: {
    // Devis Numbers
    checkDevisExists: (devisNumber, year) => ipcRenderer.invoke('db:skm:devis:exists', devisNumber, year),
    addDevisNumber: (devisNumber, year) => ipcRenderer.invoke('db:skm:devis:add', devisNumber, year),
    getDevisByYear: (year) => ipcRenderer.invoke('db:skm:devis:getByYear', year),
    getAllDevis: () => ipcRenderer.invoke('db:skm:devis:getAll'),
    getLastDevisNumber: (year) => ipcRenderer.invoke('db:skm:devis:getLast', year),
    getMaxDevisNumber: (year) => ipcRenderer.invoke('db:skm:devis:getMax', year),
    deleteDevisNumber: (devisNumber, year) => ipcRenderer.invoke('db:skm:devis:delete', devisNumber, year),
    clearAllDevis: () => ipcRenderer.invoke('db:skm:devis:clearAll'),
    
    // PDF Files
    savePdfPath: (devisNumber, year, filePath, createdBy) => ipcRenderer.invoke('db:skm:pdf:savePath', devisNumber, year, filePath, createdBy),
    getPdfPath: (devisNumber, year) => ipcRenderer.invoke('db:skm:pdf:getPath', devisNumber, year),
    deletePdfPath: (devisNumber, year) => ipcRenderer.invoke('db:skm:pdf:deletePath', devisNumber, year)
  },
  
  // Database API for SAAISS
  dbSaaiss: {
    // Devis Numbers
    checkDevisExists: (devisNumber, year) => ipcRenderer.invoke('db:saaiss:devis:exists', devisNumber, year),
    addDevisNumber: (devisNumber, year) => ipcRenderer.invoke('db:saaiss:devis:add', devisNumber, year),
    getDevisByYear: (year) => ipcRenderer.invoke('db:saaiss:devis:getByYear', year),
    getAllDevis: () => ipcRenderer.invoke('db:saaiss:devis:getAll'),
    getLastDevisNumber: (year) => ipcRenderer.invoke('db:saaiss:devis:getLast', year),
    getMaxDevisNumber: (year) => ipcRenderer.invoke('db:saaiss:devis:getMax', year),
    deleteDevisNumber: (devisNumber, year) => ipcRenderer.invoke('db:saaiss:devis:delete', devisNumber, year),
    clearAllDevis: () => ipcRenderer.invoke('db:saaiss:devis:clearAll'),
    
    // PDF Files
    savePdfPath: (devisNumber, year, filePath, createdBy) => ipcRenderer.invoke('db:saaiss:pdf:savePath', devisNumber, year, filePath, createdBy),
    getPdfPath: (devisNumber, year) => ipcRenderer.invoke('db:saaiss:pdf:getPath', devisNumber, year),
    deletePdfPath: (devisNumber, year) => ipcRenderer.invoke('db:saaiss:pdf:deletePath', devisNumber, year)
  },
  
  // PDF Files API
  pdf: {
    savePdf: (pdfData, company, devisNumber, createdBy) => ipcRenderer.invoke('pdf:savePdf', pdfData, company, devisNumber, createdBy),
    getPdfFiles: (company, createdBy) => ipcRenderer.invoke('pdf:getPdfFiles', company, createdBy),
    openPdf: (filePath) => ipcRenderer.invoke('pdf:openPdf', filePath),
    deletePdf: (filePath) => ipcRenderer.invoke('pdf:deletePdf', filePath),
    exportAll: (company, userCompany) => ipcRenderer.invoke('pdf:exportAll', company, userCompany),
    importAll: (company) => ipcRenderer.invoke('pdf:importAll', company)
  },
  
  // Asset loading
  getAssetPath: (assetPath) => ipcRenderer.invoke('get-asset-path', assetPath),
  
  // Get app version
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),
  
  // Auto-updater API
  updater: {
    checkForUpdates: () => ipcRenderer.invoke('check-for-updates'),
    setLanguage: (language) => ipcRenderer.invoke('set-update-language', language),
    downloadUpdate: () => ipcRenderer.invoke('download-update'),
    installUpdate: () => ipcRenderer.invoke('install-update'),
    onUpdateAvailable: (callback) => ipcRenderer.on('update-available', (event, info) => callback(info)),
    onDownloadProgress: (callback) => ipcRenderer.on('download-progress', (event, percent) => callback(percent)),
    onUpdateDownloaded: (callback) => ipcRenderer.on('update-downloaded', (event, info) => callback(info))
  },
  
  // Add your API methods here
  send: (channel, data) => {
    // Whitelist channels
    let validChannels = ['toMain'];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  receive: (channel, func) => {
    let validChannels = ['fromMain'];
    if (validChannels.includes(channel)) {
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
  }
});
