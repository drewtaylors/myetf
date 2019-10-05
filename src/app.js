import express from 'express';
import cors from 'cors';

import './db/mongoose';

import fundRouter from './routes/fund.routes';
import stockRouter from './routes/stock.routes';
import recordRouter from './routes/record.routes';
import auditRouter from './routes/audit.routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/funds', fundRouter);
app.use('/api/stocks', stockRouter);
app.use('/api/records', recordRouter);
app.use('/api/audit', auditRouter);

export default app;