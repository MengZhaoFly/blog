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
var middleNode = function(head) {
  let arr = [];
  let current = head;
  while (current) {
    arr.push(current);
    current = current.next;
  }
  let len = arr.length;
  let mid = Math.floor(len / 2);
  return arr[mid];
};