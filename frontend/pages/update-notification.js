// Update Notification Component
// Beautiful modern update notification UI

const translations = {
    ar: {
        updateAvailable: 'تحديث جديد متوفر',
        newVersion: 'إصدار جديد',
        currentVersion: 'الإصدار الحالي',
        downloadNow: 'تنزيل الآن',
        later: 'لاحقاً',
        downloading: 'جاري التنزيل',
        updateReady: 'التحديث جاهز',
        restartNow: 'إعادة التشغيل الآن',
        updateMessage: 'يتوفر إصدار جديد من التطبيق. هل تريد تنزيله الآن؟',
        downloadComplete: 'تم تنزيل التحديث بنجاح. انقر لإعادة التشغيل وتثبيت التحديث.',
        whatsNew: 'ما الجديد'
    },
    en: {
        updateAvailable: 'Update Available',
        newVersion: 'New Version',
        currentVersion: 'Current Version',
        downloadNow: 'Download Now',
        later: 'Later',
        downloading: 'Downloading',
        updateReady: 'Update Ready',
        restartNow: 'Restart Now',
        updateMessage: 'A new version of the app is available. Would you like to download it now?',
        downloadComplete: 'Update downloaded successfully. Click to restart and install the update.',
        whatsNew: 'What\'s New'
    },
    fr: {
        updateAvailable: 'Mise à jour disponible',
        newVersion: 'Nouvelle version',
        currentVersion: 'Version actuelle',
        downloadNow: 'Télécharger maintenant',
        later: 'Plus tard',
        downloading: 'Téléchargement',
        updateReady: 'Mise à jour prête',
        restartNow: 'Redémarrer maintenant',
        updateMessage: 'Une nouvelle version de l\'application est disponible. Voulez-vous la télécharger maintenant?',
        downloadComplete: 'Mise à jour téléchargée avec succès. Cliquez pour redémarrer et installer la mise à jour.',
        whatsNew: 'Nouveautés'
    }
};

let currentLanguage = localStorage.getItem('language') || 'ar';

function getTranslation(key) {
    return translations[currentLanguage][key] || translations['en'][key];
}

async function showUpdateNotification(updateInfo) {
    // Load changelog
    let changelogHtml = '';
    try {
        const response = await fetch('./changelog.json');
        const changelog = await response.json();
        const versionChanges = changelog[updateInfo.version];
        
        if (versionChanges) {
            const changes = versionChanges[currentLanguage] || versionChanges['en'];
            changelogHtml = `
                <div class="whats-new">
                    <h3>${getTranslation('whatsNew')}</h3>
                    <ul class="changelog-list">
                        ${changes.map(change => `<li>${change}</li>`).join('')}
                    </ul>
                </div>
            `;
        }
    } catch (error) {
        console.log('Could not load changelog:', error);
    }
    
    const overlay = document.createElement('div');
    overlay.className = 'update-overlay';
    overlay.innerHTML = `
        <div class="update-modal">
            <div class="update-header">
                <div class="update-icon">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                <h2>${getTranslation('updateAvailable')}</h2>
            </div>
            
            <div class="update-body">
                <div class="version-info">
                    <div class="version-box current">
                        <span class="version-label">${getTranslation('currentVersion')}</span>
                        <span class="version-number">v${updateInfo.currentVersion}</span>
                    </div>
                    <div class="version-arrow">→</div>
                    <div class="version-box new">
                        <span class="version-label">${getTranslation('newVersion')}</span>
                        <span class="version-number">v${updateInfo.version}</span>
                    </div>
                </div>
                
                ${changelogHtml}
                
                <p class="update-message">${getTranslation('updateMessage')}</p>
            </div>
            
            <div class="update-footer">
                <button class="btn-secondary" onclick="closeUpdateNotification()">
                    ${getTranslation('later')}
                </button>
                <button class="btn-primary" onclick="downloadUpdate()">
                    ${getTranslation('downloadNow')}
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(overlay);
    
    // Store update info globally
    window.updateInfo = updateInfo;
}

function showDownloadProgress(progress) {
    const modal = document.querySelector('.update-modal');
    if (!modal) return;
    
    modal.innerHTML = `
        <div class="update-header">
            <div class="update-icon downloading">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                    <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M7 10L12 15L17 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M12 15V3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
            <h2>${getTranslation('downloading')}</h2>
        </div>
        
        <div class="update-body">
            <div class="progress-container">
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${progress}%"></div>
                </div>
                <div class="progress-text">${Math.round(progress)}%</div>
            </div>
        </div>
    `;
}

async function showUpdateReady(updateInfo) {
    // Load changelog
    let changelogHtml = '';
    try {
        const response = await fetch('./changelog.json');
        const changelog = await response.json();
        const versionChanges = changelog[updateInfo.version];
        
        if (versionChanges) {
            const changes = versionChanges[currentLanguage] || versionChanges['en'];
            changelogHtml = `
                <div class="whats-new">
                    <h3>${getTranslation('whatsNew')}</h3>
                    <ul class="changelog-list">
                        ${changes.map(change => `<li>${change}</li>`).join('')}
                    </ul>
                </div>
            `;
        }
    } catch (error) {
        console.log('Could not load changelog:', error);
    }
    
    const modal = document.querySelector('.update-modal');
    if (!modal) return;
    
    modal.innerHTML = `
        <div class="update-header success">
            <div class="update-icon success">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                    <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.7088 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.76489 14.1003 1.98232 16.07 2.86" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M22 4L12 14.01L9 11.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
            <h2>${getTranslation('updateReady')}</h2>
        </div>
        
        <div class="update-body">
            <p class="update-message success">${getTranslation('downloadComplete')}</p>
            
            ${changelogHtml}
        </div>
        
        <div class="update-footer">
            <button class="btn-secondary" onclick="closeUpdateNotification()">
                ${getTranslation('later')}
            </button>
            <button class="btn-primary" onclick="restartApp()">
                ${getTranslation('restartNow')}
            </button>
        </div>
    `;
}

function closeUpdateNotification() {
    const overlay = document.querySelector('.update-overlay');
    if (overlay) {
        overlay.classList.add('fade-out');
        setTimeout(() => overlay.remove(), 300);
    }
}

function downloadUpdate() {
    if (window.electron && window.electron.updater) {
        // Show download progress immediately
        showDownloadProgress(0);
        // Start download
        window.electron.updater.downloadUpdate();
    }
}

function restartApp() {
    if (window.electron && window.electron.updater) {
        window.electron.updater.installUpdate();
    }
}

// Listen for update events
if (window.electron && window.electron.updater) {
    // Update available
    window.electron.updater.onUpdateAvailable((updateInfo) => {
        showUpdateNotification(updateInfo);
    });
    
    // Download progress
    window.electron.updater.onDownloadProgress((percent) => {
        showDownloadProgress(percent);
    });
    
    // Update downloaded
    window.electron.updater.onUpdateDownloaded((updateInfo) => {
        showUpdateReady(updateInfo);
    });
}

// Export functions for use in updater.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showUpdateNotification,
        showDownloadProgress,
        showUpdateReady,
        closeUpdateNotification
    };
}
