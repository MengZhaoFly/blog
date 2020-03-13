/**
var a = {
    a1: 1,
    a2: {
        b1: 1,
        b2: {
            c1: 1
        }
    }
}

    a
  /   \
 a1   a2        
 |    / \         
 1   b1 b2     
     |   |        
     1  c1
         |
         1       
*/
var a = {
  a1: 1,
  a2: {
      b1: 1,
      b2: {
          c1: 1
      }
  }
}
function cloneLoop(x) {
  let queue = [];
  let root = {};
  Object.keys(x).forEach(k => {
    queue.push({
      key: k,
      value: x[k],
      parent: root
    })
  })
  while (queue.length !== 0) {
    let node = queue.shift();
    let { key, value, parent } = node;
    if (typeof value === 'object') {
      if (!parent[key]) parent[key] = {}
      Object.keys(value).forEach(k => {
        queue.push({
          key: k,
          value: value[k],
          parent: parent[key]
        })
      })
    } else {
      parent[key] = value;
    }
  }
  return root;
}
console.log(cloneLoop(a), cloneLoop(a).a2 === a.a2);