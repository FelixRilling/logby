import { ILevel } from "../level/ILevel";
import { appenderFn } from "./appenderFn";

const defaultAppenderFn: appenderFn = (level: ILevel, name: string, args: any[]) =>
    console.log(
        `${new Date().toISOString()} ${level.name} ${name} - ${
            args[0]
            }`,
        ...args.slice(1)
    );

export { defaultAppenderFn };
