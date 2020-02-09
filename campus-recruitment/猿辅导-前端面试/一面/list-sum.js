/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
function ListNode(val) {
  this.val = val;
  this.next = null;
}
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
  let dummyHead = new ListNode(0);
  let p = l1, q = l2, current = dummyHead;
  // 进位
  let carry = 0;
  while (p !== null || q !== null) {
    let pVal = p !== null ? p.val : 0;
    let qVal = q !== null ? q.val : 0;
    // 进位 加上 列表的值
    console.log(carry, pVal, qVal)
    let sum = carry + pVal + qVal;
    // 要不要进位 留作下一次加法用
    carry = parseInt(sum / 10);
    current.next = new ListNode(sum % 10);
    current = current.next;
    if (p !== null) p = p.next;
    if (q !== null) q = q.next;
  }
  // 最后 处理 
  // l1=[9,9] 
  // l2=[1]l2=[1]	求和运算最后可能出现额外的进位，这一点很容易被遗忘
  if (carry > 0) {
    current.next = new ListNode(carry);
  }
  return dummyHead.next;
};
// (2 -> 4 -> 3) + (5 -> 6 -> 4)
let list1 = {val: 9, next: { val: 4, next: {val: 3, next: null }}}
let list2 = {val: 5, next: { val: 6, next: {val: 9, next: null }}}
console.log(addTwoNumbers(list1, list2));