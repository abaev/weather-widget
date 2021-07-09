import React from 'react';
import ReactDOM from 'react-dom';
import '@/index.css';
import Widget from '@/components/Widget/Widget';

// Это закомментировано для сборки в bundle
// import reportWebVitals from '@/reportWebVitals';

const root = document.body.getElementsByTagName('weather-widget');

[...root].forEach(el => {
  ReactDOM.render(
    <React.StrictMode>
      <Widget />
    </React.StrictMode>,
    el
  );
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// Это закомментировано для сборки в bundle
// reportWebVitals();
