// Custom Alert/Confirm System

// Custom Alert
window.customAlert = function (title, message, type = 'info') {
    return new Promise((resolve) => {
        // Create overlay
        const overlay = document.createElement('div');
        overlay.className = 'custom-modal-overlay';

        // Icon based on type
        const icons = {
            warning: '⚠️',
            error: '❌',
            success: '✅',
            info: 'ℹ️'
        };

        overlay.innerHTML = `
            <div class="custom-modal">
                <div class="custom-modal-header">
                    <span class="custom-modal-icon ${type}">${icons[type] || icons.info}</span>
                    <h3 class="custom-modal-title">${title}</h3>
                </div>
                <div class="custom-modal-body">
                    ${message}
                </div>
                <div class="custom-modal-footer">
                    <button class="custom-modal-btn primary" id="alertOkBtn">OK</button>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);

        // Handle OK button
        const okBtn = overlay.querySelector('#alertOkBtn');
        okBtn.addEventListener('click', () => {
            overlay.remove();
            resolve(true);
        });

        // Handle overlay click
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.remove();
                resolve(true);
            }
        });

        // Handle Escape key
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                overlay.remove();
                document.removeEventListener('keydown', handleEscape);
                resolve(true);
            }
        };
        document.addEventListener('keydown', handleEscape);

        // Focus OK button
        setTimeout(() => okBtn.focus(), 100);
    });
};

// Custom Confirm
window.customConfirm = function (title, message, type = 'warning') {
    return new Promise((resolve) => {
        // Create overlay
        const overlay = document.createElement('div');
        overlay.className = 'custom-modal-overlay';

        // Icon based on type
        const icons = {
            warning: '⚠️',
            error: '❌',
            success: '✅',
            info: 'ℹ️'
        };

        // Button style based on type
        const btnClass = type === 'error' || type === 'warning' ? 'danger' : 'primary';

        overlay.innerHTML = `
            <div class="custom-modal">
                <div class="custom-modal-header">
                    <span class="custom-modal-icon ${type}">${icons[type] || icons.warning}</span>
                    <h3 class="custom-modal-title">${title}</h3>
                </div>
                <div class="custom-modal-body">
                    ${message}
                </div>
                <div class="custom-modal-footer">
                    <button class="custom-modal-btn secondary" id="confirmCancelBtn">Annuler</button>
                    <button class="custom-modal-btn ${btnClass}" id="confirmOkBtn">Confirmer</button>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);

        // Handle OK button
        const okBtn = overlay.querySelector('#confirmOkBtn');
        okBtn.addEventListener('click', () => {
            overlay.remove();
            resolve(true);
        });

        // Handle Cancel button
        const cancelBtn = overlay.querySelector('#confirmCancelBtn');
        cancelBtn.addEventListener('click', () => {
            overlay.remove();
            resolve(false);
        });

        // Handle overlay click
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.remove();
                resolve(false);
            }
        });

        // Handle Escape key
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                overlay.remove();
                document.removeEventListener('keydown', handleEscape);
                resolve(false);
            }
        };
        document.addEventListener('keydown', handleEscape);

        // Focus OK button
        setTimeout(() => okBtn.focus(), 100);
    });
};

// Custom Prompt
window.customPrompt = function (title, message, inputType = 'text', placeholder = '') {
    return new Promise((resolve) => {
        // Create overlay
        const overlay = document.createElement('div');
        overlay.className = 'custom-modal-overlay';

        overlay.innerHTML = `
            <div class="custom-modal">
                <div class="custom-modal-header">
                    <span class="custom-modal-icon info">❓</span>
                    <h3 class="custom-modal-title">${title}</h3>
                </div>
                <div class="custom-modal-body">
                    <p style="margin-bottom: 1rem;">${message}</p>
                    <input type="${inputType}" id="customPromptInput" placeholder="${placeholder}" 
                           style="width: 100%; padding: 0.75rem; border-radius: 8px; border: 1px solid #3e3e42; background: #1e1e1e; color: #fff; font-size: 1rem; box-sizing: border-box;">
                </div>
                <div class="custom-modal-footer">
                    <button class="custom-modal-btn secondary" id="promptCancelBtn">Annuler</button>
                    <button class="custom-modal-btn primary" id="promptOkBtn">OK</button>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);

        const input = overlay.querySelector('#customPromptInput');
        const okBtn = overlay.querySelector('#promptOkBtn');
        const cancelBtn = overlay.querySelector('#promptCancelBtn');

        // Handle OK
        const handleOk = () => {
            const value = input.value;
            overlay.remove();
            resolve(value);
        };

        // Handle Cancel
        const handleCancel = () => {
            overlay.remove();
            resolve(null);
        };

        okBtn.addEventListener('click', handleOk);
        cancelBtn.addEventListener('click', handleCancel);

        // Handle Enter key for submit and Escape for cancel
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleOk();
            } else if (e.key === 'Escape') {
                handleCancel();
            }
        });

        // Handle overlay click to cancel
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) handleCancel();
        });

        // Focus input
        setTimeout(() => input.focus(), 100);
    });
};

// Helper to make confirm work with await
window.confirmAsync = async function (message) {
    return await customConfirm('Confirmation', message, 'warning');
};

