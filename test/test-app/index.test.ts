import { spawnSync } from "node:child_process";
import { expect, suite, test } from "vitest";

suite("recommended config", () => {
  test("uses extensions rule", () => {
    const result = spawnSync("npx", ["eslint", "index.js", "--format=json"], {
      cwd: __dirname,
    });
    expect(result.status).toBe(1);
    expect(result.output.toLocaleString()).toMatch("@cloudy-ts/extensions");
  });
});
