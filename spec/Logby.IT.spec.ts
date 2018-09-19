import { Level } from "../src/level/Level";
import { Logby } from "../src/Logby";

describe("Logby IT", () => {
    it("IT", () => {
        const loggerRoot = new Logby();

        loggerRoot.level = Level.TRACE;

        const logger = loggerRoot.getLogger("Test");

        logger.trace("Foo", 0, [1, 2, 3]);
        logger.debug("Foo", 0, [1, 2, 3]);
        logger.info("Foo", 0, [1, 2, 3]);
        logger.warn("Foo", 0, [1, 2, 3]);
        logger.error("Foo", 0, [1, 2, 3]);
    });
});
