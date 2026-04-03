// Multi Company Invoices List Page
function InvoicesListMultiPage() {
    return `
        <div class="desktop-app">
            <div class="window-header">
                <div class="window-title">
                    <img src="assets/logos/multi.png" class="header-logo" alt="Multi Company" data-asset="assets/logos/multi.png">
                    <span>Liste des Factures - Multi Company</span>
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
                            <button onclick="changeYearMulti()" class="action-btn action-btn-year">
                                <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                                </svg>
                                <span id="currentYearDisplayMulti">2025</span>
                            </button>
                            
                            <button class="action-btn action-btn-situation" onclick="showSituationMensuelleModalMulti()">
                                <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                                    <path d="M1 11a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3zm5-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-7zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V2z"/>
                                </svg>
                                <span>Situation</span>
                            </button>

                            <button class="action-btn action-btn-situation" onclick="showSituationAnnuelleModalMulti()" style="background-color: #ef5350;">
                                <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                                    <path d="M4 11a1 1 0 1 1 2 0v1a1 1 0 1 1-2 0v-1zm6-4a1 1 0 1 1 2 0v5a1 1 0 1 1-2 0V7zM7 9a1 1 0 0 1 2 0v3a1 1 0 1 1-2 0V9z"/>
                                    <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
                                    <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
                                </svg>
                                <span>Annuelle</span>
                            </button>

                            <button class="action-btn" onclick="showSituationAnnuelleClientsModalMulti()" style="background-color: #ff9800; color: white; border: none; font-weight: 600;">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="9" cy="7" r="4"></circle>
                                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                </svg>
                                <span>Globale</span>
                            </button>
                            
                            <button class="action-btn action-btn-primary" onclick="router.navigate('/create-invoice-multi')">
                                <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                </svg>
                                <span>Nouvelle</span>
                            </button>


                            <button class="action-btn action-btn-secondary" onclick="router.navigate('/dashboard-multi')">
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
                            <select id="filterTypeMulti" onchange="filterInvoicesMulti()">
                                <option value="">Tous</option>
                                <option value="facture">Factures</option>
                                <option value="devis">Devis</option>
                            </select>
                        </div>
                        
                        <div class="filter-group">
                            <label>📅 Année:</label>
                            <select id="filterYearMulti" onchange="filterInvoicesMulti()">
                                <option value="">Toutes</option>
                            </select>
                        </div>
                        
                        <div class="filter-group">
                            <label>📆 Mois:</label>
                            <select id="filterMonthMulti" onchange="filterInvoicesMulti()">
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
                            <select id="filterClientMulti" onchange="filterInvoicesMulti()">
                                <option value="">Tous</option>
                            </select>
                        </div>
                        
                        <div class="filter-group">
                            <label>💳 Statut de paiement:</label>
                            <select id="filterPaymentStatusMulti" onchange="filterInvoicesMulti()">
                                <option value="">Tous</option>
                                <option value="en attente de paiement">En attente</option>
                                <option value="payé">Payé</option>
                            </select>
                        </div>
                        
                        <div class="filter-group">
                            <label>💰 Méthode de paiement:</label>
                            <select id="filterPaymentMethodMulti" onchange="filterInvoicesMulti()">
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
                                <div style="position:relative;" id="searchTypeDropdownWrapperMulti">
                                    <div onclick="toggleSearchTypeDropdownMulti()" id="searchTypeDropdownDisplayMulti"
                                        style="display:flex; align-items:center; justify-content:space-between; padding:0.45rem 0.7rem; background:#252526; border:1px solid #3e3e42; border-radius:6px; cursor:pointer; transition:all 0.15s; user-select:none;">
                                        <div style="display:flex; align-items:center; gap:0.4rem; flex-wrap:wrap; flex:1; min-width:0;">
                                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#4caf50" stroke-width="2.5" style="flex-shrink:0;"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                                            <span id="searchTypeSelectedTextMulti" style="color:#ccc; font-size:0.82rem; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">Tous les champs</span>
                                        </div>
                                        <svg id="searchTypeDropdownArrowMulti" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#666" stroke-width="2.5" style="flex-shrink:0; transition:transform 0.2s;"><polyline points="6 9 12 15 18 9"/></svg>
                                    </div>
                                    <div id="searchTypeDropdownMulti" style="display:none; position:absolute; top:calc(100% + 3px); left:0; right:0; background:#252526; border:1px solid #3e3e42; border-radius:6px; z-index:9999; overflow:hidden; box-shadow:0 6px 18px rgba(0,0,0,0.5); max-height:300px; overflow-y:auto;">
                                        <div onclick="toggleAllSearchTypesMulti()" style="display:flex; align-items:center; gap:0.6rem; padding:0.55rem 0.7rem; cursor:pointer; background:#2a2a2e; border-bottom:2px solid #3e3e42; transition:background 0.12s;" onmouseover="this.style.background='#323235'" onmouseout="this.style.background='#2a2a2e'">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4caf50" stroke-width="2.5" style="flex-shrink:0;"><polyline points="20 6 9 17 4 12"/></svg>
                                            <span id="searchTypeToggleAllTextMulti" style="color:#4caf50; font-size:0.82rem; font-weight:600;">Sélectionner tout</span>
                                        </div>
                                        <div onclick="toggleSearchTypeMulti('numero')" style="display:flex; align-items:center; gap:0.6rem; padding:0.45rem 0.7rem; cursor:pointer; transition:background 0.12s;" onmouseover="this.style.background='#2d2d30'" onmouseout="this.style.background='transparent'">
                                            <span id="searchTypeCheckNumeroMulti" data-active="false" style="width:14px; height:14px; border-radius:3px; border:1.5px solid #555; display:inline-flex; align-items:center; justify-content:center; font-size:0.65rem; flex-shrink:0; transition:all 0.12s; color:#fff;"></span>
                                            <span style="color:#d4d4d4; font-size:0.82rem;">📄 N° Document</span>
                                        </div>
                                        <div onclick="toggleSearchTypeMulti('order')" style="display:flex; align-items:center; gap:0.6rem; padding:0.45rem 0.7rem; cursor:pointer; border-top:1px solid #2a2a2a; transition:background 0.12s;" onmouseover="this.style.background='#2d2d30'" onmouseout="this.style.background='transparent'">
                                            <span id="searchTypeCheckOrderMulti" data-active="false" style="width:14px; height:14px; border-radius:3px; border:1.5px solid #555; display:inline-flex; align-items:center; justify-content:center; font-size:0.65rem; flex-shrink:0; transition:all 0.12s; color:#fff;"></span>
                                            <span style="color:#d4d4d4; font-size:0.82rem;">📋 N° Order</span>
                                        </div>
                                        <div onclick="toggleSearchTypeMulti('client')" style="display:flex; align-items:center; gap:0.6rem; padding:0.45rem 0.7rem; cursor:pointer; border-top:1px solid #2a2a2a; transition:background 0.12s;" onmouseover="this.style.background='#2d2d30'" onmouseout="this.style.background='transparent'">
                                            <span id="searchTypeCheckClientMulti" data-active="false" style="width:14px; height:14px; border-radius:3px; border:1.5px solid #555; display:inline-flex; align-items:center; justify-content:center; font-size:0.65rem; flex-shrink:0; transition:all 0.12s; color:#fff;"></span>
                                            <span style="color:#d4d4d4; font-size:0.82rem;">👤 Client</span>
                                        </div>
                                        <div onclick="toggleSearchTypeMulti('ice')" style="display:flex; align-items:center; gap:0.6rem; padding:0.45rem 0.7rem; cursor:pointer; border-top:1px solid #2a2a2a; transition:background 0.12s;" onmouseover="this.style.background='#2d2d30'" onmouseout="this.style.background='transparent'">
                                            <span id="searchTypeCheckIceMulti" data-active="false" style="width:14px; height:14px; border-radius:3px; border:1.5px solid #555; display:inline-flex; align-items:center; justify-content:center; font-size:0.65rem; flex-shrink:0; transition:all 0.12s; color:#fff;"></span>
                                            <span style="color:#d4d4d4; font-size:0.82rem;">🏢 ICE</span>
                                        </div>
                                        <div onclick="toggleSearchTypeMulti('product')" style="display:flex; align-items:center; gap:0.6rem; padding:0.45rem 0.7rem; cursor:pointer; border-top:1px solid #2a2a2a; transition:background 0.12s;" onmouseover="this.style.background='#2d2d30'" onmouseout="this.style.background='transparent'">
                                            <span id="searchTypeCheckProductMulti" data-active="false" style="width:14px; height:14px; border-radius:3px; border:1.5px solid #555; display:inline-flex; align-items:center; justify-content:center; font-size:0.65rem; flex-shrink:0; transition:all 0.12s; color:#fff;"></span>
                                            <span style="color:#d4d4d4; font-size:0.82rem;">📦 Produit</span>
                                        </div>
                                        <div onclick="toggleSearchTypeMulti('price')" style="display:flex; align-items:center; gap:0.6rem; padding:0.45rem 0.7rem; cursor:pointer; border-top:1px solid #2a2a2a; transition:background 0.12s;" onmouseover="this.style.background='#2d2d30'" onmouseout="this.style.background='transparent'">
                                            <span id="searchTypeCheckPriceMulti" data-active="false" style="width:14px; height:14px; border-radius:3px; border:1.5px solid #555; display:inline-flex; align-items:center; justify-content:center; font-size:0.65rem; flex-shrink:0; transition:all 0.12s; color:#fff;"></span>
                                            <span style="color:#d4d4d4; font-size:0.82rem;">💰 Prix</span>
                                        </div>
                                        <div onclick="toggleSearchTypeMulti('total_ht')" style="display:flex; align-items:center; gap:0.6rem; padding:0.45rem 0.7rem; cursor:pointer; border-top:1px solid #2a2a2a; transition:background 0.12s;" onmouseover="this.style.background='#2d2d30'" onmouseout="this.style.background='transparent'">
                                            <span id="searchTypeCheckTotalHtMulti" data-active="false" style="width:14px; height:14px; border-radius:3px; border:1.5px solid #555; display:inline-flex; align-items:center; justify-content:center; font-size:0.65rem; flex-shrink:0; transition:all 0.12s; color:#fff;"></span>
                                            <span style="color:#d4d4d4; font-size:0.82rem;">💵 Total H.T</span>
                                        </div>
                                        <div onclick="toggleSearchTypeMulti('total')" style="display:flex; align-items:center; gap:0.6rem; padding:0.45rem 0.7rem; cursor:pointer; border-top:1px solid #2a2a2a; transition:background 0.12s;" onmouseover="this.style.background='#2d2d30'" onmouseout="this.style.background='transparent'">
                                            <span id="searchTypeCheckTotalMulti" data-active="false" style="width:14px; height:14px; border-radius:3px; border:1.5px solid #555; display:inline-flex; align-items:center; justify-content:center; font-size:0.65rem; flex-shrink:0; transition:all 0.12s; color:#fff;"></span>
                                            <span style="color:#d4d4d4; font-size:0.82rem;">💵 Total TTC</span>
                                        </div>
                                    </div>
                                </div>
                                <input type="text" id="searchInputMulti" placeholder="Tapez votre recherche..." onkeyup="filterInvoicesMulti()" style="width: 100%; padding: 0.75rem; background: #1e1e1e; border: 1px solid #3e3e42; border-radius: 4px; color: #ffffff; font-size: 0.95rem;">
                            </div>
                        </div>

                        <!-- P.J Filter -->
                        <div class="filter-group">
                            <label>📎 Pièces Jointes:</label>
                            <select id="filterAttachmentsMulti" onchange="filterInvoicesMulti()">
                                <option value="all">Tous</option>
                                <option value="with">Avec P.J</option>
                                <option value="without">Sans P.J</option>
                            </select>
                        </div>

                        <!-- Creation Method Filter -->
                        <div class="filter-group">
                            <label>🔧 Méthode de création:</label>
                            <select id="filterCreationMethodMulti" onchange="filterInvoicesMulti()">
                                <option value="all">Tous</option>
                                <option value="normal">Créé normalement</option>
                                <option value="converted">Converti</option>
                            </select>
                        </div>

                        <!-- Devis Conversion Filter -->
                        <div class="filter-group">
                            <label>🔄 Etat Devis:</label>
                            <select id="filterDevisConversionMulti" onchange="filterInvoicesMulti()">
                                <option value="all">Tous</option>
                                <option value="converted">Convertis</option>
                                <option value="not_converted">Non Convertis</option>
                            </select>
                        </div>

                        <!-- AR Status Filter -->
                        <div class="filter-group">
                            <label>🕒 Accusé de Réception:</label>
                            <select id="filterArStatusMulti" onchange="filterInvoicesMulti()">
                                <option value="all">Tous</option>
                                <option value="">— (vide)</option>
                                <option value="sans_accuse">Sans accusé</option>
                                <option value="en_attente">En attente</option>
                                <option value="accuse">Accusé</option>
                                <option value="done">Done</option>
                            </select>
                        </div>

                        <!-- Featured Filter - Admins Only -->
                        <div class="filter-group" id="featuredFilterGroupMulti" style="display: none;">
                            <label>⭐ Importance:</label>
                            <select id="filterFeaturedMulti" onchange="filterInvoicesMulti()">
                                <option value="all">Toutes</option>
                                <option value="featured">⭐ Importantes</option>
                                <option value="not_featured">Non importantes</option>
                            </select>
                        </div>

                        <!-- Status Filter (Seen/Unseen) - Admins Only -->
                        <div class="filter-group" id="statusFilterGroupMulti" style="display: none;">
                            <label>👁️ Statut:</label>
                            <div style="position: relative;">
                                <select id="filterStatusMulti" onchange="filterInvoicesMulti()">
                                    <option value="all">Tous</option>
                                    <option value="unseen">Non lus (Nouveau)</option>
                                    <option value="modified">Modifiés (Par un autre)</option>
                                    <option value="seen">Lus / Traités</option>
                                </select>
                                <span id="unseenBadgeMulti" style="display: none; position: absolute; top: -8px; right: -8px; background: #f44336; color: white; border-radius: 50%; padding: 2px 6px; font-size: 10px; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">0</span>
                            </div>
                        </div>
                        
                        <div class="filter-group">
                            <button class="btn-refresh" onclick="loadInvoicesMulti()" style="margin-top: 1.5rem;">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style="margin-right: 0.5rem;">
                                    <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
                                    <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
                                </svg>
                                <span>Actualiser</span>
                            </button>
                        </div>
                    </div>

                    <!-- Loading -->
                    <div id="loadingSpinnerMulti" class="loading-spinner" style="display: none;">
                        <div class="spinner"></div>
                        <p>Chargement des données...</p>
                    </div>

                    <!-- Results Counter & Bulk Actions -->
                    <div style="display: flex; gap: 1rem; align-items: center; margin-bottom: 1rem;">
                        <div id="resultsCounterMulti" style="flex: 1; padding: 0.75rem 1rem; background: #2d2d30; border: 1px solid #3e3e42; border-radius: 6px; color: #cccccc; font-size: 0.95rem; display: none;">
                            <strong>📊 Résultats:</strong> <span id="resultCountMulti">0</span> facture(s) trouvée(s)
                        </div>
                        <div style="display: flex; gap: 0.5rem; align-items: center;">
                            <label style="color: #cccccc; font-size: 0.9rem;">Afficher:</label>
                            <select id="itemsPerPageMulti" onchange="changeItemsPerPageMulti()" style="padding: 0.5rem; background: #2d2d30; border: 1px solid #3e3e42; border-radius: 4px; color: #ffffff; cursor: pointer;">
                                <option value="10">10</option>
                                <option value="20">20</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                                <option value="all">Tout</option>
                            </select>
                        </div>
                        <button id="bulkDeleteBtnMulti" onclick="handleBulkDeleteMulti()" 
                                style="padding: 0.75rem 1.5rem; background: #f44336; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 0.95rem; transition: all 0.3s; display: flex; align-items: center; gap: 0.5rem;"
                                onmouseover="this.style.background='#d32f2f'" onmouseout="this.style.background='#f44336'">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                            </svg>
                            <span id="bulkDeleteTextMulti">Supprimer</span>
                        </button>
                        <button id="bulkDownloadBtnMulti" onclick="handleBulkDownloadMulti()" 
                                style="padding: 0.75rem 1.5rem; background: #2196f3; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 0.95rem; transition: all 0.3s; display: flex; align-items: center; gap: 0.5rem;"
                                onmouseover="this.style.background='#1976d2'" onmouseout="this.style.background='#2196f3'">
                            📥 <span id="bulkDownloadTextMulti">Télécharger</span>
                        </button>
                    </div>

                    <!-- Column Visibility Controls -->
                    <div id="columnVisibilityControlsMulti" style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1rem; padding: 0.75rem; background: #2d2d30; border: 1px solid #3e3e42; border-radius: 6px; align-items: center;">
                        <span style="color: #cccccc; font-size: 0.9rem; font-weight: 600; margin-right: 0.5rem;">👁️ Afficher:</span>
                        <button id="toggleColIceMulti" onclick="toggleColumnMulti('ice')" class="col-toggle-btn" style="padding: 0.4rem 0.8rem; background: #f44336; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 0.85rem; transition: all 0.2s; opacity: 0.7;">
                            🏢 ICE
                        </button>
                    </div>

                    <!-- Invoices Table -->
                    <div class="table-container">
                        <table class="invoices-table" id="invoicesTableMulti">
                            <thead id="invoicesTableHeadMulti">
                                <tr>
                                    <th>
                                        <input type="checkbox" id="selectAllInvoicesMulti" 
                                               style="width: 18px; height: 18px; cursor: pointer;"
                                               title="Sélectionner tout">
                                    </th>
                                    <th class="col-type-multi">Type</th>
                                    <th onclick="sortTableMulti('numero')" style="cursor: pointer; user-select: none;" title="Cliquer pour trier">
                                        N° Document <span id="sortIconNumero">⇅</span>
                                    </th>
                                    <th>Client</th>
                                    <th class="col-ice-multi">ICE</th>
                                    <th class="col-date-multi" onclick="sortTableMulti('date')" style="cursor: pointer; user-select: none;" title="Cliquer pour trier">
                                        Date <span id="sortIconDate">⇅</span>
                                    </th>
                                    <th class="col-createdBy-multi">Créé par</th>
                                    <th class="col-totalHT-multi" onclick="sortTableMulti('total_ht')" style="cursor: pointer; user-select: none;" title="Cliquer pour trier">
                                        Total HT <span id="sortIconHT">⇅</span>
                                    </th>
                                    <th onclick="sortTableMulti('total_ttc')" style="cursor: pointer; user-select: none;" title="Cliquer pour trier">
                                        Total TTC <span id="sortIconTTC">⇅</span>
                                    </th>
                                    <th style="width: 140px; text-align: center;">Accusé R.</th>
                                    <th style="width: 200px; text-align: center;">💳 Paiement</th>
                                    <th style="width: 50px; text-align: center;">P.J</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody id="invoicesTableBodyMulti">
                                <!-- Invoices will be loaded here -->
                            </tbody>
                        </table>
                    </div>

                    <!-- Pagination -->
                    <div id="paginationMulti" style="display: none; margin-top: 1.5rem; padding: 1rem; background: #2d2d30; border: 1px solid #3e3e42; border-radius: 6px;">
                        <div style="display: flex; justify-content: center; align-items: center; gap: 0.5rem;">
                            <button id="prevPageMulti" onclick="changePaginationPageMulti('prev')" style="padding: 0.5rem 1rem; background: #3e3e42; color: #ffffff; border: none; border-radius: 4px; cursor: pointer; transition: all 0.3s;" onmouseover="this.style.background='#4e4e52'" onmouseout="this.style.background='#3e3e42'">
                                ← Précédent
                            </button>
                            <div id="pageNumbersMulti" style="display: flex; gap: 0.25rem;">
                                <!-- Page numbers will be inserted here -->
                            </div>
                            <button id="nextPageMulti" onclick="changePaginationPageMulti('next')" style="padding: 0.5rem 1rem; background: #3e3e42; color: #ffffff; border: none; border-radius: 4px; cursor: pointer; transition: all 0.3s;" onmouseover="this.style.background='#4e4e52'" onmouseout="this.style.background='#3e3e42'">
                                Suivant →
                            </button>
                        </div>
                    </div>

                    <!-- Empty State -->
                    <div id="emptyStateMulti" class="empty-state" style="display: none;">
                        <svg width="64" height="64" viewBox="0 0 16 16" fill="currentColor" style="opacity: 0.3; margin-bottom: 1rem;">
                            <path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z"/>
                        </svg>
                        <h3>Aucune facture trouvée</h3>
                        <p>Commencez par créer votre première facture</p>
                        <button class="btn-primary" onclick="router.navigate('/create-invoice-multi')" style="margin-top: 1rem;">
                            <span>+ Créer une facture</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Global variables
let allInvoicesMulti = [];
let filteredInvoicesMulti = [];
let currentPageMulti = 1;
let itemsPerPageMulti = 10;

let isSuperUserMulti = false;

// Column visibility state for Multi - ICE hidden by default
let columnVisibilityMulti = {
    ice: false
};

// Load column visibility from localStorage on page load
function loadColumnVisibilityMulti() {
    const saved = localStorage.getItem('multi_column_visibility');
    if (saved) {
        try {
            columnVisibilityMulti = JSON.parse(saved);
        } catch (e) {
            console.error('Error loading column visibility:', e);
        }
    }
    // Apply visibility on load
    applyColumnVisibilityMulti();
}

// Save column visibility to localStorage
function saveColumnVisibilityMulti() {
    localStorage.setItem('multi_column_visibility', JSON.stringify(columnVisibilityMulti));
}

// Toggle column visibility
window.toggleColumnMulti = function (column) {
    columnVisibilityMulti[column] = !columnVisibilityMulti[column];
    saveColumnVisibilityMulti();
    applyColumnVisibilityMulti();

    // Re-display invoices to update table body
    displayInvoicesMulti();
};

// Apply column visibility to table and buttons - ICE only
function applyColumnVisibilityMulti() {
    const isVisible = columnVisibilityMulti.ice;

    // Update button style
    const btn = document.getElementById('toggleColIceMulti');
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
    const headerCells = document.querySelectorAll('.col-ice-multi');
    headerCells.forEach(cell => {
        cell.style.display = isVisible ? '' : 'none';
    });

    // Update body cells visibility
    const bodyCells = document.querySelectorAll('.col-ice-multi-body');
    bodyCells.forEach(cell => {
        cell.style.display = isVisible ? '' : 'none';
    });
}

// Validation Queue Functions for Multi
async function loadPendingInvoicesMulti() {
    try {
        const result = await window.electron.dbMulti.getPendingInvoices();
        if (result.success) {
            displayPendingInvoicesMulti(result.data);
            const countSpan = document.getElementById('pendingInvoicesCountMulti');
            if (countSpan) countSpan.textContent = result.data.length;
        }
    } catch (error) {
        console.error('Error loading pending invoices Multi:', error);
    }
}

// Helper to format numbers
function formatNumberMulti(num) {
    if (num === null || num === undefined) return '0.00';
    return parseFloat(num).toFixed(2);
}

function displayPendingInvoicesMulti(invoices) {
    const tableBody = document.getElementById('pendingInvoicesTableBodyMulti');
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
            <td><strong>${formatNumberMulti(inv.total_ttc)}</strong> DH</td>
            <td><span style="color:#2196f3;">${inv.created_by_user_name || '-'}</span></td>
            <td style="text-align:center;">
                <div style="display:flex;gap:0.5rem;justify-content:center;">
                    <button onclick="handleValidateInvoiceMulti('${inv.id}', 'validated')" class="btn-action btn-validate" title="Valider" style="background:#4caf50;color:white;border:none;padding:0.4rem 0.8rem;border-radius:4px;cursor:pointer;">
                        ✅ Valider
                    </button>
                    <button onclick="handleValidateInvoiceMulti('${inv.id}', 'rejected')" class="btn-action btn-reject" title="Rejeter" style="background:#f44336;color:white;border:none;padding:0.4rem 0.8rem;border-radius:4px;cursor:pointer;">
                        ❌ Rejeter
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

window.toggleValidationQueueMulti = function () {
    const content = document.getElementById('validationQueueContentMulti');
    const icon = document.getElementById('toggleValidationIconMulti');
    if (content.style.display === 'none') {
        content.style.display = 'block';
        icon.textContent = '▲';
    } else {
        content.style.display = 'none';
        icon.textContent = '▼';
    }
};

// Toggle Featured Status Multi (from table row)
window.toggleFeaturedMulti = async function (invoiceId, element) {
    try {
        const currentFeatured = element.dataset.featured === '1';
        const newFeatured = currentFeatured ? 0 : 1;
        console.log(`⭐ [MULTI] toggleFeatured - Invoice: ${invoiceId}, current: ${currentFeatured}, new: ${newFeatured}`);

        const result = await window.electron.dbMulti.updateInvoiceMetadata(invoiceId, {
            is_featured: newFeatured
        });
        console.log(`⭐ [MULTI] toggleFeatured result:`, JSON.stringify(result));

        if (result.success) {
            // Update local state
            const inv = allInvoicesMulti.find(i => i.id == invoiceId);
            if (inv) inv.is_featured = newFeatured;
            const filteredInv = filteredInvoicesMulti.find(i => i.id == invoiceId);
            if (filteredInv) filteredInv.is_featured = newFeatured;

            // Update UI immediately
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

// Toggle Featured Status Multi (from modal details)
window.toggleFeaturedInModalMulti = async function (invoiceId, buttonElement) {
    try {
        const currentFeatured = buttonElement.dataset.featured === '1';
        const newFeatured = currentFeatured ? 0 : 1;
        console.log(`⭐ [MULTI MODAL] toggleFeatured - Invoice: ${invoiceId}, current: ${currentFeatured}, new: ${newFeatured}`);

        const result = await window.electron.dbMulti.updateInvoiceMetadata(invoiceId, {
            is_featured: newFeatured
        });
        console.log(`⭐ [MULTI MODAL] toggleFeatured result:`, JSON.stringify(result));

        if (result.success) {
            // Update local state
            const inv = allInvoicesMulti.find(i => i.id == invoiceId);
            if (inv) inv.is_featured = newFeatured;
            const filteredInv = filteredInvoicesMulti.find(i => i.id == invoiceId);
            if (filteredInv) filteredInv.is_featured = newFeatured;

            // Update button UI
            buttonElement.dataset.featured = newFeatured ? '1' : '0';
            buttonElement.style.background = newFeatured ? '#ffa726' : '#666';
            buttonElement.querySelector('span').textContent = newFeatured ? '⭐' : '☆';
            buttonElement.childNodes[2].textContent = newFeatured ? 'Retirer des importantes' : 'Marquer comme importante';

            // Update table row star icon if visible
            const tableStarElement = document.querySelector(`span[onclick*="toggleFeaturedMulti(${invoiceId}"]`);
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

// Update AR Status Multi
window.updateArStatusMulti = async function (id, status) {
    try {
        const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
        const result = await window.electron.dbMulti.updateInvoice(id, {
            ar_status: status,
            updated_by_user_id: currentUser.id || null,
            updated_by_user_name: currentUser.name || null,
            updated_by_user_email: currentUser.email || null
        });

        if (result.success) {
            window.notify.success('Succès', 'Statut Accusé R. mis à jour');

            // Update local state immediately in both arrays
            const inv = allInvoicesMulti.find(i => i.id == id);
            if (inv) {
                inv.ar_status = status;
                inv.is_modified = true;
                inv.updated_by_user_name = currentUser.name || inv.updated_by_user_name;
            }
            const filteredInv = filteredInvoicesMulti.find(i => i.id == id);
            if (filteredInv) {
                filteredInv.ar_status = status;
                filteredInv.is_modified = true;
                filteredInv.updated_by_user_name = currentUser.name || filteredInv.updated_by_user_name;
            }
            
            // Re-render the display with updated data (no full reload needed)
            displayInvoicesMulti();
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
window.handlePaymentChangeMulti = function(id, value, selectEl, previousStatus) {
    if (value === 'payé') {
        selectEl.value = previousStatus === 'payé' ? 'payé' : 'en attente de paiement';
        selectEl.style.background = previousStatus === 'payé' ? '#4caf50' : '#f44336';
        window.showEditPaymentModalMulti(id, previousStatus || 'en attente de paiement', '');
    } else {
        window.updatePaymentStatusMulti(id, value);
        selectEl.style.background = '#f44336';
    }
};

// Update Payment Status for MULTI
window.updatePaymentStatusMulti = async function (id, status) {
    try {
        const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
        const result = await window.electron.dbMulti.updateInvoice(id, {
            payment_status: status,
            payment_method: status === 'payé' ? null : null,
            updated_by_user_id: currentUser.id || null,
            updated_by_user_name: currentUser.name || null,
            updated_by_user_email: currentUser.email || null
        });

        if (result.success) {
            window.notify.success('Succès', 'Statut de paiement mis à jour');

            const inv = allInvoicesMulti.find(i => i.id == id);
            if (inv) {
                inv.payment_status = status;
                if (status !== 'payé') inv.payment_method = null;
            }
            const filteredInv = filteredInvoicesMulti.find(i => i.id == id);
            if (filteredInv) {
                filteredInv.payment_status = status;
                if (status !== 'payé') filteredInv.payment_method = null;
            }

            displayInvoicesMulti();
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
window.bulkResetArStatusMulti = async function () {
    const toReset = allInvoicesMulti.filter(inv => inv.ar_status === 'sans_accuse' && inv.document_type !== 'devis');
    if (toReset.length === 0) {
        window.notify.info('Info', 'Aucune facture avec "Sans accusé" trouvée.', 3000);
        return;
    }
    if (!confirm(`Convertir ${toReset.length} facture(s) de "Sans accusé" → vide ?`)) return;

    let success = 0;
    for (const inv of toReset) {
        try {
            const result = await window.electron.dbMulti.updateInvoice(inv.id, { ar_status: '' });
            if (result.success) { inv.ar_status = ''; success++; }
        } catch (e) { console.warn('Reset AR error for', inv.id, e); }
    }
    window.notify.success('✅', `${success}/${toReset.length} facture(s) mises à jour.`, 3000);
    loadInvoicesMulti();
};

window.handleValidateInvoiceMulti = async function (id, status) {
    const currentUserMulti = JSON.parse(localStorage.getItem('user') || '{}');
    const isAdminViewerMulti = currentUserMulti.email === 'redouanerrebbahi99@gmail.com';
    if (!isAdminViewerMulti) {
        window.notify?.error('Erreur', 'Action réservée à l\'admin', 3000);
        return;
    }
    const action = status === 'validated' ? 'valider' : 'rejeter';
    const confirmMessage = `Êtes-vous sûr de vouloir ${action} ce document ?`;

    const confirmed = await customConfirm('Confirmation', confirmMessage, status === 'validated' ? 'info' : 'warning');

    if (confirmed) {
        try {
            const currentUserVal = JSON.parse(localStorage.getItem('user') || '{}');
            const result = await window.electron.dbMulti.validateInvoice(id, status, currentUserVal.email || '');
            if (result.success) {
                window.notify.success('Succès', `Le document a été ${status === 'validated' ? 'validé' : 'rejeté'}.`);
                loadInvoicesMulti(); // Reload everything
            } else {
                window.notify.error('Erreur', result.error);
            }
        } catch (error) {
            console.error('Error validating invoice Multi:', error);
            window.notify.error('Erreur', error.message);
        }
    }
};

// Load invoices
async function loadInvoicesMulti() {
    // Load column visibility preferences
    loadColumnVisibilityMulti();

    // Check user identity
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    isSuperUserMulti = (user.email === 'redouanerrebbahi99@gmail.com' || user.can_auto_validate === true);

    // Show/Hide Status Filter based on admin status
    const statusFilterGroup = document.getElementById('statusFilterGroupMulti');
    if (statusFilterGroup) {
        statusFilterGroup.style.display = isSuperUserMulti ? 'block' : 'none';
    }

    // Show/Hide Featured Filter based on admin status
    const featuredFilterGroup = document.getElementById('featuredFilterGroupMulti');
    if (featuredFilterGroup) {
        featuredFilterGroup.style.display = isSuperUserMulti ? 'block' : 'none';
    }

    const spinner = document.getElementById('loadingSpinnerMulti');
    const tableBody = document.getElementById('invoicesTableBodyMulti');
    const emptyState = document.getElementById('emptyStateMulti');

    if (spinner) spinner.style.display = 'flex';
    if (tableBody) tableBody.innerHTML = '';

    try {
        const result = await window.electron.dbMulti.getAllInvoices('MULTI');

        if (result.success) {
            let invoices = result.data;

            // Check if a year was selected from year selector
            const selectedYear = sessionStorage.getItem('multi_current_year');
            if (selectedYear && selectedYear !== '') {
                // Filter invoices by selected year
                invoices = invoices.filter(inv => {
                    const year = inv.year || (window.safeParseDate||function(d){return new Date(d)})(inv.document_date).getFullYear();
                    return year.toString() === selectedYear;
                });
                console.log(`📊 [MULTI] Filtered to year ${selectedYear}:`, invoices.length, 'invoices');

                // Update the year display button
                const yearDisplay = document.getElementById('currentYearDisplayMulti');
                if (yearDisplay) {
                    yearDisplay.textContent = selectedYear;
                }
            }

            // Add default display if not present
            const enrichedInvoices = invoices.map(inv => ({
                ...inv,
                created_by_user_name: inv.created_by_user_name || '-'
            }));

            // Store ALL invoices (including pending "Unseen")
            allInvoicesMulti = enrichedInvoices;

            console.log('✅ [MULTI] Invoices loaded successfully');
            console.log('📊 [MULTI] Total invoices:', allInvoicesMulti.length);
            console.log('🔍 [MULTI] First invoice object:', allInvoicesMulti[0]);
            console.log('🔍 [MULTI] Checking client_nom field:');
            allInvoicesMulti.slice(0, 5).forEach((inv, idx) => {
                console.log(`   Invoice ${idx}: client_nom = "${inv.client_nom}" (type: ${typeof inv.client_nom})`);
            });
            
            // Check all unique client_nom values
            const allClientNoms = allInvoicesMulti.map(inv => inv.client_nom);
            console.log('📋 [MULTI] All client_nom values:', allClientNoms);
            const uniqueClients = [...new Set(allClientNoms.filter(Boolean))];
            console.log('🎯 [MULTI] Unique non-empty client_nom values:', uniqueClients.length, uniqueClients);

            // Calculate Unseen (Pending) count
            const unseenCount = allInvoicesMulti.filter(inv => inv.validation_status === 'pending').length;
            const badge = document.getElementById('unseenBadgeMulti');
            if (badge) {
                badge.textContent = unseenCount;
                badge.style.display = unseenCount > 0 ? 'block' : 'none';
            }

            filteredInvoicesMulti = [...allInvoicesMulti];

            console.log('🔵 [MULTI] About to call populateFiltersMulti()...');
            populateFiltersMulti();
            console.log('🟢 [MULTI] populateFiltersMulti() completed');
            displayInvoicesMulti();

            if (allInvoicesMulti.length === 0 && emptyState) {
                emptyState.style.display = 'flex';
            }
        } else {
            window.notify.error('Erreur', 'Impossible de charger les factures', 3000);
        }
    } catch (error) {
        console.error('[MULTI] Error loading invoices:', error);
        window.notify.error('Erreur', 'Une erreur est survenue lors du chargement', 3000);
    } finally {
        if (spinner) spinner.style.display = 'none';
    }
}

// Populate filters
function populateFiltersMulti() {
    const yearFilter = document.getElementById('filterYearMulti');
    const clientFilter = document.getElementById('filterClientMulti');

    console.log('🔵 [MULTI] populateFiltersMulti() called');
    console.log('   yearFilter element exists?', !!yearFilter);
    console.log('   clientFilter element exists?', !!clientFilter);
    
    if (!yearFilter || !clientFilter) {
        console.error('❌ [MULTI] Filter elements not found! yearFilter:', !!yearFilter, 'clientFilter:', !!clientFilter);
        return;
    }

    // Get unique years
    const years = [...new Set(allInvoicesMulti.map(inv => (window.safeParseDate||function(d){return new Date(d)})(inv.document_date).getFullYear()))].sort((a, b) => b - a);
    yearFilter.innerHTML = '<option value="">Toutes</option>' + years.map(year => `<option value="${year}">${year}</option>`).join('');

    // Get unique clients
    console.log('🔍 [MULTI] populateFiltersMulti - allInvoicesMulti count:', allInvoicesMulti.length);
    console.log('🔍 [MULTI] Sample invoice:', allInvoicesMulti[0]);
    const clients = [...new Set(allInvoicesMulti.map(inv => inv.client_nom).filter(Boolean))].sort();
    console.log('🔍 [MULTI] Unique clients found:', clients.length, clients);
    
    const newHTML = '<option value="">Tous</option>' + clients.map(client => `<option value="${client}">${client}</option>`).join('');
    console.log('📝 [MULTI] New HTML to set:', newHTML);
    
    clientFilter.innerHTML = newHTML;
    
    console.log('✅ [MULTI] Client filter populated with', clients.length, 'clients');
    console.log('📋 [MULTI] Dropdown HTML after population:', clientFilter.innerHTML);
    console.log('📋 [MULTI] Dropdown options count:', clientFilter.options.length);
    console.log('📋 [MULTI] Dropdown visible?', clientFilter.offsetParent !== null);
}

// Toggle Search Type dropdown for MULTI
window.toggleSearchTypeDropdownMulti = function() {
    const dropdown = document.getElementById('searchTypeDropdownMulti');
    const display = document.getElementById('searchTypeDropdownDisplayMulti');
    const arrow = document.getElementById('searchTypeDropdownArrowMulti');
    if (!dropdown) return;
    const isOpen = dropdown.style.display !== 'none';
    dropdown.style.display = isOpen ? 'none' : 'block';
    if (display) {
        display.style.borderColor = isOpen ? '#3e3e42' : '#4caf50';
        display.style.background = isOpen ? '#252526' : '#2a2a2e';
    }
    if (arrow) arrow.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
}

document.addEventListener('click', function(e) {
    const wrapper = document.getElementById('searchTypeDropdownWrapperMulti');
    const dropdown = document.getElementById('searchTypeDropdownMulti');
    if (wrapper && dropdown && !wrapper.contains(e.target)) {
        dropdown.style.display = 'none';
        const display = document.getElementById('searchTypeDropdownDisplayMulti');
        if (display) {
            display.style.borderColor = '#3e3e42';
            display.style.background = '#252526';
        }
        const arrow = document.getElementById('searchTypeDropdownArrowMulti');
        if (arrow) arrow.style.transform = 'rotate(0deg)';
    }
});

window.toggleAllSearchTypesMulti = function() {
    const map = {'numero': 'searchTypeCheckNumeroMulti', 'order': 'searchTypeCheckOrderMulti', 'client': 'searchTypeCheckClientMulti', 'ice': 'searchTypeCheckIceMulti', 'product': 'searchTypeCheckProductMulti', 'price': 'searchTypeCheckPriceMulti', 'total_ht': 'searchTypeCheckTotalHtMulti', 'total': 'searchTypeCheckTotalMulti'};
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
    const toggleAllText = document.getElementById('searchTypeToggleAllTextMulti');
    if (toggleAllText) toggleAllText.textContent = newState ? 'Désélectionner tout' : 'Sélectionner tout';
    const textEl = document.getElementById('searchTypeSelectedTextMulti');
    if (textEl) textEl.textContent = 'Tous les champs';
    filterInvoicesMulti();
};

window.toggleSearchTypeMulti = function(type) {
    const map = {'numero': 'searchTypeCheckNumeroMulti', 'order': 'searchTypeCheckOrderMulti', 'client': 'searchTypeCheckClientMulti', 'ice': 'searchTypeCheckIceMulti', 'product': 'searchTypeCheckProductMulti', 'price': 'searchTypeCheckPriceMulti', 'total_ht': 'searchTypeCheckTotalHtMulti', 'total': 'searchTypeCheckTotalMulti'};
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
    const textEl = document.getElementById('searchTypeSelectedTextMulti');
    if (textEl) {
        if (activeTypes.length === 0) textEl.textContent = 'Tous les champs';
        else if (activeTypes.length === 1) textEl.textContent = labels[activeTypes[0]];
        else if (activeTypes.length === 2) textEl.textContent = activeTypes.map(t => labels[t]).join(', ');
        else textEl.textContent = activeTypes.length + ' champs sélectionnés';
    }
    const allSelected = activeTypes.length === Object.keys(map).length;
    const toggleAllText = document.getElementById('searchTypeToggleAllTextMulti');
    if (toggleAllText) toggleAllText.textContent = allSelected ? 'Désélectionner tout' : 'Sélectionner tout';
    filterInvoicesMulti();
};

// Filter invoices
function filterInvoicesMulti() {
    const typeFilter = document.getElementById('filterTypeMulti')?.value || '';
    const filterStatus = document.getElementById('filterStatusMulti')?.value || 'all';
    const yearFilter = document.getElementById('filterYearMulti')?.value || '';
    const monthFilter = document.getElementById('filterMonthMulti')?.value || '';
    const clientFilter = document.getElementById('filterClientMulti')?.value || '';
    const filterAttachments = document.getElementById('filterAttachmentsMulti')?.value || 'all';
    const filterCreationMethod = document.getElementById('filterCreationMethodMulti')?.value || 'all';
    const arStatusFilterEl = document.getElementById('filterArStatusMulti');
    const arStatusFilter = arStatusFilterEl ? arStatusFilterEl.value : 'all';
    const paymentStatusFilter = document.getElementById('filterPaymentStatusMulti')?.value || '';
    const paymentMethodFilter = document.getElementById('filterPaymentMethodMulti')?.value || '';
    console.log('🔍 [MULTI] AR Filter value:', JSON.stringify(arStatusFilter), 'Type:', typeof arStatusFilter);
    
    // Get selected search types from dropdown checkboxes
    const searchTypes = {
        numero: document.getElementById('searchTypeCheckNumeroMulti')?.dataset.active === 'true',
        order: document.getElementById('searchTypeCheckOrderMulti')?.dataset.active === 'true',
        client: document.getElementById('searchTypeCheckClientMulti')?.dataset.active === 'true',
        ice: document.getElementById('searchTypeCheckIceMulti')?.dataset.active === 'true',
        product: document.getElementById('searchTypeCheckProductMulti')?.dataset.active === 'true',
        price: document.getElementById('searchTypeCheckPriceMulti')?.dataset.active === 'true',
        total_ht: document.getElementById('searchTypeCheckTotalHtMulti')?.dataset.active === 'true',
        total: document.getElementById('searchTypeCheckTotalMulti')?.dataset.active === 'true'
    };
    const hasSearchTypes = Object.values(searchTypes).some(v => v);
    const searchInput = document.getElementById('searchInputMulti')?.value.toLowerCase() || '';

    filteredInvoicesMulti = allInvoicesMulti.filter(invoice => {
        // Status Filter (Seen/Unseen/Modified)
        const isModified = invoice.is_modified === true;

        if (filterStatus === 'unseen') {
            if (invoice.validation_status !== 'pending' || isModified) return false;
        }
        if (filterStatus === 'seen' && invoice.validation_status === 'pending') return false;
        if (filterStatus === 'modified') {
            if (!isModified) return false;
        }

        const matchType = !typeFilter || invoice.document_type === typeFilter;
        const matchYear = !yearFilter || (window.safeParseDate||function(d){return new Date(d)})(invoice.document_date).getFullYear().toString() === yearFilter;
        const matchMonth = !monthFilter || window.safeDateString(invoice.document_date).slice(5, 7) === monthFilter;
        const matchClient = !clientFilter || invoice.client_nom === clientFilter;

        let matchAttachments = true;
        const attachmentFilter = document.getElementById('filterAttachmentsMulti')?.value || 'all';
        if (attachmentFilter === 'with') {
            matchAttachments = (invoice.attachment_count || 0) > 0;
        } else if (attachmentFilter === 'without') {
            matchAttachments = (invoice.attachment_count || 0) === 0;
        }

        let matchCreationMethod = true;
        if (filterCreationMethod === 'normal') {
            matchCreationMethod = !invoice.creation_method || invoice.creation_method === 'normal';
        } else if (filterCreationMethod === 'converted') {
            matchCreationMethod = invoice.creation_method === 'converted';
        }

        // AR Status Match
        let matchAR = true;
        if (arStatusFilter !== 'all') {
            if (invoice.document_type === 'devis') {
                matchAR = false;
            } else {
                const status = (invoice.ar_status === null || invoice.ar_status === undefined || invoice.ar_status === '') ? '' : invoice.ar_status;
                const filterVal = (arStatusFilter === null || arStatusFilter === undefined || arStatusFilter === '') ? '' : arStatusFilter;
                matchAR = status === filterVal;
            }
        }

        let searchMatch = true;
        if (searchInput) {
            const numero = (invoice.document_numero || invoice.document_numero_devis || '').toLowerCase();
            const numeroOrder = (invoice.document_numero_Order || invoice.document_numero_order || '').toLowerCase();
            const client = invoice.client_nom.toLowerCase();
            const ice = (invoice.client_ice || '').toLowerCase();
            const totalTTC = (invoice.total_ttc || 0).toString();
            const totalHT = (invoice.total_ht || 0).toString();

            const hasProductMatch = (invoice.products && invoice.products.length > 0) ?
                invoice.products.some(p => (p.designation || '').toLowerCase().includes(searchInput)) : false;

            const hasPriceMatch = (invoice.products && invoice.products.length > 0) ?
                invoice.products.some(p => (p.prix_unitaire_ht || 0).toString().includes(searchInput)) : false;

            // If no search types selected, search in ALL fields
            if (!hasSearchTypes) {
                searchMatch = numero.includes(searchInput) ||
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

                if (searchTypes.numero && numero.includes(searchInput)) matchFound = true;
                if (searchTypes.order && numeroOrder.includes(searchInput)) matchFound = true;
                if (searchTypes.client && client.includes(searchInput)) matchFound = true;
                if (searchTypes.ice && ice.includes(searchInput)) matchFound = true;
                if (searchTypes.product && hasProductMatch) matchFound = true;
                if (searchTypes.price && hasPriceMatch) matchFound = true;
                if (searchTypes.total_ht && totalHT.includes(searchInput)) matchFound = true;
                if (searchTypes.total && totalTTC.includes(searchInput)) matchFound = true;

                searchMatch = matchFound;
            }
        }

        // Devis Conversion filter
        let matchDevisConversion = true;
        const filterDevisConversion = document.getElementById('filterDevisConversionMulti')?.value || 'all';
        if (filterDevisConversion !== 'all') {
            if (invoice.document_type !== 'devis') {
                matchDevisConversion = false; // Only Devis can be converted
            } else {
                if (filterDevisConversion === 'converted' && !invoice.is_converted) matchDevisConversion = false;
                if (filterDevisConversion === 'not_converted' && invoice.is_converted) matchDevisConversion = false;
            }
        }

        // Featured filter
        let matchFeatured = true;
        const filterFeatured = document.getElementById('filterFeaturedMulti')?.value || 'all';
        if (filterFeatured === 'featured') {
            matchFeatured = invoice.is_featured === 1 || invoice.is_featured === true;
        } else if (filterFeatured === 'not_featured') {
            matchFeatured = !invoice.is_featured || invoice.is_featured === 0;
        }

        // Payment status filter
        let matchPaymentStatus = true;
        if (paymentStatusFilter) {
            if (invoice.document_type !== 'facture') {
                matchPaymentStatus = false;
            } else {
                matchPaymentStatus = (invoice.payment_status || 'en attente de paiement') === paymentStatusFilter;
            }
        }

        // Payment method filter
        let matchPaymentMethod = true;
        if (paymentMethodFilter) {
            if (invoice.document_type !== 'facture') {
                matchPaymentMethod = false;
            } else {
                matchPaymentMethod = (invoice.payment_method || '') === paymentMethodFilter;
            }
        }

        return matchType && matchYear && matchMonth && matchClient && matchAttachments && matchCreationMethod && matchAR && searchMatch && matchDevisConversion && matchFeatured && matchPaymentStatus && matchPaymentMethod;
    });

    displayInvoicesMulti();
}

// Display invoices with pagination
function displayInvoicesMulti() {
    const tableBody = document.getElementById('invoicesTableBodyMulti');
    const emptyState = document.getElementById('emptyStateMulti');
    const resultsCounter = document.getElementById('resultsCounterMulti');
    const resultCount = document.getElementById('resultCountMulti');
    const pagination = document.getElementById('paginationMulti');

    if (!tableBody) return;

    tableBody.innerHTML = '';

    if (filteredInvoicesMulti.length === 0) {
        if (emptyState) emptyState.style.display = 'flex';
        if (resultsCounter) resultsCounter.style.display = 'none';
        if (pagination) pagination.style.display = 'none';
        return;
    }

    if (emptyState) emptyState.style.display = 'none';
    if (resultsCounter) resultsCounter.style.display = 'block';
    if (resultCount) resultCount.textContent = filteredInvoicesMulti.length;

    // Calculate pagination
    const totalItems = filteredInvoicesMulti.length;
    const totalPages = itemsPerPageMulti === 'all' ? 1 : Math.ceil(totalItems / itemsPerPageMulti);

    // Adjust current page if needed
    if (currentPageMulti > totalPages) currentPageMulti = totalPages || 1;

    // Get items for current page
    let itemsToDisplay;
    if (itemsPerPageMulti === 'all') {
        itemsToDisplay = filteredInvoicesMulti;
        if (pagination) pagination.style.display = 'none';
    } else {
        const startIndex = (currentPageMulti - 1) * itemsPerPageMulti;
        const endIndex = startIndex + itemsPerPageMulti;
        itemsToDisplay = filteredInvoicesMulti.slice(startIndex, endIndex);
        if (pagination && totalPages > 1) pagination.style.display = 'block';
        else if (pagination) pagination.style.display = 'none';
    }

    itemsToDisplay.forEach(invoice => {
        const row = document.createElement('tr');

        const docNumber = invoice.document_type === 'facture' ? invoice.document_numero : invoice.document_numero_devis || invoice.document_numero;

        let typeLabel = '';
        let badgeType = invoice.document_type;

        if (invoice.document_type === 'facture') {
            typeLabel = '📄 Facture';
        } else if (invoice.document_type === 'devis') {
            typeLabel = '📋 Devis';
        } else {
            typeLabel = '📦 Bon de Livraison';
        }

        const date = (window.safeParseDate||function(d){return new Date(d)})(invoice.document_date).toLocaleDateString('fr-FR');

        console.log('👤 User info for invoice', invoice.id, ':', {
            created_by_user_name: invoice.created_by_user_name,
            created_by_user_id: invoice.created_by_user_id
        });

        // Show red/yellow indicators - but NOT for invoices created by current user
        const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
        const isUnseen = invoice.validation_status === 'pending' && invoice.created_by_user_id !== currentUser.id;
        const isModified = invoice.is_modified === true;

        let rowClass = invoice.creation_method === 'converted' ? 'row-converted' : '';

        row.style.fontWeight = 'normal';
        row.style.backgroundColor = '';

        if (isModified) {
            row.style.backgroundColor = 'rgba(255, 152, 0, 0.1)';
            row.style.fontWeight = 'bold';
        } else if (isUnseen) {
            rowClass = isUnseen && !rowClass ? 'row-unseen' : rowClass;
            row.style.backgroundColor = 'rgba(244, 67, 54, 0.1)';
            row.style.fontWeight = 'bold';
        }

        row.className = rowClass;

        row.innerHTML = `
            <td>
                <div style="display: flex; align-items: center; gap: 0.4rem;">
                    <input type="checkbox" class="invoice-checkbox-multi" data-invoice-id="${invoice.id}" 
                           style="width: 18px; height: 18px; cursor: pointer;"
                           onchange="updateSelectedCountMulti()">
                    ${isSuperUserMulti ? `<span onclick="event.stopPropagation(); toggleFeaturedMulti(${invoice.id}, this)" 
                          style="cursor: pointer; font-size: 1.2rem; transition: all 0.2s; filter: ${invoice.is_featured ? 'none' : 'grayscale(1) opacity(0.3)'};" 
                          title="${invoice.is_featured ? 'Retirer des importantes' : 'Marquer comme importante'}"
                          data-featured="${invoice.is_featured ? '1' : '0'}">${invoice.is_featured ? '⭐' : '☆'}</span>` : ''}
                </div>
            </td>
            <td><span class="badge badge-${badgeType}" style="${badgeType === 'converted-devis' ? 'background: #e8f5e9; color: #2e7d32; border: 1px solid #a5d6a7;' : ''}">${typeLabel}</span></td>
            <td>
                <strong>${docNumber || 'N/A'}</strong>
                ${(invoice.document_numero_Order || invoice.document_numero_order) ? `<div style="font-size:0.75rem;color:#2196f3;font-weight:500;margin-top:0.25rem;">N° Order: ${invoice.document_numero_Order || invoice.document_numero_order}</div>` : ''}
            </td>
            <td>${invoice.client_nom}</td>
            <td class="col-ice-multi-body" style="${columnVisibilityMulti.ice ? '' : 'display: none;'}">${invoice.client_ice}</td>
            <td>${date}</td>
            <td>
                <div style="display: flex; flex-direction: column; gap: 0.2rem;">
                    <small style="color: #2196f3; font-weight: 600;">👤 Créé par: ${invoice.created_by_user_name || '-'}</small>
                    ${isModified ?
                `<small style="color: #ff9800; font-weight: 600;">📝 Modifié par: ${invoice.updated_by_user_name}</small>` : ''}
                </div>
            </td>
            <td>${Number(invoice.total_ht || 0).toFixed(2)} DH</td>
            <td><strong>${Number(invoice.total_ttc || 0).toFixed(2)} DH</strong></td>
            <td>
                ${invoice.document_type === 'devis' ? '<span style="color:#666;">—</span>' : `<select onchange="this.style.background=this.value==='accuse'?'#4caf50':this.value==='en_attente'?'#ff9800':this.value==='sans_accuse'?'#f44336':this.value==='done'?'#2196f3':'#424242'; window.updateArStatusMulti('${invoice.id}', this.value)"
                        style="padding: 0.4rem; background: ${invoice.ar_status === 'accuse' ? '#4caf50' : (invoice.ar_status === 'en_attente' ? '#ff9800' : (invoice.ar_status === 'sans_accuse' ? '#f44336' : (invoice.ar_status === 'done' ? '#2196f3' : '#424242')))}; color: white; border: none; border-radius: 4px; font-size: 0.85rem; cursor: pointer; width: 100%; transition: background 0.3s;"
                        onclick="event.stopPropagation()">
                    <option value="" ${!invoice.ar_status ? 'selected' : ''} style="background: #424242; color: #fff;"></option>
                    <option value="sans_accuse" ${invoice.ar_status === 'sans_accuse' ? 'selected' : ''} style="background: #f44336; color: #fff;">Sans accusé</option>
                    <option value="en_attente" ${invoice.ar_status === 'en_attente' ? 'selected' : ''} style="background: #424242; color: #ff9800;">En attente</option>
                    <option value="accuse" ${invoice.ar_status === 'accuse' ? 'selected' : ''} style="background: #424242; color: #4caf50;">Accusé</option>
                    <option value="done" ${invoice.ar_status === 'done' ? 'selected' : ''} style="background: #424242; color: #2196f3;">Done</option>
                </select>`}
            </td>
            <td style="text-align: center;">
                ${invoice.document_type === 'facture' ? `<div onclick="event.stopPropagation()" style="text-align:center;">
                    <select onchange="window.handlePaymentChangeMulti('${invoice.id}', this.value, this, '${(invoice.payment_status || '').replace(/'/g, "\\'")}')"
                        style="padding: 0.4rem; background: ${(invoice.payment_status === 'payé') ? '#4caf50' : '#f44336'}; color: white; border: none; border-radius: 4px; font-size: 0.85rem; cursor: pointer; width: 100%; transition: background 0.3s;"
                        onclick="event.stopPropagation()">
                    <option value="en attente de paiement" ${invoice.payment_status !== 'payé' ? 'selected' : ''} style="background: #424242; color: #f44336;">En attente de paiement</option>
                    <option value="payé" ${invoice.payment_status === 'payé' ? 'selected' : ''} style="background: #424242; color: #4caf50;">Payé</option>
                    </select>
                    ${invoice.payment_status === 'payé' && invoice.payment_method ? `<div style="font-size:0.7rem;color:#81c784;margin-top:2px;">${invoice.payment_method}</div>` : ''}
                </div>` : '<span style="color:#666;">—</span>'}
            </td>
            <td style="text-align: center;">
                <div id="attachmentIndicator-${invoice.id}" onclick="viewInvoiceMulti(${invoice.id})" style="cursor: pointer;">
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
                    <button class="btn-icon btn-view" onclick="viewInvoiceMulti(${invoice.id})" title="Voir les détails">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                        </svg>
                    </button>
                    <button class="btn-icon btn-download" onclick="downloadInvoicePDFMulti(${invoice.id})" title="Télécharger PDF">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                        </svg>
                    </button>
                    <button class="btn-icon btn-edit" onclick="editInvoiceMulti(${invoice.id})" title="Modifier">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                        </svg>
                    </button>
                    <button class="btn-icon btn-delete" onclick="deleteInvoiceMulti(${invoice.id})" title="Supprimer">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                        </svg>
                    </button>
                    ${invoice.document_type === 'devis' ? `
                    <button class="btn-icon" onclick="downloadAsOtherCompany(${invoice.id}, 'multi')" title="Télécharger comme autre société" style="background: linear-gradient(135deg, #FF9800, #9C27B0, #4CAF50); color: white;">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                        </svg>
                    </button>
                    ` : ''}
                </div>
            </td>
        `;

        tableBody.appendChild(row);
    });

    // Update pagination
    if (itemsPerPageMulti !== 'all' && totalPages > 1) {
        updatePaginationMulti(totalPages);
    }

    // Setup select all checkbox
    setupSelectAllMulti();
}


// Mark invoice as seen (validated)
window.markAsSeenMulti = async function (id) {
    const currentUserMulti = JSON.parse(localStorage.getItem('user') || '{}');
    const isAdminViewerMulti = currentUserMulti.email === 'redouanerrebbahi99@gmail.com';
    if (!isAdminViewerMulti) {
        window.notify.error('Erreur', 'Action réservée à l\'admin', 3000);
        return;
    }
    try {
        const result = await window.electron.dbMulti.validateInvoice(id, 'validated', currentUserMulti.email || '');
        if (result.success) {
            window.notify.success('Succès', 'Facture marquée comme lue', 3000);

            // Close modal if open
            const modal = document.querySelector('.invoice-view-overlay');
            if (modal) modal.remove();

            // Reload list
            loadInvoicesMulti();

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

// View invoice details
window.viewInvoiceMulti = async function (id) {
    try {
        const currentUserForView = JSON.parse(localStorage.getItem('user') || '{}');
        const result = await window.electron.dbMulti.getInvoiceById(id, currentUserForView.email || '');

        if (!result.success || !result.data) {
            window.notify.error('Erreur', 'Facture introuvable', 3000);
            return;
        }

        const invoice = result.data;
        const date = (window.safeParseDate||function(d){return new Date(d)})(invoice.document_date).toLocaleDateString('fr-FR');
        const docNumber = invoice.document_type === 'facture' ? invoice.document_numero : invoice.document_numero_devis || invoice.document_numero;
        const typeLabel = invoice.document_type === 'facture' ? 'Facture' : 'Devis';

        // Auto-validate if pending or modified - ONLY for Admin users
        const currentUserMulti = JSON.parse(localStorage.getItem('user') || '{}');
        const isAdminViewerMulti = currentUserMulti.email === 'redouanerrebbahi99@gmail.com';
        
        if (isAdminViewerMulti && (invoice.validation_status === 'pending' || invoice.is_modified)) {
            console.log('📝 [AUTO-VALIDATE] Admin viewing - clearing highlights...');
            try {
                await window.electron.dbMulti.validateInvoice(id, 'validated', currentUserMulti.email || '');
                console.log('✅ [AUTO-VALIDATE] Invoice validated & is_modified reset');
                invoice.validation_status = 'validated';
                invoice.is_modified = false;
                const localInv = allInvoicesMulti.find(inv => inv.id === id);
                if (localInv) { localInv.validation_status = 'validated'; localInv.is_modified = false; }
                const filteredInv = filteredInvoicesMulti.find(inv => inv.id === id);
                if (filteredInv) { filteredInv.validation_status = 'validated'; filteredInv.is_modified = false; }
                displayInvoicesMulti();
                if (typeof updatePendingCounts === 'function') {
                    setTimeout(() => updatePendingCounts(), 500);
                }
            } catch (error) {
                console.error('❌ [AUTO-VALIDATE] Error:', error);
            }
        } else if (!isAdminViewerMulti) {
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
                    <h2 style="color:#fff;margin:0;font-size:1.3rem;font-weight:600;">Détails de la ${typeLabel} #${docNumber}</h2>
                </div>
                <div style="display:flex;align-items:center;gap:1rem;flex-wrap:wrap;">
                    ${isSuperUserMulti ? `
                    <button id="toggleFeaturedBtn${id}" onclick="toggleFeaturedInModalMulti(${id}, this)" style="padding:0.6rem 1.2rem;background:${invoice.is_featured ? '#ffa726' : '#666'};color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:0.9rem;font-weight:600;display:flex;align-items:center;gap:0.5rem;transition:all 0.2s;" onmouseover="this.style.opacity='0.9'" onmouseout="this.style.opacity='1'" data-featured="${invoice.is_featured ? '1' : '0'}">
                        <span style="font-size:1.1rem;">${invoice.is_featured ? '⭐' : '☆'}</span>
                        ${invoice.is_featured ? 'Retirer des importantes' : 'Marquer comme importante'}
                    </button>
                    ` : ''}
                    ${invoice.validation_status === 'pending' ? `
                    <button onclick="markAsSeenMulti(${id})" style="padding:0.6rem 1.2rem;background:#4caf50;color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:0.9rem;font-weight:600;display:flex;align-items:center;gap:0.5rem;transition:all 0.2s;box-shadow: 0 4px 6px rgba(0,0,0,0.2);" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                        </svg>
                        Marquer comme lu
                    </button>
                    ` : ''}
                    <button onclick="downloadInvoicePDFMulti(${id})" style="padding:0.6rem 1.2rem;background:#2196F3;color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:0.9rem;font-weight:600;display:flex;align-items:center;gap:0.5rem;transition:all 0.2s;" onmouseover="this.style.background='#1976D2'" onmouseout="this.style.background='#2196F3'">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                        </svg>
                        Télécharger PDF
                    </button>
                    <button onclick="downloadBonDeTravaux(${id})" style="padding:0.6rem 1.2rem;background:#E91E63;color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:0.9rem;font-weight:600;display:flex;align-items:center;gap:0.5rem;transition:all 0.2s;" onmouseover="this.style.background='#C2185B'" onmouseout="this.style.background='#E91E63'">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                        </svg>
                        Télécharger Bon de travaux
                    </button>
                    ${invoice.document_type === 'devis' ? `
                    <button onclick="downloadAsOtherCompany(${id}, 'multi')" style="padding:0.6rem 1.2rem;background:linear-gradient(135deg, #FF9800, #9C27B0, #4CAF50);color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:0.9rem;font-weight:600;display:flex;align-items:center;gap:0.5rem;transition:all 0.2s;" onmouseover="this.style.opacity='0.9'" onmouseout="this.style.opacity='1'">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                        </svg>
                        Autre Société
                    </button>
                    ` : ''}
                    <button id="closeViewModal" style="background:none;border:none;color:#999;cursor:pointer;font-size:1.5rem;padding:0;width:32px;height:32px;display:flex;align-items:center;justify-content:center;border-radius:4px;transition:all 0.2s;margin-left:auto;" onmouseover="this.style.background='#3e3e42';this.style.color='#fff'" onmouseout="this.style.background='none';this.style.color='#999'">×</button>
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
                            <button onclick="showEditPaymentModalMulti(${invoice.id}, '${(invoice.payment_status || 'en attente de paiement').replace(/'/g, "\\'")}', '${(invoice.payment_method || '').replace(/'/g, "\\'")}')" style="padding:0.4rem 1rem;background:#1565c0;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:0.8rem;">Modifier le paiement</button>
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
            const designation = String(p.designation || '').replace(/</g, '&lt;').replace(/>/g, '&gt;');
            return `
                                    <tr style="border-bottom:1px solid #3e3e42;">
                                        <td style="padding:0.75rem;color:#fff;max-width:400px;word-break:break-word;overflow-wrap:break-word;white-space:pre-wrap;">${designation}</td>
                                        <td style="padding:0.75rem;text-align:center;color:#fff;">${p.quantite}</td>
                                        <td style="padding:0.75rem;text-align:right;color:#fff;">${(parseFloat(p.prix_unitaire_ht) || 0).toFixed(2)} DH</td>
                                        <td style="padding:0.75rem;text-align:right;color:#fff;font-weight:500;">${(parseFloat(p.total_ht) || 0).toFixed(2)} DH</td>
                                    </tr>
                                `}).join('')}
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
                            <span style="color:#fff;font-weight:600;">${(parseFloat(invoice.total_ht) || 0).toFixed(2)} DH</span>
                        </div>
                        ${parseFloat(invoice.tva_rate) > 0 ? `
                        <div style="display:flex;justify-content:space-between;margin-bottom:0.75rem;">
                            <span style="color:#999;">TVA (${invoice.tva_rate}%):</span>
                            <span style="color:#fff;font-weight:600;">${(parseFloat(invoice.montant_tva) || 0).toFixed(2)} DH</span>
                        </div>
                        ` : ''}
                        <div style="display:flex;justify-content:space-between;padding-top:0.75rem;border-top:1px solid #3e3e42;">
                            <span style="color:#fff;font-weight:600;">Total TTC:</span>
                            <span style="color:#4CAF50;font-weight:700;font-size:1.1rem;">${(parseFloat(invoice.total_ttc) || 0).toFixed(2)} DH</span>
                        </div>
                    </div>
                </div>

                <!-- Notes Section -->
                <div style="margin-bottom:2rem;" id="notesSectionMulti${id}">
                    <h3 style="color:#fff;font-size:1.1rem;margin:0 0 1rem 0;font-weight:600;">📝 Notes (PDF)</h3>
                    <div style="background:#1e1e1e;padding:1rem;border-radius:8px;">
                        <div style="color:#999;font-size:0.9rem;font-style:italic;">Chargement...</div>
                    </div>
                </div>

                <!-- Private Notes Section (Admin Only) -->
                ${isSuperUserMulti ? `
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
                <div style="margin-bottom:2rem;" id="attachmentsSectionMulti${id}">
                    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1rem;">
                        <h3 style="color:#fff;font-size:1.1rem;margin:0;font-weight:600;">Pièces jointes</h3>
                        <button onclick="addNewAttachmentMulti(${id})" style="padding:0.5rem 1rem;background:#4CAF50;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:0.85rem;font-weight:600;display:flex;align-items:center;gap:0.5rem;transition:all 0.2s;" onmouseover="this.style.background='#45a049'" onmouseout="this.style.background='#4CAF50'">
                            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                            </svg>
                            Ajouter
                        </button>
                    </div>
                    ${invoice.attachments && invoice.attachments.length > 0 ? `
                        <div style="display:grid;gap:0.75rem;">
                            ${invoice.attachments.map(a => `
                                <div style="background:#1e1e1e;padding:1rem;border-radius:8px;display:flex;align-items:center;justify-content:space-between;">
                                    <div style="display:flex;align-items:center;gap:1rem;flex:1;min-width:0;">
                                        <div style="width:40px;height:40px;background:#2d2d30;border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                                            ${a.file_type.includes('pdf') ?
                    '<svg width="20" height="20" viewBox="0 0 16 16" fill="#f44336"><path d="M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5L14 4.5z"/><path d="M1.6 11.85H0v3.999h.791v-1.342h.803c.287 0 .531-.057.732-.173.203-.117.358-.275.463-.474a1.42 1.42 0 0 0 .161-.677c0-.25-.053-.476-.158-.677a1.176 1.176 0 0 0-.46-.477c-.2-.12-.443-.179-.732-.179Zm.545 1.333a.795.795 0 0 1-.085.38.574.574 0 0 1-.238.241.794.794 0 0 1-.375.082H.788V12.48h.66c.218 0 .389.06.512.181.123.122.185.296.185.522Zm1.217-1.333v3.999h1.46c.401 0 .734-.08.998-.237a1.45 1.45 0 0 0 .595-.689c.13-.3.196-.662.196-1.084 0-.42-.065-.778-.196-1.075a1.426 1.426 0 0 0-.589-.68c-.264-.156-.599-.234-1.005-.234H3.362Zm.791.645h.563c.248 0 .45.05.609.152a.89.89 0 0 1 .354.454c.079.201.118.452.118.753a2.3 2.3 0 0 1-.068.592 1.14 1.14 0 0 1-.196.422.8.8 0 0 1-.334.252 1.298 1.298 0 0 1-.483.082h-.563v-2.707Zm3.743 1.763v1.591h-.79V11.85h2.548v.653H7.896v1.117h1.606v.638H7.896Z"/></svg>' :
                    '<svg width="20" height="20" viewBox="0 0 16 16" fill="#2196F3"><path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/><path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z"/></svg>'
                }
                                        </div>
                                        <div style="flex:1;min-width:0;">
                                            <div style="color:#fff;font-weight:500;font-size:0.9rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${a.filename}</div>
                                            <div style="color:#999;font-size:0.8rem;margin-top:0.25rem;">${new Date(a.uploaded_at).toLocaleDateString('fr-FR')}</div>
                                        </div>
                                    </div>
                                    <div style="display:flex;gap:0.5rem;flex-shrink:0;">
                                        <button onclick="openAttachmentMulti(${a.id})" style="padding:0.4rem 0.8rem;background:#2196F3;color:#fff;border:none;border-radius:4px;cursor:pointer;font-size:0.8rem;">
                                            👁️ Ouvrir
                                        </button>
                                        <button onclick="deleteAttachmentMulti(${a.id}, ${id})" style="padding:0.4rem 0.8rem;background:#f44336;color:#fff;border:none;border-radius:4px;cursor:pointer;font-size:0.8rem;display:flex;align-items:center;gap:0.4rem;">
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
                <div id="auditLogSectionMulti${id}">
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
        const _refreshAfterViewMulti = () => {
            const localInv = allInvoicesMulti.find(inv => inv.id === id);
            if (localInv) {
                localInv.validation_status = 'validated';
                localInv.is_modified = false;
            }
            const filteredInv = filteredInvoicesMulti.find(inv => inv.id === id);
            if (filteredInv) {
                filteredInv.validation_status = 'validated';
                filteredInv.is_modified = false;
            }
            displayInvoicesMulti();
            if (typeof updatePendingCounts === 'function') {
                setTimeout(() => updatePendingCounts(), 300);
            }
        };

        document.getElementById('closeViewModal').onclick = () => { overlay.remove(); _refreshAfterViewMulti(); };
        overlay.onclick = (e) => {
            if (e.target === overlay) { overlay.remove(); _refreshAfterViewMulti(); }
        };

        // Load notes asynchronously
        console.log('📝 [NOTES VIEW MULTI] Loading notes for invoice:', id);
        const noteResult = await window.electron.dbMulti.getNote(id);
        console.log('📥 [NOTES VIEW MULTI] Note result:', noteResult);
        const notesSection = document.getElementById(`notesSectionMulti${id}`);
        if (notesSection) {
            const notesContent = notesSection.querySelector('div > div');
            if (noteResult.success && noteResult.data) {
                console.log('✅ [NOTES VIEW MULTI] Displaying note:', noteResult.data);
                notesContent.style.color = '#fff';
                notesContent.style.fontStyle = 'normal';
                notesContent.style.whiteSpace = 'pre-wrap';
                notesContent.textContent = noteResult.data;
            } else {
                console.log('ℹ️ [NOTES VIEW MULTI] No note found');
                notesContent.textContent = 'Aucune note';
            }
        }

        // Load audit log asynchronously
        console.log('📋 [AUDIT LOG MULTI] Loading audit log for invoice:', id);
        const auditLogSection = document.getElementById(`auditLogSectionMulti${id}`);
        if (auditLogSection) {
            const auditLogContent = auditLogSection.querySelector('div > div');
            try {
                // Check if function exists
                if (!window.electron.dbMulti.getAuditLog) {
                    console.error('❌ [AUDIT LOG MULTI] getAuditLog function not found');
                    throw new Error('getAuditLog function not available');
                }

                const auditResult = await window.electron.dbMulti.getAuditLog(id);
                console.log('📥 [AUDIT LOG MULTI] Audit log result:', auditResult);

                if (auditResult.success && auditResult.data && auditResult.data.length > 0) {
                    const logs = auditResult.data;
                    console.log('✅ [AUDIT LOG MULTI] Displaying audit logs:', logs);

                    let auditHTML = '<div style="max-height: 400px; overflow-y: auto;">';

                    // Add creation info first
                    if (invoice.created_by_user_name) {
                        const createdDate = (window.safeParseDate||function(d){return new Date(d)})(invoice.created_at).toLocaleDateString('fr-FR');
                        auditHTML += `
            <div style="padding:0.75rem;background:#252526;border-radius:6px;margin-bottom:0.5rem;border-left:4px solid #4CAF50;">
                <div style="display:flex;justify-content:space-between;align-items:start;">
                    <div>
                        <div style="color:#4CAF50;font-weight:600;font-size:0.9rem;">➕ Création</div>
                        <div style="color:#fff;margin-top:0.25rem;">Par: <strong>${invoice.created_by_user_name}</strong></div>
                        ${invoice.created_by_user_email ? `<div style="color:#999;font-size:0.85rem;">${invoice.created_by_user_email}</div>` : ''}
                    </div>
                    <div style="color:#999;font-size:0.85rem;white-space:nowrap;">${createdDate}</div>
                </div>
                            </div>
            `;
                    }

                    // Add modification logs
                    logs.forEach(log => {
                        const logDate = (window.safeParseDate||function(d){return new Date(d)})(log.created_at).toLocaleDateString('fr-FR');
                        auditHTML += `
            <div style="padding:0.75rem;background:#252526;border-radius:6px;margin-bottom:0.5rem;border-left:4px solid #2196F3;">
                <div style="display:flex;justify-content:space-between;align-items:start;">
                    <div>
                        <div style="color:#2196F3;font-weight:600;font-size:0.9rem;">✏️ Mis à jour</div>
                        <div style="color:#fff;margin-top:0.25rem;">Par: <strong>${log.user_name}</strong></div>
                        ${log.user_email ? `<div style="color:#999;font-size:0.85rem;">${log.user_email}</div>` : ''}
                    </div>
                    <div style="color:#999;font-size:0.85rem;white-space:nowrap;">${logDate}</div>
                </div>
                            </div>
            `;
                    });

                    auditHTML += '</div>';
                    auditLogContent.innerHTML = auditHTML;
                    auditLogContent.style.color = '#fff';
                    auditLogContent.style.fontStyle = 'normal';
                } else {
                    console.log('ℹ️ [AUDIT LOG MULTI] No audit logs found');
                    const createdDate = (window.safeParseDate||function(d){return new Date(d)})(invoice.created_at).toLocaleDateString('fr-FR');
                    auditLogContent.innerHTML = `
            <div style="padding:0.75rem;background:#252526;border-radius:6px;border-left:4px solid #4CAF50;">
                <div style="display:flex;justify-content:space-between;align-items:start;">
                    <div>
                        <div style="color:#4CAF50;font-weight:600;font-size:0.9rem;">➕ Création</div>
                        <div style="color:#fff;margin-top:0.25rem;">Par: <strong>${invoice.created_by_user_name || 'Utilisateur inconnu'}</strong></div>
                        ${invoice.created_by_user_email ? `<div style="color:#999;font-size:0.85rem;">${invoice.created_by_user_email}</div>` : ''}
                    </div>
                    <div style="color:#999;font-size:0.85rem;white-space:nowrap;">${createdDate}</div>
                </div>
                        </div>
            `;
                }
            } catch (error) {
                console.error('❌ [AUDIT LOG MULTI] Error loading audit log:', error);
                auditLogContent.innerHTML = '<div style="color:#f44336;">Erreur lors du chargement de l\'historique</div>';
            }
        }

    } catch (error) {
        console.error('[MULTI] Error viewing invoice:', error);
        window.notify.error('Erreur', 'Impossible d\'afficher la facture', 3000);
    }
}

// Delete invoice
window.deleteInvoiceMulti = async function (id) {
    const confirmed = await customConfirm('Confirmation', 'Êtes-vous sûr de vouloir supprimer cette facture ?', 'warning');

    if (!confirmed) return;

    try {
        const result = await window.electron.dbMulti.deleteInvoice(id);

        if (result.success) {
            window.notify.success('Succès', 'Facture supprimée avec succès', 3000);
            loadInvoicesMulti();
        } else {
            window.notify.error('Erreur', 'Impossible de supprimer la facture', 3000);
        }
    } catch (error) {
        console.error('[MULTI] Error deleting invoice:', error);
        window.notify.error('Erreur', 'Une erreur est survenue', 3000);
    }
}

// Edit invoice
window.editInvoiceMulti = async function (id) {
    // Clear highlights immediately (validate + reset is_modified)
    try {
        const currentUserMulti = JSON.parse(localStorage.getItem('user') || '{}');
        const isAdminViewerMulti = currentUserMulti.email === 'redouanerrebbahi99@gmail.com';
        if (isAdminViewerMulti) {
            await window.electron.dbMulti.validateInvoice(id, 'validated', currentUserMulti.email || '');
            const localInv = allInvoicesMulti.find(inv => inv.id === id);
            if (localInv) { localInv.validation_status = 'validated'; localInv.is_modified = false; }
            const filteredInv = filteredInvoicesMulti.find(inv => inv.id === id);
            if (filteredInv) { filteredInv.validation_status = 'validated'; filteredInv.is_modified = false; }
            displayInvoicesMulti();
            if (typeof updatePendingCounts === 'function') setTimeout(() => updatePendingCounts(), 300);
        }
    } catch (e) { console.error('❌ [EDIT MULTI] Error clearing highlights:', e); }
    localStorage.setItem('editInvoiceIdMulti', id);
    router.navigate('/edit-invoice-multi');
}

// Open attachment
window.openAttachmentMulti = async function (attachmentId) {
    try {
        const result = await window.electron.dbMulti.getAttachment(attachmentId);

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
                // Fallback for non-migrated BLOBs
                const blob = new Blob([attachment.file_data], { type: attachment.file_type });
                const url = URL.createObjectURL(blob);
                window.open(url, '_blank');
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
window.deleteAttachmentMulti = async function (attachmentId, invoiceId) {
    const confirmed = await customConfirm('Confirmation', 'Êtes-vous sûr de vouloir supprimer ce fichier ?', 'warning');
    if (!confirmed) {
        return;
    }

    try {
        // Get attachment to find path
        const attResult = await window.electron.dbMulti.getAttachment(attachmentId);
        const att = (attResult.success && attResult.data) ? attResult.data : null;
        const pathToDelete = att && att.file_path && !att.file_path.startsWith('http') ? att.file_path : null;

        const result = await window.electron.dbMulti.deleteAttachment(attachmentId);

        if (result.success) {
            // Delete local file only if it's a local path (not an online URL)
            if (pathToDelete) {
                await window.electron.attachments.delete(pathToDelete);
            }
            window.notify.success('Supprimé', 'Fichier supprimé avec succès', 3000);

            // Refresh specifically the attachments section
            refreshAttachmentsMulti(invoiceId);
            // Refresh main table in background
            loadInvoicesMulti();
        } else {
            throw new Error(result.error);
        }
    } catch (error) {
        console.error('Error deleting attachment:', error);
        window.notify.error('Erreur', 'Impossible de supprimer le fichier', 3000);
    }
}

// Add new attachment
window.addNewAttachmentMulti = async function (invoiceId) {
    // Create file input
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.png,.jpg,.jpeg,.pdf';
    input.multiple = true;

    input.onchange = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        const loadingNotif = window.notify.loading('Téléchargement en cours...', 'Veuillez patienter');

        try {
            for (const file of files) {
                // Read file as ArrayBuffer
                const arrayBuffer = await file.arrayBuffer();
                const uint8Array = new Uint8Array(arrayBuffer);

                // 1. Upload to server
                const uploadResult = await window.electron.attachments.uploadToServer({
                    company: 'MULTI',
                    filename: file.name,
                    data: uint8Array,
                    mimeType: file.type
                });

                if (!uploadResult.success) throw new Error(uploadResult.error);

                // 2. Add to database with online URL
                const result = await window.electron.dbMulti.addAttachment(
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
                    throw new Error(result.error);
                }
            }

            window.notify.remove(loadingNotif);
            window.notify.success('Succès', `${files.length} fichier(s) ajouté(s)`, 3000);

            // Fetch updated invoice data from database to get correct attachment_count
            const updatedResult = await window.electron.dbMulti.getInvoiceById(invoiceId);
            if (updatedResult.success && updatedResult.data) {
                const correctCount = updatedResult.data.attachment_count || 0;
                
                // Update local state with correct count from database
                const inv = allInvoicesMulti.find(i => i.id == invoiceId);
                if (inv) {
                    inv.attachment_count = correctCount;
                }
                const filteredInv = filteredInvoicesMulti.find(i => i.id == invoiceId);
                if (filteredInv) {
                    filteredInv.attachment_count = correctCount;
                }
            }

            // Refresh specifically the attachments section in modal
            refreshAttachmentsMulti(invoiceId);
            
            // Re-render the display with updated data (no full reload needed)
            displayInvoicesMulti();

        } catch (error) {
            window.notify.remove(loadingNotif);
            console.error('Error uploading attachments:', error);
            window.notify.error('Erreur', 'Erreur lors du téléchargement: ' + error.message, 4000);
        }
    };

    input.click();
}

// Helper to refresh attachments in the modal without closing it
async function refreshAttachmentsMulti(invoiceId) {
    const attachmentsSection = document.getElementById(`attachmentsSectionMulti${invoiceId}`);
    if (!attachmentsSection) return;

    try {
        const result = await window.electron.dbMulti.getInvoiceById(invoiceId);
        if (result.success && result.data) {
            const invoice = result.data;
            let attachmentsHTML = `
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1rem;">
                    <h3 style="color:#fff;font-size:1.1rem;margin:0;font-weight:600;">Pièces jointes</h3>
                    <button onclick="addNewAttachmentMulti(${invoiceId})" style="padding:0.5rem 1rem;background:#4CAF50;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:0.85rem;font-weight:600;display:flex;align-items:center;gap:0.5rem;transition:all 0.2s;" onmouseover="this.style.background='#45a049'" onmouseout="this.style.background='#4CAF50'">
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                        </svg>
                        Ajouter
                    </button>
                </div>
            `;

            if (invoice.attachments && invoice.attachments.length > 0) {
                attachmentsHTML += `
                    <div style="display:grid;gap:0.75rem;">
                        ${invoice.attachments.map(a => `
                            <div style="background:#1e1e1e;padding:1rem;border-radius:8px;display:flex;align-items:center;justify-content:space-between;">
                                <div style="display:flex;align-items:center;gap:1rem;flex:1;min-width:0;">
                                    <div style="width:40px;height:40px;background:#2d2d30;border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                                        ${a.file_type.includes('pdf') ?
                        '<svg width="20" height="20" viewBox="0 0 16 16" fill="#f44336"><path d="M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5L14 4.5z"/><path d="M1.6 11.85H0v3.999h.791v-1.342h.803c.287 0 .531-.057.732-.173.203-.117.358-.275.463-.474a1.42 1.42 0 0 0 .161-.677c0-.25-.053-.476-.158-.677a1.176 1.176 0 0 0-.46-.477c-.2-.12-.443-.179-.732-.179Zm.545 1.333a.795.795 0 0 1-.085.38.574.574 0 0 1-.238.241.794.794 0 0 1-.375.082H.788V12.48h.66c.218 0 .389.06.512.181.123.122.185.296.185.522Zm1.217-1.333v3.999h1.46c.401 0 .734-.08.998-.237a1.45 1.45 0 0 0 .595-.689c.13-.3.196-.662.196-1.084 0-.42-.065-.778-.196-1.075a1.426 1.426 0 0 0-.589-.68c-.264-.156-.599-.234-1.005-.234H3.362Zm.791.645h.563c.248 0 .45.05.609.152a.89.89 0 0 1 .354.454c.079.201.118.452.118.753a2.3 2.3 0 0 1-.068.592 1.14 1.14 0 0 1-.196.422.8.8 0 0 1-.334.252 1.298 1.298 0 0 1-.483.082h-.563v-2.707Zm3.743 1.763v1.591h-.79V11.85h2.548v.653H7.896v1.117h1.606v.638H7.896Z"/></svg>' :
                        '<svg width="20" height="20" viewBox="0 0 16 16" fill="#2196F3"><path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/><path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z"/></svg>'
                    }
                                    </div>
                                    <div style="flex:1;min-width:0;">
                                        <div style="color:#fff;font-weight:500;font-size:0.9rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${a.filename}</div>
                                        <div style="color:#999;font-size:0.8rem;margin-top:0.25rem;">${(a.file_size / 1024).toFixed(1)} KB • ${new Date(a.uploaded_at).toLocaleDateString('fr-FR')}</div>
                                    </div>
                                </div>
                                <div style="display:flex;gap:0.5rem;flex-shrink:0;">
                                    <button onclick="openAttachmentMulti(${a.id})" style="padding:0.4rem 0.8rem;background:#2196F3;color:#fff;border:none;border-radius:4px;cursor:pointer;font-size:0.8rem;">
                                        👁️ Ouvrir
                                    </button>
                                    <button onclick="deleteAttachmentMulti(${a.id}, ${invoiceId})" style="padding:0.4rem 0.8rem;background:#f44336;color:#fff;border:none;border-radius:4px;cursor:pointer;font-size:0.8rem;display:flex;align-items:center;gap:0.4rem;">
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

// Load Multi signature image for PDF - direct load without compression
async function loadMultiSignature() {
    try {
        const response = await fetch('Signature/Multi.png');
        if (!response.ok) throw new Error('Failed to fetch');
        const blob = await response.blob();
        return await new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = () => resolve(null);
            reader.readAsDataURL(blob);
        });
    } catch (e) {
        console.warn('Could not load Multi signature image:', e);
        return null;
    }
}

// Load Multi logo image for PDF
async function loadMultiLogo() {
    try {
        const response = await fetch('assets/logos/multi.png');
        if (!response.ok) throw new Error('Failed to fetch');
        const blob = await response.blob();
        return await new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = () => resolve(null);
            reader.readAsDataURL(blob);
        });
    } catch (e) {
        console.warn('Could not load Multi logo image:', e);
        return null;
    }
}

// Help functionality for Multi Bon de travaux customization
async function showMultiBonDeTravauxCustomizationModal(invoice) {
    return new Promise((resolve) => {
        const overlay = document.createElement('div');
        overlay.className = 'custom-modal-overlay';

        const hasZeroProducts = invoice.products && invoice.products.some(p =>
            parseFloat(p.quantite) === 0 || parseFloat(p.prix_unitaire_ht) === 0
        );

        overlay.innerHTML = `
            <div class="custom-modal" style="max-width: 500px;">
                <div class="custom-modal-header">
                    <span class="custom-modal-icon warning">🛠️</span>
                    <h3 class="custom-modal-title">Paramètres du Bon de travaux</h3>
                </div>
                <div class="custom-modal-body">
                    <!-- Font Size Selection -->
                    <div style="margin-bottom: 1.5rem;">
                        <label style="display: block; margin-bottom: 0.8rem; color: #e0e0e0; font-weight: 600;">
                            Taille de police des Notes :
                        </label>
                        <div style="display: flex; gap: 0.5rem; background: #1e1e1e; padding: 0.5rem; border-radius: 8px; border: 1px solid #3e3e42;">
                            <label style="flex: 1; display: flex; flex-direction: column; align-items: center; cursor: pointer; padding: 0.5rem; border-radius: 6px; transition: all 0.2s;">
                                <input type="radio" name="multiBTNotesFontSize" value="small" style="margin-bottom: 0.4rem; cursor: pointer;">
                                <span style="font-size: 0.75rem; color: #999;">Petit</span>
                            </label>
                            <label style="flex: 1; display: flex; flex-direction: column; align-items: center; cursor: pointer; padding: 0.5rem; border-radius: 6px; transition: all 0.2s; background: #2d2d30;">
                                <input type="radio" name="multiBTNotesFontSize" value="medium" checked style="margin-bottom: 0.4rem; cursor: pointer;">
                                <span style="font-size: 0.85rem; color: #fff;">Moyen</span>
                            </label>
                            <label style="flex: 1; display: flex; flex-direction: column; align-items: center; cursor: pointer; padding: 0.5rem; border-radius: 6px; transition: all 0.2s;">
                                <input type="radio" name="multiBTNotesFontSize" value="large" style="margin-bottom: 0.4rem; cursor: pointer;">
                                <span style="font-size: 0.95rem; color: #999;">Grand</span>
                            </label>
                            <label style="flex: 1; display: flex; flex-direction: column; align-items: center; cursor: pointer; padding: 0.5rem; border-radius: 6px; transition: all 0.2s;">
                                <input type="radio" name="multiBTNotesFontSize" value="xlarge" style="margin-bottom: 0.4rem; cursor: pointer;">
                                <span style="font-size: 1.05rem; color: #999;">Très G.</span>
                            </label>
                        </div>
                    </div>

                    ${hasZeroProducts ? `
                        <div style="margin-bottom: 1.25rem;">
                            <label style="display:flex;align-items:center;cursor:pointer;padding:0.75rem;background:#1e1e1e;border:1px solid #3e3e42;border-radius:8px;">
                                <input type="checkbox" id="multiBTIncludeZero" checked style="width:18px;height:18px;margin-right:0.75rem;cursor:pointer;accent-color:#ff9800;">
                                <span style="font-size:0.9rem;color:#e0e0e0;">Inclure les produits à quantité/prix zéro</span>
                            </label>
                        </div>
                    ` : ''}
                </div>
                <div class="custom-modal-footer">
                    <button class="custom-modal-btn secondary" id="multiBTCancelBtn">Annuler</button>
                    <button class="custom-modal-btn primary" id="multiBTGenerateBtn">Générer Bon de travaux</button>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);

        const cancelBtn = overlay.querySelector('#multiBTCancelBtn');
        const generateBtn = overlay.querySelector('#multiBTGenerateBtn');

        cancelBtn.onclick = () => {
            overlay.remove();
            resolve(null);
        };

        generateBtn.onclick = () => {
            const notesFontSize = overlay.querySelector('input[name="multiBTNotesFontSize"]:checked').value;
            const includeZeroProducts = hasZeroProducts ? overlay.querySelector('#multiBTIncludeZero').checked : true;
            overlay.remove();
            resolve({ notesFontSize, includeZeroProducts });
        };

        overlay.onclick = (e) => {
            if (e.target === overlay) {
                overlay.remove();
                resolve(null);
            }
        };
    });
}

// Download Bon de travaux as PDF (without prices) - MULTI TRAVAUX TETOUAN Design
window.downloadBonDeTravaux = async function (invoiceId) {
    try {
        console.log('📥 Generating Bon de travaux PDF for invoice:', invoiceId);

        // Get invoice data
        const result = await window.electron.dbMulti.getInvoiceById(invoiceId);

        if (!result.success || !result.data) {
            throw new Error('Document introuvable');
        }

        const invoice = result.data;

        // Show consolidated customization modal
        const customParams = await showMultiBonDeTravauxCustomizationModal(invoice);
        if (!customParams) {
            console.log('❌ User cancelled Bon de travaux generation');
            return;
        }

        const includeZeroProducts = customParams.includeZeroProducts;
        const notesFontSize = customParams.notesFontSize;

        console.log('⚙️ Bon de travaux Custom Parameters:', customParams);

        // Mark products with zero values for special display (don't remove them)
        const showZeroValues = includeZeroProducts;
        console.log('📊 Show zero values in Bon de travaux:', showZeroValues);

        // Check if jsPDF is loaded
        if (typeof window.jspdf === 'undefined') {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
            script.onload = () => window.downloadBonDeTravaux(invoiceId);
            document.head.appendChild(script);
            return;
        }

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        // Load signature and logo images
        const signatureImgMulti = await loadMultiSignature();
        const logoImgMulti = await loadMultiLogo();

        // Load editable PDF text
        const pdfText = await window.loadCompanyPdfText('MULTI');

        // Colors - MULTI TRAVAUX TETOUAN theme
        const darkGrayColor = [96, 125, 139]; // #607D8B
        const lightGrayBg = [236, 239, 241]; // #ECEFF1

        const dateStr = (window.safeParseDate||function(d){return new Date(d)})(invoice.document_date).toLocaleDateString('fr-FR');
        
        // Get Order number if exists
        const orderNumber = invoice.document_numero_Order || invoice.document_numero_order || '';

        // Function to add header
        const addHeader = (isFirstPage = true) => {
            // Add company logo - Left side (same method as invoice PDF)
            try {
                const logoImg = document.querySelector('img[src*="multi.png"]') ||
                    document.querySelector('img[alt="Multi Company"]');
                if (logoImg && logoImg.src && logoImg.complete) {
                    // Image is already loaded
                    const canvas = document.createElement('canvas');
                    canvas.width = logoImg.naturalWidth || 200;
                    canvas.height = logoImg.naturalHeight || 200;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(logoImg, 0, 0);
                    const imgData = canvas.toDataURL('image/png');
                    doc.addImage(imgData, 'PNG', 15, 8, 20, 20);
                }
            } catch (error) {
                console.log('Logo not available:', error.message);
            }

            // Company Name - Left aligned, large (moved right to make space for logo)
            doc.setFontSize(18);
            doc.setTextColor(96, 125, 139);
            doc.setFont(undefined, 'bold');
            doc.text(pdfText.company_name || 'MULTI TRAVAUX TETOUAN', 40, 22);

            // Document Type - Right aligned, underlined
            doc.setFontSize(18);
            doc.setFont(undefined, 'bold');
            doc.text('BON DE TRAVAUX', 195, 18, { align: 'right' });
            doc.setLineWidth(0.5);
            doc.line(195 - doc.getTextWidth('BON DE TRAVAUX'), 19, 195, 19);

            // N° Order - Right side
            doc.setFontSize(9);
            doc.setFont(undefined, 'normal');
            doc.setTextColor(0, 0, 0);
            if (orderNumber && orderNumber.trim() !== '') {
                doc.text(`N° Order: ${orderNumber}`, 195, 26, { align: 'right' });
                doc.text(`Date: ${dateStr}`, 195, 31, { align: 'right' });
            } else {
                doc.text(`Date: ${dateStr}`, 195, 26, { align: 'right' });
            }

            // Email and Address - Left side with gray background
            doc.setFillColor(...darkGrayColor);
            doc.rect(15, 38, 80, 6, 'F');
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(8);
            doc.text('Email: ' + (pdfText.header_email || 'errbahiabderrahim@gmail.com'), 17, 42);

            doc.setFillColor(...lightGrayBg);
            doc.rect(15, 44, 80, 6, 'F');
            doc.setTextColor(0, 0, 0);
            doc.setFontSize(7);
            doc.text(pdfText.header_address || 'AV 10 MAI IMM 04 APPART 01 A DROIT - TETOUAN , TETOUAN', 17, 48);

            // Client Info - Right side with gray background (dynamic height for wrapping)
            doc.setFontSize(8);
            const fullClientText = `BON DE TRAVAUX à: ${invoice.client_nom}`;
            
            // Wrap text (max width ~76mm to fit in 80mm box with padding)
            const clientLines = doc.splitTextToSize(fullClientText, 76);
            
            // Calculate box height dynamically (base 6mm + 4mm for each extra line)
            const extraLineHeight = 4;
            const clientBoxHeight = 6 + (clientLines.length - 1) * extraLineHeight;
            
            doc.setFillColor(...darkGrayColor);
            doc.rect(115, 38, 80, clientBoxHeight, 'F');
            doc.setTextColor(255, 255, 255);
            doc.text(clientLines, 117, 42);

            // ICE Box - Position depends on client box height
            const iceStartY = 38 + clientBoxHeight;

            // Only show ICE if it exists and is not "0"
            if (invoice.client_ice && invoice.client_ice !== '0') {
                doc.setFillColor(...lightGrayBg);
                doc.rect(115, iceStartY, 80, 6, 'F');
                doc.setTextColor(0, 0, 0);
                doc.setFontSize(7);
                doc.text(`ICE: ${invoice.client_ice}`, 117, iceStartY + 4);
            }
        };

        // Function to add footer
        const addFooter = (pageNum, totalPages) => {


            // Company info at bottom
            doc.setTextColor(0, 0, 0);
            doc.setFontSize(9);
            doc.setFont(undefined, 'normal');
            doc.text(pdfText.footer_line1 || 'NIF 68717422 | TP 51001343 | RC 38633 | CNSS 6446237', 105, 275, { align: 'center' });
            doc.text(pdfText.footer_line2 || 'ICE : 003809505000031', 105, 279, { align: 'center' });

            // Add page numbering at bottom in gray
            doc.setTextColor(100, 100, 100);
            doc.setFontSize(8);
            doc.setFont(undefined, 'normal');
            doc.text(`Page ${pageNum} / ${totalPages}`, 105, 287, { align: 'center' });
        };

        // Add header to first page
        addHeader(true);

        const startY = 65;

        // Helper function to format numbers
        const formatNumberForPDF = (num) => {
            return parseFloat(num).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
        };

        // Table Layout - Same as normal invoice
        const TABLE_X = 15;
        const TABLE_WIDTH = 180;

        const COL_1_WIDTH = TABLE_WIDTH * 0.55;
        const COL_2_WIDTH = TABLE_WIDTH * 0.15;
        const COL_3_WIDTH = TABLE_WIDTH * 0.15;
        const COL_4_WIDTH = TABLE_WIDTH * 0.15;

        // X Positions (Start of each column)
        const POS_DESC = TABLE_X + 2;
        const POS_QTY = TABLE_X + COL_1_WIDTH + COL_2_WIDTH / 2;
        const POS_PU = TABLE_X + COL_1_WIDTH + COL_2_WIDTH + 2;
        const POS_TOTAL = TABLE_X + COL_1_WIDTH + COL_2_WIDTH + COL_3_WIDTH + 2;

        const DESC_MAX_WIDTH = COL_1_WIDTH - 4;

        // Table Header - Gray background
        doc.setFillColor(...darkGrayColor);
        doc.rect(TABLE_X, startY, TABLE_WIDTH, 7, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(9);
        doc.setFont(undefined, 'bold');

        // Headers
        doc.text('Description', POS_DESC, startY + 5);
        doc.text('Quantité', POS_QTY, startY + 5, { align: 'center' });
        doc.text('Prix unitaire HT', POS_PU, startY + 5);
        doc.text('Prix total HT', POS_TOTAL, startY + 5);

        // Table Body
        let currentY = startY + 7;
        doc.setTextColor(0, 0, 0);
        doc.setFont(undefined, 'normal');
        doc.setFontSize(7.5);

        let pageCount = 1;
        const pages = [];

        invoice.products.forEach((product, index) => {
            const designation = product.designation || '';
            const lines = doc.splitTextToSize(designation, DESC_MAX_WIDTH);
            const rowHeight = Math.max(8, (lines.length * 4.5) + 4);

            // Check if we need a new page
            if (currentY + rowHeight > 220) {
                pages.push(pageCount);
                doc.addPage();
                addHeader(false);
                pageCount++;

                let newStartY = 65;
                doc.setFillColor(...darkGrayColor);
                doc.rect(TABLE_X, newStartY, TABLE_WIDTH, 7, 'F');
                doc.setTextColor(255, 255, 255);
                doc.setFontSize(9);
                doc.setFont(undefined, 'bold');
                doc.text('Description', POS_DESC, newStartY + 5);
                doc.text('Quantité', POS_QTY, newStartY + 5, { align: 'center' });
                doc.text('Prix unitaire HT', POS_PU, newStartY + 5);
                doc.text('Prix total HT', POS_TOTAL, newStartY + 5);

                currentY = newStartY + 7;
                doc.setTextColor(0, 0, 0);
                doc.setFont(undefined, 'normal');
                doc.setFontSize(7.5);
            }

            // Row border and Alternate row colors
            doc.setDrawColor(200, 200, 200);
            doc.setLineWidth(0.1);
            doc.rect(TABLE_X, currentY, TABLE_WIDTH, rowHeight);

            if (index % 2 === 0) {
                doc.setFillColor(245, 245, 245);
                doc.rect(TABLE_X, currentY, TABLE_WIDTH, rowHeight, 'F');
                doc.rect(TABLE_X, currentY, TABLE_WIDTH, rowHeight);
            }

            // Vertical Column Lines
            doc.line(TABLE_X + COL_1_WIDTH, currentY, TABLE_X + COL_1_WIDTH, currentY + rowHeight);
            doc.line(TABLE_X + COL_1_WIDTH + COL_2_WIDTH, currentY, TABLE_X + COL_1_WIDTH + COL_2_WIDTH, currentY + rowHeight);
            doc.line(TABLE_X + COL_1_WIDTH + COL_2_WIDTH + COL_3_WIDTH, currentY, TABLE_X + COL_1_WIDTH + COL_2_WIDTH + COL_3_WIDTH, currentY + rowHeight);

            // Draw Description Lines
            lines.forEach((line, lineIndex) => {
                doc.text(line, POS_DESC, currentY + 5 + (lineIndex * 4.5));
            });

            const centerOffset = (lines.length > 1) ? ((lines.length - 1) * 2.25) : 0;

            // Show quantity only if it's not zero OR if user chose to show zero values
            const qty = parseFloat(product.quantite);
            if (showZeroValues || qty !== 0) {
                doc.text(String(product.quantite || '0'), POS_QTY, currentY + 5 + centerOffset, { align: 'center' });
            }

            // Show price only if it's not zero OR if user chose to show zero values
            const price = parseFloat(product.prix_unitaire_ht);
            if (showZeroValues || price !== 0) {
                doc.text(`${formatNumberForPDF(product.prix_unitaire_ht)} DH`, POS_PU, currentY + 5 + centerOffset);
            }

            // Show total only if it's not zero OR if user chose to show zero values
            const total = parseFloat(product.total_ht);
            if (showZeroValues || total !== 0) {
                doc.text(`${formatNumberForPDF(product.total_ht)} DH`, POS_TOTAL, currentY + 5 + centerOffset);
            }

            currentY += rowHeight;
        });

        // Fixed position for Remarques and Totals (always at same Y position)
        const fixedBottomY = 235;

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
        doc.text('ATTIJARI WAFA BANK', 17, fixedBottomY + 10);
        doc.text('RIB : 007 720 0005979000000953 03', 17, fixedBottomY + 15);

        // Totals - Right side with gray background (same Y position)
        doc.setFillColor(...darkGrayColor);
        doc.rect(110, fixedBottomY, 85, 6, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(9);
        doc.setFont(undefined, 'bold');
        doc.text('TOTAL HT', 113, fixedBottomY + 4);
        doc.text(`${formatNumberForPDF(invoice.total_ht)} DH`, 192, fixedBottomY + 4, { align: 'right' });

        // Only show TVA row if tva_rate > 0
        if (parseFloat(invoice.tva_rate) > 0) {
            doc.setFillColor(255, 255, 255);
            doc.rect(110, fixedBottomY + 6, 85, 6, 'F');
            doc.setDrawColor(200, 200, 200);
            doc.rect(110, fixedBottomY + 6, 85, 6);
            doc.setTextColor(0, 0, 0);
            doc.text(`TVA ${invoice.tva_rate}%`, 113, fixedBottomY + 10);
            doc.text(`${formatNumberForPDF(invoice.montant_tva)} DH`, 192, fixedBottomY + 10, { align: 'right' });

            doc.setFillColor(...darkGrayColor);
            doc.rect(110, fixedBottomY + 12, 85, 6, 'F');
            doc.setTextColor(255, 255, 255);
            doc.text('TOTAL TTC', 113, fixedBottomY + 16);
            doc.text(`${formatNumberForPDF(invoice.total_ttc)} DH`, 192, fixedBottomY + 16, { align: 'right' });
        } else {
            // If TVA is 0%, show only TOTAL (which equals HT)
            doc.setFillColor(...darkGrayColor);
            doc.rect(110, fixedBottomY + 6, 85, 6, 'F');
            doc.setTextColor(255, 255, 255);
            doc.text('TOTAL', 113, fixedBottomY + 10);
            doc.text(`${formatNumberForPDF(invoice.total_ht)} DH`, 192, fixedBottomY + 10, { align: 'right' });
        }

        // Add notes if any
        const noteResult = await window.electron.dbMulti.getNote(invoiceId);
        if (noteResult.success && noteResult.data) {
            // Font size mapping for notes
            const fontSizeMap = {
                'small': { size: 7, lineheight: 3.5 },
                'medium': { size: 9, lineheight: 4.5 },
                'large': { size: 12, lineheight: 5.5 },
                'xlarge': { size: 14, lineheight: 6.5 }
            };
            const selectedFont = fontSizeMap[notesFontSize] || fontSizeMap['medium'];

            // Force new page for Notes
            pages.push(pageCount);
            doc.addPage();
            addHeader(false);
            pageCount++;

            const notesY = 60; // Start at top of new page
            const footerTopY = 270;

            doc.setFontSize(10);
            doc.setFont(undefined, 'bold');
            doc.setTextColor(96, 125, 139);
            doc.text('Notes:', 15, notesY);

            doc.setTextColor(0, 0, 0);
            doc.setFont(undefined, 'bold');
            doc.setFontSize(selectedFont.size);
            const noteLines = doc.splitTextToSize(noteResult.data, 180); // Use full width

            let lineY = notesY + 6;
            const lineStep = selectedFont.lineheight;

            for (let i = 0; i < noteLines.length; i++) {
                if (lineY > footerTopY) {
                    pages.push(pageCount);
                    doc.addPage();
                    addHeader(false);
                    pageCount++;

                    let contStartY = 60;
                    doc.setFontSize(10);
                    doc.setFont(undefined, 'bold');
                    doc.setTextColor(96, 125, 139);
                    doc.text('Notes (suite) :', 15, contStartY);

                    doc.setTextColor(0, 0, 0);
                    doc.setFont(undefined, 'bold');
                    doc.setFontSize(selectedFont.size);
                    lineY = contStartY + 6;
                }

                doc.text(noteLines[i], 15, lineY);
                lineY += lineStep;
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

// Download invoice as PDF - MULTI TRAVAUX TETOUAN Design
// Helper to show consolidated customization modal for Multi PDF
async function showMultiPDFCustomizationModal(invoice) {
    return new Promise((resolve) => {
        const overlay = document.createElement('div');
        overlay.className = 'custom-modal-overlay';

        const isDevis = invoice.document_type === 'devis';

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
                                <input type="radio" name="multiNotesFontSize" value="small" style="margin-bottom: 0.4rem; cursor: pointer;">
                                <span style="font-size: 0.75rem; color: #999;">Petit</span>
                            </label>
                            <label style="flex: 1; display: flex; flex-direction: column; align-items: center; cursor: pointer; padding: 0.5rem; border-radius: 6px; transition: all 0.2s; background: #2d2d30;">
                                <input type="radio" name="multiNotesFontSize" value="medium" checked style="margin-bottom: 0.4rem; cursor: pointer;">
                                <span style="font-size: 0.85rem; color: #fff;">Moyen</span>
                            </label>
                            <label style="flex: 1; display: flex; flex-direction: column; align-items: center; cursor: pointer; padding: 0.5rem; border-radius: 6px; transition: all 0.2s;">
                                <input type="radio" name="multiNotesFontSize" value="large" style="margin-bottom: 0.4rem; cursor: pointer;">
                                <span style="font-size: 0.95rem; color: #999;">Grand</span>
                            </label>
                            <label style="flex: 1; display: flex; flex-direction: column; align-items: center; cursor: pointer; padding: 0.5rem; border-radius: 6px; transition: all 0.2s;">
                                <input type="radio" name="multiNotesFontSize" value="xlarge" style="margin-bottom: 0.4rem; cursor: pointer;">
                                <span style="font-size: 1.05rem; color: #999;">Très G.</span>
                            </label>
                        </div>
                    </div>

                    ${isDevis ? `
                        <div style="margin-bottom: 1.25rem;">
                            <label style="display:flex;align-items:center;cursor:pointer;padding:0.75rem;background:#1e1e1e;border:1px solid #3e3e42;border-radius:8px;">
                                <input type="checkbox" id="multiIncludeSignature" checked style="width:18px;height:18px;margin-right:0.75rem;cursor:pointer;accent-color:#4caf50;">
                                <span style="font-size:0.9rem;color:#e0e0e0;">Inclure la signature</span>
                            </label>
                        </div>
                    ` : ''}
                </div>
                <div class="custom-modal-footer">
                    <button class="custom-modal-btn secondary" id="multiCancelBtn">Annuler</button>
                    <button class="custom-modal-btn primary" id="multiGenerateBtn">Générer PDF</button>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);

        const cancelBtn = overlay.querySelector('#multiCancelBtn');
        const generateBtn = overlay.querySelector('#multiGenerateBtn');

        const radioLabels = overlay.querySelectorAll('input[name="multiNotesFontSize"]');
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
            const selectedSize = overlay.querySelector('input[name="multiNotesFontSize"]:checked').value;
            const includeSignature = overlay.querySelector('#multiIncludeSignature') ? overlay.querySelector('#multiIncludeSignature').checked : false;

            overlay.remove();
            resolve({
                notesFontSize: selectedSize,
                includeSignature
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


window.downloadInvoicePDFMulti = async function (invoiceId) {
    try {
        console.log('📥 Generating PDF for invoice:', invoiceId);

        // Get invoice data
        const result = await window.electron.dbMulti.getInvoiceById(invoiceId);

        if (!result.success || !result.data) {
            throw new Error('Facture introuvable');
        }

        const invoice = result.data;

        // Show consolidated customization modal
        const customParams = await showMultiPDFCustomizationModal(invoice);
        if (!customParams) {
            console.log('❌ User cancelled PDF generation');
            return;
        }

        console.log('⚙️ PDF Custom Parameters:', customParams);

        const includeSignature = customParams.includeSignature;
        const notesFontSize = customParams.notesFontSize;

        console.log('📄 Continuing with PDF generation...');

        // Check if jsPDF is loaded
        if (typeof window.jspdf === 'undefined') {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
            script.onload = () => window.downloadInvoicePDFMulti(invoiceId);
            document.head.appendChild(script);
            return;
        }

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        // Load signature image
        const signatureImgMulti = await loadMultiSignature();

        // Load editable PDF text
        const pdfText = await window.loadCompanyPdfText('MULTI');

        // Colors - New design
        const darkGrayColor = [96, 125, 139]; // #607D8B
        const lightGrayBg = [236, 239, 241]; // #ECEFF1

        const dateStr = (window.safeParseDate||function(d){return new Date(d)})(invoice.document_date).toLocaleDateString('fr-FR');

        // Helper function to format numbers
        const formatNumberForPDF = (num) => {
            return parseFloat(num).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
        };

        // Function to add header to any page
        const addHeader = (isFirstPage = true) => {
            // Add company logo - Left side (synchronous approach)
            try {
                const logoImg = document.querySelector('img[src*="multi.png"]') ||
                    document.querySelector('img[alt="Multi Company"]');
                if (logoImg && logoImg.src && logoImg.complete) {
                    // Image is already loaded
                    const canvas = document.createElement('canvas');
                    canvas.width = logoImg.naturalWidth || 200;
                    canvas.height = logoImg.naturalHeight || 200;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(logoImg, 0, 0);
                    const imgData = canvas.toDataURL('image/png');
                    doc.addImage(imgData, 'PNG', 15, 8, 20, 20);
                }
            } catch (error) {
                console.log('Logo not available:', error.message);
            }

            // Company Name - Left aligned, large (moved right to make space for logo)
            doc.setFontSize(18);
            doc.setTextColor(96, 125, 139);
            doc.setFont(undefined, 'bold');
            doc.text(pdfText.company_name || 'MULTI TRAVAUX TETOUAN', 40, 18);

            // Document Type - Right aligned, underlined
            doc.setFontSize(18);
            doc.setFont(undefined, 'bold');
            const docType = invoice.document_type === 'devis' ? 'DEVIS' : 'FACTURE';
            doc.text(docType, 195, 18, { align: 'right' });
            doc.setLineWidth(0.5);
            doc.line(195 - doc.getTextWidth(docType), 19, 195, 19);

            // Document Number and Date - Right side, smaller
            doc.setFontSize(9);
            doc.setFont(undefined, 'normal');
            doc.setTextColor(0, 0, 0);
            if (invoice.document_type === 'devis') {
                doc.text(`Numéro de devis : ${invoice.document_numero_devis || '-'}`, 195, 26, { align: 'right' });
                doc.text(`Date de devis : ${dateStr}`, 195, 31, { align: 'right' });
            } else {
                doc.text(`Numéro de facture : ${invoice.document_numero || '-'}`, 195, 26, { align: 'right' });

                // Add Order number on new line below invoice number if exists
                const orderNumber = invoice.document_numero_Order || invoice.document_numero_order;
                if (orderNumber && orderNumber.trim() !== '') {
                    doc.text(`N° Order : ${orderNumber}`, 195, 31, { align: 'right' });
                    doc.text(`Date de facture : ${dateStr}`, 195, 36, { align: 'right' });
                    console.log('✅ Order number exists in PDF generation:', orderNumber);
                } else {
                    doc.text(`Date de facture : ${dateStr}`, 195, 31, { align: 'right' });
                    console.log('❌ Order number is missing or null');
                }
            }

            // Email and Address - Left side with gray background (ONE BOX)
            doc.setFillColor(...darkGrayColor);
            doc.rect(15, 38, 80, 6, 'F');
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(8);
            doc.text('Email: ' + (pdfText.header_email || 'errbahiabderrahim@gmail.com'), 17, 42);

            doc.setFillColor(...lightGrayBg);
            doc.rect(15, 44, 80, 6, 'F');
            doc.setTextColor(0, 0, 0);
            doc.setFontSize(7);
            doc.text(pdfText.header_address || 'AV 10 MAI IMM 04 APPART 01 A DROIT - TETOUAN , TETOUAN', 17, 48);

            // Client Info - Right side with gray background (ONE BOX)
            doc.setFillColor(...darkGrayColor);
            doc.rect(115, 38, 80, 6, 'F');
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(8);
            const devisLabel = invoice.document_type === 'devis' ? 'DEVIS à :' : 'FACTURE à :';
            doc.text(`${devisLabel} ${invoice.client_nom}`, 117, 42);

            // Only show ICE if it exists and is not "0"
            if (invoice.client_ice && invoice.client_ice !== '0') {
                doc.setFillColor(...lightGrayBg);
                doc.rect(115, 44, 80, 6, 'F');
                doc.setTextColor(0, 0, 0);
                doc.setFontSize(7);
                doc.text(`ICE : ${invoice.client_ice}`, 117, 48);
            }
        };

        // Function to add footer to any page
        const addFooter = (pageNum, totalPages) => {
            // Add signature image - moved lower and narrowed for better integration
            if (signatureImgMulti && includeSignature) {
                doc.addImage(signatureImgMulti, 'PNG', 145, 255, 50, 32);
            }

            doc.setTextColor(0, 0, 0);
            doc.setFontSize(8.5);
            doc.setFont(undefined, 'normal');
            doc.text(pdfText.footer_line1 || 'NIF 68717422 | TP 51001343 | RC 38633 | CNSS 6446237', 105, 282, { align: 'center' });
            doc.text(pdfText.footer_line2 || 'ICE : 003809505000031', 105, 286, { align: 'center' });
            doc.text(pdfText.footer_line3 || 'Tel: +212 661 307 323', 105, 289, { align: 'center' });

            // Add page numbering at bottom in gray
            doc.setTextColor(100, 100, 100);
            doc.setFontSize(7.5);
            doc.text(`Page ${pageNum} / ${totalPages}`, 105, 293, { align: 'center' });
        };

        // Add header to first page
        addHeader(true);

        // Products Table
        const startY = 60;

        // Table Header - Gray background
        doc.setFillColor(...darkGrayColor);
        doc.rect(15, startY, 180, 7, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(9);
        doc.setFont(undefined, 'bold');
        doc.text('Description', 18, startY + 5);
        doc.text('Quantité', 162, startY + 5, { align: 'center' });
        doc.text('Prix unitaire HT', 183, startY + 5, { align: 'right' });
        doc.text('Prix total HT', 195, startY + 5, { align: 'right' });

        // Table Body
        let currentY = startY + 10;
        doc.setTextColor(0, 0, 0);
        doc.setFont(undefined, 'normal');
        doc.setFontSize(9);

        let pageCount = 1;
        const pages = [];

        invoice.products.forEach((product, index) => {
            // Wrap long text - limit width to 75 for description column only
            const designation = product.designation || '';
            const lines = doc.splitTextToSize(designation, 140);

            // Calculate row height based on text lines - more space per line
            const rowHeight = Math.max(8, (lines.length * 4.5) + 4);

            // Check if we need a new page BEFORE drawing
            if (currentY + rowHeight > 220) {
                pages.push(pageCount);
                doc.addPage();
                addHeader(false);
                pageCount++;

                // Re-draw table header on new page
                let newStartY = 60;

                doc.setFillColor(...darkGrayColor);
                doc.rect(15, newStartY, 180, 7, 'F');
                doc.setTextColor(255, 255, 255);
                doc.setFontSize(9);
                doc.setFont(undefined, 'bold');
                doc.text('Description', 18, newStartY + 5);
                doc.text('Quantité', 162, newStartY + 5, { align: 'center' });
                doc.text('Prix unitaire HT', 183, newStartY + 5, { align: 'right' });
                doc.text('Prix total HT', 195, newStartY + 5, { align: 'right' });

                currentY = newStartY + 10;
                doc.setTextColor(0, 0, 0);
                doc.setFont(undefined, 'normal');
                doc.setFontSize(9);
            }

            // Alternate row colors
            if (index % 2 === 0) {
                doc.setFillColor(245, 245, 245);
                doc.rect(15, currentY - 3, 180, rowHeight, 'F');
            }

            doc.setFontSize(7.5);
            // Draw each line separately with proper spacing - show full text
            lines.forEach((line, lineIndex) => {
                doc.text(line, 18, currentY + 3 + (lineIndex * 4.5));
            });

            // Center vertically for multi-line products
            const centerOffset = (lines.length > 1) ? ((lines.length - 1) * 2.25) : 0;

            doc.setFontSize(8);
            doc.text(String(product.quantite || ''), 162, currentY + 3 + centerOffset, { align: 'center' });

            // Use smaller font for large numbers
            doc.setFontSize(7.5);
            doc.text(`${formatNumberForPDF(product.prix_unitaire_ht)} DH`, 183, currentY + 3 + centerOffset, { align: 'right' });
            doc.text(`${formatNumberForPDF(product.total_ht)} DH`, 195, currentY + 3 + centerOffset, { align: 'right' });

            currentY += rowHeight;
        });

        // Fixed position for Remarques and Totals (always at same Y position)
        const fixedBottomY = 235;

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
        doc.text('ATTIJARI WAFA BANK', 17, fixedBottomY + 10);
        doc.text('RIB : 007 720 0005979000000953 03', 17, fixedBottomY + 15);

        // Totals - Right side with gray background (same Y position)
        doc.setFillColor(...darkGrayColor);
        doc.rect(110, fixedBottomY, 85, 6, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(9);
        doc.setFont(undefined, 'bold');
        doc.text('TOTAL HT', 113, fixedBottomY + 4);
        doc.text(`${formatNumberForPDF(invoice.total_ht)} DH`, 192, fixedBottomY + 4, { align: 'right' });

        // Only show TVA row if tva_rate > 0
        if (parseFloat(invoice.tva_rate) > 0) {
            doc.setFillColor(255, 255, 255);
            doc.rect(110, fixedBottomY + 6, 85, 6, 'F');
            doc.setDrawColor(200, 200, 200);
            doc.rect(110, fixedBottomY + 6, 85, 6);
            doc.setTextColor(0, 0, 0);
            doc.text(`TVA ${invoice.tva_rate}%`, 113, fixedBottomY + 10);
            doc.text(`${formatNumberForPDF(invoice.montant_tva)} DH`, 192, fixedBottomY + 10, { align: 'right' });

            doc.setFillColor(...darkGrayColor);
            doc.rect(110, fixedBottomY + 12, 85, 6, 'F');
            doc.setTextColor(255, 255, 255);
            doc.text('TOTAL TTC', 113, fixedBottomY + 16);
            doc.text(`${formatNumberForPDF(invoice.total_ttc)} DH`, 192, fixedBottomY + 16, { align: 'right' });
        } else {
            // If TVA is 0%, show only TOTAL (which equals HT)
            doc.setFillColor(...darkGrayColor);
            doc.rect(110, fixedBottomY + 6, 85, 6, 'F');
            doc.setTextColor(255, 255, 255);
            doc.text('TOTAL', 113, fixedBottomY + 10);
            doc.text(`${formatNumberForPDF(invoice.total_ht)} DH`, 192, fixedBottomY + 10, { align: 'right' });
        }

        // Amount in words - below both sections
        const amountWordsY = fixedBottomY + 25;
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(8);
        doc.setFont(undefined, 'normal');
        const amountInWords = numberToFrenchWords(invoice.total_ttc);
        const docTypeText = invoice.document_type === 'devis' ? 'devis' : 'facture';
        const amountText = `La Présente ${docTypeText} est Arrêté à la somme de : ${amountInWords}`;
        const amountLines = doc.splitTextToSize(amountText, 180);
        
        let currentAmountY = amountWordsY;
        amountLines.forEach(line => {
            doc.text(line, 15, currentAmountY);
            currentAmountY += 4;
        });

        // Add notes if any
        const noteResult = await window.electron.dbMulti.getNote(invoiceId);
        if (noteResult.success && noteResult.data) {
            // Font size mapping for notes
            const fontSizeMap = {
                'small': { size: 7, lineheight: 3.5 },
                'medium': { size: 9, lineheight: 4.5 },
                'large': { size: 12, lineheight: 5.5 },
                'xlarge': { size: 14, lineheight: 6.5 }
            };
            const selectedFont = fontSizeMap[notesFontSize] || fontSizeMap['medium'];

            // Force new page for Notes
            pages.push(pageCount);
            doc.addPage();
            addHeader(false);
            pageCount++;

            const notesY = 60; // Start at top of new page
            const footerTopY = 280;

            // Title for notes block
            doc.setFontSize(10);
            doc.setFont(undefined, 'bold');
            doc.setTextColor(96, 125, 139); // Dark gray color matching the theme
            doc.text('Notes:', 15, notesY);

            // Prepare text rendering
            doc.setTextColor(0, 0, 0);
            doc.setFont(undefined, 'bold');
            doc.setFontSize(selectedFont.size);
            const noteLines = doc.splitTextToSize(noteResult.data, 180); // Use full width

            let lineY = notesY + 6;
            const lineStep = selectedFont.lineheight; // line height used across the document

            // Render line by line and add pages if needed
            for (let i = 0; i < noteLines.length; i++) {
                // If next line would collide with footer, break to a new page
                if (lineY > footerTopY) {
                    // track current page and add a fresh one
                    pages.push(pageCount);
                    doc.addPage();
                    addHeader(false);
                    pageCount++;

                    // Start notes continuation at top area of new page
                    let contStartY = 60; // below header
                    doc.setFontSize(10);
                    doc.setFont(undefined, 'bold');
                    doc.setTextColor(96, 125, 139);
                    doc.text('Notes (suite) :', 15, contStartY);

                    doc.setTextColor(0, 0, 0);
                    doc.setFont(undefined, 'bold');
                    doc.setFontSize(selectedFont.size);
                    lineY = contStartY + 6;
                }

                doc.text(noteLines[i], 15, lineY);
                lineY += lineStep;
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
        const docNumero = invoice.document_numero || invoice.document_numero_devis || 'N';
        const selectedCompany = JSON.parse(localStorage.getItem('selectedCompany') || '{}');
        const companyName = selectedCompany.name ? selectedCompany.name.replace(' Company', '') : 'Unknown';
        const filename = `${invoice.document_type === 'devis' ? 'Devis' : 'Facture'}_${docNumero}_${invoice.client_nom}_${companyName}.pdf`;
        doc.save(filename);

        window.notify.success('Succès', 'PDF téléchargé avec succès', 3000);

    } catch (error) {
        console.error('❌ Error generating PDF:', error);
        window.notify.error('Erreur', 'Impossible de générer le PDF: ' + error.message, 4000);
    }
}

// Initialize page
window.initInvoicesListMultiPage = function () {
    console.log('🔄 [MULTI] Initializing invoices list page...');

    // Get selected year from session or localStorage
    const sessionYear = sessionStorage.getItem('multi_current_year');
    const savedYear = localStorage.getItem('multi_selected_year');
    const rememberYear = localStorage.getItem('multi_remember_year');

    // Use session year first, then saved year if remember is enabled
    let selectedYear = '';
    if (sessionYear) {
        selectedYear = sessionYear;
    } else if (rememberYear === 'true' && savedYear) {
        selectedYear = savedYear;
    }

    // Update year display button
    setTimeout(() => {
        const yearDisplay = document.getElementById('currentYearDisplayMulti');
        if (yearDisplay) {
            yearDisplay.textContent = selectedYear ? `Année ${selectedYear}` : 'Toutes';
        }
    }, 100);

    loadInvoicesMulti();
};

// Change year - clear saved preference and go to year selector
window.changeYearMulti = function () {
    // Clear both session and local storage to force showing the selection modal
    sessionStorage.removeItem('multi_current_year');
    localStorage.removeItem('multi_remember_year');
    localStorage.removeItem('multi_selected_year');
    // Navigate to year selector
    router.navigate('/year-selector-multi');
};

// Sort table by column
let currentSortColumnMulti = null;
let currentSortDirectionMulti = 'asc';

window.sortTableMulti = function (column) {
    console.log('🔄 [MULTI SORT] Sorting by:', column);

    // Toggle sort direction if clicking same column
    if (currentSortColumnMulti === column) {
        currentSortDirectionMulti = currentSortDirectionMulti === 'asc' ? 'desc' : 'asc';
    } else {
        currentSortColumnMulti = column;
        currentSortDirectionMulti = 'asc';
    }

    // Update sort icons
    ['Numero', 'Date', 'HT', 'TTC'].forEach(col => {
        const icon = document.getElementById(`sortIcon${col}`);
        if (icon) icon.textContent = '⇅';
    });

    const iconMap = {
        'numero': 'Numero',
        'date': 'Date',
        'total_ht': 'HT',
        'total_ttc': 'TTC'
    };

    const currentIcon = document.getElementById(`sortIcon${iconMap[column]}`);
    if (currentIcon) {
        currentIcon.textContent = currentSortDirectionMulti === 'asc' ? '↑' : '↓';
    }

    // Sort the filtered invoices
    filteredInvoicesMulti.sort((a, b) => {
        let valueA, valueB;

        switch (column) {
            case 'numero':
                // Extract number from document_numero or document_numero_devis
                valueA = parseInt((a.document_numero || a.document_numero_devis || '0').replace(/\D/g, '')) || 0;
                valueB = parseInt((b.document_numero || b.document_numero_devis || '0').replace(/\D/g, '')) || 0;
                break;
            case 'date':
                valueA = (window.safeParseDate||function(d){return new Date(d)})(a.document_date).getTime();
                valueB = (window.safeParseDate||function(d){return new Date(d)})(b.document_date).getTime();
                break;
            case 'total_ht':
                valueA = parseFloat(a.total_ht) || 0;
                valueB = parseFloat(b.total_ht) || 0;
                break;
            case 'total_ttc':
                valueA = parseFloat(a.total_ttc) || 0;
                valueB = parseFloat(b.total_ttc) || 0;
                break;
            default:
                return 0;
        }

        if (currentSortDirectionMulti === 'asc') {
            return valueA - valueB;
        } else {
            return valueB - valueA;
        }
    });

    // Reset to first page and display
    currentPageMulti = 1;
    displayInvoicesMulti();

    console.log('✅ [MULTI SORT] Sorted successfully:', column, currentSortDirectionMulti);
};

// Reset filters
window.resetFiltersMulti = function () {
    const typeFilter = document.getElementById('filterTypeMulti');
    const statusFilter = document.getElementById('filterStatusMulti');
    const yearFilter = document.getElementById('filterYearMulti');
    const monthFilter = document.getElementById('filterMonthMulti');
    const clientFilter = document.getElementById('filterClientMulti');
    const attachmentFilter = document.getElementById('filterAttachmentsMulti');
    const methodFilter = document.getElementById('filterCreationMethodMulti');
    const convFilter = document.getElementById('filterDevisConversionMulti');
    const arFilter = document.getElementById('filterArStatusMulti');
    const searchInput = document.getElementById('searchInputMulti');

    if (typeFilter) typeFilter.value = '';
    if (statusFilter) statusFilter.value = 'all';
    if (yearFilter) yearFilter.value = '';
    if (monthFilter) monthFilter.value = '';
    if (clientFilter) clientFilter.value = '';
    if (attachmentFilter) attachmentFilter.value = 'all';
    if (methodFilter) methodFilter.value = 'all';
    if (convFilter) convFilter.value = 'all';
    if (arFilter) arFilter.value = 'all';
    const featuredFilter = document.getElementById('filterFeaturedMulti');
    if (featuredFilter) featuredFilter.value = 'all';
    
    // Reset search type checkboxes
    const searchTypeChecks = [
        'searchTypeCheckNumeroMulti', 'searchTypeCheckOrderMulti', 'searchTypeCheckClientMulti',
        'searchTypeCheckIceMulti', 'searchTypeCheckProductMulti', 'searchTypeCheckPriceMulti',
        'searchTypeCheckTotalHtMulti', 'searchTypeCheckTotalMulti'
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
    const searchTypeText = document.getElementById('searchTypeSelectedTextMulti');
    if (searchTypeText) searchTypeText.textContent = 'Tous les champs';
    const toggleAllText = document.getElementById('searchTypeToggleAllTextMulti');
    if (toggleAllText) toggleAllText.textContent = 'Sélectionner tout';
    
    if (searchInput) searchInput.value = '';

    currentPageMulti = 1;
    filterInvoicesMulti();
};

// Migrate local attachments to server (MULTI)
window.migrateAttachmentsToServerMulti = async function () {
    const confirmed = await customConfirm(
        'Migration des pièces jointes',
        'Cela va transférer toutes les pièces jointes locales vers le serveur en ligne. Continuer ?',
        'info'
    );
    if (!confirmed) return;

    const loadingNotif = window.notify.loading('Migration en cours...', 'Transfert vers le serveur');
    try {
        const result = await window.electron.attachments.migrateToServer({ company: 'MULTI' });
        window.notify.remove(loadingNotif);
        if (result.success) {
            window.notify.success('Migration terminée', `${result.migrated} fichier(s) transféré(s) vers le serveur.`, 5000);
            loadInvoicesMulti();
        } else {
            window.notify.error('Erreur', result.error || 'Échec de la migration', 4000);
        }
    } catch (e) {
        window.notify.remove(loadingNotif);
        window.notify.error('Erreur', e.message, 4000);
    }
};


