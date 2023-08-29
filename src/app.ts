import express,{ Express, json } from 'express';

import postRouter from './routes/post';
import tenantRouter from './routes/tenant';

const app: Express = express();

app.use(json());

app.use('/api/v1/posts', postRouter);
app.use('/api/v1/tenants', tenantRouter);

app.all('*', (req, res) => {
    res.status(404).json({
        status: 'fail',
        message: `Can't find ${req.originalUrl} on this server!`
    });
});

export default app;
