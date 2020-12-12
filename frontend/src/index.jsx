import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import './index.css';
import Header from './components/Header/Header';
import WorkoutDetail from './components/WorkoutDetail/WorkoutDetail';
import MainPage from './components/MainPage/MainPage';
import configureStore from './redux/configureStore';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './components/Footer/Footer';
import UserProfile from './components/UserProfile/UserProfile';

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/" exact component={MainPage} />
          <Route path="/workouts/:workoutId" exact component={WorkoutDetail} />
          <Route path="/myAccount" exact component={UserProfile} />
        </Switch>
        <Footer />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
