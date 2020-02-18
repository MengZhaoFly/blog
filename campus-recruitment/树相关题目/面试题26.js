var isSubStructure = function(A, B) {
  // A 找到 B的更节点
  let res = null;
  function findNode(node) {
    if (!node) return null;
    let val = node.val;
    if (val === B.val) {
      res = node;
      return;
    }
    findNode(node.left);
    findNode(node.right);
  }
  if (!B) return false;
  findNode(A);
  if (!res) return false;
  function isinclude(tr1, tr2) {
    // 两个节点都不存在
    if (!tr1 && !tr2) return true;
    // 子结构：tr1存在，tr2 不存在 true
    if (tr1 && !tr2) return true;
    // 子结构：tr1没在，tr2 在 false
    if (!tr1 && tr2) return false;
    let isSameRoot = tr1.val === tr2.val;
    return isSameRoot && isinclude(tr1.left, tr2.left) && isinclude(tr1.right, tr2.right)
  }
  return isinclude(res, B);
}