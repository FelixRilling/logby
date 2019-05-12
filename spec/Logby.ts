import { Logby } from "../src/Logby";

describe("Logby", () => {
    it("constructs", () => {
        const loggerRoot = new Logby();

        expect(loggerRoot.getLogger(Logby)).toBeDefined();
        expect(loggerRoot.getLogger("Test")).toBeDefined();
    });

    it("caches instance", () => {
        const loggerRoot = new Logby();
        const loggerName = "fooBar";

        const logger1 = loggerRoot.getLogger(loggerName);
        const logger2 = loggerRoot.getLogger(loggerName);

        expect(logger1).toBe(logger2);
    });
});
