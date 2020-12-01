enum ASTNodeType{
  Programm = 'Programm',           //程序入口，根节点

  IntDeclaration = 'IntDeclaration',     //整型变量声明
  ExpressionStmt = 'ExpressionStmt',     //表达式语句，即表达式后面跟个分号
  AssignmentStmt = 'AssignmentStmt',     //赋值语句

  Primary = 'Primary',            //基础表达式
  Multiplicative = 'Multiplicative',     //乘法表达式
  Additive = 'Additive',           //加法表达式

  Identifier = 'Identifier',         //标识符
  IntLiteral = 'IntLiteral'        //整型字面量
}

export {
  ASTNodeType
}