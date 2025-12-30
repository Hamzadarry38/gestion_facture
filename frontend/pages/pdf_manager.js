// PDF Manager - Display and manage saved PDF files
window.showPdfManager = async function (company) {
    try {
        // Store the current PDF company for refresh purposes
        window.currentPdfCompany = company;

        // Get the current company (creator)
        const selectedCompany = JSON.parse(localStorage.getItem('selectedCompany') || '{}');
        const createdBy = selectedCompany.code || selectedCompany.name || null;

        // Get all PDF files for this company, filtered by creator
        const result = await window.electron.pdf.getPdfFiles(company, createdBy);

        if (!result.success) {
            showPdfErrorModal('Erreur', 'Échec du chargement des fichiers PDF: ' + result.error);
            return;
        }

        let files = result.files || [];

        // Sort files by date (newest first)
        files.sort((a, b) => new Date(b.created) - new Date(a.created));

        // Create unique IDs for this modal instance
        const modalId = `pdfModal_${company}_${Date.now()}`;
        const closeButtonId = `closeBtn_${company}_${Date.now()}`;

        // Create modal
        const overlay = document.createElement('div');
        overlay.className = 'custom-modal-overlay';
        overlay.style.display = 'flex';
        overlay.style.alignItems = 'center';
        overlay.style.justifyContent = 'center';

        const modal = document.createElement('div');
        modal.className = 'custom-modal';
        modal.id = modalId;
        modal.style.width = '90vw';
        modal.style.height = '90vh';
        modal.style.maxWidth = 'none';
        modal.style.maxHeight = 'none';
        modal.style.display = 'flex';
        modal.style.flexDirection = 'column';

        // Map company codes to full names
        let companyDisplayName = company.toUpperCase();
        if (company === 'skm' || company === 'chaimae_skm') companyDisplayName = 'SMART SERVICES';
        if (company === 'saaiss' || company === 'chaimae_saaiss') companyDisplayName = 'MSH3 SERVICES';
        if (company === 'benali' || company === 'chaimae_benali') companyDisplayName = 'BEN ALI';

        modal.innerHTML = `
            <div class="custom-modal-header">
                <span class="custom-modal-icon info">📁</span>
                <h3 class="custom-modal-title">Fichiers PDF Sauvegardés - ${companyDisplayName}</h3>
            </div>
            
            <div style="
                padding: 0.8rem 1.5rem; 
                border-bottom: 1px solid #3e3e42; 
                display: flex; 
                align-items: center; 
                justify-content: space-between;
                background: rgba(0,0,0,0.2);
            ">
                <div style="display: flex; align-items: center; gap: 0.8rem; cursor: pointer;" onclick="document.getElementById('selectAllPdfs').click();">
                    <input type="checkbox" id="selectAllPdfs" style="width: 18px; height: 18px; cursor: pointer; accent-color: #0078d4;">
                    <label for="selectAllPdfs" style="color: #eee; cursor: pointer; user-select: none; font-size: 0.95rem;">Tout sélectionner</label>
                </div>
                <button id="deleteSelectedBtn" style="
                    padding: 0.5rem 1rem;
                    background: #f44336;
                    color: #fff;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 0.9rem;
                    font-weight: 600;
                    transition: all 0.2s;
                    display: none;
                    align-items: center;
                    gap: 0.5rem;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
                ">
                    🗑️ Supprimer (<span id="selectedCount">0</span>)
                </button>
            </div>
            
            <div style="padding: 2rem; flex: 1; overflow-y: auto;">
                ${files.length === 0 ? `
                    <div style="text-align: center; padding: 4rem 2rem; color: #999;">
                        <p style="font-size: 1.5rem;">📭 Aucun fichier PDF sauvegardé</p>
                    </div>
                ` : `
                    <div style="display: flex; flex-direction: column; gap: 1rem;">
                        ${files.map((file, index) => `
                            <div style="
                                background: rgba(255, 255, 255, 0.03);
                                border: 1px solid rgba(255, 255, 255, 0.08);
                                border-radius: 6px;
                                padding: 1rem 1.2rem;
                                display: flex;
                                justify-content: space-between;
                                align-items: center;
                                transition: all 0.2s ease;
                                position: relative;
                            " class="pdf-file-item" onmouseover="this.style.background='rgba(255, 255, 255, 0.06)'; this.style.borderColor='rgba(255, 255, 255, 0.2)';" onmouseout="this.style.background='rgba(255, 255, 255, 0.03)'; this.style.borderColor='rgba(255, 255, 255, 0.08)';">
                                <div style="display: flex; align-items: center; gap: 1.2rem; flex: 1;">
                                    <input type="checkbox" class="pdf-checkbox" data-filepath="${file.path.replace(/\\/g, '\\\\')}" style="width: 18px; height: 18px; cursor: pointer; accent-color: #0078d4;">
                                    
                                    <div style="
                                        width: 45px; 
                                        height: 45px; 
                                        background: rgba(244, 67, 54, 0.1); 
                                        border-radius: 8px; 
                                        display: flex; 
                                        align-items: center; 
                                        justify-content: center;
                                        font-size: 1.5rem;
                                    ">📄</div>

                                    <div style="flex: 1;">
                                        <div style="color: #fff; font-weight: 500; font-size: 1rem; margin-bottom: 0.3rem;">
                                            ${file.name}
                                        </div>
                                        <div style="color: #888; font-size: 0.85rem; display: flex; align-items: center; gap: 1rem;">
                                            <span>📅 ${new Date(file.created).toLocaleDateString('fr-FR')}</span>
                                            <span>📦 ${(file.size / 1024).toFixed(1)} KB</span>
                                            <span style="color: #0078d4;">👤 ${file.creator || 'Système'}</span>
                                        </div>
                                    </div>
                                </div>

                                <div style="display: flex; gap: 0.8rem;">
                                    <button onclick="openPdfFile('${file.path.replace(/\\/g, '\\\\')}')" 
                                            style="
                                                padding: 0.5rem 1rem;
                                                background: rgba(76, 175, 80, 0.15);
                                                color: #4CAF50;
                                                border: 1px solid rgba(76, 175, 80, 0.3);
                                                border-radius: 4px;
                                                cursor: pointer;
                                                font-size: 0.9rem;
                                                font-weight: 500;
                                                transition: all 0.2s;
                                            "
                                            onmouseover="this.style.background='rgba(76, 175, 80, 0.25)'"
                                            onmouseout="this.style.background='rgba(76, 175, 80, 0.15)'">
                                        Ouvrir
                                    </button>
                                    <button id="deleteBtn_${index}_${Date.now()}" 
                                            data-filepath="${file.path.replace(/\\/g, '\\\\')}"
                                            style="
                                                padding: 0.5rem 1rem;
                                                background: rgba(244, 67, 54, 0.15);
                                                color: #f44336;
                                                border: 1px solid rgba(244, 67, 54, 0.3);
                                                border-radius: 4px;
                                                cursor: pointer;
                                                font-size: 0.9rem;
                                                font-weight: 500;
                                                transition: all 0.2s;
                                            "
                                            onmouseover="this.style.background='rgba(244, 67, 54, 0.25)'"
                                            onmouseout="this.style.background='rgba(244, 67, 54, 0.15)'">
                                        Supprimer
                                    </button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                `}
            </div>
            
            <div style="
                display: flex;
                gap: 1rem;
                padding: 1.5rem;
                border-top: 2px solid #3e3e42;
                justify-content: space-between;
                background: #1e1e1e;
            ">
                <div style="display: flex; gap: 1rem;">
                    <button onclick="exportAllPdfs('${company}')" style="
                        padding: 0.8rem 2rem;
                        background: #2196F3;
                        color: #fff;
                        border: none;
                        border-radius: 6px;
                        cursor: pointer;
                        font-size: 1rem;
                        font-weight: 600;
                        transition: all 0.2s;
                        display: flex;
                        align-items: center;
                        gap: 0.5rem;
                    "
                    onmouseover="this.style.background='#1976D2'"
                    onmouseout="this.style.background='#2196F3'">
                        📤 Exporter
                    </button>
                    <button onclick="importAllPdfs('${company}')" style="
                        padding: 0.8rem 2rem;
                        background: #4CAF50;
                        color: #fff;
                        border: none;
                        border-radius: 6px;
                        cursor: pointer;
                        font-size: 1rem;
                        font-weight: 600;
                        transition: all 0.2s;
                        display: flex;
                        align-items: center;
                        gap: 0.5rem;
                    "
                    onmouseover="this.style.background='#45a049'"
                    onmouseout="this.style.background='#4CAF50'">
                        📥 Importer
                    </button>
                </div>
                <button id="${closeButtonId}" style="
                    padding: 0.8rem 2rem;
                    background: #0078d4;
                    color: #fff;
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
                    font-size: 1rem;
                    font-weight: 600;
                    transition: all 0.2s;
                "
                onmouseover="this.style.background='#005a9e'"
                onmouseout="this.style.background='#0078d4'">
                    Fermer
                </button>
            </div>
        `;

        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        // Close modal - wait for DOM to be ready
        setTimeout(() => {
            const closeBtn = document.getElementById(closeButtonId);
            if (closeBtn) {
                closeBtn.onclick = () => {
                    overlay.remove();
                };
            }

            // Add event listeners to delete buttons
            const deleteButtons = modal.querySelectorAll('[id^="deleteBtn_"]');
            deleteButtons.forEach((btn, idx) => {
                btn.onclick = async (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const filePath = btn.getAttribute('data-filepath');
                    await deletePdfFile(filePath, 0);
                };
            });

            // --- Bulk Selection Logic ---
            const selectAllCheckbox = document.getElementById('selectAllPdfs');
            const deleteSelectedBtn = document.getElementById('deleteSelectedBtn');
            const selectedCountSpan = document.getElementById('selectedCount');
            const fileCheckboxes = modal.querySelectorAll('.pdf-checkbox');

            function updateSelectionUI() {
                const checkedBoxes = modal.querySelectorAll('.pdf-checkbox:checked');
                const count = checkedBoxes.length;
                if (selectedCountSpan) selectedCountSpan.textContent = count;

                if (count > 0) {
                    deleteSelectedBtn.style.display = 'flex';
                    // Small pop animation
                    deleteSelectedBtn.style.animation = 'popIn 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                } else {
                    deleteSelectedBtn.style.display = 'none';
                    selectAllCheckbox.checked = false;
                }

                // Update Select All checkbox state

                // Update Select All checkbox state
                if (count === fileCheckboxes.length && count > 0) {
                    selectAllCheckbox.checked = true;
                    selectAllCheckbox.indeterminate = false;
                } else if (count > 0 && count < fileCheckboxes.length) {
                    selectAllCheckbox.checked = false;
                    selectAllCheckbox.indeterminate = true;
                } else {
                    selectAllCheckbox.checked = false;
                    selectAllCheckbox.indeterminate = false;
                }
            }

            // Add animation keyframes if not exists
            if (!document.getElementById('btnPopAnimation')) {
                const style = document.createElement('style');
                style.id = 'btnPopAnimation';
                style.textContent = `
                    @keyframes popIn {
                        from { transform: scale(0.8); opacity: 0; }
                        to { transform: scale(1); opacity: 1; }
                    }
                `;
                document.head.appendChild(style);
            }

            if (selectAllCheckbox) {
                selectAllCheckbox.addEventListener('change', (e) => {
                    const isChecked = e.target.checked;
                    fileCheckboxes.forEach(cb => cb.checked = isChecked);
                    updateSelectionUI();
                });
            }

            fileCheckboxes.forEach(cb => {
                cb.addEventListener('change', updateSelectionUI);
            });

            if (deleteSelectedBtn) {
                deleteSelectedBtn.addEventListener('click', async () => {
                    const checkedBoxes = modal.querySelectorAll('.pdf-checkbox:checked');
                    const filesToDelete = Array.from(checkedBoxes).map(cb => cb.getAttribute('data-filepath'));

                    if (filesToDelete.length === 0) return;

                    const confirmed = await showDeleteConfirmModal(
                        'Suppression multiple',
                        `Êtes-vous sûr de vouloir supprimer ces ${filesToDelete.length} fichiers ?\n\nCette action est irréversible.`
                    );

                    if (!confirmed) return;

                    // Show loading
                    showDeleteLoadingBar();
                    let successCount = 0;
                    let errorCount = 0;

                    // Process deletions sequentially to avoid race conditions/overload
                    for (const filePath of filesToDelete) {
                        try {
                            const result = await window.electron.pdf.deletePdf(filePath);
                            if (result.success) successCount++;
                            else errorCount++;
                        } catch (e) {
                            errorCount++;
                        }
                    }

                    // Refresh and show result
                    setTimeout(() => {
                        document.querySelectorAll('.custom-modal-overlay').forEach(el => el.remove());
                        window.showPdfManager(company);

                        if (errorCount === 0) {
                            showPdfSuccessModal('Succès', `${successCount} fichiers ont été supprimés avec succès.`);
                        } else {
                            showPdfErrorModal('Terminé', `${successCount} fichiers supprimés.\n${errorCount} erreurs.`);
                        }
                    }, 1000);
                });
            }
        }, 0);

        overlay.onclick = (e) => {
            if (e.target === overlay) {
                overlay.remove();
            }
        };

        modal.onclick = (e) => e.stopPropagation();

    } catch (error) {
        console.error('❌ Error opening PDF manager:', error);
        showPdfErrorModal('Erreur', 'Une erreur s\'est produite: ' + error.message);
    }
};

// Open PDF file
window.openPdfFile = async function (filePath) {
    try {
        const result = await window.electron.pdf.openPdf(filePath);

        if (!result.success) {
            showPdfErrorModal('Erreur', 'Impossible d\'ouvrir le fichier: ' + result.error);
        }
    } catch (error) {
        showPdfErrorModal('Erreur', 'Une erreur s\'est produite: ' + error.message);
    }
};

// Delete PDF file
window.deletePdfFile = async function (filePath, index) {
    try {
        // Show custom confirmation modal instead of browser confirm
        const confirmed = await showDeleteConfirmModal('Supprimer le fichier', 'Êtes-vous sûr de vouloir supprimer ce fichier?\n\nCette action ne peut pas être annulée.');

        if (!confirmed) {
            return;
        }

        const result = await window.electron.pdf.deletePdf(filePath);

        if (result.success) {
            // Show loading bar during refresh
            showDeleteLoadingBar();
            showPdfSuccessModal('Succès', 'Le fichier a été supprimé avec succès');
            // Close the modal and refresh the PDF manager after 1.5 seconds
            setTimeout(() => {
                // Close all modals
                document.querySelectorAll('.custom-modal-overlay').forEach(el => el.remove());
                // Reopen the PDF manager to refresh the list
                const selectedCompany = JSON.parse(localStorage.getItem('selectedCompany') || '{}');
                const currentCompany = window.currentPdfCompany || 'skm';
                window.showPdfManager(currentCompany);
            }, 1500);
        } else {
            showPdfErrorModal('Erreur', 'Impossible de supprimer le fichier: ' + result.error);
        }
    } catch (error) {
        showPdfErrorModal('Erreur', 'Une erreur s\'est produite: ' + error.message);
    }
};

// Success Modal
function showPdfSuccessModal(title, message) {
    const overlay = document.createElement('div');
    overlay.className = 'custom-modal-overlay';
    overlay.style.cssText = `
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);
        z-index: 999999;
    `;

    const modal = document.createElement('div');
    modal.className = 'custom-modal';
    modal.style.cssText = `
        max-width: 400px;
        position: relative;
        z-index: 1000000;
        background: #2d2d30;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
    `;

    modal.innerHTML = `
        <div class="custom-modal-header" style="background: linear-gradient(135deg, #4CAF50, #45a049);">
            <span class="custom-modal-icon" style="color: #fff;">✓</span>
            <h3 class="custom-modal-title" style="color: #fff;">${title}</h3>
        </div>
        
        <div style="padding: 2rem; text-align: center;">
            <p style="color: #fff; font-size: 1.1rem; margin: 0;">${message}</p>
        </div>
        
        <div style="
            display: flex;
            gap: 1rem;
            padding: 1.5rem;
            border-top: 1px solid #3e3e42;
            justify-content: center;
        ">
            <button id="closePdfSuccessModal" style="
                padding: 0.75rem 2rem;
                background: #4CAF50;
                color: #fff;
                border: none;
                border-radius: 6px;
                cursor: pointer;
                font-size: 1rem;
                font-weight: 600;
                transition: all 0.2s;
            "
            onmouseover="this.style.background='#45a049'"
            onmouseout="this.style.background='#4CAF50'">
                OK
            </button>
        </div>
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    document.getElementById('closePdfSuccessModal').onclick = () => {
        overlay.remove();
        modal.remove();
    };

    overlay.onclick = () => {
        overlay.remove();
        modal.remove();
    };

    modal.onclick = (e) => e.stopPropagation();
}

// Error Modal
function showPdfErrorModal(title, message) {
    const overlay = document.createElement('div');
    overlay.className = 'custom-modal-overlay';
    overlay.style.cssText = `
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);
        z-index: 999999;
    `;

    const modal = document.createElement('div');
    modal.className = 'custom-modal';
    modal.style.cssText = `
        max-width: 400px;
        position: relative;
        z-index: 1000000;
        background: #2d2d30;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
    `;

    modal.innerHTML = `
        <div class="custom-modal-header" style="background: linear-gradient(135deg, #f44336, #da190b);">
            <span class="custom-modal-icon" style="color: #fff;">✕</span>
            <h3 class="custom-modal-title" style="color: #fff;">${title}</h3>
        </div>
        
        <div style="padding: 2rem; text-align: center;">
            <p style="color: #fff; font-size: 1.1rem; margin: 0;">${message}</p>
        </div>
        
        <div style="
            display: flex;
            gap: 1rem;
            padding: 1.5rem;
            border-top: 1px solid #3e3e42;
            justify-content: center;
        ">
            <button id="closePdfErrorModal" style="
                padding: 0.75rem 2rem;
                background: #f44336;
                color: #fff;
                border: none;
                border-radius: 6px;
                cursor: pointer;
                font-size: 1rem;
                font-weight: 600;
                transition: all 0.2s;
            "
            onmouseover="this.style.background='#da190b'"
            onmouseout="this.style.background='#f44336'">
                OK
            </button>
        </div>
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    document.getElementById('closePdfErrorModal').onclick = () => {
        overlay.remove();
        modal.remove();
    };

    overlay.onclick = () => {
        overlay.remove();
        modal.remove();
    };

    modal.onclick = (e) => e.stopPropagation();
}

// Delete Confirmation Modal
function showDeleteConfirmModal(title, message, buttonText = 'Supprimer', buttonColor = '#f44336', buttonHoverColor = '#da190b') {
    return new Promise((resolve) => {
        const overlay = document.createElement('div');
        overlay.className = 'custom-modal-overlay';
        overlay.style.cssText = `
            display: flex;
            align-items: center;
            justify-content: center;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.7);
            z-index: 999999;
        `;

        const modal = document.createElement('div');
        modal.className = 'custom-modal';
        modal.style.cssText = `
            max-width: 450px;
            position: relative;
            z-index: 1000000;
            background: #2d2d30;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
        `;

        modal.innerHTML = `
            <div class="custom-modal-header" style="background: linear-gradient(135deg, ${buttonColor}, ${buttonHoverColor});">
                <span class="custom-modal-icon" style="color: #fff; font-size: 1.5rem;">⚠️</span>
                <h3 class="custom-modal-title" style="color: #fff;">${title}</h3>
            </div>
            
            <div style="padding: 2rem; text-align: center;">
                <p style="color: #fff; font-size: 1rem; margin: 0; white-space: pre-wrap; line-height: 1.6;">${message}</p>
            </div>
            
            <div style="
                display: flex;
                gap: 1rem;
                padding: 1.5rem;
                border-top: 1px solid #3e3e42;
                justify-content: center;
            ">
                <button id="confirmDeleteBtn" style="
                    padding: 0.75rem 2rem;
                    background: ${buttonColor};
                    color: #fff;
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
                    font-size: 1rem;
                    font-weight: 600;
                    transition: all 0.2s;
                "
                onmouseover="this.style.background='${buttonHoverColor}'"
                onmouseout="this.style.background='${buttonColor}'">
                    ✓ ${buttonText}
                </button>
                <button id="cancelDeleteBtn" style="
                    padding: 0.75rem 2rem;
                    background: #555;
                    color: #fff;
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
                    font-size: 1rem;
                    font-weight: 600;
                    transition: all 0.2s;
                "
                onmouseover="this.style.background='#666'"
                onmouseout="this.style.background='#555'">
                    ✕ Annuler
                </button>
            </div>
        `;

        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        // Wait for DOM to be ready before setting up listeners
        setTimeout(() => {
            const confirmBtn = document.getElementById('confirmDeleteBtn');
            const cancelBtn = document.getElementById('cancelDeleteBtn');

            if (confirmBtn) {
                confirmBtn.onclick = () => {
                    overlay.remove();
                    modal.remove();
                    resolve(true);
                };
            }

            if (cancelBtn) {
                cancelBtn.onclick = () => {
                    overlay.remove();
                    modal.remove();
                    resolve(false);
                };
            }

            overlay.onclick = () => {
                overlay.remove();
                modal.remove();
                resolve(false);
            };

            modal.onclick = (e) => e.stopPropagation();
        }, 0);
    });
}

// Delete Loading Bar
function showDeleteLoadingBar() {
    const loadingBar = document.createElement('div');
    loadingBar.id = 'deleteLoadingBar';
    loadingBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 4px;
        background: linear-gradient(90deg, #4CAF50, #45a049, #4CAF50);
        background-size: 200% 100%;
        animation: deleteLoadingAnimation 1.5s ease-in-out forwards;
        z-index: 999999;
        box-shadow: 0 0 10px rgba(76, 175, 80, 0.5);
    `;

    // Add animation keyframes
    if (!document.getElementById('deleteLoadingStyle')) {
        const style = document.createElement('style');
        style.id = 'deleteLoadingStyle';
        style.textContent = `
            @keyframes deleteLoadingAnimation {
                0% {
                    width: 0%;
                    opacity: 1;
                }
                50% {
                    width: 80%;
                    opacity: 1;
                }
                100% {
                    width: 100%;
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(loadingBar);

    // Remove loading bar after animation completes
    setTimeout(() => {
        if (loadingBar.parentNode) {
            loadingBar.remove();
        }
    }, 1500);
}

// Export all PDFs for a company
window.exportAllPdfs = async function (company) {
    try {
        console.log(`📤 Exporting all PDFs for ${company}...`);

        // Get the current user's company
        const selectedCompany = JSON.parse(localStorage.getItem('selectedCompany') || '{}');
        const userCompany = selectedCompany.name || 'UNKNOWN';

        // Show loading indicator
        const loadingBar = document.createElement('div');
        loadingBar.id = 'exportLoadingBar';
        loadingBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 4px;
            background: linear-gradient(90deg, #2196F3, #1976D2);
            z-index: 999999;
            transition: width 0.3s ease;
        `;
        document.body.appendChild(loadingBar);

        // Simulate progress
        let progress = 0;
        const progressInterval = setInterval(() => {
            progress += Math.random() * 30;
            if (progress > 90) progress = 90;
            loadingBar.style.width = progress + '%';
        }, 200);

        // Call export handler with both companies
        const result = await window.electron.pdf.exportAll(company, userCompany);

        clearInterval(progressInterval);
        loadingBar.style.width = '100%';

        if (result.success) {
            setTimeout(() => loadingBar.remove(), 500);
            showPdfSuccessModal('Export réussi', `Tous les fichiers PDF ont été exportés avec succès!\n\nFichier: ${result.path}\nTaille: ${(result.size / 1024 / 1024).toFixed(2)} MB`);
            console.log('✅ Export successful:', result.path);
        } else {
            loadingBar.remove();
            showPdfErrorModal('Erreur d\'export', result.error || 'Une erreur inconnue s\'est produite');
            console.error('❌ Export failed:', result.error);
        }
    } catch (error) {
        console.error('❌ Export error:', error);
        showPdfErrorModal('Erreur', 'Une erreur s\'est produite: ' + error.message);
    }
};

// Import PDFs for a company
window.importAllPdfs = async function (company) {
    try {
        console.log(`📥 Importing PDFs for ${company}...`);

        // Show confirmation
        const confirmed = await showDeleteConfirmModal(
            'Importer les fichiers PDF',
            'Voulez-vous importer les fichiers PDF à partir d\'un fichier compressé?\n\nUne sauvegarde des fichiers actuels sera créée.',
            'Importer',
            '#2196F3',
            '#1976D2'
        );

        if (!confirmed) {
            return;
        }

        // Show loading indicator
        const loadingBar = document.createElement('div');
        loadingBar.id = 'importLoadingBar';
        loadingBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 4px;
            background: linear-gradient(90deg, #4CAF50, #45a049);
            z-index: 999999;
            transition: width 0.3s ease;
        `;
        document.body.appendChild(loadingBar);

        // Simulate progress
        let progress = 0;
        const progressInterval = setInterval(() => {
            progress += Math.random() * 30;
            if (progress > 90) progress = 90;
            loadingBar.style.width = progress + '%';
        }, 200);

        // Call import handler
        const result = await window.electron.pdf.importAll(company);

        clearInterval(progressInterval);
        loadingBar.style.width = '100%';

        if (result.success) {
            setTimeout(() => loadingBar.remove(), 500);
            showPdfSuccessModal('Import réussi', `Les fichiers PDF ont été importés avec succès!\n\nSauvegarde: ${result.backupPath}`);

            // Refresh PDF manager after 2 seconds
            setTimeout(() => {
                document.querySelectorAll('.custom-modal-overlay').forEach(el => el.remove());
                window.showPdfManager(company);
            }, 2000);

            console.log('✅ Import successful:', result.message);
        } else {
            loadingBar.remove();
            showPdfErrorModal('Erreur d\'import', result.error || 'Une erreur inconnue s\'est produite');
            console.error('❌ Import failed:', result.error);
        }
    } catch (error) {
        console.error('❌ Import error:', error);
        showPdfErrorModal('Erreur', 'Une erreur s\'est produite: ' + error.message);
    }
};
