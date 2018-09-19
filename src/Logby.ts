import { isObject, isString } from "lightdash";
import { ITypedObject } from "lightdash/types/obj/lib/ITypedObject";
import { appenderFn } from "./appender/appenderFn";
import { defaultAppenderFn } from "./appender/defaultAppenderFn";
import { ILevel } from "./level/ILevel";
import { Level } from "./level/Level";
import { DefaultLogger } from "./logger/DefaultLogger";
import { ILogger } from "./logger/ILogger";

/**
 * DefaultLogger-root class.
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
     * @returns The DefaultLogger instance.
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
            return this.loggerMap.get(name)!;
        }

        const logger = new DefaultLogger(this, name);
        this.loggerMap.set(name, logger);

        return logger;
    }
}

export { Logby };
