import { Model, Sequelize, DataTypes } from 'sequelize';

export default class Transaction extends Model {
    /**
     * @param {Sequelize} sequelize
     * @returns {typeof Transaction}
     */
    static initModel(sequelize) {
        Transaction.init({
            txid: { type: DataTypes.STRING, allowNull: false },
            type: { type: DataTypes.STRING, allowNull: false },
            amount: { type: DataTypes.DOUBLE, allowNull: false },
            currency: { type: DataTypes.STRING, allowNull: false }
        }, {
            timestamps: true,
            sequelize
        });

        return Transaction;
    }
}
