import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Helmet} from "react-helmet";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { getCommentList } from '../../store/actions/homeAction.js';

class Home extends Component {
  // 只在 客户端 渲染 时候执行 服务器端 不存在
  componentDidMount() {
    console.log(123, 7899, 89);
    const { commentList } = this.props;
    if (!this.props.commentList.length) {
      this.props.getCommentList();
    }
  }
  render() {
    const { commentList } = this.props;
    return (
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>blog</title>
          <meta name="description" content="my blog" />
        </Helmet>
        hotComment:
        <ul>
          {
            commentList.map((comment, i) => {
              return (
                <li key={i}>{ comment.content }</li>
              )
            })
          }
        </ul>
        <button onClick={() => {
          console.log('click');
        }}>click</button>
      </div>
    );
  }
}
Home.loadData = function(store) {
  // 服务端渲染 提前加载数据 redux-thunk support dispatch function
  return store.dispatch(getCommentList())
}
const mapStateToProps = (state) => {
  const { name, commentList } = state.home;
  return { name, commentList }
}
const mapDispatchToProps = (dispatch) => {
  // 客户端渲染
  return {
    getCommentList() {
      dispatch(getCommentList());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);