import React, { Component } from 'react';

class NotFound extends Component {
  render() {
    if (this.props.staticContext) {
      this.props.staticContext.notFound = true
    }
    return (
      <div>
        404
      </div>
    );
  }
}
 
export default NotFound;