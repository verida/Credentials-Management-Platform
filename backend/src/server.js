require('rootpath')();

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import jwt from 'helpers/jwt';

const app = express();

let corsConfig = {};
if (process.env.CORS_HOST) {
    corsConfig.origin = process.env.CORS_HOST;
}

app.use(jwt());
app.use(cors(corsConfig));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// routes
app.use('/users', require('./controllers/user'));
app.use('/results', require('./controllers/result'));
app.use('/issuers', require('./controllers/issuer'));

const PORT = process.env.PORT ? process.env.PORT : 5020;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});
