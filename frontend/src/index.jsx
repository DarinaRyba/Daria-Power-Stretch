import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import './index.css';
import Header from './components/Header/Header';
import WorkoutDetail from './components/WorkoutDetail/WorkoutDetail';
import MainPage from './components/MainPage/MainPage';
import UserAccount from './components/UserAccount/UserAccount';
import configureStore from './redux/configureStore';
import 'bootstrap/dist/css/bootstrap.min.css';

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/" exact component={MainPage} />
          <Route path="/workouts/:workoutId" exact component={WorkoutDetail} />
          <Route path="/userAccount" exact component={UserAccount} />
        </Switch>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
