var maxDepth = function(root) {
  if (root === null) {
    return 0;
  }
  let lh = maxDepth(root.left);
  let rh = maxDepth(root.right);
  return Math.max(lh, rh) +1;
}