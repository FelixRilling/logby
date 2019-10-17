import { LevelDictionary } from "./LevelDictionary";

/**
 * Default level-list. Can be used to set the level of a {@link Logby} instance.
 *
 * @public
 */
const Levels: LevelDictionary = {
    NONE: {
        val: -1
    },
    ERROR: {
        name: "ERROR",
        val: 0
    },
    WARN: {
        name: "WARN",
        val: 1
    },
    INFO: {
        name: "INFO",
        val: 2
    },
    DEBUG: {
        name: "DEBUG",
        val: 3
    },
    TRACE: {
        name: "TRACE",
        val: 4
    }
};

export { Levels };
