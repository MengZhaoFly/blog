import React from 'react'
import { mount } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'
import { Home }  from '../Home'
import { parseToYearAndMonth, flatternArr, LIST_VIEW, CHART_VIEW } from '../../utility'
import Loader from '../../components/Loader'
import PriceList from '../../components/PriceList'
import { Tabs } from '../../components/Tabs'
import PieChart from '../../components/PieChart'
import { testCategories, testItems } from '../../testData'

const initData = {
  categories: {},
  items: {},
  isLoading: false,
  categoriesIsLoaded: false,
  currentDate: parseToYearAndMonth()
}
const withLoadingData = {
  ...initData, isLoading: true
}
const withLoadedData = {
  categories: flatternArr(testCategories),
  items: flatternArr(testItems),
  isLoading: false,
  currentDate: parseToYearAndMonth()
}
const actions = {
  getInitalData: jest.fn(),
  selectNewMonth: jest.fn(),
  deleteItem: jest.fn()
}
it('test home container first render, without any data, getInitalData should be called', () => {
  const wrapper = mount(
    <MemoryRouter>
      <Home data={initData} actions={actions} />
    </MemoryRouter>
  )
  expect(wrapper.find('.no-record').length).toEqual(1)
  expect(actions.getInitalData).toHaveBeenCalled()
})

it('test home container with loading state, loading icon should show up', () => {
  const wrapper = mount(
    <MemoryRouter>
      <Home data={withLoadingData} actions={actions} />
    </MemoryRouter>    
  )
  expect(wrapper.find(Loader).length).toEqual(1)
})

describe('test home container with loaded data', () => {
  const wrapper = mount(
    <MemoryRouter>
      <Home data={withLoadedData} actions={actions} />
    </MemoryRouter>    
  )
  const wrapperInstance = wrapper.find(Home).instance()
  it('should show price list and view tab', () => {
    expect(wrapper.find(PriceList).length).toEqual(1)
    expect(wrapper.find(Tabs).length).toEqual(1)
    expect(wrapperInstance.state.tabView).toEqual(LIST_VIEW)
    expect(wrapper.find(Loader).length).toEqual(0)
  })
  it('click the year and month should trigger the selectNewMonth callback', () => {
    wrapper.find('.dropdown-toggle').simulate('click')
    wrapper.find('.months-range .dropdown-item').first().simulate('click')
    expect(actions.selectNewMonth).toHaveBeenCalledWith(initData.currentDate.year, 1)
  })
  it('click the item delete button should trigger the deleteItem callback', () => {
    const firstItem = wrapper.find('.list-group .list-group-item').first()
    firstItem.find('a').last().simulate('click')
    expect(actions.deleteItem).toHaveBeenCalledWith(testItems[0])
  })
  it('click the the tab should change the view and state', () => {
    wrapper.find('.nav-tabs .nav-item a').at(1).simulate('click')
    expect(wrapper.find(PriceList).length).toEqual(0)
    expect(wrapper.find(PieChart).length).toEqual(2)
    expect(wrapperInstance.state.tabView).toEqual(CHART_VIEW)
  })
})