import { Model, Sequelize, DataTypes } from 'sequelize';

export default class Ticker extends Model {
    /**
     * @param {Sequelize} sequelize
     * @returns {typeof Ticker}
     */
    static initModel(sequelize) {
        Ticker.init({
            market: { type: DataTypes.STRING, allowNull: false },
            current: { type: DataTypes.DOUBLE, allowNull: true },
            high: { type: DataTypes.DOUBLE, allowNull: true },
            low: { type: DataTypes.DOUBLE, allowNull: true },
            bid: { type: DataTypes.DOUBLE, allowNull: true },
            ask: { type: DataTypes.DOUBLE, allowNull: true }
        }, {
            timestamps: true,
            sequelize
        });

        return Ticker;
    }
}
