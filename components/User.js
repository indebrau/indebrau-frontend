import { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { Paper, Button, Typography, withStyles } from '@material-ui/core';
import Link from './Link';
import BrewingProcessTable from './BrewingProcessTable';
import SignIn from './SignIn';
import SignOut from './SignOut';
import { CURRENT_USER_QUERY } from '../lib/queriesAndMutations';

const styles = (theme) => ({
  root: {
    width: '100%',
    overflowX: 'auto',
    textAlign: 'center',
    padding: theme.spacing(2),
    maxHeight: '100%',
  },
});

const CurrentUser = (props) => (
  <Query {...props} query={CURRENT_USER_QUERY}>
    {(payload) => props.children(payload)}
  </Query>
);

CurrentUser.propTypes = {
  children: PropTypes.func.isRequired,
};

class User extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <CurrentUser>
          {({ data }) => {
            const me = data ? data.me : null;
            return (
              <>
                {!me && <SignIn />}
                {me && (
                  <Paper className={classes.root}>
                    <Typography variant="h5" gutterBottom>
                      Hello {me.name}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                      Your Brewing Processes
                    </Typography>
                    <BrewingProcessTable
                      brewingProcesses={me.participatingBrewingProcesses}
                      adminView={false}
                    />
                    <br />
                    {me && me.permissions.includes('ADMIN') && (
                      <Link href="/adminDashboard">
                        <Button>Go to Admin Area</Button>
                      </Link>
                    )}
                    <br />
                    <Link href="/">
                      <SignOut />
                    </Link>
                  </Paper>
                )}
              </>
            );
          }}
        </CurrentUser>
      </div>
    );
  }
}

User.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(User);
export { CurrentUser };
