enum TokenType {
  Initial = 'Initial',
  GT = 'GT',
  GE = 'GE',

  Assignment = 'Assignment',

  Plus = 'Plus', Minus = 'Minus', Star = 'Star', Slash = 'Slash',

  SemiColon = 'SemiColon',
  LeftParen = 'LeftParen',
  RightParen = 'RightParen',
  Id_int1 = 'Id_int1',
  Id_int2 = 'Id_int2',
  Id_int3 = 'Id_int3',
  Id = 'Id',
  Identifier = 'Identifier',
  IntLiteral = 'IntLiteral', // 0~9 整数 = '整数',
  Int = 'Int'
}
class SimpleToken {
  //Token类型
  type: TokenType = TokenType.Initial;
  //文本值
  text: string = '';
}
class SimpleLexer {
  private tokens: SimpleToken[] = []
  private tokenText: string = ''
  private token: SimpleToken = new SimpleToken();
  public tokenize(code: string) {
    let state: TokenType = TokenType.Initial;
    for (let ch of code) {
      switch (state) {
        case TokenType.Initial:
          state = this.initToken(ch);          //重新确定后续状态
          break;
        case TokenType.Id:
          if (this.isAlpha(ch) || this.isDigit(ch)) {
            this.tokenText += ch;       //保持标识符状态
          } else {
            state = this.initToken(ch);      //退出标识符状态，并保存Token
          }
          break;
        case TokenType.GT:
          if (ch == '=') {
            this.token.type = TokenType.GE;  //转换成GE
            state = TokenType.GE;
            this.tokenText += ch;
          } else {
            state = this.initToken(ch);      //退出GT状态，并保存Token
          }
          break;
        case TokenType.GE:
        case TokenType.Assignment:
        case TokenType.Plus:
        case TokenType.Minus:
        case TokenType.Star:
        case TokenType.Slash:
        case TokenType.SemiColon:
        case TokenType.LeftParen:
        case TokenType.RightParen:
          state = this.initToken(ch);          //退出当前状态，并保存Token
          break;
        case TokenType.IntLiteral:
          if (this.isDigit(ch)) {
            this.tokenText += ch;       //继续保持在数字字面量状态
          } else {
            state = this.initToken(ch);      //退出当前状态，并保存Token
          }
          break;
        case TokenType.Id_int1:
          if (ch == 'n') {
            state = TokenType.Id_int2;
            this.tokenText += ch;
          }
          else if (this.isDigit(ch) || this.isAlpha(ch)) {
            state = TokenType.Id;    //切换回Id状态
            this.tokenText += ch;
          }
          else {
            state = this.initToken(ch);
          }
          break;
        case TokenType.Id_int2:
          if (ch == 't') {
            state = TokenType.Id_int3;
            this.tokenText += ch;
          }
          else if (this.isDigit(ch) || this.isAlpha(ch)) {
            state = TokenType.Id;    //切换回id状态
            this.tokenText += ch;
          }
          else {
            state = this.initToken(ch);
          }
          break;
        case TokenType.Id_int3:
          if (this.isBlank(ch)) {
            this.token.type = TokenType.Int;
            state = this.initToken(ch);
          }
          else {
            state = TokenType.Id;    //切换回Id状态
            this.tokenText += ch;
          }
          break;
        default:
      }
    }
    state = this.initToken('') // End of file
    console.log('解析tokens：', this.tokens);
  }
  /**
   * 
   * @param ch 
   * 接受一个 字符 返回下一个可能的状态
   */
  public getTokens() {
    return this.tokens;
  }
  public initToken(ch: string) {
    if (this.tokenText.length > 0) {
      this.token.text = this.tokenText.toString();
      this.tokens.push(this.token);

      this.tokenText = '';
      this.token = new SimpleToken();
    }

    let newState = TokenType.Initial;
    if (this.isAlpha(ch)) {              //第一个字符是字母
      if (ch == 'i') {
        newState = TokenType.Id_int1;
      } else {
        newState = TokenType.Id; //进入Id状态
      }
      this.token.type = TokenType.Identifier;
      this.tokenText += ch;
    } else if (this.isDigit(ch)) {       //第一个字符是数字
      newState = TokenType.IntLiteral;
      this.token.type = TokenType.IntLiteral;
      this.tokenText += ch;
    } else if (ch == '>') {         //第一个字符是>
      newState = TokenType.GT;
      this.token.type = TokenType.GT;
      this.tokenText += ch;
    } else if (ch == '+') {
      newState = TokenType.Plus;
      this.token.type = TokenType.Plus;
      this.tokenText += ch;
    } else if (ch == '-') {
      newState = TokenType.Minus;
      this.token.type = TokenType.Minus;
      this.tokenText += ch;
    } else if (ch == '*') {
      newState = TokenType.Star;
      this.token.type = TokenType.Star;
      this.tokenText += ch;
    } else if (ch == '/') {
      newState = TokenType.Slash;
      this.token.type = TokenType.Slash;
      this.tokenText += ch;
    } else if (ch == ';') {
      newState = TokenType.SemiColon;
      this.token.type = TokenType.SemiColon;
      this.tokenText += ch;
    } else if (ch == '(') {
      newState = TokenType.LeftParen;
      this.token.type = TokenType.LeftParen;
      this.tokenText += ch;
    } else if (ch == ')') {
      newState = TokenType.RightParen;
      this.token.type = TokenType.RightParen;
      this.tokenText += ch;
    } else if (ch == '=') {
      newState = TokenType.Assignment;
      this.token.type = TokenType.Assignment;
      this.tokenText += ch;
    } else {
      newState = TokenType.Initial; // skip all unknown patterns
    }
    return newState;
  }
  public isAlpha(c: string): boolean {
    return /[a-zA-Z]/.test(c)
  }
  public isDigit(c: string): boolean {
    return /[0-9]/.test(c)
  }
  public isBlank(ch: string): boolean {
    return ch == ' ' || ch == '\t' || ch == '\n';
  }
}

// let lex = new SimpleLexer();
// lex.tokenize('age >= 45');
// let lex1 = new SimpleLexer();
// lex1.tokenize('int a = 4 + 3');
// let lex3 = new SimpleLexer();
// lex3.tokenize('2+3*5');


export {
  SimpleLexer,
  SimpleToken,
  TokenType
}