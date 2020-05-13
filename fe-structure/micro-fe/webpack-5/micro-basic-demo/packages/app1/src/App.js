import React from 'react';
const { lazy, Suspense } = React;
const RemoteButton = lazy(() => import('app2/Button'));
const App = () => (
  <div>
    <h3>基础的Remote 的微前端应用</h3>
    <hr />
    <Suspense fallback="loading remoteButton...">
      <RemoteButton />
    </Suspense>
  </div>
);
export default App;
