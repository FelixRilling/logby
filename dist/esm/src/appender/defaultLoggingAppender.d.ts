import { Level } from "../level/Level";
import { AppenderFn } from "./AppenderFn";
/**
 * Helper method for creating log entry prefix.
 *
 * @public
 * @param name Name of the logger instance.
 * @param level Level of the entry to log.
 * @returns Log entry prefix.
 */
declare const createDefaultLogPrefix: (name: string, level: Level) => string;
/**
 * Default appender, doing the actual logging.
 *
 * @public
 * @param name Name of the logger instance.
 * @param level Level of the entry to log.
 * @param args Arguments to log.
 */
declare const defaultLoggingAppender: AppenderFn;
export { defaultLoggingAppender, createDefaultLogPrefix };
//# sourceMappingURL=defaultLoggingAppender.d.ts.map