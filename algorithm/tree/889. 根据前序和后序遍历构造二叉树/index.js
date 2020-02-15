/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} pre
 * @param {number[]} post
 * @return {TreeNode}
 */
// pre:  root left  right
// post: left right root
// pre left 第一个元素，是 post left 的最后一个元素
var constructFromPrePost = function(pre, post) {
    if (!pre.length || ! post.length) return null;
    let rootVal = pre[0];
    let root = new  TreeNode(rootVal);
    if(pre.length < 1) return 
    let i = post.findIndex(e => e === pre[1]);
    // i 索引，我们需要 left 部分的长度
    root.left = constructFromPrePost(pre.slice(1, i + 2), post.slice(0, i + 1))
    root.right = constructFromPrePost(pre.slice(i + 2), post.slice(i + 1, post.length - 1))
    return root;
};