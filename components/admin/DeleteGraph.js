import { Component } from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import DeleteIcon from '@material-ui/icons/Delete';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Fab,
} from '@material-ui/core';
import Error from '../Error';
import {
  ACTIVE_GRAPHS_QUERY,
  ALL_GRAPHS_QUERY,
  DELETE_GRAPH_MUTATION,
} from '../../lib/queriesAndMutations';

class DeleteGraph extends Component {
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
          mutation={DELETE_GRAPH_MUTATION}
          refetchQueries={[
            { query: ACTIVE_GRAPHS_QUERY },
            { query: ALL_GRAPHS_QUERY },
          ]}
        >
          {(deleteGraph, { loading }) => (
            <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              aria-labelledby="form-dialog-title"
            >
              <Error error={this.state.queryError} />
              <DialogTitle id="form-dialog-title">Delete Graph</DialogTitle>
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
                    await deleteGraph({
                      variables: {
                        id: this.props.id,
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

DeleteGraph.propTypes = {
  id: PropTypes.string.isRequired,
};

export default DeleteGraph;
