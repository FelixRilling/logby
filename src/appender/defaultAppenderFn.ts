import { ILevel } from "../level/ILevel";
import { Levels } from "../level/Levels";
import { appenderFn } from "./appenderFn";

/**
 * The default appender-fn, doing the actual logging.
 *
 * @private
 * @param level Level of the entry to log.
 * @param name Name of the logger instance.
 * @param args Arguments to log.
 */
const defaultAppenderFn: appenderFn = (
    level: ILevel,
    name: string,
    args: any[]
) => {
    const meta = `${new Date().toISOString()} ${level.name} ${name}`;
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

    loggerFn(meta, ...args);
};

export { defaultAppenderFn };
