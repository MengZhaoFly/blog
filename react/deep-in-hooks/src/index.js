import React from "react";
import ReactDOM from "react-dom";


let currentIndex = 0;
let currentComponent = {
  __hooks: []
};
function getHookState(index) {
  const hooks = currentComponent.__hooks;
  if (index >= hooks.length) {
    hooks.push({});
  }
  return hooks[index];
}

function argsChanged(oldArgs, newArgs) {
  return !oldArgs || newArgs.some((arg, index) => arg !== oldArgs[index]);
}

function useState(initialState) {
  const hookState = getHookState(currentIndex++);
  console.log('currentIndex', currentIndex);
  hookState._value = [
    hookState._value ? hookState._value[0] : initialState,
    function setState(newState) {
      hookState._value[0] = newState;
      render(); // 重新渲染，将会重新执行 Counter
    }
  ];

  return hookState._value;
}

function useEffect(callback, args) {
  const state = getHookState(currentIndex++);
  if (argsChanged(state._args, args)) {
    callback();
    state._args = args;
    render();
  }
}

function useMemo(callback, args) {
  const state = getHookState(currentIndex++);
  if (argsChanged(state._args, args)) {
    state._args = args;
    state._callback = callback;
    state.value = callback();
    return state.value;
  }

  return state.value;
}

function useCallback(callback, args) {
  return useMemo(() => callback, args);
}

function Counter() {
  console.log('start render');
  const [count, setCount] = useState(0);
  const [firstName, setFirstName] = useState("Rudi");

  const computed = () => {
    return count * 10 - 2;
  };
  const sum = useMemo(computed, [count]);

  useEffect(() => {
    console.log("init");
  }, []);
  console.log('currentIndex->>>>', currentIndex);
  return (
    <div>
      <div>
        {count} * 10 - 2 = {sum}
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
