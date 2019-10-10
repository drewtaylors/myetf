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

import RecordDetails from './RecordDetails';
import api from '../selectors/api';

const useStyles = makeStyles(theme => ({
  button: {
    flexGrow: 1,
    margin: theme.spacing(2),
    padding: theme.spacing(1.5),
  },
  container: {
    alignContent: 'center',
    justifyContent: 'center',
    height: '80vh',
    margin: 'auto',
    marginTop: theme.spacing(2),
    maxWidth: '1366px',
  },
  form: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    minWidth: '100px',
    textAlign: 'center',
  },
  root: {
    flexGrow: 1,
  },
  textField: {
    backgroundColor: '#fff',
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

const Home = ({ history }) => {
  const classes = useStyles();
  const [fundTicker, setFundTicker] = useState('');
  const [stockTicker, setStockTicker] = useState('');
  const [records, setRecords] = useState([]);
  const [showRecord, setShowRecord] = useState(false);

  const search = (e) => {
    e.preventDefault();
    
    api
      .get(`/api/records?fund=${fundTicker}&stock=${stockTicker}`)
      .then((res) => {
        console.log(res);
        setShowRecord(true);
        setRecords(res.data);
        history.push(`/record/${res.data[0]._id}`);
      })
      .catch(err => {
        console.log(err);
        setShowRecord(true);
        setRecords([]);
        history.push('/record/error');
      });
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
                id="outlined-fund-ticker-input"
                label="Fund Ticker"
                className={classes.textField}
                type="fundTicker"
                name="fundTicker"
                autoComplete="fundTicker"
                margin="normal"
                variant="outlined"
                value={fundTicker}
                onChange={(e) => setFundTicker(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={2} className={classes.item}>
              <TextField
                id="outlined-stock-ticker-input"
                label="Stock Ticker"
                className={classes.textField}
                type="stockTicker"
                name="stockTicker"
                autoComplete="stockTicker"
                margin="normal"
                variant="outlined"
                value={stockTicker}
                onChange={(e) => setStockTicker(e.target.value)}
              />
            </Grid>
            <Grid item xs={2} md={1} className={classes.item}>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={search}
              >
                Search
              </Button>
            </Grid>
          </Grid>
        </Grid>
        {
          showRecord && 
            records.map((record) => {
              return (
                <Grid item xs={12} className={classes.title} key={record._id}>
                  <RecordDetails record={record} />
                </Grid>
            )})     
        }
      </Grid>
    </div>
  );
};

export default Home;
