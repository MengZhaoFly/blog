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
/**
迭代
var reverseList = function(head) {
    var cur = head,
        prev = null;
      while (cur) {
        // js 引用的问题 需要暂存一下 下一个节点
        // 相当于 cur.next 指向一个对象的引用
        // 现在 我们把这个对象的引用 赋给 t 把
        //  cur.next 指向另外一个地方 切断了原来的引用
        var t = cur.next;
        cur.next = prev;
        prev = cur;
        cur = t;
        // cur = cur.next; // 假如不存在引用问题
      }
      return prev;
    
};
 */
 /**
 返回了5这个节点
reverseList(4)中
p为5
head.next.next = head 相当于 5 -> 4
现在节点情况为 4 -> 5 -> 4
head.next = null,切断4 -> 5 这一条，现在只有 5 -> 4
返回（return）p为5，5 -> 4
返回上一层reverseList(3)
处理完后返回的是4 -> 3
依次向上
  */
var reverseList = function (head) {
  let current = head;
  // 如果当前要反转的节点为 null 或者反转链表为 null
  // current.next 为 null，即反转链表的尾结点不存在，即反转链表不存在
  if (current == null || current.next == null) return current;
  // 节点 p 其实就是反转链表的头节点 
  let p = reverseList(current.next);
  // 我们将反转链表的尾结点（head.next）的 next 指向当前即将反转的节点
  current.next.next = current;
  // 然后让当前节点变成反转链表的尾结点
  current.next = null;
  // 返回反转链表的头结点
  return p;
}