import { Component } from 'react';
import PropTypes from 'prop-types';
import { Mutation } from '@apollo/client/react/components';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {
  Avatar,
  Button,
  FormControl,
  Input,
  InputLabel,
  Paper,
  Typography,
  withStyles,
} from '@material-ui/core';
import Error from './Error';
import {
  CURRENT_USER_QUERY,
  SIGNIN_MUTATION,
} from '../lib/queriesAndMutations';
import Link from './Link';

const styles = (theme) => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(400 + theme.spacing(3) * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(
      3
    )}px`,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  button: {
    marginTop: theme.spacing(3),
  },
});

class SignIn extends Component {
  state = {
    password: '',
    email: '',
  };
  saveToState = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { classes } = this.props;

    return (
      <Mutation
        mutation={SIGNIN_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(signin, { loading, error }) => (
          <main className={classes.main}>
            <Error error={error} />
            <Paper className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <form
                className={classes.form}
                method="post"
                onSubmit={async (e) => {
                  e.preventDefault();
                  await signin().catch(() => { });
                  this.setState({ email: '', password: '' });
                }}
              >
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="email">Email Address</InputLabel>
                  <Input
                    id="email"
                    name="email"
                    autoComplete="email"
                    value={this.state.email}
                    onChange={this.saveToState}
                    autoFocus
                  />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <Input
                    name="password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={this.state.password}
                    onChange={this.saveToState}
                  />
                </FormControl>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={loading}
                  className={classes.button}
                >
                  Sign in
                </Button>
                <Link href="/signup">
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="secondary"
                    disabled={loading}
                    className={classes.button}
                  >
                    No Account? Sign up here!
                  </Button>
                </Link>
              </form>
            </Paper>
          </main>
        )}
      </Mutation>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignIn);
