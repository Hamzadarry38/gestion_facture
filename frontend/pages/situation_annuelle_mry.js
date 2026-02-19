// SITUATION - Annual Report Generator for MRY
// This file handles the generation of annual situation reports for clients

// ==========================================
// PART 1: Single Client Annual Report
// ==========================================

// Show SITUATION Modal
window.showSituationAnnuelleModalMRY = async function () {
    try {
        // Get all clients from MRY database
        const clientsResult = await window.electron.db.getAllClients();
        const clients = clientsResult.success ? clientsResult.data : [];

        const currentYear = new Date().getFullYear();
        const years = [currentYear, currentYear - 1, currentYear - 2, currentYear - 3, currentYear - 4];

        const overlay = document.createElement('div');
        overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.9);z-index:999999;display:flex;align-items:center;justify-content:center;animation:fadeIn 0.2s;padding:2rem;';

        const modal = document.createElement('div');
        modal.style.cssText = 'background:linear-gradient(145deg, #2a2a2e 0%, #1a1a1e 100%);border:2px solid #9c27b0;border-radius:20px;padding:2rem;width:600px;max-height:85vh;overflow-y:auto;box-shadow:0 25px 80px rgba(0,0,0,0.95);';

        modal.innerHTML = `
            <style>
                @keyframes fadeIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
            </style>
            <div style="display:flex;align-items:center;gap:1rem;margin-bottom:2rem;padding-bottom:1.5rem;border-bottom:2px solid #3a3a3e;">
                <div style="background:linear-gradient(135deg, #ab47bc 0%, #8e24aa 100%);padding:1rem;border-radius:12px;box-shadow:0 4px 15px rgba(171,71,188,0.3);">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                </div>
                <div style="flex:1;">
                    <h2 style="color:#fff;margin:0;font-size:1.6rem;font-weight:700;letter-spacing:-0.5px;">SITUATION</h2>
                    <p style="color:#999;margin:0.25rem 0 0 0;font-size:0.9rem;">Générer un rapport annuel détaillé par mois</p>
                </div>
            </div>
            
            <div style="margin-bottom:1.25rem;position:relative;">
                <label style="display:block;color:#ab47bc;margin-bottom:0.5rem;font-weight:600;font-size:0.9rem;text-transform:uppercase;letter-spacing:0.5px;">Client</label>
                <input type="text" id="situationAnnuelleClientInputMRY" placeholder="Rechercher un client..." 
                       autocomplete="off"
                       style="width:100%;padding:0.875rem 1rem;background:#2d2d30;border:1px solid #3e3e42;border-radius:10px;color:#fff;font-size:0.95rem;outline:none;transition:all 0.2s;"
                       oninput="searchSituationAnnuelleClientsMRY(this.value)"
                       onfocus="this.style.borderColor='#ab47bc';this.style.boxShadow='0 0 0 3px rgba(171,71,188,0.1)';showSituationAnnuelleClientsListMRY()"
                       onblur="this.style.borderColor='#3e3e42';this.style.boxShadow='none';hideSituationAnnuelleClientsListMRY()">
                <input type="hidden" id="situationAnnuelleClientIdMRY" value="">
                <div id="situationAnnuelleClientsDropdownMRY" style="display:none;position:absolute;top:100%;left:0;right:0;background:#2d2d30;border:1px solid #3e3e42;border-top:none;border-radius:0 0 10px 10px;max-height:250px;overflow-y:auto;z-index:1000;margin-top:-10px;box-shadow:0 8px 20px rgba(0,0,0,0.4);"></div>
            </div>
            <style>
                .situation-annuelle-dropdown-item {
                    padding: 0.75rem 1rem;
                    cursor: pointer;
                    border-bottom: 1px solid #3e3e42;
                    transition: all 0.2s;
                }
                .situation-annuelle-dropdown-item:hover {
                    background: #ab47bc;
                }
                .situation-annuelle-dropdown-item:last-child {
                    border-bottom: none;
                }
            </style>
            
            <div style="display:flex;gap:1.5rem;margin-bottom:1.5rem;">
                <div style="flex:1;">
                    <label style="display:block;color:#ab47bc;margin-bottom:0.5rem;font-weight:600;font-size:0.9rem;text-transform:uppercase;letter-spacing:0.5px;">Année</label>
                    <select id="situationAnnuelleYearMRY" style="width:100%;padding:0.75rem 1rem;background:#2d2d30;border:1px solid #3e3e42;border-radius:10px;color:#fff;font-size:0.95rem;outline:none;cursor:pointer;transition:all 0.2s;" onfocus="this.style.borderColor='#ab47bc';this.style.boxShadow='0 0 0 3px rgba(171,71,188,0.1)'" onblur="this.style.borderColor='#3e3e42';this.style.boxShadow='none'">
                        ${years.map(y => `<option value="${y}" ${y === currentYear ? 'selected' : ''}>${y}</option>`).join('')}
                    </select>
                </div>
                
                <div style="flex:1;">
                    <label style="display:block;color:#ab47bc;margin-bottom:0.5rem;font-weight:600;font-size:0.9rem;text-transform:uppercase;letter-spacing:0.5px;">Types de documents</label>
                    <div style="display:flex;gap:1rem;padding:0.55rem 0;">
                        <label style="display:flex;align-items:center;color:#fff;cursor:pointer;font-size:0.95rem;">
                            <input type="checkbox" id="situationAnnuelleTypeFactureMRY" checked style="margin-right:0.5rem;accent-color:#ab47bc;width:18px;height:18px;">
                            Facture
                        </label>
                        <label style="display:flex;align-items:center;color:#fff;cursor:pointer;font-size:0.95rem;">
                            <input type="checkbox" id="situationAnnuelleTypeDevisMRY" checked style="margin-right:0.5rem;accent-color:#ab47bc;width:18px;height:18px;">
                            Devis
                        </label>
                    </div>
                </div>
            </div>

            <div style="margin-bottom:1.5rem;">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem;">
                    <label style="color:#ab47bc;font-weight:600;font-size:0.9rem;text-transform:uppercase;letter-spacing:0.5px;">Mois à inclure</label>
                    <div>
                        <button type="button" onclick="toggleAllMonthsMRY(true)" style="background:none;border:none;color:#ab47bc;cursor:pointer;font-size:0.85rem;margin-right:0.5rem;text-decoration:underline;">Tout sélectionner</button>
                        <button type="button" onclick="toggleAllMonthsMRY(false)" style="background:none;border:none;color:#999;cursor:pointer;font-size:0.85rem;text-decoration:underline;">Tout désélectionner</button>
                    </div>
                </div>
                <div style="display:grid;grid-template-columns:repeat(4, 1fr);gap:0.75rem;">
                    ${['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'].map((m, i) => `
                        <label style="display:flex;align-items:center;background:#2d2d30;padding:0.6rem;border-radius:8px;border:1px solid #3e3e42;cursor:pointer;transition:all 0.2s;" onmouseover="this.style.borderColor='#ab47bc'" onmouseout="this.style.borderColor='#3e3e42'">
                            <input type="checkbox" class="month-checkbox-mry" value="${i + 1}" checked style="margin-right:0.5rem;accent-color:#ab47bc;">
                            <span style="color:#fff;font-size:0.9rem;">${m}</span>
                        </label>
                    `).join('')}
                </div>
            </div>
            
            <div style="display:flex;gap:0.75rem;margin-top:2rem;">
                <button id="situationAnnuelleCancelMRY" style="flex:1;padding:0.875rem 1.5rem;background:#3e3e42;color:#fff;border:none;border-radius:10px;cursor:pointer;font-size:0.95rem;font-weight:600;transition:all 0.2s;" onmouseover="this.style.background='#4e4e52'" onmouseout="this.style.background='#3e3e42'">
                    Annuler
                </button>
                <button id="situationAnnuelleGenerateMRY" style="flex:2;padding:0.875rem 1.5rem;background:linear-gradient(135deg, #ab47bc 0%, #8e24aa 100%);color:#fff;border:none;border-radius:10px;cursor:pointer;font-size:0.95rem;font-weight:600;transition:all 0.2s;box-shadow:0 4px 12px rgba(171,71,188,0.3);display:flex;align-items:center;justify-content:center;gap:0.5rem;" onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 6px 20px rgba(171,71,188,0.4)'" onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='0 4px 12px rgba(171,71,188,0.3)'">
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

        window.toggleAllMonthsMRY = function (selectAll) {
            document.querySelectorAll('.month-checkbox-mry').forEach(cb => cb.checked = selectAll);
        };

        window.searchSituationAnnuelleClientsMRY = function (query) {
            if (!query || query.trim().length === 0) {
                filteredClients = clients;
            } else {
                const searchTerm = query.toLowerCase().trim();
                filteredClients = clients.filter(client =>
                    (client.nom || '').toLowerCase().includes(searchTerm) ||
                    (client.ice || '').toLowerCase().includes(searchTerm)
                );
            }
            displaySituationAnnuelleClientsListMRY();
        };

        function displaySituationAnnuelleClientsListMRY() {
            const dropdown = document.getElementById('situationAnnuelleClientsDropdownMRY');
            if (!dropdown) return;

            if (filteredClients.length === 0) {
                dropdown.innerHTML = '<div style="padding:1rem;text-align:center;color:#999;">Aucun client trouvé</div>';
                dropdown.style.display = 'block';
                return;
            }

            dropdown.innerHTML = filteredClients.slice(0, 10).map(client => `
                <div class="situation-annuelle-dropdown-item" onmousedown="selectSituationAnnuelleClientMRY(${client.id}, '${client.nom.replace(/'/g, "\\'")}', '${client.ice}')">
                    <div style="color:#fff;font-weight:600;margin-bottom:0.25rem;">${client.nom}</div>
                    ${client.ice && client.ice !== '0' ? `<div style="color:#999;font-size:0.85rem;">ICE: ${client.ice}</div>` : ''}
                </div>
            `).join('');
            dropdown.style.display = 'block';
        }

        window.showSituationAnnuelleClientsListMRY = function () {
            if (clients.length > 0) {
                filteredClients = clients;
                displaySituationAnnuelleClientsListMRY();
            }
        };

        window.hideSituationAnnuelleClientsListMRY = function () {
            setTimeout(() => {
                const dropdown = document.getElementById('situationAnnuelleClientsDropdownMRY');
                if (dropdown) dropdown.style.display = 'none';
            }, 200);
        };

        window.selectSituationAnnuelleClientMRY = function (id, nom, ice) {
            document.getElementById('situationAnnuelleClientInputMRY').value = `${nom} (${ice})`;
            document.getElementById('situationAnnuelleClientIdMRY').value = id;
            document.getElementById('situationAnnuelleClientsDropdownMRY').style.display = 'none';
        };

        document.getElementById('situationAnnuelleCancelMRY').onclick = () => overlay.remove();

        document.getElementById('situationAnnuelleGenerateMRY').onclick = async () => {
            const clientId = document.getElementById('situationAnnuelleClientIdMRY').value;
            const year = parseInt(document.getElementById('situationAnnuelleYearMRY').value);

            const selectedMonths = Array.from(document.querySelectorAll('.month-checkbox-mry:checked')).map(cb => parseInt(cb.value));
            const includeFacture = document.getElementById('situationAnnuelleTypeFactureMRY').checked;
            const includeDevis = document.getElementById('situationAnnuelleTypeDevisMRY').checked;

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
            await generateSituationAnnuelleMRY(clientId, year, selectedMonths, includeFacture, includeDevis);
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

// Generate SITUATION PDF
window.generateSituationAnnuelleMRY = async function (clientId, year, selectedMonths, includeFacture, includeDevis) {
    try {
        console.log('🟦 [MRY ANNUAL] Starting...', { clientId, year, selectedMonths, includeFacture, includeDevis });
        window.notify.info('Info', 'Génération du rapport annuel en cours...', 2000);

        // Get client info
        console.log('🟦 [MRY ANNUAL] Fetching clients...');
        const clientsResult = await window.electron.db.getAllClients();
        console.log('🟦 [MRY ANNUAL] Clients result:', clientsResult);
        const client = clientsResult.data.find(c => c.id == clientId);

        if (!client) {
            window.notify.error('Erreur', 'Client introuvable', 3000);
            return;
        }

        // Get all invoices for this client
        const invoicesResult = await window.electron.db.getAllInvoices('MRY');
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

        // Iterate only through selected months
        for (const m of selectedMonths.sort((a, b) => a - b)) {
            const monthInvoices = yearInvoices.filter(inv => {
                const d = (window.safeParseDate||function(d){return new Date(d)})(inv.document_date);
                const invType = (inv.document_type || '').toLowerCase();

                const isMonthMatch = d.getMonth() + 1 === m;
                const isTypeMatch = (includeFacture && invType === 'facture') || (includeDevis && invType === 'devis');

                return isMonthMatch && isTypeMatch;
            });

            if (monthInvoices.length > 0) {
                let facturesCount = 0;
                let devisCount = 0;
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

                    if (inv.document_type === 'facture') facturesCount++;
                    else if (inv.document_type === 'devis') devisCount++;
                });

                grandTotalHT += monthTotalHT;

                monthsData.push({
                    monthName: monthNames[m],
                    facturesCount,
                    devisCount,
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

        const blueColor = [33, 97, 140]; // #21618C
        const greenColor = [16, 172, 132]; // #10AC84

        // Reuse header function from MRY helpers or redefine a specific one
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

        // We will adapt the existing one slightly for "SITUATION"
        const titleLines = addHeaderToPDFAnnuelleMRY(doc, client, dateRangeStr, blueColor, greenColor);

        // Dynamic Column Positioning
        const startX = 40;
        const endX = 140;
        const totalWidth = endX - startX;

        let activeColumns = [];
        if (includeFacture) activeColumns.push({ label: 'Nbr FACTURES', key: 'facturesCount' });
        if (includeDevis) activeColumns.push({ label: 'Nbr DEVIS', key: 'devisCount' });

        const columnWidth = totalWidth / activeColumns.length;

        activeColumns.forEach((col, index) => {
            col.x = startX + (columnWidth * index) + (columnWidth / 2);
        });

        // Table Header - dynamic startY based on number of title lines
        const startY = 77 + (titleLines || 1) * 7 + 4;
        doc.setFillColor(...blueColor);
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

        // Table Content
        doc.setFont(undefined, 'normal');
        let currentY = startY + 10;

        monthsData.forEach((row, index) => {
            // Alternating row background
            if (index % 2 === 1) {
                doc.setFillColor(245, 245, 245);
                doc.rect(14, currentY, 182, 8, 'F');
            }

            doc.setTextColor(0, 0, 0);
            doc.text(row.monthName, 20, currentY + 5.5);

            activeColumns.forEach(col => {
                doc.text(row[col.key].toString(), col.x, currentY + 5.5, { align: 'center' });
            });

            doc.text(formatAmountMRY(row.totalHT), 140, currentY + 5.5, { align: 'right' });
            doc.text(formatAmountMRY(row.totalTTC), 190, currentY + 5.5, { align: 'right' });

            currentY += 8;
        });

        currentY += 8;
        doc.setFillColor(255, 255, 255); // White
        doc.rect(110, currentY, 85, 8, 'F');
        doc.setTextColor(...blueColor);
        doc.setFont(undefined, 'bold');
        doc.text('TOTAL HT :', 113, currentY + 5.5);
        doc.text(`${formatAmountMRY(grandTotalHT)} DH`, 192, currentY + 5.5, { align: 'right' });

        currentY += 8;
        doc.setFillColor(255, 255, 255);
        doc.rect(110, currentY, 85, 8, 'F');
        doc.text('TOTAL TVA :', 113, currentY + 5.5);
        doc.text(`${formatAmountMRY(grandTotalTVA)} DH`, 192, currentY + 5.5, { align: 'right' });

        currentY += 8;
        doc.setFillColor(...blueColor); // MRY Header Blue
        doc.rect(110, currentY, 85, 8, 'F');
        doc.setTextColor(255, 255, 255); // White
        doc.text('TOTAL TTC :', 113, currentY + 5.5);
        doc.text(`${formatAmountMRY(grandTotalTTC)} DH`, 192, currentY + 5.5, { align: 'right' });

        addFooterToPDFMRY(doc, 1, 1);
        const filename = `Situation_Annuelle_${client.nom.replace(/\s+/g, '_')}_${year}_MRY.pdf`;
        console.log('🟦 [MRY ANNUAL] Saving PDF:', filename);
        doc.save(filename);
        console.log('✅ [MRY ANNUAL] Success!');

        window.notify.success('Succès', 'Rapport annuel généré avec succès', 3000);
    } catch (error) {
        console.error('🔴 [MRY ANNUAL] ERROR:', error);
        console.error('🔴 [MRY ANNUAL] Stack:', error.stack);
        window.notify.error('Erreur', 'Génération échouée: ' + error.message, 5000);
    }
};

// Helper Function for PDF Formatting
function formatAmountMRY(amount) {
    if (isNaN(amount) || amount === null || amount === undefined) {
        return '0.00';
    }
    const num = parseFloat(amount);
    const parts = num.toFixed(2).split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return parts.join('.');
}

function addHeaderToPDFAnnuelleMRY(doc, client, dateRangeStr, blueColor, greenColor) {
    // Logo
    try {
        const logoImg = document.querySelector('img[src*="mry.png"]') ||
            document.querySelector('img[data-asset="mry"]') ||
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
    doc.text('MRY TRAV SARL (AU)', 105, 20, { align: 'center' });

    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.setTextColor(0, 0, 0);
    doc.text('TRAVAUX DIVERS DE CONSTRUCTION', 105, 27, { align: 'center' });
    doc.text('VENTE DE MATERIAUX DE CONSTRUCTION', 105, 32, { align: 'center' });
    doc.text('VENTE DE QUINCAILLERIE & DE DROGUERIE', 105, 37, { align: 'center' });

    // Client Info
    doc.setFontSize(11);
    doc.setFont(undefined, 'bold');
    doc.text('CLIENT :', 15, 50);
    doc.setTextColor(...greenColor);

    if (client) {
        doc.text(client.nom.toUpperCase(), 40, 50);
        // Only show ICE if it exists and is not '0'
        if (client.ice && client.ice !== '0') {
            doc.setTextColor(0, 0, 0);
            doc.text('ICE :', 15, 57);
            doc.setTextColor(...greenColor);
            doc.text(client.ice, 40, 57);
        }
    } else {
        doc.text('MULTI-CLIENTS', 40, 50);
    }

    // Date
    doc.setTextColor(0, 0, 0);
    doc.text(`Date: ${new Date().toLocaleDateString('fr-FR')}`, 150, 50);

    // Title
    doc.setFontSize(15);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text('SITUATION', 105, 70, { align: 'center' });

    doc.setTextColor(...blueColor);
    doc.setFontSize(13);
    const splitTitle = doc.splitTextToSize(dateRangeStr, 170);
    doc.text(splitTitle, 105, 77, { align: 'center' });
    return splitTitle.length;
}


// ==========================================
// PART 2: Global Clients Annual Report (MRY)
// ==========================================

// Show SITUATION Modal for Multiple Clients
window.showSituationAnnuelleClientsModalMRY = async function () {
    try {
        const clientsResult = await window.electron.db.getAllClients();
        const clients = clientsResult.success ? clientsResult.data : [];
        const currentYear = new Date().getFullYear();
        const years = [currentYear, currentYear - 1, currentYear - 2, currentYear - 3, currentYear - 4];

        const overlay = document.createElement('div');
        overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.9);z-index:999999;display:flex;align-items:center;justify-content:center;animation:fadeIn 0.2s;padding:2rem;';

        const modal = document.createElement('div');
        modal.style.cssText = 'background:linear-gradient(145deg, #2a2a2e 0%, #1a1a1e 100%);border:2px solid #FF9800;border-radius:20px;padding:2rem;width:600px;max-height:85vh;overflow-y:auto;box-shadow:0 25px 80px rgba(0,0,0,0.95);';

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
                    <h2 style="color:#fff;margin:0;font-size:1.6rem;font-weight:700;letter-spacing:-0.5px;">SITUATION GLOBALE</h2>
                    <p style="color:#999;margin:0.25rem 0 0 0;font-size:0.9rem;">Rapport annuel pour plusieurs clients</p>
                </div>
            </div>
            
            <div style="margin-bottom:1.25rem;position:relative;">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;">
                    <label style="color:#FF9800;font-weight:600;font-size:0.9rem;text-transform:uppercase;letter-spacing:0.5px;">Clients</label>
                    <div>
                        <button type="button" id="toggleAllClientsMRY_True" style="background:none;border:none;color:#FF9800;cursor:pointer;font-size:0.85rem;margin-right:0.5rem;text-decoration:underline;">Tout sélectionner</button>
                        <button type="button" id="toggleAllClientsMRY_False" style="background:none;border:none;color:#999;cursor:pointer;font-size:0.85rem;text-decoration:underline;">Tout désélectionner</button>
                    </div>
                </div>
                <input type="text" id="situationClientsSearchMRY" placeholder="Rechercher un client..." 
                       style="width:100%;padding:0.875rem 1rem;background:#2d2d30;border:1px solid #3e3e42;border-radius:10px 10px 0 0;color:#fff;font-size:0.95rem;outline:none;">
                
                <div id="clientsSelectionListMRY" style="max-height:200px;overflow-y:auto;background:#2d2d30;border:1px solid #3e3e42;border-top:none;border-radius:0 0 10px 10px;">
                    ${clients.map(client => `
                        <label class="client-checkbox-item" style="display:flex;align-items:center;padding:0.75rem 1rem;cursor:pointer;border-bottom:1px solid #3e3e42;transition:all 0.2s;">
                            <input type="checkbox" class="client-checkbox-mry" value="${client.id}" data-name="${client.nom}" style="margin-right:1rem;accent-color:#FF9800;width:18px;height:18px;">
                            <span style="color:#fff;font-size:0.95rem;">${client.nom}</span>
                            ${client.ice ? `<span style="color:#999;font-size:0.8rem;margin-left:auto;">${client.ice}</span>` : ''}
                        </label>
                    `).join('')}
                </div>
                <div style="margin-top:0.5rem;font-size:0.85rem;color:#999;text-align:right;">
                    <span id="selectedClientsCountMRY">0</span> clients sélectionnés
                </div>
            </div>
            
            <div style="display:flex;gap:1.5rem;margin-bottom:1.25rem;">
                <div style="flex:1;">
                    <label style="display:block;color:#FF9800;margin-bottom:0.5rem;font-weight:600;font-size:0.9rem;text-transform:uppercase;letter-spacing:0.5px;">Année</label>
                    <select id="situationAnnuelleMultiYearMRY" style="width:100%;padding:0.75rem 1rem;background:#2d2d30;border:1px solid #3e3e42;border-radius:10px;color:#fff;font-size:0.95rem;outline:none;cursor:pointer;transition:all 0.2s;" onfocus="this.style.borderColor='#FF9800';this.style.boxShadow='0 0 0 3px rgba(255, 152, 0, 0.1)'" onblur="this.style.borderColor='#3e3e42';this.style.boxShadow='none'">
                        ${years.map(y => `<option value="${y}" ${y === currentYear ? 'selected' : ''}>${y}</option>`).join('')}
                    </select>
                </div>
                
                <div style="flex:1;">
                    <label style="display:block;color:#FF9800;margin-bottom:0.5rem;font-weight:600;font-size:0.9rem;text-transform:uppercase;letter-spacing:0.5px;">Types de documents</label>
                    <div style="display:flex;gap:1rem;padding:0.55rem 0;">
                        <label style="display:flex;align-items:center;color:#fff;cursor:pointer;font-size:0.95rem;">
                            <input type="checkbox" id="situationAnnuelleMultiTypeFactureMRY" checked style="margin-right:0.5rem;accent-color:#FF9800;width:18px;height:18px;">
                            Facture
                        </label>
                        <label style="display:flex;align-items:center;color:#fff;cursor:pointer;font-size:0.95rem;">
                            <input type="checkbox" id="situationAnnuelleMultiTypeDevisMRY" checked style="margin-right:0.5rem;accent-color:#FF9800;width:18px;height:18px;">
                            Devis
                        </label>
                    </div>
                </div>
            </div>

            <div style="margin-bottom:1.5rem;">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem;">
                    <label style="color:#FF9800;font-weight:600;font-size:0.9rem;text-transform:uppercase;letter-spacing:0.5px;">Mois à inclure</label>
                    <div>
                        <button type="button" onclick="toggleAllMonthsMRYGlobal(true)" style="background:none;border:none;color:#FF9800;cursor:pointer;font-size:0.85rem;margin-right:0.5rem;text-decoration:underline;">Tout sélectionner</button>
                        <button type="button" onclick="toggleAllMonthsMRYGlobal(false)" style="background:none;border:none;color:#999;cursor:pointer;font-size:0.85rem;text-decoration:underline;">Tout désélectionner</button>
                    </div>
                </div>
                <div style="display:grid;grid-template-columns:repeat(4, 1fr);gap:0.75rem;">
                    ${['Janv', 'Févr', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil', 'Août', 'Sept', 'Oct', 'Nov', 'Déc'].map((m, i) => `
                        <label style="display:flex;align-items:center;background:#2d2d30;padding:0.6rem;border-radius:8px;border:1px solid #3e3e42;cursor:pointer;transition:all 0.2s;" onmouseover="this.style.borderColor='#FF9800'" onmouseout="this.style.borderColor='#3e3e42'">
                            <input type="checkbox" class="month-checkbox-mry-global" value="${i + 1}" checked style="margin-right:0.5rem;accent-color:#FF9800;">
                            <span style="color:#fff;font-size:0.85rem;">${m}</span>
                        </label>
                    `).join('')}
                </div>
            </div>
            
            <div style="display:flex;gap:0.75rem;margin-top:2.5rem;">
                <button id="situationAnnuelleMultiCancelMRY" style="flex:1;padding:0.875rem 1.5rem;background:#3e3e42;color:#fff;border:none;border-radius:10px;cursor:pointer;font-size:0.95rem;font-weight:600;transition:all 0.2s;">
                    Annuler
                </button>
                <button id="situationAnnuelleMultiGenerateMRY" style="flex:2;padding:0.875rem 1.5rem;background:linear-gradient(135deg, #FF9800 0%, #F57C00 100%);color:#fff;border:none;border-radius:10px;cursor:pointer;font-size:0.95rem;font-weight:600;transition:all 0.2s;box-shadow:0 4px 12px rgba(255, 152, 0, 0.3);display:flex;align-items:center;justify-content:center;gap:0.5rem;">
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

        const updateSelectedCount = () => {
            const count = modal.querySelectorAll('.client-checkbox-mry:checked').length;
            modal.querySelector('#selectedClientsCountMRY').innerText = count;
        };

        window.toggleAllMonthsMRYGlobal = function (selectAll) {
            modal.querySelectorAll('.month-checkbox-mry-global').forEach(cb => cb.checked = selectAll);
        };

        modal.querySelector('#toggleAllClientsMRY_True').onclick = () => {
            modal.querySelectorAll('.client-checkbox-mry').forEach(cb => {
                if (cb.closest('label').style.display !== 'none') cb.checked = true;
            });
            updateSelectedCount();
        };

        modal.querySelector('#toggleAllClientsMRY_False').onclick = () => {
            modal.querySelectorAll('.client-checkbox-mry').forEach(cb => cb.checked = false);
            updateSelectedCount();
        };

        modal.querySelector('#situationClientsSearchMRY').oninput = (e) => {
            const term = e.target.value.toLowerCase();
            modal.querySelectorAll('.client-checkbox-item').forEach(item => {
                const name = item.querySelector('span').textContent.toLowerCase();
                item.style.display = name.includes(term) ? 'flex' : 'none';
            });
        };

        modal.querySelectorAll('.client-checkbox-mry').forEach(cb => cb.onchange = updateSelectedCount);
        modal.querySelector('#situationAnnuelleMultiCancelMRY').onclick = () => overlay.remove();
        modal.querySelector('#situationAnnuelleMultiGenerateMRY').onclick = async () => {
            const selectedClientIds = Array.from(modal.querySelectorAll('.client-checkbox-mry:checked')).map(cb => cb.value);
            const selectedMonths = Array.from(modal.querySelectorAll('.month-checkbox-mry-global:checked')).map(cb => parseInt(cb.value));
            const year = parseInt(modal.querySelector('#situationAnnuelleMultiYearMRY').value);
            const includeFacture = modal.querySelector('#situationAnnuelleMultiTypeFactureMRY').checked;
            const includeDevis = modal.querySelector('#situationAnnuelleMultiTypeDevisMRY').checked;

            if (selectedClientIds.length === 0) {
                window.notify.error('Erreur', 'Veuillez sélectionner au moins un client', 3000);
                return;
            }

            if (selectedMonths.length === 0) {
                window.notify.error('Erreur', 'Veuillez sélectionner au moins un mois', 3000);
                return;
            }

            overlay.remove();
            await generateSituationAnnuelleClientsMRY(selectedClientIds, year, selectedMonths, includeFacture, includeDevis);
        };
    } catch (error) {
        console.error('Error showing SITUATION Global modal:', error);
    }
};

// Generate Global PDF for MRY
window.generateSituationAnnuelleClientsMRY = async function (clientIds, year, selectedMonths, includeFacture, includeDevis) {
    try {
        window.notify.info('Info', 'Génération en cours...', 2000);
        const invoicesResult = await window.electron.db.getAllInvoices('MRY');
        const clientsResult = await window.electron.db.getAllClients();
        const allClients = clientsResult.success ? clientsResult.data : [];

        const yearInvoices = invoicesResult.data.filter(inv => {
            const invDate = (window.safeParseDate||function(d){return new Date(d)})(inv.document_date);
            const month = invDate.getMonth() + 1;
            return clientIds.includes(String(inv.client_id)) &&
                invDate.getFullYear() === year &&
                selectedMonths.includes(month);
        });

        if (yearInvoices.length === 0) {
            window.notify.warning('Attention', 'Aucun document trouvé', 4000);
            return;
        }

        const clientsData = [];
        let grandTotalHT = 0, grandTotalTVA = 0, grandTotalTTC = 0;

        for (const clientId of clientIds) {
            const client = allClients.find(c => String(c.id) === String(clientId));
            const clientInvoices = yearInvoices.filter(inv => {
                const invType = (inv.document_type || '').toLowerCase();
                return String(inv.client_id) === String(clientId) && ((includeFacture && invType === 'facture') || (includeDevis && invType === 'devis'));
            });

            if (clientInvoices.length > 0) {
                let facturesCount = 0, devisCount = 0, clientHT = 0, clientTTC = 0, clientTVA = 0;
                clientInvoices.forEach(inv => {
                    const ht = parseFloat(inv.total_ht || 0);
                    const ttc = parseFloat(inv.total_ttc || 0);
                    // Use stored TVA if available, otherwise fallback to difference
                    const tva = parseFloat(inv.montant_tva || 0) || (ttc - ht);

                    clientHT += ht;
                    clientTTC += ttc;
                    clientTVA += tva;

                    if (inv.document_type === 'facture') facturesCount++;
                    else if (inv.document_type === 'devis') devisCount++;
                });
                grandTotalHT += clientHT;
                grandTotalTTC += clientTTC;
                grandTotalTVA += clientTVA;

                clientsData.push({
                    clientName: (client ? client.nom : 'Inconnu').toUpperCase(),
                    facturesCount,
                    devisCount,
                    totalHT: clientHT,
                    totalTTC: clientTTC
                });
            }
        }

        if (typeof window.jspdf === 'undefined') {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
            await new Promise(r => { script.onload = r; document.head.appendChild(script); });
        }

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        const blueColor = [33, 97, 140];
        const greenColor = [16, 172, 132];

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

        const clientLabel = clientIds.length === 1 ? null : { nom: `MULTI-CLIENTS (${clientIds.length})` };
        const titleLinesGlobal = addHeaderToPDFAnnuelleMRY(doc, clientLabel, dateRangeStr, blueColor, greenColor);

        // Table logic - dynamic startY based on number of title lines
        const startY = 77 + (titleLinesGlobal || 1) * 7 + 4;
        doc.setFillColor(...blueColor);
        doc.rect(14, startY, 182, 10, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(9);
        doc.setFont(undefined, 'bold');
        doc.text('CLIENT', 20, startY + 6.5);
        doc.text('NB DOCS', 100, startY + 6.5, { align: 'center' });
        doc.text('TOTAL H.T', 150, startY + 6.5, { align: 'right' });
        doc.text('TOTAL T.T.C', 190, startY + 6.5, { align: 'right' });

        doc.setFont(undefined, 'normal');
        let currentY = startY + 10;
        clientsData.forEach((row, idx) => {
            if (idx % 2 === 1) { doc.setFillColor(245, 245, 245); doc.rect(14, currentY, 182, 8, 'F'); }
            doc.setTextColor(0, 0, 0);
            doc.text(row.clientName, 20, currentY + 5.5);
            doc.text(`${row.facturesCount + row.devisCount}`, 100, currentY + 5.5, { align: 'center' });
            doc.text(formatAmountMRY(row.totalHT), 150, currentY + 5.5, { align: 'right' });
            doc.text(formatAmountMRY(row.totalTTC), 190, currentY + 5.5, { align: 'right' });
            currentY += 8;
        });

        currentY += 10;
        doc.setFont(undefined, 'bold');
        doc.text('TOTAL HT :', 130, currentY); doc.text(`${formatAmountMRY(grandTotalHT)} DH`, 190, currentY, { align: 'right' });
        currentY += 8;
        doc.text('TOTAL TVA :', 130, currentY); doc.text(`${formatAmountMRY(grandTotalTVA)} DH`, 190, currentY, { align: 'right' });
        currentY += 8;
        doc.setFillColor(...blueColor);
        doc.rect(125, currentY - 5, 70, 8, 'F');
        doc.setTextColor(255, 255, 255);
        doc.text('TOTAL TTC :', 130, currentY); doc.text(`${formatAmountMRY(grandTotalTTC)} DH`, 190, currentY, { align: 'right' });
        doc.setTextColor(0, 0, 0);

        addFooterToPDFMRY(doc, 1, 1);
        doc.save(`Situation_Globale_${year}_MRY.pdf`);
        window.notify.success('Succès', 'Rapport généré');
    } catch (e) {
        console.error('🔴 [MRY ANNUAL GLOBAL] ERROR:', e);
        console.error('🔴 [MRY ANNUAL GLOBAL] Stack:', e.stack);
        window.notify.error('Erreur', 'Génération échouée: ' + e.message, 5000);
    }
};

function addFooterToPDFMRY(doc, pageNumber, totalPages) {
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(7);
    doc.setFont(undefined, 'normal');
    doc.text('NIF : 25077370  TP : 51200166  R.C : 23181  CNSS : 5679058  ICE : 002036664000051', 15, 275);
    doc.text('R.I.B : 007 720 0005973000000519 74  ATTIJARI WAFA BANQ', 15, 279);
    doc.text('AV, BNI IDDER RUE 14 N°10 COELMA - TÉTOUAN.', 15, 283);
    doc.text('EMAIL: errbahiabderrahim@gmail.com  TEL : 0661307323', 15, 287);
    if (pageNumber && totalPages) {
        doc.setFontSize(8);
        doc.setTextColor(128, 128, 128);
        doc.text(`Page ${pageNumber} / ${totalPages}`, 105, 293, { align: 'center' });
    }
}
