// MRY Invoices List Page
function InvoicesListMRYPage() {
    return `
        <div class="desktop-app">
            <div class="window-header">
                <div class="window-title">
                    <img src="assets/logos/mry.png" class="header-logo" alt="MRY Company" data-asset="assets/logos/mry.png">
                    <span>Liste des Factures - MRY TRAV SARL (AU)</span>
                </div>
                <div class="window-controls">
                    <button class="control-btn reload" title="Recharger la page">
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
                            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
                        </svg>
                    </button>
                    <button class="control-btn minimize">
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8z"/>
                        </svg>
                    </button>
                    <button class="control-btn maximize">
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M1.5 1a.5.5 0 0 0-.5.5v13a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-13a.5.5 0 0 0-.5-.5h-13zM2 2h12v12H2V2z"/>
                        </svg>
                    </button>
                    <button class="control-btn close">
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854z"/>
                        </svg>
                    </button>
                </div>
            </div>

            <div class="window-content">
                <div class="invoices-list-container">
                    <!-- Header -->
                    <div class="list-header-new">
                        <div class="header-title-section">
                            <h1 class="header-title">📋 Liste des Factures et Devis</h1>
                        </div>
                        
                        <div class="header-actions-new">
                            <button id="changeYearBtnMRY" onclick="router.navigate('/year-selector-mry')" class="action-btn action-btn-year">
                                <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                                </svg>
                                <span id="currentYearDisplayMRY">2025</span>
                            </button>
                            
                            <button class="action-btn action-btn-situation" onclick="showSituationMensuelleModalMRY()">
                                <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                                    <path d="M1 11a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3zm5-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-7zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V2z"/>
                                </svg>
                                <span>Situation</span>
                            </button>

                            <button class="action-btn action-btn-situation" onclick="showSituationAnnuelleModalMRY()" style="background-color: #9c27b0;">
                                <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                                    <path d="M4 11a1 1 0 1 1 2 0v1a1 1 0 1 1-2 0v-1zm6-4a1 1 0 1 1 2 0v5a1 1 0 1 1-2 0V7zM7 9a1 1 0 0 1 2 0v3a1 1 0 1 1-2 0V9z"/>
                                    <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
                                    <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
                                </svg>
                                <span>Annuelle</span>
                            </button>

                            <button class="action-btn action-btn-situation" onclick="showSituationAnnuelleClientsModalMRY()" style="background-color: #FF9800;">
                                <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                                    <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
                                </svg>
                                <span>Globale</span>
                            </button>
                            
                            <button class="action-btn action-btn-primary" onclick="router.navigate('/create-invoice-mry')">
                                <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                </svg>
                                <span>Nouvelle</span>
                            </button>


                            <button class="action-btn action-btn-secondary" onclick="router.navigate('/dashboard-mry')">
                                <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                                    <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                                </svg>
                                <span>Retour</span>
                            </button>
                        </div>
                    </div>
                    



                    <!-- Filters -->
                    <div class="filters-section" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
                        <div class="filter-group">
                            <label>Type de document:</label>
                            <select id="filterType" onchange="filterInvoices()">
                                <option value="">Tous</option>
                                <option value="facture">Factures</option>
                                <option value="devis">Devis</option>
                            </select>
                        </div>
                        
                        <div class="filter-group">
                            <label>📆 Mois:</label>
                            <select id="filterMonth" onchange="filterInvoices()">
                                <option value="">Tous</option>
                                <option value="01">Janvier</option>
                                <option value="02">Février</option>
                                <option value="03">Mars</option>
                                <option value="04">Avril</option>
                                <option value="05">Mai</option>
                                <option value="06">Juin</option>
                                <option value="07">Juillet</option>
                                <option value="08">Août</option>
                                <option value="09">Septembre</option>
                                <option value="10">Octobre</option>
                                <option value="11">Novembre</option>
                                <option value="12">Décembre</option>
                            </select>
                        </div>
                        
                        <div class="filter-group">
                            <label>👤 Client:</label>
                            <select id="filterClient" onchange="filterInvoices()">
                                <option value="">Tous</option>
                            </select>
                        </div>
                        
                        <div class="filter-group">
                            <label>💳 Statut de paiement:</label>
                            <select id="filterPaymentStatus" onchange="filterInvoices()">
                                <option value="">Tous</option>
                                <option value="en attente de paiement">En attente</option>
                                <option value="payé">Payé</option>
                            </select>
                        </div>
                        
                        <div class="filter-group">
                            <label>💰 Méthode de paiement:</label>
                            <select id="filterPaymentMethod" onchange="filterInvoices()">
                                <option value="">Toutes</option>
                                <option value="Chèque">Chèque</option>
                                <option value="LCN">LCN</option>
                                <option value="Virement">Virement</option>
                                <option value="PRL">PRL</option>
                                <option value="Espèces">Espèces</option>
                            </select>
                        </div>
                        
                        <div class="filter-group" style="grid-column: 1 / -1;">
                            <label style="display:block; color:#4caf50; font-weight:600; font-size:0.75rem; text-transform:uppercase; letter-spacing:0.6px; margin-bottom:0.4rem;">🔍 Recherche avancée</label>
                            <div style="display: grid; grid-template-columns: 250px 1fr; gap: 0.5rem;">
                                <div style="position:relative;" id="searchTypeDropdownWrapperMry">
                                    <div onclick="toggleSearchTypeDropdownMry()" id="searchTypeDropdownDisplayMry"
                                        style="display:flex; align-items:center; justify-content:space-between; padding:0.45rem 0.7rem; background:#252526; border:1px solid #3e3e42; border-radius:6px; cursor:pointer; transition:all 0.15s; user-select:none;">
                                        <div style="display:flex; align-items:center; gap:0.4rem; flex-wrap:wrap; flex:1; min-width:0;">
                                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#4caf50" stroke-width="2.5" style="flex-shrink:0;"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                                            <span id="searchTypeSelectedTextMry" style="color:#ccc; font-size:0.82rem; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">Tous les champs</span>
                                        </div>
                                        <svg id="searchTypeDropdownArrowMry" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#666" stroke-width="2.5" style="flex-shrink:0; transition:transform 0.2s;"><polyline points="6 9 12 15 18 9"/></svg>
                                    </div>
                                    <div id="searchTypeDropdownMry" style="display:none; position:absolute; top:calc(100% + 3px); left:0; right:0; background:#252526; border:1px solid #3e3e42; border-radius:6px; z-index:9999; overflow:hidden; box-shadow:0 6px 18px rgba(0,0,0,0.5); max-height:300px; overflow-y:auto;">
                                        <div onclick="toggleAllSearchTypesMry()" style="display:flex; align-items:center; gap:0.6rem; padding:0.55rem 0.7rem; cursor:pointer; background:#2a2a2e; border-bottom:2px solid #3e3e42; transition:background 0.12s;" onmouseover="this.style.background='#323235'" onmouseout="this.style.background='#2a2a2e'">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4caf50" stroke-width="2.5" style="flex-shrink:0;"><polyline points="20 6 9 17 4 12"/></svg>
                                            <span id="searchTypeToggleAllTextMry" style="color:#4caf50; font-size:0.82rem; font-weight:600;">Sélectionner tout</span>
                                        </div>
                                        <div onclick="toggleSearchTypeMry('numero')" style="display:flex; align-items:center; gap:0.6rem; padding:0.45rem 0.7rem; cursor:pointer; transition:background 0.12s;" onmouseover="this.style.background='#2d2d30'" onmouseout="this.style.background='transparent'">
                                            <span id="searchTypeCheckNumeroMry" data-active="false" style="width:14px; height:14px; border-radius:3px; border:1.5px solid #555; display:inline-flex; align-items:center; justify-content:center; font-size:0.65rem; flex-shrink:0; transition:all 0.12s; color:#fff;"></span>
                                            <span style="color:#d4d4d4; font-size:0.82rem;">📄 N° Document</span>
                                        </div>
                                        <div onclick="toggleSearchTypeMry('order')" style="display:flex; align-items:center; gap:0.6rem; padding:0.45rem 0.7rem; cursor:pointer; border-top:1px solid #2a2a2a; transition:background 0.12s;" onmouseover="this.style.background='#2d2d30'" onmouseout="this.style.background='transparent'">
                                            <span id="searchTypeCheckOrderMry" data-active="false" style="width:14px; height:14px; border-radius:3px; border:1.5px solid #555; display:inline-flex; align-items:center; justify-content:center; font-size:0.65rem; flex-shrink:0; transition:all 0.12s; color:#fff;"></span>
                                            <span style="color:#d4d4d4; font-size:0.82rem;">📋 N° Order</span>
                                        </div>
                                        <div onclick="toggleSearchTypeMry('client')" style="display:flex; align-items:center; gap:0.6rem; padding:0.45rem 0.7rem; cursor:pointer; border-top:1px solid #2a2a2a; transition:background 0.12s;" onmouseover="this.style.background='#2d2d30'" onmouseout="this.style.background='transparent'">
                                            <span id="searchTypeCheckClientMry" data-active="false" style="width:14px; height:14px; border-radius:3px; border:1.5px solid #555; display:inline-flex; align-items:center; justify-content:center; font-size:0.65rem; flex-shrink:0; transition:all 0.12s; color:#fff;"></span>
                                            <span style="color:#d4d4d4; font-size:0.82rem;">👤 Client</span>
                                        </div>
                                        <div onclick="toggleSearchTypeMry('ice')" style="display:flex; align-items:center; gap:0.6rem; padding:0.45rem 0.7rem; cursor:pointer; border-top:1px solid #2a2a2a; transition:background 0.12s;" onmouseover="this.style.background='#2d2d30'" onmouseout="this.style.background='transparent'">
                                            <span id="searchTypeCheckIceMry" data-active="false" style="width:14px; height:14px; border-radius:3px; border:1.5px solid #555; display:inline-flex; align-items:center; justify-content:center; font-size:0.65rem; flex-shrink:0; transition:all 0.12s; color:#fff;"></span>
                                            <span style="color:#d4d4d4; font-size:0.82rem;">🏢 ICE</span>
                                        </div>
                                        <div onclick="toggleSearchTypeMry('product')" style="display:flex; align-items:center; gap:0.6rem; padding:0.45rem 0.7rem; cursor:pointer; border-top:1px solid #2a2a2a; transition:background 0.12s;" onmouseover="this.style.background='#2d2d30'" onmouseout="this.style.background='transparent'">
                                            <span id="searchTypeCheckProductMry" data-active="false" style="width:14px; height:14px; border-radius:3px; border:1.5px solid #555; display:inline-flex; align-items:center; justify-content:center; font-size:0.65rem; flex-shrink:0; transition:all 0.12s; color:#fff;"></span>
                                            <span style="color:#d4d4d4; font-size:0.82rem;">📦 Produit</span>
                                        </div>
                                        <div onclick="toggleSearchTypeMry('price')" style="display:flex; align-items:center; gap:0.6rem; padding:0.45rem 0.7rem; cursor:pointer; border-top:1px solid #2a2a2a; transition:background 0.12s;" onmouseover="this.style.background='#2d2d30'" onmouseout="this.style.background='transparent'">
                                            <span id="searchTypeCheckPriceMry" data-active="false" style="width:14px; height:14px; border-radius:3px; border:1.5px solid #555; display:inline-flex; align-items:center; justify-content:center; font-size:0.65rem; flex-shrink:0; transition:all 0.12s; color:#fff;"></span>
                                            <span style="color:#d4d4d4; font-size:0.82rem;">💰 Prix</span>
                                        </div>
                                        <div onclick="toggleSearchTypeMry('total_ht')" style="display:flex; align-items:center; gap:0.6rem; padding:0.45rem 0.7rem; cursor:pointer; border-top:1px solid #2a2a2a; transition:background 0.12s;" onmouseover="this.style.background='#2d2d30'" onmouseout="this.style.background='transparent'">
                                            <span id="searchTypeCheckTotalHtMry" data-active="false" style="width:14px; height:14px; border-radius:3px; border:1.5px solid #555; display:inline-flex; align-items:center; justify-content:center; font-size:0.65rem; flex-shrink:0; transition:all 0.12s; color:#fff;"></span>
                                            <span style="color:#d4d4d4; font-size:0.82rem;">💵 Total H.T</span>
                                        </div>
                                        <div onclick="toggleSearchTypeMry('total')" style="display:flex; align-items:center; gap:0.6rem; padding:0.45rem 0.7rem; cursor:pointer; border-top:1px solid #2a2a2a; transition:background 0.12s;" onmouseover="this.style.background='#2d2d30'" onmouseout="this.style.background='transparent'">
                                            <span id="searchTypeCheckTotalMry" data-active="false" style="width:14px; height:14px; border-radius:3px; border:1.5px solid #555; display:inline-flex; align-items:center; justify-content:center; font-size:0.65rem; flex-shrink:0; transition:all 0.12s; color:#fff;"></span>
                                            <span style="color:#d4d4d4; font-size:0.82rem;">💵 Total TTC</span>
                                        </div>
                                    </div>
                                </div>
                                <input type="text" id="searchInput" placeholder="Tapez votre recherche..." onkeyup="filterInvoices()" style="width: 100%; padding: 0.75rem; background: #1e1e1e; border: 1px solid #3e3e42; border-radius: 4px; color: #ffffff; font-size: 0.95rem;">
                            </div>
                        </div>

                        <!-- P.J Filter -->
                        <div class="filter-group">
                            <label>📎 Pièces Jointes:</label>
                            <select id="filterAttachments" onchange="filterInvoices()">
                                <option value="all">Tous</option>
                                <option value="with">Avec P.J</option>
                                <option value="without">Sans P.J</option>
                            </select>
                        </div>

                        <!-- Creation Method Filter -->
                        <div class="filter-group">
                            <label>🔧 Méthode de création:</label>
                            <select id="filterMethod" onchange="filterInvoices()">
                                <option value="all">Tous</option>
                                <option value="normal">Créé normalement</option>
                                <option value="converted">Converti</option>
                            </select>
                        </div>

                        <!-- Devis Conversion Filter -->
                        <div class="filter-group">
                            <label>🔄 Etat Devis:</label>
                            <select id="filterDevisConversionMRY" onchange="filterInvoices()">
                                <option value="all">Tous</option>
                                <option value="converted">Convertis</option>
                                <option value="not_converted">Non Convertis</option>
                            </select>
                        </div>
                        
                        <!-- AR Status Filter -->
                        <div class="filter-group">
                            <label>🕒 Accusé de Réception:</label>
                            <select id="filterArStatusMRY" onchange="filterInvoices()">
                                <option value="all">Tous</option>
                                <option value="">— (vide)</option>
                                <option value="sans_accuse">Sans accusé</option>
                                <option value="en_attente">En attente</option>
                                <option value="accuse">Accusé</option>
                                <option value="done">Done</option>
                            </select>
                        </div>
                        
                        <!-- Featured Filter - Admins Only -->
                        <div class="filter-group" id="featuredFilterGroupMRY" style="display: none;">
                            <label>⭐ Importance:</label>
                            <select id="filterFeaturedMRY" onchange="filterInvoices()">
                                <option value="all">Toutes</option>
                                <option value="featured">⭐ Importantes</option>
                                <option value="not_featured">Non importantes</option>
                            </select>
                        </div>

                        <!-- Status Filter (Seen/Unseen) - Admins Only -->
                        <div class="filter-group" id="statusFilterGroupMRY" style="display: none;">
                            <label>👁️ Statut:</label>
                            <div style="position: relative;">
                                <select id="filterStatusMRY" onchange="filterInvoices()">
                                    <option value="all">Tous</option>
                                    <option value="unseen">Non lus (Nouveau)</option>
                                    <option value="modified">Modifiés (Par un autre)</option>
                                    <option value="seen">Lus / Traités</option>
                                </select>
                                <span id="unseenBadgeMRY" style="display: none; position: absolute; top: -8px; right: -8px; background: #f44336; color: white; border-radius: 50%; padding: 2px 6px; font-size: 10px; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">0</span>
                            </div>
                        </div>
                        
                        <div class="filter-group">
                            <button class="btn-refresh" onclick="loadInvoices()" style="margin-top: 1.5rem;">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style="margin-right: 0.5rem;">
                                    <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
                                    <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
                                </svg>
                                <span>Actualiser</span>
                            </button>
                        </div>
                    </div>

                    <!-- Loading -->
                    <div id="loadingSpinner" class="loading-spinner" style="display: none;">
                        <div class="spinner"></div>
                        <p>Chargement des données...</p>
                    </div>

                    <!-- Results Counter & Bulk Actions -->
                    <div style="display: flex; gap: 1rem; align-items: center; margin-bottom: 1rem;">
                        <div id="resultsCounter" style="flex: 1; padding: 0.75rem 1rem; background: #2d2d30; border: 1px solid #3e3e42; border-radius: 6px; color: #cccccc; font-size: 0.95rem; display: none;">
                            <strong>📊 Résultats:</strong> <span id="resultCount">0</span> facture(s) trouvée(s)
                        </div>
                        <div style="display: flex; gap: 0.5rem; align-items: center;">
                            <label style="color: #cccccc; font-size: 0.9rem;">Afficher:</label>
                            <select id="itemsPerPage" onchange="changeItemsPerPage()" style="padding: 0.5rem; background: #2d2d30; border: 1px solid #3e3e42; border-radius: 4px; color: #ffffff; cursor: pointer;">
                                <option value="10">10</option>
                                <option value="20">20</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                                <option value="all">Tout</option>
                            </select>
                        </div>
                        <button id="bulkDownloadBtn" onclick="showBulkDownloadModal()" 
                                style="display: none; padding: 0.75rem 1.5rem; background: #2196f3; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 0.95rem; transition: all 0.3s;"
                                onmouseover="this.style.background='#1976d2'" onmouseout="this.style.background='#2196f3'">
                            📥 Télécharger (<span id="selectedCount">0</span>)
                        </button>
                        <button id="bulkDeleteBtnMRY" onclick="handleBulkDeleteMRY()" 
                                style="display: none; padding: 0.75rem 1.5rem; background: #f44336; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 0.95rem; transition: all 0.3s; align-items: center; gap: 0.5rem;"
                                onmouseover="this.style.background='#d32f2f'" onmouseout="this.style.background='#f44336'">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                            </svg>
                            Supprimer (<span id="selectedDeleteCount">0</span>)
                        </button>
                    </div>

                    <!-- Column Visibility Controls -->
                    <div id="columnVisibilityControlsMRY" style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1rem; padding: 0.75rem; background: #2d2d30; border: 1px solid #3e3e42; border-radius: 6px; align-items: center;">
                        <span style="color: #cccccc; font-size: 0.9rem; font-weight: 600; margin-right: 0.5rem;">👁️ Afficher:</span>
                        <button id="toggleColIceMRY" onclick="toggleColumnMRY('ice')" class="col-toggle-btn" style="padding: 0.4rem 0.8rem; background: #f44336; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 0.85rem; transition: all 0.2s; opacity: 0.7;">
                            🏢 ICE
                        </button>
                    </div>

                    <!-- Invoices Table -->
                    <div class="table-container">
                        <table class="invoices-table" id="invoicesTableMRY">
                            <thead id="invoicesTableHeadMRY">
                                <tr>
                                    <th>
                                        <input type="checkbox" id="selectAllInvoices" 
                                               style="width: 18px; height: 18px; cursor: pointer;"
                                               title="Sélectionner tout">
                                    </th>
                                    <th class="col-type-mry">Type</th>
                                    <th onclick="sortTableMry('numero')" style="cursor: pointer; user-select: none;" title="Cliquez pour trier">
                                        N° Document <span id="sortIconNumeroMry">⇅</span>
                                    </th>
                                    <th>Client</th>
                                    <th class="col-ice-mry">ICE</th>
                                    <th class="col-date-mry" onclick="sortTableMry('date')" style="cursor: pointer; user-select: none;" title="Cliquez pour trier">
                                        Date <span id="sortIconDateMry">⇅</span>
                                    </th>
                                    <th class="col-createdBy-mry">Créé par</th>
                                    <th class="col-totalHT-mry" onclick="sortTableMry('total_ht')" style="cursor: pointer; user-select: none;" title="Cliquez pour trier">
                                        Total HT <span id="sortIconTotalHTMry">⇅</span>
                                    </th>
                                    <th onclick="sortTableMry('total_ttc')" style="cursor: pointer; user-select: none;" title="Cliquez pour trier">
                                        Total TTC <span id="sortIconTotalTTCMry">⇅</span>
                                    </th>
                                    <th style="width: 140px; text-align: center;">Accusé R.</th>
                                    <th style="width: 200px; text-align: center;">💳 Paiement</th>
                                    <th style="width: 50px; text-align: center;">P.J</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody id="invoicesTableBody">
                                <!-- Invoices will be loaded here -->
                            </tbody>
                        </table>
                    </div>

                    <!-- Pagination -->
                    <div id="pagination" style="display: none; margin-top: 1.5rem; padding: 1rem; background: #2d2d30; border: 1px solid #3e3e42; border-radius: 6px;">
                        <div style="display: flex; justify-content: center; align-items: center; gap: 0.5rem;">
                            <button id="prevPage" onclick="changePaginationPage('prev')" style="padding: 0.5rem 1rem; background: #3e3e42; color: #ffffff; border: none; border-radius: 4px; cursor: pointer; transition: all 0.3s;" onmouseover="this.style.background='#4e4e52'" onmouseout="this.style.background='#3e3e42'">
                                ← Précédent
                            </button>
                            <div id="pageNumbers" style="display: flex; gap: 0.25rem;">
                                <!-- Page numbers will be inserted here -->
                            </div>
                            <button id="nextPage" onclick="changePaginationPage('next')" style="padding: 0.5rem 1rem; background: #3e3e42; color: #ffffff; border: none; border-radius: 4px; cursor: pointer; transition: all 0.3s;" onmouseover="this.style.background='#4e4e52'" onmouseout="this.style.background='#3e3e42'">
                                Suivant →
                            </button>
                        </div>
                    </div>

                    <!-- Empty State -->
                    <div id="emptyState" class="empty-state" style="display: none;">
                        <div class="empty-icon">📄</div>
                        <h3>Aucune facture trouvée</h3>
                        <p>Commencez par créer votre première facture</p>
                        <button class="btn-primary" onclick="router.navigate('/create-invoice-mry')">
                            <span>➕ Créer une facture</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Store all invoices
let allInvoices = [];
let filteredInvoices = [];
let currentPage = 1;
let itemsPerPage = 10;
let isSuperUserMRY = false;

// Column visibility state for MRY - ICE hidden by default
let columnVisibilityMRY = {
    ice: false
};

// Load column visibility from localStorage on page load
function loadColumnVisibilityMRY() {
    const saved = localStorage.getItem('mry_column_visibility');
    if (saved) {
        try {
            columnVisibilityMRY = JSON.parse(saved);
        } catch (e) {
            console.error('Error loading column visibility:', e);
        }
    }
    // Apply visibility on load
    applyColumnVisibilityMRY();
}

// Save column visibility to localStorage
function saveColumnVisibilityMRY() {
    localStorage.setItem('mry_column_visibility', JSON.stringify(columnVisibilityMRY));
}

// Toggle column visibility
window.toggleColumnMRY = function (column) {
    columnVisibilityMRY[column] = !columnVisibilityMRY[column];
    saveColumnVisibilityMRY();
    applyColumnVisibilityMRY();

    // Re-display invoices to update table body
    displayInvoices(filteredInvoices);
};

// Apply column visibility to table and buttons - ICE only
function applyColumnVisibilityMRY() {
    const isVisible = columnVisibilityMRY.ice;

    // Update button style
    const btn = document.getElementById('toggleColIceMRY');
    if (btn) {
        if (isVisible) {
            btn.style.background = '#4caf50';
            btn.style.opacity = '1';
        } else {
            btn.style.background = '#f44336';
            btn.style.opacity = '0.7';
        }
    }

    // Update header visibility
    const headerCells = document.querySelectorAll('.col-ice-mry');
    headerCells.forEach(cell => {
        cell.style.display = isVisible ? '' : 'none';
    });

    // Update body cells visibility
    const bodyCells = document.querySelectorAll('.col-ice-mry-body');
    bodyCells.forEach(cell => {
        cell.style.display = isVisible ? '' : 'none';
    });
}

// Format number for display with proper formatting
function formatNumber(number) {
    const num = parseFloat(number) || 0;
    return num.toLocaleString('fr-FR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

// Validation Queue Functions
async function loadPendingInvoicesMRY() {
    try {
        const result = await window.electron.db.getPendingInvoices();

        if (result.success) {
            displayPendingInvoicesMRY(result.data);
            const countSpan = document.getElementById('pendingInvoicesCountMRY');
            if (countSpan) countSpan.textContent = result.data.length;
        } else {
            console.error('❌ [VALIDATION LOAD] Failed to load:', result.error);
        }
    } catch (error) {
        console.error('Error loading pending invoices MRY:', error);
    }
}

function displayPendingInvoicesMRY(invoices) {
    const tableBody = document.getElementById('pendingInvoicesTableBodyMRY');
    if (!tableBody) return;

    if (invoices.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="7" style="text-align:center;padding:2rem;color:#999;">Aucune facture en attente de validation</td></tr>';
        return;
    }

    tableBody.innerHTML = invoices.map(inv => `
        <tr>
            <td><span class="badge badge-${inv.document_type}">${inv.document_type}</span></td>
            <td><strong>${inv.document_numero}</strong></td>
            <td>${inv.client_nom || '-'}</td>
            <td>${(window.safeParseDate ? window.safeParseDate(inv.document_date) : new Date(inv.document_date)).toLocaleDateString('fr-FR')}</td>
            <td><strong>${formatNumber(inv.total_ttc)}</strong> DH</td>
            <td><span style="color:#2196f3;">${inv.created_by_user_name || '-'}</span></td>
            <td style="text-align:center;">
                <div style="display:flex;gap:0.5rem;justify-content:center;">
                    <button onclick="handleValidateInvoiceMRY('${inv.id}', 'validated')" class="btn-action btn-validate" title="Valider" style="background:#4caf50;color:white;border:none;padding:0.4rem 0.8rem;border-radius:4px;cursor:pointer;">
                        ✅ Valider
                    </button>
                    <button onclick="handleValidateInvoiceMRY('${inv.id}', 'rejected')" class="btn-action btn-reject" title="Rejeter" style="background:#f44336;color:white;border:none;padding:0.4rem 0.8rem;border-radius:4px;cursor:pointer;">
                        ❌ Rejeter
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

window.toggleValidationQueueMRY = function () {
    const content = document.getElementById('validationQueueContentMRY');
    const icon = document.getElementById('toggleValidationIconMRY');
    if (content.style.display === 'none') {
        content.style.display = 'block';
        icon.textContent = '▲';
    } else {
        content.style.display = 'none';
        icon.textContent = '▼';
    }
};

window.handleValidateInvoiceMRY = async function (id, status) {
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    const isAdminViewer = currentUser.email === 'redouanerrebbahi99@gmail.com';
    if (!isAdminViewer) {
        window.notify?.error('Erreur', 'Action réservée à l\'admin', 3000);
        return;
    }
    const action = status === 'validated' ? 'valider' : 'rejeter';
    const confirmMessage = `Êtes-vous sûr de vouloir ${action} ce document ?`;

    const confirmed = await customConfirm('Confirmation', confirmMessage, status === 'validated' ? 'info' : 'warning');

    if (confirmed) {
        try {
            const currentUserVal = JSON.parse(localStorage.getItem('user') || '{}');
            const result = await window.electron.db.validateInvoice(id, status, currentUserVal.email || '');
            if (result.success) {
                // Update UI
                loadPendingInvoicesMRY(); // Refresh pending
                loadInvoices();       // Refresh main list
                window.notify?.success('Succès', `Document ${status === 'validated' ? 'validé' : 'rejeté'} avec succès`);
            } else {
                console.error('Validation error:', result.error);
                window.notify?.error('Erreur', 'Échec de la validation: ' + result.error);
            }
        } catch (error) {
            console.error('Validation exception:', error);
            window.notify?.error('Erreur', 'Une erreur est survenue');
        }
    }
};


// Load invoices from database
window.loadInvoices = async function () {
    // Load column visibility preferences
    loadColumnVisibilityMRY();

    // Check user identity
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    isSuperUserMRY = (user.email === 'redouanerrebbahi99@gmail.com' || user.can_auto_validate === true);

    console.log('🔄 [LOAD] Starting to load invoices from database...');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const tableBody = document.getElementById('invoicesTableBody');
    const emptyState = document.getElementById('emptyState');

    // Show/Hide Status Filter based on admin status
    const statusFilterGroup = document.getElementById('statusFilterGroupMRY');
    if (statusFilterGroup) {
        statusFilterGroup.style.display = isSuperUserMRY ? 'block' : 'none';
    }

    // Show/Hide Featured Filter based on admin status
    const featuredFilterGroup = document.getElementById('featuredFilterGroupMRY');
    if (featuredFilterGroup) {
        featuredFilterGroup.style.display = isSuperUserMRY ? 'block' : 'none';
    }

    if (!loadingSpinner || !tableBody || !emptyState) {
        console.error('❌ Required elements not found in DOM');
        return;
    }

    try {
        // Show loading
        loadingSpinner.style.display = 'flex';
        tableBody.innerHTML = '';
        emptyState.style.display = 'none';

        // Get invoices from database
        const result = await window.electron.db.getAllInvoices('MRY');

        console.log('📥 [LOAD] Received from database:', result.success ? `${result.data.length} invoices` : 'Failed');

        if (result.success) {
            let invoices = result.data;

            // Check if a year was selected from year selector
            const selectedYear = sessionStorage.getItem('mry_current_year');
            if (selectedYear && selectedYear !== '') {
                // Filter invoices by selected year
                invoices = invoices.filter(inv => {
                    const year = inv.year || (window.safeParseDate||function(d){return new Date(d)})(inv.document_date).getFullYear();
                    return year.toString() === selectedYear;
                });
                console.log(`📊 [LOAD] Filtered to year ${selectedYear}:`, invoices.length, 'invoices');

                // Update the year display button
                const yearDisplay = document.getElementById('currentYearDisplayMRY');
                if (yearDisplay) {
                    yearDisplay.textContent = selectedYear;
                }
            }

            // Add default display if not present
            const enrichedInvoices = invoices.map(inv => ({
                ...inv,
                created_by_user_name: inv.created_by_user_name || '-'
            }));

            // Filter: Main list should show detailed list based on user role, but for this feature we want ALL invoices
            // "Pending" invoices are "Unseen".
            allInvoices = enrichedInvoices;
            console.log('✅ [LOAD] All invoices stored in memory:', allInvoices.length);

            // Calculate Unseen (Pending) count
            const unseenCount = allInvoices.filter(inv => inv.validation_status === 'pending').length;
            const badge = document.getElementById('unseenBadgeMRY');
            if (badge) {
                badge.textContent = unseenCount;
                badge.style.display = unseenCount > 0 ? 'block' : 'none';
            }

            // Log first 3 invoices for debugging
            if (allInvoices.length > 0) {
                console.log('📋 [LOAD] Sample invoices:', allInvoices.slice(0, 3).map(inv => ({
                    id: inv.id,
                    type: inv.document_type,
                    numero: inv.document_numero,
                    numero_devis: inv.document_numero_devis,
                    status: inv.validation_status,
                    document_date: inv.document_date,
                    document_date_type: typeof inv.document_date
                })));
            }

            // Populate filters
            populateFilters();

            // Hide loading
            loadingSpinner.style.display = 'none';

            if (allInvoices.length === 0) {
                emptyState.style.display = 'flex';
            } else {
                filteredInvoices = allInvoices;
                displayInvoices(allInvoices);
            }
        } else {
            throw new Error(result.error);
        }
    } catch (error) {
        console.error('❌ Error loading invoices:', error);
        loadingSpinner.style.display = 'none';

        window.notify.error(
            'Erreur de chargement',
            'Impossible de charger les factures: ' + error.message,
            5000
        );
    }
}


// Display invoices in table with pagination
function displayInvoices(invoices) {
    const tableBody = document.getElementById('invoicesTableBody');
    const emptyState = document.getElementById('emptyState');
    const pagination = document.getElementById('pagination');

    if (!tableBody) {
        console.error('❌ invoicesTableBody element not found');
        return;
    }

    if (invoices.length === 0) {
        tableBody.innerHTML = '';
        if (emptyState) emptyState.style.display = 'flex';
        if (pagination) pagination.style.display = 'none';
        return;
    }

    if (emptyState) emptyState.style.display = 'none';

    // Calculate pagination
    const totalItems = invoices.length;
    const itemsPerPageNum = itemsPerPage === 'all' ? totalItems : parseInt(itemsPerPage);
    const totalPages = itemsPerPage === 'all' ? 1 : Math.ceil(totalItems / itemsPerPageNum);

    // Adjust current page if needed
    if (currentPage > totalPages) {
        currentPage = totalPages || 1;
    }

    // Get items for current page
    const startIndex = (currentPage - 1) * itemsPerPageNum;
    const endIndex = itemsPerPage === 'all' ? totalItems : startIndex + itemsPerPageNum;
    const paginatedInvoices = invoices.slice(startIndex, endIndex);

    tableBody.innerHTML = paginatedInvoices.map(invoice => {
        console.log('📊 [DISPLAY] Invoice data:', {
            id: invoice.id,
            document_type: invoice.document_type,
            document_numero: invoice.document_numero,
            document_numero_devis: invoice.document_numero_devis,
            total_ht: invoice.total_ht,
            total_ttc: invoice.total_ttc
        });

        let typeLabel = '';
        let typeBadge = '';

        if (invoice.document_type === 'facture') {
            typeLabel = '📄 Facture';
            typeBadge = 'badge-facture';
        } else if (invoice.document_type === 'devis') {
            typeLabel = '📋 Devis';
            typeBadge = 'badge-devis';
        } else {
            typeLabel = '📦 Bon de Livraison';
            typeBadge = 'badge-bl';
        }
        const numero = invoice.document_numero || invoice.document_numero_devis || '-';
        const numeroOrder = invoice.document_numero_Order || invoice.document_numero_order;

        console.log('📊 [DISPLAY] Displaying numero:', numero, 'for invoice', invoice.id);
        const date = (window.safeParseDate||function(d){return new Date(d)})(invoice.document_date).toLocaleDateString('fr-FR');

        // Build document number display with N° Order below if exists
        let documentDisplay = `<strong>${numero}</strong>`;
        if (numeroOrder) {
            documentDisplay += `<br><small style="color: #2196f3; font-weight: 500;">N° Order: ${numeroOrder}</small>`;
        }

        const totalHT = formatNumber(invoice.total_ht || 0);
        const totalTTC = formatNumber(invoice.total_ttc || 0);

        console.log('📊 MRY Formatted values:', {
            totalHT,
            totalTTC
        });

        console.log('👤 User info for invoice', invoice.id, ':', {
            created_by_user_name: invoice.created_by_user_name,
            created_by_user_id: invoice.created_by_user_id
        });

        // Ensure AR status is valid
        const arStatus = invoice.ar_status || '';
        const arBg = arStatus === 'accuse' ? '#4caf50' : (arStatus === 'en_attente' ? '#ff9800' : (arStatus === 'sans_accuse' ? '#f44336' : (arStatus === 'done' ? '#2196f3' : '#424242')));

        // Show red/yellow indicators - but NOT for invoices created by current user
        const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
        const isUnseen = invoice.validation_status === 'pending' && invoice.created_by_user_id !== currentUser.id;
        const isModified = invoice.is_modified === true;

        // Debug logging for background color issue
        if (invoice.is_modified || invoice.validation_status === 'pending') {
            console.log(`🎨 [COLOR DEBUG] Invoice ${invoice.id}:`, {
                is_modified: invoice.is_modified,
                validation_status: invoice.validation_status,
                isModified: isModified,
                isUnseen: isUnseen
            });
        }

        let rowClass = invoice.creation_method === 'converted' ? 'row-converted' : '';
        let rowStyle = '';

        if (isModified) {
            // Modified takes precedence
            rowStyle = 'background-color: rgba(255, 152, 0, 0.1); font-weight: bold;';
            console.log(`🟡 [YELLOW] Invoice ${invoice.id} showing YELLOW because isModified = true`);
        } else if (isUnseen) {
            rowClass = isUnseen && !rowClass ? 'row-unseen' : rowClass;
            rowStyle = 'background-color: rgba(244, 67, 54, 0.1); font-weight: bold;';
            console.log(`🔴 [RED] Invoice ${invoice.id} showing RED because isUnseen = true`);
        }

        return `
            <tr class="${rowClass}" style="${rowStyle}">
                <td>
                    <div style="display: flex; align-items: center; gap: 0.4rem;">
                        <input type="checkbox" class="invoice-checkbox" data-invoice-id="${invoice.id}"
                               style="width: 18px; height: 18px; cursor: pointer;">
                        ${isSuperUserMRY ? `<span onclick="event.stopPropagation(); toggleFeaturedMRY(${invoice.id}, this)" 
                              style="cursor: pointer; font-size: 1.2rem; transition: all 0.2s; filter: ${invoice.is_featured ? 'none' : 'grayscale(1) opacity(0.3)'};" 
                              title="${invoice.is_featured ? 'Retirer des importantes' : 'Marquer comme importante'}"
                              data-featured="${invoice.is_featured ? '1' : '0'}">${invoice.is_featured ? '⭐' : '☆'}</span>` : ''}
                    </div>
                </td>
                <td><span class="badge ${typeBadge}" style="${typeBadge === 'badge-converted' ? 'background: #e8f5e9; color: #2e7d32; border: 1px solid #a5d6a7;' : ''}">${typeLabel}</span></td>
                <td>${documentDisplay}</td>
                <td>${invoice.client_nom}</td>
                <td class="col-ice-mry-body" style="${columnVisibilityMRY.ice ? '' : 'display: none;'}">${invoice.client_ice}</td>
                <td>${date}</td>
                <td>
                    <div style="display: flex; flex-direction: column; gap: 0.2rem;">
                        <small style="color: #2196f3; font-weight: 600;">👤 Créé par: ${invoice.created_by_user_name || '-'}</small>
                        ${isModified ?
                `<small style="color: #ff9800; font-weight: 600;">📝 Modifié par: ${invoice.updated_by_user_name}</small>` : ''}
                    </div>
                </td>
                <td>${formatNumber(invoice.total_ht)} DH</td>
                <td><strong>${formatNumber(invoice.total_ttc)} DH</strong></td>
                <td>
                    ${invoice.document_type === 'devis' ? '<span style="color:#666;">—</span>' : `<select onchange="this.style.background=this.value==='accuse'?'#4caf50':this.value==='en_attente'?'#ff9800':this.value==='sans_accuse'?'#f44336':this.value==='done'?'#2196f3':'#424242'; window.updateArStatusMRY('${invoice.id}', this.value)"
                            style="padding: 0.4rem; background: ${arBg}; color: white; border: none; border-radius: 4px; font-size: 0.85rem; cursor: pointer; width: 100%; transition: background 0.3s;"
                            onclick="event.stopPropagation()">
                        <option value="" ${!arStatus ? 'selected' : ''} style="background: #424242; color: #fff;"></option>
                        <option value="sans_accuse" ${arStatus === 'sans_accuse' ? 'selected' : ''} style="background: #f44336; color: #fff;">Sans accusé</option>
                        <option value="en_attente" ${arStatus === 'en_attente' ? 'selected' : ''} style="background: #424242; color: #ff9800;">En attente</option>
                        <option value="accuse" ${arStatus === 'accuse' ? 'selected' : ''} style="background: #424242; color: #4caf50;">Accusé</option>
                        <option value="done" ${arStatus === 'done' ? 'selected' : ''} style="background: #424242; color: #2196f3;">Done</option>
                    </select>`}
                </td>
                <td style="text-align: center;">
                    ${invoice.document_type === 'facture' ? `<div onclick="event.stopPropagation()" style="text-align:center;">
                        <select onchange="window.handlePaymentChangeMRY('${invoice.id}', this.value, this, '${(invoice.payment_status || '').replace(/'/g, "\\'")}')"
                            style="padding: 0.4rem; background: ${(invoice.payment_status === 'payé') ? '#4caf50' : '#f44336'}; color: white; border: none; border-radius: 4px; font-size: 0.85rem; cursor: pointer; width: 100%; transition: background 0.3s;"
                            onclick="event.stopPropagation()">
                        <option value="en attente de paiement" ${invoice.payment_status !== 'payé' ? 'selected' : ''} style="background: #424242; color: #f44336;">En attente de paiement</option>
                        <option value="payé" ${invoice.payment_status === 'payé' ? 'selected' : ''} style="background: #424242; color: #4caf50;">Payé</option>
                        </select>
                        ${invoice.payment_status === 'payé' && invoice.payment_method ? `<div style="font-size:0.7rem;color:#81c784;margin-top:2px;">${invoice.payment_method}</div>` : ''}
                    </div>` : '<span style="color:#666;">—</span>'}
                </td>
                <td style="text-align: center;">
                    <div id="attachmentIndicator-${invoice.id}" onclick="viewInvoice(${invoice.id})" style="cursor: pointer;">
                        ${(invoice.attachment_count || 0) > 0 ?
                `<div style="position: relative; display: inline-block;">
                            <svg width="20" height="20" viewBox="0 0 16 16" fill="#2196f3">
                                <path d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0V3z"/>
                            </svg>
                            <span style="position: absolute; top: -8px; right: -8px; background: #f44336; color: white; border-radius: 50%; width: 16px; height: 16px; font-size: 10px; display: flex; align-items: center; justify-content: center; font-weight: bold; border: 1px solid #1e1e1e;">
                                ${invoice.attachment_count}
                            </span>
                        </div>` :
                `<svg width="20" height="20" viewBox="0 0 16 16" fill="#666" style="opacity: 0.5;">
                            <path d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0V3z"/>
                        </svg>`}
                    </div>
                </td>
                <td>
                    <div class="action-buttons">
                        <button class="btn-icon btn-view" onclick="viewInvoice(${invoice.id})" title="Voir">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M8 2C4.5 2 1.5 4.5 0 8c1.5 3.5 4.5 6 8 6s6.5-2.5 8-6c-1.5-3.5-4.5-6-8-6zm0 10c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4zm0-6.5c-1.4 0-2.5 1.1-2.5 2.5s1.1 2.5 2.5 2.5 2.5-1.1 2.5-2.5-1.1-2.5-2.5-2.5z"/>
                            </svg>
                        </button>
                        <button class="btn-icon btn-download" onclick="downloadInvoicePDF(${invoice.id})" title="Télécharger PDF">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                                <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                            </svg>
                        </button>
                        <button class="btn-icon btn-edit" onclick="editInvoice(${invoice.id})" title="Modifier">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                            </svg>
                        </button>
                        <button class="btn-icon btn-delete" onclick="deleteInvoice(${invoice.id})" title="Supprimer">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                            </svg>
                        </button>
                        ${invoice.document_type === 'devis' ? `
                        <button class="btn-icon" onclick="downloadAsOtherCompany(${invoice.id}, 'mry')" title="Télécharger comme autre société" style="background: linear-gradient(135deg, #FF9800, #9C27B0, #4CAF50); color: white;">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                                <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                            </svg>
                        </button>
                        ` : ''}
                    </div>
                </td>
            </tr>
        `;
    }).join('');

    // Update pagination controls
    updatePaginationControls(totalPages);
}

// Update pagination controls
function updatePaginationControls(totalPages) {
    const pagination = document.getElementById('pagination');
    const pageNumbers = document.getElementById('pageNumbers');
    const prevBtn = document.getElementById('prevPage');
    const nextBtn = document.getElementById('nextPage');

    if (!pagination || !pageNumbers) return;

    // Show/hide pagination
    if (totalPages <= 1 && itemsPerPage !== 'all') {
        pagination.style.display = 'none';
        return;
    }

    if (itemsPerPage === 'all') {
        pagination.style.display = 'none';
        return;
    }

    pagination.style.display = 'block';

    // Update prev/next buttons
    if (prevBtn) {
        prevBtn.disabled = currentPage === 1;
        prevBtn.style.opacity = currentPage === 1 ? '0.5' : '1';
        prevBtn.style.cursor = currentPage === 1 ? 'not-allowed' : 'pointer';
    }

    if (nextBtn) {
        nextBtn.disabled = currentPage === totalPages;
        nextBtn.style.opacity = currentPage === totalPages ? '0.5' : '1';
        nextBtn.style.cursor = currentPage === totalPages ? 'not-allowed' : 'pointer';
    }

    // Generate page numbers
    let pagesHTML = '';
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // First page
    if (startPage > 1) {
        pagesHTML += `<button onclick="goToPage(1)" style="padding: 0.5rem 0.75rem; background: #3e3e42; color: #ffffff; border: none; border-radius: 4px; cursor: pointer;">1</button>`;
        if (startPage > 2) {
            pagesHTML += `<span style="color: #cccccc; padding: 0 0.5rem;">...</span>`;
        }
    }

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
        const isActive = i === currentPage;
        pagesHTML += `<button onclick="goToPage(${i})" style="padding: 0.5rem 0.75rem; background: ${isActive ? '#2196f3' : '#3e3e42'}; color: #ffffff; border: none; border-radius: 4px; cursor: pointer; font-weight: ${isActive ? '600' : 'normal'};">${i}</button>`;
    }

    // Last page
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            pagesHTML += `<span style="color: #cccccc; padding: 0 0.5rem;">...</span>`;
        }
        pagesHTML += `<button onclick="goToPage(${totalPages})" style="padding: 0.5rem 0.75rem; background: #3e3e42; color: #ffffff; border: none; border-radius: 4px; cursor: pointer;">${totalPages}</button>`;
    }

    pageNumbers.innerHTML = pagesHTML;
}

// Change items per page
window.changeItemsPerPage = function () {
    const select = document.getElementById('itemsPerPage');
    itemsPerPage = select.value;
    currentPage = 1;
    displayInvoices(filteredInvoices);
}

// Go to specific page
window.goToPage = function (page) {
    currentPage = page;
    displayInvoices(filteredInvoices);
}

// Change page (prev/next)
window.changePaginationPage = function (direction) {
    if (direction === 'prev' && currentPage > 1) {
        currentPage--;
    } else if (direction === 'next') {
        const totalItems = filteredInvoices.length;
        const itemsPerPageNum = itemsPerPage === 'all' ? totalItems : parseInt(itemsPerPage);
        const totalPages = Math.ceil(totalItems / itemsPerPageNum);
        if (currentPage < totalPages) {
            currentPage++;
        }
    }
    displayInvoices(filteredInvoices);
}

// Populate filter dropdowns
function populateFilters() {
    // Get unique years from invoices
    const invoiceYears = [...new Set(allInvoices.map(inv => (window.safeParseDate||function(d){return new Date(d)})(inv.document_date).getFullYear()))];

    // Add current year and previous 2 years if not present
    const currentYear = new Date().getFullYear();
    const defaultYears = [currentYear, currentYear - 1, currentYear - 2];

    // Combine and remove duplicates
    const allYears = [...new Set([...invoiceYears, ...defaultYears])].sort((a, b) => b - a);

    const yearSelect = document.getElementById('filterYear');
    if (yearSelect) {
        yearSelect.innerHTML = '<option value="">Toutes</option>' +
            allYears.map(year => `<option value="${year}">${year}</option>`).join('');
    }

    // Populate clients
    const clients = [...new Set(allInvoices.map(inv => inv.client_nom))].sort();
    const clientSelect = document.getElementById('filterClient');
    if (clientSelect) {
        clientSelect.innerHTML = '<option value="">Tous</option>' +
            clients.map(client => `<option value="${client}">${client}</option>`).join('');
    }
}

// Reset filters
window.resetFilters = function () {
    document.getElementById('filterType').value = '';
    document.getElementById('filterYear').value = '';
    document.getElementById('filterMonth').value = '';
    document.getElementById('filterClient').value = '';
    document.getElementById('filterAttachments').value = 'all';
    document.getElementById('filterMethod').value = 'all';
    if (document.getElementById('filterDevisConversionMRY')) document.getElementById('filterDevisConversionMRY').value = 'all';
    if (document.getElementById('filterFeaturedMRY')) document.getElementById('filterFeaturedMRY').value = 'all';
    
    // Reset search type checkboxes
    const searchTypeChecks = [
        'searchTypeCheckNumeroMry', 'searchTypeCheckOrderMry', 'searchTypeCheckClientMry',
        'searchTypeCheckIceMry', 'searchTypeCheckProductMry', 'searchTypeCheckPriceMry',
        'searchTypeCheckTotalHtMry', 'searchTypeCheckTotalMry'
    ];
    searchTypeChecks.forEach(id => {
        const check = document.getElementById(id);
        if (check) {
            check.dataset.active = 'false';
            check.style.background = 'transparent';
            check.style.borderColor = '#555';
            check.textContent = '';
        }
    });
    const searchTypeText = document.getElementById('searchTypeSelectedTextMry');
    if (searchTypeText) searchTypeText.textContent = 'Tous les champs';
    const toggleAllText = document.getElementById('searchTypeToggleAllTextMry');
    if (toggleAllText) toggleAllText.textContent = 'Sélectionner tout';
    
    document.getElementById('searchInput').value = '';
    currentPage = 1;
    filterInvoices();
}

// Toggle Search Type dropdown for MRY
window.toggleSearchTypeDropdownMry = function() {
    const dropdown = document.getElementById('searchTypeDropdownMry');
    const display  = document.getElementById('searchTypeDropdownDisplayMry');
    const arrow    = document.getElementById('searchTypeDropdownArrowMry');
    if (!dropdown) return;
    const isOpen = dropdown.style.display !== 'none';
    dropdown.style.display = isOpen ? 'none' : 'block';
    if (display) {
        display.style.borderColor  = isOpen ? '#3e3e42' : '#4caf50';
        display.style.background   = isOpen ? '#252526' : '#2a2a2e';
    }
    if (arrow) arrow.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
}

document.addEventListener('click', function(e) {
    const wrapper = document.getElementById('searchTypeDropdownWrapperMry');
    const dropdown = document.getElementById('searchTypeDropdownMry');
    if (wrapper && dropdown && !wrapper.contains(e.target)) {
        dropdown.style.display = 'none';
        const display = document.getElementById('searchTypeDropdownDisplayMry');
        if (display) {
            display.style.borderColor = '#3e3e42';
            display.style.background = '#252526';
        }
        const arrow = document.getElementById('searchTypeDropdownArrowMry');
        if (arrow) arrow.style.transform = 'rotate(0deg)';
    }
});

window.toggleAllSearchTypesMry = function() {
    const map = {'numero': 'searchTypeCheckNumeroMry', 'order': 'searchTypeCheckOrderMry', 'client': 'searchTypeCheckClientMry', 'ice': 'searchTypeCheckIceMry', 'product': 'searchTypeCheckProductMry', 'price': 'searchTypeCheckPriceMry', 'total_ht': 'searchTypeCheckTotalHtMry', 'total': 'searchTypeCheckTotalMry'};
    const allSelected = Object.values(map).every(id => document.getElementById(id)?.dataset.active === 'true');
    const newState = !allSelected;
    Object.values(map).forEach(id => {
        const check = document.getElementById(id);
        if (check) {
            check.dataset.active = newState ? 'true' : 'false';
            check.style.background = newState ? '#4caf50' : 'transparent';
            check.style.borderColor = newState ? '#4caf50' : '#555';
            check.textContent = newState ? '\u2713' : '';
        }
    });
    const toggleAllText = document.getElementById('searchTypeToggleAllTextMry');
    if (toggleAllText) toggleAllText.textContent = newState ? 'Désélectionner tout' : 'Sélectionner tout';
    const textEl = document.getElementById('searchTypeSelectedTextMry');
    if (textEl) textEl.textContent = 'Tous les champs';
    filterInvoices();
};

window.toggleSearchTypeMry = function(type) {
    const map = {'numero': 'searchTypeCheckNumeroMry', 'order': 'searchTypeCheckOrderMry', 'client': 'searchTypeCheckClientMry', 'ice': 'searchTypeCheckIceMry', 'product': 'searchTypeCheckProductMry', 'price': 'searchTypeCheckPriceMry', 'total_ht': 'searchTypeCheckTotalHtMry', 'total': 'searchTypeCheckTotalMry'};
    const labels = {'numero': 'N° Document', 'order': 'N° Order', 'client': 'Client', 'ice': 'ICE', 'product': 'Produit', 'price': 'Prix', 'total_ht': 'Total H.T', 'total': 'Total TTC'};
    const checkId = map[type];
    if (!checkId) return;
    const check = document.getElementById(checkId);
    if (!check) return;
    const isActive = check.dataset.active === 'true';
    const nowActive = !isActive;
    check.dataset.active = nowActive ? 'true' : 'false';
    check.style.background = nowActive ? '#4caf50' : 'transparent';
    check.style.borderColor = nowActive ? '#4caf50' : '#555';
    check.textContent = nowActive ? '\u2713' : '';
    const activeTypes = Object.keys(map).filter(t => document.getElementById(map[t])?.dataset.active === 'true');
    const textEl = document.getElementById('searchTypeSelectedTextMry');
    if (textEl) {
        if (activeTypes.length === 0) textEl.textContent = 'Tous les champs';
        else if (activeTypes.length === 1) textEl.textContent = labels[activeTypes[0]];
        else if (activeTypes.length === 2) textEl.textContent = activeTypes.map(t => labels[t]).join(', ');
        else textEl.textContent = activeTypes.length + ' champs sélectionnés';
    }
    const allSelected = activeTypes.length === Object.keys(map).length;
    const toggleAllText = document.getElementById('searchTypeToggleAllTextMry');
    if (toggleAllText) toggleAllText.textContent = allSelected ? 'Désélectionner tout' : 'Sélectionner tout';
    filterInvoices();
};

// Filter invoices
window.filterInvoices = async function () {
    currentPage = 1; // Reset to first page when filtering
    const filterType = document.getElementById('filterType')?.value || 'all';
    const filterYear = document.getElementById('filterYear')?.value || 'all';
    const filterMonth = document.getElementById('filterMonth')?.value || 'all';
    const filterClient = document.getElementById('filterClient')?.value || '';
    const filterAttachments = document.getElementById('filterAttachments')?.value || 'all';
    const filterMethod = document.getElementById('filterMethod')?.value || 'all';
    const filterDevisConversion = document.getElementById('filterDevisConversionMRY')?.value || 'all';
    const arStatusFilterEl = document.getElementById('filterArStatusMRY');
    const arStatusFilter = arStatusFilterEl ? arStatusFilterEl.value : 'all';
    const filterStatus = document.getElementById('filterStatusMRY')?.value || 'all';
    const paymentStatusFilter = document.getElementById('filterPaymentStatus')?.value || '';
    const paymentMethodFilter = document.getElementById('filterPaymentMethod')?.value || '';
    const searchInput = document.getElementById('searchInput')?.value.toLowerCase() || '';

    // Show loading if search is active
    const loadingSpinner = document.getElementById('loadingSpinner');
    if (searchInput) {
        loadingSpinner.style.display = 'flex';
    }

    let filtered = allInvoices;

    // Filter by Status (Seen/Unseen/Modified)
    if (filterStatus === 'unseen') {
        filtered = filtered.filter(inv => {
            const isModified = inv.is_modified === true;
            return inv.validation_status === 'pending' && !isModified;
        });
    } else if (filterStatus === 'seen') {
        filtered = filtered.filter(inv => inv.validation_status !== 'pending');
    } else if (filterStatus === 'modified') {
        // Show invoices that have been modified (new is_modified flag)
        filtered = filtered.filter(inv => inv.is_modified === true);
    }

    // Filter by type
    if (filterType && filterType !== 'all') {
        filtered = filtered.filter(inv => inv.document_type === filterType);
    }

    // Filter by year
    if (filterYear && filterYear !== 'all') {
        filtered = filtered.filter(inv => {
            const year = (window.safeParseDate||function(d){return new Date(d)})(inv.document_date).getFullYear().toString();
            return year === filterYear;
        });
    }

    // Filter by month
    if (filterMonth && filterMonth !== 'all') {
        filtered = filtered.filter(inv => {
            const month = (window.safeParseDate||function(d){return new Date(d)})(inv.document_date).getMonth() + 1;
            const monthStr = month.toString().padStart(2, '0');
            return monthStr === filterMonth;
        });
    }

    // Filter by client
    if (filterClient && filterClient !== '' && filterClient !== 'all') {
        filtered = filtered.filter(inv => inv.client_nom === filterClient);
    }

    // Filter by attachments
    if (filterAttachments === 'with') {
        filtered = filtered.filter(inv => (inv.attachment_count || 0) > 0);
    } else if (filterAttachments === 'without') {
        filtered = filtered.filter(inv => (inv.attachment_count || 0) === 0);
    }

    // Filter by method
    if (filterMethod === 'normal') {
        filtered = filtered.filter(inv => !inv.creation_method || inv.creation_method === 'normal');
    } else if (filterMethod === 'converted') {
        filtered = filtered.filter(inv => inv.creation_method === 'converted');
    }

    // Devis Conversion filter
    if (filterDevisConversion !== 'all') {
        filtered = filtered.filter(inv => {
            if (inv.document_type !== 'devis') return false;
            if (filterDevisConversion === 'converted' && !inv.is_converted) return false;
            if (filterDevisConversion === 'not_converted' && inv.is_converted) return false;
            return true;
        });
    }

    // Filter by AR Status (exclude devis - they don't have AR status)
    if (arStatusFilter !== 'all') {
        console.log('🔍 [MRY] AR Filter active. Filter value:', JSON.stringify(arStatusFilter), 'Type:', typeof arStatusFilter);
        const beforeCount = filtered.length;
        filtered = filtered.filter(inv => {
            if (inv.document_type === 'devis') return false;
            
            // Normalize both values: treat null/undefined/empty string as empty
            const status = (inv.ar_status === null || inv.ar_status === undefined || inv.ar_status === '') ? '' : inv.ar_status;
            const filterVal = (arStatusFilter === null || arStatusFilter === undefined || arStatusFilter === '') ? '' : arStatusFilter;
            
            const match = status === filterVal;
            if (!match) {
                console.log(`  ❌ Invoice ${inv.id} (${inv.document_type}): ar_status=${JSON.stringify(inv.ar_status)} normalized=${JSON.stringify(status)} vs filter=${JSON.stringify(filterVal)}`);
            }
            return match;
        });
        console.log(`🔍 [MRY] AR Filter result: ${beforeCount} → ${filtered.length} invoices`);
    }

    // Featured filter
    const filterFeatured = document.getElementById('filterFeaturedMRY')?.value || 'all';
    if (filterFeatured === 'featured') {
        filtered = filtered.filter(inv => inv.is_featured === 1 || inv.is_featured === true);
    } else if (filterFeatured === 'not_featured') {
        filtered = filtered.filter(inv => !inv.is_featured || inv.is_featured === 0);
    }

    // Payment status filter
    if (paymentStatusFilter) {
        filtered = filtered.filter(inv => {
            if (inv.document_type !== 'facture') return false;
            return (inv.payment_status || 'en attente de paiement') === paymentStatusFilter;
        });
    }

    // Payment method filter
    if (paymentMethodFilter) {
        filtered = filtered.filter(inv => {
            if (inv.document_type !== 'facture') return false;
            return (inv.payment_method || '') === paymentMethodFilter;
        });
    }

    // Advanced search with multi-select checkboxes
    if (searchInput) {
        // Get selected search types from dropdown checkboxes
        const searchTypes = {
            numero: document.getElementById('searchTypeCheckNumeroMry')?.dataset.active === 'true',
            order: document.getElementById('searchTypeCheckOrderMry')?.dataset.active === 'true',
            client: document.getElementById('searchTypeCheckClientMry')?.dataset.active === 'true',
            ice: document.getElementById('searchTypeCheckIceMry')?.dataset.active === 'true',
            product: document.getElementById('searchTypeCheckProductMry')?.dataset.active === 'true',
            price: document.getElementById('searchTypeCheckPriceMry')?.dataset.active === 'true',
            total_ht: document.getElementById('searchTypeCheckTotalHtMry')?.dataset.active === 'true',
            total: document.getElementById('searchTypeCheckTotalMry')?.dataset.active === 'true'
        };

        const hasSearchTypes = Object.values(searchTypes).some(v => v);

        // Get all invoices with their products for product/price search
        const needProducts = !hasSearchTypes || searchTypes.product || searchTypes.price;
        const invoicesWithProducts = needProducts ? await Promise.all(
            filtered.map(async inv => {
                const result = await window.electron.db.getInvoiceById(inv.id);
                return result.success ? result.data : inv;
            })
        ) : filtered;

        filtered = invoicesWithProducts.filter(inv => {
            const numero = (inv.document_numero || inv.document_numero_devis || '').toLowerCase();
            const numeroOrder = (inv.document_numero_Order || '').toLowerCase();
            const client = inv.client_nom.toLowerCase();
            const ice = (inv.client_ice || '').toLowerCase();
            const totalTTC = (inv.total_ttc || 0).toString();
            const totalHT = (inv.total_ht || 0).toString();

            // Check for product match
            const hasProductMatch = (inv.products && inv.products.length > 0) ?
                inv.products.some(p => {
                    const designation = (p.designation || '').toLowerCase();
                    return designation.includes(searchInput);
                }) : false;

            // Check for price match
            const hasPriceMatch = (inv.products && inv.products.length > 0) ?
                inv.products.some(p => {
                    const price = (p.prix_unitaire_ht || 0).toString();
                    return price.includes(searchInput);
                }) : false;

            // If no search types selected, search in ALL fields
            if (!hasSearchTypes) {
                return numero.includes(searchInput) ||
                    numeroOrder.includes(searchInput) ||
                    client.includes(searchInput) ||
                    ice.includes(searchInput) ||
                    totalHT.includes(searchInput) ||
                    totalTTC.includes(searchInput) ||
                    hasProductMatch ||
                    hasPriceMatch;
            } else {
                // Search ONLY in selected fields (OR logic)
                let matchFound = false;

                if (searchTypes.numero && numero.includes(searchInput)) {
                    matchFound = true;
                }
                if (searchTypes.order && numeroOrder.includes(searchInput)) {
                    matchFound = true;
                }
                if (searchTypes.client && client.includes(searchInput)) {
                    matchFound = true;
                }
                if (searchTypes.ice && ice.includes(searchInput)) {
                    matchFound = true;
                }
                if (searchTypes.product && hasProductMatch) {
                    matchFound = true;
                }
                if (searchTypes.price && hasPriceMatch) {
                    matchFound = true;
                }
                if (searchTypes.total_ht && totalHT.includes(searchInput)) {
                    matchFound = true;
                }
                if (searchTypes.total && totalTTC.includes(searchInput)) {
                    matchFound = true;
                }

                return matchFound;
            }
        });
    }

    // Hide loading
    if (searchInput) {
        loadingSpinner.style.display = 'none';
    }

    filteredInvoices = filtered;
    displayInvoices(filtered);

    // Update result counter
    const resultsCounter = document.getElementById('resultsCounter');
    const resultCount = document.getElementById('resultCount');

    if (filterType || filterYear || filterMonth || filterClient || searchInput) {
        resultsCounter.style.display = 'block';
        resultCount.textContent = filtered.length;
    } else {
        resultsCounter.style.display = 'none';
    }

    console.log(`🔍 Filtered: ${filtered.length} / ${allInvoices.length} invoices`);
}

// Sort table by column
let currentSortColumnMry = null;
let currentSortDirectionMry = 'asc';

window.sortTableMry = function (column) {
    // Toggle sort direction if clicking same column
    if (currentSortColumnMry === column) {
        currentSortDirectionMry = currentSortDirectionMry === 'asc' ? 'desc' : 'asc';
    } else {
        currentSortColumnMry = column;
        currentSortDirectionMry = 'asc';
    }

    // Update sort icons
    ['numero', 'date', 'total_ht', 'total_ttc'].forEach(col => {
        const iconId = `sortIcon${col.charAt(0).toUpperCase() + col.slice(1).replace('_', '')}Mry`;
        const icon = document.getElementById(iconId);
        if (icon) {
            if (col === column) {
                icon.textContent = currentSortDirectionMry === 'asc' ? '↑' : '↓';
                icon.style.color = '#4caf50';
            } else {
                icon.textContent = '⇅';
                icon.style.color = '';
            }
        }
    });

    // Sort the filtered invoices
    const sorted = [...filteredInvoices].sort((a, b) => {
        let valueA, valueB;

        switch (column) {
            case 'numero':
                // Extract numeric part from document number
                const getNumero = (inv) => {
                    const numero = inv.document_numero || inv.document_numero_devis || '';
                    const match = numero.match(/\d+/);
                    return match ? parseInt(match[0]) : 0;
                };
                valueA = getNumero(a);
                valueB = getNumero(b);
                break;

            case 'date':
                valueA = (window.safeParseDate||function(d){return new Date(d)})(a.document_date || 0).getTime();
                valueB = (window.safeParseDate||function(d){return new Date(d)})(b.document_date || 0).getTime();
                break;

            case 'total_ht':
                valueA = parseFloat(a.total_ht || 0);
                valueB = parseFloat(b.total_ht || 0);
                break;

            case 'total_ttc':
                valueA = parseFloat(a.total_ttc || 0);
                valueB = parseFloat(b.total_ttc || 0);
                break;

            default:
                return 0;
        }

        if (currentSortDirectionMry === 'asc') {
            return valueA - valueB;
        } else {
            return valueB - valueA;
        }
    });

    // Update filtered invoices and display
    filteredInvoices = sorted;
    currentPage = 1; // Reset to first page
    displayInvoices(sorted);

    console.log(`📊 [MRY] Sorted by ${column} (${currentSortDirectionMry})`);
};

// Mark invoice as seen (validated)
window.markAsSeenMRY = async function (id) {
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    const isAdminViewer = currentUser.email === 'redouanerrebbahi99@gmail.com';
    if (!isAdminViewer) {
        window.notify.error('Erreur', 'Action réservée à l\'admin', 3000);
        return;
    }
    try {
        const result = await window.electron.db.validateInvoice(id, 'validated', currentUser.email || '');
        if (result.success) {
            window.notify.success('Succès', 'Facture marquée comme lue', 3000);

            // Close modal if open
            const modal = document.querySelector('.invoice-view-overlay');
            if (modal) modal.remove();

            // Reload list
            loadInvoices();

            // Update badges globally if needed (usually handled by reload or separate event)
            if (typeof updatePendingCounts === 'function') updatePendingCounts();
        } else {
            window.notify.error('Erreur', 'Impossible de marquer comme lue', 3000);
        }
    } catch (error) {
        console.error('Error marking as seen:', error);
        window.notify.error('Erreur', 'Erreur serveur', 3000);
    }
}

// View invoice details
window.viewInvoice = async function (id) {
    try {
        console.log('👁️ [VIEW] Opening invoice details for ID:', id);
        const currentUserForView = JSON.parse(localStorage.getItem('user') || '{}');
        const result = await window.electron.db.getInvoiceById(id, currentUserForView.email || '');

        if (!result.success || !result.data) {
            window.notify.error('Erreur', 'Facture introuvable', 3000);
            return;
        }

        const invoice = result.data;
        console.log('📎 [ATTACHMENTS DEBUG] Invoice data:', invoice);
        console.log('📎 [ATTACHMENTS DEBUG] Attachments array:', invoice.attachments);
        console.log('📎 [ATTACHMENTS DEBUG] Attachment count:', invoice.attachment_count);
        
        const date = (window.safeParseDate||function(d){return new Date(d)})(invoice.document_date).toLocaleDateString('fr-FR');
        const docNumber = invoice.document_numero || invoice.document_numero_devis || '-';
        const typeLabel = invoice.document_type === 'facture' ? 'Facture' : 'Devis';

        // Auto-validate if pending or modified - ONLY for Admin users
        const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
        const isAdminViewer = currentUser.email === 'redouanerrebbahi99@gmail.com';
        
        if (isAdminViewer && (invoice.validation_status === 'pending' || invoice.is_modified)) {
            console.log('📝 [AUTO-VALIDATE] Admin viewing - clearing highlights...');
            try {
                await window.electron.db.validateInvoice(id, 'validated', currentUser.email || '');
                console.log('✅ [AUTO-VALIDATE] Invoice validated & is_modified reset');
                invoice.validation_status = 'validated';
                invoice.is_modified = false;
                // Update local cache immediately
                const localInv = allInvoices.find(inv => inv.id === id);
                if (localInv) { localInv.validation_status = 'validated'; localInv.is_modified = false; }
                const filteredInv = filteredInvoices.find(inv => inv.id === id);
                if (filteredInv) { filteredInv.validation_status = 'validated'; filteredInv.is_modified = false; }
                displayInvoices(filteredInvoices);
                if (typeof updatePendingCounts === 'function') {
                    setTimeout(() => updatePendingCounts(), 500);
                }
            } catch (error) {
                console.error('❌ [AUTO-VALIDATE] Error:', error);
            }
        } else if (!isAdminViewer) {
            console.log('ℹ️ [AUTO-VALIDATE] Regular user viewing - keeping validation_status and is_modified unchanged');
        }

        console.log('👁️ [VIEW] Creating overlay and modal...');
        const overlay = document.createElement('div');
        overlay.className = 'invoice-view-overlay'; // Add class for easy selection
        overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.85);z-index:9999;display:flex;align-items:center;justify-content:center;padding:2rem;';

        const modal = document.createElement('div');
        modal.style.cssText = 'background:#2d2d30;border-radius:16px;max-width:900px;width:100%;max-height:90vh;overflow-y:auto;box-shadow:0 25px 50px rgba(0,0,0,0.5);';

        modal.innerHTML = `
            <div style="background:#1e1e1e;padding:1.5rem 2rem;border-radius:16px 16px 0 0;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #3e3e42;">
                <div style="display:flex;align-items:center;gap:1rem;">
                    <svg width="24" height="24" viewBox="0 0 16 16" fill="currentColor" style="color:#fff;">
                        <path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z"/>
                    </svg>
                    <h2 style="color:#fff;margin:0;font-size:1.3rem;font-weight:600;">Détails de la ${typeLabel} #${docNumber}</h2>
                </div>
                <div style="display:flex;align-items:center;gap:1rem;flex-wrap:wrap;">
                    ${isSuperUserMRY ? `
                    <button id="toggleFeaturedBtn${id}" onclick="toggleFeaturedInModalMRY(${id}, this)" style="padding:0.6rem 1.2rem;background:${invoice.is_featured ? '#ffa726' : '#666'};color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:0.9rem;font-weight:600;display:flex;align-items:center;gap:0.5rem;transition:all 0.2s;" onmouseover="this.style.opacity='0.9'" onmouseout="this.style.opacity='1'" data-featured="${invoice.is_featured ? '1' : '0'}">
                        <span style="font-size:1.1rem;">${invoice.is_featured ? '⭐' : '☆'}</span>
                        ${invoice.is_featured ? 'Retirer des importantes' : 'Marquer comme importante'}
                    </button>
                    ` : ''}
                    ${invoice.validation_status === 'pending' ? `
                    <button onclick="markAsSeenMRY(${id})" style="padding:0.6rem 1.2rem;background:#4caf50;color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:0.9rem;font-weight:600;display:flex;align-items:center;gap:0.5rem;transition:all 0.2s;box-shadow: 0 4px 6px rgba(0,0,0,0.2);" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                        </svg>
                        Marquer comme lu
                    </button>
                    ` : ''}
                    <button onclick="downloadInvoicePDF(${id})" style="padding:0.6rem 1.2rem;background:#2196F3;color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:0.9rem;font-weight:600;display:flex;align-items:center;gap:0.5rem;transition:all 0.2s;" onmouseover="this.style.background='#1976D2'" onmouseout="this.style.background='#2196F3'">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                        </svg>
                        Télécharger PDF
                    </button>
                    <button onclick="downloadBonDeTravauxPDF(${id})" style="padding:0.6rem 1.2rem;background:#E91E63;color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:0.9rem;font-weight:600;display:flex;align-items:center;gap:0.5rem;transition:all 0.2s;" onmouseover="this.style.background='#C2185B'" onmouseout="this.style.background='#E91E63'">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                        </svg>
                        Télécharger Bon de travaux
                    </button>
                    ${invoice.document_type === 'devis' ? `
                    <button onclick="downloadAsOtherCompany(${id}, 'mry')" style="padding:0.6rem 1.2rem;background:linear-gradient(135deg, #FF9800, #9C27B0, #4CAF50);color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:0.9rem;font-weight:600;display:flex;align-items:center;gap:0.5rem;transition:all 0.2s;" onmouseover="this.style.opacity='0.9'" onmouseout="this.style.opacity='1'">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                        </svg>
                        Télécharger comme autre société
                    </button>
                    ` : ''}
                    <button id="closeViewModal" onclick="console.log('🔴🔴🔴 [BUTTON] Close button X clicked directly from HTML!');" style="background:none;border:none;color:#999;cursor:pointer;font-size:1.5rem;padding:0;width:32px;height:32px;display:flex;align-items:center;justify-content:center;border-radius:4px;transition:all 0.2s;margin-left:auto;" onmouseover="this.style.background='#3e3e42';this.style.color='#fff'" onmouseout="this.style.background='none';this.style.color='#999'">×</button>
                </div>
            </div>
            
            <div style="padding:2rem;">
                <!-- Client Section -->
                <div style="margin-bottom:2rem;">
                    <h3 style="color:#fff;font-size:1.1rem;margin:0 0 1rem 0;font-weight:600;">Client</h3>
                    <div style="background:#1e1e1e;padding:1rem;border-radius:8px;">
                        <div style="margin-bottom:0.75rem;">
                            <span style="color:#999;font-size:0.9rem;">Nom:</span>
                            <div style="color:#fff;font-weight:500;margin-top:0.25rem;">${invoice.client_nom}</div>
                        </div>
                        <div>
                            <span style="color:#999;font-size:0.9rem;">ICE:</span>
                            <div style="color:#fff;font-weight:500;margin-top:0.25rem;">${invoice.client_ice}</div>
                        </div>
                        <div style="margin-top:0.75rem;">
                            <span style="color:#999;font-size:0.9rem;">IF:</span>
                            <div style="color:#fff;font-weight:500;margin-top:0.25rem;">${invoice.client_if || ''}</div>
                        </div>
                    </div>
                </div>

                ${invoice.document_type === 'facture' ? `
                <!-- Payment Section -->
                <div style="margin-bottom:2rem;">
                    <h3 style="color:#fff;font-size:1.1rem;margin:0 0 1rem 0;font-weight:600;">💳 Paiement</h3>
                    <div style="background:#1e1e1e;padding:1rem;border-radius:8px;">
                        <div style="margin-bottom:0.75rem;">
                            <span style="color:#999;font-size:0.9rem;">Statut:</span>
                            <div style="margin-top:0.25rem;">
                                <span style="padding:0.3rem 0.8rem;border-radius:20px;font-size:0.85rem;font-weight:600;${(invoice.payment_status === 'payé') ? 'background:#1b5e20;color:#4caf50;' : 'background:#e65100;color:#ff9800;'}">${(invoice.payment_status === 'payé') ? 'Payé' : 'En attente de paiement'}</span>
                            </div>
                        </div>
                        ${invoice.payment_status === 'payé' && invoice.payment_method ? `
                        <div>
                            <span style="color:#999;font-size:0.9rem;">Méthode:</span>
                            <div style="color:#fff;font-weight:500;margin-top:0.25rem;">${invoice.payment_method}</div>
                        </div>
                        ` : ''}
                        <div style="margin-top:0.75rem;">
                            <button onclick="showEditPaymentModalMRY(${invoice.id}, '${(invoice.payment_status || 'en attente de paiement').replace(/'/g, "\\'")}', '${(invoice.payment_method || '').replace(/'/g, "\\'")}')" style="padding:0.4rem 1rem;background:#1565c0;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:0.8rem;">Modifier le paiement</button>
                        </div>
                    </div>
                </div>
                ` : ''}
                
                <!-- Document Section -->
                <div style="margin-bottom:2rem;">
                    <h3 style="color:#fff;font-size:1.1rem;margin:0 0 1rem 0;font-weight:600;">Document</h3>
                    <div style="background:#1e1e1e;padding:1rem;border-radius:8px;">
                        <div style="margin-bottom:0.75rem;">
                            <span style="color:#999;font-size:0.9rem;">Type:</span>
                            <div style="color:#fff;font-weight:500;margin-top:0.25rem;">${typeLabel}</div>
                        </div>
                        <div style="margin-bottom:0.75rem;">
                            <span style="color:#999;font-size:0.9rem;">N°:</span>
                            <div style="color:#fff;font-weight:500;margin-top:0.25rem;">${docNumber}</div>
                        </div>
                        ${(invoice.document_numero_Order || invoice.document_numero_order) ? `
                        <div style="margin-bottom:0.75rem;">
                            <span style="color:#999;font-size:0.9rem;">N° Order:</span>
                            <div style="color:#fff;font-weight:500;margin-top:0.25rem;">${invoice.document_numero_Order || invoice.document_numero_order}</div>
                        </div>
                        ` : ''}
                        <div>
                            <span style="color:#999;font-size:0.9rem;">Date:</span>
                            <div style="color:#fff;font-weight:500;margin-top:0.25rem;">${date}</div>
                        </div>
                    </div>
                </div>
                
                <!-- Products Section -->
                <div style="margin-bottom:2rem;">
                    <h3 style="color:#fff;font-size:1.1rem;margin:0 0 1rem 0;font-weight:600;">Produits</h3>
                    <div style="background:#1e1e1e;border-radius:8px;overflow:hidden;">
                        <table style="width:100%;border-collapse:collapse;">
                            <thead>
                                <tr style="background:#252526;border-bottom:1px solid #3e3e42;">
                                    <th style="padding:0.75rem;text-align:left;color:#999;font-weight:500;font-size:0.85rem;">Désignation</th>
                                    <th style="padding:0.75rem;text-align:center;color:#999;font-weight:500;font-size:0.85rem;">Quantité</th>
                                    <th style="padding:0.75rem;text-align:right;color:#999;font-weight:500;font-size:0.85rem;">Prix unitaire HT</th>
                                    <th style="padding:0.75rem;text-align:right;color:#999;font-weight:500;font-size:0.85rem;">Total HT</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${invoice.products.map((p, idx) => {
            // Escape HTML to prevent rendering issues
            const designation = (p.designation || '').replace(/</g, '&lt;').replace(/>/g, '&gt;');

            return `
                                    <tr style="border-bottom:1px solid #3e3e42;">
                                        <td style="padding:0.75rem;color:#fff;word-break:break-word;max-width:400px;overflow-wrap:break-word;white-space:pre-wrap;">${designation}</td>
                                        <td style="padding:0.75rem;text-align:center;color:#fff;white-space:nowrap;">${p.quantite}</td>
                                        <td style="padding:0.75rem;text-align:right;color:#fff;white-space:nowrap;">${formatNumber(parseFloat(p.prix_unitaire_ht))} DH</td>
                                        <td style="padding:0.75rem;text-align:right;color:#fff;font-weight:500;white-space:nowrap;">${formatNumber(parseFloat(p.total_ht))} DH</td>
                                    </tr>
                                    `;
        }).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
                
                <!-- Totals Section -->
                <div style="margin-bottom:2rem;">
                    <h3 style="color:#fff;font-size:1.1rem;margin:0 0 1rem 0;font-weight:600;">Totaux</h3>
                    <div style="background:#1e1e1e;padding:1rem;border-radius:8px;">
                        <div style="display:flex;justify-content:space-between;margin-bottom:0.75rem;">
                            <span style="color:#999;">Total HT:</span>
                            <span style="color:#fff;font-weight:600;">${formatNumber(invoice.total_ht)} DH</span>
                        </div>
                        <div style="display:flex;justify-content:space-between;margin-bottom:0.75rem;">
                            <span style="color:#999;">TVA (${invoice.tva_rate}%):</span>
                            <span style="color:#fff;font-weight:600;">${formatNumber(invoice.montant_tva)} DH</span>
                        </div>
                        <div style="display:flex;justify-content:space-between;padding-top:0.75rem;border-top:1px solid #3e3e42;">
                            <span style="color:#fff;font-weight:600;">Total TTC:</span>
                            <span style="color:#4CAF50;font-weight:700;font-size:1.1rem;">${formatNumber(invoice.total_ttc)} DH</span>
                        </div>
                    </div>
                </div>
                
                <!-- Notes Section -->
                <div style="margin-bottom:2rem;" id="notesSectionMRY${id}">
                    <h3 style="color:#fff;font-size:1.1rem;margin:0 0 1rem 0;font-weight:600;">📝 Notes (PDF)</h3>
                    <div style="background:#1e1e1e;padding:1rem;border-radius:8px;">
                        <div style="color:#999;font-size:0.9rem;font-style:italic;">Chargement...</div>
                    </div>
                </div>

                <!-- Private Notes Section (Admin Only) -->
                ${isSuperUserMRY ? `
                <div style="margin-bottom:2rem;">
                    <h3 style="color:#ff9800;font-size:1.1rem;margin:0 0 1rem 0;font-weight:600;display:flex;align-items:center;gap:0.5rem;">
                        🔒 Notes privées (usage interne uniquement)
                    </h3>
                    <div style="background:#1e1e1e;padding:1rem;border-radius:8px;border:2px solid #ff9800;">
                        <div style="color:#fff;font-size:0.9rem;white-space:pre-wrap;">${invoice.private_notes || 'Aucune note privée'}</div>
                    </div>
                    <small style="color:#ff9800;font-size:0.85rem;display:block;margin-top:0.5rem;">
                        ⚠️ Ces notes sont privées et ne sont JAMAIS affichées dans le PDF généré.
                    </small>
                </div>
                ` : ''}
                
                <!-- Attachments Section -->
                <div style="margin-bottom:2rem;" id="attachmentsSectionMRY${id}">
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;">
                        <h3 style="color:#fff;font-size:1.1rem;margin:0;font-weight:600;">Pièces jointes (${invoice.attachments ? invoice.attachments.length : 0})</h3>
                        <button onclick="addNewAttachment(${id})" style="padding:0.5rem 1rem;background:#4CAF50;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:0.85rem;font-weight:600;display:flex;align-items:center;gap:0.5rem;transition:all 0.2s;" onmouseover="this.style.background='#45a049'" onmouseout="this.style.background='#4CAF50'">
                            ➕ Ajouter
                        </button>
                    </div>
                    ${invoice.attachments && invoice.attachments.length > 0 ? `
                        <div style="background:#1e1e1e;border-radius:8px;padding:1rem;">
                            ${invoice.attachments.map(a => `
                                <div style="display:flex;justify-content:space-between;align-items:center;padding:0.75rem;background:#252526;border-radius:6px;margin-bottom:0.5rem;">
                                    <div style="display:flex;align-items:center;gap:1rem;">
                                        <span style="font-size:1.5rem;">${a.file_type.includes('pdf') ? '📄' : '🖼️'}</span>
                                        <div>
                                            <div style="color:#fff;font-weight:500;">${a.filename}</div>
                                            <div style="color:#999;font-size:0.8rem;margin-top:0.25rem;">${new Date(a.uploaded_at).toLocaleDateString('fr-FR')}</div>
                                        </div>
                                    </div>
                                    <div style="display:flex;gap:0.5rem;">
                                        <button onclick="openAttachment(${a.id})" style="padding:0.4rem 0.8rem;background:#2196F3;color:#fff;border:none;border-radius:4px;cursor:pointer;font-size:0.8rem;">
                                            👁️ Ouvrir
                                        </button>
                                        <button onclick="deleteAttachment(${a.id}, ${id})" style="padding:0.4rem 0.8rem;background:#f44336;color:#fff;border:none;border-radius:4px;cursor:pointer;font-size:0.8rem;display:flex;align-items:center;gap:0.4rem;">
                                            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                            </svg>
                                            Supprimer
                                        </button>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    ` : '<p style="color:#999;text-align:center;padding:2rem;background:#1e1e1e;border-radius:8px;">Aucune pièce jointe</p>'}
                </div>
                
                <!-- Audit Log Section -->
                <div id="auditLogSectionMRY${id}">
                    <h3 style="color:#fff;font-size:1.1rem;margin:0 0 1rem 0;font-weight:600;">📋 Historique des modifications</h3>
                    <div style="background:#1e1e1e;border-radius:8px;padding:1rem;">
                        <div style="color:#999;font-size:0.9rem;font-style:italic;">Chargement de l'historique...</div>
                    </div>
                </div>
            </div>
        `;

        overlay.appendChild(modal);
        document.body.appendChild(overlay);
        console.log('👁️ [VIEW] Overlay added to DOM');

        const closeBtn = document.getElementById('closeViewModal');
        console.log('👁️ [VIEW] Close button found:', closeBtn ? 'Yes' : 'No');

        // Helper: update local data and re-render after viewing invoice
        const _refreshAfterView = () => {
            const localInv = allInvoices.find(inv => inv.id === id);
            if (localInv) {
                localInv.validation_status = 'validated';
                localInv.is_modified = false;
            }
            const filteredInv = filteredInvoices.find(inv => inv.id === id);
            if (filteredInv) {
                filteredInv.validation_status = 'validated';
                filteredInv.is_modified = false;
            }
            displayInvoices(filteredInvoices);
            if (typeof updatePendingCounts === 'function') {
                setTimeout(() => updatePendingCounts(), 300);
            }
        };

        if (closeBtn) {
            closeBtn.onclick = () => {
                console.log('🔴🔴🔴 [CLOSE] Close button clicked from JavaScript event listener!');
                console.log('🔴 [CLOSE] Overlay exists:', overlay ? 'Yes' : 'No');
                console.log('🔴 [CLOSE] Overlay parent:', overlay.parentElement ? 'Yes' : 'No');
                overlay.remove();
                _refreshAfterView();
                console.log('🔴 [CLOSE] Overlay removed');
            };
        } else {
            console.error('❌ [VIEW] Close button not found!');
        }
        overlay.onclick = (e) => {
            if (e.target === overlay) {
                console.log('🔴 [CLOSE] Overlay clicked');
                overlay.remove();
                _refreshAfterView();
            }
        };

        // Load notes asynchronously
        console.log('📝 [NOTES VIEW MRY] Loading notes for invoice:', id);
        const noteResult = await window.electron.db.getNote(id);
        console.log('📥 [NOTES VIEW MRY] Note result:', noteResult);
        const notesSection = document.getElementById(`notesSectionMRY${id}`);
        if (notesSection) {
            const notesContent = notesSection.querySelector('div > div');
            if (noteResult.success && noteResult.data) {
                console.log('✅ [NOTES VIEW MRY] Displaying note:', noteResult.data);
                notesContent.style.color = '#fff';
                notesContent.style.fontStyle = 'normal';
                notesContent.style.whiteSpace = 'pre-wrap';
                notesContent.textContent = noteResult.data;
            } else {
                console.log('ℹ️ [NOTES VIEW MRY] No note found');
                notesContent.textContent = 'Aucune note';
            }
        }

        // Load audit log asynchronously
        console.log('📋 [AUDIT LOG MRY] Loading audit log for invoice:', id);
        const auditLogSection = document.getElementById(`auditLogSectionMRY${id}`);
        if (auditLogSection) {
            const auditLogContent = auditLogSection.querySelector('div');
            try {
                if (!window.electron.db.getAuditLog) {
                    throw new Error('getAuditLog function not available');
                }

                const auditResult = await window.electron.db.getAuditLog(id);
                console.log('📥 [AUDIT LOG MRY] Audit log result:', auditResult);

                if (auditResult.success) {
                    const logs = auditResult.data || [];

                    let auditHTML = '<div style="display: flex; flex-direction: column; gap: 12px; max-height: 400px; overflow-y: auto; padding-right: 5px;">';

                    // 1. ADD CREATION BLOCK (always first)
                    const creationDate = (window.safeParseDate||function(d){return new Date(d)})(invoice.created_at || invoice.document_date).toLocaleDateString('fr-FR', {
                        day: '2-digit', month: '2-digit', year: 'numeric',
                        hour: '2-digit', minute: '2-digit'
                    });

                    auditHTML += `
                        <div style="background: rgba(76, 175, 80, 0.1); border-left: 4px solid #4CAF50; border-radius: 6px; padding: 12px; border: 1px solid rgba(76, 175, 80, 0.2); border-left-width: 4px;">
                            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 4px;">
                                <span style="background: #4CAF50; color: white; padding: 2px 8px; border-radius: 4px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase;">Création</span>
                                <span style="color: #999; font-size: 0.8rem; font-family: monospace;">${creationDate}</span>
                            </div>
                            <div style="color: #fff; font-size: 0.95rem; font-weight: 500;">👤 ${invoice.created_by_user_name || 'Système'}</div>
                            ${invoice.created_by_user_email ? `<div style="color: #999; font-size: 0.8rem; margin-top: 2px;">✉️ ${invoice.created_by_user_email}</div>` : ''}
                        </div>
                    `;

                    // 2. ADD DELIVERY BLOCK (if exists)
                    if (invoice.delivered_by) {
                        auditHTML += `
                            <div style="background: rgba(33, 150, 243, 0.1); border-left: 4px solid #2196F3; border-radius: 6px; padding: 12px; border: 1px solid rgba(33, 150, 243, 0.2); border-left-width: 4px;">
                                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 4px;">
                                    <span style="background: #2196F3; color: white; padding: 2px 8px; border-radius: 4px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase;">Livraison</span>
                                    <span style="color: #999; font-size: 0.8rem; font-family: monospace;">-</span>
                                </div>
                                <div style="color: #fff; font-size: 0.95rem; font-weight: 500;">🚚 Livré par: <strong>${invoice.delivered_by}</strong></div>
                            </div>
                        `;
                    }

                    // 3. ADD MODIFICATION LOGS
                    logs.forEach(log => {
                        if (log.action === 'CREATE') return; // Skip creation as we handled it separately

                        const logDate = (window.safeParseDate||function(d){return new Date(d)})(log.created_at).toLocaleDateString('fr-FR', {
                            day: '2-digit', month: '2-digit', year: 'numeric',
                            hour: '2-digit', minute: '2-digit'
                        });

                        const actionColor = log.action === 'UPDATE' ? '#FF9800' : '#f44336';
                        const actionLabel = log.action === 'UPDATE' ? 'Modification' : log.action;

                        auditHTML += `
                            <div style="background: rgba(255, 152, 0, 0.05); border-left: 4px solid ${actionColor}; border-radius: 6px; padding: 12px; border: 1px solid rgba(255, 152, 0, 0.1); border-left-width: 4px;">
                                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 4px;">
                                    <span style="background: ${actionColor}; color: white; padding: 2px 8px; border-radius: 4px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase;">${actionLabel}</span>
                                    <span style="color: #999; font-size: 0.8rem; font-family: monospace;">${logDate}</span>
                                </div>
                                <div style="color: #fff; font-size: 0.95rem; font-weight: 500;">👤 ${log.user_name}</div>
                                ${log.user_email ? `<div style="color: #999; font-size: 0.8rem; margin-top: 2px;">✉️ ${log.user_email}</div>` : ''}
                            </div>
                        `;
                    });

                    auditHTML += '</div>';
                    auditLogContent.innerHTML = auditHTML;
                } else {
                    throw new Error(auditResult.error || 'Erreur inconnue');
                }
            } catch (error) {
                console.error('❌ [AUDIT LOG MRY] Error loading audit log:', error);
                auditLogSection.querySelector('div').innerHTML = `
                    <div style="background: rgba(244, 67, 54, 0.1); border-radius: 8px; padding: 1rem; border: 1px solid rgba(244, 67, 54, 0.2); color: #f44336; text-align: center;">
                        ⚠️ Erreur lors du chargement de l'historique
                    </div>
                `;
            }
        }

    } catch (error) {
        console.error('Error viewing invoice:', error);
        window.notify.error('Erreur', 'Impossible de charger les détails', 3000);
    }
}

// Edit invoice - Navigate to separate page
window.editInvoice = async function (id) {
    console.log('✏️ [EDIT] Opening edit page for invoice ID:', id);
    // Clear highlights immediately (validate + reset is_modified)
    try {
        const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
        const isAdminViewer = currentUser.email === 'redouanerrebbahi99@gmail.com';
        if (isAdminViewer) {
            await window.electron.db.validateInvoice(id, 'validated', currentUser.email || '');
            const localInv = allInvoices.find(inv => inv.id === id);
            if (localInv) { localInv.validation_status = 'validated'; localInv.is_modified = false; }
            const filteredInv = filteredInvoices.find(inv => inv.id === id);
            if (filteredInv) { filteredInv.validation_status = 'validated'; filteredInv.is_modified = false; }
            displayInvoices(filteredInvoices);
            if (typeof updatePendingCounts === 'function') setTimeout(() => updatePendingCounts(), 300);
        }
    } catch (e) { console.error('❌ [EDIT] Error clearing highlights:', e); }
    localStorage.setItem('editInvoiceIdMRY', id);
    router.navigate('/edit-invoice-mry');
}

// Handle arrow key navigation in edit modal products (Global)
window.handleArrowNavigationEdit = function (event, currentCellIndex) {
    // Only handle arrow keys
    if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
        return;
    }

    const currentRow = event.target.closest('.edit-product-row');
    const container = document.getElementById('editProductsList');
    const allRows = Array.from(container.querySelectorAll('.edit-product-row'));
    const currentRowIndex = allRows.indexOf(currentRow);

    let targetRow = null;
    let targetCellIndex = currentCellIndex;

    // Handle arrow keys
    if (event.key === 'ArrowUp') {
        // Move to row above
        if (currentRowIndex > 0) {
            targetRow = allRows[currentRowIndex - 1];
            event.preventDefault();
        }
    } else if (event.key === 'ArrowDown') {
        // Move to row below
        if (currentRowIndex < allRows.length - 1) {
            targetRow = allRows[currentRowIndex + 1];
            event.preventDefault();
        } else {
            // If on last row, add new row and move to it
            addEditProductRow();
            setTimeout(() => {
                const newRows = Array.from(container.querySelectorAll('.edit-product-row'));
                targetRow = newRows[newRows.length - 1];
                focusCellEdit(targetRow, targetCellIndex);
            }, 50);
            event.preventDefault();
            return;
        }
    } else if (event.key === 'ArrowLeft') {
        // Move to cell on the left
        if (currentCellIndex > 0) {
            targetRow = currentRow;
            targetCellIndex = currentCellIndex - 1;
            event.preventDefault();
        }
    } else if (event.key === 'ArrowRight') {
        // Move to cell on the right
        if (currentCellIndex < 2) { // 0=designation, 1=quantity, 2=price
            targetRow = currentRow;
            targetCellIndex = currentCellIndex + 1;
            event.preventDefault();
        }
    }

    // Focus the target cell
    if (targetRow) {
        focusCellEdit(targetRow, targetCellIndex);
    }
};

// Helper function to focus a specific cell in edit modal
function focusCellEdit(row, cellIndex) {
    const inputs = row.querySelectorAll('textarea, input[type="text"], input[type="number"]');
    if (inputs[cellIndex]) {
        inputs[cellIndex].focus();
        // For text inputs, move cursor to end
        if (inputs[cellIndex].type === 'text' || inputs[cellIndex].tagName === 'TEXTAREA') {
            const length = inputs[cellIndex].value.length;
            inputs[cellIndex].setSelectionRange(length, length);
        } else if (inputs[cellIndex].type === 'number') {
            inputs[cellIndex].select();
        }
    }
}

// Add product row in edit modal
window.addEditProductRow = function () {
    const container = document.getElementById('editProductsList');
    const row = document.createElement('div');
    row.className = 'edit-product-row';
    row.innerHTML = `
        <textarea placeholder="Désignation" rows="2" onkeydown="handleArrowNavigationEdit(event, 0)"></textarea>
        <input type="text" placeholder="Quantité" onchange="recalculateEditTotals()" onkeydown="handleArrowNavigationEdit(event, 1)">
        <input type="number" step="0.01" placeholder="Prix HT" value="0" onchange="recalculateEditTotals()" onkeydown="handleArrowNavigationEdit(event, 2)">
        <button type="button" onclick="this.closest('.edit-product-row').remove(); recalculateEditTotals()">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
            </svg>
        </button>
    `;
    container.appendChild(row);
}

// Recalculate totals in edit modal
window.recalculateEditTotals = function () {
    const rows = document.querySelectorAll('.edit-product-row');
    let totalHT = 0;

    rows.forEach(row => {
        const qty = parseFloat(row.querySelector('input[type="text"]').value) || 1;
        const price = parseFloat(row.querySelector('input[type="number"]').value) || 0;
        totalHT += qty * price;
    });

    const tvaRate = parseFloat(document.getElementById('editTvaRate').value) || 0;
    const montantTVA = totalHT * (tvaRate / 100);
    const totalTTC = totalHT + montantTVA;

    // Use simple format without spaces in edit modal
    document.getElementById('editTotalHT').textContent = totalHT.toFixed(2) + ' DH';
    document.getElementById('editMontantTVA').textContent = montantTVA.toFixed(2) + ' DH';
    document.getElementById('editTotalTTC').textContent = totalTTC.toFixed(2) + ' DH';
}

// Check if document number is unique (for edit)
async function checkEditDocumentNumberUnique(invoiceId, currentInvoice, newNumero, newNumeroOrder) {
    try {
        console.log('🔍 [CHECK] Starting uniqueness check:', {
            invoiceId,
            documentType: currentInvoice.document_type,
            newNumero,
            currentNumero: currentInvoice.document_numero,
            currentNumeroDevis: currentInvoice.document_numero_devis
        });

        const result = await window.electron.db.getAllInvoices('MRY');
        if (!result.success) return true;

        const invoices = result.data.filter(inv => inv.id !== invoiceId); // Exclude current invoice
        console.log('🔍 [CHECK] Checking against', invoices.length, 'other invoices');

        // Check based on document type
        if (currentInvoice.document_type === 'facture') {
            // Check N° Facture
            if (newNumero && newNumero !== currentInvoice.document_numero) {
                console.log('🔍 [CHECK] Checking facture numero:', newNumero);
                const duplicateFacture = invoices.find(inv =>
                    inv.document_type === 'facture' && inv.document_numero === newNumero
                );
                if (duplicateFacture) {
                    console.log('❌ [CHECK] Duplicate facture found:', duplicateFacture.id);
                    window.notify.error(
                        'Numéro de facture déjà utilisé',
                        `Le N° Facture "${newNumero}" existe déjà. Veuillez utiliser un autre numéro.`,
                        5000
                    );
                    return false;
                }
            } else {
                console.log('✅ [CHECK] Facture numero unchanged, skipping check');
            }

            // Check N° Order if provided (only in factures)
            if (newNumeroOrder && newNumeroOrder.trim() !== '') {
                // Normalize current value (null or empty string to null)
                const currentOrder = currentInvoice.document_numero_Order?.trim() || null;
                const newOrder = newNumeroOrder.trim();

                // Only check if the value actually changed
                if (newOrder !== currentOrder) {
                    const duplicateOrder = invoices.find(inv =>
                        inv.document_type === 'facture' &&
                        inv.document_numero_Order &&
                        inv.document_numero_Order.trim() === newOrder
                    );
                    if (duplicateOrder) {
                        window.notify.error(
                            'Numéro de commande déjà utilisé',
                            `Le N° Order "${newNumeroOrder}" existe déjà. Veuillez utiliser un autre numéro.`,
                            5000
                        );
                        return false;
                    }
                }
            }
        } else if (currentInvoice.document_type === 'devis') {
            // Check N° Devis
            if (newNumero && newNumero !== currentInvoice.document_numero_devis) {
                console.log('🔍 [CHECK] Checking devis numero:', newNumero, 'vs current:', currentInvoice.document_numero_devis);
                const duplicateDevis = invoices.find(inv =>
                    inv.document_type === 'devis' && inv.document_numero_devis === newNumero
                );
                if (duplicateDevis) {
                    console.log('❌ [CHECK] Duplicate devis found:', duplicateDevis.id);
                    window.notify.error(
                        'Numéro de devis déjà utilisé',
                        `Le N° Devis "${newNumero}" existe déjà. Veuillez utiliser un autre numéro.`,
                        5000
                    );
                    return false;
                }
                console.log('✅ [CHECK] No duplicate devis found');
            } else {
                console.log('✅ [CHECK] Devis numero unchanged, skipping check');
            }
        }

        console.log('✅ [CHECK] All checks passed, update allowed');
        return true;
    } catch (error) {
        console.error('Error checking document number:', error);
        return true; // Allow if check fails
    }
}

// Handle edit form submit
async function handleEditSubmit(e, invoiceId) {
    e.preventDefault();

    try {
        // Get current invoice data for comparison
        const currentInvoice = allInvoices.find(inv => inv.id === invoiceId);
        if (!currentInvoice) {
            throw new Error('Invoice not found');
        }

        // Collect data
        const products = [];
        document.querySelectorAll('.edit-product-row').forEach(row => {
            const designation = row.querySelector('textarea').value;
            const quantiteOriginal = row.querySelector('input[type="text"]').value;
            const prix = parseFloat(row.querySelector('input[type="number"]').value) || 0;

            if (designation || quantiteOriginal || prix) {
                // For calculation: convert F to 1
                let quantiteForCalc = quantiteOriginal;
                if (quantiteForCalc.toUpperCase() === 'F') {
                    quantiteForCalc = '1';
                }

                const qty = parseFloat(quantiteForCalc) || 1;
                products.push({
                    designation,
                    quantite: quantiteOriginal,  // Save original value (F, 10 Kg, etc.)
                    prix_unitaire_ht: prix,
                    total_ht: qty * prix
                });
            }
        });

        const newNumero = document.getElementById('editNumero').value;
        const newNumeroOrder = document.getElementById('editNumeroOrder')?.value || null;

        console.log('🔍 [UPDATE] Values from form:', {
            newNumero,
            newNumeroOrder,
            currentType: currentInvoice.document_type
        });

        // Check uniqueness before proceeding
        console.log('🔍 [UPDATE] Checking uniqueness...');
        const isUnique = await checkEditDocumentNumberUnique(
            invoiceId,
            currentInvoice,
            newNumero,
            newNumeroOrder
        );

        console.log('🔍 [UPDATE] Uniqueness check result:', isUnique);

        if (!isUnique) {
            console.log('❌ [UPDATE] Update blocked - duplicate number detected');
            return;
        }

        // Prepare document data based on type
        const documentData = {
            date: document.getElementById('editDate').value
        };

        // Set the correct numero field based on document type
        if (currentInvoice.document_type === 'facture') {
            documentData.numero = newNumero;
            documentData.numero_Order = newNumeroOrder;
            documentData.numero_devis = null;  // Clear devis numero for facture
        } else {
            documentData.numero_devis = newNumero;
            documentData.numero = null;  // Clear facture numero for devis
            documentData.numero_Order = null;
        }

        console.log('📝 [UPDATE] Document data prepared:', documentData);

        const updateData = {
            client: {
                nom: document.getElementById('editClientNom').value,
                ICE: document.getElementById('editClientICE').value,
                IF: document.getElementById('editClientIF')?.value || ''
            },
            document: documentData,
            products,
            totals: {
                total_ht: parseFloat(document.getElementById('editTotalHT').textContent.replace(' DH', '')),
                tva_rate: parseFloat(document.getElementById('editTvaRate').value),
                montant_tva: parseFloat(document.getElementById('editMontantTVA').textContent.replace(' DH', '')),
                total_ttc: parseFloat(document.getElementById('editTotalTTC').textContent.replace(' DH', ''))
            }
        };

        console.log('📝 Updating invoice:', invoiceId);
        console.log('📊 Update data:', updateData);

        // Update in database
        const result = await window.electron.db.updateInvoice(invoiceId, updateData);

        console.log('📥 Update result:', result);

        if (result.success) {
            console.log('✅ [UPDATE] Invoice updated successfully in database');

            // Save or delete notes
            const noteText = document.getElementById('editNotesMRY')?.value?.trim();
            console.log('📝 [NOTES MRY] Saving note for invoice:', invoiceId, 'Text:', noteText);
            if (noteText) {
                const noteResult = await window.electron.db.saveNote(invoiceId, noteText);
                console.log('✅ [NOTES MRY] Save result:', noteResult);
            } else {
                // Delete note if textarea is empty
                const deleteResult = await window.electron.db.deleteNote(invoiceId);
                console.log('🗑️ [NOTES MRY] Delete result:', deleteResult);
            }

            // Add audit log entry for the update
            const user = JSON.parse(localStorage.getItem('user'));
            if (user && window.electron.db.addAuditLog) {
                try {
                    const changes = {
                        client: updateData.client,
                        document: updateData.document,
                        totals: updateData.totals
                    };
                    await window.electron.db.addAuditLog(
                        invoiceId,
                        'UPDATE',
                        user.id,
                        user.name,
                        user.email,
                        JSON.stringify(changes)
                    );
                    console.log('✅ [AUDIT LOG MRY] Audit log entry added');
                } catch (auditError) {
                    console.error('❌ [AUDIT LOG MRY] Error adding audit log:', auditError);
                }
            }

            window.notify.success('Succès', 'Facture mise à jour avec succès!', 3000);

            // Close modal
            document.querySelector('.modal-overlay').remove();

            // Reload list immediately to ensure fresh data
            console.log('🔄 [UPDATE] Reloading invoice list...');
            await loadInvoices();
            console.log('✅ [UPDATE] Invoice list reloaded successfully');
        } else {
            console.error('❌ [UPDATE] Update failed:', result.error);
            throw new Error(result.error || 'Échec de la mise à jour');
        }

    } catch (error) {
        console.error('Error updating invoice:', error);
        window.notify.error('Erreur', 'Impossible de mettre à jour', 3000);
    }
}

// Show input modal for conversion - INLINE EDIT VERSION
function showConvertInputModal(newType, newTypeLabel, prefillNumero = '') {
    return new Promise(async (resolve) => {
        // Close edit modal temporarily
        const editModal = document.querySelector('.modal-overlay');
        const wasVisible = editModal && editModal.style.display !== 'none';
        if (editModal) {
            editModal.style.display = 'none';
        }

        // Get highest number for the target type
        let highestNumber = 'Aucun';
        try {
            const allInvoicesResult = await window.electron.db.getAllInvoices('MRY');
            if (allInvoicesResult.success) {
                const invoices = allInvoicesResult.data;
                const currentYear = new Date().getFullYear();
                let maxNum = 0;

                if (newType === 'facture') {
                    // Find highest facture number for current year
                    invoices.forEach(inv => {
                        if (inv.document_type === 'facture' && inv.document_numero) {
                            // Check if document belongs to current year
                            if (inv.document_numero.endsWith('/' + currentYear) || inv.document_numero.endsWith(currentYear.toString())) {
                                const numPart = parseInt(inv.document_numero.split('/')[0]) || 0;
                                if (numPart > maxNum) maxNum = numPart;
                            }
                        }
                    });
                } else if (newType === 'devis') {
                    // Find highest devis number for current year
                    invoices.forEach(inv => {
                        if (inv.document_type === 'devis' && inv.document_numero_devis) {
                            // Check if document belongs to current year
                            if (inv.document_numero_devis.endsWith('/' + currentYear) || inv.document_numero_devis.endsWith(currentYear.toString())) {
                                const numPart = parseInt(inv.document_numero_devis.split('/')[0]) || 0;
                                if (numPart > maxNum) maxNum = numPart;
                            }
                        }
                    });
                }

                if (maxNum > 0) {
                    highestNumber = maxNum;
                }
            }
        } catch (error) {
            console.log('Error getting highest number:', error);
        }

        // Create floating input box
        const overlay = document.createElement('div');
        overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.95);z-index:999999;display:flex;align-items:center;justify-content:center;animation:fadeIn 0.2s;';

        const container = document.createElement('div');
        container.style.cssText = 'background:#1e1e1e;border:3px solid #2196f3;border-radius:16px;padding:2.5rem;min-width:500px;box-shadow:0 20px 60px rgba(0,0,0,0.9);animation:slideIn 0.3s;';

        container.innerHTML = `
            <style>
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                @keyframes slideIn { from { transform: translateY(-30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
            </style>
            <div style="text-align:center;margin-bottom:2rem;">
                <div style="font-size:3rem;margin-bottom:0.5rem;">🔄</div>
                <h2 style="color:#fff;margin:0;font-size:1.5rem;font-weight:600;">Convertir en ${newTypeLabel}</h2>
            </div>
            
            <div style="margin-bottom:2rem;">
                <label style="display:block;color:#2196F3;margin-bottom:0.75rem;font-weight:600;font-size:1.1rem;">${newType === 'facture' ? 'N° Facture' : 'N° Devis'}</label>
                <input type="text" id="convertInput1" placeholder="Exemple: 548" value="${prefillNumero}"
                       style="width:100%;padding:1rem;background:#2d2d30;border:2px solid #3e3e42;border-radius:8px;color:#fff;font-size:1.1rem;box-sizing:border-box;outline:none;transition:all 0.3s;"
                       onfocus="this.style.borderColor='#2196F3';this.style.background='#1e1e1e';"
                       onblur="this.style.borderColor='#3e3e42';this.style.background='#2d2d30'">
                <small style="color: #999; font-size: 0.85rem; display: block; margin-top: 0.5rem;">Ex: 123 → 123/2025</small>
                ${highestNumber !== 'Aucun' ? `<small style="color: #2196F3; font-size: 0.8rem; display: block; margin-top: 0.25rem;">📌 Plus grand numéro: ${highestNumber}</small>` : ''}
            </div>
            
            ${newType === 'facture' ? `
            <div style="margin-bottom:2rem;">
                <label style="display:block;color:#9e9e9e;margin-bottom:0.75rem;font-weight:500;font-size:1rem;">N° Order (optionnel)</label>
                <input type="text" id="convertInput2" placeholder="Exemple: 555"
                       style="width:100%;padding:1rem;background:#2d2d30;border:2px solid #3e3e42;border-radius:8px;color:#fff;font-size:1.1rem;box-sizing:border-box;outline:none;transition:all 0.3s;"
                       onfocus="this.style.borderColor='#2196f3';this.style.background='#1e1e1e';"
                       onblur="this.style.borderColor='#3e3e42';this.style.background='#2d2d30';">
            </div>
            ` : ''}
            
            <div style="display:flex;gap:1rem;margin-top:2rem;">
                <button id="convertBtnCancel" style="flex:1;padding:1rem;background:#3e3e42;color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:1.1rem;font-weight:600;transition:all 0.3s;"
                        onmouseover="this.style.background='#4e4e52';" onmouseout="this.style.background='#3e3e42';">
                    Annuler
                </button>
                <button id="convertBtnConfirm" style="flex:1;padding:1rem;background:#2196f3;color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:1.1rem;font-weight:600;transition:all 0.3s;"
                        onmouseover="this.style.background='#1976d2';" onmouseout="this.style.background='#2196f3';">
                    ✓ Confirmer
                </button>
            </div>
        `;

        overlay.appendChild(container);
        document.body.appendChild(overlay);

        const input1 = document.getElementById('convertInput1');
        const input2 = document.getElementById('convertInput2');
        const btnConfirm = document.getElementById('convertBtnConfirm');
        const btnCancel = document.getElementById('convertBtnCancel');

        // Multiple focus attempts
        const doFocus = () => {
            if (input1) {
                input1.focus();
                input1.select();
            }
        };

        setTimeout(doFocus, 10);
        setTimeout(doFocus, 100);
        setTimeout(doFocus, 300);

        const cleanup = () => {
            overlay.remove();
            if (editModal && wasVisible) {
                editModal.style.display = '';
            }
        };

        const handleConfirm = () => {
            let val1 = input1.value.trim();
            let val2 = input2 ? input2.value.trim() : '';

            // Auto-add year if not present (ONLY for document number, not for N° Order)
            const currentYear = new Date().getFullYear();
            if (val1 && !val1.includes('/')) {
                val1 = val1 + '/' + currentYear;
            }
            // N° Order should NOT have year added - keep it as simple number
            // val2 remains unchanged

            // Check if empty or only slash
            if (!val1 || val1.startsWith('/')) {
                input1.style.borderColor = '#f44336';
                input1.style.background = '#3d1f1f';
                input1.focus();
                window.notify.warning('Attention', 'Veuillez entrer un numéro', 3000);
                return;
            }

            cleanup();
            resolve({
                newNumero: val1,
                newNumeroOrder: val2 || null
            });
        };

        const handleCancel = () => {
            cleanup();
            resolve(null);
        };

        btnConfirm.onclick = handleConfirm;
        btnCancel.onclick = handleCancel;

        input1.onkeydown = (e) => {
            if (e.key === 'Enter') handleConfirm();
            if (e.key === 'Escape') handleCancel();
        };

        if (input2) {
            input2.onkeydown = (e) => {
                if (e.key === 'Enter') handleConfirm();
                if (e.key === 'Escape') handleCancel();
            };
        }
    });
}

// Custom confirm dialog
function showConfirmDialog(message) {
    return new Promise((resolve) => {
        const overlay = document.createElement('div');
        overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.9);z-index:999998;display:flex;align-items:center;justify-content:center;';

        const box = document.createElement('div');
        box.style.cssText = 'background:#2d2d30;border:2px solid #ff9800;border-radius:12px;padding:2rem;max-width:450px;box-shadow:0 20px 60px rgba(0,0,0,0.9);';

        box.innerHTML = `
            <div style="text-align:center;margin-bottom:1.5rem;">
                <div style="font-size:3rem;margin-bottom:0.5rem;">⚠️</div>
                <p style="color:#fff;margin:0;font-size:1.1rem;line-height:1.6;">${message}</p>
            </div>
            <div style="display:flex;gap:1rem;">
                <button id="confirmNo" style="flex:1;padding:0.75rem;background:#3e3e42;color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:1rem;font-weight:600;">Non</button>
                <button id="confirmYes" style="flex:1;padding:0.75rem;background:#ff9800;color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:1rem;font-weight:600;">Oui</button>
            </div>
        `;

        overlay.appendChild(box);
        document.body.appendChild(overlay);

        document.getElementById('confirmYes').onclick = () => {
            overlay.remove();
            resolve(true);
        };

        document.getElementById('confirmNo').onclick = () => {
            overlay.remove();
            resolve(false);
        };

        // Removed overlay.onclick to prevent closing when clicking outside
        // Modal should only close via Cancel or Confirm buttons
    });
}

// Add attachment in edit modal
window.addEditAttachment = async function (invoiceId) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.png,.jpg,.jpeg,.pdf';
    input.multiple = true;

    input.onchange = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        for (const file of files) {
            try {
                // Check file size (max 10MB)
                if (file.size > 10 * 1024 * 1024) {
                    window.notify.warning('Fichier trop volumineux', `${file.name} dépasse 10MB`, 3000);
                    continue;
                }

                // 1. Save to disk first
                const arrayBuffer = await file.arrayBuffer();
                const uint8Array = new Uint8Array(arrayBuffer);

                const saveResult = await window.electron.attachments.save({
                    company: 'MRY',
                    filename: file.name,
                    data: uint8Array
                });

                if (!saveResult.success) throw new Error(saveResult.error);

                // 2. Add to database with path (file_data is NULL for new ones)
                const result = await window.electron.db.addAttachment(
                    invoiceId,
                    file.name,
                    file.type,
                    null, // No BLOB for new files
                    saveResult.filePath,
                    file.size
                );

                if (result.success) {
                    window.notify.success('Succès', `${file.name} ajouté`, 2000);
                    // Refresh the edit modal
                    document.querySelector('.modal-overlay').remove();
                    setTimeout(() => editInvoice(invoiceId), 300);
                } else {
                    // Cleanup file if DB insert fails
                    await window.electron.attachments.delete(saveResult.filePath);
                    window.notify.error('Erreur', `Échec: ${file.name}`, 3000);
                }
            } catch (error) {
                console.error('Error uploading attachment:', error);
                window.notify.error('Erreur', 'Impossible d\'ajouter le fichier', 3000);
            }
        }
    };

    input.click();
}

// Delete attachment from edit modal
window.deleteEditAttachment = async function (attachmentId, invoiceId) {
    const confirmed = await customConfirm('Confirmation', 'Êtes-vous sûr de vouloir supprimer cette pièce jointe ?', 'warning');
    if (!confirmed) {
        return;
    }

    try {
        const result = await window.electron.db.deleteAttachment(attachmentId);

        if (result.success) {
            window.notify.success('Succès', 'Pièce jointe supprimée', 2000);
            // Refresh the edit modal
            document.querySelector('.modal-overlay').remove();
            setTimeout(() => editInvoice(invoiceId), 300);
        } else {
            window.notify.error('Erreur', result.error || 'Impossible de supprimer', 3000);
        }
    } catch (error) {
        console.error('Error deleting attachment:', error);
        window.notify.error('Erreur', 'Une erreur est survenue', 3000);
    }
}

// Convert invoice type (Facture ↔ Devis)
window.convertInvoiceType = async function (invoiceId, currentType) {
    console.log('🔄 [CONVERT] Starting conversion for invoice:', invoiceId);

    const newType = currentType === 'facture' ? 'devis' : 'facture';
    const newTypeLabel = newType === 'facture' ? 'Facture' : 'Devis';
    const currentTypeLabel = currentType === 'facture' ? 'Facture' : 'Devis';

    // Ask for confirmation with custom dialog
    const confirmMsg = `Voulez-vous vraiment convertir ce ${currentTypeLabel} en ${newTypeLabel} ?<br><br>Cela créera un nouveau document avec les mêmes produits.`;
    const confirmed = await showConfirmDialog(confirmMsg);

    if (!confirmed) {
        console.log('❌ [CONVERT] User cancelled confirmation');
        return;
    }

    console.log('✅ [CONVERT] User confirmed conversion');

    try {
        // Get current invoice data
        const result = await window.electron.db.getInvoiceById(invoiceId);
        if (!result.success || !result.data) {
            throw new Error('Document introuvable');
        }

        const invoice = result.data;
        console.log('📊 [CONVERT] Invoice data loaded:', invoice);

        // Validate invoice data - at least client name should exist
        if (!invoice.client_nom || invoice.client_nom.trim() === '') {
            throw new Error('Données client manquantes - Le nom du client est requis');
        }

        // ICE is optional, but if it exists, it should be valid
        const clientIce = invoice.client_ice && invoice.client_ice.trim() !== '' ? invoice.client_ice : '0';

        // Get current document number
        let currentNumero = '';
        if (currentType === 'facture') {
            currentNumero = invoice.document_numero || '';
        } else if (currentType === 'devis') {
            currentNumero = invoice.document_numero_devis || '';
        }

        // Show input modal for document numbers with pre-filled number
        console.log('🎯 [CONVERT] Calling showConvertInputModal...');
        const inputData = await showConvertInputModal(newType, newTypeLabel, currentNumero);
        console.log('📊 [CONVERT] Input data received:', inputData);

        if (!inputData) {
            window.notify.warning('Annulé', 'Conversion annulée', 3000);
            return;
        }

        const { newNumero, newNumeroOrder } = inputData;

        // Check if numbers are unique
        const allInvoicesResult = await window.electron.db.getAllInvoices('MRY');
        if (allInvoicesResult.success) {
            // Check document number
            const duplicateNumero = allInvoicesResult.data.find(inv => {
                if (newType === 'facture') {
                    return inv.document_type === 'facture' && inv.document_numero === newNumero;
                } else {
                    return inv.document_type === 'devis' && inv.document_numero_devis === newNumero;
                }
            });

            if (duplicateNumero) {
                const label = newType === 'facture' ? 'N° Facture' : 'N° Devis';
                window.notify.error('Erreur', `Ce ${label} existe déjà`, 5000);
                return;
            }

            // Check N° Order if provided (only for facture)
            if (newType === 'facture' && newNumeroOrder) {
                const duplicateOrder = allInvoicesResult.data.find(inv =>
                    inv.document_type === 'facture' &&
                    inv.document_numero_Order === newNumeroOrder
                );

                if (duplicateOrder) {
                    window.notify.error('Erreur', `Ce N° Order existe déjà`, 5000);
                    return;
                }
            }
        }

        // Prepare data for new document
        console.log('📦 [CONVERT] Preparing invoice data...');
        console.log('📦 [CONVERT] client_nom:', invoice.client_nom);
        console.log('📦 [CONVERT] client_ice:', invoice.client_ice);
        console.log('📦 [CONVERT] products:', invoice.products);

        // Get current user info
        const user = JSON.parse(localStorage.getItem('user'));

        const newInvoiceData = {
            company_code: 'MRY',
            client: {
                nom: invoice.client_nom || invoice.client?.nom || '',
                ICE: clientIce
            },
            document: {
                type: newType,
                date: invoice.document_date || (window.todayDateString ? window.todayDateString() : new Date().toISOString().split('T')[0]),
                numero: newType === 'facture' ? newNumero : null,
                numero_devis: newType === 'devis' ? newNumero : null,
                numero_Order: newType === 'facture' ? (newNumeroOrder || null) : null,
                created_by_user_id: user?.id || null,
                created_by_user_name: user?.name || null,
                created_by_user_email: user?.email || null
            },
            products: (invoice.products || []).map(p => ({
                designation: p.designation || '',
                quantite: p.quantite || 0,
                prix_unitaire_ht: p.prix_unitaire_ht || 0,
                total_ht: p.total_ht || 0
            })),
            totals: {
                total_ht: invoice.total_ht || 0,
                tva_rate: (invoice.tva_rate !== undefined && invoice.tva_rate !== null && invoice.tva_rate !== '') ? invoice.tva_rate : 20,
                montant_tva: invoice.montant_tva || 0,
                total_ttc: invoice.total_ttc || 0
            }
        };

        // Create new invoice
        console.log('📤 [CONVERT] Sending data to backend:', JSON.stringify(newInvoiceData, null, 2));
        const createResult = await window.electron.db.createInvoice(newInvoiceData, 'MRY');
        console.log('📥 [CONVERT] Backend response:', createResult);

        if (createResult.success) {
            window.notify.success(
                'Succès',
                `${newTypeLabel} créé(e) avec succès à partir du ${currentTypeLabel}`,
                4000
            );

            // Close modal and reload
            document.querySelector('.modal-overlay')?.remove();
            await loadInvoices();
        } else {
            throw new Error(createResult.error || 'Erreur lors de la création du document');
        }

    } catch (error) {
        console.error('Error converting invoice:', error);
        window.notify.error('Erreur', 'Erreur lors de la conversion: ' + error.message, 5000);
    }
}

// Delete invoice
window.deleteInvoice = async function (id) {
    const confirmed = await customConfirm('Confirmation', 'Êtes-vous sûr de vouloir supprimer cette facture ?', 'warning');
    if (!confirmed) {
        return;
    }

    try {
        const result = await window.electron.db.deleteInvoice(id);

        if (result.success) {
            window.notify.success('Supprimé', 'Facture supprimée avec succès', 3000);
            loadInvoices(); // Reload list
        } else {
            throw new Error(result.error);
        }
    } catch (error) {
        console.error('Error deleting invoice:', error);
        window.notify.error('Erreur', 'Impossible de supprimer la facture', 3000);
    }
}

// Open attachment
window.openAttachment = async function (attachmentId) {
    try {
        const result = await window.electron.db.getAttachment(attachmentId);

        if (result.success && result.data) {
            const attachment = result.data;
            if (attachment.file_url) {
                // ✅ Online URL
                await window.electron.attachments.openUrl(attachment.file_url);
            } else if (attachment.file_path && attachment.file_path.startsWith('http')) {
                // ✅ file_path contains online URL
                await window.electron.attachments.openUrl(attachment.file_path);
            } else if (attachment.file_path) {
                // Legacy: local file
                await window.electron.attachments.open(attachment.file_path);
            } else if (attachment.file_data) {
                // Fallback for non-migrated BLOBs (stored as base64 in this module)
                let bytes;
                if (typeof attachment.file_data === 'string') {
                    const binaryString = atob(attachment.file_data);
                    bytes = new Uint8Array(binaryString.length);
                    for (let i = 0; i < binaryString.length; i++) {
                        bytes[i] = binaryString.charCodeAt(i);
                    }
                } else {
                    bytes = attachment.file_data;
                }

                const blob = new Blob([bytes], { type: attachment.file_type });
                const url = URL.createObjectURL(blob);
                window.open(url, '_blank');
                setTimeout(() => URL.revokeObjectURL(url), 60000);
            } else {
                throw new Error('Contenu du fichier introuvable');
            }
        } else {
            throw new Error(result.error || 'Fichier introuvable');
        }
    } catch (error) {
        console.error('❌ Error opening attachment:', error);
        window.notify.error('Erreur', 'Impossible d\'ouvrir le fichier: ' + error.message, 4000);
    }
}

// Delete attachment
window.deleteAttachment = async function (attachmentId, invoiceId) {
    console.log('🗑️ [DELETE] Delete attachment requested:', attachmentId, 'for invoice:', invoiceId);

    const confirmed = await customConfirm('Confirmation', 'Êtes-vous sûr de vouloir supprimer ce fichier ?', 'warning');
    if (!confirmed) {
        console.log('🗑️ [DELETE] User cancelled deletion');
        return;
    }

    try {
        // Get attachment to find path
        const attResult = await window.electron.db.getAttachment(attachmentId);
        const att = (attResult.success && attResult.data) ? attResult.data : null;
        const pathToDelete = att && att.file_path && !att.file_path.startsWith('http') ? att.file_path : null;

        const result = await window.electron.db.deleteAttachment(attachmentId);

        if (result.success) {
            // Delete local file only if it's a local path (not an online URL)
            if (pathToDelete) {
                await window.electron.attachments.delete(pathToDelete);
            }
            window.notify.success('Supprimé', 'Fichier supprimé avec succès', 3000);

            // Refresh specifically the attachments section
            refreshAttachmentsMRY(invoiceId);
            // Refresh main table
            loadInvoices();
        } else {
            throw new Error(result.error);
        }
    } catch (error) {
        console.error('❌ [DELETE] Error deleting attachment:', error);
        window.notify.error('Erreur', 'Impossible de supprimer le fichier', 3000);
    }
}

// Add new attachment
window.addNewAttachment = async function (invoiceId) {
    // Create file input
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.png,.jpg,.jpeg,.pdf';
    input.multiple = true;

    input.onchange = async (e) => {
        const files = Array.from(e.target.files);

        if (files.length === 0) return;

        try {
            window.notify.info('Upload', `Upload de ${files.length} fichier(s)...`, 2000);

            for (const file of files) {
                // Check file type
                const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf'];
                if (!validTypes.includes(file.type)) {
                    window.notify.warning('Type non supporté', `${file.name} n'est pas accepté`, 3000);
                    continue;
                }

                // Check file size (max 10MB)
                if (file.size > 10 * 1024 * 1024) {
                    window.notify.warning('Fichier trop volumineux', `${file.name} dépasse 10MB`, 3000);
                    continue;
                }

                // 1. Read file and upload to server
                const arrayBuffer = await file.arrayBuffer();
                const uint8Array = new Uint8Array(arrayBuffer);

                const uploadResult = await window.electron.attachments.uploadToServer({
                    company: 'MRY',
                    filename: file.name,
                    data: uint8Array,
                    mimeType: file.type
                });

                if (!uploadResult.success) throw new Error(uploadResult.error);

                // 2. Add to DB with online URL
                const result = await window.electron.db.addAttachment(
                    invoiceId,
                    file.name,
                    file.type,
                    null, // No BLOB
                    uploadResult.file_url, // Online URL
                    file.size
                );

                if (result.success) {
                    console.log('✅ Attachment uploaded to server and saved to DB:', file.name);
                } else {
                    console.error('❌ Failed to save to DB:', file.name, result.error);
                }
            }

            window.notify.success('Succès', 'Fichier(s) ajouté(s) avec succès', 3000);

            // Fetch updated invoice data from database to get correct attachment_count
            const updatedResult = await window.electron.db.getInvoiceById(invoiceId);
            if (updatedResult.success && updatedResult.data) {
                const correctCount = updatedResult.data.attachment_count || 0;
                
                // Update local state with correct count from database
                const inv = allInvoices.find(i => i.id == invoiceId);
                if (inv) {
                    inv.attachment_count = correctCount;
                }
                const filteredInv = filteredInvoices.find(i => i.id == invoiceId);
                if (filteredInv) {
                    filteredInv.attachment_count = correctCount;
                }
            }

            // Refresh specifically the attachments section in modal
            refreshAttachmentsMRY(invoiceId);
            
            // Re-render the display with updated data (no full reload needed)
            displayInvoices(filteredInvoices);

        } catch (error) {
            console.error('Error uploading attachments:', error);
            window.notify.error('Erreur', 'Impossible d\'ajouter les fichiers', 3000);
        }
    };

    input.click();
}

// Helper to refresh attachments in the modal without closing it
async function refreshAttachmentsMRY(invoiceId) {
    const attachmentsSection = document.getElementById(`attachmentsSectionMRY${invoiceId}`);
    if (!attachmentsSection) return;

    try {
        const result = await window.electron.db.getInvoiceById(invoiceId);
        if (result.success && result.data) {
            const invoice = result.data;
            let attachmentsHTML = `
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;">
                    <h3 style="color:#fff;font-size:1.1rem;margin:0;font-weight:600;">Pièces jointes (${invoice.attachments ? invoice.attachments.length : 0})</h3>
                    <button onclick="addNewAttachment(${invoiceId})" style="padding:0.5rem 1rem;background:#4CAF50;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:0.85rem;font-weight:600;display:flex;align-items:center;gap:0.5rem;transition:all 0.2s;" onmouseover="this.style.background='#45a049'" onmouseout="this.style.background='#4CAF50'">
                        ➕ Ajouter
                    </button>
                </div>
            `;

            if (invoice.attachments && invoice.attachments.length > 0) {
                attachmentsHTML += `
                    <div style="background:#1e1e1e;border-radius:8px;padding:1rem;">
                        ${invoice.attachments.map(a => `
                            <div style="display:flex;justify-content:space-between;align-items:center;padding:0.75rem;background:#252526;border-radius:6px;margin-bottom:0.5rem;">
                                <div style="display:flex;align-items:center;gap:1rem;">
                                    <span style="font-size:1.5rem;">${a.file_type.includes('pdf') ? '📄' : '🖼️'}</span>
                                    <div>
                                        <div style="color:#fff;font-weight:500;">${a.filename}</div>
                                        <div style="color:#999;font-size:0.85rem;">${(a.file_size / 1024).toFixed(2)} KB</div>
                                    </div>
                                </div>
                                <div style="display:flex;gap:0.5rem;">
                                    <button onclick="openAttachment(${a.id})" style="padding:0.4rem 0.8rem;background:#2196F3;color:#fff;border:none;border-radius:4px;cursor:pointer;font-size:0.8rem;">
                                        👁️ Ouvrir
                                    </button>
                                    <button onclick="deleteAttachment(${a.id}, ${invoiceId})" style="padding:0.4rem 0.8rem;background:#f44336;color:#fff;border:none;border-radius:4px;cursor:pointer;font-size:0.8rem;display:flex;align-items:center;gap:0.4rem;">
                                        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                        </svg>
                                        Supprimer
                                    </button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                `;
            } else {
                attachmentsHTML += '<p style="color:#999;text-align:center;padding:2rem;background:#1e1e1e;border-radius:8px;">Aucune pièce jointe</p>';
            }

            attachmentsSection.innerHTML = attachmentsHTML;
        }
    } catch (err) {
        console.error('Error refreshing attachments:', err);
    }
}

// Format number with spaces for thousands - Fixed for PDF Arabic numerals
function formatNumberForPDF(number) {
    const num = parseFloat(number || 0);
    // Convert to string with 2 decimals
    const formatted = num.toFixed(2);
    // Split into integer and decimal parts
    const parts = formatted.split('.');
    // Add spaces for thousands separator (use regular space, not non-breaking space)
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    // Join with regular comma (ASCII 44)
    return parts[0] + ',' + parts[1];
}

// Load MRY signature image for PDF
async function loadMRYSignature() {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            resolve(canvas.toDataURL('image/png'));
        };
        img.onerror = () => {
            console.warn('Could not load MRY signature image');
            resolve(null);
        };
        img.src = 'Signature/MRY.png';
    });
}


// Download invoice as PDF
// Helper to show consolidated customization modal for MRY PDF
async function showMRYPDFCustomizationModal(invoice) {
    return new Promise((resolve) => {
        const overlay = document.createElement('div');
        overlay.className = 'custom-modal-overlay';

        const hasOrder = invoice.document_type === 'facture' && invoice.document_numero_Order && invoice.document_numero_Order.trim() !== '';
        const isDevis = invoice.document_type === 'devis';
        const hasZeroProducts = invoice.products && invoice.products.some(p =>
            parseFloat(p.quantite) === 0 || parseFloat(p.prix_unitaire_ht) === 0
        );

        overlay.innerHTML = `
            <div class="custom-modal" style="max-width: 500px;">
                <div class="custom-modal-header">
                    <span class="custom-modal-icon info">🎨</span>
                    <h3 class="custom-modal-title">Paramètres du PDF</h3>
                </div>
                <div class="custom-modal-body">
                    <!-- Font Size Selection -->
                    <div style="margin-bottom: 1.5rem;">
                        <label style="display: block; margin-bottom: 0.8rem; color: #e0e0e0; font-weight: 600;">
                            Taille de police des Notes :
                        </label>
                        <div style="display: flex; gap: 0.5rem; background: #1e1e1e; padding: 0.5rem; border-radius: 8px; border: 1px solid #3e3e42;">
                            <label style="flex: 1; display: flex; flex-direction: column; align-items: center; cursor: pointer; padding: 0.5rem; border-radius: 6px; transition: all 0.2s;">
                                <input type="radio" name="mryNotesFontSize" value="small" style="margin-bottom: 0.4rem; cursor: pointer;">
                                <span style="font-size: 0.75rem; color: #999;">Petit</span>
                            </label>
                            <label style="flex: 1; display: flex; flex-direction: column; align-items: center; cursor: pointer; padding: 0.5rem; border-radius: 6px; transition: all 0.2s; background: #2d2d30;">
                                <input type="radio" name="mryNotesFontSize" value="medium" checked style="margin-bottom: 0.4rem; cursor: pointer;">
                                <span style="font-size: 0.85rem; color: #fff;">Moyen</span>
                            </label>
                            <label style="flex: 1; display: flex; flex-direction: column; align-items: center; cursor: pointer; padding: 0.5rem; border-radius: 6px; transition: all 0.2s;">
                                <input type="radio" name="mryNotesFontSize" value="large" style="margin-bottom: 0.4rem; cursor: pointer;">
                                <span style="font-size: 0.95rem; color: #999;">Grand</span>
                            </label>
                            <label style="flex: 1; display: flex; flex-direction: column; align-items: center; cursor: pointer; padding: 0.5rem; border-radius: 6px; transition: all 0.2s;">
                                <input type="radio" name="mryNotesFontSize" value="xlarge" style="margin-bottom: 0.4rem; cursor: pointer;">
                                <span style="font-size: 1.05rem; color: #999;">Très G.</span>
                            </label>
                        </div>
                    </div>

                    ${hasOrder ? `
                        <div style="margin-bottom: 1.25rem;">
                            <p style="margin-bottom:0.5rem;color:#e0e0e0;font-size:0.9rem;">N° Order: <strong style="color:#2196F3;">${invoice.document_numero_Order}</strong></p>
                            <label style="display:flex;align-items:center;cursor:pointer;padding:0.75rem;background:#1e1e1e;border:1px solid #3e3e42;border-radius:8px;">
                                <input type="checkbox" id="mryIncludeOrder" checked style="width:18px;height:18px;margin-right:0.75rem;cursor:pointer;accent-color:#2196F3;">
                                <span style="font-size:0.9rem;color:#e0e0e0;">Inclure le N° Order</span>
                            </label>
                        </div>
                    ` : ''}

                    ${isDevis ? `
                        <div style="margin-bottom: 1.25rem;">
                            <label style="display:flex;align-items:center;cursor:pointer;padding:0.75rem;background:#1e1e1e;border:1px solid #3e3e42;border-radius:8px;">
                                <input type="checkbox" id="mryIncludeSignature" checked style="width:18px;height:18px;margin-right:0.75rem;cursor:pointer;accent-color:#4caf50;">
                                <span style="font-size:0.9rem;color:#e0e0e0;">Inclure la signature</span>
                            </label>
                        </div>
                    ` : ''}

                    ${hasZeroProducts ? `
                        <div style="margin-bottom: 1.25rem;">
                            <p style="margin-bottom:0.5rem;color:#e0e0e0;font-size:0.85rem;color:#ff9800;">Note: Certains produits ont une quantité/prix à zéro.</p>
                            <label style="display:flex;align-items:center;cursor:pointer;padding:0.75rem;background:#1e1e1e;border:1px solid #3e3e42;border-radius:8px;">
                                <input type="checkbox" id="mryIncludeZero" checked style="width:18px;height:18px;margin-right:0.75rem;cursor:pointer;accent-color:#ff9800;">
                                <span style="font-size:0.9rem;color:#e0e0e0;">Afficher les produits à zéro</span>
                            </label>
                        </div>
                    ` : ''}
                </div>
                <div class="custom-modal-footer">
                    <button class="custom-modal-btn secondary" id="mryCancelBtn">Annuler</button>
                    <button class="custom-modal-btn primary" id="mryGenerateBtn">Générer PDF</button>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);

        const cancelBtn = overlay.querySelector('#mryCancelBtn');
        const generateBtn = overlay.querySelector('#mryGenerateBtn');

        // Dynamic styling for radio buttons
        const radioLabels = overlay.querySelectorAll('input[name="mryNotesFontSize"]');
        radioLabels.forEach(radio => {
            radio.addEventListener('change', (e) => {
                radioLabels.forEach(r => {
                    const label = r.parentElement;
                    label.style.background = 'transparent';
                    label.querySelector('span').style.color = '#999';
                });
                if (e.target.checked) {
                    const label = e.target.parentElement;
                    label.style.background = '#2d2d30';
                    label.querySelector('span').style.color = '#fff';
                }
            });
        });

        cancelBtn.addEventListener('click', () => {
            overlay.remove();
            resolve(null);
        });

        generateBtn.addEventListener('click', () => {
            const selectedSize = overlay.querySelector('input[name="mryNotesFontSize"]:checked').value;
            const includeOrder = overlay.querySelector('#mryIncludeOrder') ? overlay.querySelector('#mryIncludeOrder').checked : false;
            const includeSignature = overlay.querySelector('#mryIncludeSignature') ? overlay.querySelector('#mryIncludeSignature').checked : false;
            const includeZero = overlay.querySelector('#mryIncludeZero') ? overlay.querySelector('#mryIncludeZero').checked : false;

            overlay.remove();
            resolve({
                notesFontSize: selectedSize,
                includeOrder,
                includeSignature,
                includeZero
            });
        });

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.remove();
                resolve(null);
            }
        });

        setTimeout(() => generateBtn.focus(), 100);
    });
}

window.downloadInvoicePDF = async function (invoiceId, returnBlob = false, options = {}) {
    try {
        console.log('📥 Generating PDF for invoice:', invoiceId);

        // Get invoice data
        const result = await window.electron.db.getInvoiceById(invoiceId);

        if (!result.success || !result.data) {
            throw new Error('Facture introuvable');
        }

        const invoice = result.data;

        const skipModals = options.skipModals || false;
        let includeSignature, includeZeroProducts, notesFontSize;

        if (skipModals) {
            // Bulk download: apply options directly without modals
            if (!options.includeOrder) {
                invoice.document_numero_Order = null;
            }
            includeSignature = options.includeSignature || false;
            includeZeroProducts = options.includeZeroProducts || false;
            notesFontSize = options.selectedFontSize || 'medium';
        } else {
            // Show consolidated customization modal
            const customParams = await showMRYPDFCustomizationModal(invoice);
            if (!customParams) {
                console.log('❌ User cancelled PDF generation');
                return;
            }

            console.log('⚙️ PDF Custom Parameters:', customParams);

            // Apply parameters
            if (invoice.document_type === 'facture') {
                if (!customParams.includeOrder) {
                    invoice.document_numero_Order = null;
                }
            }

            includeSignature = customParams.includeSignature;
            includeZeroProducts = customParams.includeZero;
            notesFontSize = customParams.notesFontSize;
        }

        console.log('📄 Continuing with PDF generation...');
        // Mark products with zero values for special display
        const showZeroValues = includeZeroProducts;
        console.log('📊 Show zero values in PDF:', showZeroValues);

        // Check if jsPDF is loaded
        if (typeof window.jspdf === 'undefined') {
            // Load jsPDF from CDN
            await loadJsPDF();
        }

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        // Load signature image
        const signatureImgMRY = await loadMRYSignature();

        // Load editable PDF text
        const pdfText = await window.loadCompanyPdfText('MRY');

        // Colors
        const blueColor = [33, 97, 140]; // #21618C
        const greenColor = [16, 172, 132]; // #10AC84
        const orangeColor = [255, 152, 0]; // #FF9800

        const dateStr = (window.safeParseDate||function(d){return new Date(d)})(invoice.document_date).toLocaleDateString('fr-FR');

        // Function to add header to any page
        const addHeader = (isFirstPage = true) => {
            // Add Logo
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
            doc.text(pdfText.company_name || 'MRY TRAV SARL (AU)', 105, 20, { align: 'center' });

            doc.setFontSize(10);
            doc.setFont(undefined, 'normal');
            doc.setTextColor(0, 0, 0);
            doc.text(pdfText.header_line1 || 'TRAVAUX DIVERS DE CONSTRUCTION', 105, 27, { align: 'center' });
            doc.text(pdfText.header_line2 || 'VENTE DE MATERIAUX DE CONSTRUCTION', 105, 32, { align: 'center' });
            doc.text(pdfText.header_line3 || 'VENTE DE QUINCAILLERIE & DE DROGUERIE', 105, 37, { align: 'center' });

            // Client Info
            doc.setFontSize(11);
            doc.setFont(undefined, 'bold');
            doc.text('CLIENT :', 15, 50);
            doc.setTextColor(...greenColor);
            doc.text(invoice.client_nom, 40, 50);

            // Only show ICE if it exists and is not "0"
            if (invoice.client_ice && invoice.client_ice !== '0') {
                doc.setTextColor(0, 0, 0);
                doc.text('ICE :', 15, 57);
                doc.setTextColor(...greenColor);
                doc.text(invoice.client_ice, 40, 57);
            }

            // Date
            doc.setTextColor(0, 0, 0);
            doc.text(`Date: ${dateStr} `, 150, 50);

            // Always show document and order numbers on every page
            doc.setFontSize(14);
            doc.setFont(undefined, 'bold');
            if (invoice.document_type === 'devis') {
                doc.text('DEVIS N°:', 15, 70);
                doc.setTextColor(...orangeColor);
                doc.text(invoice.document_numero_devis || '-', 50, 70);
            } else {
                doc.text('FACTURE N°:', 15, 70);
                doc.setTextColor(...orangeColor);
                doc.text(invoice.document_numero || '-', 55, 70);
            }
            if (invoice.document_numero_Order) {
                doc.setFontSize(12);
                doc.setFont(undefined, 'bold');
                doc.setTextColor(0, 0, 0);
                doc.text('N° Order :', 15, 77);
                doc.setTextColor(33, 150, 243);
                doc.setFont(undefined, 'bold');
                doc.text(invoice.document_numero_Order, 42, 77);
            }
        };

        // Function to add footer to any page
        const addFooter = (pageNum, totalPages) => {
            // Add signature image above footer (right side)
            // Add signature image above footer (right side) - ONLY FOR DEVIS AND IF USER APPROVED
            if (signatureImgMRY && invoice.document_type === 'devis' && includeSignature) {
                doc.addImage(signatureImgMRY, 'PNG', 135, 230, 57, 40);
            }

            doc.setTextColor(0, 0, 0);
            doc.setFontSize(7);
            doc.setFont(undefined, 'normal');
            doc.text(pdfText.footer_line1 || 'NIF : 25077370  TP : 51200166  R.C : 23181  CNSS : 5679058  ICE : 002036664000051', 105, 275, { align: 'center' });
            doc.text(pdfText.footer_line2 || 'R.I.B : 007 720 0005973000000519 74  ATTIJARI WAFA BANK', 105, 279, { align: 'center' });
            doc.text(pdfText.footer_line3 || 'AV, BNI IDDER RUE 14 N°10 COELMA - TÉTOUAN.', 105, 283, { align: 'center' });
            doc.text(pdfText.footer_line4 || 'EMAIL: errbahiabderrahim@gmail.com  TEL : 0661307323', 105, 287, { align: 'center' });

            // Page numbering
            if (pageNum && totalPages) {
                doc.setFontSize(8);
                doc.setTextColor(128, 128, 128);
                doc.text(`Page ${pageNum} / ${totalPages}`, 105, 293, { align: 'center' });
            }
        };

        // Add header to first page
        addHeader(true);

        // Products Table
        const startY = invoice.document_numero_Order ? 85 : 80;

        // Table Header - Redesigned with better column widths
        doc.setFillColor(...blueColor);
        doc.rect(15, startY, 180, 8, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(9);
        doc.setFont(undefined, 'bold');
        doc.text('Désignation', 18, startY + 5.5);
        doc.text('QTE', 125, startY + 5.5, { align: 'center' });
        doc.text('PU HT', 160, startY + 5.5, { align: 'right' });
        doc.text('TOTAL HT', 188, startY + 5.5, { align: 'right' });

        // Table Body
        let currentY = startY + 10;
        doc.setTextColor(0, 0, 0);
        doc.setFont(undefined, 'normal');
        doc.setFontSize(9);

        let pageCount = 1;
        const pages = [];

        console.log('=== PDF Generation Started (MRY) ===');
        console.log('Document Type:', invoice.document_type);
        console.log('Initial startY (Page 1):', startY);
        console.log('Continuation pages will use same calculation as Page 1');
        console.log('Has N° Order:', !!invoice.document_numero_Order);
        console.log('Total Products:', invoice.products.length);

        invoice.products.forEach((product, index) => {
            // Wrap long text - limit width to prevent overlap with QTE column
            const designation = product.designation || '';

            // Width set to 85 to ensure text stays within Désignation column (QTE is at position 125)
            const lines = doc.splitTextToSize(designation, 85);

            // Calculate row height based on text lines - each line needs 4.5 units + padding
            const rowHeight = Math.max(8, (lines.length * 4.5) + 4);

            // Split very long products across multiple pages if needed
            let remainingLines = [...lines];
            let isFirstPart = true;

            while (remainingLines.length > 0) {
                const availableSpace = 215 - currentY;

                // If not enough space for even one line, create new page first
                if (availableSpace < 15) {
                    pages.push(pageCount);
                    doc.addPage();
                    addHeader(false);
                    pageCount++;

                    let newStartY = 80;
                    if (invoice.document_numero_Order) {
                        newStartY += 7;
                    }

                    doc.setFillColor(...blueColor);
                    doc.rect(15, newStartY, 180, 8, 'F');
                    doc.setTextColor(255, 255, 255);
                    doc.setFontSize(9);
                    doc.setFont(undefined, 'bold');
                    doc.text('Désignation', 18, newStartY + 5.5);
                    doc.text('QTE', 125, newStartY + 5.5, { align: 'center' });
                    doc.text('PU HT', 160, newStartY + 5.5, { align: 'right' });
                    doc.text('TOTAL HT', 188, newStartY + 5.5, { align: 'right' });

                    currentY = newStartY + 10;
                    doc.setTextColor(0, 0, 0);
                    doc.setFont(undefined, 'normal');
                    doc.setFontSize(9);
                    continue; // Re-check available space on new page
                }

                const maxLinesPerPage = Math.floor((availableSpace - 10) / 4.5);
                const linesToDraw = remainingLines.splice(0, Math.max(1, maxLinesPerPage));
                const partialRowHeight = Math.max(8, (linesToDraw.length * 4.5) + 4);

                // Alternate row colors (only for first part)
                if (isFirstPart && index % 2 === 0) {
                    doc.setFillColor(245, 245, 245);
                    doc.rect(15, currentY - 3, 180, partialRowHeight, 'F');
                }

                doc.setFontSize(8);
                // Draw lines
                linesToDraw.forEach((line, lineIndex) => {
                    doc.text(line, 18, currentY + 3 + (lineIndex * 4.5));
                });

                // Only show quantity, price, and total on the first part
                if (isFirstPart) {
                    const centerOffset = (linesToDraw.length > 1) ? ((linesToDraw.length - 1) * 2.25) : 0;

                    const qty = parseFloat(product.quantite);
                    if (showZeroValues || qty !== 0) {
                        doc.text(String(product.quantite || ''), 125, currentY + 3 + centerOffset, { align: 'center' });
                    }

                    doc.setFontSize(7.5);
                    const price = parseFloat(product.prix_unitaire_ht);
                    if (showZeroValues || price !== 0) {
                        doc.text(`${formatNumberForPDF(product.prix_unitaire_ht)} DH`, 160, currentY + 3 + centerOffset, { align: 'right' });
                    }

                    const total = parseFloat(product.total_ht);
                    if (showZeroValues || total !== 0) {
                        doc.text(`${formatNumberForPDF(product.total_ht)} DH`, 188, currentY + 3 + centerOffset, { align: 'right' });
                    }
                }

                currentY += partialRowHeight;
                isFirstPart = false;

                // If there are more lines and we're near the bottom, create new page
                if (remainingLines.length > 0 && currentY > 200) {
                    pages.push(pageCount);
                    doc.addPage();
                    addHeader(false);
                    pageCount++;

                    let newStartY = 80;
                    if (invoice.document_numero_Order) {
                        newStartY += 7;
                    }

                    doc.setFillColor(...blueColor);
                    doc.rect(15, newStartY, 180, 8, 'F');
                    doc.setTextColor(255, 255, 255);
                    doc.setFontSize(9);
                    doc.setFont(undefined, 'bold');
                    doc.text('Désignation', 18, newStartY + 5.5);
                    doc.text('QTE', 125, newStartY + 5.5, { align: 'center' });
                    doc.text('PU HT', 160, newStartY + 5.5, { align: 'right' });
                    doc.text('TOTAL HT', 188, newStartY + 5.5, { align: 'right' });

                    currentY = newStartY + 10;
                    doc.setTextColor(0, 0, 0);
                    doc.setFont(undefined, 'normal');
                    doc.setFontSize(9);
                }
            }
        });

        // Totals
        currentY += 10;

        // TOTAL HT
        doc.setFillColor(245, 245, 245);
        doc.rect(110, currentY, 85, 8, 'F');
        doc.setFont(undefined, 'bold');
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(9);
        doc.text('TOTAL HT :', 113, currentY + 5.5);
        doc.setFontSize(8);
        doc.text(`${formatNumberForPDF(invoice.total_ht)} DH`, 192, currentY + 5.5, { align: 'right' });

        // MONTANT TVA and T.T.C (Only if TVA > 0)
        if (parseFloat(invoice.tva_rate) > 0) {
            // MONTANT TVA
            currentY += 8;
            doc.setFillColor(255, 255, 255);
            doc.rect(110, currentY, 85, 8, 'F');
            doc.setFontSize(9);
            doc.text(`MONTANT TVA ${invoice.tva_rate}% :`, 113, currentY + 5.5);
            doc.setFontSize(8);
            doc.text(`${formatNumberForPDF(invoice.montant_tva)} DH`, 192, currentY + 5.5, { align: 'right' });

            // MONTANT T.T.C
            currentY += 8;
            doc.setFillColor(173, 216, 230);
            doc.rect(110, currentY, 85, 8, 'F');
            doc.setTextColor(...blueColor);
            doc.setFontSize(9);
            doc.text('MONTANT T.T.C :', 113, currentY + 5.5);
            doc.setFontSize(8.5);
            doc.text(`${formatNumberForPDF(invoice.total_ttc)} DH`, 192, currentY + 5.5, { align: 'right' });
        }

        // Amount in words
        currentY += 15;
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(9);
        doc.setFont(undefined, 'italic');
        const amountInWords = numberToFrenchWords(invoice.total_ttc);
        const docTypeText = invoice.document_type === 'facture' ? 'Facture' : 'Devis';
        const amountText = `La Présente ${docTypeText} est Arrêtée à la somme de : ${amountInWords}`;
        const amountLines = doc.splitTextToSize(amountText, 180);
        
        amountLines.forEach(line => {
            doc.text(line, 15, currentY);
            currentY += 4.5;
        });

        // Add notes if any
        const noteResult = await window.electron.db.getNote(invoiceId);
        if (noteResult.success && noteResult.data) {
            // Font size mapping for notes
            const fontSizeMap = {
                'small': { size: 7, lineheight: 3.5 },
                'medium': { size: 9, lineheight: 4.5 },
                'large': { size: 12, lineheight: 5.5 },
                'xlarge': { size: 14, lineheight: 6.5 }
            };
            const selectedFont = fontSizeMap[notesFontSize] || fontSizeMap['medium'];

            currentY += 10;
            doc.setFontSize(8);
            doc.setFont(undefined, 'bold');
            doc.setTextColor(96, 125, 139);
            doc.text('Notes:', 15, currentY);

            doc.setFont(undefined, 'bold');
            doc.setTextColor(0, 0, 0);
            doc.setFontSize(selectedFont.size);
            const noteLines = doc.splitTextToSize(noteResult.data, 180);
            const footerTopY = 270;
            let lineY = currentY + 4;
            for (let i = 0; i < noteLines.length; i++) {
                if (lineY > footerTopY) {
                    // new page for overflowing notes
                    pages.push(pageCount);
                    doc.addPage();
                    addHeader(false);
                    pageCount++;
                    // Notes continuation title – align below header (same vertical zone as table area)
                    const notesStartY = invoice.document_numero_Order ? 95 : 88;
                    doc.setFontSize(8);
                    doc.setFont(undefined, 'bold');
                    doc.setTextColor(96, 125, 139);
                    doc.text('Notes (suite) :', 15, notesStartY - 4);
                    doc.setTextColor(0, 0, 0);
                    doc.setFont(undefined, 'bold');
                    doc.setFontSize(selectedFont.size);
                    lineY = notesStartY;
                }
                doc.text(noteLines[i], 15, lineY);
                lineY += selectedFont.lineheight;
            }
        }

        // Add page numbering to all pages
        pages.push(pageCount);
        const totalPages = pages.length;

        for (let i = 0; i < totalPages; i++) {
            doc.setPage(i + 1);
            addFooter(i + 1, totalPages);
        }

        // Save PDF with appropriate filename
        const selectedCompany = JSON.parse(localStorage.getItem('selectedCompany') || '{}');
        const companyName = selectedCompany.name ? selectedCompany.name.replace(' Company', '') : 'Unknown';
        let filename;
        if (invoice.document_type === 'devis') {
            filename = `Devis_${invoice.document_numero_devis || invoice.id}_${invoice.client_nom}_${companyName}.pdf`;
        } else {
            filename = `Facture_${invoice.document_numero || invoice.id}_${invoice.client_nom}_${companyName}.pdf`;
        }
        // Return blob for bulk download OR save PDF for single download
        if (returnBlob) {
            return doc.output('blob');
        } else {
            doc.save(filename);
            window.notify.success('Succès', 'PDF téléchargé avec succès', 3000);
        }

    } catch (error) {
        console.error('❌ Error generating PDF:', error);
        if (!returnBlob) {
            window.notify.error('Erreur', 'Impossible de générer le PDF: ' + error.message, 4000);
        }
        return null;
    }
}

// Download Bon de travaux as PDF (without prices)
window.downloadBonDeTravauxPDF = async function (invoiceId) {
    try {
        console.log('📥 Generating Bon de travaux PDF for invoice:', invoiceId);

        // Get invoice data
        const result = await window.electron.db.getInvoiceById(invoiceId);

        if (!result.success || !result.data) {
            throw new Error('Document introuvable');
        }

        const invoice = result.data;

        // Check if there are products with zero quantity or price
        const hasZeroProducts = invoice.products && invoice.products.some(p =>
            parseFloat(p.quantite) === 0 || parseFloat(p.prix_unitaire_ht) === 0
        );

        let includeZeroProducts = true; // Default: include all products

        if (hasZeroProducts) {
            includeZeroProducts = await new Promise((resolve) => {
                const overlay = document.createElement('div');
                overlay.className = 'custom-modal-overlay';

                overlay.innerHTML = `
                    <div class="custom-modal">
                        <div class="custom-modal-header">
                            <span class="custom-modal-icon warning">⚠️</span>
                            <h3 class="custom-modal-title">Produits avec quantité ou prix zéro</h3>
                        </div>
                        <div class="custom-modal-body">
                            <p style="margin-bottom:1rem;color:#e0e0e0;font-size:0.95rem;">
                                Certains produits ont une <strong style="color:#ff9800;">quantité = 0</strong> ou un <strong style="color:#ff9800;">prix = 0</strong>.
                            </p>
                            <p style="color:#b0b0b0;font-size:0.9rem;">
                                Voulez-vous les afficher dans le Bon de travaux ?
                            </p>
                        </div>
                        <div class="custom-modal-footer">
                            <button id="excludeZeroBtnBonTravauxMRY" class="custom-modal-btn secondary">
                                ❌ Non, masquer
                            </button>
                            <button id="includeZeroBtnBonTravauxMRY" class="custom-modal-btn primary">
                                ✅ Oui, afficher
                            </button>
                        </div>
                    </div>
                `;

                document.body.appendChild(overlay);

                const excludeBtn = document.getElementById('excludeZeroBtnBonTravauxMRY');
                const includeBtn = document.getElementById('includeZeroBtnBonTravauxMRY');

                excludeBtn.addEventListener('click', () => {
                    overlay.remove();
                    resolve(false);
                });

                includeBtn.addEventListener('click', () => {
                    overlay.remove();
                    resolve(true);
                });

                overlay.addEventListener('click', (e) => {
                    if (e.target === overlay) {
                        overlay.remove();
                        resolve(true); // Default to include if user clicks outside
                    }
                });

                setTimeout(() => includeBtn.focus(), 100);
            });

            console.log('🔍 User choice for zero products in Bon de travaux:', includeZeroProducts ? 'Include' : 'Exclude');
        }

        // Mark products with zero values for special display (don't remove them)
        const showZeroValues = includeZeroProducts;
        console.log('📊 Show zero values in Bon de travaux:', showZeroValues);

        // Check if jsPDF is loaded
        if (typeof window.jspdf === 'undefined') {
            await loadJsPDF();
        }

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        // Load editable PDF text
        const pdfTextBon = await window.loadCompanyPdfText('MRY');

        // Colors
        const blueColor = [33, 97, 140];
        const greenColor = [16, 172, 132];
        const purpleColor = [156, 39, 176]; // For "Bon de travaux"

        const dateStr = (window.safeParseDate||function(d){return new Date(d)})(invoice.document_date).toLocaleDateString('fr-FR');

        // Function to add header
        const addHeader = (isFirstPage = true) => {
            // Add Logo
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
            doc.text(pdfTextBon.company_name || 'MRY TRAV SARL (AU)', 105, 20, { align: 'center' });

            doc.setFontSize(10);
            doc.setFont(undefined, 'normal');
            doc.setTextColor(0, 0, 0);
            doc.text(pdfTextBon.header_line1 || 'TRAVAUX DIVERS DE CONSTRUCTION', 105, 27, { align: 'center' });
            doc.text(pdfTextBon.header_line2 || 'VENTE DE MATERIAUX DE CONSTRUCTION', 105, 32, { align: 'center' });
            doc.text(pdfTextBon.header_line3 || 'VENTE DE QUINCAILLERIE & DE DROGUERIE', 105, 37, { align: 'center' });

            // Client Info
            doc.setFontSize(11);
            doc.setFont(undefined, 'bold');
            doc.setTextColor(0, 0, 0);
            doc.text('CLIENT :', 15, 50);
            doc.setTextColor(...greenColor);
            doc.text(invoice.client_nom, 40, 50);

            // Only show ICE if it exists and is not "0"
            if (invoice.client_ice && invoice.client_ice !== '0') {
                doc.setTextColor(0, 0, 0);
                doc.text('ICE :', 15, 57);
                doc.setTextColor(...greenColor);
                doc.text(invoice.client_ice, 40, 57);
            }

            // Date
            doc.setTextColor(0, 0, 0);
            doc.text(`Date: ${dateStr}`, 150, 50);

            // "BON DE TRAVAUX" title in center (below ICE)
            doc.setFontSize(20);
            doc.setFont(undefined, 'bold');
            doc.setTextColor(...blueColor);
            doc.text('BON DE TRAVAUX', 105, 70, { align: 'center' });
        };

        // Function to add footer
        const addFooter = (pageNum, totalPages) => {
            doc.setTextColor(0, 0, 0);
            doc.setFontSize(7);
            doc.setFont(undefined, 'normal');
            doc.text(pdfTextBon.footer_line1 || 'NIF : 25077370  TP : 51200166  R.C : 23181  CNSS : 5679058  ICE : 002036664000051', 15, 275);
            doc.text(pdfTextBon.footer_line2 || 'R.I.B : 007 720 0005973000000519 74  ATTIJARI WAFA BANK', 15, 279);
            doc.text(pdfTextBon.footer_line3 || 'AV, BNI IDDER RUE 14 N°10 COELMA - TÉTOUAN.', 15, 283);
            doc.text(pdfTextBon.footer_line4 || 'EMAIL: errbahiabderrahim@gmail.com  TEL : 0661307323', 15, 287);

            // Page numbering
            if (pageNum && totalPages) {
                doc.setFontSize(8);
                doc.setTextColor(128, 128, 128);
                doc.text(`Page ${pageNum} / ${totalPages}`, 105, 293, { align: 'center' });
            }
        };

        // Add header to first page
        addHeader(true);

        const startY = 85;

        // Helper function to format numbers
        const formatNumberForPDF = (num) => {
            return parseFloat(num).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
        };

        // Products Table (with all columns and prices)
        doc.setFillColor(...blueColor);
        doc.rect(15, startY, 180, 8, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(9);
        doc.setFont(undefined, 'bold');
        doc.text('Désignation', 18, startY + 5.5);
        doc.text('QTE', 125, startY + 5.5, { align: 'center' });
        doc.text('Prix unitaire HT', 160, startY + 5.5, { align: 'right' });
        doc.text('Prix total HT', 188, startY + 5.5, { align: 'right' });

        // Table Body
        let currentY = startY + 10;
        doc.setTextColor(0, 0, 0);
        doc.setFont(undefined, 'normal');
        doc.setFontSize(9);

        let pageCount = 1;
        const pages = [];

        invoice.products.forEach((product, index) => {
            const designation = product.designation || '';

            const lines = doc.splitTextToSize(designation, 85);

            // Calculate row height based on text lines - each line needs 4.5 units + padding
            const rowHeight = Math.max(8, (lines.length * 4.5) + 4);

            // Check if we need a new page
            if (currentY + rowHeight > 215) {
                pages.push(pageCount);
                doc.addPage();
                addHeader(false);
                pageCount++;

                doc.setFillColor(...blueColor);
                doc.rect(15, startY, 180, 8, 'F');
                doc.setTextColor(255, 255, 255);
                doc.setFontSize(9);
                doc.setFont(undefined, 'bold');
                doc.text('Désignation', 18, startY + 5.5);
                doc.text('QTE', 125, startY + 5.5, { align: 'center' });
                doc.text('Prix unitaire HT', 160, startY + 5.5, { align: 'right' });
                doc.text('Prix total HT', 188, startY + 5.5, { align: 'right' });

                currentY = startY + 10;
                doc.setTextColor(0, 0, 0);
                doc.setFont(undefined, 'normal');
                doc.setFontSize(9);
            }

            // Alternate row colors
            if (index % 2 === 0) {
                doc.setFillColor(245, 245, 245);
                doc.rect(15, currentY - 3, 180, rowHeight, 'F');
            }

            doc.setFontSize(8);
            // Draw each line separately
            lines.forEach((line, lineIndex) => {
                doc.text(line, 18, currentY + 3 + (lineIndex * 4.5));
            });

            // Center vertically for multi-line products
            const centerOffset = (lines.length > 1) ? ((lines.length - 1) * 2.25) : 0;

            // Show quantity only if it's not zero OR if user chose to show zero values
            const qty = parseFloat(product.quantite);
            if (showZeroValues || qty !== 0) {
                doc.text(String(product.quantite || ''), 125, currentY + 3 + centerOffset, { align: 'center' });
            }

            doc.setFontSize(7.5);
            // Show price only if it's not zero OR if user chose to show zero values
            const price = parseFloat(product.prix_unitaire_ht);
            if (showZeroValues || price !== 0) {
                doc.text(`${formatNumberForPDF(product.prix_unitaire_ht)} DH`, 160, currentY + 3 + centerOffset, { align: 'right' });
            }

            // Show total only if it's not zero OR if user chose to show zero values
            const total = parseFloat(product.total_ht);
            if (showZeroValues || total !== 0) {
                doc.text(`${formatNumberForPDF(product.total_ht)} DH`, 188, currentY + 3 + centerOffset, { align: 'right' });
            }

            currentY += rowHeight;
        });

        // Totals section - directly below table (dynamic position)
        currentY += 10; // Add some spacing after table

        doc.setFillColor(...blueColor);
        doc.rect(110, currentY, 85, 7, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(9);
        doc.setFont(undefined, 'bold');
        doc.text('Total HT', 113, currentY + 5);
        doc.text(`${formatNumberForPDF(invoice.total_ht)} DH`, 192, currentY + 5, { align: 'right' });

        currentY += 7;
        doc.setFillColor(245, 245, 245);
        doc.rect(110, currentY, 85, 7, 'F');
        doc.setTextColor(0, 0, 0);
        doc.text(`TVA ${invoice.tva_rate}%`, 113, currentY + 5);
        doc.text(`${formatNumberForPDF(invoice.montant_tva)} DH`, 192, currentY + 5, { align: 'right' });

        currentY += 7;
        doc.setFillColor(...greenColor);
        doc.rect(110, currentY, 85, 7, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFont(undefined, 'bold');
        doc.text('Total TTC', 113, currentY + 5);
        doc.text(`${formatNumberForPDF(invoice.total_ttc)} DH`, 192, currentY + 5, { align: 'right' });

        // Add page numbering to all pages
        pages.push(pageCount);
        const totalPages = pages.length;

        for (let i = 0; i < totalPages; i++) {
            doc.setPage(i + 1);
            addFooter(i + 1, totalPages);
        }

        // Save PDF
        const docNumero = invoice.document_numero || invoice.document_numero_devis || 'N';
        const selectedCompany = JSON.parse(localStorage.getItem('selectedCompany') || '{}');
        const companyName = selectedCompany.name ? selectedCompany.name.replace(' Company', '') : 'Unknown';
        const filename = `Bon_de_travaux_${docNumero}_${invoice.client_nom}_${companyName}.pdf`;
        doc.save(filename);

        window.notify.success('Succès', 'Bon de travaux téléchargé avec succès', 3000);

    } catch (error) {
        console.error('❌ Error generating Bon de travaux PDF:', error);
        window.notify.error('Erreur', 'Impossible de générer le PDF: ' + error.message, 4000);
    }
}

// Convert number to French words
function numberToFrenchWords(number) {
    if (number === null || number === undefined) return 'zéro dirham';
    number = parseFloat(number);
    if (isNaN(number)) return 'zéro dirham';

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

// Load jsPDF library
async function loadJsPDF() {
    return new Promise((resolve, reject) => {
        if (typeof window.jspdf !== 'undefined') {
            resolve();
            return;
        }

        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
        script.onload = () => {
            console.log('✅ jsPDF loaded');
            resolve();
        };
        script.onerror = () => reject(new Error('Failed to load jsPDF'));
        document.head.appendChild(script);
    });
}

// Show bulk download modal
window.showBulkDownloadModal = function () {
    const checkedBoxes = document.querySelectorAll('.invoice-checkbox:checked');
    const selectedIds = Array.from(checkedBoxes).map(cb => cb.dataset.invoiceId);

    if (selectedIds.length === 0) {
        window.notify.warning('Attention', 'Veuillez sélectionner au moins une facture', 3000);
        return;
    }

    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.85);z-index:9999;display:flex;align-items:center;justify-content:center;animation:fadeIn 0.3s;';

    overlay.innerHTML = `
        <div style="background:#2d2d30;border-radius:12px;padding:2rem;max-width:500px;width:90%;max-height:70vh;display:flex;flex-direction:column;box-shadow:0 20px 60px rgba(0,0,0,0.9);animation:slideIn 0.3s;">
            <style>
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                @keyframes slideIn { from { transform: translateY(-30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
                .org-option { 
                    padding: 1rem; 
                    margin: 0.5rem 0; 
                    background: #1e1e1e; 
                    border: 2px solid #3e3e42; 
                    border-radius: 8px; 
                    cursor: pointer; 
                    transition: all 0.3s;
                    display: flex;
                    align-items: flex-start;
                    gap: 0.75rem;
                }
                .org-option:hover { border-color: #2196f3; background: #252526; }
                .org-option.selected { border-color: #2196f3; background: #1a3a52; }
                .org-option input[type="radio"] { 
                    margin: 0;
                    width: 18px; 
                    height: 18px; 
                    cursor: pointer;
                    flex-shrink: 0;
                    margin-top: 2px;
                }
                .org-option-content {
                    flex: 1;
                    min-width: 0;
                }
            </style>
            
            <div style="text-align:center;margin-bottom:1.5rem;flex-shrink:0;">
                <div style="font-size:3rem;margin-bottom:0.5rem;">📥</div>
                <h2 style="color:#fff;margin:0;font-size:1.5rem;font-weight:600;">Télécharger les factures</h2>
                <p style="color:#999;margin:0.5rem 0 0 0;">${selectedIds.length} facture(s) sélectionnée(s)</p>
            </div>
            
            <div style="margin-bottom:1.5rem;overflow-y:auto;flex:1;padding-right:0.5rem;">
                <div style="position:sticky;top:0;background:#2d2d30;padding-bottom:0.5rem;z-index:1;">
                    <label style="display:block;color:#2196f3;margin-bottom:1rem;font-weight:600;">Choisir l'organisation:</label>
                </div>
                
                <label class="org-option" onclick="selectOrganization(this, 'client-month-type')">
                    <input type="radio" name="organization" value="client-month-type">
                    <div class="org-option-content">
                        <strong style="color:#fff;display:block;margin-bottom:0.25rem;">Par Client → Mois → Type</strong>
                        <div style="color:#999;font-size:0.85rem;">📁 Client_Ahmed/ → 📁 2025-10/ → 📁 Facture/ → 📄 Facture_548.pdf</div>
                    </div>
                </label>
                
                <label class="org-option" onclick="selectOrganization(this, 'client-type-month')">
                    <input type="radio" name="organization" value="client-type-month">
                    <div class="org-option-content">
                        <strong style="color:#fff;display:block;margin-bottom:0.25rem;">Par Client → Type → Mois</strong>
                        <div style="color:#999;font-size:0.85rem;">📁 Client_Ahmed/ → 📁 Facture/ → 📁 2025-10/ → 📄 Facture_548.pdf</div>
                    </div>
                </label>
                
                <label class="org-option" onclick="selectOrganization(this, 'type-month-client')">
                    <input type="radio" name="organization" value="type-month-client">
                    <div class="org-option-content">
                        <strong style="color:#fff;display:block;margin-bottom:0.25rem;">Par Type → Mois → Client</strong>
                        <div style="color:#999;font-size:0.85rem;">📁 Facture/ → 📁 2025-10/ → 📁 Client_Ahmed/ → 📄 Facture_548.pdf</div>
                    </div>
                </label>
                
                <label class="org-option" onclick="selectOrganization(this, 'type-client-month')">
                    <input type="radio" name="organization" value="type-client-month">
                    <div class="org-option-content">
                        <strong style="color:#fff;display:block;margin-bottom:0.25rem;">Par Type → Client → Mois</strong>
                        <div style="color:#999;font-size:0.85rem;">📁 Facture/ → 📁 Client_Ahmed/ → 📁 2025-10/ → 📄 Facture_548.pdf</div>
                    </div>
                </label>
                
                <label class="org-option" onclick="selectOrganization(this, 'month-type-client')">
                    <input type="radio" name="organization" value="month-type-client">
                    <div class="org-option-content">
                        <strong style="color:#fff;display:block;margin-bottom:0.25rem;">Par Mois → Type → Client</strong>
                        <div style="color:#999;font-size:0.85rem;">📁 2025-10/ → 📁 Facture/ → 📁 Client_Ahmed/ → 📄 Facture_548.pdf</div>
                    </div>
                </label>
                
                <label class="org-option" onclick="selectOrganization(this, 'month-client-type')">
                    <input type="radio" name="organization" value="month-client-type">
                    <div class="org-option-content">
                        <strong style="color:#fff;display:block;margin-bottom:0.25rem;">Par Mois → Client → Type</strong>
                        <div style="color:#999;font-size:0.85rem;">📁 2025-10/ → 📁 Client_Ahmed/ → 📁 Facture/ → 📄 Facture_548.pdf</div>
                    </div>
                </label>
                
                <label class="org-option" onclick="selectOrganization(this, 'flat')">
                    <input type="radio" name="organization" value="flat" checked>
                    <div class="org-option-content">
                        <strong style="color:#fff;display:block;margin-bottom:0.25rem;">Tout dans un dossier</strong>
                        <div style="color:#999;font-size:0.85rem;">📁 Factures/ → 📄 Facture_548_Ahmed.pdf</div>
                    </div>
                </label>
            </div>
            
            <div style="display:flex;gap:1rem;flex-shrink:0;margin-top:1rem;">
                <button onclick="this.closest('.modal-overlay').remove()" 
                        style="flex:1;padding:0.75rem;background:#3e3e42;color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:1rem;font-weight:600;transition:all 0.3s;"
                        onmouseover="this.style.background='#4e4e52'" onmouseout="this.style.background='#3e3e42'">
                    Annuler
                </button>
                <button id="bulkDownloadConfirmBtn"
                        style="flex:1;padding:0.75rem;background:#2196f3;color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:1rem;font-weight:600;transition:all 0.3s;"
                        onmouseover="this.style.background='#1976d2'" onmouseout="this.style.background='#2196f3'">
                    ✓ Télécharger
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(overlay);

    // Auto-select default option
    document.querySelector('.org-option input[checked]').closest('.org-option').classList.add('selected');

    // Add click event to confirm button
    document.getElementById('bulkDownloadConfirmBtn').onclick = () => {
        const organizationType = document.querySelector('input[name="organization"]:checked').value;
        overlay.remove();
        showOrderSelectionModalBeforeDownloadMRY(selectedIds, organizationType);
    };
};

// Select organization option
window.selectOrganization = function (element, value) {
    document.querySelectorAll('.org-option').forEach(opt => opt.classList.remove('selected'));
    element.classList.add('selected');
    element.querySelector('input').checked = true;
};

// Show unified options modal before bulk download for MRY - ALL options in ONE modal
window.showOrderSelectionModalBeforeDownloadMRY = function (selectedIds, organizationType) {
    const selectionOverlay = document.createElement('div');
    selectionOverlay.className = 'custom-modal-overlay';
    selectionOverlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.95);z-index:10000;display:flex;align-items:center;justify-content:center;';

    selectionOverlay.innerHTML = `
        <div class="custom-modal" style="max-width:500px;">
            <div class="custom-modal-header">
                <span class="custom-modal-icon info">⚙️</span>
                <h3 class="custom-modal-title">Paramètres de téléchargement</h3>
                <p style="color:#999;font-size:0.85rem;margin-top:0.5rem;">${selectedIds.length} facture(s) sélectionnée(s)</p>
            </div>
            <div class="custom-modal-body" style="max-height:60vh;overflow-y:auto;">
                <p style="margin-bottom:1.25rem;color:#e0e0e0;font-size:0.95rem;font-weight:600;">Ces paramètres seront appliqués à TOUS les PDFs:</p>
                
                <label style="display:flex;align-items:center;cursor:pointer;padding:1rem;background:#1e1e1e;border:2px solid #3e3e42;border-radius:10px;transition:all 0.2s ease;margin-bottom:0.75rem;">
                    <input type="checkbox" id="includeOrderCheckboxDownloadMRY" checked style="width:20px;height:20px;margin-right:1rem;cursor:pointer;accent-color:#2196F3;">
                    <span style="font-size:0.95rem;color:#e0e0e0;font-weight:500;">📋 Afficher les N° Order</span>
                </label>

                <label style="display:flex;align-items:center;cursor:pointer;padding:1rem;background:#1e1e1e;border:2px solid #3e3e42;border-radius:10px;transition:all 0.2s ease;margin-bottom:0.75rem;">
                    <input type="checkbox" id="includeSignatureCheckboxDownloadMRY" checked style="width:20px;height:20px;margin-right:1rem;cursor:pointer;accent-color:#2196F3;">
                    <span style="font-size:0.95rem;color:#e0e0e0;font-weight:500;">✍️ Inclure la signature (pour DEVIS)</span>
                </label>

                <label style="display:flex;align-items:center;cursor:pointer;padding:1rem;background:#1e1e1e;border:2px solid #3e3e42;border-radius:10px;transition:all 0.2s ease;margin-bottom:0.75rem;">
                    <input type="checkbox" id="includeZeroProductsCheckboxDownloadMRY" style="width:20px;height:20px;margin-right:1rem;cursor:pointer;accent-color:#2196F3;">
                    <span style="font-size:0.95rem;color:#e0e0e0;font-weight:500;">0️⃣ Afficher les produits avec quantité/prix = 0</span>
                </label>

                <div style="padding:1rem;background:#1e1e1e;border:2px solid #3e3e42;border-radius:10px;margin-bottom:0.75rem;">
                    <label style="display:block;margin-bottom:0.8rem;color:#e0e0e0;font-weight:600;font-size:0.95rem;">🔤 Taille de police des Notes:</label>
                    <div style="display:flex;gap:0.5rem;background:#2d2d30;padding:0.5rem;border-radius:8px;">
                        <label style="flex:1;display:flex;flex-direction:column;align-items:center;cursor:pointer;padding:0.5rem;border-radius:6px;transition:all 0.2s;">
                            <input type="radio" name="fontSizeBulkDownloadMRY" value="small" style="margin-bottom:0.4rem;cursor:pointer;">
                            <span style="font-size:0.75rem;color:#999;">Petit</span>
                        </label>
                        <label style="flex:1;display:flex;flex-direction:column;align-items:center;cursor:pointer;padding:0.5rem;border-radius:6px;transition:all 0.2s;background:#3e3e42;">
                            <input type="radio" name="fontSizeBulkDownloadMRY" value="medium" checked style="margin-bottom:0.4rem;cursor:pointer;">
                            <span style="font-size:0.85rem;color:#fff;">Moyen</span>
                        </label>
                        <label style="flex:1;display:flex;flex-direction:column;align-items:center;cursor:pointer;padding:0.5rem;border-radius:6px;transition:all 0.2s;">
                            <input type="radio" name="fontSizeBulkDownloadMRY" value="large" style="margin-bottom:0.4rem;cursor:pointer;">
                            <span style="font-size:0.95rem;color:#999;">Grand</span>
                        </label>
                        <label style="flex:1;display:flex;flex-direction:column;align-items:center;cursor:pointer;padding:0.5rem;border-radius:6px;transition:all 0.2s;">
                            <input type="radio" name="fontSizeBulkDownloadMRY" value="xlarge" style="margin-bottom:0.4rem;cursor:pointer;">
                            <span style="font-size:1.05rem;color:#999;">Très G.</span>
                        </label>
                    </div>
                </div>
            </div>
            <div class="custom-modal-footer">
                <button class="custom-modal-btn secondary" id="cancelBtnDownloadMRY" style="padding:0.75rem 2rem;font-size:1rem;">Annuler</button>
                <button class="custom-modal-btn primary" id="continueBtnDownloadMRY" style="padding:0.75rem 2rem;font-size:1rem;">Télécharger</button>
            </div>
        </div>
    `;

    document.body.appendChild(selectionOverlay);

    const fontSizeRadios = selectionOverlay.querySelectorAll('input[name="fontSizeBulkDownloadMRY"]');
    fontSizeRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            fontSizeRadios.forEach(r => {
                r.parentElement.style.background = 'transparent';
                r.parentElement.querySelector('span').style.color = '#999';
            });
            if (e.target.checked) {
                e.target.parentElement.style.background = '#3e3e42';
                e.target.parentElement.querySelector('span').style.color = '#fff';
            }
        });
    });

    selectionOverlay.querySelector('#continueBtnDownloadMRY').addEventListener('click', async () => {
        const opts = {
            includeOrder: selectionOverlay.querySelector('#includeOrderCheckboxDownloadMRY').checked,
            includeSignature: selectionOverlay.querySelector('#includeSignatureCheckboxDownloadMRY').checked,
            includeZeroProducts: selectionOverlay.querySelector('#includeZeroProductsCheckboxDownloadMRY').checked,
            selectedFontSize: selectionOverlay.querySelector('input[name="fontSizeBulkDownloadMRY"]:checked').value
        };
        console.log('✅ [MRY BULK DOWNLOAD] Options:', opts);
        selectionOverlay.remove();
        await startBulkDownload(selectedIds, organizationType, opts);
    });

    selectionOverlay.querySelector('#cancelBtnDownloadMRY').addEventListener('click', () => selectionOverlay.remove());

    selectionOverlay.addEventListener('click', (e) => {
        if (e.target === selectionOverlay) selectionOverlay.remove();
    });

    setTimeout(() => selectionOverlay.querySelector('#continueBtnDownloadMRY').focus(), 100);
};

// Load JSZip library
async function loadJSZip() {
    return new Promise((resolve, reject) => {
        if (typeof window.JSZip !== 'undefined') {
            resolve();
            return;
        }

        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js';
        script.onload = () => {
            console.log('✅ JSZip loaded');
            resolve();
        };
        script.onerror = () => reject(new Error('Failed to load JSZip'));
        document.head.appendChild(script);
    });
}

// Start bulk download with loading indicator and progress bar
window.startBulkDownload = async function (selectedIds, organizationType, options = {}) {
    try {
        const {
            includeOrder = true,
            includeSignature = true,
            includeZeroProducts = false,
            selectedFontSize = 'medium'
        } = options;

        // Close modal
        document.querySelector('.modal-overlay')?.remove();

        // Create loading overlay with progress bar
        const loadingOverlay = document.createElement('div');
        loadingOverlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.95);z-index:10001;display:flex;align-items:center;justify-content:center;';
        loadingOverlay.innerHTML = `
            <div style="background:#2d2d30;border-radius:12px;padding:2rem;max-width:400px;width:90%;box-shadow:0 20px 60px rgba(0,0,0,0.9);">
                <div style="text-align:center;margin-bottom:1.5rem;">
                    <div style="font-size:3rem;margin-bottom:0.5rem;animation:spinMRY 1s linear infinite;">⚙️</div>
                    <h3 style="color:#fff;margin:0;font-size:1.2rem;font-weight:600;">Téléchargement en cours</h3>
                    <p style="color:#999;margin-top:0.5rem;font-size:0.9rem;">Génération des PDFs...</p>
                </div>
                <div style="margin-bottom:1rem;">
                    <div style="display:flex;justify-content:space-between;margin-bottom:0.5rem;">
                        <span style="color:#e0e0e0;font-size:0.9rem;">Progression</span>
                        <span id="progressTextMRY" style="color:#2196F3;font-size:0.9rem;font-weight:600;">0/${selectedIds.length}</span>
                    </div>
                    <div style="background:#1e1e1e;border-radius:8px;height:8px;overflow:hidden;border:1px solid #3e3e42;">
                        <div id="progressBarMRY" style="background:linear-gradient(90deg, #2196F3, #21CBF3);height:100%;width:0%;transition:width 0.3s ease;"></div>
                    </div>
                </div>
                <style>@keyframes spinMRY { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }</style>
            </div>
        `;
        document.body.appendChild(loadingOverlay);

        // Load libraries
        if (typeof window.jspdf === 'undefined') {
            await loadJsPDF();
        }
        await loadJSZip();

        // Create ZIP file
        const zip = new JSZip();
        const timestamp = (window.todayDateString ? window.todayDateString() : new Date().toISOString().split('T')[0]);
        const folderName = `Factures_Export_${timestamp}`;

        let successCount = 0;
        const progressText = loadingOverlay.querySelector('#progressTextMRY');
        const progressBar = loadingOverlay.querySelector('#progressBarMRY');

        for (let index = 0; index < selectedIds.length; index++) {
            const id = selectedIds[index];
            try {
                // Use the EXACT SAME function as single download with skipModals
                const pdfBlob = await window.downloadInvoicePDF(id, true, {
                    includeOrder,
                    includeSignature,
                    includeZeroProducts,
                    selectedFontSize,
                    skipModals: true
                });

                if (!pdfBlob) continue;

                const result = await window.electron.db.getInvoiceById(id);
                if (!result.success || !result.data) continue;
                const invoice = result.data;

                const invoiceDate = (window.safeParseDate||function(d){return new Date(d)})(invoice.document_date);
                const yearMonth = `${invoiceDate.getFullYear()}-${String(invoiceDate.getMonth() + 1).padStart(2, '0')}`;
                const clientName = invoice.client_nom.replace(/[^a-zA-Z0-9]/g, '_');
                const numero = (invoice.document_numero || invoice.document_numero_devis || invoice.id).replace(/\//g, '_');

                const docType = invoice.document_type === 'facture' ? 'Factures' : 'Devis';
                const docPrefix = invoice.document_type === 'facture' ? 'Facture' : 'Devis';
                const filename = `${docPrefix}_${numero}_${clientName}.pdf`;

                let zipPath = '';
                if (organizationType === 'client-month-type') {
                    zipPath = `${clientName}/${yearMonth}/${docType}/${filename}`;
                } else if (organizationType === 'client-type-month') {
                    zipPath = `${clientName}/${docType}/${yearMonth}/${filename}`;
                } else if (organizationType === 'type-month-client') {
                    zipPath = `${docType}/${yearMonth}/${clientName}/${filename}`;
                } else if (organizationType === 'type-client-month') {
                    zipPath = `${docType}/${clientName}/${yearMonth}/${filename}`;
                } else if (organizationType === 'month-type-client') {
                    zipPath = `${yearMonth}/${docType}/${clientName}/${filename}`;
                } else if (organizationType === 'month-client-type') {
                    zipPath = `${yearMonth}/${clientName}/${docType}/${filename}`;
                } else {
                    zipPath = `${docType}/${filename}`;
                }

                zip.file(zipPath, pdfBlob);
                successCount++;

                // Update progress
                const progress = ((index + 1) / selectedIds.length) * 100;
                progressBar.style.width = progress + '%';
                progressText.textContent = `${index + 1}/${selectedIds.length}`;
            } catch (error) {
                console.error(`Error generating PDF for invoice ${id}:`, error);
            }
        }

        // Update loading text
        loadingOverlay.querySelector('h3').textContent = 'Création du fichier ZIP...';
        loadingOverlay.querySelector('p').textContent = 'Compression en cours...';

        const zipBlob = await zip.generateAsync({ type: 'blob' });

        const link = document.createElement('a');
        link.href = URL.createObjectURL(zipBlob);
        link.download = `${folderName}.zip`;
        link.click();
        URL.revokeObjectURL(link.href);

        loadingOverlay.remove();

        window.notify.success('Succès', `${successCount} PDF(s) téléchargé(s) dans ${folderName}.zip`, 4000);

        // Uncheck all checkboxes
        document.querySelectorAll('.invoice-checkbox').forEach(cb => cb.checked = false);
        document.getElementById('selectAllInvoices').checked = false;
        updateSelectedCount();

    } catch (error) {
        console.error('Error in bulk download:', error);
        window.notify.error('Erreur', 'Erreur lors du téléchargement: ' + error.message, 5000);
    }
};

// Generate single PDF as Blob (for ZIP) - using the same logic as downloadInvoicePDF
async function generateSinglePDFBlob(invoice, organizationType, folderName, includeOrder = true) {
    // Use the exact same PDF generation logic as downloadInvoicePDF
    // Create a temporary invoice object with includeOrder setting
    const tempInvoice = { ...invoice };
    
    // Apply includeOrder setting
    if (invoice.document_type === 'facture' && !includeOrder) {
        tempInvoice.document_numero_Order = null;
    }

    // For bulk download, use default settings
    const includeSignature = invoice.document_type === 'devis'; // Include signature for devis
    const includeZeroProducts = false; // Don't include zero products in bulk
    const notesFontSize = 'medium'; // Default font size

    // Load signature
    const signatureImgMRY = await loadMRYSignature();

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Load editable PDF text
    const pdfText = await window.loadCompanyPdfText('MRY');

    // Colors
    const blueColor = [33, 97, 140];
    const greenColor = [16, 172, 132];
    const orangeColor = [255, 152, 0];
    const dateStr = (window.safeParseDate||function(d){return new Date(d)})(tempInvoice.document_date).toLocaleDateString('fr-FR');

    // Function to add header to any page (same as downloadInvoicePDF)
    const addHeader = (isFirstPage = true) => {
        try {
            const logoImg = document.querySelector('img[src*="mry.png"]') ||
                document.querySelector('img[data-asset="mry"]') ||
                document.querySelector('img[src^="data:image"]');
            if (logoImg && logoImg.src && logoImg.src.startsWith('data:')) {
                doc.addImage(logoImg.src, 'PNG', 15, 10, 35, 35);
            }
        } catch (error) { }

        doc.setFontSize(18);
        doc.setTextColor(...blueColor);
        doc.setFont(undefined, 'bold');
        doc.text(pdfText.company_name || 'MRY TRAV SARL (AU)', 105, 20, { align: 'center' });

        doc.setFontSize(10);
        doc.setFont(undefined, 'normal');
        doc.setTextColor(0, 0, 0);
        doc.text(pdfText.header_line1 || 'TRAVAUX DIVERS DE CONSTRUCTION', 105, 27, { align: 'center' });
        doc.text(pdfText.header_line2 || 'VENTE DE MATERIAUX DE CONSTRUCTION', 105, 32, { align: 'center' });
        doc.text(pdfText.header_line3 || 'VENTE DE QUINCAILLERIE & DE DROGUERIE', 105, 37, { align: 'center' });

        doc.setFontSize(11);
        doc.setFont(undefined, 'bold');
        doc.text('CLIENT :', 15, 50);
        doc.setTextColor(...greenColor);
        doc.text(invoice.client_nom, 40, 50);

        // Only show ICE if it exists and is not "0"
        if (invoice.client_ice && invoice.client_ice !== '0') {
            doc.setTextColor(0, 0, 0);
            doc.text('ICE :', 15, 57);
            doc.setTextColor(...greenColor);
            doc.text(invoice.client_ice, 40, 57);
        }

        doc.setTextColor(0, 0, 0);
        doc.text(`Date: ${dateStr}`, 150, 50);

        doc.setFontSize(14);
        doc.setFont(undefined, 'bold');

        // Show correct label based on document type
        const docLabel = invoice.document_type === 'devis' ? 'DEVIS N°:' : 'FACTURE N°:';
        const docNumero = invoice.document_type === 'devis'
            ? (invoice.document_numero_devis || invoice.document_numero || '-')
            : (invoice.document_numero || invoice.document_numero_devis || '-');

        doc.text(docLabel, 15, 70);
        doc.setTextColor(...orangeColor);
        doc.text(docNumero, 55, 70);

        if (includeOrder && invoice.document_numero_Order) {
            doc.setFontSize(12);
            doc.setFont(undefined, 'bold');
            doc.setTextColor(0, 0, 0);
            doc.text('N° Order :', 15, 77);
            doc.setTextColor(33, 150, 243);
            doc.text(invoice.document_numero_Order, 42, 77);
        }
    };

    const addFooter = (pageNum, totalPages) => {
        // Add signature image above footer (right side) - ONLY FOR DEVIS AND IF USER APPROVED
        if (signatureImgMRY && tempInvoice.document_type === 'devis' && includeSignature) {
            doc.addImage(signatureImgMRY, 'PNG', 135, 230, 57, 40);
        }

        doc.setTextColor(0, 0, 0);
        doc.setFontSize(7);
        doc.setFont(undefined, 'normal');
        doc.text(pdfText.footer_line1 || 'NIF : 25077370  TP : 51200166  R.C : 23181  CNSS : 5679058  ICE : 002036664000051', 105, 275, { align: 'center' });
        doc.text(pdfText.footer_line2 || 'R.I.B : 007 720 0005973000000519 74  ATTIJARI WAFA BANK', 105, 279, { align: 'center' });
        doc.text(pdfText.footer_line3 || 'AV, BNI IDDER RUE 14 N°10 COELMA - TÉTOUAN.', 105, 283, { align: 'center' });
        doc.text(pdfText.footer_line4 || 'EMAIL: errbahiabderrahim@gmail.com  TEL : 0661307323', 105, 287, { align: 'center' });

        // Page numbering
        if (pageNum && totalPages) {
            doc.setFontSize(8);
            doc.setTextColor(128, 128, 128);
            doc.text(`Page ${pageNum} / ${totalPages}`, 105, 293, { align: 'center' });
        }
    };

    addHeader();

    // Add products table (simplified version)
    const startY = (includeOrder && invoice.document_numero_Order) ? 85 : 80;
    doc.setFillColor(...blueColor);
    doc.rect(15, startY, 180, 8, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(9);
    doc.setFont(undefined, 'bold');
    doc.text('Désignation', 18, startY + 5.5);
    doc.text('QTE', 125, startY + 5.5, { align: 'center' });
    doc.text('PU HT', 160, startY + 5.5, { align: 'right' });
    doc.text('TOTAL HT', 188, startY + 5.5, { align: 'right' });

    let currentY = startY + 10;
    doc.setTextColor(0, 0, 0);
    doc.setFont(undefined, 'normal');
    doc.setFontSize(9);

    let pageCount = 1;
    const pages = [];

    tempInvoice.products.forEach((product, index) => {
        const designation = product.designation || '';
        const lines = doc.splitTextToSize(designation, 85);
        const rowHeight = Math.max(8, (lines.length * 4.5) + 4);

        if (currentY + rowHeight > 215) {
            pages.push(pageCount);
            doc.addPage();
            addHeader();
            pageCount++;

            // Re-draw table header on new page
            let newStartY = 80;
            if (tempInvoice.document_numero_Order) newStartY += 7;

            doc.setFillColor(...blueColor);
            doc.rect(15, newStartY, 180, 8, 'F');
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(9);
            doc.setFont(undefined, 'bold');
            doc.text('Désignation', 18, newStartY + 5.5);
            doc.text('QTE', 125, newStartY + 5.5, { align: 'center' });
            doc.text('PU HT', 160, newStartY + 5.5, { align: 'right' });
            doc.text('TOTAL HT', 188, newStartY + 5.5, { align: 'right' });

            currentY = newStartY + 10;
            doc.setTextColor(0, 0, 0);
            doc.setFont(undefined, 'normal');
            doc.setFontSize(9);
        }

        if (index % 2 === 0) {
            doc.setFillColor(245, 245, 245);
            doc.rect(15, currentY - 3, 180, rowHeight, 'F');
        }

        doc.setFontSize(8);
        // Draw each line separately with proper spacing - show full text
        lines.forEach((line, lineIndex) => {
            doc.text(line, 18, currentY + 3 + (lineIndex * 4.5));
        });

        // Center vertically for multi-line products
        const centerOffset = (lines.length > 1) ? ((lines.length - 1) * 2.25) : 0;

        // Show quantity only if it's not zero (bulk PDF always shows all values)
        const qty = parseFloat(product.quantite);
        if (qty !== 0) {
            doc.text(String(product.quantite || ''), 125, currentY + 3 + centerOffset, { align: 'center' });
        }

        doc.setFontSize(7.5);
        // Show price only if it's not zero
        const price = parseFloat(product.prix_unitaire_ht);
        if (price !== 0) {
            doc.text(`${formatNumberForPDF(product.prix_unitaire_ht)} DH`, 160, currentY + 3 + centerOffset, { align: 'right' });
        }

        // Show total only if it's not zero
        const total = parseFloat(product.total_ht);
        if (total !== 0) {
            doc.text(`${formatNumberForPDF(product.total_ht)} DH`, 188, currentY + 3 + centerOffset, { align: 'right' });
        }

        currentY += rowHeight;
    });

    // Add totals
    currentY += 10;

    doc.setFillColor(245, 245, 245);
    doc.rect(110, currentY, 85, 8, 'F');
    doc.setFont(undefined, 'bold');
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(9);
    doc.text('TOTAL HT :', 113, currentY + 5.5);
    doc.setFontSize(8);
    doc.text(`${formatNumberForPDF(invoice.total_ht)} DH`, 192, currentY + 5.5, { align: 'right' });

    // MONTANT TVA and T.T.C (Only if TVA > 0)
    if (parseFloat(invoice.tva_rate) > 0) {
        currentY += 8;
        doc.setFillColor(255, 255, 255);
        doc.rect(110, currentY, 85, 8, 'F');
        doc.setFontSize(9);
        doc.text(`MONTANT TVA ${invoice.tva_rate}% :`, 113, currentY + 5.5);
        doc.setFontSize(8);
        doc.text(`${formatNumberForPDF(invoice.montant_tva)} DH`, 192, currentY + 5.5, { align: 'right' });

        currentY += 8;
        doc.setFillColor(173, 216, 230);
        doc.rect(110, currentY, 85, 8, 'F');
        doc.setTextColor(...blueColor);
        doc.setFontSize(9);
        doc.text('MONTANT T.T.C :', 113, currentY + 5.5);
        doc.setFontSize(8.5);
        doc.text(`${formatNumberForPDF(invoice.total_ttc)} DH`, 192, currentY + 5.5, { align: 'right' });
    }

    currentY += 15;
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(9);
    doc.setFont(undefined, 'italic');
    const amountInWords = numberToFrenchWords(invoice.total_ttc);
    const docTypeText = invoice.document_type === 'facture' ? 'Facture' : 'Devis';
    const amountText = `La Présente ${docTypeText} est Arrêtée à la somme de : ${amountInWords}`;
    const amountLines = doc.splitTextToSize(amountText, 180);
    
    amountLines.forEach(line => {
        doc.text(line, 15, currentY);
        currentY += 4.5;
    });

    // Add notes if invoice has an id (for bulk download, notes might not be loaded)
    if (invoice.id) {
        try {
            const noteResult = await window.electron.db.getNote(invoice.id);
            if (noteResult.success && noteResult.data) {
                currentY += 15;
                doc.setFontSize(8);
                doc.setFont(undefined, 'bold');
                doc.setTextColor(96, 125, 139);
                doc.text('Notes:', 15, currentY);

                doc.setFont(undefined, 'bold');
                doc.setTextColor(0, 0, 0);
                doc.setFontSize(9);
                const noteLines = doc.splitTextToSize(noteResult.data, 180);
                const footerTopY = 270;
                let lineY = currentY + 4;
                for (let i = 0; i < noteLines.length; i++) {
                    if (lineY > footerTopY) {
                        pages.push(pageCount);
                        doc.addPage();
                        addHeader();
                        pageCount++;
                        // start continuation on new page below header
                        const notesStartY = tempInvoice.document_numero_Order ? 95 : 88;
                        doc.setFontSize(8);
                        doc.setFont(undefined, 'bold');
                        doc.setTextColor(96, 125, 139);
                        doc.text('Notes (suite) :', 15, notesStartY - 4);
                        doc.setTextColor(0, 0, 0);
                        doc.setFont(undefined, 'bold');
                        doc.setFontSize(9);
                        lineY = notesStartY;
                    }
                    doc.text(noteLines[i], 15, lineY);
                    lineY += 4.5;
                }
            }
        } catch (error) {
            console.log('Note not loaded for bulk PDF:', error);
        }
    }

    // Add page numbering to all pages
    pages.push(pageCount);
    const totalPages = pages.length;

    for (let i = 0; i < totalPages; i++) {
        doc.setPage(i + 1);
        addFooter(i + 1, totalPages);
    }

    // Return PDF as Blob instead of downloading
    return doc.output('blob');
};

// Update selected invoices count
function updateSelectedCount() {
    const checkboxes = document.querySelectorAll('.invoice-checkbox:checked');
    const count = checkboxes.length;
    const selectedCountSpan = document.getElementById('selectedCount');
    const selectedDeleteCountSpan = document.getElementById('selectedDeleteCount');
    const bulkDownloadBtn = document.getElementById('bulkDownloadBtn');
    const bulkDeleteBtn = document.getElementById('bulkDeleteBtnMRY');

    if (selectedCountSpan) selectedCountSpan.textContent = count;
    if (selectedDeleteCountSpan) selectedDeleteCountSpan.textContent = count;
    if (bulkDownloadBtn) {
        bulkDownloadBtn.style.display = count > 0 ? 'block' : 'none';
    }
    if (bulkDeleteBtn) {
        bulkDeleteBtn.style.display = count > 0 ? 'block' : 'none';
    }
}

// Select/Deselect all invoices
document.addEventListener('change', (e) => {
    if (e.target.id === 'selectAllInvoices') {
        const checkboxes = document.querySelectorAll('.invoice-checkbox');
        checkboxes.forEach(cb => cb.checked = e.target.checked);
        updateSelectedCount();
    } else if (e.target.classList.contains('invoice-checkbox')) {
        updateSelectedCount();

        // Update "select all" checkbox
        const allCheckboxes = document.querySelectorAll('.invoice-checkbox');
        const checkedCheckboxes = document.querySelectorAll('.invoice-checkbox:checked');
        const selectAllCheckbox = document.getElementById('selectAllInvoices');
        if (selectAllCheckbox) {
            selectAllCheckbox.checked = allCheckboxes.length === checkedCheckboxes.length && allCheckboxes.length > 0;
        }
    }
});

// Export database
window.exportDatabaseMRY = async function () {
    try {
        window.notify.info('Export', 'Exportation en cours...', 2000);
        const result = await window.electron.db.exportDatabase();

        if (result.success) {
            window.notify.success('Succès', 'Base de données exportée avec succès!', 3000);
        } else if (result.canceled) {
            window.notify.warning('Annulé', 'Exportation annulée', 2000);
        } else {
            window.notify.error('Erreur', result.error || 'Échec de l\'exportation', 3000);
        }
    } catch (error) {
        console.error('Export error:', error);
        window.notify.error('Erreur', 'Une erreur est survenue', 3000);
    }
}

// Import database
window.importDatabaseMRY = async function () {
    const confirmed = await customConfirm('Attention', '⚠️ ATTENTION: L\'importation remplacera toutes les données actuelles.\n\nUne sauvegarde automatique sera créée.\n\nVoulez-vous continuer?', 'warning');

    if (!confirmed) return;

    try {
        window.notify.info('Import', 'Importation en cours...', 2000);
        const result = await window.electron.db.importDatabase();

        if (result.success) {
            window.notify.success('Succès', 'Base de données importée! Rechargement...', 3000);
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } else if (result.canceled) {
            window.notify.warning('Annulé', 'Importation annulée', 2000);
        } else {
            window.notify.error('Erreur', result.error || 'Échec de l\'importation', 3000);
        }
    } catch (error) {
        console.error('Import error:', error);
        window.notify.error('Erreur', 'Une erreur est survenue', 3000);
    }
}

// Toggle Featured Status MRY (from table row)
window.toggleFeaturedMRY = async function (invoiceId, element) {
    try {
        const currentFeatured = element.dataset.featured === '1';
        const newFeatured = currentFeatured ? 0 : 1;

        const result = await window.electron.db.updateInvoiceMetadata(invoiceId, {
            is_featured: newFeatured
        });

        if (result.success) {
            const inv = allInvoices.find(i => i.id == invoiceId);
            if (inv) inv.is_featured = newFeatured;
            const filteredInv = filteredInvoices.find(i => i.id == invoiceId);
            if (filteredInv) filteredInv.is_featured = newFeatured;

            element.dataset.featured = newFeatured ? '1' : '0';
            element.textContent = newFeatured ? '⭐' : '☆';
            element.style.filter = newFeatured ? 'none' : 'grayscale(1) opacity(0.3)';
            element.title = newFeatured ? 'Retirer des importantes' : 'Marquer comme importante';
        } else {
            window.notify.error('Erreur', 'Échec de la mise à jour');
        }
    } catch (error) {
        console.error('Toggle featured error:', error);
        window.notify.error('Erreur', 'Une erreur est survenue');
    }
};

// Toggle Featured Status MRY (from modal details)
window.toggleFeaturedInModalMRY = async function (invoiceId, buttonElement) {
    try {
        const currentFeatured = buttonElement.dataset.featured === '1';
        const newFeatured = currentFeatured ? 0 : 1;

        const result = await window.electron.db.updateInvoiceMetadata(invoiceId, {
            is_featured: newFeatured
        });

        if (result.success) {
            const inv = allInvoices.find(i => i.id == invoiceId);
            if (inv) inv.is_featured = newFeatured;
            const filteredInv = filteredInvoices.find(i => i.id == invoiceId);
            if (filteredInv) filteredInv.is_featured = newFeatured;

            buttonElement.dataset.featured = newFeatured ? '1' : '0';
            buttonElement.style.background = newFeatured ? '#ffa726' : '#666';
            buttonElement.querySelector('span').textContent = newFeatured ? '⭐' : '☆';
            buttonElement.childNodes[2].textContent = newFeatured ? 'Retirer des importantes' : 'Marquer comme importante';

            const tableStarElement = document.querySelector(`span[onclick*="toggleFeaturedMRY(${invoiceId}"]`);
            if (tableStarElement) {
                tableStarElement.dataset.featured = newFeatured ? '1' : '0';
                tableStarElement.textContent = newFeatured ? '⭐' : '☆';
                tableStarElement.style.filter = newFeatured ? 'none' : 'grayscale(1) opacity(0.3)';
                tableStarElement.title = newFeatured ? 'Retirer des importantes' : 'Marquer comme importante';
            }

            window.notify.success('Succès', newFeatured ? 'Facture marquée comme importante' : 'Facture retirée des importantes');
        } else {
            window.notify.error('Erreur', 'Échec de la mise à jour');
        }
    } catch (error) {
        console.error('Toggle featured in modal error:', error);
        window.notify.error('Erreur', 'Une erreur est survenue');
    }
};

// Handle bulk delete for MRY
// Update AR Status
window.updateArStatusMRY = async function (id, status) {
    try {
        const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
        const result = await window.electron.db.updateInvoice(id, {
            ar_status: status,
            updated_by_user_id: currentUser.id || null,
            updated_by_user_name: currentUser.name || null,
            updated_by_user_email: currentUser.email || null
        });

        if (result.success) {
            // Update UI feedback immediately
            window.notify.success('Succès', 'Statut Accusé R. mis à jour');

            // Update local state immediately in both arrays
            const inv = allInvoices.find(i => i.id == id);
            if (inv) {
                inv.ar_status = status;
                inv.is_modified = true;
                inv.updated_by_user_name = currentUser.name || inv.updated_by_user_name;
            }
            const filteredInv = filteredInvoices.find(i => i.id == id);
            if (filteredInv) {
                filteredInv.ar_status = status;
                filteredInv.is_modified = true;
                filteredInv.updated_by_user_name = currentUser.name || filteredInv.updated_by_user_name;
            }
            
            // Re-render the display with updated data (no full reload needed)
            displayInvoices(filteredInvoices);
        } else {
            console.error('Update AR error:', result.error);
            window.notify.error('Erreur', 'Échec de la mise à jour: ' + result.error);
        }
    } catch (error) {
        console.error('Update AR exception:', error);
        window.notify.error('Erreur', 'Une erreur est survenue');
    }
};

// Handle payment status change from dropdown - show modal for Payé
window.handlePaymentChangeMRY = function(id, value, selectEl, previousStatus) {
    if (value === 'payé') {
        selectEl.value = previousStatus === 'payé' ? 'payé' : 'en attente de paiement';
        selectEl.style.background = previousStatus === 'payé' ? '#4caf50' : '#f44336';
        window.showEditPaymentModalMRY(id, previousStatus || 'en attente de paiement', '');
    } else {
        window.updatePaymentStatusMRY(id, value);
        selectEl.style.background = '#f44336';
    }
};

// Update Payment Status for MRY
window.updatePaymentStatusMRY = async function (id, status) {
    try {
        const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
        const result = await window.electron.db.updateInvoice(id, {
            payment_status: status,
            payment_method: status === 'payé' ? null : null,
            updated_by_user_id: currentUser.id || null,
            updated_by_user_name: currentUser.name || null,
            updated_by_user_email: currentUser.email || null
        });

        if (result.success) {
            window.notify.success('Succès', 'Statut de paiement mis à jour');

            const inv = allInvoices.find(i => i.id == id);
            if (inv) {
                inv.payment_status = status;
                if (status !== 'payé') inv.payment_method = null;
            }
            const filteredInv = filteredInvoices.find(i => i.id == id);
            if (filteredInv) {
                filteredInv.payment_status = status;
                if (status !== 'payé') filteredInv.payment_method = null;
            }

            displayInvoices(filteredInvoices);
        } else {
            console.error('Update payment status error:', result.error);
            window.notify.error('Erreur', 'Échec de la mise à jour: ' + result.error);
        }
    } catch (error) {
        console.error('Update payment status exception:', error);
        window.notify.error('Erreur', 'Une erreur est survenue');
    }
};

// Bulk reset: convert all "sans_accuse" to empty
window.bulkResetArStatusMRY = async function () {
    const toReset = allInvoices.filter(inv => inv.ar_status === 'sans_accuse' && inv.document_type !== 'devis');
    if (toReset.length === 0) {
        window.notify.info('Info', 'Aucune facture avec "Sans accusé" trouvée.', 3000);
        return;
    }
    if (!confirm(`Convertir ${toReset.length} facture(s) de "Sans accusé" → vide ?`)) return;

    let success = 0;
    for (const inv of toReset) {
        try {
            const result = await window.electron.db.updateInvoice(inv.id, { ar_status: '' });
            if (result.success) { inv.ar_status = ''; success++; }
        } catch (e) { console.warn('Reset AR error for', inv.id, e); }
    }
    window.notify.success('✅', `${success}/${toReset.length} facture(s) mises à jour.`, 3000);
    loadInvoices();
};

window.handleBulkDeleteMRY = async function () {
    const checkedBoxes = document.querySelectorAll('.invoice-checkbox:checked');

    if (checkedBoxes.length === 0) {
        window.notify.error('Erreur', 'Veuillez sélectionner au moins un document', 3000);
        return;
    }

    const count = checkedBoxes.length;
    const confirmMessage = `Êtes-vous sûr de vouloir supprimer ${count} document(s) ?\n\nCette action est irréversible.`;

    const confirmed = await customConfirm('Confirmation', confirmMessage, 'warning');
    if (!confirmed) {
        return;
    }

    // Create progress modal
    const progressOverlay = document.createElement('div');
    progressOverlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.85);z-index:10000;display:flex;align-items:center;justify-content:center;';

    let cancelRequested = false;

    progressOverlay.innerHTML = `
        <div style="background:#2d2d30;border-radius:12px;padding:2rem;min-width:400px;box-shadow:0 20px 60px rgba(0,0,0,0.9);">
            <h3 style="color:#fff;margin:0 0 1.5rem 0;font-size:1.2rem;display:flex;align-items:center;gap:0.5rem;">
                <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                </svg>
                Suppression en cours...
            </h3>
            <div style="background:#1e1e1e;border-radius:8px;height:30px;overflow:hidden;margin-bottom:1rem;">
                <div id="deleteProgressBarMRY" style="background:linear-gradient(90deg, #f44336, #e91e63);height:100%;width:0%;transition:width 0.3s;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:600;font-size:0.9rem;"></div>
            </div>
            <p id="deleteProgressTextMRY" style="color:#aaa;margin:0 0 1rem 0;text-align:center;font-size:0.95rem;">Préparation...</p>
            <div style="text-align:center;">
                <button id="cancelDeleteBtnMRY" style="padding:0.75rem 1.5rem;background:#ff9800;color:#fff;border:none;border-radius:6px;cursor:pointer;font-weight:600;font-size:0.95rem;transition:all 0.3s;" onmouseover="this.style.background='#f57c00'" onmouseout="this.style.background='#ff9800'">
                    ⚠️ Annuler
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(progressOverlay);

    const progressBar = document.getElementById('deleteProgressBarMRY');
    const progressText = document.getElementById('deleteProgressTextMRY');
    const cancelBtn = document.getElementById('cancelDeleteBtnMRY');

    // Handle cancel button
    cancelBtn.addEventListener('click', () => {
        cancelRequested = true;
        cancelBtn.disabled = true;
        cancelBtn.style.background = '#666';
        cancelBtn.textContent = '⏸️ Annulation...';
        progressText.textContent = 'Annulation en cours...';
    });

    try {
        let successCount = 0;
        let errorCount = 0;

        const selectedInvoices = Array.from(checkedBoxes).map(cb => parseInt(cb.dataset.invoiceId));
        const total = selectedInvoices.length;

        // Delete each invoice
        for (let i = 0; i < selectedInvoices.length; i++) {
            // Check if cancel was requested
            if (cancelRequested) {
                progressText.textContent = `Annulé après ${successCount} suppression(s)`;
                await new Promise(resolve => setTimeout(resolve, 1500));
                break;
            }

            const invoiceId = selectedInvoices[i];

            try {
                const result = await window.electron.db.deleteInvoice(invoiceId);

                if (result.success) {
                    successCount++;
                } else {
                    errorCount++;
                }
            } catch (error) {
                console.error(`Error deleting invoice ${invoiceId}:`, error);
                errorCount++;
            }

            // Update progress
            const progress = Math.round(((i + 1) / total) * 100);
            progressBar.style.width = progress + '%';
            progressBar.textContent = progress + '%';
            progressText.textContent = `Suppression: ${i + 1} / ${total}`;

            // Small delay to show progress
            await new Promise(resolve => setTimeout(resolve, 10));
        }

        // Remove progress modal
        document.body.removeChild(progressOverlay);

        // Show result
        if (successCount > 0) {
            window.notify.success('Succès', `${successCount} document(s) supprimé(s) avec succès`, 3000);
            loadInvoices();
        }

        if (errorCount > 0) {
            window.notify.error('Erreur', `${errorCount} document(s) n'ont pas pu être supprimés`, 3000);
        }

    } catch (error) {
        console.error('Error in bulk delete:', error);
        document.body.removeChild(progressOverlay);
        window.notify.error('Erreur', 'Une erreur est survenue lors de la suppression', 3000);
    }
}

// Search clients in edit mode
let filteredClientsEdit = [];
window.searchClientsEdit = function (query) {
    const dropdown = document.getElementById('clientsDropdownEdit');
    if (!dropdown) return;

    if (!query || query.trim().length === 0) {
        filteredClientsEdit = allClients;
    } else {
        const searchTerm = query.toLowerCase().trim();
        filteredClientsEdit = allClients.filter(client =>
            (client.nom || '').toLowerCase().includes(searchTerm) ||
            (client.ice || '').toLowerCase().includes(searchTerm)
        );
    }

    displayClientsListEdit();
}

function displayClientsListEdit() {
    const dropdown = document.getElementById('clientsDropdownEdit');
    if (!dropdown) return;

    if (filteredClientsEdit.length === 0) {
        dropdown.innerHTML = '<div class="dropdown-item no-results">Aucun client trouvé</div>';
        dropdown.style.display = 'block';
        return;
    }

    dropdown.innerHTML = filteredClientsEdit.slice(0, 10).map(client => `
        <div class="dropdown-item" style="display: flex; justify-content: space-between; align-items: center;">
            <div style="flex: 1;" onmousedown="selectClientEdit('${client.nom.replace(/'/g, "\\'")}', '${client.ice}', '${client.client_if || ''}')">
                <div class="client-name">${client.nom}</div>
                <div class="client-ice">ICE: ${client.ice}</div>
            </div>
            <button class="delete-client-btn" onclick="event.stopPropagation(); deleteClientEdit(${client.id}, '${client.nom.replace(/'/g, "\\'")}');" 
                    style="background: #dc3545; color: white; border: none; padding: 0.4rem 0.5rem; border-radius: 4px; cursor: pointer; margin-left: 0.5rem; display: flex; align-items: center; justify-content: center;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    <line x1="10" y1="11" x2="10" y2="17"></line>
                    <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
            </button>
        </div>
    `).join('');

    dropdown.style.display = 'block';
}

window.showClientsListEdit = function () {
    if (allClients.length > 0) {
        filteredClientsEdit = allClients;
        displayClientsListEdit();
    }
}

window.hideClientsListEdit = function () {
    setTimeout(() => {
        const dropdown = document.getElementById('clientsDropdownEdit');
        if (dropdown) dropdown.style.display = 'none';
    }, 200);
}

window.selectClientEdit = function (nom, ice, clientIf) {
    document.getElementById('editClientNom').value = nom;
    document.getElementById('editClientICE').value = ice;
    if (document.getElementById('editClientIF')) {
        document.getElementById('editClientIF').value = clientIf || '';
    }
    const dropdown = document.getElementById('clientsDropdownEdit');
    if (dropdown) dropdown.style.display = 'none';
}

// Delete a client from edit mode
window.deleteClientEdit = async function (clientId, clientName) {
    const confirmed = await customConfirm('Confirmation', `هل أنت متأكد من حذف الزبون "${clientName}"؟`, 'warning');
    if (!confirmed) {
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/api/clients/${clientId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            window.notify.success('تم الحذف', `تم حذف الزبون "${clientName}" بنجاح`);
            // Reload clients list
            await loadClients();
            // Refresh dropdown
            searchClientsEdit(document.getElementById('editClientNom').value);
        } else {
            window.notify.error('خطأ', 'فشل حذف الزبون');
        }
    } catch (error) {
        console.error('Error deleting client:', error);
        window.notify.error('خطأ', 'حدث خطأ أثناء حذف الزبون');
    }
}



// Initialize page
window.initInvoicesListMRYPage = function () {
    console.log('🔄 Initializing invoices list page...');

    // Get selected year from session or localStorage
    const sessionYear = sessionStorage.getItem('mry_current_year');
    const savedYear = localStorage.getItem('mry_selected_year');
    const rememberYear = localStorage.getItem('mry_remember_year');

    // Use session year first, then saved year if remember is enabled
    let selectedYear = '';
    if (sessionYear) {
        selectedYear = sessionYear;
    } else if (rememberYear === 'true' && savedYear) {
        selectedYear = savedYear;
    }

    // Update year display button
    setTimeout(() => {
        const yearDisplay = document.getElementById('currentYearDisplayMRY');
        if (yearDisplay) {
            yearDisplay.textContent = selectedYear ? `Année ${selectedYear}` : 'Toutes';
        }
    }, 100);

    setTimeout(() => {
        loadInvoices();
    }, 100);
};

// Migrate local attachments to server (MRY)
window.migrateAttachmentsToServerMRY = async function () {
    const confirmed = await customConfirm(
        'Migration des pièces jointes',
        'Cela va transférer toutes les pièces jointes locales vers le serveur en ligne. Continuer ?',
        'info'
    );
    if (!confirmed) return;

    const loadingNotif = window.notify.loading('Migration en cours...', 'Transfert vers le serveur');
    try {
        const result = await window.electron.attachments.migrateToServer({ company: 'MRY' });
        window.notify.remove(loadingNotif);
        if (result.success) {
            window.notify.success('Migration terminée', `${result.migrated} fichier(s) transféré(s) vers le serveur.`, 5000);
            loadInvoices();
        } else {
            window.notify.error('Erreur', result.error || 'Échec de la migration', 4000);
        }
    } catch (e) {
        window.notify.remove(loadingNotif);
        window.notify.error('Erreur', e.message, 4000);
    }
};