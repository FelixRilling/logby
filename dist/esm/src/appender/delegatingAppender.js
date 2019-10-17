const defaultDelegationNameProducer = (name) => `${name} (Delegated)`;
/**
 * Creates a new delegatingAppender for the given target.
 * A delegatingAppender is an appender delegating all invocations to the given other {@link Logby} instance.
 *
 * @public
 * @param target Logby instance to delegate to.
 * @param nameProducer Function for calculating the new internal logger name.
 * @returns A delegating appender delegating to the given target.
 */
const createDelegatingAppender = (target, nameProducer = defaultDelegationNameProducer) => (name, level, args) => target.getLogger(nameProducer(name)).log(level, ...args);
export { createDelegatingAppender };
//# sourceMappingURL=delegatingAppender.js.map