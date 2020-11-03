import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import '../../assets/sass/login-container.scss';
import Button from '@material-ui/core/Button';
import Cookies from 'universal-cookie';

const passwords = ['oaktree'];
const powerPasswords = ['full'];

const LoginInfo = ({ loggedInCookie }) => {
  if (loggedInCookie === 'true' || loggedInCookie === 'power') {
    return (
      <Grid container direction="column">
        <Grid item>
          <p>You are logged in.</p>
        </Grid>
        <Grid item>
          {loggedInCookie === 'power' ? (
            <p>Please go back to the main page.</p>
          ) : (
            <p>Please go back to the user study page.</p>
          )}
        </Grid>
      </Grid>
    );
  }

  return <p>You are not logged in.</p>;
};

const Login = () => {
  const [password, setPassword] = useState('');
  const cookies = new Cookies();

  const setLoginCookie = (event) => {
    event.preventDefault();

    if (passwords.find((pass) => pass === password)) {
      cookies.set('isLoggedIn', true, { path: '/' });
    }
    if (powerPasswords.find((pass) => pass === password)) {
      cookies.set('isLoggedIn', 'power', { path: '/' });
    }
    window.location.reload(false);
  };

  const isLoggedIn = cookies.get('isLoggedIn');

  return (
    <Grid container justify="center" align="center" className="login-container">
      <Grid item>
        <h1>To use this app, enter the password.</h1>
        <form noValidate autoComplete="off">
          <input type="text" placeholder="Password.." onChange={(e) => setPassword(e.target.value)} />
          <Button
            fullWidth
            disabled={isLoggedIn === 'true' || isLoggedIn === 'power'}
            type="submit"
            className="send-button"
            onClick={setLoginCookie}
            variant="contained"
            color="primary"
          >
            Login
          </Button>
          <LoginInfo loggedInCookie={isLoggedIn} />
        </form>
      </Grid>
    </Grid>
  );
};

export default Login;
