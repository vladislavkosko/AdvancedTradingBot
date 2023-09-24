import axios from 'axios';
import config from '../../config/tradeogre.json' assert { type: 'json' };
import Wallet from '../models/api/Wallet.js';
import Credentials from '../utils/Credentials.js';
import MarketOrder from '../models/api/MarketOrder.js';
import qs from 'qs';

export default class TradeOgreAdapter {
    constructor() {
        const credentials = Credentials.get('tradeogre');

        this.accessId = credentials.AccessID;
        this.secretKey = credentials.SecretKey;

        this.axios = axios.create(config);
    }

    async getBalance() {
        const response = await this.makeRequest('get', '/account/balances', { auth: this.createAuthentication() });

        return Object.keys(response.balances)
            .map(key => ({ currency: key, available: parseFloat(response.balances[key]) }))
            .filter(item => item.available > 0)
            .reduce((wallet, item) => wallet.add(item.currency, item.available), new Wallet());

    }

    async getOrders(market) {
        let body = '';

        if (market) {
            body = qs.stringify({ market });
        }

        const response = await this.makeRequest(
            'post',
            '/account/orders',
            body,
            { 'Content-Type': 'application/x-www-form-urlencoded' },
            true
        );

        return response
            .map(order => new MarketOrder(order.market, order.type.toUpperCase())
                .setPriceAndQuantity(order.price, order.quantity)
                .setUUID(order.uuid));
    }

    /**
     * @private
     * @param {('get'|'post')} method
     * @param {string} endpoint
     * @param {object} params
     * @param {object?} options
     * @param {boolean?} requiresAuthentication
     * @returns {Promise<any>}
     */
    async makeRequest(method, endpoint, params, options = {}, requiresAuthentication = false) {
        let result = null;

        if (requiresAuthentication) {
            options = {
                ...options,
                auth: this.createAuthentication()
            }
        }

        try {
            result = await this.axios[method](endpoint, params, options);
            result = result.data;
        } catch (e) {
            console.debug(e);
        }

        if (result && 'success' in result && !result.success) {
            throw result;
        }

        return result;
    }

    /**
     * @private
     * @returns {object}
     */
    createAuthentication() {
        return {
            username: this.accessId,
            password: this.secretKey
        }
    }
}