import express from 'express';

import './db/mongoose';

import fundRouter from './routes/fund.routes';
//import stockRouter from './routes/stock.routes';

const app = express();

app.use(express.json());
app.use('/api/funds', fundRouter);
// app.use(stockRouter);

export default app;