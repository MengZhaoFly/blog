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

 var preorderTraversal = function(root) {
  let res = [];
   if (root) {
     res.push(root.val);
     res = res.concat(preorderTraversal(root.left));
     res = res.concat(preorderTraversal(root.right));
   }
   return res;
};