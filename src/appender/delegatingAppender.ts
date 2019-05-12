import { ILevel } from "../level/ILevel";
import { Logby } from "../Logby";
import { appenderFn } from "./appenderFn";

const defaultDelegationNameProducer = (name: string) => `${name} (Delegated)`;

/**
 * Appender delegating all invocations to the given other {@link Logby} instance.
 *
 * @public
 * @param target Logby instance to delegate to.
 * @param nameProducer Function for calculating the new internal logger name.
 * @returns A delegating appender delegating to the given target.
 */
const createDelegatingAppender = (
    target: Logby,
    nameProducer: (name: string) => string = defaultDelegationNameProducer
): appenderFn => (name: string, level: ILevel, args: any[]) => target.getLogger(nameProducer(name)).log(level, ...args);

export { createDelegatingAppender };
