import React, { Component, PureComponent } from 'react';
import { Provider, Consumer } from './Context';
// PureComponent内部自动实现了前后参数的浅比较
export default (mapStateToProps, mapDispatchToProps) =>
  (WrappedComponent) => class ConnectedComponent extends Component {
    render() {
      return <Consumer>
        {(context) => {
          const { dispatch, state } = context;
          let filterProps = {};
          if (typeof mapStateToProps === 'function') {
            Object.assign(filterProps, mapStateToProps(state));
          }
          if (typeof mapDispatchToProps === 'function') {
            Object.assign(filterProps, mapDispatchToProps(dispatch));
          }
          return <WrappedComponent
            {...this.props}
            {...filterProps}
          />
          // return <Prevent
          //   combinedProps={{ ...this.props, ...filterProps }}
          //   WrappedComponent={WrappedComponent} />
        }}
      </Consumer>
    }
  };
class Prevent extends PureComponent {
  render() {
    const { combinedProps, WrappedComponent } = this.props;
    return <WrappedComponent {...combinedProps} />;
  }
}