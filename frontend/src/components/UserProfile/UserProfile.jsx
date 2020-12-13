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
          <Avatar className="avatar" alt="" src={userInLocalStorage?.user?.photoURL} />
        </div>
      </div>
      <div className="user-profile__info">
        <p>
          Name:
          {' '}
          {userInLocalStorage?.user?.displayName}
        </p>
        <p>
          Email:
          {' '}
          {userInLocalStorage?.user?.email}
        </p>
      </div>
      <div className="user-profile__booking">
        <p className="booking-title-text">Booked classes</p>
        <p className="booking-workout-text">
          Workout:
          {' '}
          {localStorage?.user?.days?.workout}
        </p>
        <p className="booking-day-text">
          Day:
          {' '}
          {localStorage?.user?.days?.day}
          {' '}
          {localStorage?.user?.days?.time}
        </p>
        <p className="booking-workout-text">Workout: Stretching</p>
        <p className="booking-day-text">Day: Monday 21/12/2020, 11:30-12:45</p>
      </div>
    </main>
  );
}

export default connect()(UserProfile);
