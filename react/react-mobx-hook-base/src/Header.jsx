import React, { Component } from 'react';
import './App.css'
export default function Header() {
  return (
    <div className="header">
      <h2>LOGO</h2>
      <input type="text" placeholder="输入点什么吧"/>
      <button>搜索</button>
    </div>
  )
}