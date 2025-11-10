// Situation Mensuelle - Monthly Report Generator for MRY
// This file handles the generation of monthly situation reports for clients

// Show Situation Mensuelle Modal
window.showSituationMensuelleModalMRY = async function() {
    try {
        // Get all clients from MRY database
        const clientsResult = await window.electron.db.getAllClients();
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
                <input type="text" id="situationClientInputMRY" placeholder="Rechercher un client..." 
                       autocomplete="off"
                       style="width:100%;padding:0.875rem 1rem;background:#2d2d30;border:1px solid #3e3e42;border-radius:10px;color:#fff;font-size:0.95rem;outline:none;transition:all 0.2s;"
                       oninput="searchSituationClientsMRY(this.value)"
                       onfocus="this.style.borderColor='#4a90e2';this.style.boxShadow='0 0 0 3px rgba(74,144,226,0.1)';showSituationClientsListMRY()"
                       onblur="this.style.borderColor='#3e3e42';this.style.boxShadow='none';hideSituationClientsListMRY()">
                <input type="hidden" id="situationClientIdMRY" value="">
                <div id="situationClientsDropdownMRY" style="display:none;position:absolute;top:100%;left:0;right:0;background:#2d2d30;border:1px solid #3e3e42;border-top:none;border-radius:0 0 10px 10px;max-height:250px;overflow-y:auto;z-index:1000;margin-top:-10px;box-shadow:0 8px 20px rgba(0,0,0,0.4);"></div>
            </div>
            <style>
                .situation-dropdown-item-mry {
                    padding: 0.75rem 1rem;
                    cursor: pointer;
                    border-bottom: 1px solid #3e3e42;
                    transition: all 0.2s;
                }
                .situation-dropdown-item-mry:hover {
                    background: #4a90e2;
                }
                .situation-dropdown-item-mry:last-child {
                    border-bottom: none;
                }
                .situation-client-name-mry {
                    color: #fff;
                    font-weight: 600;
                    margin-bottom: 0.25rem;
                }
                .situation-client-ice-mry {
                    color: #999;
                    font-size: 0.85rem;
                }
                .situation-no-results-mry {
                    padding: 1rem;
                    text-align: center;
                    color: #999;
                }
            </style>
            
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1.25rem;">
                <div>
                    <label style="display:block;color:#4a90e2;margin-bottom:0.5rem;font-weight:600;font-size:0.9rem;text-transform:uppercase;letter-spacing:0.5px;">Mois</label>
                    <select id="situationMonthMRY" style="width:100%;padding:0.875rem 1rem;background:#2d2d30;border:1px solid #3e3e42;border-radius:10px;color:#fff;font-size:0.95rem;outline:none;cursor:pointer;transition:all 0.2s;" onfocus="this.style.borderColor='#4a90e2';this.style.boxShadow='0 0 0 3px rgba(74,144,226,0.1)'" onblur="this.style.borderColor='#3e3e42';this.style.boxShadow='none'">
                        ${months.map(m => `<option value="${m.value}" ${m.value === new Date().getMonth() + 1 ? 'selected' : ''}>${m.label}</option>`).join('')}
                    </select>
                </div>
                <div>
                    <label style="display:block;color:#4a90e2;margin-bottom:0.5rem;font-weight:600;font-size:0.9rem;text-transform:uppercase;letter-spacing:0.5px;">Année</label>
                    <select id="situationYearMRY" style="width:100%;padding:0.875rem 1rem;background:#2d2d30;border:1px solid #3e3e42;border-radius:10px;color:#fff;font-size:0.95rem;outline:none;cursor:pointer;transition:all 0.2s;" onfocus="this.style.borderColor='#4a90e2';this.style.boxShadow='0 0 0 3px rgba(74,144,226,0.1)'" onblur="this.style.borderColor='#3e3e42';this.style.boxShadow='none'">
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
                        <button id="situationAddManualInvoiceMRY" style="padding:0.625rem 1rem;background:linear-gradient(135deg, #ff9800 0%, #f57c00 100%);color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:0.85rem;font-weight:600;transition:all 0.2s;box-shadow:0 2px 8px rgba(255,152,0,0.25);" onmouseover="this.style.transform='translateY(-1px)';this.style.boxShadow='0 4px 12px rgba(255,152,0,0.35)'" onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='0 2px 8px rgba(255,152,0,0.25)'">
                            ➕ Ajouter
                        </button>
                        <button id="situationSelectInvoicesMRY" style="padding:0.625rem 1rem;background:linear-gradient(135deg, #4caf50 0%, #388e3c 100%);color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:0.85rem;font-weight:600;transition:all 0.2s;box-shadow:0 2px 8px rgba(76,175,80,0.25);" onmouseover="this.style.transform='translateY(-1px)';this.style.boxShadow='0 4px 12px rgba(76,175,80,0.35)'" onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='0 2px 8px rgba(76,175,80,0.25)'">
                            🔍 Choisir
                        </button>
                    </div>
                </div>
                <div id="selectedInvoicesCountMRY" style="color:#4caf50;font-size:0.85rem;font-weight:600;display:none;margin-top:0.75rem;padding:0.5rem 0.75rem;background:rgba(76,175,80,0.1);border-radius:6px;">
                    ✓ <span id="selectedCountTextMRY">0</span> facture(s) sélectionnée(s)
                </div>
                <div id="manualInvoicesListMRY" style="margin-top:0.75rem;display:none;">
                    <div style="color:#ff9800;font-weight:600;font-size:0.85rem;margin-bottom:0.5rem;display:flex;align-items:center;gap:0.5rem;">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff9800" stroke-width="2">
                            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                        <span>Factures manuelles ajoutées</span>
                    </div>
                    <div id="manualInvoicesContainerMRY" style="display:flex;flex-direction:column;gap:0.5rem;"></div>
                </div>
            </div>
            
            <div style="display:flex;gap:0.75rem;margin-top:1.5rem;">
                <button id="situationCancelMRY" style="flex:1;padding:0.875rem 1.5rem;background:#3e3e42;color:#fff;border:none;border-radius:10px;cursor:pointer;font-size:0.95rem;font-weight:600;transition:all 0.2s;" onmouseover="this.style.background='#4e4e52'" onmouseout="this.style.background='#3e3e42'">
                    Annuler
                </button>
                <button id="situationGenerateMRY" style="flex:2;padding:0.875rem 1.5rem;background:linear-gradient(135deg, #4a90e2 0%, #357abd 100%);color:#fff;border:none;border-radius:10px;cursor:pointer;font-size:0.95rem;font-weight:600;transition:all 0.2s;box-shadow:0 4px 12px rgba(74,144,226,0.3);display:flex;align-items:center;justify-content:center;gap:0.5rem;" onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 6px 20px rgba(74,144,226,0.4)'" onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='0 4px 12px rgba(74,144,226,0.3)'">
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
        let situationFilteredClientsMRY = clients;
        
        // Search clients function
        window.searchSituationClientsMRY = function(query) {
            if (!query || query.trim().length === 0) {
                situationFilteredClientsMRY = clients;
            } else {
                const searchTerm = query.toLowerCase().trim();
                situationFilteredClientsMRY = clients.filter(client => 
                    client.nom.toLowerCase().includes(searchTerm) || 
                    client.ice.toLowerCase().includes(searchTerm)
                );
            }
            displaySituationClientsListMRY();
        };
        
        // Display clients list
        function displaySituationClientsListMRY() {
            const dropdown = document.getElementById('situationClientsDropdownMRY');
            if (!dropdown) return;
            
            if (situationFilteredClientsMRY.length === 0) {
                dropdown.innerHTML = '<div class="situation-no-results-mry">Aucun client trouvé</div>';
                dropdown.style.display = 'block';
                return;
            }
            
            dropdown.innerHTML = situationFilteredClientsMRY.slice(0, 10).map(client => `
                <div class="situation-dropdown-item-mry" onmousedown="selectSituationClientMRY(${client.id}, '${client.nom.replace(/'/g, "\\'")}', '${client.ice}')">
                    <div class="situation-client-name-mry">${client.nom}</div>
                    <div class="situation-client-ice-mry" style="color:white;hover-color:white">ICE: ${client.ice}</div>
                </div>
            `).join('');
            
            dropdown.style.display = 'block';
        }
        
        window.showSituationClientsListMRY = function() {
            if (clients.length > 0) {
                situationFilteredClientsMRY = clients;
                displaySituationClientsListMRY();
            }
        };
        
        window.hideSituationClientsListMRY = function() {
            setTimeout(() => {
                const dropdown = document.getElementById('situationClientsDropdownMRY');
                if (dropdown) dropdown.style.display = 'none';
            }, 200);
        };
        
        // Select client from dropdown
        window.selectSituationClientMRY = function(id, nom, ice) {
            document.getElementById('situationClientInputMRY').value = `${nom} (${ice})`;
            document.getElementById('situationClientIdMRY').value = id;
            
            // Store client info for later use
            window.selectedSituationClientMRY = { id, nom, ice };
            
            const dropdown = document.getElementById('situationClientsDropdownMRY');
            if (dropdown) dropdown.style.display = 'none';
        };
        
        // Store selected invoices and manual invoices
        let selectedInvoicesMRY = [];
        let manualInvoicesMRY = [];
        
        // Show manual invoice add modal
        document.getElementById('situationAddManualInvoiceMRY').onclick = () => {
            // Check if client is selected
            const clientIdInput = document.getElementById('situationClientIdMRY');
            
            if (!clientIdInput || !clientIdInput.value || !window.selectedSituationClientMRY) {
                window.notify.error('Erreur', 'Veuillez d\'abord sélectionner un client', 3000);
                return;
            }
            
            showAddManualInvoiceModalMRY(manualInvoicesMRY);
        };
        
        // Update manual invoices display
        window.updateManualInvoicesDisplayMRY = function(invoices) {
            manualInvoicesMRY = invoices;
            const listElement = document.getElementById('manualInvoicesListMRY');
            const containerElement = document.getElementById('manualInvoicesContainerMRY');
            
            if (invoices.length > 0) {
                listElement.style.display = 'block';
                containerElement.innerHTML = `
                    <div style="display:flex;flex-direction:column;gap:0.75rem;margin-top:0.75rem;">
                        ${invoices.map((inv, index) => `
                            <div style="background:linear-gradient(135deg, #3a3a3a 0%, #2d2d2d 100%);border:1px solid #4a4a4a;border-radius:10px;padding:1rem;display:flex;align-items:center;justify-content:space-between;box-shadow:0 2px 8px rgba(0,0,0,0.3);transition:all 0.2s;" onmouseover="this.style.borderColor='#ff9800';this.style.boxShadow='0 4px 12px rgba(255,152,0,0.2)'" onmouseout="this.style.borderColor='#4a4a4a';this.style.boxShadow='0 2px 8px rgba(0,0,0,0.3)'">
                                <div style="display:flex;flex-direction:column;gap:0.5rem;flex:1;">
                                    <div style="display:flex;align-items:center;gap:1.25rem;">
                                        <div style="background:linear-gradient(135deg, #ff9800 0%, #f57c00 100%);color:#fff;padding:0.5rem 0.875rem;border-radius:8px;font-weight:700;font-size:0.85rem;min-width:100px;text-align:center;box-shadow:0 2px 6px rgba(255,152,0,0.3);">
                                            ${inv.type}
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
                                            <span style="color:#ff9800;font-weight:800;font-size:1.05rem;">${inv.montant} DH</span>
                                        </div>
                                    </div>
                                    ${inv.numeroOrder ? `
                                        <div style="display:flex;align-items:center;gap:0.5rem;padding-left:1.25rem;">
                                            <span style="color:#2196F3;font-size:0.75rem;font-weight:600;">N° Order:</span>
                                            <span style="color:#64B5F6;font-size:0.85rem;font-weight:600;">${inv.numeroOrder}</span>
                                        </div>
                                    ` : ''}
                                </div>
                                <button onclick="removeManualInvoiceMRY(${index})" 
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
                                ${invoices.reduce((sum, inv) => sum + parseFloat(inv.montant), 0).toFixed(2)} DH
                            </div>
                        </div>
                    </div>
                `;
            } else {
                listElement.style.display = 'none';
            }
        };
        
        // Remove manual invoice
        window.removeManualInvoiceMRY = function(index) {
            manualInvoicesMRY.splice(index, 1);
            window.updateManualInvoicesDisplayMRY(manualInvoicesMRY);
        };
        
        // Show invoice selection modal
        document.getElementById('situationSelectInvoicesMRY').onclick = async () => {
            const clientId = document.getElementById('situationClientIdMRY').value;
            const month = parseInt(document.getElementById('situationMonthMRY').value);
            const year = parseInt(document.getElementById('situationYearMRY').value);
            
            if (!clientId) {
                window.notify.error('Erreur', 'Veuillez d\'abord sélectionner un client', 3000);
                return;
            }
            
            await showInvoiceSelectionModalMRY(clientId, month, year, selectedInvoicesMRY);
        };
        
        // Update selected invoices callback
        window.updateSelectedInvoicesMRY = function(invoices) {
            selectedInvoicesMRY = invoices;
            const countElement = document.getElementById('selectedInvoicesCountMRY');
            const countText = document.getElementById('selectedCountTextMRY');
            
            if (invoices.length > 0) {
                countElement.style.display = 'block';
                countText.textContent = invoices.length;
            } else {
                countElement.style.display = 'none';
            }
        };
        
        document.getElementById('situationCancelMRY').onclick = () => overlay.remove();
        document.getElementById('situationGenerateMRY').onclick = async () => {
            const clientId = document.getElementById('situationClientIdMRY').value;
            const month = parseInt(document.getElementById('situationMonthMRY').value);
            const year = parseInt(document.getElementById('situationYearMRY').value);
            
            if (!clientId) {
                window.notify.error('Erreur', 'Veuillez selectionner un client', 3000);
                return;
            }
            
            // Show sort selection dialog first, then Order/BL selection
            await showSortSelectionModalMRY(clientId, month, year, selectedInvoicesMRY, manualInvoicesMRY, overlay);
        };
        
        // Prevent closing on overlay click
        overlay.onclick = (e) => {
            e.stopPropagation();
        };
        
    } catch (error) {
        console.error('Error showing situation modal:', error);
        window.notify.error('Erreur', 'Impossible d\'afficher la fenêtre', 3000);
    }
};

// Format number with spaces for thousands
function formatAmountMRY(amount) {
    if (isNaN(amount) || amount === null || amount === undefined) {
        return '0.00';
    }
    // Format manually to avoid encoding issues
    const num = parseFloat(amount);
    const parts = num.toFixed(2).split('.');
    // Add space separator for thousands
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return parts.join('.');
}

// Add header to PDF page
function addHeaderToPDFMRY(doc, client, month, year, monthNames, blueColor, greenColor) {
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
    doc.text(client.nom.toUpperCase(), 40, 50);
    
    doc.setTextColor(0, 0, 0);
    doc.text('ICE :', 15, 57);
    doc.setTextColor(...greenColor);
    doc.text(client.ice, 40, 57);
    
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
    doc.text(`${monthNames[month]} ${year}`, 105, 77, { align: 'center' });
}

// Add footer to PDF page
function addFooterToPDFMRY(doc, pageNumber, totalPages) {
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(7);
    doc.setFont(undefined, 'normal');
    doc.text('NIF : 25077370  TP : 51200166  R.C : 23181  CNSS : 5679058  ICE : 002036664000051', 15, 275);
    doc.text('R.I.B : 007 720 0005973000000519 74  ATTIJARI WAFA BANQ', 15, 279);
    doc.text('AV, BNI IDDER RUE 14 N°10 COELMA - TÉTOUAN.', 15, 283);
    doc.text('EMAIL: errbahiabderrahim@gmail.com  TEL : 0661307323', 15, 287);
    
    // Page numbering
    if (pageNumber && totalPages) {
        doc.setFontSize(8);
        doc.setTextColor(128, 128, 128);
        doc.text(`Page ${pageNumber} / ${totalPages}`, 105, 293, { align: 'center' });
    }
}

// Show sort selection modal for Situation Mensuelle MRY
async function showSortSelectionModalMRY(clientId, month, year, selectedInvoices, manualInvoices, previousOverlay) {
    const sortOverlay = document.createElement('div');
    sortOverlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.95);z-index:1000001;display:flex;align-items:center;justify-content:center;';
    
    sortOverlay.innerHTML = `
        <div style="background:#1e1e1e;border:3px solid #2196F3;border-radius:16px;padding:2rem;max-width:600px;width:90%;box-shadow:0 20px 60px rgba(0,0,0,0.9);">
            <div style="text-align:center;margin-bottom:1.5rem;">
                <div style="font-size:3rem;margin-bottom:0.5rem;">📋</div>
                <h2 style="color:#2196F3;margin:0;font-size:1.5rem;font-weight:600;">Ordre de tri des factures</h2>
                <p style="color:#999;margin-top:0.5rem;font-size:0.9rem;">Choisissez comment trier les factures dans le PDF</p>
            </div>
            
            <div style="display:flex;flex-direction:column;gap:1rem;margin-bottom:2rem;">
                <div class="sort-option" data-sort="date_asc" style="padding:1rem;background:#2d2d30;border:2px solid #2196F3;border-radius:8px;cursor:pointer;transition:all 0.3s;display:flex;align-items:center;gap:1rem;">
                    <div style="font-size:2rem;">📅</div>
                    <div style="flex:1;">
                        <div style="color:#fff;font-weight:600;font-size:1rem;">Date: Du plus ancien au plus récent</div>
                        <div style="color:#999;font-size:0.85rem;">Tri chronologique croissant</div>
                    </div>
                </div>
                
                <div class="sort-option" data-sort="date_desc" style="padding:1rem;background:#2d2d30;border:2px solid #3e3e42;border-radius:8px;cursor:pointer;transition:all 0.3s;display:flex;align-items:center;gap:1rem;">
                    <div style="font-size:2rem;">📅</div>
                    <div style="flex:1;">
                        <div style="color:#fff;font-weight:600;font-size:1rem;">Date: Du plus récent au plus ancien</div>
                        <div style="color:#999;font-size:0.85rem;">Tri chronologique décroissant</div>
                    </div>
                </div>
                
                <div class="sort-option" data-sort="amount_asc" style="padding:1rem;background:#2d2d30;border:2px solid #3e3e42;border-radius:8px;cursor:pointer;transition:all 0.3s;display:flex;align-items:center;gap:1rem;">
                    <div style="font-size:2rem;">💰</div>
                    <div style="flex:1;">
                        <div style="color:#fff;font-weight:600;font-size:1rem;">Montant: Du plus petit au plus grand</div>
                        <div style="color:#999;font-size:0.85rem;">Tri par montant croissant</div>
                    </div>
                </div>
                
                <div class="sort-option" data-sort="amount_desc" style="padding:1rem;background:#2d2d30;border:2px solid #3e3e42;border-radius:8px;cursor:pointer;transition:all 0.3s;display:flex;align-items:center;gap:1rem;">
                    <div style="font-size:2rem;">💰</div>
                    <div style="flex:1;">
                        <div style="color:#fff;font-weight:600;font-size:1rem;">Montant: Du plus grand au plus petit</div>
                        <div style="color:#999;font-size:0.85rem;">Tri par montant décroissant</div>
                    </div>
                </div>
                
                <div class="sort-option" data-sort="numero_asc" style="padding:1rem;background:#2d2d30;border:2px solid #3e3e42;border-radius:8px;cursor:pointer;transition:all 0.3s;display:flex;align-items:center;gap:1rem;">
                    <div style="font-size:2rem;">🔢</div>
                    <div style="flex:1;">
                        <div style="color:#fff;font-weight:600;font-size:1rem;">N° Document: Du plus petit au plus grand</div>
                        <div style="color:#999;font-size:0.85rem;">Tri par numéro croissant</div>
                    </div>
                </div>
                
                <div class="sort-option" data-sort="numero_desc" style="padding:1rem;background:#2d2d30;border:2px solid #3e3e42;border-radius:8px;cursor:pointer;transition:all 0.3s;display:flex;align-items:center;gap:1rem;">
                    <div style="font-size:2rem;">🔢</div>
                    <div style="flex:1;">
                        <div style="color:#fff;font-weight:600;font-size:1rem;">N° Document: Du plus grand au plus petit</div>
                        <div style="color:#999;font-size:0.85rem;">Tri par numéro décroissant</div>
                    </div>
                </div>
            </div>
            
            <button id="cancelSortBtnMRY" style="width:100%;padding:1rem;background:#3e3e42;color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:1rem;font-weight:600;">
                Annuler
            </button>
        </div>
    `;
    
    document.body.appendChild(sortOverlay);
    
    // Handle sort option selection
    const sortOptions = sortOverlay.querySelectorAll('.sort-option');
    let selectedSort = 'date_asc';
    
    sortOptions.forEach(option => {
        option.addEventListener('click', () => {
            // Remove selection from all options
            sortOptions.forEach(opt => {
                opt.style.borderColor = '#3e3e42';
                opt.style.background = '#2d2d30';
            });
            
            // Select clicked option
            option.style.borderColor = '#2196F3';
            option.style.background = 'rgba(33, 150, 243, 0.1)';
            selectedSort = option.dataset.sort;
            
            // Continue to next modal after short delay
            setTimeout(() => {
                sortOverlay.remove();
                showOrderBLSelectionModalMRY(clientId, month, year, selectedSort, selectedInvoices, manualInvoices, previousOverlay);
            }, 300);
        });
        
        option.addEventListener('mouseenter', () => {
            if (option.style.borderColor !== 'rgb(33, 150, 243)') {
                option.style.borderColor = '#667eea';
            }
        });
        
        option.addEventListener('mouseleave', () => {
            if (option.style.borderColor !== 'rgb(33, 150, 243)') {
                option.style.borderColor = '#3e3e42';
            }
        });
    });
    
    // Cancel button
    document.getElementById('cancelSortBtnMRY').onclick = () => {
        sortOverlay.remove();
    };
    
    // Close on overlay click
    sortOverlay.onclick = (e) => {
        if (e.target === sortOverlay) {
            sortOverlay.remove();
        }
    };
}

// Show Order/BL selection modal for Situation Mensuelle MRY
async function showOrderBLSelectionModalMRY(clientId, month, year, sortBy, selectedInvoices, manualInvoices, previousOverlay) {
    const selectionOverlay = document.createElement('div');
    selectionOverlay.className = 'custom-modal-overlay';
    selectionOverlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.95);z-index:1000001;display:flex;align-items:center;justify-content:center;';
    
    selectionOverlay.innerHTML = `
        <div class="custom-modal">
            <div class="custom-modal-header">
                <span class="custom-modal-icon info">📋</span>
                <h3 class="custom-modal-title">Options d'affichage PDF</h3>
            </div>
            <div class="custom-modal-body">
                <p style="margin-bottom:1.25rem;color:#e0e0e0;font-size:0.95rem;">Choisissez les informations à afficher dans le PDF:</p>
                <label style="display:flex;align-items:center;cursor:pointer;padding:1rem;background:#1e1e1e;border:2px solid #2196F3;border-radius:10px;transition:all 0.2s ease;">
                    <input type="checkbox" id="includeOrderCheckboxSituationMRY" checked style="width:20px;height:20px;margin-right:1rem;cursor:pointer;accent-color:#2196F3;">
                    <span style="font-size:0.95rem;color:#e0e0e0;font-weight:500;">
                        Afficher les N° Order dans le PDF
                    </span>
                </label>
            </div>
            <div class="custom-modal-footer">
                <button class="custom-modal-btn primary" id="continueBtnSituationMRY" style="padding:0.75rem 2rem;font-size:1rem;">Générer PDF</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(selectionOverlay);
    
    const orderCheckbox = selectionOverlay.querySelector('#includeOrderCheckboxSituationMRY');
    const continueBtn = selectionOverlay.querySelector('#continueBtnSituationMRY');
    
    continueBtn.addEventListener('click', async () => {
        const includeOrder = orderCheckbox.checked;
        
        console.log('✅ [MRY] Include Order:', includeOrder);
        
        selectionOverlay.remove();
        previousOverlay.remove();
        
        await generateSituationMensuelleMRY(clientId, month, year, sortBy, selectedInvoices, manualInvoices, includeOrder, false);
    });
    
    selectionOverlay.addEventListener('click', (e) => {
        if (e.target === selectionOverlay) {
            const includeOrder = orderCheckbox.checked;
            selectionOverlay.remove();
            previousOverlay.remove();
            generateSituationMensuelleMRY(clientId, month, year, sortBy, selectedInvoices, manualInvoices, includeOrder, false);
        }
    });
    
    setTimeout(() => continueBtn.focus(), 100);
}

// Generate Situation Mensuelle PDF
window.generateSituationMensuelleMRY = async function(clientId, month, year, sortBy = 'date_asc', selectedInvoiceIds = [], manualInvoices = [], includeOrder = true, includeBL = true) {
    try {
        window.notify.info('Info', 'Generation du rapport en cours...', 2000);
        
        // Get client info
        const clientsResult = await window.electron.db.getAllClients();
        const client = clientsResult.data.find(c => c.id == clientId);
        
        if (!client) {
            window.notify.error('Erreur', 'Client introuvable', 3000);
            return;
        }
        
        // Get all invoices for this client in the specified month
        const invoicesResult = await window.electron.db.getAllInvoices('MRY');
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
            console.log('📋 [MRY PDF] Total manualInvoices:', manualInvoices.length);
            
            // Get existing invoice numbers to avoid duplicates
            const existingNumbers = new Set();
            allInvoices.forEach(inv => {
                if (inv.document_numero) existingNumbers.add(inv.document_numero);
                if (inv.document_numero_devis) existingNumbers.add(inv.document_numero_devis);
                if (inv.document_bon_de_livraison) existingNumbers.add(inv.document_bon_de_livraison);
            });
            
            console.log('📋 [MRY PDF] Existing invoice numbers:', Array.from(existingNumbers));
            
            manualInvoices.forEach(manInv => {
                // Skip if this invoice is already in the list (avoid duplicates)
                if (manInv.savedToDb && existingNumbers.has(manInv.numero)) {
                    console.log('⏭️ [MRY PDF] Skipping duplicate invoice:', manInv.numero);
                    return;
                }
                
                console.log('➕ [MRY PDF] Adding manual invoice to PDF:', manInv.numero);
                console.log('   - numeroOrder:', manInv.numeroOrder);
                allInvoices.push({
                    document_type: manInv.type.toLowerCase(),
                    document_numero: manInv.numero,
                    document_numero_devis: manInv.numero,
                    document_numero_Order: manInv.numeroOrder || null,
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
        
        // Sort invoices based on user selection
        allInvoices.sort((a, b) => {
            if (sortBy === 'date_asc') {
                const dateCompare = new Date(a.document_date) - new Date(b.document_date);
                if (dateCompare !== 0) return dateCompare;
                // Secondary sort by invoice number if dates are equal
                const numA = parseInt((a.document_numero || a.document_numero_devis || '0').replace(/\D/g, '')) || 0;
                const numB = parseInt((b.document_numero || b.document_numero_devis || '0').replace(/\D/g, '')) || 0;
                return numA - numB;
            } else if (sortBy === 'date_desc') {
                const dateCompare = new Date(b.document_date) - new Date(a.document_date);
                if (dateCompare !== 0) return dateCompare;
                // Secondary sort by invoice number if dates are equal
                const numA = parseInt((a.document_numero || a.document_numero_devis || '0').replace(/\D/g, '')) || 0;
                const numB = parseInt((b.document_numero || b.document_numero_devis || '0').replace(/\D/g, '')) || 0;
                return numB - numA;
            } else if (sortBy === 'amount_asc') {
                const amountCompare = (parseFloat(a.total_ht) || 0) - (parseFloat(b.total_ht) || 0);
                if (amountCompare !== 0) return amountCompare;
                // Secondary sort by date if amounts are equal
                return new Date(a.document_date) - new Date(b.document_date);
            } else if (sortBy === 'amount_desc') {
                const amountCompare = (parseFloat(b.total_ht) || 0) - (parseFloat(a.total_ht) || 0);
                if (amountCompare !== 0) return amountCompare;
                // Secondary sort by date if amounts are equal
                return new Date(b.document_date) - new Date(a.document_date);
            } else if (sortBy === 'numero_asc') {
                // Sort by document number ascending
                const numA = parseInt((a.document_numero || a.document_numero_devis || '0').replace(/\D/g, '')) || 0;
                const numB = parseInt((b.document_numero || b.document_numero_devis || '0').replace(/\D/g, '')) || 0;
                if (numA !== numB) return numA - numB;
                // Secondary sort by date if numbers are equal
                return new Date(a.document_date) - new Date(b.document_date);
            } else if (sortBy === 'numero_desc') {
                // Sort by document number descending
                const numA = parseInt((a.document_numero || a.document_numero_devis || '0').replace(/\D/g, '')) || 0;
                const numB = parseInt((b.document_numero || b.document_numero_devis || '0').replace(/\D/g, '')) || 0;
                if (numA !== numB) return numB - numA;
                // Secondary sort by date if numbers are equal
                return new Date(b.document_date) - new Date(a.document_date);
            }
            return 0;
        });
        
        // Check if jsPDF is loaded
        if (typeof window.jspdf === 'undefined') {
            window.notify.info('Info', 'Chargement de jsPDF...', 2000);
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
            script.onload = () => generateSituationMensuelleMRY(clientId, month, year, sortBy);
            document.head.appendChild(script);
            return;
        }
        
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        const blueColor = [33, 97, 140]; // #21618C
        const greenColor = [16, 172, 132]; // #10AC84
        
        const monthNames = ['', 'JANVIER', 'FEVRIER', 'MARS', 'AVRIL', 'MAI', 'JUIN', 
                           'JUILLET', 'AOUT', 'SEPTEMBRE', 'OCTOBRE', 'NOVEMBRE', 'DECEMBRE'];
        
        let pageNumber = 1;
        const pages = [];
        
        // Add first page header
        addHeaderToPDFMRY(doc, client, month, year, monthNames, blueColor, greenColor);
        
        // Table Header - 4 columns only
        const startY = 85;
        doc.setFillColor(...blueColor);
        doc.rect(15, startY, 180, 10, 'F');
        
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(9);
        doc.setFont(undefined, 'bold');
        doc.text('TYPE', 18, startY + 6.5);
        doc.text('NUMERO', 60, startY + 6.5);
        doc.text('DATE', 130, startY + 6.5);
        doc.text('TOTAL H.T', 188, startY + 6.5, { align: 'right' });
        
        // Table Body
        let currentY = startY + 12;
        doc.setTextColor(0, 0, 0);
        doc.setFont(undefined, 'normal');
        doc.setFontSize(8);
        
        let totalHT = 0;
        
        allInvoices.forEach((inv, index) => {
            // Check if we need a new page (with more space for multi-line rows)
            if (currentY > 250) {
                pages.push(pageNumber);
                pageNumber++;
                
                doc.addPage();
                currentY = 20;
                
                // Add header to new page
                addHeaderToPDFMRY(doc, client, month, year, monthNames, blueColor, greenColor);
                
                // Add table header again
                const newStartY = 80;
                doc.setFillColor(...blueColor);
                doc.rect(15, newStartY, 180, 10, 'F');
                
                doc.setTextColor(255, 255, 255);
                doc.setFontSize(9);
                doc.setFont(undefined, 'bold');
                doc.text('TYPE', 18, newStartY + 6.5);
                doc.text('NUMERO', 60, newStartY + 6.5);
                doc.text('DATE', 130, newStartY + 6.5);
                doc.text('TOTAL H.T', 188, newStartY + 6.5, { align: 'right' });
                
                currentY = newStartY + 12;
                doc.setTextColor(0, 0, 0);
                doc.setFont(undefined, 'normal');
                doc.setFontSize(8);
            }
            
            const ht = parseFloat(inv.total_ht) || 0;
            totalHT += ht;
            
            // Determine document type and numero with details
            let typeLabel = '';
            let mainNumero = '';
            let details = [];
            
            if (inv.document_type === 'facture') {
                typeLabel = 'FACTURE';
                mainNumero = inv.document_numero || '-';
                if (includeOrder && inv.document_numero_Order) {
                    details.push('N° Order: ' + inv.document_numero_Order);
                }
                if (includeBL && inv.document_bon_de_livraison) {
                    details.push('Bon de livraison: ' + inv.document_bon_de_livraison);
                }
            } else if (inv.document_type === 'devis') {
                typeLabel = 'DEVIS';
                mainNumero = inv.document_numero_devis || inv.document_numero || '-';
            } else if (inv.document_type === 'bon_livraison') {
                typeLabel = 'BON DE LIVRAISON';
                mainNumero = inv.document_numero_bl || inv.document_numero || '-';
                if (inv.document_numero_commande) {
                    details.push('Order N°: ' + inv.document_numero_commande);
                }
            }
            
            // Calculate row height based on details (more space for multiple lines)
            const rowHeight = details.length === 0 ? 7 : (details.length === 1 ? 10 : 13);
            
            // Alternating row colors
            if (index % 2 === 0) {
                doc.setFillColor(245, 245, 245);
                doc.rect(15, currentY - 3, 180, rowHeight, 'F');
            }
            
            // TYPE column
            doc.setFontSize(8);
            doc.setFont(undefined, 'normal');
            doc.text(typeLabel, 18, currentY + 2.5);
            
            // NUMERO column (multi-line if needed)
            doc.setTextColor(...blueColor);
            doc.setFontSize(9);
            doc.setFont(undefined, 'bold');
            doc.text(mainNumero, 60, currentY + 2.5);
            
            // Add details below main numero
            if (details.length > 0) {
                doc.setFontSize(7);
                doc.setFont(undefined, 'normal');
                doc.setTextColor(255, 140, 0); // Orange color for secondary details
                details.forEach((detail, i) => {
                    doc.text(detail, 60, currentY + 6 + (i * 3));
                });
            }
            
            // DATE column
            doc.setTextColor(0, 0, 0);
            doc.setFontSize(8);
            doc.setFont(undefined, 'normal');
            doc.text(new Date(inv.document_date).toLocaleDateString('fr-FR'), 130, currentY + 2.5);
            
            // TOTAL H.T column
            doc.setTextColor(0, 0, 0);
            doc.setFontSize(8);
            doc.setFont(undefined, 'normal');
            doc.text(formatAmountMRY(ht) + ' DH', 188, currentY + 2.5, { align: 'right' });
            
            currentY += rowHeight;
        });
        
        // Totals
        currentY += 10;
        
        // Check if totals fit on current page
        if (currentY > 230) {
            pages.push(pageNumber);
            pageNumber++;
            doc.addPage();
            addHeaderToPDFMRY(doc, client, month, year, monthNames, blueColor, greenColor);
            currentY = 100;
        }
        
        const montantTVA = totalHT * 0.2;
        const totalTTC = totalHT + montantTVA;
        
        // TOTAL HT
        doc.setFillColor(245, 245, 245);
        doc.rect(110, currentY, 85, 8, 'F');
        doc.setFont(undefined, 'bold');
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(9);
        doc.text('TOTAL HT :', 113, currentY + 5.5);
        doc.setFontSize(8);
        doc.text(`${formatAmountMRY(totalHT)} DH`, 192, currentY + 5.5, { align: 'right' });
        
        // MONTANT TVA
        currentY += 8;
        doc.setFillColor(255, 255, 255);
        doc.rect(110, currentY, 85, 8, 'F');
        doc.setFontSize(9);
        doc.text('MONTANT TVA 20% :', 113, currentY + 5.5);
        doc.setFontSize(8);
        doc.text(`${formatAmountMRY(montantTVA)} DH`, 192, currentY + 5.5, { align: 'right' });
        
        // MONTANT T.T.C
        currentY += 8;
        doc.setFillColor(173, 216, 230);
        doc.rect(110, currentY, 85, 8, 'F');
        doc.setTextColor(...blueColor);
        doc.setFontSize(9);
        doc.text('MONTANT T.T.C :', 113, currentY + 5.5);
        doc.setFontSize(8.5);
        doc.text(`${formatAmountMRY(totalTTC)} DH`, 192, currentY + 5.5, { align: 'right' });
        
        // Amount in words
        currentY += 15;
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(9);
        doc.setFont(undefined, 'italic');
        const amountInWords = numberToFrenchWordsMRY(totalTTC);
        
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
        
        // Removed amount in words text
        
        // Add footers to all pages
        pages.push(pageNumber);
        const totalPagesCount = pages.length;
        
        for (let i = 0; i < totalPagesCount; i++) {
            doc.setPage(i + 1);
            addFooterToPDFMRY(doc, i + 1, totalPagesCount);
        }
        
        // Save PDF
        const filename = `Situation_${client.nom.replace(/\s+/g, '_')}_${monthNames[month]}_${year}.pdf`;
        doc.save(filename);
        
        window.notify.success('Succes', 'Rapport genere avec succes', 3000);
        
    } catch (error) {
        console.error('Error generating situation:', error);
        window.notify.error('Erreur', 'Impossible de générer le rapport: ' + error.message, 4000);
    }
};

// Convert number to French words
function numberToFrenchWordsMRY(number) {
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
async function showInvoiceSelectionModalMRY(clientId, month, year, preSelectedInvoices = []) {
    try {
        // Get all invoices for this client and period
        const result = await window.electron.db.getAllInvoices('MRY');
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
                const docType = inv.document_type === 'devis' ? 'Devis' : 'Facture';
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
                                <div class="invoice-info-value">${docNum}</div>
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
        
        // Handle "Select All" button
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
            if (typeof window.updateSelectedInvoicesMRY === 'function') {
                window.updateSelectedInvoicesMRY(selectedInvoices);
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

// Show add manual invoice modal - MRY supports Facture and Devis only
async function showAddManualInvoiceModalMRY(existingInvoices = []) {
    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.95);z-index:1000001;display:flex;align-items:center;justify-content:center;animation:fadeIn 0.2s;';
    
    // Get next invoice number from database
    const now = new Date();
    const year = now.getFullYear();
    let nextNumber = 1;
    
    console.log('🔢 [SITUATION MRY] Getting next invoice number for year:', year);
    
    try {
        const result = await window.electron.db.getNextInvoiceNumber('MRY', 'facture', year);
        console.log('🔢 [SITUATION MRY] Received result from getNextInvoiceNumber:', result);
        
        if (result.success && result.data) {
            nextNumber = result.data.nextNumber || result.data.number || 1;
            console.log('🔢 [SITUATION MRY] Next number extracted:', nextNumber);
        } else {
            console.warn('⚠️ [SITUATION MRY] Failed to get next number, using default 1');
        }
    } catch (error) {
        console.error('❌ [SITUATION MRY] Error getting next invoice number:', error);
    }
    
    const defaultNumero = String(nextNumber).padStart(3, '0');
    console.log('🔢 [SITUATION MRY] Default numero formatted:', defaultNumero);
    console.log('🔢 [SITUATION MRY] Full invoice number will be:', defaultNumero + '/' + year);
    
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
        
        <div style="margin-bottom:1.5rem;">
            <label style="display:block;color:#ff9800;margin-bottom:0.5rem;font-weight:600;">Type de document *</label>
            <select id="manualInvoiceTypeMRY" onchange="toggleOrderFieldMRY()" style="width:100%;padding:0.75rem;background:#2d2d30;border:2px solid #3e3e42;border-radius:8px;color:#fff;font-size:1rem;">
                <option value="">-- Sélectionnez un type --</option>
                <option value="FACTURE">Facture</option>
                <option value="DEVIS">Devis</option>
            </select>
        </div>

        <div id="numeroSectionMRY" style="display:none;margin-bottom:1.5rem;">
            <label style="display:block;color:#ff9800;margin-bottom:0.5rem;font-weight:600;">Numéro *</label>
            <input type="text" id="manualInvoiceNumeroMRY" placeholder="Ex: 123/2025" value="${defaultNumero}/${year}" 
                   onblur="autoFormatNumeroMRY(this, ${year})"
                   style="width:100%;padding:0.75rem;background:#2d2d30;border:2px solid #3e3e42;border-radius:8px;color:#4caf50;font-size:1rem;font-weight:600;">
            <small style="color:#999;font-size:0.85rem;">Numéro suggéré - vous pouvez le modifier si nécessaire</small>
        </div>
        
        <div id="orderSectionMRY" style="display:none;margin-bottom:1.5rem;padding:1rem;background:#2d2d30;border:2px solid #2196F3;border-radius:8px;">
            <label style="display:flex;align-items:center;cursor:pointer;margin-bottom:0.75rem;">
                <input type="checkbox" id="toggleOrderMRY" style="width:18px;height:18px;margin-right:0.75rem;cursor:pointer;accent-color:#2196F3;">
                <div>
                    <div style="color:#2196F3;font-weight:600;font-size:1rem;">📋 Ajouter N° Order (Optionnel)</div>
                    <div style="color:#999;font-size:0.85rem;margin-top:0.25rem;">Cochez pour ajouter un numéro de commande</div>
                </div>
            </label>
            <div id="orderFieldMRY" style="display:none;margin-top:0.75rem;">
                <label style="display:block;color:#2196F3;margin-bottom:0.5rem;font-weight:600;">N° Order</label>
                <input type="text" id="manualInvoiceOrderMRY" placeholder="Ex: 123" onblur="autoFormatOrderMRY(this, ${year})" style="width:100%;padding:0.75rem;background:#1e1e1e;border:2px solid #2196F3;border-radius:8px;color:#fff;font-size:1rem;">
            </div>
        </div>
        
        <div style="margin-bottom:1.5rem;">
            <label style="display:block;color:#ff9800;margin-bottom:0.5rem;font-weight:600;">Date *</label>
            <input type="date" id="manualInvoiceDateMRY" style="width:100%;padding:0.75rem;background:#2d2d30;border:2px solid #3e3e42;border-radius:8px;color:#fff;font-size:1rem;">
        </div>
        
        <div style="margin-bottom:1.5rem;">
            <label style="display:block;color:#ff9800;margin-bottom:0.75rem;font-weight:600;">Méthode de calcul *</label>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;">
                <div class="input-method-option active" onclick="selectInputMethodMRY('direct')">
                    <input type="radio" name="inputMethodMRY" value="direct" checked>
                    <div style="color:#fff;font-weight:600;margin-bottom:0.25rem;">💰 Montant direct</div>
                    <div style="color:#999;font-size:0.85rem;">Saisir le montant HT</div>
                </div>
                <div class="input-method-option" onclick="selectInputMethodMRY('products')">
                    <input type="radio" name="inputMethodMRY" value="products">
                    <div style="color:#fff;font-weight:600;margin-bottom:0.25rem;">📦 Depuis produits</div>
                    <div style="color:#999;font-size:0.85rem;">Calculer depuis les produits</div>
                </div>
            </div>
        </div>
        
        <div id="directAmountSectionMRY" style="margin-bottom:1.5rem;">
            <label style="display:block;color:#ff9800;margin-bottom:0.5rem;font-weight:600;">Montant HT (DH) *</label>
            <input type="number" id="manualInvoiceMontantMRY" placeholder="0.00" step="0.01" min="0" style="width:100%;padding:0.75rem;background:#2d2d30;border:2px solid #3e3e42;border-radius:8px;color:#fff;font-size:1rem;">
        </div>
        
        <div id="productsSectionMRY" style="display:none;margin-bottom:1.5rem;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem;">
                <label style="color:#ff9800;font-weight:600;">Produits</label>
                <button id="addProductBtnMRY" style="padding:0.5rem 1rem;background:#4caf50;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:0.9rem;font-weight:600;">
                    ➕ Ajouter un produit
                </button>
            </div>
            <div id="productsListMRY" style="display:flex;flex-direction:column;gap:0.5rem;max-height:200px;overflow-y:auto;"></div>
            <div style="margin-top:1rem;padding:1rem;background:#2d2d30;border-radius:8px;">
                <div style="display:flex;justify-content:space-between;color:#fff;">
                    <span style="font-weight:600;">Total HT:</span>
                    <span id="productsTotalMRY" style="color:#ff9800;font-weight:700;font-size:1.1rem;">0.00 DH</span>
                </div>
            </div>
        </div>
        
        <div style="margin-bottom:1.5rem;padding:1rem;background:#2d2d30;border:2px solid #4caf50;border-radius:8px;">
            <label style="display:flex;align-items:center;cursor:pointer;">
                <input type="checkbox" id="saveToDatabaseMRY" style="width:20px;height:20px;margin-right:0.75rem;cursor:pointer;accent-color:#4caf50;">
                <div>
                    <div style="color:#4caf50;font-weight:600;font-size:1rem;">💾 Enregistrer dans la base de données</div>
                    <div style="color:#999;font-size:0.85rem;margin-top:0.25rem;">Cette facture sera sauvegardée et apparaîtra dans les listes</div>
                </div>
            </label>
        </div>
        
        <div style="display:flex;gap:1rem;">
            <button id="cancelManualInvoiceBtnMRY" style="flex:1;padding:1rem;background:#3e3e42;color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:1rem;font-weight:600;">
                Annuler
            </button>
            <button id="addManualInvoiceBtnMRY" style="flex:1;padding:1rem;background:#ff9800;color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:1rem;font-weight:600;">
                ✓ Ajouter
            </button>
        </div>
    `;
    
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    
    // Set today's date as default
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('manualInvoiceDateMRY').value = today;
    
    // Auto-format numero to add /year when user leaves the field
    window.autoFormatNumeroMRY = function(input, currentYear) {
        const value = input.value.trim();
        if (value && !value.includes('/')) {
            input.value = value + '/' + currentYear;
        }
    };
    
    // Auto-format N° Order - DO NOT add /year automatically
    window.autoFormatOrderMRY = function(input, currentYear) {
        // Just keep the value as is, don't add /2025 automatically
        // User will type the full value themselves
    };
    
    // Toggle Order section and Numero section based on document type - REBUILD fields completely
    window.toggleOrderFieldMRY = function() {
        const type = document.getElementById('manualInvoiceTypeMRY').value;
        const numeroSection = document.getElementById('numeroSectionMRY');
        const orderSection = document.getElementById('orderSectionMRY');
        
        if (!type) {
            numeroSection.style.display = 'none';
            orderSection.style.display = 'none';
            return;
        }
        
        // Rebuild numero field with fresh value
        let numeroHTML = `
            <label style="display:block;color:#ff9800;margin-bottom:0.5rem;font-weight:600;">Numéro *</label>
            <input type="text" id="manualInvoiceNumeroMRY" placeholder="Ex: 123/2025" value="${defaultNumero}/${year}" 
                   onblur="autoFormatNumeroMRY(this, ${year})"
                   style="width:100%;padding:0.75rem;background:#2d2d30;border:2px solid #3e3e42;border-radius:8px;color:#4caf50;font-size:1rem;font-weight:600;">
            <small style="color:#999;font-size:0.85rem;">Numéro suggéré - vous pouvez le modifier si nécessaire</small>
        `;
        
        numeroSection.innerHTML = numeroHTML;
        numeroSection.style.display = 'block';
        
        if (type === 'FACTURE') {
            orderSection.style.display = 'block';
            // Reset checkbox and field
            const checkbox = document.getElementById('toggleOrderMRY');
            const orderField = document.getElementById('orderFieldMRY');
            const orderInput = document.getElementById('manualInvoiceOrderMRY');
            if (checkbox) {
                checkbox.checked = false;
                orderField.style.display = 'none';
                orderInput.value = '';
            }
        } else if (type === 'DEVIS') {
            orderSection.style.display = 'none';
            // Reset checkbox and field when hiding
            const checkbox = document.getElementById('toggleOrderMRY');
            const orderField = document.getElementById('orderFieldMRY');
            const orderInput = document.getElementById('manualInvoiceOrderMRY');
            if (checkbox) {
                checkbox.checked = false;
                orderField.style.display = 'none';
                orderInput.value = '';
            }
        }
    };
    
    // Toggle Order input field when checkbox is clicked
    document.getElementById('toggleOrderMRY').onchange = function() {
        const orderField = document.getElementById('orderFieldMRY');
        if (this.checked) {
            orderField.style.display = 'block';
        } else {
            orderField.style.display = 'none';
            document.getElementById('manualInvoiceOrderMRY').value = '';
        }
    };
    
    // Products array
    let products = [];
    
    // Switch input method
    window.selectInputMethodMRY = function(method) {
        const directSection = document.getElementById('directAmountSectionMRY');
        const productsSection = document.getElementById('productsSectionMRY');
        const options = document.querySelectorAll('.input-method-option');
        
        options.forEach(opt => opt.classList.remove('active'));
        
        if (method === 'direct') {
            directSection.style.display = 'block';
            productsSection.style.display = 'none';
            options[0].classList.add('active');
            document.querySelector('input[name="inputMethodMRY"][value="direct"]').checked = true;
        } else {
            directSection.style.display = 'none';
            productsSection.style.display = 'block';
            options[1].classList.add('active');
            document.querySelector('input[name="inputMethodMRY"][value="products"]').checked = true;
        }
    };
    
    // Calculate products total
    function updateProductsTotal() {
        const total = products.reduce((sum, p) => sum + (parseFloat(p.price) * parseInt(p.quantity)), 0);
        document.getElementById('productsTotalMRY').textContent = total.toFixed(2) + ' DH';
        return total;
    }
    
    // Render products list
    function renderProducts() {
        const container = document.getElementById('productsListMRY');
        if (products.length === 0) {
            container.innerHTML = '<div style="padding:1rem;text-align:center;color:#999;">Aucun produit ajouté</div>';
        } else {
            container.innerHTML = products.map((p, index) => `
                <div style="padding:0.75rem;background:#3e3e42;border-radius:6px;display:flex;justify-content:space-between;align-items:center;">
                    <div style="flex:1;">
                        <div style="color:#fff;font-weight:600;">${p.name}</div>
                        <div style="color:#999;font-size:0.85rem;">${p.quantity} × ${parseFloat(p.price).toFixed(2)} DH = ${(p.quantity * p.price).toFixed(2)} DH</div>
                    </div>
                    <button onclick="removeProductMRY(${index})" style="padding:0.5rem;background:#f44336;color:#fff;border:none;border-radius:4px;cursor:pointer;">✗</button>
                </div>
            `).join('');
        }
        updateProductsTotal();
    }
    
    // Add product
    document.getElementById('addProductBtnMRY').onclick = () => {
        showAddProductModalMRY(products, renderProducts);
    };
    
    // Remove product
    window.removeProductMRY = function(index) {
        products.splice(index, 1);
        renderProducts();
    };
    
    // Cancel button
    document.getElementById('cancelManualInvoiceBtnMRY').onclick = () => {
        overlay.remove();
    };
    
    // Add button
    document.getElementById('addManualInvoiceBtnMRY').onclick = async () => {
        const type = document.getElementById('manualInvoiceTypeMRY').value;
        const numero = document.getElementById('manualInvoiceNumeroMRY').value.trim();
        const date = document.getElementById('manualInvoiceDateMRY').value;
        const inputMethod = document.querySelector('input[name="inputMethodMRY"]:checked')?.value || 'direct';
        let montant = 0;
        
        console.log('🔍 [MRY DEBUG] Starting add invoice - type:', type, 'numero:', numero, 'date:', date);
        
        // Validation
        if (!type) {
            window.notify.error('Erreur', 'Veuillez sélectionner un type de document', 3000);
            return;
        }
        
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
            montant = parseFloat(document.getElementById('manualInvoiceMontantMRY').value);
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
        
        // Check for duplicate invoice number - ONLY for the same document type
        console.log('🔍 [MRY DUPLICATE CHECK] Checking for numero:', numero, 'Type:', type);
        
        // Check in database - ONLY for the same document type
        const checkResult = await window.electron.db.getAllInvoices('MRY');
        if (checkResult.success && checkResult.data) {
            let existingInvoice = null;
            
            if (type === 'FACTURE') {
                existingInvoice = checkResult.data.find(inv => inv.document_numero === numero);
            } else if (type === 'DEVIS') {
                existingInvoice = checkResult.data.find(inv => inv.document_numero_devis === numero);
            }
            
            if (existingInvoice) {
                const typeLabel = type === 'FACTURE' ? 'Facture' : 'Devis';
                window.notify.error('Erreur', `Le numéro ${numero} existe déjà pour un ${typeLabel}! Veuillez utiliser un autre numéro.`, 4000);
                console.error('❌ [MRY DUPLICATE CHECK] Invoice number exists in DB for type:', type, '- numero:', numero);
                return;
            }
        }
        
        // Check in manual invoices list - ONLY for the same document type
        if (existingInvoices && existingInvoices.length > 0) {
            const duplicateManual = existingInvoices.find(inv => inv.type === type && inv.numero === numero);
            if (duplicateManual) {
                const typeLabel = type === 'FACTURE' ? 'Facture' : 'Devis';
                window.notify.error('Erreur', `Le numéro ${numero} existe déjà dans les ${typeLabel}s manuelles! Veuillez utiliser un autre numéro.`, 4000);
                console.error('❌ [MRY DUPLICATE CHECK] Invoice number exists in manual list for type:', type, '- numero:', numero);
                return;
            }
        }
        
        // Check for duplicate N° Order if provided (for FACTURE)
        if (type === 'FACTURE') {
            const orderCheckbox = document.getElementById('toggleOrderMRY');
            if (orderCheckbox && orderCheckbox.checked) {
                const orderValue = document.getElementById('manualInvoiceOrderMRY')?.value?.trim();
                if (orderValue) {
                    // Check in database
                    const duplicateOrder = checkResult.data.find(inv => 
                        inv.document_type === 'facture' && 
                        inv.document_numero_Order && 
                        inv.document_numero_Order.trim() === orderValue
                    );
                    if (duplicateOrder) {
                        window.notify.error('Erreur', `Le N° Order "${orderValue}" existe déjà! Veuillez utiliser un autre numéro.`, 4000);
                        console.error('❌ [MRY DUPLICATE CHECK] N° Order exists in DB:', orderValue);
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
                        console.error('❌ [MRY DUPLICATE CHECK] N° Order exists in manual list:', orderValue);
                        return;
                    }
                }
            }
        }
        
        console.log('✅ [MRY DUPLICATE CHECK] No duplicates found for type:', type);
        
        // Save to database if requested
        const saveToDb = document.getElementById('saveToDatabaseMRY').checked;
        
        console.log('🔍 [MRY DEBUG] saveToDb checkbox value:', saveToDb);
        console.log('📋 [MRY DEBUG] Current existingInvoices length:', existingInvoices.length);
        
        if (saveToDb) {
            console.log('💾 [MRY DEBUG] Entering saveToDb block - will save to database');
            try {
                const clientId = document.getElementById('situationClientIdMRY').value;
                if (!clientId) {
                    window.notify.error('Erreur', 'Client non sélectionné', 3000);
                    return;
                }
                
                if (!window.selectedSituationClientMRY) {
                    window.notify.error('Erreur', 'Informations du client manquantes', 3000);
                    return;
                }
                
                const clientName = window.selectedSituationClientMRY.nom;
                const clientICE = window.selectedSituationClientMRY.ice;
                
                // Get optional N° Order if checkbox is checked
                let numeroOrder = null;
                const orderCheckbox = document.getElementById('toggleOrderMRY');
                if (orderCheckbox && orderCheckbox.checked) {
                    numeroOrder = document.getElementById('manualInvoiceOrderMRY')?.value || null;
                }
                
                // Prepare invoice data
                const invoiceData = {
                    company_code: 'MRY',
                    client: {
                        nom: clientName,
                        ICE: clientICE
                    },
                    document: {
                        type: type.toLowerCase(),
                        numero: numero,
                        date: date,
                        numero_Order: numeroOrder,
                        numero_devis: type === 'DEVIS' ? numero : null
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
                
                console.log('📤 [SITUATION MRY] Sending invoice data:', JSON.stringify(invoiceData, null, 2));
                
                // Save to database
                const result = await window.electron.db.createInvoice(invoiceData);
                console.log('📥 [SITUATION MRY] Received result:', result);
                
                if (result && result.success) {
                    console.log('✅ [MRY DEBUG] Invoice saved to DB successfully with ID:', result.invoiceId);
                    console.log('📋 [MRY DEBUG] existingInvoices length BEFORE adding:', existingInvoices.length);
                    window.notify.success('Succès', 'Facture enregistrée dans la base de données', 2000);
                    
                    // Add to manual list with savedToDb flag so it appears in the current session
                    const newInvoice = {
                        type: type.replace('_', ' '),
                        numero: numero,
                        date: formattedDate,
                        dateRaw: date,
                        montant: montant.toFixed(2),
                        numeroOrder: numeroOrder,
                        savedToDb: true,
                        invoiceId: result.invoiceId
                    };
                    
                    existingInvoices.unshift(newInvoice);
                    console.log('📋 [MRY DEBUG] existingInvoices length AFTER adding:', existingInvoices.length);
                    console.log('📋 [MRY DEBUG] Added invoice:', newInvoice);
                    
                    // Update display
                    if (typeof window.updateManualInvoicesDisplayMRY === 'function') {
                        console.log('🔄 [MRY DEBUG] Calling updateManualInvoicesDisplayMRY with', existingInvoices.length, 'invoices');
                        window.updateManualInvoicesDisplayMRY(existingInvoices);
                    }
                    
                    console.log('✅ [MRY DEBUG] Closing overlay and RETURNING - should NOT continue');
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
        console.log('⚠️ [MRY DEBUG] Reached manual list section - this should ONLY happen if NOT saved to DB');
        console.log('📋 [MRY DEBUG] existingInvoices length before manual add:', existingInvoices.length);
        
        // Get optional N° Order if checkbox is checked
        let numeroOrder = null;
        const orderCheckbox = document.getElementById('toggleOrderMRY');
        if (orderCheckbox && orderCheckbox.checked) {
            numeroOrder = document.getElementById('manualInvoiceOrderMRY')?.value || null;
        }
        
        const newInvoice = {
            type: type.replace('_', ' '),
            numero: numero,
            date: formattedDate,
            dateRaw: date,
            montant: montant.toFixed(2),
            numeroOrder: numeroOrder,
            savedToDb: false
        };
        
        existingInvoices.unshift(newInvoice); // Add to beginning (newest first)
        console.log('📋 [MRY DEBUG] existingInvoices length after manual add:', existingInvoices.length);
        console.log('📋 [MRY DEBUG] Added manual invoice:', newInvoice);
        
        // Update display
        if (typeof window.updateManualInvoicesDisplayMRY === 'function') {
            console.log('🔄 [MRY DEBUG] Calling updateManualInvoicesDisplayMRY (manual) with', existingInvoices.length, 'invoices');
            window.updateManualInvoicesDisplayMRY(existingInvoices);
        }
        
        console.log('✅ [MRY DEBUG] Closing overlay after manual add');
        overlay.remove();
        window.notify.success('Succès', 'Facture ajoutée avec succès', 2000);
    };
    
    // Prevent closing on overlay click
    overlay.onclick = (e) => {
        e.stopPropagation();
    };
}

// Show add product modal for MRY
function showAddProductModalMRY(productsArray, renderCallback) {
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
            <textarea id="productNameMRY" placeholder="Ex: Service de transport" rows="3" style="width:100%;padding:0.75rem;background:#2d2d30;border:2px solid #3e3e42;border-radius:8px;color:#fff;font-size:1rem;resize:vertical;font-family:inherit;"></textarea>
        </div>
        
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1.5rem;">
            <div>
                <label style="display:block;color:#4caf50;margin-bottom:0.5rem;font-weight:600;">Prix unitaire HT *</label>
                <input type="number" id="productPriceMRY" placeholder="0.00" step="0.01" min="0" style="width:100%;padding:0.75rem;background:#2d2d30;border:2px solid #3e3e42;border-radius:8px;color:#fff;font-size:1rem;">
            </div>
            <div>
                <label style="display:block;color:#4caf50;margin-bottom:0.5rem;font-weight:600;">Quantité *</label>
                <input type="number" id="productQuantityMRY" placeholder="1" min="1" value="1" style="width:100%;padding:0.75rem;background:#2d2d30;border:2px solid #3e3e42;border-radius:8px;color:#fff;font-size:1rem;">
            </div>
        </div>
        
        <div style="display:flex;gap:1rem;">
            <button id="cancelProductBtnMRY" style="flex:1;padding:0.75rem;background:#3e3e42;color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:1rem;font-weight:600;">
                Annuler
            </button>
            <button id="addProductConfirmBtnMRY" style="flex:1;padding:0.75rem;background:#4caf50;color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:1rem;font-weight:600;">
                ✓ Ajouter
            </button>
        </div>
    `;
    
    productOverlay.appendChild(productModal);
    document.body.appendChild(productOverlay);
    
    // Focus on name input
    setTimeout(() => document.getElementById('productNameMRY').focus(), 100);
    
    // Cancel button
    document.getElementById('cancelProductBtnMRY').onclick = () => {
        productOverlay.remove();
    };
    
    // Add button
    document.getElementById('addProductConfirmBtnMRY').onclick = () => {
        const name = document.getElementById('productNameMRY').value.trim();
        const price = parseFloat(document.getElementById('productPriceMRY').value);
        const quantity = parseInt(document.getElementById('productQuantityMRY').value);
        
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
            document.getElementById('addProductConfirmBtnMRY').click();
        }
    });
}
