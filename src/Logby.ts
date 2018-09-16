import { isObject, isString } from "lightdash";
import { appenderFn } from "./appender/appenderFn";
import { ILevel } from "./level/ILevel";
import { ILogger } from "./logger/ILogger";
import { Level } from "./level/Level";
import { Logger } from "./logger/Logger";
import { defaultAppenderFn } from "./appender/defaultAppenderFn";
import { ITypedObject } from "lightdash/types/obj/lib/ITypedObject";

/**
 * Logger-root class.
 */
class Logby {
    public level: ILevel;
    public appenderQueue: appenderFn[];

    private readonly loggerMap = new Map<string, ILogger>();

    /**
     * Creates a new logger module.
     *
     * @param level Level of this logger-root loggers.
     */
    constructor(level: ILevel = Level.INFO) {
        this.level = level;
        this.appenderQueue = [defaultAppenderFn];
    }

    /**
     * Get a logger instance.
     *
     * @param nameable A string or an INameable (ex: class, function).
     * @returns The Logger instance.
     */
    public getLogger(nameable: any): ILogger {
        let name: string;

        if (isObject(nameable) && "name" in nameable) {
            name = (<ITypedObject<any>>nameable).name;
        } else if (isString(nameable)) {
            name = nameable;
        } else {
            throw new TypeError(
                `'${nameable}' is neither an INameable nor a string.`
            );
        }

        if (this.loggerMap.has(name)) {
            return <Logger>this.loggerMap.get(name);
        }

        const logger = new Logger(this, name);
        this.loggerMap.set(name, logger);

        return logger;
    }
}

export { Logby };
