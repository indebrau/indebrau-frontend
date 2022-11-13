import { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Paper,
  Button,
  Grid,
  Dialog,
  DialogContent,
  FormControl,
  TextField,
  InputLabel,
  Chip,
  Select,
  DialogTitle,
  withStyles,
  MenuItem,
  TableRow,
  TableCell,
} from '@material-ui/core';
import { Query, Mutation } from '@apollo/client/react/components';
import Error from '../Error';
import Loading from '../Loading';
import DeleteBrewingProcess from './DeleteBrewingProcess';
import AdvanceBrewingProcess from './AdvanceBrewingProcess';
import {
  ADD_USERS_TO_BREWING_PROCESS_MUTATION,
  CHANGE_BOTTLES_AVAILABLE_MUTATION,
  ALL_BREWING_PROCESSES_QUERY,
  ALL_USERS_QUERY,
} from '../../lib/queriesAndMutations';
import { renderDate } from '../../lib/utils';

const styles = (theme) => ({
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
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing(1) / 4,
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

class BrewingProcessAdminRow extends Component {
  state = {
    open: false,
    queryStatus: 'notyetdone', // did query pass?
    participatingUserIds: [], // participating user ids (taken from props on open)
    newUsers: [], // users to be added to the process (queried)
    bottlesAvailable: 0, // number of available bottles (taken from props on open)
  };

  saveToState = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleClickOpen = () => {
    let ids = [];
    {
      this.props.brewingProcess.participatingUsers.map((user) =>
        ids.push(user.id)
      );
    }
    // leave 0 if not yet set
    if (this.props.brewingProcess.bottlesAvailable) {
      this.setState({
        bottlesAvailable: this.props.brewingProcess.bottlesAvailable,
      });
    }
    this.setState({ participatingUserIds: ids });
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({
      open: false,
      queryStatus: 'notyetdone',
      participatingUserIds: [],
      newUsers: [],
    });
  };

  handleNewUserIds = (event) => {
    this.setState({ newUsers: event.target.value });
  };

  render() {
    const { classes } = this.props;
    return (
      <>
        <TableRow key={this.props.brewingProcess.id} hover>
          <TableCell align="center" onClick={this.handleClickOpen}>
            {this.props.brewingProcess.name}
          </TableCell>
          <TableCell align="center" onClick={this.handleClickOpen}>
            {!this.props.brewingProcess.end &&
              this.props.brewingProcess.brewingSteps[0] &&
              renderDate(this.props.brewingProcess.brewingSteps[0].start) +
              ' ' +
              this.props.brewingProcess.brewingSteps[0].name}
            {!this.props.brewingProcess.start && 'inactive'}
            {this.props.brewingProcess.end && 'Ended'}
          </TableCell>
          <TableCell align="center">
            <AdvanceBrewingProcess
              brewingProcessId={this.props.brewingProcess.id}
            />
            <DeleteBrewingProcess
              brewingProcessId={this.props.brewingProcess.id}
            />
          </TableCell>
        </TableRow>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          fullScreen
        >
          <DialogTitle id="form-dialog-title">Edit Brewing Process</DialogTitle>

          <DialogContent>
            <Paper className={classes.paper}>
              <Grid item xs={12}>
                <Mutation
                  mutation={ADD_USERS_TO_BREWING_PROCESS_MUTATION}
                  refetchQueries={[{ query: ALL_BREWING_PROCESSES_QUERY }]}
                >
                  {(addUsersToBrewingProcess, { loading }) => (
                    <>
                      <Error error={this.state.queryStatus} />
                      <Query query={ALL_USERS_QUERY}>
                        {({ data, error, loading }) => {
                          if (loading) return <Loading />;
                          if (error) return <Error error={error} />;
                          let users = [];
                          if (data) {
                            data.users.map((user) => {
                              if (
                                !this.state.participatingUserIds.includes(
                                  user.id
                                )
                              ) {
                                users.push(user);
                              }
                            });
                          }
                          return (
                            <FormControl className={classes.formControl}>
                              <InputLabel htmlFor="select-users">
                                Add Users
                              </InputLabel>
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
                                  <MenuItem key={user.id} value={user}>
                                    {user.id}: {user.email}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          );
                        }}
                      </Query>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={async () => {
                          // prepare variables
                          let userIds = [];
                          this.state.newUsers.map((user) => {
                            userIds.push(user.id);
                          });
                          let addUsersToBrewingProcessVars = {
                            brewingProcessId: this.props.brewingProcess.id,
                            userIds: userIds,
                          };
                          this.setState({ queryStatus: 'ok' });
                          try {
                            await addUsersToBrewingProcess({
                              variables: { ...addUsersToBrewingProcessVars },
                            }).catch((e) => {
                              this.setState({ queryStatus: e });
                            });
                          } catch (exception) {
                            this.setState({
                              queryStatus: exception,
                            });
                          }
                          if (this.state.queryStatus === 'ok') {
                            this.handleClose();
                          }
                        }}
                        className={classes.button}
                        disabled={loading}
                      >
                        Add
                      </Button>
                    </>
                  )}
                </Mutation>
              </Grid>

              <Grid item xs={12}>
                <Mutation
                  mutation={CHANGE_BOTTLES_AVAILABLE_MUTATION}
                  refetchQueries={[{ query: ALL_BREWING_PROCESSES_QUERY }]}
                >
                  {(changeBottlesAvailable, { loading }) => (
                    <>
                      <Error error={this.state.queryStatus} />
                      <FormControl className={classes.formControl}>
                        <TextField
                          disabled={!this.props.brewingProcess.end}
                          id="bottlesAvailable"
                          name="bottlesAvailable"
                          type="number"
                          label="Bottles Available"
                          value={this.state.bottlesAvailable}
                          onChange={this.saveToState}
                        />
                      </FormControl>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={async () => {
                          // prepare variables
                          let changeBottlesAvailableVars = {
                            brewingProcessId: this.props.brewingProcess.id,
                            bottlesAvailable: parseInt(
                              this.state.bottlesAvailable
                            ),
                          };
                          this.setState({ queryStatus: 'ok' });
                          try {
                            await changeBottlesAvailable({
                              variables: { ...changeBottlesAvailableVars },
                            }).catch((e) => {
                              this.setState({ queryStatus: e });
                            });
                          } catch (exception) {
                            this.setState({
                              queryStatus: exception,
                            });
                          }
                          if (this.state.queryStatus === 'ok') {
                            this.handleClose();
                          }
                        }}
                        className={classes.button}
                        disabled={loading || !this.props.brewingProcess.end}
                      >
                        Change
                      </Button>
                    </>
                  )}
                </Mutation>
              </Grid>
              <Button
                onClick={this.handleClose}
                className={classes.button}
                color="secondary"
                variant="contained"
              >
                Cancel
              </Button>
            </Paper>
          </DialogContent>
        </Dialog>
      </>
    );
  }
}

BrewingProcessAdminRow.propTypes = {
  classes: PropTypes.object.isRequired,
  brewingProcess: PropTypes.object.isRequired,
};

export default withStyles(styles)(BrewingProcessAdminRow);
