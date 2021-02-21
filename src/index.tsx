import React from 'react';
import {render} from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

/*
  tighten the root element in the index.html
  index.html must have been loaded before App mounts
*/
function initializeInventoryApp() {
  const appRoot = document.getElementById('root');
  if (!appRoot) throw new Error('No #root found in DOM');
  render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    appRoot
  );
}

initializeInventoryApp();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
