function match(string) {
  let state = start;
  for (let c of string) {
    state = state(c);
  }
  return state === end;

}
function start(char) {
  if (char === 'a') return founda(char);
  return start;
}
function founda(char) {
  if (char === 'a') {
    return foundb;
  } else {
    return start(char)
  }
}

function foundb(char) {
  if (char === 'b') {
    return foundc;
  } else {
    return start(char)
  }
}
function foundc(char) {
  if (char === 'c') {
    return foundA2;
  } else {
    return start(char)
  }
}
function foundA2(char) {
  if (char === 'a') {
    return foundB2;
  } else {
    return start(char)
  }
}
function foundB2(char) {
  if (char === 'b') {
    return foundx;
  } else {
    return start(char)
  }
}
//到了 x 这里，前面出现的状态是 ab
// 即前面 ab 一定是确定存在的
// 如果不是 x 不能回到 start 要回到 c
function foundx(char) {
  if (char === 'x') {
    return end;
  } else {
    return foundc(char)
  }
}
function end() {
  return end
}
console.log(match('abcabxabcdabx'));
// abcabx
// abcabcabx 当找到 第二个 c 的时候 我们返回了 start（回到初始状态，这时候状态机以start识别后面的abx，即无法在回到前面的abc了）