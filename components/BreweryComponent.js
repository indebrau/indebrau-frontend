import { Component } from 'react';
import PropTypes from 'prop-types';
import {
  CardMedia,
  CardContent,
  CardActionArea,
  Card,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  Paper,
  withStyles,
} from '@material-ui/core';
import * as properties from '../lib/ComponentProperties';

const styles = (theme) => ({
  root: {
    textAlign: 'center',
    padding: theme.spacing(2),
    flexGrow: 1,
  },
  card: {
    width: 100,
  },
  media: {
    height: 100,
  },
});

class BreweryComponent extends Component {
  state = {
    infoOpen: false,
  };

  getProperties = (type) => {
    switch (type) {
      case 'GrainMill':
        return properties.GrainMillProps;
      case 'MashTun':
        return properties.MashTunProps;
      case 'SpargingVessel':
        return properties.SpargingVesselProps;
      case 'Pump':
        return properties.PumpProps;
      case 'WortCopper':
        return properties.WortCopperProps;
      case 'Hydrometer':
        return properties.HydrometerProps;
      case 'Fermenter':
        return properties.FermenterProps;
      case 'WortChiller':
        return properties.WortChillerProps;
      case 'Keg':
        return properties.KegProps;
      case 'Bottle':
        return properties.BottleProps;
    }
  };

  handleDialogs = () => {
    return (
      <Dialog
        open={this.state.infoOpen}
        onClose={this.handleInfoClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          {this.getProperties(this.props.type).title}
        </DialogTitle>
        <DialogContent>
          <Paper>
            <Typography variant="body1" gutterBottom>
              {this.getProperties(this.props.type).description}
            </Typography>
          </Paper>
        </DialogContent>
      </Dialog>
    );
  };

  handleInfoClose = () => {
    this.setState({ infoOpen: false });
  };

  handleCardActionClick = () => {
    this.setState({ infoOpen: true });
  };

  render() {
    const { classes, type } = this.props;
    return (
      <>
        {this.handleDialogs()}
        <Card className={classes.card}>
          <CardActionArea onClick={this.handleCardActionClick}>
            <CardMedia
              className={classes.media}
              image={this.getProperties(type).imageUrl}
              title={this.getProperties(type).title}
            />
            <CardContent>
              <Typography gutterBottom variant="body2">
                {this.getProperties(type).title}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </>
    );
  }
}

BreweryComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  type: PropTypes.oneOf([
    'GrainMill',
    'MashTun',
    'SpargingVessel',
    'Pump',
    'WortCopper',
    'Hydrometer',
    'Fermenter',
    'WortChiller',
    'Keg',
    'Bottle',
  ]).isRequired,
};

export default withStyles(styles)(BreweryComponent);
