const { autoUpdater } = require('electron-updater');
const { dialog } = require('electron');
const log = require('electron-log');

// Configure logging
log.transports.file.level = 'info';
autoUpdater.logger = log;

// Configure auto-updater
autoUpdater.autoDownload = false;
autoUpdater.autoInstallOnAppQuit = true;

// Force dev update config only in development (not packaged)
const { app } = require('electron');
if (!app.isPackaged) {
    autoUpdater.forceDevUpdateConfig = true;
    log.info('Development mode: forcing update config');
}

// Translations
const translations = {
    ar: {
        updateAvailable: 'تحديث جديد متوفر',
        updateAvailableMessage: 'يتوفر إصدار جديد. هل تريد تنزيله الآن؟',
        downloadingUpdate: 'جاري تنزيل التحديث...',
        updateDownloaded: 'تم تنزيل التحديث',
        updateDownloadedMessage: 'تم تنزيل التحديث بنجاح. سيتم تثبيته عند إعادة تشغيل التطبيق.',
        restartNow: 'إعادة التشغيل الآن',
        later: 'لاحقاً',
        yes: 'نعم',
        no: 'لا',
        error: 'خطأ',
        updateError: 'حدث خطأ أثناء التحديث'
    },
    en: {
        updateAvailable: 'Update Available',
        updateAvailableMessage: 'A new version is available. Do you want to download it now?',
        downloadingUpdate: 'Downloading update...',
        updateDownloaded: 'Update Downloaded',
        updateDownloadedMessage: 'Update has been downloaded successfully. It will be installed on restart.',
        restartNow: 'Restart Now',
        later: 'Later',
        yes: 'Yes',
        no: 'No',
        error: 'Error',
        updateError: 'An error occurred during update'
    },
    fr: {
        updateAvailable: 'Mise à jour disponible',
        updateAvailableMessage: 'Une nouvelle version est disponible. Voulez-vous la télécharger maintenant?',
        downloadingUpdate: 'Téléchargement de la mise à jour...',
        updateDownloaded: 'Mise à jour téléchargée',
        updateDownloadedMessage: 'La mise à jour a été téléchargée avec succès. Elle sera installée au redémarrage.',
        restartNow: 'Redémarrer maintenant',
        later: 'Plus tard',
        yes: 'Oui',
        no: 'Non',
        error: 'Erreur',
        updateError: 'Une erreur s\'est produite lors de la mise à jour'
    }
};

let currentLanguage = 'ar'; // Default language

function setLanguage(lang) {
    if (translations[lang]) {
        currentLanguage = lang;
    }
}

function getTranslation(key) {
    return translations[currentLanguage][key] || translations['en'][key];
}

// Auto-updater event handlers
autoUpdater.on('checking-for-update', () => {
    log.info('✓ Checking for updates...');
    console.log('✓ Checking for updates...');
});

autoUpdater.on('update-available', (info) => {
    log.info('✓ Update available:', info);
    console.log('✓ Update available:', info);
    
    // Send to renderer process to show beautiful notification
    const { BrowserWindow } = require('electron');
    const mainWindow = BrowserWindow.getAllWindows()[0];
    if (mainWindow) {
        mainWindow.webContents.send('update-available', {
            version: info.version,
            currentVersion: require('./package.json').version
        });
    }
});

autoUpdater.on('update-not-available', (info) => {
    log.info('✗ Update not available:', info);
    console.log('✗ No updates found. Current version is the latest.', info);
});

autoUpdater.on('error', (err) => {
    log.error('✗ Error in auto-updater:', err);
    console.error('✗ Update Error:', err.message);
    console.error('Full error:', err);
    // Don't show dialog for update errors - it blocks app startup
    // Only log silently
});

autoUpdater.on('download-progress', (progressObj) => {
    let message = getTranslation('downloadingUpdate');
    message += '\n' + Math.round(progressObj.percent) + '%';
    log.info(message);
    console.log(`⬇ Downloading: ${Math.round(progressObj.percent)}%`);
    
    // Send progress to renderer
    const { BrowserWindow } = require('electron');
    const mainWindow = BrowserWindow.getAllWindows()[0];
    if (mainWindow) {
        mainWindow.webContents.send('download-progress', Math.round(progressObj.percent));
    }
});

autoUpdater.on('update-downloaded', (info) => {
    log.info('✓ Update downloaded:', info);
    console.log('✓ Update downloaded successfully!');
    
    // Send to renderer process with version info
    const { BrowserWindow } = require('electron');
    const mainWindow = BrowserWindow.getAllWindows()[0];
    if (mainWindow) {
        mainWindow.webContents.send('update-downloaded', {
            version: info.version,
            currentVersion: require('./package.json').version
        });
    }
});

// Check for updates
function checkForUpdates() {
    console.log('🔍 Starting update check...');
    console.log('Repository: Hamzadarry38/gestion_facture');
    console.log('Current version:', require('./package.json').version);
    console.log('Feed URL:', autoUpdater.getFeedURL());
    
    autoUpdater.checkForUpdates()
        .then((result) => {
            console.log('Check result:', result);
        })
        .catch((error) => {
            console.error('Check failed:', error);
        });
}

// Check for updates on app start (after 3 seconds)
function initAutoUpdater() {
    console.log('⏰ Auto-updater initialized. Will check for updates in 3 seconds...');
    setTimeout(() => {
        checkForUpdates();
    }, 3000);
}

module.exports = {
    initAutoUpdater,
    checkForUpdates,
    setLanguage
};
