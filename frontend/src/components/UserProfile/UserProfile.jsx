import React, { useEffect } from 'react';
import './UserProfile.css';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { fetchUser } from '../../redux/actions/user-actions';

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

function UserProfile({ user, dispatch, match }) {
  const { userId } = match.params;
  useEffect(() => {
    dispatch(fetchUser(userId));
  }, [user, userId, user]);

  const classes = useStyles();
  return (
    <main className="user-profile-container">
      <div className="user-profile__image">
        <div className={classes.root}>
          <Avatar className="avatar" alt="" src={user?.photoURL} />
        </div>
      </div>
      <div className="user-profile__info">
        <p>
          {`Name: ${user?.displayName}`}
        </p>
        <p>
          {`Email: ${user?.email} `}
        </p>
      </div>
      <div className="user-profile__booking">
        <p className="booking-title-text">Booked classes:</p>
        <ul className="booked-classes-list">
          {user && user.days.map((scheduleItem) => (
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
function mapStateToProps(state) {
  return {
    user: state.usersReducer.user,
    isLogged: state.usersReducer.isLogged,
  };
}

export default connect(mapStateToProps)(UserProfile);
