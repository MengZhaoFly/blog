/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function (root) {
  let levels = []
  if (!root) {
    return levels;
  }
  function walk (node, level) {
    if (levels.length === level) {
      levels.push([]);
    }
    levels[level].push(node.val);
    if (node.left) {
      walk(node.left, level + 1)
    }
    if (node.right) {
      walk(node.right, level + 1)
    }
  }
  walk(root, 0);
  return levels;
};