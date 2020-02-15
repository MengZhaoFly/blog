/**
 * 
 * @param {*} preorder 
 * @param {*} inorder 
 * 前序遍历 preorder = [3,9,20,15,7] root left(1) right(root/left/right)
  中序遍历 inorder = [9,3,15,20,7]  left(1) root right
 */
var buildTree = function (preorder, inorder) {
  if (!preorder.length || !inorder.length) return null;
  let rootVal = preorder[0];
  let root = new TreeNode(rootVal);
  let i = inorder.findIndex(e => e === rootVal);
  root.left = buildTree(preorder.slice(1, i + 1), inorder.slice(0, i));
  root.right = buildTree(preorder.slice(i + 1), inorder.slice(i + 1));
  return root;
}