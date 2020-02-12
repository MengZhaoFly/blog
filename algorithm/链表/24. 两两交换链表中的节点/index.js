/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 * [1,2,3,4]
 */
// let lll = {
//   val: 1, next: { val: 2, next: {val: 3, next: { val: 4}}}
// }
// 处理 两个节点 两两交换
// 返回已经处理好的节点
var swapPairs = function (head) {
  if (head === null || head.next === null) return head;
  let next = head.next;
  let newHead = head.next.next;
  next.next = head;
  head.next = swapPairs(newHead);
  return next;
};
// console.log(swapPairs(lll));