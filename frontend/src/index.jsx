import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import './index.css';
import Header from './components/Header/Header';
import WorkoutDetail from './components/WorkoutDetail/WorkoutDetail';
import configureStore from './redux/configurateStore';

const store = configureStore();
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Header />
      <WorkoutDetail />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
