const ExcelJS = require('exceljs');
const path = require('path');

/**
 * Export invoices to Excel file matching the required format:
 * DATE FAC | N FACT | FRS/CLT | IF | ICE | DESIGN | TTC | HT | TVA | MODE PAIE | DATE | CH/PRTD | CMPT TVA | TX | TROSR
 * 
 * @param {string} filePath - Path to save the Excel file
 * @param {Array} invoices - Array of invoice objects with products
 * @param {string} companyCode - Company code (MULTI, MRY, CHAIMAE)
 * @returns {Promise<{success: boolean, error?: string}>}
 */
async function exportInvoicesToExcel(filePath, invoices, companyCode) {
  try {
    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'Gestion des Factures';
    workbook.created = new Date();

    const worksheet = workbook.addWorksheet('Factures', {
      views: [{ state: 'frozen', ySplit: 1 }]
    });

    // CH/PRTD value depends on company
    const chPrtdValue = companyCode.toUpperCase() === 'CHAIMAE' ? '7110' : '7124';

    // Define columns
    worksheet.columns = [
      { header: 'DATE FAC', key: 'date_fac', width: 14 },
      { header: 'N FACT', key: 'n_fact', width: 12 },
      { header: 'FRS/CLT', key: 'frs_clt', width: 30 },
      { header: 'IF', key: 'if_field', width: 14 },
      { header: 'ICE', key: 'ice', width: 18 },
      { header: 'DESIGN', key: 'design', width: 35 },
      { header: 'TTC', key: 'ttc', width: 18 },
      { header: 'HT', key: 'ht', width: 18 },
      { header: 'TVA', key: 'tva', width: 18 },
      { header: 'MODE PAIE', key: 'mode_paie', width: 22 },
      { header: 'DATE', key: 'date_paie', width: 14 },
      { header: 'CH/PRTD', key: 'ch_prtd', width: 12 },
      { header: 'CMPT TVA', key: 'cmpt_tva', width: 12 },
      { header: 'TX', key: 'tx', width: 8 },
      { header: 'TROSR', key: 'trosr', width: 14 }
    ];

    // Style header row
    const headerRow = worksheet.getRow(1);
    headerRow.font = { bold: true, size: 10 };
    headerRow.alignment = { horizontal: 'center', vertical: 'middle' };
    headerRow.height = 22;
    headerRow.eachCell((cell) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFD9E1F2' }
      };
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      };
    });

    // Filter only 'facture' type invoices and sort by N FACT ascending
    const factureInvoices = invoices
      .filter(inv => inv.document_type === 'facture')
      .sort((a, b) => {
        // Extract numeric part from document_numero for sorting
        const numA = extractNumericPart(a.document_numero);
        const numB = extractNumericPart(b.document_numero);
        return numA - numB;
      });

    // Add data rows
    factureInvoices.forEach(inv => {
      // Get first product name for DESIGN
      const firstProductName = getFirstProductName(inv);

      // Get totals from invoice fields
      const totalHT = parseFloat(inv.total_ht) || 0;
      const totalTTC = parseFloat(inv.total_ttc) || 0;
      const tvaAmount = parseFloat(inv.montant_tva) || (totalTTC - totalHT);

      // Payment method mapping
      const modePayment = getPaymentModeDisplay(inv.payment_status, inv.payment_method);

      // Format dates
      const dateFac = formatDateForExcel(inv.document_date);
      const datePayment = formatDateForExcel(inv.payment_date);

      const row = worksheet.addRow({
        date_fac: dateFac,
        n_fact: inv.document_numero || '',
        frs_clt: inv.client_nom || '',
        if_field: inv.client_if || '',
        ice: inv.client_ice || '',
        design: firstProductName,
        ttc: totalTTC,
        ht: totalHT,
        tva: tvaAmount,
        mode_paie: modePayment,
        date_paie: datePayment,
        ch_prtd: chPrtdValue,
        cmpt_tva: '44755',
        tx: '20%',
        trosr: ''
      });

      // Style data cells
      row.eachCell((cell, colNumber) => {
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        };
        cell.alignment = { vertical: 'middle' };

        // Number formatting for monetary columns (TTC, HT, TVA)
        if (colNumber >= 7 && colNumber <= 9) {
          cell.numFmt = '#,##0.00';
          cell.alignment = { horizontal: 'right', vertical: 'middle' };
        }

        // Center alignment for specific columns
        if ([1, 2, 4, 10, 11, 12, 13, 14, 15].includes(colNumber)) {
          cell.alignment = { horizontal: 'center', vertical: 'middle' };
        }
      });
    });

    // Enable auto-filter on header row
    worksheet.autoFilter = {
      from: { row: 1, column: 1 },
      to: { row: 1, column: 15 }
    };

    await workbook.xlsx.writeFile(filePath);
    return { success: true, count: factureInvoices.length };

  } catch (error) {
    console.error('❌ Excel export error:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Extract numeric part from document_numero for sorting
 * e.g. "FA-001/2025" → 1, "123/2025" → 123
 */
function extractNumericPart(numero) {
  if (!numero) return 0;
  // Remove prefix letters and dashes, get first sequence of digits
  const matches = numero.match(/(\d+)/);
  return matches ? parseInt(matches[1], 10) : 0;
}

/**
 * Get first product name from invoice
 */
function getFirstProductName(invoice) {
  if (invoice.products && Array.isArray(invoice.products) && invoice.products.length > 0) {
    // Sort by position if available
    const sorted = [...invoice.products].sort((a, b) => (a.position || 0) - (b.position || 0));
    return sorted[0].designation || sorted[0].name || '';
  }
  return '';
}

/**
 * Format date string for Excel display (DD/MM/YYYY)
 */
function formatDateForExcel(dateStr) {
  if (!dateStr) return '';
  try {
    // Handle YYYY-MM-DD format
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    // Try parsing as Date
    const d = new Date(dateStr);
    if (!isNaN(d.getTime())) {
      const day = String(d.getDate()).padStart(2, '0');
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const year = d.getFullYear();
      return `${day}/${month}/${year}`;
    }
    return dateStr;
  } catch (e) {
    return dateStr || '';
  }
}

/**
 * Get payment mode display text
 */
function getPaymentModeDisplay(status, method) {
  if (!status || status !== 'payé') {
    return 'En attente de paiement';
  }
  if (method) {
    return method;
  }
  return 'Payé';
}

module.exports = { exportInvoicesToExcel };
