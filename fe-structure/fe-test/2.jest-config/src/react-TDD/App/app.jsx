import React from 'react';

function App() {
  return (
     // 使用的data-test=xxx 等属性可以做到解耦，不会因为改变样式名而发生改变，另外也不会被hash掉
    <div className="app-container" title="laibh" data-test="container">
      hello world
    </div>
  );
}

export default App;