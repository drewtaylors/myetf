import React, {
  useState
} from 'react';
import {
  Button,
  Grid,
  makeStyles,
  TextField,
  Typography
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  button: {
    flexGrow: 1,
    margin: theme.spacing(2),
    padding: theme.spacing(1.5),
  },
  container: {
    alignContent: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  form: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    textAlign: 'center'
  },
  root: {
    flexGrow: 1,
  },
  textField: {
    flexGrow: 1,
    margin: theme.spacing(1),
  },
  title: {
    display: 'inline-block',
    padding: theme.spacing(8, 0, 8),
    paddingBottom: theme.spacing(8),
    textAlign: 'center'
  },
}));

const Home = () => {
  const classes = useStyles();
  const [fund, setFund] = useState('');
  const [stock, setStock] = useState('');
  const searchRecords = (e) => {
    e.preventDefault();
    setFund('');
    setStock('');
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3} className={classes.container}>
        <Grid item xs={12} className={classes.title}>
          <Typography variant="h3">myETF</Typography>
        </Grid>
        <Grid item xs={12} className={classes.title}>
          <Grid container className={classes.form}>
            <Grid item xs={12} md={2} className={classes.item}>
              <TextField
                id="outlined-fund-input"
                label="Fund"
                className={classes.textField}
                type="fund"
                name="fund"
                autoComplete="fund"
                margin="normal"
                variant="outlined"
                value={fund}
                onChange={(e) => setFund(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={2} className={classes.item}>
              <TextField
                id="outlined-stock-input"
                label="Stock"
                className={classes.textField}
                type="stock"
                name="stock"
                autoComplete="stock"
                margin="normal"
                variant="outlined"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </Grid>
            <Grid item xs={1} className={classes.item}>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={searchRecords}
              >
                Search
              </Button>
            </Grid>
          </Grid>
        </Grid>
        
      </Grid>
    </div>
  );
};

export default Home;
