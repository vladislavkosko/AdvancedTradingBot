export default class MarketKLine {
    constructor() {
        this.open = null;
        this.close = null;
        this.high = null;
        this.low = null;
    }

    /**
     *
     * @param {number} o
     * @param {number} c
     * @param {number} h
     * @param {number} l
     * @returns {MarketKLine}
     */
    setPrices(o, c, h, l) {
        this.open = o;
        this.close = c;
        this.high = h;
        this.low = l;

        return this;
    }
}