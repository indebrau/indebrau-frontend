import { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Paper,
  Button,
  TextField,
  Grid,
  Dialog,
  DialogContent,
  Fab,
  DialogTitle,
  withStyles,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { Mutation } from 'react-apollo';
import Error from '../Error';
import {
  SENSOR_QUERY,
  CREATE_SENSOR_MUTATION,
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
});

class CreateSensor extends Component {
  state = {
    open: false,
    queryError: null,

    // mutation variables
    sensorTopic: '',
    sensorName: '',
  };

  handleClose = () => {
    this.setState({
      open: false,
      queryError: null,

      // mutation variables
      sensorTopic: '',
      sensorName: '',
    });
  };

  saveToState = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
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
          mutation={CREATE_SENSOR_MUTATION}
          refetchQueries={[{ query: SENSOR_QUERY }]}
        >
          {(createGraph, { loading }) => (
            <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              aria-labelledby="form-dialog-title"
              disableBackdropClick
              fullScreen
            >
              <Error error={this.state.queryError} />
              <DialogTitle id="form-dialog-title">Create Graph</DialogTitle>

              <DialogContent>
                <main className={classes.layout}>
                  <Paper className={classes.paper}>
                    <Grid container spacing={8}>
                      <Grid item xs={12}>
                        <TextField
                          required
                          id="sensorName"
                          name="sensorName"
                          label="Sensor Name"
                          value={this.state.sensorName}
                          onChange={this.saveToState}
                          fullWidth
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={8}>
                      <Grid item xs={12}>
                        <TextField
                          required
                          id="sensorTopic"
                          name="sensorTopic"
                          label="Sensor Topic"
                          value={this.state.sensorTopic}
                          onChange={this.saveToState}
                          fullWidth
                        />
                      </Grid>
                    </Grid>
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
                          await createGraph({
                            variables: {
                              topic: this.state.sensorTopic,
                              name: this.state.sensorName,
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

CreateSensor.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CreateSensor);
