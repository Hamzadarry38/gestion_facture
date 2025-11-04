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
    
    // Backup & Restore
    exportDatabase: () => ipcRenderer.invoke('db:multi:backup:export'),
    importDatabase: () => ipcRenderer.invoke('db:multi:backup:import'),
    
    // Delete all data
    deleteAllData: () => ipcRenderer.invoke('dbMulti:deleteAllData')
  },
  
  // Asset loading
  getAssetPath: (assetPath) => ipcRenderer.invoke('get-asset-path', assetPath),
  
  // Auto-updater API
  updater: {
    checkForUpdates: () => ipcRenderer.invoke('check-for-updates'),
    setLanguage: (language) => ipcRenderer.invoke('set-update-language', language)
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
