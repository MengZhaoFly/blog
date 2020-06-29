const iterator = {
  // -  [Symbol.iterator]: () => {
  [Symbol.asyncIterator]: () => {
    const items = [1, 2, 3, 4, 5, 6, , ,];
    return {
      // -      next: () => ({
      next: () => Promise.resolve({
        done: items.length === 0,
        value: items.shift()
      })
    }
  }
}
async function foo() {
  for await(let num of iterator) {
    console.log(num);
  }
}
foo();
