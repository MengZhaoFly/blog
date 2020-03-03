/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var levelOrder = function (root) {
  let queue = [], res = [];
  queue.push(root);
  while (queue.length !== 0) {
    let node = queue.shift();
    let val = node.val;
    res.push(val);
    if (node.left) {
      queue.push(node.left);
    }
    if (node.right) {
      queue.push(node.right);
    }
  }
  return res;
};
var t = {
  val: 25,
  left: { val: 1, left: {val: 1, left: null, right: null}, right: {val: 3, left: null, right: null}},
  right: { val: 3, left: {val: 0, left: null, right: null}, right: {val: 2, left: null, right: null}}
}
console.log(levelOrder(t))