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
 */
 var isBalanced = function(root) {
  //  传入任意节点进来，返回高度回去
  function height(node) {
    if (node === null) {
      return 0
    }
    let h = Math.max(height(node.left), height(node.right)) + 1
    return h;
  }
  if (!root) return true;
  return Math.abs(height(root.left) - height(root.right)) < 2 && isBalanced(root.left) && isBalanced(root.right)

};