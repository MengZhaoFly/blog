import MyArr from '../词语法分析/Array';
import fs from 'fs';
import { ASTNodeType } from '../词语法分析/ASTNodeType';
import { SimpleLexer, SimpleToken, TokenType } from '../词语法分析/Lexer';


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
class Script {
  public parse(scriptStr: string) {
    let lex = new SimpleLexer();
    lex.tokenize(scriptStr);
    let tokens = lex.getTokens();
    let ast = this.program(tokens);
    fs.writeFileSync('./ast.json', JSON.stringify(ast, null, 2));
  }
  public program(tokens: MyArr<SimpleToken>): ASTNode {
    let node = new ASTNode(ASTNodeType.Programm, 'pwc');
    // tokens 没消耗完 就尝试 3 种语句的匹配
    while (tokens.length) {
      // 1
      let child = this.intDeclare(tokens);
      if (!child) {
        // 2
        child = this.expressionStatement(tokens);
      }
      if (!child) {
        // 3
        child = this.assignmentStatement(tokens);
      }
      if (child) {
        node.children.push(child);
      } else {
        throw new Error('unknown statement');
      }
    }

    return node;
  }
  // age;
  // age = 45
  // age 是 addExpression 
  public expressionStatement(tokens: MyArr<SimpleToken>): ASTNode {
    let pos = tokens.getPosition();
    let node = this.betterAdditive(tokens);
    if (node != null) {
      let token = tokens[0];
      if (token != null && token.type == TokenType.SemiColon) {
        tokens.shift();
      } else {
        node = null;
        tokens.setPosition(pos); // 回溯
      }
    }
    return node;  //直接返回子节点，简化了AST。
  }
  // 赋值语句，如age = 10*2;
  public assignmentStatement(tokens: MyArr<SimpleToken>): ASTNode {
    let node = null;
    let token = tokens[0];    //预读，看看下面是不是标识符
    if (token != null && token.type == TokenType.Identifier) {
      token = tokens.shift();      //读入标识符
      node = new ASTNode(ASTNodeType.AssignmentStmt, token.text);
      token = tokens[0];      //预读，看看下面是不是等号
      if (token != null && token.type == TokenType.Assignment) {
        tokens.shift();          //取出等号
        let child = this.betterAdditive(tokens);
        if (child == null) {    //出错，等号右面没有一个合法的表达式
          throw new Error("invalide assignment statement, expecting an expression");
        }
        else {
          node.children.push(child);   //添加子节点
          token = tokens[0];  //预读，看看后面是不是分号
          if (token != null && token.type == TokenType.SemiColon) {
            tokens.shift();      //消耗掉这个分号
          } else {            //报错，缺少分号
            throw new Error("invalid statement, expecting semicolon");
          }
        }
      }
      // 不是等号
      else {
        tokens.unshift(token);    //回溯，吐出之前消化掉的标识符
        node = null;
      }
    }
    return node;
  }
  public intDeclare(tokens: MyArr<SimpleToken>) {
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
        // 消费 ；
        if (node) {
          let token = tokens[0];
          if (token && token.type === TokenType.SemiColon) tokens.shift()
        }
      }
    }
    return node;
  }
  // 更好的产生式
  betterAdditive(tokens: MyArr<SimpleToken>): ASTNode {
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
  multiplicative(tokens: MyArr<SimpleToken>): ASTNode {
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
  primary(tokens: MyArr<SimpleToken>): ASTNode {
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
}

let p = new Script()
p.parse("int age = 45+2; age= 20 + 1; b = age+10*2;");
