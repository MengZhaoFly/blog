/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} sum
 * @return {number[][]}
 */
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
var tr1 = {
  val: 1,
  left: {
    val: 2,
    left: {
      val: 4, left: null, right: null
    },
    right: {
      val: 5, left: null, right: null
    }
  },
  right: {
    val: 3,
    left: {
      val: 6, left: null, right: null
    },
    right: {
      val: 7, left: null, right: null
    }
  }
}
console.log(pathSum(tr1))