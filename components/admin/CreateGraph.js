import { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Paper,
  Button,
  Grid,
  Dialog,
  DialogContent,
  FormControl,
  InputLabel,
  Input,
  Fab,
  MenuItem,
  DialogTitle,
  Select,
  withStyles,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { Query, Mutation } from '@apollo/client/react/components';
import STEPS from '../../lib/brewingSteps';
import Error from '../Error';
import Loading from '../Loading';
import {
  ACTIVE_GRAPHS_QUERY,
  ALL_GRAPHS_QUERY,
  ALL_BREWING_PROCESSES_QUERY,
  CREATE_GRAPH_MUTATION,
  SENSOR_QUERY,
} from '../../lib/queriesAndMutations';

const styles = (theme) => ({
  paper: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  fab: {
    margin: theme.spacing(1),
  },
});

class CreateGraph extends Component {
  state = {
    open: false,
    queryError: null,

    // mutation variables
    sensorTopic: '',
    updateFrequency: '30',
    brewingProcessId: '',
    brewingStepName: STEPS[0],
  };

  handleClose = () => {
    this.setState({
      open: false,
      queryError: null,

      // mutation variables
      sensorTopic: '',
      updateFrequency: '30',
      brewingProcessId: '',
      brewingStepName: STEPS[0],
    });
  };

  saveToState = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleNewBrewingProcessId = (event) => {
    this.setState({ brewingProcessId: event.target.value });
  };

  handleNewSensorTopic = (event) => {
    this.setState({ sensorTopic: event.target.value });
  };

  handleNewBrewingStepName = (event) => {
    this.setState({ brewingStepName: event.target.value });
  };

  render() {
    const { classes } = this.props;
    return (
      <>
        <Fab
          color="primary"
          aria-label="Add"
          className={classes.fab}
          onClick={this.handleClickOpen}
        >
          <AddIcon />
        </Fab>
        <Mutation
          mutation={CREATE_GRAPH_MUTATION}
          refetchQueries={[
            { query: ACTIVE_GRAPHS_QUERY },
            { query: ALL_GRAPHS_QUERY },
          ]}
        >
          {(createGraph, { loading }) => (
            <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              aria-labelledby="form-dialog-title"
              fullScreen
            >
              <Error error={this.state.queryError} />
              <DialogTitle id="form-dialog-title">Create Graph</DialogTitle>

              <DialogContent>
                <Paper className={classes.paper}>
                  <form
                    className={classes.form}
                    method="post"
                    onSubmit={async (e) => {
                      e.preventDefault();
                      // fire mutation (clear old error)
                      this.setState({ queryError: null });
                      await createGraph({
                        variables: {
                          sensorTopic: this.state.sensorTopic,
                          updateFrequency: parseInt(this.state.updateFrequency),
                          brewingProcessId: this.state.brewingProcessId,
                          brewingStepName: this.state.brewingStepName,
                        },
                      }).catch((e) => {
                        this.setState({ queryError: e });
                      });
                      if (this.state.queryError == null) {
                        this.handleClose();
                      }
                    }}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Query query={ALL_BREWING_PROCESSES_QUERY}>
                          {({ data, error, loading }) => {
                            if (loading) return <Loading />;
                            if (error) return <Error error={error} />;
                            let brewingProcesses = [''];
                            if (data) {
                              brewingProcesses = data.brewingProcesses;
                            }
                            return (
                              <FormControl
                                className={classes.formControl}
                                required
                                fullWidth
                              >
                                <InputLabel htmlFor="select-brewingProcess">
                                  Brewing Process
                                </InputLabel>
                                <Select
                                  onChange={this.handleNewBrewingProcessId}
                                  value={this.state.brewingProcessId}
                                  input={<Input id="select-brewingProcess" />}
                                  displayEmpty={true}
                                >
                                  {brewingProcesses.map((process) => (
                                    <MenuItem
                                      key={process.id}
                                      value={process.id}
                                    >
                                      {process.id}: {process.name}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            );
                          }}
                        </Query>
                      </Grid>
                      <Grid item xs={12}>
                        <FormControl
                          className={classes.formControl}
                          required
                          fullWidth
                        >
                          <InputLabel htmlFor="select-brewingStepName">
                            Brewing Step
                          </InputLabel>
                          <Select
                            onChange={this.handleNewBrewingStepName}
                            value={this.state.brewingStepName}
                            input={<Input id="select-brewingStepName" />}
                          >
                            {STEPS.map((step) => (
                              <MenuItem key={step} value={step}>
                                {step}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Query query={SENSOR_QUERY}>
                        {({ data, error, loading }) => {
                          if (loading) return <Loading />;
                          if (error) return <Error error={error} />;
                          let sensors = [''];
                          if (data) {
                            sensors = data.sensors;
                          }
                          return (
                            <FormControl
                              className={classes.formControl}
                              required
                              fullWidth
                            >
                              <InputLabel htmlFor="select-sensor">
                                Sensor
                              </InputLabel>
                              <Select
                                onChange={this.handleNewSensorTopic}
                                value={this.state.sensorTopic}
                                input={<Input id="select-sensor" />}
                                displayEmpty={true}
                              >
                                {sensors.map((sensor) => (
                                  <MenuItem
                                    key={sensor.topic}
                                    value={sensor.topic}
                                  >
                                    {sensor.name}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          );
                        }}
                      </Query>
                    </Grid>
                    <FormControl margin="normal" required fullWidth>
                      <InputLabel htmlFor="updateFrequency">
                        Update Frequency
                      </InputLabel>
                      <Input
                        id="updateFrequency"
                        name="updateFrequency"
                        type="number"
                        value={this.state.updateFrequency}
                        onChange={this.saveToState}
                        fullWidth
                      />
                    </FormControl>
                    <Button
                      onClick={this.handleClose}
                      className={classes.button}
                      color="secondary"
                      variant="contained"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      disabled={loading}
                    >
                      Create
                    </Button>
                  </form>
                </Paper>
              </DialogContent>
            </Dialog>
          )}
        </Mutation>
      </>
    );
  }
}

CreateGraph.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CreateGraph);
