import React from 'react';
import ReactDOM from 'react-dom';
import App from '@/components/App/App';
import '@fontsource/roboto';
import '@/components/styles/main.css';

// Это должно быть закомментировано для сборки в bundle
// import reportWebVitals from '@/reportWebVitals';

// Находим все элементы <weather-widget>
let root = document.getElementsByTagName('weather-widget');

// Рендерим в каждом найденном элементе наш виджет,
// передавая в него значение атрибута data-widget-name,
// это необходимо для независимой работы нескольких виджетов
// в одном документе
[...root].forEach(rootEl => {
  ReactDOM.render(
    <React.StrictMode>
      <App widgetName={rootEl.dataset.widgetName}/>
    </React.StrictMode>,
    rootEl
  );
})

// ReactDOM.render(
//   <React.StrictMode>
//     <App ww="1"/>
//   </React.StrictMode>,
//   [...root][0]
// );

// Это должно быть закомментировано для сборки в bundle
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
