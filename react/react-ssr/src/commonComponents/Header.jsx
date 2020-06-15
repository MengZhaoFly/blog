import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import WithServerStyle from '../Hoc/WithServerStyle'
import * as actionCreator from '../store/actions/loginAction';
import styles from './header.css';

class Header extends Component {
  // componentWillMount() {
  //   if (this.props.staticContext) {
  //     this.props.staticContext.css.push(styles._getCss());
  //   }
  // }
  render() {
    const { islogin, handleLogin, handleLogout } = this.props;
    console.log('islogin------》》》', islogin);
    return (
      <div>
        header area
        <br />
        <Link to="/">home</Link><br />
        <Link to="/login"
          onClick={handleLogin}
        >login</Link><br />
        <Link to="/detail">detail</Link>
        <br />
        {!islogin &&
          <button to="/login" onClick={handleLogin} >login</button>
        }
        <br />
        {islogin && (
          <>
            <Link to="/detail">进详情页面</Link>
            <br />
            <button onClick={handleLogout} className={styles.out}>退出</button>
          </>
        )}
        <br />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    islogin: state.login.islogin
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    handleLogin() {
      dispatch(actionCreator.login())
    },
    handleLogout() {
      dispatch(actionCreator.logout())
    }
  }
}
export default connect(mapStateToProps,
  mapDispatchToProps)(
    WithServerStyle(Header, styles)
  );