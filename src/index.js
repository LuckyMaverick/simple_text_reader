import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/styles.scss'  // import main scss here
import TextReader from "./js/TextReader";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <TextReader />
  </React.StrictMode>
);