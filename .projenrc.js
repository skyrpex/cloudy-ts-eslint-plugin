import { javascript, typescript, github } from "projen";

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
      lib: ["ES2022"],
      target: "ES2022",
      module: "ES2022",
      moduleResolution: "NodeNext",
      noUncheckedIndexedAccess: true,
    },
  },
  tsconfigDev: {
    include: ["test/**/*.tsx"],
  },

  // Lint.
  prettier: true,

  // Test.
  jest: false,

  releaseToNpm: true,
  autoApproveUpgrades: true,
  autoApproveOptions: {
    allowedUsernames: ["skyrpex", "skyrpex-bot[bot]"],
    secret: "GITHUB_TOKEN",
  },
  githubOptions: {
    projenCredentials: github.GithubCredentials.fromApp(),
  },
  npmAccess: javascript.NpmAccess.PUBLIC,
  minNodeVersion: "18.0.0",
  packageManager: javascript.NodePackageManager.PNPM,
  pnpmVersion: "8",
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

project.addDevDeps("vitest", "@vitest/coverage-v8");
project.testTask.exec("vitest test/rules --passWithNoTests --coverage --run");

project.compileTask.prependExec(
  "yarn link && cd ./test/test-app && yarn && yarn link @cloudy-ts/eslint-plugin"
);
project.testTask.exec("vitest test/test-app/index.test.ts --run");

project.watchTask.reset();
project.watchTask.exec("vitest test/rules --passWithNoTests --coverage");

project.synth();
