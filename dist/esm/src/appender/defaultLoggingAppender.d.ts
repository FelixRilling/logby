import { ILevel } from "../level/ILevel";
import { appenderFn } from "./appenderFn";
/**
 * Helper method for creating log entry prefix.
 *
 * @private
 * @param name Name of the logger instance.
 * @param level Level of the entry to log.
 * @returns Log entry prefix.
 */
declare const createDefaultLogPrefix: (name: string, level: ILevel) => string;
/**
 * Default appender, doing the actual logging.
 *
 * @public
 * @param name Name of the logger instance.
 * @param level Level of the entry to log.
 * @param args Arguments to log.
 */
declare const defaultLoggingAppender: appenderFn;
export { defaultLoggingAppender, createDefaultLogPrefix };
//# sourceMappingURL=defaultLoggingAppender.d.ts.map