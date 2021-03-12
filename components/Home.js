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

class Home extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography variant="h4" gutterBottom>
          Indebrau
        </Typography>
        <Typography variant="h5" gutterBottom>
          Beer from Eschweiler
        </Typography>
        <div className={classes.imageWrap}>
          <Image src="/logo.png" width={882} height={617} />
        </div>
        <Typography variant="subtitle1" gutterBottom>
          A beer as smooth as its river!
        </Typography>
        <br />
        <a href="https://untappd.com/Indebrau?ref=followbtn">
          <div className={classes.imageWrap}>
            <Image src="/untappd/banner.png" width={380} height={100} />
          </div>
        </a>
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
