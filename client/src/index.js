import React from 'react';
import ReactDOM from '../node_modules/react-dom';
import "./style.css";
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './utils/auth';

ReactDOM.render(
  <AuthProvider>
    <App/>
  </AuthProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
