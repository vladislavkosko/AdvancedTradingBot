import TradingBot from './bot.js';
import config from './config.json' assert { type: 'json' };

const bot = new TradingBot(config);

bot.trade();

process.stdin.resume();

function exitHandler(options) {
    if (options.exit) {
        bot.stop();

        process.exit();
    }
}

process.on('exit', exitHandler.bind(null));
process.on('SIGINT', exitHandler.bind(null, { exit: true }));
process.on('SIGUSR1', exitHandler.bind(null, { exit: true }));
process.on('SIGUSR2', exitHandler.bind(null, { exit: true }));
process.on('uncaughtException', (e) => {
    console.log(e);
    exitHandler({ exit: true });
});
