import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import axios from 'axios'
import Home from './containers/Home'
import Create from './containers/Create'
import { flatternArr, parseToYearAndMonth, ID } from './utility'
import { AppContext } from './AppContext'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: {},
      categories: {},
      isLoading: false,
      currentDate: parseToYearAndMonth(),
    }
    const withLoading = (cb) => {
      return (...args) => {
        this.setState({
          isLoading: true
        })
        return cb(...args)
      }
    }
    this.actions = {
      getInitalData: withLoading(async () => {
        const { currentDate } = this.state
        const getURLWithData = `/items?monthCategory=${currentDate.year}-${currentDate.month}&_sort=timestamp&_order=desc`
        const results = await Promise.all([axios.get('/categories'), axios.get(getURLWithData)])
        const [ categories, items ] = results
        this.setState({
          items: flatternArr(items.data),
          categories: flatternArr(categories.data),
          isLoading: false,
        })
        return { items, categories }
      }),
      getEditData: withLoading(async (id) => {
        const { items, categories } = this.state
        let promiseArr = []
        if (Object.keys(categories).length === 0) {
          promiseArr.push(axios.get('/categories'))
        }
        const itemAlreadyFetched = !!(Object.keys(items).indexOf(id) > -1)
        if (id && !itemAlreadyFetched) {
          const getURLWithID = `/items/${id}`
          promiseArr.push(axios.get(getURLWithID))
        }
        const [ fetchedCategories , editItem ] = await Promise.all(promiseArr)

        const finalCategories = fetchedCategories ? flatternArr(fetchedCategories.data) : categories
        const finalItem = editItem ? editItem.data : items[id]
        if (id) {
          this.setState({
            categories: finalCategories,
            isLoading: false,
            items: { ...this.state.items, [id]: finalItem },
          })
        } else {
          this.setState({
            categories: finalCategories,
            isLoading: false,
          })         
        }
        return {
          categories: finalCategories,
          editItem: finalItem,
        }
      }),
      selectNewMonth: withLoading(async (year, month) => {
        const getURLWithData = `/items?monthCategory=${year}-${month}&_sort=timestamp&_order=desc`
        const items = await axios.get(getURLWithData)
        this.setState({
          items: flatternArr(items.data),
          currentDate: { year, month },
          isLoading: false,
        })
        return items
      }),
      deleteItem: withLoading(async (item) => {
        const deleteItem = await axios.delete(`/items/${item.id}`)
        delete this.state.items[item.id]
        this.setState({
          items: this.state.items,
          isLoading: false,
        })
        return deleteItem
      }),
      createItem: withLoading(async (data, categoryId) => {
        const newId = ID()
        const parsedDate = parseToYearAndMonth(data.date)
        data.monthCategory = `${parsedDate.year}-${parsedDate.month}`
        data.timestamp = new Date(data.date).getTime()
        const newItem = await axios.post('/items', { ...data, id: newId, cid: categoryId })
        this.setState({
          items: { ...this.state.items, [newId]: newItem.data },
          isLoading: false,
        })
        return newItem.data
      }),
      updateItem: withLoading(async (item, updatedCategoryId) => {
        const modifiedItem = {
          ...item,
          cid: updatedCategoryId,
          timestamp: new Date(item.date).getTime()
        }
        const updatedItem = await axios.put(`/items/${modifiedItem.id}`, modifiedItem)
        this.setState({
          items: { ...this.state.items, [modifiedItem.id]: modifiedItem },
          isLoading: false,
        })
        return updatedItem.data
      })
    }
  }
  render() {
    return (
      <AppContext.Provider value={{
        state: this.state,
        actions: this.actions,
      }}>
      <Router>
        <div className="App">
          <div className="container pb-5">
            <Route path="/" exact component={Home} />
            <Route path="/create" component={Create} />
            <Route path="/edit/:id" component={Create} />
          </div>
        </div>
      </Router>
      </AppContext.Provider>
    );
  }
}

export default App;