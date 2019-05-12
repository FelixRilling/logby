import { appenderList } from "./appender/appenderList";
import { ILevel } from "./level/ILevel";
import { ILogger } from "./logger/ILogger";
/**
 * Main logby class.
 */
declare class Logby {
    readonly appenders: appenderList;
    level: ILevel;
    private readonly loggers;
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
}
export { Logby };
