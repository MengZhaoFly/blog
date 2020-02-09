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
  let levels = [];
  if (!root) {
    return levels;
  }
  function walk(current, level) {
    if (levels.length === level) {
      levels.push([]);
    }
    levels[level].push(current.val);
    if (current.left) {
      walk(current.left, level + 1);
    }
    if (current.right) {
      walk(current.right, level + 1);
    }
  }
  walk(root, 0);
  return levels
};
