function match(string) {
  let state = start;
  for (let c of string) {
    state = state(c);
  }
  return state === end;

}
// abc
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
    return end;
  } else {
    return start(char)
  }
}
function end() {
  return end
}
console.log(match('abxababc'))
// abcabx