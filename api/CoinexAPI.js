import crypto from 'crypto';
import axios from 'axios';
import config from './coinex.json' assert { type: 'json' };

export default class CoinexAPI {
    /**
     * @param {object} credentials
     * @param {string} credentials.AccessID
     * @param {string} credentials.SecretKey
     */
    constructor(credentials) {
        this.accessId = credentials.AccessID;
        this.secretKey = credentials.SecretKey;
        this.axios = axios.create(config);
    }

    /**
     * @param {string} operation
     * @param {object} params
     * @returns {Promise<object>}
     */
    async market(operation, params) {
        const response = await this.makeRequest('get', `/market/${operation}`, {
            params: params
        });

        return response.data.data;
    }

    /**
     * @returns {Promise<object>}
     */
    async balance() {
        const params = { access_id: this.accessId, tonce: Date.now() };
        const response = await this.makeRequest('get', '/balance/info', {
            headers: { authorization: this.createAuthenticationHeader(params) },
            params: params
        });

        return response.data.data;
    }

    /**
     * @param {('get'|'post')} method
     * @param {string} endpoint
     * @param {object} params
     * @returns
     */
    async makeRequest(method, endpoint, params) {
        let result = null;

        try {
            result = await this.axios[method](endpoint, params);
        } catch (e) {
            console.debug(e);
        }

        return result;
    }

    /**
     * @private
     * @param {object} params
     * @returns {string}
     */
    createAuthenticationHeader(params) {
        const sortedQS = Object
            .keys(params)
            .sort()
            .reduce((qs, key) => qs + `${key}=${params[key]}&`, '');

        return crypto
            .createHash('md5')
            .update(`${sortedQS}secret_key=${this.secretKey}`)
            .digest('hex')
            .toUpperCase();
    }
};