import type { Logger } from "../options.js";
import type { NpmCliEnvironment } from "./use-npm-environment.js";
export interface NpmCliOptions {
    environment: NpmCliEnvironment;
    ignoreScripts: boolean;
    logger?: Logger | undefined;
}
export interface NpmCallResult<CommandT extends string> {
    successData: SuccessData<CommandT> | undefined;
    errorCode: string | undefined;
    error: Error | undefined;
}
type SuccessData<T extends string> = T extends typeof VIEW ? NpmViewData : T extends typeof PUBLISH ? NpmPublishData : unknown;
export interface NpmViewData {
    "dist-tags": Record<string, string>;
    versions: string[];
}
export interface NpmPublishData {
    id: string;
    files: {
        path: string;
        size: number;
    }[];
}
export declare const VIEW = "view";
export declare const PUBLISH = "publish";
export declare const E404 = "E404";
export declare const EPUBLISHCONFLICT = "EPUBLISHCONFLICT";
/**
 * Call the NPM CLI in JSON mode.
 *
 * @param command The command of the NPM CLI to call
 * @param cliArguments Any arguments to send to the command
 * @param options Customize environment variables or add an error handler.
 * @returns The parsed JSON, or stdout if unparsable.
 */
export declare function callNpmCli<CommandT extends string>(command: CommandT, cliArguments: string[], options: NpmCliOptions): Promise<NpmCallResult<CommandT>>;
export {};
