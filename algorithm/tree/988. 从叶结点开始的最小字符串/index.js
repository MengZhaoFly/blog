/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {string}
 */
var smallestFromLeaf = function(root) {
  let str = 'abcdefghijklmnopqrstuvwxyz'
  let min = Number.MAX_VALUE;
  let res;
  function walk(node, path) {
    if (!node) return;
    let val = node.val;
    path.push(val);
    if (!node.left && !node.right) {
      let sum = path.reduce((a, b) => a + b);
      if (sum < min) {
        min = sum;
        console.log(path);
        res = path.reverse().map(e => str[e]).join('');
      }
      return;
    }
    if (node.left) walk(node.left, path.slice(0));
    if (node.right) walk(node.right, path.slice(0));
  }
  walk(root, []);
  return res;
};
var t = {
  val: 25,
  left: { val: 1, left: {val: 1, left: null, right: null}, right: {val: 3, left: null, right: null}},
  right: { val: 3, left: {val: 0, left: null, right: null}, right: {val: 2, left: null, right: null}}
}
smallestFromLeaf(t);