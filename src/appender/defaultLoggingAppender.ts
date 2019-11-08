/* eslint-disable @typescript-eslint/unbound-method */
import { Level } from "../level/Level";
import { Levels } from "../level/Levels";
import { AppenderFn } from "./AppenderFn";

/**
 * Helper method for creating log entry prefix.
 *
 * @public
 * @param name Name of the logger instance.
 * @param level Level of the entry to log.
 * @returns Log entry prefix.
 */
const createDefaultLogPrefix = (name: string, level: Level): string =>
    `${new Date().toISOString()} ${level.name} ${name}`;

/**
 * Default appender, doing the actual logging.
 *
 * @public
 * @param name Name of the logger instance.
 * @param level Level of the entry to log.
 * @param args Arguments to log.
 */
const defaultLoggingAppender: AppenderFn = (
    name: string,
    level: Level,
    args: any[]
) => {
    let loggerFn = console.log;

    if (level === Levels.ERROR) {
        loggerFn = console.error;
    } else if (level === Levels.WARN) {
        loggerFn = console.warn;
    } else if (level === Levels.INFO) {
        loggerFn = console.info;
    }

    loggerFn(createDefaultLogPrefix(name, level), ...args);
};

export { defaultLoggingAppender, createDefaultLogPrefix };
