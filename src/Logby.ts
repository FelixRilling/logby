import { isObject, isString } from "lightdash";
import { ITypedObject } from "lightdash/types/obj/lib/ITypedObject";
import { appenderFn } from "./appender/appenderFn";
import { appenderMap } from "./appender/appenderMap";
import {
    DEFAULT_APPENDER_NAME,
    defaultAppenderFn
} from "./appender/defaultAppender";
import { ILevel } from "./level/ILevel";
import { Levels } from "./level/Levels";
import { DefaultLogger } from "./logger/DefaultLogger";
import { ILogger } from "./logger/ILogger";
import { loggerMap } from "./logger/loggerMap";

/**
 * Main logby class.
 */
class Logby {
    private readonly loggers: loggerMap;
    private readonly appenders: appenderMap;
    private level: ILevel;

    /**
     * Creates a new Logby instance.
     */
    constructor() {
        this.loggers = new Map<string, ILogger>();
        this.appenders = new Map<string, appenderFn>([
            [DEFAULT_APPENDER_NAME, defaultAppenderFn]
        ]);
        this.level = Levels.INFO;
    }

    /**
     * Gets and/or creates a logger instance.
     *
     * @param nameable String or INameable (ex: named class or named function).
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

        if (this.loggers.has(name)) {
            return this.loggers.get(name)!;
        }

        const logger = new DefaultLogger(this, name);
        this.loggers.set(name, logger);

        return logger;
    }

    /**
     * Gets the active log level.
     *
     * @return The active log level.
     */
    public getLevel(): ILevel {
        return this.level;
    }

    /**
     * Sets the active log level.
     *
     * @param level Level to set.
     */
    public setLevel(level: ILevel) {
        this.level = level;
    }

    /**
     * Attaches an appender to the instance.
     *
     * @param name Name of the appender.
     * @param fn Appender function.
     */
    public attachAppender(name: string, fn: appenderFn): void {
        this.appenders.set(name, fn);
    }

    /**
     * Detaches an appender.
     *
     * @param name Name of the appender.
     */
    public detachAppender(name: string): void {
        this.appenders.delete(name);
    }

    /**
     * Gets all active appenders.
     *
     * @return All active appenders.
     */
    public getAppenders(): appenderMap {
        return this.appenders;
    }
}

export { Logby };
