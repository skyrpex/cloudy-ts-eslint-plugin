# @cloudy-ts/eslint-plugin

ESLint plugin that provides a rule to enforce explicit `.js` or `.json` extensions on imports.

[![NPM version](https://img.shields.io/npm/v/@cloudy-ts/eslint-plugin/latest.svg)](https://www.npmjs.com/package/@cloudy-ts/eslint-plugin)
[![NPM downloads](https://img.shields.io/npm/dm/@cloudy-ts/eslint-plugin.svg)](https://www.npmjs.com/package/@cloudy-ts/eslint-plugin)
[![Build status](https://img.shields.io/github/workflow/status/skyrpex/cloudy-ts-eslint-plugin/release)](https://www.npmjs.com/package/@cloudy-ts/eslint-plugin)

## Installation

```sh
yarn add @cloudy-ts/eslint-plugin -D
```

## Usage

Extend from the recommended configuration in your ESLint configuration file (ie, in your `package.json` file):

```json
{
  "name": "my-awesome-project",
  "eslintConfig": {
    "extends": "plugin:@cloudy-ts/recommended"
  }
}
```

## Rules

Each rule has emojis denoting:

- ✅ if it belongs to the `recommended` configuration
- 🔧 if some problems reported by the rule are automatically fixable by the `--fix` [command line](https://eslint.org/docs/user-guide/command-line-interface#fixing-problems) option
- 💡 if some problems reported by the rule are manually fixable by editor [suggestions](https://eslint.org/docs/developer-guide/working-with-rules#providing-suggestions)

| Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Description                                | ✅  | 🔧  | 💡  |
| :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------- | :-- | :-- | :-- |
| [extensions](docs/rules/extensions.md)                                                                                                                                                                                                               | Enforce import and export file extensions. | ✅  | 🔧  | 💡  |

## Motivation
