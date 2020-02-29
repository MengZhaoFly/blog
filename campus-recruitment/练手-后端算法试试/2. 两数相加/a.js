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
 * 
 */
 var addTwoNumbers = function(l1, l2) {
  // 哑结点 没有用的节点
  let dummyHeader = new ListNode(0);
  // 当前作为我们 结果链表 里面的哪个节点
  let current = dummyHeader;
  let pCurrent = l1, qCurrent = l2;
  let carry = 0;
  while (pCurrent !== null || qCurrent!== null) {
    let pVal = pCurrent !== null ? pCurrent.val : 0
    let qVal = qCurrent !== null ? qCurrent.val : 0
    let sum = qVal + pVal + carry;
    carry = parseInt(sum / 10);

    // 7  17
    let node = new ListNode(sum % 10)
    current.next = node;
    current = current.next;
    if (pCurrent !== null) pCurrent = pCurrent.next;
    if (qCurrent !== null) qCurrent = qCurrent.next;
  }
  if (carry > 0) {
    current.next = new ListNode(carry);
  }
  return dummyHeader.next;
};