import React from 'react'
import { mount } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'
import { CreatePage }  from '../Create'
import { parseToYearAndMonth, flatternArr, TYPE_OUTCOME } from '../../utility'
import Loader from '../../components/Loader'
import CategorySelect from '../../components/CategorySelect'
import PriceForm from '../../components/PriceForm'
import { testCategories, testItems } from '../../testData'

const testItem = testItems[0]
const match = { params: { id: testItem.id } }
const history = { push: () => {} }
const createMatch = { params: { id: '' } }

const initData = {
  categories: {},
  items: {},
  isLoading: false,
  currentDate: parseToYearAndMonth()
}

const actions = {
  getEditData: jest.fn().mockReturnValue(Promise.resolve({ editItem: testItem, categories: flatternArr(testCategories)})),
  updateItem: jest.fn().mockReturnValueOnce(Promise.resolve('')),
  createItem: jest.fn().mockReturnValueOnce(Promise.resolve(''))
}

const withLoadedData = {
  categories: flatternArr(testCategories),
  items: flatternArr(testItems),
  isLoading: false,
  currentDate: parseToYearAndMonth()
}

const loadingData = {
  ...initData, isLoading: true
}

describe('test component init behavior', () => {
  it('test Create page for the first render, getEditData should be called with the right params', () => {
    const wrapper = mount(
      <MemoryRouter>
        <CreatePage data={initData} actions={actions} match={match} />
      </MemoryRouter>
    )
    expect(actions.getEditData).toHaveBeenCalledWith(testItem.id)
  })
  it('shoud show loading component when isLoaidng is true', () => {
    const wrapper = mount(
      <MemoryRouter>
        <CreatePage data={loadingData} actions={actions} match={match} />
      </MemoryRouter>
    )
    expect(wrapper.find(Loader).length).toEqual(1)
  })
})

describe('test component when in create mode', () => {
  const wrapper = mount(
    <MemoryRouter>
      <CreatePage data={withLoadedData} actions={actions} match={createMatch} history={history} />
    </MemoryRouter>
  )
  const setInputValue = (selector, newValue) => {
    wrapper.find(selector).instance().value = newValue
  }
  it('should pass the null to props selectedCategory for CategorySelect', () => {
    expect(wrapper.find(CategorySelect).props().selectedCategory).toEqual(null)
  })
  it('should pass empty object for PriceForm', () => {
    expect(wrapper.find(PriceForm).props().item).toEqual({})
    expect(wrapper.find(CreatePage).state('selectedTab')).toEqual(TYPE_OUTCOME)
  })
  it('submit the form, the addItem should not be triggered', () => {
    wrapper.find('form').simulate('submit')
    expect(actions.createItem).not.toHaveBeenCalled()
  })
  it('fill all inputs, and select the category, submit the form, addItem should be called', () => {
    setInputValue('#title', 'new title')
    setInputValue('#price', '200')
    setInputValue('#date', '2018-08-30')
    wrapper.find('.category-item').first().simulate('click')
    wrapper.find('form').simulate('submit')
    const testData = {title: 'new title', price: 200 , date: '2018-08-30'}
    expect(actions.createItem).toHaveBeenCalledWith(testData, testCategories[0].id)
  })
})

describe('test component when in edit mode', () => {
  const wrapper = mount(
    <MemoryRouter>
      <CreatePage data={withLoadedData} actions={actions} match={match} history={history} />
    </MemoryRouter>
  )
  const setInputValue = (selector, newValue) => {
    wrapper.find(selector).instance().value = newValue
  }
  const selectedCategory = testCategories.find(category => testItem.cid === category.id)
  it('should pass the right category to props selectedCategory for CategorySelect', () => {
    wrapper.update()
    expect(wrapper.find(CategorySelect).props().selectedCategory).toEqual(selectedCategory)
  })
  it('modify some inputs submit the form, modifyItem should be called', () => {
    setInputValue('#title', 'new title')
    wrapper.find('form').simulate('submit')
    const testData = {...testItem, title: 'new title'}
    expect(actions.updateItem).toHaveBeenCalledWith(testData, selectedCategory.id)
  })
})