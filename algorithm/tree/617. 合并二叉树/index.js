/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} t1
 * @param {TreeNode} t2
 * @return {TreeNode}
 */
 var mergeTrees = function(t1, t2) {
  function merge(tr1, tr2) {
    if (!tr1 && !tr2) return null;
    // if (tr2 === null) return new TreeNode(tr1.val);
    // if (tr1 === null) return new TreeNode(tr2.val);
    if (tr2 === null) return tr1;
    if (tr1 === null) return tr2;
    let nodeVal = tr1.val + tr2.val;
    let node = new TreeNode(nodeVal);
    node.left = merge(tr1.left, tr2.left);
    node.right = merge(tr1.right, tr2.right);
    return node;
  };
  return merge(t1, t2);
};