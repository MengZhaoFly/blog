/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var minDepth = function(root) {
  if (!root) return 0;
  // 1. 叶子节点的时候
  if (!root.left && !root.right) return 1;
  // 2. 某节点 缺少左子树或者右子树 返回较大那个
  let lh = minDepth(root.left)
  let rh = minDepth(root.right)
  if (!root.left || !root.right) return Math.max(lh, rh) + 1;
  // 左右子树都不为空 较小那个
  return Math.min(lh, rh) + 1
};