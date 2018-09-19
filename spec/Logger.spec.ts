import { Logby } from "../src/Logby";

describe("DefaultLogger", () => {
    it("constructs", () => {
        const loggerRoot = new Logby();

        expect(loggerRoot.getLogger(Logby)).toBeDefined();
        expect(loggerRoot.getLogger("Test")).toBeDefined();
    });
});
