// import MockAdapter from './adapter/MockAdapter.js';
import Timer from './utils/Timer.js';
import Calculator from './utils/Calculator.js';
// import Scalping from './strategies/Scalping.js';
// import CoinexAdapterWebsocket from './adapter/CoinexAdapterWebsocket.js';
// import CoinexAdapter from './adapter/CoinexAdapterHTTP.js';
import DB from './db.js';

const TICKER_TASK_ID = 'GetTicker';

export default class TradingBot {
    /**
     * @param {object} config
     */
    constructor(config) {
        this.config = config;
        this.adapter = ;
        this.db = new DB('db/database.sqlite');
        this.timer = new Timer();
        this.marketDetails = null;
        this.wallet = null;
        /** @type {Calculator} */
        this.calculator = null;
    }

    async onTicker() {
        // const kLine = await this.adapter.ws.kLine(this.config.coins.markets[0], 5);
        // const strategy = new Scalping(this.wallet, this.marketDetails, this.calculator);
        // const decision = strategy.process(kLine);

        // console.log(`Decision is "${decision}"`);
        return true;
    }

    async trade() {
        // this.marketDetails = await this.adapter.http.getMarketDetails(this.config.coins.markets[0]);
        // this.wallet = await this.adapter.http.getBalance();
        // this.calculator = new Calculator(this.marketDetails, this.wallet);

        await this.onTicker();

        this.timer
            .add(TICKER_TASK_ID, async () => {
                this.timer.pause(TICKER_TASK_ID);
                await this.onTicker();
                this.timer.resume(TICKER_TASK_ID);
            }, 1)
            .start(TICKER_TASK_ID);
    }

    stop() {
        console.log('Stopping the application...');
        this.timer.stopAll();
    }
}
