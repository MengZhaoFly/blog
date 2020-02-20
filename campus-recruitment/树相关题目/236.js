/**
 * 1: 在 LCA 左子树 p/q，右子树 q/p
 * left: 1, right = 1, mid = 0;
 * 2: 在 LCA 左子树 p/q, LCA = q/p
 * left: 1, right = 0, mid = 1
 * 3: 在 LCA 右子树 p/q, LCA = q/p
 * left: 0, right: 1, mid = 1
 */
// root 节点 开始，遍历 每个节点
var lowestCommonAncestor = function (root, p, q) {
  let res = null;
  function walk(node) {
    if (node === null) return false;
    // 找到？？
    let left = walk(node.left) ? 1 : 0;
    let right = walk(node.right) ? 1 : 0;
    // mid 代表我们当前正在遍历的节点
    let mid = (node.val === p.val || node.val === q.val) ? 1 : 0;
    // 满足 LCA
    if (left + right + mid >= 2) {
      res = node;
      return;
    }
    // 存在 p 、q 只要 
    return left + right + mid > 0;

  }
  walk(root);
  return res;
}
