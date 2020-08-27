import React, { useState, useEffect, Fragment } from 'react';



// 模拟网络请求，可以指定延迟时间
function getData(data, delay) {
  return new Promise(resolve => {
    setTimeout(()=>{
      resolve(`${data} result`);
    }, delay);
  })
}

function RaceCon() {
  const [query, setQuery] = useState('react');
  const [result, setResult] = useState();

  useEffect(() => {
    let didCancel = false;
    const fetchData = async () => {
      // 搜索 react1 时（第一个请求），2 秒后返回，其余 500 毫秒后返回
      const delay = query === 'react1' ? 2000 : 500;
      
      const result = await getData(query, delay);
      // 不处理 race-condition
      // setResult(result);
      // 处理 race-condition
      if (!didCancel) {
        setResult(result); 
      }
    }

    fetchData();
    return () => {
      // 如果 新的关键词 来了，那么 设为 true，请求即便后回来了，也不会 set
      didCancel = true;
    }
  }, [query]);

  return (
    <Fragment>
      <input
        type="text"
        value={query}
        onChange={event => setQuery(event.target.value)}
      />
      <div>
        result: <span>{result}</span>
      </div>
    </Fragment>
  );
}

export default RaceCon;