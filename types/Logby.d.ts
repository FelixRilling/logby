import { appenderFn } from "./appender/appenderFn";
import { appenderMap } from "./appender/appenderMap";
import { ILevel } from "./level/ILevel";
import { ILogger } from "./logger/ILogger";
/**
 * Main logby class.
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
     * Gets and/or creates a logger instance.
     *
     * @param nameable String or INameable (ex: named class or named function).
     * @returns The logger instance.
     */
    getLogger(nameable: any): ILogger;
    /**
     * Gets the active log level.
     *
     * @return The active log level.
     */
    getLevel(): ILevel;
    /**
     * Sets the active log level.
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
     * Gets all active appenders.
     *
     * @return All active appenders.
     */
    getAppenders(): appenderMap;
}
export { Logby };
