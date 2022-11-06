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
import BrewingProcessAdminRow from './admin/BrewingProcessAdminRow';
import { renderDate } from '../lib/utils';

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
            {!this.props.adminView && !this.props.bottlesView && (
              <TableCell align="center">Started</TableCell>
            )}
            {this.props.bottlesView && (
              <TableCell align="center">Bottled</TableCell>
            )}
            <TableCell align="center">
              {!this.props.bottlesView && 'Status'}
              {this.props.bottlesView && 'Available Bottles'}
            </TableCell>
            {this.props.adminView && <TableCell align="center" />}
          </TableRow>
        </TableHead>
        <TableBody>
          {!this.props.adminView &&
            this.props.brewingProcesses.map((n) => (
              // don't show ended processes in upper table
              (!n.end || this.props.bottlesView) &&
              <TableRow
                key={n.id}
                hover
                onClick={() => {
                  !this.props.bottlesView && this.handleClick(n.id);
                }}
              >
                <TableCell align="center">{n.name}</TableCell>
                <TableCell align="center">
                  {!this.props.bottlesView && renderDate(n.start)}
                  {this.props.bottlesView && renderDate(n.end)}
                </TableCell>
                <TableCell align="center">
                  {!n.end &&
                    n.brewingSteps[0] &&
                    renderDate(n.brewingSteps[0].start) +
                    ' ' +
                    n.brewingSteps[0].name}
                  {!n.start && 'inactive'}
                  {n.end && !this.props.bottlesView && 'Ended'}
                  {n.end && this.props.bottlesView && (n.bottlesAvailable || 0)}
                </TableCell>
              </TableRow>

            ))}
          {this.props.adminView &&
            !this.props.bottlesView &&
            this.props.brewingProcesses.map((n) => (
              <BrewingProcessAdminRow key={n.id} brewingProcess={n} />
            ))}
        </TableBody>
      </Table>
    );
  }
}

BrewingProcessTable.propTypes = {
  brewingProcesses: PropTypes.array.isRequired,
  adminView: PropTypes.bool.isRequired,
  bottlesView: PropTypes.bool.isRequired,
};

export default BrewingProcessTable;
