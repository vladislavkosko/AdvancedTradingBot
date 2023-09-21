import CoinexWebsocket from '../api/CoinexWebsocket.js';
import MarketKLine from '../models/MarketKLine.js';

export default class CoinexAdapterWebsocket {
    /**
     * @param {object} credentials
     */
    constructor(credentials) {
        this.api = new CoinexWebsocket(credentials);
    }

    /**
     * @param {string} market
     * @param {number?} period
     */
    async kLine(market, period = 1) {
        try {
            const result = await this.api.get('kline.query', [
                market,
                Math.round(new Date().setMinutes(-period).valueOf() / 1000),
                Math.round(Date.now() / 1000),
                period
            ]);
            const marketLine = new MarketKLine();
            const parsedLines = result
                .map(line => line.slice(1, 6))
                .map(line => line.map(item => parseFloat(item)));

            return marketLine.setPrices(
                parsedLines[0][0],
                parsedLines[parsedLines.length - 1][1],
                Math.max(...parsedLines.map(line => line[2])),
                Math.min(...parsedLines.map(line => line[3]))
            );
        }

        catch(e) { console.log(e); }
    }
}
