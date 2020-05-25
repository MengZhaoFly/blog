import React from 'react'
import { mount } from 'enzyme'
import PriceForm from '../PriceForm'
import { testItems } from '../../testData'
let props = {
  onFormSubmit: jest.fn(),
  onCancelSubmit: jest.fn(), 
}
let props_with_item = {
  item: testItems[0],
  onFormSubmit: jest.fn(),
  onCancelSubmit: jest.fn(),
}
let wrapper, formInstance, wrapper2
export const getInputValue = (selector, wrapper) => (
  wrapper.find(selector).instance().value
)
export const setInputValue = (selector, newValue, wrapper) => {
  wrapper.find(selector).instance().value = newValue
}
describe('test PriceForm component', () => {
  beforeEach(() => {
    wrapper = mount(<PriceForm {...props} />)
    wrapper2 = mount(<PriceForm {...props_with_item} />)
    formInstance = wrapper.find(PriceForm).instance()
  })
  it('should render the component to match snapshot', () => {
    expect(wrapper).toMatchSnapshot()
    expect(wrapper2).toMatchSnapshot()
  })
  describe('test PriceForm with no item', () => {
    it('render PriceForm should generate three inputs and one form element', () => {
      expect(wrapper.find('input').length).toEqual(3)
      expect(wrapper.find('form').length).toEqual(1)
    })
    it('render PriceForm with no data should render three inputs and no value', () => {
      expect(getInputValue('#title', wrapper)).toEqual('')
      expect(getInputValue('#price', wrapper)).toEqual('')
      expect(getInputValue('#date', wrapper)).toEqual('')
    }),
    it('submit form with empty input should show alert message', () => {
      wrapper.find('form').simulate('submit')
      expect(formInstance.state.validatePass).toEqual(false)
      expect(wrapper.find('.alert').length).toEqual(1)
      expect(props_with_item.onFormSubmit).not.toHaveBeenCalled()
    })
    it('submit form with invalid price should show alert message', () => {
      setInputValue('#title', 'test', wrapper)
      setInputValue('#price', '-20', wrapper)
      wrapper.find('form').simulate('submit')
      expect(formInstance.state.validatePass).toEqual(false)
    })
    it('submit form with invalid date format should show alert message', () => {
      setInputValue('#title', 'test', wrapper)
      setInputValue('#price', '20', wrapper)
      setInputValue('#date', 'wrong date', wrapper)
      wrapper.find('form').simulate('submit')
      expect(formInstance.state.validatePass).toEqual(false)
    })
    it('submit form with valid data should call with the right object', () => {
      setInputValue('#title', 'test', wrapper)
      setInputValue('#price', '20', wrapper)
      setInputValue('#date', '2018-01-01', wrapper)
      const newItem = { title: 'test', price: 20, date: '2018-01-01'}
      wrapper.find('form').simulate('submit')
      expect(props.onFormSubmit).toHaveBeenCalledWith(newItem, false)
    })
    it('click the cancel button should call the right callback', () => {
      wrapper.find('button').last().simulate('click')
      expect(props.onCancelSubmit).toHaveBeenCalled()
    })
  })
  describe('test PriceForm with item data', () => {
    it('render PriceForm with item should render the correct data to inputs', () => {
      expect(getInputValue('#title', wrapper2)).toEqual(testItems[0].title)
      expect(getInputValue('#price', wrapper2)).toEqual(testItems[0].price.toString())
      expect(getInputValue('#date', wrapper2)).toEqual(testItems[0].date)
    }) 
    it('submit with changed value, should trigger callback with right object', () => {
      setInputValue('#title', 'new title', wrapper2)
      setInputValue('#price', '200', wrapper2)
      wrapper2.find('form').simulate('submit')
      const newItem = { ...testItems[0], title: 'new title', price: 200 }
      expect(formInstance.state.validatePass).toEqual(true)
      expect(wrapper2.find('.alert').length).toEqual(0)
      expect(props_with_item.onFormSubmit).toHaveBeenCalledWith(newItem, true)
    })
  })
})