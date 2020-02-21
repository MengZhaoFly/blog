/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function(root, k) {
  // 利用二叉搜索树的性质，中序遍历即可
    if (!root) return;
    let res = null;
    let walk = function(node) {
        if (!node) return;
        walk(node.left);
        k--;
        if (k === 0) {
            res = node.val;
            return;
        }
        walk(node.right);
    }
    walk(root);
    return res;
};