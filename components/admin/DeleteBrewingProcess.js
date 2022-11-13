import { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Fab,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { Mutation } from '@apollo/client/react/components';
import Error from '../Error';
import {
  ALL_BREWING_PROCESSES_QUERY,
  DELETE_BREWING_PROCESS_MUTATION,
  ACTIVE_GRAPHS_QUERY,
  ALL_GRAPHS_QUERY,
  ALL_MEDIA_STREAMS_QUERY,
} from '../../lib/queriesAndMutations';

class DeleteBrewingProcess extends Component {
  state = {
    open: false,
    queryError: null,
  };

  saveToState = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleClickOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({
      open: false,
      queryError: null,
    });
  };

  render() {
    return (
      <>
        <Fab aria-label="Delete" onClick={this.handleClickOpen}>
          <DeleteIcon />
        </Fab>
        <Mutation
          mutation={DELETE_BREWING_PROCESS_MUTATION}
          refetchQueries={[
            { query: ALL_BREWING_PROCESSES_QUERY },
            { query: ACTIVE_GRAPHS_QUERY },
            { query: ALL_GRAPHS_QUERY },
            { query: ALL_MEDIA_STREAMS_QUERY },
          ]}
        >
          {(deleteBrewingProcess, { loading }) => (
            <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              aria-labelledby="form-dialog-title"
            >
              <Error error={this.state.queryError} />
              <DialogTitle id="form-dialog-title">
                Delete Brewing Process
              </DialogTitle>
              <DialogContent>
                <Button
                  onClick={this.handleClose}
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
                    await deleteBrewingProcess({
                      variables: {
                        id: this.props.brewingProcessId,
                      },
                    }).catch((e) => {
                      this.setState({ queryError: e });
                    });
                    if (this.state.queryError == null) {
                      this.handleClose();
                    }
                  }}
                  disabled={loading}
                >
                  Delete
                </Button>
              </DialogContent>
            </Dialog>
          )}
        </Mutation>
      </>
    );
  }
}

DeleteBrewingProcess.propTypes = {
  brewingProcessId: PropTypes.string.isRequired,
};

export default DeleteBrewingProcess;
