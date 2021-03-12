import { Component } from 'react';
import PropTypes from 'prop-types';
import { Paper, withStyles, Typography } from '@material-ui/core';
import { Query } from 'react-apollo';
import { LATEST_MEDIA_STREAM_FILE_QUERY } from '../lib/queriesAndMutations';
import Loading from './Loading';
import Error from './Error';
import { renderDate } from '../lib/utils.js';

const styles = (theme) => ({
  root: {
    width: '100%',
    overflowX: 'auto',
    padding: theme.spacing(1),
    maxHeight: '100%',
    textAlign: 'center',
  },
  image: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: theme.spacing(1),
    maxWidth: '65%',
    maxHeight: '50em',
  },
});

class LatestMediaFile extends Component {
  render() {
    const { classes } = this.props;
    // fetch poilicy here is network-only to prevent (cached) broken media link usage
    return (
      <Paper className={classes.root}>
        <Query
          query={LATEST_MEDIA_STREAM_FILE_QUERY}
          variables={{ id: this.props.id }}
          pollInterval={this.props.updateFrequency * 1000}
          fetchPolicy="network-only"
        >
          {({ data, error, loading }) => {
            if (loading) return <Loading />;
            if (error) return <Error error={error} />;
            if (data) {
              if (data.mediaStream.mediaFiles[0]) {
                let mediaFile = data.mediaStream.mediaFiles[0];
                return (
                  <>
                    <img
                      // eslint-disable-next-line no-undef
                      src={`${process.env.BACKEND_ENDPOINT}/media/${this.props.brewingStepId}/${this.props.id}/${mediaFile.publicIdentifier}`}
                      className={classes.image}
                    />
                    <Typography variant="body2">
                      {data.mediaStream.id}
                    </Typography>
                    <Typography variant="body2">
                      Last Update:
                      {' ' + renderDate(mediaFile.time, true)}
                    </Typography>
                  </>
                );
              } else {
                return (
                  <Typography variant="body2">
                    {data.mediaStream.id}: No Image
                  </Typography>
                );
              }
            }
          }}
        </Query>
      </Paper>
    );
  }
}

LatestMediaFile.propTypes = {
  id: PropTypes.string.isRequired,
  updateFrequency: PropTypes.number.isRequired,
  brewingStepId: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LatestMediaFile);
