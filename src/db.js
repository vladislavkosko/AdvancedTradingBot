import { Sequelize } from 'sequelize';
import Path from './utils/Path.js';

// Models
import Transaction from './models/db/Transaction.js';
import Ticker from './models/db/Ticker.js';

export default class DB {
    /**
     * @param {string} path -- path to DB file
     */
    constructor(path) {
        this.connection = new Sequelize({ dialect: 'sqlite', storage: Path.resolve(path) });
        this.transaction = Transaction.initModel(this.connection);
        this.ticker = Ticker.initModel(this.connection);
    }
}