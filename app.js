const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const postsController = require('./controllers/postsController');

const app = express();

app.use(cors());

const port = 8080;

app.use(logger('dev'));
app.use(express.json());


app.use('', postsController);
const restServer = app.listen(port, () => console.log(`RestServer is listening on port ${port}`));