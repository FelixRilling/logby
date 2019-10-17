import { name } from "lightdash";
import { defaultLoggingAppender } from "./appender/defaultLoggingAppender";
import { Levels } from "./level/Levels";
import { DefaultLogger } from "./logger/DefaultLogger";
/**
 * Main logby class.
 */
class Logby {
    /**
     * Creates a new Logby instance.
     */
    constructor() {
        this.loggers = new Map();
        this.appenders = new Set([defaultLoggingAppender]);
        this.level = Levels.INFO;
    }
    /**
     * Gets and/or creates a logger instance.
     *
     * @param nameable String or INameable (ex: named class or named function).
     * @returns The logger instance.
     */
    getLogger(nameable) {
        const loggerName = name(nameable);
        if (loggerName == null) {
            throw new TypeError(`'${nameable}' is neither an INameable nor a string.`);
        }
        if (!this.loggers.has(loggerName)) {
            const logger = new DefaultLogger(this, loggerName);
            this.loggers.set(loggerName, logger);
        }
        return this.loggers.get(loggerName);
    }
}
export { Logby };
//# sourceMappingURL=Logby.js.map