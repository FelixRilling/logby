import { ILevel } from "../level/ILevel";
import { Levels } from "../level/Levels";
import { Logby } from "../Logby";
import { ILogger } from "./ILogger";

/**
 * Default {@link ILogger} class.
 *
 * @private
 */
class DefaultLogger implements ILogger {
    private readonly root: Logby;
    private readonly name: string;

    /**
     * Creates a new {@link DefaultLogger}.
     * Should not be constructed directly, rather use {@link Logby.getLogger}.
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
     * @param level Levels of the log.
     * @param args Arguments to be logged.
     */
    public log(level: ILevel, ...args: any[]) {
        if (this.root.level.val >= level.val) {
            this.root.appenders.forEach(fn => fn(this.name, level, args));
        }
    }

    /**
     * Logs an error.
     *
     * @param args Arguments to be logged.
     */
    public error(...args: any[]) {
        this.log(Levels.ERROR, ...args);
    }

    /**
     * Logs a warning.
     *
     * @param args Arguments to be logged.
     */
    public warn(...args: any[]) {
        this.log(Levels.WARN, ...args);
    }

    /**
     * Logs an info.
     *
     * @param args Arguments to be logged.
     */
    public info(...args: any[]) {
        this.log(Levels.INFO, ...args);
    }

    /**
     * Logs a debug message.
     *
     * @param args Arguments to be logged.
     */
    public debug(...args: any[]) {
        this.log(Levels.DEBUG, ...args);
    }

    /**
     * Logs a trace message.
     *
     * @param args Arguments to be logged.
     */
    public trace(...args: any[]) {
        this.log(Levels.TRACE, ...args);
    }
}

export { DefaultLogger };
