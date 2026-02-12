// Modern Notification System

class NotificationManager {
    constructor() {
        this.container = null;
        this.notifications = [];
        this.init();
    }

    init() {
        // Create container if it doesn't exist
        if (!this.container) {
            this.container = document.createElement('div');
            this.container.className = 'notification-container';
            document.body.appendChild(this.container);
        }
    }

    show(options) {
        const {
            type = 'info',
            title = '',
            message = '',
            duration = 3000,
            closable = true
        } = options;

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;

        // Get icon based on type
        const icons = {
            success: '✓',
            error: '✕',
            warning: '⚠',
            info: 'ℹ',
            loading: '⟳'
        };

        const icon = icons[type] || icons.info;

        // Build notification HTML
        notification.innerHTML = `
            <div class="notification-icon">${icon}</div>
            <div class="notification-content">
                ${title ? `<h4 class="notification-title">${title}</h4>` : ''}
                ${message ? `<p class="notification-message">${message}</p>` : ''}
            </div>
            ${closable ? '<button class="notification-close">✕</button>' : ''}
            ${duration > 0 ? '<div class="notification-progress"></div>' : ''}
        `;

        // Add to container
        this.container.appendChild(notification);
        this.notifications.push(notification);

        // Add close button handler
        if (closable) {
            const closeBtn = notification.querySelector('.notification-close');
            closeBtn.addEventListener('click', () => this.remove(notification));
        }

        // Auto remove after duration
        if (duration > 0) {
            setTimeout(() => this.remove(notification), duration);
        }

        return notification;
    }

    remove(notification) {
        notification.classList.add('closing');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
            this.notifications = this.notifications.filter(n => n !== notification);
        }, 300);
    }

    success(title, message, duration) {
        return this.show({ type: 'success', title, message, duration });
    }

    error(title, message, duration) {
        return this.show({ type: 'error', title, message, duration });
    }

    warning(title, message, duration) {
        return this.show({ type: 'warning', title, message, duration });
    }

    info(title, message, duration) {
        return this.show({ type: 'info', title, message, duration });
    }

    loading(title, message) {
        return this.show({ 
            type: 'loading', 
            title, 
            message, 
            duration: 0,
            closable: false 
        });
    }

    clear() {
        this.notifications.forEach(notification => this.remove(notification));
    }
}

// Create global instance
window.notify = new NotificationManager();
