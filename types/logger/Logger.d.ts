import { ILevel } from "../level/ILevel";
import { Logby } from "../Logby";
import { ILogger } from "./ILogger";
/**
 * Logger class.
 */
declare class Logger implements ILogger {
    private readonly root;
    private readonly name;
    /**
     * Creates a new {@link Logger}.
     * Should not be constructed directly, rather use {@link Logby.getLogger}
     *
     * @param root Root logger of this logger.
     * @param name Name of the logger.
     */
    constructor(root: Logby, name: string);
    /**
     * Logs a message.
     *
     * @param level Level of the log.
     * @param args arguments to be logged.
     */
    log(level: ILevel, args: any[]): void;
    /**
     * Logs an error.
     *
     * @param args arguments to be logged.
     */
    error(...args: any[]): void;
    /**
     * Logs a warning.
     *
     * @param args arguments to be logged.
     */
    warn(...args: any[]): void;
    /**
     * Logs an info.
     *
     * @param args arguments to be logged.
     */
    info(...args: any[]): void;
    /**
     * Logs a debug message.
     *
     * @param args arguments to be logged.
     */
    debug(...args: any[]): void;
    /**
     * Logs a trace message.
     *
     * @param args arguments to be logged.
     */
    trace(...args: any[]): void;
}
export { Logger };
