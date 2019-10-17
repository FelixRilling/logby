import { Level } from "../level/Level";
import { Logby } from "../Logby";
import { AppenderFn } from "./AppenderFn";

const defaultDelegationNameProducer = (name: string): string =>
    `${name} (Delegated)`;

/**
 * Creates a new delegatingAppender for the given target.
 * A delegatingAppender is an appender delegating all invocations to the given other {@link Logby} instance.
 *
 * @public
 * @param target Logby instance to delegate to.
 * @param nameProducer Function for calculating the new internal logger name.
 * @returns A delegating appender delegating to the given target.
 */
const createDelegatingAppender = (
    target: Logby,
    nameProducer: (name: string) => string = defaultDelegationNameProducer
): AppenderFn => (name: string, level: Level, args: any[]) =>
    target.getLogger(nameProducer(name)).log(level, ...args);

export { createDelegatingAppender };
