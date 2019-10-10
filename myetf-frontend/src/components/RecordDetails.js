import React from 'react';
import {
  Typography,
  Paper,
} from '@material-ui/core';

const RecordDetails = (props) => {
  return (
    <div>
      <Paper>
        <Typography variant="body1">
          { props.record.percentage ? props.record.percentage : 0 }
          &nbsp;of&nbsp;
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
    </div>
  );
};

export default RecordDetails;
