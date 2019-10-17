import { Levels } from "../../src/level/Levels";
import { Logby } from "../../src/Logby";

describe("Logby IT", () => {
    it("IT", () => {
        const logby = new Logby();

        logby.level = Levels.TRACE;

        const logger = logby.getLogger("Test");

        const exampleBoolean = true;
        const exampleNumber = 123;
        const exampleString = "Foo";
        const exampleArr = [1, 2, 3];
        const exampleObj = { a: 1 };

        logger.trace(
            exampleBoolean,
            exampleNumber,
            exampleString,
            exampleArr,
            exampleObj
        );
        logger.debug(
            exampleBoolean,
            exampleNumber,
            exampleString,
            exampleArr,
            exampleObj
        );
        logger.info(
            exampleBoolean,
            exampleNumber,
            exampleString,
            exampleArr,
            exampleObj
        );
        logger.warn(
            exampleBoolean,
            exampleNumber,
            exampleString,
            exampleArr,
            exampleObj
        );
        logger.error(
            exampleBoolean,
            exampleNumber,
            exampleString,
            exampleArr,
            exampleObj
        );
    });
});
