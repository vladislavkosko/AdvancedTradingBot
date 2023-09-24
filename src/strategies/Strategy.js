import MarketDetails from '../models/api/MarketDetails.js';
import Wallet from '../models/Wallet.js';
import Calculator from '../utils/Calculator.js';

export default class Strategy {
    /**
     * @param {Wallet} wallet
     * @param {MarketDetails} market
     * @param {Calculator} calculator
     */
    constructor(wallet, market, calculator) {
        /** @protected */
        this.wallet = wallet;
        /** @protected */
        this.market = market;
        this.calculator = calculator
    }

    process(ticker) {
        // This method should be overriden in children classes
    }
}