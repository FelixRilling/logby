import { ILevel } from "../level/ILevel";

type appenderFn = (level: ILevel, name: string, args: any[]) => void;

export { appenderFn };
