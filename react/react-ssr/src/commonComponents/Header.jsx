import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionCreator from '../store/actions/loginAction';
class Header extends Component {

  render() {
    const { islogin, handleLogin, handleLogout } = this.props;
    console.log('islogin------》》》', islogin);
    return (
      <div>
        header area
        <Link to="/">home</Link>
        <Link to="/login"
        onClick={handleLogin}
        >login</Link>
        <Link to="/detail">detail</Link>
        <br />
        {!islogin && <button to="/login"
        onClick={handleLogin}
        >login</button>}
        <br />
        {islogin && (
          <>
            <Link to="/detail">进详情页面</Link>
            <br />
            <button onClick={handleLogout}>退出</button>
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
export default connect(mapStateToProps, mapDispatchToProps)(Header);