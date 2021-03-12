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
  ALL_MEDIA_STREAMS_QUERY,
  ACTIVE_MEDIA_STREAMS_QUERY,
  DELETE_MEDIA_STREAM_MUTATION,
} from '../../lib/queriesAndMutations';

class DeleteMediaStream extends Component {
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
          mutation={DELETE_MEDIA_STREAM_MUTATION}
          refetchQueries={[
            { query: ALL_MEDIA_STREAMS_QUERY },
            { query: ACTIVE_MEDIA_STREAMS_QUERY },
          ]}
        >
          {(deleteMediaStream, { loading }) => (
            <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              aria-labelledby="form-dialog-title"
            >
              <Error error={this.state.queryError} />
              <DialogTitle id="form-dialog-title">
                Delete Media Stream
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
                    await deleteMediaStream({
                      variables: {
                        mediaStreamId: this.props.id,
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

DeleteMediaStream.propTypes = {
  id: PropTypes.string.isRequired,
};

export default DeleteMediaStream;
