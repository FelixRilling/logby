import { Levels } from "../level/Levels";
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
        loggerFn = console.error;
    }
    else if (level === Levels.WARN) {
        loggerFn = console.warn;
    }
    else if (level === Levels.INFO) {
        loggerFn = console.info;
    }
    loggerFn(createDefaultLogPrefix(name, level), ...args);
};
export { defaultLoggingAppender, createDefaultLogPrefix };
//# sourceMappingURL=defaultLoggingAppender.js.map