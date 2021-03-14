import { Component } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';
import DeleteBrewingProcess from './admin/DeleteBrewingProcess';
import AdvanceBrewingProcess from './admin/AdvanceBrewingProcess';
import AddUserToBrewingProcess from './admin/AddUserToBrewingProcess';

class BrewingProcessTable extends Component {
  handleClick = (id) => {
    Router.push(
      {
        pathname: '/brewingProcess',
        query: { brewingProcessId: id },
      },
      '/brewingProcess'
    );
  };

  render() {
    return (
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Step</TableCell>
            {!this.props.adminView && (
              <TableCell align="center">Description</TableCell>
            )}
            {this.props.adminView && <TableCell align="center" />}
          </TableRow>
        </TableHead>
        <TableBody>
          {this.props.brewingProcesses.map((n) => (
            <TableRow key={n.id} hover>
              <TableCell align="center" onClick={() => this.handleClick(n.id)}>
                {this.props.adminView && n.id + ':'} {n.name}
              </TableCell>
              <TableCell align="center" onClick={() => this.handleClick(n.id)}>
                {n.brewingSteps[0] && n.brewingSteps[0].name}
                {!n.start && 'inactive'}
                {n.end && 'ended'}
              </TableCell>
              {!this.props.adminView && (
                <TableCell
                  align="center"
                  onClick={() => this.handleClick(n.id)}
                >
                  {n.description}
                </TableCell>
              )}
              {this.props.adminView && (
                <TableCell align="center">
                  <AdvanceBrewingProcess brewingProcessId={n.id} />
                  <AddUserToBrewingProcess
                    brewingProcessId={n.id}
                    participatingUsers={n.participatingUsers}
                  />
                  <DeleteBrewingProcess brewingProcessId={n.id} />
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
}

BrewingProcessTable.propTypes = {
  brewingProcesses: PropTypes.array.isRequired,
  adminView: PropTypes.bool.isRequired,
};

export default BrewingProcessTable;
