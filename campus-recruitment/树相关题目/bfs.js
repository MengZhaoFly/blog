/**
    3
   /   \
  9     20
 / \    /  \
1   2  15   7
 */
var levelOrder = function (root) {
  // BFS 实现 队列
  let queue = [], res = [];
  if(!root) return res;
  queue.push(root);
  while(queue.length !== 0) {
    let node = queue.shift();
    res.push(node.val);
    if (node.left) {
      queue.push(node.left);
    }
    if (node.right) {
      queue.push(node.right);
    }
  }
  return res;
}
/**
queue = [];
while(queue.length !== 0) {
  // 访问这个元素
  // 
  // 满足条件
  queue.push()
}
 */