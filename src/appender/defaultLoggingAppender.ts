import { ILevel } from "../level/ILevel";
import { Levels } from "../level/Levels";
import { appenderFn } from "./appenderFn";

/**
 * Helper method for creating log entry prefix.
 *
 * @private
 * @param name Name of the logger instance.
 * @param level Level of the entry to log.
 * @returns Log entry prefix.
 */
const createDefaultLogPrefix = (name: string, level: ILevel) =>
    `${new Date().toISOString()} ${level.name} ${name}`;

/**
 * Default appender, doing the actual logging.
 *
 * @public
 * @param name Name of the logger instance.
 * @param level Level of the entry to log.
 * @param args Arguments to log.
 */
const defaultLoggingAppender: appenderFn = (
    name: string,
    level: ILevel,
    args: any[]
) => {
    let loggerFn = console.log;

    if (level === Levels.ERROR) {
        // tslint:disable-next-line
        loggerFn = console.error;
    } else if (level === Levels.WARN) {
        // tslint:disable-next-line
        loggerFn = console.warn;
    } else if (level === Levels.INFO) {
        // tslint:disable-next-line
        loggerFn = console.info;
    }

    loggerFn(createDefaultLogPrefix(name, level), ...args);
};

export { defaultLoggingAppender, createDefaultLogPrefix };
