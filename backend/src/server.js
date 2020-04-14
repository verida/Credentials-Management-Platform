import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import router from './routes.js';

// Set up the express app
const app = express();

let corsConfig = {};
if (process.env.CORS_HOST) {
    corsConfig.origin = process.env.CORS_HOST;
};

// Parse incoming requests data
app.use(cors(corsConfig));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);

const PORT = process.env.PORT ? process.env.PORT : 5020;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});