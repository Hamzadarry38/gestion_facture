// Payment Modal for Invoice Creation
// Shows after creating a facture to ask about payment status

window.showPaymentModalMulti = function(invoiceId, clientName) {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    `;

    modal.innerHTML = `
        <div style="background: #2d2d30; border-radius: 12px; padding: 2rem; max-width: 500px; width: 90%; box-shadow: 0 10px 40px rgba(0,0,0,0.3);">
            <h2 style="color: #fff; margin: 0 0 1.5rem 0; font-size: 1.3rem;">💳 Statut de paiement</h2>
            <p style="color: #ccc; margin-bottom: 1.5rem;">Client: <strong style="color: #fff;">${clientName}</strong></p>
            
            <div style="margin-bottom: 1.5rem;">
                <label style="color: #e0e0e0; display: block; margin-bottom: 0.5rem; font-weight: 600;">Statut:</label>
                <select id="paymentStatusSelect" style="width: 100%; padding: 0.75rem; background: #1e1e1e; color: #fff; border: 1px solid #3e3e42; border-radius: 6px; font-size: 1rem;">
                    <option value="en attente de paiement" selected>En attente de paiement</option>
                    <option value="payé">Payé</option>
                </select>
            </div>

            <div id="paymentMethodContainer" style="display: none; margin-bottom: 1.5rem;">
                <label style="color: #e0e0e0; display: block; margin-bottom: 0.5rem; font-weight: 600;">Méthode de paiement:</label>
                <select id="paymentMethodSelect" style="width: 100%; padding: 0.75rem; background: #1e1e1e; color: #fff; border: 1px solid #3e3e42; border-radius: 6px; font-size: 1rem;">
                    <option value="">Sélectionner...</option>
                    <option value="Chèque">Chèque</option>
                    <option value="LCN">LCN</option>
                    <option value="Virement">Virement</option>
                    <option value="PRL">PRL</option>
                    <option value="Espèces">Espèces</option>
                </select>
            </div>

            <div style="display: flex; gap: 1rem; justify-content: flex-end;">
                <button id="cancelPaymentBtn" style="padding: 0.75rem 1.5rem; background: #3e3e42; color: #fff; border: none; border-radius: 6px; cursor: pointer; font-size: 1rem;">
                    Annuler
                </button>
                <button id="confirmPaymentBtn" style="padding: 0.75rem 1.5rem; background: #4caf50; color: #fff; border: none; border-radius: 6px; cursor: pointer; font-size: 1rem; font-weight: 600;">
                    Confirmer
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    const statusSelect = document.getElementById('paymentStatusSelect');
    const methodContainer = document.getElementById('paymentMethodContainer');
    const methodSelect = document.getElementById('paymentMethodSelect');
    const cancelBtn = document.getElementById('cancelPaymentBtn');
    const confirmBtn = document.getElementById('confirmPaymentBtn');

    // Show/hide payment method based on status
    statusSelect.addEventListener('change', () => {
        if (statusSelect.value === 'payé') {
            methodContainer.style.display = 'block';
        } else {
            methodContainer.style.display = 'none';
            methodSelect.value = '';
        }
    });

    // Cancel button - just close and navigate
    cancelBtn.addEventListener('click', () => {
        modal.remove();
        router.navigate('/dashboard-multi');
    });

    // Confirm button - save payment info
    confirmBtn.addEventListener('click', async () => {
        const paymentStatus = statusSelect.value;
        const paymentMethod = statusSelect.value === 'payé' ? methodSelect.value : null;

        // Validate payment method if status is "payé"
        if (paymentStatus === 'payé' && !paymentMethod) {
            window.notify.error('Erreur', 'Veuillez sélectionner une méthode de paiement', 3000);
            return;
        }

        try {
            confirmBtn.disabled = true;
            confirmBtn.textContent = 'Enregistrement...';

            const result = await window.electron.dbMulti.updateInvoice(invoiceId, {
                payment_status: paymentStatus,
                payment_method: paymentMethod
            });

            if (result.success) {
                modal.remove();
                window.notify.success('Succès', 'Statut de paiement enregistré', 2000);
                setTimeout(() => {
                    router.navigate('/dashboard-multi');
                }, 500);
            } else {
                throw new Error(result.error);
            }
        } catch (error) {
            console.error('Error saving payment status:', error);
            window.notify.error('Erreur', 'Impossible d\'enregistrer le statut de paiement', 3000);
            confirmBtn.disabled = false;
            confirmBtn.textContent = 'Confirmer';
        }
    });

    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
            router.navigate('/dashboard-multi');
        }
    });
};

window.showPaymentModalMRY = function(invoiceId, clientName) {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    `;

    modal.innerHTML = `
        <div style="background: #2d2d30; border-radius: 12px; padding: 2rem; max-width: 500px; width: 90%; box-shadow: 0 10px 40px rgba(0,0,0,0.3);">
            <h2 style="color: #fff; margin: 0 0 1.5rem 0; font-size: 1.3rem;">💳 Statut de paiement</h2>
            <p style="color: #ccc; margin-bottom: 1.5rem;">Client: <strong style="color: #fff;">${clientName}</strong></p>
            
            <div style="margin-bottom: 1.5rem;">
                <label style="color: #e0e0e0; display: block; margin-bottom: 0.5rem; font-weight: 600;">Statut:</label>
                <select id="paymentStatusSelect" style="width: 100%; padding: 0.75rem; background: #1e1e1e; color: #fff; border: 1px solid #3e3e42; border-radius: 6px; font-size: 1rem;">
                    <option value="en attente de paiement" selected>En attente de paiement</option>
                    <option value="payé">Payé</option>
                </select>
            </div>

            <div id="paymentMethodContainer" style="display: none; margin-bottom: 1.5rem;">
                <label style="color: #e0e0e0; display: block; margin-bottom: 0.5rem; font-weight: 600;">Méthode de paiement:</label>
                <select id="paymentMethodSelect" style="width: 100%; padding: 0.75rem; background: #1e1e1e; color: #fff; border: 1px solid #3e3e42; border-radius: 6px; font-size: 1rem;">
                    <option value="">Sélectionner...</option>
                    <option value="Chèque">Chèque</option>
                    <option value="LCN">LCN</option>
                    <option value="Virement">Virement</option>
                    <option value="PRL">PRL</option>
                    <option value="Espèces">Espèces</option>
                </select>
            </div>

            <div style="display: flex; gap: 1rem; justify-content: flex-end;">
                <button id="cancelPaymentBtn" style="padding: 0.75rem 1.5rem; background: #3e3e42; color: #fff; border: none; border-radius: 6px; cursor: pointer; font-size: 1rem;">
                    Annuler
                </button>
                <button id="confirmPaymentBtn" style="padding: 0.75rem 1.5rem; background: #4caf50; color: #fff; border: none; border-radius: 6px; cursor: pointer; font-size: 1rem; font-weight: 600;">
                    Confirmer
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    const statusSelect = document.getElementById('paymentStatusSelect');
    const methodContainer = document.getElementById('paymentMethodContainer');
    const methodSelect = document.getElementById('paymentMethodSelect');
    const cancelBtn = document.getElementById('cancelPaymentBtn');
    const confirmBtn = document.getElementById('confirmPaymentBtn');

    statusSelect.addEventListener('change', () => {
        if (statusSelect.value === 'payé') {
            methodContainer.style.display = 'block';
        } else {
            methodContainer.style.display = 'none';
            methodSelect.value = '';
        }
    });

    cancelBtn.addEventListener('click', () => {
        modal.remove();
        router.navigate('/dashboard-mry');
    });

    confirmBtn.addEventListener('click', async () => {
        const paymentStatus = statusSelect.value;
        const paymentMethod = statusSelect.value === 'payé' ? methodSelect.value : null;

        if (paymentStatus === 'payé' && !paymentMethod) {
            window.notify.error('Erreur', 'Veuillez sélectionner une méthode de paiement', 3000);
            return;
        }

        try {
            confirmBtn.disabled = true;
            confirmBtn.textContent = 'Enregistrement...';

            const result = await window.electron.db.updateInvoice(invoiceId, {
                payment_status: paymentStatus,
                payment_method: paymentMethod
            });

            if (result.success) {
                modal.remove();
                window.notify.success('Succès', 'Statut de paiement enregistré', 2000);
                setTimeout(() => {
                    router.navigate('/dashboard-mry');
                }, 500);
            } else {
                throw new Error(result.error);
            }
        } catch (error) {
            console.error('Error saving payment status:', error);
            window.notify.error('Erreur', 'Impossible d\'enregistrer le statut de paiement', 3000);
            confirmBtn.disabled = false;
            confirmBtn.textContent = 'Confirmer';
        }
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
            router.navigate('/dashboard-mry');
        }
    });
};

window.showPaymentModalChaimae = function(invoiceId, clientName) {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    `;

    modal.innerHTML = `
        <div style="background: #2d2d30; border-radius: 12px; padding: 2rem; max-width: 500px; width: 90%; box-shadow: 0 10px 40px rgba(0,0,0,0.3);">
            <h2 style="color: #fff; margin: 0 0 1.5rem 0; font-size: 1.3rem;">💳 Statut de paiement</h2>
            <p style="color: #ccc; margin-bottom: 1.5rem;">Client: <strong style="color: #fff;">${clientName}</strong></p>
            
            <div style="margin-bottom: 1.5rem;">
                <label style="color: #e0e0e0; display: block; margin-bottom: 0.5rem; font-weight: 600;">Statut:</label>
                <select id="paymentStatusSelect" style="width: 100%; padding: 0.75rem; background: #1e1e1e; color: #fff; border: 1px solid #3e3e42; border-radius: 6px; font-size: 1rem;">
                    <option value="en attente de paiement" selected>En attente de paiement</option>
                    <option value="payé">Payé</option>
                </select>
            </div>

            <div id="paymentMethodContainer" style="display: none; margin-bottom: 1.5rem;">
                <label style="color: #e0e0e0; display: block; margin-bottom: 0.5rem; font-weight: 600;">Méthode de paiement:</label>
                <select id="paymentMethodSelect" style="width: 100%; padding: 0.75rem; background: #1e1e1e; color: #fff; border: 1px solid #3e3e42; border-radius: 6px; font-size: 1rem;">
                    <option value="">Sélectionner...</option>
                    <option value="Chèque">Chèque</option>
                    <option value="LCN">LCN</option>
                    <option value="Virement">Virement</option>
                    <option value="PRL">PRL</option>
                    <option value="Espèces">Espèces</option>
                </select>
            </div>

            <div style="display: flex; gap: 1rem; justify-content: flex-end;">
                <button id="cancelPaymentBtn" style="padding: 0.75rem 1.5rem; background: #3e3e42; color: #fff; border: none; border-radius: 6px; cursor: pointer; font-size: 1rem;">
                    Annuler
                </button>
                <button id="confirmPaymentBtn" style="padding: 0.75rem 1.5rem; background: #4caf50; color: #fff; border: none; border-radius: 6px; cursor: pointer; font-size: 1rem; font-weight: 600;">
                    Confirmer
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    const statusSelect = document.getElementById('paymentStatusSelect');
    const methodContainer = document.getElementById('paymentMethodContainer');
    const methodSelect = document.getElementById('paymentMethodSelect');
    const cancelBtn = document.getElementById('cancelPaymentBtn');
    const confirmBtn = document.getElementById('confirmPaymentBtn');

    statusSelect.addEventListener('change', () => {
        if (statusSelect.value === 'payé') {
            methodContainer.style.display = 'block';
        } else {
            methodContainer.style.display = 'none';
            methodSelect.value = '';
        }
    });

    cancelBtn.addEventListener('click', () => {
        modal.remove();
        router.navigate('/dashboard-chaimae');
    });

    confirmBtn.addEventListener('click', async () => {
        const paymentStatus = statusSelect.value;
        const paymentMethod = statusSelect.value === 'payé' ? methodSelect.value : null;

        if (paymentStatus === 'payé' && !paymentMethod) {
            window.notify.error('Erreur', 'Veuillez sélectionner une méthode de paiement', 3000);
            return;
        }

        try {
            confirmBtn.disabled = true;
            confirmBtn.textContent = 'Enregistrement...';

            const result = await window.electron.dbChaimae.updateInvoice(invoiceId, {
                payment_status: paymentStatus,
                payment_method: paymentMethod
            });

            if (result.success) {
                modal.remove();
                window.notify.success('Succès', 'Statut de paiement enregistré', 2000);
                setTimeout(() => {
                    router.navigate('/dashboard-chaimae');
                }, 500);
            } else {
                throw new Error(result.error);
            }
        } catch (error) {
            console.error('Error saving payment status:', error);
            window.notify.error('Erreur', 'Impossible d\'enregistrer le statut de paiement', 3000);
            confirmBtn.disabled = false;
            confirmBtn.textContent = 'Confirmer';
        }
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
            router.navigate('/dashboard-chaimae');
        }
    });
};

// ==================== EDIT PAYMENT MODALS (from detail views) ====================

function createEditPaymentModal(invoiceId, currentStatus, currentMethod, dbApi, refreshFn) {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    `;

    modal.innerHTML = `
        <div style="background: #2d2d30; border-radius: 12px; padding: 2rem; max-width: 500px; width: 90%; box-shadow: 0 10px 40px rgba(0,0,0,0.3);">
            <h2 style="color: #fff; margin: 0 0 1.5rem 0; font-size: 1.3rem;">💳 Modifier le statut de paiement</h2>
            
            <div style="margin-bottom: 1.5rem;">
                <label style="color: #e0e0e0; display: block; margin-bottom: 0.5rem; font-weight: 600;">Statut:</label>
                <select id="editPaymentStatusSelect" style="width: 100%; padding: 0.75rem; background: #1e1e1e; color: #fff; border: 1px solid #3e3e42; border-radius: 6px; font-size: 1rem;">
                    <option value="en attente de paiement" ${currentStatus !== 'payé' ? 'selected' : ''}>En attente de paiement</option>
                    <option value="payé" ${currentStatus === 'payé' ? 'selected' : ''}>Payé</option>
                </select>
            </div>

            <div id="editPaymentMethodContainer" style="display: ${currentStatus === 'payé' ? 'block' : 'none'}; margin-bottom: 1.5rem;">
                <label style="color: #e0e0e0; display: block; margin-bottom: 0.5rem; font-weight: 600;">Méthode de paiement:</label>
                <select id="editPaymentMethodSelect" style="width: 100%; padding: 0.75rem; background: #1e1e1e; color: #fff; border: 1px solid #3e3e42; border-radius: 6px; font-size: 1rem;">
                    <option value="">Sélectionner...</option>
                    <option value="Chèque" ${currentMethod === 'Chèque' ? 'selected' : ''}>Chèque</option>
                    <option value="LCN" ${currentMethod === 'LCN' ? 'selected' : ''}>LCN</option>
                    <option value="Virement" ${currentMethod === 'Virement' ? 'selected' : ''}>Virement</option>
                    <option value="PRL" ${currentMethod === 'PRL' ? 'selected' : ''}>PRL</option>
                    <option value="Espèces" ${currentMethod === 'Espèces' ? 'selected' : ''}>Espèces</option>
                </select>
            </div>

            <div style="display: flex; gap: 1rem; justify-content: flex-end;">
                <button id="editCancelPaymentBtn" style="padding: 0.75rem 1.5rem; background: #3e3e42; color: #fff; border: none; border-radius: 6px; cursor: pointer; font-size: 1rem;">
                    Annuler
                </button>
                <button id="editConfirmPaymentBtn" style="padding: 0.75rem 1.5rem; background: #4caf50; color: #fff; border: none; border-radius: 6px; cursor: pointer; font-size: 1rem; font-weight: 600;">
                    Enregistrer
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    const statusSelect = document.getElementById('editPaymentStatusSelect');
    const methodContainer = document.getElementById('editPaymentMethodContainer');
    const methodSelect = document.getElementById('editPaymentMethodSelect');
    const cancelBtn = document.getElementById('editCancelPaymentBtn');
    const confirmBtn = document.getElementById('editConfirmPaymentBtn');

    statusSelect.addEventListener('change', () => {
        if (statusSelect.value === 'payé') {
            methodContainer.style.display = 'block';
        } else {
            methodContainer.style.display = 'none';
            methodSelect.value = '';
        }
    });

    cancelBtn.addEventListener('click', () => {
        modal.remove();
    });

    confirmBtn.addEventListener('click', async () => {
        const paymentStatus = statusSelect.value;
        const paymentMethod = statusSelect.value === 'payé' ? methodSelect.value : null;

        if (paymentStatus === 'payé' && !paymentMethod) {
            window.notify.error('Erreur', 'Veuillez sélectionner une méthode de paiement', 3000);
            return;
        }

        try {
            confirmBtn.disabled = true;
            confirmBtn.textContent = 'Enregistrement...';

            const result = await dbApi.updateInvoice(invoiceId, {
                payment_status: paymentStatus,
                payment_method: paymentMethod
            });

            if (result.success) {
                modal.remove();
                window.notify.success('Succès', 'Statut de paiement mis à jour', 2000);
                if (refreshFn) refreshFn();
            } else {
                throw new Error(result.error);
            }
        } catch (error) {
            console.error('Error updating payment status:', error);
            window.notify.error('Erreur', 'Impossible de mettre à jour le statut de paiement', 3000);
            confirmBtn.disabled = false;
            confirmBtn.textContent = 'Enregistrer';
        }
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
}

window.showEditPaymentModalMulti = function(invoiceId, currentStatus, currentMethod) {
    createEditPaymentModal(invoiceId, currentStatus, currentMethod, window.electron.dbMulti, () => {
        if (typeof loadInvoicesMulti === 'function') loadInvoicesMulti();
    });
};

window.showEditPaymentModalMRY = function(invoiceId, currentStatus, currentMethod) {
    createEditPaymentModal(invoiceId, currentStatus, currentMethod, window.electron.db, () => {
        if (typeof loadInvoices === 'function') loadInvoices();
    });
};

window.showEditPaymentModalChaimae = function(invoiceId, currentStatus, currentMethod) {
    createEditPaymentModal(invoiceId, currentStatus, currentMethod, window.electron.dbChaimae, () => {
        if (typeof loadInvoicesChaimae === 'function') loadInvoicesChaimae();
    });
};
