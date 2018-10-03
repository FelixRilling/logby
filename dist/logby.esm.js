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
 * Checks if a value is an array.
 *
 * Alias of the native `Array.isArray`.
 *
 * @function isArray
 * @memberof Is
 * @since 1.0.0
 * @param {any} val
 * @returns {boolean}
 * @example
 * isArray([1, 2, 3]);
 * // => true
 *
 * isArray({});
 * // => false
 */

/**
 * Checks if the value has a certain type-string.
 *
 * @function isTypeOf
 * @memberof Is
 * @since 1.0.0
 * @param {any} val
 * @param {string} type
 * @returns {boolean}
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
 * @function isNil
 * @memberof Is
 * @since 1.0.0
 * @param {any} val
 * @returns {boolean}
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
 * @function isString
 * @memberof Is
 * @since 1.0.0
 * @param {any} val
 * @returns {boolean}
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
 * @function isObject
 * @memberof Is
 * @since 1.0.0
 * @param {any} val
 * @returns {boolean}
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
 * The default appender-fn, doing the actual logging.
 *
 * @private
 * @param level Level of the entry to log.
 * @param name Name of the logger instance.
 * @param args Arguments to log.
 */
const defaultAppenderFn = (level, name, args) => {
    const meta = `${new Date().toISOString()} ${level.name} ${name}`;
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
    loggerFn(meta, ...args);
};

/**
 * Default {@link ILogger} class.
 *
 * @private
 */
class DefaultLogger {
    /**
     * Creates a new {@link DefaultLogger}.
     * Should not be constructed directly, rather use {@link Logby.getLogger}
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
     * @param args arguments to be logged.
     */
    log(level, ...args) {
        if (this.root.level.val >= level.val) {
            this.root.appenderQueue.forEach(fn => fn(level, this.name, args));
        }
    }
    /**
     * Logs an error.
     *
     * @param args arguments to be logged.
     */
    error(...args) {
        this.log(Levels.ERROR, ...args);
    }
    /**
     * Logs a warning.
     *
     * @param args arguments to be logged.
     */
    warn(...args) {
        this.log(Levels.WARN, ...args);
    }
    /**
     * Logs an info.
     *
     * @param args arguments to be logged.
     */
    info(...args) {
        this.log(Levels.INFO, ...args);
    }
    /**
     * Logs a debug message.
     *
     * @param args arguments to be logged.
     */
    debug(...args) {
        this.log(Levels.DEBUG, ...args);
    }
    /**
     * Logs a trace message.
     *
     * @param args arguments to be logged.
     */
    trace(...args) {
        this.log(Levels.TRACE, ...args);
    }
}

/**
 * Logger-root class.
 *
 * @public
 */
class Logby {
    /**
     * Creates a new logger module.
     *
     * @param level Levels of this logger-root loggers.
     */
    constructor(level = Levels.INFO) {
        this.loggerMap = new Map();
        this.level = level;
        this.appenderQueue = [defaultAppenderFn];
    }
    /**
     * Get and/or creates a logger instance.
     *
     * @param nameable A string or an INameable (ex: class, function).
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
        if (this.loggerMap.has(name)) {
            return this.loggerMap.get(name);
        }
        const logger = new DefaultLogger(this, name);
        this.loggerMap.set(name, logger);
        return logger;
    }
}

export { Levels, Logby };
