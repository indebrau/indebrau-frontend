import { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Toolbar,
  Button,
  Typography,
  withStyles,
  Avatar,
} from '@material-ui/core';
import Link from './Link';

import { CurrentUser } from './User';

const styles = (theme) => ({
  main: {
    width: 'auto',
    [theme.breakpoints.up(1100 + theme.spacing(2))]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  toolbarMain: {
    borderBottom: `1px solid ${theme.palette.grey[300]}`,
  },
  toolbarTitle: {
    flex: 1,
    [theme.breakpoints.down(300 + theme.spacing(2))]: {
      display: 'none',
    },
  },
});

class Nav extends Component {
  state = {
    signedIn: false,
  };

  render() {
    const { classes } = this.props;

    return (
      <main className={classes.main}>
        <CurrentUser>
          {({ data }) => {
            const me = data ? data.me : null;
            return (
              <Toolbar className={classes.toolbarMain}>
                <Link href="/">
                  <Button>Home</Button>
                </Link>
                <Link href="/beers">
                  <Button>Our Beer</Button>
                </Link>
                <Link href="https://shop.indebrau.de">
                  <Button>Shop</Button>
                </Link>
                <Typography
                  component="h2"
                  variant="h5"
                  color="inherit"
                  align="center"
                  noWrap
                  className={classes.toolbarTitle}
                />
                <Link href="/user">
                  {!me && <Button>Sign In</Button>}
                  {me && <Avatar>{me.name.charAt(0).toUpperCase()}</Avatar>}
                </Link>
              </Toolbar>
            );
          }}
        </CurrentUser>
      </main>
    );
  }
}

Nav.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Nav);
