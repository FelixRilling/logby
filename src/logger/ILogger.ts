import { ILevel } from "../level/ILevel";

interface ILogger {
    log(level: ILevel, ...args: any[]): void;

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

export { ILogger };
