var pathSum = function (root, sum) {
  let paths = [];
  function preOrder(node, path) {
    if (!node) return;
    let rootVal = node.val;
    path.push(rootVal);
    // 叶子节点
    if(node.left === null && node.right === null) {
      if (path.reduce((a, b) => a + b) === sum) {
        paths.push(path);
      }
      return;
    }
    // 要把 已经遍历过的节点保存下来
    preOrder(node.left, path.slice(0))
    preOrder(node.right, path.slice(0))
  }
  preOrder(root, []);
  return paths;
};
var tr1 = {
  val: 1,
  left: {val: 2, left: { val: 4, left: null, right: null }, right: {val:5, left: null, right: null}},
  right: {val: 3, left: { val: 6, left: null, right: null }, right: {val:7, left: null, right: null}},
}
// [1 2 4] 1 2 5, 1 3 6 ,1 3 7
pathSum(tr1)