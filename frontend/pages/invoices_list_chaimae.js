// Chaimae Invoices List Page - Copy from MRY Design
function InvoicesListChaimaePage() {
    return `
        <div class="desktop-app">
            <div class="window-header">
                <div class="window-title">
                    <img src="assets/logos/chaimae.png" class="header-logo" alt="Chaimae Company" data-asset="assets/logos/chaimae.png">
                    <span>Liste des Documents - Chaimae Company</span>
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
                            <h1 class="header-title">📋 Liste des Factures, Devis et Bons de Livraison</h1>
                        </div>
                        
                        <div class="header-actions-new">
                            <button id="changeYearBtn" onclick="router.navigate('/year-selector-chaimae')" class="action-btn action-btn-year">
                                <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                                </svg>
                                <span id="currentYearDisplay">2025</span>
                            </button>
                            
                            <button class="action-btn action-btn-situation" onclick="showSituationMensuelleModal()">
                                <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                                    <path d="M1 11a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3zm5-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-7zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V2z"/>
                                </svg>
                                <span>Situation</span>
                            </button>

                            <button class="action-btn action-btn-situation" onclick="showSituationAnnuelleModalChaimae()" style="background-color: #673ab7;">
                                <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                                    <path d="M4 11a1 1 0 1 1 2 0v1a1 1 0 1 1-2 0v-1zm6-4a1 1 0 1 1 2 0v5a1 1 0 1 1-2 0V7zM7 9a1 1 0 0 1 2 0v3a1 1 0 1 1-2 0V9z"/>
                                    <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
                                    <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
                                </svg>
                                <span>Annuelle</span>
                            </button>

                            <button class="action-btn action-btn-situation" onclick="showSituationAnnuelleClientsModalChaimae()" style="background-color: #FF9800;">
                                <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                                    <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                                    <path fill-rule="evenodd" d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"/>
                                    <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"/>
                                </svg>
                                <span>Globale</span>
                            </button>
                            
                            <button class="action-btn action-btn-primary" onclick="router.navigate('/create-invoice-chaimae')">
                                <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                </svg>
                                <span>Nouvelle</span>
                            </button>


                            <button class="action-btn action-btn-secondary" onclick="router.navigate('/dashboard-chaimae')">
                                <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                                    <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                                </svg>
                                <span>Retour</span>
                            </button>
                        </div>
                    </div>





                    <!-- Filters -->
                    <div class="filters-section" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
                        <div class="filter-group" style="position:relative;">
                            <label style="display:block; color:#4caf50; font-weight:600; font-size:0.75rem; text-transform:uppercase; letter-spacing:0.6px; margin-bottom:0.4rem;">Type de document</label>
                            <div style="position:relative;" id="typeDropdownWrapperChaimae">
                                <!-- Trigger button -->
                                <div onclick="toggleTypeDropdownChaimae()" id="typeDropdownDisplayChaimae"
                                    style="display:flex; align-items:center; justify-content:space-between; padding:0.45rem 0.7rem; background:#252526; border:1px solid #3e3e42; border-radius:6px; cursor:pointer; transition:all 0.15s; user-select:none;">
                                    <div style="display:flex; align-items:center; gap:0.4rem; flex-wrap:wrap; flex:1; min-width:0;">
                                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#4caf50" stroke-width="2.5" style="flex-shrink:0;"><path d="M4 6h16M7 12h10M10 18h4"/></svg>
                                        <span id="typeSelectedTextChaimae" style="color:#ccc; font-size:0.82rem; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">Tous les types</span>
                                    </div>
                                    <svg id="typeDropdownArrowChaimae" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#666" stroke-width="2.5" style="flex-shrink:0; transition:transform 0.2s;"><polyline points="6 9 12 15 18 9"/></svg>
                                </div>
                                <!-- Dropdown panel -->
                                <div id="typeDropdownChaimae" style="display:none; position:absolute; top:calc(100% + 3px); left:0; right:0; background:#252526; border:1px solid #3e3e42; border-radius:6px; z-index:9999; overflow:hidden; box-shadow:0 6px 18px rgba(0,0,0,0.5);">
                                    <div onclick="toggleTypeChaimae('facture')" style="display:flex; align-items:center; gap:0.6rem; padding:0.45rem 0.7rem; cursor:pointer; transition:background 0.12s;" onmouseover="this.style.background='#2d2d30'" onmouseout="this.style.background='transparent'">
                                        <span id="typeCheckFactureChaimae" data-active="false" style="width:14px; height:14px; border-radius:3px; border:1.5px solid #555; display:inline-flex; align-items:center; justify-content:center; font-size:0.65rem; flex-shrink:0; transition:all 0.12s; color:#fff;"></span>
                                        <span style="color:#d4d4d4; font-size:0.82rem;">Factures</span>
                                    </div>
                                    <div onclick="toggleTypeChaimae('devis')" style="display:flex; align-items:center; gap:0.6rem; padding:0.45rem 0.7rem; cursor:pointer; border-top:1px solid #2a2a2a; transition:background 0.12s;" onmouseover="this.style.background='#2d2d30'" onmouseout="this.style.background='transparent'">
                                        <span id="typeCheckDevisChaimae" data-active="false" style="width:14px; height:14px; border-radius:3px; border:1.5px solid #555; display:inline-flex; align-items:center; justify-content:center; font-size:0.65rem; flex-shrink:0; transition:all 0.12s; color:#fff;"></span>
                                        <span style="color:#d4d4d4; font-size:0.82rem;">Devis</span>
                                    </div>
                                    <div onclick="toggleTypeChaimae('bon_livraison')" style="display:flex; align-items:center; gap:0.6rem; padding:0.45rem 0.7rem; cursor:pointer; border-top:1px solid #2a2a2a; transition:background 0.12s;" onmouseover="this.style.background='#2d2d30'" onmouseout="this.style.background='transparent'">
                                        <span id="typeCheckBLChaimae" data-active="false" style="width:14px; height:14px; border-radius:3px; border:1.5px solid #555; display:inline-flex; align-items:center; justify-content:center; font-size:0.65rem; flex-shrink:0; transition:all 0.12s; color:#fff;"></span>
                                        <span style="color:#d4d4d4; font-size:0.82rem;">Bon de livraison</span>
                                    </div>
                                </div>
                                <!-- Hidden state buttons for compatibility -->
                                <div style="display:none;">
                                    <button id="typeToggleFactureChaimae" data-active="false"></button>
                                    <button id="typeToggleDevisChaimae" data-active="false"></button>
                                    <button id="typeToggleBLChaimae" data-active="false"></button>
                                </div>
                            </div>
                        </div>
                        
                        <div class="filter-group">
                            <label>📆 Mois:</label>
                            <select id="filterMonthChaimae" onchange="filterInvoicesChaimae()">
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
                            <select id="filterClientChaimae" onchange="filterInvoicesChaimae()">
                                <option value="">Tous</option>
                            </select>
                        </div>
                        
                        <div class="filter-group">
                            <label>💳 Statut de paiement:</label>
                            <select id="filterPaymentStatusChaimae" onchange="filterInvoicesChaimae()">
                                <option value="">Tous</option>
                                <option value="en attente de paiement">En attente</option>
                                <option value="payé">Payé</option>
                            </select>
                        </div>
                        
                        <div class="filter-group">
                            <label>💰 Méthode de paiement:</label>
                            <select id="filterPaymentMethodChaimae" onchange="filterInvoicesChaimae()">
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
                                <div style="position:relative;" id="searchTypeDropdownWrapperChaimae">
                                    <!-- Trigger button -->
                                    <div onclick="toggleSearchTypeDropdownChaimae()" id="searchTypeDropdownDisplayChaimae"
                                        style="display:flex; align-items:center; justify-content:space-between; padding:0.45rem 0.7rem; background:#252526; border:1px solid #3e3e42; border-radius:6px; cursor:pointer; transition:all 0.15s; user-select:none;">
                                        <div style="display:flex; align-items:center; gap:0.4rem; flex-wrap:wrap; flex:1; min-width:0;">
                                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#4caf50" stroke-width="2.5" style="flex-shrink:0;"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                                            <span id="searchTypeSelectedTextChaimae" style="color:#ccc; font-size:0.82rem; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">Tous les champs</span>
                                        </div>
                                        <svg id="searchTypeDropdownArrowChaimae" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#666" stroke-width="2.5" style="flex-shrink:0; transition:transform 0.2s;"><polyline points="6 9 12 15 18 9"/></svg>
                                    </div>
                                    <!-- Dropdown panel -->
                                    <div id="searchTypeDropdownChaimae" style="display:none; position:absolute; top:calc(100% + 3px); left:0; right:0; background:#252526; border:1px solid #3e3e42; border-radius:6px; z-index:9999; overflow:hidden; box-shadow:0 6px 18px rgba(0,0,0,0.5); max-height:300px; overflow-y:auto;">
                                        <!-- Select All / Deselect All -->
                                        <div onclick="toggleAllSearchTypesChaimae()" style="display:flex; align-items:center; gap:0.6rem; padding:0.55rem 0.7rem; cursor:pointer; background:#2a2a2e; border-bottom:2px solid #3e3e42; transition:background 0.12s;" onmouseover="this.style.background='#323235'" onmouseout="this.style.background='#2a2a2e'">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4caf50" stroke-width="2.5" style="flex-shrink:0;"><polyline points="20 6 9 17 4 12"/></svg>
                                            <span id="searchTypeToggleAllTextChaimae" style="color:#4caf50; font-size:0.82rem; font-weight:600;">Sélectionner tout</span>
                                        </div>
                                        <div onclick="toggleSearchTypeChaimae('numero')" style="display:flex; align-items:center; gap:0.6rem; padding:0.45rem 0.7rem; cursor:pointer; transition:background 0.12s;" onmouseover="this.style.background='#2d2d30'" onmouseout="this.style.background='transparent'">
                                            <span id="searchTypeCheckNumeroChaimae" data-active="false" style="width:14px; height:14px; border-radius:3px; border:1.5px solid #555; display:inline-flex; align-items:center; justify-content:center; font-size:0.65rem; flex-shrink:0; transition:all 0.12s; color:#fff;"></span>
                                            <span style="color:#d4d4d4; font-size:0.82rem;">📄 N° Document</span>
                                        </div>
                                        <div onclick="toggleSearchTypeChaimae('order')" style="display:flex; align-items:center; gap:0.6rem; padding:0.45rem 0.7rem; cursor:pointer; border-top:1px solid #2a2a2a; transition:background 0.12s;" onmouseover="this.style.background='#2d2d30'" onmouseout="this.style.background='transparent'">
                                            <span id="searchTypeCheckOrderChaimae" data-active="false" style="width:14px; height:14px; border-radius:3px; border:1.5px solid #555; display:inline-flex; align-items:center; justify-content:center; font-size:0.65rem; flex-shrink:0; transition:all 0.12s; color:#fff;"></span>
                                            <span style="color:#d4d4d4; font-size:0.82rem;">📋 N° Order</span>
                                        </div>
                                        <div onclick="toggleSearchTypeChaimae('bon_livraison')" style="display:flex; align-items:center; gap:0.6rem; padding:0.45rem 0.7rem; cursor:pointer; border-top:1px solid #2a2a2a; transition:background 0.12s;" onmouseover="this.style.background='#2d2d30'" onmouseout="this.style.background='transparent'">
                                            <span id="searchTypeCheckBonLivraisonChaimae" data-active="false" style="width:14px; height:14px; border-radius:3px; border:1.5px solid #555; display:inline-flex; align-items:center; justify-content:center; font-size:0.65rem; flex-shrink:0; transition:all 0.12s; color:#fff;"></span>
                                            <span style="color:#d4d4d4; font-size:0.82rem;">📦 Bon de livraison</span>
                                        </div>
                                        <div onclick="toggleSearchTypeChaimae('client')" style="display:flex; align-items:center; gap:0.6rem; padding:0.45rem 0.7rem; cursor:pointer; border-top:1px solid #2a2a2a; transition:background 0.12s;" onmouseover="this.style.background='#2d2d30'" onmouseout="this.style.background='transparent'">
                                            <span id="searchTypeCheckClientChaimae" data-active="false" style="width:14px; height:14px; border-radius:3px; border:1.5px solid #555; display:inline-flex; align-items:center; justify-content:center; font-size:0.65rem; flex-shrink:0; transition:all 0.12s; color:#fff;"></span>
                                            <span style="color:#d4d4d4; font-size:0.82rem;">👤 Client</span>
                                        </div>
                                        <div onclick="toggleSearchTypeChaimae('ice')" style="display:flex; align-items:center; gap:0.6rem; padding:0.45rem 0.7rem; cursor:pointer; border-top:1px solid #2a2a2a; transition:background 0.12s;" onmouseover="this.style.background='#2d2d30'" onmouseout="this.style.background='transparent'">
                                            <span id="searchTypeCheckIceChaimae" data-active="false" style="width:14px; height:14px; border-radius:3px; border:1.5px solid #555; display:inline-flex; align-items:center; justify-content:center; font-size:0.65rem; flex-shrink:0; transition:all 0.12s; color:#fff;"></span>
                                            <span style="color:#d4d4d4; font-size:0.82rem;">🏢 ICE</span>
                                        </div>
                                        <div onclick="toggleSearchTypeChaimae('product')" style="display:flex; align-items:center; gap:0.6rem; padding:0.45rem 0.7rem; cursor:pointer; border-top:1px solid #2a2a2a; transition:background 0.12s;" onmouseover="this.style.background='#2d2d30'" onmouseout="this.style.background='transparent'">
                                            <span id="searchTypeCheckProductChaimae" data-active="false" style="width:14px; height:14px; border-radius:3px; border:1.5px solid #555; display:inline-flex; align-items:center; justify-content:center; font-size:0.65rem; flex-shrink:0; transition:all 0.12s; color:#fff;"></span>
                                            <span style="color:#d4d4d4; font-size:0.82rem;">📦 Produit</span>
                                        </div>
                                        <div onclick="toggleSearchTypeChaimae('price')" style="display:flex; align-items:center; gap:0.6rem; padding:0.45rem 0.7rem; cursor:pointer; border-top:1px solid #2a2a2a; transition:background 0.12s;" onmouseover="this.style.background='#2d2d30'" onmouseout="this.style.background='transparent'">
                                            <span id="searchTypeCheckPriceChaimae" data-active="false" style="width:14px; height:14px; border-radius:3px; border:1.5px solid #555; display:inline-flex; align-items:center; justify-content:center; font-size:0.65rem; flex-shrink:0; transition:all 0.12s; color:#fff;"></span>
                                            <span style="color:#d4d4d4; font-size:0.82rem;">💰 Prix</span>
                                        </div>
                                        <div onclick="toggleSearchTypeChaimae('total_ht')" style="display:flex; align-items:center; gap:0.6rem; padding:0.45rem 0.7rem; cursor:pointer; border-top:1px solid #2a2a2a; transition:background 0.12s;" onmouseover="this.style.background='#2d2d30'" onmouseout="this.style.background='transparent'">
                                            <span id="searchTypeCheckTotalHtChaimae" data-active="false" style="width:14px; height:14px; border-radius:3px; border:1.5px solid #555; display:inline-flex; align-items:center; justify-content:center; font-size:0.65rem; flex-shrink:0; transition:all 0.12s; color:#fff;"></span>
                                            <span style="color:#d4d4d4; font-size:0.82rem;">💵 Total H.T</span>
                                        </div>
                                        <div onclick="toggleSearchTypeChaimae('total')" style="display:flex; align-items:center; gap:0.6rem; padding:0.45rem 0.7rem; cursor:pointer; border-top:1px solid #2a2a2a; transition:background 0.12s;" onmouseover="this.style.background='#2d2d30'" onmouseout="this.style.background='transparent'">
                                            <span id="searchTypeCheckTotalChaimae" data-active="false" style="width:14px; height:14px; border-radius:3px; border:1.5px solid #555; display:inline-flex; align-items:center; justify-content:center; font-size:0.65rem; flex-shrink:0; transition:all 0.12s; color:#fff;"></span>
                                            <span style="color:#d4d4d4; font-size:0.82rem;">💵 Total TTC</span>
                                        </div>
                                    </div>
                                </div>
                                <input type="text" id="searchInputChaimae" placeholder="Tapez votre recherche..." onkeyup="filterInvoicesChaimae()" style="width: 100%; padding: 0.75rem; background: #1e1e1e; border: 1px solid #3e3e42; border-radius: 4px; color: #ffffff; font-size: 0.95rem;">
                            </div>
                        </div>

                        <!-- P.J Filter -->
                        <div class="filter-group">
                            <label>📎 Pièces Jointes:</label>
                            <select id="filterAttachmentsChaimae" onchange="filterInvoicesChaimae()">
                                <option value="all">Tous</option>
                                <option value="with">Avec P.J</option>
                                <option value="without">Sans P.J</option>
                            </select>
                        </div>
                        
                        <!-- Devis Conversion Filter -->
                        <div class="filter-group">
                            <label>🔄 Etat Devis:</label>
                            <select id="filterDevisConversionMulti" onchange="filterInvoicesChaimae()">
                                <option value="all">Tous</option>
                                <option value="converted">Convertis</option>
                                <option value="not_converted">Non Convertis</option>
                            </select>
                        </div>

                        <!-- AR Status Filter -->
                        <div class="filter-group">
                            <label>🕒 Accusé de Réception:</label>
                            <select id="filterArStatusChaimae" onchange="filterInvoicesChaimae()">
                                <option value="all">Tous</option>
                                <option value="">— (vide)</option>
                                <option value="sans_accuse">Sans accusé</option>
                                <option value="en_attente">En attente</option>
                                <option value="accuse">Accusé</option>
                                <option value="done">Done</option>
                            </select>
                        </div>

                        <!-- Featured Filter - Admins Only -->
                        <div class="filter-group" id="featuredFilterGroupChaimae" style="display: none;">
                            <label>⭐ Importance:</label>
                            <select id="filterFeaturedChaimae" onchange="filterInvoicesChaimae()">
                                <option value="all">Toutes</option>
                                <option value="featured">⭐ Importantes</option>
                                <option value="not_featured">Non importantes</option>
                            </select>
                        </div>

                        <!-- Status Filter (Seen/Unseen) - Admins Only -->
                        <div class="filter-group" id="statusFilterGroupChaimae" style="display: none;">
                            <label>👁️ Statut:</label>
                            <div style="position: relative;">
                                <select id="filterStatusChaimae" onchange="filterInvoicesChaimae()">
                                    <option value="all">Tous</option>
                                    <option value="unseen">Non lus (Nouveau)</option>
                                    <option value="modified">Modifiés (Par un autre)</option>
                                    <option value="seen">Lus / Traités</option>
                                </select>
                                <span id="unseenBadgeChaimae" style="display: none; position: absolute; top: -8px; right: -8px; background: #f44336; color: white; border-radius: 50%; padding: 2px 6px; font-size: 10px; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">0</span>
                            </div>
                        </div>
                        
                        <div class="filter-group">
                            <button class="btn-refresh" onclick="loadInvoicesChaimae()" style="margin-top: 1.5rem;">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style="margin-right: 0.5rem;">
                                    <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
                                    <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
                                </svg>
                                <span>Actualiser</span>
                            </button>
                        </div>

                    </div>

                    <!-- Loading -->
                    <div id="loadingSpinnerChaimae" class="loading-spinner" style="display: none;">
                        <div class="spinner"></div>
                        <p>Chargement des données...</p>
                    </div>

                    <!-- Global Invoices Section -->
                    <div id="globalInvoicesSectionChaimae" style="display: none; margin-bottom: 2rem;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; padding: 1rem; background: #2d2d30; border: 1px solid #3e3e42; border-radius: 6px;">
                            <h3 style="margin: 0; color: #9c27b0; font-size: 1.1rem;">📦 Factures Globales (<span id="globalInvoicesCountChaimae">0</span>)</h3>
                            <button onclick="toggleGlobalInvoicesChaimae()" style="padding: 0.5rem 1rem; background: #9c27b0; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 0.9rem;">
                                <span id="toggleGlobalIconChaimae">▼</span> Afficher/Masquer
                            </button>
                        </div>
                        <div id="globalInvoicesTableChaimae" style="display: none;">
                            <table class="invoices-table" style="margin-bottom: 0;">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>N° Facture</th>
                                        <th>Client</th>
                                        <th>Date</th>
                                        <th style="text-align: left;">Total TTC</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody id="globalInvoicesBodyChaimae">
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- Results Counter & Bulk Actions -->
                    <div style="display: flex; gap: 1rem; align-items: center; margin-bottom: 1rem;">
                        <div id="resultsCounterChaimae" style="flex: 1; padding: 0.75rem 1rem; background: #2d2d30; border: 1px solid #3e3e42; border-radius: 6px; color: #cccccc; font-size: 0.95rem; display: none;">
                            <strong>📊 Résultats:</strong> <span id="resultCountChaimae">0</span> document(s) trouvé(s)
                        </div>
                        <div style="display: flex; gap: 0.5rem; align-items: center;">
                            <label style="color: #cccccc; font-size: 0.9rem;">Afficher:</label>
                            <select id="itemsPerPageChaimae" onchange="changeItemsPerPageChaimae()" style="padding: 0.5rem; background: #2d2d30; border: 1px solid #3e3e42; border-radius: 4px; color: #ffffff; cursor: pointer;">
                                <option value="10">10</option>
                                <option value="20">20</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                                <option value="all">Tout</option>
                            </select>
                        </div>
                        <button id="bulkDeleteBtnChaimae" onclick="handleBulkDeleteChaimae()" 
                                style="padding: 0.75rem 1.5rem; background: #f44336; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 0.95rem; transition: all 0.3s; display: flex; align-items: center; gap: 0.5rem;"
                                onmouseover="this.style.background='#d32f2f'" onmouseout="this.style.background='#f44336'">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                            </svg>
                            <span id="bulkDeleteTextChaimae">Supprimer</span>
                        </button>
                        <button id="bulkDownloadBtnChaimae" onclick="handleBulkDownloadChaimae()" 
                                style="padding: 0.75rem 1.5rem; background: #2196f3; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 0.95rem; transition: all 0.3s; display: flex; align-items: center; gap: 0.5rem;"
                                onmouseover="this.style.background='#1976d2'" onmouseout="this.style.background='#2196f3'">
                            📥 <span id="bulkDownloadTextChaimae">Télécharger</span>
                        </button>
                        <button id="createGlobalInvoiceBtnChaimae" onclick="showCreateGlobalInvoiceModalChaimae()" 
                                style="padding: 0.75rem 1.5rem; background: #4caf50; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 0.95rem; transition: all 0.3s;"
                                onmouseover="this.style.background='#45a049'" onmouseout="this.style.background='#4caf50'">
                            📦 Créer Facture Globale
                        </button>
                    </div>

                    <!-- Column Visibility Controls -->
                    <div id="columnVisibilityControlsChaimae" style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1rem; padding: 0.75rem; background: #2d2d30; border: 1px solid #3e3e42; border-radius: 6px; align-items: center;">
                        <span style="color: #cccccc; font-size: 0.9rem; font-weight: 600; margin-right: 0.5rem;">👁️ Afficher:</span>
                        <button id="toggleColIceChaimae" onclick="toggleColumnChaimae('ice')" class="col-toggle-btn" style="padding: 0.4rem 0.8rem; background: #f44336; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 0.85rem; transition: all 0.2s; opacity: 0.7;">
                            🏢 ICE
                        </button>
                    </div>

                    <!-- Invoices Table -->
                    <div class="table-container">
                        <table class="invoices-table" id="invoicesTableChaimae">
                            <thead id="invoicesTableHeadChaimae">
                                <tr>
                                    <th style="width: 40px;">
                                        <input type="checkbox" id="selectAllChaimae" onchange="selectAllInvoicesChaimae()"
                                               style="width: 18px; height: 18px; cursor: pointer;"
                                               title="Sélectionner tout">
                                    </th>
                                    <th class="col-type-chaimae" style="width: 100px;">Type</th>
                                    <th onclick="sortTableChaimae('numero')" style="cursor: pointer; user-select: none;" title="Cliquez pour trier">
                                        N° Document <span id="sortIconNumeroChaimae">⇅</span>
                                    </th>
                                    <th>Client</th>
                                    <th class="col-ice-chaimae">ICE</th>
                                    <th class="col-date-chaimae" onclick="sortTableChaimae('date')" style="cursor: pointer; user-select: none; width: 120px;" title="Cliquez pour trier">
                                        Date <span id="sortIconDateChaimae">⇅</span>
                                    </th>
                                    <th class="col-totalHT-chaimae" onclick="sortTableChaimae('total_ht')" style="cursor: pointer; user-select: none; width: 130px;" title="Cliquez pour trier">
                                        Total HT <span id="sortIconTotalHTChaimae">⇅</span>
                                    </th>
                                    <th onclick="sortTableChaimae('total_ttc')" style="cursor: pointer; user-select: none; width: 150px;" title="Cliquez pour trier">
                                        Total TTC <span id="sortIconTotalTTCChaimae">⇅</span>
                                    </th>
                                    <th class="col-createdByCombined-chaimae" style="width: 150px; text-align: center;">Par</th>
                                    <th style="width: 140px; text-align: center;">Accusé R.</th>
                                    <th style="width: 200px; text-align: center;">💳 Paiement</th>
                                    <th style="width: 50px; text-align: center;">P.J</th>
                                    <th style="width: 150px; text-align: center;">Actions</th>
                                </tr>
                            </thead>
                            <tbody id="invoicesTableBodyChaimae">
                                <!-- Invoices will be loaded here -->
                            </tbody>
                        </table>
                    </div>

                    <!-- Pagination -->
                    <div id="paginationChaimae" style="display: none; margin-top: 1.5rem; padding: 1rem; background: #2d2d30; border: 1px solid #3e3e42; border-radius: 6px;">
                        <div style="display: flex; justify-content: center; align-items: center; gap: 0.5rem;">
                            <button id="prevPageChaimae" onclick="changePaginationPageChaimae('prev')" style="padding: 0.5rem 1rem; background: #3e3e42; color: #ffffff; border: none; border-radius: 4px; cursor: pointer; transition: all 0.3s;" onmouseover="this.style.background='#4e4e52'" onmouseout="this.style.background='#3e3e42'">
                                ← Précédent
                            </button>
                            <div id="pageNumbersChaimae" style="display: flex; gap: 0.25rem;">
                                <!-- Page numbers will be inserted here -->
                            </div>
                            <button id="nextPageChaimae" onclick="changePaginationPageChaimae('next')" style="padding: 0.5rem 1rem; background: #3e3e42; color: #ffffff; border: none; border-radius: 4px; cursor: pointer; transition: all 0.3s;" onmouseover="this.style.background='#4e4e52'" onmouseout="this.style.background='#3e3e42'">
                                Suivant →
                            </button>
                        </div>
                    </div>

                    <!-- Empty State -->
                    <div id="emptyStateChaimae" class="empty-state" style="display: none;">
                        <svg width="64" height="64" viewBox="0 0 16 16" fill="currentColor" style="opacity: 0.3; margin-bottom: 1rem;">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                        </svg>
                        <h3>Aucune facture trouvée</h3>
                        <p>Commencez par créer votre première facture</p>
                        <button class="btn-primary" onclick="router.navigate('/create-invoice-chaimae')" style="margin-top: 1rem;">
                            <span>+ Créer une facture</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Store all invoices for Chaimae
let allInvoicesChaimae = [];
let filteredInvoicesChaimae = [];
let currentPageChaimae = 1;
let itemsPerPageChaimae = 10;
let isSuperUserChaimae = false;

// Column visibility state for Chaimae - ICE hidden by default
let columnVisibilityChaimae = {
    ice: false
};

// Load column visibility from localStorage on page load
function loadColumnVisibilityChaimae() {
    const saved = localStorage.getItem('chaimae_column_visibility');
    if (saved) {
        try {
            columnVisibilityChaimae = JSON.parse(saved);
        } catch (e) {
            console.error('Error loading column visibility:', e);
        }
    }
    // Apply visibility on load
    applyColumnVisibilityChaimae();
}

// Save column visibility to localStorage
function saveColumnVisibilityChaimae() {
    localStorage.setItem('chaimae_column_visibility', JSON.stringify(columnVisibilityChaimae));
}

// Toggle column visibility
window.toggleColumnChaimae = function (column) {
    columnVisibilityChaimae[column] = !columnVisibilityChaimae[column];
    saveColumnVisibilityChaimae();
    applyColumnVisibilityChaimae();

    // Re-display invoices to update table body
    displayInvoicesChaimae(filteredInvoicesChaimae);
};

// Apply column visibility to table and buttons - ICE only
function applyColumnVisibilityChaimae() {
    const isVisible = columnVisibilityChaimae.ice;

    // Update button style
    const btn = document.getElementById('toggleColIceChaimae');
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
    const headerCells = document.querySelectorAll('.col-ice-chaimae');
    headerCells.forEach(cell => {
        cell.style.display = isVisible ? '' : 'none';
    });

    // Update body cells visibility
    const bodyCells = document.querySelectorAll('.col-ice-chaimae-body');
    bodyCells.forEach(cell => {
        cell.style.display = isVisible ? '' : 'none';
    });
}

// Format number for display with proper formatting
function formatNumberChaimae(number) {
    const num = parseFloat(number) || 0;
    // Use toLocaleString for better display with spaces as thousands separator
    return num.toLocaleString('fr-FR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

// Load invoices from database
// Load invoices from database
window.loadInvoicesChaimae = async function () {
    // Load column visibility preferences
    loadColumnVisibilityChaimae();

    const loadingSpinner = document.getElementById('loadingSpinnerChaimae');
    const tableBody = document.getElementById('invoicesTableBodyChaimae');
    const emptyState = document.getElementById('emptyStateChaimae');

    // Check user identity
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    isSuperUserChaimae = (user.email === 'redouanerrebbahi99@gmail.com' || user.can_auto_validate === true);

    // Update UI based on identity
    const userMgmtBtn = document.getElementById('userManagementBtnChaimae');
    if (userMgmtBtn) userMgmtBtn.style.display = isSuperUserChaimae ? 'block' : 'none';

    // Show/Hide Status Filter based on admin status
    const statusFilterGroup = document.getElementById('statusFilterGroupChaimae');
    if (statusFilterGroup) {
        statusFilterGroup.style.display = isSuperUserChaimae ? 'block' : 'none';
    }

    // Show/Hide Featured Filter based on admin status
    const featuredFilterGroup = document.getElementById('featuredFilterGroupChaimae');
    if (featuredFilterGroup) {
        featuredFilterGroup.style.display = isSuperUserChaimae ? 'block' : 'none';
    }

    try {
        // Get selected year from session or localStorage
        const sessionYear = sessionStorage.getItem('chaimae_current_year');
        const savedYear = localStorage.getItem('chaimae_selected_year');
        const rememberYear = localStorage.getItem('chaimae_remember_year');

        // Use session year first
        if (sessionYear !== null) {
            selectedYearChaimae = sessionYear;
        } else if (rememberYear === 'true' && savedYear !== null) {
            selectedYearChaimae = savedYear;
        }

        // Update year display button
        const yearDisplay = document.getElementById('currentYearDisplay');
        if (yearDisplay) {
            yearDisplay.textContent = selectedYearChaimae ? `Année ${selectedYearChaimae}` : 'Toutes';
        }

        // Show loading
        if (loadingSpinner) loadingSpinner.style.display = 'flex';
        if (tableBody) tableBody.innerHTML = '';
        if (emptyState) emptyState.style.display = 'none';

        // Get regular invoices from database
        const result = await window.electron.dbChaimae.getAllInvoices();

        // Get global invoices from database
        const globalResult = await window.electron.dbChaimae.getAllGlobalInvoices();

        if (result.success) {
            const regularInvoices = result.data;
            const globalInvoices = globalResult.success ? globalResult.data : [];

            // Add default display if not present
            const enrichedInvoices = regularInvoices.map(inv => ({
                ...inv,
                created_by_user_name: inv.created_by_user_name || '-',
                updated_by_user_name: inv.updated_by_user_name || inv.created_by_user_name || '-'
            }));

            // Store ALL invoices (including pending "Unseen")
            allInvoicesChaimae = enrichedInvoices;

            console.log('✅ [CHAIMAE] Invoices loaded successfully');
            console.log('📊 [CHAIMAE] Total invoices:', allInvoicesChaimae.length);
            console.log('🔍 [CHAIMAE] First invoice object:', allInvoicesChaimae[0]);
            console.log('🔍 [CHAIMAE] Checking client_nom field:');
            allInvoicesChaimae.slice(0, 5).forEach((inv, idx) => {
                console.log(`   Invoice ${idx}: client_nom = "${inv.client_nom}" (type: ${typeof inv.client_nom})`);
            });
            
            // Check all unique client_nom values
            const allClientNoms = allInvoicesChaimae.map(inv => inv.client_nom);
            console.log('📋 [CHAIMAE] All client_nom values:', allClientNoms);
            const uniqueClients = [...new Set(allClientNoms.filter(Boolean))];
            console.log('🎯 [CHAIMAE] Unique non-empty client_nom values:', uniqueClients.length, uniqueClients);

            // Calculate Unseen (Pending) count
            const unseenCount = allInvoicesChaimae.filter(inv => inv.validation_status === 'pending').length;
            const badge = document.getElementById('unseenBadgeChaimae');
            if (badge) {
                badge.textContent = unseenCount;
                badge.style.display = unseenCount > 0 ? 'block' : 'none';
            }

            // Display global invoices separately
            displayGlobalInvoicesChaimae(globalInvoices);

            console.log('🔵 [CHAIMAE] About to call populateFiltersChaimae()...');
            // Populate filters
            await populateFiltersChaimae();
            console.log('🟢 [CHAIMAE] populateFiltersChaimae() completed');

            // Apply filters
            filterInvoicesChaimae();

            // Hide loading
            if (loadingSpinner) loadingSpinner.style.display = 'none';

            if (filteredInvoicesChaimae.length === 0) {
                if (emptyState) emptyState.style.display = 'flex';
            }
        } else {
            throw new Error(result.error);
        }
    } catch (error) {
        console.error('❌ Error loading invoices for Chaimae:', error);
        if (loadingSpinner) loadingSpinner.style.display = 'none';

        window.notify.error(
            'Erreur de chargement',
            'Impossible de charger les documents: ' + error.message,
            5000
        );
    }
};

// Store selected year globally
let selectedYearChaimae = '';

// Populate filters and year cards
async function populateFiltersChaimae() {
    // Get available years from database
    try {
        const result = await window.electron.dbChaimae.getAvailableYears();

        let availableYears = [];
        if (result.success && result.data.length > 0) {
            availableYears = result.data;
        } else {
            // Fallback: Get unique years from invoices
            const invoiceYears = [...new Set(allInvoicesChaimae.map(inv => {
                return inv.year || (window.safeParseDate||function(d){return new Date(d)})(inv.document_date).getFullYear();
            }))];

            // Add current year and previous 2 years if not present
            const currentYear = new Date().getFullYear();
            const defaultYears = [currentYear, currentYear - 1, currentYear - 2];

            // Combine and remove duplicates
            availableYears = [...new Set([...invoiceYears, ...defaultYears])].sort((a, b) => b - a);
        }

        // Render year cards
        renderYearCardsChaimae(availableYears);

    } catch (error) {
        console.error('Error loading available years:', error);
    }

    // Get unique clients
    console.log('🔍 [CHAIMAE] populateFiltersChaimae - allInvoicesChaimae count:', allInvoicesChaimae.length);
    console.log('🔍 [CHAIMAE] Sample invoice:', allInvoicesChaimae[0]);
    const clients = [...new Set(allInvoicesChaimae.map(inv => inv.client_nom).filter(Boolean))].sort();
    console.log('🔍 [CHAIMAE] Unique clients found:', clients.length, clients);
    const clientSelect = document.getElementById('filterClientChaimae');
    if (clientSelect) {
        clientSelect.innerHTML = '<option value="">Tous</option>' +
            clients.map(client => `<option value="${client}">${client}</option>`).join('');
        console.log('✅ [CHAIMAE] Client filter populated with', clients.length, 'clients');
    } else {
        console.error('❌ [CHAIMAE] filterClientChaimae element not found!');
    }
}

// Render year cards
function renderYearCardsChaimae(years) {
    const container = document.getElementById('yearsCardsContainer');
    if (!container) return;

    // Count invoices per year
    const yearCounts = {};
    allInvoicesChaimae.forEach(inv => {
        const year = inv.year || (window.safeParseDate||function(d){return new Date(d)})(inv.document_date).getFullYear();
        yearCounts[year] = (yearCounts[year] || 0) + 1;
    });

    // Add "All Years" card
    const allCount = allInvoicesChaimae.length;
    let cardsHTML = `
        <div onclick="selectYearCardChaimae('')" 
             style="flex: 0 0 auto; min-width: 180px; padding: 1.5rem; background: ${selectedYearChaimae === '' ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'linear-gradient(135deg, #2d2d30 0%, #3e3e42 100%)'}; border: 2px solid ${selectedYearChaimae === '' ? '#667eea' : '#3e3e42'}; border-radius: 12px; cursor: pointer; transition: all 0.3s; box-shadow: ${selectedYearChaimae === '' ? '0 4px 12px rgba(102, 126, 234, 0.4)' : '0 2px 8px rgba(0,0,0,0.2)'};"
             onmouseover="if('${selectedYearChaimae}' !== '') { this.style.transform='translateY(-5px)'; this.style.borderColor='#667eea'; this.style.boxShadow='0 6px 16px rgba(102, 126, 234, 0.3)'; }"
             onmouseout="if('${selectedYearChaimae}' !== '') { this.style.transform='translateY(0)'; this.style.borderColor='#3e3e42'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.2)'; }">
            <div style="text-align: center;">
                <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">📊</div>
                <div style="font-size: 1.1rem; font-weight: 700; color: #fff; margin-bottom: 0.5rem;">Toutes</div>
                <div style="font-size: 2rem; font-weight: 700; color: ${selectedYearChaimae === '' ? '#fff' : '#4caf50'};">${allCount}</div>
                <div style="font-size: 0.85rem; color: ${selectedYearChaimae === '' ? 'rgba(255,255,255,0.8)' : '#999'}; margin-top: 0.25rem;">documents</div>
            </div>
        </div>
    `;

    // Add year cards
    years.forEach(year => {
        const count = yearCounts[year] || 0;
        const isSelected = selectedYearChaimae == year;

        cardsHTML += `
            <div onclick="selectYearCardChaimae('${year}')" 
                 style="flex: 0 0 auto; min-width: 180px; padding: 1.5rem; background: ${isSelected ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'linear-gradient(135deg, #2d2d30 0%, #3e3e42 100%)'}; border: 2px solid ${isSelected ? '#667eea' : '#3e3e42'}; border-radius: 12px; cursor: pointer; transition: all 0.3s; box-shadow: ${isSelected ? '0 4px 12px rgba(102, 126, 234, 0.4)' : '0 2px 8px rgba(0,0,0,0.2)'};"
                 onmouseover="if('${selectedYearChaimae}' !== '${year}') { this.style.transform='translateY(-5px)'; this.style.borderColor='#667eea'; this.style.boxShadow='0 6px 16px rgba(102, 126, 234, 0.3)'; }"
                 onmouseout="if('${selectedYearChaimae}' !== '${year}') { this.style.transform='translateY(0)'; this.style.borderColor='#3e3e42'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.2)'; }">
                <div style="text-align: center;">
                    <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">📅</div>
                    <div style="font-size: 1.5rem; font-weight: 700; color: #fff; margin-bottom: 0.5rem;">${year}</div>
                    <div style="font-size: 2rem; font-weight: 700; color: ${isSelected ? '#fff' : '#4caf50'};">${count}</div>
                    <div style="font-size: 0.85rem; color: ${isSelected ? 'rgba(255,255,255,0.8)' : '#999'}; margin-top: 0.25rem;">documents</div>
                </div>
            </div>
        `;
    });

    container.innerHTML = cardsHTML;
}

// Validation Queue Functions
async function loadPendingInvoicesChaimae() {
    try {
        const result = await window.electron.dbChaimae.getPendingInvoices();
        if (result.success) {
            displayPendingInvoicesChaimae(result.data);
            const countSpan = document.getElementById('pendingInvoicesCountChaimae');
            if (countSpan) countSpan.textContent = result.data.length;
        }
    } catch (error) {
        console.error('Error loading pending invoices:', error);
    }
}

function displayPendingInvoicesChaimae(invoices) {
    const tableBody = document.getElementById('pendingInvoicesTableBodyChaimae');
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
            <td>${(window.safeParseDate||function(d){return new Date(d)})(inv.document_date).toLocaleDateString('fr-FR')}</td>
            <td><strong>${formatNumberChaimae(inv.total_ttc)}</strong> DH</td>
            <td><span style="color:#2196f3;">${inv.created_by || '-'}</span></td>
            <td style="text-align:center;">
                <div style="display:flex;gap:0.5rem;justify-content:center;">
                    <button onclick="handleValidateInvoiceChaimae('${inv.id}', 'validated')" class="btn-action btn-validate" title="Valider" style="background:#4caf50;color:white;border:none;padding:0.4rem 0.8rem;border-radius:4px;cursor:pointer;">
                        ✅ Valider
                    </button>
                    <button onclick="handleValidateInvoiceChaimae('${inv.id}', 'rejected')" class="btn-action btn-reject" title="Rejeter" style="background:#f44336;color:white;border:none;padding:0.4rem 0.8rem;border-radius:4px;cursor:pointer;">
                        ❌ Rejeter
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

window.toggleValidationQueueChaimae = function () {
    const content = document.getElementById('validationQueueContentChaimae');
    const icon = document.getElementById('toggleValidationIconChaimae');
    if (content.style.display === 'none') {
        content.style.display = 'block';
        icon.textContent = '▲';
    } else {
        content.style.display = 'none';
        icon.textContent = '▼';
    }
};

window.handleValidateInvoiceChaimae = async function (id, status) {
    const currentUserChaimae = JSON.parse(localStorage.getItem('user') || '{}');
    const isAdminViewerChaimae = currentUserChaimae.email === 'redouanerrebbahi99@gmail.com';
    if (!isAdminViewerChaimae) {
        window.notify?.error('Erreur', 'Action réservée à l\'admin', 3000);
        return;
    }
    const action = status === 'validated' ? 'valider' : 'rejeter';
    const confirmMessage = `Êtes-vous sûr de vouloir ${action} ce document ?`;

    const confirmed = await customConfirm('Confirmation', confirmMessage, status === 'validated' ? 'info' : 'warning');
    if (confirmed) {
        try {
            const currentUserVal = JSON.parse(localStorage.getItem('user') || '{}');
            const result = await window.electron.dbChaimae.validateInvoice(id, status, currentUserVal.email || '');
            if (result.success) {
                window.notify.success('Succès', `Le document a été ${status === 'validated' ? 'validé' : 'rejeté'}.`);
                loadInvoicesChaimae(); // Reload everything
            } else {
                window.notify.error('Erreur', result.error);
            }
        } catch (error) {
            console.error('Error validating invoice:', error);
            window.notify.error('Erreur', error.message);
        }
    }
};

// Select year card
window.selectYearCardChaimae = function (year) {
    selectedYearChaimae = year;

    // Re-render cards to update selection
    populateFiltersChaimae();

    // Filter invoices by year
    filterInvoicesChaimae();
}

// Display global invoices in separate section
function displayGlobalInvoicesChaimae(globalInvoices) {
    const section = document.getElementById('globalInvoicesSectionChaimae');
    const tbody = document.getElementById('globalInvoicesBodyChaimae');
    const count = document.getElementById('globalInvoicesCountChaimae');

    if (!section || !tbody || !count) return;

    if (globalInvoices.length === 0) {
        section.style.display = 'none';
        return;
    }

    section.style.display = 'block';
    count.textContent = globalInvoices.length;

    tbody.innerHTML = globalInvoices.map(invoice => {
        const date = (window.safeParseDate||function(d){return new Date(d)})(invoice.document_date).toLocaleDateString('fr-FR');
        const totalTTC = formatNumberChaimae(invoice.total_ttc || 0);

        return `
            <tr style="background: #2d2d30; border-top: 1px solid #3e3e42;">
                <td style="text-align: center; padding: 0.75rem;"><strong style="color: #cccccc;">#${invoice.id}</strong></td>
                <td style="padding: 0.75rem;"><strong style="color: #9c27b0;">${invoice.document_numero}</strong></td>
                <td style="padding: 0.75rem; color: #cccccc;">${invoice.client_nom}</td>
                <td style="padding: 0.75rem; color: #cccccc;">${date}</td>
                <td style="padding: 0.75rem;"><strong style="color: #4caf50;">${totalTTC} DH</strong></td>
                <td style="padding: 0.75rem;">
                    <div style="display: flex; gap: 0.5rem; justify-content: center;">
                        <button class="btn-icon btn-view" onclick="viewGlobalInvoiceChaimae(${invoice.id})" title="Voir">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                            </svg>
                        </button>
                        <button class="btn-icon btn-download" onclick="window.downloadGlobalInvoicePDF(${invoice.id})" title="Télécharger PDF">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                                <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                            </svg>
                        </button>
                        <button class="btn-icon btn-edit" onclick="editGlobalInvoiceChaimae(${invoice.id})" title="Modifier">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                            </svg>
                        </button>
                        <button class="btn-icon btn-delete" onclick="deleteGlobalInvoiceChaimae(${invoice.id})" title="Supprimer">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                            </svg>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

// Toggle global invoices visibility
window.toggleGlobalInvoicesChaimae = function () {
    const table = document.getElementById('globalInvoicesTableChaimae');
    const icon = document.getElementById('toggleGlobalIconChaimae');

    if (table && icon) {
        if (table.style.display === 'none') {
            table.style.display = 'block';
            icon.textContent = '▲';
        } else {
            table.style.display = 'none';
            icon.textContent = '▼';
        }
    }
}

// Edit global invoice
window.editGlobalInvoiceChaimae = function (id) {
    console.log('✏️✏️✏️ [EDIT BUTTON CLICKED!!!] Global Invoice ID:', id);
    console.log('📍📍📍 [LOCATION] editGlobalInvoiceChaimae function called');
    console.log('✅✅✅ [CONFIRMATION] تم الضغط على زر التعديل - الدالة تعمل!');

    // Store the invoice ID in sessionStorage for the edit page
    sessionStorage.setItem('editGlobalInvoiceId', id);

    console.log('🔄 [NAVIGATION] Navigating to edit page...');
    router.navigate('/edit-global-invoice-chaimae');

    console.log('✅ [DONE] Edit button action completed');
}

// Delete global invoice
window.deleteGlobalInvoiceChaimae = async function (id) {
    const confirmed = await customConfirm('Confirmation', 'Êtes-vous sûr de vouloir supprimer cette facture globale ?', 'warning');
    if (!confirmed) {
        return;
    }

    try {
        const result = await window.electron.dbChaimae.deleteGlobalInvoice(id);

        if (result.success) {
            window.notify.success('Succès', 'Facture globale supprimée avec succès', 3000);
            loadInvoicesChaimae();
        } else {
            window.notify.error('Erreur', result.error || 'Impossible de supprimer', 3000);
        }
    } catch (error) {
        console.error('Error deleting global invoice:', error);
        window.notify.error('Erreur', 'Une erreur est survenue', 3000);
    }
}

// Display invoices in table with pagination
function displayInvoicesChaimae(invoices) {
    const tableBody = document.getElementById('invoicesTableBodyChaimae');
    const emptyState = document.getElementById('emptyStateChaimae');
    const resultsCounter = document.getElementById('resultsCounterChaimae');
    const resultCount = document.getElementById('resultCountChaimae');
    const pagination = document.getElementById('paginationChaimae');

    if (invoices.length === 0) {
        if (tableBody) tableBody.innerHTML = '';
        if (emptyState) emptyState.style.display = 'flex';
        if (resultsCounter) resultsCounter.style.display = 'none';
        if (pagination) pagination.style.display = 'none';
        return;
    }

    if (emptyState) emptyState.style.display = 'none';
    if (resultsCounter) resultsCounter.style.display = 'block';
    if (resultCount) resultCount.textContent = invoices.length;

    if (!tableBody) return;

    // Use the globally selected year from card
    const selectedYear = selectedYearChaimae;

    // Calculate pagination
    const totalItems = invoices.length;
    const itemsPerPage = itemsPerPageChaimae === 'all' ? totalItems : parseInt(itemsPerPageChaimae);
    const totalPages = itemsPerPageChaimae === 'all' ? 1 : Math.ceil(totalItems / itemsPerPage);

    // Adjust current page if needed
    if (currentPageChaimae > totalPages) {
        currentPageChaimae = totalPages || 1;
    }

    // Get items for current page
    const startIndex = (currentPageChaimae - 1) * itemsPerPage;
    const endIndex = itemsPerPageChaimae === 'all' ? totalItems : startIndex + itemsPerPage;
    const paginatedInvoices = invoices.slice(startIndex, endIndex);

    tableBody.innerHTML = paginatedInvoices.map((invoice, index) => {
        // Calculate display ID: if year is selected, use sequential_id, otherwise use database id
        let displayId;
        if (selectedYear && invoice.year == selectedYear) {
            // Use sequential_id for the selected year (starts from 1)
            displayId = invoice.sequential_id || invoice.id;
        } else if (selectedYear) {
            // If year filter is active but this invoice is from different year, use sequential numbering
            displayId = startIndex + index + 1;
        } else {
            // No year filter: use database id
            displayId = invoice.id;
        }
        console.log('📊 Invoice data:', {
            id: invoice.id,
            total_ht: invoice.total_ht,
            total_ttc: invoice.total_ttc,
            type: typeof invoice.total_ht
        });

        let typeLabel = '';
        let badgeStyle = '';

        if (invoice.document_type === 'facture') {
            typeLabel = '📄 Facture';
            badgeStyle = 'background: #4caf5020; color: #4caf50; border: 1px solid #4caf50;';
        } else if (invoice.document_type === 'devis') {
            typeLabel = '📋 Devis';
            badgeStyle = 'background: #2196f320; color: #2196f3; border: 1px solid #2196f3;';
        } else if (invoice.document_type === 'facture_globale') {
            typeLabel = '📦 Facture Globale';
            badgeStyle = 'background: #9c27b020; color: #ce93d8; border: 1px solid #9c27b0;';
        } else {
            typeLabel = '📦 Bon de livraison';
            badgeStyle = 'background: #ff980020; color: #ff9800; border: 1px solid #ff9800;';
        }

        const typeBadgeHTML = `<span class="badge" style="${badgeStyle} padding: 4px 8px; border-radius: 6px; font-weight: 500; font-size: 0.85rem; display: inline-flex; align-items: center; gap: 4px;">${typeLabel}</span>`;
        const numero = invoice.document_numero || invoice.document_numero_devis || invoice.document_numero_bl || '-';

        // Debug BL field
        if (invoice.document_type === 'bon_livraison') {
            console.log(`📦 [BL DEBUG] Invoice ${invoice.id}:`, {
                document_numero: invoice.document_numero,
                document_numero_BL: invoice.document_numero_BL,
                document_numero_bl: invoice.document_numero_bl,
                final_numero: numero
            });
        }
        const date = (window.safeParseDate||function(d){return new Date(d)})(invoice.document_date).toLocaleDateString('fr-FR');

        const totalHT = formatNumberChaimae(invoice.total_ht || 0);
        const tva = (invoice.tva_rate !== undefined && invoice.tva_rate !== null && invoice.tva_rate !== '') ? invoice.tva_rate : 20;
        const totalTTC = formatNumberChaimae(invoice.total_ttc || 0);

        console.log('📊 Formatted values:', {
            totalHT,
            totalTTC
        });

        console.log('👤 User info for invoice', invoice.id, ':', {
            created_by_user_name: invoice.created_by_user_name,
            created_by_user_id: invoice.created_by_user_id,
            created_by_user_email: invoice.created_by_user_email,
            all_keys: Object.keys(invoice)
        });

        // Additional info
        let additionalInfo = '';
        if (invoice.document_type === 'facture') {
            if (invoice.document_numero_Order || invoice.document_numero_order) {
                additionalInfo += `<div style="font-size: 0.85rem; color: #2196f3; margin-top: 0.25rem;">📋 N° Order: ${invoice.document_numero_Order || invoice.document_numero_order}</div>`;
            }
            if (invoice.document_bon_de_livraison) {
                additionalInfo += `<div style="font-size: 0.85rem; color: #4caf50; margin-top: 0.25rem;">📦 Bon de livraison: ${invoice.document_bon_de_livraison}</div>`;
            }
        }
        if (invoice.document_type === 'bon_livraison' && invoice.document_numero_commande && invoice.document_numero_commande.trim() !== '' && invoice.document_numero_commande !== 'null') {
            additionalInfo += `<div style="font-size: 0.85rem; color: #ff9800; margin-top: 0.25rem;">📋 N° Order: ${invoice.document_numero_commande}</div>`;
        }
        if (invoice.document_type === 'facture_globale' && invoice.bon_count) {
            additionalInfo += `<div style="font-size: 0.85rem; color: #9c27b0; margin-top: 0.25rem;">📦 ${invoice.bon_count} Bons de livraison</div>`;
        }

        // Show red/yellow indicators - but NOT for invoices created by current user
        const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
        const isUnseen = invoice.validation_status === 'pending' && invoice.created_by_user_id !== currentUser.id;
        const isModified = invoice.is_modified === true;

        // Determine row style
        let rowClass = '';
        let rowStyle = '';

        if (invoice.creation_method === 'converted') {
            rowClass = 'row-converted';
        } else if (isModified) {
            // Modified takes precedence over simple Unseen
            rowStyle = 'background-color: rgba(255, 152, 0, 0.1); font-weight: bold;'; // Orange tint for modified
        } else if (isUnseen) {
            rowClass = 'row-unseen';
            rowStyle = 'background-color: rgba(244, 67, 54, 0.1); font-weight: bold;'; // Red tint for unseen
        }

        // Validation status badge
        // Validation badge removed per user request
        let validationBadge = '';

        return `
            <tr class="${rowClass}" style="${rowStyle}">
                <td style="text-align: center; padding: 1rem 0.75rem; border-right: 1px solid #3e3e42;">
                    <div style="display: flex; align-items: center; gap: 0.4rem; justify-content: center;">
                        <input type="checkbox" class="invoice-checkbox-chaimae" data-invoice-id="${invoice.id}" 
                               style="width: 18px; height: 18px; cursor: pointer;">
                        ${isSuperUserChaimae ? `<span onclick="event.stopPropagation(); toggleFeaturedChaimae(${invoice.id}, this)" 
                              style="cursor: pointer; font-size: 1.2rem; transition: all 0.2s; filter: ${invoice.is_featured ? 'none' : 'grayscale(1) opacity(0.3)'};" 
                              title="${invoice.is_featured ? 'Retirer des importantes' : 'Marquer comme importante'}"
                              data-featured="${invoice.is_featured ? '1' : '0'}">${invoice.is_featured ? '⭐' : '☆'}</span>` : ''}
                    </div>
                </td>
                <td style="padding: 1rem 0.75rem; border-right: 1px solid #3e3e42;">${typeBadgeHTML}</td>
                <td style="padding: 1rem 0.75rem; border-right: 1px solid #3e3e42;">
                    <strong style="color: #2196f3;">${numero}</strong>
                    ${additionalInfo}
                </td>
                <td style="padding: 1rem 0.75rem; border-right: 1px solid #3e3e42; color: #cccccc;">${invoice.client_nom}</td>
                <td class="col-ice-chaimae-body" style="padding: 1rem 0.75rem; border-right: 1px solid #3e3e42; ${columnVisibilityChaimae.ice ? '' : 'display: none;'}"><small style="color: #999;">${invoice.client_ice || '-'}</small></td>
                <td style="padding: 1rem 0.75rem; border-right: 1px solid #3e3e42; color: #cccccc;">${date}</td>
                <td style="text-align: left; padding: 1rem 0.75rem; border-right: 1px solid #3e3e42;" class="col-totalHT-chaimae"><strong style="color: #cccccc;">${totalHT} DH</strong></td>
                <td style="padding: 1rem 0.75rem; border-right: 1px solid #3e3e42;"><strong style="color: #4caf50;">${totalTTC} DH</strong></td>
                <td style="padding: 0.5rem; border-right: 1px solid #3e3e42; text-align: center; white-space: nowrap; font-size: 0.85rem;" class="col-createdByCombined-chaimae">
                    <div style="display: flex; flex-direction: column; gap: 0.2rem;">
                        <span style="color: #2196f3; font-weight: bold;">👤 Créé par: ${invoice.created_by_user_name || invoice.created_by || '-'}</span>
                         ${isModified && invoice.updated_by_user_name && invoice.updated_by_user_name !== invoice.created_by_user_name ?
                `<span style="color: #ff9800; font-weight: bold;">📝 Modifié par: ${invoice.updated_by_user_name}</span>` : ''}
                        ${invoice.delivered_by ? `<span style="color: #ff9800;">📦 Livré par: ${invoice.delivered_by}</span>` : ''}
                    </div>
                </td>
                <td style="padding: 1rem 0.75rem; border-right: 1px solid #3e3e42; text-align: center;">
                    ${invoice.document_type === 'devis' ? '<span style="color:#666;">—</span>' : `<select onchange="this.style.background=this.value==='accuse'?'#4caf50':this.value==='en_attente'?'#ff9800':this.value==='sans_accuse'?'#f44336':this.value==='done'?'#2196f3':'#424242'; updateArStatusChaimae(${invoice.id}, this.value)" 
                            style="padding: 0.4rem; background: ${invoice.ar_status === 'accuse' ? '#4caf50' : (invoice.ar_status === 'en_attente' ? '#ff9800' : (invoice.ar_status === 'sans_accuse' ? '#f44336' : (invoice.ar_status === 'done' ? '#2196f3' : '#424242')))}; color: white; border: none; border-radius: 4px; font-size: 0.85rem; cursor: pointer; width: 100%;">
                        <option value="" ${!invoice.ar_status ? 'selected' : ''} style="background: #424242; color: #fff;"></option>
                        <option value="sans_accuse" ${invoice.ar_status === 'sans_accuse' ? 'selected' : ''} style="background: #f44336; color: #fff;">Sans accusé</option>
                        <option value="en_attente" ${invoice.ar_status === 'en_attente' ? 'selected' : ''} style="background: #424242; color: #ff9800;">En attente</option>
                        <option value="accuse" ${invoice.ar_status === 'accuse' ? 'selected' : ''} style="background: #424242; color: #4caf50;">Accusé</option>
                        <option value="done" ${invoice.ar_status === 'done' ? 'selected' : ''} style="background: #424242; color: #2196f3;">Done</option>
                    </select>`}
                </td>
                <td style="padding: 1rem 0.75rem; border-right: 1px solid #3e3e42; text-align: center;">
                    ${invoice.document_type === 'facture' ? `<div onclick="event.stopPropagation()" style="text-align:center;">
                        <select onchange="window.handlePaymentChangeChaimae('${invoice.id}', this.value, this, '${(invoice.payment_status || '').replace(/'/g, "\\'")}')"
                            style="padding: 0.4rem; background: ${(invoice.payment_status === 'payé') ? '#4caf50' : '#f44336'}; color: white; border: none; border-radius: 4px; font-size: 0.85rem; cursor: pointer; width: 100%; transition: background 0.3s;"
                            onclick="event.stopPropagation()">
                        <option value="en attente de paiement" ${invoice.payment_status !== 'payé' ? 'selected' : ''} style="background: #424242; color: #f44336;">En attente de paiement</option>
                        <option value="payé" ${invoice.payment_status === 'payé' ? 'selected' : ''} style="background: #424242; color: #4caf50;">Payé</option>
                        </select>
                        ${invoice.payment_status === 'payé' && invoice.payment_method ? `<div style="font-size:0.7rem;color:#81c784;margin-top:2px;">${invoice.payment_method}</div>` : ''}
                    </div>` : '<span style="color:#666;">—</span>'}
                </td>
                <td style="padding: 1rem 0.75rem; border-right: 1px solid #3e3e42; text-align: center;">
                    <div id="attachmentIndicator-${invoice.id}" onclick="viewAttachmentsChaimae(${invoice.id})" style="cursor: pointer;">
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
                        </svg>`
            }
                    </div>
                </td>
                <td style="padding: 1rem 0.75rem; text-align: center;">
                    ${validationBadge}
                    <div style="display: flex; gap: 0.5rem; justify-content: center; margin-top: 0.5rem;">
                        <button class="btn-icon btn-view" onclick="viewInvoiceChaimae(${invoice.id})" title="Voir">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                            </svg>
                        </button>
                        <button class="btn-icon btn-download" onclick="window.downloadInvoicePDFChaimae(${invoice.id})" title="Télécharger PDF">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                                <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                            </svg>
                        </button>
                        <button class="btn-icon btn-edit" onclick="editInvoiceChaimae(${invoice.id})" title="Modifier">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                            </svg>
                        </button>
                        <button class="btn-icon btn-delete" onclick="deleteInvoiceChaimae(${invoice.id})" title="Supprimer">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                            </svg>
                        </button>
                        ${invoice.document_type === 'devis' ? `
                        <button class="btn-icon" onclick="downloadAsOtherCompany(${invoice.id}, 'chaimae')" title="Télécharger comme autre société" style="background: linear-gradient(135deg, #FF9800, #9C27B0, #4CAF50); color: white;">
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

    // Add event listeners to checkboxes
    document.querySelectorAll('.invoice-checkbox-chaimae').forEach(checkbox => {
        checkbox.addEventListener('change', updateSelectAllChaimae);
    });

    // Update pagination controls
    updatePaginationControlsChaimae(totalPages);
}

// Update pagination controls
function updatePaginationControlsChaimae(totalPages) {
    const pagination = document.getElementById('paginationChaimae');
    const pageNumbers = document.getElementById('pageNumbersChaimae');
    const prevBtn = document.getElementById('prevPageChaimae');
    const nextBtn = document.getElementById('nextPageChaimae');

    if (!pagination || !pageNumbers) return;

    // Show/hide pagination
    if (totalPages <= 1 && itemsPerPageChaimae !== 'all') {
        pagination.style.display = 'none';
        return;
    }

    if (itemsPerPageChaimae === 'all') {
        pagination.style.display = 'none';
        return;
    }

    pagination.style.display = 'block';

    // Update prev/next buttons
    if (prevBtn) {
        prevBtn.disabled = currentPageChaimae === 1;
        prevBtn.style.opacity = currentPageChaimae === 1 ? '0.5' : '1';
        prevBtn.style.cursor = currentPageChaimae === 1 ? 'not-allowed' : 'pointer';
    }

    if (nextBtn) {
        nextBtn.disabled = currentPageChaimae === totalPages;
        nextBtn.style.opacity = currentPageChaimae === totalPages ? '0.5' : '1';
        nextBtn.style.cursor = currentPageChaimae === totalPages ? 'not-allowed' : 'pointer';
    }

    // Generate page numbers
    let pagesHTML = '';
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPageChaimae - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // First page
    if (startPage > 1) {
        pagesHTML += `<button onclick="goToPageChaimae(1)" style="padding: 0.5rem 0.75rem; background: #3e3e42; color: #ffffff; border: none; border-radius: 4px; cursor: pointer;">1</button>`;
        if (startPage > 2) {
            pagesHTML += `<span style="color: #cccccc; padding: 0 0.5rem;">...</span>`;
        }
    }

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
        const isActive = i === currentPageChaimae;
        pagesHTML += `<button onclick="goToPageChaimae(${i})" style="padding: 0.5rem 0.75rem; background: ${isActive ? '#2196f3' : '#3e3e42'}; color: #ffffff; border: none; border-radius: 4px; cursor: pointer; font-weight: ${isActive ? '600' : 'normal'};">${i}</button>`;
    }

    // Last page
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            pagesHTML += `<span style="color: #cccccc; padding: 0 0.5rem;">...</span>`;
        }
        pagesHTML += `<button onclick="goToPageChaimae(${totalPages})" style="padding: 0.5rem 0.75rem; background: #3e3e42; color: #ffffff; border: none; border-radius: 4px; cursor: pointer;">${totalPages}</button>`;
    }

    pageNumbers.innerHTML = pagesHTML;
}

// Change items per page
window.changeItemsPerPageChaimae = function () {
    const select = document.getElementById('itemsPerPageChaimae');
    itemsPerPageChaimae = select.value;
    currentPageChaimae = 1;
    displayInvoicesChaimae(filteredInvoicesChaimae);
}

// Toggle Type dropdown (unified)
window.toggleTypeDropdownChaimae = function() {
    const dropdown = document.getElementById('typeDropdownChaimae');
    const display  = document.getElementById('typeDropdownDisplayChaimae');
    const arrow    = document.getElementById('typeDropdownArrowChaimae');
    if (!dropdown) return;
    const isOpen = dropdown.style.display !== 'none';
    dropdown.style.display = isOpen ? 'none' : 'block';
    if (display) {
        display.style.borderColor  = isOpen ? '#3e3e42' : '#4caf50';
        display.style.background   = isOpen ? '#252526' : '#2a2a2e';
    }
    if (arrow) arrow.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
}

// Close dropdown when clicking outside
document.addEventListener('click', function(e) {
    const wrapper = document.getElementById('typeDropdownWrapperChaimae');
    const dropdown = document.getElementById('typeDropdownChaimae');
    const display  = document.getElementById('typeDropdownDisplayChaimae');
    if (wrapper && dropdown && !wrapper.contains(e.target)) {
        dropdown.style.display = 'none';
        if (display) display.style.borderColor = '#3e3e42';
    }
});

// Update Type selection text
window.updateTypeSelectionChaimae = function() {
    filterInvoicesChaimae();
}

// Handle select change for Type de document - syncs toggle buttons visually
window.onTypeSelectChaimae = function(value) {
    const map = {
        'facture':       { btn: 'typeToggleFactureChaimae', check: 'typeCheckFactureChaimae' },
        'devis':         { btn: 'typeToggleDevisChaimae',   check: 'typeCheckDevisChaimae'   },
        'bon_livraison': { btn: 'typeToggleBLChaimae',      check: 'typeCheckBLChaimae'      }
    };
    Object.entries(map).forEach(([type, ids]) => {
        const btn   = document.getElementById(ids.btn);
        const check = document.getElementById(ids.check);
        const active = (value === type);
        if (btn) {
            btn.dataset.active = active ? 'true' : 'false';
            btn.style.background   = active ? 'rgba(76,175,80,0.12)' : '#1e1e1e';
            btn.style.borderColor  = active ? '#4caf50' : '#3e3e42';
            btn.style.color        = active ? '#fff' : '#aaa';
        }
        if (check) {
            check.style.background  = active ? '#4caf50' : 'transparent';
            check.style.borderColor = active ? '#4caf50' : '#3e3e42';
            check.textContent       = active ? '\u2713' : '';
        }
    });
    filterInvoicesChaimae();
};

// Toggle type checkbox inside unified dropdown
window.toggleTypeChaimae = function(type) {
    const map = {
        'facture':       { btn: 'typeToggleFactureChaimae', check: 'typeCheckFactureChaimae' },
        'devis':         { btn: 'typeToggleDevisChaimae',   check: 'typeCheckDevisChaimae'   },
        'bon_livraison': { btn: 'typeToggleBLChaimae',      check: 'typeCheckBLChaimae'      }
    };
    const ids = map[type];
    if (!ids) return;
    const btn   = document.getElementById(ids.btn);
    const check = document.getElementById(ids.check);
    if (!check) return;

    const isActive = btn ? btn.dataset.active === 'true' : check.dataset.active === 'true';
    const nowActive = !isActive;

    if (btn) btn.dataset.active = nowActive ? 'true' : 'false';
    check.dataset.active = nowActive ? 'true' : 'false';
    check.style.background  = nowActive ? '#4caf50' : 'transparent';
    check.style.borderColor = nowActive ? '#4caf50' : '#3e3e42';
    check.textContent       = nowActive ? '\u2713' : '';

    // Update display text
    const labels = { facture: 'Factures', devis: 'Devis', bon_livraison: 'Bon de livraison' };
    const activeTypes = Object.keys(map).filter(t => {
        const b = document.getElementById(map[t].btn);
        const c = document.getElementById(map[t].check);
        return (b ? b.dataset.active : c?.dataset.active) === 'true';
    });
    const textEl = document.getElementById('typeSelectedTextChaimae');
    if (textEl) {
        if (activeTypes.length === 0) textEl.textContent = 'Tous les types';
        else if (activeTypes.length === 1) textEl.textContent = labels[activeTypes[0]];
        else textEl.textContent = activeTypes.map(t => labels[t]).join(', ');
    }

    filterInvoicesChaimae();
};

// Toggle Search Type dropdown
window.toggleSearchTypeDropdownChaimae = function() {
    const dropdown = document.getElementById('searchTypeDropdownChaimae');
    const display  = document.getElementById('searchTypeDropdownDisplayChaimae');
    const arrow    = document.getElementById('searchTypeDropdownArrowChaimae');
    if (!dropdown) return;
    const isOpen = dropdown.style.display !== 'none';
    dropdown.style.display = isOpen ? 'none' : 'block';
    if (display) {
        display.style.borderColor  = isOpen ? '#3e3e42' : '#4caf50';
        display.style.background   = isOpen ? '#252526' : '#2a2a2e';
    }
    if (arrow) arrow.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
}

// Close search type dropdown when clicking outside
document.addEventListener('click', function(e) {
    const wrapper = document.getElementById('searchTypeDropdownWrapperChaimae');
    const dropdown = document.getElementById('searchTypeDropdownChaimae');
    const display  = document.getElementById('searchTypeDropdownDisplayChaimae');
    if (wrapper && dropdown && !wrapper.contains(e.target)) {
        dropdown.style.display = 'none';
        if (display) {
            display.style.borderColor = '#3e3e42';
            display.style.background = '#252526';
        }
        const arrow = document.getElementById('searchTypeDropdownArrowChaimae');
        if (arrow) arrow.style.transform = 'rotate(0deg)';
    }
});

// Toggle all search types (Select All / Deselect All)
window.toggleAllSearchTypesChaimae = function() {
    const map = {
        'numero': 'searchTypeCheckNumeroChaimae',
        'order': 'searchTypeCheckOrderChaimae',
        'bon_livraison': 'searchTypeCheckBonLivraisonChaimae',
        'client': 'searchTypeCheckClientChaimae',
        'ice': 'searchTypeCheckIceChaimae',
        'product': 'searchTypeCheckProductChaimae',
        'price': 'searchTypeCheckPriceChaimae',
        'total_ht': 'searchTypeCheckTotalHtChaimae',
        'total': 'searchTypeCheckTotalChaimae'
    };
    
    // Check if all are currently selected
    const allSelected = Object.values(map).every(id => {
        const check = document.getElementById(id);
        return check?.dataset.active === 'true';
    });
    
    // Toggle all to opposite state
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
    
    // Update toggle all button text
    const toggleAllText = document.getElementById('searchTypeToggleAllTextChaimae');
    if (toggleAllText) {
        toggleAllText.textContent = newState ? 'Désélectionner tout' : 'Sélectionner tout';
    }
    
    // Update display text
    const textEl = document.getElementById('searchTypeSelectedTextChaimae');
    if (textEl) {
        if (newState) {
            textEl.textContent = 'Tous les champs';
        } else {
            textEl.textContent = 'Tous les champs';
        }
    }
    
    filterInvoicesChaimae();
};

// Toggle search type checkbox
window.toggleSearchTypeChaimae = function(type) {
    const map = {
        'numero': 'searchTypeCheckNumeroChaimae',
        'order': 'searchTypeCheckOrderChaimae',
        'bon_livraison': 'searchTypeCheckBonLivraisonChaimae',
        'client': 'searchTypeCheckClientChaimae',
        'ice': 'searchTypeCheckIceChaimae',
        'product': 'searchTypeCheckProductChaimae',
        'price': 'searchTypeCheckPriceChaimae',
        'total_ht': 'searchTypeCheckTotalHtChaimae',
        'total': 'searchTypeCheckTotalChaimae'
    };
    
    const checkId = map[type];
    if (!checkId) return;
    
    const check = document.getElementById(checkId);
    if (!check) return;

    const isActive = check.dataset.active === 'true';
    const nowActive = !isActive;

    check.dataset.active = nowActive ? 'true' : 'false';
    check.style.background  = nowActive ? '#4caf50' : 'transparent';
    check.style.borderColor = nowActive ? '#4caf50' : '#555';
    check.textContent       = nowActive ? '\u2713' : '';

    // Update display text
    const labels = {
        'numero': 'N° Document',
        'order': 'N° Order',
        'bon_livraison': 'Bon de livraison',
        'client': 'Client',
        'ice': 'ICE',
        'product': 'Produit',
        'price': 'Prix',
        'total_ht': 'Total H.T',
        'total': 'Total TTC'
    };
    
    const activeTypes = Object.keys(map).filter(t => {
        const c = document.getElementById(map[t]);
        return c?.dataset.active === 'true';
    });
    
    const textEl = document.getElementById('searchTypeSelectedTextChaimae');
    if (textEl) {
        if (activeTypes.length === 0) {
            textEl.textContent = 'Tous les champs';
        } else if (activeTypes.length === 1) {
            textEl.textContent = labels[activeTypes[0]];
        } else if (activeTypes.length === 2) {
            textEl.textContent = activeTypes.map(t => labels[t]).join(', ');
        } else {
            textEl.textContent = activeTypes.length + ' champs sélectionnés';
        }
    }
    
    // Update toggle all button text based on selection state
    const allSelected = activeTypes.length === Object.keys(map).length;
    const toggleAllText = document.getElementById('searchTypeToggleAllTextChaimae');
    if (toggleAllText) {
        toggleAllText.textContent = allSelected ? 'Désélectionner tout' : 'Sélectionner tout';
    }

    filterInvoicesChaimae();
};

// Go to specific page
window.goToPageChaimae = function (page) {
    currentPageChaimae = page;
    displayInvoicesChaimae(filteredInvoicesChaimae);
}

// Change page (prev/next)
window.changePaginationPageChaimae = function (direction) {
    if (direction === 'prev' && currentPageChaimae > 1) {
        currentPageChaimae--;
    } else if (direction === 'next') {
        const totalItems = filteredInvoicesChaimae.length;
        const itemsPerPage = itemsPerPageChaimae === 'all' ? totalItems : parseInt(itemsPerPageChaimae);
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        if (currentPageChaimae < totalPages) {
            currentPageChaimae++;
        }
    }
    displayInvoicesChaimae(filteredInvoicesChaimae);
}

// Filter invoices
window.filterInvoicesChaimae = function () {
    // Read active types from unified dropdown checkboxes
    const checkIdMap = { facture:'typeCheckFactureChaimae', devis:'typeCheckDevisChaimae', bon_livraison:'typeCheckBLChaimae' };
    const selectedTypes = ['facture','devis','bon_livraison'].filter(t => {
        const el = document.getElementById(checkIdMap[t]);
        return el && (el.dataset.active === 'true' || document.getElementById({ facture:'typeToggleFactureChaimae', devis:'typeToggleDevisChaimae', bon_livraison:'typeToggleBLChaimae' }[t])?.dataset.active === 'true');
    });
    const filterStatus = document.getElementById('filterStatusChaimae')?.value || 'all';
    const filterAttachments = document.getElementById('filterAttachmentsChaimae')?.value || 'all';
    const filterCreationMethod = document.getElementById('filterCreationMethodChaimae')?.value || 'all';

    const filterArStatusEl = document.getElementById('filterArStatusChaimae');
    const filterArStatus = filterArStatusEl ? filterArStatusEl.value : 'all';
    console.log('🔍 [CHAIMAE] AR Filter value:', JSON.stringify(filterArStatus), 'Type:', typeof filterArStatus);
    const monthFilter = document.getElementById('filterMonthChaimae')?.value || '';
    const clientFilter = document.getElementById('filterClientChaimae')?.value || '';
    const paymentStatusFilter = document.getElementById('filterPaymentStatusChaimae')?.value || '';
    const paymentMethodFilter = document.getElementById('filterPaymentMethodChaimae')?.value || '';
    
    // Get selected search types from dropdown checkboxes
    const searchTypes = {
        numero: document.getElementById('searchTypeCheckNumeroChaimae')?.dataset.active === 'true',
        order: document.getElementById('searchTypeCheckOrderChaimae')?.dataset.active === 'true',
        bon_livraison: document.getElementById('searchTypeCheckBonLivraisonChaimae')?.dataset.active === 'true',
        client: document.getElementById('searchTypeCheckClientChaimae')?.dataset.active === 'true',
        ice: document.getElementById('searchTypeCheckIceChaimae')?.dataset.active === 'true',
        product: document.getElementById('searchTypeCheckProductChaimae')?.dataset.active === 'true',
        price: document.getElementById('searchTypeCheckPriceChaimae')?.dataset.active === 'true',
        total_ht: document.getElementById('searchTypeCheckTotalHtChaimae')?.dataset.active === 'true',
        total: document.getElementById('searchTypeCheckTotalChaimae')?.dataset.active === 'true'
    };
    
    // Check if any search type is selected
    const hasSearchTypes = Object.values(searchTypes).some(v => v);
    const searchText = document.getElementById('searchInputChaimae')?.value.toLowerCase() || '';

    const filtered = allInvoicesChaimae.filter(invoice => {
        // Status Filter (Seen/Unseen/Modified)
        const isModified = invoice.is_modified === true;

        if (filterStatus === 'unseen') {
            // Unseen only shows pending invoices that are NOT modified
            if (invoice.validation_status !== 'pending' || isModified) return false;
        }
        if (filterStatus === 'seen' && invoice.validation_status === 'pending') return false;
        if (filterStatus === 'modified') {
            // Show invoices that have been modified (updated_by_user_name exists and is different from creator)
            if (!isModified) return false;
        }

        // Type filter (multi-select)
        if (selectedTypes.length > 0 && !selectedTypes.includes(invoice.document_type)) return false;

        // Attachments filter
        if (filterAttachments === 'with' && (invoice.attachment_count || 0) === 0) return false;
        if (filterAttachments === 'without' && (invoice.attachment_count || 0) > 0) return false;

        // Creation Method filter
        if (filterCreationMethod === 'normal' && invoice.creation_method !== 'normal') return false;
        if (filterCreationMethod === 'converted' && invoice.creation_method !== 'converted') return false;



        // AR Status filter (exclude devis - they don't have AR status)
        if (filterArStatus !== 'all') {
            if (invoice.document_type === 'devis') return false;
            
            // Normalize both values: treat null/undefined/empty string as empty
            const arVal = (invoice.ar_status === null || invoice.ar_status === undefined || invoice.ar_status === '') ? '' : invoice.ar_status;
            const filterVal = (filterArStatus === null || filterArStatus === undefined || filterArStatus === '') ? '' : filterArStatus;
            
            if (arVal !== filterVal) {
                console.log(`  ❌ [CHAIMAE] Invoice ${invoice.id} (${invoice.document_type}): ar_status=${JSON.stringify(invoice.ar_status)} normalized=${JSON.stringify(arVal)} vs filter=${JSON.stringify(filterVal)}`);
                return false;
            }
        }

        // Payment status filter
        if (paymentStatusFilter) {
            if (invoice.document_type !== 'facture') return false;
            if ((invoice.payment_status || 'en attente de paiement') !== paymentStatusFilter) return false;
        }

        // Payment method filter
        if (paymentMethodFilter) {
            if (invoice.document_type !== 'facture') return false;
            if ((invoice.payment_method || '') !== paymentMethodFilter) return false;
        }

        // Featured filter
        const filterFeatured = document.getElementById('filterFeaturedChaimae')?.value || 'all';
        if (filterFeatured === 'featured') {
            if (!(invoice.is_featured === 1 || invoice.is_featured === true)) return false;
        } else if (filterFeatured === 'not_featured') {
            if (invoice.is_featured === 1 || invoice.is_featured === true) return false;
        }

        // Year filter (from card selection)
        if (selectedYearChaimae) {
            const invoiceYear = invoice.year || (window.safeParseDate||function(d){return new Date(d)})(invoice.document_date).getFullYear();
            if (invoiceYear.toString() !== selectedYearChaimae) return false;
        }

        // Month filter
        if (monthFilter) {
            const invoiceMonth = String((window.safeParseDate||function(d){return new Date(d)})(invoice.document_date).getMonth() + 1).padStart(2, '0');
            if (invoiceMonth !== monthFilter) return false;
        }

        // Client filter
        if (clientFilter && invoice.client_nom !== clientFilter) return false;

        // Search filter with multi-field support
        if (searchText) {
            const numero = (invoice.document_numero || invoice.document_numero_devis || '').toLowerCase();
            const numeroBL = (invoice.document_numero_bl || '').toLowerCase();
            const order = (invoice.document_numero_Order || invoice.document_numero_order || '').toLowerCase();
            const bonLivraison = (invoice.document_bon_de_livraison || '').toLowerCase();
            const bonCommande = (invoice.document_numero_commande || '').toLowerCase();
            const client = invoice.client_nom.toLowerCase();
            const ice = (invoice.client_ice || '').toLowerCase();
            const totalTTC = (invoice.total_ttc || 0).toString();
            const totalHT = (invoice.total_ht || 0).toString();

            // Search in products and prices
            const productsText = invoice.products ?
                invoice.products.map(p => (p.designation || '').toLowerCase()).join(' ') : '';
            
            // For price search, check each product price individually
            const hasPriceMatch = invoice.products ? 
                invoice.products.some(p => {
                    const price = (p.prix_unitaire_ht || 0).toString();
                    return price.includes(searchText);
                }) : false;

            // If no search types selected, search in ALL fields
            if (!hasSearchTypes) {
                if (!numero.includes(searchText) &&
                    !numeroBL.includes(searchText) &&
                    !order.includes(searchText) &&
                    !bonCommande.includes(searchText) &&
                    !bonLivraison.includes(searchText) &&
                    !client.includes(searchText) &&
                    !ice.includes(searchText) &&
                    !productsText.includes(searchText) &&
                    !hasPriceMatch &&
                    !totalHT.includes(searchText) &&
                    !totalTTC.includes(searchText)) {
                    return false;
                }
            } else {
                // Search ONLY in selected fields (OR logic - match any selected field)
                let matchFound = false;

                if (searchTypes.numero) {
                    if (numero.includes(searchText) || numeroBL.includes(searchText)) {
                        matchFound = true;
                    }
                }
                if (searchTypes.order) {
                    if (order.includes(searchText) || bonCommande.includes(searchText)) {
                        matchFound = true;
                    }
                }
                if (searchTypes.bon_livraison) {
                    if (bonLivraison.includes(searchText) || numeroBL.includes(searchText)) {
                        matchFound = true;
                    }
                }
                if (searchTypes.client) {
                    if (client.includes(searchText)) {
                        matchFound = true;
                    }
                }
                if (searchTypes.ice) {
                    if (ice.includes(searchText)) {
                        matchFound = true;
                    }
                }
                if (searchTypes.product) {
                    if (productsText.includes(searchText)) {
                        matchFound = true;
                    }
                }
                if (searchTypes.price) {
                    if (hasPriceMatch) {
                        matchFound = true;
                    }
                }
                if (searchTypes.total_ht) {
                    if (totalHT.includes(searchText)) {
                        matchFound = true;
                    }
                }
                if (searchTypes.total) {
                    if (totalTTC.includes(searchText)) {
                        matchFound = true;
                    }
                }

                // If no match found in any selected field, exclude this invoice
                if (!matchFound) return false;
            }
        }

        return true;
    });

    filteredInvoicesChaimae = filtered;
    currentPageChaimae = 1; // Reset to first page when filtering
    displayInvoicesChaimae(filtered);
}

// Reset filters
window.resetFiltersChaimae = function () {
    // Reset type select
    const selectEl = document.getElementById('typeSelectChaimae');
    if (selectEl) selectEl.value = '';
    // Reset hidden toggle buttons
    ['typeToggleFactureChaimae','typeToggleDevisChaimae','typeToggleBLChaimae'].forEach(id => {
        const btn = document.getElementById(id);
        if (btn) btn.dataset.active = 'false';
    });
    document.getElementById('filterYearChaimae').value = '';
    document.getElementById('filterMonthChaimae').value = '';
    document.getElementById('filterClientChaimae').value = '';
    if (document.getElementById('filterAttachmentsChaimae')) document.getElementById('filterAttachmentsChaimae').value = 'all';
    if (document.getElementById('filterCreationMethodChaimae')) document.getElementById('filterCreationMethodChaimae').value = 'all';

    if (document.getElementById('filterArStatusChaimae')) document.getElementById('filterArStatusChaimae').value = 'all';
    if (document.getElementById('filterFeaturedChaimae')) document.getElementById('filterFeaturedChaimae').value = 'all';
    
    // Uncheck all search type checkboxes in dropdown
    const searchTypeChecks = [
        'searchTypeCheckNumeroChaimae',
        'searchTypeCheckOrderChaimae',
        'searchTypeCheckBonLivraisonChaimae',
        'searchTypeCheckClientChaimae',
        'searchTypeCheckIceChaimae',
        'searchTypeCheckProductChaimae',
        'searchTypeCheckPriceChaimae',
        'searchTypeCheckTotalHtChaimae',
        'searchTypeCheckTotalChaimae'
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
    
    // Reset search type dropdown text
    const searchTypeText = document.getElementById('searchTypeSelectedTextChaimae');
    if (searchTypeText) searchTypeText.textContent = 'Tous les champs';
    
    document.getElementById('searchInputChaimae').value = '';

    filteredInvoicesChaimae = allInvoicesChaimae;
    displayInvoicesChaimae(allInvoicesChaimae);
}

// Sort table by column
let currentSortColumnChaimae = null;
let currentSortDirectionChaimae = 'asc';

window.sortTableChaimae = function (column) {
    // Toggle sort direction if clicking same column
    if (currentSortColumnChaimae === column) {
        currentSortDirectionChaimae = currentSortDirectionChaimae === 'asc' ? 'desc' : 'asc';
    } else {
        currentSortColumnChaimae = column;
        currentSortDirectionChaimae = 'asc';
    }

    // Update sort icons
    ['numero', 'date', 'total_ht', 'total_ttc'].forEach(col => {
        const icon = document.getElementById(`sortIcon${col.charAt(0).toUpperCase() + col.slice(1).replace('_', '')}Chaimae`);
        if (icon) {
            if (col === column) {
                icon.textContent = currentSortDirectionChaimae === 'asc' ? '↑' : '↓';
                icon.style.color = '#4caf50';
            } else {
                icon.textContent = '⇅';
                icon.style.color = '';
            }
        }
    });

    // Sort the filtered invoices
    const sorted = [...filteredInvoicesChaimae].sort((a, b) => {
        let valueA, valueB;

        switch (column) {
            case 'numero':
                // Extract numeric part from document number
                const getNumero = (inv) => {
                    const numero = inv.document_numero || inv.document_numero_devis || inv.document_numero_bl || '';
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

        if (currentSortDirectionChaimae === 'asc') {
            return valueA - valueB;
        } else {
            return valueB - valueA;
        }
    });

    // Update filtered invoices and display
    filteredInvoicesChaimae = sorted;
    currentPageChaimae = 1; // Reset to first page
    displayInvoicesChaimae(sorted);

    console.log(`📊 [CHAIMAE] Sorted by ${column} (${currentSortDirectionChaimae})`);
};

// Update select all checkbox
function updateSelectAllChaimae() {
    const selectAll = document.getElementById('selectAllChaimae');
    const checkboxes = document.querySelectorAll('.invoice-checkbox-chaimae');
    const checkedBoxes = document.querySelectorAll('.invoice-checkbox-chaimae:checked');

    if (selectAll && checkboxes.length > 0) {
        selectAll.checked = checkboxes.length === checkedBoxes.length;
        selectAll.indeterminate = checkedBoxes.length > 0 && checkedBoxes.length < checkboxes.length;
    }

    updateSelectedCountChaimae();
}

// Select all invoices
window.selectAllInvoicesChaimae = function () {
    const selectAll = document.getElementById('selectAllChaimae');
    const checkboxes = document.querySelectorAll('.invoice-checkbox-chaimae');

    checkboxes.forEach(cb => {
        cb.checked = selectAll.checked;
    });

    updateSelectedCountChaimae();
}

// Update selected count
function updateSelectedCountChaimae() {
    const checkedBoxes = document.querySelectorAll('.invoice-checkbox-chaimae:checked');
    const count = checkedBoxes.length;

    // Check if all selected are Bon de livraison from same client
    let allBonsFromSameClient = false;
    let selectedClient = null;
    let bonCount = 0;

    if (count > 0) {
        const selectedIds = Array.from(checkedBoxes).map(cb => parseInt(cb.dataset.invoiceId));
        const selectedInvoices = filteredInvoicesChaimae.filter(inv => selectedIds.includes(inv.id));

        // Check if all are bon_livraison
        const allAreBons = selectedInvoices.every(inv => inv.document_type === 'bon_livraison');

        if (allAreBons && selectedInvoices.length > 0) {
            selectedClient = selectedInvoices[0].client_nom;
            allBonsFromSameClient = selectedInvoices.every(inv => inv.client_nom === selectedClient);
            bonCount = selectedInvoices.length;
        }
    }

    // Update button text with count
    const deleteBtn = document.getElementById('bulkDeleteTextChaimae');
    const downloadBtn = document.getElementById('bulkDownloadTextChaimae');

    if (deleteBtn) {
        deleteBtn.textContent = count > 0 ? `Supprimer (${count})` : 'Supprimer';
    }
    if (downloadBtn) {
        downloadBtn.textContent = count > 0 ? `Télécharger (${count})` : 'Télécharger';
    }
}

// SQLite to PostgreSQL Migration Function
window.handleSQLiteMigration = async function () {
    const confirmed = await customConfirm(
        '🔄 Migration SQLite → PostgreSQL',
        'Cette opération va transférer TOUTES les données (Factures, Clients, Produits) des bases SQLite locales vers PostgreSQL.\n\n⚠️ Assurez-vous que:\n1. Le serveur PostgreSQL est démarré\n2. La base de données "facture_db" existe\n3. Vous avez une sauvegarde de vos données SQLite\n\nContinuer ?',
        'warning'
    );

    if (!confirmed) return;

    const loadingNotif = window.notify.loading('Migration en cours...', 'Ceci peut prendre plusieurs minutes pour 2000+ factures');

    try {
        // PostgreSQL config (matching server.js)
        const pgConfig = {
            user: 'postgres',
            host: 'localhost',
            database: 'facture_db',
            password: '123456',
            port: 5432
        };

        const result = await window.electron.ipcRenderer.invoke('db:migrate:postgres', pgConfig);
        window.notify.remove(loadingNotif);

        if (result.success) {
            let message = 'Migration terminée avec succès!\n\n';
            result.results.forEach(r => {
                if (r.status === 'success') {
                    message += `✅ ${r.name}: ${r.count} enregistrements migrés\n`;
                } else if (r.status === 'skipped') {
                    message += `⏭️ ${r.name}: ${r.message}\n`;
                } else {
                    message += `❌ ${r.name}: ${r.message}\n`;
                }
            });

            window.notify.success('Migration réussie', message, 10000);

            // Reload the page to show migrated data
            setTimeout(() => loadInvoicesChaimae(), 2000);
        } else {
            window.notify.error('Échec de la migration', result.error, 8000);
        }
    } catch (error) {
        window.notify.remove(loadingNotif);
        console.error('Migration error:', error);
        window.notify.error('Erreur critique', error.message, 5000);
    }
};

// Mark invoice as seen (validated)
window.markAsSeenChaimae = async function (id) {
    const currentUserChaimae = JSON.parse(localStorage.getItem('user') || '{}');
    const isAdminViewerChaimae = currentUserChaimae.email === 'redouanerrebbahi99@gmail.com';
    if (!isAdminViewerChaimae) {
        window.notify.error('Erreur', 'Action réservée à l\'admin', 3000);
        return;
    }
    try {
        const result = await window.electron.dbChaimae.validateInvoice(id, 'validated', currentUserChaimae.email || '');
        if (result.success) {
            window.notify.success('Succès', 'Facture marquée comme lue', 3000);

            // Close modal if open
            const modal = document.querySelector('.invoice-view-overlay');
            if (modal) modal.remove();

            // Reload list
            loadInvoicesChaimae();

            // Update badges if function exists
            if (typeof updatePendingCounts === 'function') updatePendingCounts();
        } else {
            window.notify.error('Erreur', 'Impossible de marquer comme lue', 3000);
        }
    } catch (error) {
        console.error('Error marking as seen:', error);
        window.notify.error('Erreur', 'Erreur serveur', 3000);
    }
}

// View invoice
window.viewInvoiceChaimae = async function (id, documentType) {
    try {
        // Check if this is a global invoice
        if (documentType === 'facture_globale') {
            viewGlobalInvoiceChaimae(id);
            return;
        }

        const currentUserForView = JSON.parse(localStorage.getItem('user') || '{}');
        const result = await window.electron.dbChaimae.getInvoiceById(id, currentUserForView.email || '');

        if (!result.success || !result.data) {
            window.notify.error('Erreur', 'Document introuvable', 3000);
            return;
        }

        const invoice = result.data;
        console.log('🔍 [CLIENT_IF DEBUG CHAIMAE] client_if value:', JSON.stringify(invoice.client_if), 'client_id:', invoice.client_id);
        const date = (window.safeParseDate||function(d){return new Date(d)})(invoice.document_date).toLocaleDateString('fr-FR');
        const typeLabel = invoice.document_type === 'facture' ? 'Facture' :
            invoice.document_type === 'devis' ? 'Devis' :
                'Bon de livraison';
        const docNumber = invoice.document_numero || invoice.document_numero_devis || invoice.document_numero_bl || '-';

        // Auto-validate if pending or modified - ONLY for Admin users
        const currentUserChaimae = JSON.parse(localStorage.getItem('user') || '{}');
        const isAdminViewerChaimae = currentUserChaimae.email === 'redouanerrebbahi99@gmail.com';
        
        if (isAdminViewerChaimae && (invoice.validation_status === 'pending' || invoice.is_modified)) {
            console.log('📝 [AUTO-VALIDATE] Admin viewing - clearing highlights...');
            try {
                await window.electron.dbChaimae.validateInvoice(id, 'validated', currentUserChaimae.email || '');
                console.log('✅ [AUTO-VALIDATE] Invoice validated & is_modified reset');
                invoice.validation_status = 'validated';
                invoice.is_modified = false;
                const localInv = allInvoicesChaimae.find(inv => inv.id === id);
                if (localInv) { localInv.validation_status = 'validated'; localInv.is_modified = false; }
                const filteredInv = filteredInvoicesChaimae.find(inv => inv.id === id);
                if (filteredInv) { filteredInv.validation_status = 'validated'; filteredInv.is_modified = false; }
                displayInvoicesChaimae(filteredInvoicesChaimae);
                if (typeof updatePendingCounts === 'function') {
                    setTimeout(() => updatePendingCounts(), 500);
                }
            } catch (error) {
                console.error('❌ [AUTO-VALIDATE] Error:', error);
            }
        } else if (!isAdminViewerChaimae) {
            console.log('ℹ️ [AUTO-VALIDATE] Regular user viewing - keeping validation_status and is_modified unchanged');
        }

        const overlay = document.createElement('div');
        overlay.className = 'invoice-view-overlay';
        overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.85);z-index:9999;display:flex;align-items:center;justify-content:center;padding:2rem;';

        const modal = document.createElement('div');
        modal.style.cssText = 'background:#2d2d30;border-radius:16px;max-width:900px;width:100%;max-height:90vh;overflow-y:auto;box-shadow:0 25px 50px rgba(0,0,0,0.5);';

        modal.innerHTML = `
            <div style="background:#1e1e1e;padding:1.5rem 2rem;border-radius:16px 16px 0 0;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #3e3e42;">
                <div style="display:flex;align-items:center;gap:1rem;">
                    <svg width="24" height="24" viewBox="0 0 16 16" fill="currentColor" style="color:#fff;">
                        <path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z"/>
                    </svg>
                    <h2 style="color:#fff;margin:0;font-size:1.3rem;font-weight:600;">Détails du ${typeLabel} #${docNumber}</h2>
                </div>
                <div style="display:flex;align-items:center;gap:1rem;flex-wrap:wrap;">
                    ${isSuperUserChaimae ? `
                    <button id="toggleFeaturedBtn${id}" onclick="toggleFeaturedInModalChaimae(${id}, this)" style="padding:0.6rem 1.2rem;background:${invoice.is_featured ? '#ffa726' : '#666'};color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:0.9rem;font-weight:600;display:flex;align-items:center;gap:0.5rem;transition:all 0.2s;" onmouseover="this.style.opacity='0.9'" onmouseout="this.style.opacity='1'" data-featured="${invoice.is_featured ? '1' : '0'}">
                        <span style="font-size:1.1rem;">${invoice.is_featured ? '⭐' : '☆'}</span>
                        ${invoice.is_featured ? 'Retirer des importantes' : 'Marquer comme importante'}
                    </button>
                    ` : ''}
                    ${invoice.validation_status === 'pending' ? `
                    <button onclick="markAsSeenChaimae(${id})" style="padding:0.6rem 1.2rem;background:#4caf50;color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:0.9rem;font-weight:600;display:flex;align-items:center;gap:0.5rem;transition:all 0.2s;box-shadow: 0 4px 6px rgba(0,0,0,0.2);" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                        </svg>
                        Marquer comme lu
                    </button>
                    ` : ''}
                    <button onclick="downloadInvoicePDFChaimae(${id})" style="padding:0.6rem 1.2rem;background:#2196F3;color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:0.9rem;font-weight:600;display:flex;align-items:center;gap:0.5rem;transition:all 0.2s;" onmouseover="this.style.background='#1976D2'" onmouseout="this.style.background='#2196F3'">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                        </svg>
                        Télécharger PDF
                    </button>
                    <button onclick="downloadBonDeTravauxPDFChaimae(${id})" style="padding:0.6rem 1.2rem;background:#E91E63;color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:0.9rem;font-weight:600;display:flex;align-items:center;gap:0.5rem;transition:all 0.2s;" onmouseover="this.style.background='#C2185B'" onmouseout="this.style.background='#E91E63'">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                        </svg>
                        Télécharger Bon de travaux
                    </button>
                    <button id="closeViewModal" style="background:none;border:none;color:#999;cursor:pointer;font-size:1.5rem;padding:0;width:32px;height:32px;display:flex;align-items:center;justify-content:center;border-radius:4px;transition:all 0.2s;" onmouseover="this.style.background='#3e3e42';this.style.color='#fff'" onmouseout="this.style.background='none';this.style.color='#999'">×</button>
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
                            <button onclick="showEditPaymentModalChaimae(${invoice.id}, '${(invoice.payment_status || 'en attente de paiement').replace(/'/g, "\\'")}', '${(invoice.payment_method || '').replace(/'/g, "\\'")}')" style="padding:0.4rem 1rem;background:#1565c0;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:0.8rem;">Modifier le paiement</button>
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
                        ${invoice.document_type === 'facture' && (invoice.document_numero_Order || invoice.document_numero_order) ? `
                        <div style="margin-bottom:0.75rem;">
                            <span style="color:#999;font-size:0.9rem;">N° Order:</span>
                            <div style="color:#fff;font-weight:500;margin-top:0.25rem;">${invoice.document_numero_Order || invoice.document_numero_order}</div>
                        </div>
                        ` : ''}
                        ${invoice.document_type === 'facture' && invoice.document_bon_de_livraison ? `
                        <div style="margin-bottom:0.75rem;">
                            <span style="color:#999;font-size:0.9rem;">Bon de livraison:</span>
                            <div style="color:#fff;font-weight:500;margin-top:0.25rem;">${invoice.document_bon_de_livraison}</div>
                        </div>
                        ` : ''}
                        ${invoice.document_type === 'bon_livraison' && (invoice.document_numero_commande || invoice.document_numero_order) ? `
                        <div style="margin-bottom:0.75rem;">
                            <span style="color:#999;font-size:0.9rem;">N° Order:</span>
                            <div style="color:#fff;font-weight:500;margin-top:0.25rem;">${invoice.document_numero_commande || invoice.document_numero_order}</div>
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
                                ${invoice.products.map((p, idx) => `
                                    <tr style="border-bottom:1px solid #3e3e42;">
                                        <td style="padding:0.75rem;color:#fff;max-width:300px;word-wrap:break-word;white-space:normal;overflow-wrap:break-word;">${p.designation}</td>
                                        <td style="padding:0.75rem;text-align:center;color:#fff;white-space:nowrap;">${p.quantite}</td>
                                        <td style="padding:0.75rem;text-align:right;color:#fff;white-space:nowrap;">${formatNumberChaimae(parseFloat(p.prix_unitaire_ht))} DH</td>
                                        <td style="padding:0.75rem;text-align:right;color:#fff;font-weight:500;white-space:nowrap;">${formatNumberChaimae(parseFloat(p.total_ht))} DH</td>
                                    </tr>
                                `).join('')}
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
                            <span style="color:#fff;font-weight:600;">${formatNumberChaimae(invoice.total_ht)} DH</span>
                        </div>
                        <div style="display:flex;justify-content:space-between;margin-bottom:0.75rem;">
                            <span style="color:#999;">TVA (${invoice.tva_rate}%):</span>
                            <span style="color:#fff;font-weight:600;">${formatNumberChaimae(invoice.montant_tva)} DH</span>
                        </div>
                        <div style="display:flex;justify-content:space-between;padding-top:0.75rem;border-top:1px solid #3e3e42;">
                            <span style="color:#fff;font-weight:600;">Total TTC:</span>
                            <span style="color:#4CAF50;font-weight:700;font-size:1.1rem;">${formatNumberChaimae(invoice.total_ttc)} DH</span>
                        </div>
                    </div>
                </div>
                
                <!-- Notes Section -->
                <div style="margin-bottom:2rem;" id="notesSection${id}">
                    <h3 style="color:#fff;font-size:1.1rem;margin:0 0 1rem 0;font-weight:600;">📝 Notes (PDF)</h3>
                    <div style="background:#1e1e1e;padding:1rem;border-radius:8px;">
                        <div style="color:#999;font-size:0.9rem;font-style:italic;">Chargement...</div>
                    </div>
                </div>

                <!-- Private Notes Section (Admin Only) -->
                ${isSuperUserChaimae ? `
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
                <div style="margin-bottom:2rem;" id="attachmentsSectionChaimae${id}">
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;">
                        <h3 style="color:#fff;font-size:1.1rem;margin:0;font-weight:600;"> Pièces jointes(${invoice.attachments ? invoice.attachments.length : 0})</h3>
                        <button onclick="addNewAttachmentChaimae(${id})" style="padding:0.5rem 1rem;background:#4CAF50;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:0.85rem;font-weight:600;display:flex;align-items:center;gap:0.5rem;transition:all 0.2s;" onmouseover="this.style.background='#45a049'" onmouseout="this.style.background='#4CAF50'">
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
                                        <button onclick="openAttachmentChaimae(${a.id})" style="padding:0.4rem 0.8rem;background:#2196F3;color:#fff;border:none;border-radius:4px;cursor:pointer;font-size:0.8rem;">
                                            👁️ Ouvrir
                                        </button>
                                        <button onclick="deleteAttachmentChaimae(${a.id}, ${id})" style="padding:0.4rem 0.8rem;background:#f44336;color:#fff;border:none;border-radius:4px;cursor:pointer;font-size:0.8rem;display:flex;align-items:center;gap:0.4rem;">
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
                <div id="auditLogSection${id}">
                    <h3 style="color:#fff;font-size:1.1rem;margin:0 0 1rem 0;font-weight:600;">📋 Historique des modifications</h3>
                    <div style="background:#1e1e1e;border-radius:8px;padding:1rem;">
                        <div style="color:#999;font-size:0.9rem;font-style:italic;">Chargement de l'historique...</div>
                    </div>
                </div>
            </div>
        `;

        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        // Helper: update local data and re-render after viewing invoice
        const _refreshAfterViewChaimae = () => {
            const localInv = allInvoicesChaimae.find(inv => inv.id === id);
            if (localInv) {
                localInv.validation_status = 'validated';
                localInv.is_modified = false;
            }
            const filteredInv = filteredInvoicesChaimae.find(inv => inv.id === id);
            if (filteredInv) {
                filteredInv.validation_status = 'validated';
                filteredInv.is_modified = false;
            }
            displayInvoicesChaimae(filteredInvoicesChaimae);
            if (typeof updatePendingCounts === 'function') {
                setTimeout(() => updatePendingCounts(), 300);
            }
        };

        document.getElementById('closeViewModal').onclick = () => { overlay.remove(); _refreshAfterViewChaimae(); };
        overlay.onclick = (e) => {
            if (e.target === overlay) { overlay.remove(); _refreshAfterViewChaimae(); }
        };

        // Load notes asynchronously
        console.log('📝 [NOTES VIEW] Loading notes for invoice:', id);
        const noteResult = await window.electron.dbChaimae.getNote(id);
        console.log('📥 [NOTES VIEW] Note result:', noteResult);
        const notesSection = document.getElementById(`notesSection${id}`);
        if (notesSection) {
            const notesContent = notesSection.querySelector('div > div');
            if (noteResult.success && noteResult.data) {
                console.log('✅ [NOTES VIEW] Displaying note:', noteResult.data);
                notesContent.style.color = '#fff';
                notesContent.style.fontStyle = 'normal';
                notesContent.style.whiteSpace = 'pre-wrap';
                notesContent.textContent = noteResult.data;
            } else {
                console.log('ℹ️ [NOTES VIEW] No note found');
                notesContent.textContent = 'Aucune note';
            }
        }

        // Load audit log asynchronously
        console.log('📋 [AUDIT LOG] Loading audit log for invoice:', id);
        const auditLogSection = document.getElementById(`auditLogSection${id}`);
        if (auditLogSection) {
            const auditLogContent = auditLogSection.querySelector('div > div');
            try {
                // Check if function exists
                if (!window.electron.dbChaimae.getAuditLog) {
                    console.error('❌ [AUDIT LOG] getAuditLog function not found in window.electron.dbChaimae');
                    console.log('📋 [AUDIT LOG] Available functions:', Object.keys(window.electron.dbChaimae));
                    throw new Error('getAuditLog function not available');
                }

                const auditResult = await window.electron.dbChaimae.getAuditLog(id);
                console.log('📥 [AUDIT LOG] Audit log result:', auditResult);

                let auditHTML = '<div style="max-height: 400px; overflow-y: auto; display: flex; flex-direction: column; gap: 0.75rem;">';

                // 1. ADD CREATION INFO (from invoice object)
                const createdDate = (window.safeParseDate||function(d){return new Date(d)})(invoice.created_at).toLocaleDateString('fr-FR', {
                    day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
                });
                auditHTML += `
                    <div style="padding:0.75rem;background:#252526;border-radius:8px;border-left:4px solid #2196f3;box-shadow: 0 2px 4px rgba(0,0,0,0.2);">
                        <div style="display:flex;justify-content:space-between;align-items:start;">
                            <div>
                                <div style="color:#2196f3;font-weight:700;font-size:0.95rem;margin-bottom:0.25rem;">🔵 CRÉATION</div>
                                <div style="color:#fff;">Document créé par: <strong>${invoice.created_by_user_name || 'Système'}</strong></div>
                                ${invoice.created_by_user_email ? `<div style="color:#999;font-size:0.85rem;">${invoice.created_by_user_email}</div>` : ''}
                            </div>
                            <div style="color:#999;font-size:0.85rem;white-space:nowrap;background:#1e1e1e;padding:2px 6px;border-radius:4px;">${createdDate}</div>
                        </div>
                    </div>
                `;

                // 2. ADD DELIVERY INFO (if exists)
                if (invoice.delivered_by && invoice.delivered_by !== '-') {
                    auditHTML += `
                        <div style="padding:0.75rem;background:#252526;border-radius:8px;border-left:4px solid #ff9800;box-shadow: 0 2px 4px rgba(0,0,0,0.2);">
                            <div style="display:flex;justify-content:space-between;align-items:start;">
                                <div>
                                    <div style="color:#ff9800;font-weight:700;font-size:0.95rem;margin-bottom:0.25rem;">🟠 LIVRAISON</div>
                                    <div style="color:#fff;">Chargé de livraison: <strong>${invoice.delivered_by}</strong></div>
                                </div>
                                <div style="color:#999;font-size:0.85rem;font-style:italic;">Assigné à la création</div>
                            </div>
                        </div>
                    `;
                }

                // 3. ADD MODIFICATION LOGS
                if (auditResult.success && auditResult.data && auditResult.data.length > 0) {
                    auditResult.data.forEach(log => {
                        const logDate = (window.safeParseDate||function(d){return new Date(d)})(log.created_at).toLocaleDateString('fr-FR', {
                            day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
                        });
                        auditHTML += `
                            <div style="padding:0.75rem;background:#252526;border-radius:8px;border-left:4px solid #4CAF50;box-shadow: 0 2px 4px rgba(0,0,0,0.2);">
                                <div style="display:flex;justify-content:space-between;align-items:start;">
                                    <div>
                                        <div style="color:#4CAF50;font-weight:700;font-size:0.95rem;margin-bottom:0.25rem;">✏️ MODIFICATION</div>
                                        <div style="color:#fff;">Mis à jour par: <strong>${log.user_name}</strong></div>
                                        ${log.user_email ? `<div style="color:#999;font-size:0.85rem;">${log.user_email}</div>` : ''}
                                        ${log.action === 'update' ? '<div style="color:#888;font-size:0.8rem;margin-top:0.25rem;">Modifications apportées au document</div>' : ''}
                                    </div>
                                    <div style="color:#999;font-size:0.85rem;white-space:nowrap;background:#1e1e1e;padding:2px 6px;border-radius:4px;">${logDate}</div>
                                </div>
                            </div>
                        `;
                    });
                }

                auditHTML += '</div>';
                auditLogContent.innerHTML = auditHTML;
                auditLogContent.style.color = '#fff';
                auditLogContent.style.fontStyle = 'normal';
            } catch (error) {
                console.error('❌ [AUDIT LOG] Error loading audit log:', error);
                auditLogContent.innerHTML = '<div style="color:#f44336;">Erreur lors du chargement de l\'historique</div>';
            }
        }

    } catch (error) {
        console.error('Error viewing invoice:', error);
        window.notify.error('Erreur', 'Impossible de charger les détails', 3000);
    }
}

// Edit invoice
window.editInvoiceChaimae = async function (id) {
    console.log('✏️ [EDIT] Opening edit page for invoice ID:', id);
    // Clear highlights immediately (validate + reset is_modified)
    try {
        const currentUserChaimae = JSON.parse(localStorage.getItem('user') || '{}');
        const isAdminViewerChaimae = currentUserChaimae.email === 'redouanerrebbahi99@gmail.com';
        if (isAdminViewerChaimae) {
            await window.electron.dbChaimae.validateInvoice(id, 'validated', currentUserChaimae.email || '');
            const localInv = allInvoicesChaimae.find(inv => inv.id === id);
            if (localInv) { localInv.validation_status = 'validated'; localInv.is_modified = false; }
            const filteredInv = filteredInvoicesChaimae.find(inv => inv.id === id);
            if (filteredInv) { filteredInv.validation_status = 'validated'; filteredInv.is_modified = false; }
            displayInvoicesChaimae(filteredInvoicesChaimae);
            if (typeof updatePendingCounts === 'function') setTimeout(() => updatePendingCounts(), 300);
        }
    } catch (e) { console.error('❌ [EDIT CHAIMAE] Error clearing highlights:', e); }
    localStorage.setItem('editInvoiceIdChaimae', id);
    router.navigate('/edit-invoice-chaimae');
}

// Handle arrow key navigation in edit modal products (Global)
window.handleArrowNavigationEditChaimae = function (event, currentCellIndex) {
    // Only handle arrow keys
    if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
        return;
    }

    const currentRow = event.target.closest('.edit-product-row');
    const container = document.getElementById('editProductsListChaimae');
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
            addEditProductRowChaimae();
            setTimeout(() => {
                const newRows = Array.from(container.querySelectorAll('.edit-product-row'));
                targetRow = newRows[newRows.length - 1];
                focusCellEditChaimae(targetRow, targetCellIndex);
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
        focusCellEditChaimae(targetRow, targetCellIndex);
    }
};

// Helper function to focus a specific cell in edit modal
function focusCellEditChaimae(row, cellIndex) {
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
window.addEditProductRowChaimae = function () {
    const container = document.getElementById('editProductsListChaimae');
    // Remove "no products" message if exists
    const noProductsMsg = container.querySelector('p');
    if (noProductsMsg) noProductsMsg.remove();

    const row = document.createElement('div');
    row.className = 'edit-product-row';
    row.innerHTML = `
        <textarea placeholder="Désignation" rows="2" onkeydown="handleArrowNavigationEditChaimae(event, 0)"></textarea>
        <input type="text" placeholder="Quantité" onchange="recalculateEditTotalsChaimae()" onkeydown="handleArrowNavigationEditChaimae(event, 1)">
        <input type="number" step="0.01" placeholder="Prix HT" value="0" onchange="recalculateEditTotalsChaimae()" onkeydown="handleArrowNavigationEditChaimae(event, 2)">
        <button type="button" onclick="this.closest('.edit-product-row').remove(); recalculateEditTotalsChaimae()">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
            </svg>
        </button>
    `;
    container.appendChild(row);
}

// Bon de livraison field - No auto-formatting (user enters value as-is)

// Recalculate totals in edit modal
window.recalculateEditTotalsChaimae = function () {
    const rows = document.querySelectorAll('#editProductsListChaimae .edit-product-row');
    let totalHT = 0;

    rows.forEach(row => {
        const qty = parseFloat(row.querySelector('input[type="text"]').value) || 1;
        const price = parseFloat(row.querySelector('input[type="number"]').value) || 0;
        totalHT += qty * price;
    });

    const tvaRate = parseFloat(document.getElementById('editTvaRateChaimae').value) || 0;
    const montantTVA = totalHT * (tvaRate / 100);
    const totalTTC = totalHT + montantTVA;

    // Use simple format without spaces in edit modal
    document.getElementById('editTotalHTChaimae').textContent = totalHT.toFixed(2) + ' DH';
    document.getElementById('editMontantTVAChaimae').textContent = montantTVA.toFixed(2) + ' DH';
    document.getElementById('editTotalTTCChaimae').textContent = totalTTC.toFixed(2) + ' DH';
}

// Toggle edit prefix dropdown
window.toggleEditPrefixDropdownChaimae = async function () {
    const dropdown = document.getElementById('editPrefixDropdownChaimae');
    if (!dropdown) return;

    if (dropdown.style.display === 'none') {
        // Load prefixes from DB if not loaded
        if (!window.prefixesLoaded) {
            await loadPrefixesFromDB();
        }
        dropdown.style.display = 'block';
        renderEditPrefixListChaimae();
    } else {
        dropdown.style.display = 'none';
    }
};

// Render edit prefix list
window.renderEditPrefixListChaimae = function () {
    const listContainer = document.getElementById('editPrefixListChaimae');
    if (!listContainer) return;

    const currentPrefix = document.getElementById('editPrefixInputChaimae').value;

    listContainer.innerHTML = window.bonLivraisonPrefixes.map(prefix => `
        <div onclick="selectEditPrefixChaimae('${prefix}')" 
             style="padding: 0.75rem 1rem; margin: 0.25rem 0; background: ${prefix === currentPrefix ? 'rgba(102, 126, 234, 0.3)' : 'rgba(255,255,255,0.05)'}; border: 2px solid ${prefix === currentPrefix ? '#667eea' : 'transparent'}; border-radius: 8px; cursor: pointer; transition: all 0.3s; display: flex; justify-content: space-between; align-items: center;"
             onmouseover="if('${prefix}' !== '${currentPrefix}') { this.style.background='rgba(102, 126, 234, 0.2)'; this.style.borderColor='#667eea'; }" 
             onmouseout="if('${prefix}' !== '${currentPrefix}') { this.style.background='rgba(255,255,255,0.05)'; this.style.borderColor='transparent'; }">
            <div style="display: flex; align-items: center; gap: 0.75rem;">
                <span style="font-size: 1.2rem;">${prefix === currentPrefix ? '✓' : '📌'}</span>
                <span style="font-weight: ${prefix === currentPrefix ? '700' : '500'}; font-size: 1rem; letter-spacing: 1px; color: #fff;">${prefix}</span>
            </div>
            ${window.bonLivraisonPrefixes.length > 1 ? `
                <button onclick="event.stopPropagation(); deleteEditPrefixChaimae('${prefix}')" 
                        style="background: transparent; color: #e74c3c; border: 2px solid #e74c3c; border-radius: 6px; padding: 0.3rem 0.4rem; cursor: pointer; font-size: 0.9rem; font-weight: 600; transition: all 0.3s;"
                        onmouseover="this.style.background='#e74c3c'; this.style.color='#fff';"
                        onmouseout="this.style.background='transparent'; this.style.color='#e74c3c';">
                    🗑️
                </button>
            ` : ''}
        </div>
    `).join('');
};

// Select edit prefix
window.selectEditPrefixChaimae = function (prefix) {
    console.log('🔵 [EDIT PREFIX SELECT] Selecting prefix:', prefix);

    const prefixInput = document.getElementById('editPrefixInputChaimae');
    if (prefixInput) {
        console.log('🔴 [EDIT PREFIX SELECT] Current value before update:', prefixInput.value);
        prefixInput.value = prefix;
        console.log('✅ [EDIT PREFIX SELECT] Updated editPrefixInputChaimae to:', prefix);
        console.log('✅ [EDIT PREFIX SELECT] New value after update:', prefixInput.value);
    } else {
        console.log('❌ [EDIT PREFIX SELECT] editPrefixInputChaimae not found');
    }

    const dropdown = document.getElementById('editPrefixDropdownChaimae');
    if (dropdown) {
        dropdown.style.display = 'none';
        console.log('✅ [EDIT PREFIX SELECT] Closed dropdown');
    }

    console.log('✅ [CHAIMAE EDIT] Prefix selected:', prefix);
};

// Add new prefix in edit
window.addEditPrefixChaimae = async function () {
    const newPrefixInput = document.getElementById('editNewPrefixInputChaimae');
    if (!newPrefixInput) return;

    const newPrefix = newPrefixInput.value.trim().toUpperCase();

    if (!newPrefix) {
        window.notify.warning('Attention', 'Veuillez saisir un prefix', 2000);
        return;
    }

    if (window.bonLivraisonPrefixes.includes(newPrefix)) {
        window.notify.warning('Attention', 'Ce prefix existe déjà', 2000);
        return;
    }

    // Add to database
    const result = await window.electron.dbChaimae.addPrefix(newPrefix);

    if (result.success) {
        window.bonLivraisonPrefixes.push(newPrefix);
        window.bonLivraisonPrefixes.sort();
        newPrefixInput.value = '';

        renderEditPrefixListChaimae();
        window.notify.success('Succès', `Prefix "${newPrefix}" ajouté`, 2000);
    } else {
        window.notify.error('Erreur', result.error || 'Impossible d\'ajouter le prefix', 3000);
    }
};

// Delete prefix in edit
window.deleteEditPrefixChaimae = async function (prefix) {
    if (window.bonLivraisonPrefixes.length <= 1) {
        window.notify.warning('Attention', 'Vous devez garder au moins un prefix', 2000);
        return;
    }

    // Delete from database
    const result = await window.electron.dbChaimae.deletePrefix(prefix);

    if (result.success) {
        window.bonLivraisonPrefixes = window.bonLivraisonPrefixes.filter(p => p !== prefix);

        // If deleted prefix was selected, select first available
        const currentPrefix = document.getElementById('editPrefixInputChaimae').value;
        if (currentPrefix === prefix) {
            document.getElementById('editPrefixInputChaimae').value = window.bonLivraisonPrefixes[0];
        }

        renderEditPrefixListChaimae();
        window.notify.success('Succès', `Prefix "${prefix}" supprimé`, 2000);
    } else {
        window.notify.error('Erreur', result.error || 'Impossible de supprimer le prefix', 3000);
    }
};

// Load prefixes from database (shared function)
async function loadPrefixesFromDB() {
    if (window.prefixesLoaded) return;

    try {
        const result = await window.electron.dbChaimae.getAllPrefixes();
        if (result.success && result.data.length > 0) {
            window.bonLivraisonPrefixes = result.data;
            window.prefixesLoaded = true;
        } else {
            // Initialize default prefixes if none exist
            if (!window.bonLivraisonPrefixes) {
                window.bonLivraisonPrefixes = ['MG', 'TL', 'BL'];
            }
        }
    } catch (error) {
        console.error('Error loading prefixes:', error);
        if (!window.bonLivraisonPrefixes) {
            window.bonLivraisonPrefixes = ['MG', 'TL', 'BL'];
        }
    }
}

// ==================== EDIT ORDER PREFIX FUNCTIONS ====================

// Toggle edit order prefix dropdown
window.toggleEditOrderPrefixDropdownChaimae = async function () {
    const dropdown = document.getElementById('editOrderPrefixDropdownChaimae');
    if (!dropdown) return;

    if (dropdown.style.display === 'none') {
        await loadEditOrderPrefixesFromDB();
        renderEditOrderPrefixListChaimae();
        dropdown.style.display = 'block';
    } else {
        dropdown.style.display = 'none';
    }
};

// Render edit order prefix list
function renderEditOrderPrefixListChaimae() {
    const listContainer = document.getElementById('editOrderPrefixListChaimae');
    if (!listContainer) return;

    if (!window.orderPrefixes || window.orderPrefixes.length === 0) {
        window.orderPrefixes = ['BC', 'CMD', 'ORD'];
    }

    listContainer.innerHTML = window.orderPrefixes.map(prefix => `
        <div onclick="selectEditOrderPrefixChaimae('${prefix}')" 
             style="margin: 0.35rem; padding: 0.75rem 1rem; cursor: pointer; border-radius: 8px; transition: all 0.3s; color: #fff; display: flex; justify-content: space-between; align-items: center; background: ${prefix === window.selectedOrderPrefix ? 'linear-gradient(90deg, #2196f3 0%, #1976d2 100%)' : 'rgba(255,255,255,0.05)'}; border: 2px solid ${prefix === window.selectedOrderPrefix ? '#2196f3' : 'transparent'};"
             onmouseover="if('${prefix}' !== window.selectedOrderPrefix) { this.style.background='rgba(33, 150, 243, 0.2)'; this.style.borderColor='#2196f3'; }" 
             onmouseout="if('${prefix}' !== window.selectedOrderPrefix) { this.style.background='rgba(255,255,255,0.05)'; this.style.borderColor='transparent'; }">
            <div style="display: flex; align-items: center; gap: 0.75rem;">
                <span style="font-size: 1.2rem;">${prefix === window.selectedOrderPrefix ? '✓' : '📌'}</span>
                <span style="font-weight: ${prefix === window.selectedOrderPrefix ? '700' : '500'}; font-size: 1rem;">${prefix}</span>
            </div>
            ${window.orderPrefixes.length > 1 ? `
                <button onclick="event.stopPropagation(); deleteEditOrderPrefixChaimae('${prefix}')" 
                        style="background: transparent; color: #e74c3c; border: 2px solid #e74c3c; border-radius: 6px; padding: 0.3rem 0.4rem; cursor: pointer; transition: all 0.3s;"
                        onmouseover="this.style.background='#e74c3c'; this.style.color='#fff';"
                        onmouseout="this.style.background='transparent'; this.style.color='#e74c3c';">
                    🗑️
                </button>
            ` : ''}
        </div>
    `).join('');
}

// Select edit order prefix
window.selectEditOrderPrefixChaimae = function (prefix) {
    window.selectedOrderPrefix = prefix;

    const prefixInput = document.getElementById('editOrderPrefixInputChaimae');
    const prefixExample = document.getElementById('editOrderPrefixExampleChaimae');

    if (prefixInput) prefixInput.value = prefix;
    if (prefixExample) prefixExample.textContent = prefix;

    const dropdown = document.getElementById('editOrderPrefixDropdownChaimae');
    if (dropdown) dropdown.style.display = 'none';

    renderEditOrderPrefixListChaimae();
};

// Add new edit order prefix
window.addEditNewOrderPrefixChaimae = async function () {
    const newPrefixInput = document.getElementById('editNewOrderPrefixInputChaimae');
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

        renderEditOrderPrefixListChaimae();
        window.notify.success('Succès', `Prefix "${newPrefix}" ajouté`, 2000);
    } else {
        window.notify.error('Erreur', result.error || 'Impossible d\'ajouter le prefix', 3000);
    }
};

// Delete edit order prefix
window.deleteEditOrderPrefixChaimae = async function (prefix) {
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
                const prefixInput = document.getElementById('editOrderPrefixInputChaimae');
                const prefixExample = document.getElementById('editOrderPrefixExampleChaimae');
                if (prefixInput) prefixInput.value = window.selectedOrderPrefix;
                if (prefixExample) prefixExample.textContent = window.selectedOrderPrefix;
            }

            renderEditOrderPrefixListChaimae();
            window.notify.success('Succès', `Prefix "${prefix}" supprimé`, 2000);
        }
    } else {
        window.notify.error('Erreur', result.error || 'Impossible de supprimer le prefix', 3000);
    }
};

// Load edit order prefixes from database
async function loadEditOrderPrefixesFromDB() {
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

// ==================== END EDIT ORDER PREFIX FUNCTIONS ====================

// Format number helper (duplicate - will be removed)
function formatNumberChaimaeOld(num) {
    return parseFloat(num).toFixed(2);
}

// Handle edit form submit
async function handleEditSubmitChaimae(e, invoiceId, documentType) {
    e.preventDefault();

    try {
        // Get prefix and numero
        // For Bon de livraison: combine prefix + numero
        // For Facture/Devis: use numero directly (no prefix)
        const prefixInput = document.getElementById('editPrefixInputChaimae');
        const numeroInput = document.getElementById('editNumeroChaimae');

        let fullNumero;
        if (prefixInput && prefixInput.offsetParent !== null) {
            // Prefix input is visible (Bon de livraison)
            const prefix = prefixInput.value || '';
            const numero = numeroInput?.value || '';

            // 🔍 DEBUG: Log what we're getting
            console.log('🔴 [DEBUG] PREFIX VALUE:', prefix);
            console.log('🔴 [DEBUG] NUMERO VALUE:', numero);
            console.log('🔴 [DEBUG] PREFIX length:', prefix.length, 'NUMERO starts with PREFIX?', numero.startsWith(prefix));

            // ✅ FIX: Check if numero already contains the prefix
            // Only add prefix if numero doesn't start with it
            if (numero && prefix && numero.startsWith(prefix)) {
                fullNumero = numero; // Already has prefix, don't add it again
                console.log('⚠️ [DEBUG] NUMERO already has prefix, using as-is:', fullNumero);
            } else {
                fullNumero = prefix + numero;
                console.log('✅ [DEBUG] Adding prefix to numero:', fullNumero);
            }
        } else {
            // Prefix input is hidden (Facture/Devis)
            fullNumero = numeroInput?.value || '';
        }

        console.log('📝 [CHAIMAE EDIT] Final Full numero:', fullNumero);

        // Collect products data
        const products = [];
        document.querySelectorAll('#editProductsListChaimae .edit-product-row').forEach(row => {
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

        const updateData = {
            client: {
                nom: document.getElementById('editClientNomChaimae').value,
                ICE: document.getElementById('editClientICEChaimae').value,
                IF: document.getElementById('editClientIFChaimae')?.value || ''
            },
            document: {
                date: document.getElementById('editDateChaimae').value,
                numero: documentType === 'devis' ? null : fullNumero, // For devis, use numero_devis instead
                numero_devis: documentType === 'devis' ? fullNumero : null, // For devis, store in numero_devis
                numero_BL: documentType === 'bon_livraison' ? fullNumero : null, // For bon_livraison
                numero_Order: document.getElementById('editNumeroOrderChaimae')?.value || null,
                bon_de_livraison: document.getElementById('editBonLivraisonChaimae')?.value || null,
                numero_commande: (() => {
                    const orderValue = document.getElementById('editBonCommandeChaimae')?.value?.trim();
                    if (orderValue && documentType === 'bon_livraison') {
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
                        return `${selectedOrderPrefix}${cleanValue}`;
                    }
                    return orderValue || null;
                })()
            },
            products,
            totals: {
                total_ht: parseFloat(document.getElementById('editTotalHTChaimae').textContent.replace(' DH', '')),
                tva_rate: parseFloat(document.getElementById('editTvaRateChaimae').value),
                montant_tva: parseFloat(document.getElementById('editMontantTVAChaimae').textContent.replace(' DH', '')),
                total_ttc: parseFloat(document.getElementById('editTotalTTCChaimae').textContent.replace(' DH', ''))
            }
        };

        // Check for duplicate document numero in regular invoices
        const allInvoicesResult = await window.electron.dbChaimae.getAllInvoices('CHAIMAE');
        if (allInvoicesResult.success) {
            // Check main document number - skip current invoice
            const duplicateNumero = allInvoicesResult.data.find(inv => {
                // Always skip the current invoice being edited
                if (inv.id === invoiceId) {
                    console.log('✅ [EDIT] Skipping current invoice:', invoiceId);
                    return false;
                }

                if (documentType === 'facture') {
                    return inv.document_type === 'facture' && inv.document_numero === fullNumero;
                } else if (documentType === 'devis') {
                    return inv.document_type === 'devis' && inv.document_numero_devis === fullNumero;
                } else if (documentType === 'bon_livraison') {
                    return (inv.document_type === 'bon_livraison' || inv.document_type === 'bon de livraison') &&
                        (inv.document_numero === fullNumero ||
                            inv.document_numero_bl === fullNumero ||
                            inv.document_bon_de_livraison === fullNumero);
                }
                return false;
            });

            if (duplicateNumero) {
                const docTypeLabel = documentType === 'facture' ? 'Facture' :
                    documentType === 'devis' ? 'Devis' :
                        'Bon de livraison';
                console.error('❌ [EDIT] Duplicate found:', duplicateNumero.id, 'Number:', fullNumero);
                window.notify.error(
                    'Numéro déjà utilisé',
                    `Le N° ${docTypeLabel} "${fullNumero}" existe déjà dans un autre document. Veuillez utiliser un autre numéro.`,
                    5000
                );
                return;
            }
        }

        // Check for duplicate in global invoices (for facture only)
        if (documentType === 'facture' && fullNumero) {
            const allGlobalInvoicesResult = await window.electron.dbChaimae.getAllGlobalInvoices();
            if (allGlobalInvoicesResult.success) {
                const duplicateGlobal = allGlobalInvoicesResult.data.find(inv =>
                    inv.document_numero === fullNumero
                );

                if (duplicateGlobal) {
                    window.notify.error(
                        'Numéro déjà utilisé',
                        `Le N° Facture "${fullNumero}" existe déjà dans une facture globale. Veuillez utiliser un autre numéro.`,
                        5000
                    );
                    return;
                }
            }
        }

        if (allInvoicesResult.success) {

            // Check for duplicate N° Order if provided (for FACTURE only)
            if (documentType === 'facture' && updateData.document.numero_Order) {
                const duplicateOrder = allInvoicesResult.data.find(inv =>
                    inv.id !== invoiceId &&
                    inv.document_type === 'facture' &&
                    inv.document_numero_Order &&
                    inv.document_numero_Order.trim() === updateData.document.numero_Order.trim()
                );

                if (duplicateOrder) {
                    window.notify.error(
                        'Numéro de commande déjà utilisé',
                        `Le N° Order "${updateData.document.numero_Order}" existe déjà. Veuillez utiliser un autre numéro.`,
                        5000
                    );
                    return;
                }
            }

            // Check for duplicate Bon de livraison if provided (for FACTURE only)
            if (documentType === 'facture' && updateData.document.bon_de_livraison) {
                const duplicateBL = allInvoicesResult.data.find(inv =>
                    inv.id !== invoiceId &&
                    inv.document_type === 'facture' &&
                    inv.document_bon_de_livraison &&
                    inv.document_bon_de_livraison.trim() === updateData.document.bon_de_livraison.trim()
                );

                if (duplicateBL) {
                    window.notify.error(
                        'Bon de livraison déjà utilisé',
                        `Le Bon de livraison "${updateData.document.bon_de_livraison}" existe déjà. Veuillez utiliser un autre numéro.`,
                        5000
                    );
                    return;
                }
            }

            // Check for duplicate N° Order if provided (for BON_LIVRAISON only)
            if (documentType === 'bon_livraison' && updateData.document.numero_commande) {
                const duplicateOrderBL = allInvoicesResult.data.find(inv =>
                    inv.id !== invoiceId &&
                    (inv.document_type === 'bon_livraison' || inv.document_type === 'bon de livraison') &&
                    inv.document_numero_commande &&
                    inv.document_numero_commande.trim() === updateData.document.numero_commande.trim()
                );

                if (duplicateOrderBL) {
                    window.notify.error(
                        'Numéro de commande déjà utilisé',
                        `Le N° Order "${updateData.document.numero_commande}" existe déjà dans un autre Bon de livraison. Veuillez utiliser un autre numéro.`,
                        5000
                    );
                    return;
                }
            }
        }

        console.log('📝 Updating invoice:', invoiceId);
        console.log('📊 Update data:', updateData);

        // Update in database
        const result = await window.electron.dbChaimae.updateInvoice(invoiceId, updateData);

        console.log('📥 Update result:', result);

        if (result.success) {
            // 📝 Log user action (UPDATE)
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                if (user && window.electron.dbChaimae.addAuditLog) {
                    await window.electron.dbChaimae.addAuditLog(
                        invoiceId,
                        'UPDATE',
                        user.id,
                        user.name,
                        user.email,
                        JSON.stringify({ action: 'Updated invoice', fields: Object.keys(updateData.document) })
                    );
                    console.log('✅ Audit log recorded for invoice update');
                } else {
                    console.warn('⚠️ addAuditLog function not available or no user logged in');
                }
            } catch (auditError) {
                console.error('⚠️ Error recording audit log:', auditError);
            }

            // Check if this bon is part of any global invoice and update it
            const allGlobalInvoices = await window.electron.dbChaimae.getAllGlobalInvoices();
            if (allGlobalInvoices.success && allGlobalInvoices.data) {
                for (const globalInvoice of allGlobalInvoices.data) {
                    if (globalInvoice.bons && globalInvoice.bons.some(b => b.id === invoiceId)) {
                        // This bon is part of a global invoice - recalculate totals
                        let totalHT = 0;
                        let totalTTC = 0;

                        for (const bon of globalInvoice.bons) {
                            if (bon.id === invoiceId) {
                                // Use updated values
                                totalHT += updateData.totals.total_ht;
                                totalTTC += updateData.totals.total_ttc;
                            } else {
                                // Use existing values
                                totalHT += parseFloat(bon.total_ht) || 0;
                                totalTTC += parseFloat(bon.total_ttc) || 0;
                            }
                        }

                        const tvaRateValue = parseFloat(globalInvoice.tva_rate);
                        const tvaRate = isNaN(tvaRateValue) ? 20 : tvaRateValue;
                        const montantTVA = totalHT * (tvaRate / 100);

                        // Update global invoice
                        await window.electron.dbChaimae.updateGlobalInvoice(globalInvoice.id, {
                            document_numero: globalInvoice.document_numero,
                            document_date: globalInvoice.document_date,
                            total_ht: totalHT,
                            tva_rate: tvaRate,
                            montant_tva: montantTVA,
                            total_ttc: totalTTC,
                            bon_livraison_ids: globalInvoice.bons.map(b => b.id)
                        });

                        console.log('✅ Updated global invoice:', globalInvoice.id, 'New total:', totalTTC);
                    }
                }
            }

            // Save or delete notes
            const noteText = document.getElementById('editNotesChaimae')?.value?.trim();
            console.log('📝 [NOTES] Saving note for invoice:', invoiceId, 'Text:', noteText);
            if (noteText) {
                const noteResult = await window.electron.dbChaimae.saveNote(invoiceId, noteText);
                console.log('✅ [NOTES] Save result:', noteResult);
            } else {
                // Delete note if textarea is empty
                const deleteResult = await window.electron.dbChaimae.deleteNote(invoiceId);
                console.log('🗑️ [NOTES] Delete result:', deleteResult);
            }

            window.notify.success('Succès', 'Document mis à jour avec succès!', 3000);

            // Close modal
            document.querySelector('.modal-overlay').remove();

            // Reload list
            setTimeout(() => {
                loadInvoicesChaimae();
            }, 300);
        } else {
            console.error('❌ Update failed:', result.error);
            throw new Error(result.error || 'Échec de la mise à jour');
        }

    } catch (error) {
        console.error('Error updating invoice:', error);
        window.notify.error('Erreur', 'Impossible de mettre à jour', 3000);
    }
}

// Add attachment in edit modal
window.addEditAttachmentChaimae = async function (invoiceId) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.png,.jpg,.jpeg,.pdf';
    input.multiple = true;

    input.onchange = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        for (const file of files) {
            try {
                const arrayBuffer = await file.arrayBuffer();
                const uint8Array = new Uint8Array(arrayBuffer);

                const result = await window.electron.dbChaimae.addAttachment(
                    invoiceId,
                    file.name,
                    file.type,
                    uint8Array
                );

                if (result.success) {
                    window.notify.success('Succès', `${file.name} ajouté`, 2000);
                    // Refresh the edit modal
                    document.querySelector('.modal-overlay').remove();
                    setTimeout(() => editInvoiceChaimae(invoiceId), 300);
                } else {
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
window.deleteEditAttachmentChaimae = async function (attachmentId, invoiceId) {
    const confirmed = await customConfirm('Confirmation', 'Êtes-vous sûr de vouloir supprimer cette pièce jointe ?', 'warning');
    if (!confirmed) {
        return;
    }

    try {
        const result = await window.electron.dbChaimae.deleteAttachment(attachmentId);

        if (result.success) {
            window.notify.success('Succès', 'Pièce jointe supprimée', 2000);
            // Refresh the edit modal
            document.querySelector('.modal-overlay').remove();
            setTimeout(() => editInvoiceChaimae(invoiceId), 300);
        } else {
            window.notify.error('Erreur', result.error || 'Impossible de supprimer', 3000);
        }
    } catch (error) {
        console.error('Error deleting attachment:', error);
        window.notify.error('Erreur', 'Une erreur est survenue', 3000);
    }
}

// Show input modal for conversion - CHAIMAE VERSION
function showConvertInputModalChaimae(newType, newTypeLabel, prefillNumero = '', prefillBonLivraison = '', prefillNumeroOrder = '', prefillDeliveredBy = '') {
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
            const invoicesResult = await window.electron.dbChaimae.getAllInvoices();
            if (invoicesResult.success && invoicesResult.data && invoicesResult.data.length > 0) {
                const currentYear = new Date().getFullYear();
                const invoices = invoicesResult.data;

                // Helper function to extract numeric value
                const extractNumber = (docNumber) => {
                    if (!docNumber) return 0;
                    const match = docNumber.toString().match(/\d+/);
                    return match ? parseInt(match[0], 10) : 0;
                };

                const isForYear = (docNumber, year) => {
                    if (!docNumber) return false;
                    return docNumber.toString().endsWith('/' + year) || docNumber.toString().endsWith(year.toString());
                };

                if (newType === 'facture') {
                    const factures = invoices.filter(inv => inv.document_type === 'facture' && inv.document_numero && isForYear(inv.document_numero, currentYear));
                    if (factures.length > 0) {
                        factures.sort((a, b) => extractNumber(b.document_numero) - extractNumber(a.document_numero));
                        highestNumber = factures[0].document_numero;
                    }
                } else if (newType === 'devis') {
                    const devisList = invoices.filter(inv => inv.document_type === 'devis' && inv.document_numero_devis && isForYear(inv.document_numero_devis, currentYear));
                    if (devisList.length > 0) {
                        devisList.sort((a, b) => extractNumber(b.document_numero_devis) - extractNumber(a.document_numero_devis));
                        highestNumber = devisList[0].document_numero_devis;
                    }
                } else if (newType === 'bon_livraison') {
                    const bonsList = invoices.filter(inv =>
                        (inv.document_type === 'bon_livraison' || inv.document_type === 'bon de livraison') &&
                        (inv.document_numero || inv.document_bon_de_livraison || inv.document_numero_bl) &&
                        isForYear(inv.document_numero || inv.document_bon_de_livraison || inv.document_numero_bl, currentYear)
                    );
                    if (bonsList.length > 0) {
                        bonsList.sort((a, b) => {
                            const numA = extractNumber(a.document_numero || a.document_bon_de_livraison || a.document_numero_bl);
                            const numB = extractNumber(b.document_numero || b.document_bon_de_livraison || b.document_numero_bl);
                            return numB - numA;
                        });
                        highestNumber = bonsList[0].document_numero || bonsList[0].document_bon_de_livraison || bonsList[0].document_numero_bl;
                    }
                }
            }
        } catch (error) {
            console.error('Error getting highest numbers for conversion:', error);
        }

        // For bon_livraison, extract prefix and numero separately
        let extractedPrefix = 'MG';
        let numeroWithoutPrefix = prefillNumero;

        if (newType === 'bon_livraison' && prefillNumero) {
            // Check if prefillNumero has a prefix (MG, TL, BL, etc.)
            const match = prefillNumero.match(/^([A-Z]+)(.+)$/);
            if (match) {
                extractedPrefix = match[1]; // Extract prefix (MG, TL, BL, etc.)
                numeroWithoutPrefix = match[2]; // Extract rest (2/2025, 123/2025, etc.)

                // Update selected prefix
                window.selectedPrefixConvert = extractedPrefix;
            }
        }

        // Create floating input box
        const overlay = document.createElement('div');
        overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.95);z-index:999999;display:flex;align-items:center;justify-content:center;animation:fadeIn 0.2s;';

        const container = document.createElement('div');
        container.style.cssText = 'background:#1e1e1e;border:3px solid #9c27b0;border-radius:16px;padding:2.5rem;min-width:500px;box-shadow:0 20px 60px rgba(0,0,0,0.9);animation:slideIn 0.3s;';

        const numeroLabel = newType === 'facture' ? 'N° Facture' :
            newType === 'devis' ? 'N° Devis' :
                'N° Bon de livraison';

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
                <label style="display:block;color:#9c27b0;margin-bottom:0.75rem;font-weight:600;font-size:1.1rem;">${numeroLabel}</label>
                <div style="position:relative;">
                    <span style="position:absolute;left:12px;top:50%;transform:translateY(-50%);font-size:1.2rem;color:#9c27b0;pointer-events:none;z-index:5;">${newType === 'facture' ? '📄' : newType === 'devis' ? '📋' : '🚛'}</span>
                    ${newType === 'bon_livraison' ? `
                        <div style="display:flex;gap:0.5rem;align-items:flex-start;">
                            <div style="position:relative;flex:0 0 auto;">
                                <input type="text" id="prefixInputConvert" placeholder="MG" value="${extractedPrefix}"
                                       style="width:80px;padding:1rem;background:#2d2d30;border:2px solid #3e3e42;border-radius:8px;color:#fff;font-size:1.1rem;outline:none;cursor:pointer;font-weight:600;"
                                       readonly onclick="togglePrefixDropdownConvert()">
                                <div id="prefixDropdownConvert" style="display:none;position:absolute;top:100%;left:0;background:linear-gradient(135deg, #1e1e1e 0%, #2d2d30 100%);border:2px solid #667eea;border-radius:12px;margin-top:0.5rem;box-shadow:0 8px 24px rgba(102, 126, 234, 0.3), 0 0 0 1px rgba(102, 126, 234, 0.1);z-index:1000;min-width:200px;max-height:350px;overflow:hidden;">
                                    <div style="padding:0.75rem 1rem;background:linear-gradient(90deg, #667eea 0%, #764ba2 100%);border-bottom:2px solid rgba(102, 126, 234, 0.3);">
                                        <h4 style="margin:0;color:#fff;font-size:0.95rem;font-weight:600;letter-spacing:0.5px;">📋 Choisir un Prefix</h4>
                                    </div>
                                    <div id="prefixListConvert" style="max-height:200px;overflow-y:auto;padding:0.5rem;"></div>
                                    <div style="padding:0.75rem;border-top:2px solid rgba(102, 126, 234, 0.2);background:rgba(0,0,0,0.2);">
                                        <input type="text" id="newPrefixInputConvert" placeholder="Nouveau..."
                                               style="width:100%;padding:0.65rem;background:#1e1e1e;border:2px solid #3e3e42;border-radius:6px;color:#fff;font-size:0.9rem;outline:none;">
                                        <button type="button" onclick="addNewPrefixConvert()"
                                                style="width:100%;margin-top:0.5rem;padding:0.65rem;background:linear-gradient(90deg, #667eea 0%, #764ba2 100%);color:#fff;border:none;border-radius:6px;cursor:pointer;">
                                            ➕ Ajouter
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <input type="text" id="convertInput1Chaimae" placeholder="123/2025" value="${numeroWithoutPrefix}"
                                   style="flex:1;padding:1rem 1rem 1rem 45px;background:#2d2d30;border:2px solid #3e3e42;border-radius:8px;color:#fff;font-size:1.1rem;box-sizing:border-box;outline:none;">
                        </div>
                    ` : `
                        <input type="text" id="convertInput1Chaimae" placeholder="Ex: 548" value="${prefillNumero}"
                               style="width:100%;padding:1rem 1rem 1rem 45px;background:#2d2d30;border:2px solid #3e3e42;border-radius:8px;color:#fff;font-size:1.1rem;box-sizing:border-box;outline:none;">
                    `}
                </div>
            </div>

            <div style="margin-bottom:2rem;">
                <label style="display:block;color:#2196f3;margin-bottom:0.75rem;font-weight:600;font-size:1.1rem;">Date</label>
                <div style="position:relative;">
                    <span style="position:absolute;left:12px;top:50%;transform:translateY(-50%);font-size:1.2rem;color:#2196f3;pointer-events:none;z-index:5;">📅</span>
                    <input type="date" id="convertInputDateChaimae" 
                           style="width:100%;padding:1rem 1rem 1rem 45px;background:#2d2d30;border:2px solid #3e3e42;border-radius:8px;color:#fff;font-size:1.1rem;box-sizing:border-box;outline:none;"
                           value="${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(new Date().getDate()).padStart(2, '0')}">
                </div>
            </div>

            ${newType === 'facture' ? `
            <div style="margin-bottom:1.5rem;">
                <label style="display:block;color:#9e9e9e;margin-bottom:0.75rem;font-weight:500;font-size:1rem;">N° Order (optionnel)</label>
                <div style="position:relative;">
                    <span style="position:absolute;left:12px;top:50%;transform:translateY(-50%);font-size:1.2rem;color:#4caf50;pointer-events:none;z-index:5;">📝</span>
                    <input type="text" id="convertInput2Chaimae" placeholder="Exemple: 555" value="${prefillNumeroOrder}"
                           style="width:100%;padding:1rem 1rem 1rem 45px;background:#2d2d30;border:2px solid #3e3e42;border-radius:8px;color:#fff;font-size:1.1rem;box-sizing:border-box;outline:none;">
                </div>
            </div>
            <div style="margin-bottom:2rem;">
                <label style="display:block;color:#9e9e9e;margin-bottom:0.75rem;font-weight:500;font-size:1rem;">Bon de livraison (optionnel)</label>
                <div style="position:relative;">
                    <span style="position:absolute;left:12px;top:50%;transform:translateY(-50%);font-size:1.2rem;color:#ff9800;pointer-events:none;z-index:5;">🚛</span>
                    <input type="text" id="convertInput3Chaimae" placeholder="Exemple: 123, 123/2025" value="${prefillBonLivraison}"
                           style="width:100%;padding:1rem 1rem 1rem 45px;background:#2d2d30;border:2px solid #3e3e42;border-radius:8px;color:#fff;font-size:1.1rem;box-sizing:border-box;outline:none;">
                </div>
            </div>
            ` : ''}
            
            ${newType === 'bon_livraison' ? `
            <div style="margin-bottom:2rem;">
                <label style="display:block;color:#9e9e9e;margin-bottom:0.75rem;font-weight:500;font-size:1rem;">N° Order (optionnel)</label>
                <div style="display:flex;gap:0.5rem;align-items:flex-start;">
                    <div style="position:relative;flex:0 0 auto;">
                        <input type="text" id="convertOrderPrefixInput" placeholder="BC" value="${window.selectedOrderPrefix || 'BC'}"
                               style="width:80px;padding:1rem;background:#2d2d30;border:2px solid #3e3e42;border-radius:8px;color:#fff;font-size:1.1rem;outline:none;cursor:pointer;font-weight:600;"
                               readonly onclick="toggleConvertOrderPrefixDropdown()">
                        <div id="convertOrderPrefixDropdown" style="display:none;position:absolute;top:100%;left:0;background:linear-gradient(135deg, #1e1e1e 0%, #2d2d30 100%);border:2px solid #2196f3;border-radius:12px;margin-top:0.5rem;box-shadow:0 8px 24px rgba(33, 150, 243, 0.3), 0 0 0 1px rgba(33, 150, 243, 0.1);z-index:1000;min-width:200px;max-height:350px;overflow:hidden;">
                            <div style="padding:0.75rem 1rem;background:linear-gradient(90deg, #2196f3 0%, #1976d2 100%);border-bottom:2px solid rgba(33, 150, 243, 0.3);">
                                <h4 style="margin:0;color:#fff;font-size:0.95rem;font-weight:600;letter-spacing:0.5px;">📋 Choisir un Prefix</h4>
                            </div>
                            <div id="convertOrderPrefixList" style="max-height:200px;overflow-y:auto;padding:0.5rem;"></div>
                            <div style="padding:0.75rem;border-top:2px solid rgba(33, 150, 243, 0.2);background:rgba(0,0,0,0.2);">
                                <input type="text" id="convertNewOrderPrefixInput" placeholder="Nouveau..."
                                       style="width:100%;padding:0.65rem;background:#1e1e1e;border:2px solid #3e3e42;border-radius:6px;color:#fff;font-size:0.9rem;outline:none;">
                                <button type="button" onclick="addConvertNewOrderPrefix()"
                                        style="width:100%;margin-top:0.5rem;padding:0.65rem;background:linear-gradient(90deg, #2196f3 0%, #1976d2 100%);color:#fff;border:none;border-radius:6px;cursor:pointer;">
                                    ➕ Ajouter
                                </button>
                            </div>
                        </div>
                    </div>
                    <div style="position:relative;flex:1;">
                        <span style="position:absolute;left:12px;top:50%;transform:translateY(-50%);font-size:1.2rem;color:#2196f3;pointer-events:none;z-index:5;">📝</span>
                        <input type="text" id="convertInput2Chaimae" placeholder="456"
                               style="width:100%;padding:1rem 1rem 1rem 45px;background:#2d2d30;border:2px solid #3e3e42;border-radius:8px;color:#fff;font-size:1.1rem;box-sizing:border-box;outline:none;">
                    </div>
                </div>
            </div>
            ` : ''}

            <div style="margin-bottom:2rem;">
                <label style="display:block;color:#2196f3;margin-bottom:0.75rem;font-weight:600;font-size:1.1rem;">Créé par</label>
                <div style="position:relative;">
                    <span style="position:absolute;left:12px;top:50%;transform:translateY(-50%);font-size:1.2rem;color:#2196f3;pointer-events:none;z-index:5;">👤</span>
                    <input type="text" id="convertInputCreatedByChaimae" readonly
                           style="width:100%;padding:1rem 1rem 1rem 45px;background:#2d2d30;border:2px solid #3e3e42;border-radius:8px;color:#999;font-size:1.1rem;box-sizing:border-box;outline:none;cursor:not-allowed;"
                           value="${JSON.parse(localStorage.getItem('user'))?.name || ''}">
                </div>
            </div>

            <div style="margin-bottom:2rem;">
                <label style="display:block;color:#ff9800;margin-bottom:0.75rem;font-weight:600;font-size:1.1rem;">Livré par</label>
                <div style="position:relative;">
                    <span style="position:absolute;left:12px;top:50%;transform:translateY(-50%);font-size:1.2rem;color:#ff9800;pointer-events:none;z-index:5;">🚛</span>
                    <input type="text" id="convertInputDeliveredByChaimae" placeholder="Nom du livreur" list="convertDeliveryPersonsList"
                           style="width:100%;padding:1rem 1rem 1rem 45px;background:#2d2d30;border:2px solid #3e3e42;border-radius:8px;color:#fff;font-size:1.1rem;box-sizing:border-box;outline:none;"
                           value="${prefillDeliveredBy}">
                    <datalist id="convertDeliveryPersonsList"></datalist>
                </div>
            </div>
            
            <div style="display:flex;gap:1rem;margin-top:2rem;">
                <button id="convertBtnCancelChaimae" style="flex:1;padding:1rem;background:#fff;color:#333;border:2px solid #ddd;border-radius:8px;cursor:pointer;font-size:1.1rem;font-weight:600;transition:all 0.3s;"
                        onmouseover="this.style.background='#f5f5f5';this.style.borderColor='#bbb';" onmouseout="this.style.background='#fff';this.style.borderColor='#ddd';">
                    Annuler
                </button>
                <button id="convertBtnConfirmChaimae" style="flex:1;padding:1rem;background:#9c27b0;color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:1.1rem;font-weight:600;transition:all 0.3s;"
                        onmouseover="this.style.background='#7b1fa2';" onmouseout="this.style.background='#9c27b0';">
                    ✓ Confirmer
                </button>
            </div>
`;

        overlay.appendChild(container);
        document.body.appendChild(overlay);

        const input1 = document.getElementById('convertInput1Chaimae');
        const input2 = document.getElementById('convertInput2Chaimae');
        const input3 = document.getElementById('convertInput3Chaimae');
        const inputDeliveredBy = document.getElementById('convertInputDeliveredByChaimae');
        const btnConfirm = document.getElementById('convertBtnConfirmChaimae');
        const btnCancel = document.getElementById('convertBtnCancelChaimae');

        // Load delivery persons for autocomplete
        if (inputDeliveredBy) {
            try {
                const result = await window.electron.dbChaimae.getDeliveryPersons();
                if (result.success && result.data) {
                    const datalist = document.getElementById('convertDeliveryPersonsList');
                    if (datalist) {
                        datalist.innerHTML = result.data.map(name => `<option value="${name}">`).join('');
                    }
                }
            } catch (error) {
                console.error('Error loading delivery persons for conversion:', error);
            }
        }

        // Focus on first input
        setTimeout(() => {
            if (input1) {
                input1.focus();
                input1.select();
            }
        }, 100);

        const cleanup = () => {
            overlay.remove();
            if (editModal && wasVisible) {
                editModal.style.display = '';
            }
        };

        const handleConfirm = () => {
            let val1 = input1.value.trim();
            let val2 = input2 ? input2.value.trim() : '';
            let val3 = input3 ? input3.value.trim() : '';
            let deliveredBy = inputDeliveredBy ? inputDeliveredBy.value.trim() : '';
            const newDate = document.getElementById('convertInputDateChaimae')?.value || '';

            // For bon_livraison, check if already formatted
            const currentYear = new Date().getFullYear();
            if (newType === 'bon_livraison') {
                // Get selected prefix and combine with numero
                const selectedPrefix = window.selectedPrefix || 'MG';
                const fullNumero = selectedPrefix + val1;

                // Check if already formatted as PREFIX+XXX/YYYY (accept any prefix and any number of digits)
                const prefixPattern = new RegExp(`^[A-Z]+\\d+/\\d{4}$`);
                if (!fullNumero || !fullNumero.match(prefixPattern)) {
                    input1.style.borderColor = '#f44336';
                    input1.focus();
                    window.notify.error('Erreur', `Format invalide. Entrez des chiffres (ex: 2 → ${selectedPrefix}2/2025)`, 3000);
                    return;
                }

                // Update val1 with full numero including prefix
                val1 = fullNumero;

                // Format val2 (Order) with prefix if provided
                if (val2) {
                    const selectedOrderPrefix = window.selectedOrderPrefix || 'BC';
                    // Remove any existing prefix from all known prefixes
                    let cleanValue = val2;
                    if (window.orderPrefixes && window.orderPrefixes.length > 0) {
                        for (const prefix of window.orderPrefixes) {
                            if (cleanValue.startsWith(prefix)) {
                                cleanValue = cleanValue.substring(prefix.length);
                                break;
                            }
                        }
                    }
                    // Add the selected prefix
                    val2 = `${selectedOrderPrefix}${cleanValue}`;
                }
            } else {
                // For facture and devis - auto-add year if not present
                if (val1 && !val1.includes('/')) {
                    val1 = val1 + '/' + currentYear;
                }
                // val2 is N° Order - keep as is, no formatting needed
                // val3 is Bon de livraison - keep as is, no year suffix needed
                // (It should be entered as-is by the user, e.g., "123" or "MG123/2025")
            }

            if (!val1 || val1.startsWith('/')) {
                input1.style.borderColor = '#f44336';
                input1.focus();
                return;
            }

            // Check deliveredBy if required (for Facture and BL)
            if (newType !== 'devis' && !deliveredBy) {
                if (inputDeliveredBy) {
                    inputDeliveredBy.style.borderColor = '#f44336';
                    inputDeliveredBy.focus();
                }
                window.notify.warning('Champ requis', 'Veuillez indiquer le livreur', 3000);
                return;
            }

            cleanup();
            resolve({
                newNumero: val1,
                newNumeroOrder: val2 || null,
                newBonLivraison: val3 || null,
                newBonCommande: val2 || null,
                newDeliveredBy: deliveredBy || null,
                newDate: newDate || null
            });
        };

        btnConfirm.onclick = handleConfirm;
        btnCancel.onclick = () => {
            cleanup();
            resolve(null);
        };

        input1.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleConfirm();
        });
        if (input2) {
            input2.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') handleConfirm();
            });
        }
        if (input3) {
            input3.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') handleConfirm();
            });
        }

        // Removed overlay click to close - user must use Cancel button
    });
}

// Convert invoice type (Facture ↔ Devis ↔ Bon de livraison)
window.convertInvoiceTypeChaimae = async function (invoiceId, currentType) {
    console.log('🔄 [CONVERT CHAIMAE] Starting conversion for invoice:', invoiceId);

    // Show conversion options based on current type
    const options = [];
    if (currentType !== 'facture') options.push({ value: 'facture', label: 'Facture' });
    if (currentType !== 'devis') options.push({ value: 'devis', label: 'Devis' });
    if (currentType !== 'bon_livraison') options.push({ value: 'bon_livraison', label: 'Bon de livraison' });

    // Create conversion modal
    const modal = document.createElement('div');
    modal.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.95);z-index:999999;display:flex;align-items:center;justify-content:center;animation:fadeIn 0.2s;';

    const container = document.createElement('div');
    container.style.cssText = 'background:#1e1e1e;border:3px solid #9c27b0;border-radius:16px;padding:2.5rem;min-width:500px;box-shadow:0 20px 60px rgba(0,0,0,0.9);';

    const currentTypeLabel = currentType === 'facture' ? 'Facture' : (currentType === 'devis' ? 'Devis' : 'Bon de livraison');

    container.innerHTML = `
        <style>
            @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        </style>
        <div style="text-align:center;margin-bottom:2rem;">
            <div style="font-size:3rem;margin-bottom:1rem;">🔄</div>
            <h2 style="color:#fff;margin:0 0 0.5rem 0;font-size:1.5rem;">Convertir le document</h2>
            <p style="color:#aaa;margin:0;">Type actuel: <strong style="color:#9c27b0;">${currentTypeLabel}</strong></p>
        </div>
        
        <div style="margin-bottom:2rem;">
            <label style="display:block;color:#fff;margin-bottom:0.5rem;font-weight:500;">Convertir en:</label>
            <select id="convertTypeSelect" style="width:100%;padding:0.75rem;background:#2a2a2a;border:2px solid #444;border-radius:8px;color:#fff;font-size:1rem;cursor:pointer;">
                ${options.map(opt => `<option value="${opt.value}">${opt.label}</option>`).join('')}
            </select>
        </div>
        
        <div style="display:flex;gap:1rem;justify-content:center;">
            <button id="cancelConvert" style="padding:0.75rem 2rem;background:#444;color:#fff;border:none;border-radius:8px;cursor:pointer;font-weight:500;font-size:1rem;">
                Annuler
            </button>
            <button id="confirmConvert" style="padding:0.75rem 2rem;background:#9c27b0;color:#fff;border:none;border-radius:8px;cursor:pointer;font-weight:500;font-size:1rem;">
                ✓ Suivant
            </button>
        </div>
    `;

    modal.appendChild(container);
    document.body.appendChild(modal);

    // Handle cancel
    document.getElementById('cancelConvert').onclick = () => {
        modal.remove();
    };

    // Handle confirm
    document.getElementById('confirmConvert').onclick = async () => {
        const newType = document.getElementById('convertTypeSelect').value;
        const newTypeLabel = newType === 'facture' ? 'Facture' : (newType === 'devis' ? 'Devis' : 'Bon de livraison');
        modal.remove();

        try {
            // Get current invoice data
            const result = await window.electron.dbChaimae.getInvoiceById(invoiceId);
            if (!result.success || !result.data) {
                throw new Error('Document introuvable');
            }

            const invoice = result.data;

            // Get current document number based on type
            let currentNumero = '';
            if (currentType === 'facture') {
                currentNumero = invoice.document_numero || '';
            } else if (currentType === 'devis') {
                currentNumero = invoice.document_numero_devis || '';
            } else if (currentType === 'bon_livraison') {
                currentNumero = invoice.document_numero || '';
            }

            // Process numero based on conversion direction
            let prefillBonLivraison = '';

            if (newType === 'bon_livraison' && currentNumero) {
                // Converting TO bon_livraison: Add MG prefix if not present
                if (!currentNumero.startsWith('MG')) {
                    // Extract just the number part (remove /year if present)
                    const numPart = currentNumero.split('/')[0];
                    const year = new Date().getFullYear();
                    currentNumero = `MG${numPart}/${year}`;
                }
            } else if ((currentType === 'bon_livraison') && (newType === 'facture' || newType === 'devis') && currentNumero) {
                // Converting FROM bon_livraison to Facture/Devis
                // Keep the original BL number WITH MG for the "Bon de livraison" field
                prefillBonLivraison = currentNumero; // Keep MG123/2025

                // Remove MG prefix for the main document number
                if (currentNumero.startsWith('MG')) {
                    currentNumero = currentNumero.substring(2); // Remove 'MG' -> 123/2025
                }
            }

            // Get N° Order from bon_livraison if converting to facture
            let prefillNumeroOrder = '';
            if (currentType === 'bon_livraison' && newType === 'facture' && invoice.document_numero_commande) {
                prefillNumeroOrder = invoice.document_numero_commande;
            }

            // Show input modal for document numbers with pre-filled current number
            const existingDeliveredBy = invoice.delivered_by || '';
            const inputData = await showConvertInputModalChaimae(newType, newTypeLabel, currentNumero, prefillBonLivraison, prefillNumeroOrder, existingDeliveredBy);

            if (!inputData) {
                window.notify.warning('Annulé', 'Conversion annulée', 3000);
                return;
            }

            const { newNumero, newNumeroOrder, newBonLivraison, newBonCommande, newDeliveredBy, newDate } = inputData;

            // Check if numbers are unique
            const allInvoicesResult = await window.electron.dbChaimae.getAllInvoices();
            if (allInvoicesResult.success) {
                const invoices = allInvoicesResult.data;

                // Check document number
                if (newType === 'facture') {
                    const duplicateNumero = invoices.find(inv =>
                        inv.document_type === 'facture' && inv.document_numero === newNumero
                    );
                    if (duplicateNumero) {
                        window.notify.error('Erreur', `Le N° Facture "${newNumero}" existe déjà`, 5000);
                        return;
                    }
                } else if (newType === 'devis') {
                    const duplicateNumero = invoices.find(inv =>
                        inv.document_type === 'devis' && inv.document_numero_devis === newNumero
                    );
                    if (duplicateNumero) {
                        window.notify.error('Erreur', `Le N° Devis "${newNumero}" existe déjà`, 5000);
                        return;
                    }
                } else if (newType === 'bon_livraison') {
                    const duplicateNumero = invoices.find(inv =>
                        (inv.document_type === 'bon_livraison' || inv.document_type === 'bon de livraison') &&
                        (inv.document_numero === newNumero ||
                            inv.document_numero_bl === newNumero ||
                            inv.document_bon_de_livraison === newNumero)
                    );
                    if (duplicateNumero) {
                        window.notify.error('Erreur', `Le N° Bon de livraison "${newNumero}" existe déjà`, 5000);
                        return;
                    }
                }

                // Check N° Order if provided (for facture only)
                if (newType === 'facture' && newNumeroOrder) {
                    const duplicateOrder = invoices.find(inv =>
                        inv.document_type === 'facture' &&
                        inv.document_numero_Order &&
                        inv.document_numero_Order.trim() === newNumeroOrder.trim()
                    );
                    if (duplicateOrder) {
                        window.notify.error('Erreur', `Le N° Order "${newNumeroOrder}" existe déjà dans une autre Facture`, 5000);
                        return;
                    }
                }

                // Check Bon de livraison if provided (for facture)
                if (newType === 'facture' && newBonLivraison) {
                    const duplicateBL = invoices.find(inv =>
                        inv.document_type === 'facture' &&
                        inv.document_bon_de_livraison &&
                        inv.document_bon_de_livraison.trim() === newBonLivraison.trim()
                    );
                    if (duplicateBL) {
                        window.notify.error('Erreur', `Le Bon de livraison "${newBonLivraison}" existe déjà dans une autre Facture`, 5000);
                        return;
                    }
                }

                // Check N° Order if provided (for bon_livraison)
                if (newType === 'bon_livraison' && newBonCommande) {
                    const duplicateBC = invoices.find(inv =>
                        (inv.document_type === 'bon_livraison' || inv.document_type === 'bon de livraison') &&
                        inv.document_numero_commande &&
                        inv.document_numero_commande.trim() === newBonCommande.trim()
                    );
                    if (duplicateBC) {
                        window.notify.error('Erreur', `Le N° Order "${newBonCommande}" existe déjà dans un autre Bon de livraison`, 5000);
                        return;
                    }
                }
            }

            // Prepare new document data
            // Get current user info
            const user = JSON.parse(localStorage.getItem('user'));

            const newDocData = {
                client: {
                    nom: invoice.client_nom,
                    ICE: invoice.client_ice
                },
                document: {
                    type: newType,
                    date: newDate || (window.todayDateString ? window.todayDateString() : new Date().toISOString().split('T')[0]),
                    numero: newType === 'facture' || newType === 'bon_livraison' ? newNumero : null,
                    numero_devis: newType === 'devis' ? newNumero : null,
                    numero_Order: newType === 'facture' ? newNumeroOrder : null,
                    bon_de_livraison: newType === 'facture' ? newBonLivraison : null,
                    numero_commande: newType === 'bon_livraison' ? newBonCommande : null,
                    created_by_user_id: user?.id || null,
                    created_by_user_name: user?.name || null,
                    created_by_user_email: user?.email || null,
                    delivered_by: newDeliveredBy || null,
                    ar_status: ''
                },
                products: invoice.products || [],
                totals: {
                    total_ht: invoice.total_ht,
                    tva_rate: invoice.tva_rate,
                    montant_tva: invoice.montant_tva,
                    total_ttc: invoice.total_ttc
                }
            };

            // Create new document
            const createResult = await window.electron.dbChaimae.createInvoice(newDocData);

            if (createResult.success) {
                window.notify.success('Succès', `${newTypeLabel} créé(e) avec succès!`, 3000);

                // Close edit modal and reload list
                document.querySelector('.modal-overlay')?.remove();
                setTimeout(() => loadInvoicesChaimae(), 300);
            } else {
                throw new Error(createResult.error || 'Échec de la conversion');
            }

        } catch (error) {
            console.error('Error converting invoice:', error);
            window.notify.error('Erreur', 'Impossible de convertir: ' + error.message, 4000);
        }
    };
}

// Format number with spaces for thousands - Fixed for PDF Arabic numerals
function formatNumberForPDFChaimae(number) {
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

// Load Chaimae signature image for PDF
async function loadChaimaeSignature() {
    return new Promise(async (resolve) => {
        try {
            const signaturePath = 'Signature/Chaimae.png';
            let dataUrl = null;

            if (window.electron && window.electron.getAssetPath) {
                dataUrl = await window.electron.getAssetPath(signaturePath);
            }

            if (!dataUrl) {
                // Fallback to direct path in case asset loader fails
                dataUrl = signaturePath;
            }

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
                console.warn('Could not load Chaimae signature image:', signaturePath);
                resolve(null);
            };
            img.src = dataUrl;
        } catch (error) {
            console.error('Error in loadChaimaeSignature:', error);
            resolve(null);
        }
    });
}


// Download invoice as PDF
// Helper to show consolidated customization modal for Chaimae PDF
async function showChaimaePDFCustomizationModal(invoice) {
    return new Promise((resolve) => {
        const overlay = document.createElement('div');
        overlay.className = 'custom-modal-overlay';

        const isFacture = invoice.document_type === 'facture';
        const isBL = invoice.document_type === 'bl' || invoice.document_type === 'bon_livraison';
        const isDevis = invoice.document_type === 'devis';

        const hasOrder = invoice.document_numero_Order && invoice.document_numero_Order.trim() !== '';
        const hasBL = invoice.document_bon_de_livraison && invoice.document_bon_de_livraison.trim() !== '';
        const hasBC = invoice.document_numero_commande && invoice.document_numero_commande.trim() !== '';

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
                                <input type="radio" name="chaimaeNotesFontSize" value="small" style="margin-bottom: 0.4rem; cursor: pointer;">
                                <span style="font-size: 0.75rem; color: #999;">Petit</span>
                            </label>
                            <label style="flex: 1; display: flex; flex-direction: column; align-items: center; cursor: pointer; padding: 0.5rem; border-radius: 6px; transition: all 0.2s; background: #2d2d30;">
                                <input type="radio" name="chaimaeNotesFontSize" value="medium" checked style="margin-bottom: 0.4rem; cursor: pointer;">
                                <span style="font-size: 0.85rem; color: #fff;">Moyen</span>
                            </label>
                            <label style="flex: 1; display: flex; flex-direction: column; align-items: center; cursor: pointer; padding: 0.5rem; border-radius: 6px; transition: all 0.2s;">
                                <input type="radio" name="chaimaeNotesFontSize" value="large" style="margin-bottom: 0.4rem; cursor: pointer;">
                                <span style="font-size: 0.95rem; color: #999;">Grand</span>
                            </label>
                            <label style="flex: 1; display: flex; flex-direction: column; align-items: center; cursor: pointer; padding: 0.5rem; border-radius: 6px; transition: all 0.2s;">
                                <input type="radio" name="chaimaeNotesFontSize" value="xlarge" style="margin-bottom: 0.4rem; cursor: pointer;">
                                <span style="font-size: 1.05rem; color: #999;">Très G.</span>
                            </label>
                        </div>
                    </div>

                    ${isFacture && (hasOrder || hasBL) ? `
                        <div style="margin-bottom: 1.25rem;">
                             ${hasOrder ? `<p style="margin-bottom:0.25rem;color:#e0e0e0;font-size:0.9rem;">N° Order: <strong style="color:#2196F3;">${invoice.document_numero_Order}</strong></p>` : ''}
                             ${hasBL ? `<p style="margin-bottom:0.5rem;color:#e0e0e0;font-size:0.9rem;">BL: <strong style="color:#4caf50;">${invoice.document_bon_de_livraison}</strong></p>` : ''}
                             
                             ${hasOrder ? `
                                <label style="display:flex;align-items:center;cursor:pointer;padding:0.75rem;background:#1e1e1e;border:1px solid #3e3e42;border-radius:8px;margin-bottom:0.5rem;">
                                    <input type="checkbox" id="chaimaeIncludeOrder" checked style="width:18px;height:18px;margin-right:0.75rem;cursor:pointer;accent-color:#2196F3;">
                                    <span style="font-size:0.9rem;color:#e0e0e0;">Inclure le N° Order</span>
                                </label>
                             ` : ''}
                             ${hasBL ? `
                                <label style="display:flex;align-items:center;cursor:pointer;padding:0.75rem;background:#1e1e1e;border:1px solid #3e3e42;border-radius:8px;">
                                    <input type="checkbox" id="chaimaeIncludeBL" checked style="width:18px;height:18px;margin-right:0.75rem;cursor:pointer;accent-color:#4caf50;">
                                    <span style="font-size:0.9rem;color:#e0e0e0;">Inclure le BL</span>
                                </label>
                             ` : ''}
                        </div>
                    ` : ''}

                    ${isBL && hasBC ? `
                        <div style="margin-bottom: 1.25rem;">
                            <p style="margin-bottom:0.5rem;color:#e0e0e0;font-size:0.9rem;">N° Order: <strong style="color:#ff9800;">${invoice.document_numero_commande}</strong></p>
                            <label style="display:flex;align-items:center;cursor:pointer;padding:0.75rem;background:#1e1e1e;border:1px solid #3e3e42;border-radius:8px;">
                                <input type="checkbox" id="chaimaeIncludeBC" checked style="width:18px;height:18px;margin-right:0.75rem;cursor:pointer;accent-color:#ff9800;">
                                <span style="font-size:0.9rem;color:#e0e0e0;">Inclure le N° Order</span>
                            </label>
                        </div>
                    ` : ''}

                    ${isDevis ? `
                        <div style="margin-bottom: 1.25rem;">
                            <label style="display:flex;align-items:center;cursor:pointer;padding:0.75rem;background:#1e1e1e;border:1px solid #3e3e42;border-radius:8px;">
                                <input type="checkbox" id="chaimaeIncludeSignature" checked style="width:18px;height:18px;margin-right:0.75rem;cursor:pointer;accent-color:#4caf50;">
                                <span style="font-size:0.9rem;color:#e0e0e0;">Inclure la signature</span>
                            </label>
                        </div>
                    ` : ''}

                    ${hasZeroProducts ? `
                        <div style="margin-bottom: 1.25rem;">
                            <p style="margin-bottom:0.5rem;color:#e0e0e0;font-size:0.85rem;color:#ff9800;">Note: Certains produits ont une quantité/prix à zéro.</p>
                            <label style="display:flex;align-items:center;cursor:pointer;padding:0.75rem;background:#1e1e1e;border:1px solid #3e3e42;border-radius:8px;">
                                <input type="checkbox" id="chaimaeIncludeZero" checked style="width:18px;height:18px;margin-right:0.75rem;cursor:pointer;accent-color:#ff9800;">
                                <span style="font-size:0.9rem;color:#e0e0e0;">Afficher les produits à zéro</span>
                            </label>
                        </div>
                    ` : ''}
                </div>
                <div class="custom-modal-footer">
                    <button class="custom-modal-btn secondary" id="chaimaeCancelBtn">Annuler</button>
                    <button class="custom-modal-btn primary" id="chaimaeGenerateBtn">Générer PDF</button>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);

        const cancelBtn = overlay.querySelector('#chaimaeCancelBtn');
        const generateBtn = overlay.querySelector('#chaimaeGenerateBtn');

        const radioLabels = overlay.querySelectorAll('input[name="chaimaeNotesFontSize"]');
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

        cancelBtn.onclick = () => {
            overlay.remove();
            resolve(null);
        };

        generateBtn.onclick = () => {
            const selectedSize = overlay.querySelector('input[name="chaimaeNotesFontSize"]:checked').value;
            const includeOrder = overlay.querySelector('#chaimaeIncludeOrder') ? overlay.querySelector('#chaimaeIncludeOrder').checked : false;
            const includeBL = overlay.querySelector('#chaimaeIncludeBL') ? overlay.querySelector('#chaimaeIncludeBL').checked : false;
            const includeBC = overlay.querySelector('#chaimaeIncludeBC') ? overlay.querySelector('#chaimaeIncludeBC').checked : false;
            const includeSignature = overlay.querySelector('#chaimaeIncludeSignature') ? overlay.querySelector('#chaimaeIncludeSignature').checked : false;
            const includeZero = overlay.querySelector('#chaimaeIncludeZero') ? overlay.querySelector('#chaimaeIncludeZero').checked : false;

            overlay.remove();
            resolve({
                notesFontSize: selectedSize,
                includeOrder,
                includeBL,
                includeBC,
                includeSignature,
                includeZero
            });
        };

        overlay.onclick = (e) => {
            if (e.target === overlay) {
                overlay.remove();
                resolve(null);
            }
        };

        setTimeout(() => generateBtn.focus(), 100);
    });
}


window.downloadInvoicePDFChaimae = async function (invoiceId, returnBlob = false, options = {}) {
    try {
        console.log('📥 Generating PDF for invoice:', invoiceId);

        // Get invoice data
        const result = await window.electron.dbChaimae.getInvoiceById(invoiceId);

        if (!result.success || !result.data) {
            throw new Error('Document introuvable');
        }

        const invoice = result.data;

        // Normalize: PostgreSQL returns lowercase 'document_numero_order', frontend expects 'document_numero_Order'
        if (!invoice.document_numero_Order && invoice.document_numero_order) {
            invoice.document_numero_Order = invoice.document_numero_order;
        }

        const skipModals = options.skipModals || false;
        let includeSignature, includeZeroProducts, notesFontSize;

        if (skipModals) {
            // Bulk download: apply options directly without modals
            if (!options.includeOrder) invoice.document_numero_Order = null;
            if (!options.includeBL) invoice.document_bon_de_livraison = null;
            if (!options.includeBC) invoice.document_numero_commande = null;
            includeSignature = options.includeSignature || false;
            includeZeroProducts = options.includeZeroProducts || false;
            notesFontSize = options.selectedFontSize || 'medium';
        } else {
            // Show consolidated customization modal
            const customParams = await showChaimaePDFCustomizationModal(invoice);
            if (!customParams) {
                console.log('❌ User cancelled PDF generation');
                return;
            }

            console.log('⚙️ PDF Custom Parameters:', customParams);

            // Apply parameters
            if (invoice.document_type === 'facture') {
                if (!customParams.includeOrder) invoice.document_numero_Order = null;
                if (!customParams.includeBL) invoice.document_bon_de_livraison = null;
            } else if (invoice.document_type === 'bl' || invoice.document_type === 'bon_livraison') {
                if (!customParams.includeBC) invoice.document_numero_commande = null;
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
            await loadJsPDFChaimae();
        }

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        // Load signature image
        const signatureImgChaimae = await loadChaimaeSignature();

        // Load editable PDF text
        const pdfText = await window.loadCompanyPdfText('CHAIMAE');

        // Colors
        const blueColor = [33, 97, 140]; // #21618C
        const greenColor = [76, 175, 80]; // #4caf50
        const orangeColor = [255, 152, 0]; // #FF9800

        const dateStr = (window.safeParseDate||function(d){return new Date(d)})(invoice.document_date).toLocaleDateString('fr-FR');

        // Determine document type
        const docType = invoice.document_type === 'facture' ? 'FACTURE' :
            invoice.document_type === 'devis' ? 'DEVIS' :
                'BON DE LIVRAISON';
        const docNumero = invoice.document_numero || invoice.document_numero_devis || invoice.document_numero_bl || '-';

        // Function to add header
        const addHeader = (isFirstPage = true) => {
            // Add Logo
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
            doc.text(pdfText.company_name || 'CHAIMAE ERRBAHI MDIQ sarl (AU)', 105, 20, { align: 'center' });

            doc.setFontSize(10);
            doc.setFont(undefined, 'normal');
            doc.setTextColor(0, 0, 0);
            doc.text(pdfText.header_line1 || 'Patente N° 52003366 - NIF : 40190505', 105, 27, { align: 'center' });
            doc.text(pdfText.header_line2 || 'RC N° : 10487 - CNSS : 8721591', 105, 32, { align: 'center' });
            doc.text(pdfText.header_line3 || 'ICE : 001544861000014', 105, 37, { align: 'center' });

            // Client Info
            doc.setFontSize(11);
            doc.setFont(undefined, 'bold');
            doc.text('CLIENT :', 15, 55);
            doc.setTextColor(...greenColor);
            doc.text(invoice.client_nom, 40, 55);

            // Only show ICE if it exists and is not "0"
            if (invoice.client_ice && invoice.client_ice !== '0') {
                doc.setTextColor(0, 0, 0);
                doc.text('ICE :', 15, 62);
                doc.setTextColor(...greenColor);
                doc.text(invoice.client_ice, 40, 62);
            }

            // Date
            doc.setTextColor(0, 0, 0);
            doc.text(`Date: ${dateStr}`, 150, 55);

            // Document Number
            doc.setFontSize(14);
            doc.setFont(undefined, 'bold');
            doc.setTextColor(0, 0, 0);

            // Adjust position based on document type length
            if (invoice.document_type === 'bon_livraison') {
                doc.text(`${docType} N°:`, 15, 75);
                doc.setTextColor(...orangeColor);
                doc.text(docNumero, 80, 75);
            } else {
                doc.text(`${docType} N°:`, 15, 75);
                doc.setTextColor(...orangeColor);
                doc.text(docNumero, 55, 75);
            }

            let currentY = 75;

            // Additional fields based on document type
            if (invoice.document_type === 'facture') {
                if (invoice.document_numero_Order) {
                    currentY += 7;
                    doc.setFontSize(11);
                    doc.setFont(undefined, 'bold');
                    doc.setTextColor(0, 0, 0);
                    doc.text('N° Order :', 15, currentY);
                    doc.setTextColor(33, 150, 243);
                    doc.text(invoice.document_numero_Order, 45, currentY);
                }
                if (invoice.document_bon_de_livraison) {
                    currentY += 7;
                    doc.setFontSize(11);
                    doc.setFont(undefined, 'bold');
                    doc.setTextColor(0, 0, 0);
                    doc.text('Bon de livraison :', 15, currentY);
                    doc.setTextColor(...greenColor);
                    doc.text(invoice.document_bon_de_livraison, 60, currentY);
                }
            } else if (invoice.document_type === 'bon_livraison' && invoice.document_numero_commande) {
                currentY += 7;
                doc.setFontSize(11);
                doc.setFont(undefined, 'bold');
                doc.setTextColor(0, 0, 0);
                doc.text('N° Order :', 15, currentY);
                doc.setTextColor(255, 152, 0);
                doc.text(invoice.document_numero_commande, 40, currentY);
            }
        };

        // Function to add footer
        const addFooter = (pageNum, totalPages) => {
            // Add signature image above footer (right side)
            // Add signature image above footer (right side) - ONLY FOR DEVIS AND IF USER APPROVED
            if (signatureImgChaimae && invoice.document_type === 'devis' && includeSignature) {
                doc.addImage(signatureImgChaimae, 'PNG', 140, 235, 60, 60);
            }

            doc.setTextColor(0, 0, 0);
            doc.setFontSize(7);
            doc.setFont(undefined, 'normal');
            doc.text(pdfText.footer_line1 || 'RIB : 007 720 00 05979000000368 12  ATTIJARI WAFA BANK', 105, 275, { align: 'center' });
            doc.text(pdfText.footer_line2 || 'Email: errbahiabderrahim@gmail.com', 105, 279, { align: 'center' });
            doc.text(pdfText.footer_line3 || 'ADRESSE: LOT ALBAHR AV TETOUAN N94 GARAGE 2 M\'DIQ', 105, 283, { align: 'center' });
            doc.text(pdfText.footer_line4 || 'Tel: +212 661 307 323', 105, 287, { align: 'center' });

            // Page numbering
            if (pageNum && totalPages) {
                doc.setFontSize(8);
                doc.setTextColor(128, 128, 128);
                doc.text(`Page ${pageNum} / ${totalPages}`, 105, 293, { align: 'center' });
            }
        };

        // Add header to first page
        addHeader(true);

        // Calculate start Y based on additional fields
        let startY = 85;
        if (invoice.document_type === 'facture') {
            if (invoice.document_numero_Order) startY += 7;
            if (invoice.document_bon_de_livraison) startY += 7;
        } else if (invoice.document_type === 'bon_livraison' && invoice.document_numero_commande) {
            startY += 7;
        }

        // Products Table
        doc.setFillColor(...blueColor);
        doc.rect(15, startY, 180, 8, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(9);
        doc.setFont(undefined, 'bold');
        doc.text('Désignation', 18, startY + 5.5);
        doc.text('QTE', 115, startY + 5.5, { align: 'center' });
        doc.text('PU HT', 150, startY + 5.5, { align: 'right' });
        doc.text('TOTAL HT', 188, startY + 5.5, { align: 'right' });

        // Table Body
        let currentY = startY + 10;
        doc.setTextColor(0, 0, 0);
        doc.setFont(undefined, 'normal');
        doc.setFontSize(9);

        let pageCount = 1;
        const pages = [];

        console.log('=== PDF Generation Started (CHAIMAE) ===');
        console.log('Document Type:', invoice.document_type);
        console.log('Initial startY (Page 1):', startY);
        console.log('Continuation pages will use same calculation as Page 1');
        console.log('Total Products:', invoice.products.length);

        invoice.products.forEach((product, index) => {
            const designation = product.designation || '';
            const lines = doc.splitTextToSize(designation, 85);
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

                    let newStartY = 85;
                    if (invoice.document_type === 'facture') {
                        if (invoice.document_numero_Order) newStartY += 7;
                        if (invoice.document_bon_de_livraison) newStartY += 7;
                    } else if (invoice.document_type === 'bon_livraison' && invoice.document_numero_commande) {
                        newStartY += 7;
                    }

                    doc.setFillColor(...blueColor);
                    doc.rect(15, newStartY, 180, 8, 'F');
                    doc.setTextColor(255, 255, 255);
                    doc.setFontSize(9);
                    doc.setFont(undefined, 'bold');
                    doc.text('Désignation', 18, newStartY + 5.5);
                    doc.text('QTE', 115, newStartY + 5.5, { align: 'center' });
                    doc.text('PU HT', 150, newStartY + 5.5, { align: 'right' });
                    doc.text('TOTAL HT', 188, newStartY + 5.5, { align: 'right' });

                    currentY = newStartY + 10;
                    doc.setTextColor(0, 0, 0);
                    doc.setFont(undefined, 'normal');
                    doc.setFontSize(9);
                    continue;
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
                        doc.text(String(product.quantite || ''), 115, currentY + 3 + centerOffset, { align: 'center' });
                    }

                    doc.setFontSize(7.5);
                    const price = parseFloat(product.prix_unitaire_ht);
                    if (showZeroValues || price !== 0) {
                        doc.text(`${formatNumberForPDFChaimae(product.prix_unitaire_ht)} DH`, 150, currentY + 3 + centerOffset, { align: 'right' });
                    }

                    const total = parseFloat(product.total_ht);
                    if (showZeroValues || total !== 0) {
                        doc.text(`${formatNumberForPDFChaimae(product.total_ht)} DH`, 188, currentY + 3 + centerOffset, { align: 'right' });
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

                    let newStartY = 85;
                    if (invoice.document_type === 'facture') {
                        if (invoice.document_numero_Order) {
                            newStartY += 7;
                        }
                        if (invoice.document_bon_de_livraison) {
                            newStartY += 7;
                        }
                    } else if (invoice.document_type === 'bon_livraison' && invoice.document_numero_commande) {
                        newStartY += 7;
                    }

                    doc.setFillColor(...blueColor);
                    doc.rect(15, newStartY, 180, 8, 'F');
                    doc.setTextColor(255, 255, 255);
                    doc.setFontSize(9);
                    doc.setFont(undefined, 'bold');
                    doc.text('Désignation', 18, newStartY + 5.5);
                    doc.text('QTE', 115, newStartY + 5.5, { align: 'center' });
                    doc.text('PU HT', 150, newStartY + 5.5, { align: 'right' });
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
        doc.text(`${formatNumberForPDFChaimae(invoice.total_ht)} DH`, 192, currentY + 5.5, { align: 'right' });

        // MONTANT TVA and T.T.C (Only if TVA > 0)
        if (parseFloat(invoice.tva_rate) > 0) {
            // MONTANT TVA
            currentY += 8;
            doc.setFillColor(255, 255, 255);
            doc.rect(110, currentY, 85, 8, 'F');
            doc.setFontSize(9);
            doc.text(`MONTANT TVA ${invoice.tva_rate}% :`, 113, currentY + 5.5);
            doc.setFontSize(8);
            doc.text(`${formatNumberForPDFChaimae(invoice.montant_tva)} DH`, 192, currentY + 5.5, { align: 'right' });

            // MONTANT T.T.C
            currentY += 8;
            doc.setFillColor(173, 216, 230);
            doc.rect(110, currentY, 85, 8, 'F');
            doc.setTextColor(...blueColor);
            doc.setFontSize(9);
            doc.text('MONTANT T.T.C :', 113, currentY + 5.5);
            doc.setFontSize(8.5);
            doc.text(`${formatNumberForPDFChaimae(invoice.total_ttc)} DH`, 192, currentY + 5.5, { align: 'right' });
        }

        // Amount in words
        currentY += 15;
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(9);
        doc.setFont(undefined, 'italic');
        const amountInWords = numberToFrenchWordsChaimae(invoice.total_ttc);
        // Only show amount in words for Facture and Devis, not for Bon de livraison
        if (invoice.document_type !== 'bon_livraison') {
            const docTypeText = invoice.document_type === 'facture' ? 'Facture' : 'Devis';
            const amountText = `La Présente ${docTypeText} est Arrêtée à la somme de : ${amountInWords}`;
            const amountLines = doc.splitTextToSize(amountText, 180);
            
            amountLines.forEach(line => {
                doc.text(line, 15, currentY);
                currentY += 4.5;
            });
        }

        // Add notes if any
        const noteResult = await window.electron.dbChaimae.getNote(invoiceId);
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
                    // finalize current page and start a new one
                    pages.push(pageCount);
                    doc.addPage();
                    addHeader(false);
                    pageCount++;
                    // continuation title positioned below header (same logic as table startY)
                    let notesStartY = 85;
                    if (invoice.document_type === 'facture') {
                        if (invoice.document_numero_Order) notesStartY += 7;
                        if (invoice.document_bon_de_livraison) notesStartY += 7;
                    } else if (invoice.document_type === 'bon_livraison' && invoice.document_numero_commande) {
                        notesStartY += 7;
                    }
                    // Lower slightly
                    notesStartY += 6;
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

        // Save PDF
        const selectedCompany = JSON.parse(localStorage.getItem('selectedCompany') || '{}');
        const companyName = selectedCompany.name ? selectedCompany.name.replace(' Company', '') : 'Unknown';
        const filename = `${docType}_${docNumero}_${invoice.client_nom}_${companyName}.pdf`;
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
window.downloadBonDeTravauxPDFChaimae = async function (invoiceId) {
    try {
        console.log('📥 Generating Bon de travaux PDF for invoice:', invoiceId);

        // Get invoice data
        const result = await window.electron.dbChaimae.getInvoiceById(invoiceId);

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
                            <button id="excludeZeroBtnBonTravauxChaimae" class="custom-modal-btn secondary">
                                ❌ Non, masquer
                            </button>
                            <button id="includeZeroBtnBonTravauxChaimae" class="custom-modal-btn primary">
                                ✅ Oui, afficher
                            </button>
                        </div>
                    </div>
                `;

                document.body.appendChild(overlay);

                const excludeBtn = document.getElementById('excludeZeroBtnBonTravauxChaimae');
                const includeBtn = document.getElementById('includeZeroBtnBonTravauxChaimae');

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
            await loadJsPDFChaimae();
        }

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        // Load editable PDF text
        const pdfText = await window.loadCompanyPdfText('CHAIMAE');

        // Colors
        const blueColor = [33, 97, 140];
        const greenColor = [76, 175, 80];
        const orangeColor = [255, 152, 0];

        const dateStr = (window.safeParseDate||function(d){return new Date(d)})(invoice.document_date).toLocaleDateString('fr-FR');

        // Function to add header to any page
        const addHeader = (isFirstPage = true) => {
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
            doc.text(pdfText.company_name || 'CHAIMAE ERRBAHI MDIQ sarl (AU)', 105, 20, { align: 'center' });

            doc.setFontSize(10);
            doc.setFont(undefined, 'normal');
            doc.setTextColor(0, 0, 0);
            doc.text(pdfText.header_line1 || 'Patente N\u00b0 52003366 - NIF : 40190505', 105, 27, { align: 'center' });
            doc.text(pdfText.header_line2 || 'RC N\u00b0 : 10487 - CNSS : 8721591', 105, 32, { align: 'center' });
            doc.text(pdfText.header_line3 || 'ICE : 001544861000014', 105, 37, { align: 'center' });

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
            doc.text(pdfText.footer_line1 || 'RIB : 007 720 00 05979000000368 12  ATTIJARI WAFA BANK', 15, 275);
            doc.text(pdfText.footer_line2 || 'Email: errbahiabderrahim@gmail.com', 15, 279);
            doc.text(pdfText.footer_line3 || 'ADRESSE: LOT ALBAHR AV TETOUAN N94 GARAGE 2 M\'DIQ', 15, 283);
            doc.text(pdfText.footer_line4 || 'Tel: +212 661 307 323', 15, 287);

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
        doc.text('QTE', 115, startY + 5.5, { align: 'center' });
        doc.text('Prix unitaire HT', 150, startY + 5.5, { align: 'right' });
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
            const lines = doc.splitTextToSize(designation, 75);
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

                    doc.setFillColor(...blueColor);
                    doc.rect(15, startY, 180, 8, 'F');
                    doc.setTextColor(255, 255, 255);
                    doc.setFontSize(9);
                    doc.setFont(undefined, 'bold');
                    doc.text('Désignation', 18, startY + 5.5);
                    doc.text('QTE', 115, startY + 5.5, { align: 'center' });
                    doc.text('Prix unitaire HT', 150, startY + 5.5, { align: 'right' });
                    doc.text('Prix total HT', 188, startY + 5.5, { align: 'right' });

                    currentY = startY + 10;
                    doc.setTextColor(0, 0, 0);
                    doc.setFont(undefined, 'normal');
                    doc.setFontSize(9);
                    continue;
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
                        doc.text(String(product.quantite || ''), 115, currentY + 3 + centerOffset, { align: 'center' });
                    }

                    const price = parseFloat(product.prix_unitaire_ht);
                    if (showZeroValues || price !== 0) {
                        doc.text(`${formatNumberForPDF(product.prix_unitaire_ht)} DH`, 150, currentY + 3 + centerOffset, { align: 'right' });
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

                    doc.setFillColor(...blueColor);
                    doc.rect(15, startY, 180, 8, 'F');
                    doc.setTextColor(255, 255, 255);
                    doc.setFontSize(9);
                    doc.setFont(undefined, 'bold');
                    doc.text('Désignation', 18, startY + 5.5);
                    doc.text('QTE', 115, startY + 5.5, { align: 'center' });
                    doc.text('Prix unitaire HT', 150, startY + 5.5, { align: 'right' });
                    doc.text('Prix total HT', 188, startY + 5.5, { align: 'right' });

                    currentY = startY + 10;
                    doc.setTextColor(0, 0, 0);
                    doc.setFont(undefined, 'normal');
                    doc.setFontSize(9);
                }
            }
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

        // Only show TVA row if tva_rate > 0
        if (parseFloat(invoice.tva_rate) > 0) {
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
        } else {
            // If TVA is 0%, show only TOTAL (which equals HT)
            currentY += 7;
            doc.setFillColor(...greenColor);
            doc.rect(110, currentY, 85, 7, 'F');
            doc.setTextColor(255, 255, 255);
            doc.setFont(undefined, 'bold');
            doc.text('TOTAL', 113, currentY + 5);
            doc.text(`${formatNumberForPDF(invoice.total_ht)} DH`, 192, currentY + 5, { align: 'right' });
        }

        // Add page numbering to all pages
        pages.push(pageCount);
        const totalPages = pages.length;

        for (let i = 0; i < totalPages; i++) {
            doc.setPage(i + 1);
            addFooter(i + 1, totalPages);
        }

        // Save PDF
        const docNumero = invoice.document_numero || invoice.document_numero_devis || invoice.document_numero_bl || 'N';
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
function numberToFrenchWordsChaimae(number) {
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

    let result = '';

    if (dirhams === 0) {
        result = 'zéro dirham';
    } else {
        result = convertNumber(dirhams) + ' dirham';
        if (dirhams > 1) result += 's';
    }

    if (centimes > 0) {
        result += ' et ' + convertNumber(centimes) + ' centime';
        if (centimes > 1) result += 's';
    } else {
        result += ' et zéro centime';
    }

    return result.charAt(0).toUpperCase() + result.slice(1);
}

// Generate single PDF as Blob (for ZIP) - using the same logic as downloadInvoicePDFChaimae
async function generateSinglePDFBlobChaimae(invoice, organizationType, folderName, includeOrder = true, includeBL = true, includeBC = true) {
    // Use the exact same PDF generation logic as downloadInvoicePDFChaimae
    // Create a temporary invoice object with settings
    const tempInvoice = { ...invoice };
    
    // Apply includeOrder setting
    if (invoice.document_type === 'facture' && !includeOrder) {
        tempInvoice.document_numero_Order = null;
    }
    if (!includeBL) {
        tempInvoice.document_bon_de_livraison = null;
    }
    if (!includeBC) {
        tempInvoice.document_numero_commande = null;
    }

    // For bulk download, use default settings
    const includeSignature = invoice.document_type === 'devis'; // Include signature for devis
    const includeZeroProducts = false; // Don't include zero products in bulk
    const notesFontSize = 'medium'; // Default font size

    // Load signature
    const signatureImgChaimae = await loadChaimaeSignature();

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Load editable PDF text
    const pdfText = await window.loadCompanyPdfText('CHAIMAE');

    // Colors
    const blueColor = [33, 97, 140];
    const greenColor = [76, 175, 80];
    const orangeColor = [255, 152, 0];
    const dateStr = (window.safeParseDate||function(d){return new Date(d)})(tempInvoice.document_date).toLocaleDateString('fr-FR');

    const docType = invoice.document_type === 'facture' ? 'FACTURE' :
        invoice.document_type === 'devis' ? 'DEVIS' :
            'BON DE LIVRAISON';
    const docNumero = invoice.document_numero || invoice.document_numero_devis || invoice.document_numero_bl || '-';

    const addHeader = (isFirstPage = true) => {
        try {
            const logoImg = document.querySelector('img[src*="chaimae.png"]') ||
                document.querySelector('img[data-asset="chaimae"]') ||
                document.querySelector('img[src^="data:image"]');
            if (logoImg && logoImg.src && logoImg.src.startsWith('data:')) {
                doc.addImage(logoImg.src, 'PNG', 15, 10, 35, 35);
            }
        } catch (error) { }

        doc.setFontSize(18);
        doc.setTextColor(...blueColor);
        doc.setFont(undefined, 'bold');
        doc.text(pdfText.company_name || 'CHAIMAE ERRBAHI MDIQ sarl (AU)', 105, 20, { align: 'center' });

        doc.setFontSize(10);
        doc.setFont(undefined, 'normal');
        doc.setTextColor(0, 0, 0);
        doc.text(pdfText.header_line1 || 'Patente N° 52003366 - NIF : 40190505', 105, 27, { align: 'center' });
        doc.text(pdfText.header_line2 || 'RC N° : 10487 - CNSS : 8721591', 105, 32, { align: 'center' });
        doc.text(pdfText.header_line3 || 'ICE : 001544861000014', 105, 37, { align: 'center' });

        doc.setFontSize(11);
        doc.setFont(undefined, 'bold');
        doc.text('CLIENT :', 15, 55);
        doc.setTextColor(...greenColor);
        doc.text(invoice.client_nom, 40, 55);

        // Only show ICE if it exists and is not "0"
        if (invoice.client_ice && invoice.client_ice !== '0') {
            doc.setTextColor(0, 0, 0);
            doc.text('ICE :', 15, 62);
            doc.setTextColor(...greenColor);
            doc.text(invoice.client_ice, 40, 62);
        }

        doc.setTextColor(0, 0, 0);
        doc.text(`Date: ${dateStr}`, 150, 55);

        doc.setFontSize(14);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(0, 0, 0);

        if (invoice.document_type === 'bon_livraison') {
            doc.text(`${docType} N°:`, 15, 75);
            doc.setTextColor(...orangeColor);
            doc.text(docNumero, 80, 75);
        } else {
            doc.text(`${docType} N°:`, 15, 75);
            doc.setTextColor(...orangeColor);
            doc.text(docNumero, 55, 75);
        }

        let currentY = 75;

        if (invoice.document_type === 'facture') {
            if (includeOrder && invoice.document_numero_Order) {
                currentY += 7;
                doc.setFontSize(11);
                doc.setFont(undefined, 'bold');
                doc.setTextColor(0, 0, 0);
                doc.text('N° Order :', 15, currentY);
                doc.setTextColor(33, 150, 243);
                doc.text(invoice.document_numero_Order, 45, currentY);
            }
            if (includeBL && invoice.document_bon_de_livraison) {
                currentY += 7;
                doc.setFontSize(11);
                doc.setFont(undefined, 'bold');
                doc.setTextColor(0, 0, 0);
                doc.text('Bon de livraison :', 15, currentY);
                doc.setTextColor(...greenColor);
                doc.text(invoice.document_bon_de_livraison, 60, currentY);
            }
        } else if (invoice.document_type === 'bon_livraison' && includeBC && invoice.document_numero_commande) {
            currentY += 7;
            doc.setFontSize(11);
            doc.setFont(undefined, 'bold');
            doc.setTextColor(0, 0, 0);
            doc.text('N° Order :', 15, currentY);
            doc.setTextColor(...greenColor);
            doc.text(invoice.document_numero_commande, 65, currentY);
        }
    };

    const addFooter = (pageNum, totalPages) => {
        // Add signature image above footer (right side) - ONLY FOR DEVIS AND IF USER APPROVED
        if (signatureImgChaimae && tempInvoice.document_type === 'devis' && includeSignature) {
            doc.addImage(signatureImgChaimae, 'PNG', 140, 235, 60, 60);
        }

        doc.setTextColor(0, 0, 0);
        doc.setFontSize(7);
        doc.setFont(undefined, 'normal');
        doc.text(pdfText.footer_line1 || 'RIB : 007 720 00 05979000000368 12  ATTIJARI WAFA BANK', 105, 275, { align: 'center' });
        doc.text(pdfText.footer_line2 || 'Email: errbahiabderrahim@gmail.com', 105, 279, { align: 'center' });
        doc.text(pdfText.footer_line3 || 'ADRESSE: LOT ALBAHR AV TETOUAN N94 GARAGE 2 M\'DIQ', 105, 283, { align: 'center' });
        doc.text(pdfText.footer_line4 || 'Tel: +212 661 307 323', 105, 287, { align: 'center' });

        // Page numbering
        if (pageNum && totalPages) {
            doc.setFontSize(8);
            doc.setTextColor(128, 128, 128);
            doc.text(`Page ${pageNum} / ${totalPages}`, 105, 293, { align: 'center' });
        }
    };

    addHeader(true);

    let startY = 85;
    if (invoice.document_type === 'facture') {
        if (includeOrder && invoice.document_numero_Order) startY += 7;
        if (includeBL && invoice.document_bon_de_livraison) startY += 7;
    } else if (invoice.document_type === 'bon_livraison' && includeBC && invoice.document_numero_commande) {
        startY += 7;
    }

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

    invoice.products.forEach((product, index) => {
        const designation = product.designation || '';
        const lines = doc.splitTextToSize(designation, 85);
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

                let newStartY = 85;
                if (invoice.document_type === 'facture') {
                    if (invoice.document_numero_Order) newStartY += 7;
                    if (invoice.document_bon_de_livraison) newStartY += 7;
                } else if (invoice.document_type === 'bon_livraison' && invoice.document_numero_commande) {
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
                continue;
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
                if (qty !== 0) {
                    doc.text(String(product.quantite || ''), 125, currentY + 3 + centerOffset, { align: 'center' });
                }

                doc.setFontSize(7.5);
                const price = parseFloat(product.prix_unitaire_ht);
                if (price !== 0) {
                    doc.text(`${formatNumberForPDFChaimae(product.prix_unitaire_ht)} DH`, 160, currentY + 3 + centerOffset, { align: 'right' });
                }

                const total = parseFloat(product.total_ht);
                if (total !== 0) {
                    doc.text(`${formatNumberForPDFChaimae(product.total_ht)} DH`, 188, currentY + 3 + centerOffset, { align: 'right' });
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

                let newStartY = 85;
                if (invoice.document_type === 'facture') {
                    if (invoice.document_numero_Order) newStartY += 7;
                    if (invoice.document_bon_de_livraison) newStartY += 7;
                } else if (invoice.document_type === 'bon_livraison' && invoice.document_numero_commande) {
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

    currentY += 10;

    doc.setFillColor(245, 245, 245);
    doc.rect(110, currentY, 85, 8, 'F');
    doc.setFont(undefined, 'bold');
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(9);
    doc.text('TOTAL HT :', 113, currentY + 5.5);
    doc.setFontSize(8);
    doc.text(`${formatNumberForPDFChaimae(invoice.total_ht)} DH`, 192, currentY + 5.5, { align: 'right' });

    // MONTANT TVA and T.T.C (Only if TVA > 0)
    if (parseFloat(invoice.tva_rate) > 0) {
        currentY += 8;
        doc.setFillColor(255, 255, 255);
        doc.rect(110, currentY, 85, 8, 'F');
        doc.setFontSize(9);
        doc.text(`MONTANT TVA ${invoice.tva_rate}% :`, 113, currentY + 5.5);
        doc.setFontSize(8);
        doc.text(`${formatNumberForPDFChaimae(invoice.montant_tva)} DH`, 192, currentY + 5.5, { align: 'right' });

        currentY += 8;
        doc.setFillColor(173, 216, 230);
        doc.rect(110, currentY, 85, 8, 'F');
        doc.setTextColor(...blueColor);
        doc.setFontSize(9);
        doc.text('MONTANT T.T.C :', 113, currentY + 5.5);
        doc.setFontSize(8.5);
        doc.text(`${formatNumberForPDFChaimae(invoice.total_ttc)} DH`, 192, currentY + 5.5, { align: 'right' });
    }

    currentY += 15;
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(9);
    doc.setFont(undefined, 'italic');
    const amountInWords = numberToFrenchWordsChaimae(invoice.total_ttc);
    // Only show amount in words for Facture and Devis, not for Bon de livraison
    if (invoice.document_type !== 'bon_livraison') {
        const docTypeText = invoice.document_type === 'facture' ? 'Facture' : 'Devis';
        const amountText = `La Présente ${docTypeText} est Arrêtée à la somme de : ${amountInWords}`;
        const amountLines = doc.splitTextToSize(amountText, 180);
        
        amountLines.forEach(line => {
            doc.text(line, 15, currentY);
            currentY += 4.5;
        });
    }

    // Add notes if invoice has an id
    if (invoice.id) {
        try {
            const noteResult = await window.electron.dbChaimae.getNote(invoice.id);
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
                        addHeader(false);
                        pageCount++;
                        doc.setFontSize(8);
                        doc.setFont(undefined, 'bold');
                        doc.setTextColor(96, 125, 139);
                        doc.text('Notes (suite) :', 15, 60);
                        doc.setTextColor(0, 0, 0);
                        doc.setFont(undefined, 'bold');
                        doc.setFontSize(9);
                        lineY = 64;
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

    return doc.output('blob');
}

// Load jsPDF library
async function loadJsPDFChaimae() {
    return new Promise((resolve, reject) => {
        // Check if already loaded (either via script tag or dynamically)
        if (typeof window.jspdf !== 'undefined') {
            resolve();
            return;
        }

        // Try to load from local script if not already present
        const script = document.createElement('script');
        script.src = 'frontend/scripts/jspdf.umd.min.js';
        script.onload = () => {
            console.log('✅ jsPDF loaded locally');
            resolve();
        };
        script.onerror = () => {
            // Last resort: CDN
            console.warn('⚠️ Local jsPDF failed, trying CDN...');
            const cdnScript = document.createElement('script');
            cdnScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
            cdnScript.onload = () => {
                console.log('✅ jsPDF loaded from CDN');
                resolve();
            };
            cdnScript.onerror = () => reject(new Error('Failed to load jsPDF (both local and CDN)'));
            document.head.appendChild(cdnScript);
        };
        document.head.appendChild(script);
    });
}

// View global invoice details
async function viewGlobalInvoiceChaimae(id) {
    console.log('🔍🔍🔍 [VIEW BUTTON CLICKED!!!] Global Invoice ID:', id);
    console.log('📍📍📍 [LOCATION] viewGlobalInvoiceChaimae function called in invoices_list_chaimae.js');
    console.log('✅✅✅ [CONFIRMATION] تم الضغط على زر العرض - الدالة تعمل!');

    try {
        console.log('📡 [API CALL] Fetching global invoice data...');
        const result = await window.electron.dbChaimae.getGlobalInvoiceById(id);

        console.log('📦 [API RESPONSE]', result);

        if (result.success && result.data) {
            const invoice = result.data;
            console.log('✅ [SUCCESS] Invoice data loaded:', invoice);

            // Calculate totals dynamically from bons
            let calculatedTotalHT = 0;
            let calculatedTotalTTC = 0;

            if (invoice.bons && invoice.bons.length > 0) {
                invoice.bons.forEach(bon => {
                    calculatedTotalHT += parseFloat(bon.total_ht) || 0;
                    calculatedTotalTTC += parseFloat(bon.total_ttc) || 0;
                });
            }

            const tvaRateValue = parseFloat(invoice.tva_rate);
            const tvaRate = isNaN(tvaRateValue) ? 20 : tvaRateValue;
            const calculatedMontantTVA = calculatedTotalHT * (tvaRate / 100);

            // Use calculated values instead of stored values
            invoice.total_ht = calculatedTotalHT;
            invoice.montant_tva = calculatedMontantTVA;
            invoice.total_ttc = calculatedTotalTTC;

            const modal = document.createElement('div');
            modal.className = 'modal-overlay';
            modal.innerHTML = `
                <div class="modal-content invoice-details-modal">
                    <div class="modal-header">
                        <h2>📦 Détails de la Facture Globale #${invoice.id}</h2>
                        <div style="display: flex; gap: 0.5rem; align-items: center;">
                            <button class="btn-download-pdf" onclick="window.downloadGlobalInvoicePDF(${invoice.id})" title="Télécharger PDF">
                                📥 Télécharger PDF
                            </button>
                            <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">✕</button>
                        </div>
                    </div>
                    <div class="modal-body">
                        <div class="details-section">
                            <h3>👤 Client</h3>
                            <p><strong>Nom:</strong> ${invoice.client_nom}</p>
                            <p><strong>ICE:</strong> ${invoice.client_ice}</p>
                            <p><strong>IF:</strong> ${invoice.client_if || ''}</p>
                        </div>

                        ${invoice.document_type === 'facture' ? `
                        <div class="details-section">
                            <h3>💳 Paiement</h3>
                            <p><strong>Statut:</strong> <span style="padding:0.2rem 0.6rem;border-radius:12px;font-size:0.85rem;font-weight:600;${(invoice.payment_status === 'payé') ? 'background:#1b5e20;color:#4caf50;' : 'background:#e65100;color:#ff9800;'}">${(invoice.payment_status === 'payé') ? 'Payé' : 'En attente de paiement'}</span></p>
                            ${invoice.payment_status === 'payé' && invoice.payment_method ? `<p><strong>Méthode:</strong> ${invoice.payment_method}</p>` : ''}
                            <button onclick="showEditPaymentModalChaimae(${invoice.id}, '${(invoice.payment_status || 'en attente de paiement').replace(/'/g, "\\'")}', '${(invoice.payment_method || '').replace(/'/g, "\\'")}')" style="padding:0.4rem 1rem;background:#1565c0;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:0.8rem;margin-top:0.5rem;">Modifier le paiement</button>
                        </div>
                        ` : ''}
                        
                        <div class="details-section">
                            <h3>📄 Document</h3>
                            <p><strong>Type:</strong> Facture Globale</p>
                            <p><strong>N°:</strong> ${invoice.document_numero}</p>
                            <p><strong>Date:</strong> ${(window.safeParseDate||function(d){return new Date(d)})(invoice.document_date).toLocaleDateString('fr-FR')}</p>
                        </div>
                        
                        <div class="details-section">
                            <h3>📦 Bons de Livraison (${invoice.bons ? invoice.bons.length : 0})</h3>
                            <table class="products-details-table">
                                <thead>
                                    <tr>
                                        <th>N° Bon de livraison</th>
                                        <th>N° Order</th>
                                        <th>Date de livraison</th>
                                        <th>Total HT</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${invoice.bons ? invoice.bons.map(bon => `
                                        <tr>
                                            <td>${bon.document_numero_bl || bon.document_numero || '-'}</td>
                                            <td>${bon.document_numero_commande || '-'}</td>
                                            <td>${(window.safeParseDate||function(d){return new Date(d)})(bon.document_date).toLocaleDateString('fr-FR')}</td>
                                            <td>${formatNumberChaimae(bon.total_ht || 0)} DH</td>
                                        </tr>
                                    `).join('') : '<tr><td colspan="4">Aucun bon de livraison</td></tr>'}
                                </tbody>
                            </table>
                        </div>
                        
                        <div class="details-section">
                            <h3>💰 Totaux</h3>
                            <p><strong>Total HT:</strong> ${formatNumberChaimae(invoice.total_ht)} DH</p>
                            <p><strong>TVA (${invoice.tva_rate}%):</strong> ${formatNumberChaimae(invoice.montant_tva)} DH</p>
                            <p><strong>Total TTC:</strong> <span style="color: #4caf50; font-size: 1.2rem;">${formatNumberChaimae(invoice.total_ttc)} DH</span></p>
                        </div>
                    </div>
                </div>
            `;

            document.body.appendChild(modal);
        } else {
            window.notify.error('Erreur', 'Impossible de charger les détails', 3000);
        }
    } catch (error) {
        console.error('Error viewing global invoice:', error);
        window.notify.error('Erreur', 'Une erreur est survenue', 3000);
    }
}

// Delete invoice
window.deleteInvoiceChaimae = async function (id, documentType) {
    const confirmed = await customConfirm('Confirmation', 'Êtes-vous sûr de vouloir supprimer ce document ?', 'warning');
    if (!confirmed) {
        return;
    }

    try {
        let result;

        // Check if it's a global invoice
        if (documentType === 'facture_globale') {
            result = await window.electron.dbChaimae.deleteGlobalInvoice(id);
        } else {
            result = await window.electron.dbChaimae.deleteInvoice(id);
        }

        if (result.success) {
            window.notify.success('Succès', 'Document supprimé avec succès', 3000);
            loadInvoicesChaimae();
        } else {
            window.notify.error('Erreur', result.error || 'Impossible de supprimer', 3000);
        }
    } catch (error) {
        console.error('Error deleting invoice:', error);
        window.notify.error('Erreur', 'Une erreur est survenue', 3000);
    }
}

// Handle bulk delete button click
window.handleBulkDeleteChaimae = async function () {
    const checkedBoxes = document.querySelectorAll('.invoice-checkbox-chaimae:checked');

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
                <div id="deleteProgressBar" style="background:linear-gradient(90deg, #f44336, #e91e63);height:100%;width:0%;transition:width 0.3s;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:600;font-size:0.9rem;"></div>
            </div>
            <p id="deleteProgressText" style="color:#aaa;margin:0 0 1rem 0;text-align:center;font-size:0.95rem;">Préparation...</p>
            <div style="text-align:center;">
                <button id="cancelDeleteBtn" style="padding:0.75rem 1.5rem;background:#ff9800;color:#fff;border:none;border-radius:6px;cursor:pointer;font-weight:600;font-size:0.95rem;transition:all 0.3s;" onmouseover="this.style.background='#f57c00'" onmouseout="this.style.background='#ff9800'">
                    ⚠️ Annuler
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(progressOverlay);

    const progressBar = document.getElementById('deleteProgressBar');
    const progressText = document.getElementById('deleteProgressText');
    const cancelBtn = document.getElementById('cancelDeleteBtn');

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

        // Get all selected invoices with their types
        const selectedInvoices = Array.from(checkedBoxes).map(cb => {
            const invoiceId = parseInt(cb.dataset.invoiceId);
            const invoice = filteredInvoicesChaimae.find(inv => inv.id === invoiceId);
            return {
                id: invoiceId,
                type: invoice ? invoice.document_type : null
            };
        });

        const total = selectedInvoices.length;

        // Delete each invoice
        for (let i = 0; i < selectedInvoices.length; i++) {
            // Check if cancel was requested
            if (cancelRequested) {
                progressText.textContent = `Annulé après ${successCount} suppression(s)`;
                await new Promise(resolve => setTimeout(resolve, 1500));
                break;
            }

            const invoice = selectedInvoices[i];

            try {
                let result;

                if (invoice.type === 'facture_globale') {
                    result = await window.electron.dbChaimae.deleteGlobalInvoice(invoice.id);
                } else {
                    result = await window.electron.dbChaimae.deleteInvoice(invoice.id);
                }

                if (result.success) {
                    successCount++;
                } else {
                    errorCount++;
                }
            } catch (error) {
                console.error(`Error deleting invoice ${invoice.id}:`, error);
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
            loadInvoicesChaimae();
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

// Handle bulk download button click
window.handleBulkDownloadChaimae = function () {
    const checkedBoxes = document.querySelectorAll('.invoice-checkbox-chaimae:checked');

    if (checkedBoxes.length === 0) {
        window.notify.error('Erreur', 'Veuillez sélectionner au moins une facture', 3000);
        return;
    }

    showBulkDownloadModalChaimae();
}

// Show bulk download modal
window.showBulkDownloadModalChaimae = function () {
    const checkedBoxes = document.querySelectorAll('.invoice-checkbox-chaimae:checked');
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
                
                <label class="org-option" onclick="selectOrganizationChaimae(this, 'client-month-type')">
                    <input type="radio" name="organization" value="client-month-type">
                    <div class="org-option-content">
                        <strong style="color:#fff;display:block;margin-bottom:0.25rem;">Par Client → Mois → Type</strong>
                        <div style="color:#999;font-size:0.85rem;">📁 Client_Ahmed/ → 📁 2025-10/ → 📁 Facture/ → 📄 Facture_548.pdf</div>
                    </div>
                </label>
                
                <label class="org-option" onclick="selectOrganizationChaimae(this, 'client-type-month')">
                    <input type="radio" name="organization" value="client-type-month">
                    <div class="org-option-content">
                        <strong style="color:#fff;display:block;margin-bottom:0.25rem;">Par Client → Type → Mois</strong>
                        <div style="color:#999;font-size:0.85rem;">📁 Client_Ahmed/ → 📁 Facture/ → 📁 2025-10/ → 📄 Facture_548.pdf</div>
                    </div>
                </label>
                
                <label class="org-option" onclick="selectOrganizationChaimae(this, 'type-month-client')">
                    <input type="radio" name="organization" value="type-month-client">
                    <div class="org-option-content">
                        <strong style="color:#fff;display:block;margin-bottom:0.25rem;">Par Type → Mois → Client</strong>
                        <div style="color:#999;font-size:0.85rem;">📁 Facture/ → 📁 2025-10/ → 📁 Client_Ahmed/ → 📄 Facture_548.pdf</div>
                    </div>
                </label>
                
                <label class="org-option" onclick="selectOrganizationChaimae(this, 'type-client-month')">
                    <input type="radio" name="organization" value="type-client-month">
                    <div class="org-option-content">
                        <strong style="color:#fff;display:block;margin-bottom:0.25rem;">Par Type → Client → Mois</strong>
                        <div style="color:#999;font-size:0.85rem;">📁 Facture/ → 📁 Client_Ahmed/ → 📁 2025-10/ → 📄 Facture_548.pdf</div>
                    </div>
                </label>
                
                <label class="org-option" onclick="selectOrganizationChaimae(this, 'month-type-client')">
                    <input type="radio" name="organization" value="month-type-client">
                    <div class="org-option-content">
                        <strong style="color:#fff;display:block;margin-bottom:0.25rem;">Par Mois → Type → Client</strong>
                        <div style="color:#999;font-size:0.85rem;">📁 2025-10/ → 📁 Facture/ → 📁 Client_Ahmed/ → 📄 Facture_548.pdf</div>
                    </div>
                </label>
                
                <label class="org-option" onclick="selectOrganizationChaimae(this, 'month-client-type')">
                    <input type="radio" name="organization" value="month-client-type">
                    <div class="org-option-content">
                        <strong style="color:#fff;display:block;margin-bottom:0.25rem;">Par Mois → Client → Type</strong>
                        <div style="color:#999;font-size:0.85rem;">📁 2025-10/ → 📁 Client_Ahmed/ → 📁 Facture/ → 📄 Facture_548.pdf</div>
                    </div>
                </label>
                
                <label class="org-option" onclick="selectOrganizationChaimae(this, 'flat')">
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
                <button id="bulkDownloadConfirmBtnChaimae"
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
    document.getElementById('bulkDownloadConfirmBtnChaimae').onclick = () => {
        const organizationType = document.querySelector('input[name="organization"]:checked').value;
        overlay.remove();
        showOrderBLBCSelectionModalBeforeDownloadChaimae(selectedIds, organizationType);
    };
};

// Select organization option
window.selectOrganizationChaimae = function (element, value) {
    document.querySelectorAll('.org-option').forEach(opt => opt.classList.remove('selected'));
    element.classList.add('selected');
    element.querySelector('input').checked = true;
};

// Show unified options modal before bulk download for Chaimae - ALL options in ONE modal
window.showOrderBLBCSelectionModalBeforeDownloadChaimae = function (selectedIds, organizationType) {
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
                    <input type="checkbox" id="includeOrderCheckboxDownloadChaimae" checked style="width:20px;height:20px;margin-right:1rem;cursor:pointer;accent-color:#2196F3;">
                    <span style="font-size:0.95rem;color:#e0e0e0;font-weight:500;">📋 Afficher les N° Order</span>
                </label>

                <label style="display:flex;align-items:center;cursor:pointer;padding:1rem;background:#1e1e1e;border:2px solid #3e3e42;border-radius:10px;transition:all 0.2s ease;margin-bottom:0.75rem;">
                    <input type="checkbox" id="includeBLCheckboxDownloadChaimae" checked style="width:20px;height:20px;margin-right:1rem;cursor:pointer;accent-color:#4caf50;">
                    <span style="font-size:0.95rem;color:#e0e0e0;font-weight:500;">📦 Afficher les Bon de livraison</span>
                </label>

                <label style="display:flex;align-items:center;cursor:pointer;padding:1rem;background:#1e1e1e;border:2px solid #3e3e42;border-radius:10px;transition:all 0.2s ease;margin-bottom:0.75rem;">
                    <input type="checkbox" id="includeBCCheckboxDownloadChaimae" checked style="width:20px;height:20px;margin-right:1rem;cursor:pointer;accent-color:#ff9800;">
                    <span style="font-size:0.95rem;color:#e0e0e0;font-weight:500;">📝 Afficher les N° Commande</span>
                </label>

                <label style="display:flex;align-items:center;cursor:pointer;padding:1rem;background:#1e1e1e;border:2px solid #3e3e42;border-radius:10px;transition:all 0.2s ease;margin-bottom:0.75rem;">
                    <input type="checkbox" id="includeSignatureCheckboxDownloadChaimae" checked style="width:20px;height:20px;margin-right:1rem;cursor:pointer;accent-color:#2196F3;">
                    <span style="font-size:0.95rem;color:#e0e0e0;font-weight:500;">✍️ Inclure la signature (pour DEVIS)</span>
                </label>

                <label style="display:flex;align-items:center;cursor:pointer;padding:1rem;background:#1e1e1e;border:2px solid #3e3e42;border-radius:10px;transition:all 0.2s ease;margin-bottom:0.75rem;">
                    <input type="checkbox" id="includeZeroProductsCheckboxDownloadChaimae" style="width:20px;height:20px;margin-right:1rem;cursor:pointer;accent-color:#2196F3;">
                    <span style="font-size:0.95rem;color:#e0e0e0;font-weight:500;">0️⃣ Afficher les produits avec quantité/prix = 0</span>
                </label>

                <div style="padding:1rem;background:#1e1e1e;border:2px solid #3e3e42;border-radius:10px;margin-bottom:0.75rem;">
                    <label style="display:block;margin-bottom:0.8rem;color:#e0e0e0;font-weight:600;font-size:0.95rem;">🔤 Taille de police des Notes:</label>
                    <div style="display:flex;gap:0.5rem;background:#2d2d30;padding:0.5rem;border-radius:8px;">
                        <label style="flex:1;display:flex;flex-direction:column;align-items:center;cursor:pointer;padding:0.5rem;border-radius:6px;transition:all 0.2s;">
                            <input type="radio" name="fontSizeBulkDownloadChaimae" value="small" style="margin-bottom:0.4rem;cursor:pointer;">
                            <span style="font-size:0.75rem;color:#999;">Petit</span>
                        </label>
                        <label style="flex:1;display:flex;flex-direction:column;align-items:center;cursor:pointer;padding:0.5rem;border-radius:6px;transition:all 0.2s;background:#3e3e42;">
                            <input type="radio" name="fontSizeBulkDownloadChaimae" value="medium" checked style="margin-bottom:0.4rem;cursor:pointer;">
                            <span style="font-size:0.85rem;color:#fff;">Moyen</span>
                        </label>
                        <label style="flex:1;display:flex;flex-direction:column;align-items:center;cursor:pointer;padding:0.5rem;border-radius:6px;transition:all 0.2s;">
                            <input type="radio" name="fontSizeBulkDownloadChaimae" value="large" style="margin-bottom:0.4rem;cursor:pointer;">
                            <span style="font-size:0.95rem;color:#999;">Grand</span>
                        </label>
                        <label style="flex:1;display:flex;flex-direction:column;align-items:center;cursor:pointer;padding:0.5rem;border-radius:6px;transition:all 0.2s;">
                            <input type="radio" name="fontSizeBulkDownloadChaimae" value="xlarge" style="margin-bottom:0.4rem;cursor:pointer;">
                            <span style="font-size:1.05rem;color:#999;">Très G.</span>
                        </label>
                    </div>
                </div>
            </div>
            <div class="custom-modal-footer">
                <button class="custom-modal-btn secondary" id="cancelBtnDownloadChaimae" style="padding:0.75rem 2rem;font-size:1rem;">Annuler</button>
                <button class="custom-modal-btn primary" id="continueBtnDownloadChaimae" style="padding:0.75rem 2rem;font-size:1rem;">Télécharger</button>
            </div>
        </div>
    `;

    document.body.appendChild(selectionOverlay);

    const fontSizeRadios = selectionOverlay.querySelectorAll('input[name="fontSizeBulkDownloadChaimae"]');
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

    selectionOverlay.querySelector('#continueBtnDownloadChaimae').addEventListener('click', async () => {
        const opts = {
            includeOrder: selectionOverlay.querySelector('#includeOrderCheckboxDownloadChaimae').checked,
            includeBL: selectionOverlay.querySelector('#includeBLCheckboxDownloadChaimae').checked,
            includeBC: selectionOverlay.querySelector('#includeBCCheckboxDownloadChaimae').checked,
            includeSignature: selectionOverlay.querySelector('#includeSignatureCheckboxDownloadChaimae').checked,
            includeZeroProducts: selectionOverlay.querySelector('#includeZeroProductsCheckboxDownloadChaimae').checked,
            selectedFontSize: selectionOverlay.querySelector('input[name="fontSizeBulkDownloadChaimae"]:checked').value
        };
        console.log('✅ [CHAIMAE BULK DOWNLOAD] Options:', opts);
        selectionOverlay.remove();
        await startBulkDownloadChaimae(selectedIds, organizationType, opts);
    });

    selectionOverlay.querySelector('#cancelBtnDownloadChaimae').addEventListener('click', () => selectionOverlay.remove());

    selectionOverlay.addEventListener('click', (e) => {
        if (e.target === selectionOverlay) selectionOverlay.remove();
    });

    setTimeout(() => selectionOverlay.querySelector('#continueBtnDownloadChaimae').focus(), 100);
};

// Load JSZip library
async function loadJSZipChaimae() {
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
window.startBulkDownloadChaimae = async function (selectedIds, organizationType, options = {}) {
    try {
        const {
            includeOrder = true,
            includeBL = true,
            includeBC = true,
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
                    <div style="font-size:3rem;margin-bottom:0.5rem;animation:spinCH 1s linear infinite;">⚙️</div>
                    <h3 style="color:#fff;margin:0;font-size:1.2rem;font-weight:600;">Téléchargement en cours</h3>
                    <p style="color:#999;margin-top:0.5rem;font-size:0.9rem;">Génération des PDFs...</p>
                </div>
                <div style="margin-bottom:1rem;">
                    <div style="display:flex;justify-content:space-between;margin-bottom:0.5rem;">
                        <span style="color:#e0e0e0;font-size:0.9rem;">Progression</span>
                        <span id="progressTextCH" style="color:#2196F3;font-size:0.9rem;font-weight:600;">0/${selectedIds.length}</span>
                    </div>
                    <div style="background:#1e1e1e;border-radius:8px;height:8px;overflow:hidden;border:1px solid #3e3e42;">
                        <div id="progressBarCH" style="background:linear-gradient(90deg, #2196F3, #21CBF3);height:100%;width:0%;transition:width 0.3s ease;"></div>
                    </div>
                </div>
                <style>@keyframes spinCH { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }</style>
            </div>
        `;
        document.body.appendChild(loadingOverlay);

        // Load libraries
        if (typeof window.jspdf === 'undefined') {
            await loadJsPDFChaimae();
        }
        await loadJSZipChaimae();

        // Create ZIP file
        const zip = new JSZip();
        const timestamp = (window.todayDateString ? window.todayDateString() : new Date().toISOString().split('T')[0]);
        const folderName = `Factures_CHAIMAE_Export_${timestamp}`;

        let successCount = 0;
        const progressText = loadingOverlay.querySelector('#progressTextCH');
        const progressBar = loadingOverlay.querySelector('#progressBarCH');

        for (let index = 0; index < selectedIds.length; index++) {
            const id = selectedIds[index];
            try {
                // Use the EXACT SAME function as single download with skipModals
                const pdfBlob = await window.downloadInvoicePDFChaimae(id, true, {
                    includeOrder,
                    includeBL,
                    includeBC,
                    includeSignature,
                    includeZeroProducts,
                    selectedFontSize,
                    skipModals: true
                });

                if (!pdfBlob) continue;

                const result = await window.electron.dbChaimae.getInvoiceById(id);
                if (!result.success || !result.data) continue;
                const invoice = result.data;

                const invoiceDate = (window.safeParseDate||function(d){return new Date(d)})(invoice.document_date);
                const yearMonth = `${invoiceDate.getFullYear()}-${String(invoiceDate.getMonth() + 1).padStart(2, '0')}`;
                const clientName = invoice.client_nom.replace(/[^a-zA-Z0-9]/g, '_');
                const numero = (invoice.document_numero || invoice.document_numero_devis || invoice.document_numero_bl || invoice.id).toString().replace(/\//g, '_');

                let docType = 'Documents';
                let docPrefix = 'Document';
                if (invoice.document_type === 'facture') {
                    docType = 'Factures';
                    docPrefix = 'Facture';
                } else if (invoice.document_type === 'devis') {
                    docType = 'Devis';
                    docPrefix = 'Devis';
                } else if (invoice.document_type === 'bon_livraison') {
                    docType = 'Bons_de_livraison';
                    docPrefix = 'BL';
                }

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
        document.querySelectorAll('.invoice-checkbox-chaimae').forEach(cb => cb.checked = false);
        const selectAllCheckbox = document.getElementById('selectAllInvoicesChaimae');
        if (selectAllCheckbox) selectAllCheckbox.checked = false;
        updateSelectedCountChaimae();

    } catch (error) {
        console.error('Error in bulk download:', error);
        const existingOverlay = document.querySelector('[style*="z-index:10001"]');
        if (existingOverlay) existingOverlay.remove();
        window.notify.error('Erreur', 'Erreur lors du téléchargement: ' + error.message, 5000);
    }
};

// Add new attachment
window.addNewAttachmentChaimae = function (invoiceId) {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.accept = 'image/*,application/pdf';

    input.onchange = async (e) => {
        const files = Array.from(e.target.files);

        if (files.length === 0) return;

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
                company: 'CHAIMAE',
                filename: file.name,
                data: uint8Array,
                mimeType: file.type
            });

            if (!uploadResult.success) {
                window.notify.error('Erreur', `Échec upload serveur: ${file.name}`, 3000);
                continue;
            }

            // 2. Add to database with online URL
            const result = await window.electron.dbChaimae.addAttachment(
                invoiceId,
                file.name,
                file.type,
                null, // No BLOB
                uploadResult.file_url, // Online URL as file_path
                file.size
            );

            if (result.success) {
                window.notify.success('Succès', `${file.name} ajouté`, 2000);
            } else {
                window.notify.error('Erreur', `Échec DB: ${file.name}`, 3000);
            }
        }

        // Fetch updated invoice data from database to get correct attachment_count
        const updatedResult = await window.electron.dbChaimae.getInvoiceById(invoiceId);
        if (updatedResult.success && updatedResult.data) {
            const correctCount = updatedResult.data.attachment_count || 0;
            
            // Update local state with correct count from database
            const inv = allInvoicesChaimae.find(i => i.id == invoiceId);
            if (inv) {
                inv.attachment_count = correctCount;
            }
            const filteredInv = filteredInvoicesChaimae.find(i => i.id == invoiceId);
            if (filteredInv) {
                filteredInv.attachment_count = correctCount;
            }
        }

        // Refresh specifically the attachments section in modal
        refreshAttachmentsChaimae(invoiceId);
        
        // Re-render the display with updated data (no full reload needed)
        displayInvoicesChaimae(filteredInvoicesChaimae);
    };

    input.click();
}

// Open attachment
window.openAttachmentChaimae = async function (attachmentId) {
    try {
        const result = await window.electron.dbChaimae.getAttachment(attachmentId);

        if (result.success && result.data) {
            const attachment = result.data;

            if (attachment.file_url) {
                // ✅ Online URL - open in browser
                await window.electron.attachments.openUrl(attachment.file_url);
            } else if (attachment.file_path && attachment.file_path.startsWith('http')) {
                // ✅ file_path contains online URL (new format)
                await window.electron.attachments.openUrl(attachment.file_path);
            } else if (attachment.file_path) {
                // Legacy: local file path
                await window.electron.attachments.open(attachment.file_path);
            } else if (attachment.file_data) {
                // Legacy: BLOB fallback
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
                setTimeout(() => URL.revokeObjectURL(url), 10000);
            } else {
                window.notify.error('Erreur', 'Contenu du fichier introuvable', 3000);
            }
        } else {
            window.notify.error('Erreur', 'Impossible d\'ouvrir le fichier', 3000);
        }
    } catch (error) {
        console.error('Error opening attachment:', error);
        window.notify.error('Erreur', 'Une erreur est survenue', 3000);
    }
}

// Delete attachment
window.deleteAttachmentChaimae = async function (attachmentId, invoiceId) {
    const confirmed = await customConfirm('Confirmation', 'Êtes-vous sûr de vouloir supprimer cette pièce jointe ?', 'warning');
    if (!confirmed) {
        return;
    }

    try {
        // Get attachment to find path
        const attResult = await window.electron.dbChaimae.getAttachment(attachmentId);
        const att = (attResult.success && attResult.data) ? attResult.data : null;
        const pathToDelete = att && att.file_path && !att.file_path.startsWith('http') ? att.file_path : null;

        const result = await window.electron.dbChaimae.deleteAttachment(attachmentId);

        if (result.success) {
            // Delete local file only if it's a local path (not an online URL)
            if (pathToDelete) {
                await window.electron.attachments.delete(pathToDelete);
            }
            window.notify.success('Succès', 'Pièce jointe supprimée', 2000);

            // Refresh specifically the attachments section
            refreshAttachmentsChaimae(invoiceId);
            // Refresh main table
            loadInvoicesChaimae();
        } else {
            window.notify.error('Erreur', result.error || 'Impossible de supprimer', 3000);
        }
    } catch (error) {
        console.error('Error deleting attachment:', error);
        window.notify.error('Erreur', 'Une erreur est survenue', 3000);
    }
}

// Helper to refresh attachments in the modal without closing it
async function refreshAttachmentsChaimae(invoiceId) {
    const attachmentsSection = document.getElementById(`attachmentsSectionChaimae${invoiceId}`);
    if (!attachmentsSection) return;

    try {
        const result = await window.electron.dbChaimae.getInvoiceById(invoiceId);
        if (result.success && result.data) {
            const invoice = result.data;
            let attachmentsHTML = `
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;">
                    <h3 style="color:#fff;font-size:1.1rem;margin:0;font-weight:600;"> Pièces jointes(${invoice.attachments ? invoice.attachments.length : 0})</h3>
                    <button onclick="addNewAttachmentChaimae(${invoiceId})" style="padding:0.5rem 1rem;background:#4CAF50;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:0.85rem;font-weight:600;display:flex;align-items:center;gap:0.5rem;transition:all 0.2s;" onmouseover="this.style.background='#45a049'" onmouseout="this.style.background='#4CAF50'">
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
                                    <button onclick="openAttachmentChaimae(${a.id})" style="padding:0.4rem 0.8rem;background:#2196F3;color:#fff;border:none;border-radius:4px;cursor:pointer;font-size:0.8rem;">
                                        👁️ Ouvrir
                                    </button>
                                    <button onclick="deleteAttachmentChaimae(${a.id}, ${invoiceId})" style="padding:0.4rem 0.8rem;background:#f44336;color:#fff;border:none;border-radius:4px;cursor:pointer;font-size:0.8rem;display:flex;align-items:center;gap:0.4rem;">
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


// Show create global invoice modal
window.showCreateGlobalInvoiceModalChaimae = async function () {
    // Check if client filter is selected
    const clientFilter = document.getElementById('filterClientChaimae').value;
    if (!clientFilter) {
        window.notify.error('Erreur', 'Veuillez sélectionner un client dans les filtres', 4000);
        return;
    }

    // Check if type filter is set to bon_livraison
    const blActive = document.getElementById('typeCheckBLChaimae')?.dataset.active === 'true'
                  || document.getElementById('typeToggleBLChaimae')?.dataset.active === 'true';
    if (!blActive) {
        window.notify.error('Erreur', 'Veuillez sélectionner "Bon de livraison" dans le filtre Type', 4000);
        return;
    }

    // Get all bon de livraison for the selected client
    const clientBons = filteredInvoicesChaimae.filter(inv =>
        inv.document_type === 'bon_livraison' && inv.client_nom === clientFilter
    );

    if (clientBons.length === 0) {
        window.notify.error('Erreur', 'Aucun bon de livraison trouvé pour ce client', 3000);
        return;
    }

    const clientName = clientBons[0].client_nom;
    const clientICE = clientBons[0].client_ice;
    const clientId = clientBons[0].client_id;

    // Show modal with checkboxes for selecting bons
    const bonsListHtml = clientBons.map(inv => `
        <tr style="border-bottom: 1px solid #3e3e42;">
            <td style="padding: 0.75rem; text-align: center;">
                <input type="checkbox" class="bon-select-checkbox" data-bon-id="${inv.id}" 
                       onchange="updateGlobalInvoiceTotals()" 
                       checked
                       style="width: 18px; height: 18px; cursor: pointer;">
            </td>
            <td style="padding: 0.75rem; color: #2196f3;">${inv.document_numero || inv.document_numero_bl || '-'}</td>
            <td style="padding: 0.75rem; color: #cccccc;">${inv.document_numero_commande || '-'}</td>
            <td style="padding: 0.75rem; color: #cccccc;">${(window.safeParseDate||function(d){return new Date(d)})(inv.document_date).toLocaleDateString('fr-FR')}</td>
            <td style="padding: 0.75rem; color: #4caf50;">${formatNumberChaimae(inv.total_ttc || 0)} DH</td>
        </tr>
    `).join('');

    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.8); display: flex; align-items: center; justify-content: center; z-index: 10000;';

    modal.innerHTML = `
        <div style="background: #2d2d30; border-radius: 12px; padding: 2rem; max-width: 700px; width: 90%; max-height: 90vh; overflow-y: auto;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                <h2 style="color: #fff; margin: 0;">📦 Créer une Facture Globale</h2>
                <button onclick="this.closest('.modal-overlay').remove()" 
                        style="background: none; border: none; color: #999; font-size: 1.5rem; cursor: pointer;">✕</button>
            </div>
            
            <div style="background: #1e1e1e; border-radius: 8px; padding: 1.5rem; margin-bottom: 1.5rem;">
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin-bottom: 1rem;">
                    <div>
                        <p style="color: #999; margin: 0 0 0.25rem 0; font-size: 0.85rem;">Client</p>
                        <p style="color: #cccccc; margin: 0; font-weight: 600;">${clientName}</p>
                    </div>
                    <div>
                        <p style="color: #999; margin: 0 0 0.25rem 0; font-size: 0.85rem;">ICE</p>
                        <p style="color: #cccccc; margin: 0;">${clientICE}</p>
                    </div>
                </div>
                
                <div style="margin-bottom: 1rem;">
                    <label style="display: block; color: #999; margin-bottom: 0.5rem;">N° Facture <span style="color: #f44336;">*</span></label>
                    <input type="text" id="globalInvoiceNumeroModal" placeholder="Ex: 123 → 123/2025" 
                           style="width: 100%; padding: 0.75rem; background: #3e3e42; border: 1px solid #555; color: #fff; border-radius: 8px;"
                           onblur="autoFormatGlobalInvoiceNumberOnBlur(this)">
                </div>
                
                <div>
                    <label style="display: block; color: #999; margin-bottom: 0.5rem;">Date <span style="color: #f44336;">*</span></label>
                    <input type="date" id="globalInvoiceDateModal" value="${window.todayDateString ? window.todayDateString() : new Date().toISOString().split('T')[0]}"
                           style="width: 100%; padding: 0.75rem; background: #3e3e42; border: 1px solid #555; color: #fff; border-radius: 8px;">
                </div>
            </div>
            
            <h3 style="color: #fff; margin: 0 0 1rem 0;">Sélectionner les Bons de Livraison (${clientBons.length})</h3>
            <div style="background: #1e1e1e; border-radius: 8px; overflow: hidden; margin-bottom: 1.5rem; max-height: 300px; overflow-y: auto;">
                <table style="width: 100%; border-collapse: collapse;">
                    <thead>
                        <tr style="background: #252526; position: sticky; top: 0;">
                            <th style="padding: 0.75rem; text-align: center; color: #2196f3;">
                                <input type="checkbox" id="selectAllBonsModal" onchange="toggleAllBonsModal(this)" 
                                       checked
                                       style="width: 18px; height: 18px; cursor: pointer;">
                            </th>
                            <th style="padding: 0.75rem; text-align: left; color: #2196f3;">N° BL</th>
                            <th style="padding: 0.75rem; text-align: left; color: #2196f3;">N° Order</th>
                            <th style="padding: 0.75rem; text-align: left; color: #2196f3;">Date</th>
                            <th style="padding: 0.75rem; text-align: left; color: #2196f3;">Total TTC</th>
                        </tr>
                    </thead>
                    <tbody>${bonsListHtml}</tbody>
                </table>
            </div>
            
            <div style="background: #1e1e1e; border-radius: 8px; padding: 1.5rem; margin-bottom: 1.5rem;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                    <span style="color: #999;">Total HT:</span>
                    <span id="modalTotalHT" style="color: #cccccc; font-weight: 600;">0,00 DH</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                    <span style="color: #999;">TVA (20%):</span>
                    <span id="modalTotalTVA" style="color: #cccccc; font-weight: 600;">0,00 DH</span>
                </div>
                <div style="display: flex; justify-content: space-between; padding-top: 0.5rem; border-top: 2px solid #3e3e42;">
                    <span style="color: #fff; font-weight: 600;">Total TTC:</span>
                    <span id="modalTotalTTC" style="color: #4caf50; font-weight: 600; font-size: 1.25rem;">0,00 DH</span>
                </div>
            </div>
            
            <div style="display: flex; gap: 1rem; justify-content: flex-end;">
                <button onclick="this.closest('.modal-overlay').remove()" 
                        style="padding: 0.75rem 1.5rem; background: #3e3e42; color: #fff; border: none; border-radius: 8px; cursor: pointer;">
                    Annuler
                </button>
                <button onclick="saveGlobalInvoiceFromModal()" 
                        style="padding: 0.75rem 1.5rem; background: #4caf50; color: #fff; border: none; border-radius: 8px; cursor: pointer; font-weight: 600;">
                    ✓ Créer
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Store data BEFORE calculating totals
    window.globalInvoiceModalData = { clientBons, clientName, clientICE, clientId };

    // Auto-calculate totals immediately
    updateGlobalInvoiceTotals();
}

// Toggle all bons in modal
window.toggleAllBonsModal = function (checkbox) {
    const checkboxes = document.querySelectorAll('.bon-select-checkbox');
    checkboxes.forEach(cb => cb.checked = checkbox.checked);
    updateGlobalInvoiceTotals();
}

// Update totals based on selected bons
window.updateGlobalInvoiceTotals = function () {
    if (!window.globalInvoiceModalData) return;

    const selectedCheckboxes = document.querySelectorAll('.bon-select-checkbox:checked');
    const selectedIds = Array.from(selectedCheckboxes).map(cb => parseInt(cb.dataset.bonId));
    const clientBons = window.globalInvoiceModalData.clientBons || [];

    let totalHT = 0;
    selectedIds.forEach(bonId => {
        const bon = clientBons.find(b => b.id === bonId);
        if (bon) {
            totalHT += parseFloat(bon.total_ht) || 0;
        }
    });

    const tvaRate = 20;
    const montantTVA = Math.round(totalHT * (tvaRate / 100) * 100) / 100;
    const totalTTC = Math.round((totalHT + montantTVA) * 100) / 100;
    totalHT = Math.round(totalHT * 100) / 100;

    document.getElementById('modalTotalHT').textContent = formatNumberChaimae(totalHT) + ' DH';
    document.getElementById('modalTotalTVA').textContent = formatNumberChaimae(montantTVA) + ' DH';
    document.getElementById('modalTotalTTC').textContent = formatNumberChaimae(totalTTC) + ' DH';
}

// Auto-format global invoice number on blur
window.autoFormatGlobalInvoiceNumberOnBlur = function (input) {
    let value = input.value.trim();

    // إذا كان الحقل فارغاً، لا تفعل شيئاً
    if (!value) return;

    // إذا كان يحتوي بالفعل على سلاش، لا تفعل شيئاً
    if (value.includes('/')) return;

    // استخراج الأرقام فقط
    let numbers = value.replace(/[^0-9]/g, '');

    // إذا كان هناك أرقام، أضف السنة
    if (numbers) {
        const year = new Date().getFullYear();
        input.value = `${numbers}/${year}`;
    }
}

window.saveGlobalInvoiceFromModal = async function () {
    const numero = document.getElementById('globalInvoiceNumeroModal').value.trim();
    const date = document.getElementById('globalInvoiceDateModal').value;

    if (!numero || !date) {
        window.notify.error('Erreur', 'Veuillez remplir tous les champs', 3000);
        return;
    }

    // Get selected bons
    const selectedCheckboxes = document.querySelectorAll('.bon-select-checkbox:checked');
    const selectedIds = Array.from(selectedCheckboxes).map(cb => parseInt(cb.dataset.bonId));

    if (selectedIds.length === 0) {
        window.notify.error('Erreur', 'Veuillez sélectionner au moins un bon de livraison', 3000);
        return;
    }

    const data = window.globalInvoiceModalData;
    if (!data) return;
    const clientBons = data.clientBons || [];

    // Calculate totals (parseFloat to handle string values from API)
    let totalHT = 0;
    selectedIds.forEach(bonId => {
        const bon = clientBons.find(b => b.id === bonId);
        if (bon) {
            totalHT += parseFloat(bon.total_ht) || 0;
        }
    });

    const tvaRate = 20;
    const montantTVA = totalHT * (tvaRate / 100);
    const totalTTC = totalHT + montantTVA;

    try {
        // Check in both global invoices AND regular invoices
        const allGlobalInvoicesResult = await window.electron.dbChaimae.getAllGlobalInvoices();
        const allRegularInvoicesResult = await window.electron.dbChaimae.getAllInvoices();

        // Check in global invoices
        if (allGlobalInvoicesResult.success) {
            const duplicate = allGlobalInvoicesResult.data.find(inv => inv.document_numero === numero);
            if (duplicate) {
                window.notify.error('Erreur', `Le numéro "${numero}" existe déjà dans les factures globales`, 5000);
                return;
            }
        }

        // Check in regular invoices (facture type only)
        if (allRegularInvoicesResult.success) {
            const duplicate = allRegularInvoicesResult.data.find(inv =>
                inv.document_type === 'facture' && inv.document_numero === numero
            );
            if (duplicate) {
                window.notify.error('Erreur', `Le numéro "${numero}" existe déjà dans les factures normales`, 5000);
                return;
            }
        }

        // Build snapshot of selected bons (full data for local storage)
        const bonsSnapshot = selectedIds.map(bonId => {
            const bon = clientBons.find(b => b.id === bonId);
            return bon ? {
                id: bon.id,
                document_numero: bon.document_numero || null,
                document_numero_bl: bon.document_numero_bl || null,
                document_numero_commande: bon.document_numero_commande || null,
                document_date: bon.document_date || null,
                total_ht: parseFloat(bon.total_ht) || 0,
                total_ttc: parseFloat(bon.total_ttc) || 0,
                client_nom: bon.client_nom || data.clientName
            } : { id: bonId };
        });

        const formData = {
            client: { nom: data.clientName, ICE: data.clientICE },
            client_id: data.clientId,
            company_code: 'CHAIMAE',
            document_numero: numero,
            document_date: date,
            total_ht: totalHT,
            tva_rate: tvaRate,
            montant_tva: montantTVA,
            total_ttc: totalTTC,
            bon_livraison_ids: selectedIds,
            bons_snapshot: bonsSnapshot
        };

        console.log('📤 [FRONTEND] Creating global invoice with data:', JSON.stringify(formData, null, 2));

        const result = await window.electron.dbChaimae.createGlobalInvoice(formData);
        console.log('📥 [FRONTEND] Creation result:', JSON.stringify(result, null, 2));

        if (result.success) {
            window.notify.success('Succès', 'Facture globale créée!', 3000);
            document.querySelector('.modal-overlay')?.remove();
            await loadInvoicesChaimae();
        } else {
            window.notify.error('Erreur', result.error || 'Erreur lors de la création', 4000);
        }
    } catch (error) {
        console.error('Error:', error);
        window.notify.error('Erreur', 'Erreur lors de la création', 4000);
    }
}

// Removed duplicate - using the main formatNumberChaimae function above

// Export database
window.exportDatabaseChaimae = async function () {
    try {
        window.notify.info('Export', 'Exportation en cours...', 2000);
        const result = await window.electron.dbChaimae.exportDatabase();

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
window.importDatabaseChaimae = async function () {
    const confirmed = await customConfirm('Attention', '⚠️ ATTENTION: L\'importation remplacera toutes les données actuelles.\n\nUne sauvegarde automatique sera créée.\n\nVoulez-vous continuer?', 'warning');

    if (!confirmed) return;

    try {
        window.notify.info('Import', 'Importation en cours...', 2000);
        const result = await window.electron.dbChaimae.importDatabase();

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



// Initialize page
window.initInvoicesListChaimaePage = function () {
    console.log('🔄 Initializing invoices list page for Chaimae...');

    // Define downloadGlobalInvoicePDF function if not already defined
    if (typeof window.downloadGlobalInvoicePDF === 'undefined') {
        window.downloadGlobalInvoicePDF = async function (invoiceId, sortOrder = null) {
            try {
                console.log('📥 Generating PDF for global invoice:', invoiceId);

                const result = await window.electron.dbChaimae.getGlobalInvoiceById(invoiceId);

                if (!result.success || !result.data) {
                    throw new Error('Facture globale introuvable');
                }

                const invoice = result.data;

                // If sortOrder not provided, ask user
                if (sortOrder === null && invoice.bons && invoice.bons.length > 1) {
                    return new Promise((resolve) => {
                        const modal = document.createElement('div');
                        modal.className = 'modal-overlay';
                        modal.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.7);display:flex;align-items:center;justify-content:center;z-index:10000;';
                        modal.innerHTML = `
                            <div style="background:#2d2d30;border-radius:12px;padding:2rem;max-width:500px;width:90%;box-shadow:0 10px 40px rgba(0,0,0,0.5);">
                                <h2 style="color:#fff;margin:0 0 1.5rem 0;font-size:1.5rem;text-align:center;">
                                    📋 Ordre des Bons de Livraison
                                </h2>
                                <p style="color:#ccc;margin-bottom:2rem;text-align:center;line-height:1.6;">
                                    Comment souhaitez-vous trier les bons de livraison dans le PDF ?
                                </p>
                                <div style="display:flex;flex-direction:column;gap:1rem;">
                                    <button onclick="this.closest('.modal-overlay').remove(); window.downloadGlobalInvoicePDF(${invoiceId}, 'numero_asc')" 
                                            style="padding:1rem;background:linear-gradient(135deg, #11998e 0%, #38ef7d 100%);color:#fff;border:none;border-radius:8px;font-size:1rem;cursor:pointer;transition:transform 0.2s;"
                                            onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform='scale(1)'">
                                        🔢 Par numéro croissant (1 → 99)
                                    </button>
                                    <button onclick="this.closest('.modal-overlay').remove(); window.downloadGlobalInvoicePDF(${invoiceId}, 'numero_desc')" 
                                            style="padding:1rem;background:linear-gradient(135deg, #fa709a 0%, #fee140 100%);color:#fff;border:none;border-radius:8px;font-size:1rem;cursor:pointer;transition:transform 0.2s;"
                                            onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform='scale(1)'">
                                        🔢 Par numéro décroissant (99 → 1)
                                    </button>
                                    <button onclick="this.closest('.modal-overlay').remove(); window.downloadGlobalInvoicePDF(${invoiceId}, 'oldest')" 
                                            style="padding:1rem;background:linear-gradient(135deg, #667eea 0%, #764ba2 100%);color:#fff;border:none;border-radius:8px;font-size:1rem;cursor:pointer;transition:transform 0.2s;"
                                            onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform='scale(1)'">
                                        📅 Du plus ancien au plus récent
                                    </button>
                                    <button onclick="this.closest('.modal-overlay').remove(); window.downloadGlobalInvoicePDF(${invoiceId}, 'newest')" 
                                            style="padding:1rem;background:linear-gradient(135deg, #f093fb 0%, #f5576c 100%);color:#fff;border:none;border-radius:8px;font-size:1rem;cursor:pointer;transition:transform 0.2s;"
                                            onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform='scale(1)'">
                                        📅 Du plus récent au plus ancien
                                    </button>
                                    <button onclick="this.closest('.modal-overlay').remove()" 
                                            style="padding:0.75rem;background:#fff;color:#333;border:2px solid #ddd;border-radius:8px;font-size:0.9rem;cursor:pointer;margin-top:0.5rem;font-weight:600;transition:all 0.3s;"
                                            onmouseover="this.style.background='#f5f5f5';this.style.borderColor='#bbb';"
                                            onmouseout="this.style.background='#fff';this.style.borderColor='#ddd';">
                                        ✕ Annuler
                                    </button>
                                </div>
                            </div>
                        `;
                        document.body.appendChild(modal);
                    });
                }

                if (typeof window.jspdf === 'undefined') {
                    window.notify.info('Info', 'Chargement de jsPDF...', 2000);
                    const script = document.createElement('script');
                    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
                    script.onload = () => window.downloadGlobalInvoicePDF(invoiceId);
                    document.head.appendChild(script);
                    return;
                }

                // Wait for logo to load if not already loaded
                const logoImg = document.querySelector('img[src*="chaimae.png"]');
                if (logoImg && !logoImg.src.startsWith('data:')) {
                    console.log('⏳ Waiting for logo to load...');
                    await new Promise(resolve => setTimeout(resolve, 500));
                }

                const { jsPDF } = window.jspdf;
                const doc = new jsPDF();

                // Load editable PDF text
                const pdfText = await window.loadCompanyPdfText('CHAIMAE');

                const blueColor = [52, 103, 138];
                const dateStr = (window.safeParseDate||function(d){return new Date(d)})(invoice.document_date).toLocaleDateString('fr-FR');

                const addHeader = () => {
                    // Add Logo with detailed logging
                    console.log('🔍 === LOGO DEBUG START ===');
                    try {
                        // Try multiple selectors to find the logo
                        let logoImg = document.querySelector('img[src*="chaimae.png"]') ||
                            document.querySelector('img[data-asset="chaimae"]') ||
                            document.querySelector('img[src^="data:image"]');

                        console.log('🖼️ Logo element found:', !!logoImg);

                        if (logoImg) {
                            console.log('📍 Logo src type:', typeof logoImg.src);
                            console.log('📍 Logo src length:', logoImg.src?.length);
                            console.log('📍 Logo src starts with data:', logoImg.src?.startsWith('data:'));
                            console.log('📍 Logo src preview:', logoImg.src?.substring(0, 100));
                            console.log('📍 Logo complete:', logoImg.complete);
                            console.log('📍 Logo naturalWidth:', logoImg.naturalWidth);
                            console.log('📍 Logo naturalHeight:', logoImg.naturalHeight);

                            if (logoImg.src && logoImg.src.startsWith('data:')) {
                                doc.addImage(logoImg.src, 'PNG', 15, 10, 35, 35);
                                console.log('✅ Logo successfully added to PDF');
                            } else {
                                console.warn('⚠️ Logo src is not base64 data URL');
                                console.warn('⚠️ Current src:', logoImg.src);
                            }
                        } else {
                            console.error('❌ Logo element not found in DOM');
                            console.log('📋 Available images:', document.querySelectorAll('img').length);
                            document.querySelectorAll('img').forEach((img, i) => {
                                console.log(`  Image ${i}:`, img.src?.substring(0, 50));
                            });
                        }
                    } catch (error) {
                        console.error('❌ Error adding logo:', error);
                        console.error('❌ Error stack:', error.stack);
                    }
                    console.log('🔍 === LOGO DEBUG END ===');
                    console.log('');

                    // Company Header
                    doc.setFontSize(18);
                    doc.setTextColor(...blueColor);
                    doc.setFont(undefined, 'bold');
                    doc.text(pdfText.company_name || 'CHAIMAE ERRBAHI MDIQ sarl (AU)', 105, 20, { align: 'center' });

                    doc.setFontSize(10);
                    doc.setFont(undefined, 'normal');
                    doc.setTextColor(0, 0, 0);
                    doc.text(pdfText.header_line1 || 'Patente N° 52003366 - NIF : 40190505', 105, 27, { align: 'center' });
                    doc.text(pdfText.header_line2 || 'RC N° : 10487 - CNSS : 8721591', 105, 32, { align: 'center' });
                    doc.text(pdfText.header_line3 || 'ICE : 001544861000014', 105, 37, { align: 'center' });

                    doc.setFontSize(11);
                    doc.setFont(undefined, 'bold');
                    doc.text('CLIENT :', 15, 50);
                    doc.setTextColor(0, 128, 0); // Green color
                    doc.text(invoice.client_nom, 40, 50);

                    // Only show ICE if it exists and is not "0"
                    if (invoice.client_ice && invoice.client_ice !== '0') {
                        doc.setTextColor(0, 0, 0);
                        doc.text('ICE :', 15, 57);
                        doc.setTextColor(0, 128, 0); // Green color
                        doc.text(invoice.client_ice, 40, 57);
                    }

                    doc.setTextColor(0, 0, 0);
                    doc.text(`Date: ${dateStr}`, 150, 50);

                    doc.setFontSize(14);
                    doc.setFont(undefined, 'bold');
                    doc.text('FACTURE N°:', 15, 70);
                    doc.setTextColor(...blueColor);
                    doc.text(invoice.document_numero, 50, 70);
                };

                const addFooter = (pageNum, totalPages) => {
                    doc.setTextColor(0, 0, 0);
                    doc.setFontSize(7);
                    doc.setFont(undefined, 'normal');
                    doc.text(pdfText.footer_line1 || 'RIB : 007 720 00 05979000000368 12  ATTIJARI WAFA BANK', 15, 275);
                    doc.text(pdfText.footer_line2 || 'Email: errbahiabderrahim@gmail.com', 15, 279);
                    doc.text(pdfText.footer_line3 || 'ADRESSE: LOT ALBAHR AV TETOUAN N94 GARAGE 2 M\'DIQ', 15, 283);
                    doc.text(pdfText.footer_line4 || 'Tel: +212 661 307 323', 15, 287);

                    // Page numbering
                    if (pageNum && totalPages) {
                        doc.setFontSize(8);
                        doc.setTextColor(128, 128, 128);
                        doc.text(`Page ${pageNum} / ${totalPages}`, 105, 293, { align: 'center' });
                    }
                };

                addHeader();

                const startY = 80;
                doc.setFillColor(...blueColor);
                doc.rect(15, startY, 180, 8, 'F');
                doc.setTextColor(255, 255, 255);
                doc.setFontSize(9);
                doc.setFont(undefined, 'bold');
                doc.text('N° Bon de livraison', 20, startY + 5.5);
                doc.text('N° Order', 70, startY + 5.5);
                doc.text('Date de livraison', 120, startY + 5.5);
                doc.text('Total HT', 180, startY + 5.5, { align: 'right' });

                let currentY = startY + 10;
                doc.setTextColor(0, 0, 0);
                doc.setFont(undefined, 'normal');
                doc.setFontSize(9);

                let pageCount = 1;
                const pages = [];

                const formatNumber = (num) => {
                    const n = parseFloat(num) || 0;
                    return n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
                };

                // Sort bons based on user selection
                if (invoice.bons && invoice.bons.length > 0) {
                    let sortedBons = [...invoice.bons];

                    if (sortOrder === 'oldest') {
                        // Sort from oldest to newest (ascending by date)
                        sortedBons.sort((a, b) => (window.safeParseDate||function(d){return new Date(d)})(a.document_date) - (window.safeParseDate||function(d){return new Date(d)})(b.document_date));
                    } else if (sortOrder === 'newest') {
                        // Sort from newest to oldest (descending by date)
                        sortedBons.sort((a, b) => (window.safeParseDate||function(d){return new Date(d)})(b.document_date) - (window.safeParseDate||function(d){return new Date(d)})(a.document_date));
                    } else if (sortOrder === 'numero_asc') {
                        // Sort by document number ascending (1 → 99)
                        sortedBons.sort((a, b) => {
                            const getNumero = (bon) => {
                                const numero = bon.document_numero_bl || bon.document_numero || '0';
                                const match = numero.match(/(\d+)(?:\/|$)/);
                                return match ? parseInt(match[1]) : 0;
                            };
                            const numA = getNumero(a);
                            const numB = getNumero(b);
                            const numCompare = numA - numB;
                            if (numCompare !== 0) return numCompare;
                            // Secondary sort by date if numbers are equal
                            return (window.safeParseDate||function(d){return new Date(d)})(a.document_date) - (window.safeParseDate||function(d){return new Date(d)})(b.document_date);
                        });
                    } else if (sortOrder === 'numero_desc') {
                        // Sort by document number descending (99 → 1)
                        sortedBons.sort((a, b) => {
                            const getNumero = (bon) => {
                                const numero = bon.document_numero_bl || bon.document_numero || '0';
                                const match = numero.match(/(\d+)(?:\/|$)/);
                                return match ? parseInt(match[1]) : 0;
                            };
                            const numA = getNumero(a);
                            const numB = getNumero(b);
                            const numCompare = numB - numA;
                            if (numCompare !== 0) return numCompare;
                            // Secondary sort by date if numbers are equal
                            return (window.safeParseDate||function(d){return new Date(d)})(b.document_date) - (window.safeParseDate||function(d){return new Date(d)})(a.document_date);
                        });
                    }
                    // If sortOrder is null, keep original order

                    sortedBons.forEach((bon, index) => {
                        if (currentY > 240) {
                            pages.push(pageCount);
                            doc.addPage();
                            addHeader();
                            pageCount++;
                            doc.setFillColor(...blueColor);
                            doc.rect(15, startY, 180, 8, 'F');
                            doc.setTextColor(255, 255, 255);
                            doc.setFontSize(9);
                            doc.setFont(undefined, 'bold');
                            doc.text('N° Bon de livraison', 20, startY + 5.5);
                            doc.text('N° Order', 70, startY + 5.5);
                            doc.text('Date de livraison', 120, startY + 5.5);
                            doc.text('Total HT', 180, startY + 5.5, { align: 'right' });
                            currentY = startY + 10;
                            doc.setTextColor(0, 0, 0);
                            doc.setFont(undefined, 'normal');
                            doc.setFontSize(9);
                        }

                        if (index % 2 === 0) {
                            doc.setFillColor(245, 245, 245);
                            doc.rect(15, currentY - 3, 180, 8, 'F');
                        }

                        const bonHT = parseFloat(bon.total_ht) || 0;
                        doc.text(bon.document_numero_bl || bon.document_numero || '-', 20, currentY + 3);
                        doc.text(bon.document_numero_commande || '-', 70, currentY + 3);
                        doc.text((window.safeParseDate||function(d){return new Date(d)})(bon.document_date).toLocaleDateString('fr-FR'), 120, currentY + 3);
                        doc.text(`${formatNumber(bonHT)} DH`, 180, currentY + 3, { align: 'right' });
                        currentY += 8;
                    });
                }

                currentY += 10;
                doc.setFillColor(245, 245, 245);
                doc.rect(110, currentY, 85, 8, 'F');
                doc.setFont(undefined, 'bold');
                doc.setTextColor(0, 0, 0);
                doc.setFontSize(9);
                doc.text('TOTAL HT :', 113, currentY + 5.5);
                doc.setFontSize(8);
                doc.text(`${formatNumber(invoice.total_ht)} DH`, 192, currentY + 5.5, { align: 'right' });

                currentY += 8;
                doc.setFillColor(255, 255, 255);
                doc.rect(110, currentY, 85, 8, 'F');
                doc.setFontSize(9);
                doc.text(`MONTANT TVA ${invoice.tva_rate}% :`, 113, currentY + 5.5);
                doc.setFontSize(8);
                doc.text(`${formatNumber(invoice.montant_tva)} DH`, 192, currentY + 5.5, { align: 'right' });

                currentY += 8;
                doc.setFillColor(173, 216, 230);
                doc.rect(110, currentY, 85, 8, 'F');
                doc.setTextColor(...blueColor);
                doc.setFontSize(9);
                doc.text('MONTANT T.T.C :', 113, currentY + 5.5);
                doc.setFontSize(8.5);
                doc.text(`${formatNumber(invoice.total_ttc)} DH`, 192, currentY + 5.5, { align: 'right' });

                // Amount in words (French)
                currentY += 15;
                doc.setTextColor(0, 0, 0);
                doc.setFontSize(9);
                doc.setFont(undefined, 'italic');
                const amountInWords = numberToFrenchWordsChaimae(invoice.total_ttc);

                console.log('🔍 [GLOBAL INVOICE PDF] Invoice type:', invoice.document_type);
                console.log('🔍 [GLOBAL INVOICE PDF] Has bons:', !!invoice.bons);
                console.log('🔍 [GLOBAL INVOICE PDF] Bons count:', invoice.bons?.length);

                // For Global Invoice (has bons array), always show "Facture Globale"
                if (invoice.bons && invoice.bons.length > 0) {
                    console.log('✅ [GLOBAL INVOICE PDF] This is a Global Invoice - showing "Facture Globale"');
                    const amountText = `La Présente Facture est Arrêtée à la somme de : ${amountInWords}`;
                    const amountLines = doc.splitTextToSize(amountText, 180);
                    
                    amountLines.forEach(line => {
                        doc.text(line, 15, currentY);
                        currentY += 4.5;
                    });
                } else if (invoice.document_type !== 'bon_livraison') {
                    // For regular invoices (not global)
                    const docTypeText = invoice.document_type === 'facture' ? 'Facture' : 'Devis';
                    console.log('📄 [REGULAR INVOICE PDF] Regular invoice type:', docTypeText);
                    const amountText = `La Présente ${docTypeText} est Arrêtée à la somme de : ${amountInWords}`;
                    const amountLines = doc.splitTextToSize(amountText, 180);
                    
                    amountLines.forEach(line => {
                        doc.text(line, 15, currentY);
                        currentY += 4.5;
                    });
                }

                // Add notes if any
                const noteResult = await window.electron.dbChaimae.getNote(invoiceId);
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
                            addHeader(false);
                            pageCount++;
                            doc.setFontSize(8);
                            doc.setFont(undefined, 'bold');
                            doc.setTextColor(96, 125, 139);
                            doc.text('Notes (suite) :', 15, 60);
                            doc.setTextColor(0, 0, 0);
                            doc.setFont(undefined, 'bold');
                            doc.setFontSize(9);
                            lineY = 64;
                        }
                        doc.text(noteLines[i], 15, lineY);
                        lineY += 4.5;
                    }
                }

                // Add page numbering to all pages
                pages.push(pageCount);
                const totalPages = pages.length;

                for (let i = 0; i < totalPages; i++) {
                    doc.setPage(i + 1);
                    addFooter(i + 1, totalPages);
                }

                const selectedCompany = JSON.parse(localStorage.getItem('selectedCompany') || '{}');
                const companyName = selectedCompany.name ? selectedCompany.name.replace(' Company', '') : 'Unknown';
                const filename = `Facture_Globale_${invoice.document_numero}_${invoice.client_nom}_${companyName}.pdf`;
                doc.save(filename);

                window.notify.success('Succès', 'PDF téléchargé avec succès', 3000);

            } catch (error) {
                console.error('❌ Error generating PDF:', error);
                window.notify.error('Erreur', 'Impossible de générer le PDF: ' + error.message, 4000);
            }
        };
    }

    setTimeout(() => {
        loadInvoicesChaimae();

        // Add event listeners
        const selectAll = document.getElementById('selectAllInvoicesChaimae');
        if (selectAll) {
            selectAll.addEventListener('change', selectAllInvoicesChaimae);
        }

        // Add checkbox change listeners
        document.addEventListener('change', (e) => {
            if (e.target.classList.contains('invoice-checkbox-chaimae')) {
                updateSelectAllChaimae();
            }
        });
    }, 100);
}

// Use global prefixes (shared with create and edit pages)
if (!window.bonLivraisonPrefixes) {
    window.bonLivraisonPrefixes = ['MG', 'TL', 'BL'];
    window.selectedPrefix = 'MG';
    window.prefixesLoaded = false;
}

// Toggle prefix dropdown for Convert modal (Global)
window.togglePrefixDropdownConvert = async function () {
    const dropdown = document.getElementById('prefixDropdownConvert');
    if (!dropdown) return;

    if (dropdown.style.display === 'none') {
        // Load prefixes from database first
        if (!window.prefixesLoaded) {
            try {
                const result = await window.electron.dbChaimae.getAllPrefixes();
                if (result.success && result.data.length > 0) {
                    window.bonLivraisonPrefixes = result.data;
                    window.selectedPrefix = result.data[0];
                    window.prefixesLoaded = true;
                }
            } catch (error) {
                console.error('Error loading prefixes:', error);
            }
        }
        renderPrefixListConvert();
        dropdown.style.display = 'block';
    } else {
        dropdown.style.display = 'none';
    }
}

// Render prefix list for Convert modal (Global)
window.renderPrefixListConvert = function () {
    const listContainer = document.getElementById('prefixListConvert');
    if (!listContainer) return;

    listContainer.innerHTML = window.bonLivraisonPrefixes.map((prefix, index) => `
        <div onclick="selectPrefixConvert('${prefix}')" 
             style="margin: 0.35rem; padding: 0.75rem 1rem; cursor: pointer; border-radius: 8px; transition: all 0.3s; color: #fff; display: flex; justify-content: space-between; align-items: center; background: ${prefix === window.selectedPrefix ? 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)' : 'rgba(255,255,255,0.05)'}; border: 2px solid ${prefix === window.selectedPrefix ? '#667eea' : 'transparent'}; box-shadow: ${prefix === window.selectedPrefix ? '0 2px 8px rgba(102, 126, 234, 0.3)' : 'none'};"
             onmouseover="if('${prefix}' !== window.selectedPrefix) { this.style.background='rgba(102, 126, 234, 0.2)'; this.style.borderColor='#667eea'; this.style.transform='translateX(5px)'; }" 
             onmouseout="if('${prefix}' !== window.selectedPrefix) { this.style.background='rgba(255,255,255,0.05)'; this.style.borderColor='transparent'; this.style.transform='translateX(0)'; }">
            <div style="display: flex; align-items: center; gap: 0.75rem;">
                <span style="font-size: 1.2rem;">${prefix === window.selectedPrefix ? '✓' : '📌'}</span>
                <span style="font-weight: ${prefix === window.selectedPrefix ? '700' : '500'}; font-size: 1rem; letter-spacing: 1px;">${prefix}</span>
            </div>
            ${window.bonLivraisonPrefixes.length > 1 ? `
                <button onclick="event.stopPropagation(); deletePrefixConvert('${prefix}')" 
                        style="background: transparent; color: #e74c3c; border: 2px solid #e74c3c; border-radius: 6px; padding: 0.3rem 0.4rem; cursor: pointer; font-size: 0.9rem; font-weight: 600; transition: all 0.3s; display: flex; align-items: center; justify-content: center;"
                        onmouseover="this.style.background='#e74c3c'; this.style.color='#fff'; this.style.transform='scale(1.05)';"
                        onmouseout="this.style.background='transparent'; this.style.color='#e74c3c'; this.style.transform='scale(1)';">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        <line x1="10" y1="11" x2="10" y2="17"></line>
                        <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                </button>
            ` : ''}
        </div>
    `).join('');
}

// Select prefix for Convert modal (Global)
window.selectPrefixConvert = function (prefix) {
    window.selectedPrefix = prefix;
    const prefixInput = document.getElementById('prefixInputConvert');
    const prefixExample = document.getElementById('prefixExampleConvert');

    if (prefixInput) prefixInput.value = prefix;
    if (prefixExample) prefixExample.textContent = prefix;

    const dropdown = document.getElementById('prefixDropdownConvert');
    if (dropdown) dropdown.style.display = 'none';

    renderPrefixListConvert();
}

// Add new prefix for Convert modal (Global)
window.addNewPrefixConvert = async function () {
    const newPrefixInput = document.getElementById('newPrefixInputConvert');
    if (!newPrefixInput) return;

    const newPrefix = newPrefixInput.value.trim().toUpperCase();

    if (!newPrefix) {
        window.notify.warning('Attention', 'Veuillez saisir un prefix', 2000);
        return;
    }

    if (window.bonLivraisonPrefixes.includes(newPrefix)) {
        window.notify.warning('Attention', 'Ce prefix existe déjà', 2000);
        return;
    }

    // Add to database
    const result = await window.electron.dbChaimae.addPrefix(newPrefix);

    if (result.success) {
        window.bonLivraisonPrefixes.push(newPrefix);
        window.bonLivraisonPrefixes.sort();
        newPrefixInput.value = '';

        renderPrefixListConvert();
        window.notify.success('Succès', `Prefix "${newPrefix}" ajouté`, 2000);
    } else {
        window.notify.error('Erreur', result.error || 'Impossible d\'ajouter le prefix', 3000);
    }
}

// Delete prefix for Convert modal (Global)
window.deletePrefixConvert = async function (prefix) {
    if (window.bonLivraisonPrefixes.length <= 1) {
        window.notify.warning('Attention', 'Vous devez garder au moins un prefix', 2000);
        return;
    }

    // Delete from database
    const result = await window.electron.dbChaimae.deletePrefix(prefix);

    if (result.success) {
        const index = window.bonLivraisonPrefixes.indexOf(prefix);
        if (index > -1) {
            window.bonLivraisonPrefixes.splice(index, 1);

            // If deleted prefix was selected, select the first one
            if (window.selectedPrefix === prefix) {
                window.selectedPrefix = window.bonLivraisonPrefixes[0];
                const prefixInput = document.getElementById('prefixInputConvert');
                const prefixExample = document.getElementById('prefixExampleConvert');
                if (prefixInput) prefixInput.value = window.selectedPrefix;
                if (prefixExample) prefixExample.textContent = window.selectedPrefix;
            }

            renderPrefixListConvert();
            window.notify.success('Succès', `Prefix "${prefix}" supprimé`, 2000);
        }
    } else {
        window.notify.error('Erreur', result.error || 'Impossible de supprimer le prefix', 3000);
    }
}

// ==================== CONVERT ORDER PREFIX FUNCTIONS ====================

// Toggle convert order prefix dropdown
window.toggleConvertOrderPrefixDropdown = async function () {
    const dropdown = document.getElementById('convertOrderPrefixDropdown');
    if (!dropdown) return;

    if (dropdown.style.display === 'none') {
        await loadConvertOrderPrefixes();
        renderConvertOrderPrefixList();
        dropdown.style.display = 'block';
    } else {
        dropdown.style.display = 'none';
    }
};

// Render convert order prefix list
function renderConvertOrderPrefixList() {
    const listContainer = document.getElementById('convertOrderPrefixList');
    if (!listContainer) return;

    if (!window.orderPrefixes || window.orderPrefixes.length === 0) {
        window.orderPrefixes = ['BC', 'CMD', 'ORD'];
    }

    listContainer.innerHTML = window.orderPrefixes.map(prefix => `
        <div onclick="selectConvertOrderPrefix('${prefix}')" 
             style="margin: 0.35rem; padding: 0.75rem 1rem; cursor: pointer; border-radius: 8px; transition: all 0.3s; color: #fff; display: flex; justify-content: space-between; align-items: center; background: ${prefix === window.selectedOrderPrefix ? 'linear-gradient(90deg, #2196f3 0%, #1976d2 100%)' : 'rgba(255,255,255,0.05)'}; border: 2px solid ${prefix === window.selectedOrderPrefix ? '#2196f3' : 'transparent'};"
             onmouseover="if('${prefix}' !== window.selectedOrderPrefix) { this.style.background='rgba(33, 150, 243, 0.2)'; this.style.borderColor='#2196f3'; }" 
             onmouseout="if('${prefix}' !== window.selectedOrderPrefix) { this.style.background='rgba(255,255,255,0.05)'; this.style.borderColor='transparent'; }">
            <div style="display: flex; align-items: center; gap: 0.75rem;">
                <span style="font-size: 1.2rem;">${prefix === window.selectedOrderPrefix ? '✓' : '📌'}</span>
                <span style="font-weight: ${prefix === window.selectedOrderPrefix ? '700' : '500'}; font-size: 1rem;">${prefix}</span>
            </div>
            ${window.orderPrefixes.length > 1 ? `
                <button onclick="event.stopPropagation(); deleteConvertOrderPrefix('${prefix}')" 
                        style="background: transparent; color: #e74c3c; border: 2px solid #e74c3c; border-radius: 6px; padding: 0.3rem 0.4rem; cursor: pointer; transition: all 0.3s;"
                        onmouseover="this.style.background='#e74c3c'; this.style.color='#fff';"
                        onmouseout="this.style.background='transparent'; this.style.color='#e74c3c';">
                    🗑️
                </button>
            ` : ''}
        </div>
    `).join('');
}

// Select convert order prefix
window.selectConvertOrderPrefix = function (prefix) {
    window.selectedOrderPrefix = prefix;

    const prefixInput = document.getElementById('convertOrderPrefixInput');
    const prefixExample = document.getElementById('convertOrderPrefixExample');

    if (prefixInput) prefixInput.value = prefix;
    if (prefixExample) prefixExample.textContent = prefix;

    const dropdown = document.getElementById('convertOrderPrefixDropdown');
    if (dropdown) dropdown.style.display = 'none';

    renderConvertOrderPrefixList();
};

// Add new convert order prefix
window.addConvertNewOrderPrefix = async function () {
    const newPrefixInput = document.getElementById('convertNewOrderPrefixInput');
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

        renderConvertOrderPrefixList();
        window.notify.success('Succès', `Prefix "${newPrefix}" ajouté`, 2000);
    } else {
        window.notify.error('Erreur', result.error || 'Impossible d\'ajouter le prefix', 3000);
    }
};

// Delete convert order prefix
window.deleteConvertOrderPrefix = async function (prefix) {
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
                const prefixInput = document.getElementById('convertOrderPrefixInput');
                const prefixExample = document.getElementById('convertOrderPrefixExample');
                if (prefixInput) prefixInput.value = window.selectedOrderPrefix;
                if (prefixExample) prefixExample.textContent = window.selectedOrderPrefix;
            }

            renderConvertOrderPrefixList();
            window.notify.success('Succès', `Prefix "${prefix}" supprimé`, 2000);
        }
    } else {
        window.notify.error('Erreur', result.error || 'Impossible de supprimer le prefix', 3000);
    }
};

// Load convert order prefixes from database
async function loadConvertOrderPrefixes() {
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

// ==================== END CONVERT ORDER PREFIX FUNCTIONS ====================

// Search clients in edit mode for Chaimae
let allClientsEditChaimae = [];
let filteredClientsEditChaimae = [];
window.searchClientsEditChaimae = function (query) {
    const dropdown = document.getElementById('clientsDropdownEditChaimae');
    if (!dropdown) return;

    if (!query || query.trim().length === 0) {
        filteredClientsEditChaimae = allClientsChaimae;
    } else {
        const searchTerm = query.toLowerCase().trim();
        filteredClientsEditChaimae = allClientsChaimae.filter(client =>
            (client.nom || '').toLowerCase().includes(searchTerm) ||
            (client.ice || '').toLowerCase().includes(searchTerm)
        );
    }

    displayClientsListEditChaimae();
}

window.displayClientsListEditChaimae = function () {
    const dropdown = document.getElementById('clientsDropdownEditChaimae');
    if (!dropdown) return;

    if (filteredClientsEditChaimae.length === 0) {
        dropdown.innerHTML = '<div class="dropdown-item no-results">Aucun client trouvé</div>';
        dropdown.style.display = 'block';
        return;
    }

    dropdown.innerHTML = filteredClientsEditChaimae.slice(0, 10).map(client => `
        <div class="dropdown-item" style="display: flex; justify-content: space-between; align-items: center;">
            <div style="flex: 1;" onmousedown="selectClientEditChaimae('${client.nom.replace(/'/g, "\\'")}', '${client.ice}', '${client.client_if || ''}')">
                <div class="client-name">${client.nom}</div>
                <div class="client-ice">ICE: ${client.ice}</div>
            </div>
            <button class="delete-client-btn" onclick="event.stopPropagation(); deleteClientEditChaimae(${client.id}, '${client.nom.replace(/'/g, "\\'")}');" 
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

window.showClientsListEditChaimae = function () {
    if (allClientsChaimae.length > 0) {
        filteredClientsEditChaimae = allClientsChaimae;
        displayClientsListEditChaimae();
    }
}

window.hideClientsListEditChaimae = function () {
    setTimeout(() => {
        const dropdown = document.getElementById('clientsDropdownEditChaimae');
        if (dropdown) dropdown.style.display = 'none';
    }, 200);
}

window.selectClientEditChaimae = function (nom, ice, clientIf) {
    document.getElementById('editClientNomChaimae').value = nom;
    document.getElementById('editClientICEChaimae').value = ice;
    if (document.getElementById('editClientIFChaimae')) {
        document.getElementById('editClientIFChaimae').value = clientIf || '';
    }
    const dropdown = document.getElementById('clientsDropdownEditChaimae');
    if (dropdown) dropdown.style.display = 'none';
}

// Delete a client from edit mode
window.deleteClientEditChaimae = async function (clientId, clientName) {
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
            await loadAllClientsChaimae();
            // Refresh dropdown
            searchClientsEditChaimae(document.getElementById('editClientNomChaimae').value);
        } else {
            window.notify.error('خطأ', 'فشل حذف الزبون');
        }
    } catch (error) {
        console.error('Error deleting client:', error);
        window.notify.error('خطأ', 'حدث خطأ أثناء حذف الزبون');
    }
}

// Format Bon numero with selected prefix for Convert modal (Global)
window.formatBonNumeroWithPrefixConvert = function (input) {
    let value = input.value.trim();

    // إذا كان الحقل فارغاً، لا تفعل شيئاً
    if (!value) return;

    // إذا كان يحتوي بالفعل على سلاش، لا تفعل شيئاً
    if (value.includes('/')) return;

    // استخراج الأرقام فقط
    let numbers = value.replace(/[^0-9]/g, '');

    // إذا كان هناك أرقام، أضف السنة
    if (numbers) {
        const year = new Date().getFullYear();
        input.value = `${numbers}/${year}`;
    }
}

// Download Chaimae Devis as SKM PDF (uses SKM PDF generator)
window.downloadChaimaeSKMDevisPDF = async function (invoiceId) {
    try {
        console.log('📥 Generating SKM PDF for Chaimae devis:', invoiceId);

        // Get invoice data from Chaimae database
        const result = await window.electron.dbChaimae.getInvoiceById(invoiceId);

        if (!result.success || !result.data) {
            throw new Error('Devis introuvable');
        }

        const invoice = result.data;

        // Only allow for devis type
        if (invoice.document_type !== 'devis') {
            window.notify.warning('Type incorrect', 'Cette fonction est disponible uniquement pour les devis.');
            return;
        }

        // Check if SKM generator exists
        if (typeof window.generateSKMPDFFromInvoice === 'function') {
            // Use existing SKM generator
            await window.generateSKMPDFFromInvoice(invoice, 'chaimae');
        } else if (typeof window.downloadMultiSKMDevisPDF === 'function') {
            // Fallback: Call Multi SKM generator with Chaimae invoice
            // We need to call the personalization modal and PDF generation
            await generateSKMPDFForChaimae(invoice);
        } else {
            window.notify.error('Erreur', 'Le générateur SKM n\'est pas disponible');
        }

    } catch (error) {
        console.error('❌ Error generating SKM PDF:', error);
        window.notify.error('Erreur', 'Impossible de générer le PDF SKM: ' + error.message);
    }
}

// Download Chaimae Devis as SAAISS PDF (uses SAAISS PDF generator)
window.downloadChaimaeSAAISSDevisPDF = async function (invoiceId) {
    try {
        console.log('📥 Generating SAAISS PDF for Chaimae devis:', invoiceId);

        // Get invoice data from Chaimae database
        const result = await window.electron.dbChaimae.getInvoiceById(invoiceId);

        if (!result.success || !result.data) {
            throw new Error('Devis introuvable');
        }

        const invoice = result.data;

        // Only allow for devis type
        if (invoice.document_type !== 'devis') {
            window.notify.warning('Type incorrect', 'Cette fonction est disponible uniquement pour les devis.');
            return;
        }

        // Check if SAAISS generator exists
        if (typeof window.generateSAAISSPDFFromInvoice === 'function') {
            // Use existing SAAISS generator
            await window.generateSAAISSPDFFromInvoice(invoice, 'chaimae');
        } else if (typeof window.downloadMultiSAAISSDevisPDF === 'function') {
            // Fallback: Call Multi SAAISS generator with Chaimae invoice
            await generateSAAISSPDFForChaimae(invoice);
        } else {
            window.notify.error('Erreur', 'Le générateur SAAISS n\'est pas disponible');
        }

    } catch (error) {
        console.error('❌ Error generating SAAISS PDF:', error);
        window.notify.error('Erreur', 'Impossible de générer le PDF SAAISS: ' + error.message);
    }
}

// Internal function to generate SKM PDF for Chaimae invoice
async function generateSKMPDFForChaimae(invoice) {
    // This calls the showSimpleSKMModal from multi_skm_pdf_generator.js
    // which handles the personalization and PDF generation
    if (typeof window.showSimpleSKMModal === 'function') {
        const customizationData = await window.showSimpleSKMModal(invoice);
        if (!customizationData) {
            console.log('❌ User cancelled SKM PDF generation');
            return;
        }

        // Apply customizations and generate PDF using existing generator logic
        if (typeof window.generateSKMPDFWithCustomization === 'function') {
            await window.generateSKMPDFWithCustomization(invoice, customizationData, 'chaimae');
        } else {
            window.notify.warning('Avertissement', 'La génération SKM personnalisée n\'est pas disponible');
        }
    } else {
        window.notify.error('Erreur', 'Le modal de personnalisation SKM n\'est pas disponible');
    }
}

// Internal function to generate SAAISS PDF for Chaimae invoice
async function generateSAAISSPDFForChaimae(invoice) {
    // This calls the showSimpleSAAISSModal from multi_saaiss_pdf_generator.js
    // which handles the personalization and PDF generation
    if (typeof window.showSimpleSAAISSModal === 'function') {
        const customizationData = await window.showSimpleSAAISSModal(invoice);
        if (!customizationData) {
            console.log('❌ User cancelled SAAISS PDF generation');
            return;
        }

        // Apply customizations and generate PDF using existing generator logic
        if (typeof window.generateSAAISSPDFWithCustomization === 'function') {
            await window.generateSAAISSPDFWithCustomization(invoice, customizationData, 'chaimae');
        } else {
            window.notify.warning('Avertissement', 'La génération SAAISS personnalisée n\'est pas disponible');
        }
    }
}

// Toggle Featured Status Chaimae (from table row)
window.toggleFeaturedChaimae = async function (invoiceId, element) {
    try {
        const currentFeatured = element.dataset.featured === '1';
        const newFeatured = currentFeatured ? 0 : 1;

        const result = await window.electron.dbChaimae.updateInvoiceMetadata(invoiceId, {
            is_featured: newFeatured
        });

        if (result.success) {
            const inv = allInvoicesChaimae.find(i => i.id == invoiceId);
            if (inv) inv.is_featured = newFeatured;
            const filteredInv = filteredInvoicesChaimae.find(i => i.id == invoiceId);
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

// Toggle Featured Status Chaimae (from modal details)
window.toggleFeaturedInModalChaimae = async function (invoiceId, buttonElement) {
    try {
        const currentFeatured = buttonElement.dataset.featured === '1';
        const newFeatured = currentFeatured ? 0 : 1;

        const result = await window.electron.dbChaimae.updateInvoiceMetadata(invoiceId, {
            is_featured: newFeatured
        });

        if (result.success) {
            const inv = allInvoicesChaimae.find(i => i.id == invoiceId);
            if (inv) inv.is_featured = newFeatured;
            const filteredInv = filteredInvoicesChaimae.find(i => i.id == invoiceId);
            if (filteredInv) filteredInv.is_featured = newFeatured;

            buttonElement.dataset.featured = newFeatured ? '1' : '0';
            buttonElement.style.background = newFeatured ? '#ffa726' : '#666';
            buttonElement.querySelector('span').textContent = newFeatured ? '⭐' : '☆';
            buttonElement.childNodes[2].textContent = newFeatured ? 'Retirer des importantes' : 'Marquer comme importante';

            const tableStarElement = document.querySelector(`span[onclick*="toggleFeaturedChaimae(${invoiceId}"]`);
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

// Update AR Status for Chaimae invoice
window.updateArStatusChaimae = async function (id, newStatus) {
    try {
        console.log(`🕒 Updating AR Status for invoice ${id} to: ${newStatus}`);
        const currentUser = JSON.parse(localStorage.getItem('user') || '{}');

        const result = await window.electron.dbChaimae.updateInvoice(id, {
            document: {
                ar_status: newStatus,
                updated_by_user_id: currentUser.id || null,
                updated_by_user_name: currentUser.name || null,
                updated_by_user_email: currentUser.email || null
            }
        });

        if (result.success) {
            window.notify.success('Succès', 'Statut AR mis à jour', 2000);
            
            // Update local state immediately in both arrays
            const invoice = allInvoicesChaimae.find(inv => inv.id === id);
            if (invoice) {
                invoice.ar_status = newStatus;
                invoice.is_modified = true;
                invoice.updated_by_user_name = currentUser.name || invoice.updated_by_user_name;
            }
            const filteredInv = filteredInvoicesChaimae.find(inv => inv.id === id);
            if (filteredInv) {
                filteredInv.ar_status = newStatus;
                filteredInv.is_modified = true;
                filteredInv.updated_by_user_name = currentUser.name || filteredInv.updated_by_user_name;
            }
            
            // Re-render the display with updated data (no full reload needed)
            displayInvoicesChaimae(filteredInvoicesChaimae);
        } else {
            window.notify.error('Erreur', 'Impossible de mettre à jour le statut', 3000);
            loadInvoicesChaimae();
        }
    } catch (error) {
        window.notify.error('Erreur', 'Une erreur est survenue', 3000);
        loadInvoicesChaimae();
    }
}

// Handle payment status change from dropdown - show modal for Payé
window.handlePaymentChangeChaimae = function(id, value, selectEl, previousStatus) {
    if (value === 'payé') {
        selectEl.value = previousStatus === 'payé' ? 'payé' : 'en attente de paiement';
        selectEl.style.background = previousStatus === 'payé' ? '#4caf50' : '#f44336';
        window.showEditPaymentModalChaimae(id, previousStatus || 'en attente de paiement', '');
    } else {
        window.updatePaymentStatusChaimae(id, value);
        selectEl.style.background = '#f44336';
    }
};

// Update Payment Status for Chaimae invoice
window.updatePaymentStatusChaimae = async function (id, status) {
    try {
        const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
        const result = await window.electron.dbChaimae.updateInvoice(id, {
            payment_status: status,
            payment_method: status === 'payé' ? null : null,
            updated_by_user_id: currentUser.id || null,
            updated_by_user_name: currentUser.name || null,
            updated_by_user_email: currentUser.email || null
        });

        if (result.success) {
            window.notify.success('Succès', 'Statut de paiement mis à jour', 2000);

            const inv = allInvoicesChaimae.find(i => i.id == id);
            if (inv) {
                inv.payment_status = status;
                if (status !== 'payé') inv.payment_method = null;
            }
            const filteredInv = filteredInvoicesChaimae.find(i => i.id == id);
            if (filteredInv) {
                filteredInv.payment_status = status;
                if (status !== 'payé') filteredInv.payment_method = null;
            }

            displayInvoicesChaimae(filteredInvoicesChaimae);
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
window.bulkResetArStatusChaimae = async function () {
    const toReset = allInvoicesChaimae.filter(inv => inv.ar_status === 'sans_accuse' && inv.document_type !== 'devis');
    if (toReset.length === 0) {
        window.notify.info('Info', 'Aucune facture avec "Sans accusé" trouvée.', 3000);
        return;
    }
    if (!confirm(`Convertir ${toReset.length} facture(s) de "Sans accusé" → vide ?`)) return;

    let success = 0;
    for (const inv of toReset) {
        try {
            const result = await window.electron.dbChaimae.updateInvoice(inv.id, { document: { ar_status: '' } });
            if (result.success) { inv.ar_status = ''; success++; }
        } catch (e) { console.warn('Reset AR error for', inv.id, e); }
    }
    window.notify.success('✅', `${success}/${toReset.length} facture(s) mises à jour.`, 3000);
    loadInvoicesChaimae();
};

// Migrate local attachments to server (CHAIMAE)
window.migrateAttachmentsToServerChaimae = async function () {
    const confirmed = await customConfirm(
        'Migration des pièces jointes',
        'Cela va transférer toutes les pièces jointes locales vers le serveur en ligne. Continuer ?',
        'info'
    );
    if (!confirmed) return;

    const loadingNotif = window.notify.loading('Migration en cours...', 'Transfert vers le serveur');
    try {
        const result = await window.electron.attachments.migrateToServer({ company: 'CHAIMAE' });
        window.notify.remove(loadingNotif);
        if (result.success) {
            window.notify.success('Migration terminée', `${result.migrated} fichier(s) transféré(s) vers le serveur.`, 5000);
            loadInvoicesChaimae();
        } else {
            window.notify.error('Erreur', result.error || 'Échec de la migration', 4000);
        }
    } catch (e) {
        window.notify.remove(loadingNotif);
        window.notify.error('Erreur', e.message, 4000);
    }
};
