import { appenderFn } from "./appender/appenderFn";
import { ILevel } from "./level/ILevel";
import { ILogger } from "./logger/ILogger";
/**
 * Logger-root class.
 */
declare class Logby {
    level: ILevel;
    appenderQueue: appenderFn[];
    private readonly loggerMap;
    /**
     * Creates a new logger module.
     *
     * @param level Level of this logger-root loggers.
     */
    constructor(level?: ILevel);
    /**
     * Get a logger instance.
     *
     * @param nameable A string or an INameable (ex: class, function).
     * @returns The Logger instance.
     */
    getLogger(nameable: any): ILogger;
}
export { Logby };
