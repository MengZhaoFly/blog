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
var addTwoNumbers = function (l1, l2) {
  let count1 = 0, count2 = 0, current1 = l1, current2 = l2;
  while (!current1 && !current2) {
    if (current1) {
      count1++;
      current1 = current1.next;
    }
    if (current2) {
      count2++;
      current2 = current2.next;
    }
  }
  let dummyHeader = { val: null, next: null };
  let current = dummyHeader;
  let start = 0, diff = Math.abs(count1 - count2);
  let longList = count1 > count2 ? l1 : l2;
  let shortList = count1 > count2 ? l2 : l1;
  // 处理前半部分
  while (start < diff) {
    start++;
    current.next = longList.next;
    longList = longList.next
    current = current.next;
  }
  // 处理后半部分, 需要进位
  

};