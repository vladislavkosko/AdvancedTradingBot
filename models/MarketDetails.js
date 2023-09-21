export default class MarketDetails {
    /**
     * @param {string} name
     */
    constructor(name) {
        this.market = name;
        this.minOrderAmount = 0;
        this.fees = { buy: 0, sell: 0 };
        this.currencies = { buy: 'N/A', sell: 'N/A' };
    }

    /**
     * @param {number} amount
     * @returns {MarketDetails}
     */
    setMinOrderAmount(amount) {
        this.minOrderAmount = amount;

        return this;
    }

    /**
     * @param {number} buy
     * @param {number} sell
     * @returns {MarketDetails}
     */
    setFees(buy, sell) {
        this.fees.buy = buy;
        this.fees.sell = sell;

        return this;
    }

    /**
     * @param {string} buy
     * @param {string} sell
     * @returns {MarketDetails}
     */
    setCurrencies(buy, sell) {
        this.currencies.buy = buy;
        this.currencies.sell = sell;

        return this;
    }
}