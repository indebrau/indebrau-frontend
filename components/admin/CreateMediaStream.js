import { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Paper,
  Button,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  Input,
  MenuItem,
  Dialog,
  DialogContent,
  Fab,
  FormControlLabel,
  Checkbox,
  DialogTitle,
  withStyles,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { Query, Mutation } from 'react-apollo';
import STEPS from '../../lib/brewingSteps';
import Error from '../Error';
import Loading from '../Loading';
import {
  ALL_BREWING_PROCESSES_QUERY,
  ALL_MEDIA_STREAMS_QUERY,
  ACTIVE_MEDIA_STREAMS_QUERY,
  CREATE_MEDIA_STREAM_MUTATION,
} from '../../lib/queriesAndMutations';

const styles = (theme) => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  fab: {
    margin: theme.spacing(1),
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
  },
  chip: {
    margin: theme.spacing(1) / 4,
  },
});

class CreateMediaStream extends Component {
  state = {
    open: false,
    queryError: null,

    // mutation variables
    mediaFilesName: '',
    overwrite: false,
    updateFrequency: '',
    brewingProcessId: '',
    brewingStepName: STEPS[0],
  };

  handleClose = () => {
    this.setState({
      open: false,
      queryError: null,

      // mutation variables
      mediaFilesName: '',
      overwrite: false,
      updateFrequency: '',
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

  saveCheckToState = (name) => (event) => {
    this.setState({ [name]: event.target.checked });
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
          color="primary"
          aria-label="Add"
          className={classes.fab}
          onClick={this.handleClickOpen}
        >
          <AddIcon />
        </Fab>
        <Mutation
          mutation={CREATE_MEDIA_STREAM_MUTATION}
          refetchQueries={[
            { query: ALL_MEDIA_STREAMS_QUERY },
            { query: ACTIVE_MEDIA_STREAMS_QUERY },
          ]}
        >
          {(createMediaStream, { loading }) => (
            <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              aria-labelledby="form-dialog-title"
              disableBackdropClick
              fullScreen
            >
              <Error error={this.state.queryError} />
              <DialogTitle id="form-dialog-title">
                Create Media Stream
              </DialogTitle>

              <DialogContent>
                <main className={classes.layout}>
                  <Paper className={classes.paper}>
                    <Grid container spacing={8}>
                      <Grid item xs={12}>
                        <TextField
                          required
                          id="mediaFilesName"
                          name="mediaFilesName"
                          label="Media Files Name"
                          value={this.state.mediaFilesName}
                          onChange={this.saveToState}
                          fullWidth
                          autoFocus
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          id="updateFrequency"
                          name="updateFrequency"
                          label="Update Frequency"
                          value={this.state.updateFrequency}
                          onChange={this.saveToState}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              color="secondary"
                              id="overwrite"
                              name="overwrite"
                              value="overwrite"
                              checked={this.state.overwrite}
                              onChange={this.saveCheckToState('overwrite')}
                            />
                          }
                          label="Overwrite"
                        />
                      </Grid>
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
                              <FormControl className={classes.formControl}>
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
                    </Grid>
                    <FormControl className={classes.formControl}>
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
                    <div className={classes.buttons}>
                      <Button
                        onClick={this.handleClose}
                        className={classes.button}
                        color="secondary"
                        variant="contained"
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={async () => {
                          // fire mutation (clear old error)
                          this.setState({ queryError: null });
                          await createMediaStream({
                            variables: {
                              mediaFilesName: this.state.mediaFilesName,
                              overwrite: this.state.overwrite,
                              updateFrequency: parseInt(
                                this.state.updateFrequency
                              ),
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

CreateMediaStream.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CreateMediaStream);
