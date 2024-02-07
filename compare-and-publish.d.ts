import type { PackageManifest } from "../read-manifest.js";
import type { NormalizedOptions } from "../normalize-options.js";
import { type NpmCliEnvironment } from "../npm/index.js";
import { type VersionComparison } from "./compare-versions.js";
export interface PublishResult extends VersionComparison {
    id: string | undefined;
    files: PublishFile[];
}
export interface PublishFile {
    path: string;
    size: number;
}
/**
 * Get the currently published versions of a package and publish if needed.
 *
 * @param manifest The package to potentially publish.
 * @param options Configuration options.
 * @param environment Environment variables for the npm cli.
 * @returns Information about the publish, including if it occurred.
 */
export declare function compareAndPublish(manifest: PackageManifest, options: NormalizedOptions, environment: NpmCliEnvironment): Promise<PublishResult>;
