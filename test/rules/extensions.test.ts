import { RuleTester } from "eslint";
import { suite, test } from "vitest";
import { rule } from "../../src/rules/extensions.js";

suite("extensions rule", () => {
  const tester = new RuleTester({
    parserOptions: { ecmaVersion: 2020, sourceType: "module" },
  });

  const paths = {
    valid: ["./bar.js", "../bar.js", "fs", "fs/promises"],
    invalid: [
      // Replaces .ts with .js.
      { input: "./bar.ts", output: "./bar.js" },
      // Trims the path.
      { input: " ./bar.ts ", output: "./bar.js" },
      // Suggests JS extension, if JS file exists.
      { input: "./fixtures/fixture1", output: "./fixtures/fixture1.js" },
      // Suggests JS extension, if TS file exists.
      { input: "./fixtures/fixture2", output: "./fixtures/fixture2.js" },
      // Suggests JSON extension, if JSON file exists.
      { input: "./fixtures/fixture3", output: "./fixtures/fixture3.json" },
      // Suggests JS extension first, if the other files exists.
      { input: "./fixtures/fixture4", output: "./fixtures/fixture4.js" },
      // SUggests JS extension, if TSX file exists.
      { input: "./fixtures/fixture5", output: "./fixtures/fixture5.js" },
    ],
  };

  for (const declaration of [
    "import * as foo",
    "import {foo}",
    "export *",
    "export {foo}",
  ]) {
    test(`fixes [${declaration}] declarations`, () => {
      tester.run(`fixes [${declaration}] declarations`, rule, {
        valid: paths.valid.map((path) => ({
          code: `${declaration} from '${path}'`,
        })),
        invalid: paths.invalid.map(({ input, output }) => ({
          filename: __filename,
          code: `${declaration} from '${input}'`,
          output: `${declaration} from '${output}'`,
          errors: [{}],
        })),
      });
    });
  }

  test(`fixes [import()] declarations`, () => {
    tester.run(`fixes [import()] declarations`, rule, {
      valid: paths.valid.map((path) => ({
        code: `import('${path}')`,
      })),
      invalid: paths.invalid.map(({ input, output }) => ({
        filename: __filename,
        code: `import('${input}')`,
        output: `import('${output}')`,
        errors: [{}],
      })),
    });
  });
});
