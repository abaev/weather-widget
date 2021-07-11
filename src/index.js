import React from 'react';
import ReactDOM from 'react-dom';
import App from '@/components/App/App';
import '@fontsource/roboto';

// Это должно быть закомментировано для сборки в bundle
import reportWebVitals from '@/reportWebVitals';

// Находим все элементы <weather-widget>
let root = document.getElementsByTagName('weather-widget');

[...root].forEach(el => {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    el
  );
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// Это должно быть закомментировано для сборки в bundle
reportWebVitals();
