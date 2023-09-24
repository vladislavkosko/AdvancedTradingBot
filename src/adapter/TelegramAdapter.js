import Credentials from '../utils/Credentials.js';
import { Context, Telegraf } from 'telegraf';
import { message } from 'telegraf/filters';

export default class TelegramAdapter {
    constructor() {
        const { AccessID, SecretKey } = Credentials.get('telegram');

        this.chatID = 180128233;
        this.bot = new Telegraf(`${AccessID}:${SecretKey}`);
        this.bot.launch();

        process.once('SIGINT', () => this.bot.stop('SIGINT'))
        process.once('SIGTERM', () => this.bot.stop('SIGTERM'))
    }

    /**
     * @param {string} message
     */
    sendMessage(message) {
        if (!this.chatID) { return; }

        this.bot.telegram.sendMessage(this.chatID, message);
    }
}