import { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Paper,
  Button,
  TextField,
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
  withStyles
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { Query, Mutation } from 'react-apollo';

import STEPS from '../../lib/brewingSteps';
import Error from '../Error';
import {
  ACTIVE_GRAPHS_QUERY,
  ALL_GRAPHS_QUERY,
  ALL_BREWING_PROCESSES_QUERY,
  CREATE_GRAPH_MUTATION
} from '../../lib/queriesAndMutations';

const styles = (theme) => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2)
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3)
    }
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1)
  },
  fab: {
    margin: theme.spacing(1)
  }
});

class CreateGraph extends Component {
  state = {
    open: false,
    brewingProcessOpen: false,
    brewingStepOpen: false,
    queryError: null,

    // mutation variables
    sensorName: '',
    updateFrequency: '',
    brewingProcessId: '',
    brewingStepName: STEPS[0]
  };

  handleClose = () => {
    this.setState({
      open: false,
      brewingProcessOpen: false,
      queryError: null,

      // mutation variables
      sensorName: '',
      updateFrequency: '',
      brewingProcessId: '',
      brewingStepName: STEPS[0]
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

  handleNewBrewingStepName = (event) => {
    this.setState({ brewingStepName: event.target.value });
  };

  render() {
    const { classes } = this.props;
    return (
      <>
        <Fab
          color='primary'
          aria-label='Add'
          className={classes.fab}
          onClick={this.handleClickOpen}
        >
          <AddIcon />
        </Fab>
        <Mutation
          mutation={CREATE_GRAPH_MUTATION}
          refetchQueries={[
            { query: ACTIVE_GRAPHS_QUERY },
            { query: ALL_GRAPHS_QUERY }
          ]}
        >
          {(createGraph, { loading }) => (
            <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              aria-labelledby='form-dialog-title'
              disableBackdropClick
              fullScreen
            >
              <Error error={this.state.queryError} />
              <DialogTitle id='form-dialog-title'>Create Graph</DialogTitle>

              <DialogContent>
                <main className={classes.layout}>
                  <Paper className={classes.paper}>
                    <Grid container spacing={8}>
                      <Grid item xs={12}>
                        <TextField
                          required
                          id='sensorName'
                          name='sensorName'
                          label='Sensor Name'
                          value={this.state.sensorName}
                          onChange={this.saveToState}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          id='updateFrequency'
                          name='updateFrequency'
                          label='Update Frequency'
                          value={this.state.updateFrequency}
                          onChange={this.saveToState}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Query query={ALL_BREWING_PROCESSES_QUERY}>
                          {({ data }) => {
                            let brewingProcesses = [''];
                            if (data) {
                              brewingProcesses = data.brewingProcesses;
                            }
                            return (
                              <FormControl className={classes.formControl}>
                                <InputLabel htmlFor='select-brewingProcess'>
                                  Brewing Process
                                </InputLabel>
                                <Select
                                  onChange={this.handleNewBrewingProcessId}
                                  value={this.state.brewingProcessId}
                                  input={<Input id='select-brewingProcess' />}
                                  displayEmpty={true}
                                >
                                  {brewingProcesses.map((process) => (
                                    <MenuItem key={process.id} value={process.id}>{process.id}: {process.name}</MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            );
                          }
                          }
                        </Query>
                      </Grid>
                    </Grid>
                    <FormControl className={classes.formControl}>
                      <InputLabel htmlFor='select-brewingStepName'>
                        Brewing Step
                      </InputLabel>
                      <Select
                        onChange={this.handleNewBrewingStepName}
                        value={this.state.brewingStepName}
                        input={<Input id='select-brewingStepName' />}
                      >
                        {STEPS.map((step) => (
                          <MenuItem key={step} value={step}>{step}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <div className={classes.buttons}>
                      <Button
                        onClick={this.handleClose}
                        className={classes.button}
                        color='secondary'
                        variant='contained'
                      >
                        Cancel
                      </Button>
                      <Button
                        variant='contained'
                        color='primary'
                        onClick={async () => {
                          // fire mutation (clear old error)
                          this.setState({ queryError: null });
                          await createGraph({
                            variables: {
                              sensorName: this.state.sensorName,
                              updateFrequency: parseInt(
                                this.state.updateFrequency
                              ),
                              brewingProcessId: this.state.brewingProcessId,
                              brewingStepName: this.state.brewingStepName
                            }
                          }).catch((e) => {
                            this.setState({ queryError: e });
                          });
                          if (this.state.queryError == null) {
                            this.handleClose();
                          }
                        }}
                        className={classes.button}
                        disabled={loading}
                      >
                        Create
                      </Button>
                    </div>
                  </Paper>
                </main>
              </DialogContent>
            </Dialog>
          )}
        </Mutation>
      </>
    );
  }
}

CreateGraph.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CreateGraph);
