## 词法分析
状态机


## 语法分析

- 用上下文无关文法描述算术表达式

可能的算术表达式：
2+3*5
2*3+5
2*3
思考一番之后，我们把规则分成两级：第一级是加法规则，第二级是乘法规则。把乘法规则作为加法规则的子规则，这样在解析形成 AST 时，乘法节点就一定是加法节点的子节点，从而被优先计算。


语法规则，是用BNF表达的：
```js

additiveExpression
    :   multiplicativeExpression
    |   additiveExpression Plus multiplicativeExpression
    ;

multiplicativeExpression
    :   IntLiteral
    |   multiplicativeExpression Star IntLiteral
    ;
```
简化
```js

additiveExpression
    :   IntLiteral
    |   additiveExpression Plus IntLiteral
    ;
“additiveExpression Plus multiplicativeExpression”这个文法规则的第一部分就递归地引用了自身，这种情况叫做**左递归。**
```
改写
additiveExpression
    :   multiplicativeExpression
    |   multiplicativeExpression Plus additiveExpression
    ;

multiplicativeExpression
    :   IntLiteral
    |   IntLiteral Star multiplicativeExpression
    ;
    

原来的文法是“add -> add + mul”，
现在我们改写成：
```js
add -> mul add
'add' -> + mul add' | ε

ε（读作 epsilon）是空集的意思
```
上面两条规则可以合并成一条：
```js
add -> mul (+ mul)*
```
对于 (+ mul)* 这部分，我们其实可以写成一个循环，而不是一次次的递归调用