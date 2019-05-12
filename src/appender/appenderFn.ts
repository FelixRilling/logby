import { ILevel } from "../level/ILevel";

type appenderFn = (name: string, level: ILevel, args: any[]) => void;

export { appenderFn };
