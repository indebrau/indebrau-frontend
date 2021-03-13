import { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';
import DeleteGraph from './DeleteGraph';

class GraphTable extends Component {
  render() {
    return (
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell align="center">ID</TableCell>
            <TableCell align="center">Details</TableCell>
            <TableCell align="center" />
          </TableRow>
        </TableHead>
        <TableBody>
          {this.props.graphs.map((n) => (
            <TableRow key={n.id} hover>
              <TableCell align="center">{n.id}</TableCell>
              <TableCell align="center">
                Sensor: {n.sensor.name} Step: {n.brewingStep.name} Process:{' '}
                {n.brewingStep.brewingProcess.id} Update: {n.updateFrequency}{' '}
                Sec
              </TableCell>
              <TableCell align="center">
                <DeleteGraph id={n.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
}

GraphTable.propTypes = {
  graphs: PropTypes.array.isRequired,
};

export default GraphTable;
