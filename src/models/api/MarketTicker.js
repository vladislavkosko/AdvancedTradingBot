export default class MarketTicker {
    /**
     * @param {string} name
     * @param {string} c
     * @param {string} h
     * @param {string} l
     * @param {string} b
     * @param {string} a
     */
    constructor(name, c, h, l, b, a) {
        this.market = name;
        this.current = c;
        this.high = h;
        this.low = l;
        this.bid = b;
        this.ask = a;
    }
}