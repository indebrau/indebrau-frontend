import { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { Grid, Typography, withStyles } from '@material-ui/core';
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';
import BreweryComponent from './BreweryComponent';
import GraphChart from './GraphChart';
import LatestMediaFile from './LatestMediaFile';

import Loading from './Loading';
import Error from './Error';
import { BREWING_PROCESS_QUERY } from '../lib/queriesAndMutations';

const styles = (theme) => ({
  root: {
    textAlign: 'center',
    padding: theme.spacing(2),
  },
});

class BrewingProcess extends Component {
  render() {
    const { classes } = this.props;
    // all auth checks done in corresponding page (and backend), no need to check again
    return (
      <div className={classes.root}>
        <Query
          query={BREWING_PROCESS_QUERY}
          variables={{ id: this.props.brewingProcessId }}
          pollInterval={5000}
        >
          {({ data, error, loading }) => {
            if (loading) return <Loading />;
            if (error) return <Error error={error} />;
            if (data && data.brewingProcess) {
              let { brewingProcess } = data;
              if (brewingProcess.end) {
                return (
                  <Typography variant="h5" gutterBottom>
                    {brewingProcess.name} has ended!
                  </Typography>
                );
              }
              if (!brewingProcess.start) {
                return (
                  <Typography variant="h5" gutterBottom>
                    {brewingProcess.name} has not started yet!
                  </Typography>
                );
              }
              let brewingStep = brewingProcess.brewingSteps[0]; // "active" is set in query!
              let name = brewingStep.name;
              const activeGraphs = [];
              brewingStep.graphs.map((activeGraph) => {
                activeGraphs.push(
                  <ResponsiveContainer width="99%" key={activeGraph.id}>
                    <GraphChart
                      data={activeGraph.graphData}
                      key={activeGraph.id}
                      sensorName={activeGraph.sensor.name}
                      binary={activeGraph.sensor.binary}
                    />
                  </ResponsiveContainer>
                );
              });
              const activeStreams = [];
              brewingStep.mediaStreams.map((mediaStream) => {
                activeStreams.push(
                  <Grid item key={mediaStream.id}>
                    <LatestMediaFile
                      key={mediaStream.id}
                      id={mediaStream.id}
                      brewingStepId={brewingStep.id}
                      updateFrequency={mediaStream.updateFrequency}
                    />
                  </Grid>
                );
              });
              return (
                <>
                  <Typography variant="h5" gutterBottom>
                    {brewingProcess.name}
                  </Typography>
                  <Grid container spacing={1} justify="center">
                    <Grid item>
                      {name == 'PREPARING' && (
                        <BreweryComponent type="GrainMill" />
                      )}
                    </Grid>
                    <Grid item>
                      {name == 'BREWING' && <BreweryComponent type="MashTun" />}
                    </Grid>
                    <Grid item>
                      {name == 'BREWING' && (
                        <BreweryComponent type="SpargingVessel" />
                      )}
                    </Grid>
                    <Grid item>
                      {name == 'BREWING' && <BreweryComponent type="Pump" />}
                    </Grid>
                    <Grid item>
                      {name == 'BREWING' && (
                        <BreweryComponent type="WortCopper" />
                      )}
                    </Grid>
                    <Grid item>
                      {name == 'BREWING' && (
                        <BreweryComponent type="WortChiller" />
                      )}
                    </Grid>
                    <Grid item>
                      {name == 'FERMENTING' && (
                        <BreweryComponent type="Fermenter" />
                      )}
                    </Grid>
                    <Grid item>
                      {name == 'FERMENTING' && (
                        <BreweryComponent type="Hydrometer" />
                      )}
                    </Grid>
                    <Grid item>
                      {name == 'CONDITIONING' && (
                        <BreweryComponent type="Keg" />
                      )}
                    </Grid>
                    <Grid item>
                      {name == 'BOTTLING' && <BreweryComponent type="Bottle" />}
                    </Grid>
                  </Grid>
                  <Grid container spacing={1} justify="center">
                    {activeGraphs}
                    {activeStreams}
                  </Grid>
                </>
              );
            }
          }}
        </Query>
      </div>
    );
  }
}

BrewingProcess.propTypes = {
  classes: PropTypes.object.isRequired,
  brewingProcessId: PropTypes.string.isRequired,
};

export default withStyles(styles)(BrewingProcess);
