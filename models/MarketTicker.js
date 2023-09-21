export default class MarketTicker {
    /**
     * @param {string} name
     */
    constructor(name) {
        this.market = name;
        this.buy = { amount: 0, price: 0 };
        this.sell = { amount: 0, price: 0 };
    }

    /**
     * @param {number} amount
     * @param {number} price
     * @returns {MarketTicker}
     */
    setBuy(amount, price) {
        this.buy.amount = amount;
        this.buy.price = price;

        return this;
    }

    /**
     * @param {number} amount
     * @param {number} price
     * @returns {MarketTicker}
     */
    setSell(amount, price) {
        this.sell.amount = amount;
        this.sell.price = price;

        return this;
    }
}