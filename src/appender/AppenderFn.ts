import { Level } from "../level/Level";

type AppenderFn = (name: string, level: Level, args: any[]) => void;

export { AppenderFn };
