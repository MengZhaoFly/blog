import React from 'react';
import Search from './Search';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

let wrapper;
let inputElem;
describe('测试 Search 组件', () => {
  beforeEach(() => {
    wrapper = shallow(<Search />)
    inputElem = wrapper.find('.search')
  })

  it('正常渲染', () => {
    expect(() => {
      wrapper.setProps({});
      wrapper.unmount();
    }).not.toThrow();
  });

  it('包含一个 input', () => {
    expect(inputElem.length).toBe(1);
    
  });

  it('input初始化内容应该为空', () => {
    expect(inputElem.prop('value')).toBe('')
  });

  it('当用户输入时，input内容会跟着变化', () => {
    const value = '哈哈哈'
    inputElem.simulate('change', {
      target: {
        value
      }
    })
    expect(wrapper.state('value')).toBe(value)
  });

  it('当用户输入后，键入回车，如果 input 没有内容，则不操作', () => {
    const fn = jest.fn();
    const wrapper = shallow(<Search onSubmit={fn} />)
    wrapper.setState({ value: '' })
    const inputElem = wrapper.find('.search')
    inputElem.simulate('keyUp', {
      keyCode: 13
    })
    expect(fn).not.toBeCalled()
  });

  it('当用户输入后，键入回车，如果 input 有内容，addUndoItem应该被调用,然后input被清空', () => {
    const fn = jest.fn();
    const wrapper = shallow(<Search onSubmit={fn} />)
    const value = 'haha';
    wrapper.setState({ value })
    const inputElem = wrapper.find('.search')
    inputElem.simulate('keyUp', {
      keyCode: 13
    })
    expect(fn).toBeCalled()
    expect(fn).toBeCalledWith(value)
    const newInputElem = wrapper.find('.search')
    expect(newInputElem.prop('value')).toBe('')
  });
});