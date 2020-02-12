/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
// preorder root left right
// inorder left root right
var buildTree = function (preorder, inorder) {
  if (inorder.length === 0 || preorder.length === 0) return null;
  let rootVal = preorder[0];
  let root = new TreeNode(rootVal);
  let i = inorder.findIndex(e => e === rootVal);
  // i 为根节点
  // i 左边的 都为 左子树 右边的为右子树
  root.left = buildTree(preorder.slice(1, i + 1), inorder.slice(0, i));
  root.right = buildTree(preorder.slice(i + 1), inorder.slice(i + 1));
  return root;
};