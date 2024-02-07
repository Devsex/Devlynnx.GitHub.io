import type { NormalizedOptions } from "../normalize-options.js";
/**
 * Given a package name and publish configuration, get the NPM CLI view
 * arguments.
 *
 * @param packageName Package name.
 * @param options Publish configuration.
 * @param retryWithTag Include a non-latest tag in the package spec for a rety
 *   attempt.
 * @returns Arguments to pass to the NPM CLI. If `retryWithTag` is true, but the
 *   publish config is using the `latest` tag, will return `undefined`.
 */
export declare function getViewArguments(packageName: string, options: NormalizedOptions, retryWithTag?: boolean): string[];
/**
 * Given a publish configuration, get the NPM CLI publish arguments.
 *
 * @param packageSpec Package specification path.
 * @param options Publish configuration.
 * @returns Arguments to pass to the NPM CLI.
 */
export declare function getPublishArguments(packageSpec: string, options: NormalizedOptions): string[];
