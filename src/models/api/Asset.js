export default class Asset {
    /**
     * @param {string} coin
     * @param {number} available
     * @param {number?} frozen
     */
    constructor(coin, available, frozen = null) {
        this.coin = coin;
        this.available = available;
        this.frozen = frozen;
    }

    /**
     * @param {Asset} asset
     * @returns {boolean}
     */
    isEqual(asset) {
        return this.coin === asset.coin
            && this.available === asset.available
            && this.frozen === asset.frozen;
    }
}