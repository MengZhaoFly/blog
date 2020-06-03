import React, { Component } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter, Route } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { Provider } from 'react-redux';

export const render = (req, store, routes, context) => {
  console.log('给app context', context)
  const App = (
    <Provider store={store}>
      <StaticRouter location={req.path} 
      context={context}>
        <div>
          { renderRoutes(routes) }
        </div>
      </StaticRouter>
    </Provider>
  )
  const content = renderToString(App);
  const cssStr = context.css || ''
  return `
			<html>
        <head>
          <title>title</title>
          <style>
          ${cssStr}
          </style>
				</head>
				<body>
					<div id="root">${content}</div>
					<script>
						window.context = {
							state: ${JSON.stringify(store.getState())}
						}
					</script>
					<script src='/index.js'></script>
				</body>
			</html>
	  `;

}