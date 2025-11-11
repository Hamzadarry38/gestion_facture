// Multi Company Invoices List - Helper Functions for Bulk Operations

// Setup select all checkbox
window.setupSelectAllMulti = function() {
    const selectAllCheckbox = document.getElementById('selectAllInvoicesMulti');
    if (!selectAllCheckbox) return;
    
    selectAllCheckbox.onchange = function() {
        const checkboxes = document.querySelectorAll('.invoice-checkbox-multi');
        checkboxes.forEach(cb => cb.checked = this.checked);
        updateSelectedCountMulti();
    };
};

// Update selected count
window.updateSelectedCountMulti = function() {
    const checkedBoxes = document.querySelectorAll('.invoice-checkbox-multi:checked');
    const selectAllCheckbox = document.getElementById('selectAllInvoicesMulti');
    const allCheckboxes = document.querySelectorAll('.invoice-checkbox-multi');
    
    if (selectAllCheckbox) {
        selectAllCheckbox.checked = checkedBoxes.length === allCheckboxes.length && allCheckboxes.length > 0;
    }
    
    // Update button text with count
    const count = checkedBoxes.length;
    const deleteBtn = document.getElementById('bulkDeleteTextMulti');
    const downloadBtn = document.getElementById('bulkDownloadTextMulti');
    
    if (deleteBtn) {
        deleteBtn.textContent = count > 0 ? `Supprimer (${count})` : 'Supprimer';
    }
    if (downloadBtn) {
        downloadBtn.textContent = count > 0 ? `Télécharger (${count})` : 'Télécharger';
    }
};

// Change items per page
window.changeItemsPerPageMulti = function() {
    const select = document.getElementById('itemsPerPageMulti');
    if (!select) return;
    
    const value = select.value;
    itemsPerPageMulti = value === 'all' ? 'all' : parseInt(value);
    currentPageMulti = 1;
    displayInvoicesMulti();
};

// Update pagination
function updatePaginationMulti(totalPages) {
    const pageNumbers = document.getElementById('pageNumbersMulti');
    const prevBtn = document.getElementById('prevPageMulti');
    const nextBtn = document.getElementById('nextPageMulti');
    
    if (!pageNumbers) return;
    
    pageNumbers.innerHTML = '';
    
    // Disable/enable prev/next buttons
    if (prevBtn) prevBtn.disabled = currentPageMulti === 1;
    if (nextBtn) nextBtn.disabled = currentPageMulti === totalPages;
    
    // Show page numbers
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPageMulti - 2 && i <= currentPageMulti + 2)) {
            const pageBtn = document.createElement('button');
            pageBtn.textContent = i;
            pageBtn.style.cssText = `padding: 0.5rem 0.75rem; background: ${i === currentPageMulti ? '#667eea' : '#3e3e42'}; color: #ffffff; border: none; border-radius: 4px; cursor: pointer; transition: all 0.3s; font-weight: ${i === currentPageMulti ? '600' : '400'};`;
            pageBtn.onclick = () => {
                currentPageMulti = i;
                displayInvoicesMulti();
            };
            pageNumbers.appendChild(pageBtn);
        } else if (i === currentPageMulti - 3 || i === currentPageMulti + 3) {
            const dots = document.createElement('span');
            dots.textContent = '...';
            dots.style.cssText = 'padding: 0.5rem; color: #999;';
            pageNumbers.appendChild(dots);
        }
    }
}

// Change pagination page
window.changePaginationPageMulti = function(direction) {
    if (direction === 'prev' && currentPageMulti > 1) {
        currentPageMulti--;
    } else if (direction === 'next') {
        const totalPages = Math.ceil(filteredInvoicesMulti.length / itemsPerPageMulti);
        if (currentPageMulti < totalPages) {
            currentPageMulti++;
        }
    }
    displayInvoicesMulti();
};

// Handle bulk delete
window.handleBulkDeleteMulti = async function() {
    const checkedBoxes = document.querySelectorAll('.invoice-checkbox-multi:checked');
    
    if (checkedBoxes.length === 0) {
        window.notify.error('Erreur', 'Veuillez sélectionner au moins une facture', 3000);
        return;
    }
    
    const confirmed = await customConfirm(
        'Confirmation',
        `Êtes-vous sûr de vouloir supprimer ${checkedBoxes.length} facture(s) ?`,
        'warning'
    );
    
    if (!confirmed) return;
    
    try {
        const selectedInvoices = Array.from(checkedBoxes).map(cb => ({
            id: cb.dataset.invoiceId
        }));
        
        // Create progress modal
        const progressOverlay = document.createElement('div');
        progressOverlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.9);z-index:999999;display:flex;align-items:center;justify-content:center;';
        
        progressOverlay.innerHTML = `
            <div style="background:#2d2d30;border-radius:12px;padding:2rem;max-width:400px;width:90%;text-align:center;">
                <h3 style="color:#fff;margin:0 0 1rem 0;">Suppression en cours...</h3>
                <div style="background:#1e1e1e;border-radius:8px;height:30px;overflow:hidden;margin-bottom:1rem;">
                    <div id="progressBarMulti" style="background:#f44336;height:100%;width:0%;transition:width 0.3s;display:flex;align-items:center;justify-content:center;color:#fff;font-size:0.9rem;font-weight:600;"></div>
                </div>
                <p id="progressTextMulti" style="color:#999;margin:0;font-size:0.9rem;">Préparation...</p>
                <button id="cancelBulkDeleteMulti" style="margin-top:1rem;padding:0.5rem 1rem;background:#3e3e42;color:#fff;border:none;border-radius:6px;cursor:pointer;">Annuler</button>
            </div>
        `;
        
        document.body.appendChild(progressOverlay);
        
        const progressBar = document.getElementById('progressBarMulti');
        const progressText = document.getElementById('progressTextMulti');
        let cancelRequested = false;
        
        document.getElementById('cancelBulkDeleteMulti').onclick = () => {
            cancelRequested = true;
        };
        
        const total = selectedInvoices.length;
        let successCount = 0;
        let errorCount = 0;
        
        // Delete each invoice
        for (let i = 0; i < selectedInvoices.length; i++) {
            if (cancelRequested) {
                progressText.textContent = `Annulé après ${successCount} suppression(s)`;
                await new Promise(resolve => setTimeout(resolve, 1500));
                break;
            }
            
            const invoice = selectedInvoices[i];
            
            try {
                const result = await window.electron.dbMulti.deleteInvoice(invoice.id);
                
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
            
            await new Promise(resolve => setTimeout(resolve, 10));
        }
        
        // Remove progress modal
        document.body.removeChild(progressOverlay);
        
        // Show result
        if (successCount > 0) {
            window.notify.success('Succès', `${successCount} facture(s) supprimée(s) avec succès`, 3000);
            loadInvoicesMulti();
        }
        
        if (errorCount > 0) {
            window.notify.error('Erreur', `${errorCount} facture(s) n'ont pas pu être supprimées`, 3000);
        }
        
    } catch (error) {
        console.error('Error in bulk delete:', error);
        window.notify.error('Erreur', 'Une erreur est survenue lors de la suppression', 3000);
    }
};

// Handle bulk download
window.handleBulkDownloadMulti = function() {
    const checkedBoxes = document.querySelectorAll('.invoice-checkbox-multi:checked');
    
    if (checkedBoxes.length === 0) {
        window.notify.error('Erreur', 'Veuillez sélectionner au moins une facture', 3000);
        return;
    }
    
    showBulkDownloadModalMulti();
};

// Show bulk download modal with organization options
window.showBulkDownloadModalMulti = function() {
    const checkedBoxes = document.querySelectorAll('.invoice-checkbox-multi:checked');
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
                    align-items: center;
                    gap: 0.75rem;
                }
                .org-option:hover { 
                    border-color: #2196f3; 
                    background: #252526;
                }
                .org-option.selected { 
                    border-color: #2196f3; 
                    background: rgba(33, 150, 243, 0.1);
                }
                .org-option input[type="radio"] {
                    width: 18px;
                    height: 18px;
                    cursor: pointer;
                    accent-color: #2196f3;
                }
            </style>
            
            <div style="text-align:center;margin-bottom:1.5rem;">
                <div style="font-size:2.5rem;margin-bottom:0.5rem;">📦</div>
                <h2 style="color:#fff;margin:0;font-size:1.3rem;font-weight:600;">Organisation des fichiers</h2>
                <p style="color:#999;margin-top:0.5rem;font-size:0.9rem;">${selectedIds.length} facture(s) sélectionnée(s)</p>
            </div>
            
            <div style="flex:1;overflow-y:auto;margin-bottom:1rem;">
                <label class="org-option" onclick="selectOrganizationMulti(this, 'client-month-type')">
                    <input type="radio" name="organization" value="client-month-type">
                    <div class="org-option-content">
                        <strong style="color:#fff;display:block;margin-bottom:0.25rem;">Par Client → Mois → Type</strong>
                        <div style="color:#999;font-size:0.85rem;">📁 THETA_Group/ → 📁 2025-10/ → 📁 Facture/ → 📄 Facture_MTT1.pdf</div>
                    </div>
                </label>
                
                <label class="org-option" onclick="selectOrganizationMulti(this, 'client-type-month')">
                    <input type="radio" name="organization" value="client-type-month">
                    <div class="org-option-content">
                        <strong style="color:#fff;display:block;margin-bottom:0.25rem;">Par Client → Type → Mois</strong>
                        <div style="color:#999;font-size:0.85rem;">📁 THETA_Group/ → 📁 Facture/ → 📁 2025-10/ → 📄 Facture_MTT1.pdf</div>
                    </div>
                </label>
                
                <label class="org-option" onclick="selectOrganizationMulti(this, 'type-month-client')">
                    <input type="radio" name="organization" value="type-month-client">
                    <div class="org-option-content">
                        <strong style="color:#fff;display:block;margin-bottom:0.25rem;">Par Type → Mois → Client</strong>
                        <div style="color:#999;font-size:0.85rem;">📁 Facture/ → 📁 2025-10/ → 📁 THETA_Group/ → 📄 Facture_MTT1.pdf</div>
                    </div>
                </label>
                
                <label class="org-option" onclick="selectOrganizationMulti(this, 'type-client-month')">
                    <input type="radio" name="organization" value="type-client-month">
                    <div class="org-option-content">
                        <strong style="color:#fff;display:block;margin-bottom:0.25rem;">Par Type → Client → Mois</strong>
                        <div style="color:#999;font-size:0.85rem;">📁 Facture/ → 📁 THETA_Group/ → 📁 2025-10/ → 📄 Facture_MTT1.pdf</div>
                    </div>
                </label>
                
                <label class="org-option" onclick="selectOrganizationMulti(this, 'month-type-client')">
                    <input type="radio" name="organization" value="month-type-client">
                    <div class="org-option-content">
                        <strong style="color:#fff;display:block;margin-bottom:0.25rem;">Par Mois → Type → Client</strong>
                        <div style="color:#999;font-size:0.85rem;">📁 2025-10/ → 📁 Facture/ → 📁 THETA_Group/ → 📄 Facture_MTT1.pdf</div>
                    </div>
                </label>
                
                <label class="org-option" onclick="selectOrganizationMulti(this, 'month-client-type')">
                    <input type="radio" name="organization" value="month-client-type">
                    <div class="org-option-content">
                        <strong style="color:#fff;display:block;margin-bottom:0.25rem;">Par Mois → Client → Type</strong>
                        <div style="color:#999;font-size:0.85rem;">📁 2025-10/ → 📁 THETA_Group/ → 📁 Facture/ → 📄 Facture_MTT1.pdf</div>
                    </div>
                </label>
                
                <label class="org-option" onclick="selectOrganizationMulti(this, 'flat')">
                    <input type="radio" name="organization" value="flat" checked>
                    <div class="org-option-content">
                        <strong style="color:#fff;display:block;margin-bottom:0.25rem;">Tout dans un dossier</strong>
                        <div style="color:#999;font-size:0.85rem;">📁 Factures/ → 📄 Facture_MTT1_THETA_Group.pdf</div>
                    </div>
                </label>
            </div>
            
            <div style="display:flex;gap:1rem;flex-shrink:0;margin-top:1rem;">
                <button onclick="this.closest('.modal-overlay').remove()" 
                        style="flex:1;padding:0.75rem;background:#3e3e42;color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:1rem;font-weight:600;transition:all 0.3s;"
                        onmouseover="this.style.background='#4e4e52'" onmouseout="this.style.background='#3e3e42'">
                    Annuler
                </button>
                <button id="bulkDownloadConfirmBtnMulti"
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
    document.getElementById('bulkDownloadConfirmBtnMulti').onclick = () => {
        const organizationType = document.querySelector('input[name="organization"]:checked').value;
        overlay.remove();
        showOrderSelectionModalBeforeDownloadMulti(selectedIds, organizationType);
    };
};

// Select organization option
window.selectOrganizationMulti = function(element, value) {
    document.querySelectorAll('.org-option').forEach(opt => opt.classList.remove('selected'));
    element.classList.add('selected');
    element.querySelector('input').checked = true;
};

// Show Order selection modal before download
window.showOrderSelectionModalBeforeDownloadMulti = function(selectedIds, organizationType) {
    const selectionOverlay = document.createElement('div');
    selectionOverlay.className = 'custom-modal-overlay';
    selectionOverlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.95);z-index:10000;display:flex;align-items:center;justify-content:center;';
    
    selectionOverlay.innerHTML = `
        <div class="custom-modal">
            <div class="custom-modal-header">
                <span class="custom-modal-icon info">📋</span>
                <h3 class="custom-modal-title">Options d'affichage PDF</h3>
            </div>
            <div class="custom-modal-body">
                <p style="margin-bottom:1.25rem;color:#e0e0e0;font-size:0.95rem;">Choisissez les informations à afficher dans les PDFs:</p>
                <label style="display:flex;align-items:center;cursor:pointer;padding:1rem;background:#1e1e1e;border:2px solid #2196F3;border-radius:10px;transition:all 0.2s ease;">
                    <input type="checkbox" id="includeOrderCheckboxDownloadMulti" checked style="width:20px;height:20px;margin-right:1rem;cursor:pointer;accent-color:#2196F3;">
                    <span style="font-size:0.95rem;color:#e0e0e0;font-weight:500;">
                        Afficher les N° Order dans les PDFs
                    </span>
                </label>
            </div>
            <div class="custom-modal-footer">
                <button class="custom-modal-btn primary" id="continueBtnDownloadMulti" style="padding:0.75rem 2rem;font-size:1rem;">Télécharger</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(selectionOverlay);
    
    const orderCheckbox = selectionOverlay.querySelector('#includeOrderCheckboxDownloadMulti');
    const continueBtn = selectionOverlay.querySelector('#continueBtnDownloadMulti');
    
    continueBtn.addEventListener('click', async () => {
        const includeOrder = orderCheckbox.checked;
        
        console.log('✅ [MULTI DOWNLOAD] Include Order:', includeOrder);
        
        selectionOverlay.remove();
        
        await startBulkDownloadMulti(selectedIds, organizationType, includeOrder);
    });
    
    selectionOverlay.addEventListener('click', (e) => {
        if (e.target === selectionOverlay) {
            const includeOrder = orderCheckbox.checked;
            selectionOverlay.remove();
            startBulkDownloadMulti(selectedIds, organizationType, includeOrder);
        }
    });
    
    setTimeout(() => continueBtn.focus(), 100);
};

// Load JSZip library
async function loadJSZipMulti() {
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

// Start bulk download
window.startBulkDownloadMulti = async function(selectedIds, organizationType, includeOrder = true) {
    try {
        window.notify.info('Téléchargement', 'Préparation du téléchargement...', 2000);
        
        // Load JSZip if not already loaded
        await loadJSZipMulti();
        
        const zip = new JSZip();
        const folderName = `Factures_Multi_${new Date().toISOString().split('T')[0]}`;
        
        let successCount = 0;
        
        for (const id of selectedIds) {
            try {
                const result = await window.electron.dbMulti.getInvoiceById(id);
                
                if (!result.success || !result.data) continue;
                
                const invoice = result.data;
                
                // Generate PDF using existing function with includeOrder parameter
                const pdfBlob = await generatePDFBlobMulti(invoice, includeOrder);
                
                // Organize files
                const date = new Date(invoice.document_date);
                const yearMonth = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
                const clientName = invoice.client_nom.replace(/[^a-z0-9]/gi, '_');
                const numero = (invoice.document_numero || invoice.document_numero_devis || 'N').replace(/[^a-z0-9]/gi, '_');
                
                let docType = 'Factures';
                let docPrefix = 'Facture';
                if (invoice.document_type === 'devis') {
                    docType = 'Devis';
                    docPrefix = 'Devis';
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
            } catch (error) {
                console.error(`Error generating PDF for invoice ${id}:`, error);
            }
        }
        
        // Generate and download ZIP
        window.notify.info('Téléchargement', 'Création du fichier ZIP...', 3000);
        const zipBlob = await zip.generateAsync({ type: 'blob' });
        
        // Download ZIP file
        const link = document.createElement('a');
        link.href = URL.createObjectURL(zipBlob);
        link.download = `${folderName}.zip`;
        link.click();
        URL.revokeObjectURL(link.href);
        
        window.notify.success('Succès', `${successCount} PDF(s) téléchargé(s) dans ${folderName}.zip`, 4000);
        
        // Uncheck all checkboxes
        document.querySelectorAll('.invoice-checkbox-multi').forEach(cb => cb.checked = false);
        const selectAllCheckbox = document.getElementById('selectAllInvoicesMulti');
        if (selectAllCheckbox) selectAllCheckbox.checked = false;
        updateSelectedCountMulti();
        
    } catch (error) {
        console.error('Error in bulk download:', error);
        window.notify.error('Erreur', 'Erreur lors du téléchargement: ' + error.message, 5000);
    }
};

// Export database for MULTI
window.exportDatabaseMulti = async function() {
    try {
        window.notify.info('Export', 'Exportation en cours...', 2000);
        const result = await window.electron.dbMulti.exportDatabase();
        
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

// Import database for MULTI
window.importDatabaseMulti = async function() {
    const confirmed = await customConfirm('Attention', '⚠️ ATTENTION: L\'importation remplacera toutes les données actuelles.\n\nUne sauvegarde automatique sera créée.\n\nVoulez-vous continuer?', 'warning');
    
    if (!confirmed) return;
    
    try {
        window.notify.info('Import', 'Importation en cours...', 2000);
        const result = await window.electron.dbMulti.importDatabase();
        
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
};

// Convert number to French words for PDF
function numberToFrenchWordsMultiHelper(number) {
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
        
        if (n >= 1000000000) {
            const billion = Math.floor(n / 1000000000);
            const remainder = n % 1000000000;
            let result = billion === 1 ? 'un milliard' : convertLessThanThousand(billion) + ' milliards';
            if (remainder > 0) result += ' ' + convertNumber(remainder);
            return result;
        }
        
        if (n >= 1000000) {
            const million = Math.floor(n / 1000000);
            const remainder = n % 1000000;
            let result = million === 1 ? 'un million' : convertLessThanThousand(million) + ' millions';
            if (remainder > 0) result += ' ' + convertNumber(remainder);
            return result;
        }
        
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

// Generate PDF Blob for an invoice (full MULTI TRAVAUX TETOUAN design)
async function generatePDFBlobMulti(invoice, includeOrder = true) {
    // Check if jsPDF is loaded
    if (typeof window.jspdf === 'undefined') {
        await new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }
    
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Colors - MULTI TRAVAUX TETOUAN design
    const darkGrayColor = [96, 125, 139];
    const lightGrayBg = [236, 239, 241];
    const dateStr = new Date(invoice.document_date).toLocaleDateString('fr-FR');
    
    // Helper function to format numbers
    const formatNumberForPDF = (num) => {
        return parseFloat(num).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    };
    
    // Function to add header
    const addHeader = (isFirstPage = true) => {
        doc.setFontSize(18);
        doc.setTextColor(96, 125, 139);
        doc.setFont(undefined, 'bold');
        doc.text('MULTI TRAVAUX TETOUAN', 15, 18);
        
        doc.setFontSize(18);
        doc.setFont(undefined, 'bold');
        const docType = invoice.document_type === 'devis' ? 'DEVIS' : 'FACTURE';
        doc.text(docType, 195, 18, { align: 'right' });
        doc.setLineWidth(0.5);
        doc.line(195 - doc.getTextWidth(docType), 19, 195, 19);
        
        doc.setFontSize(9);
        doc.setFont(undefined, 'normal');
        doc.setTextColor(0, 0, 0);
        if (invoice.document_type === 'devis') {
            doc.text(`Numéro de devis : ${invoice.document_numero_devis || '-'}`, 195, 26, { align: 'right' });
            doc.text(`Date de devis : ${dateStr}`, 195, 31, { align: 'right' });
        } else {
            doc.text(`Numéro de facture : ${invoice.document_numero || '-'}`, 195, 26, { align: 'right' });
            
            // Add Order number on new line below invoice number if exists and includeOrder is true
            if (includeOrder && invoice.document_numero_Order && invoice.document_numero_Order.trim() !== '') {
                doc.text(`N° Order : ${invoice.document_numero_Order}`, 195, 31, { align: 'right' });
                doc.text(`Date de facture : ${dateStr}`, 195, 36, { align: 'right' });
            } else {
                doc.text(`Date de facture : ${dateStr}`, 195, 31, { align: 'right' });
            }
        }
        
        doc.setFillColor(...darkGrayColor);
        doc.rect(15, 38, 80, 6, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(8);
        doc.text('Email: multitravauxtetouan@gmail.com', 17, 42);
        
        doc.setFillColor(...lightGrayBg);
        doc.rect(15, 44, 80, 6, 'F');
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(7);
        doc.text('AV 10 MAI IMM 04 APPART 01 A DROIT - TETOUAN , TETOUAN', 17, 48);
        
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
    
    // Function to add footer
    const addFooter = (pageNum, totalPages) => {
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(9);
        doc.setFont(undefined, 'normal');
        doc.text('NIF 68717422 | TP 51001343 | RC 38633 | CNSS 6446237', 105, 280, { align: 'center' });
        doc.text('ICE : 00380950500031', 105, 286, { align: 'center' });
    };
    
    // Add header to first page
    addHeader(true);
    
    const startY = 60;
    
    // Table Header
    doc.setFillColor(...darkGrayColor);
    doc.rect(15, startY, 180, 7, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(9);
    doc.setFont(undefined, 'bold');
    doc.text('Description', 18, startY + 5);
    doc.text('Quantité', 125, startY + 5, { align: 'center' });
    doc.text('Prix unitaire HT', 160, startY + 5, { align: 'right' });
    doc.text('Prix total HT', 188, startY + 5, { align: 'right' });
    
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
        
        if (currentY + rowHeight > 220) {
            pages.push(pageCount);
            doc.addPage();
            addHeader(false);
            pageCount++;
            
            let newStartY = 60;
            doc.setFillColor(...darkGrayColor);
            doc.rect(15, newStartY, 180, 7, 'F');
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(9);
            doc.setFont(undefined, 'bold');
            doc.text('Description', 18, newStartY + 5);
            doc.text('Quantité', 115, newStartY + 5, { align: 'center' });
            doc.text('Prix unitaire HT', 150, newStartY + 5, { align: 'right' });
            doc.text('Prix total HT', 188, newStartY + 5, { align: 'right' });
            
            currentY = newStartY + 10;
            doc.setTextColor(0, 0, 0);
            doc.setFont(undefined, 'normal');
            doc.setFontSize(9);
        }
        
        if (index % 2 === 0) {
            doc.setFillColor(245, 245, 245);
            doc.rect(15, currentY - 3, 180, rowHeight, 'F');
        }
        
        doc.setFontSize(7.5);
        lines.forEach((line, lineIndex) => {
            doc.text(line, 18, currentY + 3 + (lineIndex * 4.5));
        });
        
        const centerOffset = (lines.length > 1) ? ((lines.length - 1) * 2.25) : 0;
        
        doc.setFontSize(8);
        doc.text(String(product.quantite || ''), 125, currentY + 3 + centerOffset, { align: 'center' });
        
        doc.setFontSize(7.5);
        doc.text(`${formatNumberForPDF(product.prix_unitaire_ht)} DH`, 160, currentY + 3 + centerOffset, { align: 'right' });
        doc.text(`${formatNumberForPDF(product.total_ht)} DH`, 188, currentY + 3 + centerOffset, { align: 'right' });
        
        currentY += rowHeight;
    });
    
    // Fixed position for Remarques and Totals
    const fixedBottomY = 235;
    
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
    doc.text('ATTIJARI WAFA BANQ', 17, fixedBottomY + 10);
    doc.text('RIB : 007 720 0005979000000953 03', 17, fixedBottomY + 15);
    
    doc.setFillColor(...darkGrayColor);
    doc.rect(110, fixedBottomY, 85, 6, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(9);
    doc.setFont(undefined, 'bold');
    doc.text('TOTALE HT', 113, fixedBottomY + 4);
    doc.text(`${formatNumberForPDF(invoice.total_ht)} DH`, 192, fixedBottomY + 4, { align: 'right' });
    
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
    doc.text('TOTALE TTC', 113, fixedBottomY + 16);
    doc.text(`${formatNumberForPDF(invoice.total_ttc)} DH`, 192, fixedBottomY + 16, { align: 'right' });
    
    // Amount in words
    const amountInWords = numberToFrenchWordsMultiHelper(invoice.total_ttc);
    
    // Determine document type
    let documentLabel = 'Facture';
    let genderPrefix = 'La Présente';
    let genderSuffix = 'Arrêtée';
    
    if (invoice.document_type === 'devis') {
        documentLabel = 'Devis';
        genderPrefix = 'Le Présent';
        genderSuffix = 'Arrêté';
    }
    
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(9);
    doc.setFont(undefined, 'italic');
    doc.text(`${genderPrefix} ${documentLabel} est ${genderSuffix} à la somme de : ${amountInWords}`, 15, fixedBottomY + 25, { maxWidth: 180 });
    
    // Add page numbering
    pages.push(pageCount);
    const totalPages = pages.length;
    
    for (let i = 0; i < totalPages; i++) {
        doc.setPage(i + 1);
        addFooter(i + 1, totalPages);
    }
    
    return doc.output('blob');
}
