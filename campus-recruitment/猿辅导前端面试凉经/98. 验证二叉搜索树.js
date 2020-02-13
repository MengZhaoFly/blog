function inOrder(node, arr) {
  if (!node) return;
  inOrder(node.left, arr);
  // inOrder(node.val);
  arr.push(node.val);
  inOrder(node.right, arr);
}
var isValidBST = function (root) {
  var inOrderList = [];
  inOrder(root, inOrderList);
  for (var i = 0; i < inOrderList.length - 1; i++) {
    if (inOrderList[i] >= inOrderList[i + 1]) {
      return false;
    }
  }
  return true;
};
