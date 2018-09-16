import { Logby } from "../src/Logby";

describe("Logger", () => {
    it("constructs", () => {
        const loggerRoot = new Logby();

        expect(loggerRoot.getLogger(Logby)).toBeDefined();
        expect(loggerRoot.getLogger("Test")).toBeDefined();
    });
});
