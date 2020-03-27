/**
 * // Definition for a Node.
 * function Node(val, children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */
/**
 * @param {Node} root
 * @return {number[]}
 */
var preorder = function(root) {
  let res = [];
  function walk(node) {
    if (node) {
      let val = node.val;
      res.push(val);
      for (let child of node.children) {
        walk(child);
      }
    }
  }
  walk(root);
};