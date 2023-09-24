import WebSocket from 'ws';
import crypto from 'crypto';

const OPERATIONS_MAPPING = {
    'kline.query': 5
};

export default class CoinexWebsocket {
    /**
     * @param {object} credentials
     * @param {string} credentials.AccessID
     * @param {string} credentials.SecretKey
     */
    constructor(credentials) {
        this.ws = new WebSocket('wss://socket.coinex.com/', { perMessageDeflate: false });
        this.accessId = credentials.AccessID;
        this.secretKey = credentials.SecretKey;
        this.promises = new Map();

        this.ready = new Promise(resolve => {
            this.ws.on('open', async () => {
                await this.authenticate();
                resolve(true);
            });
        });
        this.ws.on('error', console.error);
        this.ws.on('message', data => { this.onMessage(data) });
    }

    /**
     * @param {string} operation
     * @param {object} params
     * @returns {Promise<any>}
     */
    async get(operation, params) {
        return this.sendMessage({
            method: operation,
            params: params,
            id: OPERATIONS_MAPPING[operation]
        })
    }

    /**
     * @private
     * @param {{method:string; params:any[]; id:number;}} message
     */
    async sendMessage(message) {
        let resolver = null;
        const promise = new Promise(res => { resolver = res; });

        this.promises.set(message.id, resolver);
        this.ws.send(JSON.stringify(message));

        console.log('WS => sent message: ' + JSON.stringify(message));

        return promise;
    }

    /**
     * @private
     * @param {import('ws').RawData} data
     */
    onMessage(data) {
        /** @type {{error:Buffer|null; result:Buffer|null; id: number;}} */
        const parsedData = JSON.parse(data.toString('utf-8'));

        // console.log('WS => received message: ' + data.toString('utf-8'));

        if (this.promises.has(parsedData.id)) {
            const resolver = this.promises.get(parsedData.id);

            this.promises.delete(parsedData.id);
            resolver(parsedData.result);
        }
    }

    /**
     * @private
     * @returns {Promise}
     */
    async authenticate() {
        return this.sendMessage({
            method: 'server.sign',
            params: [
                this.accessId,
                this.createSignature({
                    access_id: this.accessId,
                    tonce: Date.now()
                }),
                Date.now()
            ],
            id: 15
        });
    }

    /**
     * @private
     * @param {object} params
     * @returns {string}
     */
    createSignature(params) {
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
}