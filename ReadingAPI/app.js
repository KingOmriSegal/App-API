const express = require('express');
const cors = require('cors');
const logger = require('morgan');
// require("./dbConnection/db");

const profileController = require('./controllers/profileController');
// const chatsController = require('./controllers/chatsController');

const app = express();

app.use(cors());

const port = 5000;

app.use(logger('dev'));
app.use(express.json());

app.use('/profile', profileController);
// app.use('/chats', chatsController);

// Rest Setup
const restServer = app.listen(port, () => console.log(`RestServer is listening on port ${port}`));