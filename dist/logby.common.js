'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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
 * Name of the default appenderFn, can be used to detach it.
 */
const DEFAULT_APPENDER_NAME = "defaultAppender";
/**
 * Default appender-fn, doing the actual logging.
 *
 * @private
 * @param level Level of the entry to log.
 * @param name Name of the logger instance.
 * @param args Arguments to log.
 */
const defaultAppenderFn = (level, name, args) => {
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

// File is named "_index.ts" to avoid it being treated as a module index file.

/**
 * Checks if the value has a certain type-string.
 *
 * @memberof Is
 * @since 1.0.0
 * @param {any} val Value to check.
 * @param {string} type Type string to compare the value to.
 * @returns {boolean} If the value has the type provided.
 * @example
 * isTypeOf("foo", "string")
 * // => true
 *
 * isTypeOf("foo", "number")
 * // => false
 */
const isTypeOf = (val, type) => typeof val === type;

/**
 * Checks if a value is undefined or null.
 *
 * @memberof Is
 * @since 1.0.0
 * @param {any} val Value to check.
 * @returns {boolean} If the value is nil.
 * @example
 * isNil(null)
 * // => true
 *
 * isNil(undefined)
 * // => true
 *
 * isNil(0)
 * // => false
 *
 * isNil("")
 * // => false
 */
const isNil = (val) => val == null;

/**
 * Checks if a value is a string.
 *
 * @memberof Is
 * @since 1.0.0
 * @param {any} val Value to check.
 * @returns {boolean} if the value is a string.
 * @example
 * isString("foo")
 * // => true
 *
 * isString(1)
 * // => false
 */
const isString = (val) => isTypeOf(val, "string");

/**
 * Checks if a value is an object.
 *
 * @memberof Is
 * @since 1.0.0
 * @param {any} val Value to check.
 * @returns {boolean} If the value is an object.
 * @example
 * isObject({})
 * // => true
 *
 * isObject([])
 * // => true
 *
 * isObject(() => 1))
 * // => true
 *
 * isObject(1)
 * // => false
 */
const isObject = (val) => !isNil(val) && (isTypeOf(val, "object") || isTypeOf(val, "function"));

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
        if (this.root.getLevel().val >= level.val) {
            this.root.getAppenders().forEach(fn => fn(level, this.name, args));
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
        this.appenders = new Map([
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
    getLogger(nameable) {
        let name;
        if (isObject(nameable) && "name" in nameable) {
            name = nameable.name;
        }
        else if (isString(nameable)) {
            name = nameable;
        }
        else {
            throw new TypeError(`'${nameable}' is neither an INameable nor a string.`);
        }
        if (this.loggers.has(name)) {
            return this.loggers.get(name);
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
    getLevel() {
        return this.level;
    }
    /**
     * Sets the active log level.
     *
     * @param level Level to set.
     */
    setLevel(level) {
        this.level = level;
    }
    /**
     * Attaches an appender to the instance.
     *
     * @param name Name of the appender.
     * @param fn Appender function.
     */
    attachAppender(name, fn) {
        this.appenders.set(name, fn);
    }
    /**
     * Detaches an appender.
     *
     * @param name Name of the appender.
     */
    detachAppender(name) {
        this.appenders.delete(name);
    }
    /**
     * Gets all active appenders.
     *
     * @return All active appenders.
     */
    getAppenders() {
        return this.appenders;
    }
}

exports.Levels = Levels;
exports.Logby = Logby;
exports.DEFAULT_APPENDER_NAME = DEFAULT_APPENDER_NAME;
exports.defaultAppenderFn = defaultAppenderFn;
