import { cbTest, fetchList, map } from './mock';
import axios from 'axios'

jest.mock('axios')

describe('mock test', () => {

  test('cbtest', (done) => {
    expect.assertions(2)
    let cb = jest.fn(() => { });
    cbTest((data) => {
      cb();
      expect(cb).toBeCalled();
      expect(data).toBe(123);
      done();
    })
  })
  // Mocking Modules
  test('fetchList', (d) => {
    axios.mockResolvedValue({
      data: "123"
    })
    fetchList().then(data => {
      expect(data).toBe('123');
      d();
    })
  })
  // mock function
  test('map', () => {
    const mockCallback = jest.fn(x => 2 * x);
    let res = map([2, 4], mockCallback);

    // The mock function is called twice
    expect(mockCallback.mock.calls.length).toBe(2);

    // The first argument of the first call to the function was 0
    expect(mockCallback.mock.calls[0][0]).toBe(2);
    expect(mockCallback.mock.calls[0][1]).toBe(0);

    // The first argument of the second call to the function was 1
    expect(mockCallback.mock.calls[1][0]).toBe(4);
    expect(mockCallback.mock.calls[1][1]).toBe(1);

    // The return value of the first call to the function was 42
    expect(mockCallback.mock.results[0].value).toBe(4);
    expect(mockCallback.mock.results[1].value).toBe(8);
    expect(res).toEqual([4, 8]);
  })

})