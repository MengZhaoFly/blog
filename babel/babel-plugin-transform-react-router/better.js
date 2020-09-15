const babel = require('@babel/core');
const code = `
const foo = {
  component: 'not transform',
}
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
      },
      {
        path: '/d',
        component: './a/c',
      }
    ]
  }
]
`
const plugin = function({ types: t}) {
  const autoImport = {
    ObjectProperty(path) {
      if(path.node.key.name !== 'component' || !t.isStringLiteral(path.node.value)) {
        return ;
      }
      if (this.map[path.node.value.value]) {
        path.node.value = this.map[path.node.value.value];
        return;
      }
      // 根节点
      const programNode = path.findParent((nodePath) => nodePath.isProgram());
      // 组件名 
      const componentVariableName = programNode.scope.generateUidIdentifier();
      this.map[path.node.value.value] = componentVariableName;
      // 构建 import
      const importNode = t.ImportDeclaration(                               //创建importImportDeclaration节点
          [t.importDefaultSpecifier(componentVariableName)],
          path.node.value
      )
      programNode.node.body.unshift(importNode);
      path.node.value = componentVariableName;
      
    }
  }
  return {
    visitor: {
      ExportDefaultDeclaration(path) {
        const map = {};
        path.traverse(autoImport, { map })
      }
    }
  }
}
const res = babel.transform(code, {
  plugins: [plugin]
})

console.log(res.code)