import { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  withStyles,
} from '@material-ui/core';
import { SENSOR_QUERY } from '../../lib/queriesAndMutations';
import { renderDate, parseSensorValue } from '../../lib/utils.js';
import Error from '../Error';

const styles = (theme) => ({
  root: {
    width: '100%',
    textAlign: 'center',
    overflowX: 'auto',
    padding: theme.spacing(1),
    maxHeight: '100%',
  },
});

class LatestSensorValues extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.root}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell align="center">Sensor Name</TableCell>
              <TableCell align="center">Time Stamp</TableCell>
              <TableCell align="center">Value</TableCell>
            </TableRow>
          </TableHead>
          <Query query={SENSOR_QUERY} pollInterval={2000}>
            {({ data, error, loading }) => {
              if (loading) return <></>;
              if (error) return <Error error={error} />;
              if (data) {
                const sensorDataTable = data.sensors.map((sensor) => (
                  <TableRow key={sensor.tpic} hover>
                    <TableCell align="center">{sensor.name}</TableCell>
                    <TableCell align="center">
                      {renderDate(sensor.latestTimeStamp)}
                    </TableCell>
                    <TableCell align="center">
                      {parseSensorValue(sensor.latestValue)}
                    </TableCell>
                  </TableRow>
                ));
                return <TableBody>{sensorDataTable}</TableBody>;
              }
            }}
          </Query>
        </Table>
      </Paper>
    );
  }
}

LatestSensorValues.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LatestSensorValues);
