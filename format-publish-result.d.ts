import type { PublishResult } from "./compare-and-publish/index.js";
import type { PackageManifest } from "./read-manifest.js";
import type { NormalizedOptions } from "./normalize-options.js";
/**
 * Format publish results into a string.
 *
 * @param manifest Package manifest
 * @param options Configuration options.
 * @param result Results from running npm publish.
 * @returns Formatted string.
 */
export declare function formatPublishResult(manifest: PackageManifest, options: NormalizedOptions, result: PublishResult): string;
