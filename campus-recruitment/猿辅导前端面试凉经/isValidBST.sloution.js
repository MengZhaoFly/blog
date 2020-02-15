var isValidBST = function (root) {
  let inOrderList = [];
  function inOrder(node) {
    if (!node) return;
    inOrder(node.left)
    inOrderList.push(node.val);
    inOrder(node.right)
  }
  inOrder(root);
  // let inOrderList = [1,2,10, 4, 5, 6, 7, 8]
  for (let i = 0; i < inOrderList.length - 1; i ++) {
    if (inOrderList[i] >= inOrderList[i + 1]) {
      return false;
    }
  }
  return true;
}
console.log(isValidBST({
  val: 2,
  left: {
    val: 1, left: null, right: null
  },
  right: {
    val: 3, left: null, right: null
  }
}))