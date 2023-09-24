export default class MarketStatus {
    /**
     * @param {number} bid
     * @param {number} ask
     */
    constructor(bid, ask) {
        this.update(bid, ask);
    }

    /**
     * @private
     * @returns {number}
     */
    getPrice() {
        return Math.abs((this.bid - this.ask) / 2);
    }

    /**
     * @param {number} bid
     * @param {number} ask
     */
    update(bid, ask) {
        this.bid = bid;
        this.ask = ask;
        this.price = this.getPrice();
    }

    /**
     * @param {MarketStatus} status
     * @returns {{bid:number; ask:number; price:number;}}
     */
    diff(status) {
        return {
            bid: MarketStatus.calculateDiff(status.bid, this.bid),
            ask: MarketStatus.calculateDiff(status.ask, this.ask),
            price: MarketStatus.calculateDiff(status.price, this.price)
        };
    }

    /**
     * @private
     * @param {number} newValue
     * @param {number} oldValue
     */
    static calculateDiff(newValue, oldValue) {
        return (newValue - oldValue) * 100 / newValue
    }
}