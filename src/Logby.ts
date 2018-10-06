import { isObject, isString } from "lightdash";
import { ITypedObject } from "lightdash/types/obj/lib/ITypedObject";
import { appenderFn } from "./appender/appenderFn";
import { defaultAppenderFn } from "./appender/defaultAppenderFn";
import { ILevel } from "./level/ILevel";
import { Levels } from "./level/Levels";
import { DefaultLogger } from "./logger/DefaultLogger";
import { ILogger } from "./logger/ILogger";

/**
 * Logby class.
 *
 * @public
 */
class Logby {
    private readonly loggerMap = new Map<string, ILogger>();
    private level: ILevel;

    public appenderQueue: appenderFn[];

    /**
     * Creates a new Logby instance.
     */
    constructor() {
        this.level = Levels.INFO;
        this.appenderQueue = [defaultAppenderFn];
    }

    /**
     * Get and/or creates a logger instance.
     *
     * @param nameable A string or an INameable (ex: class, function).
     * @returns The logger instance.
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

    getLevel(): ILevel {
        return this.level;
    }

    setLevel(value: ILevel) {
        this.level = value;
    }
}

export { Logby };
