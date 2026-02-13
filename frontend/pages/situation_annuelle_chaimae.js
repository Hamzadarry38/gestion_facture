// SITUATION - Annual Report Generator for CHAIMAE
// This file handles the generation of annual situation reports for clients

// Show SITUATION Modal
window.showSituationAnnuelleModalChaimae = async function () {
    try {
        // Get all clients from Chaimae database
        const clientsResult = await window.electron.dbChaimae.getAllClients();
        const clients = clientsResult.success ? clientsResult.data : [];

        const currentYear = new Date().getFullYear();
        const years = [currentYear, currentYear - 1, currentYear - 2, currentYear - 3, currentYear - 4];

        const overlay = document.createElement('div');
        overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.9);z-index:999999;display:flex;align-items:center;justify-content:center;animation:fadeIn 0.2s;padding:2rem;';

        const modal = document.createElement('div');
        modal.style.cssText = 'background:linear-gradient(145deg, #2a2a2e 0%, #1a1a1e 100%);border:2px solid #673ab7;border-radius:20px;padding:2rem;width:650px;max-height:85vh;overflow-y:auto;box-shadow:0 25px 80px rgba(0,0,0,0.95);';

        modal.innerHTML = `
            <style>
                @keyframes fadeIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
            </style>
            <div style="display:flex;align-items:center;gap:1rem;margin-bottom:2rem;padding-bottom:1.5rem;border-bottom:2px solid #3a3a3e;">
                <div style="background:linear-gradient(135deg, #7e57c2 0%, #512da8 100%);padding:1rem;border-radius:12px;box-shadow:0 4px 15px rgba(103,58,183,0.3);">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                </div>
                <div style="flex:1;">
                    <h2 style="color:#fff;margin:0;font-size:1.6rem;font-weight:700;letter-spacing:-0.5px;">SITUATION (Chaimae)</h2>
                    <p style="color:#999;margin:0.25rem 0 0 0;font-size:0.9rem;">Générer un rapport annuel incluant les BL</p>
                </div>
            </div>
            
            <div style="margin-bottom:1.25rem;position:relative;">
                <label style="display:block;color:#7e57c2;margin-bottom:0.5rem;font-weight:600;font-size:0.9rem;text-transform:uppercase;letter-spacing:0.5px;">Client</label>
                <input type="text" id="situationAnnuelleClientInputChaimae" placeholder="Rechercher un client..." 
                       autocomplete="off"
                       style="width:100%;padding:0.875rem 1rem;background:#2d2d30;border:1px solid #3e3e42;border-radius:10px;color:#fff;font-size:0.95rem;outline:none;transition:all 0.2s;"
                       oninput="searchSituationAnnuelleClientsChaimae(this.value)"
                       onfocus="this.style.borderColor='#7e57c2';this.style.boxShadow='0 0 0 3px rgba(126,87,194,0.1)';showSituationAnnuelleClientsListChaimae()"
                       onblur="this.style.borderColor='#3e3e42';this.style.boxShadow='none';hideSituationAnnuelleClientsListChaimae()">
                <input type="hidden" id="situationAnnuelleClientIdChaimae" value="">
                <div id="situationAnnuelleClientsDropdownChaimae" style="display:none;position:absolute;top:100%;left:0;right:0;background:#2d2d30;border:1px solid #3e3e42;border-top:none;border-radius:0 0 10px 10px;max-height:250px;overflow-y:auto;z-index:1000;margin-top:-10px;box-shadow:0 8px 20px rgba(0,0,0,0.4);"></div>
            </div>
            <style>
                .situation-annuelle-dropdown-item {
                    padding: 0.75rem 1rem;
                    cursor: pointer;
                    border-bottom: 1px solid #3e3e42;
                    transition: all 0.2s;
                }
                .situation-annuelle-dropdown-item:hover {
                    background: #7e57c2;
                }
                .situation-annuelle-dropdown-item:last-child {
                    border-bottom: none;
                }
            </style>
            
            <div style="display:flex;gap:1.5rem;margin-bottom:1.5rem;">
                <div style="flex:1;">
                    <label style="display:block;color:#7e57c2;margin-bottom:0.5rem;font-weight:600;font-size:0.9rem;text-transform:uppercase;letter-spacing:0.5px;">Année</label>
                    <select id="situationAnnuelleYearChaimae" style="width:100%;padding:0.75rem 1rem;background:#2d2d30;border:1px solid #3e3e42;border-radius:10px;color:#fff;font-size:0.95rem;outline:none;cursor:pointer;transition:all 0.2s;" onfocus="this.style.borderColor='#7e57c2';this.style.boxShadow='0 0 0 3px rgba(126,87,194,0.1)'" onblur="this.style.borderColor='#3e3e42';this.style.boxShadow='none'">
                        ${years.map(y => `<option value="${y}" ${y === currentYear ? 'selected' : ''}>${y}</option>`).join('')}
                    </select>
                </div>
                
                <div style="flex:2;">
                    <label style="display:block;color:#7e57c2;margin-bottom:0.5rem;font-weight:600;font-size:0.9rem;text-transform:uppercase;letter-spacing:0.5px;">Types de documents</label>
                    <div style="display:flex;gap:1rem;padding:0.55rem 0;flex-wrap:wrap;">
                        <label style="display:flex;align-items:center;color:#fff;cursor:pointer;font-size:0.95rem;">
                            <input type="checkbox" id="situationAnnuelleTypeFactureChaimae" checked style="margin-right:0.5rem;accent-color:#7e57c2;width:18px;height:18px;">
                            Facture
                        </label>
                        <label style="display:flex;align-items:center;color:#fff;cursor:pointer;font-size:0.95rem;">
                            <input type="checkbox" id="situationAnnuelleTypeDevisChaimae" checked style="margin-right:0.5rem;accent-color:#7e57c2;width:18px;height:18px;">
                            Devis
                        </label>
                         <label style="display:flex;align-items:center;color:#fff;cursor:pointer;font-size:0.95rem;">
                            <input type="checkbox" id="situationAnnuelleTypeBLChaimae" checked style="margin-right:0.5rem;accent-color:#7e57c2;width:18px;height:18px;">
                            Bon de Livraison
                        </label>
                    </div>
                </div>
            </div>

            <div style="margin-bottom:1.5rem;">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem;">
                    <label style="color:#7e57c2;font-weight:600;font-size:0.9rem;text-transform:uppercase;letter-spacing:0.5px;">Mois à inclure</label>
                    <div>
                        <button type="button" onclick="toggleAllMonthsChaimae(true)" style="background:none;border:none;color:#7e57c2;cursor:pointer;font-size:0.85rem;margin-right:0.5rem;text-decoration:underline;">Tout sélectionner</button>
                        <button type="button" onclick="toggleAllMonthsChaimae(false)" style="background:none;border:none;color:#999;cursor:pointer;font-size:0.85rem;text-decoration:underline;">Tout désélectionner</button>
                    </div>
                </div>
                <div style="display:grid;grid-template-columns:repeat(4, 1fr);gap:0.75rem;">
                    ${['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'].map((m, i) => `
                        <label style="display:flex;align-items:center;background:#2d2d30;padding:0.6rem;border-radius:8px;border:1px solid #3e3e42;cursor:pointer;transition:all 0.2s;" onmouseover="this.style.borderColor='#7e57c2'" onmouseout="this.style.borderColor='#3e3e42'">
                            <input type="checkbox" class="month-checkbox-chaimae" value="${i + 1}" checked style="margin-right:0.5rem;accent-color:#7e57c2;">
                            <span style="color:#fff;font-size:0.9rem;">${m}</span>
                        </label>
                    `).join('')}
                </div>
            </div>
            
            <div style="display:flex;gap:0.75rem;margin-top:2rem;">
                <button id="situationAnnuelleCancelChaimae" style="flex:1;padding:0.875rem 1.5rem;background:#3e3e42;color:#fff;border:none;border-radius:10px;cursor:pointer;font-size:0.95rem;font-weight:600;transition:all 0.2s;" onmouseover="this.style.background='#4e4e52'" onmouseout="this.style.background='#3e3e42'">
                    Annuler
                </button>
                <button id="situationAnnuelleGenerateChaimae" style="flex:2;padding:0.875rem 1.5rem;background:linear-gradient(135deg, #7e57c2 0%, #512da8 100%);color:#fff;border:none;border-radius:10px;cursor:pointer;font-size:0.95rem;font-weight:600;transition:all 0.2s;box-shadow:0 4px 12px rgba(126,87,194,0.3);display:flex;align-items:center;justify-content:center;gap:0.5rem;" onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 6px 20px rgba(126,87,194,0.4)'" onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='0 4px 12px rgba(126,87,194,0.3)'">
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

        window.toggleAllMonthsChaimae = function (selectAll) {
            document.querySelectorAll('.month-checkbox-chaimae').forEach(cb => cb.checked = selectAll);
        };

        window.searchSituationAnnuelleClientsChaimae = function (query) {
            if (!query || query.trim().length === 0) {
                filteredClients = clients;
            } else {
                const searchTerm = query.toLowerCase().trim();
                filteredClients = clients.filter(client =>
                    (client.nom || '').toLowerCase().includes(searchTerm) ||
                    (client.ice || '').toLowerCase().includes(searchTerm)
                );
            }
            displaySituationAnnuelleClientsListChaimae();
        };

        function displaySituationAnnuelleClientsListChaimae() {
            const dropdown = document.getElementById('situationAnnuelleClientsDropdownChaimae');
            if (!dropdown) return;

            if (filteredClients.length === 0) {
                dropdown.innerHTML = '<div style="padding:1rem;text-align:center;color:#999;">Aucun client trouvé</div>';
                dropdown.style.display = 'block';
                return;
            }

            dropdown.innerHTML = filteredClients.slice(0, 10).map(client => `
                <div class="situation-annuelle-dropdown-item" onmousedown="selectSituationAnnuelleClientChaimae(${client.id}, '${client.nom.replace(/'/g, "\\'")}', '${client.ice}')">
                    <div style="color:#fff;font-weight:600;margin-bottom:0.25rem;">${client.nom}</div>
                    ${client.ice && client.ice !== '0' ? `<div style="color:#999;font-size:0.85rem;">ICE: ${client.ice}</div>` : ''}
                </div>
            `).join('');
            dropdown.style.display = 'block';
        }

        window.showSituationAnnuelleClientsListChaimae = function () {
            if (clients.length > 0) {
                filteredClients = clients;
                displaySituationAnnuelleClientsListChaimae();
            }
        };

        window.hideSituationAnnuelleClientsListChaimae = function () {
            setTimeout(() => {
                const dropdown = document.getElementById('situationAnnuelleClientsDropdownChaimae');
                if (dropdown) dropdown.style.display = 'none';
            }, 200);
        };

        window.selectSituationAnnuelleClientChaimae = function (id, nom, ice) {
            document.getElementById('situationAnnuelleClientInputChaimae').value = `${nom} (${ice})`;
            document.getElementById('situationAnnuelleClientIdChaimae').value = id;
            document.getElementById('situationAnnuelleClientsDropdownChaimae').style.display = 'none';
        };

        document.getElementById('situationAnnuelleCancelChaimae').onclick = () => overlay.remove();

        document.getElementById('situationAnnuelleGenerateChaimae').onclick = async () => {
            const clientId = document.getElementById('situationAnnuelleClientIdChaimae').value;
            const year = parseInt(document.getElementById('situationAnnuelleYearChaimae').value);

            const selectedMonths = Array.from(document.querySelectorAll('.month-checkbox-chaimae:checked')).map(cb => parseInt(cb.value));
            const includeFacture = document.getElementById('situationAnnuelleTypeFactureChaimae').checked;
            const includeDevis = document.getElementById('situationAnnuelleTypeDevisChaimae').checked;
            const includeBL = document.getElementById('situationAnnuelleTypeBLChaimae').checked;

            if (!clientId) {
                window.notify.error('Erreur', 'Veuillez sélectionner un client', 3000);
                return;
            }

            if (selectedMonths.length === 0) {
                window.notify.error('Erreur', 'Veuillez sélectionner au moins un mois', 3000);
                return;
            }

            if (!includeFacture && !includeDevis && !includeBL) {
                window.notify.error('Erreur', 'Veuillez sélectionner au moins un type de document', 3000);
                return;
            }

            overlay.remove();
            await generateSituationAnnuelleChaimae(clientId, year, selectedMonths, includeFacture, includeDevis, includeBL);
        };

        overlay.onclick = (e) => {
            e.stopPropagation();
        };

    } catch (error) {
        console.error('Error showing SITUATION modal:', error);
        window.notify.error('Erreur', 'Impossible d\'afficher la fenêtre', 3000);
    }
};

// Generate SITUATION PDF for Chaimae
window.generateSituationAnnuelleChaimae = async function (clientId, year, selectedMonths, includeFacture, includeDevis, includeBL) {
    try {
        window.notify.info('Info', 'Génération du rapport annuel en cours...', 2000);

        // Get client info
        const clientsResult = await window.electron.dbChaimae.getAllClients();
        const client = clientsResult.data.find(c => c.id == clientId);

        if (!client) {
            window.notify.error('Erreur', 'Client introuvable', 3000);
            return;
        }

        // Get all invoices for this client
        const invoicesResult = await window.electron.dbChaimae.getAllInvoices('CHAIMAE');
        if (!invoicesResult.success) {
            window.notify.error('Erreur', 'Impossible de charger les factures', 3000);
            return;
        }

        // Filter invoices for the selected year and client
        const yearInvoices = invoicesResult.data.filter(inv => {
            const invDate = (window.safeParseDate||function(d){return new Date(d)})(inv.document_date);
            return inv.client_id == clientId && invDate.getFullYear() === year;
        });

        if (yearInvoices.length === 0) {
            window.notify.warning('Attention', 'Aucun document trouvé pour cette année', 4000);
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
                const d = (window.safeParseDate||function(d){return new Date(d)})(inv.document_date);
                const invType = (inv.document_type || '').toLowerCase();

                const isMonthMatch = d.getMonth() + 1 === m;
                let isTypeMatch = false;

                if (invType === 'facture' && includeFacture) isTypeMatch = true;
                else if (invType === 'devis' && includeDevis) isTypeMatch = true;
                else if ((invType === 'bon de livraison' || invType === 'bl') && includeBL) isTypeMatch = true;

                return isMonthMatch && isTypeMatch;
            });

            if (monthInvoices.length > 0) {
                let facturesCount = 0;
                let devisCount = 0;
                let blCount = 0;
                let monthTotalHT = 0;
                let monthTotalTTC = 0;
                let monthTotalTVA = 0;

                monthInvoices.forEach(inv => {
                    const invHT = parseFloat(inv.total_ht || 0);
                    const invTTC = parseFloat(inv.total_ttc || 0);
                    // Smart fallback for TVA: use stored value, or calculate difference
                    const invTVA = parseFloat(inv.montant_tva || 0) || (invTTC - invHT);

                    monthTotalHT += invHT;
                    monthTotalTVA += invTVA;
                    monthTotalTTC += invTTC;

                    grandTotalTVA += invTVA;
                    grandTotalTTC += invTTC;

                    const type = inv.document_type ? inv.document_type.toLowerCase() : '';
                    if (type === 'facture') facturesCount++;
                    else if (type === 'devis') devisCount++;
                    else if (type === 'bon de livraison' || type === 'bl') blCount++;
                });

                grandTotalHT += monthTotalHT;

                monthsData.push({
                    monthName: monthNames[m],
                    facturesCount,
                    devisCount,
                    blCount,
                    totalHT: monthTotalHT,
                    totalTTC: monthTotalTTC
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

        // Chaimae specific colors
        const purpleColor = [33, 97, 140]; // MRY Blue
        const orangeColor = [255, 152, 0]; // #ff9800

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

        addHeaderToPDFAnnuelleChaimae(doc, client, dateRangeStr, purpleColor, orangeColor);

        // Dynamic Column Positioning
        const startX = 35; // Move left to give more space
        const endX = 135;
        const totalWidth = endX - startX;

        let activeColumns = [];
        if (includeFacture) activeColumns.push({ label: 'Nbr FACTURES', key: 'facturesCount' });
        if (includeDevis) activeColumns.push({ label: 'Nbr DEVIS', key: 'devisCount' });
        if (includeBL) activeColumns.push({ label: 'Nbr BL', key: 'blCount' });

        const columnWidth = totalWidth / activeColumns.length;

        activeColumns.forEach((col, index) => {
            col.x = startX + (columnWidth * index) + (columnWidth / 2);
        });

        // Table Header
        const startY = 90; // Moved down from 85 to accommodate long month lists
        doc.setFillColor(...purpleColor);
        doc.rect(14, startY, 182, 10, 'F');

        doc.setTextColor(255, 255, 255);
        doc.setFontSize(9);
        doc.setFont(undefined, 'bold');
        doc.text('MOIS', 20, startY + 6.5);

        activeColumns.forEach(col => {
            doc.text(col.label, col.x, startY + 6.5, { align: 'center' });
        });

        doc.text('TOTAL H.T', 150, startY + 6.5, { align: 'right' });
        doc.text('TOTAL T.T.C', 190, startY + 6.5, { align: 'right' });

        // Table Content
        doc.setFont(undefined, 'normal');
        let currentY = startY + 10;
        let pageNumber = 1;

        monthsData.forEach((row, index) => {
            // Check if we need a new page
            if (currentY > 250) {
                doc.addPage();
                pageNumber++;
                addHeaderToPDFAnnuelleChaimae(doc, client, dateRangeStr, purpleColor, orangeColor);

                // Re-draw table header
                doc.setFillColor(...purpleColor);
                doc.rect(14, 85, 182, 10, 'F');
                doc.setTextColor(255, 255, 255);
                doc.setFontSize(9);
                doc.setFont(undefined, 'bold');
                doc.text('MOIS', 20, 85 + 6.5);

                activeColumns.forEach(col => {
                    doc.text(col.label, col.x, 85 + 6.5, { align: 'center' });
                });

                doc.text('TOTAL H.T', 150, 85 + 6.5, { align: 'right' });
                doc.text('TOTAL T.T.C', 190, 85 + 6.5, { align: 'right' });

                currentY = 100;
            }

            // Alternating row background
            if (index % 2 === 1) {
                doc.setFillColor(245, 245, 245); // Grey
                doc.rect(14, currentY, 182, 8, 'F');
            }

            doc.setTextColor(0, 0, 0);
            doc.text(row.monthName.toUpperCase(), 20, currentY + 5.5);

            activeColumns.forEach(col => {
                doc.text(row[col.key].toString(), col.x, currentY + 5.5, { align: 'center' });
            });

            doc.text(formatAmountChaimae(row.totalHT), 150, currentY + 5.5, { align: 'right' });
            doc.text(formatAmountChaimae(row.totalTTC), 190, currentY + 5.5, { align: 'right' });

            currentY += 8;
        });

        // Final Totals Block (Summary)
        // Ensure space for totals block
        if (currentY > 230) {
            doc.addPage();
            pageNumber++;
            addHeaderToPDFAnnuelleChaimae(doc, client, dateRangeStr, purpleColor, orangeColor);
            currentY = 100;
        }

        // Totals Footer
        currentY += 10;

        doc.setFillColor(255, 255, 255);
        doc.rect(110, currentY, 85, 8, 'F');
        doc.setTextColor(...purpleColor);
        doc.setFont(undefined, 'bold');
        doc.text('TOTAL HT :', 113, currentY + 5.5);
        doc.text(`${formatAmountChaimae(grandTotalHT)} DH`, 192, currentY + 5.5, { align: 'right' });

        currentY += 8;
        doc.setFillColor(255, 255, 255);
        doc.rect(110, currentY, 85, 8, 'F');
        doc.text('TOTAL TVA :', 113, currentY + 5.5);
        doc.text(`${formatAmountChaimae(grandTotalTVA)} DH`, 192, currentY + 5.5, { align: 'right' });

        currentY += 8;
        doc.setFillColor(...purpleColor); // CHAIMAE Purple
        doc.rect(110, currentY, 85, 8, 'F');
        doc.setTextColor(255, 255, 255); // White text
        doc.text('TOTAL TTC :', 113, currentY + 5.5);
        doc.text(`${formatAmountChaimae(grandTotalTTC)} DH`, 192, currentY + 5.5, { align: 'right' });

        // Add Footer to ALL pages
        const totalPages = doc.internal.getNumberOfPages();
        for (let i = 1; i <= totalPages; i++) {
            doc.setPage(i);
            addFooterToPDFAnnuelleChaimae(doc, i, totalPages);
        }

        // Save
        const filename = `Situation_Annuelle_${client.nom.replace(/\s+/g, '_')}_${year}_CHAIMAE.pdf`;
        doc.save(filename);

        window.notify.success('Succès', 'Rapport annuel généré avec succès', 3000);

    } catch (error) {
        console.error('Error generating annual report for Chaimae:', error);
        window.notify.error('Erreur', 'Impossible de générer le rapport: ' + error.message, 4000);
    }
};

function formatAmountChaimae(amount) {
    if (isNaN(amount) || amount === null || amount === undefined) {
        return '0.00';
    }
    const num = parseFloat(amount);
    const parts = num.toFixed(2).split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return parts.join('.');
}

// Header Function (Updated with new details)
function addHeaderToPDFAnnuelleChaimae(doc, client, dateRangeStr, purpleColor, orangeColor) {
    // Logo
    try {
        const logoImg = document.querySelector('img[src*="chaimae.png"]') ||
            document.querySelector('img[data-asset="chaimae"]') ||
            document.querySelector('img[src^="data:image"]');
        if (logoImg && logoImg.src && logoImg.src.startsWith('data:')) {
            doc.addImage(logoImg.src, 'PNG', 15, 10, 35, 35);
        }
    } catch (error) {
        console.log('Logo not added:', error);
    }

    // Company Header
    doc.setFontSize(18);
    doc.setTextColor(...purpleColor);
    doc.setFont(undefined, 'bold');
    doc.text('CHAIMAE ERRBAHI MDIQ sarl (AU)', 105, 20, { align: 'center' });

    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.setTextColor(0, 0, 0);
    doc.text('Patente N° 52003366 - NIF : 40190505', 105, 27, { align: 'center' });
    doc.text('RC N° : 10487 - CNSS : 8721591', 105, 32, { align: 'center' });
    doc.text('ICE : 001544861000014', 105, 37, { align: 'center' });

    // Client Info
    doc.setFontSize(11);
    doc.setFont(undefined, 'bold');
    doc.text('CLIENT :', 15, 50);
    doc.setTextColor(...orangeColor);
    doc.text(client.nom.toUpperCase(), 40, 50);

    // Only show ICE if it exists and is not '0'
    if (client.ice && client.ice !== '0') {
        doc.setTextColor(0, 0, 0);
        doc.text('ICE :', 15, 57);
        doc.setTextColor(...orangeColor);
        doc.text(client.ice, 40, 57);
    }

    // Date
    doc.setTextColor(0, 0, 0);
    doc.text(`Date: ${new Date().toLocaleDateString('fr-FR')}`, 150, 50);

    // Title
    doc.setFontSize(15);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text('SITUATION', 105, 75, { align: 'center' });

    doc.setTextColor(...purpleColor);
    doc.setFontSize(13);
    const splitTitle = doc.splitTextToSize(dateRangeStr, 170);
    doc.text(splitTitle, 105, 82, { align: 'center' });
    return splitTitle.length;
}

// Footer Function (New)
function addFooterToPDFAnnuelleChaimae(doc, pageNumber, totalPages) {
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(7);
    doc.setFont(undefined, 'normal');
    doc.text('RIB : 007 720 00 05979000000368 12  ATTIJARI WAFA BANQ', 15, 275);
    doc.text('Email: errbahiabderrahim@gmail.com', 15, 279);
    doc.text('ADRESSE: LOT ALBAHR AV TETOUAN N94 GARAGE 2 M\'DIQ', 15, 283);
    doc.text('Tel: +212 661 307 323', 15, 287);

    // Page numbering
    if (pageNumber && totalPages) {
        doc.setFontSize(8);
        doc.setTextColor(128, 128, 128);
        doc.text(`Page ${pageNumber} / ${totalPages}`, 105, 293, { align: 'center' });
    }
}
// ==========================================
// PART 2: Global Clients Annual Report (New Logic)
// ==========================================

// Show SITUATION Modal for Multiple Clients
window.showSituationAnnuelleClientsModalChaimae = async function () {
    try {
        // Get all clients from Chaimae database
        const clientsResult = await window.electron.dbChaimae.getAllClients();
        const clients = clientsResult.success ? clientsResult.data : [];

        const currentYear = new Date().getFullYear();
        const years = [currentYear, currentYear - 1, currentYear - 2, currentYear - 3, currentYear - 4];

        const overlay = document.createElement('div');
        overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.9);z-index:999999;display:flex;align-items:center;justify-content:center;animation:fadeIn 0.2s;padding:2rem;';

        const modal = document.createElement('div');
        modal.style.cssText = 'background:linear-gradient(145deg, #2a2a2e 0%, #1a1a1e 100%);border:2px solid #FF9800;border-radius:20px;padding:2rem;width:650px;max-height:85vh;overflow-y:auto;box-shadow:0 25px 80px rgba(0,0,0,0.95);';

        modal.innerHTML = `
            <style>
                @keyframes fadeIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
                .client-checkbox-item:hover { background: rgba(255, 152, 0, 0.1); }
            </style>
            <div style="display:flex;align-items:center;gap:1rem;margin-bottom:2rem;padding-bottom:1.5rem;border-bottom:2px solid #3a3a3e;">
                <div style="background:linear-gradient(135deg, #FF9800 0%, #F57C00 100%);padding:1rem;border-radius:12px;box-shadow:0 4px 15px rgba(255, 152, 0, 0.3);">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                </div>
                <div style="flex:1;">
                    <h2 style="color:#fff;margin:0;font-size:1.6rem;font-weight:700;letter-spacing:-0.5px;">SITUATION GLOBALE (Chaimae)</h2>
                    <p style="color:#999;margin:0.25rem 0 0 0;font-size:0.9rem;">Rapport annuel pour plusieurs clients</p>
                </div>
            </div>
            
            <div style="margin-bottom:1.25rem;position:relative;">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;">
                    <label style="color:#FF9800;font-weight:600;font-size:0.9rem;text-transform:uppercase;letter-spacing:0.5px;">Clients</label>
                    <div>
                        <button type="button" onclick="toggleAllClientsChaimae(true)" style="background:none;border:none;color:#FF9800;cursor:pointer;font-size:0.85rem;margin-right:0.5rem;text-decoration:underline;">Tout sélectionner</button>
                        <button type="button" onclick="toggleAllClientsChaimae(false)" style="background:none;border:none;color:#999;cursor:pointer;font-size:0.85rem;text-decoration:underline;">Tout désélectionner</button>
                    </div>
                </div>
                <input type="text" id="situationClientsSearchChaimae" placeholder="Rechercher un client..." 
                       style="width:100%;padding:0.875rem 1rem;background:#2d2d30;border:1px solid #3e3e42;border-radius:10px 10px 0 0;color:#fff;font-size:0.95rem;outline:none;"
                       oninput="filterSituationClientsListChaimae(this.value)">
                
                <div id="clientsSelectionListChaimae" style="max-height:200px;overflow-y:auto;background:#2d2d30;border:1px solid #3e3e42;border-top:none;border-radius:0 0 10px 10px;">
                    ${clients.map(client => `
                        <label class="client-checkbox-item" style="display:flex;align-items:center;padding:0.75rem 1rem;cursor:pointer;border-bottom:1px solid #3e3e42;transition:all 0.2s;">
                            <input type="checkbox" class="client-checkbox-chaimae" value="${client.id}" data-name="${client.nom}" style="margin-right:1rem;accent-color:#FF9800;width:18px;height:18px;">
                            <span style="color:#fff;font-size:0.95rem;">${client.nom}</span>
                            ${client.ice ? `<span style="color:#999;font-size:0.8rem;margin-left:auto;">${client.ice}</span>` : ''}
                        </label>
                    `).join('')}
                </div>
                <div style="margin-top:0.5rem;font-size:0.85rem;color:#999;text-align:right;">
                    <span id="selectedClientsCountChaimae">0</span> clients sélectionnés
                </div>
            </div>
            
            <div style="display:flex;gap:1.5rem;margin-bottom:1.25rem;">
                <div style="flex:1;">
                    <label style="display:block;color:#FF9800;margin-bottom:0.5rem;font-weight:600;font-size:0.9rem;text-transform:uppercase;letter-spacing:0.5px;">Année</label>
                    <select id="situationAnnuelleMultiYearChaimae" style="width:100%;padding:0.75rem 1rem;background:#2d2d30;border:1px solid #3e3e42;border-radius:10px;color:#fff;font-size:0.95rem;outline:none;cursor:pointer;transition:all 0.2s;" onfocus="this.style.borderColor='#FF9800';this.style.boxShadow='0 0 0 3px rgba(255, 152, 0, 0.1)'" onblur="this.style.borderColor='#3e3e42';this.style.boxShadow='none'">
                        ${years.map(y => `<option value="${y}" ${y === currentYear ? 'selected' : ''}>${y}</option>`).join('')}
                    </select>
                </div>
                
                <div style="flex:2;">
                    <label style="display:block;color:#FF9800;margin-bottom:0.5rem;font-weight:600;font-size:0.9rem;text-transform:uppercase;letter-spacing:0.5px;">Types de documents</label>
                    <div style="display:flex;gap:1rem;padding:0.55rem 0;flex-wrap:wrap;">
                        <label style="display:flex;align-items:center;color:#fff;cursor:pointer;font-size:0.95rem;">
                            <input type="checkbox" id="situationAnnuelleMultiTypeFactureChaimae" checked style="margin-right:0.5rem;accent-color:#FF9800;width:18px;height:18px;">
                            Facture
                        </label>
                        <label style="display:flex;align-items:center;color:#fff;cursor:pointer;font-size:0.95rem;">
                            <input type="checkbox" id="situationAnnuelleMultiTypeDevisChaimae" checked style="margin-right:0.5rem;accent-color:#FF9800;width:18px;height:18px;">
                            Devis
                        </label>
                        <label style="display:flex;align-items:center;color:#fff;cursor:pointer;font-size:0.95rem;">
                            <input type="checkbox" id="situationAnnuelleMultiTypeBLChaimae" checked style="margin-right:0.5rem;accent-color:#FF9800;width:18px;height:18px;">
                            Bon de Livraison
                        </label>
                    </div>
                </div>
            </div>

            <div style="margin-bottom:1.5rem;">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem;">
                    <label style="color:#FF9800;font-weight:600;font-size:0.9rem;text-transform:uppercase;letter-spacing:0.5px;">Mois à inclure</label>
                    <div>
                        <button type="button" onclick="toggleAllMonthsChaimaeGlobal(true)" style="background:none;border:none;color:#FF9800;cursor:pointer;font-size:0.85rem;margin-right:0.5rem;text-decoration:underline;">Tout sélectionner</button>
                        <button type="button" onclick="toggleAllMonthsChaimaeGlobal(false)" style="background:none;border:none;color:#999;cursor:pointer;font-size:0.85rem;text-decoration:underline;">Tout désélectionner</button>
                    </div>
                </div>
                <div style="display:grid;grid-template-columns:repeat(4, 1fr);gap:0.75rem;">
                    ${['Janv', 'Févr', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil', 'Août', 'Sept', 'Oct', 'Nov', 'Déc'].map((m, i) => `
                        <label style="display:flex;align-items:center;background:#2d2d30;padding:0.6rem;border-radius:8px;border:1px solid #3e3e42;cursor:pointer;transition:all 0.2s;" onmouseover="this.style.borderColor='#FF9800'" onmouseout="this.style.borderColor='#3e3e42'">
                            <input type="checkbox" class="month-checkbox-chaimae-global" value="${i + 1}" checked style="margin-right:0.5rem;accent-color:#FF9800;">
                            <span style="color:#fff;font-size:0.85rem;">${m}</span>
                        </label>
                    `).join('')}
                </div>
            </div>

            <div style="display:flex;gap:0.75rem;margin-top:2.5rem;">
                <button id="situationAnnuelleMultiCancelChaimae" style="flex:1;padding:0.875rem 1.5rem;background:#3e3e42;color:#fff;border:none;border-radius:10px;cursor:pointer;font-size:0.95rem;font-weight:600;transition:all 0.2s;" onmouseover="this.style.background='#4e4e52'" onmouseout="this.style.background='#3e3e42'">
                    Annuler
                </button>
                <button id="situationAnnuelleMultiGenerateChaimae" style="flex:2;padding:0.875rem 1.5rem;background:linear-gradient(135deg, #FF9800 0%, #F57C00 100%);color:#fff;border:none;border-radius:10px;cursor:pointer;font-size:0.95rem;font-weight:600;transition:all 0.2s;box-shadow:0 4px 12px rgba(255, 152, 0, 0.3);display:flex;align-items:center;justify-content:center;gap:0.5rem;" onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 6px 20px rgba(255, 152, 0, 0.4)'" onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='0 4px 12px rgba(255, 152, 0, 0.3)'">
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

        // Scripts for interaction
        window.toggleAllClientsChaimae = function (selectAll) {
            document.querySelectorAll('.client-checkbox-chaimae').forEach(cb => {
                if (cb.closest('label').style.display !== 'none') {
                    cb.checked = selectAll;
                }
            });
            updateSelectedCountChaimae();
        };

        window.toggleAllMonthsChaimaeGlobal = function (selectAll) {
            document.querySelectorAll('.month-checkbox-chaimae-global').forEach(cb => cb.checked = selectAll);
        };

        window.filterSituationClientsListChaimae = function (query) {
            const term = query.toLowerCase();
            document.querySelectorAll('.client-checkbox-item').forEach(item => {
                const name = item.querySelector('span').textContent.toLowerCase();
                if (name.includes(term)) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        };

        window.updateSelectedCountChaimae = function () {
            const count = document.querySelectorAll('.client-checkbox-chaimae:checked').length;
            document.getElementById('selectedClientsCountChaimae').innerText = count;
        };

        // Attach listeners to checkboxes to update count
        document.querySelectorAll('.client-checkbox-chaimae').forEach(cb => {
            cb.addEventListener('change', updateSelectedCountChaimae);
        });

        document.getElementById('situationAnnuelleMultiCancelChaimae').onclick = () => overlay.remove();

        document.getElementById('situationAnnuelleMultiGenerateChaimae').onclick = async () => {
            const selectedClientIds = Array.from(document.querySelectorAll('.client-checkbox-chaimae:checked')).map(cb => cb.value);
            const selectedMonths = Array.from(document.querySelectorAll('.month-checkbox-chaimae-global:checked')).map(cb => parseInt(cb.value));
            const year = parseInt(document.getElementById('situationAnnuelleMultiYearChaimae').value);
            const includeFacture = document.getElementById('situationAnnuelleMultiTypeFactureChaimae').checked;
            const includeDevis = document.getElementById('situationAnnuelleMultiTypeDevisChaimae').checked;
            const includeBL = document.getElementById('situationAnnuelleMultiTypeBLChaimae').checked;

            if (selectedClientIds.length === 0) {
                window.notify.error('Erreur', 'Veuillez sélectionner au moins un client', 3000);
                return;
            }

            if (!includeFacture && !includeDevis && !includeBL) {
                window.notify.error('Erreur', 'Veuillez sélectionner au moins un type de document', 3000);
                return;
            }

            if (selectedMonths.length === 0) {
                window.notify.error('Erreur', 'Veuillez sélectionner au moins un mois', 3000);
                return;
            }

            overlay.remove();
            await generateSituationAnnuelleClientsChaimae(selectedClientIds, year, selectedMonths, includeFacture, includeDevis, includeBL);
        };

        // Prevent closing on overlay click
        overlay.onclick = (e) => {
            e.stopPropagation();
        };

    } catch (error) {
        console.error('Error showing SITUATION Global modal:', error);
        window.notify.error('Erreur', 'Impossible d\'afficher la fenêtre', 3000);
    }
};

// Generate SITUATION PDF for Multiple Clients (Chaimae) - Client-based aggregation
window.generateSituationAnnuelleClientsChaimae = async function (clientIds, year, selectedMonths, includeFacture, includeDevis, includeBL) {
    try {
        window.notify.info('Info', 'Génération du rapport global en cours...', 2000);

        // Get invoices
        const invoicesResult = await window.electron.dbChaimae.getAllInvoices('CHAIMAE');
        if (!invoicesResult.success) {
            window.notify.error('Erreur', 'Impossible de charger les factures', 3000);
            return;
        }

        // Get All Clients to have their names
        const clientsResult = await window.electron.dbChaimae.getAllClients();
        const allClients = clientsResult.success ? clientsResult.data : [];

        // Filter invoices for the selected year and SELECTED CLIENTS and MONTHS
        const yearInvoices = invoicesResult.data.filter(inv => {
            const invDate = (window.safeParseDate||function(d){return new Date(d)})(inv.document_date);
            const month = invDate.getMonth() + 1;
            return clientIds.includes(String(inv.client_id)) &&
                invDate.getFullYear() === year &&
                selectedMonths.includes(month);
        });

        if (yearInvoices.length === 0) {
            window.notify.warning('Attention', 'Aucun document trouvé pour cette année et ces clients', 4000);
            return;
        }

        // Aggregate data by CLIENT
        const clientsData = [];
        let grandTotalHT = 0;
        let grandTotalTVA = 0;
        let grandTotalTTC = 0;

        for (const clientId of clientIds) {
            const client = allClients.find(c => String(c.id) === String(clientId));
            const clientName = client ? client.nom : `Client #${clientId}`;

            const clientInvoices = yearInvoices.filter(inv => {
                const invType = (inv.document_type || '').toLowerCase();
                let isTypeMatch = false;

                if (invType === 'facture' && includeFacture) isTypeMatch = true;
                else if (invType === 'devis' && includeDevis) isTypeMatch = true;
                else if ((invType === 'bon de livraison' || invType === 'bl') && includeBL) isTypeMatch = true;

                return String(inv.client_id) === String(clientId) && isTypeMatch;
            });

            if (clientInvoices.length > 0) {
                let facturesCount = 0;
                let devisCount = 0;
                let blCount = 0;
                let clientTotalHT = 0;
                let clientTotalTVA = 0;
                let clientTotalTTC = 0;

                clientInvoices.forEach(inv => {
                    const invHT = parseFloat(inv.total_ht || 0);
                    const invTTC = parseFloat(inv.total_ttc || 0);
                    // Use stored TVA if available, otherwise fallback to difference
                    const invTVA = parseFloat(inv.montant_tva || 0) || (invTTC - invHT);

                    clientTotalHT += invHT;
                    clientTotalTVA += invTVA;
                    clientTotalTTC += invTTC;

                    const type = inv.document_type ? inv.document_type.toLowerCase() : '';
                    if (type === 'facture') facturesCount++;
                    else if (type === 'devis') devisCount++;
                    else if (type === 'bon de livraison' || type === 'bl') blCount++;
                });

                grandTotalHT += clientTotalHT;
                grandTotalTVA += clientTotalTVA;
                grandTotalTTC += clientTotalTTC;

                clientsData.push({
                    clientName: clientName.toUpperCase(),
                    facturesCount,
                    devisCount,
                    blCount,
                    totalHT: clientTotalHT,
                    totalTTC: clientTotalTTC
                });
            }
        }

        if (clientsData.length === 0) {
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

        const blueColor = [33, 97, 140]; // MRY Blue
        const greenColor = [16, 172, 132]; // MRY Green

        // Generate Title String
        const monthNamesUpper = ['', 'JANVIER', 'FÉVRIER', 'MARS', 'AVRIL', 'MAI', 'JUIN', 'JUILLET', 'AOÛT', 'SEPTEMBRE', 'OCTOBRE', 'NOVEMBRE', 'DÉCEMBRE'];
        let dateRangeStr = `ANNÉE ${year}`;

        if (selectedMonths.length > 0 && selectedMonths.length < 12) {
            const sorted = [...selectedMonths].sort((a, b) => a - b);
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
        }

        // Helper to add header (multi-client)
        const addGlobalHeaderChaimae = async (doc, clientNames, dateRangeStr) => {
            // Logo
            try {
                const logoImg = document.querySelector('img[src*="chaimae.png"]') ||
                    document.querySelector('img[data-asset="chaimae"]') ||
                    document.querySelector('img[src^="data:image"]');
                if (logoImg && logoImg.src && logoImg.src.startsWith('data:')) {
                    doc.addImage(logoImg.src, 'PNG', 15, 10, 35, 35);
                }
            } catch (error) {
                console.log('Logo not added:', error);
            }

            // Company Header
            doc.setFontSize(18);
            doc.setTextColor(...blueColor);
            doc.setFont(undefined, 'bold');
            doc.text('CHAIMAE ERRBAHI MDIQ sarl (AU)', 105, 20, { align: 'center' });

            doc.setFontSize(10);
            doc.setFont(undefined, 'normal');
            doc.setTextColor(0, 0, 0);
            doc.text('Patente N° 52003366 - NIF : 40190505', 105, 27, { align: 'center' });
            doc.text('RC N° : 10487 - CNSS : 8721591', 105, 32, { align: 'center' });
            doc.text('ICE : 001544861000014', 105, 37, { align: 'center' });

            // Client Info
            doc.setFontSize(11);
            doc.setFont(undefined, 'bold');
            doc.text('CLIENT :', 15, 55);
            doc.setTextColor(...greenColor);
            doc.text(clientNames, 40, 55);

            // Date
            doc.setTextColor(0, 0, 0);
            doc.text(`Date: ${new Date().toLocaleDateString('fr-FR')}`, 150, 55);

            // Title
            doc.setFontSize(15);
            doc.setFont(undefined, 'bold');
            doc.setTextColor(0, 0, 0);
            doc.text('SITUATION GLOBALE', 105, 75, { align: 'center' });

            doc.setTextColor(...blueColor);
            doc.setFontSize(13);
            const splitTitle = doc.splitTextToSize(dateRangeStr, 170);
            doc.text(splitTitle, 105, 82, { align: 'center' });
            return splitTitle.length;
        };

        const clientLabel = (clientIds.length === 1) ? 'NOM DU CLIENT' : `MULTI-CLIENTS (${clientIds.length})`;
        // We need to fetch the client name if only 1 client
        let finalClientLabel = clientLabel;
        if (clientIds.length === 1) {
            const clientsResult = await window.electron.dbChaimae.getAllClients();
            const clnt = clientsResult.data.find(c => c.id == clientIds[0]);
            if (clnt) finalClientLabel = clnt.nom.toUpperCase();
        }

        const titleLinesCount = await addGlobalHeaderChaimae(doc, finalClientLabel, dateRangeStr);

        // Dynamic Column Positioning
        const startX = 65; // Increased to avoid overlap
        const endX = 135;
        const totalWidth = endX - startX;

        let activeColumns = [];
        if (includeFacture) activeColumns.push({ label: 'Nbr FACTURES', key: 'facturesCount' });
        if (includeDevis) activeColumns.push({ label: 'Nbr DEVIS', key: 'devisCount' });
        if (includeBL) activeColumns.push({ label: 'Nbr BL', key: 'blCount' });

        const columnWidth = totalWidth / activeColumns.length;

        activeColumns.forEach((col, index) => {
            col.x = startX + (columnWidth * index) + (columnWidth / 2);
        });

        // Table Header
        const startY = 90 + (titleLinesCount > 1 ? (titleLinesCount - 1) * 7 : 0);
        doc.setFillColor(...blueColor);
        doc.rect(14, startY, 182, 10, 'F');

        doc.setTextColor(255, 255, 255);
        doc.setFontSize(9);
        doc.setFont(undefined, 'bold');
        doc.text('CLIENT', 20, startY + 6.5);

        activeColumns.forEach(col => {
            doc.text(col.label, col.x, startY + 6.5, { align: 'center' });
        });

        doc.text('TOTAL H.T', 160, startY + 6.5, { align: 'right' });
        doc.text('TOTAL T.T.C', 190, startY + 6.5, { align: 'right' });

        // Table Content
        doc.setFont(undefined, 'normal');
        let currentY = startY + 10;

        for (const [index, row] of clientsData.entries()) {
            if (currentY > 250) {
                doc.addPage();
                const lines = await addGlobalHeaderChaimae(doc, finalClientLabel, dateRangeStr);
                const tableStartY = 90 + (lines > 1 ? (lines - 1) * 7 : 0);

                // Re-draw table header
                doc.setFillColor(...blueColor);
                doc.rect(14, tableStartY, 182, 10, 'F');
                doc.setTextColor(255, 255, 255);
                doc.setFontSize(9);
                doc.setFont(undefined, 'bold');
                doc.text('CLIENT', 20, tableStartY + 6.5);
                activeColumns.forEach(col => {
                    doc.text(col.label, col.x, tableStartY + 6.5, { align: 'center' });
                });
                doc.text('TOTAL H.T', 160, tableStartY + 6.5, { align: 'right' });
                doc.text('TOTAL T.T.C', 190, tableStartY + 6.5, { align: 'right' });
                currentY = tableStartY + 10;
            }

            if (index % 2 === 1) {
                doc.setFillColor(245, 245, 245);
                doc.rect(14, currentY, 182, 8, 'F');
            }

            doc.setTextColor(0, 0, 0);
            doc.text(row.clientName, 20, currentY + 5.5);

            activeColumns.forEach(col => {
                doc.text(row[col.key].toString(), col.x, currentY + 5.5, { align: 'center' });
            });

            doc.text(formatAmountChaimae(row.totalHT), 160, currentY + 5.5, { align: 'right' });
            doc.text(formatAmountChaimae(row.totalTTC), 190, currentY + 5.5, { align: 'right' });

            currentY += 8;
        }

        currentY += 10;
        doc.setFillColor(255, 255, 255);
        doc.rect(110, currentY, 85, 8, 'F');
        doc.setTextColor(...blueColor);
        doc.setFont(undefined, 'bold');
        doc.text('TOTAL HT :', 113, currentY + 5.5);
        doc.text(`${formatAmountChaimae(grandTotalHT)} DH`, 192, currentY + 5.5, { align: 'right' });

        currentY += 8;
        doc.setFillColor(255, 255, 255);
        doc.rect(110, currentY, 85, 8, 'F');
        doc.text('TOTAL TVA :', 113, currentY + 5.5);
        doc.text(`${formatAmountChaimae(grandTotalTVA)} DH`, 192, currentY + 5.5, { align: 'right' });

        currentY += 8;
        doc.setFillColor(...blueColor);
        doc.rect(110, currentY, 85, 8, 'F');
        doc.setTextColor(255, 255, 255);
        doc.text('TOTAL TTC :', 113, currentY + 5.5);
        doc.text(`${formatAmountChaimae(grandTotalTTC)} DH`, 192, currentY + 5.5, { align: 'right' });

        // Add Footer to ALL pages
        const totalPagesInGlobal = doc.internal.getNumberOfPages();
        for (let i = 1; i <= totalPagesInGlobal; i++) {
            doc.setPage(i);
            addFooterToPDFAnnuelleChaimae(doc, i, totalPagesInGlobal);
        }

        // Save
        const filename = `Situation_Globale_${year}_CHAIMAE.pdf`;
        doc.save(filename);

        window.notify.success('Succès', 'Rapport global généré avec succès', 3000);

    } catch (error) {
        console.error('Error generating global report for Chaimae:', error);
        window.notify.error('Erreur', 'Impossible de générer le rapport: ' + error.message, 4000);
    }
};
