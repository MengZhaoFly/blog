import { add, minus} from './math';

test('测试加法3 + 7', () => {
  expect(add(3, 7)).toBe(10)
})
test('测试减法6 - 3', () => {
  expect(minus(6, 3)).toBe(3)
})