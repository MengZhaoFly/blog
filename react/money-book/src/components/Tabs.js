import React from 'react'
import PropTypes from 'prop-types'

export class Tabs extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeIndex: props.activeIndex
    }
  }
  tabChange = (event, index) => {
    event.preventDefault()
    this.setState({
      activeIndex: index
    })
    this.props.onTabChange(index)
  }
  render() {
    const { children } = this.props
    const { activeIndex } = this.state
    return ( 
      <ul className="nav nav-tabs nav-fill my-4">
        {React.Children.map(children, (child, index) => {
          const activeClassName = (activeIndex === index) ? 'nav-link active' : 'nav-link'
          return (
            <li className="nav-item">
              <a
                onClick={(event) => { this.tabChange(event, index)}}
                className={activeClassName}
                role="button"
              >
                {child}
              </a>
            </li>
          )
        })}
      </ul>
    )
  }
}
Tabs.propTypes = {
  activeIndex: PropTypes.number.isRequired,
  onTabChange: PropTypes.func.isRequired,
}

export const Tab = ({ children }) => 
<React.Fragment>{children}</React.Fragment>

