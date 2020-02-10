/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 任何 一个节点左右两侧子树的高度之差最多为1。
 */
var isBalanced = function(root) {
    let cache = new Map();
    function height(node) {
      if (node === null) {
        return -1;
      }
      if (cache.get(node) !== undefined) return cache.get(node);
      let h = Math.max(height(node.left), height(node.right)) + 1;
      cache.set(node, h)
      return h
    }
    if (!root) return true;
    return Math.abs(height(root.left) - height(root.right)) < 2 && isBalanced(root.left) && isBalanced(root.right)
};