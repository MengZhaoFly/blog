// ["A","A","A","B","B","B"]
// A -> B -> (待命) -> A -> B -> (待命) -> A -> B.
// ["A","A","A", "A", "A", "B", "C", "D", "E", "F", "G"]  n = 2;
// A -> 等 -> 等 ->  A  错
// A -> B -> C -> D -> E ... A 能取 D ？？？ 错
// A(n = 2) -> B(n--) -> C(n--) -> A（cd过了之后，数量大）
// 贪心：优先选择那些：不在冷却期的任务 数量多，
var leastInterval = function (tasks, n) {
  let res = 0;
  let map = {};
  let len = tasks.length;
  for (let i = 0; i < tasks.length; i++) {
    let taskName = tasks[i];
    if (!map[taskName]) {
      // [数量， CD]
      map[taskName] = [0, 0]
    }
    map[taskName][0]++;
  }
  while (len > 0) {
    let current = null;
    for (let key in map) {
      // 不在冷却期 有 数量
      if (map[key][1] === 0 && map[key][0] > 0) {
        // 找数量最大的
        // current 初值
        if (!current || map[key][0] > current[0]) {
          current = map[key];
        }
      } else if (map[key][0] > 0 && map[key][1] > 0) {
        map[key][1]--;
      }
    }
    if (current) {
      // 执行任务
      current[0]--;
      current[1] = n;
      len--;
    }
    // 待命
    res++;
  }
  return res;
}

