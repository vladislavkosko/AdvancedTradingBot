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
        this.assets.set(currency, { available, frozen });
    }

    /**
     * @param {string} currency
     * @returns {{available: number; frozen: number;}}
     */
    get(currency) {
        return this.assets.has(currency) ? this.assets.get(currency) : null;
    }
}