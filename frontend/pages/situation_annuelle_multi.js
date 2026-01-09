// SITUATION - Annual Report Generator for MULTI TRAVAUX
// This file handles the generation of annual situation reports for clients

// Show SITUATION Modal
window.showSituationAnnuelleModalMulti = async function () {
    try {
        // Get all clients from Multi database
        const clientsResult = await window.electron.dbMulti.getAllClients();
        const clients = clientsResult.success ? clientsResult.data : [];

        const currentYear = new Date().getFullYear();
        const years = [currentYear, currentYear - 1, currentYear - 2, currentYear - 3, currentYear - 4];

        const overlay = document.createElement('div');
        overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.9);z-index:999999;display:flex;align-items:center;justify-content:center;animation:fadeIn 0.2s;padding:2rem;';

        const modal = document.createElement('div');
        modal.style.cssText = 'background:linear-gradient(145deg, #2a2a2e 0%, #1a1a1e 100%);border:2px solid #e53935;border-radius:20px;padding:2rem;width:600px;max-height:85vh;overflow-y:auto;box-shadow:0 25px 80px rgba(0,0,0,0.95);';

        modal.innerHTML = `
            <style>
                @keyframes fadeIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
            </style>
            <div style="display:flex;align-items:center;gap:1rem;margin-bottom:2rem;padding-bottom:1.5rem;border-bottom:2px solid #3a3a3e;">
                <div style="background:linear-gradient(135deg, #ef5350 0%, #c62828 100%);padding:1rem;border-radius:12px;box-shadow:0 4px 15px rgba(229,57,53,0.3);">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                </div>
                <div style="flex:1;">
                    <h2 style="color:#fff;margin:0;font-size:1.6rem;font-weight:700;letter-spacing:-0.5px;">SITUATION (Multi)</h2>
                    <p style="color:#999;margin:0.25rem 0 0 0;font-size:0.9rem;">Générer un rapport annuel détaillé</p>
                </div>
            </div>
            
            <div style="margin-bottom:1.25rem;position:relative;">
                <label style="display:block;color:#ef5350;margin-bottom:0.5rem;font-weight:600;font-size:0.9rem;text-transform:uppercase;letter-spacing:0.5px;">Client</label>
                <input type="text" id="situationAnnuelleClientInputMulti" placeholder="Rechercher un client..." 
                       autocomplete="off"
                       style="width:100%;padding:0.875rem 1rem;background:#2d2d30;border:1px solid #3e3e42;border-radius:10px;color:#fff;font-size:0.95rem;outline:none;transition:all 0.2s;"
                       oninput="searchSituationAnnuelleClientsMulti(this.value)"
                       onfocus="this.style.borderColor='#ef5350';this.style.boxShadow='0 0 0 3px rgba(239,83,80,0.1)';showSituationAnnuelleClientsListMulti()"
                       onblur="this.style.borderColor='#3e3e42';this.style.boxShadow='none';hideSituationAnnuelleClientsListMulti()">
                <input type="hidden" id="situationAnnuelleClientIdMulti" value="">
                <div id="situationAnnuelleClientsDropdownMulti" style="display:none;position:absolute;top:100%;left:0;right:0;background:#2d2d30;border:1px solid #3e3e42;border-top:none;border-radius:0 0 10px 10px;max-height:250px;overflow-y:auto;z-index:1000;margin-top:-10px;box-shadow:0 8px 20px rgba(0,0,0,0.4);"></div>
            </div>
            <style>
                .situation-annuelle-dropdown-item {
                    padding: 0.75rem 1rem;
                    cursor: pointer;
                    border-bottom: 1px solid #3e3e42;
                    transition: all 0.2s;
                }
                .situation-annuelle-dropdown-item:hover {
                    background: #ef5350;
                }
                .situation-annuelle-dropdown-item:last-child {
                    border-bottom: none;
                }
            </style>
            
            <div style="display:flex;gap:1.5rem;margin-bottom:1.5rem;">
                <div style="flex:1;">
                    <label style="display:block;color:#ef5350;margin-bottom:0.5rem;font-weight:600;font-size:0.9rem;text-transform:uppercase;letter-spacing:0.5px;">Année</label>
                    <select id="situationAnnuelleYearMulti" style="width:100%;padding:0.75rem 1rem;background:#2d2d30;border:1px solid #3e3e42;border-radius:10px;color:#fff;font-size:0.95rem;outline:none;cursor:pointer;transition:all 0.2s;" onfocus="this.style.borderColor='#ef5350';this.style.boxShadow='0 0 0 3px rgba(239,83,80,0.1)'" onblur="this.style.borderColor='#3e3e42';this.style.boxShadow='none'">
                        ${years.map(y => `<option value="${y}" ${y === currentYear ? 'selected' : ''}>${y}</option>`).join('')}
                    </select>
                </div>
                
                <div style="flex:1;">
                    <label style="display:block;color:#ef5350;margin-bottom:0.5rem;font-weight:600;font-size:0.9rem;text-transform:uppercase;letter-spacing:0.5px;">Types de documents</label>
                    <div style="display:flex;gap:1rem;padding:0.55rem 0;">
                        <label style="display:flex;align-items:center;color:#fff;cursor:pointer;font-size:0.95rem;">
                            <input type="checkbox" id="situationAnnuelleTypeFactureMulti" checked style="margin-right:0.5rem;accent-color:#ef5350;width:18px;height:18px;">
                            Facture
                        </label>
                        <label style="display:flex;align-items:center;color:#fff;cursor:pointer;font-size:0.95rem;">
                            <input type="checkbox" id="situationAnnuelleTypeDevisMulti" checked style="margin-right:0.5rem;accent-color:#ef5350;width:18px;height:18px;">
                            Devis
                        </label>
                    </div>
                </div>
            </div>

            <div style="margin-bottom:1.5rem;">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem;">
                    <label style="color:#ef5350;font-weight:600;font-size:0.9rem;text-transform:uppercase;letter-spacing:0.5px;">Mois à inclure</label>
                    <div>
                        <button type="button" onclick="toggleAllMonthsMulti(true)" style="background:none;border:none;color:#ef5350;cursor:pointer;font-size:0.85rem;margin-right:0.5rem;text-decoration:underline;">Tout sélectionner</button>
                        <button type="button" onclick="toggleAllMonthsMulti(false)" style="background:none;border:none;color:#999;cursor:pointer;font-size:0.85rem;text-decoration:underline;">Tout désélectionner</button>
                    </div>
                </div>
                <div style="display:grid;grid-template-columns:repeat(4, 1fr);gap:0.75rem;">
                    ${['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'].map((m, i) => `
                        <label style="display:flex;align-items:center;background:#2d2d30;padding:0.6rem;border-radius:8px;border:1px solid #3e3e42;cursor:pointer;transition:all 0.2s;" onmouseover="this.style.borderColor='#ef5350'" onmouseout="this.style.borderColor='#3e3e42'">
                            <input type="checkbox" class="month-checkbox-multi" value="${i + 1}" checked style="margin-right:0.5rem;accent-color:#ef5350;">
                            <span style="color:#fff;font-size:0.9rem;">${m}</span>
                        </label>
                    `).join('')}
                </div>
            </div>
            
            <div style="display:flex;gap:0.75rem;margin-top:2rem;">
                <button id="situationAnnuelleCancelMulti" style="flex:1;padding:0.875rem 1.5rem;background:#3e3e42;color:#fff;border:none;border-radius:10px;cursor:pointer;font-size:0.95rem;font-weight:600;transition:all 0.2s;" onmouseover="this.style.background='#4e4e52'" onmouseout="this.style.background='#3e3e42'">
                    Annuler
                </button>
                <button id="situationAnnuelleGenerateMulti" style="flex:2;padding:0.875rem 1.5rem;background:linear-gradient(135deg, #ef5350 0%, #c62828 100%);color:#fff;border:none;border-radius:10px;cursor:pointer;font-size:0.95rem;font-weight:600;transition:all 0.2s;box-shadow:0 4px 12px rgba(239,83,80,0.3);display:flex;align-items:center;justify-content:center;gap:0.5rem;" onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 6px 20px rgba(239,83,80,0.4)'" onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='0 4px 12px rgba(239,83,80,0.3)'">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="12" y1="18" x2="12" y2="12"></line>
                        <line x1="9" y1="15" x2="15" y2="15"></line>
                    </svg>
                    <span>Générer PDF</span>
                </button>
            </div>
        `;

        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        let filteredClients = clients;

        window.toggleAllMonthsMulti = function (selectAll) {
            document.querySelectorAll('.month-checkbox-multi').forEach(cb => cb.checked = selectAll);
        };

        window.searchSituationAnnuelleClientsMulti = function (query) {
            if (!query || query.trim().length === 0) {
                filteredClients = clients;
            } else {
                const searchTerm = query.toLowerCase().trim();
                filteredClients = clients.filter(client =>
                    client.nom.toLowerCase().includes(searchTerm) ||
                    client.ice.toLowerCase().includes(searchTerm)
                );
            }
            displaySituationAnnuelleClientsListMulti();
        };

        function displaySituationAnnuelleClientsListMulti() {
            const dropdown = document.getElementById('situationAnnuelleClientsDropdownMulti');
            if (!dropdown) return;

            if (filteredClients.length === 0) {
                dropdown.innerHTML = '<div style="padding:1rem;text-align:center;color:#999;">Aucun client trouvé</div>';
                dropdown.style.display = 'block';
                return;
            }

            dropdown.innerHTML = filteredClients.slice(0, 10).map(client => `
                <div class="situation-annuelle-dropdown-item" onmousedown="selectSituationAnnuelleClientMulti(${client.id}, '${client.nom.replace(/'/g, "\\'")}', '${client.ice}')">
                    <div style="color:#fff;font-weight:600;margin-bottom:0.25rem;">${client.nom}</div>
                    ${client.ice && client.ice !== '0' ? `<div style="color:#999;font-size:0.85rem;">ICE: ${client.ice}</div>` : ''}
                </div>
            `).join('');
            dropdown.style.display = 'block';
        }

        window.showSituationAnnuelleClientsListMulti = function () {
            if (clients.length > 0) {
                filteredClients = clients;
                displaySituationAnnuelleClientsListMulti();
            }
        };

        window.hideSituationAnnuelleClientsListMulti = function () {
            setTimeout(() => {
                const dropdown = document.getElementById('situationAnnuelleClientsDropdownMulti');
                if (dropdown) dropdown.style.display = 'none';
            }, 200);
        };

        window.selectSituationAnnuelleClientMulti = function (id, nom, ice) {
            document.getElementById('situationAnnuelleClientInputMulti').value = `${nom} (${ice})`;
            document.getElementById('situationAnnuelleClientIdMulti').value = id;
            document.getElementById('situationAnnuelleClientsDropdownMulti').style.display = 'none';
        };

        document.getElementById('situationAnnuelleCancelMulti').onclick = () => overlay.remove();

        document.getElementById('situationAnnuelleGenerateMulti').onclick = async () => {
            const clientId = document.getElementById('situationAnnuelleClientIdMulti').value;
            const year = parseInt(document.getElementById('situationAnnuelleYearMulti').value);

            const selectedMonths = Array.from(document.querySelectorAll('.month-checkbox-multi:checked')).map(cb => parseInt(cb.value));
            const includeFacture = document.getElementById('situationAnnuelleTypeFactureMulti').checked;
            const includeDevis = document.getElementById('situationAnnuelleTypeDevisMulti').checked;

            if (!clientId) {
                window.notify.error('Erreur', 'Veuillez sélectionner un client', 3000);
                return;
            }

            if (selectedMonths.length === 0) {
                window.notify.error('Erreur', 'Veuillez sélectionner au moins un mois', 3000);
                return;
            }

            if (!includeFacture && !includeDevis) {
                window.notify.error('Erreur', 'Veuillez sélectionner au moins un type de document', 3000);
                return;
            }

            overlay.remove();
            await generateSituationAnnuelleMulti(clientId, year, selectedMonths, includeFacture, includeDevis);
        };

        // Prevent closing on overlay click
        overlay.onclick = (e) => {
            e.stopPropagation();
        };

    } catch (error) {
        console.error('Error showing SITUATION modal:', error);
        window.notify.error('Erreur', 'Impossible d\'afficher la fenêtre', 3000);
    }
};

// Generate SITUATION PDF for Multi
window.generateSituationAnnuelleMulti = async function (clientId, year, selectedMonths, includeFacture, includeDevis) {
    try {
        window.notify.info('Info', 'Génération du rapport annuel en cours...', 2000);

        // Get client info
        const clientsResult = await window.electron.dbMulti.getAllClients();
        const client = clientsResult.data.find(c => c.id == clientId);

        if (!client) {
            window.notify.error('Erreur', 'Client introuvable', 3000);
            return;
        }

        // Get all invoices for this client
        const invoicesResult = await window.electron.dbMulti.getAllInvoices('MULTI');
        if (!invoicesResult.success) {
            window.notify.error('Erreur', 'Impossible de charger les factures', 3000);
            return;
        }

        // Filter invoices for the selected year and client
        const yearInvoices = invoicesResult.data.filter(inv => {
            const invDate = new Date(inv.document_date);
            return inv.client_id == clientId && invDate.getFullYear() === year;
        });

        if (yearInvoices.length === 0) {
            window.notify.warning('Attention', 'Aucune facture trouvée pour cette année', 4000);
            return;
        }

        // Aggregate data by month
        const monthsData = [];
        const monthNames = ['', 'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

        let grandTotalHT = 0;
        let grandTotalTVA = 0;
        let grandTotalTTC = 0;

        for (const m of selectedMonths.sort((a, b) => a - b)) {
            const monthInvoices = yearInvoices.filter(inv => {
                const d = new Date(inv.document_date);
                const invType = (inv.document_type || '').toLowerCase();

                const isMonthMatch = d.getMonth() + 1 === m;
                const isTypeMatch = (includeFacture && invType === 'facture') || (includeDevis && invType === 'devis');

                return isMonthMatch && isTypeMatch;
            });

            if (monthInvoices.length > 0) {
                let facturesCount = 0;
                let devisCount = 0;
                let monthTotalHT = 0;

                monthInvoices.forEach(inv => {
                    monthTotalHT += parseFloat(inv.total_ht || 0);
                    if (inv.document_type === 'facture') facturesCount++;
                    else if (inv.document_type === 'devis') devisCount++;
                });

                const monthTVA = monthTotalHT * 0.20;
                const monthTTC = monthTotalHT + monthTVA;

                grandTotalHT += monthTotalHT;
                grandTotalTVA += monthTVA;
                grandTotalTTC += monthTTC;

                monthsData.push({
                    monthName: monthNames[m],
                    facturesCount,
                    devisCount,
                    totalHT: monthTotalHT,
                    totalTTC: monthTTC
                });
            }
        }

        if (monthsData.length === 0) {
            window.notify.warning('Attention', 'Aucune donnée trouvée pour les critères sélectionnés', 4000);
            return;
        }

        // PDF Generation
        if (typeof window.jspdf === 'undefined') {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
            await new Promise((resolve) => { script.onload = resolve; document.head.appendChild(script); });
        }

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        // Multi specific colors
        // Multi specific colors (UPDATED TO MATCH MRY/CHAIMAE BLUE THEME)
        const redColor = [33, 97, 140];   // Changed from Red to MRY Blue
        const blueColor = [33, 97, 140];  // Updated to MRY Blue

        // Generate Title String
        const monthNamesUpper = ['', 'JANVIER', 'FÉVRIER', 'MARS', 'AVRIL', 'MAI', 'JUIN', 'JUILLET', 'AOÛT', 'SEPTEMBRE', 'OCTOBRE', 'NOVEMBRE', 'DÉCEMBRE'];
        let dateRangeStr = `${year}`;

        if (selectedMonths.length > 0 && selectedMonths.length < 12) {
            const sorted = selectedMonths.sort((a, b) => a - b);
            let isContiguous = true;
            for (let i = 0; i < sorted.length - 1; i++) {
                if (sorted[i + 1] !== sorted[i] + 1) {
                    isContiguous = false;
                    break;
                }
            }

            if (isContiguous) {
                if (sorted.length === 1) {
                    dateRangeStr = `${monthNamesUpper[sorted[0]]} ${year}`;
                } else {
                    const startMonthName = monthNamesUpper[sorted[0]];
                    const endMonthName = monthNamesUpper[sorted[sorted.length - 1]];
                    const prefix = ['AVRIL', 'AOÛT', 'OCTOBRE'].includes(startMonthName) ? "D'" : "DE ";
                    dateRangeStr = `${prefix}${startMonthName} À ${endMonthName} ${year}`;
                }
            } else {
                dateRangeStr = sorted.map(m => monthNamesUpper[m]).join(', ') + ` ${year}`;
            }
        } else {
            dateRangeStr = `${year}`;
        }

        addHeaderToPDFAnnuelleMulti(doc, client, dateRangeStr, redColor, blueColor);

        // Dynamic Column Positioning
        const startX = 35;
        const endX = 125;
        const totalWidth = endX - startX;

        let activeColumns = [];
        if (includeFacture) activeColumns.push({ label: 'Nbr FACTURES', key: 'facturesCount' });
        if (includeDevis) activeColumns.push({ label: 'Nbr DEVIS', key: 'devisCount' });

        const columnWidth = totalWidth / activeColumns.length;

        activeColumns.forEach((col, index) => {
            col.x = startX + (columnWidth * index) + (columnWidth / 2);
        });

        // Table Header
        // Table Header
        const startY = 90; // Moved down to 90 (Standardized)
        doc.setFillColor(...redColor);
        doc.rect(14, startY, 182, 10, 'F');

        doc.setTextColor(255, 255, 255);
        doc.setFontSize(9);
        doc.setFont(undefined, 'bold');
        doc.text('MOIS', 20, startY + 6.5);

        activeColumns.forEach(col => {
            doc.text(col.label, col.x, startY + 6.5, { align: 'center' });
        });

        doc.text('TOTAL H.T', 140, startY + 6.5, { align: 'right' });
        doc.text('TOTAL T.T.C', 190, startY + 6.5, { align: 'right' });

        /* REMOVED TOTAL ROW AS PER USER REQUEST
        // Total Row
        doc.setFillColor(...redColor); 
        doc.rect(14, currentY, 182, 10, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFont(undefined, 'bold');
        // doc.text('TOTAL GÉNÉRAL', 20, currentY + 6.5);
        
        // Sum of all counts
        const totalFactures = monthsData.reduce((sum, row) => sum + row.facturesCount, 0);
        const totalDevis = monthsData.reduce((sum, row) => sum + row.devisCount, 0);

        const totalsMap = {
            'facturesCount': totalFactures,
            'devisCount': totalDevis
        };

        activeColumns.forEach(col => {
            doc.text(totalsMap[col.key].toString(), col.x, currentY + 6.5, { align: 'center' });
        });
        
        doc.text(formatAmountMulti(grandTotalHT), 140, currentY + 6.5, { align: 'right' });
        doc.text(formatAmountMulti(grandTotalTTC), 190, currentY + 6.5, { align: 'right' });
        */

        // Table Content
        doc.setFont(undefined, 'normal');
        let currentY = startY + 10;

        monthsData.forEach((row, index) => {
            // Alternating row background
            if (index % 2 === 1) {
                doc.setFillColor(255, 235, 238); // Very light red
                doc.rect(14, currentY, 182, 8, 'F');
            }

            doc.setTextColor(0, 0, 0);
            doc.text(row.monthName, 20, currentY + 5.5);

            activeColumns.forEach(col => {
                doc.text(row[col.key].toString(), col.x, currentY + 5.5, { align: 'center' });
            });

            doc.text(formatAmountMulti(row.totalHT), 140, currentY + 5.5, { align: 'right' });
            doc.text(formatAmountMulti(row.totalTTC), 190, currentY + 5.5, { align: 'right' });

            currentY += 8;
        });

        // Totals Footer
        currentY += 10;

        doc.setFillColor(255, 255, 255); // White for HT
        doc.rect(110, currentY, 85, 8, 'F');
        doc.setFont(undefined, 'bold');
        doc.text('TOTAL HT :', 113, currentY + 5.5);
        doc.text(`${formatAmountMulti(grandTotalHT)} DH`, 192, currentY + 5.5, { align: 'right' });

        currentY += 8;
        doc.setFillColor(255, 255, 255); // White for TVA
        doc.rect(110, currentY, 85, 8, 'F');
        doc.text('TOTAL TVA :', 113, currentY + 5.5);
        doc.text(`${formatAmountMulti(grandTotalTVA)} DH`, 192, currentY + 5.5, { align: 'right' });

        currentY += 8;
        doc.setFillColor(...redColor); // Red for TTC (Header Color)
        doc.rect(110, currentY, 85, 8, 'F');
        doc.setTextColor(255, 255, 255); // White text
        doc.setFont(undefined, 'bold'); // Explicitly bold
        doc.text('TOTAL TTC :', 113, currentY + 5.5);
        doc.text(`${formatAmountMulti(grandTotalTTC)} DH`, 192, currentY + 5.5, { align: 'right' });

        // Add Footer to ALL pages
        const totalPages = doc.internal.getNumberOfPages();
        for (let i = 1; i <= totalPages; i++) {
            doc.setPage(i);
            addFooterToPDFAnnuelleMulti(doc, i, totalPages);
        }

        // Save
        const filename = `Situation_Annuelle_${client.nom.replace(/\s+/g, '_')}_${year}_MULTI.pdf`;
        doc.save(filename);

        window.notify.success('Succès', 'Rapport annuel généré avec succès', 3000);

    } catch (error) {
        console.error('Error generating annual report for Multi:', error);
        window.notify.error('Erreur', 'Impossible de générer le rapport: ' + error.message, 4000);
    }
};

function formatAmountMulti(amount) {
    if (isNaN(amount) || amount === null || amount === undefined) {
        return '0.00';
    }
    const num = parseFloat(amount);
    const parts = num.toFixed(2).split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return parts.join('.');
}

function addHeaderToPDFAnnuelleMulti(doc, client, dateRangeStr, redColor, blueColor) {
    // Logo
    try {
        const logoImg = document.querySelector('img[src*="multi.png"]') ||
            document.querySelector('img[data-asset="multi"]') ||
            document.querySelector('img[src^="data:image"]');
        if (logoImg && logoImg.src && logoImg.src.startsWith('data:')) {
            doc.addImage(logoImg.src, 'PNG', 15, 10, 35, 35);
        }
    } catch (error) {
        console.log('Logo not added:', error);
    }

    // Company Header
    doc.setFontSize(18);
    doc.setTextColor(...redColor);
    doc.setFont(undefined, 'bold');
    doc.text('MULTI TRAVAUX TETOUAN', 105, 20, { align: 'center' });

    // Removed duplicates as per request

    // Removed "Travaux divers..." and "Négociant" as per request

    // Client Info
    doc.setFontSize(11);
    doc.setFont(undefined, 'bold');
    doc.text('CLIENT :', 15, 50);
    doc.setTextColor(...blueColor);
    doc.text(client.nom.toUpperCase(), 40, 50);

    // Only show ICE if it exists and is not '0'
    if (client.ice && client.ice !== '0') {
        doc.setTextColor(0, 0, 0);
        doc.text('ICE :', 15, 57);
        doc.setTextColor(...blueColor);
        doc.text(client.ice, 40, 57);
    }

    // Date
    doc.setTextColor(0, 0, 0);
    doc.text(`Date: ${new Date().toLocaleDateString('fr-FR')}`, 150, 50);

    // Title
    doc.setFontSize(15);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text('SITUATION', 105, 70, { align: 'center' });

    doc.setTextColor(...redColor);
    doc.setFontSize(13);
    const splitTitle = doc.splitTextToSize(` ${dateRangeStr}`, 170);
    doc.text(splitTitle, 105, 82, { align: 'center' });
}

function addFooterToPDFAnnuelleMulti(doc, pageNumber, totalPages) {
    const pageWidth = doc.internal.pageSize.width || 210;
    const pageHeight = doc.internal.pageSize.height || 297;

    doc.setDrawColor(200, 200, 200);
    doc.line(10, pageHeight - 15, pageWidth - 10, pageHeight - 15);

    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.setFont(undefined, 'normal');

    // Footer Text from Image
    const line1 = 'NIF 68717422 | TP 51001343 | RC 38633 | CNSS 6446237';
    const line2 = 'ICE : 00380950500031';
    const line3 = 'Tel: +212 661 307 323';

    doc.text(line1, pageWidth / 2, pageHeight - 11, { align: 'center' });
    doc.text(line2, pageWidth / 2, pageHeight - 8, { align: 'center' });
    doc.text(line3, pageWidth / 2, pageHeight - 5, { align: 'center' });

    // Page Number
    doc.text(`Page ${pageNumber} / ${totalPages}`, pageWidth - 20, pageHeight - 5, { align: 'right' });
}
