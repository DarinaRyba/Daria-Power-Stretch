import React, { useEffect } from 'react';
import './Header.css';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import { signInWithGoogle, signOut } from '../../redux/actions/auth-actions';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

function Login({ dispatch, user }) {
  // const [user, setUser] = useState(JSON.parse(localStorage.user));
  const classes = useStyles();

  useEffect(() => {

  }, []);

  const handleLogin = () => {
    dispatch(signInWithGoogle());
  };

  const handleLogout = () => {
    dispatch(signOut());
  };

  return (
    <>
      <div className={classes.root}>
        {!user?.user?.uid
          ? <Button onClick={() => handleLogin()} id="btn-login" className="header__btn-login" variant="contained">Login</Button>
          : <Button onClick={() => handleLogout()} id="btn-logout" className="header__btn-login" variant="contained">Logout</Button>}
      </div>

      <div className={classes.root}>
        <Avatar alt="" src={user?.additionalUserInfo?.profile?.picture} />
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
  user: { displayName: null },
};

function mapStateToProps(state) {
  return {
    user: state.usersReducer.user,
    isLogged: state.usersReducer.isLogged,
  };
}

export default connect(mapStateToProps)(Login);
