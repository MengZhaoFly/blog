var invertTree = function (root) {
  function swap(node) {
    if (!node) return;
    // 交换
    [node.left, node.right] = [node.right, node.left];
    swap(node.left);
    swap(node.right);
  }
  swap(root);
  return root;
}