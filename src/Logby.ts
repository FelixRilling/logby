import { name } from "lightdash";
import { AppenderFn } from "./appender/AppenderFn";
import { AppenderList } from "./appender/AppenderList";
import { defaultLoggingAppender } from "./appender/defaultLoggingAppender";
import { Level } from "./level/Level";
import { Levels } from "./level/Levels";
import { DefaultLogger } from "./logger/DefaultLogger";
import { Logger } from "./logger/Logger";
import { LoggerMap } from "./logger/LoggerMap";

/**
 * Main logby class.
 */
class Logby {
    public readonly appenders: AppenderList;
    public level: Level;
    private readonly loggers: LoggerMap;

    /**
     * Creates a new Logby instance.
     */
    public constructor() {
        this.loggers = new Map<string, Logger>();
        this.appenders = new Set<AppenderFn>([defaultLoggingAppender]);
        this.level = Levels.INFO;
    }

    /**
     * Gets and/or creates a logger instance.
     *
     * @param nameable String or INameable (ex: named class or named function).
     * @returns The logger instance.
     */
    public getLogger(nameable: any): Logger {
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
