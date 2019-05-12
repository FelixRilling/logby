import { Logby } from "../src/Logby";

describe("Logby", () => {
    it("constructs", () => {
        const logby = new Logby();

        expect(logby.getLogger(Logby)).toBeDefined();
        expect(logby.getLogger("Test")).toBeDefined();
    });

    it("caches instance", () => {
        const logby = new Logby();
        const loggerName = "fooBar";

        const logger1 = logby.getLogger(loggerName);
        const logger2 = logby.getLogger(loggerName);

        expect(logger1).toBe(logger2);
    });
});
