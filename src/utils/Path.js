import path from 'node:path';

export default class Path {
    /**
     * @param {string} pathToResolve
     * @returns {string}
     */
    static resolve(pathToResolve) {
        return path.resolve(process.env.baseDir, pathToResolve);
    }
}