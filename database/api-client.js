const axios = require('axios');

// Configuration
// In Electron, we can use a global window variable or localStorage to set the API URL
// Fallback logic: local dev -> DDNS production
const DEFAULT_LOCAL_API = 'https://anpe-web-api.ddns.net/facture';
const PRODUCTION_API = 'https://anpe-web-api.ddns.net/facture/api';
const WEB_PORTAL_URL = 'https://anpe-web-api.ddns.net/facture/';

// Safe way to check for localStorage in both Node (Main) and Browser (Renderer) environments
let configuredApiUrl = null;
const isNode = typeof process !== 'undefined' && process.versions && !!process.versions.node;
let FormDataNode = null;

if (isNode) {
    try {
        FormDataNode = require('form-data');
        console.log('📦 [API Client] Using form-data for Node.js environment');
    } catch (e) {
        console.warn('⚠️ [API Client] form-data package not found, multipart/form-data might fail in Node.js');
    }
}

try {
    if (typeof window !== 'undefined' && window.localStorage) {
        configuredApiUrl = window.localStorage.getItem('API_BASE_URL');
    }
} catch (e) {
    // Fallback if localStorage access is blocked or unavailable
}

// For development, we want to force localhost:8001 if we are running locally
// configuredApiUrl (localStorage) should not hijack local dev
const API_URL = configuredApiUrl || DEFAULT_LOCAL_API;
console.log(`[API Client] Using Base URL: ${API_URL}`);
console.log(`[API Client] 🌐 DDNS URL: https://anpe-web-api.ddns.net/facture`);
console.log(`[API Client] 🏠 Localhost URL: https://anpe-web-api.ddns.net/facture`);
console.log(`[API Client] ✅ Active URL: ${API_URL}`);


// Fix: Normalize date fields that come back from the API as ISO datetime strings
// Simply extract the YYYY-MM-DD portion directly from the string without Date parsing
// This avoids any timezone conversion issues
const DATE_FIELDS = ['document_date', 'created_at', 'updated_at'];
function normalizeDateField(value) {
    if (!value || typeof value !== 'string') return value;
    // Match ISO datetime format: YYYY-MM-DDTHH:MM:SS
    if (/^\d{4}-\d{2}-\d{2}T/.test(value)) {
        // Just take the date part directly from the string - no Date object, no timezone issues
        return value.substring(0, 10);
    }
    return value;
}

function normalizeInvoiceDates(obj) {
    if (!obj || typeof obj !== 'object') return obj;
    if (Array.isArray(obj)) {
        return obj.map(item => normalizeInvoiceDates(item));
    }
    const result = { ...obj };
    for (const field of DATE_FIELDS) {
        if (result[field]) {
            const original = result[field];
            result[field] = normalizeDateField(result[field]);
            if (original !== result[field]) {
                console.log(`📅 [DATE FIX] ${field}: "${original}" -> "${result[field]}"`);
            }
        }
    }
    return result;
}

function normalizeResponseDates(data) {
    if (!data) return data;
    // Handle { success: true, data: [...] } or { success: true, data: {...} }
    if (data.data) {
        data.data = normalizeInvoiceDates(data.data);
    }
    // Handle direct array/object responses
    if (Array.isArray(data)) {
        return data.map(item => normalizeInvoiceDates(item));
    }
    return data;
}

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

// Add request interceptor to log every API call
apiClient.interceptors.request.use(
    (config) => {
        console.log(`[API Request] 🚀 ${config.method.toUpperCase()} ${config.baseURL}${config.url}`);
        return config;
    },
    (error) => {
        console.error('[API Request Error]', error);
        return Promise.reject(error);
    }
);

// Add response interceptor to log responses AND normalize dates
apiClient.interceptors.response.use(
    (response) => {
        console.log(`[API Response] ✅ ${response.config.method.toUpperCase()} ${response.config.url} - Status: ${response.status}`);
        // Normalize date fields in response data to prevent timezone-related off-by-one bugs
        if (response.data) {
            response.data = normalizeResponseDates(response.data);
        }
        return response;
    },
    (error) => {
        if (error.response) {
            console.error(`[API Response Error] ❌ ${error.config.method.toUpperCase()} ${error.config.url} - Status: ${error.response.status}`);
        } else if (error.request) {
            console.error(`[API Network Error] ❌ No response received for ${error.config.method.toUpperCase()} ${error.config.url}`);
            console.error(`[API Network Error] ❌ Server not reachable at: ${error.config.baseURL}`);
        } else {
            console.error('[API Error]', error.message);
        }
        return Promise.reject(error);
    }
);

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

    getInvoiceById: async (id, userEmail) => {
        // userEmail is passed from frontend through IPC chain
        // Backend needs this to determine if viewer is Admin (to reset is_modified flag)
        const res = await apiClient.get(`/invoices/id/${id}`, {
            params: { user_email: userEmail || '' }
        });
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

    // Devis Data (full devis/facture tracking with products)
    getDevisData: async (company, year) => {
        const url = year ? `/devis-data/${company}?year=${year}` : `/devis-data/${company}`;
        const res = await apiClient.get(url);
        return res.data;
    },

    getDevisDataByNumber: async (company, number, year) => {
        const res = await apiClient.get(`/devis-data/${company}/${number}/${year}`);
        return res.data;
    },

    saveDevisData: async (company, data) => {
        const res = await apiClient.post(`/devis-data/${company}`, data);
        return res.data;
    },

    deleteDevisData: async (company, id) => {
        const res = await apiClient.delete(`/devis-data/${company}/${id}`);
        return res.data;
    },

    // New: Upload PDF file
    uploadPdf: async (company, pdfData, filename) => {
        let fd;
        let headers = {};

        // Safely convert any input type to Buffer
        let pdfBuffer;
        if (Buffer.isBuffer(pdfData)) {
            pdfBuffer = pdfData;
        } else if (pdfData instanceof Uint8Array || pdfData instanceof ArrayBuffer) {
            pdfBuffer = Buffer.from(pdfData);
        } else if (Array.isArray(pdfData) || (pdfData && typeof pdfData === 'object' && pdfData.type === 'Buffer')) {
            // Handle serialized Buffer objects from IPC (e.g. {type: 'Buffer', data: [...]})
            pdfBuffer = Buffer.from(pdfData.data || pdfData);
        } else {
            throw new Error('Données PDF invalides: type non reconnu');
        }

        if (isNode && FormDataNode) {
            fd = new FormDataNode();
            fd.append('pdf', pdfBuffer, {
                filename: filename,
                contentType: 'application/pdf'
            });
            headers = { ...fd.getHeaders() };
        } else {
            // Browser environment
            fd = new FormData();
            const blob = new Blob([pdfBuffer], { type: 'application/pdf' });
            fd.append('pdf', blob, filename);
            // Let axios set Content-Type with boundary automatically
        }

        const res = await apiClient.post(`/upload/${company}`, fd, {
            headers: headers,
            timeout: 30000, // 30s timeout for large PDF uploads
            maxContentLength: Infinity,
            maxBodyLength: Infinity
        });
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

    validateInvoice: async (id, status, userEmail) => {
        const res = await apiClient.put(`/invoices/${id}/validation`, { status, user_email: userEmail || '' });
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
    },

    // PDF Companies (Online company management)
    getPdfCompanies: async () => {
        const res = await apiClient.get('/pdf-companies');
        return res.data;
    },

    getPdfCompany: async (code) => {
        const res = await apiClient.get(`/pdf-companies/${code}`);
        return res.data;
    },

    createPdfCompany: async (companyData) => {
        const res = await apiClient.post('/pdf-companies', companyData);
        return res.data;
    },

    updatePdfCompany: async (code, companyData) => {
        const res = await apiClient.put(`/pdf-companies/${code}`, companyData);
        return res.data;
    },

    deletePdfCompany: async (code) => {
        const res = await apiClient.delete(`/pdf-companies/${code}`);
        return res.data;
    },

    // Company PDF Settings
    getPdfSettings: async (company) => {
        const res = await apiClient.get(`/pdf-settings/${company}`);
        return res.data;
    },

    savePdfSettings: async (company, percentage, productNames) => {
        const res = await apiClient.put(`/pdf-settings/${company}`, {
            percentage,
            product_names: productNames
        });
        return res.data;
    }
};

module.exports = service;
