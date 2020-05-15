import { config } from './config';


describe('snapshot test', () => {

  test('config', () => {
    expect(config()).toMatchSnapshot();
  })
})