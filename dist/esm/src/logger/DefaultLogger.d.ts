import { Level } from "../level/Level";
import { Logby } from "../Logby";
import { Logger } from "./Logger";
/**
 * Default {@link Logger} class.
 *
 * @private
 */
declare class DefaultLogger implements Logger {
    private readonly root;
    private readonly name;
    /**
     * Creates a new {@link DefaultLogger}.
     * Should not be constructed directly, rather use {@link Logby.getLogger}.
     *
     * @public
     * @param root Root logger of this logger.
     * @param name Name of the logger.
     */
    constructor(root: Logby, name: string);
    /**
     * Logs a message.
     *
     * @public
     * @param level Levels of the log.
     * @param args Arguments to be logged.
     */
    log(level: Level, ...args: any[]): void;
    /**
     * Logs an error.
     *
     * @public
     * @param args Arguments to be logged.
     */
    error(...args: any[]): void;
    /**
     * Logs a warning.
     *
     * @public
     * @param args Arguments to be logged.
     */
    warn(...args: any[]): void;
    /**
     * Logs an info.
     *
     * @public
     * @param args Arguments to be logged.
     */
    info(...args: any[]): void;
    /**
     * Logs a debug message.
     *
     * @public
     * @param args Arguments to be logged.
     */
    debug(...args: any[]): void;
    /**
     * Logs a trace message.
     *
     * @public
     * @param args Arguments to be logged.
     */
    trace(...args: any[]): void;
    /**
     * Checks if the currently set log level includes error logging.
     *
     * @public
     * @returns if the currently set log level includes error logging.
     */
    isError(): boolean;
    /**
     * Checks if the currently set log level includes warning logging.
     *
     * @public
     * @returns if the currently set log level includes warning logging.
     */
    isWarn(): boolean;
    /**
     * Checks if the currently set log level includes info logging.
     *
     * @public
     * @returns if the currently set log level includes info logging.
     */
    isInfo(): boolean;
    /**
     * Checks if the currently set log level includes debug logging.
     *
     * @public
     * @returns if the currently set log level includes debug logging.
     */
    isDebug(): boolean;
    /**
     * Checks if the currently set log level includes trace logging.
     *
     * @public
     * @returns if the currently set log level includes trace logging.
     */
    isTrace(): boolean;
}
export { DefaultLogger };
//# sourceMappingURL=DefaultLogger.d.ts.map