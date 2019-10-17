import { Logby } from "../Logby";
import { appenderFn } from "./appenderFn";
/**
 * Creates a new delegatingAppender for the given target.
 * A delegatingAppender is an appender delegating all invocations to the given other {@link Logby} instance.
 *
 * @public
 * @param target Logby instance to delegate to.
 * @param nameProducer Function for calculating the new internal logger name.
 * @returns A delegating appender delegating to the given target.
 */
declare const createDelegatingAppender: (target: Logby, nameProducer?: (name: string) => string) => appenderFn;
export { createDelegatingAppender };
//# sourceMappingURL=delegatingAppender.d.ts.map