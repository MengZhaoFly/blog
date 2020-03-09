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
 */

var oddEvenList = function(head) {
  // 奇
  let l1 = new ListNode(null), l1Current = l1;
  // 偶
  let l2 = new ListNode(null), l2Current = l2;
  let current = head,i = 1;
  while(current) {
    if (i % 2 !== 0) {
      l1Current.next = current;
      l1Current = l1Current.next;
    } else {
      l2Current.next = current;
      l2Current = l2Current.next;
    }
    i ++;
    current = current.next;
  }
  if (i % 2 !== 0) {
    // 奇链表 多一个
    l1Current.next = null;
  } else {
    l2Current.next = null;
  }
  l1Current.next = l2.next
  // console.log(JSON.stringify(l1), JSON.stringify(l2), i)
  // return l1.next;
  return l1.next;
};
// let l = {val: 1, next: {val: 4, next: {val: 3, next: {val: 2, next: {val: 5, next: {val: 2, next: {val: 2, next: null}}}}}}}
// oddEvenList(l)
