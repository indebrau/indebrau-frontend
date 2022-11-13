import { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Paper,
  Button,
  FormControl,
  FormControlLabel,
  Checkbox,
  InputLabel,
  Input,
  Dialog,
  DialogContent,
  Fab,
  DialogTitle,
  withStyles,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { Mutation } from '@apollo/client/react/components';
import Error from '../Error';
import {
  SENSOR_QUERY,
  CREATE_SENSOR_MUTATION,
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

class CreateSensor extends Component {
  state = {
    open: false,
    queryError: null,

    // mutation variables
    sensorTopic: '',
    sensorName: '',
    binary: false,
  };

  handleClose = () => {
    this.setState({
      open: false,
      queryError: null,

      // mutation variables
      sensorTopic: '',
      sensorName: '',
      binary: false,
    });
  };

  saveToState = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  saveCheckToState = (name) => (event) => {
    this.setState({ [name]: event.target.checked });
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
          {(createSensor, { loading }) => (
            <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              aria-labelledby="form-dialog-title"
              fullScreen
            >
              <Error error={this.state.queryError} />
              <DialogTitle id="form-dialog-title">Create Sensor</DialogTitle>

              <DialogContent>
                <Paper className={classes.paper}>
                  <form
                    className={classes.form}
                    method="post"
                    onSubmit={async (e) => {
                      e.preventDefault();
                      // fire mutation (clear old error)
                      this.setState({ queryError: null });
                      await createSensor({
                        variables: {
                          topic: this.state.sensorTopic,
                          name: this.state.sensorName,
                          binary: this.state.binary,
                        },
                      }).catch((e) => {
                        this.setState({ queryError: e });
                      });
                      if (this.state.queryError == null) {
                        this.handleClose();
                      }
                    }}
                  >
                    <FormControl margin="normal" required fullWidth>
                      <InputLabel htmlFor="sensorName">Sensor Name</InputLabel>
                      <Input
                        id="sensorName"
                        name="sensorName"
                        value={this.state.sensorName}
                        onChange={this.saveToState}
                        autoFocus
                      />
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                      <InputLabel htmlFor="sensorTopic">
                        Sensor Topic
                      </InputLabel>
                      <Input
                        id="sensorTopic"
                        name="sensorTopic"
                        value={this.state.sensorTopic}
                        onChange={this.saveToState}
                        autoFocus
                      />
                    </FormControl>
                    <FormControlLabel
                      control={
                        <Checkbox
                          color="secondary"
                          id="binary"
                          name="binary"
                          value="binary"
                          checked={this.state.binary}
                          onChange={this.saveCheckToState('binary')}
                        />
                      }
                      label="Binary"
                    />
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

CreateSensor.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CreateSensor);
