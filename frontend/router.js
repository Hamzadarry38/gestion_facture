// Simple Vanilla Router
class Router {
    constructor() {
        this.routes = {};
        this.currentPage = null;
    }

    // Register a route
    addRoute(path, component) {
        this.routes[path] = component;
    }

    // Navigate to a route
    navigate(path) {
        console.log('🔄 Router: Navigating to', path);
        const component = this.routes[path];
        if (component) {
            console.log('✅ Router: Component found for', path);
            this.currentPage = path;
            const app = document.getElementById('app');
            app.innerHTML = component();
            console.log('✅ Router: HTML rendered');
            
            // Load assets after rendering
            if (typeof window.loadAssetsNow === 'function') {
                setTimeout(() => window.loadAssetsNow(), 100);
            }
            
            // Update active nav
            document.querySelectorAll('[data-route]').forEach(link => {
                link.classList.remove('active');
                if (link.dataset.route === path) {
                    link.classList.add('active');
                }
            });
            
            // Call page-specific initialization if exists
            if (path === '/create-invoice-mry' && typeof window.initInvoiceFormPage === 'function') {
                console.log('✅ Router: Calling initInvoiceFormPage');
                window.initInvoiceFormPage();
            } else if (path === '/create-invoice-mry') {
                console.error('❌ Router: initInvoiceFormPage function not found!');
            }
            
            if (path === '/create-invoice-chaimae' && typeof window.initCreateInvoiceChaimaePage === 'function') {
                console.log('✅ Router: Calling initCreateInvoiceChaimaePage');
                window.initCreateInvoiceChaimaePage();
            } else if (path === '/create-invoice-chaimae') {
                console.error('❌ Router: initCreateInvoiceChaimaePage function not found!');
            }
            
            if (path === '/invoices-list-mry' && typeof window.initInvoicesListMRYPage === 'function') {
                console.log('✅ Router: Calling initInvoicesListMRYPage');
                window.initInvoicesListMRYPage();
            } else if (path === '/invoices-list-mry') {
                console.error('❌ Router: initInvoicesListMRYPage function not found!');
            }
            
            if (path === '/invoices-list-chaimae' && typeof window.initInvoicesListChaimaePage === 'function') {
                console.log('✅ Router: Calling initInvoicesListChaimaePage');
                window.initInvoicesListChaimaePage();
            } else if (path === '/invoices-list-chaimae') {
                console.error('❌ Router: initInvoicesListChaimaePage function not found!');
            }
            
            if (path === '/create-global-invoice-chaimae' && typeof window.initCreateGlobalInvoiceChaimaePage === 'function') {
                console.log('✅ Router: Calling initCreateGlobalInvoiceChaimaePage');
                window.initCreateGlobalInvoiceChaimaePage();
            } else if (path === '/create-global-invoice-chaimae') {
                console.error('❌ Router: initCreateGlobalInvoiceChaimaePage function not found!');
            }
            
            if (path === '/company-select' && typeof initCompanySelectPage === 'function') {
                console.log('✅ Router: Calling initCompanySelectPage');
                initCompanySelectPage();
            }
            
            if (path === '/edit-global-invoice-chaimae' && typeof window.initEditGlobalInvoiceChaimaePage === 'function') {
                console.log('✅ Router: Calling initEditGlobalInvoiceChaimaePage');
                window.initEditGlobalInvoiceChaimaePage();
            } else if (path === '/edit-global-invoice-chaimae') {
                console.error('❌ Router: initEditGlobalInvoiceChaimaePage function not found!');
            }
            
            if (path === '/year-selector-chaimae' && typeof window.loadYearSelectorChaimae === 'function') {
                console.log('✅ Router: Calling loadYearSelectorChaimae');
                window.loadYearSelectorChaimae();
            } else if (path === '/year-selector-chaimae') {
                console.error('❌ Router: loadYearSelectorChaimae function not found!');
            }
            
            if (path === '/year-selector-mry' && typeof window.loadYearSelectorMRY === 'function') {
                console.log('✅ Router: Calling loadYearSelectorMRY');
                window.loadYearSelectorMRY();
            } else if (path === '/year-selector-mry') {
                console.error('❌ Router: loadYearSelectorMRY function not found!');
            }
            
            if (path === '/year-selector-multi' && typeof window.loadYearSelectorMulti === 'function') {
                console.log('✅ Router: Calling loadYearSelectorMulti');
                window.loadYearSelectorMulti();
            } else if (path === '/year-selector-multi') {
                console.error('❌ Router: loadYearSelectorMulti function not found!');
            }
            
            if (path === '/dashboard-multi' && typeof initDashboardMultiPage === 'function') {
                console.log('✅ Router: Calling initDashboardMultiPage');
                initDashboardMultiPage();
            }
            
            if (path === '/create-data-multi' && typeof initCreateDataMultiPage === 'function') {
                console.log('✅ Router: Calling initCreateDataMultiPage');
                initCreateDataMultiPage();
            }
            
            if (path === '/view-data-multi' && typeof initViewDataMultiPage === 'function') {
                console.log('✅ Router: Calling initViewDataMultiPage');
                initViewDataMultiPage();
            }
            
            if (path === '/create-invoice-multi' && typeof window.initCreateInvoiceMultiPage === 'function') {
                console.log('✅ Router: Calling initCreateInvoiceMultiPage');
                window.initCreateInvoiceMultiPage();
            } else if (path === '/create-invoice-multi') {
                console.error('❌ Router: initCreateInvoiceMultiPage function not found!');
            }
            
            if (path === '/invoices-list-multi' && typeof window.initInvoicesListMultiPage === 'function') {
                console.log('✅ Router: Calling initInvoicesListMultiPage');
                window.initInvoicesListMultiPage();
            } else if (path === '/invoices-list-multi') {
                console.error('❌ Router: initInvoicesListMultiPage function not found!');
            }
            
            // Generic invoices list (works for MRY and MULTI)
            if ((path === '/invoices-list-mry' || path === '/invoices-list-multi') && typeof window.initInvoicesListGenericPage === 'function') {
                console.log('✅ Router: Calling initInvoicesListGenericPage for', path);
                window.initInvoicesListGenericPage();
            }
            
            if (path === '/edit-invoice-multi' && typeof window.initEditInvoiceMultiPage === 'function') {
                console.log('✅ Router: Calling initEditInvoiceMultiPage');
                window.initEditInvoiceMultiPage();
            } else if (path === '/edit-invoice-multi') {
                console.error('❌ Router: initEditInvoiceMultiPage function not found!');
            }
        } else {
            console.error(`❌ Route ${path} not found`);
            console.log('Available routes:', Object.keys(this.routes));
        }
    }

    // Initialize router
    async init() {
        // Handle route links
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-route]')) {
                e.preventDefault();
                const route = e.target.dataset.route;
                this.navigate(route);
            }
        });

        // Check if any users exist in the database
        try {
            const result = await window.electron.users.hasUsers();
            const hasUsers = result.success && result.hasUsers;
            
            if (!hasUsers) {
                // No users exist -> go to register page
                this.navigate('/register');
                return;
            }
        } catch (error) {
            console.error('Error checking users:', error);
        }

        // Check if user is already logged in
        const isAuthenticated = localStorage.getItem('isAuthenticated');
        const selectedCompanyStrClean = localStorage.getItem('selectedCompany');
        
        if (isAuthenticated === 'true') {
            if (selectedCompanyStrClean) {
                // User is logged in and has selected company -> go to company dashboard
                const company = JSON.parse(selectedCompanyStrClean);
                const route = company.route || '/company-select';
                // Verify the route exists before navigating
                if (this.routes[route]) {
                    this.navigate(route);
                } else {
                    console.warn('⚠️ Route not found, redirecting to company select');
                    this.navigate('/company-select');
                }
            } else {
                // User is logged in but hasn't selected company -> go to company select
                this.navigate('/company-select');
            }
        } else {
            // User is not logged in -> go to login
            this.navigate('/login');
        }
    }
}

// Create global router instance
const router = new Router();
