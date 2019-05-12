import { ILevel } from "../level/ILevel";
import { Levels } from "../level/Levels";
import { Logby } from "../Logby";
import { ILogger } from "./ILogger";
import { matchesLevel } from "../level/matchesLevel";

/**
 * Default {@link ILogger} class.
 *
 * @private
 */
class DefaultLogger implements ILogger {
    private readonly root: Logby;
    private readonly name: string;

    /**
     * Creates a new {@link DefaultLogger}.
     * Should not be constructed directly, rather use {@link Logby.getLogger}.
     *
     * @public
     * @param root Root logger of this logger.
     * @param name Name of the logger.
     */
    constructor(root: Logby, name: string) {
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
    public log(level: ILevel, ...args: any[]) {
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
    public error(...args: any[]) {
        this.log(Levels.ERROR, ...args);
    }

    /**
     * Logs a warning.
     *
     * @public
     * @param args Arguments to be logged.
     */
    public warn(...args: any[]) {
        this.log(Levels.WARN, ...args);
    }

    /**
     * Logs an info.
     *
     * @public
     * @param args Arguments to be logged.
     */
    public info(...args: any[]) {
        this.log(Levels.INFO, ...args);
    }

    /**
     * Logs a debug message.
     *
     * @public
     * @param args Arguments to be logged.
     */
    public debug(...args: any[]) {
        this.log(Levels.DEBUG, ...args);
    }

    /**
     * Logs a trace message.
     *
     * @public
     * @param args Arguments to be logged.
     */
    public trace(...args: any[]) {
        this.log(Levels.TRACE, ...args);
    }

    /**
     * Checks if the currently set log level includes error logging.
     *
     * @public
     * @returns if the currently set log level includes error logging.
     */
    public isError(): boolean {
        return matchesLevel(Levels.ERROR, this.root.level);
    }

    /**
     * Checks if the currently set log level includes warning logging.
     *
     * @public
     * @returns if the currently set log level includes warning logging.
     */
    public isWarn(): boolean {
        return matchesLevel(Levels.WARN, this.root.level);
    }

    /**
     * Checks if the currently set log level includes info logging.
     *
     * @public
     * @returns if the currently set log level includes info logging.
     */
    public isInfo(): boolean {
        return matchesLevel(Levels.INFO, this.root.level);
    }

    /**
     * Checks if the currently set log level includes debug logging.
     *
     * @public
     * @returns if the currently set log level includes debug logging.
     */
    public isDebug(): boolean {
        return matchesLevel(Levels.DEBUG, this.root.level);
    }

    /**
     * Checks if the currently set log level includes trace logging.
     *
     * @public
     * @returns if the currently set log level includes trace logging.
     */
    public isTrace(): boolean {
        return matchesLevel(Levels.TRACE, this.root.level);
    }
}

export { DefaultLogger };
