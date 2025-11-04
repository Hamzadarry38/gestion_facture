// Create Data Page for Multi Company
function CreateDataMultiPage() {
    return `
        <div class="desktop-app">
            <div class="window-header">
                <div class="window-title">
                    <img src="assets/logos/multi.png" class="header-logo" alt="Multi Company" data-asset="assets/logos/multi.png">
                    <span>Multi Company - Créer une donnée</span>
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

            <div class="window-content invoice-content">
                <form id="createDataForm" class="invoice-form">
                    <!-- Section 1: Data Information -->
                    <div class="invoice-section">
                        <div class="section-header">
                            <h2>📦 Informations de la donnée</h2>
                        </div>
                        <div class="section-body">
                            <div class="form-row">
                                <div class="form-field">
                                    <label>Titre <span class="required">*</span></label>
                                    <input type="text" id="dataTitle" placeholder="Titre de la donnée" required>
                                </div>
                                <div class="form-field">
                                    <label>Date <span class="required">*</span></label>
                                    <input type="date" id="dataDate" required>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-field">
                                    <label>Description</label>
                                    <textarea id="dataDescription" placeholder="Description de la donnée" rows="4"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Action Buttons -->
                    <div class="form-actions">
                        <button type="button" class="btn-secondary" id="cancelBtn">
                            <span>❌ Annuler</span>
                        </button>
                        <button type="submit" class="btn-primary">
                            <span>💾 Enregistrer</span>
                        </button>
                    </div>
                </form>

                <div class="window-footer">
                    <button class="footer-btn" id="backToDashboard">
                        <span class="icon">←</span>
                        <span>Retour au tableau de bord</span>
                    </button>
                    <div class="footer-info">
                        <span class="status-dot"></span>
                        <span>Créer une donnée</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Initialize Create Data Page
function initCreateDataMultiPage() {
    const form = document.getElementById('createDataForm');
    const cancelBtn = document.getElementById('cancelBtn');
    const backBtn = document.getElementById('backToDashboard');

    // Set today's date as default
    const dateInput = document.getElementById('dataDate');
    if (dateInput) {
        dateInput.valueAsDate = new Date();
    }

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const title = document.getElementById('dataTitle').value;
            const description = document.getElementById('dataDescription').value;
            const date = document.getElementById('dataDate').value;

            // Here you can add logic to save the data
            console.log('Data to save:', { title, description, date });
            
            // Show success message
            if (typeof customAlert === 'function') {
                await customAlert('Succès', 'Les données ont été enregistrées avec succès!', 'success');
            } else {
                alert('Les données ont été enregistrées avec succès!');
            }
            
            // Clear form
            form.reset();
            if (dateInput) {
                dateInput.valueAsDate = new Date();
            }
        });
    }

    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            router.navigate('/dashboard-multi');
        });
    }

    if (backBtn) {
        backBtn.addEventListener('click', () => {
            router.navigate('/dashboard-multi');
        });
    }
}
