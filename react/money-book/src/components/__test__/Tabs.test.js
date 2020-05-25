import React from 'react'
import { shallow } from 'enzyme'
import { Tabs, Tab } from '../Tabs'

const props = {
  onTabChange: jest.fn(),
  activeIndex: 0,
}
let wrapper

describe('test Tabs and Tab Component', () => {
  beforeEach(() => {
    wrapper = shallow(
      <Tabs {...props}>
        <Tab>1</Tab>
        <Tab>2</Tab>
      </Tabs>
    )
  })
  it('should render the component to match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })
  it('should render two Tab component, first one should be active', () => {
    expect(wrapper.find(Tab).length).toEqual(2)
    expect(wrapper.find('.nav-link').length).toEqual(2)
    expect(wrapper.state().activeIndex).toEqual(0)
    expect(wrapper.find('.nav-link').first().hasClass('active')).toEqual(true)
  })
  it('click the 2nd Tab should change the active stauts and trigger the right function', () => {
    wrapper.find('.nav-link').last().simulate('click', { preventDefault: () => {}})
    expect(wrapper.find('.nav-link').first().hasClass('active')).toEqual(false)
    expect(wrapper.find('.nav-link').last().hasClass('active')).toEqual(true)
    expect(wrapper.state().activeIndex).toEqual(1)
    expect(props.onTabChange).toHaveBeenCalledWith(1)
  })
})