/**
 * Definition for singly-linked list.

 */
/**
 * @param {ListNode} head
 * @param {number} x
 * @return {ListNode}
 */
//  function ListNode(val) {
//        this.val = val;
//        this.next = null;
//    }
var partition = function(head, x) {
  let l1 = new ListNode(null), l1Current = l1;
  let l2 = new ListNode(null), l2Current = l2;
  let current = head;
  while(current) {
    if (current.val >= x) {
      l2Current.next = current;
      l2Current = l2Current.next;
    } else {
      l1Current.next = current;
      l1Current = l1Current.next;
    }
    current = current.next;
  }
  l2Current.next = null;
  l1Current.next = l2.next;
  return l1.next;
};
// let l = {val: 1, next: {val: 4, next: {val: 3, next: {val: 2, next: {val: 5, next: {val: 2, next: null}}}}}}
// console.log(JSON.stringify(partition(l, 3)))
// [1,4,3,2,5,2]