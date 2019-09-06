import request from 'supertest'
import app from '../src/';
import Fund from '../src/models/fund.model';

test('should add new ETF', async () => {
    const response = await request(app).post('/funds').send({
        ticker: 'SPY',
        name: 'SPDR S&P 500 ETF'
    });

    const fund = Fund.findById(response.body.fund._id);
    expect(fund).not.toBeNull();

    expect(response.body).toMatchObject({
        fund: {
            ticket: 'SPY',
            name: 'SPDR S&P 500 ETF'
        },
    });
});