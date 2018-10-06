import { appenderFn } from "./appender/appenderFn";
import { appenderMap } from "./appender/appenderMap";
import { ILevel } from "./level/ILevel";
import { ILogger } from "./logger/ILogger";
/**
 * Logby class.
 *
 * @public
 */
declare class Logby {
    private readonly loggers;
    private readonly appenders;
    private level;
    /**
     * Creates a new Logby instance.
     */
    constructor();
    /**
     * Get and/or creates a logger instance.
     *
     * @param nameable A string or an INameable (ex: class, function).
     * @returns The logger instance.
     */
    getLogger(nameable: any): ILogger;
    /**
     * Get the active log level.
     *
     * @return The active log level.
     */
    getLevel(): ILevel;
    /**
     * Set the active log level.
     *
     * @param level Level to set.
     */
    setLevel(level: ILevel): void;
    /**
     * Attaches an appender to the instance.
     *
     * @param name Name of the appender.
     * @param fn Appender function.
     */
    attachAppender(name: string, fn: appenderFn): void;
    /**
     * Detaches an appender.
     *
     * @param name Name of the appender.
     */
    detachAppender(name: string): void;
    /**
     * Get all active appenders.
     *
     * @return All active appenders.
     */
    getAppenders(): appenderMap;
}
export { Logby };
