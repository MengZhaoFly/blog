const template = require('@babel/template').default;
module.exports = function (babel) {
  const { types } = babel;
  return {
    visitor: {
      ImportDeclaration(path, { opts }) {
        // enter(path, state) {
        //   console.log('start processing ImportDeclaration...');
        //   // do something
        // },
        // exit(path, state) {
        //   console.log('end processing ImportDeclaration!');
        //   // do something
        // }
        const specifiers = path.node.specifiers;
        const source = path.node.source;
        if (!types.isImportDefaultSpecifier(specifiers[0])
          && !types.isImportNamespaceSpecifier(specifiers[0])) {
          // 遍历specifiers生成转换后的ImportDeclaration节点数组
          const declarations = specifiers.map((specifier) => {
            // 转换组件名称
            const transformedSourceName = specifier.imported.name;
            // 利用自定义的customSourceFunc生成绝对路径，然后创建新的ImportDeclaration节点
            return types.ImportDeclaration([types.ImportDefaultSpecifier(specifier.local)],
              types.StringLiteral(opts.customSourceFunc(transformedSourceName)));
          });
          // 将当前节点替换成新建的ImportDeclaration节点组
          path.replaceWithMultiple(declarations);
        }
      },
      // Program(path) {
      //   const buildRequire = template(`
      //     var IMPORT_NAME = require(SOURCE);
      //   `);
      //   const ast = buildRequire({
      //     IMPORT_NAME: types.identifier("myModule"),
      //     SOURCE: types.stringLiteral("my-module"),
      //   });
      //   path.node.body.push(ast);
      // }
    }
  };
}