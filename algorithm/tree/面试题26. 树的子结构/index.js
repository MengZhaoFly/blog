/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} A
 * @param {TreeNode} B
 * @return {boolean}
 */
 var isSubStructure = function(A, B) {
  let res = null
  function findNode(node) {
    if (!node) return null;
    let val = node.val;
    if (val === B.val) {
      res = node;
     return node;
    };
   findNode(node.left);
   findNode(node.right);
  }
  if (!B) return false;
  findNode(A);
  if (!res) return false;
  function isInclude(tr1, tr2) {
    // tr2 没有节点了，因为判断tr2为子树的原因，认为 true
    if (!tr2 && tr1) return true;
    if (!tr1 && tr2) return false;
    if (!tr1 && !tr2) return true;
    return (tr1.val === tr2.val) && isInclude(tr1.left, tr2.left) && isInclude(tr1.right, tr2.right);
  }
  return isInclude(res, B)
};