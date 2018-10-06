import { appenderFn } from "./appenderFn";
declare const DEFAULT_APPENDER_NAME = "defaultAppender";
/**
 * The default appender-fn, doing the actual logging.
 *
 * @private
 * @param level Level of the entry to log.
 * @param name Name of the logger instance.
 * @param args Arguments to log.
 */
declare const defaultAppenderFn: appenderFn;
export { DEFAULT_APPENDER_NAME, defaultAppenderFn };
