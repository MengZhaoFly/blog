import React from 'react';
// import './style.css';
import styles from './style.css';

export default function App() {
  const handleload = () => {
    import("./dynamic.js").then(r => {
      console.log(r);
    })
  }
  return (
    <div 
    // className="swiper-container"
    className={styles['swiper-container']}
    onClick={handleload}
    >
      {/* http:baidu.com/a/b/index.html */}
      {/* ./ http:baidu.com/a/b/ip6x2.png */}
      {/* /  http:baidu.com/ip6x2.png */}
      <img src="/ip6x2.png"
       alt="图片加载出错"/>
      this is app 
    </div>
  )
}
