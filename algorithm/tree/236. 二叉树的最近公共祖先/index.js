/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function (root, p, q) {
  let res = null
  function walk(node) {
    if (node === null) return false;
    let left = walk(node.left) ? 1 : 0;
    let right = walk(node.right) ? 1 : 0;
    let mid = (node.val === p.val || node.val === q.val) ? 1 : 0;
    if (left + right + mid >= 2) {
      res = node;
    }
    return (left + right + mid > 0);
  }
  walk(root);
  return res;
};
/**
以要找的节点分别为p和q为例：

首先分析公共祖先一共可以分为以下三种情况：

如果一个节点的左右都能找到节点，那么当前节点一定是公共祖先。
如果当前节点左树可以找到一个值，当前节点值等于另一个值，那么祖先也就是当前值。
如果当前节点右树可以找到一个值，当前节点值等于另一个值，那么祖先也一定就是当前值。
这三种情况用代码表示就是:

left=1，right=1，mid=0
left=1，right=0，mid=1
left=0，right=1，mid=1

left表示向左子树递归是否能找到通向p/q，能找到赋值1，不能的话赋值0

right表示向右子树递归是否能找到通向p/q，能找到赋值1，不能的话赋值0

mid表示当前节点是否等于p/q，等于的话赋值1，不等于赋值0
 */