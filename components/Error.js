import { Component } from 'react';
import PropTypes from 'prop-types';
import { Snackbar, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

class Error extends Component {
  state = {
    open: true,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  componentDidUpdate(prevProps) {
    if (this.props.error !== prevProps.error) {
      this.handleOpen();
    }
  }

  render() {
    const { error } = this.props;
    // no error
    if (!error || !error.message) return null;
    let errorMessage = error.message;

    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={this.state.open}
        autoHideDuration={6000}
        onClose={this.handleClose}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={
          <span id="message-id">
            {errorMessage.replace('GraphQL error: ', '')}
          </span>
        }
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={this.handleClose}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
    );
  }
}

Error.defaultProps = {
  error: {},
};

Error.propTypes = {
  error: PropTypes.oneOfType([
    PropTypes.string, // default error message
    PropTypes.object, // graphql error
  ]),
};

export default Error;
