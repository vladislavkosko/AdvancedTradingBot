// import MockAdapter from './adapter/MockAdapter.js';
import Timer from './utils/Timer.js';
import Calculator from './utils/Calculator.js';
import Scalping from './strategies/Scalping.js';
import CoinexAdapterWebsocket from './adapter/CoinexAdapterWebsocket.js';
import CoinexAdapter from './adapter/CoinexAdapterHTTP.js';

export default class TradingBot {
    /**
     * @param {object} config
     */
    constructor(config) {
        this.config = config;
        this.adapter = {
            http: new CoinexAdapter(config.credentials),
            ws: new CoinexAdapterWebsocket(config.credentials)
        };
        this.timer = new Timer();
        this.marketDetails = null;
        this.wallet = null;
        /** @type {Calculator} */
        this.calculator = null;
    }

    async onTicker() {
        const kLine = await this.adapter.ws.kLine(this.config.coins.markets[0], 5);
        const strategy = new Scalping(this.wallet, this.marketDetails, this.calculator);
        const decision = strategy.process(kLine);

        console.log(`Decision is "${decision}"`);

        try {
            if (decision === 'buy') {
                this.calculator.deal('buy', kLine, 1000)
                console.log(this.wallet);
            } else if (decision === 'sell') {
                this.calculator.deal('sell', kLine, 1000)
                console.log(this.wallet);
            }
        } catch(e) {
            console.log(e);
        }

        return true;
    }

    async trade() {
        await this.adapter.ws.api.ready;

        const tickerTaskId = 'GetTicker';
        this.marketDetails = await this.adapter.http.getMarketDetails(this.config.coins.markets[0]);
        this.wallet = await this.adapter.http.getBalance();
        this.calculator = new Calculator(this.marketDetails, this.wallet);

        await this.onTicker();

        this.timer
            .add(tickerTaskId, async () => {
                this.timer.pause(tickerTaskId);
                await this.onTicker();
                this.timer.resume(tickerTaskId);
            }, 60)
            .start(tickerTaskId);
    }

    stop() {
        console.log('Stopping the application...');
        this.timer.stopAll();
    }
}
