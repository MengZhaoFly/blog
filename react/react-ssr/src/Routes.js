import React from 'react';
import { Route } from 'react-router-dom';
import Home from './Container/Home/index.jsx';
import Login from './Container/Login/index.jsx';
import Detail from './Container/Detail/index';
import NotFound from './Container/404/index';
import App from './App';
// 当我加载显示HOME组件之前，我希望调用Home.loadData方法，提前获取到必要的异步数据
// 然后再做服务器端渲染，把页面返回给用户
export default [
  {
    path: '/',
    component: App,
    loadData: App.loadData,
    routes: [
      {
        path: '/',
        component: Home,
        exact: true,
        loadData: Home.loadData,
      },
      {
        path: '/login',
        component: Login,
        exact: true,
      },
      {
        path: '/detail',
        component: Detail
      },
      {
        component: NotFound
      }
    ]
  },
];