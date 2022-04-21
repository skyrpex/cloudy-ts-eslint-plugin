import esbuild from "rollup-plugin-esbuild";
// import dts from "rollup-plugin-dts";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import alias from "@rollup/plugin-alias";
import pkg from "./package.json";

const entries = {
  index: "src/index.ts",
  // server: "src/server.ts",
  // types: "src/types.ts",
  // client: "src/client.ts",
  // utils: "src/utils.ts",
  // cli: "src/cli.ts",
};

const external = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
];

const plugins = [
  alias({
    entries: [{ find: /^node:(.+)$/, replacement: "$1" }],
  }),
  resolve({
    preferBuiltins: true,
  }),
  json(),
  commonjs(),
  esbuild({
    target: "node14",
  }),
];

function onwarn(message) {
  if (message.code === "EMPTY_BUNDLE") return;
  console.error(message);
}

export default () => [
  {
    input: entries,
    output: {
      dir: "lib",
      format: "esm",
      entryFileNames: "[name].js",
    },
    external,
    plugins,
    onwarn,
  },
  {
    input: entries,
    output: {
      dir: "lib",
      format: "cjs",
      entryFileNames: "[name].cjs",
    },
    external,
    plugins,
    onwarn,
  },
  // {
  //   input: entries,
  //   output: {
  //     dir: "lib",
  //     entryFileNames: "[name].d.ts",
  //     format: "esm",
  //   },
  //   external,
  //   plugins: [dts({ respectExternal: true })],
  //   onwarn,
  // },
];
