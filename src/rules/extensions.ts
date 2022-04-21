import type { Rule } from "eslint";

export const extensions: Rule.RuleModule = {
  create(context) {
    return {
      ImportDeclaration(node) {
        const importValue = node.source.value?.toString();
        if (!importValue) {
          return;
        }

        if (!importValue.startsWith("./") || !importValue.startsWith("../")) {
          return;
        }

        if (importValue.endsWith(".json")) {
          return;
        }

        if (!importValue.endsWith(".js")) {
          context.report({
            node: node.source,
            messageId: "messageId",
            message: "message",
            fix(fixer) {
              return fixer.replaceText(node.source, "haa");
            },
          });
        }
      },
      // ExportNamedDeclaration(node) {
      //   console.log("ExportNamedDeclaration", node);
      // },
      // ExportAllDeclaration(node) {
      //   console.log("ExportAllDeclaration", node);
      // },
      // CallExpression(node) {
      //   console.log("CallExpression", node);
      // },
      // ImportExpression(node) {
      //   console.log("ImportExpression", node);
      // },
    };
  },
};
