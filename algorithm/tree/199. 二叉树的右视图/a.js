/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var rightSideView = function (root) {
  let res = [];
  if (!root) return res;
  let queue = [root];
  while (queue.length !== 0) {
    let loop = queue.splice(0, queue.length);
    let lastNode = loop[loop.length - 1];
    res.push(lastNode.val);
    for (let node of loop) {
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }
  return res;
};