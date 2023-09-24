export default class Numeric {
    /**
     * @param {any} val
     */
    static parse(val) {
        const type = typeof val;

        if (type === 'number') {
            return val;
        } else if (type === 'string') {
            return parseFloat(val);
        }

        return null;
    }
}