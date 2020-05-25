import React from 'react'
import Ionicon from 'react-ionicons'
import PropTypes from 'prop-types'
import { Colors } from '../utility'

class CategorySelect extends React.Component {
  selectCategory = (event, category) => {
    this.props.onSelectCategory(category)
    event.preventDefault()
  }
  render() {
    const { categories, selectedCategory } = this.props
    const selectedCategoryId = selectedCategory && selectedCategory.id
    return (
      <div className="category-select-component">
        <div className="row">
        {
          categories.map((category, index) => {
            const iconColor = (category.id === selectedCategoryId) ? Colors.white : Colors.gray
            const backColor = (category.id === selectedCategoryId) ? Colors.blue : Colors.lightGray
            const activeClassName = (selectedCategoryId === category.id)
            ? 'category-item col-3 active' : 'category-item col-3'
            return (
              <div className={activeClassName} key={index} role="button" style={{ textAlign: 'center'}}
              onClick={(event) => {this.selectCategory(event, category)}}>
                <Ionicon
                  className="rounded-circle"
                  style={{ backgroundColor: backColor, padding: '5px' }} 
                  fontSize="50px"
                  color={iconColor}
                  icon={category.iconName}
                />
                <p>{category.name}</p>
              </div>
            )
          })
        }
        </div>
      </div>
    )
  }
}

CategorySelect.propTypes = {
  categories: PropTypes.array.isRequired,
  selectedCategory: PropTypes.object,
  onSelectCategory: PropTypes.func.isRequired,
}
export default CategorySelect