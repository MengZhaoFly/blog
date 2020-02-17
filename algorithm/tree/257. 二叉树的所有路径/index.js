/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {string[]}
 */
var binaryTreePaths = function(root) {
  let res = []
  function walk(node, path) {
    if (!node) return;
    let val = node.val;
    path.push(val);
    if (!node.left && !node.right) {
      res.push(path.join('->'));
      return;
    }
    if (node.left) walk(node.left, path.slice(0));
    if (node.right) walk(node.right, path.slice(0));
  }
  walk(root, []);
  return res;
};