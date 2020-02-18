/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {void} Do not return anything, modify root in-place instead.
 */
 var flatten = function (root) {
  if (!root) return null;
  if (root.left) {
    let rightTree = root.right;
    let pre = root.left;
    while (pre.right !== null) pre = pre.right;
    pre.right = rightTree;
    root.right = root.left;
    root.left = null;
  }
  flatten(root.right);
}