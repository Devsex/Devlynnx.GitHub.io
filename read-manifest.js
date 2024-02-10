"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readManifest = void 0;
const promises_1 = __importDefault(require("node:fs/promises"));
const node_path_1 = __importDefault(require("node:path"));
const valid_js_1 = __importDefault(require("semver/functions/valid.js"));
const list_js_1 = __importDefault(require("tar/lib/list.js"));
const errors = __importStar(require("./errors.js"));
const SCOPE_RE = /^(@.+)\/.+$/u;
const MANIFEST_BASENAME = "package.json";
const TARBALL_EXTNAME = ".tgz";
const isManifest = (file) => {
    return typeof file === "string" && node_path_1.default.basename(file) === MANIFEST_BASENAME;
};
const isDirectory = (file) => {
    return typeof file === "string" && node_path_1.default.extname(file) === "";
};
const isTarball = (file) => {
    return typeof file === "string" && node_path_1.default.extname(file) === TARBALL_EXTNAME;
};
const validateVersion = (version) => {
    return (0, valid_js_1.default)(version) ?? undefined;
};
const readPackageJson = async (...pathSegments) => {
    const file = node_path_1.default.resolve(...pathSegments);
    try {
        return await promises_1.default.readFile(file, "utf8");
    }
    catch (error) {
        throw new errors.PackageJsonReadError(file, error);
    }
};
const readTarballPackageJson = async (file) => {
    const data = [];
    const onentry = (entry) => {
        if (entry.path === "package/package.json") {
            entry.on("data", (chunk) => data.push(chunk));
        }
    };
    try {
        await (0, list_js_1.default)({ file, onentry });
        if (data.length === 0) {
            throw new Error("package.json not found inside archive");
        }
    }
    catch (error) {
        throw new errors.PackageTarballReadError(file, error);
    }
    return Buffer.concat(data).toString();
};
/**
 * Reads the package manifest (package.json) and returns its parsed contents.
 *
 * @param packagePath The path to the package being published.
 * @returns The parsed package metadata.
 */
async function readManifest(packagePath) {
    let packageSpec;
    let manifestContents;
    if (!packagePath) {
        packageSpec = "";
        manifestContents = await readPackageJson(MANIFEST_BASENAME);
    }
    else if (isManifest(packagePath)) {
        packageSpec = node_path_1.default.resolve(node_path_1.default.dirname(packagePath));
        manifestContents = await readPackageJson(packagePath);
    }
    else if (isDirectory(packagePath)) {
        packageSpec = node_path_1.default.resolve(packagePath);
        manifestContents = await readPackageJson(packagePath, MANIFEST_BASENAME);
    }
    else if (isTarball(packagePath)) {
        packageSpec = node_path_1.default.resolve(packagePath);
        manifestContents = await readTarballPackageJson(packageSpec);
    }
    else {
        throw new errors.InvalidPackageError(packagePath);
    }
    let manifestJson;
    let name;
    let version;
    let publishConfig;
    try {
        manifestJson = JSON.parse(manifestContents);
        name = manifestJson["name"];
        version = validateVersion(manifestJson["version"]);
        publishConfig = manifestJson["publishConfig"] ?? {};
    }
    catch (error) {
        throw new errors.PackageJsonParseError(packageSpec, error);
    }
    if (typeof name !== "string" || name.length === 0) {
        throw new errors.InvalidPackageNameError(name);
    }
    if (typeof version !== "string") {
        throw new errors.InvalidPackageVersionError(manifestJson["version"]);
    }
    if (typeof publishConfig !== "object" ||
        Array.isArray(publishConfig) ||
        !publishConfig) {
        throw new errors.InvalidPackagePublishConfigError(publishConfig);
    }
    return {
        packageSpec,
        name,
        version,
        publishConfig,
        scope: SCOPE_RE.exec(name)?.[1],
    };
}
exports.readManifest = readManifest;
//# sourceMappingURL=read-manifest.js.map