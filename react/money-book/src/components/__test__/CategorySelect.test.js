import React from 'react'
import { shallow } from 'enzyme'
import CategorySelect from '../CategorySelect'
import Ionicon from 'react-ionicons'

export const categories = [
   {
    "id": "1",
    "name": "旅行",
    "type": "outcome",
    "iconName": "ios-plane",    
  },
   {
    "id": "2",
    "name": "理财",
    "type": "income",
    "iconName": "logo-yen", 
  },
  {
    "id": "3",
    "name": "理财",
    "type": "income",
    "iconName": "logo-yen", 
  }
]

let props = {
  categories,
  onSelectCategory: jest.fn()
}

let props_with_category = {
  categories,
  onSelectCategory: jest.fn(),
  selectedCategory: categories[0],
}

describe('test CategorySelect component', () => {
  it('should render the component to match the snapshot', () => {
    const wrapper = shallow(<CategorySelect {...props_with_category} />)
    expect(wrapper).toMatchSnapshot()
  })
  it('renders with categories should render the correct items', () => {
    const wrapper = shallow(<CategorySelect {...props} />)
    expect(wrapper.find('.category-item').length).toEqual(categories.length)
    expect(wrapper.find('.category-item.active').length).toEqual(0)
    const firstIcon = wrapper.find('.category-item').first().find(Ionicon)
    expect(firstIcon.length).toEqual(1)
    expect(firstIcon.props().icon).toEqual(categories[0].iconName)
  })
  it('render selectedCategory with category item with highlight', () => {
    const wrapper = shallow(<CategorySelect {...props_with_category} />)
    expect(wrapper.find('.category-item').first().hasClass('active')).toEqual(true)
  })
  it('click the item should add active class and trigger the callback', () => {
    const wrapper = shallow(<CategorySelect {...props_with_category} />)
    wrapper.find('.category-item').at(1).simulate('click', { preventDefault: () => {} })
    expect(props_with_category.onSelectCategory).toHaveBeenCalledWith(categories[1])
  })
})

