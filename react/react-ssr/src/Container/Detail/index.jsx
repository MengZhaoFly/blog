import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {Helmet} from "react-helmet";
import { Redirect } from 'react-router-dom';

class Detail extends Component {

  render() {
    const { islogin } = this.props;
    return (
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>post detail</title>
          <meta name="description" content="post detail" />
        </Helmet>
        {
          islogin ? 
          <div>这是一个需要登录的页面</div> :
          <Redirect to="/" />
        }
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    islogin: state.login.islogin
  }
}

export default connect(mapStateToProps)(Detail);