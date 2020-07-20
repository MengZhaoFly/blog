import React, { useEffect } from 'react';
import logo from './logo.svg';
import { useObserver, observer } from 'mobx-react'
import { storesContext } from './Context';
import Header from './Header';

function useStores() {
  return React.useContext(storesContext)
}
// function useUserData() {
//   const { counterStore, themeStore } = useStores()
//   return useObserver(() => ({
//     double: counterStore.doubleCount,
//     orderId: order.id,
//   }))
// }
function App() {
  // const { counterStore, themeStore } = useStores()
  // useEffect(() => {
  //   setTimeout(() => {
  //     themeStore.setTheme('yellow')
  //   }, 3000);
  // }, [])
  // return (
  //   <div className="App" style={{ color: themeStore.theme }}>
  //     { counterStore.count }
  //     { themeStore.theme }
  //   </div>
  // );
  return (
    <div>
      <Header />
      推荐 居家
    </div>
  )
}

export default observer(App);

// 第1次render
// function App() {
//   const fun = () => {
//     console.log(1)
//   }
//   return ()
// }
// // 第2次render
// function App() {
//   const fun = () => {
//     console.log(1)
//   }
//   return ()
// }
// // 第3次render
// function App() {
//   const fun = () => {
//     console.log(1)
//   }
//   return ()
// }
