  
var levelOrder = function(root) {
  let res = []
  function walk(node, level) {
    if (!node) return;
    let val = node.val;
    if (!res[level]) res.push([]);
    res[level].push(val);
    walk(node.left, level + 1);
    walk(node.right, level + 1);
  }
  walk(root, 0);
  return res;
}