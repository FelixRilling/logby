var logby = (function (exports) {
    'use strict';

    /**
     * Default level-list.
     */
    const Level = {
        NONE: {
            val: -1
        },
        ERROR: {
            val: 0,
            name: "ERROR"
        },
        WARN: {
            val: 1,
            name: "WARN"
        },
        INFO: {
            val: 2,
            name: "INFO"
        },
        DEBUG: {
            val: 3,
            name: "DEBUG"
        },
        TRACE: {
            val: 4,
            name: "TRACE"
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
     * Logger class.
     */
    class Logger {
        /**
         * Creates a new {@link Logger}.
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
         * @param level Level of the log.
         * @param args arguments to be logged.
         */
        log(level, args) {
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
            this.log(Level.ERROR, args);
        }
        /**
         * Logs a warning.
         *
         * @param args arguments to be logged.
         */
        warn(...args) {
            this.log(Level.WARN, args);
        }
        /**
         * Logs an info.
         *
         * @param args arguments to be logged.
         */
        info(...args) {
            this.log(Level.INFO, args);
        }
        /**
         * Logs a debug message.
         *
         * @param args arguments to be logged.
         */
        debug(...args) {
            this.log(Level.DEBUG, args);
        }
        /**
         * Logs a trace message.
         *
         * @param args arguments to be logged.
         */
        trace(...args) {
            this.log(Level.TRACE, args);
        }
    }

    const defaultAppenderFn = (level, name, args) => console.log(`${new Date().toISOString()} ${level.name} ${name}`, ...args);

    /**
     * Logger-root class.
     */
    class Logby {
        /**
         * Creates a new logger module.
         *
         * @param level Level of this logger-root loggers.
         */
        constructor(level = Level.INFO) {
            this.loggerMap = new Map();
            this.level = level;
            this.appenderQueue = [defaultAppenderFn];
        }
        /**
         * Get a logger instance.
         *
         * @param nameable A string or an INameable (ex: class, function).
         * @returns The Logger instance.
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
            const logger = new Logger(this, name);
            this.loggerMap.set(name, logger);
            return logger;
        }
    }

    exports.Level = Level;
    exports.Logby = Logby;

    return exports;

}({}));
//# sourceMappingURL=logby.js.map
