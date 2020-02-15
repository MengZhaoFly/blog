/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var invertTree = function(root) {
    function swap(node) {
      if (!node) return;
      [node.left, node.right] = [node.right, node.left];
      swap(node.left);
      swap(node.right);
    }
    swap(root)
    return root;
};