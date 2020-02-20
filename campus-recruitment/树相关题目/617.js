var mergeTrees = function(t1, t2) {
  function merge(tr1, tr2) {
    if (!tr1 && !tr2) return null;
    if (tr1 && !tr2) return tr1;
    // if (tr2 === null) {}
    if (!tr1 && tr2) return tr2;
    // if (tr1 === null)
    let nodeVal = tr1.val + tr2.val;
    let node = new TreeNode(nodeVal);
    node.left = merge(tr1.left, tr2.left);
    node.right = merge(tr1.right, tr2.right);
    return node;
  }
  return merge(t1, t2);
}