/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {void} Do not return anything, modify root in-place instead.
 */
 /**
  * 
  * 0.如果root的左子树不为None，执行1和2，否则3
    1.将root的右子树，挂载到左子树的最右节点
    2.将root的左子树，挂载到右子树上，左子树置为None
    3.root向下一层，走到右子树上（左子树已经为None），重复上述过程
  */
var flatten = function(root) {
  if (!root) return null;
  if (root.left) {
    // 找到右子树
    let rightTree = root.right;
    // 把它链接到 左子树 的 最右边的节点，如果没有右孩子的话（直接作为右孩子）
    let pre = root.left;
    while(pre.right !== null) pre = pre.right;
    pre.right = rightTree;
    root.right = root.left;
    root.left = null;
  }
  flatten(root.right);
};