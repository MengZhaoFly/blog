import React, {
  useState,
  // useCallback,
  useRef
} from "react";

export default function Example() {
  const [count, setCount] = useState(0);
  let countRef = useRef();
  countRef.current = count;
  // 每次 Render 的内容都会形成一个快照并保留下来，因此当状态变更而 Rerender 时，
  // 就形成了 N 个 Render 状态，
  // 而每个 Render 状态都拥有自己固定不变的 Props 与 State。
  // v2
  // const handleAlertClick = useCallback(() => {
  //   setTimeout(() => {
  //     alert("You clicked on: " + count);
  //   }, 3000);
  // }, [count]);
  // v1
  // const handleAlertClick = () => {
  //   setTimeout(() => {
  //     alert("You clicked on: " + count);
  //   }, 3000);
  // };
  // v3
  const handleAlertClick = () => {
    setTimeout(() => {
      alert("You clicked on: " + countRef.current);
    }, 3000);
  };

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>增加 count</button>
      <button onClick={handleAlertClick}>显示 count</button>
    </div>
  );
}

