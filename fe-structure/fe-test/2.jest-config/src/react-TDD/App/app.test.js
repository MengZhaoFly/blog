import React from 'react';
import App from './App';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });


it('renders without crashing', () => {
  const wrapper = shallow(<App />)
  // 输出整个内容字符串
  // console.log(wrapper.debug())
  /**
    <div className="app-container" title="laibh" data-test="container">
      hello world
    </div>  
  */
  expect(wrapper.find('[data-test="container"]').length).toBe(1)
  expect(wrapper.find('[data-test="container"]').prop('title')).toBe('laibh')
});