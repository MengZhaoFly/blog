import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
// import systemjs from 'systemjs';

const LoadMicroApp1 = lazy(() =>  System.import('http://localhost:3000/scripts/main.js'))
function MicroApp1() {
  return (
    <Suspense fallback="loading ...">
      <LoadMicroApp1 />
    </Suspense>
  )
}
export default function App() {
  return (
    <Router>
      <div>
        hhhhhhhh
        <ul>
          <li>
            <Link to="/about">/about</Link>
          </li>
        </ul>

        <Switch>
          <Route path="/about" component={MicroApp1}/>
        </Switch>
      </div>
    </Router>
  );
}
