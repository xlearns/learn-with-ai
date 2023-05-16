import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Button from 'app_a/Button';

ReactDOM.render(
  <React.StrictMode>
    <App />
    <Button>Hello World!</Button>
  </React.StrictMode>,
  document.getElementById('root')
);