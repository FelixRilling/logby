'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var lightdash = require('lightdash');

/**
 * Default level-list. Can be used to set the level of a {@link Logby} instance.
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
 * Helper method for creating log entry prefix.
 *
 * @private
 * @param name Name of the logger instance.
 * @param level Level of the entry to log.
 * @returns Log entry prefix.
 */
const createDefaultLogPrefix = (name, level) => `${new Date().toISOString()} ${level.name} ${name}`;
/**
 * Default appender, doing the actual logging.
 *
 * @public
 * @param name Name of the logger instance.
 * @param level Level of the entry to log.
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
    loggerFn(createDefaultLogPrefix(name, level), ...args);
};

const defaultDelegationNameProducer = (name) => `${name} (Delegated)`;
/**
 * Creates a new delegatingAppender for the given target.
 * A delegatingAppender is an appender delegating all invocations to the given other {@link Logby} instance.
 *
 * @public
 * @param target Logby instance to delegate to.
 * @param nameProducer Function for calculating the new internal logger name.
 * @returns A delegating appender delegating to the given target.
 */
const createDelegatingAppender = (target, nameProducer = defaultDelegationNameProducer) => (name, level, args) => target.getLogger(nameProducer(name)).log(level, ...args);

/**
 * Checks if the given level is considered part of the active level.
 *
 * @private
 * @param incoming Level to check.
 * @param active level to check against.
 * @returns if the given level matches the active level.
 */
const matchesLevel = (incoming, active) => incoming.val <= active.val;

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
     * @public
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
     * @public
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
     * @public
     * @param args Arguments to be logged.
     */
    error(...args) {
        this.log(Levels.ERROR, ...args);
    }
    /**
     * Logs a warning.
     *
     * @public
     * @param args Arguments to be logged.
     */
    warn(...args) {
        this.log(Levels.WARN, ...args);
    }
    /**
     * Logs an info.
     *
     * @public
     * @param args Arguments to be logged.
     */
    info(...args) {
        this.log(Levels.INFO, ...args);
    }
    /**
     * Logs a debug message.
     *
     * @public
     * @param args Arguments to be logged.
     */
    debug(...args) {
        this.log(Levels.DEBUG, ...args);
    }
    /**
     * Logs a trace message.
     *
     * @public
     * @param args Arguments to be logged.
     */
    trace(...args) {
        this.log(Levels.TRACE, ...args);
    }
    /**
     * Checks if the currently set log level includes error logging.
     *
     * @public
     * @returns if the currently set log level includes error logging.
     */
    isError() {
        return matchesLevel(Levels.ERROR, this.root.level);
    }
    /**
     * Checks if the currently set log level includes warning logging.
     *
     * @public
     * @returns if the currently set log level includes warning logging.
     */
    isWarn() {
        return matchesLevel(Levels.WARN, this.root.level);
    }
    /**
     * Checks if the currently set log level includes info logging.
     *
     * @public
     * @returns if the currently set log level includes info logging.
     */
    isInfo() {
        return matchesLevel(Levels.INFO, this.root.level);
    }
    /**
     * Checks if the currently set log level includes debug logging.
     *
     * @public
     * @returns if the currently set log level includes debug logging.
     */
    isDebug() {
        return matchesLevel(Levels.DEBUG, this.root.level);
    }
    /**
     * Checks if the currently set log level includes trace logging.
     *
     * @public
     * @returns if the currently set log level includes trace logging.
     */
    isTrace() {
        return matchesLevel(Levels.TRACE, this.root.level);
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
        const loggerName = lightdash.name(nameable);
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

exports.Levels = Levels;
exports.Logby = Logby;
exports.createDelegatingAppender = createDelegatingAppender;
exports.defaultLoggingAppender = defaultLoggingAppender;
