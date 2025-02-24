const log = require('../util/log');
/**
 * Collect the extension URL.
 * @param {string} extensionURL - The URL of the extension.
 * @param {string} collectorUrl - The URL of the collector.
 */
const collectExtension = (extensionURL, collectorUrl) => {
    if (!collectorUrl) {
        log.warn('Collector URL is not configured');
        return;
    }

    // Validate URL
    if (!URL.canParse(collectorUrl)) {
        log.warn(`Invalid collector URL: ${collectorUrl}`);
        return;
    }

    fetch(collectorUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors',
        cache: 'no-cache',
        body: JSON.stringify({url: extensionURL})
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            log.info(`Extension collected: ${extensionURL}`);
        })
        .catch(err => {
            log.warn(`Failed to notify extension collector: ${err.message}`);
        });
};

module.exports = {
    collectExtension
};
