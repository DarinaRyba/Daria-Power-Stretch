import React from 'react';
import './UserProfile.css';
import { connect } from 'react-redux';

import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
    justifyContent: 'center',
    padding: '16px',
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

function UserProfile() {
  const userInLocalStorage = JSON.parse(window.localStorage.getItem('user'));

  const classes = useStyles();
  return (
    <main className="user-profile-container">
      <div className="user-profile__image">
        <div className={classes.root}>
          <Avatar className="avatar" alt="" src={userInLocalStorage?.photoURL} />
        </div>
      </div>
      <div className="user-profile__info">
        <p>
          {`Name: ${userInLocalStorage?.displayName}`}
        </p>
        <p>
          {`Email: ${userInLocalStorage?.email} `}
        </p>
      </div>
      <div className="user-profile__booking">
        <p className="booking-title-text">Booked classes:</p>
        <ul className="booked-classes-list">
          {userInLocalStorage.days && userInLocalStorage.days.map((scheduleItem) => (
            <li key={performance.now() * Math.random()} className="list">
              <p className="booking-workout-text">
                {`Workout: ${scheduleItem.workout}`}
              </p>
              <p className="booking-day-text">
                {`Day: ${scheduleItem.date} Time: ${scheduleItem.time}`}
              </p>
            </li>
          ))}

        </ul>
      </div>
    </main>
  );
}

export default connect()(UserProfile);
