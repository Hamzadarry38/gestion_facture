// Situation Mensuelle - Monthly Report Generator for CHAIMAE
// This file handles the generation of monthly situation reports for clients

// Show Situation Mensuelle Modal
window.showSituationMensuelleModal = async function() {
    try {
        // Get all clients
        const clientsResult = await window.electron.dbChaimae.getAllClients();
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
                <input type="text" id="situationClientInput" placeholder="Rechercher un client..." 
                       autocomplete="off"
                       style="width:100%;padding:0.875rem 1rem;background:#2d2d30;border:1px solid #3e3e42;border-radius:10px;color:#fff;font-size:0.95rem;outline:none;transition:all 0.2s;"
                       oninput="searchSituationClients(this.value)"
                       onfocus="this.style.borderColor='#4a90e2';this.style.boxShadow='0 0 0 3px rgba(74,144,226,0.1)';showSituationClientsList()"
                       onblur="this.style.borderColor='#3e3e42';this.style.boxShadow='none';hideSituationClientsList()">
                <input type="hidden" id="situationClientId" value="">
                <div id="situationClientsDropdown" style="display:none;position:absolute;top:100%;left:0;right:0;background:#2d2d30;border:1px solid #3e3e42;border-top:none;border-radius:0 0 10px 10px;max-height:250px;overflow-y:auto;z-index:1000;margin-top:-10px;box-shadow:0 8px 20px rgba(0,0,0,0.4);"></div>
            </div>
            <style>
                .situation-dropdown-item {
                    padding: 0.75rem 1rem;
                    cursor: pointer;
                    border-bottom: 1px solid #3e3e42;
                    transition: all 0.2s;
                }
                .situation-dropdown-item:hover {
                    background: #4a90e2;
                }
                .situation-dropdown-item:last-child {
                    border-bottom: none;
                }
                .situation-client-name {
                    color: #fff;
                    font-weight: 600;
                    margin-bottom: 0.25rem;
                }
                .situation-client-ice {
                    color: #999;
                    font-size: 0.85rem;
                }
                .situation-no-results {
                    padding: 1rem;
                    text-align: center;
                    color: #999;
                }
            </style>
            
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1.25rem;">
                <div>
                    <label style="display:block;color:#4a90e2;margin-bottom:0.5rem;font-weight:600;font-size:0.9rem;text-transform:uppercase;letter-spacing:0.5px;">Mois</label>
                    <select id="situationMonth" style="width:100%;padding:0.875rem 1rem;background:#2d2d30;border:1px solid #3e3e42;border-radius:10px;color:#fff;font-size:0.95rem;outline:none;cursor:pointer;transition:all 0.2s;" onfocus="this.style.borderColor='#4a90e2';this.style.boxShadow='0 0 0 3px rgba(74,144,226,0.1)'" onblur="this.style.borderColor='#3e3e42';this.style.boxShadow='none'">
                        ${months.map(m => `<option value="${m.value}" ${m.value === new Date().getMonth() + 1 ? 'selected' : ''}>${m.label}</option>`).join('')}
                    </select>
                </div>
                <div>
                    <label style="display:block;color:#4a90e2;margin-bottom:0.5rem;font-weight:600;font-size:0.9rem;text-transform:uppercase;letter-spacing:0.5px;">Année</label>
                    <select id="situationYear" style="width:100%;padding:0.875rem 1rem;background:#2d2d30;border:1px solid #3e3e42;border-radius:10px;color:#fff;font-size:0.95rem;outline:none;cursor:pointer;transition:all 0.2s;" onfocus="this.style.borderColor='#4a90e2';this.style.boxShadow='0 0 0 3px rgba(74,144,226,0.1)'" onblur="this.style.borderColor='#3e3e42';this.style.boxShadow='none'">
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
                        <button id="situationAddManualInvoice" style="padding:0.625rem 1rem;background:linear-gradient(135deg, #ff9800 0%, #f57c00 100%);color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:0.85rem;font-weight:600;transition:all 0.2s;box-shadow:0 2px 8px rgba(255,152,0,0.25);" onmouseover="this.style.transform='translateY(-1px)';this.style.boxShadow='0 4px 12px rgba(255,152,0,0.35)'" onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='0 2px 8px rgba(255,152,0,0.25)'">
                            ➕ Ajouter
                        </button>
                        <button id="situationSelectInvoices" style="padding:0.625rem 1rem;background:linear-gradient(135deg, #4caf50 0%, #388e3c 100%);color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:0.85rem;font-weight:600;transition:all 0.2s;box-shadow:0 2px 8px rgba(76,175,80,0.25);" onmouseover="this.style.transform='translateY(-1px)';this.style.boxShadow='0 4px 12px rgba(76,175,80,0.35)'" onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='0 2px 8px rgba(76,175,80,0.25)'">
                            🔍 Choisir
                        </button>
                    </div>
                </div>
                <div id="selectedInvoicesCount" style="color:#4caf50;font-size:0.85rem;font-weight:600;display:none;margin-top:0.75rem;padding:0.5rem 0.75rem;background:rgba(76,175,80,0.1);border-radius:6px;">
                    ✓ <span id="selectedCountText">0</span> facture(s) sélectionnée(s)
                </div>
                <div id="manualInvoicesList" style="margin-top:0.75rem;display:none;">
                    <div style="color:#ff9800;font-weight:600;font-size:0.85rem;margin-bottom:0.5rem;display:flex;align-items:center;gap:0.5rem;">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff9800" stroke-width="2">
                            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                        <span>Factures manuelles ajoutées</span>
                    </div>
                    <div id="manualInvoicesContainer" style="display:flex;flex-direction:column;gap:0.5rem;"></div>
                </div>
            </div>
            
            <div style="display:flex;gap:0.75rem;margin-top:1.5rem;">
                <button id="situationCancel" style="flex:1;padding:0.875rem 1.5rem;background:#3e3e42;color:#fff;border:none;border-radius:10px;cursor:pointer;font-size:0.95rem;font-weight:600;transition:all 0.2s;" onmouseover="this.style.background='#4e4e52'" onmouseout="this.style.background='#3e3e42'">
                    Annuler
                </button>
                <button id="situationGenerate" style="flex:2;padding:0.875rem 1.5rem;background:linear-gradient(135deg, #4a90e2 0%, #357abd 100%);color:#fff;border:none;border-radius:10px;cursor:pointer;font-size:0.95rem;font-weight:600;transition:all 0.2s;box-shadow:0 4px 12px rgba(74,144,226,0.3);display:flex;align-items:center;justify-content:center;gap:0.5rem;" onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 6px 20px rgba(74,144,226,0.4)'" onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='0 4px 12px rgba(74,144,226,0.3)'">
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
        let situationFilteredClients = clients;
        
        // Search clients function
        window.searchSituationClients = function(query) {
            if (!query || query.trim().length === 0) {
                situationFilteredClients = clients;
            } else {
                const searchTerm = query.toLowerCase().trim();
                situationFilteredClients = clients.filter(client => 
                    client.nom.toLowerCase().includes(searchTerm) || 
                    client.ice.toLowerCase().includes(searchTerm)
                );
            }
            displaySituationClientsList();
        };
        
        // Display clients list
        function displaySituationClientsList() {
            const dropdown = document.getElementById('situationClientsDropdown');
            if (!dropdown) return;
            
            if (situationFilteredClients.length === 0) {
                dropdown.innerHTML = '<div class="situation-no-results">Aucun client trouvé</div>';
                dropdown.style.display = 'block';
                return;
            }
            
            dropdown.innerHTML = situationFilteredClients.slice(0, 10).map(client => `
                <div class="situation-dropdown-item" onmousedown="selectSituationClient(${client.id}, '${client.nom.replace(/'/g, "\\'")}', '${client.ice}')">
                    <div class="situation-client-name">${client.nom}</div>
                    <div class="situation-client-ice" style="color:white;hover-color:white">ICE: ${client.ice}</div>
                </div>
            `).join('');
            
            dropdown.style.display = 'block';
        }
        
        window.showSituationClientsList = function() {
            if (clients.length > 0) {
                situationFilteredClients = clients;
                displaySituationClientsList();
            }
        };
        
        window.hideSituationClientsList = function() {
            setTimeout(() => {
                const dropdown = document.getElementById('situationClientsDropdown');
                if (dropdown) dropdown.style.display = 'none';
            }, 200);
        };
        
        // Select client from dropdown
        window.selectSituationClient = function(id, nom, ice) {
            document.getElementById('situationClientInput').value = `${nom} (${ice})`;
            document.getElementById('situationClientId').value = id;
            
            // Store client info for later use
            window.selectedSituationClientChaimae = { id, nom, ice };
            
            const dropdown = document.getElementById('situationClientsDropdown');
            if (dropdown) dropdown.style.display = 'none';
        };
        
        // Store selected invoices and manual invoices
        let selectedInvoicesChaimae = [];
        // Clear manual invoices when opening modal (fresh start each time)
        window.manualInvoicesChaimae = [];
        let manualInvoicesChaimae = window.manualInvoicesChaimae;
        
        // Show manual invoice add modal
        document.getElementById('situationAddManualInvoice').onclick = () => {
            const clientIdInput = document.getElementById('situationClientId');
            
            if (!clientIdInput || !clientIdInput.value || !window.selectedSituationClientChaimae) {
                window.notify.error('Erreur', 'Veuillez d\'abord sélectionner un client', 3000);
                return;
            }
            
            showAddManualInvoiceModalChaimae(manualInvoicesChaimae);
        };
        
        // Update manual invoices display
        window.updateManualInvoicesDisplayChaimae = function(invoices) {
            manualInvoicesChaimae = invoices;
            window.manualInvoicesChaimae = invoices; // Persist to global
            const listElement = document.getElementById('manualInvoicesList');
            const containerElement = document.getElementById('manualInvoicesContainer');
            
            if (invoices.length > 0) {
                listElement.style.display = 'block';
                
                // Create table with newest first
                containerElement.innerHTML = `
                    <div style="display:flex;flex-direction:column;gap:0.75rem;margin-top:0.75rem;">
                        ${invoices.map((inv, index) => `
                            <div style="background:linear-gradient(135deg, #3a3a3a 0%, #2d2d2d 100%);border:1px solid #4a4a4a;border-radius:10px;padding:1rem;display:flex;align-items:center;justify-content:space-between;box-shadow:0 2px 8px rgba(0,0,0,0.3);transition:all 0.2s;" onmouseover="this.style.borderColor='#ff9800';this.style.boxShadow='0 4px 12px rgba(255,152,0,0.2)'" onmouseout="this.style.borderColor='#4a4a4a';this.style.boxShadow='0 2px 8px rgba(0,0,0,0.3)'">
                                <div style="display:flex;flex-direction:column;gap:0.5rem;flex:1;">
                                    <div style="display:flex;align-items:center;gap:1.25rem;">
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
                                    ${inv.numeroOrder || inv.bonLivraison || inv.bonCommande ? `
                                        <div style="display:flex;align-items:center;gap:1rem;padding-left:1.25rem;flex-wrap:wrap;">
                                            ${inv.numeroOrder ? `
                                                <div style="display:flex;align-items:center;gap:0.5rem;">
                                                    <span style="color:#2196F3;font-size:0.75rem;font-weight:600;">N° Order:</span>
                                                    <span style="color:#64B5F6;font-size:0.85rem;font-weight:600;">${inv.numeroOrder}</span>
                                                </div>
                                            ` : ''}
                                            ${inv.bonLivraison ? `
                                                <div style="display:flex;align-items:center;gap:0.5rem;">
                                                    <span style="color:#9C27B0;font-size:0.75rem;font-weight:600;">Bon de livraison:</span>
                                                    <span style="color:#BA68C8;font-size:0.85rem;font-weight:600;">${inv.bonLivraison}</span>
                                                </div>
                                            ` : ''}
                                            ${inv.bonCommande ? `
                                                <div style="display:flex;align-items:center;gap:0.5rem;">
                                                    <span style="color:#FF9800;font-size:0.75rem;font-weight:600;">N° Order:</span>
                                                    <span style="color:#FFB74D;font-size:0.85rem;font-weight:600;">${inv.bonCommande}</span>
                                                </div>
                                            ` : ''}
                                        </div>
                                    ` : ''}
                                </div>
                                <button onclick="removeManualInvoiceChaimae(${index})" 
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
        window.removeManualInvoiceChaimae = function(index) {
            manualInvoicesChaimae.splice(index, 1);
            window.manualInvoicesChaimae = manualInvoicesChaimae; // Persist to global
            window.updateManualInvoicesDisplayChaimae(manualInvoicesChaimae);
        };
        
        // Show invoice selection modal
        document.getElementById('situationSelectInvoices').onclick = async () => {
            const clientId = document.getElementById('situationClientId').value;
            const month = parseInt(document.getElementById('situationMonth').value);
            const year = parseInt(document.getElementById('situationYear').value);
            
            if (!clientId) {
                window.notify.error('Erreur', 'Veuillez d\'abord sélectionner un client', 3000);
                return;
            }
            
            await showInvoiceSelectionModalChaimae(clientId, month, year, selectedInvoicesChaimae);
        };
        
        // Update selected invoices callback
        window.updateSelectedInvoicesChaimae = function(invoices) {
            selectedInvoicesChaimae = invoices;
            const countElement = document.getElementById('selectedInvoicesCount');
            const countText = document.getElementById('selectedCountText');
            
            if (invoices.length > 0) {
                countElement.style.display = 'block';
                countText.textContent = invoices.length;
            } else {
                countElement.style.display = 'none';
            }
        };
        
        document.getElementById('situationCancel').onclick = () => overlay.remove();
        document.getElementById('situationGenerate').onclick = async () => {
            const clientId = document.getElementById('situationClientId').value;
            const month = parseInt(document.getElementById('situationMonth').value);
            const year = parseInt(document.getElementById('situationYear').value);
            
            if (!clientId) {
                window.notify.error('Erreur', 'Veuillez selectionner un client', 3000);
                return;
            }
            
            // Show sort selection modal
            showSortSelectionModal(clientId, month, year, selectedInvoicesChaimae, manualInvoicesChaimae, overlay);
        };
        
        // Removed overlay click to close - user must use buttons
        
    } catch (error) {
        console.error('Error showing situation modal:', error);
        window.notify.error('Erreur', 'Impossible d\'afficher la fenêtre', 3000);
    }
};

// Format number with spaces for thousands
function formatAmount(amount) {
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
function addHeaderToPDF(doc, client, month, year, monthNames, blueColor, greenColor) {
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
    doc.text('CHAIMAE ERRBAHI DIQ sarl (AU)', 105, 20, { align: 'center' });
    
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
    doc.text(client.nom.toUpperCase(), 40, 55);
    
    doc.setTextColor(0, 0, 0);
    doc.text('ICE :', 15, 62);
    doc.setTextColor(...greenColor);
    doc.text(client.ice, 40, 62);
    
    // Date
    doc.setTextColor(0, 0, 0);
    doc.text(`Date: ${new Date().toLocaleDateString('fr-FR')}`, 150, 55);
    
    // Title
    doc.setFontSize(15);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text('SITUATION', 105, 75, { align: 'center' });
    
    doc.setTextColor(...blueColor);
    doc.setFontSize(13);
    doc.text(`${monthNames[month]} ${year}`, 105, 82, { align: 'center' });
}

// Add footer to PDF page
function addFooterToPDF(doc, pageNumber, totalPages) {
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

// Generate Situation Mensuelle PDF
// Show sort selection modal before generating PDF
function showSortSelectionModal(clientId, month, year, selectedInvoices, manualInvoices, previousOverlay) {
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
            <button class="sort-option" data-sort="date_asc" style="padding:1.25rem;background:#2d2d30;border:2px solid #3e3e42;border-radius:8px;color:#fff;cursor:pointer;text-align:left;transition:all 0.3s;font-size:1rem;">
                <div style="display:flex;align-items:center;gap:1rem;">
                    <span style="font-size:1.5rem;">📅</span>
                    <div>
                        <div style="font-weight:600;margin-bottom:0.25rem;">Date: Du plus ancien au plus récent</div>
                        <div style="color:#999;font-size:0.85rem;">Tri chronologique croissant</div>
                    </div>
                </div>
            </button>
            
            <button class="sort-option" data-sort="date_desc" style="padding:1.25rem;background:#2d2d30;border:2px solid #3e3e42;border-radius:8px;color:#fff;cursor:pointer;text-align:left;transition:all 0.3s;font-size:1rem;">
                <div style="display:flex;align-items:center;gap:1rem;">
                    <span style="font-size:1.5rem;">📆</span>
                    <div>
                        <div style="font-weight:600;margin-bottom:0.25rem;">Date: Du plus récent au plus ancien</div>
                        <div style="color:#999;font-size:0.85rem;">Tri chronologique décroissant</div>
                    </div>
                </div>
            </button>
            
            <button class="sort-option" data-sort="amount_asc" style="padding:1.25rem;background:#2d2d30;border:2px solid #3e3e42;border-radius:8px;color:#fff;cursor:pointer;text-align:left;transition:all 0.3s;font-size:1rem;">
                <div style="display:flex;align-items:center;gap:1rem;">
                    <span style="font-size:1.5rem;">💵</span>
                    <div>
                        <div style="font-weight:600;margin-bottom:0.25rem;">Montant: Du plus petit au plus grand</div>
                        <div style="color:#999;font-size:0.85rem;">Tri par montant croissant</div>
                    </div>
                </div>
            </button>
            
            <button class="sort-option" data-sort="amount_desc" style="padding:1.25rem;background:#2d2d30;border:2px solid #3e3e42;border-radius:8px;color:#fff;cursor:pointer;text-align:left;transition:all 0.3s;font-size:1rem;">
                <div style="display:flex;align-items:center;gap:1rem;">
                    <span style="font-size:1.5rem;">💰</span>
                    <div>
                        <div style="font-weight:600;margin-bottom:0.25rem;">Montant: Du plus grand au plus petit</div>
                        <div style="color:#999;font-size:0.85rem;">Tri par montant décroissant</div>
                    </div>
                </div>
            </button>
            
            <button class="sort-option" data-sort="numero_asc" style="padding:1.25rem;background:#2d2d30;border:2px solid #3e3e42;border-radius:8px;color:#fff;cursor:pointer;text-align:left;transition:all 0.3s;font-size:1rem;">
                <div style="display:flex;align-items:center;gap:1rem;">
                    <span style="font-size:1.5rem;">🔢</span>
                    <div>
                        <div style="font-weight:600;margin-bottom:0.25rem;">N° Document: Du plus petit au plus grand</div>
                        <div style="color:#999;font-size:0.85rem;">Tri par numéro croissant (1, 2, 3...)</div>
                    </div>
                </div>
            </button>
            
            <button class="sort-option" data-sort="numero_desc" style="padding:1.25rem;background:#2d2d30;border:2px solid #3e3e42;border-radius:8px;color:#fff;cursor:pointer;text-align:left;transition:all 0.3s;font-size:1rem;">
                <div style="display:flex;align-items:center;gap:1rem;">
                    <span style="font-size:1.5rem;">🔠</span>
                    <div>
                        <div style="font-weight:600;margin-bottom:0.25rem;">N° Document: Du plus grand au plus petit</div>
                        <div style="color:#999;font-size:0.85rem;">Tri par numéro décroissant (...3, 2, 1)</div>
                    </div>
                </div>
            </button>
        </div>
        
        <button id="sortCancelBtn" style="width:100%;padding:1rem;background:#3e3e42;color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:1rem;font-weight:600;transition:all 0.3s;">
            Annuler
        </button>
    `;
    
    sortOverlay.appendChild(sortModal);
    document.body.appendChild(sortOverlay);
    
    // Add hover effects
    const sortOptions = sortModal.querySelectorAll('.sort-option');
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
            console.log('🎯 [SORT SELECTED]:', sortBy);
            sortOverlay.remove();
            
            // Show Order/BL/BC selection dialog before generating PDF
            await showOrderBLBCSelectionModalChaimae(clientId, month, year, sortBy, selectedInvoices, manualInvoices, previousOverlay);
        };
    });
    
    document.getElementById('sortCancelBtn').onclick = () => {
        sortOverlay.remove();
    };
}

// Show Order/BL/BC selection modal for Situation Mensuelle Chaimae
async function showOrderBLBCSelectionModalChaimae(clientId, month, year, sortBy, selectedInvoices, manualInvoices, previousOverlay) {
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
                <label style="display:flex;align-items:center;cursor:pointer;padding:1rem;background:#1e1e1e;border:2px solid #2196F3;border-radius:10px;margin-bottom:1rem;transition:all 0.2s ease;">
                    <input type="checkbox" id="includeOrderCheckboxSituationChaimae" checked style="width:20px;height:20px;margin-right:1rem;cursor:pointer;accent-color:#2196F3;">
                    <span style="font-size:0.95rem;color:#e0e0e0;font-weight:500;">
                        Afficher les N° Order dans le PDF
                    </span>
                </label>
                <label style="display:flex;align-items:center;cursor:pointer;padding:1rem;background:#1e1e1e;border:2px solid #4caf50;border-radius:10px;margin-bottom:1rem;transition:all 0.2s ease;">
                    <input type="checkbox" id="includeBLCheckboxSituationChaimae" checked style="width:20px;height:20px;margin-right:1rem;cursor:pointer;accent-color:#4caf50;">
                    <span style="font-size:0.95rem;color:#e0e0e0;font-weight:500;">
                        Afficher les Bon de livraison dans le PDF
                    </span>
                </label>
                <label style="display:flex;align-items:center;cursor:pointer;padding:1rem;background:#1e1e1e;border:2px solid #ff9800;border-radius:10px;transition:all 0.2s ease;">
                    <input type="checkbox" id="includeBCCheckboxSituationChaimae" checked style="width:20px;height:20px;margin-right:1rem;cursor:pointer;accent-color:#ff9800;">
                    <span style="font-size:0.95rem;color:#e0e0e0;font-weight:500;">
                        Afficher les N° Order dans le PDF
                    </span>
                </label>
            </div>
            <div class="custom-modal-footer">
                <button class="custom-modal-btn primary" id="continueBtnSituationChaimae" style="padding:0.75rem 2rem;font-size:1rem;">Générer PDF</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(selectionOverlay);
    
    const orderCheckbox = selectionOverlay.querySelector('#includeOrderCheckboxSituationChaimae');
    const blCheckbox = selectionOverlay.querySelector('#includeBLCheckboxSituationChaimae');
    const bcCheckbox = selectionOverlay.querySelector('#includeBCCheckboxSituationChaimae');
    const continueBtn = selectionOverlay.querySelector('#continueBtnSituationChaimae');
    
    continueBtn.addEventListener('click', async () => {
        const includeOrder = orderCheckbox.checked;
        const includeBL = blCheckbox.checked;
        const includeBC = bcCheckbox.checked;
        
        console.log('✅ [CHAIMAE] Include Order:', includeOrder, '| Include BL:', includeBL, '| Include BC:', includeBC);
        
        selectionOverlay.remove();
        previousOverlay.remove();
        
        await generateSituationMensuelle(clientId, month, year, sortBy, selectedInvoices, manualInvoices, includeOrder, includeBL, includeBC);
    });
    
    selectionOverlay.addEventListener('click', (e) => {
        if (e.target === selectionOverlay) {
            const includeOrder = orderCheckbox.checked;
            const includeBL = blCheckbox.checked;
            const includeBC = bcCheckbox.checked;
            selectionOverlay.remove();
            previousOverlay.remove();
            generateSituationMensuelle(clientId, month, year, sortBy, selectedInvoices, manualInvoices, includeOrder, includeBL, includeBC);
        }
    });
    
    setTimeout(() => continueBtn.focus(), 100);
}

window.generateSituationMensuelle = async function(clientId, month, year, sortBy = 'date_asc', selectedInvoiceIds = [], manualInvoices = [], includeOrder = true, includeBL = true, includeBC = true) {
    try {
        console.log('🎯 [GENERATE FUNCTION] Called with parameters:');
        console.log('   - clientId:', clientId);
        console.log('   - month:', month, 'year:', year);
        console.log('   - sortBy:', sortBy);
        console.log('   - selectedInvoiceIds:', selectedInvoiceIds);
        console.log('   - manualInvoices:', manualInvoices);
        console.log('   - manualInvoices length:', manualInvoices.length);
        
        window.notify.info('Info', 'Generation du rapport en cours...', 2000);
        
        // Get client info
        const clientsResult = await window.electron.dbChaimae.getAllClients();
        const client = clientsResult.data.find(c => c.id == clientId);
        
        if (!client) {
            window.notify.error('Erreur', 'Client introuvable', 3000);
            return;
        }
        
        // Get all invoices for this client in the specified month
        const invoicesResult = await window.electron.dbChaimae.getAllInvoices();
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
        console.log('📋 [CHAIMAE PDF] Total manualInvoices:', manualInvoices.length);
        
        if (manualInvoices.length > 0) {
            // Get existing invoice numbers to avoid duplicates
            const existingNumbers = new Set();
            allInvoices.forEach(inv => {
                if (inv.document_numero) existingNumbers.add(inv.document_numero);
                if (inv.document_numero_devis) existingNumbers.add(inv.document_numero_devis);
                if (inv.document_bon_de_livraison) existingNumbers.add(inv.document_bon_de_livraison);
            });
            
            console.log('📋 [CHAIMAE PDF] Existing invoice numbers:', Array.from(existingNumbers));
            
            manualInvoices.forEach(manInv => {
                // Skip if this invoice is already in the list (avoid duplicates)
                if (manInv.savedToDb && existingNumbers.has(manInv.numero)) {
                    console.log('⏭️ [CHAIMAE PDF] Skipping duplicate invoice:', manInv.numero);
                    return;
                }
                
                const docType = manInv.type.toLowerCase().replace(' ', '_');
                const invoiceObj = {
                    document_type: docType,
                    document_numero: docType === 'facture' ? manInv.numero : null,
                    document_numero_devis: docType === 'devis' ? manInv.numero : null,
                    document_bon_de_livraison: docType === 'bon_livraison' || docType === 'bl' ? manInv.numero : null,
                    document_numero_Order: manInv.numeroOrder || null,
                    document_numero_commande: manInv.bonCommande || null,
                    document_date: manInv.dateRaw,
                    total_ht: parseFloat(manInv.montant),
                    isManual: true
                };
                console.log('➕ [CHAIMAE PDF] Adding manual invoice to PDF:', manInv.numero);
                console.log('   - Type:', docType);
                console.log('   - numeroOrder:', manInv.numeroOrder);
                console.log('   - bonLivraison:', manInv.bonLivraison);
                console.log('   - bonCommande:', manInv.bonCommande);
                console.log('   - document_numero_commande:', invoiceObj.document_numero_commande);
                allInvoices.push(invoiceObj);
            });
        }
        
        console.log('📊 [PDF GENERATION] Total invoices after adding manual:', allInvoices.length);
        
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
                const numA = parseInt((a.document_numero || '0').replace(/\D/g, '')) || 0;
                const numB = parseInt((b.document_numero || '0').replace(/\D/g, '')) || 0;
                return numA - numB;
            } else if (sortBy === 'date_desc') {
                const dateCompare = new Date(b.document_date) - new Date(a.document_date);
                if (dateCompare !== 0) return dateCompare;
                // Secondary sort by invoice number if dates are equal
                const numA = parseInt((a.document_numero || '0').replace(/\D/g, '')) || 0;
                const numB = parseInt((b.document_numero || '0').replace(/\D/g, '')) || 0;
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
                // Sort by document number ascending (smallest to largest)
                // Extract number from different formats: "10/2025", "MG03/2025", "01/2025", etc.
                const getNumero = (inv) => {
                    // Get the appropriate numero field based on document type
                    let numero = '0';
                    if (inv.document_type === 'facture') {
                        numero = inv.document_numero || '0';
                    } else if (inv.document_type === 'devis') {
                        numero = inv.document_numero_devis || '0';
                    } else if (inv.document_type === 'bon_livraison' || inv.document_type === 'bon de livraison') {
                        numero = inv.document_bon_de_livraison || inv.document_numero_bl || inv.document_numero || '0';
                    }
                    // Remove prefix letters (MG, YT, HA, etc.) and extract only digits before /
                    const match = numero.match(/(\d+)(?:\/|$)/);
                    return match ? parseInt(match[1]) : 0;
                };
                const numA = getNumero(a);
                const numB = getNumero(b);
                const numCompare = numA - numB;
                if (numCompare !== 0) return numCompare;
                // Secondary sort by date if numbers are equal
                return new Date(a.document_date) - new Date(b.document_date);
            } else if (sortBy === 'numero_desc') {
                // Sort by document number descending (largest to smallest)
                // Extract number from different formats: "10/2025", "MG03/2025", "01/2025", etc.
                const getNumero = (inv) => {
                    // Get the appropriate numero field based on document type
                    let numero = '0';
                    if (inv.document_type === 'facture') {
                        numero = inv.document_numero || '0';
                    } else if (inv.document_type === 'devis') {
                        numero = inv.document_numero_devis || '0';
                    } else if (inv.document_type === 'bon_livraison' || inv.document_type === 'bon de livraison') {
                        numero = inv.document_bon_de_livraison || inv.document_numero_bl || inv.document_numero || '0';
                    }
                    // Remove prefix letters (MG, YT, HA, etc.) and extract only digits before /
                    const match = numero.match(/(\d+)(?:\/|$)/);
                    return match ? parseInt(match[1]) : 0;
                };
                const numA = getNumero(a);
                const numB = getNumero(b);
                const numCompare = numB - numA;
                if (numCompare !== 0) return numCompare;
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
            script.onload = () => {
                console.log('📚 [JSPDF] Library loaded, calling generateSituationMensuelle with manual invoices:', manualInvoices.length);
                generateSituationMensuelle(clientId, month, year, sortBy, selectedInvoiceIds, manualInvoices);
            };
            document.head.appendChild(script);
            return;
        }
        
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        const blueColor = [33, 97, 140]; // #21618C
        const greenColor = [76, 175, 80]; // #4caf50
        
        const monthNames = ['', 'JANVIER', 'FEVRIER', 'MARS', 'AVRIL', 'MAI', 'JUIN', 
                           'JUILLET', 'AOUT', 'SEPTEMBRE', 'OCTOBRE', 'NOVEMBRE', 'DECEMBRE'];
        
        let pageNumber = 1;
        const pages = [];
        
        // Add first page header
        addHeaderToPDF(doc, client, month, year, monthNames, blueColor, greenColor);
        
        // Table Header - 4 columns only
        const startY = 90;
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
                addHeaderToPDF(doc, client, month, year, monthNames, blueColor, greenColor);
                
                // Add table header again
                const newStartY = 95;
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
                mainNumero = inv.document_bon_de_livraison || inv.document_numero_bl || inv.document_numero || '-';
                console.log('📄 [PDF ROW] Bon de livraison:', mainNumero);
                console.log('   - includeBC:', includeBC);
                console.log('   - document_numero_commande:', inv.document_numero_commande);
                if (includeBC && inv.document_numero_commande) {
                    console.log('   ✅ Adding N° Order to details');
                    details.push('N° Order: ' + inv.document_numero_commande);
                } else {
                    console.log('   ❌ NOT adding N° Order (includeBC:', includeBC, ', commande:', inv.document_numero_commande, ')');
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
            doc.text(formatAmount(ht) + ' DH', 188, currentY + 2.5, { align: 'right' });
            
            currentY += rowHeight;
        });
        
        // Totals
        currentY += 10;
        
        // Check if totals fit on current page
        if (currentY > 230) {
            pages.push(pageNumber);
            pageNumber++;
            doc.addPage();
            addHeaderToPDF(doc, client, month, year, monthNames, blueColor, greenColor);
            currentY = 110;
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
        doc.text(`${formatAmount(totalHT)} DH`, 192, currentY + 5.5, { align: 'right' });
        
        // MONTANT TVA
        currentY += 8;
        doc.setFillColor(255, 255, 255);
        doc.rect(110, currentY, 85, 8, 'F');
        doc.setFontSize(9);
        doc.text('MONTANT TVA 20% :', 113, currentY + 5.5);
        doc.setFontSize(8);
        doc.text(`${formatAmount(montantTVA)} DH`, 192, currentY + 5.5, { align: 'right' });
        
        // MONTANT T.T.C
        currentY += 8;
        doc.setFillColor(173, 216, 230);
        doc.rect(110, currentY, 85, 8, 'F');
        doc.setTextColor(...blueColor);
        doc.setFontSize(9);
        doc.text('MONTANT T.T.C :', 113, currentY + 5.5);
        doc.setFontSize(8.5);
        doc.text(`${formatAmount(totalTTC)} DH`, 192, currentY + 5.5, { align: 'right' });
        
        // Amount in words
        currentY += 15;
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(9);
        doc.setFont(undefined, 'italic');
        console.log('💰 [AMOUNT TO WORDS] Converting totalTTC:', totalTTC);
        const amountInWords = numberToFrenchWordsChaimae(totalTTC);
        console.log('💰 [AMOUNT TO WORDS] Result:', amountInWords);
        
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
            // For bon_livraison or any other type: shouldShowText stays false
        }
        // For mixed types: shouldShowText stays false
        
        // Removed amount in words text
        
        // Add footers to all pages
        pages.push(pageNumber);
        const totalPagesCount = pages.length;
        
        for (let i = 0; i < totalPagesCount; i++) {
            doc.setPage(i + 1);
            addFooterToPDF(doc, i + 1, totalPagesCount);
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
function numberToFrenchWordsChaimae(number) {
    // Ensure number is a valid number
    const num = parseFloat(number);
    if (isNaN(num)) {
        return 'zéro dirham et zéro centime';
    }
    
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
    
    const parts = num.toFixed(2).split('.');
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

// Show invoice selection modal for CHAIMAE
async function showInvoiceSelectionModalChaimae(clientId, month, year, preSelectedInvoices = []) {
    try {
        const result = await window.electron.dbChaimae.getAllInvoices();
        if (!result.success) {
            throw new Error('Impossible de charger les factures');
        }
        
        const allInvoices = result.data.filter(inv => {
            const invDate = new Date(inv.document_date);
            const invMonth = invDate.getMonth() + 1;
            const invYear = invDate.getFullYear();
            return inv.client_id == clientId && invMonth === month && invYear === year;
        });
        
        if (allInvoices.length === 0) {
            window.notify.error('Erreur', 'Aucune facture trouvée pour cette période', 3000);
            return;
        }
        
        // Store for filtering
        let currentFilter = 'all';
        let filteredInvoices = [...allInvoices];
        
        const overlay = document.createElement('div');
        overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.95);z-index:1000000;display:flex;align-items:center;justify-content:center;animation:fadeIn 0.2s;';
        
        const modal = document.createElement('div');
        modal.style.cssText = 'background:#1e1e1e;border:3px solid #4caf50;border-radius:16px;padding:2rem;width:90%;max-width:900px;max-height:85vh;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 20px 60px rgba(0,0,0,0.9);';
        
        let selectedInvoices = [...preSelectedInvoices];
        
        function renderInvoicesList() {
            const container = document.getElementById('invoicesListContainerChaimae');
            if (!container) return;
            
            container.innerHTML = filteredInvoices.map(inv => {
                const isSelected = selectedInvoices.includes(inv.id);
                let docType = 'Facture';
                if (inv.document_type === 'devis') {
                    docType = 'Devis';
                } else if (inv.document_type === 'bon_livraison' || inv.document_type === 'bon de livraison') {
                    docType = 'Bon de livraison';
                } else if (inv.document_type === 'facture') {
                    docType = 'Facture';
                }
                
                const docNum = inv.document_numero || inv.document_numero_devis || inv.document_bon_de_livraison || inv.document_numero_bl || 'N/A';
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
            document.getElementById('totalCountDisplayChaimae').textContent = filteredInvoices.length;
        }
        
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
                        <span id="selectedCountDisplayChaimae">0</span> / <span id="totalCountDisplayChaimae">${allInvoices.length}</span> affichées
                    </div>
                    <div style="color:#ff9800;font-weight:600;font-size:0.9rem;">
                        Total sélectionné: <span id="totalSelectedCountChaimae">0</span> / ${allInvoices.length}
                    </div>
                </div>
                <div style="display:flex;gap:0.5rem;">
                    <button id="filterAllBtnChaimae" style="padding:0.5rem 1rem;background:#2196f3;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:0.85rem;font-weight:600;">
                        📋 Tous
                    </button>
                    <button id="filterFactureBtnChaimae" style="padding:0.5rem 1rem;background:#2196f3;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:0.85rem;font-weight:600;">
                        📄 Facture
                    </button>
                    <button id="filterDevisBtnChaimae" style="padding:0.5rem 1rem;background:#2196f3;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:0.85rem;font-weight:600;">
                        📝 Devis
                    </button>
                    <button id="filterBonLivraisonBtnChaimae" style="padding:0.5rem 1rem;background:#2196f3;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:0.85rem;font-weight:600;">
                        📦 Bon de livraison
                    </button>
                </div>
            </div>
            
            <div style="display:flex;justify-content:flex-end;gap:0.5rem;margin-bottom:1rem;">
                <button id="selectAllBtnChaimae" style="padding:0.5rem 1rem;background:#4caf50;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:0.85rem;font-weight:600;">
                    ✓ Tout sélectionner
                </button>
                <button id="deselectAllBtnChaimae" style="padding:0.5rem 1rem;background:#f44336;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:0.85rem;font-weight:600;">
                    ✗ Tout désélectionner
                </button>
            </div>
            
            <div id="invoicesListContainerChaimae" style="flex:1;overflow-y:auto;margin-bottom:1.5rem;padding-right:0.5rem;">
            </div>
            
            <div style="display:flex;gap:1rem;">
                <button id="cancelSelectionBtnChaimae" style="flex:1;padding:1rem;background:#3e3e42;color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:1rem;font-weight:600;">
                    Annuler
                </button>
                <button id="confirmSelectionBtnChaimae" style="flex:1;padding:1rem;background:#4caf50;color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:1rem;font-weight:600;">
                    ✓ Confirmer la sélection
                </button>
            </div>
        `;
        
        overlay.appendChild(modal);
        document.body.appendChild(overlay);
        
        // Log all invoices on load
        console.log('📋 [INVOICES] Total invoices loaded:', allInvoices.length);
        allInvoices.forEach((inv, index) => {
            console.log(`📋 [INVOICE ${index + 1}]`, {
                id: inv.id,
                type: inv.document_type,
                numero: inv.document_numero || inv.document_numero_devis || inv.document_bon_de_livraison,
                date: inv.document_date
            });
        });
        
        function updateSelectedCount() {
            const countDisplay = document.getElementById('selectedCountDisplayChaimae');
            const totalSelectedDisplay = document.getElementById('totalSelectedCountChaimae');
            
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
        
        // Render initial list
        renderInvoicesList();
        
        // Filter buttons
        document.getElementById('filterAllBtnChaimae').onclick = () => {
            console.log('🔵 Filter: ALL');
            filteredInvoices = [...allInvoices];
            renderInvoicesList();
            updateSelectedCount();
        };
        
        document.getElementById('filterFactureBtnChaimae').onclick = () => {
            console.log('🔵 Filter: FACTURE');
            filteredInvoices = allInvoices.filter(inv => inv.document_type === 'facture');
            console.log('✅ Filtered:', filteredInvoices.length, 'factures');
            renderInvoicesList();
            updateSelectedCount();
        };
        
        document.getElementById('filterDevisBtnChaimae').onclick = () => {
            console.log('🔵 Filter: DEVIS');
            filteredInvoices = allInvoices.filter(inv => inv.document_type === 'devis');
            console.log('✅ Filtered:', filteredInvoices.length, 'devis');
            renderInvoicesList();
            updateSelectedCount();
        };
        
        document.getElementById('filterBonLivraisonBtnChaimae').onclick = () => {
            console.log('🔵 Filter: BON DE LIVRAISON');
            filteredInvoices = allInvoices.filter(inv => 
                inv.document_type === 'bon_livraison' || inv.document_type === 'bon de livraison'
            );
            console.log('✅ Filtered:', filteredInvoices.length, 'bons de livraison');
            renderInvoicesList();
            updateSelectedCount();
        };
        
        document.getElementById('selectAllBtnChaimae').onclick = () => {
            // Select all visible (filtered) invoices
            filteredInvoices.forEach(inv => {
                if (!selectedInvoices.includes(inv.id)) {
                    selectedInvoices.push(inv.id);
                }
            });
            renderInvoicesList();
            updateSelectedCount();
        };
        
        document.getElementById('deselectAllBtnChaimae').onclick = () => {
            // Deselect all visible (filtered) invoices
            filteredInvoices.forEach(inv => {
                selectedInvoices = selectedInvoices.filter(id => id !== inv.id);
            });
            renderInvoicesList();
            updateSelectedCount();
        };
        
        document.getElementById('cancelSelectionBtnChaimae').onclick = () => {
            overlay.remove();
        };
        
        document.getElementById('confirmSelectionBtnChaimae').onclick = () => {
            if (selectedInvoices.length === 0) {
                window.notify.error('Erreur', 'Veuillez sélectionner au moins une facture', 3000);
                return;
            }
            
            if (typeof window.updateSelectedInvoicesChaimae === 'function') {
                window.updateSelectedInvoicesChaimae(selectedInvoices);
            }
            
            overlay.remove();
            window.notify.success('Succès', `${selectedInvoices.length} facture(s) sélectionnée(s)`, 2000);
        };
        
        // Removed overlay click to close - user must use buttons
        
        updateSelectedCount();
        
    } catch (error) {
        console.error('Error showing invoice selection modal:', error);
        window.notify.error('Erreur', 'Impossible d\'afficher la sélection: ' + error.message, 4000);
    }
}

// Show add manual invoice modal for CHAIMAE - supports Facture, Devis, and Bon de livraison
async function showAddManualInvoiceModalChaimae(existingInvoices = []) {
    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.95);z-index:1000001;display:flex;align-items:center;justify-content:center;animation:fadeIn 0.2s;';
    
    const now = new Date();
    const year = now.getFullYear();
    let nextNumber = 1;
    
    console.log('🔢 [SITUATION CHAIMAE] Getting next invoice number for year:', year);
    
    try {
        const result = await window.electron.dbChaimae.getNextInvoiceNumber(year);
        console.log('🔢 [SITUATION CHAIMAE] Received result:', result);
        
        if (result.success && result.data) {
            nextNumber = result.data.nextNumber || result.data.number || 1;
            console.log('🔢 [SITUATION CHAIMAE] Next number:', nextNumber);
        } else {
            console.warn('⚠️ [SITUATION CHAIMAE] Failed to get next number, using default 1');
        }
    } catch (error) {
        console.error('❌ [SITUATION CHAIMAE] Error getting next invoice number:', error);
    }
    
    // Default numero for Facture (just number + year, no prefix)
    const defaultFactureNumero = nextNumber + '/' + year;
    console.log('🔢 [SITUATION CHAIMAE] Default facture numero:', defaultFactureNumero);
    
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
        
        <!-- Type de document -->
        <div style="margin-bottom:1.5rem;">
            <label style="display:block;color:#ff9800;margin-bottom:0.5rem;font-weight:600;">Type de document *</label>
            <select id="manualInvoiceTypeChaimae" onchange="updateNumeroPlaceholderChaimae()" style="width:100%;padding:0.75rem;background:#2d2d30;border:2px solid #3e3e42;border-radius:8px;color:#fff;font-size:1rem;">
                <option value="">Choisir le type de document</option>
                <option value="facture">Facture</option>
                <option value="devis">Devis</option>
                <option value="bon_livraison">Bon de livraison</option>
            </select>
        </div>
        
        <!-- Numéro avec Prefix (pour Bon de livraison) -->
        <div id="numeroFieldChaimae" style="display:none;margin-bottom:1.5rem;">
            <label style="display:block;color:#ff9800;margin-bottom:0.5rem;font-weight:600;">Numéro *</label>
            <div style="display:flex;gap:0.5rem;align-items:center;">
                <div id="prefixSelectorChaimae" style="display:none;position:relative;">
                    <input type="text" id="prefixInputChaimaeManual" placeholder="MG" readonly onclick="togglePrefixDropdownChaimaeManual()" 
                           style="width:60px;padding:0.75rem;background:#2d2d30;border:2px solid #3e3e42;border-radius:8px;color:#ff9800;font-size:1rem;cursor:pointer;font-weight:700;text-align:center;">
                    <div id="prefixDropdownChaimaeManual" style="display:none;position:absolute;top:100%;left:0;background:#1e1e1e;border:2px solid #ff9800;border-radius:8px;margin-top:0.5rem;box-shadow:0 4px 12px rgba(0,0,0,0.5);z-index:1000;min-width:180px;">
                        <div id="prefixListChaimaeManual" style="max-height:120px;overflow-y:auto;padding:0.5rem;"></div>
                        <div style="padding:0.5rem;border-top:1px solid #3e3e42;">
                            <input type="text" id="newPrefixInputChaimaeManual" placeholder="Nouveau" 
                                   style="width:100%;padding:0.4rem;background:#2d2d30;border:1px solid #3e3e42;border-radius:4px;color:#fff;font-size:0.8rem;margin-bottom:0.4rem;"
                                   onkeypress="if(event.key==='Enter'){addNewPrefixChaimaeManual();event.preventDefault();}">
                            <button type="button" onclick="addNewPrefixChaimaeManual()" 
                                    style="width:100%;padding:0.4rem;background:#ff9800;color:#fff;border:none;border-radius:4px;cursor:pointer;font-size:0.8rem;">
                                + Ajouter
                            </button>
                        </div>
                    </div>
                </div>
                <input type="text" id="manualInvoiceNumeroChaimae" placeholder="Ex: 123" onblur="autoFormatManualNumeroChaimae(this)" style="flex:1;padding:0.75rem;background:#2d2d30;border:2px solid #3e3e42;border-radius:8px;color:#4caf50;font-size:1rem;font-weight:600;">
            </div>
            <small id="numeroHintChaimae" style="color:#999;font-size:0.85rem;display:block;margin-top:0.25rem;">Ex: 123 → 123/2025</small>
        </div>
        
        <!-- Champs optionnels pour Facture -->
        <div id="optionalFieldsFactureChaimae" style="display:none;margin-bottom:1.5rem;">
            <div style="margin-bottom:0.75rem;">
                <label style="display:flex;align-items:center;cursor:pointer;margin-bottom:0.5rem;">
                    <input type="checkbox" id="toggleOrderChaimaeManual" onchange="toggleOptionalFieldManualChaimae('Order')" style="width:16px;height:16px;margin-right:0.5rem;cursor:pointer;accent-color:#ff9800;">
                    <span style="color:#ff9800;font-weight:500;font-size:0.95rem;">N° Order</span>
                </label>
                <input type="text" id="manualInvoiceOrderChaimae" placeholder="Ex: 123" style="display:none;width:100%;padding:0.75rem;background:#2d2d30;border:2px solid #3e3e42;border-radius:8px;color:#fff;font-size:1rem;">
            </div>
            
            <div>
                <label style="display:flex;align-items:center;cursor:pointer;margin-bottom:0.5rem;">
                    <input type="checkbox" id="toggleBonLivraisonChaimaeManual" onchange="toggleOptionalFieldManualChaimae('BonLivraison')" style="width:16px;height:16px;margin-right:0.5rem;cursor:pointer;accent-color:#ff9800;">
                    <span style="color:#ff9800;font-weight:500;font-size:0.95rem;">Bon de livraison</span>
                </label>
                <input type="text" id="manualInvoiceBonLivraisonChaimae" placeholder="Ex: 123" style="display:none;width:100%;padding:0.75rem;background:#2d2d30;border:2px solid #3e3e42;border-radius:8px;color:#fff;font-size:1rem;">
            </div>
        </div>
        
        <!-- N° Order pour Bon de livraison -->
        <div id="optionalFieldsBonLivraisonChaimae" style="display:none;margin-bottom:1.5rem;">
            <label style="display:flex;align-items:center;cursor:pointer;margin-bottom:0.5rem;">
                <input type="checkbox" id="toggleBonCommandeChaimaeManual" onchange="toggleOptionalFieldManualChaimae('BonCommande')" style="width:16px;height:16px;margin-right:0.5rem;cursor:pointer;accent-color:#ff9800;">
                <span style="color:#ff9800;font-weight:500;font-size:0.95rem;">N° Order (optionnel)</span>
            </label>
            <div id="bonCommandeInputContainerChaimae" style="display:none;">
                <div style="display:flex;gap:0.5rem;align-items:stretch;margin-bottom:0.5rem;">
                    <!-- Prefix Selector -->
                    <div style="position:relative;width:70px;">
                        <input type="text" id="orderPrefixInputChaimaeManual" value="BC" readonly onclick="toggleOrderPrefixDropdownChaimaeManual()" 
                               style="width:100%;height:100%;padding:0.75rem;background:#2d2d30;border:2px solid #3e3e42;border-radius:8px;color:#2196f3;font-size:1rem;cursor:pointer;font-weight:700;text-align:center;box-sizing:border-box;">
                        <!-- Dropdown -->
                        <div id="orderPrefixDropdownChaimaeManual" style="display:none;position:absolute;top:calc(100% + 0.5rem);left:0;background:#1e1e1e;border:2px solid #2196f3;border-radius:12px;box-shadow:0 8px 24px rgba(33, 150, 243, 0.3);z-index:1000;min-width:220px;">
                            <!-- Header -->
                            <div style="padding:0.75rem 1rem;background:linear-gradient(90deg, #2196f3 0%, #1976d2 100%);border-bottom:2px solid rgba(33, 150, 243, 0.3);border-radius:10px 10px 0 0;">
                                <h4 style="margin:0;color:#fff;font-size:0.95rem;font-weight:600;">📋 Choisir un Prefix</h4>
                            </div>
                            <!-- List -->
                            <div id="orderPrefixListChaimaeManual" style="max-height:200px;overflow-y:auto;padding:0.5rem;"></div>
                            <!-- Add New -->
                            <div style="padding:0.75rem;border-top:2px solid rgba(33, 150, 243, 0.2);background:rgba(0,0,0,0.2);">
                                <input type="text" id="newOrderPrefixInputChaimaeManual" placeholder="Nouveau prefix" 
                                       style="width:100%;padding:0.65rem;background:#2d2d30;border:2px solid #3e3e42;border-radius:6px;color:#fff;font-size:0.9rem;outline:none;box-sizing:border-box;"
                                       onfocus="this.style.borderColor='#2196f3';"
                                       onblur="this.style.borderColor='#3e3e42';"
                                       onkeypress="if(event.key==='Enter'){addNewOrderPrefixChaimaeManual();event.preventDefault();}">
                                <button type="button" onclick="addNewOrderPrefixChaimaeManual()" 
                                        style="width:100%;margin-top:0.5rem;padding:0.65rem;background:linear-gradient(90deg, #2196f3 0%, #1976d2 100%);color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:0.9rem;font-weight:600;">
                                    ➕ Ajouter
                                </button>
                            </div>
                        </div>
                    </div>
                    <!-- Number Input -->
                    <input type="text" id="manualInvoiceBonCommandeChaimae" placeholder="456" 
                           style="flex:1;padding:0.75rem;background:#2d2d30;border:2px solid #3e3e42;border-radius:8px;color:#fff;font-size:1rem;box-sizing:border-box;"
                           onfocus="this.style.borderColor='#ff9800';"
                           onblur="this.style.borderColor='#3e3e42';">
                </div>
                <small style="color:#999;font-size:0.85rem;display:block;">Ex: 456 → <span id="orderPrefixExampleChaimaeManual" style="color:#2196f3;font-weight:600;">BC</span>456</small>
            </div>
        </div>
        
        <!-- Date -->
        <div style="margin-bottom:1.5rem;">
            <label style="display:block;color:#ff9800;margin-bottom:0.5rem;font-weight:600;">Date *</label>
            <input type="date" id="manualInvoiceDateChaimae" style="width:100%;padding:0.75rem;background:#2d2d30;border:2px solid #3e3e42;border-radius:8px;color:#fff;font-size:1rem;">
        </div>
        
        <div style="margin-bottom:1.5rem;">
            <label style="display:block;color:#ff9800;margin-bottom:0.75rem;font-weight:600;">Méthode de calcul *</label>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;">
                <div class="input-method-option active" onclick="selectInputMethodChaimae('direct')">
                    <input type="radio" name="inputMethodChaimae" value="direct" checked>
                    <div style="color:#fff;font-weight:600;margin-bottom:0.25rem;">💰 Montant direct</div>
                    <div style="color:#999;font-size:0.85rem;">Saisir le montant HT</div>
                </div>
                <div class="input-method-option" onclick="selectInputMethodChaimae('products')">
                    <input type="radio" name="inputMethodChaimae" value="products">
                    <div style="color:#fff;font-weight:600;margin-bottom:0.25rem;">📦 Depuis produits</div>
                    <div style="color:#999;font-size:0.85rem;">Calculer depuis les produits</div>
                </div>
            </div>
        </div>
        
        <div id="directAmountSectionChaimae" style="margin-bottom:1.5rem;">
            <label style="display:block;color:#ff9800;margin-bottom:0.5rem;font-weight:600;">Montant HT (DH) *</label>
            <input type="number" id="manualInvoiceMontantChaimae" placeholder="0.00" step="0.01" min="0" style="width:100%;padding:0.75rem;background:#2d2d30;border:2px solid #3e3e42;border-radius:8px;color:#fff;font-size:1rem;">
        </div>
        
        <div id="productsSectionChaimae" style="display:none;margin-bottom:1.5rem;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem;">
                <label style="color:#ff9800;font-weight:600;">Produits</label>
                <button id="addProductBtnChaimae" style="padding:0.5rem 1rem;background:#4caf50;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:0.9rem;font-weight:600;">
                    ➕ Ajouter un produit
                </button>
            </div>
            <div id="productsListChaimae" style="display:flex;flex-direction:column;gap:0.5rem;max-height:200px;overflow-y:auto;"></div>
            <div style="margin-top:1rem;padding:1rem;background:#2d2d30;border-radius:8px;">
                <div style="display:flex;justify-content:space-between;color:#fff;">
                    <span style="font-weight:600;">Total HT:</span>
                    <span id="productsTotalChaimae" style="color:#ff9800;font-weight:700;font-size:1.1rem;">0.00 DH</span>
                </div>
            </div>
        </div>
        
        <div style="margin-bottom:1.5rem;padding:1rem;background:#2d2d30;border:2px solid #4caf50;border-radius:8px;">
            <label style="display:flex;align-items:center;cursor:pointer;">
                <input type="checkbox" id="saveToDatabaseChaimae" style="width:20px;height:20px;margin-right:0.75rem;cursor:pointer;accent-color:#4caf50;">
                <div>
                    <div style="color:#4caf50;font-weight:600;font-size:1rem;">💾 Enregistrer dans la base de données</div>
                    <div style="color:#999;font-size:0.85rem;margin-top:0.25rem;">Cette facture sera sauvegardée et apparaîtra dans les listes</div>
                </div>
            </label>
        </div>
        
        <div style="display:flex;gap:1rem;">
            <button id="cancelManualInvoiceBtnChaimae" style="flex:1;padding:1rem;background:#3e3e42;color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:1rem;font-weight:600;">
                Annuler
            </button>
            <button id="addManualInvoiceBtnChaimae" style="flex:1;padding:1rem;background:#ff9800;color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:1rem;font-weight:600;">
                ✓ Ajouter
            </button>
        </div>
    `;
    
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    
    // Set today's date as default
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('manualInvoiceDateChaimae').value = today;
    
    let products = [];
    
    // Initialize prefix system for Bon de livraison
    if (!window.bonLivraisonPrefixesChaimae) {
        window.bonLivraisonPrefixesChaimae = ['MG', 'TL', 'BL'];
        window.selectedPrefixChaimae = 'MG';
        window.prefixesLoadedChaimae = false;
    }
    
    // Load prefixes from database
    async function loadPrefixesFromDBChaimae() {
        if (window.prefixesLoadedChaimae) return;
        
        try {
            const result = await window.electron.dbChaimae.getAllPrefixes();
            if (result.success && result.data.length > 0) {
                window.bonLivraisonPrefixesChaimae = result.data;
                window.selectedPrefixChaimae = result.data[0];
                window.prefixesLoadedChaimae = true;
            }
        } catch (error) {
            console.error('Error loading prefixes:', error);
        }
    }
    
    // Load prefixes when modal opens
    loadPrefixesFromDBChaimae().then(() => {
        const prefixInput = document.getElementById('prefixInputChaimaeManual');
        if (prefixInput) {
            prefixInput.value = window.selectedPrefixChaimae || 'MG';
        }
    });
    
    // Update numero placeholder based on document type - REBUILD fields completely
    window.updateNumeroPlaceholderChaimae = function() {
        const type = document.getElementById('manualInvoiceTypeChaimae').value;
        const numeroFieldContainer = document.getElementById('numeroFieldChaimae');
        const optionalFieldsFacture = document.getElementById('optionalFieldsFactureChaimae');
        const optionalFieldsBL = document.getElementById('optionalFieldsBonLivraisonChaimae');
        const year = new Date().getFullYear();
        
        if (!type) {
            numeroFieldContainer.style.display = 'none';
            optionalFieldsFacture.style.display = 'none';
            optionalFieldsBL.style.display = 'none';
            return;
        }
        
        numeroFieldContainer.style.display = 'block';
        
        // Clear and rebuild numero field based on type
        let numeroHTML = '';
        
        if (type === 'facture') {
            numeroHTML = `
                <label style="display:block;color:#ff9800;margin-bottom:0.5rem;font-weight:600;">Numéro *</label>
                <input type="text" id="manualInvoiceNumeroChaimae" placeholder="Ex: 123" value="${defaultFactureNumero}" onblur="autoFormatManualNumeroChaimae(this)" style="width:100%;padding:0.75rem;background:#2d2d30;border:2px solid #3e3e42;border-radius:8px;color:#4caf50;font-size:1rem;font-weight:600;">
                <small id="numeroHintChaimae" style="color:#999;font-size:0.85rem;display:block;margin-top:0.25rem;">Ex: 123 → 123/2025</small>
            `;
            optionalFieldsFacture.style.display = 'block';
            optionalFieldsBL.style.display = 'none';
            
            // Reset checkboxes and hide fields
            const orderCheckbox = document.getElementById('toggleOrderChaimaeManual');
            const blCheckbox = document.getElementById('toggleBonLivraisonChaimaeManual');
            if (orderCheckbox) {
                orderCheckbox.checked = false;
                document.getElementById('manualInvoiceOrderChaimae').style.display = 'none';
                document.getElementById('manualInvoiceOrderChaimae').value = '';
            }
            if (blCheckbox) {
                blCheckbox.checked = false;
                document.getElementById('manualInvoiceBonLivraisonChaimae').style.display = 'none';
                document.getElementById('manualInvoiceBonLivraisonChaimae').value = '';
            }
            
        } else if (type === 'devis') {
            numeroHTML = `
                <label style="display:block;color:#ff9800;margin-bottom:0.5rem;font-weight:600;">Numéro *</label>
                <input type="text" id="manualInvoiceNumeroChaimae" placeholder="Ex: 123" value="${nextNumber}/${year}" onblur="autoFormatManualNumeroChaimae(this)" style="width:100%;padding:0.75rem;background:#2d2d30;border:2px solid #3e3e42;border-radius:8px;color:#4caf50;font-size:1rem;font-weight:600;">
                <small id="numeroHintChaimae" style="color:#999;font-size:0.85rem;display:block;margin-top:0.25rem;">Ex: 123 → 123/2025</small>
            `;
            optionalFieldsFacture.style.display = 'none';
            optionalFieldsBL.style.display = 'none';
            
        } else if (type === 'bon_livraison') {
            const selectedPrefix = window.selectedPrefixChaimae || 'MG';
            numeroHTML = `
                <label style="display:block;color:#ff9800;margin-bottom:0.5rem;font-weight:600;">Numéro *</label>
                <div style="display:flex;gap:0.5rem;align-items:center;">
                    <div id="prefixSelectorChaimae" style="position:relative;">
                        <input type="text" id="prefixInputChaimaeManual" placeholder="MG" value="${selectedPrefix}" readonly onclick="togglePrefixDropdownChaimaeManual()" 
                               style="width:60px;padding:0.75rem;background:#2d2d30;border:2px solid #3e3e42;border-radius:8px;color:#ff9800;font-size:1rem;cursor:pointer;font-weight:700;text-align:center;">
                        <div id="prefixDropdownChaimaeManual" style="display:none;position:absolute;top:100%;left:0;background:#1e1e1e;border:2px solid #ff9800;border-radius:8px;margin-top:0.5rem;box-shadow:0 4px 12px rgba(0,0,0,0.5);z-index:1000;min-width:180px;">
                            <div id="prefixListChaimaeManual" style="max-height:120px;overflow-y:auto;padding:0.5rem;"></div>
                            <div style="padding:0.5rem;border-top:1px solid #3e3e42;">
                                <input type="text" id="newPrefixInputChaimaeManual" placeholder="Nouveau" 
                                       style="width:100%;padding:0.4rem;background:#2d2d30;border:1px solid #3e3e42;border-radius:4px;color:#fff;font-size:0.8rem;margin-bottom:0.4rem;"
                                       onkeypress="if(event.key==='Enter'){addNewPrefixChaimaeManual();event.preventDefault();}">
                                <button type="button" onclick="addNewPrefixChaimaeManual()" 
                                        style="width:100%;padding:0.4rem;background:#ff9800;color:#fff;border:none;border-radius:4px;cursor:pointer;font-size:0.8rem;">
                                    + Ajouter
                                </button>
                            </div>
                        </div>
                    </div>
                    <input type="text" id="manualInvoiceNumeroChaimae" placeholder="Ex: 123" value="${nextNumber}/${year}" onblur="autoFormatManualNumeroChaimae(this)" style="flex:1;padding:0.75rem;background:#2d2d30;border:2px solid #3e3e42;border-radius:8px;color:#4caf50;font-size:1rem;font-weight:600;">
                </div>
                <small id="numeroHintChaimae" style="color:#999;font-size:0.85rem;display:block;margin-top:0.25rem;">Ex: 123 → ${selectedPrefix}123/2025</small>
            `;
            optionalFieldsFacture.style.display = 'none';
            optionalFieldsBL.style.display = 'block';
            
            // Reset checkbox and hide field
            const bcCheckbox = document.getElementById('toggleBonCommandeChaimaeManual');
            if (bcCheckbox) {
                bcCheckbox.checked = false;
                document.getElementById('manualInvoiceBonCommandeChaimae').style.display = 'none';
                document.getElementById('manualInvoiceBonCommandeChaimae').value = '';
            }
        }
        
        numeroFieldContainer.innerHTML = numeroHTML;
        
        // Re-render prefix list if bon_livraison
        if (type === 'bon_livraison') {
            renderPrefixListChaimaeManual();
        }
    };
    
    // Auto-format numero on blur (add year automatically)
    window.autoFormatManualNumeroChaimae = function(input) {
        let value = input.value.trim();
        
        // إذا كان الحقل فارغاً، لا تفعل شيئاً
        if (!value) return;
        
        // إذا كان يحتوي بالفعل على سلاش، لا تفعل شيئاً
        if (value.includes('/')) return;
        
        // استخراج الأرقام فقط
        let numbers = value.replace(/[^0-9]/g, '');
        
        // إذا كان هناك أرقام، أضف السنة (فقط للحقل الرئيسي، ليس Bon de livraison)
        if (numbers && input.id === 'manualInvoiceNumeroChaimae') {
            const year = new Date().getFullYear();
            input.value = `${numbers}/${year}`;
        }
    };
    
    // N° Order and Bon de livraison - No auto-formatting
    window.autoFormatOrderChaimae = function(input) {
        // Keep value as-is, no automatic formatting
    };
    
    // Prefix dropdown functions
    window.togglePrefixDropdownChaimaeManual = async function() {
        const dropdown = document.getElementById('prefixDropdownChaimaeManual');
        if (!dropdown) return;
        
        if (dropdown.style.display === 'none') {
            await loadPrefixesFromDBChaimae();
            renderPrefixListChaimaeManual();
            dropdown.style.display = 'block';
        } else {
            dropdown.style.display = 'none';
        }
    };
    
    window.renderPrefixListChaimaeManual = function() {
        const listContainer = document.getElementById('prefixListChaimaeManual');
        if (!listContainer) return;
        
        listContainer.innerHTML = window.bonLivraisonPrefixesChaimae.map(prefix => `
            <div style="display:flex;align-items:center;justify-content:space-between;padding:0.6rem 0.75rem;border-radius:6px;transition:all 0.2s;background:${prefix === window.selectedPrefixChaimae ? '#ff9800' : 'transparent'};margin-bottom:0.25rem;"
                 onmouseover="if('${prefix}' !== window.selectedPrefixChaimae) { this.style.background='rgba(255,152,0,0.15)'; }" 
                 onmouseout="if('${prefix}' !== window.selectedPrefixChaimae) { this.style.background='transparent'; }">
                <span onclick="selectPrefixChaimaeManual('${prefix}')" style="flex:1;cursor:pointer;color:#fff;font-weight:${prefix === window.selectedPrefixChaimae ? '600' : '400'};font-size:0.95rem;">
                    ${prefix}
                </span>
                ${window.bonLivraisonPrefixesChaimae.length > 1 ? `
                    <button onclick="event.stopPropagation(); deletePrefixChaimaeManual('${prefix}')" 
                            style="background:transparent;border:none;color:#999;cursor:pointer;padding:0.25rem;display:flex;align-items:center;justify-content:center;transition:color 0.2s;"
                            onmouseover="this.style.color='#e74c3c';"
                            onmouseout="this.style.color='#999';"
                            title="Supprimer">
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854z"/>
                        </svg>
                    </button>
                ` : ''}
            </div>
        `).join('');
    };
    
    window.selectPrefixChaimaeManual = function(prefix) {
        window.selectedPrefixChaimae = prefix;
        const prefixInput = document.getElementById('prefixInputChaimaeManual');
        const hintElement = document.getElementById('numeroHintChaimae');
        
        if (prefixInput) prefixInput.value = prefix;
        if (hintElement) hintElement.textContent = 'Ex: 123 → ' + prefix + '123/2025';
        
        const dropdown = document.getElementById('prefixDropdownChaimaeManual');
        if (dropdown) dropdown.style.display = 'none';
        
        renderPrefixListChaimaeManual();
    };
    
    window.addNewPrefixChaimaeManual = async function() {
        const newPrefixInput = document.getElementById('newPrefixInputChaimaeManual');
        if (!newPrefixInput) return;
        
        const newPrefix = newPrefixInput.value.trim().toUpperCase();
        
        if (!newPrefix) {
            window.notify.warning('Attention', 'Veuillez saisir un prefix', 2000);
            return;
        }
        
        if (window.bonLivraisonPrefixesChaimae.includes(newPrefix)) {
            window.notify.warning('Attention', 'Ce prefix existe déjà', 2000);
            return;
        }
        
        const result = await window.electron.dbChaimae.addPrefix(newPrefix);
        
        if (result.success) {
            window.bonLivraisonPrefixesChaimae.push(newPrefix);
            window.bonLivraisonPrefixesChaimae.sort();
            newPrefixInput.value = '';
            
            renderPrefixListChaimaeManual();
            window.notify.success('Succès', `Prefix "${newPrefix}" ajouté`, 2000);
        } else {
            window.notify.error('Erreur', result.error || 'Impossible d\'ajouter le prefix', 3000);
        }
    };
    
    window.deletePrefixChaimaeManual = async function(prefix) {
        if (window.bonLivraisonPrefixesChaimae.length <= 1) {
            window.notify.warning('Attention', 'Vous devez garder au moins un prefix', 2000);
            return;
        }
        
        // Confirm deletion
        if (!confirm(`Supprimer le prefix "${prefix}" ?`)) {
            return;
        }
        
        const result = await window.electron.dbChaimae.deletePrefix(prefix);
        
        if (result.success) {
            const index = window.bonLivraisonPrefixesChaimae.indexOf(prefix);
            if (index > -1) {
                window.bonLivraisonPrefixesChaimae.splice(index, 1);
                
                if (window.selectedPrefixChaimae === prefix) {
                    window.selectedPrefixChaimae = window.bonLivraisonPrefixesChaimae[0];
                    const prefixInput = document.getElementById('prefixInputChaimaeManual');
                    if (prefixInput) prefixInput.value = window.selectedPrefixChaimae;
                }
                
                renderPrefixListChaimaeManual();
                window.notify.success('Succès', `Prefix "${prefix}" supprimé`, 2000);
            }
        } else {
            window.notify.error('Erreur', result.error || 'Impossible de supprimer le prefix', 3000);
        }
    };
    
    // ==================== ORDER PREFIX FUNCTIONS FOR MANUAL MODAL ====================
    
    // Toggle order prefix dropdown
    window.toggleOrderPrefixDropdownChaimaeManual = async function() {
        const dropdown = document.getElementById('orderPrefixDropdownChaimaeManual');
        if (!dropdown) return;
        
        if (dropdown.style.display === 'none') {
            await loadOrderPrefixesChaimaeManual();
            renderOrderPrefixListChaimaeManual();
            dropdown.style.display = 'block';
        } else {
            dropdown.style.display = 'none';
        }
    };
    
    // Render order prefix list
    function renderOrderPrefixListChaimaeManual() {
        const listContainer = document.getElementById('orderPrefixListChaimaeManual');
        if (!listContainer) return;
        
        if (!window.orderPrefixes || window.orderPrefixes.length === 0) {
            window.orderPrefixes = ['BC', 'CMD', 'ORD'];
        }
        
        listContainer.innerHTML = window.orderPrefixes.map(prefix => `
            <div onclick="selectOrderPrefixChaimaeManual('${prefix}')" 
                 style="margin: 0.35rem; padding: 0.75rem 1rem; cursor: pointer; border-radius: 8px; transition: all 0.3s; color: #fff; display: flex; justify-content: space-between; align-items: center; background: ${prefix === window.selectedOrderPrefix ? 'linear-gradient(90deg, #2196f3 0%, #1976d2 100%)' : 'rgba(255,255,255,0.05)'}; border: 2px solid ${prefix === window.selectedOrderPrefix ? '#2196f3' : 'transparent'};"
                 onmouseover="if('${prefix}' !== window.selectedOrderPrefix) { this.style.background='rgba(33, 150, 243, 0.2)'; this.style.borderColor='#2196f3'; }" 
                 onmouseout="if('${prefix}' !== window.selectedOrderPrefix) { this.style.background='rgba(255,255,255,0.05)'; this.style.borderColor='transparent'; }">
                <div style="display: flex; align-items: center; gap: 0.75rem;">
                    <span style="font-size: 1.2rem;">${prefix === window.selectedOrderPrefix ? '✓' : '📌'}</span>
                    <span style="font-weight: ${prefix === window.selectedOrderPrefix ? '700' : '500'}; font-size: 1rem;">${prefix}</span>
                </div>
                ${window.orderPrefixes.length > 1 ? `
                    <button onclick="event.stopPropagation(); deleteOrderPrefixChaimaeManual('${prefix}')" 
                            style="background: transparent; color: #e74c3c; border: 2px solid #e74c3c; border-radius: 6px; padding: 0.3rem 0.4rem; cursor: pointer; transition: all 0.3s;"
                            onmouseover="this.style.background='#e74c3c'; this.style.color='#fff';"
                            onmouseout="this.style.background='transparent'; this.style.color='#e74c3c';">
                        🗑️
                    </button>
                ` : ''}
            </div>
        `).join('');
    }
    
    // Select order prefix
    window.selectOrderPrefixChaimaeManual = function(prefix) {
        window.selectedOrderPrefix = prefix;
        
        const prefixInput = document.getElementById('orderPrefixInputChaimaeManual');
        const prefixExample = document.getElementById('orderPrefixExampleChaimaeManual');
        
        if (prefixInput) prefixInput.value = prefix;
        if (prefixExample) prefixExample.textContent = prefix;
        
        const dropdown = document.getElementById('orderPrefixDropdownChaimaeManual');
        if (dropdown) dropdown.style.display = 'none';
        
        renderOrderPrefixListChaimaeManual();
    };
    
    // Add new order prefix
    window.addNewOrderPrefixChaimaeManual = async function() {
        const newPrefixInput = document.getElementById('newOrderPrefixInputChaimaeManual');
        if (!newPrefixInput) return;
        
        const newPrefix = newPrefixInput.value.trim().toUpperCase();
        
        if (!newPrefix) {
            window.notify.warning('Attention', 'Veuillez saisir un prefix', 2000);
            return;
        }
        
        if (window.orderPrefixes.includes(newPrefix)) {
            window.notify.warning('Attention', 'Ce prefix existe déjà', 2000);
            return;
        }
        
        const result = await window.electron.dbChaimae.addOrderPrefix(newPrefix);
        
        if (result.success) {
            window.orderPrefixes.push(newPrefix);
            window.orderPrefixes.sort();
            newPrefixInput.value = '';
            
            renderOrderPrefixListChaimaeManual();
            window.notify.success('Succès', `Prefix "${newPrefix}" ajouté`, 2000);
        } else {
            window.notify.error('Erreur', result.error || 'Impossible d\'ajouter le prefix', 3000);
        }
    };
    
    // Delete order prefix
    window.deleteOrderPrefixChaimaeManual = async function(prefix) {
        if (window.orderPrefixes.length <= 1) {
            window.notify.warning('Attention', 'Vous devez garder au moins un prefix', 2000);
            return;
        }
        
        const result = await window.electron.dbChaimae.deleteOrderPrefix(prefix);
        
        if (result.success) {
            const index = window.orderPrefixes.indexOf(prefix);
            if (index > -1) {
                window.orderPrefixes.splice(index, 1);
                
                if (window.selectedOrderPrefix === prefix) {
                    window.selectedOrderPrefix = window.orderPrefixes[0];
                    const prefixInput = document.getElementById('orderPrefixInputChaimaeManual');
                    const prefixExample = document.getElementById('orderPrefixExampleChaimaeManual');
                    if (prefixInput) prefixInput.value = window.selectedOrderPrefix;
                    if (prefixExample) prefixExample.textContent = window.selectedOrderPrefix;
                }
                
                renderOrderPrefixListChaimaeManual();
                window.notify.success('Succès', `Prefix "${prefix}" supprimé`, 2000);
            }
        } else {
            window.notify.error('Erreur', result.error || 'Impossible de supprimer le prefix', 3000);
        }
    };
    
    // Load order prefixes from database
    async function loadOrderPrefixesChaimaeManual() {
        try {
            const result = await window.electron.dbChaimae.getOrderPrefixes();
            if (result.success && result.data && result.data.length > 0) {
                window.orderPrefixes = result.data;
                if (!window.selectedOrderPrefix) {
                    window.selectedOrderPrefix = window.orderPrefixes[0];
                }
            } else {
                if (!window.orderPrefixes) {
                    window.orderPrefixes = ['BC', 'CMD', 'ORD'];
                    window.selectedOrderPrefix = 'BC';
                }
            }
        } catch (error) {
            console.error('Error loading order prefixes:', error);
            if (!window.orderPrefixes) {
                window.orderPrefixes = ['BC', 'CMD', 'ORD'];
                window.selectedOrderPrefix = 'BC';
            }
        }
    }
    
    // ==================== END ORDER PREFIX FUNCTIONS ====================
    
    // Toggle optional field visibility
    window.toggleOptionalFieldManualChaimae = function(fieldName) {
        const checkbox = document.getElementById(`toggle${fieldName}ChaimaeManual`);
        console.log('🔄 Toggle field:', fieldName, 'Checked:', checkbox?.checked);
        
        // For BonCommande, use the container instead of direct input
        if (fieldName === 'BonCommande') {
            const container = document.getElementById('bonCommandeInputContainerChaimae');
            const input = document.getElementById(`manualInvoice${fieldName}Chaimae`);
            console.log('📦 Container found:', !!container, 'Input found:', !!input);
            
            if (checkbox && checkbox.checked) {
                if (container) {
                    container.style.display = 'block';
                    console.log('✅ Container displayed');
                }
                if (input) {
                    input.style.display = 'block';
                    console.log('✅ Input displayed');
                }
            } else {
                if (container) {
                    container.style.display = 'none';
                    console.log('❌ Container hidden');
                }
                if (input) {
                    input.style.display = 'none';
                    input.value = '';
                }
            }
        } else {
            // For other fields, use the old logic
            const input = document.getElementById(`manualInvoice${fieldName}Chaimae`);
            const hint = document.getElementById(`hint${fieldName}Chaimae`);
            
            if (checkbox.checked) {
                input.style.display = 'block';
                if (hint) hint.style.display = 'block';
            } else {
                input.style.display = 'none';
                if (hint) hint.style.display = 'none';
                input.value = '';
            }
        }
    };
    
    window.selectInputMethodChaimae = function(method) {
        const directSection = document.getElementById('directAmountSectionChaimae');
        const productsSection = document.getElementById('productsSectionChaimae');
        const options = document.querySelectorAll('.input-method-option');
        
        options.forEach(opt => opt.classList.remove('active'));
        
        if (method === 'direct') {
            directSection.style.display = 'block';
            productsSection.style.display = 'none';
            options[0].classList.add('active');
            document.querySelector('input[name="inputMethodChaimae"][value="direct"]').checked = true;
        } else {
            directSection.style.display = 'none';
            productsSection.style.display = 'block';
            options[1].classList.add('active');
            document.querySelector('input[name="inputMethodChaimae"][value="products"]').checked = true;
        }
    };
    
    function updateProductsTotal() {
        const total = products.reduce((sum, p) => sum + (parseFloat(p.price) * parseInt(p.quantity)), 0);
        document.getElementById('productsTotalChaimae').textContent = total.toFixed(2) + ' DH';
        return total;
    }
    
    function renderProducts() {
        const container = document.getElementById('productsListChaimae');
        if (products.length === 0) {
            container.innerHTML = '<div style="padding:1rem;text-align:center;color:#999;">Aucun produit ajouté</div>';
        } else {
            container.innerHTML = products.map((p, index) => `
                <div style="padding:0.75rem;background:#3e3e42;border-radius:6px;display:flex;justify-content:space-between;align-items:center;">
                    <div style="flex:1;">
                        <div style="color:#fff;font-weight:600;">${p.name}</div>
                        <div style="color:#999;font-size:0.85rem;">${p.quantity} × ${parseFloat(p.price).toFixed(2)} DH = ${(p.quantity * p.price).toFixed(2)} DH</div>
                    </div>
                    <button onclick="removeProductChaimae(${index})" style="padding:0.5rem;background:#f44336;color:#fff;border:none;border-radius:4px;cursor:pointer;">✗</button>
                </div>
            `).join('');
        }
        updateProductsTotal();
    }
    
    document.getElementById('addProductBtnChaimae').onclick = () => {
        showAddProductModalChaimae(products, renderProducts);
    };
    
    window.removeProductChaimae = function(index) {
        products.splice(index, 1);
        renderProducts();
    };
    
    document.getElementById('cancelManualInvoiceBtnChaimae').onclick = () => {
        overlay.remove();
    };
    
    document.getElementById('addManualInvoiceBtnChaimae').onclick = async () => {
        console.log('🔵 [MANUAL INVOICE] Button clicked - Starting save process');
        const type = document.getElementById('manualInvoiceTypeChaimae').value;
        const numero = document.getElementById('manualInvoiceNumeroChaimae').value.trim();
        const date = document.getElementById('manualInvoiceDateChaimae').value;
        const inputMethod = document.querySelector('input[name="inputMethodChaimae"]:checked').value;
        const saveToDb = document.getElementById('saveToDatabaseChaimae').checked;
        
        console.log('🔍 [CHAIMAE DEBUG] Add button clicked');
        console.log('🔍 [CHAIMAE DEBUG] Type:', type, 'Numero:', numero, 'Date:', date);
        console.log('🔍 [CHAIMAE DEBUG] saveToDb:', saveToDb);
        console.log('📋 [CHAIMAE DEBUG] existingInvoices length at start:', existingInvoices.length);
        
        let montant = 0;
        
        if (!numero) {
            window.notify.error('Erreur', 'Veuillez saisir un numéro', 3000);
            return;
        }
        
        if (!date) {
            window.notify.error('Erreur', 'Veuillez sélectionner une date', 3000);
            return;
        }
        
        if (inputMethod === 'direct') {
            montant = parseFloat(document.getElementById('manualInvoiceMontantChaimae').value);
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
            if (montant <= 0) {
                window.notify.error('Erreur', 'Veuillez ajouter au moins un produit', 3000);
                return;
            }
        }
        
        const dateObj = new Date(date);
        const formattedDate = dateObj.toLocaleDateString('fr-FR');
        
        // Prepare numero with prefix for bon_livraison
        let numeroToCheck = numero;
        if (type === 'bon_livraison') {
            const selectedPrefix = window.selectedPrefixChaimae || 'MG';
            const numeroWithoutPrefix = numero.replace(/^[A-Z]+/, '');
            numeroToCheck = selectedPrefix + numeroWithoutPrefix;
        }
        
        console.log('🔍 [DUPLICATE CHECK] Checking for numero:', numeroToCheck, 'Type:', type, '(Original:', numero, ')');
        
        // Check in regular invoices database - ONLY for the same document type
        const checkResult = await window.electron.dbChaimae.getAllInvoices();
        if (checkResult.success && checkResult.data) {
            let existingInvoice = null;
            
            if (type === 'facture') {
                existingInvoice = checkResult.data.find(inv => inv.document_numero === numeroToCheck);
            } else if (type === 'devis') {
                existingInvoice = checkResult.data.find(inv => inv.document_numero_devis === numeroToCheck);
            } else if (type === 'bon_livraison') {
                existingInvoice = checkResult.data.find(inv => inv.document_numero_bl === numeroToCheck || inv.document_numero === numeroToCheck);
            }
            
            if (existingInvoice) {
                const typeLabel = type === 'facture' ? 'Facture' : type === 'devis' ? 'Devis' : 'Bon de livraison';
                window.notify.error('Erreur', `Le numéro ${numeroToCheck} existe déjà pour un ${typeLabel}! Veuillez utiliser un autre numéro.`, 4000);
                console.error('❌ [DUPLICATE CHECK] Invoice number exists in DB for type:', type, '- numero:', numeroToCheck);
                return;
            }
        }
        
        // Check in global invoices database (for facture only)
        if (type === 'facture') {
            const globalInvoicesResult = await window.electron.dbChaimae.getAllGlobalInvoices();
            if (globalInvoicesResult.success && globalInvoicesResult.data) {
                const existingGlobalInvoice = globalInvoicesResult.data.find(inv => 
                    inv.document_numero === numeroToCheck
                );
                
                if (existingGlobalInvoice) {
                    window.notify.error('Erreur', `Le numéro ${numeroToCheck} existe déjà dans une facture globale! Veuillez utiliser un autre numéro.`, 4000);
                    console.error('❌ [DUPLICATE CHECK] Invoice number exists in global invoices:', numeroToCheck);
                    return;
                }
            }
        }
        
        // Check in manual invoices list - ONLY for the same document type
        if (existingInvoices && existingInvoices.length > 0) {
            const duplicateManual = existingInvoices.find(inv => {
                const invType = inv.type.toLowerCase().replace(' ', '_');
                return invType === type && inv.numero === numeroToCheck;
            });
            if (duplicateManual) {
                const typeLabel = type === 'facture' ? 'Facture' : type === 'devis' ? 'Devis' : 'Bon de livraison';
                window.notify.error('Erreur', `Le numéro ${numeroToCheck} existe déjà dans les ${typeLabel}s manuelles! Veuillez utiliser un autre numéro.`, 4000);
                console.error('❌ [DUPLICATE CHECK] Invoice number exists in manual list for type:', type, '- numero:', numeroToCheck);
                return;
            }
        }
        
        // Check for duplicate optional fields
        if (type === 'facture') {
            // Check N° Order
            const orderCheckbox = document.getElementById('toggleOrderChaimaeManual');
            if (orderCheckbox && orderCheckbox.checked) {
                const orderValue = document.getElementById('manualInvoiceOrderChaimae')?.value?.trim();
                if (orderValue) {
                    // Check in database
                    const duplicateOrder = checkResult.data.find(inv => 
                        inv.document_type === 'facture' && 
                        inv.document_numero_Order && 
                        inv.document_numero_Order.trim() === orderValue
                    );
                    if (duplicateOrder) {
                        window.notify.error('Erreur', `Le N° Order "${orderValue}" existe déjà! Veuillez utiliser un autre numéro.`, 4000);
                        console.error('❌ [DUPLICATE CHECK] N° Order exists in DB:', orderValue);
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
                        console.error('❌ [DUPLICATE CHECK] N° Order exists in manual list:', orderValue);
                        return;
                    }
                }
            }
            
            // Check Bon de livraison
            const blCheckbox = document.getElementById('toggleBonLivraisonChaimaeManual');
            if (blCheckbox && blCheckbox.checked) {
                const blValue = document.getElementById('manualInvoiceBonLivraisonChaimae')?.value?.trim();
                if (blValue) {
                    // Check in database
                    const duplicateBL = checkResult.data.find(inv => 
                        inv.document_type === 'facture' && 
                        inv.document_bon_de_livraison && 
                        inv.document_bon_de_livraison.trim() === blValue
                    );
                    if (duplicateBL) {
                        window.notify.error('Erreur', `Le Bon de livraison "${blValue}" existe déjà! Veuillez utiliser un autre numéro.`, 4000);
                        console.error('❌ [DUPLICATE CHECK] Bon de livraison exists in DB:', blValue);
                        return;
                    }
                    
                    // Check in manual invoices list
                    const duplicateBLManual = existingInvoices.find(inv => 
                        inv.type === 'FACTURE' && 
                        inv.bonLivraison && 
                        inv.bonLivraison.trim() === blValue
                    );
                    if (duplicateBLManual) {
                        window.notify.error('Erreur', `Le Bon de livraison "${blValue}" existe déjà dans les factures manuelles! Veuillez utiliser un autre numéro.`, 4000);
                        console.error('❌ [DUPLICATE CHECK] Bon de livraison exists in manual list:', blValue);
                        return;
                    }
                }
            }
        } else if (type === 'bon_livraison') {
            // Check N° Order
            const bcCheckbox = document.getElementById('toggleBonCommandeChaimaeManual');
            if (bcCheckbox && bcCheckbox.checked) {
                const bonCommandeValue = document.getElementById('manualInvoiceBonCommandeChaimae')?.value?.trim();
                if (bonCommandeValue) {
                    // Check in database
                    const duplicateBC = checkResult.data.find(inv => 
                        inv.document_type === 'bon_livraison' && 
                        inv.document_numero_commande && 
                        inv.document_numero_commande.trim() === bonCommandeValue
                    );
                    if (duplicateBC) {
                        window.notify.error('Erreur', `Le N° Order "${bonCommandeValue}" existe déjà! Veuillez utiliser un autre numéro.`, 4000);
                        console.error('❌ [DUPLICATE CHECK] N° Order exists in DB:', bonCommandeValue);
                        return;
                    }
                    
                    // Check in manual invoices list
                    const duplicateBCManual = existingInvoices.find(inv => 
                        inv.type === 'BL' && 
                        inv.bonCommande && 
                        inv.bonCommande.trim() === bonCommandeValue
                    );
                    if (duplicateBCManual) {
                        window.notify.error('Erreur', `Le N° Order "${bonCommandeValue}" existe déjà dans les factures manuelles! Veuillez utiliser un autre numéro.`, 4000);
                        console.error('❌ [DUPLICATE CHECK] N° Order exists in manual list:', bonCommandeValue);
                        return;
                    }
                }
            }
        }
        
        console.log('✅ [DUPLICATE CHECK] No duplicates found');
        
        // Save to database if requested
        console.log('🔍 [CHAIMAE DEBUG] Checking saveToDb flag:', saveToDb);
        
        if (saveToDb) {
            console.log('💾 [CHAIMAE DEBUG] Entering saveToDb block - will save to database');
            try {
                const clientId = document.getElementById('situationClientId').value;
                if (!clientId || !window.selectedSituationClientChaimae) {
                    window.notify.error('Erreur', 'Client non sélectionné', 3000);
                    return;
                }
                
                const clientName = window.selectedSituationClientChaimae.nom;
                const clientICE = window.selectedSituationClientChaimae.ice;
                
                // Get optional fields based on document type
                let numeroOrder = null;
                let bonLivraison = null;
                let bonCommande = null;
                let finalNumero = numero; // Keep original numero
                
                if (type === 'facture') {
                    const orderCheckbox = document.getElementById('toggleOrderChaimaeManual');
                    const blCheckbox = document.getElementById('toggleBonLivraisonChaimaeManual');
                    
                    if (orderCheckbox && orderCheckbox.checked) {
                        numeroOrder = document.getElementById('manualInvoiceOrderChaimae')?.value || null;
                    }
                    
                    if (blCheckbox && blCheckbox.checked) {
                        bonLivraison = document.getElementById('manualInvoiceBonLivraisonChaimae')?.value || null;
                    }
                } else if (type === 'bon_livraison') {
                    // Get selected prefix and add it to numero
                    const selectedPrefix = window.selectedPrefixChaimae || 'MG';
                    const numeroWithoutPrefix = numero.replace(/^[A-Z]+/, ''); // Remove any existing prefix
                    finalNumero = selectedPrefix + numeroWithoutPrefix;
                    
                    const bcCheckbox = document.getElementById('toggleBonCommandeChaimaeManual');
                    
                    if (bcCheckbox && bcCheckbox.checked) {
                        const orderValue = document.getElementById('manualInvoiceBonCommandeChaimae')?.value?.trim();
                        if (orderValue) {
                            const selectedOrderPrefix = window.selectedOrderPrefix || 'BC';
                            // Remove any existing prefix from all known prefixes
                            let cleanValue = orderValue;
                            if (window.orderPrefixes && window.orderPrefixes.length > 0) {
                                for (const prefix of window.orderPrefixes) {
                                    if (cleanValue.startsWith(prefix)) {
                                        cleanValue = cleanValue.substring(prefix.length);
                                        break;
                                    }
                                }
                            }
                            // Add the selected prefix
                            bonCommande = `${selectedOrderPrefix}${cleanValue}`;
                        } else {
                            bonCommande = null;
                        }
                    }
                }
                
                console.log('📝 [SAVE TO DB] Document Type:', type);
                console.log('📝 [SAVE TO DB] Final Numero:', finalNumero);
                console.log('📝 [SAVE TO DB] Numero Order:', numeroOrder);
                console.log('📝 [SAVE TO DB] Bon Livraison:', bonLivraison);
                console.log('📝 [SAVE TO DB] Bon Commande:', bonCommande);
                
                const invoiceData = {
                    client: {
                        nom: clientName,
                        ICE: clientICE
                    },
                    document: {
                        type: type,
                        date: date,
                        numero: type === 'facture' ? finalNumero : (type === 'bon_livraison' ? finalNumero : null),
                        numero_devis: type === 'devis' ? finalNumero : null,
                        numero_BL: type === 'bon_livraison' ? finalNumero : null,
                        bon_de_livraison: type === 'facture' ? bonLivraison : null,
                        numero_Order: numeroOrder || null,
                        numero_commande: bonCommande || null
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
                
                console.log('📤 [SITUATION CHAIMAE] Sending invoice data:', JSON.stringify(invoiceData, null, 2));
                console.log('💾 [DB SAVE] Calling createInvoice...');
                const result = await window.electron.dbChaimae.createInvoice(invoiceData);
                console.log('📥 [DB SAVE] Received result:', result);
                
                if (result && result.success) {
                    console.log('✅ [CHAIMAE DEBUG] Invoice saved to DB successfully with ID:', result.invoiceId);
                    console.log('📋 [CHAIMAE DEBUG] existingInvoices length BEFORE adding:', existingInvoices.length);
                    window.notify.success('Succès', 'Facture enregistrée dans la base de données', 2000);
                    
                    // Get optional fields for saved invoice
                    let numeroOrder = null;
                    let bonLivraison = null;
                    let bonCommande = null;
                    
                    if (type === 'facture') {
                        const orderCheckbox = document.getElementById('toggleOrderChaimaeManual');
                        if (orderCheckbox && orderCheckbox.checked) {
                            numeroOrder = document.getElementById('manualInvoiceOrderChaimae')?.value || null;
                        }
                        const blCheckbox = document.getElementById('toggleBLChaimaeManual');
                        if (blCheckbox && blCheckbox.checked) {
                            bonLivraison = document.getElementById('manualInvoiceBLChaimae')?.value || null;
                        }
                        const bcCheckbox = document.getElementById('toggleBCChaimaeManual');
                        if (bcCheckbox && bcCheckbox.checked) {
                            bonCommande = document.getElementById('manualInvoiceBCChaimae')?.value || null;
                        }
                    } else if (type === 'bon_livraison') {
                        const bcCheckbox = document.getElementById('toggleBCChaimaeBLManual');
                        if (bcCheckbox && bcCheckbox.checked) {
                            bonCommande = document.getElementById('manualInvoiceBCBLChaimae')?.value || null;
                        }
                    }
                    
                    // Add to manual list with savedToDb flag so it appears in the current session
                    const newInvoice = {
                        type: type === 'bon_livraison' ? 'BL' : type.replace('_', ' ').toUpperCase(),
                        numero: finalNumero,  // Use finalNumero which includes prefix for bon_livraison
                        date: formattedDate,
                        dateRaw: date,
                        montant: montant.toFixed(2),
                        savedToDb: true,
                        invoiceId: result.invoiceId,
                        numeroOrder: numeroOrder,
                        bonLivraison: bonLivraison,
                        bonCommande: bonCommande
                    };
                    
                    existingInvoices.unshift(newInvoice);
                    console.log('📋 [CHAIMAE DEBUG] existingInvoices length AFTER adding:', existingInvoices.length);
                    console.log('📋 [CHAIMAE DEBUG] Added invoice:', newInvoice);
                    
                    // Update display
                    if (typeof window.updateManualInvoicesDisplayChaimae === 'function') {
                        console.log('🔄 [CHAIMAE DEBUG] Calling updateManualInvoicesDisplayChaimae with', existingInvoices.length, 'invoices');
                        window.updateManualInvoicesDisplayChaimae(existingInvoices);
                    }
                    
                    console.log('✅ [CHAIMAE DEBUG] Closing overlay and RETURNING - should NOT continue');
                    overlay.remove();
                    return;
                } else {
                    const errorMsg = result && result.error ? result.error : 'Erreur inconnue';
                    window.notify.error('Erreur', 'Échec de l\'enregistrement: ' + errorMsg, 3000);
                    console.error('❌ Failed to save invoice:', result);
                    return; // Exit on error
                }
            } catch (error) {
                console.error('❌ Error saving to database:', error);
                window.notify.error('Erreur', 'Impossible d\'enregistrer dans la base', 3000);
                return; // Exit on error
            }
        }
        
        // This code should never be reached if saved to DB (return statement above)
        // Only add to manual list if NOT saved to database
        console.log('⚠️ [CHAIMAE DEBUG] Reached manual list section - this should ONLY happen if NOT saved to DB');
        console.log('📋 [CHAIMAE DEBUG] existingInvoices length before manual add:', existingInvoices.length);
        
        // Get optional fields for manual invoice
        let numeroOrder = null;
        let bonLivraison = null;
        let bonCommande = null;
        
        if (type === 'facture') {
            const orderCheckbox = document.getElementById('toggleOrderChaimaeManual');
            const blCheckbox = document.getElementById('toggleBLChaimaeManual');
            const bcCheckbox = document.getElementById('toggleBCChaimaeManual');
            
            if (orderCheckbox && orderCheckbox.checked) {
                numeroOrder = document.getElementById('manualInvoiceOrderChaimae')?.value || null;
            }
            
            if (blCheckbox && blCheckbox.checked) {
                bonLivraison = document.getElementById('manualInvoiceBLChaimae')?.value || null;
            }
            
            if (bcCheckbox && bcCheckbox.checked) {
                bonCommande = document.getElementById('manualInvoiceBCChaimae')?.value || null;
            }
        } else if (type === 'bon_livraison') {
            const bcCheckbox = document.getElementById('toggleBCChaimaeBLManual');
            
            if (bcCheckbox && bcCheckbox.checked) {
                bonCommande = document.getElementById('manualInvoiceBCBLChaimae')?.value || null;
            }
        }
        
        const newInvoice = {
            type: type === 'bon_livraison' ? 'BL' : type.replace('_', ' ').toUpperCase(),
            numero: numero,
            date: formattedDate,
            dateRaw: date,
            montant: montant.toFixed(2),
            numeroOrder: numeroOrder,
            bonLivraison: bonLivraison,
            bonCommande: bonCommande,
            savedToDb: false
        };
        
        existingInvoices.unshift(newInvoice);
        console.log('📋 [CHAIMAE DEBUG] existingInvoices length after manual add:', existingInvoices.length);
        console.log('📋 [CHAIMAE DEBUG] Added manual invoice:', newInvoice);
        
        if (typeof window.updateManualInvoicesDisplayChaimae === 'function') {
            console.log('🔄 [CHAIMAE DEBUG] Calling updateManualInvoicesDisplayChaimae (manual) with', existingInvoices.length, 'invoices');
            window.updateManualInvoicesDisplayChaimae(existingInvoices);
        }
        
        console.log('✅ [CHAIMAE DEBUG] Closing overlay after manual add');
        overlay.remove();
        window.notify.success('Succès', 'Facture ajoutée avec succès', 2000);
    };
    
    // Removed overlay click to close - user must use buttons
}

// Show add product modal for CHAIMAE
function showAddProductModalChaimae(productsArray, renderCallback) {
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
            <textarea id="productNameChaimae" placeholder="Ex: Service de transport" rows="3" style="width:100%;padding:0.75rem;background:#2d2d30;border:2px solid #3e3e42;border-radius:8px;color:#fff;font-size:1rem;resize:vertical;font-family:inherit;"></textarea>
        </div>
        
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1.5rem;">
            <div>
                <label style="display:block;color:#4caf50;margin-bottom:0.5rem;font-weight:600;">Prix unitaire HT *</label>
                <input type="number" id="productPriceChaimae" placeholder="0.00" step="0.01" min="0" style="width:100%;padding:0.75rem;background:#2d2d30;border:2px solid #3e3e42;border-radius:8px;color:#fff;font-size:1rem;">
            </div>
            <div>
                <label style="display:block;color:#4caf50;margin-bottom:0.5rem;font-weight:600;">Quantité *</label>
                <input type="number" id="productQuantityChaimae" placeholder="1" min="1" value="1" style="width:100%;padding:0.75rem;background:#2d2d30;border:2px solid #3e3e42;border-radius:8px;color:#fff;font-size:1rem;">
            </div>
        </div>
        
        <div style="display:flex;gap:1rem;">
            <button id="cancelProductBtnChaimae" style="flex:1;padding:0.75rem;background:#3e3e42;color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:1rem;font-weight:600;">
                Annuler
            </button>
            <button id="addProductConfirmBtnChaimae" style="flex:1;padding:0.75rem;background:#4caf50;color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:1rem;font-weight:600;">
                ✓ Ajouter
            </button>
        </div>
    `;
    
    productOverlay.appendChild(productModal);
    document.body.appendChild(productOverlay);
    
    setTimeout(() => document.getElementById('productNameChaimae').focus(), 100);
    
    document.getElementById('cancelProductBtnChaimae').onclick = () => {
        productOverlay.remove();
    };
    
    document.getElementById('addProductConfirmBtnChaimae').onclick = () => {
        const name = document.getElementById('productNameChaimae').value.trim();
        const price = parseFloat(document.getElementById('productPriceChaimae').value);
        const quantity = parseInt(document.getElementById('productQuantityChaimae').value);
        
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
    
    productOverlay.onclick = (e) => {
        if (e.target === productOverlay) {
            productOverlay.remove();
        }
    };
    
    productModal.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            document.getElementById('addProductConfirmBtnChaimae').click();
        }
    });
}
