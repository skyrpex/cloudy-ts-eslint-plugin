import { javascript, typescript } from "projen";

const project = new typescript.TypeScriptProject({
  defaultReleaseBranch: "main",
  name: "@cloudy-ts/eslint-plugin",

  deps: [],
  devDeps: [
    "eslint",
    "@types/eslint",
    "esbuild",
    "rollup",
    "rollup-plugin-esbuild",
    "rollup-plugin-dts",
    "@rollup/plugin-node-resolve",
    "@rollup/plugin-commonjs",
    "@rollup/plugin-json",
    "@rollup/plugin-alias",
  ],
  peerDeps: ["eslint"],

  prettier: true,

  tsconfig: {
    compilerOptions: {
      lib: ["ES2020"],
      target: "ES2020",
      module: "ES2020",
      moduleResolution: "node",
      noUncheckedIndexedAccess: true,
    },
  },

  minNodeVersion: "14.18.0",

  releaseToNpm: true,
  npmAccess: javascript.NpmAccess.PUBLIC,
});

project.addFields({
  type: "module",
  exports: {
    ".": {
      import: `./lib/index.js`,
      types: "./lib/index.d.ts",
    },
  },
});

// project.compileTask.exec("rollup -c");
// project.watchTask.prependExec("rollup -c --watch");
// project.addTask("dev", { exec: "rollup -c --watch" });

project.synth();
