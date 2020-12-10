import React from 'react';
import './Header.css';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import { signInWithGoogle, signOut, saveUserFromLocalStorage } from '../../redux/actions/auth-actions';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

function Login({ dispatch, user }) {
  const userInLocalStorage = JSON.parse(window.localStorage.getItem('user'));
  if (userInLocalStorage && !user) {
    dispatch(saveUserFromLocalStorage(userInLocalStorage));
  }

  const classes = useStyles();

  const handleLogin = () => {
    dispatch(signInWithGoogle());
  };

  const handleLogout = () => {
    dispatch(signOut());
  };

  return (
    <>
      <div className={classes.root}>
        {user
          ? <Button onClick={() => handleLogout()} id="btn-logout" className="header__btn-login" variant="contained">Logout</Button>
          : <Button onClick={() => handleLogin()} id="btn-login" className="header__btn-login" variant="contained">Login</Button>}
      </div>

      <div className={classes.root}>
        <Avatar alt="" src={user?.photoURL} />
      </div>
      {' '}

    </>

  );
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.shape({}),
};

Login.defaultProps = {
  user: null,
};

function mapStateToProps(state) {
  return {
    user: state.usersReducer.user,
    isLogged: state.usersReducer.isLogged,
  };
}

export default connect(mapStateToProps)(Login);
