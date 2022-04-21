# Enforce import and export file extensions

In ESM, import paths and export paths must contain the file extension in it. This rule suggests and fixes the imports for you.

## Fail

```js
import { add } from "./math";

import { add } from "./math.ts";

import pkg from "./package";
```

## Pass

```js
import { add } from "./math.js";

import pkg from "./package.json";
```
