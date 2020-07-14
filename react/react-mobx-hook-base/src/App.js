import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useObserver } from 'mobx-react'
import { storesContext } from './Context';
function useStores() {
  return React.useContext(storesContext)
}
function useUserData() {
  const { user, order } = useStores()
  return useObserver(() => ({
    username: user.name,
    orderId: order.id,
  }))
}
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
