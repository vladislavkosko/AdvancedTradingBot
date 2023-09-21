import RTMMock from '../mocks/rtm.json' assert { type: 'json' };
import MarketDetails from '../models/MarketDetails.js';
import MarketTicker from '../models/MarketTicker.js';
import Wallet from '../models/Wallet.js';

export default class MockAdapter {
    constructor() {
        this.mockedData = new Set(RTMMock).values();
    }

    async getMarketDetails(market) {
        const marketDetails = new MarketDetails(market);

        return Promise.resolve(
            marketDetails
                .setMinOrderAmount(5000)
                .setCurrencies('RTM', 'USDT')
                .setFees(0.003, 0.003)
        );
    }

    async getMarketTicker(market) {
        const item = this.mockedData.next().value;
        const ticker = new MarketTicker(market);

        return Promise.resolve(
            ticker
                .setBuy(30000.00000000, item.buy)
                .setSell(30000.00000000, item.sell)
        );
    }

    async getBalance() {
        const wallet = new Wallet();

        wallet.add('RTM', 10000, 0.00000000);
        wallet.add('USDT', 20, 0.00000000);

        return Promise.resolve(wallet);
    }
}