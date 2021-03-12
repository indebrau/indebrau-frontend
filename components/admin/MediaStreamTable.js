import { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';
import DeleteMediaStream from './DeleteMediaStream';

class MediaStreamTable extends Component {
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
          {this.props.mediaStreams.map((n) => (
            <TableRow key={n.id} hover>
              <TableCell align="center">{n.id}</TableCell>
              <TableCell align="center">
                Name: {n.mediaFilesName} Step: {n.brewingStep.name} Process:{' '}
                {n.brewingStep.brewingProcess.id} Update: {n.updateFrequency}{' '}
                Sec
              </TableCell>
              <TableCell align="center">
                <DeleteMediaStream id={n.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
}

MediaStreamTable.propTypes = {
  mediaStreams: PropTypes.array.isRequired,
};

export default MediaStreamTable;
