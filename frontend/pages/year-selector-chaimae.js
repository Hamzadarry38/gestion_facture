// Year Selector Page for Chaimae Company
function YearSelectorChaimaePage() {
    return `
        <div class="desktop-app">
            <div class="window-header">
                <div class="window-title">
                    <img src="assets/logos/chaimae.png" class="header-logo" alt="Chaimae Company" data-asset="assets/logos/chaimae.png">
                    <span>Sélection de l'Année - Chaimae Company</span>
                </div>
                <div class="window-controls">
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

            <div class="window-content" style="display: flex; align-items: center; justify-content: center; min-height: calc(100vh - 60px); background: linear-gradient(135deg, #1e1e1e 0%, #2d2d30 100%);">
                <div style="max-width: 1200px; width: 100%; padding: 2rem;">
                    <!-- Header Section -->
                    <div style="text-align: center; margin-bottom: 3rem;">
                        <div style="font-size: 4rem; margin-bottom: 1rem;">📅</div>
                        <h1 style="color: #ffffff; font-size: 2.5rem; margin-bottom: 1rem; font-weight: 700;">Choisissez l'Année</h1>
                        <p style="color: #999; font-size: 1.1rem;">Sélectionnez l'année pour afficher les documents correspondants</p>
                    </div>

                    <!-- Loading Spinner -->
                    <div id="yearLoadingSpinner" style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 3rem;">
                        <div class="spinner" style="width: 50px; height: 50px; border: 4px solid #3e3e42; border-top: 4px solid #667eea; border-radius: 50%; animation: spin 1s linear infinite;"></div>
                        <p style="color: #999; margin-top: 1rem;">Chargement des années disponibles...</p>
                    </div>

                    <!-- Years Cards Container -->
                    <div id="yearsCardsGrid" style="display: none; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; margin-bottom: 2rem;">
                        <!-- Year cards will be inserted here -->
                    </div>

                    <!-- Back Button -->
                    <div style="text-align: center; margin-top: 3rem;">
                        <button onclick="router.navigate('/dashboard-chaimae')" style="padding: 1rem 2rem; background: #3e3e42; color: #ffffff; border: 2px solid #3e3e42; border-radius: 8px; cursor: pointer; font-size: 1rem; font-weight: 600; transition: all 0.3s;" onmouseover="this.style.background='#4e4e52'; this.style.borderColor='#667eea';" onmouseout="this.style.background='#3e3e42'; this.style.borderColor='#3e3e42';">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style="margin-right: 0.5rem; vertical-align: middle;">
                                <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                            </svg>
                            Retour au Dashboard
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <style>
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        </style>
    `;
}

// Load and display available years
window.loadYearSelectorChaimae = async function() {
    const loadingSpinner = document.getElementById('yearLoadingSpinner');
    const cardsGrid = document.getElementById('yearsCardsGrid');
    
    try {
        // Show loading
        if (loadingSpinner) loadingSpinner.style.display = 'flex';
        if (cardsGrid) cardsGrid.style.display = 'none';
        
        // Get available years from database
        const result = await window.electron.dbChaimae.getAvailableYears();
        
        let availableYears = [];
        if (result.success && result.data.length > 0) {
            availableYears = result.data;
        } else {
            // Fallback: use current year and previous 2 years
            const currentYear = new Date().getFullYear();
            availableYears = [currentYear, currentYear - 1, currentYear - 2];
        }
        
        // Get all invoices to count per year
        const invoicesResult = await window.electron.dbChaimae.getAllInvoices();
        const allInvoices = invoicesResult.success ? invoicesResult.data : [];
        
        // Count invoices per year
        const yearCounts = {};
        allInvoices.forEach(inv => {
            const year = inv.year || new Date(inv.document_date).getFullYear();
            yearCounts[year] = (yearCounts[year] || 0) + 1;
        });
        
        // Render year cards
        renderYearCardsSelector(availableYears, yearCounts, allInvoices.length);
        
        // Hide loading, show cards
        if (loadingSpinner) loadingSpinner.style.display = 'none';
        if (cardsGrid) cardsGrid.style.display = 'grid';
        
    } catch (error) {
        console.error('Error loading years:', error);
        if (loadingSpinner) {
            loadingSpinner.innerHTML = `
                <div style="text-align: center; color: #f44336;">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">⚠️</div>
                    <p style="font-size: 1.1rem;">Erreur lors du chargement des années</p>
                    <p style="font-size: 0.9rem; color: #999; margin-top: 0.5rem;">${error.message}</p>
                </div>
            `;
        }
    }
}

// Render year cards in selector
function renderYearCardsSelector(years, yearCounts, totalCount) {
    const container = document.getElementById('yearsCardsGrid');
    if (!container) return;
    
    // Get saved year preference
    const savedYear = localStorage.getItem('chaimae_selected_year');
    
    let cardsHTML = '';
    
    // Add "All Years" card
    cardsHTML += `
        <div onclick="selectYearAndNavigate('', ${totalCount})" 
             style="padding: 2.5rem 2rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border: 3px solid #667eea; border-radius: 16px; cursor: pointer; transition: all 0.3s; box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4); position: relative; overflow: hidden;"
             onmouseover="this.style.transform='translateY(-10px) scale(1.02)'; this.style.boxShadow='0 12px 32px rgba(102, 126, 234, 0.6)';"
             onmouseout="this.style.transform='translateY(0) scale(1)'; this.style.boxShadow='0 8px 24px rgba(102, 126, 234, 0.4)';">
            <div style="position: absolute; top: -50px; right: -50px; width: 150px; height: 150px; background: rgba(255,255,255,0.1); border-radius: 50%;"></div>
            <div style="text-align: center; position: relative; z-index: 1;">
                <div style="font-size: 4rem; margin-bottom: 1rem; filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));">📊</div>
                <div style="font-size: 1.5rem; font-weight: 700; color: #fff; margin-bottom: 1rem; text-shadow: 0 2px 4px rgba(0,0,0,0.2);">Toutes les Années</div>
                <div style="font-size: 3rem; font-weight: 700; color: #fff; margin-bottom: 0.5rem; text-shadow: 0 2px 4px rgba(0,0,0,0.2);">${totalCount}</div>
                <div style="font-size: 1rem; color: rgba(255,255,255,0.9); text-shadow: 0 1px 2px rgba(0,0,0,0.2);">documents au total</div>
            </div>
        </div>
    `;
    
    // Add year cards
    const currentYear = new Date().getFullYear();
    
    years.forEach(year => {
        const count = yearCounts[year] || 0;
        const isSavedYear = savedYear && savedYear == year;
        const isCurrentYear = year == currentYear;
        
        // Determine badge to show
        let badgeHTML = '';
        if (isSavedYear) {
            badgeHTML = `
                <div style="position: absolute; top: 1rem; right: 1rem; background: #4caf50; color: white; padding: 0.4rem 0.8rem; border-radius: 20px; font-size: 0.75rem; font-weight: 600; box-shadow: 0 2px 8px rgba(76, 175, 80, 0.4);">
                    ✓ Sélectionné
                </div>
            `;
        } else if (isCurrentYear) {
            badgeHTML = `
                <div style="position: absolute; top: 1rem; right: 1rem; background: #667eea; color: white; padding: 0.4rem 0.8rem; border-radius: 20px; font-size: 0.75rem; font-weight: 600; box-shadow: 0 2px 8px rgba(102, 126, 234, 0.4);">
                    ⭐ Recommandé
                </div>
            `;
        }
        
        cardsHTML += `
            <div onclick="selectYearAndNavigate('${year}', ${count})" 
                 style="padding: 2.5rem 2rem; background: linear-gradient(135deg, #2d2d30 0%, #3e3e42 100%); border: 3px solid ${isSavedYear ? '#4caf50' : (isCurrentYear ? '#667eea' : '#3e3e42')}; border-radius: 16px; cursor: pointer; transition: all 0.3s; box-shadow: 0 4px 16px rgba(0,0,0,0.3); position: relative; overflow: hidden;"
                 onmouseover="this.style.transform='translateY(-10px) scale(1.02)'; this.style.borderColor='#667eea'; this.style.boxShadow='0 12px 32px rgba(102, 126, 234, 0.5)';"
                 onmouseout="this.style.transform='translateY(0) scale(1)'; this.style.borderColor='${isSavedYear ? '#4caf50' : (isCurrentYear ? '#667eea' : '#3e3e42')}'; this.style.boxShadow='0 4px 16px rgba(0,0,0,0.3)';">
                ${badgeHTML}
                <div style="position: absolute; top: -50px; right: -50px; width: 150px; height: 150px; background: rgba(102, 126, 234, 0.1); border-radius: 50%;"></div>
                <div style="text-align: center; position: relative; z-index: 1;">
                    <div style="font-size: 4rem; margin-bottom: 1rem; filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));">📅</div>
                    <div style="font-size: 2.5rem; font-weight: 700; color: #fff; margin-bottom: 1rem; text-shadow: 0 2px 4px rgba(0,0,0,0.2);">${year}</div>
                    <div style="font-size: 3rem; font-weight: 700; color: #4caf50; margin-bottom: 0.5rem; text-shadow: 0 2px 4px rgba(0,0,0,0.2);">${count}</div>
                    <div style="font-size: 1rem; color: #999;">documents</div>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = cardsHTML;
}

// Select year and navigate to invoices list
window.selectYearAndNavigate = function(year, count) {
    // Show confirmation with checkbox to remember
    const yearText = year ? year : 'toutes les années';
    const countText = count === 1 ? '1 document' : `${count} documents`;
    
    const modal = document.createElement('div');
    modal.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.8); display: flex; align-items: center; justify-content: center; z-index: 10000;';
    
    modal.innerHTML = `
        <div style="background: #2d2d30; border: 2px solid #667eea; border-radius: 16px; padding: 2.5rem; max-width: 500px; width: 90%; box-shadow: 0 8px 32px rgba(0,0,0,0.5);">
            <div style="text-align: center; margin-bottom: 2rem;">
                <div style="font-size: 4rem; margin-bottom: 1rem;">✅</div>
                <h2 style="color: #fff; font-size: 1.8rem; margin-bottom: 1rem;">Confirmer la sélection</h2>
                <p style="color: #999; font-size: 1.1rem;">Vous avez sélectionné <strong style="color: #667eea;">${yearText}</strong></p>
                <p style="color: #4caf50; font-size: 1rem; margin-top: 0.5rem;">${countText} disponible(s)</p>
            </div>
            
            <div style="background: #1e1e1e; border: 1px solid #3e3e42; border-radius: 8px; padding: 1.5rem; margin-bottom: 2rem;">
                <label style="display: flex; align-items: center; cursor: pointer; color: #cccccc; font-size: 1rem;">
                    <input type="checkbox" id="rememberYearCheckbox" style="width: 20px; height: 20px; margin-right: 1rem; cursor: pointer;">
                    <span>Se souvenir de mon choix pour la prochaine fois</span>
                </label>
            </div>
            
            <div style="display: flex; gap: 1rem;">
                <button onclick="this.closest('div[style*=fixed]').remove()" style="flex: 1; padding: 1rem; background: #3e3e42; color: #fff; border: none; border-radius: 8px; cursor: pointer; font-size: 1rem; font-weight: 600; transition: all 0.3s;" onmouseover="this.style.background='#4e4e52'" onmouseout="this.style.background='#3e3e42'">
                    Annuler
                </button>
                <button onclick="confirmYearSelection('${year}')" style="flex: 1; padding: 1rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #fff; border: none; border-radius: 8px; cursor: pointer; font-size: 1rem; font-weight: 600; transition: all 0.3s; box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 16px rgba(102, 126, 234, 0.6)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 12px rgba(102, 126, 234, 0.4)'">
                    Continuer
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// Confirm year selection and navigate
window.confirmYearSelection = function(year) {
    const rememberCheckbox = document.getElementById('rememberYearCheckbox');
    
    // Save to localStorage if checkbox is checked
    if (rememberCheckbox && rememberCheckbox.checked) {
        localStorage.setItem('chaimae_selected_year', year);
        localStorage.setItem('chaimae_remember_year', 'true');
    } else {
        // Clear saved preference if not checked
        localStorage.removeItem('chaimae_selected_year');
        localStorage.removeItem('chaimae_remember_year');
    }
    
    // Save selected year for current session
    sessionStorage.setItem('chaimae_current_year', year);
    
    // Close the modal
    const modal = document.querySelector('div[style*="position: fixed"]');
    if (modal) {
        modal.remove();
    }
    
    // Navigate to invoices list
    router.navigate('/invoices-list-chaimae');
}
