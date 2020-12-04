import { ASTNodeType } from './ASTNodeType';
import { SimpleLexer, SimpleToken, TokenType } from './Lexer';


interface ASTNode {
  parent: ASTNode,
  children: ASTNode[],
  type: ASTNodeType,
  text: string
}
class ASTNode implements ASTNode {

  constructor(type: ASTNodeType, text: string, children: ASTNode[] = [], parent: ASTNode = null) {
    this.type = type
    this.text = text
    this.children = children;
    this.parent = parent
  }

}
class Calculator {
  // 递归下降算法（Recursive Descent Parsing）
  // https://time.geekbang.org/column/article/119891
  public intDeclare(tokens: SimpleToken[]) {
    let node: ASTNode = null;
    let token = tokens[0];
    if (token && token.type === TokenType.Int) {  // Int
      token = tokens.shift();
      if (tokens[0].type === TokenType.Identifier) { // age
        token = tokens.shift();
        node = new ASTNode(ASTNodeType.IntDeclaration, token.text)  // 由token.type token.text 生成 astNode
        token = tokens[0];
        if (token && token.type === TokenType.Assignment) {  // =
          token = tokens.shift();
          let child: ASTNode = this.betterAdditive(tokens);  // //匹配一个表达式
          if (!child) {
            throw new Error('invalide variable initialization, expecting an expression');
          } else {
            node.children.push(child)
          }
        }
      }
    }
    return node;
  }
  // 结合性 暂时存在 问题
  // additive(tokens: SimpleToken[]): ASTNode {
  //   // 1. 要匹配 加法表达式 需要先匹配 乘法表达式
  //   let child1: ASTNode = this.multiplicative(tokens);
  //   let node: ASTNode = child1;  //如果没有第二个子节点，就返回这个
  //   let token: SimpleToken = tokens[0];
  //   if (child1 != null && token != null) {   // 不是 乘法表达式 不可能是 加法
  //     if (token.type == TokenType.Plus) {
  //       token = tokens.shift();
  //       let child2 = this.additive(tokens); //递归地解析第二个节点
  //       if (child2 != null) {
  //         node = new ASTNode(ASTNodeType.Additive, token.text, []);
  //         node.children.push(child1);
  //         node.children.push(child2);
  //       } else {
  //         throw new Error("invalid additive expression, expecting the right part.");
  //       }
  //     }
  //   }
  //   return node;
  // }
  // 更好的产生式
  betterAdditive(tokens: SimpleToken[]): ASTNode {
    let child1: ASTNode = this.multiplicative(tokens);
    let node: ASTNode = child1;  //如果没有第二个子节点，就返回这个
    if (child1) {
      while (true) {
        let token = tokens[0];
        if (token && 
          (token.type === TokenType.Plus || token.type === TokenType.Minus)) {
            token = tokens.shift();
            let child2 = this.multiplicative(tokens);
            // 创建出一个节点
            // 自己会作为 下一个节点的 子节点
            node = new ASTNode(ASTNodeType.Additive, token.text);
            node.children.push(child1);
            node.children.push(child2);
            child1 = node
          }
          else {
            break;
          }
      }
    }
    return node;
  }
  multiplicative(tokens: SimpleToken[]): ASTNode {
    // 2. 要 匹配 乘法表达式 需要先匹配 数字字面量
    let child1: ASTNode = this.primary(tokens);
    let node: ASTNode = child1;

    let token = tokens[0];
    if (child1 != null && token != null) {
      // 先匹配 数字字面量 后面 有 乘法 递归匹配 后面的 表达式
      if (token.type == TokenType.Star || token.type == TokenType.Slash) {
        token = tokens.shift();
        let child2: ASTNode = this.multiplicative(tokens);
        if (child2 != null) {
          node = new ASTNode(ASTNodeType.Multiplicative, token.text);
          node.children.push(child1);
          node.children.push(child2);
        } else {
          throw new Error("invalid multiplicative expression, expecting the right part.");
        }
      }
    }
    return node;
  }
  // 匹配 数字字面量
  primary(tokens: SimpleToken[]): ASTNode {
    let node = null;
    let token = tokens[0];
    if (token != null) {
      // 数字字面量 或者 整型 都创建一个 AST node
      if (token.type == TokenType.IntLiteral) {
        token = tokens.shift();
        node = new ASTNode(ASTNodeType.IntLiteral, token.text);
      } else if (token.type == TokenType.Identifier) {
        token = tokens.shift();  
        node = new ASTNode(ASTNodeType.Identifier, token.text);
      } else if (token.type == TokenType.LeftParen) {  // (
        tokens.shift();
        node = this.betterAdditive(tokens);
        if (node != null) {
          token = tokens[0];
          if (token != null && token.type == TokenType.RightParen) {
            tokens.shift();
          } else {
            throw new Error("expecting right parenthesis");
          }
        } else {
          throw new Error("expecting an additive expression inside parenthesis");
        }
      }
    }
    return node;  //这个方法也做了AST的简化，就是不用构造一个primary节点，直接返回子节点。因为它只有一个子节点。
  }
  evaluate(tree: ASTNode) {
    let result = 0;
    switch(tree.type) {
      case ASTNodeType.IntDeclaration:
        for (let child of tree.children) {
          result = this.evaluate(child)
        }
        break;
      case ASTNodeType.Additive:
        let child1: ASTNode = tree.children[0];
        let v1 = this.evaluate(child1);
        let child2: ASTNode = tree.children[1];
        let v2 = this.evaluate(child2);
        if (tree.text === '+') {
          result = v1 + v2;
        } else {
          result = v1 - v2;
        }
        break;
      case ASTNodeType.Multiplicative:
        let c1: ASTNode = tree.children[0];
        let val1 = this.evaluate(c1);
        let c2: ASTNode = tree.children[1];
        let val2 = this.evaluate(c2);
        if (tree.text === '*') {
          result = val1 * val2;
        } else {
          result = val1 / val2;
        }
        break;
      case ASTNodeType.IntLiteral:
        result = Number(tree.text);
      default:
    }
    return result;
  }
}

let lex1 = new SimpleLexer();
// lex1.tokenize('int a = 2 + 3 * 5');
// lex1.tokenize('int a = (2 * (3 + 4)) + 5 / 5');
lex1.tokenize('int a = 2 + 3 + 4 + 5');
let cal = new Calculator();
let ast = cal.intDeclare(lex1.getTokens())

console.log(JSON.stringify(ast, null, 2))
console.log(cal.evaluate(ast));