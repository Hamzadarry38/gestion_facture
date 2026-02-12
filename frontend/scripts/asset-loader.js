// Asset Loader - Automatically loads images from assets folder
// This ensures images work in both development and production builds

async function loadAssets() {
    // Check if electron API is available
    if (!window.electron || !window.electron.getAssetPath) {
        console.error('❌ Asset Loader: window.electron.getAssetPath is not available!');
        return;
    }
    
    // Find all images with src starting with "assets/"
    const images = document.querySelectorAll('img[src^="assets/"]');
    
    console.log(`🖼️ Asset Loader: Found ${images.length} images to load`);
    
    for (const img of images) {
        const originalSrc = img.getAttribute('src');
        
        // Skip if already loaded (data URL)
        if (originalSrc && originalSrc.startsWith('data:')) {
            console.log(`⏭️ Asset Loader: Skipping already loaded ${originalSrc.substring(0, 30)}...`);
            continue;
        }
        
        try {
            console.log(`🔄 Asset Loader: Loading ${originalSrc}...`);
            
            // Get the base64 data URL from main process
            const dataUrl = await window.electron.getAssetPath(originalSrc);
            
            if (dataUrl) {
                img.src = dataUrl;
                console.log(`✅ Asset Loader: Successfully loaded ${originalSrc}`);
            } else {
                console.warn(`⚠️ Asset Loader: No data returned for ${originalSrc}`);
            }
        } catch (error) {
            console.error(`❌ Asset Loader: Error loading ${originalSrc}:`, error);
        }
    }
    
    console.log('✅ Asset Loader: Finished loading all assets');
}

// Expose function globally for router
window.loadAssetsNow = loadAssets;

// Load assets when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadAssets);
} else {
    loadAssets();
}

// Also load assets when navigating (for SPA)
window.addEventListener('load', () => {
    // Create a MutationObserver to watch for new images
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === 1) { // Element node
                    // Check if the node itself is an image
                    if (node.tagName === 'IMG' && node.getAttribute('src')?.startsWith('assets/')) {
                        loadSingleAsset(node);
                    }
                    // Check for images within the node
                    const images = node.querySelectorAll?.('img[src^="assets/"]');
                    if (images) {
                        images.forEach(img => loadSingleAsset(img));
                    }
                }
            });
        });
    });

    // Start observing
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
});

// Helper function to load a single asset
async function loadSingleAsset(img) {
    const originalSrc = img.getAttribute('src');
    
    // Skip if already loaded (data URL)
    if (originalSrc.startsWith('data:')) {
        return;
    }
    
    try {
        const dataUrl = await window.electron.getAssetPath(originalSrc);
        
        if (dataUrl) {
            img.src = dataUrl;
        }
    } catch (error) {
        console.error(`Error loading asset ${originalSrc}:`, error);
    }
}
