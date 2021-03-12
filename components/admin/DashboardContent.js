import { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import AllGraphs from './AllGraphs';
import AllBrewingProcesses from './AllBrewingProcesses';
import AllMediaStreams from './AllMediaStreams';
import LatestSensorData from './LatestSensorData';

const styles = (theme) => ({
  root: {
    textAlign: 'center',
    padding: theme.spacing(2),
    maxHeight: '100%',
  },
});

class DashboardContent extends Component {
  returnActiveWindow = () => {
    if (this.props.activeWindow == 'AllGraphs') {
      return <AllGraphs />;
    }
    if (this.props.activeWindow == 'AllBrewingProcesses') {
      return <AllBrewingProcesses />;
    }
    if (this.props.activeWindow == 'AllMediaStreams') {
      return <AllMediaStreams />;
    }
    if (this.props.activeWindow == 'AdminHome') {
      return <LatestSensorData />;
    }
  };

  render() {
    return this.returnActiveWindow();
  }
}

DashboardContent.propTypes = {
  classes: PropTypes.object.isRequired,
  activeWindow: PropTypes.string.isRequired,
};

export default withStyles(styles)(DashboardContent);
