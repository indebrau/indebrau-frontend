import { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Paper, Typography } from '@material-ui/core';
import { Query } from 'react-apollo';
import {
  ALL_MEDIA_STREAMS_QUERY,
  ACTIVE_MEDIA_STREAMS_QUERY,
} from '../../lib/queriesAndMutations';
import MediaStreamTable from './MediaStreamTable';
import LatestMediaFile from '../LatestMediaFile';
import CreateMediaStream from './CreateMediaStream';
import Loading from '../Loading';
import Error from '../Error';

const styles = (theme) => ({
  root: {
    width: '100%',
    overflowX: 'auto',
    padding: theme.spacing(1),
    maxHeight: '100%',
    textAlign: 'center',
  },
});

class AllMediaStreams extends Component {
  render() {
    const { classes } = this.props;

    return (
      <>
        <Query query={ALL_MEDIA_STREAMS_QUERY}>
          {({ data, error, loading }) => {
            if (loading) return <Loading />;
            if (error) return <Error error={error} />;
            if (data) {
              return (
                <Paper className={classes.root}>
                  <Typography variant="subtitle1">All Media Streams</Typography>
                  <MediaStreamTable mediaStreams={data.mediaStreams} />
                </Paper>
              );
            }
          }}
        </Query>
        <Query query={ACTIVE_MEDIA_STREAMS_QUERY}>
          {({ data, error, loading }) => {
            if (loading) return <Loading />;
            if (error) return <Error error={error} />;
            if (data) {
              const mediaFiles = data.mediaStreams.map((mediaStream) => (
                <LatestMediaFile
                  key={mediaStream.id}
                  id={mediaStream.id}
                  brewingStepId={mediaStream.brewingStep.id}
                  updateFrequency={mediaStream.updateFrequency}
                />
              ));
              return (
                <Paper className={classes.root}>
                  <Typography variant="subtitle1">Current Images</Typography>
                  {mediaFiles}
                  <CreateMediaStream className={classes.root} />
                </Paper>
              );
            }
          }}
        </Query>
      </>
    );
  }
}

AllMediaStreams.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AllMediaStreams);
