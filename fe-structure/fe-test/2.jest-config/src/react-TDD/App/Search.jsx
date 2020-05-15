import React, { Component } from 'react';

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: ''
    }
  }

  handleInputKeyUp = (e) => {
    const { value } = this.state;
    const { onSubmit } = this.props;
    if (e.keyCode === 13 && value) {
      onSubmit(value)
      this.setState({ value: '' })
    }
  }

  handleInputChange = (e) => {
    this.setState({ value: e.target.value })
  }

  render() {
    const { value } = this.state;
    return (
      <div>
        <div>
          搜索组件
        <input className="search"
            value={value}
            onChange={this.handleInputChange}
            onKeyUp={this.handleInputKeyUp}
            placeholder='Add Todo'
          />
        </div>
      </div>
    )
  }
}

export default Search;