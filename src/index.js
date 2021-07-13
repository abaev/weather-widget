import React from 'react';
import ReactDOM from 'react-dom';
import App from '@/components/App/App';
import '@fontsource/roboto';
import '@/components/styles/main.css';

// Это должно быть закомментировано для сборки в bundle
// import reportWebVitals from '@/reportWebVitals';

// Находим все элементы <weather-widget>
let root = document.getElementsByTagName('weather-widget');

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  [...root][0]
);

// Это должно быть закомментировано для сборки в bundle
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
