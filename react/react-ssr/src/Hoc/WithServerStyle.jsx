import React, { Component } from 'react';
function WithServerStyle(DecCom, styles) {
  class WithServerStyleCom extends Component {
    componentWillMount() {
      if (this.props.staticContext) {
        this.props.staticContext.css.push(styles._getCss());
      }
    }
    render() {
      const props = this.props
      return (
        <DecCom { ...props }/>
      );
    }
  }
  return WithServerStyleCom
}

export default WithServerStyle;