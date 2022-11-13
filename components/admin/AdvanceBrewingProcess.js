import { Component } from 'react';
import PropTypes from 'prop-types';
import { Mutation } from '@apollo/client/react/components';
import PlayIcon from '@material-ui/icons/PlayArrowOutlined';
import { Fab } from '@material-ui/core';
import Error from '../Error';
import {
  ALL_BREWING_PROCESSES_QUERY,
  ADVANCE_BREWING_PROCESS_MUTATION,
  ACTIVE_GRAPHS_QUERY,
  ALL_GRAPHS_QUERY,
  ALL_MEDIA_STREAMS_QUERY,
} from '../../lib/queriesAndMutations';

class AdvanceBrewingProcess extends Component {
  state = {
    queryError: null,
  };

  handleClick = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = () => {
    this.setState({
      queryError: null,
    });
  };

  render() {
    return (
      <Mutation
        mutation={ADVANCE_BREWING_PROCESS_MUTATION}
        refetchQueries={[
          { query: ALL_BREWING_PROCESSES_QUERY },
          { query: ACTIVE_GRAPHS_QUERY },
          { query: ALL_GRAPHS_QUERY },
          { query: ALL_MEDIA_STREAMS_QUERY },
        ]}
      >
        {(advanceBrewingProcess, { loading }) => (
          <>
            <Fab
              color="primary"
              aria-label="Add"
              onClick={async () => {
                // fire mutation (clear old error)
                this.setState({ queryError: null });
                await advanceBrewingProcess({
                  variables: {
                    brewingProcessId: this.props.brewingProcessId,
                  },
                }).catch((e) => {
                  this.setState({ queryError: e });
                });
              }}
              disabled={loading}
            >
              <PlayIcon disabled={loading} />
            </Fab>
            <Error error={this.state.queryError} />
          </>
        )}
      </Mutation>
    );
  }
}

AdvanceBrewingProcess.propTypes = {
  brewingProcessId: PropTypes.string.isRequired,
};

export default AdvanceBrewingProcess;
