var logby = (function (exports) {
    'use strict';

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

    // File is named "_index.ts" to avoid it being treated as a module index file.

    /**
     * Checks if the value has any of the given types.
     * If at least one type gives back true, true is returned.
     *
     * @memberof Is
     * @since 1.0.0
     * @param {any} val Value to check.
     * @param {...string} types Type strings to compare the value to.
     * @returns {boolean} If the value has the type provided.
     * @example
     * isTypeOf("foo", "string")
     * // => true
     *
     * isTypeOf("foo", "number", "string")
     * // => true
     *
     * isTypeOf("foo", "number")
     * // => false
     */
    const isTypeOf = (val, ...types) => types.some(type => typeof val === type);

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
     * Checks if a value is not nil and has a type of object.
     *
     * The main difference to {@link isObject} is that functions are not considered object-like,
     * because `typeof function(){}` returns `"function"`.
     *
     * @memberof Is
     * @since 1.0.0
     * @param {any} val Value to check,
     * @returns {boolean} If the value is object-like.
     * @example
     * isObjectLike({})
     * // => true
     *
     * isObjectLike([])
     * // => true
     *
     * isObjectLike(() => 1))
     * // => false
     *
     * isObjectLike(1)
     * // => false
     */
    const isObjectLike = (val) => !isNil(val) && isTypeOf(val, "object");

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
     * Checks if a value is a function.
     *
     * @memberof Is
     * @since 1.0.0
     * @param {any} val Value to check.
     * @returns {boolean} If the value is a function.
     * @example
     * isFunction(function a(){})
     * // => true
     *
     * isFunction(Array.from)
     * // => true
     *
     * isFunction(null)
     * // => false
     */
    const isFunction = (val) => isTypeOf(val, "function");

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
    const isObject = (val) => isObjectLike(val) || isFunction(val);

    /**
     * Checks if a value is a symbol.
     *
     * @memberof Is
     * @since 1.0.0
     * @param {any} val Value to check.
     * @returns {boolean} If the value is a symbol.
     * @example
     * isSymbol(Symbol())
     * // => true
     *
     * isSymbol(Symbol.split)
     * // => true
     *
     * isSymbol("foo")
     * // => false
     */
    const isSymbol = (val) => isTypeOf(val, "symbol");

    /**
     * Gets name of a value.
     *
     * If the value has a name or description property, the value of that is returned.
     * If the value is a string, it is returned as is.
     * Otherwise null is returned.
     *
     * @memberof Get
     * @since 10.2.0
     * @param {any} val Value to check.
     * @returns {string} The name of the value.
     * @example
     * getName(class Foo{})
     * // => "Foo"
     *
     * getName(function bar(){})
     * // => "bar"
     *
     * getName(Symbol("abc"))
     * // => "abc"
     *
     * getName("foo")
     * // => "foo"
     *
     * getName(1)
     * // => null
     */
    const getName = (val) => {
        if (isString(val)) {
            return val;
        }
        if (isObject(val) && !isNil(val.name)) {
            return val.name;
        }
        if (isSymbol(val) && !isNil(val.description)) {
            return val.description;
        }
        return null;
    };

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

    exports.Levels = Levels;
    exports.Logby = Logby;
    exports.createDelegatingAppender = createDelegatingAppender;
    exports.defaultLoggingAppender = defaultLoggingAppender;

    return exports;

}({}));
//# sourceMappingURL=logby.js.map
