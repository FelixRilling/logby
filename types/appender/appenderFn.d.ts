import { ILevel } from "../level/ILevel";
declare type appenderFn = (level: ILevel, name: string, args: any[]) => void;
export { appenderFn };
