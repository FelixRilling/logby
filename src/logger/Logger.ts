import { ILogger } from "./ILogger";
import { ILevel } from "../level/ILevel";
import { Level } from "../level/Level";
import { Logby } from "../Logby";

/**
 * Logger class.
 */
class Logger implements ILogger {
    private readonly root: Logby;
    private readonly name: string;

    /**
     * Creates a new {@link Logger}.
     * Should not be constructed directly, rather use {@link Logby.getLogger}
     *
     * @param root Root logger of this logger.
     * @param name Name of the logger.
     */
    constructor(root: Logby, name: string) {
        this.root = root;
        this.name = name;
    }

    /**
     * Logs a message.
     *
     * @param level Level of the log.
     * @param args arguments to be logged.
     */
    log(level: ILevel, ...args: any[]) {
        if (this.root.level.val >= level.val) {
            this.root.appenderQueue.forEach(fn => fn(level, this.name, args));
        }
    }

    /**
     * Logs an error.
     *
     * @param args arguments to be logged.
     */
    error(...args: any[]) {
        this.log(Level.ERROR, args);
    }

    /**
     * Logs a warning.
     *
     * @param args arguments to be logged.
     */
    warn(...args: any[]) {
        this.log(Level.WARN, args);
    }

    /**
     * Logs an info.
     *
     * @param args arguments to be logged.
     */
    info(...args: any[]) {
        this.log(Level.INFO, args);
    }

    /**
     * Logs a debug message.
     *
     * @param args arguments to be logged.
     */
    debug(...args: any[]) {
        this.log(Level.DEBUG, args);
    }

    /**
     * Logs a trace message.
     *
     * @param args arguments to be logged.
     */
    trace(...args: any[]) {
        this.log(Level.TRACE, args);
    }
}

export { Logger };
