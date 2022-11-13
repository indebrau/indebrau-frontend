import { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from '@apollo/client/react/components';
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
import { renderDate, parseSensorValue } from '../../lib/utils';
import Error from '../Error';
import CreateSensor from './CreateSensor';

const styles = (theme) => ({
  root: {
    width: '100%',
    textAlign: 'center',
    overflowX: 'auto',
    padding: theme.spacing(1),
    maxHeight: '100%',
  },
});

class LatestSensorData extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.root}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell align="center">Sensor</TableCell>
              <TableCell align="center">Time</TableCell>
              <TableCell align="center">Value</TableCell>
            </TableRow>
          </TableHead>
          <Query query={SENSOR_QUERY} pollInterval={2000}>
            {({ data, error, loading }) => {
              if (loading) return <></>;
              if (error) return <Error error={error} />;
              if (data) {
                const sensorDataTable = data.sensors.map((sensor) => {
                  let parsedValue = parseSensorValue(
                    sensor.latestValue,
                    sensor.binary
                  );
                  return (
                    <TableRow key={sensor.topic} hover>
                      <TableCell align="center">{sensor.name}</TableCell>
                      <TableCell align="center">
                        {renderDate(sensor.latestTimeStamp)}
                      </TableCell>
                      <TableCell align="center">{parsedValue}</TableCell>
                    </TableRow>
                  );
                });
                return <TableBody>{sensorDataTable}</TableBody>;
              }
            }}
          </Query>
        </Table>
        <CreateSensor className={classes.root} />
      </Paper>
    );
  }
}

LatestSensorData.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LatestSensorData);
