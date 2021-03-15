import { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { Paper, Typography, withStyles } from '@material-ui/core';
import {
  ALL_GRAPHS_QUERY,
  ACTIVE_GRAPHS_QUERY,
} from '../../lib/queriesAndMutations';
import Loading from '../Loading';
import Error from '../Error';
import GraphChart from '../GraphChart';
import GraphTable from './GraphTable';
import CreateGraph from './CreateGraph';

const styles = (theme) => ({
  root: {
    width: '100%',
    textAlign: 'center',
    overflowX: 'auto',
    padding: theme.spacing(1),
    maxHeight: '100%',
  },
});

class AllGraphs extends Component {
  render() {
    const { classes } = this.props;

    const activeGraphsVariables = {
      dataPoints: 500,
      active: true,
    };

    return (
      <>
        <Query
          query={ACTIVE_GRAPHS_QUERY}
          variables={activeGraphsVariables}
          pollInterval={10000}
        >
          {({ data, error, loading }) => {
            if (loading) return <Loading />;
            if (error) return <Error error={error} />;
            if (data) {
              const activeGraphs = data.graphs.map((activeGraph) => (
                <GraphChart
                  data={activeGraph.graphData}
                  key={activeGraph.id}
                  sensorTopic={activeGraph.sensor.topic}
                  binary={activeGraph.sensor.binary}
                />
              ));
              return (
                <Paper className={classes.root}>
                  <Typography variant="subtitle1">Active Graphs</Typography>
                  {activeGraphs}
                </Paper>
              );
            }
          }}
        </Query>
        <Query query={ALL_GRAPHS_QUERY}>
          {({ data, error, loading }) => {
            if (loading) return <Loading />;
            if (error) return <Error error={error} />;
            if (data) {
              return (
                <Paper className={classes.root}>
                  <Typography variant="subtitle1">All Graphs</Typography>
                  <GraphTable graphs={data.graphs} />
                  <CreateGraph className={classes.root} />
                </Paper>
              );
            }
          }}
        </Query>
      </>
    );
  }
}

AllGraphs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AllGraphs);
