import MarketKLine from '../models/MarketKLine.js';
import Strategy from './Strategy.js';

export default class Scalping extends Strategy {
   /**
    * @param {MarketKLine} ticker
    * @returns {('buy'|'sell'|'hold')}
    */
   process(ticker) {
       const prices = this.calculator.getTotals(ticker);

       console.log('Tick');
       console.log(this.wallet);
       console.debug(prices);
       console.debug(ticker);

       if (prices.spread < prices.fees.total) { return 'hold'; }

       if (ticker.close > prices.price.buy) {
           return 'buy';
       } else if (ticker.close < prices.price.sell) {
           return 'sell';
       }

       return 'hold';
   }
}