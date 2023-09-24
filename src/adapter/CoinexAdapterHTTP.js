import CoinexAPI from '../api/CoinexAPI.js';
import MarketDetails from '../models/api/MarketDetails.js';
import MarketTicker from '../models/MarketTicker.js';
import Wallet from '../models/Wallet.js';

export default class CoinexAdapter {
    /**
     * @param {object} credentials
     */
    constructor(credentials) {
        this.api = new CoinexAPI(credentials);
    }

    async getMarketList() {
        return this.api.market('list');
    }

    /**
     * @param {string} market
     * @returns {Promise<MarketDetails>}
     */
    async getMarketDetails(market) {
        const result = await this.api.market('detail', { market });
        const details = new MarketDetails(market);

        return details
            .setMinOrderAmount(parseFloat(result.min_amount))
            .setFees(parseFloat(result.maker_fee_rate), parseFloat(result.taker_fee_rate))
            .setCurrencies(result.trading_name, result.pricing_name);
    }

    /**
     *
     * @param {string} market
     * @returns {Promise<MarketTicker>}
     */
    async getMarketTicker(market) {
        const result = await this.api.market('ticker', { market });
        const ticker = new MarketTicker(market);

        return ticker
            .setBuy(parseFloat(result.ticker.buy_amount), parseFloat(result.ticker.buy))
            .setSell(parseFloat(result.ticker.sell_amount), parseFloat(result.ticker.sell));
    }

    /**
     * @returns {Promise<Wallet>}
     */
    async getBalance() {
        // const result = await this.api.balance();
        // const wallet = new Wallet();

        // Object.keys(result).forEach(key => {
        //     const { available, frozen } = result[key];

        //     wallet.add(key, parseFloat(available), parseFloat(frozen));
        // });

        const wallet = new Wallet();

        wallet.add('RTM', 10000, 0.00000000);
        wallet.add('USDT', 20, 0.00000000);

        return Promise.resolve(wallet);

        // return wallet;
    }
}
