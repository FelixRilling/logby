import { Levels } from "../level/Levels";
import { matchesLevel } from "../level/matchesLevel";
/**
 * Default {@link Logger} class.
 *
 * @private
 */
class DefaultLogger {
    /**
     * Creates a new {@link DefaultLogger}.
     * Should not be constructed directly, rather use {@link Logby.getLogger}.
     *
     * @public
     * @param root Root logger of this logger.
     * @param name Name of the logger.
     */
    constructor(root, name) {
        this.root = root;
        this.name = name;
    }
    /**
     * Logs a message.
     *
     * @public
     * @param level Levels of the log.
     * @param args Arguments to be logged.
     */
    log(level, ...args) {
        if (this.root.level.val >= level.val) {
            this.root.appenders.forEach(fn => fn(this.name, level, args));
        }
    }
    /**
     * Logs an error.
     *
     * @public
     * @param args Arguments to be logged.
     */
    error(...args) {
        this.log(Levels.ERROR, ...args);
    }
    /**
     * Logs a warning.
     *
     * @public
     * @param args Arguments to be logged.
     */
    warn(...args) {
        this.log(Levels.WARN, ...args);
    }
    /**
     * Logs an info.
     *
     * @public
     * @param args Arguments to be logged.
     */
    info(...args) {
        this.log(Levels.INFO, ...args);
    }
    /**
     * Logs a debug message.
     *
     * @public
     * @param args Arguments to be logged.
     */
    debug(...args) {
        this.log(Levels.DEBUG, ...args);
    }
    /**
     * Logs a trace message.
     *
     * @public
     * @param args Arguments to be logged.
     */
    trace(...args) {
        this.log(Levels.TRACE, ...args);
    }
    /**
     * Checks if the currently set log level includes error logging.
     *
     * @public
     * @returns if the currently set log level includes error logging.
     */
    isError() {
        return matchesLevel(Levels.ERROR, this.root.level);
    }
    /**
     * Checks if the currently set log level includes warning logging.
     *
     * @public
     * @returns if the currently set log level includes warning logging.
     */
    isWarn() {
        return matchesLevel(Levels.WARN, this.root.level);
    }
    /**
     * Checks if the currently set log level includes info logging.
     *
     * @public
     * @returns if the currently set log level includes info logging.
     */
    isInfo() {
        return matchesLevel(Levels.INFO, this.root.level);
    }
    /**
     * Checks if the currently set log level includes debug logging.
     *
     * @public
     * @returns if the currently set log level includes debug logging.
     */
    isDebug() {
        return matchesLevel(Levels.DEBUG, this.root.level);
    }
    /**
     * Checks if the currently set log level includes trace logging.
     *
     * @public
     * @returns if the currently set log level includes trace logging.
     */
    isTrace() {
        return matchesLevel(Levels.TRACE, this.root.level);
    }
}
export { DefaultLogger };
//# sourceMappingURL=DefaultLogger.js.map