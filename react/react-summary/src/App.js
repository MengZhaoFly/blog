import React from 'react';
import logo from './logo.svg';
import './App.css';
import SuspenseDemo from './suspense-demo/index';
import Cv1 from './hooks-problem/CV1';
import Cv2 from './hooks-problem/CV2'

function App() {
  return (
    <>
      <SuspenseDemo />
      <Cv1 />
      <Cv2 />
    </>
  );
}

export default App;
