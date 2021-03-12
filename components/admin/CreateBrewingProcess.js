import { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Paper,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
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
  CREATE_BREWING_PROCESS_MUTATION,
  ALL_BREWING_PROCESSES_QUERY,
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

class CreateBrewingProcess extends Component {
  state = {
    open: false,
    formatting: 'notyetdone', // check for formatting
    queryStatus: 'notyetdone', // did query pass?
    name: '',
    description: '',
    startNow: false,
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

  handleClose = () => {
    this.setState({
      open: false,
      formatting: 'notyetdone',
      queryStatus: 'notyetdone',

      name: '',
      description: '',
      startNow: false,
    });
  };

  getGridContent() {
    return (
      <>
        <Grid container spacing={8}>
          <Grid item xs={12}>
            <TextField
              required
              id="name"
              name="name"
              label="Name"
              value={this.state.name}
              onChange={this.saveToState}
              fullWidth
              autoFocus
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="description"
              name="description"
              label="Description"
              value={this.state.description}
              onChange={this.saveToState}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  color="secondary"
                  id="startNow"
                  name="startNow"
                  value="startNow"
                  checked={this.state.startNow}
                  onChange={this.saveCheckToState('startNow')}
                />
              }
              label="Start Now"
            />
          </Grid>
        </Grid>
      </>
    );
  }

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
          mutation={CREATE_BREWING_PROCESS_MUTATION}
          refetchQueries={[{ query: ALL_BREWING_PROCESSES_QUERY }]}
        >
          {(createBrewingProcess, { loading }) => (
            <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              aria-labelledby="form-dialog-title"
              disableBackdropClick
              fullScreen
            >
              <Error error={this.state.queryStatus} />
              <Error error={this.state.formatting} />

              <DialogTitle id="form-dialog-title">
                Create Brewing Process
              </DialogTitle>

              <DialogContent>
                <Paper className={classes.paper}>
                  {this.getGridContent()}
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
                      // prepare variables
                      try {
                        let createBrewingProcessVars = {
                          name: this.state.name,
                          description: this.state.description,
                          startNow: this.state.startNow,
                        };
                        this.setState({
                          formatting: 'ok',
                        });
                        this.setState({ queryStatus: 'ok' });
                        await createBrewingProcess({
                          variables: { ...createBrewingProcessVars },
                        }).catch((e) => {
                          this.setState({ queryStatus: e });
                        });
                      } catch (exception) {
                        this.setState({
                          formatting: exception,
                        });
                      }
                      if (
                        this.state.formatting === 'ok' &&
                        this.state.queryStatus === 'ok'
                      ) {
                        this.handleClose();
                      }
                    }}
                    className={classes.button}
                    disabled={loading}
                  >
                    Create
                  </Button>
                </Paper>
              </DialogContent>
            </Dialog>
          )}
        </Mutation>
      </>
    );
  }
}

CreateBrewingProcess.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CreateBrewingProcess);
