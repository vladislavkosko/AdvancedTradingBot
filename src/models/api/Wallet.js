import Asset from './Asset.js';

export default class Wallet {
    constructor() {
        /** @private */
        this.assets = new Map();
    }

    /**
     * @param {string} currency
     * @param {number} available
     * @param {number?} frozen
     */
    add(currency, available, frozen = 0) {
        this.assets.set(currency, new Asset(currency, available, frozen));

        return this;
    }

    /**
     * @param {string} currency
     * @returns {Asset}
     */
    get(currency) {
        return this.assets.has(currency) ? this.assets.get(currency) : null;
    }

    /**
     * @returns {string[]}
     */
    getOwnedCoins() {
        return Array.from(this.assets.keys());
    }

    /**
     * @returns {Asset[]}
     */
    getAllAssets() {
        return this.getOwnedCoins().map(coin => this.get(coin));
    }
}