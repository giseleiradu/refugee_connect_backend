import httpErrors from 'http-errors';
import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import joiErrors from './helper/error';
import cors from 'cors';
// import refugees from './routes/refugees';
import auth from './routes/auth';
import users from './routes/users';

const app = express();
 
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.use('/api/v1/refugees', refugees);
app.use('/api/v1/auth', auth);
app.use('/api/v1/users', users);
app.use(joiErrors());
app.use((req, res, next)=>{
    next(httpErrors(404));
});

app.use((err, req, res, next)=>{
    res.status(err.status || 500);
    res.send({
        'status':err.status,
        'message':err.message
    });
    next();
})

export default app;
