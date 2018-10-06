import { appenderFn } from "./appender/appenderFn";
import { ILevel } from "./level/ILevel";
import { ILogger } from "./logger/ILogger";
/**
 * Logby class.
 *
 * @public
 */
declare class Logby {
    private readonly loggerMap;
    private level;
    appenderQueue: appenderFn[];
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
    getLevel(): ILevel;
    setLevel(value: ILevel): void;
}
export { Logby };
