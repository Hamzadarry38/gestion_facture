// Situation Mensuelle - Monthly Report Generator for MULTI TRAVAUX TETOUAN
// This file handles the generation of monthly situation reports for clients

// Show Situation Mensuelle Modal
window.showSituationMensuelleModalMulti = async function() {
    try {
        // Get all clients
        const clientsResult = await window.electron.dbMulti.getAllClients();
        const clients = clientsResult.success ? clientsResult.data : [];
        
        const currentYear = new Date().getFullYear();
        const years = [currentYear, currentYear - 1, currentYear - 2];
        const months = [
            { value: 1, label: 'Janvier' },
            { value: 2, label: 'Fevrier' },
            { value: 3, label: 'Mars' },
            { value: 4, label: 'Avril' },
            { value: 5, label: 'Mai' },
            { value: 6, label: 'Juin' },
            { value: 7, label: 'Juillet' },
            { value: 8, label: 'Aout' },
            { value: 9, label: 'Septembre' },
            { value: 10, label: 'Octobre' },
            { value: 11, label: 'Novembre' },
            { value: 12, label: 'Decembre' }
        ];
        
        const overlay = document.createElement('div');
        overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.9);z-index:999999;display:flex;align-items:center;justify-content:center;animation:fadeIn 0.2s;padding:2rem;';
        
        const modal = document.createElement('div');
        modal.style.cssText = 'background:linear-gradient(145deg, #2a2a2e 0%, #1a1a1e 100%);border:2px solid #4a90e2;border-radius:20px;padding:2rem;width:700px;max-height:85vh;overflow-y:auto;box-shadow:0 25px 80px rgba(0,0,0,0.95);';
        
        modal.innerHTML = `
            <style>
                @keyframes fadeIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
                @keyframes slideDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
            </style>
            <div style="display:flex;align-items:center;gap:1rem;margin-bottom:2rem;padding-bottom:1.5rem;border-bottom:2px solid #3a3a3e;">
                <div style="background:linear-gradient(135deg, #667eea 0%, #764ba2 100%);padding:1rem;border-radius:12px;box-shadow:0 4px 15px rgba(102,126,234,0.3);">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                        <path d="M9 11l3 3L22 4"></path>
                        <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"></path>
                    </svg>
                </div>
                <div style="flex:1;">
                    <h2 style="color:#fff;margin:0;font-size:1.6rem;font-weight:700;letter-spacing:-0.5px;">Situation Mensuelle</h2>
                    <p style="color:#999;margin:0.25rem 0 0 0;font-size:0.9rem;">Générer un rapport mensuel détaillé</p>
                </div>
            </div>
            
            <div style="margin-bottom:1.25rem;position:relative;">
                <label style="display:block;color:#4a90e2;margin-bottom:0.5rem;font-weight:600;font-size:0.9rem;text-transform:uppercase;letter-spacing:0.5px;">Client</label>
                <input type="text" id="situationClientInputMulti" placeholder="Rechercher un client..." 
                       autocomplete="off"
                       style="width:100%;padding:0.875rem 1rem;background:#2d2d30;border:1px solid #3e3e42;border-radius:10px;color:#fff;font-size:0.95rem;outline:none;transition:all 0.2s;"
                       oninput="searchSituationClientsMulti(this.value)"
                       onfocus="this.style.borderColor='#4a90e2';this.style.boxShadow='0 0 0 3px rgba(74,144,226,0.1)';showSituationClientsListMulti()"
                       onblur="this.style.borderColor='#3e3e42';this.style.boxShadow='none';hideSituationClientsListMulti()">
                <input type="hidden" id="situationClientIdMulti" value="">
                <div id="situationClientsDropdownMulti" style="display:none;position:absolute;top:100%;left:0;right:0;background:#2d2d30;border:1px solid #3e3e42;border-top:none;border-radius:0 0 10px 10px;max-height:250px;overflow-y:auto;z-index:1000;margin-top:-10px;box-shadow:0 8px 20px rgba(0,0,0,0.4);"></div>
            </div>
            <style>
                .situation-dropdown-item-multi {
                    padding: 0.75rem 1rem;
                    cursor: pointer;
                    border-bottom: 1px solid #3e3e42;
                    transition: all 0.2s;
                }
                .situation-dropdown-item-multi:hover {
                    background: #4a90e2;
                }
                .situation-dropdown-item-multi:last-child {
                    border-bottom: none;
                }
                .situation-client-name-multi {
                    color: #fff;
                    font-weight: 600;
                    margin-bottom: 0.25rem;
                }
                .situation-client-ice-multi {
                    color: #999;
                    font-size: 0.85rem;
                }
                .situation-no-results-multi {
                    padding: 1rem;
                    text-align: center;
                    color: #999;
                }
            </style>
            
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1.25rem;">
                <div>
                    <label style="display:block;color:#4a90e2;margin-bottom:0.5rem;font-weight:600;font-size:0.9rem;text-transform:uppercase;letter-spacing:0.5px;">Mois</label>
                    <select id="situationMonthMulti" style="width:100%;padding:0.875rem 1rem;background:#2d2d30;border:1px solid #3e3e42;border-radius:10px;color:#fff;font-size:0.95rem;outline:none;cursor:pointer;transition:all 0.2s;" onfocus="this.style.borderColor='#4a90e2';this.style.boxShadow='0 0 0 3px rgba(74,144,226,0.1)'" onblur="this.style.borderColor='#3e3e42';this.style.boxShadow='none'">
                        ${months.map(m => `<option value="${m.value}" ${m.value === new Date().getMonth() + 1 ? 'selected' : ''}>${m.label}</option>`).join('')}
                    </select>
                </div>
                <div>
                    <label style="display:block;color:#4a90e2;margin-bottom:0.5rem;font-weight:600;font-size:0.9rem;text-transform:uppercase;letter-spacing:0.5px;">Année</label>
                    <select id="situationYearMulti" style="width:100%;padding:0.875rem 1rem;background:#2d2d30;border:1px solid #3e3e42;border-radius:10px;color:#fff;font-size:0.95rem;outline:none;cursor:pointer;transition:all 0.2s;" onfocus="this.style.borderColor='#4a90e2';this.style.boxShadow='0 0 0 3px rgba(74,144,226,0.1)'" onblur="this.style.borderColor='#3e3e42';this.style.boxShadow='none'">
                        ${years.map(y => `<option value="${y}" ${y === currentYear ? 'selected' : ''}>${y}</option>`).join('')}
                    </select>
                </div>
            </div>
            
            <div style="margin-bottom:1.5rem;padding:1.25rem;background:linear-gradient(135deg, #2d3436 0%, #252729 100%);border:1px solid #3e3e42;border-radius:12px;">
                <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:1rem;">
                    <div style="flex:1;">
                        <div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.5rem;">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4caf50" stroke-width="2">
                                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"></path>
                                <polyline points="14 2 14 8 20 8"></polyline>
                                <line x1="16" y1="13" x2="8" y2="13"></line>
                                <line x1="16" y1="17" x2="8" y2="17"></line>
                                <polyline points="10 9 9 9 8 9"></polyline>
                            </svg>
                            <span style="color:#4caf50;font-weight:700;font-size:0.95rem;">Sélection des factures</span>
                        </div>
                        <p style="color:#999;font-size:0.85rem;margin:0;line-height:1.4;">Choisissez manuellement les factures à inclure</p>
                    </div>
                    <div style="display:flex;gap:0.5rem;flex-shrink:0;">
                        <button id="situationAddManualInvoiceMulti" style="padding:0.625rem 1rem;background:linear-gradient(135deg, #ff9800 0%, #f57c00 100%);color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:0.85rem;font-weight:600;transition:all 0.2s;box-shadow:0 2px 8px rgba(255,152,0,0.25);" onmouseover="this.style.transform='translateY(-1px)';this.style.boxShadow='0 4px 12px rgba(255,152,0,0.35)'" onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='0 2px 8px rgba(255,152,0,0.25)'">
                            ➕ Ajouter
                        </button>
                        <button id="situationSelectInvoicesMulti" style="padding:0.625rem 1rem;background:linear-gradient(135deg, #4caf50 0%, #388e3c 100%);color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:0.85rem;font-weight:600;transition:all 0.2s;box-shadow:0 2px 8px rgba(76,175,80,0.25);" onmouseover="this.style.transform='translateY(-1px)';this.style.boxShadow='0 4px 12px rgba(76,175,80,0.35)'" onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='0 2px 8px rgba(76,175,80,0.25)'">
                            🔍 Choisir
                        </button>
                    </div>
                </div>
                <div id="selectedInvoicesCountMulti" style="color:#4caf50;font-size:0.85rem;font-weight:600;display:none;margin-top:0.75rem;padding:0.5rem 0.75rem;background:rgba(76,175,80,0.1);border-radius:6px;">
                    ✓ <span id="selectedCountTextMulti">0</span> facture(s) sélectionnée(s)
                </div>
                <div id="manualInvoicesListMulti" style="margin-top:0.75rem;display:none;">
                    <div style="color:#ff9800;font-weight:600;font-size:0.85rem;margin-bottom:0.5rem;display:flex;align-items:center;gap:0.5rem;">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff9800" stroke-width="2">
                            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                        <span>Factures manuelles ajoutées</span>
                    </div>
                    <div id="manualInvoicesContainerMulti" style="display:flex;flex-direction:column;gap:0.5rem;"></div>
                </div>
            </div>
            
            <div style="display:flex;gap:0.75rem;margin-top:1.5rem;">
                <button id="situationCancelMulti" style="flex:1;padding:0.875rem 1.5rem;background:#3e3e42;color:#fff;border:none;border-radius:10px;cursor:pointer;font-size:0.95rem;font-weight:600;transition:all 0.2s;" onmouseover="this.style.background='#4e4e52'" onmouseout="this.style.background='#3e3e42'">
                    Annuler
                </button>
                <button id="situationGenerateMulti" style="flex:2;padding:0.875rem 1.5rem;background:linear-gradient(135deg, #4a90e2 0%, #357abd 100%);color:#fff;border:none;border-radius:10px;cursor:pointer;font-size:0.95rem;font-weight:600;transition:all 0.2s;box-shadow:0 4px 12px rgba(74,144,226,0.3);display:flex;align-items:center;justify-content:center;gap:0.5rem;" onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 6px 20px rgba(74,144,226,0.4)'" onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='0 4px 12px rgba(74,144,226,0.3)'">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                    <span>Générer PDF</span>
                </button>
            </div>
        `;
        
        overlay.appendChild(modal);
        document.body.appendChild(overlay);
        
        // Store clients for autocomplete
        let situationFilteredClientsMulti = clients;
        
        // Search clients function
        window.searchSituationClientsMulti = function(query) {
            if (!query || query.trim().length === 0) {
                situationFilteredClientsMulti = clients;
            } else {
                const searchTerm = query.toLowerCase().trim();
                situationFilteredClientsMulti = clients.filter(client => 
                    client.nom.toLowerCase().includes(searchTerm) || 
                    client.ice.toLowerCase().includes(searchTerm)
                );
            }
            displaySituationClientsListMulti();
        };
        
        // Display clients list
        function displaySituationClientsListMulti() {
            const dropdown = document.getElementById('situationClientsDropdownMulti');
            if (!dropdown) return;
            
            if (situationFilteredClientsMulti.length === 0) {
                dropdown.innerHTML = '<div class="situation-no-results-multi">Aucun client trouvé</div>';
                dropdown.style.display = 'block';
                return;
            }
            
            dropdown.innerHTML = situationFilteredClientsMulti.slice(0, 10).map(client => `
                <div class="situation-dropdown-item-multi" onmousedown="selectSituationClientMulti(${client.id}, '${client.nom.replace(/'/g, "\\'")}', '${client.ice}')">
                    <div class="situation-client-name-multi">${client.nom}</div>
                    <div class="situation-client-ice-multi">ICE: ${client.ice}</div>
                </div>
            `).join('');
            
            dropdown.style.display = 'block';
        }
        
        window.showSituationClientsListMulti = function() {
            if (clients.length > 0) {
                situationFilteredClientsMulti = clients;
                displaySituationClientsListMulti();
            }
        };
        
        window.hideSituationClientsListMulti = function() {
            setTimeout(() => {
                const dropdown = document.getElementById('situationClientsDropdownMulti');
                if (dropdown) dropdown.style.display = 'none';
            }, 200);
        };
        
        // Select client from dropdown
        window.selectSituationClientMulti = function(id, nom, ice) {
            document.getElementById('situationClientInputMulti').value = `${nom} (${ice})`;
            document.getElementById('situationClientIdMulti').value = id;
            
            // Store client info for later use
            window.selectedSituationClientMulti = { id, nom, ice };
            
            const dropdown = document.getElementById('situationClientsDropdownMulti');
            if (dropdown) dropdown.style.display = 'none';
        };
        
        // Store selected invoices and manual invoices
        let selectedInvoicesMulti = [];
        // Clear manual invoices when opening modal (fresh start each time)
        window.manualInvoicesMulti = [];
        let manualInvoicesMulti = window.manualInvoicesMulti;
        
        // Show manual invoice add modal
        document.getElementById('situationAddManualInvoiceMulti').onclick = () => {
            // Check if client is selected
            const clientIdInput = document.getElementById('situationClientIdMulti');
            
            if (!clientIdInput || !clientIdInput.value || !window.selectedSituationClientMulti) {
                window.notify.error('Erreur', 'Veuillez d\'abord sélectionner un client', 3000);
                return;
            }
            
            showAddManualInvoiceModalMulti(manualInvoicesMulti);
        };
        
        // Update manual invoices display
        window.updateManualInvoicesDisplayMulti = function(invoices) {
            manualInvoicesMulti = invoices;
            window.manualInvoicesMulti = invoices; // Persist to global
            const listElement = document.getElementById('manualInvoicesListMulti');
            const containerElement = document.getElementById('manualInvoicesContainerMulti');
            
            if (invoices.length > 0) {
                listElement.style.display = 'block';
                
                // Create table with newest first
                containerElement.innerHTML = `
                    <div style="display:flex;flex-direction:column;gap:0.75rem;margin-top:0.75rem;">
                        ${invoices.map((inv, index) => `
                            <div style="background:linear-gradient(135deg, #3a3a3a 0%, #2d2d2d 100%);border:1px solid #4a4a4a;border-radius:10px;padding:1rem;display:flex;align-items:center;justify-content:space-between;box-shadow:0 2px 8px rgba(0,0,0,0.3);transition:all 0.2s;" onmouseover="this.style.borderColor='#ff9800';this.style.boxShadow='0 4px 12px rgba(255,152,0,0.2)'" onmouseout="this.style.borderColor='#4a4a4a';this.style.boxShadow='0 2px 8px rgba(0,0,0,0.3)'">
                                <div style="display:flex;align-items:center;gap:1.25rem;flex:1;">
                                    <div style="background:linear-gradient(135deg, #ff9800 0%, #f57c00 100%);color:#fff;padding:0.5rem 0.875rem;border-radius:8px;font-weight:700;font-size:0.85rem;min-width:100px;text-align:center;box-shadow:0 2px 6px rgba(255,152,0,0.3);">
                                        ${inv.type.toUpperCase()}
                                    </div>
                                    <div style="display:flex;align-items:center;gap:0.375rem;">
                                        <span style="color:#888;font-size:0.8rem;font-weight:600;">N°</span>
                                        <span style="color:#4caf50;font-weight:700;font-size:0.95rem;">${inv.numero}</span>
                                    </div>
                                    <div style="display:flex;align-items:center;gap:0.375rem;">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#888" stroke-width="2">
                                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                            <line x1="16" y1="2" x2="16" y2="6"></line>
                                            <line x1="8" y1="2" x2="8" y2="6"></line>
                                            <line x1="3" y1="10" x2="21" y2="10"></line>
                                        </svg>
                                        <span style="color:#ccc;font-size:0.9rem;">${inv.date}</span>
                                    </div>
                                    <div style="display:flex;align-items:center;gap:0.375rem;margin-left:auto;">
                                        <span style="color:#ff9800;font-weight:800;font-size:1.05rem;">${parseFloat(inv.montant).toLocaleString('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2})} DH</span>
                                    </div>
                                </div>
                                <button onclick="removeManualInvoiceMulti(${index})" 
                                        style="background:linear-gradient(135deg, #f44336 0%, #d32f2f 100%);color:#fff;border:none;padding:0.5rem;border-radius:8px;cursor:pointer;font-size:0.85rem;font-weight:700;transition:all 0.2s;margin-left:1rem;box-shadow:0 2px 6px rgba(244,67,54,0.3);display:flex;align-items:center;justify-content:center;width:36px;height:36px;"
                                        onmouseover="this.style.transform='scale(1.1)';this.style.boxShadow='0 3px 10px rgba(244,67,54,0.4)'" 
                                        onmouseout="this.style.transform='scale(1)';this.style.boxShadow='0 2px 6px rgba(244,67,54,0.3)'">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round">
                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                    </svg>
                                </button>
                            </div>
                        `).join('')}
                        <div style="background:linear-gradient(135deg, #1e3a0f 0%, #152d0a 100%);border:2px solid #4caf50;border-radius:10px;padding:1rem 1.25rem;display:flex;justify-content:space-between;align-items:center;margin-top:0.5rem;box-shadow:0 3px 10px rgba(76,175,80,0.2);">
                            <div style="display:flex;align-items:center;gap:0.625rem;">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4caf50" stroke-width="2">
                                    <path d="M3 3v18h18"></path>
                                    <path d="M18 17V9"></path>
                                    <path d="M13 17V5"></path>
                                    <path d="M8 17v-3"></path>
                                </svg>
                                <span style="color:#81c784;font-size:0.95rem;font-weight:600;">Total: ${invoices.length} facture(s) temporaire(s)</span>
                            </div>
                            <div style="color:#4caf50;font-size:1.3rem;font-weight:900;">
                                ${invoices.reduce((sum, inv) => sum + parseFloat(inv.montant), 0).toLocaleString('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2})} DH
                            </div>
                        </div>
                    </div>
                `;
            } else {
                listElement.style.display = 'none';
            }
        };
        
        // Remove manual invoice
        window.removeManualInvoiceMulti = function(index) {
            manualInvoicesMulti.splice(index, 1);
            window.updateManualInvoicesDisplayMulti(manualInvoicesMulti);
        };
        
        // Show invoice selection modal
        document.getElementById('situationSelectInvoicesMulti').onclick = async () => {
            const clientId = document.getElementById('situationClientIdMulti').value;
            const month = parseInt(document.getElementById('situationMonthMulti').value);
            const year = parseInt(document.getElementById('situationYearMulti').value);
            
            if (!clientId) {
                window.notify.error('Erreur', 'Veuillez d\'abord sélectionner un client', 3000);
                return;
            }
            
            await showInvoiceSelectionModalMulti(clientId, month, year, selectedInvoicesMulti);
        };
        
        // Update selected invoices callback
        window.updateSelectedInvoicesMulti = function(invoices) {
            selectedInvoicesMulti = invoices;
            const countElement = document.getElementById('selectedInvoicesCountMulti');
            const countText = document.getElementById('selectedCountTextMulti');
            
            if (invoices.length > 0) {
                countElement.style.display = 'block';
                countText.textContent = invoices.length;
            } else {
                countElement.style.display = 'none';
            }
        };
        
        document.getElementById('situationCancelMulti').onclick = () => overlay.remove();
        document.getElementById('situationGenerateMulti').onclick = async () => {
            const clientId = document.getElementById('situationClientIdMulti').value;
            const month = parseInt(document.getElementById('situationMonthMulti').value);
            const year = parseInt(document.getElementById('situationYearMulti').value);
            
            if (!clientId) {
                window.notify.error('Erreur', 'Veuillez selectionner un client', 3000);
                return;
            }
            
            // Show sort selection modal
            showSortSelectionModalMulti(clientId, month, year, selectedInvoicesMulti, manualInvoicesMulti, overlay);
        };
        
        // Removed overlay click to close - user must use buttons
        
    } catch (error) {
        console.error('Error showing situation modal:', error);
        window.notify.error('Erreur', 'Impossible d\'afficher la fenêtre', 3000);
    }
};

// Format number with spaces for thousands
function formatAmountMulti(amount) {
    if (isNaN(amount) || amount === null || amount === undefined) {
        return '0.00';
    }
    const num = parseFloat(amount);
    const parts = num.toFixed(2).split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return parts.join('.');
}

// Add header to PDF page
function addHeaderToPDFMulti(doc, client, month, year, monthNames, darkGrayColor, lightGrayBg) {
    // Company Name - Left aligned, large
    doc.setFontSize(18);
    doc.setTextColor(...darkGrayColor);
    doc.setFont(undefined, 'bold');
    doc.text('MULTI TRAVAUX TETOUAN', 15, 18);
    
    // Document Type - Right aligned, underlined
    doc.setFontSize(18);
    doc.setFont(undefined, 'bold');
    doc.text('SITUATION', 195, 18, { align: 'right' });
    doc.setLineWidth(0.5);
    doc.line(195 - doc.getTextWidth('SITUATION'), 19, 195, 19);
    
    // Month and Year - Right side, LARGER and more prominent
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(...darkGrayColor);
    doc.text(`${monthNames[month].toUpperCase()} ${year}`, 195, 28, { align: 'right' });
    
    doc.setFontSize(8);
    doc.setFont(undefined, 'normal');
    doc.setTextColor(0, 0, 0);
    doc.text(`Date : ${new Date().toLocaleDateString('fr-FR')}`, 195, 34, { align: 'right' });
    
    // Email and Address - Left side with gray background (ONE BOX)
    doc.setFillColor(...darkGrayColor);
    doc.rect(15, 38, 80, 6, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8);
    doc.text('Email: multitravauxtetouan@gmail.com', 17, 42);
    
    doc.setFillColor(...lightGrayBg);
    doc.rect(15, 44, 80, 6, 'F');
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(7);
    doc.text('AV 10 MAI IMM 04 APPART 01 A DROIT - TETOUAN , TETOUAN', 17, 48);
    
    // Client Info - Right side with gray background (ONE BOX)
    doc.setFillColor(...darkGrayColor);
    doc.rect(115, 38, 80, 6, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8);
    doc.text(`SITUATION à : ${client.nom}`, 117, 42);
    
    doc.setFillColor(...lightGrayBg);
    doc.rect(115, 44, 80, 6, 'F');
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(7);
    doc.text(`ICE : ${client.ice}`, 117, 48);
}

// Add footer to PDF page
function addFooterToPDFMulti(doc, pageNumber, totalPages) {
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(9);
    doc.setFont(undefined, 'normal');
    doc.text('NIF 68717422 | TP 51001343 | RC 38633 | CNSS 6446237', 105, 280, { align: 'center' });
    doc.text('ICE : 00380950500031', 105, 286, { align: 'center' });
}

// Show sort selection modal before generating PDF
function showSortSelectionModalMulti(clientId, month, year, selectedInvoices, manualInvoices, previousOverlay) {
    const sortOverlay = document.createElement('div');
    sortOverlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.95);z-index:1000001;display:flex;align-items:center;justify-content:center;animation:fadeIn 0.2s;';
    
    const sortModal = document.createElement('div');
    sortModal.style.cssText = 'background:#1e1e1e;border:3px solid #2196F3;border-radius:16px;padding:2.5rem;width:90%;max-width:500px;box-shadow:0 20px 60px rgba(0,0,0,0.9);';
    
    sortModal.innerHTML = `
        <div style="text-align:center;margin-bottom:2rem;">
            <div style="font-size:3rem;margin-bottom:0.5rem;">📋</div>
            <h2 style="color:#2196F3;margin:0;font-size:1.5rem;font-weight:700;">Ordre de tri des factures</h2>
            <p style="color:#999;margin-top:0.5rem;font-size:0.95rem;">Choisissez comment trier les factures dans le PDF</p>
        </div>
        
        <div style="display:flex;flex-direction:column;gap:1rem;margin-bottom:2rem;">
            <button class="sort-option-multi" data-sort="date_asc" style="padding:1.25rem;background:#2d2d30;border:2px solid #3e3e42;border-radius:8px;color:#fff;cursor:pointer;text-align:left;transition:all 0.3s;font-size:1rem;">
                <div style="display:flex;align-items:center;gap:1rem;">
                    <span style="font-size:1.5rem;">📅</span>
                    <div>
                        <div style="font-weight:600;margin-bottom:0.25rem;">Date: Du plus ancien au plus récent</div>
                        <div style="color:#999;font-size:0.85rem;">Tri chronologique croissant</div>
                    </div>
                </div>
            </button>
            
            <button class="sort-option-multi" data-sort="date_desc" style="padding:1.25rem;background:#2d2d30;border:2px solid #3e3e42;border-radius:8px;color:#fff;cursor:pointer;text-align:left;transition:all 0.3s;font-size:1rem;">
                <div style="display:flex;align-items:center;gap:1rem;">
                    <span style="font-size:1.5rem;">📆</span>
                    <div>
                        <div style="font-weight:600;margin-bottom:0.25rem;">Date: Du plus récent au plus ancien</div>
                        <div style="color:#999;font-size:0.85rem;">Tri chronologique décroissant</div>
                    </div>
                </div>
            </button>
            
            <button class="sort-option-multi" data-sort="amount_asc" style="padding:1.25rem;background:#2d2d30;border:2px solid #3e3e42;border-radius:8px;color:#fff;cursor:pointer;text-align:left;transition:all 0.3s;font-size:1rem;">
                <div style="display:flex;align-items:center;gap:1rem;">
                    <span style="font-size:1.5rem;">💵</span>
                    <div>
                        <div style="font-weight:600;margin-bottom:0.25rem;">Montant: Du plus petit au plus grand</div>
                        <div style="color:#999;font-size:0.85rem;">Tri par montant croissant</div>
                    </div>
                </div>
            </button>
            
            <button class="sort-option-multi" data-sort="amount_desc" style="padding:1.25rem;background:#2d2d30;border:2px solid #3e3e42;border-radius:8px;color:#fff;cursor:pointer;text-align:left;transition:all 0.3s;font-size:1rem;">
                <div style="display:flex;align-items:center;gap:1rem;">
                    <span style="font-size:1.5rem;">💰</span>
                    <div>
                        <div style="font-weight:600;margin-bottom:0.25rem;">Montant: Du plus grand au plus petit</div>
                        <div style="color:#999;font-size:0.85rem;">Tri par montant décroissant</div>
                    </div>
                </div>
            </button>
        </div>
        
        <button id="sortCancelBtnMulti" style="width:100%;padding:1rem;background:#3e3e42;color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:1rem;font-weight:600;transition:all 0.3s;">
            Annuler
        </button>
    `;
    
    sortOverlay.appendChild(sortModal);
    document.body.appendChild(sortOverlay);
    
    // Add hover effects
    const sortOptions = sortModal.querySelectorAll('.sort-option-multi');
    sortOptions.forEach(option => {
        option.onmouseenter = () => {
            option.style.background = '#3e3e42';
            option.style.borderColor = '#2196F3';
            option.style.transform = 'translateX(5px)';
        };
        option.onmouseleave = () => {
            option.style.background = '#2d2d30';
            option.style.borderColor = '#3e3e42';
            option.style.transform = 'translateX(0)';
        };
        option.onclick = async () => {
            const sortBy = option.getAttribute('data-sort');
            console.log('🎯 [MULTI SORT SELECTED]:', sortBy);
            sortOverlay.remove();
            
            // Show Order/BL selection dialog before generating PDF
            await showOrderBLSelectionModalMulti(clientId, month, year, sortBy, selectedInvoices, manualInvoices, previousOverlay);
        };
    });
    
    document.getElementById('sortCancelBtnMulti').onclick = () => {
        sortOverlay.remove();
    };
}

// Show Order/BL selection modal for Situation Mensuelle
async function showOrderBLSelectionModalMulti(clientId, month, year, sortBy, selectedInvoices, manualInvoices, previousOverlay) {
    const selectionOverlay = document.createElement('div');
    selectionOverlay.className = 'custom-modal-overlay';
    selectionOverlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.95);z-index:1000002;display:flex;align-items:center;justify-content:center;';
    
    selectionOverlay.innerHTML = `
        <div class="custom-modal">
            <div class="custom-modal-header">
                <span class="custom-modal-icon info">📋</span>
                <h3 class="custom-modal-title">Options d'affichage PDF</h3>
            </div>
            <div class="custom-modal-body">
                <p style="margin-bottom:1.25rem;color:#e0e0e0;font-size:0.95rem;">Choisissez les informations à afficher dans le PDF:</p>
                <label style="display:flex;align-items:center;cursor:pointer;padding:1rem;background:#1e1e1e;border:2px solid #2196F3;border-radius:10px;transition:all 0.2s ease;">
                    <input type="checkbox" id="includeOrderCheckboxSituation" checked style="width:20px;height:20px;margin-right:1rem;cursor:pointer;accent-color:#2196F3;">
                    <span style="font-size:0.95rem;color:#e0e0e0;font-weight:500;">
                        Afficher les N° Order dans le PDF
                    </span>
                </label>
            </div>
            <div class="custom-modal-footer">
                <button class="custom-modal-btn primary" id="continueBtnSituation" style="padding:0.75rem 2rem;font-size:1rem;">Générer PDF</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(selectionOverlay);
    
    const orderCheckbox = selectionOverlay.querySelector('#includeOrderCheckboxSituation');
    const continueBtn = selectionOverlay.querySelector('#continueBtnSituation');
    
    continueBtn.addEventListener('click', async () => {
        const includeOrder = orderCheckbox.checked;
        
        console.log('✅ Include Order:', includeOrder);
        
        selectionOverlay.remove();
        previousOverlay.remove();
        
        await generateSituationMensuelleMulti(clientId, month, year, sortBy, selectedInvoices, manualInvoices, includeOrder, false);
    });
    
    selectionOverlay.addEventListener('click', (e) => {
        if (e.target === selectionOverlay) {
            const includeOrder = orderCheckbox.checked;
            selectionOverlay.remove();
            previousOverlay.remove();
            generateSituationMensuelleMulti(clientId, month, year, sortBy, selectedInvoices, manualInvoices, includeOrder, false);
        }
    });
    
    setTimeout(() => continueBtn.focus(), 100);
}

// Generate Situation Mensuelle PDF
window.generateSituationMensuelleMulti = async function(clientId, month, year, sortBy = 'date_asc', selectedInvoiceIds = [], manualInvoices = [], includeOrder = true, includeBL = true) {
    try {
        window.notify.info('Info', 'Generation du rapport en cours...', 2000);
        
        // Get client info
        const clientsResult = await window.electron.dbMulti.getAllClients();
        const client = clientsResult.data.find(c => c.id == clientId);
        
        if (!client) {
            window.notify.error('Erreur', 'Client introuvable', 3000);
            return;
        }
        
        // Get all invoices for this client in the specified month
        const invoicesResult = await window.electron.dbMulti.getAllInvoices('MULTI');
        if (!invoicesResult.success) {
            window.notify.error('Erreur', 'Impossible de charger les factures', 3000);
            return;
        }
        
        let allInvoices = invoicesResult.data.filter(inv => {
            const invDate = new Date(inv.document_date);
            return inv.client_id == clientId && 
                   invDate.getMonth() + 1 === month && 
                   invDate.getFullYear() === year;
        });
        
        // Filter by selected invoices if specified
        if (selectedInvoiceIds.length > 0) {
            allInvoices = allInvoices.filter(inv => selectedInvoiceIds.includes(inv.id));
        }
        
        // Add manual invoices to the list
        if (manualInvoices.length > 0) {
            console.log('📋 [MULTI PDF] Total manualInvoices:', manualInvoices.length);
            
            // Get existing invoice numbers to avoid duplicates
            const existingNumbers = new Set();
            allInvoices.forEach(inv => {
                if (inv.document_numero) existingNumbers.add(inv.document_numero);
                if (inv.document_numero_devis) existingNumbers.add(inv.document_numero_devis);
                if (inv.document_bon_de_livraison) existingNumbers.add(inv.document_bon_de_livraison);
            });
            
            console.log('📋 [MULTI PDF] Existing invoice numbers:', Array.from(existingNumbers));
            
            manualInvoices.forEach(manInv => {
                // Skip if this invoice is already in the list (avoid duplicates)
                if (manInv.savedToDb && existingNumbers.has(manInv.numero)) {
                    console.log('⏭️ [MULTI PDF] Skipping duplicate invoice:', manInv.numero);
                    return;
                }
                
                console.log('➕ [MULTI PDF] Adding manual invoice to PDF:', manInv.numero);
                allInvoices.push({
                    document_type: manInv.type.toLowerCase(),
                    document_numero: manInv.numero,
                    document_numero_devis: manInv.numero,
                    document_date: manInv.dateRaw,
                    total_ht: parseFloat(manInv.montant),
                    isManual: true
                });
            });
        }
        
        if (allInvoices.length === 0) {
            window.notify.warning('Attention', 'Aucune facture trouvee pour ce client et cette periode', 4000);
            return;
        }
        
        // Sort invoices
        allInvoices.sort((a, b) => {
            if (sortBy === 'date_asc') {
                const dateCompare = new Date(a.document_date) - new Date(b.document_date);
                if (dateCompare !== 0) return dateCompare;
                const numA = parseInt((a.document_numero || '0').replace(/\D/g, '')) || 0;
                const numB = parseInt((b.document_numero || '0').replace(/\D/g, '')) || 0;
                return numA - numB;
            } else if (sortBy === 'date_desc') {
                const dateCompare = new Date(b.document_date) - new Date(a.document_date);
                if (dateCompare !== 0) return dateCompare;
                const numA = parseInt((a.document_numero || '0').replace(/\D/g, '')) || 0;
                const numB = parseInt((b.document_numero || '0').replace(/\D/g, '')) || 0;
                return numB - numA;
            } else if (sortBy === 'amount_asc') {
                const amountCompare = (parseFloat(a.total_ht) || 0) - (parseFloat(b.total_ht) || 0);
                if (amountCompare !== 0) return amountCompare;
                return new Date(a.document_date) - new Date(b.document_date);
            } else if (sortBy === 'amount_desc') {
                const amountCompare = (parseFloat(b.total_ht) || 0) - (parseFloat(a.total_ht) || 0);
                if (amountCompare !== 0) return amountCompare;
                return new Date(b.document_date) - new Date(a.document_date);
            }
            return 0;
        });
        
        // Load jsPDF if needed
        if (typeof window.jspdf === 'undefined') {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
            await new Promise((resolve, reject) => {
                script.onload = resolve;
                script.onerror = reject;
                document.head.appendChild(script);
            });
        }
        
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        const darkGrayColor = [96, 125, 139]; // #607D8B
        const lightGrayBg = [236, 239, 241]; // #ECEFF1
        
        const monthNames = ['', 'JANVIER', 'FEVRIER', 'MARS', 'AVRIL', 'MAI', 'JUIN', 
                           'JUILLET', 'AOUT', 'SEPTEMBRE', 'OCTOBRE', 'NOVEMBRE', 'DECEMBRE'];
        
        let pageNumber = 1;
        const pages = [];
        
        // Add first page header
        addHeaderToPDFMulti(doc, client, month, year, monthNames, darkGrayColor, lightGrayBg);
        
        // Table Header - Gray background
        const startY = 60;
        doc.setFillColor(...darkGrayColor);
        doc.rect(15, startY, 180, 7, 'F');
        
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(9);
        doc.setFont(undefined, 'bold');
        doc.text('TYPE', 18, startY + 5);
        doc.text('NUMERO', 55, startY + 5);
        doc.text('DATE', 115, startY + 5);
        doc.text('PRIX TOTAL HT', 188, startY + 5, { align: 'right' });
        
        // Table Body
        let currentY = startY + 10;
        doc.setTextColor(0, 0, 0);
        doc.setFont(undefined, 'normal');
        doc.setFontSize(9);
        
        let totalHT = 0;
        
        allInvoices.forEach((inv, index) => {
            const ht = parseFloat(inv.total_ht) || 0;
            totalHT += ht;
            
            let typeLabel = '';
            let mainNumero = '';
            
            if (inv.document_type === 'facture') {
                typeLabel = 'FACTURE';
                mainNumero = inv.document_numero || '-';
            } else if (inv.document_type === 'devis') {
                typeLabel = 'DEVIS';
                mainNumero = inv.document_numero_devis || inv.document_numero || '-';
            }
            
            // Increase row height if Order number or BL exists
            const hasOrderOrBL = (includeOrder && inv.document_numero_Order) || (includeBL && inv.document_numero_BL);
            const rowHeight = hasOrderOrBL ? 10 : 8;
            
            // Check if we need a new page BEFORE drawing
            if (currentY + rowHeight > 220) {
                pages.push(pageNumber);
                doc.addPage();
                addHeaderToPDFMulti(doc, client, month, year, monthNames, darkGrayColor, lightGrayBg);
                pageNumber++;
                
                // Re-draw table header on new page
                const newStartY = 60;
                doc.setFillColor(...darkGrayColor);
                doc.rect(15, newStartY, 180, 7, 'F');
                
                doc.setTextColor(255, 255, 255);
                doc.setFontSize(9);
                doc.setFont(undefined, 'bold');
                doc.text('TYPE', 18, newStartY + 5);
                doc.text('NUMERO', 55, newStartY + 5);
                doc.text('DATE', 115, newStartY + 5);
                doc.text('PRIX TOTAL HT', 188, newStartY + 5, { align: 'right' });
                
                currentY = newStartY + 10;
                doc.setTextColor(0, 0, 0);
                doc.setFont(undefined, 'normal');
                doc.setFontSize(9);
            }
            
            // Alternating row colors - extend height for rows with Order number or BL
            if (index % 2 === 0) {
                doc.setFillColor(245, 245, 245);
                const bgHeight = hasOrderOrBL ? rowHeight + 1 : rowHeight;
                doc.rect(15, currentY - 3, 180, bgHeight, 'F');
            }
            
            // TYPE column
            doc.setFontSize(8);
            doc.setFont(undefined, 'normal');
            doc.setTextColor(0, 0, 0);
            doc.text(typeLabel, 18, currentY + 3);
            
            // NUMERO column (with Order number and/or BL if exists)
            doc.setFontSize(8);
            doc.setFont(undefined, 'normal');
            doc.text(mainNumero, 55, currentY + 3);
            
            // Add Order number and/or BL below if exists (smaller font)
            if (includeOrder && inv.document_numero_Order && includeBL && inv.document_numero_BL) {
                doc.setFontSize(6.5);
                doc.setTextColor(33, 150, 243);
                doc.text(`Order: ${inv.document_numero_Order}`, 55, currentY + 6);
                doc.setTextColor(76, 175, 80);
                doc.text(`| BL: ${inv.document_numero_BL}`, 55 + doc.getTextWidth(`Order: ${inv.document_numero_Order} `) + 1, currentY + 6);
                doc.setTextColor(0, 0, 0);
            } else if (includeOrder && inv.document_numero_Order) {
                doc.setFontSize(6.5);
                doc.setTextColor(33, 150, 243);
                doc.text(`Order: ${inv.document_numero_Order}`, 55, currentY + 6);
                doc.setTextColor(0, 0, 0);
            } else if (includeBL && inv.document_numero_BL) {
                doc.setFontSize(6.5);
                doc.setTextColor(76, 175, 80);
                doc.text(`BL: ${inv.document_numero_BL}`, 55, currentY + 6);
                doc.setTextColor(0, 0, 0);
            }
            
            // DATE column
            doc.setFontSize(8);
            doc.text(new Date(inv.document_date).toLocaleDateString('fr-FR'), 115, currentY + 3);
            
            // PRIX TOTAL HT column
            doc.setFontSize(7.5);
            doc.text(`${formatAmountMulti(ht)} DH`, 188, currentY + 3, { align: 'right' });
            
            currentY += rowHeight;
        });
        
        // Fixed position for Remarques and Totals
        const fixedBottomY = 235;
        
        // Check if we need a new page for totals
        if (currentY > fixedBottomY - 10) {
            pages.push(pageNumber);
            pageNumber++;
            doc.addPage();
            addHeaderToPDFMulti(doc, client, month, year, monthNames, darkGrayColor, lightGrayBg);
        }
        
        const montantTVA = totalHT * 0.2;
        const totalTTC = totalHT + montantTVA;
        
        // Remarques section - Left side
        doc.setFillColor(...darkGrayColor);
        doc.rect(15, fixedBottomY, 85, 6, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(8);
        doc.setFont(undefined, 'bold');
        doc.text('Remarques et instructions de paiement :', 17, fixedBottomY + 4);
        
        doc.setFillColor(255, 255, 255);
        doc.rect(15, fixedBottomY + 6, 85, 12, 'F');
        doc.setDrawColor(200, 200, 200);
        doc.setLineWidth(0.1);
        doc.rect(15, fixedBottomY + 6, 85, 12);
        doc.setTextColor(0, 0, 0);
        doc.setFont(undefined, 'normal');
        doc.setFontSize(8);
        doc.text('ATTIJARI WAFA BANQ', 17, fixedBottomY + 10);
        doc.text('RIB : 007 720 0005979000000953 03', 17, fixedBottomY + 15);
        
        // Totals - Right side with gray background (same Y position)
        doc.setFillColor(...darkGrayColor);
        doc.rect(110, fixedBottomY, 85, 6, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(9);
        doc.setFont(undefined, 'bold');
        doc.text('TOTALE HT', 113, fixedBottomY + 4);
        doc.text(`${formatAmountMulti(totalHT)} DH`, 192, fixedBottomY + 4, { align: 'right' });
        
        doc.setFillColor(255, 255, 255);
        doc.rect(110, fixedBottomY + 6, 85, 6, 'F');
        doc.setDrawColor(200, 200, 200);
        doc.rect(110, fixedBottomY + 6, 85, 6);
        doc.setTextColor(0, 0, 0);
        doc.text('TVA 20%', 113, fixedBottomY + 10);
        doc.text(`${formatAmountMulti(montantTVA)} DH`, 192, fixedBottomY + 10, { align: 'right' });
        
        doc.setFillColor(...darkGrayColor);
        doc.rect(110, fixedBottomY + 12, 85, 6, 'F');
        doc.setTextColor(255, 255, 255);
        doc.text('TOTALE TTC', 113, fixedBottomY + 16);
        doc.text(`${formatAmountMulti(totalTTC)} DH`, 192, fixedBottomY + 16, { align: 'right' });
        
        // Amount in words
        const amountInWords = numberToFrenchWordsMulti(totalTTC);
        
        // Determine document type based on selected invoices
        const documentTypes = new Set(allInvoices.map(inv => inv.document_type));
        let shouldShowText = false;
        let documentLabel = '';
        let genderPrefix = '';
        let genderSuffix = '';
        
        // Only show text if EXACTLY ONE type is selected AND it's Facture or Devis
        if (documentTypes.size === 1) {
            const singleType = Array.from(documentTypes)[0];
            if (singleType === 'facture') {
                documentLabel = 'Facture';
                genderPrefix = 'La Présente';
                genderSuffix = 'Arrêtée';
                shouldShowText = true;
            } else if (singleType === 'devis') {
                documentLabel = 'Devis';
                genderPrefix = 'Le Présent';
                genderSuffix = 'Arrêté';
                shouldShowText = true;
            }
        }
        
        if (shouldShowText) {
            doc.setTextColor(0, 0, 0);
            doc.setFontSize(9);
            doc.setFont(undefined, 'italic');
            doc.text(`${genderPrefix} ${documentLabel} est ${genderSuffix} à la somme de : ${amountInWords}`, 15, fixedBottomY + 25, { maxWidth: 180 });
        }
        
        // Add page numbering to all pages
        pages.push(pageNumber);
        const totalPages = pages.length;
        
        for (let i = 0; i < totalPages; i++) {
            doc.setPage(i + 1);
            addFooterToPDFMulti(doc, i + 1, totalPages);
        }
        
        // Save PDF
        const monthName = monthNames[month];
        const filename = `Situation_${monthName}_${year}_${client.nom.replace(/\s+/g, '_')}.pdf`;
        doc.save(filename);
        
        window.notify.success('Succès', 'Situation mensuelle générée avec succès', 3000);
        
    } catch (error) {
        console.error('Error generating situation:', error);
        window.notify.error('Erreur', 'Impossible de générer la situation: ' + error.message, 4000);
    }
}

// Convert number to French words
function numberToFrenchWordsMulti(number) {
    const units = ['', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf'];
    const teens = ['dix', 'onze', 'douze', 'treize', 'quatorze', 'quinze', 'seize', 'dix-sept', 'dix-huit', 'dix-neuf'];
    const tens = ['', '', 'vingt', 'trente', 'quarante', 'cinquante', 'soixante', 'soixante', 'quatre-vingt', 'quatre-vingt'];
    
    function convertLessThanThousand(n) {
        if (n === 0) return '';
        if (n < 10) return units[n];
        if (n < 20) return teens[n - 10];
        if (n < 70) {
            const ten = Math.floor(n / 10);
            const unit = n % 10;
            if (unit === 0) return tens[ten];
            if (unit === 1 && ten === 2) return 'vingt et un';
            if (unit === 1 && ten > 2) return tens[ten] + ' et un';
            return tens[ten] + '-' + units[unit];
        }
        if (n < 80) {
            const remainder = n - 60;
            if (remainder < 10) return 'soixante-' + units[remainder];
            return 'soixante-' + teens[remainder - 10];
        }
        if (n < 100) {
            const remainder = n - 80;
            if (remainder === 0) return 'quatre-vingts';
            if (remainder < 10) return 'quatre-vingt-' + units[remainder];
            return 'quatre-vingt-' + teens[remainder - 10];
        }
        
        const hundred = Math.floor(n / 100);
        const remainder = n % 100;
        let result = hundred === 1 ? 'cent' : units[hundred] + ' cent';
        if (hundred > 1 && remainder === 0) result += 's';
        if (remainder > 0) result += ' ' + convertLessThanThousand(remainder);
        return result;
    }
    
    function convertNumber(n) {
        if (n === 0) return 'zéro';
        if (n < 1000) return convertLessThanThousand(n);
        
        // Billions (milliards)
        if (n >= 1000000000) {
            const billion = Math.floor(n / 1000000000);
            const remainder = n % 1000000000;
            let result = billion === 1 ? 'un milliard' : convertLessThanThousand(billion) + ' milliards';
            if (remainder > 0) result += ' ' + convertNumber(remainder);
            return result;
        }
        
        // Millions
        if (n >= 1000000) {
            const million = Math.floor(n / 1000000);
            const remainder = n % 1000000;
            let result = million === 1 ? 'un million' : convertLessThanThousand(million) + ' millions';
            if (remainder > 0) result += ' ' + convertNumber(remainder);
            return result;
        }
        
        // Thousands
        const thousand = Math.floor(n / 1000);
        const remainder = n % 1000;
        let result = thousand === 1 ? 'mille' : convertLessThanThousand(thousand) + ' mille';
        if (remainder > 0) result += ' ' + convertLessThanThousand(remainder);
        return result;
    }
    
    const parts = number.toFixed(2).split('.');
    const dirhams = parseInt(parts[0]);
    const centimes = parseInt(parts[1]);
    
    let result = convertNumber(dirhams) + ' dirham';
    if (dirhams > 1) result += 's';
    
    if (centimes > 0) {
        result += ' et ' + convertNumber(centimes) + ' centime';
        if (centimes > 1) result += 's';
    } else {
        result += ' et zéro centime';
    }
    
    return result.charAt(0).toUpperCase() + result.slice(1);
}

// Show invoice selection modal
async function showInvoiceSelectionModalMulti(clientId, month, year, preSelectedInvoices = []) {
    try {
        // Get all invoices for this client and period
        const result = await window.electron.dbMulti.getAllInvoices('MULTI');
        if (!result.success) {
            throw new Error('Impossible de charger les factures');
        }
        
        // Filter invoices by client, month, and year
        const allInvoices = result.data.filter(inv => {
            const invDate = new Date(inv.document_date);
            const invMonth = invDate.getMonth() + 1;
            const invYear = invDate.getFullYear();
            return inv.client_id == clientId && invMonth === month && invYear === year;
        });
        
        // Store for filtering
        let currentFilter = 'all';
        let filteredInvoices = [...allInvoices];
        
        function renderInvoicesList() {
            const container = document.getElementById('invoicesListContainer');
            if (!container) return;
            
            container.innerHTML = filteredInvoices.map(inv => {
                const isSelected = selectedInvoices.includes(inv.id);
                const docType = inv.document_type === 'devis' ? 'Devis' : inv.document_type === 'situation' ? 'Situation' : 'Facture';
                const docNum = inv.document_numero || inv.document_numero_devis || 'N/A';
                const date = new Date(inv.document_date).toLocaleDateString('fr-FR');
                const amount = parseFloat(inv.total_ttc || 0).toFixed(2);
                
                return `
                    <div class="invoice-selection-item ${isSelected ? 'selected' : ''}" data-invoice-id="${inv.id}">
                        <input type="checkbox" class="invoice-checkbox" ${isSelected ? 'checked' : ''} data-invoice-id="${inv.id}">
                        <div class="invoice-info">
                            <div class="invoice-info-item">
                                <div class="invoice-info-label">Type</div>
                                <div class="invoice-info-value">${docType}</div>
                            </div>
                            <div class="invoice-info-item">
                                <div class="invoice-info-label">Numéro</div>
                                <div class="invoice-info-value">
                                    ${docNum}
                                    ${inv.document_numero_Order ? `<div style="font-size:0.75rem;color:#999;margin-top:0.25rem;">Order: ${inv.document_numero_Order}</div>` : ''}
                                </div>
                            </div>
                            <div class="invoice-info-item">
                                <div class="invoice-info-label">Date</div>
                                <div class="invoice-info-value">${date}</div>
                            </div>
                            <div class="invoice-info-item">
                                <div class="invoice-info-label">Montant TTC</div>
                                <div class="invoice-amount">${amount} DH</div>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
            
            // Update count
            document.getElementById('totalCountDisplay').textContent = filteredInvoices.length;
        }
        
        if (allInvoices.length === 0) {
            window.notify.error('Erreur', 'Aucune facture trouvée pour cette période', 3000);
            return;
        }
        
        // Create modal overlay
        const overlay = document.createElement('div');
        overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.95);z-index:1000000;display:flex;align-items:center;justify-content:center;animation:fadeIn 0.2s;';
        
        const modal = document.createElement('div');
        modal.style.cssText = 'background:#1e1e1e;border:3px solid #4caf50;border-radius:16px;padding:2rem;width:90%;max-width:900px;max-height:85vh;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 20px 60px rgba(0,0,0,0.9);';
        
        // Initialize selected invoices
        let selectedInvoices = [...preSelectedInvoices];
        
        modal.innerHTML = `
            <style>
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                .invoice-selection-item {
                    padding: 1rem;
                    background: #2d2d30;
                    border: 2px solid #3e3e42;
                    border-radius: 8px;
                    margin-bottom: 0.75rem;
                    cursor: pointer;
                    transition: all 0.3s;
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }
                .invoice-selection-item:hover {
                    border-color: #4caf50;
                    background: #2a2a2d;
                }
                .invoice-selection-item.selected {
                    border-color: #4caf50;
                    background: rgba(76, 175, 80, 0.1);
                }
                .invoice-checkbox {
                    width: 24px;
                    height: 24px;
                    cursor: pointer;
                    accent-color: #4caf50;
                }
                .invoice-info {
                    flex: 1;
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                    gap: 0.5rem;
                }
                .invoice-info-item {
                    display: flex;
                    flex-direction: column;
                }
                .invoice-info-label {
                    color: #999;
                    font-size: 0.75rem;
                    margin-bottom: 0.25rem;
                }
                .invoice-info-value {
                    color: #fff;
                    font-weight: 600;
                    font-size: 0.9rem;
                }
                .invoice-amount {
                    color: #4caf50;
                    font-size: 1.1rem;
                    font-weight: 700;
                }
            </style>
            
            <div style="text-align:center;margin-bottom:1.5rem;">
                <div style="font-size:2.5rem;margin-bottom:0.5rem;">📋</div>
                <h2 style="color:#fff;margin:0;font-size:1.5rem;font-weight:600;">Sélection des factures</h2>
                <p style="color:#999;margin-top:0.5rem;font-size:0.9rem;">Choisissez les factures à inclure dans la situation mensuelle</p>
            </div>
            
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;padding:1rem;background:#2d2d30;border-radius:8px;gap:1rem;">
                <div style="display:flex;flex-direction:column;gap:0.5rem;">
                    <div style="color:#4caf50;font-weight:600;font-size:1rem;">
                        <span id="selectedCountDisplay">0</span> / <span id="totalCountDisplay">${allInvoices.length}</span> affichées
                    </div>
                    <div style="color:#ff9800;font-weight:600;font-size:0.9rem;">
                        Total sélectionné: <span id="totalSelectedCount">0</span> / ${allInvoices.length}
                    </div>
                </div>
                <div style="display:flex;gap:0.5rem;">
                    <button id="filterAllBtn" style="padding:0.5rem 1rem;background:#2196f3;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:0.85rem;font-weight:600;">
                        📋 Tous
                    </button>
                    <button id="filterFactureBtn" style="padding:0.5rem 1rem;background:#2196f3;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:0.85rem;font-weight:600;">
                        📄 Facture
                    </button>
                    <button id="filterDevisBtn" style="padding:0.5rem 1rem;background:#2196f3;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:0.85rem;font-weight:600;">
                        📝 Devis
                    </button>
                </div>
            </div>
            
            <div style="display:flex;justify-content:flex-end;gap:0.5rem;margin-bottom:1rem;">
                <button id="selectAllBtn" style="padding:0.5rem 1rem;background:#4caf50;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:0.85rem;font-weight:600;">
                    ✓ Tout sélectionner
                </button>
                <button id="deselectAllBtn" style="padding:0.5rem 1rem;background:#f44336;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:0.85rem;font-weight:600;">
                    ✗ Tout désélectionner
                </button>
            </div>
            
            <div id="invoicesListContainer" style="flex:1;overflow-y:auto;margin-bottom:1.5rem;padding-right:0.5rem;">
            </div>
            
            <div style="display:flex;gap:1rem;">
                <button id="cancelSelectionBtn" style="flex:1;padding:1rem;background:#3e3e42;color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:1rem;font-weight:600;">
                    Annuler
                </button>
                <button id="confirmSelectionBtn" style="flex:1;padding:1rem;background:#4caf50;color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:1rem;font-weight:600;">
                    ✓ Confirmer la sélection
                </button>
            </div>
        `;
        
        overlay.appendChild(modal);
        document.body.appendChild(overlay);
        
        // Render initial list
        renderInvoicesList();
        
        // Update selected count display
        function updateSelectedCount() {
            const countDisplay = document.getElementById('selectedCountDisplay');
            const totalSelectedDisplay = document.getElementById('totalSelectedCount');
            
            if (countDisplay) {
                // Count only selected invoices that are in the filtered list
                const selectedInFilteredList = selectedInvoices.filter(id => 
                    filteredInvoices.some(inv => inv.id === id)
                );
                countDisplay.textContent = selectedInFilteredList.length;
            }
            
            if (totalSelectedDisplay) {
                // Show total selected from ALL invoices
                totalSelectedDisplay.textContent = selectedInvoices.length;
            }
        }
        
        // Handle checkbox changes
        modal.addEventListener('change', (e) => {
            if (e.target.classList.contains('invoice-checkbox')) {
                const invoiceId = parseInt(e.target.dataset.invoiceId);
                const item = e.target.closest('.invoice-selection-item');
                
                if (e.target.checked) {
                    if (!selectedInvoices.includes(invoiceId)) {
                        selectedInvoices.push(invoiceId);
                    }
                    item.classList.add('selected');
                } else {
                    selectedInvoices = selectedInvoices.filter(id => id !== invoiceId);
                    item.classList.remove('selected');
                }
                
                updateSelectedCount();
            }
        });
        
        // Handle item clicks
        modal.addEventListener('click', (e) => {
            const item = e.target.closest('.invoice-selection-item');
            if (item && !e.target.classList.contains('invoice-checkbox')) {
                const checkbox = item.querySelector('.invoice-checkbox');
                if (checkbox) {
                    checkbox.checked = !checkbox.checked;
                    checkbox.dispatchEvent(new Event('change', { bubbles: true }));
                }
            }
        });
        
        // Filter buttons
        document.getElementById('filterAllBtn').onclick = () => {
            filteredInvoices = [...allInvoices];
            renderInvoicesList();
            updateSelectedCount();
        };
        
        document.getElementById('filterFactureBtn').onclick = () => {
            filteredInvoices = allInvoices.filter(inv => inv.document_type === 'facture');
            renderInvoicesList();
            updateSelectedCount();
        };
        
        document.getElementById('filterDevisBtn').onclick = () => {
            filteredInvoices = allInvoices.filter(inv => inv.document_type === 'devis');
            renderInvoicesList();
            updateSelectedCount();
        };
        
        // Select all button
        document.getElementById('selectAllBtn').onclick = () => {
            // Select all visible (filtered) invoices
            filteredInvoices.forEach(inv => {
                if (!selectedInvoices.includes(inv.id)) {
                    selectedInvoices.push(inv.id);
                }
            });
            renderInvoicesList();
            updateSelectedCount();
        };
        
        // Deselect all button
        document.getElementById('deselectAllBtn').onclick = () => {
            // Deselect all visible (filtered) invoices
            filteredInvoices.forEach(inv => {
                selectedInvoices = selectedInvoices.filter(id => id !== inv.id);
            });
            renderInvoicesList();
            updateSelectedCount();
        };
        
        // Cancel button
        document.getElementById('cancelSelectionBtn').onclick = () => {
            overlay.remove();
        };
        
        // Confirm button
        document.getElementById('confirmSelectionBtn').onclick = () => {
            if (selectedInvoices.length === 0) {
                window.notify.error('Erreur', 'Veuillez sélectionner au moins une facture', 3000);
                return;
            }
            
            // Update the parent modal
            if (typeof window.updateSelectedInvoicesMulti === 'function') {
                window.updateSelectedInvoicesMulti(selectedInvoices);
            }
            
            overlay.remove();
            window.notify.success('Succès', `${selectedInvoices.length} facture(s) sélectionnée(s)`, 2000);
        };
        
        // Prevent closing on overlay click
        overlay.onclick = (e) => {
            e.stopPropagation();
        };
        
        updateSelectedCount();
        
    } catch (error) {
        console.error('Error showing invoice selection modal:', error);
        window.notify.error('Erreur', 'Impossible d\'afficher la sélection: ' + error.message, 4000);
    }
}

// Show add manual invoice modal
async function showAddManualInvoiceModalMulti(existingInvoices = []) {
    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.95);z-index:1000001;display:flex;align-items:center;justify-content:center;animation:fadeIn 0.2s;';
    
    // Get next invoice number from database
    const now = new Date();
    const year = now.getFullYear();
    let nextNumber = 1;
    
    console.log('🔢 [SITUATION] Getting next invoice number for year:', year);
    
    try {
        const result = await window.electron.dbMulti.getNextInvoiceNumber('MULTI', 'facture', year);
        console.log('🔢 [SITUATION] Received result from getNextInvoiceNumber:', result);
        
        if (result.success && result.data) {
            nextNumber = result.data.nextNumber || 1;
            console.log('🔢 [SITUATION] Next number extracted:', nextNumber);
        } else {
            console.warn('⚠️ [SITUATION] Failed to get next number, using default 1');
        }
    } catch (error) {
        console.error('❌ [SITUATION] Error getting next invoice number:', error);
    }
    
    const defaultNumero = String(nextNumber).padStart(3, '0');
    console.log('🔢 [SITUATION] Default numero formatted:', defaultNumero);
    console.log('🔢 [SITUATION] Full invoice number will be: MTT' + defaultNumero + year);
    
    const modal = document.createElement('div');
    modal.style.cssText = 'background:#1e1e1e;border:3px solid #ff9800;border-radius:16px;padding:2rem;width:90%;max-width:700px;max-height:90vh;overflow-y:auto;box-shadow:0 20px 60px rgba(0,0,0,0.9);';
    
    modal.innerHTML = `
        <style>
            @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
            .input-method-option {
                padding: 1rem;
                background: #2d2d30;
                border: 2px solid #3e3e42;
                border-radius: 8px;
                cursor: pointer;
                transition: all 0.3s;
                text-align: center;
            }
            .input-method-option:hover {
                border-color: #ff9800;
            }
            .input-method-option.active {
                border-color: #ff9800;
                background: rgba(255, 152, 0, 0.1);
            }
            .input-method-option input[type="radio"] {
                margin-right: 0.5rem;
            }
        </style>
        
        <div style="text-align:center;margin-bottom:1.5rem;">
            <div style="font-size:2.5rem;margin-bottom:0.5rem;">📝</div>
            <h2 style="color:#fff;margin:0;font-size:1.5rem;font-weight:600;">Ajouter une facture manuelle</h2>
            <p style="color:#999;margin-top:0.5rem;font-size:0.9rem;">Saisissez les informations de la facture</p>
        </div>
        
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1.5rem;">
            <div>
                <label style="display:block;color:#ff9800;margin-bottom:0.5rem;font-weight:600;">Type de document *</label>
                <select id="manualInvoiceType" onchange="updateNumeroForTypeMulti()" style="width:100%;padding:0.75rem;background:#2d2d30;border:2px solid #3e3e42;border-radius:8px;color:#fff;font-size:1rem;">
                    <option value="FACTURE">Facture</option>
                    <option value="DEVIS">Devis</option>
                </select>
            </div>
            <div>
                <label style="display:block;color:#ff9800;margin-bottom:0.5rem;font-weight:600;">Numéro *</label>
                <input type="text" id="manualInvoiceNumero" placeholder="Ex: MTT0012025" value="MTT${defaultNumero}${year}" style="width:100%;padding:0.75rem;background:#2d2d30;border:2px solid #3e3e42;border-radius:8px;color:#4caf50;font-size:1rem;font-weight:600;" onblur="formatManualInvoiceNumberMulti(this)">
                <small style="color:#999;font-size:0.85rem;">Numéro suggéré - vous pouvez le modifier si nécessaire</small>
            </div>
        </div>
        
        <!-- N° Order (Optional for FACTURE) -->
        <div id="orderFieldContainerMulti" style="margin-bottom:1.5rem;">
            <label style="display:flex;align-items:center;cursor:pointer;margin-bottom:0.75rem;">
                <input type="checkbox" id="toggleOrderMulti" onchange="toggleOrderFieldMulti()" style="width:18px;height:18px;margin-right:0.75rem;cursor:pointer;accent-color:#2196F3;">
                <div>
                    <div style="color:#2196F3;font-weight:600;font-size:1rem;">📋 Ajouter N° Order (Optionnel)</div>
                    <div style="color:#999;font-size:0.85rem;margin-top:0.25rem;">Cochez pour ajouter un numéro de commande</div>
                </div>
            </label>
            <div id="orderFieldMulti" style="display:none;margin-top:0.75rem;">
                <label style="display:block;color:#2196F3;margin-bottom:0.5rem;font-weight:600;">N° Order</label>
                <input type="text" id="manualInvoiceOrderMulti" placeholder="Ex: 123" onblur="autoFormatOrderMulti(this, ${year})" style="width:100%;padding:0.75rem;background:#1e1e1e;border:2px solid #2196F3;border-radius:8px;color:#fff;font-size:1rem;">
                <small style="color:#999;font-size:0.85rem;display:block;margin-top:0.25rem;">Ex: 123 → 123/${year}</small>
            </div>
        </div>
        
        <div style="margin-bottom:1.5rem;">
            <label style="display:block;color:#ff9800;margin-bottom:0.5rem;font-weight:600;">Date *</label>
            <input type="date" id="manualInvoiceDate" style="width:100%;padding:0.75rem;background:#2d2d30;border:2px solid #3e3e42;border-radius:8px;color:#fff;font-size:1rem;">
        </div>
        
        <div style="margin-bottom:1.5rem;">
            <label style="display:block;color:#ff9800;margin-bottom:0.75rem;font-weight:600;">Méthode de calcul *</label>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;">
                <div class="input-method-option active" onclick="selectInputMethod('direct')">
                    <input type="radio" name="inputMethod" value="direct" checked>
                    <div style="color:#fff;font-weight:600;margin-bottom:0.25rem;">💰 Montant direct</div>
                    <div style="color:#999;font-size:0.85rem;">Saisir le montant HT</div>
                </div>
                <div class="input-method-option" onclick="selectInputMethod('products')">
                    <input type="radio" name="inputMethod" value="products">
                    <div style="color:#fff;font-weight:600;margin-bottom:0.25rem;">📦 Depuis produits</div>
                    <div style="color:#999;font-size:0.85rem;">Calculer depuis les produits</div>
                </div>
            </div>
        </div>
        
        <div id="directAmountSection" style="margin-bottom:1.5rem;">
            <label style="display:block;color:#ff9800;margin-bottom:0.5rem;font-weight:600;">Montant HT (DH) *</label>
            <input type="number" id="manualInvoiceMontant" placeholder="0.00" step="0.01" min="0" style="width:100%;padding:0.75rem;background:#2d2d30;border:2px solid #3e3e42;border-radius:8px;color:#fff;font-size:1rem;">
        </div>
        
        <div id="productsSection" style="display:none;margin-bottom:1.5rem;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem;">
                <label style="color:#ff9800;font-weight:600;">Produits</label>
                <button id="addProductBtn" style="padding:0.5rem 1rem;background:#4caf50;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:0.9rem;font-weight:600;">
                    ➕ Ajouter un produit
                </button>
            </div>
            <div id="productsList" style="display:flex;flex-direction:column;gap:0.5rem;max-height:200px;overflow-y:auto;"></div>
            <div style="margin-top:1rem;padding:1rem;background:#2d2d30;border-radius:8px;">
                <div style="display:flex;justify-content:space-between;color:#fff;">
                    <span style="font-weight:600;">Total HT:</span>
                    <span id="productsTotal" style="color:#ff9800;font-weight:700;font-size:1.1rem;">0.00 DH</span>
                </div>
            </div>
        </div>
        
        <div style="margin-bottom:1.5rem;padding:1rem;background:#2d2d30;border:2px solid #4caf50;border-radius:8px;">
            <label style="display:flex;align-items:center;cursor:pointer;">
                <input type="checkbox" id="saveToDatabase" style="width:20px;height:20px;margin-right:0.75rem;cursor:pointer;accent-color:#4caf50;">
                <div>
                    <div style="color:#4caf50;font-weight:600;font-size:1rem;">💾 Enregistrer dans la base de données</div>
                    <div style="color:#999;font-size:0.85rem;margin-top:0.25rem;">Cette facture sera sauvegardée et apparaîtra dans les listes</div>
                </div>
            </label>
        </div>
        
        <div style="display:flex;gap:1rem;">
            <button id="cancelManualInvoiceBtn" style="flex:1;padding:1rem;background:#3e3e42;color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:1rem;font-weight:600;">
                Annuler
            </button>
            <button id="addManualInvoiceBtn" style="flex:1;padding:1rem;background:#ff9800;color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:1rem;font-weight:600;">
                ✓ Ajouter
            </button>
        </div>
    `;
    
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    
    // Set today's date as default
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('manualInvoiceDate').value = today;
    
    // Update numero when type changes
    window.updateNumeroForTypeMulti = async function() {
        const type = document.getElementById('manualInvoiceType').value;
        const numeroInput = document.getElementById('manualInvoiceNumero');
        const orderContainer = document.getElementById('orderFieldContainerMulti');
        
        // Show/hide N° Order based on type
        if (type === 'FACTURE') {
            orderContainer.style.display = 'block';
        } else {
            orderContainer.style.display = 'none';
            document.getElementById('toggleOrderMulti').checked = false;
            document.getElementById('orderFieldMulti').style.display = 'none';
            document.getElementById('manualInvoiceOrderMulti').value = '';
        }
        
        // Get next number for the selected type
        try {
            const result = await window.electron.dbMulti.getNextInvoiceNumber('MULTI', type.toLowerCase(), year);
            if (result.success && result.data) {
                const nextNum = result.data.nextNumber || 1;
                const formattedNum = String(nextNum).padStart(3, '0');
                numeroInput.value = 'MTT' + formattedNum + year;
            }
        } catch (error) {
            console.error('Error getting next number:', error);
        }
    };
    
    // Toggle N° Order field
    window.toggleOrderFieldMulti = function() {
        const checkbox = document.getElementById('toggleOrderMulti');
        const field = document.getElementById('orderFieldMulti');
        
        if (checkbox.checked) {
            field.style.display = 'block';
        } else {
            field.style.display = 'none';
            document.getElementById('manualInvoiceOrderMulti').value = '';
        }
    };
    
    // Auto-format N° Order - DO NOT add year automatically
    window.autoFormatOrderMulti = function(input, currentYear) {
        // Just keep the value as is, don't add /2025 automatically
        // User will type the full value themselves
    };
    
    // Products array
    let products = [];
    
    // Switch input method
    window.selectInputMethod = function(method) {
        const directSection = document.getElementById('directAmountSection');
        const productsSection = document.getElementById('productsSection');
        const options = document.querySelectorAll('.input-method-option');
        
        options.forEach(opt => opt.classList.remove('active'));
        
        if (method === 'direct') {
            directSection.style.display = 'block';
            productsSection.style.display = 'none';
            options[0].classList.add('active');
            document.querySelector('input[name="inputMethod"][value="direct"]').checked = true;
        } else {
            directSection.style.display = 'none';
            productsSection.style.display = 'block';
            options[1].classList.add('active');
            document.querySelector('input[name="inputMethod"][value="products"]').checked = true;
        }
    };
    
    // Calculate products total
    function updateProductsTotal() {
        const total = products.reduce((sum, p) => sum + (parseFloat(p.price) * parseInt(p.quantity)), 0);
        document.getElementById('productsTotal').textContent = total.toFixed(2) + ' DH';
        return total;
    }
    
    // Render products list
    function renderProducts() {
        const container = document.getElementById('productsList');
        if (products.length === 0) {
            container.innerHTML = '<div style="padding:1rem;text-align:center;color:#999;">Aucun produit ajouté</div>';
        } else {
            container.innerHTML = products.map((p, index) => `
                <div style="padding:0.75rem;background:#3e3e42;border-radius:6px;display:flex;justify-content:space-between;align-items:center;">
                    <div style="flex:1;">
                        <div style="color:#fff;font-weight:600;">${p.name}</div>
                        <div style="color:#999;font-size:0.85rem;">${p.quantity} × ${parseFloat(p.price).toFixed(2)} DH = ${(p.quantity * p.price).toFixed(2)} DH</div>
                    </div>
                    <button onclick="removeProduct(${index})" style="padding:0.5rem;background:#f44336;color:#fff;border:none;border-radius:4px;cursor:pointer;">✗</button>
                </div>
            `).join('');
        }
        updateProductsTotal();
    }
    
    // Add product
    document.getElementById('addProductBtn').onclick = () => {
        showAddProductModal(products, renderProducts);
    };
    
    // Remove product
    window.removeProduct = function(index) {
        products.splice(index, 1);
        renderProducts();
    };
    
    // Cancel button
    document.getElementById('cancelManualInvoiceBtn').onclick = () => {
        overlay.remove();
    };
    
    // Add button
    document.getElementById('addManualInvoiceBtn').onclick = async () => {
        const type = document.getElementById('manualInvoiceType').value;
        const numero = document.getElementById('manualInvoiceNumero').value.trim();
        const date = document.getElementById('manualInvoiceDate').value;
        const inputMethod = document.querySelector('input[name="inputMethod"]:checked').value;
        const saveToDb = document.getElementById('saveToDatabase').checked;
        
        console.log('🔍 [MULTI DEBUG] Add button clicked');
        console.log('🔍 [MULTI DEBUG] Type:', type, 'Numero:', numero, 'Date:', date);
        console.log('🔍 [MULTI DEBUG] saveToDb:', saveToDb);
        console.log('📋 [MULTI DEBUG] existingInvoices length at start:', existingInvoices.length);
        
        let montant = 0;
        
        // Validation
        if (!numero) {
            window.notify.error('Erreur', 'Veuillez saisir un numéro', 3000);
            return;
        }
        
        if (!date) {
            window.notify.error('Erreur', 'Veuillez sélectionner une date', 3000);
            return;
        }
        
        // Get amount based on input method
        if (inputMethod === 'direct') {
            montant = parseFloat(document.getElementById('manualInvoiceMontant').value);
            if (isNaN(montant) || montant <= 0) {
                window.notify.error('Erreur', 'Veuillez saisir un montant valide', 3000);
                return;
            }
        } else {
            if (products.length === 0) {
                window.notify.error('Erreur', 'Veuillez ajouter au moins un produit', 3000);
                return;
            }
            montant = updateProductsTotal();
        }
        
        // Format date for display
        const dateObj = new Date(date);
        const formattedDate = dateObj.toLocaleDateString('fr-FR');
        
        // Check for duplicate invoice number (both in DB and manual list)
        console.log('🔍 [MULTI DUPLICATE CHECK] Checking for numero:', numero);
        
        // Check in database
        const checkResult = await window.electron.dbMulti.getAllInvoices('MULTI');
        if (checkResult.success && checkResult.data) {
            const existingInvoice = checkResult.data.find(inv => 
                inv.document_numero === numero || inv.document_numero_devis === numero
            );
            if (existingInvoice) {
                window.notify.error('Erreur', `Le numéro ${numero} existe déjà dans la base de données! Veuillez utiliser un autre numéro.`, 4000);
                console.error('❌ [MULTI DUPLICATE CHECK] Invoice number exists in DB:', numero);
                return;
            }
        }
        
        // Check in manual invoices list
        if (existingInvoices && existingInvoices.length > 0) {
            const duplicateManual = existingInvoices.find(inv => inv.numero === numero);
            if (duplicateManual) {
                window.notify.error('Erreur', `Le numéro ${numero} existe déjà dans les factures manuelles! Veuillez utiliser un autre numéro.`, 4000);
                console.error('❌ [MULTI DUPLICATE CHECK] Invoice number exists in manual list:', numero);
                return;
            }
        }
        
        // Check for duplicate N° Order if provided (for FACTURE)
        if (type === 'FACTURE') {
            const orderCheckbox = document.getElementById('toggleOrderMulti');
            if (orderCheckbox && orderCheckbox.checked) {
                const orderValue = document.getElementById('manualInvoiceOrderMulti')?.value?.trim();
                if (orderValue) {
                    // Check in database
                    const duplicateOrder = checkResult.data.find(inv => 
                        inv.document_type === 'facture' && 
                        inv.document_numero_Order && 
                        inv.document_numero_Order.trim() === orderValue
                    );
                    if (duplicateOrder) {
                        window.notify.error('Erreur', `Le N° Order "${orderValue}" existe déjà! Veuillez utiliser un autre numéro.`, 4000);
                        console.error('❌ [MULTI DUPLICATE CHECK] N° Order exists in DB:', orderValue);
                        return;
                    }
                    
                    // Check in manual invoices list
                    const duplicateOrderManual = existingInvoices.find(inv => 
                        inv.type === 'FACTURE' && 
                        inv.numeroOrder && 
                        inv.numeroOrder.trim() === orderValue
                    );
                    if (duplicateOrderManual) {
                        window.notify.error('Erreur', `Le N° Order "${orderValue}" existe déjà dans les factures manuelles! Veuillez utiliser un autre numéro.`, 4000);
                        console.error('❌ [MULTI DUPLICATE CHECK] N° Order exists in manual list:', orderValue);
                        return;
                    }
                }
            }
        }
        
        console.log('✅ [MULTI DUPLICATE CHECK] No duplicates found');
        
        // Save to database if requested
        console.log('🔍 [MULTI DEBUG] Checking saveToDb flag:', saveToDb);
        
        if (saveToDb) {
            console.log('💾 [MULTI DEBUG] Entering saveToDb block - will save to database');
            try {
                const clientId = document.getElementById('situationClientIdMulti').value;
                if (!clientId) {
                    window.notify.error('Erreur', 'Client non sélectionné', 3000);
                    return;
                }
                
                // Get client info from stored selection
                if (!window.selectedSituationClientMulti) {
                    window.notify.error('Erreur', 'Informations du client manquantes', 3000);
                    return;
                }
                
                const clientName = window.selectedSituationClientMulti.nom;
                const clientICE = window.selectedSituationClientMulti.ice;
                
                // Get optional N° Order if checkbox is checked
                let numeroOrder = null;
                const orderCheckbox = document.getElementById('toggleOrderMulti');
                if (orderCheckbox && orderCheckbox.checked) {
                    numeroOrder = document.getElementById('manualInvoiceOrderMulti')?.value || null;
                }
                
                // Prepare invoice data with all required fields
                const invoiceData = {
                    company_code: 'MULTI',
                    client: {
                        nom: clientName,
                        ICE: clientICE
                    },
                    document: {
                        type: type.toLowerCase(),
                        numero: numero,
                        date: date,
                        numero_Order: numeroOrder,
                        numero_BL: null,
                        numero_devis: type === 'devis' ? numero : null,
                        order_devis: null,
                        bon_de_livraison: null,
                        numero_commande: null
                    },
                    totals: {
                        total_ht: parseFloat(montant) || 0,
                        tva_rate: 20,
                        montant_tva: parseFloat(montant) * 0.2 || 0,
                        total_ttc: parseFloat(montant) * 1.2 || 0
                    },
                    products: inputMethod === 'products' ? products.map(p => ({
                        designation: p.name,
                        quantite: p.quantity,
                        prix_unitaire_ht: p.price,
                        total_ht: p.price * p.quantity
                    })) : []
                };
                
                console.log('📤 [SITUATION] Sending invoice data:', JSON.stringify(invoiceData, null, 2));
                console.log('📤 [SITUATION] Invoice numero being saved:', invoiceData.document.numero);
                
                // Save to database
                const result = await window.electron.dbMulti.createInvoice(invoiceData);
                console.log('📥 [SITUATION] Received result:', result);
                console.log('📥 [SITUATION] Result success:', result?.success);
                console.log('📥 [SITUATION] Result data:', result?.data);
                console.log('📥 [SITUATION] Result error:', result?.error);
                
                if (result && result.success) {
                    console.log('✅ [MULTI DEBUG] Invoice saved to DB successfully with ID:', result.invoiceId);
                    console.log('📋 [MULTI DEBUG] existingInvoices length BEFORE adding:', existingInvoices.length);
                    window.notify.success('Succès', 'Facture enregistrée dans la base de données', 2000);
                    
                    // Get optional N° Order for saved invoice
                    let numeroOrder = null;
                    const orderCheckbox = document.getElementById('toggleOrderMulti');
                    if (orderCheckbox && orderCheckbox.checked) {
                        numeroOrder = document.getElementById('manualInvoiceOrderMulti')?.value || null;
                    }
                    
                    // Add to manual list with savedToDb flag so it appears in the current session
                    const newInvoice = {
                        type: type,
                        numero: numero,
                        date: formattedDate,
                        dateRaw: date,
                        montant: montant.toFixed(2),
                        savedToDb: true,
                        invoiceId: result.invoiceId,
                        numeroOrder: numeroOrder
                    };
                    
                    existingInvoices.unshift(newInvoice);
                    console.log('📋 [MULTI DEBUG] existingInvoices length AFTER adding:', existingInvoices.length);
                    console.log('📋 [MULTI DEBUG] Added invoice:', newInvoice);
                    
                    // Update display
                    if (typeof window.updateManualInvoicesDisplayMulti === 'function') {
                        console.log('🔄 [MULTI DEBUG] Calling updateManualInvoicesDisplayMulti with', existingInvoices.length, 'invoices');
                        window.updateManualInvoicesDisplayMulti(existingInvoices);
                    }
                    
                    console.log('✅ [MULTI DEBUG] Closing overlay and RETURNING - should NOT continue');
                    overlay.remove();
                    return;
                } else {
                    const errorMsg = result && result.error ? result.error : 'Erreur inconnue';
                    window.notify.error('Erreur', 'Échec de l\'enregistrement: ' + errorMsg, 3000);
                    console.error('❌ Failed to save invoice. Full result:', result);
                    return;
                }
            } catch (error) {
                console.error('❌ Error saving to database:', error);
                window.notify.error('Erreur', 'Impossible d\'enregistrer dans la base', 3000);
                return;
            }
        }
        
        // Add to manual list only if NOT saved to DB
        console.log('⚠️ [MULTI DEBUG] Reached manual list section - this should ONLY happen if NOT saved to DB');
        console.log('📋 [MULTI DEBUG] existingInvoices length before manual add:', existingInvoices.length);
        
        // Get optional N° Order for manual invoice
        let numeroOrder = null;
        const orderCheckbox = document.getElementById('toggleOrderMulti');
        if (orderCheckbox && orderCheckbox.checked) {
            numeroOrder = document.getElementById('manualInvoiceOrderMulti')?.value || null;
        }
        
        const newInvoice = {
            type: type,
            numero: numero,
            date: formattedDate,
            dateRaw: date,
            montant: montant.toFixed(2),
            savedToDb: false,
            numeroOrder: numeroOrder
        };
        
        existingInvoices.unshift(newInvoice); // Add to beginning (newest first)
        console.log('📋 [MULTI DEBUG] existingInvoices length after manual add:', existingInvoices.length);
        console.log('📋 [MULTI DEBUG] Added manual invoice:', newInvoice);
        
        // Update display
        if (typeof window.updateManualInvoicesDisplayMulti === 'function') {
            console.log('🔄 [MULTI DEBUG] Calling updateManualInvoicesDisplayMulti (manual) with', existingInvoices.length, 'invoices');
            window.updateManualInvoicesDisplayMulti(existingInvoices);
        }
        
        console.log('✅ [MULTI DEBUG] Closing overlay after manual add');
        overlay.remove();
        window.notify.success('Succès', 'Facture ajoutée avec succès', 2000);
    };
    
    // Prevent closing on overlay click
    overlay.onclick = (e) => {
        e.stopPropagation();
    };
}

// Format manual invoice number on blur
window.formatManualInvoiceNumberMulti = function(input) {
    let value = input.value.trim();
    
    // If empty, do nothing
    if (!value) return;
    
    // Check if already fully formatted (MTT + numbers + year)
    if (value.startsWith('MTT') && value.endsWith('2025') && value.length >= 10) {
        input.style.color = '#4caf50';
        input.style.fontWeight = '600';
        return; // Already formatted correctly
    }
    
    // Extract only numbers from the input
    let numbers = value.replace(/\D/g, '');
    
    // If we have numbers, format them
    if (numbers) {
        const currentYear = new Date().getFullYear();
        // Pad with zeros if needed (minimum 2 digits)
        numbers = numbers.padStart(2, '0');
        // Format: MTT + numbers + year
        input.value = `MTT${numbers}${currentYear}`;
        input.style.color = '#4caf50';
        input.style.fontWeight = '600';
    }
};

// Show add product modal
function showAddProductModal(productsArray, renderCallback) {
    const productOverlay = document.createElement('div');
    productOverlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.97);z-index:1000002;display:flex;align-items:center;justify-content:center;animation:fadeIn 0.2s;';
    
    const productModal = document.createElement('div');
    productModal.style.cssText = 'background:#1e1e1e;border:3px solid #4caf50;border-radius:16px;padding:2rem;width:90%;max-width:500px;box-shadow:0 20px 60px rgba(0,0,0,0.9);';
    
    productModal.innerHTML = `
        <div style="text-align:center;margin-bottom:1.5rem;">
            <div style="font-size:2rem;margin-bottom:0.5rem;">📦</div>
            <h3 style="color:#fff;margin:0;font-size:1.3rem;font-weight:600;">Ajouter un produit</h3>
        </div>
        
        <div style="margin-bottom:1rem;">
            <label style="display:block;color:#4caf50;margin-bottom:0.5rem;font-weight:600;">Nom du produit *</label>
            <textarea id="productName" placeholder="Ex: Service de transport" rows="3" style="width:100%;padding:0.75rem;background:#2d2d30;border:2px solid #3e3e42;border-radius:8px;color:#fff;font-size:1rem;resize:vertical;font-family:inherit;"></textarea>
        </div>
        
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1.5rem;">
            <div>
                <label style="display:block;color:#4caf50;margin-bottom:0.5rem;font-weight:600;">Prix unitaire HT *</label>
                <input type="number" id="productPrice" placeholder="0.00" step="0.01" min="0" style="width:100%;padding:0.75rem;background:#2d2d30;border:2px solid #3e3e42;border-radius:8px;color:#fff;font-size:1rem;">
            </div>
            <div>
                <label style="display:block;color:#4caf50;margin-bottom:0.5rem;font-weight:600;">Quantité *</label>
                <input type="number" id="productQuantity" placeholder="1" min="1" value="1" style="width:100%;padding:0.75rem;background:#2d2d30;border:2px solid #3e3e42;border-radius:8px;color:#fff;font-size:1rem;">
            </div>
        </div>
        
        <div style="display:flex;gap:1rem;">
            <button id="cancelProductBtn" style="flex:1;padding:0.75rem;background:#3e3e42;color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:1rem;font-weight:600;">
                Annuler
            </button>
            <button id="addProductConfirmBtn" style="flex:1;padding:0.75rem;background:#4caf50;color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:1rem;font-weight:600;">
                ✓ Ajouter
            </button>
        </div>
    `;
    
    productOverlay.appendChild(productModal);
    document.body.appendChild(productOverlay);
    
    // Focus on name input
    setTimeout(() => document.getElementById('productName').focus(), 100);
    
    // Cancel button
    document.getElementById('cancelProductBtn').onclick = () => {
        productOverlay.remove();
    };
    
    // Add button
    document.getElementById('addProductConfirmBtn').onclick = () => {
        const name = document.getElementById('productName').value.trim();
        const price = parseFloat(document.getElementById('productPrice').value);
        const quantity = parseInt(document.getElementById('productQuantity').value);
        
        if (!name) {
            window.notify.error('Erreur', 'Veuillez saisir le nom du produit', 2000);
            return;
        }
        
        if (isNaN(price) || price <= 0) {
            window.notify.error('Erreur', 'Prix invalide', 2000);
            return;
        }
        
        if (isNaN(quantity) || quantity <= 0) {
            window.notify.error('Erreur', 'Quantité invalide', 2000);
            return;
        }
        
        productsArray.push({ name, price, quantity });
        renderCallback();
        productOverlay.remove();
        window.notify.success('Succès', 'Produit ajouté', 1500);
    };
    
    // Close on overlay click
    productOverlay.onclick = (e) => {
        if (e.target === productOverlay) {
            productOverlay.remove();
        }
    };
    
    // Enter key to submit
    productModal.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            document.getElementById('addProductConfirmBtn').click();
        }
    });
}
