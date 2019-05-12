import { appenderFn } from "./appenderFn";
/**
 * Default appender-fn, doing the actual logging.
 *
 * @public
 * @param level Level of the entry to log.
 * @param name Name of the logger instance.
 * @param args Arguments to log.
 */
declare const defaultLoggingAppender: appenderFn;
export { defaultLoggingAppender };
