import { Logby } from "../Logby";
import { appenderFn } from "./appenderFn";
/**
 * Appender delegating all invocations to the given other {@link Logby} instance.
 *
 * @public
 * @param target Logby instance to delegate to.
 * @returns A delegating appender delegating to the given target.
 */
declare const createDelegatingAppender: (target: Logby) => appenderFn;
export { createDelegatingAppender };
