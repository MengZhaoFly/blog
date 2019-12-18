// 左 跟  右
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

function inOrder(tree, arr = []) {
  if (tree) {
    inOrder(tree.left, arr);
    arr.push(tree.val);
    inOrder(tree.right, arr);
  }
  return arr;
}
console.log(inOrder(tree));