import { name } from "lightdash";
import { appenderFn } from "./appender/appenderFn";
import { appenderList } from "./appender/appenderList";
import { defaultLoggingAppender } from "./appender/defaultLoggingAppender";
import { ILevel } from "./level/ILevel";
import { Levels } from "./level/Levels";
import { DefaultLogger } from "./logger/DefaultLogger";
import { ILogger } from "./logger/ILogger";
import { loggerMap } from "./logger/loggerMap";

/**
 * Main logby class.
 */
class Logby {
    public readonly appenders: appenderList;
    public level: ILevel;
    private readonly loggers: loggerMap;

    /**
     * Creates a new Logby instance.
     */
    constructor() {
        this.loggers = new Map<string, ILogger>();
        this.appenders = new Set<appenderFn>([defaultLoggingAppender]);
        this.level = Levels.INFO;
    }

    /**
     * Gets and/or creates a logger instance.
     *
     * @param nameable String or INameable (ex: named class or named function).
     * @returns The logger instance.
     */
    public getLogger(nameable: any): ILogger {
        const loggerName = name(nameable);

        if (loggerName == null) {
            throw new TypeError(
                `'${nameable}' is neither an INameable nor a string.`
            );
        }

        if (!this.loggers.has(loggerName)) {
            const logger = new DefaultLogger(this, loggerName);
            this.loggers.set(loggerName, logger);
        }

        return this.loggers.get(loggerName)!;
    }
}

export { Logby };
