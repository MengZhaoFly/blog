import React from "react";
import ReactDOM from "react-dom";



// 单个 hook
// const useState = (function () {
//   let _state;
//   return function (initialState) {
//     _state = _state || initialState; // 如果存在旧值则返回， 使得多次渲染后的依然能保持状态。
//     function setState(newState) {
//       _state = newState;
//       render();  // 重新渲染，将会重新执行 Counter
//     }
//     // hooks[currentIndex] = 
//     return [_state, setState];
//   }
// })()
// const useState = useStateWrap();
let currentIndex = 0;
let hooks = [];
const useState = (function () {
  
  return function (initialState) {
    if (!hooks[currentIndex]) hooks[currentIndex] = []
    let hookState = hooks[currentIndex];
    hooks[currentIndex][0] = hookState[0] || initialState; // 如果存在旧值则返回， 使得多次渲染后的依然能保持状态。
    function setState(newState) {
      hookState[0] = newState;
      render();  // 重新渲染，将会重新执行 Counter
    }
    hookState[1] = setState
    currentIndex ++;
    return hookState;
  }
})()

function Counter() {
  console.log('start render');
  const [count, setCount] = useState(0);
  const [firstName, setFirstName] = useState(123);
  return (
    <div>
      <div>
        {count}
      </div>
      <button onClick={() => setCount(count + 1)}>点击</button>
       <div>{firstName}</div>
     <button onClick={() => setFirstName("Fred" + Math.random())}>Fred</button>
    </div>
  );
}

const rootElement = document.getElementById("root");

function render() {
  currentIndex = 0;
  ReactDOM.render(<Counter />, rootElement);
}

render();
