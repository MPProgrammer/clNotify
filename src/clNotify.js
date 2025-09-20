(function (global) {
    /**
     * Default configuration for the notification library.
     * @typedef {Object} DEFAULT_CONFIG
     * @property {string} position - The position of the notification container.
     * @property {number} duration - The duration of the notification in milliseconds.
     * @property {boolean} autoClose - Whether the notification should be closed automatically.
     * @property {boolean} showIcon - Whether the notification should show an icon.
     * @property {boolean} progressBar - Whether the notification should show a progress bar.
     * @property {Object} icons - Icons to be used for different notification types.
     * @property {string} icons.success - Icon to be used for success notifications.
     * @property {string} icons.error - Icon to be used for error notifications.
     * @property {string} icons.warning - Icon to be used for warning notifications.
     * @property {string} icons.info - Icon to be used for info notifications.
     */
    const DEFAULT_CONFIG = {
        position: 'top-right', // top-left, top-center, bottom-left, bottom-right, bottom-center
        duration: 3000, // ms
        autoClose: true,
        showIcon: true,
        progressBar: false,
        icons: {
            success: '\u2713', // ✓
            error: '\u2716', // ✖
            warning: '\u26A0', // ⚠
            info: '\u2139' // ℹ
        }
    };

    // Global configuration for the notification library.
    let globalConfig = { ...DEFAULT_CONFIG };

    /**
     * Returns a container element with the given position.
     * If the container does not exist, it is created and appended to the body.
     * @param {string} position - The position of the container element.
     * @returns {HTMLElement} The container element.
     */
    function getContainer(position) {
        const className = `clnotify-container clnotify-${position}`;
        let container = document.querySelector(`.${className.replace(/\s+/g, '.')}`);
        if (!container) {
            // Create a new container element if it does not exist
            container = document.createElement('div');
            container.className = className;
            // Append the container element to the body
            document.body.appendChild(container);
        }
        return container;
    }

    /**
     * Creates a new notification item with the given type, title, message, and options.
     * @param {string} type - The type of the notification item (success, error, warning, info).
     * @param {string} title - The title of the notification item.
     * @param {string} message - The message of the notification item.
     * @param {object} options - The options of the notification item.
     * @returns {void}
     */
    function create(type, title, message, options = {}) {
        const config = { ...globalConfig, ...options };
        const container = getContainer(config.position);
        const item = document.createElement('div');

        item.className = `clnotify-item clnotify-${type}`;

        if (config.showIcon && config.icons[type]) {
            /**
             * Creates an icon element for the notification item.
             * @returns {HTMLElement} The icon element.
             */
            const createIconElement = () => {
                const icon = document.createElement('span');
                icon.textContent = config.icons[type];
                icon.className = 'clnotify-icon';
                return icon;
            };
            item.appendChild(createIconElement());
        }

        const content = document.createElement('div');

        if (title) {
            /**
             * Creates a title element for the notification item.
             * @returns {HTMLElement} The title element.
             */
            const createTitleElement = () => {
                const titleElement = document.createElement('div');
                titleElement.textContent = title;
                titleElement.className = 'clnotify-title';
                return titleElement;
            };
            content.appendChild(createTitleElement());
        }

        if (message) {
            /**
             * Creates a message element for the notification item.
             * @returns {HTMLElement} The message element.
             */
            const createMessageElement = () => {
                const messageElement = document.createElement('div');
                messageElement.textContent = message;
                messageElement.className = 'clnotify-message';
                return messageElement;
            };
            content.appendChild(createMessageElement());
        }

        item.appendChild(content);

        if (config.autoClose && config.progressBar) {
            /**
             * Creates a progress bar element for the notification item.
             * @returns {HTMLElement} The progress bar element.
             */
            const createProgressBarElement = () => {
                const progressElement = document.createElement('div');
                progressElement.className = 'clnotify-progress';
                progressElement.style.setProperty('--clnotify-duration', `${config.duration}ms`);
                return progressElement;
            };

            item.appendChild(createProgressBarElement());
        }

        item.addEventListener('click', () => remove(item));

        container.insertBefore(item, container.firstChild);

        let timer;

        if (config.autoClose) {
            timer = setTimeout(() => remove(item), config.duration);
        }

        /**
         * Removes the given notification item from the DOM.
         * @param {HTMLElement} itemElement - The notification item to remove.
         * @returns {void}
         */
        function remove(itemElement) {
            clearTimeout(timer);
            itemElement.style.opacity = '0';
            itemElement.style.transform = 'translateY(-10px)';
            setTimeout(() => itemElement.remove(), 200);
        }
    }

    /**
     * A notification library that provides a simple way to display notifications.
     *
     * @property {object} config - The config object for the notification library.
     * @property {function} success - Displays a success notification.
     * @property {function} error - Displays an error notification.
     * @property {function} warning - Displays a warning notification.
     * @property {function} info - Displays an info notification.
     * @property {function} clear - Clears all notifications.
     */
    const clNotify = {
        /**
         * Sets the config object for the notification library.
         * @param {object} opts - The config object.
         */
        config(opts) { globalConfig = { ...globalConfig, ...opts }; },

        /**
         * Displays a success notification.
         * @param {string} title - The title of the notification.
         * @param {string} message - The message of the notification.
         * @param {object} options - The options of the notification.
         */
        success(title, message, options) { create('success', title, message, options); },

        /**
         * Displays an error notification.
         * @param {string} title - The title of the notification.
         * @param {string} message - The message of the notification.
         * @param {object} options - The options of the notification.
         */
        error(title, message, options) { create('error', title, message, options); },

        /**
         * Displays a warning notification.
         * @param {string} title - The title of the notification.
         * @param {string} message - The message of the notification.
         * @param {object} options - The options of the notification.
         */
        warning(title, message, options) { create('warning', title, message, options); },

        /**
         * Displays an info notification.
         * @param {string} title - The title of the notification.
         * @param {string} message - The message of the notification.
         * @param {object} options - The options of the notification.
         */
        info(title, message, options) { create('info', title, message, options); },

        /**
         * Clears all notifications.
         */
        clear() {
            document.querySelectorAll('.clnotify-container').forEach(c => c.remove());
        }
    };

    global.clNotify = clNotify;

})(window);
