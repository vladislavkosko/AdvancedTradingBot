import CoinexWebsocket from './src/api/CoinexWebsocket.js';
import config from './config.json' assert { type: 'json' };

const websocket = new CoinexWebsocket(config.credentials);

setInterval(() => {}, 1000);

