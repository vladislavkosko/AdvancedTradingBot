import Numeric from '../../utils/Numeric.js';

export default class MarketOrder {
    /**
     * @param {string} market
     * @param {('BUY'|'SELL')} type
     */
    constructor(market, type) {
        this.market = market;
        this.type = type;
        this.price = null;
        this.quantity = null;
        this.uuid = null;
    }

    /**
     * @param {(string|number)} price
     * @param {(string|number)} qty
     * @returns {MarketOrder}
     */
    setPriceAndQuantity(price, qty) {
        this.price = Numeric.parse(price);
        this.quantity = Numeric.parse(qty);

        return this;
    }

    /**
     * @param {(string|null)} uuid
     * @returns {MarketOrder}
     */
    setUUID(uuid = null) {
        this.uuid = uuid;

        return this;
    }
}