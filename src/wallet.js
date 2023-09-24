import TelegramAdapter from './adapter/TelegramAdapter.js';
import TradeOgreAdapter from './adapter/TradeOgreAdapter.js';
import MarketOrder from './models/api/MarketOrder.js';
import Wallet from './models/api/Wallet.js';
import Timer from './utils/Timer.js';

const UPDATE_INFO_TASK = 'UpdateInfo';
const EMOJI = {
    check: '\u{2705}',
    plus: '\u{2795}',
    money: '\u{1F4B0}'
};

class WalletWatcher {
    constructor() {
        this.adapter = new TradeOgreAdapter();
        this.timer = new Timer();
        /** @type {{wallet: Wallet; orders: MarketOrder[]}} */
        this.state = { wallet: null, orders: null };
        this.telegram = new TelegramAdapter();
    }

    /**
     * @param {string} title
     * @param {MarketOrder[]} orders
     * @param {string|null} reaction
     */
    sendOrderUpdateMessage(title, orders, reaction = null) {
        const ordersInfo = orders.map(order => '============================\n'
            + `Market: ${order.market}\n`
            + `Type: ${order.type}\n`
            + `Price: ${order.price}\n`
            + `Quantity: ${order.quantity}`
        );

        this.telegram.sendMessage(`${reaction + ' ' || ''}${title}\n${ordersInfo.join('\n')}`);
    }

    /**
     * @param {string} title
     * @param {Wallet} wallet
     * @param {string|null} reaction
     */
    sendBalanceUpdateMessage(title, wallet, reaction = null) {
        const assets = wallet.getAllAssets().map(asset => '============================\n'
            + `Coin: ${asset.coin}\n`
            + `Balance: ${asset.available.toFixed(8)}`
            + (asset.frozen > 0 ? `\nFrozen: ${asset.frozen}\n` : '')
        );

        this.telegram.sendMessage(`${reaction + ' ' || ''}${title}\n${assets.join('\n')}`);
    }

    /**
     * @param {MarketOrder[]} orders
     */
    compareOrders(orders) {
        const added = orders.filter(order => !this.state.orders.some(existing => order.uuid === existing.uuid));
        const executed = this.state.orders.filter(existing => !orders.some(order => order.uuid === existing.uuid));

        if (added.length > 0) {
            this.sendOrderUpdateMessage('New order(s) were added:', added, EMOJI.plus);
        }

        if (executed.length > 0) {
            this.sendOrderUpdateMessage('Order(s) were executed:', executed, EMOJI.check);
        }
    }

    /**
     * @param {Wallet} wallet
     */
    compareWallets(wallet) {
        if (wallet.getOwnedCoins().length !== this.state.wallet.getOwnedCoins().length) {
            this.sendBalanceUpdateMessage('Coin balance was updated!', wallet, EMOJI.money);
            return;
        }

        const ownedCoinsSame = this.state.wallet.getAllAssets().every(asset => {
            const updated = wallet.get(asset.coin);

            return updated && asset.isEqual(updated);
        });
        const updatedCoinsSame = wallet.getAllAssets().every(asset => {
            const updated = this.state.wallet.get(asset.coin);

            return updated && asset.isEqual(updated);
        });

        if (!ownedCoinsSame || !updatedCoinsSame) {
            this.sendBalanceUpdateMessage('Coin balance was updated!', wallet, EMOJI.money);
        }
    }

    async iteration() {
        const [wallet, orders] = await Promise.all([
            this.adapter.getBalance(),
            this.adapter.getOrders()
        ]);

        if (this.state.orders !== null) {
            this.compareOrders(orders);
        }

        if (this.state.wallet !== null) {
            this.compareWallets(wallet);
        }

        this.state.wallet = wallet;
        this.state.orders = orders;
    }

    async start() {
        this.timer
            .add(UPDATE_INFO_TASK, async () => {
                this.timer.pause(UPDATE_INFO_TASK);

                try {
                    await this.iteration();
                } catch (e) {
                    console.log(e);
                } finally {
                    this.timer.resume(UPDATE_INFO_TASK);
                }
            }, 2)
            .start(UPDATE_INFO_TASK);
    }
}

const watcher = new WalletWatcher();

watcher.start();