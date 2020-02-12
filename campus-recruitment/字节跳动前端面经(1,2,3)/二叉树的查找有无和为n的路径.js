var pathSum = function (root, sum) {
  let paths = []
  function preOrder(node, path) {
    if (!node) return;
    let val = node.val;
    path.push(val);
    if (node.left === null && node.right === null) {
      if (path.reduce((a, b) => a + b) === sum) {
        paths.push(path);
      }
      return;
    }
    preOrder(node.left, path.slice(0));
    preOrder(node.right, path.slice(0));
  }
  preOrder(root, []);
  return paths;
};