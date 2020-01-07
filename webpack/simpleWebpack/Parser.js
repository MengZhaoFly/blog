const fs = require("fs");
const path = require("path");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const { transformFromAst } = require("@babel/core");
const Parser = {
  /**
  由 @babel/parser 生成 ast
   */
  getAst: path => {
    const content = fs.readFileSync(path, "utf-8");
    return parser.parse(content, {
      sourceType: "module"
    });
  },
  /**
  依据当前的 ast , 构建出 依赖
   */
  getDependecies: (ast, filename) => {
    const dependecies = {};
    traverse(ast, {
      ImportDeclaration({ node }) {
        const dirname = path.dirname(filename);
        const filepath = "./" + path.join(dirname, node.source.value);
        dependecies[node.source.value] = filepath;
      }
    });
    return dependecies;
  },
  /**
  依据 ast ，生成 代码
  */
  getCode: ast => {
    const { code } = transformFromAst(ast, null, {
      presets: ["@babel/preset-env"]
    });
    return code;
  }
};

module.exports = Parser;