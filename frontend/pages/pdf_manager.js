// PDF Manager - Display and manage saved PDF files
window.showPdfManager = async function(company) {
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
        
        const files = result.files || [];
        
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
        
        modal.innerHTML = `
            <div class="custom-modal-header">
                <span class="custom-modal-icon info">📁</span>
                <h3 class="custom-modal-title">Fichiers PDF Sauvegardés - ${company.toUpperCase()}</h3>
            </div>
            
            <div style="padding: 2rem; flex: 1; overflow-y: auto;">
                ${files.length === 0 ? `
                    <div style="text-align: center; padding: 4rem 2rem; color: #999;">
                        <p style="font-size: 1.5rem;">📭 Aucun fichier PDF sauvegardé</p>
                    </div>
                ` : `
                    <div style="display: grid; gap: 1.5rem;">
                        ${files.map((file, index) => `
                            <div style="
                                background: #2d2d30;
                                border: 2px solid #3e3e42;
                                border-radius: 8px;
                                padding: 1.5rem;
                                display: flex;
                                justify-content: space-between;
                                align-items: center;
                                transition: all 0.2s;
                                hover: border-color: #0078d4;
                            ">
                                <div style="flex: 1;">
                                    <div style="color: #fff; font-weight: 600; margin-bottom: 0.5rem;">
                                        📄 ${file.name}
                                    </div>
                                    <div style="color: #999; font-size: 0.9rem;">
                                        <div style="margin-bottom: 0.5rem;">
                                            <span style="background: #0078d4; color: #fff; padding: 0.3rem 0.8rem; border-radius: 4px; font-weight: 600;">
                                                🏢 ${company.toUpperCase()}
                                            </span>
                                        </div>
                                        <div>📦 Taille: ${(file.size / 1024).toFixed(2)} KB</div>
                                        <div>📅 Date: ${new Date(file.created).toLocaleString('fr-FR')}</div>
                                        <div style="margin-top: 0.5rem; padding-top: 0.5rem; border-top: 1px solid #3e3e42;">
                                            <span style="background: #28a745; color: #fff; padding: 0.3rem 0.8rem; border-radius: 4px; font-weight: 600; font-size: 0.85rem;">
                                                👤 Créé par: ${file.creator || 'Inconnu'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div style="display: flex; gap: 0.5rem;">
                                    <button onclick="openPdfFile('${file.path.replace(/\\/g, '\\\\')}')" 
                                            style="
                                                padding: 0.6rem 1rem;
                                                background: #4CAF50;
                                                color: #fff;
                                                border: none;
                                                border-radius: 6px;
                                                cursor: pointer;
                                                font-size: 0.9rem;
                                                font-weight: 600;
                                                transition: all 0.2s;
                                            "
                                            onmouseover="this.style.background='#45a049'"
                                            onmouseout="this.style.background='#4CAF50'">
                                        Ouvrir
                                    </button>
                                    <button id="deleteBtn_${index}_${Date.now()}" 
                                            data-filepath="${file.path.replace(/\\/g, '\\\\')}"
                                            style="
                                                padding: 0.6rem 1rem;
                                                background: #f44336;
                                                color: #fff;
                                                border: none;
                                                border-radius: 6px;
                                                cursor: pointer;
                                                font-size: 0.9rem;
                                                font-weight: 600;
                                                transition: all 0.2s;
                                            "
                                            onmouseover="this.style.background='#da190b'"
                                            onmouseout="this.style.background='#f44336'">
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
                justify-content: flex-end;
                background: #1e1e1e;
            ">
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
        }, 0);
        
        overlay.onclick = (e) => {
            if (e.target === overlay) {
                overlay.remove();
            }
        };
        
        modal.onclick = (e) => e.stopPropagation();
        
    } catch (error) {
        console.error('❌ Error opening PDF manager:', error);
        showPdfErrorModal('خطأ', 'حدث خطأ: ' + error.message);
    }
};

// Open PDF file
window.openPdfFile = async function(filePath) {
    try {
        const result = await window.electron.pdf.openPdf(filePath);
        
        if (!result.success) {
            showPdfErrorModal('خطأ', 'فشل في فتح الملف: ' + result.error);
        }
    } catch (error) {
        showPdfErrorModal('خطأ', 'حدث خطأ: ' + error.message);
    }
};

// Delete PDF file
window.deletePdfFile = async function(filePath, index) {
    try {
        // Show custom confirmation modal instead of browser confirm
        const confirmed = await showDeleteConfirmModal('حذف الملف', 'هل أنت متأكد من حذف هذا الملف؟\n\nهذا الإجراء لا يمكن التراجع عنه.');
        
        if (!confirmed) {
            return;
        }
        
        const result = await window.electron.pdf.deletePdf(filePath);
        
        if (result.success) {
            // Show loading bar during refresh
            showDeleteLoadingBar();
            showPdfSuccessModal('تم', 'تم حذف الملف بنجاح');
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
            showPdfErrorModal('خطأ', 'فشل في حذف الملف: ' + result.error);
        }
    } catch (error) {
        showPdfErrorModal('خطأ', 'حدث خطأ: ' + error.message);
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
                حسناً
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
                حسناً
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
function showDeleteConfirmModal(title, message) {
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
            <div class="custom-modal-header" style="background: linear-gradient(135deg, #f44336, #da190b);">
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
                    ✓ حذف
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
                    ✕ إلغاء
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
