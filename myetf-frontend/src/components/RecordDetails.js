import React from 'react';
import {
  Grid,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {
    justifyContent: 'center',
  },
  item: {
    minWidth: '100px',
    textAlign: 'center',
  },
  paper: {
    padding: theme.spacing(1.5),
  }
}));

const RecordDetails = (props) => {
  const classes = useStyles();

  return (
    <div>
      <Grid container className={classes.container}>
        <Grid item xs={8} className={classes.item}>
          <Paper className={classes.paper}>
            <Typography variant="body1">
              { props.record.percentage ? props.record.percentage : 0 }
              %&nbsp;of&nbsp;
              { props.record.fund ? props.record.fund.ticker : 'NULL' }
              &nbsp;is&nbsp;
              { props.record.stock ? props.record.stock.ticker : 'NULL' }
            </Typography>
            <br />
            <Typography variant="body2">
              Tags:
              { 
                props.record.stock 
                  ? props.record.stock.tags.map((tag, i) => <li key={i}>{tag}</li>)
                  : ' None'
              }
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default RecordDetails;
