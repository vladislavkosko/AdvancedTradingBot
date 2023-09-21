import tasktimer from 'tasktimer';

const { TaskTimer } = tasktimer;

export default class Timer {
    constructor() {
        this.timers = new Map();
    }

    /**
     * @param {string} id
     * @returns {{start: Function; stop: Function; pause: Function; resume: Function;}}
     */
    get(id) {
        return this.timers.has(id) ? this.timers.get(id) : null;
    }

    /**
     *
     * @param {string} id
     * @param {Function} callback
     * @param {number} interval
     * @param {number?} amount
     * @returns {Timer}
     */
    add(id, callback, interval, amount = 0) {
        const timer = new TaskTimer(1000);

        this.timers.set(id, timer);

        timer.add({ id: id, tickInterval: interval, totalRuns: amount, callback: callback });

        return this;
    }

    /**
     * @param {string} id
     * @returns {Timer}
     */
    start(id) {
        if (this.timers.has(id)) {
            this.timers.get(id).start();
        }

        return this;
    }

    /**
     * @param {string} id
     * @returns {Timer}
     */
    stop(id) {
        if (this.timers.has(id)) {
            this.timers.get(id).stop();
        }

        return this;
    }

    /**
     * @param {string} id
     * @returns {Timer}
     */
    pause(id) {
        if (this.timers.has(id)) {
            this.timers.get(id).pause();
        }

        return this;
    }

    /**
     * @param {string} id
     * @returns {Timer}
     */
    resume(id) {
        if (this.timers.has(id)) {
            this.timers.get(id).resume();
        }

        return this;
    }

    /**
     * @returns {Timer}
     */
    startAll() {
        this.timers.forEach(timer => { timer.start(); });

        return this;
    }

    /**
     * @returns {Timer}
     */
    stopAll() {
        this.timers.forEach(timer => { timer.stop(); });

        return this;
    }

    /**
     * @returns {Timer}
     */
    pauseAll() {
        this.timers.forEach(timer => { timer.pause(); });

        return this;
    }

    /**
     * @returns {Timer}
     */
    resumeAll() {
        this.timers.forEach(timer => { timer.resume(); });

        return this;
    }
}