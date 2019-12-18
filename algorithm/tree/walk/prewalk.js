// 跟 左 右
let tree = {
  val: 1,
  left: {
    val: 2,
    left: {
      val: 4,
      left: {
        val: 5
      },
      right: {
        val: 6,
        left: {
          val: 8
        }
      }
    },
    right: {
      val: 7,
      right: {
        val: 9
      }
    }
  },
  right: {
    val: 3
  }
}

function preOrder(tree, arr = []) {
  if (tree) {
    arr.push(tree.val);
    preOrder(tree.left, arr);
    preOrder(tree.right, arr);
  }
  return arr;
}
// [ 1, 2, 4, 5, 6, 8, 7, 9, 3 ]
console.log(preOrder(tree));