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
  imageRow: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(2),
  },
  imageColumn: {
    padding: theme.spacing(2),
    float: 'left',
    width: '33%',
  },
  footer: {
    [theme.breakpoints.up(1100 + theme.spacing(2))]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    marginLeft: 'auto',
    marginRight: 'auto',
    left: 0,
    right: 0,
    textAlign: 'center',
    position: 'fixed',
    bottom: 15,
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
          Das Bier von Eschweiler
        </Typography>
        <div className={classes.imageWrap}>
          <Image src="/logo.png" width={882} height={617} />
        </div>
        <Typography variant="subtitle1" gutterBottom>
          Gebraut an der Inde!
        </Typography>
        <div className={classes.footer}>
          <div className={classes.imageColumn}>
            <a href="https://untappd.com/Indebrau?ref=followbtn">
              <Image src="/logos/untappd.png" width={60} height={60} />
            </a>
          </div>
          <div className={classes.imageColumn}>
            <a href="https://www.instagram.com/indebrau/">
              <Image src="/logos/instagram.png" width={60} height={60} />
            </a>
          </div>
          <div className={classes.imageColumn}>
            <a href="https://github.com/indebrau/">
              <Image src="/logos/github.png" width={60} height={60} />
            </a>
          </div>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
