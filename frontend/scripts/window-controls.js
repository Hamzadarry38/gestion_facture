// Window Controls Handler
document.addEventListener('click', (e) => {
    // Reload button
    if (e.target.closest('.control-btn.reload')) {
        location.reload();
    }
    
    // Minimize button
    if (e.target.closest('.control-btn.minimize')) {
        window.electron.minimize();
    }
    
    // Maximize/Restore button
    if (e.target.closest('.control-btn.maximize')) {
        window.electron.maximize();
    }
    
    // Close button
    if (e.target.closest('.control-btn.close')) {
        window.electron.close();
    }
});
