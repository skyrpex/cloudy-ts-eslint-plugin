import { javascript, typescript } from "projen";

const project = new typescript.TypeScriptProject({
  defaultReleaseBranch: "main",
  name: "@cloudy-ts/eslint-plugin",

  deps: [],
  peerDeps: ["eslint"],
  devDeps: ["eslint", "@types/eslint"],

  // ESM.
  entrypoint: "lib/index.cjs",
  entrypointTypes: "",
  tsconfig: {
    compilerOptions: {
      lib: ["ES2020"],
      target: "ES2020",
      module: "ES2020",
      moduleResolution: "node",
      noUncheckedIndexedAccess: true,
    },
  },

  // Lint.
  prettier: true,

  // Test.
  jest: false,

  releaseToNpm: true,
  autoApproveUpgrades: true,
  autoApproveOptions: {
    allowedUsernames: ['skyrpex[bot]'],
    secret: "PROJEN_GITHUB_TOKEN",
  },
  npmAccess: javascript.NpmAccess.PUBLIC,
  minNodeVersion: "14.18.0",
});

// Docs.
project.npmignore?.addPatterns("/docs/");

// Lint.
project.npmignore?.addPatterns("/.editorconfig");
project.npmignore?.addPatterns("/.prettier*");

// ESM.
project.addFields({
  type: "module",
  exports: {
    ".": {
      require: "./lib/index.cjs",
      import: `./lib/index.js`,
    },
  },
});

// Build.
project.addDevDeps("esbuild");
project.compileTask.reset();
project.compileTask.prependExec(
  "esbuild src/index.ts --bundle --target=es2020 --platform=node --format=esm --outfile=lib/index.js"
);
project.compileTask.prependExec(
  "esbuild src/index.ts --bundle --target=es2020 --platform=node --format=cjs --outfile=lib/index.cjs"
);

// Test.
project.npmignore?.addPatterns("/coverage/");

project.addDevDeps("vitest", "c8");
project.testTask.exec("vitest test/rules --passWithNoTests --coverage --run");

project.compileTask.prependExec(
  "yarn link && cd ./test/test-app && yarn && yarn link @cloudy-ts/eslint-plugin"
);
project.testTask.exec("vitest test/test-app/index.test.ts --run");

project.watchTask.reset();
project.watchTask.exec("vitest test/rules --passWithNoTests --coverage");

project.synth();
