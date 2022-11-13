import { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from '@apollo/client/react/components';
import { Paper, Typography, withStyles } from '@material-ui/core';
import { ALL_BREWING_PROCESSES_QUERY } from '../../lib/queriesAndMutations';
import Loading from '../Loading';
import Error from '../Error';
import BrewingProcessTable from '../BrewingProcessTable';
import CreateBrewingProcess from './CreateBrewingProcess';

const styles = (theme) => ({
  root: {
    width: '100%',
    overflowX: 'auto',
    padding: theme.spacing(1),
    maxHeight: '100%',
    textAlign: 'center',
  },
});

class AllBrewingProcesses extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Query query={ALL_BREWING_PROCESSES_QUERY}>
        {({ data, error, loading }) => {
          if (loading) return <Loading />;
          if (error) return <Error error={error} />;
          // success!
          return (
            <Paper className={classes.root}>
              <Typography variant="subtitle1" className={classes.root}>
                All Brewing Processes
              </Typography>
              <BrewingProcessTable
                brewingProcesses={data.brewingProcesses}
                adminView={true}
                bottlesView={false}
              />
              <CreateBrewingProcess className={classes.root} />
            </Paper>
          );
        }}
      </Query>
    );
  }
}

AllBrewingProcesses.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AllBrewingProcesses);
