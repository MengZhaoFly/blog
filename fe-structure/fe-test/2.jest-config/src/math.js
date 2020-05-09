function add(a, b) {
  if (a < 0) {
    return Math.abs(a) + b;
  }
  return a + b;
}
function minus(a, b) {
  return a - b
}

export {
  add,
  minus
}