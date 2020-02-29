/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
 var mergeTwoLists = function(l1, l2) {
  if (!l1 && !l2) return null;
  let dummyHeader = new ListNode(null);
  let current = dummyHeader
  let l1c = l1, l2c = l2;
  while(l1c && l2c) {
    if (l1c.val <= l2c.val) {
      current.next = new ListNode(l1c.val);
      l1c = l1c.next;
    } else {
      current.next = new ListNode(l2c.val);
      l2c = l2c.next;
    }
    current = current.next;
  }
  if (l1c) current.next = l1c;
  if (l2c) current.next = l2c;
  return dummyHeader.next;
};
// 1->2->4, 1->3->4
// let ll = {val: 1, next: {val: 2, next: {val: 4, next: null}}}
// let lll = {val: 1, next: {val: 3, next: {val: 4, next: null}}}
// console.log(mergeTwoLists(ll, lll))