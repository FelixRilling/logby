import { Level } from "../level/Level";
interface Logger {
    log(level: Level, ...args: any[]): void;
    error(...args: any[]): void;
    warn(...args: any[]): void;
    info(...args: any[]): void;
    debug(...args: any[]): void;
    trace(...args: any[]): void;
    isError(): boolean;
    isWarn(): boolean;
    isInfo(): boolean;
    isDebug(): boolean;
    isTrace(): boolean;
}
export { Logger };
//# sourceMappingURL=Logger.d.ts.map