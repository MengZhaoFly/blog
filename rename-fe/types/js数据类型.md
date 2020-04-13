## 类型
- Null
  null
- Undefined
  undefined
- Boolean
  true and false
- String
- Number
- Object

## 内部类型

只存在于规范里的抽象类型：
- Reference Specification Type
  用来解释 delete，typeof，赋值运算... 行为
- List Specification Type
  解释 new ，函数调用时候的argument lists，
- Completion Specification Type
  解释 (break, continue, return and throw)，执行控制权的转移
- Property Descriptor and Property Identifier Specification Types
  - Property Descriptor values
    - data property descriptors
      - [[Value]] or [[Writable]]
    - accessor property descriptors
      - [[Get]] or [[Set]]
    - 另外：Any property descriptor may have fields named [[Enumerable]] and [[Configurable]].
  - Property Identifier Specification
    描述property name和Property Descriptor的关系，值是：一对 (name, descriptor)的格式,  name is a String and descriptor is a Property Descriptor value.
- Lexical Environment and Environment Record Specification Types
  解释函数或者代码块嵌套时候变量查找
  
