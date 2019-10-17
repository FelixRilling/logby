import { Level } from "./Level";

/**
 * Checks if the given level is considered part of the active level.
 *
 * @private
 * @param incoming Level to check.
 * @param active level to check against.
 * @returns if the given level matches the active level.
 */
const matchesLevel = (incoming: Level, active: Level): boolean =>
    incoming.val <= active.val;

export { matchesLevel };
