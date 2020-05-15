import { add, minus, fetchData, fetchDataPromise} from './math';

test('测试加法3 + 7', () => {
  expect(add(3, 7)).toBe(10)
})
test('测试减法6 - 3', () => {
  expect(minus(6, 3)).toBe(3)
})
test('测试fetchData', done => {
  function callback(data) {
    try {
      expect(data).toEqual({code: 200});
      done();
    } catch (error) {
      done(error);
    }
  }
  fetchData(callback);
});
test('fetchDataPromise', () => {
  // 确保断言被调用
  expect.assertions(1)
  return fetchDataPromise().then(data => {
    expect(data).toEqual({code: 304});
  });
})

