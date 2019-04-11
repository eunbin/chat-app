const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const apiFallback = require('connect-history-api-fallback');

const app = express();
app.io = require('socket.io')();

app.get('/', (req, res) => {
  res.send('Hello Chat!');
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(apiFallback());

require('./socket')(app.io);

module.exports = app;
