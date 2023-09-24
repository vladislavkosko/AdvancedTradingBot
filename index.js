import TradingBot from './src/bot.js';
import config from './config.json' assert { type: 'json' };

process.stdin.resume();
process.env.baseDir = process.cwd();

const bot = new TradingBot(config);

bot.trade();

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
