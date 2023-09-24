import config from '../../credentials.json' assert { type: 'json' };

export default class Credentials {
    /**
     * @param {string} name
     * @returns {object|null}
     */
    static get(name) {
        return config[name] || null;
    }
}