import type { Logger } from "../options.js";
/** Logger using the methods from @actions/core. */
export declare const logger: Logger;
/**
 * Get input by name.
 *
 * @param name Input name
 * @returns The input string value, or undefined if not set
 */
export declare function getInput<T extends string>(name: string): T | undefined;
/**
 * Get a required secret input by name.
 *
 * @param name Input name
 * @returns The input secret value.
 */
export declare function getRequiredSecretInput(name: string): string;
/**
 * Get a boolean input by name.
 *
 * @param name Input name
 * @returns True if value is "true", false if "false", undefined if unset
 */
export declare function getBooleanInput(name: string): boolean | undefined;
/**
 * Set the action as failed due to an error.
 *
 * @param error An value from a `catch`
 */
export declare function setFailed(error: unknown): void;
/**
 * Set an output by name.
 *
 * @param name Output name
 * @param value Output value
 */
export declare function setOutput(name: string, value: string | boolean): void;
/**
 * Set an output by name.
 *
 * @param name Output name
 * @param value Output value
 * @param defaultValue Default value if value is undefined.
 */
export declare function setOutput(name: string, value: string | boolean | undefined, defaultValue: string | boolean): void;
