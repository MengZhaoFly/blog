/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} root
 * @param {number} k
 * @return {ListNode[]}
 */
var splitListToParts = function(root, k) {
  let count = 0, current = root;
  while(current) {
    count ++;
    current = current.next;
  }
  current = root;
  let res = [], splitCount = [];
  if (count >= k) {
    let i = 0, rest = count, splitK = k;
    while (i < k - 1) {
      let t = Math.ceil(rest / splitK);
      splitCount[i] = t;
      splitK --;
      rest = rest - t;
      i ++;
    }
    splitCount.push(rest)
  } else {
    splitCount = splitCount.concat(new Array(count).fill(1), new Array(k - count).fill(0))
  }
  // console.log(splitCount)
  splitCount.forEach(c => {
    let i = 0, list = {val: null, next: null}, listCurrent = list;
    while (i < c && current) {
      listCurrent.next = current;
      current = current.next;
      listCurrent = listCurrent.next;
      i ++;
    }
    listCurrent.next = null;
    if (list.next !== null) res.push(list.next);
    else res.push(null)
  })
  // console.log(res);
  return res;


};
// let l = {val: 1, next: {val: 4, next: {val: 3, next: {val: 2, next: {val: 6, next: null}}}}}
// splitListToParts(l,3)
