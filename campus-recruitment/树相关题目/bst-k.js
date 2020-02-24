var kthSmallest = function(root, k) {
  let res = null;
  // 中序遍历是有序的
  function walk(node) {
    if(node) return;
    walk(node.left);
    // root
    k--;
    if (k === 0) {
      res = node.val;
      return;
    }
    walk(node.right);
  }
  walk(root);
  return res;
}