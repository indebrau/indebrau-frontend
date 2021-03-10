import Typography from '@material-ui/core/Typography';
import {
  CardMedia,
  CardContent,
  CardActionArea,
  Card,
  Grid,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  card: {
    width: 330
  },
  media: {
    height: 300
  },
  untappd: {
    width: 50,
    margin: theme.spacing(1)
  },
  root: {
    textAlign: 'center',
    padding: theme.spacing(2)
  }
}));

export default function Beers() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={1} justify='center'>
        <Grid item>
          <Card className={classes.card}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image='../witbier.jpg'
                title='EWB- Eschweiler Witbier'
              />
              <CardContent>
                <Typography gutterBottom variant='body1' component='h2'>
                  Eschweiler Witbier{' '}
                  <a href='https://untappd.com/b/indebrau-witbier/3750739'>
                    <img
                      src='../untappd/logo.png'
                      className={classes.untappd}
                      align='right'
                    />
                  </a>
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item>
          <Card className={classes.card}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image='../epa.jpg'
                title='EPA - Eschweiler Pale Ale'
              />
              <CardContent>
                <Typography gutterBottom variant='body1' component='h2'>
                  Eschweiler Pale Ale{' '}
                  <a href='https://untappd.com/b/indebrau-epa-eschweiler-pale-ale/3555273'>
                    <img
                      src='../untappd/logo.png'
                      className={classes.untappd}
                      align='right'
                    />
                  </a>
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item>
          <Card className={classes.card}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image='../schwarzbier.png'
                title='ESB - Eschweiler Schwarzbier'
              />
              <CardContent>
                <Typography gutterBottom variant='body1' component='h2'>
                  Eschweiler Schwarzbier{' '}
                  <a href=''>
                    <img
                      src='../untappd/logo.png'
                      className={classes.untappd}
                      align='right'
                    />
                  </a>
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
