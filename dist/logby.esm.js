import { getName } from 'lightdash';

/**
 * Default level-list.
 *
 * @public
 */
const Levels = {
    NONE: {
        val: -1
    },
    ERROR: {
        name: "ERROR",
        val: 0
    },
    WARN: {
        name: "WARN",
        val: 1
    },
    INFO: {
        name: "INFO",
        val: 2
    },
    DEBUG: {
        name: "DEBUG",
        val: 3
    },
    TRACE: {
        name: "TRACE",
        val: 4
    }
};

/**
 * Default appender-fn, doing the actual logging.
 *
 * @public
 * @param level Level of the entry to log.
 * @param name Name of the logger instance.
 * @param args Arguments to log.
 */
const defaultLoggingAppender = (name, level, args) => {
    let loggerFn = console.log;
    if (level === Levels.ERROR) {
        // tslint:disable-next-line
        loggerFn = console.error;
    }
    else if (level === Levels.WARN) {
        // tslint:disable-next-line
        loggerFn = console.warn;
    }
    else if (level === Levels.INFO) {
        // tslint:disable-next-line
        loggerFn = console.info;
    }
    loggerFn(`${new Date().toISOString()} ${level.name} ${name}`, ...args);
};

/**
 * Appender delegating all invocations to the given other {@link Logby} instance.
 *
 * @public
 * @param target Logby instance to delegate to.
 * @returns A delegating appender delegating to the given target.
 */
const createDelegatingAppender = (target) => (name, level, args) => target.appenders.forEach(fn => fn(name, level, args));

/**
 * Default {@link ILogger} class.
 *
 * @private
 */
class DefaultLogger {
    /**
     * Creates a new {@link DefaultLogger}.
     * Should not be constructed directly, rather use {@link Logby.getLogger}.
     *
     * @param root Root logger of this logger.
     * @param name Name of the logger.
     */
    constructor(root, name) {
        this.root = root;
        this.name = name;
    }
    /**
     * Logs a message.
     *
     * @param level Levels of the log.
     * @param args Arguments to be logged.
     */
    log(level, ...args) {
        if (this.root.level.val >= level.val) {
            this.root.appenders.forEach(fn => fn(this.name, level, args));
        }
    }
    /**
     * Logs an error.
     *
     * @param args Arguments to be logged.
     */
    error(...args) {
        this.log(Levels.ERROR, ...args);
    }
    /**
     * Logs a warning.
     *
     * @param args Arguments to be logged.
     */
    warn(...args) {
        this.log(Levels.WARN, ...args);
    }
    /**
     * Logs an info.
     *
     * @param args Arguments to be logged.
     */
    info(...args) {
        this.log(Levels.INFO, ...args);
    }
    /**
     * Logs a debug message.
     *
     * @param args Arguments to be logged.
     */
    debug(...args) {
        this.log(Levels.DEBUG, ...args);
    }
    /**
     * Logs a trace message.
     *
     * @param args Arguments to be logged.
     */
    trace(...args) {
        this.log(Levels.TRACE, ...args);
    }
}

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
        const name = getName(nameable);
        if (name == null) {
            throw new TypeError(`'${nameable}' is neither an INameable nor a string.`);
        }
        if (!this.loggers.has(name)) {
            const logger = new DefaultLogger(this, name);
            this.loggers.set(name, logger);
        }
        return this.loggers.get(name);
    }
}

export { Levels, Logby, createDelegatingAppender, defaultLoggingAppender };
