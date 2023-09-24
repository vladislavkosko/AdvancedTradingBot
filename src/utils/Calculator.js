import MarketDetails from '../models/api/MarketDetails.js';
import MarketKLine from '../models/MarketKLine.js';
import Wallet from '../models/Wallet.js';

export default class Calculator {
    /**
     * @param {MarketDetails} market
     * @param {Wallet} wallet
     */
    constructor(market, wallet) {
        this.market = market;
        this.wallet = wallet;
    }

    /**
     * @param {MarketKLine} ticker
     * @returns {{price: {sell: number; buy:number;}; fees: {sell: number; buy:number; total:number;}; spread: number;}}
    */
    getTotals(ticker) {
        const price = {
            sell: ticker.high * 0.998,
            buy: ticker.low * 1.002
        };
        const fees = {
            buy: this.market.fees.buy * price.buy,
            sell: this.market.fees.sell * price.sell,
        }

        return {
            price,
            fees: Object.assign(fees, { total: fees.buy + fees.sell }),
            spread: Math.abs(price.sell - price.buy)
        };
    }

    /**
     * @param {('buy'|'sell')} type
     * @param {MarketKLine} ticker
     * @param {number} amount
     * @returns {boolean}
     */
    deal(type, ticker, amount) {
        const prices = this.getTotals(ticker);
        const buyAsset = this.wallet.get(this.market.currencies.buy);
        const sellAsset = this.wallet.get(this.market.currencies.sell);

        if (type === 'buy' && sellAsset.available >= prices.price.buy) {
            buyAsset.available += amount;
            sellAsset.available -= prices.price.buy * amount + prices.fees.buy;

            return true;
        }

        if (type === 'sell' && buyAsset.available >= amount) {
            buyAsset.available -= amount;
            sellAsset.available += prices.price.sell * amount - prices.fees.sell;

            return true;
        }

        return false;
    }
}