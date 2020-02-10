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
  if (!root) {
    return 0;
  }
  return Math.min(minDepth(root.left), minDepth(root.right)) + 1;
};