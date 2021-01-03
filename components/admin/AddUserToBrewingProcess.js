import { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Paper,
  Button,
  Grid,
  Dialog,
  DialogContent,
  Fab,
  FormControl,
  InputLabel,
  Chip,
  Select,
  DialogTitle,
  withStyles,
  MenuItem
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { Query, Mutation } from 'react-apollo';
import Error from '../Error';
import Loading from '../Loading';
import {
  ADD_USERS_TO_BREWING_PROCESS_MUTATION,
  ALL_BREWING_PROCESSES_QUERY,
  ALL_USERS_QUERY,
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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  chip: {
    margin: theme.spacing(1) / 4
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  fab: {
    margin: theme.spacing(1),
  },
});


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

class AddUserToBrewingProcess extends Component {
  state = {
    open: false,
    formatting: 'notyetdone', // check for formatting
    queryStatus: 'notyetdone', // did query pass?
    participatingUserIds: [], // participating user ids (taken from props on open)
    newUsers: [] // users to be added to the process (queried)
  };

  saveToState = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleClickOpen = () => {
    let ids = [];
    {this.props.participatingUsers.map((user) => (
      ids.push(user.id)
    ));}
    this.setState({ participatingUserIds: ids });
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({
      open: false,
      formatting: 'notyetdone',
      queryStatus: 'notyetdone',
      participatingUserIds: [],
      newUsers: []
    });
  };

  handleNewUserIds = (event) => {
    this.setState({ newUsers: event.target.value });
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
          <EditIcon />
        </Fab>
        <Mutation
          mutation={ADD_USERS_TO_BREWING_PROCESS_MUTATION}
          refetchQueries={[{ query: ALL_BREWING_PROCESSES_QUERY }]}
        >
          {(addUsersToBrewingProcess, { loading }) => (
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
                Add Users To Brewing Process
              </DialogTitle>

              <DialogContent>
                <Paper className={classes.paper}>
                  <Grid item xs={12}>
                    <Query query={ALL_USERS_QUERY}>
                      {({ data, error, loading }) => {
                        if (loading) return <Loading />;
                        if (error) return <Error error={error} />;
                        let users = [];
                        if (data) {
                          data.users.map(user => {
                            if(!this.state.participatingUserIds.includes(user.id)){
                              users.push(user);
                            }
                          });
                        }
                        return (
                          <FormControl className={classes.formControl}>
                            <InputLabel htmlFor='select-users'>Users</InputLabel>
                            <Select
                              multiple
                              onChange={this.handleNewUserIds}
                              value={this.state.newUsers}
                              renderValue={(selected) => (
                                <div className={classes.chips}>
                                  {selected.map((value) => (
                                    <Chip
                                      key={value.id}
                                      label={value.email}
                                      className={classes.chip}
                                    />
                                  ))}
                                </div>
                              )}
                              MenuProps={MenuProps}
                            >
                              {users.map((user) => (
                                <MenuItem key={user.id} value={user}>{user.id}: {user.email}</MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        );
                      }
                      }
                    </Query>
                  </Grid>
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
                      let userIds = [];
                      this.state.newUsers.map( user =>{
                        userIds.push(user.id);
                      });
                      let addUsersToBrewingProcessVars = {
                        brewingProcessId: this.props.brewingProcessId,
                        userIds: userIds,
                      };
                      this.setState({
                        formatting: 'ok',
                      });
                      this.setState({ queryStatus: 'ok' });
                      try {
                        await addUsersToBrewingProcess({
                          variables: { ...addUsersToBrewingProcessVars },
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
                    Add
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

AddUserToBrewingProcess.propTypes = {
  classes: PropTypes.object.isRequired,
  participatingUsers: PropTypes.array.isRequired,
  brewingProcessId: PropTypes.string.isRequired,
};

export default withStyles(styles)(AddUserToBrewingProcess);
