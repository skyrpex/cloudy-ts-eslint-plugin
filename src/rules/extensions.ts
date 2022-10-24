import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";
import type { Rule } from "eslint";
import type { Literal } from "estree";

export const replaceMessageId = "replace";
export const appendMessageId = "append";

export const rule: Rule.RuleModule = {
  meta: {
    messages: {
      [replaceMessageId]: "Replace '{{ input }}' with '{{ output }}'",
      [appendMessageId]: "Append the '{{ extension }}' extension to the path",
    },
    fixable: "code",
  },
  create(context) {
    const dirname = path.dirname(context.getPhysicalFilename());

    function report(source: Literal) {
      const { range, value: untrimmedValue } = source;
      assert(range);
      assert(typeof untrimmedValue === "string");

      const value = untrimmedValue.trim();

      // Skip non-relative imports.
      if (!value.startsWith("./") && !value.startsWith("../")) {
        return;
      }

      // Allow JS extensions.
      if (value.endsWith(".js")) {
        return;
      }

      // Allow JSON extensions.
      if (value.endsWith(".json")) {
        return;
      }

      // Replace TypeScript extension with JavaScript extension.
      if (value.endsWith(".ts") || value.endsWith(".tsx")) {
        context.report({
          node: source,
          messageId: replaceMessageId,
          data: {
            input: value,
            output: value.replace(/\.ts$/, ".js"),
          },
          fix(fixer) {
            return fixer.replaceTextRange(
              [range[0] + 1, range[1] - 1],
              value.replace(/\.ts$/, ".js")
            );
          },
        });
      }

      // Insert the proper file extension, if the file exists.
      const extensions = [
        ["js", "js"],
        ["ts", "js"],
        ["tsx", "js"],
        ["json", "json"],
      ] as const;
      (() => {
        for (const [extension, replacement] of extensions) {
          const filename = path.join(dirname, `${value}.${extension}`);
          if (fs.existsSync(filename)) {
            context.report({
              node: source,
              messageId: appendMessageId,
              data: {
                extension: `.${replacement}`,
              },
              fix(fixer) {
                return fixer.insertTextAfterRange(
                  [range[0] + 1, range[1] - 1],
                  `.${replacement}`
                );
              },
            });
            return;
          }
        }
      })();

      // // Trim import value.
      // if (value !== node.source.value?.toString()) {
      //   context.report({
      //     node: node.source,
      //     messageId,
      //     fix(fixer) {
      //       return fixer.replaceTextRange(
      //         [range[0] + 1, range[1] - 1],
      //         value
      //       );
      //     },
      //   });
      // }
    }

    return {
      ImportDeclaration(node) {
        report(node.source);
      },
      ExportNamedDeclaration(node) {
        if (node.source) {
          report(node.source);
        }
      },
      ExportAllDeclaration(node) {
        report(node.source);
      },
      ImportExpression(node) {
        if (node.source.type === "Literal") {
          report(node.source);
        }
      },
    };
  },
};
