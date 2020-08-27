import React, { Fragment, useState, useEffect } from "react";

function getData(data, delay) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(`${data} result`);
    }, delay);
  });
}

// 请求序号
let seqenceId = 0;
// 上一个有效请求的序号
let lastId = 0;

function RaceCon2() {
  const [query, setQuery] = useState("react");
  const [result, setResult] = useState();

  useEffect(() => {
    const fetchData = async () => {
      // 发起一个请求时，序号加 1
      seqenceId ++;
      const curId = seqenceId;

      const delay = query === "react1" ? 2000 : 500;
      const result = await getData(query, delay);

      // 只展示序号比上一个有效序号大的数据
      if (curId > lastId) {
        setResult(result);
        lastId = curId;
      } else {
        console.log(`discard ${result}`);
      }
    };

    fetchData();
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

export default RaceCon2;