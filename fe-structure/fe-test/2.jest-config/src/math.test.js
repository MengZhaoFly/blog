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
  return fetchDataPromise().then(data => {
    expect(data).toEqual({code: 304});
  });
})
// http://laibh.top/2019-08-19-%E5%89%8D%E7%AB%AF%E5%BF%85%E5%A4%87%E7%9A%84%E6%B5%8B%E8%AF%95%E5%AD%A6%E4%B9%A0.html
// http://www.imooc.com/article/254755
// 我们会介绍 Jest 中的三个与 Mock 函数相关的API，分别是jest.fn()、jest.spyOn()、jest.mock()
