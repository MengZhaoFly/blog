/**
 * Initialize your data structure here.
 */
 var MyStack = function() {
   //  q1.shift()  // q1.push(6)
   this.q1 = [];
   this.q2 = [];
};

/**
 * Push element x onto stack. 
 * @param {number} x
 * @return {void}
 */
MyStack.prototype.push = function(x) {
  while(this.q2.length) {
    this.q1.push(this.q2.shift())
  }
  this.q2.push(x);
  while(this.q1.length) {
    this.q2.push(this.q1.shift());
  }
};

/**
 * Removes the element on top of the stack and returns that element.
 * @return {number}
 */
MyStack.prototype.pop = function() {
  return this.q2.shift()
};

/**
 * Get the top element.
 * @return {number}
 */
MyStack.prototype.top = function() {
  return this.q2[0]
};

/**
 * Returns whether the stack is empty.
 * @return {boolean}
 */
MyStack.prototype.empty = function() {
  return this.q2.length === 0
};

/**
 * Your MyStack object will be instantiated and called as such:
 * var obj = new MyStack()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.empty()
 */
// var obj = new MyStack()
// obj.push(1);
// obj.push(2);
// obj.push(3);
// console.log(obj.pop())
// console.log(obj.pop())
// console.log(obj.pop())
// console.log(obj.empty())