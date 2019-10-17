import { AppenderList } from "./appender/AppenderList";
import { Level } from "./level/Level";
import { Logger } from "./logger/Logger";
/**
 * Main logby class.
 */
declare class Logby {
    readonly appenders: AppenderList;
    level: Level;
    private readonly loggers;
    /**
     * Creates a new Logby instance.
     */
    constructor();
    /**
     * Gets and/or creates a logger instance.
     *
     * @param nameable String or INameable (ex: named class or named function).
     * @returns The logger instance.
     */
    getLogger(nameable: any): Logger;
}
export { Logby };
//# sourceMappingURL=Logby.d.ts.map