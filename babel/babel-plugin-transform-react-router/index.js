const babel = require('@babel/core');
const code = `
export default [
  {
    path: '/',
    component: './a',
    routes: [
      {
        path: '/a',
        component: './a/b',
      },
      {
        path: '/c',
        component: './a/c',
      }
    ]
  }
]
`
const plugin = function({ types: t}) {
  return {
    visitor: {
      ObjectProperty(path) {
        if(path.node.key.name !== 'component' || !t.isStringLiteral(path.node.value)) {
          return ;
        }
        // 根节点
        const programNode = path.findParent((nodePath) => nodePath.isProgram());
        // 组件名 
        const componentVariableName = programNode.scope.generateUidIdentifier();
        // 构建 import
        const importNode = t.ImportDeclaration(                               //创建importImportDeclaration节点
            [t.importDefaultSpecifier(componentVariableName)],
            path.node.value
        )
        programNode.node.body.unshift(importNode);
        path.node.value = componentVariableName;
      }
    }
  }
}
const res = babel.transform(code, {
  plugins: [plugin]
})

console.log(res.code)