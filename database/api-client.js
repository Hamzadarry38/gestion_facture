const axios = require('axios');

// Configuration
// In Electron, we can use a global window variable or localStorage to set the API URL
// Fallback logic: local dev -> DDNS production
const DEFAULT_LOCAL_API = 'https://redouan.ddns.net/facture';
const PRODUCTION_API = 'https://anpe-web-api.ddns.net/facture/api';
const WEB_PORTAL_URL = 'https://anpe-web-api.ddns.net/facture/';

// Safe way to check for localStorage in both Node (Main) and Browser (Renderer) environments
let configuredApiUrl = null;
try {
    if (typeof window !== 'undefined' && window.localStorage) {
        configuredApiUrl = window.localStorage.getItem('API_BASE_URL');
    }
} catch (e) {
    // Fallback if localStorage access is blocked or unavailable
}

const API_URL = configuredApiUrl || DEFAULT_LOCAL_API;
console.log(`[API Client] Using Base URL: ${API_URL}`);




const apiClient = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    },
    // Add this to allow connecting to HTTPS sites with self-signed/unverified certificates (Common in DDNS)
    httpsAgent: new (require('https')).Agent({
        rejectUnauthorized: false
    })
});

const service = {
    // Auth
    login: async (email, password) => {
        const res = await apiClient.post('/auth/login', { email, password });
        return res.data;
    },

    register: async (name, email, password) => {
        const res = await apiClient.post('/auth/register', { name, email, password });
        return res.data;
    },

    getUsers: async () => {
        const res = await apiClient.get('/users');
        return res.data;
    },

    getUsersCount: async () => {
        const res = await apiClient.get('/users/count');
        return res.data;
    },

    updatePassword: async (email, oldPassword, newPassword) => {
        const res = await apiClient.put('/auth/password', { email, oldPassword, newPassword });
        return res.data;
    },

    // Clients
    getClients: async (companyCode) => {
        const res = await apiClient.get(`/clients/${companyCode}`);
        return res.data;
    },

    createClient: async (clientData) => {
        const res = await apiClient.post('/clients', clientData);
        return res.data;
    },

    deleteClient: async (id) => {
        const res = await apiClient.delete(`/clients/${id}`);
        return res.data;
    },

    // Invoices
    getInvoices: async (companyCode) => {
        const res = await apiClient.get(`/invoices/${companyCode}`);
        return res.data;
    },

    getInvoiceById: async (id) => {
        const res = await apiClient.get(`/invoices/id/${id}`);
        return res.data;
    },

    createInvoice: async (invoiceData) => {
        const res = await apiClient.post('/invoices', invoiceData);
        return res.data;
    },

    updateInvoice: async (id, invoiceData) => {
        const res = await apiClient.put(`/invoices/${id}`, invoiceData);
        return res.data;
    },

    deleteInvoice: async (id) => {
        const res = await apiClient.delete(`/invoices/${id}`);
        return res.data;
    },

    getNextInvoiceNumber: async (companyCode, year, docType) => {
        const res = await apiClient.get(`/invoices/next-number/${companyCode}/${year}/${docType}`);
        return res.data;
    },

    getAvailableYears: async (companyCode) => {
        const res = await apiClient.get(`/invoices/available-years/${companyCode}`);
        return res.data;
    },

    // Attachments
    getAttachments: async (invoiceId) => {
        const res = await apiClient.get(`/attachments/${invoiceId}`);
        return res.data;
    },

    getAttachment: async (id) => {
        const res = await apiClient.get(`/attachments/id/${id}`);
        return res.data;
    },

    addAttachment: async (attachmentData) => {
        // attachmentData should include { invoice_id, filename, file_type, file_size, file_data (base64) }
        const res = await apiClient.post('/attachments', attachmentData);
        return res.data;
    },

    deleteAttachment: async (id) => {
        const res = await apiClient.delete(`/attachments/${id}`);
        return res.data;
    },

    // Test
    testConnection: async () => {
        const res = await apiClient.get('/test');
        return res.data;
    },

    // Devis Tracking
    getDevis: async (company) => {
        const res = await apiClient.get(`/devis/${company}`);
        return res.data;
    },

    getLastDevis: async (company, year) => {
        const res = await apiClient.get(`/devis/${company}/last/${year}`);
        return res.data;
    },

    addDevis: async (company, devisNumber, year) => {
        const res = await apiClient.post(`/devis/${company}`, { devis_number: devisNumber, year });
        return res.data;
    },

    deleteDevis: async (company, number, year) => {
        const res = await apiClient.delete(`/devis/${company}/${number}/${year}`);
        return res.data;
    },

    // PDF Path Management
    getAllPdfPaths: async (company) => {
        const res = await apiClient.get(`/pdf/${company}`);
        return res.data;
    },

    getPdfPath: async (company, number, year) => {
        const res = await apiClient.get(`/pdf/${company}/${number}/${year}`);
        return res.data;
    },

    savePdfPath: async (company, devisNumber, year, filePath, createdBy) => {
        const res = await apiClient.post(`/pdf/${company}`, { devis_number: devisNumber, year, file_path: filePath, created_by: createdBy });
        return res.data;
    },

    // Delivery Persons
    getDeliveryPersons: async (company) => {
        const res = await apiClient.get(`/delivery-persons/${company}`);
        return res.data;
    },

    addDeliveryPerson: async (name, companyCode) => {
        const res = await apiClient.post('/delivery-persons', { name, company_code: companyCode });
        return res.data;
    },

    // Audit Log
    getAuditLog: async (invoiceId) => {
        const res = await apiClient.get(`/audit-log/${invoiceId}`);
        return res.data;
    },

    addAuditLog: async (logData) => {
        const res = await apiClient.post('/audit-log', logData);
        return res.data;
    },

    // Validation & Permissions
    getPendingInvoices: async (companyCode) => {
        const res = await apiClient.get('/invoices/pending', {
            params: { company_code: companyCode }
        });
        return res.data;
    },

    validateInvoice: async (id, status) => {
        const res = await apiClient.put(`/invoices/${id}/validation`, { status });
        return res.data;
    },

    updateUserPermissions: async (id, can_auto_validate) => {
        const res = await apiClient.put(`/users/${id}/permissions`, { can_auto_validate });
        return res.data;
    },

    getMissingNumbers: async (companyCode, year, docType) => {
        const res = await apiClient.get(`/invoices/missing-numbers/${companyCode}/${year}/${docType}`);
        return res.data;
    },

    // Global Invoices
    getGlobalInvoices: async (companyCode) => {
        const res = await apiClient.get(`/global-invoices/${companyCode}`);
        return res.data;
    },

    getGlobalInvoiceById: async (id) => {
        const res = await apiClient.get(`/global-invoices/id/${id}`);
        return res.data;
    },

    createGlobalInvoice: async (giData) => {
        const res = await apiClient.post('/global-invoices', giData);
        return res.data;
    },

    updateGlobalInvoice: async (id, giData) => {
        const res = await apiClient.put(`/global-invoices/${id}`, giData);
        return res.data;
    },

    deleteGlobalInvoice: async (id) => {
        const res = await apiClient.delete(`/global-invoices/${id}`);
        return res.data;
    }
};

module.exports = service;
