import { Component } from 'react';
import PropTypes from 'prop-types';
import { Typography, withStyles } from '@material-ui/core';
import Image from 'next/image';

const styles = (theme) => ({
  root: {
    textAlign: 'center',
    padding: theme.spacing(2),
    maxHeight: '100%',
  },
  imageWrap: {
    display: 'flex',
    justifyContent: 'center',
  },
});

class Info extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography variant="h4" gutterBottom>
          About Indebrau
        </Typography>
        <div className={classes.imageWrap}>
          <Image src="/hopfiMalzi.png" width={699} height={504} />
        </div>
        <br />
        <br />
        <Typography variant="subtitle1" gutterBottom>
          info[at]indebrau.de
        </Typography>
      </div>
    );
  }
}

Info.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Info);
