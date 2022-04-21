import { RuleTester } from "eslint";
import { extensions } from "../../src/rules/index";

const test = new RuleTester({
  parserOptions: { ecmaVersion: 2020, sourceType: "module" },
});

test.run("extensions rule", extensions, {
  valid: [
    { code: `import {foo} from ' ./bar.js '` },
    { code: `import {foo} from './bar.js'` },
    { code: `import {foo} from '../bar.js'` },
  ],
  invalid: [
    {
      code: `import {foo} from './bar'`,
      errors: [{}],
    },
    {
      code: `import {foo} from './bar.ts'`,
      errors: [{}],
    },
  ],
});
