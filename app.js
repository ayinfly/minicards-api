require("dotenv").config();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors");
const compression = require("compression");
const helmet = require("helmet");
require("./config/passport");

var usersRouter = require('./routes/users');
var foldersRouter = require('./routes/folders')
var cardRouter = require('./routes/cards');

var app = express();

// Set up mongoose
const mongoose = require("mongoose");
const mongoDB = process.env.MONGO_URL;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error"));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(compression());
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

app.use('/api/users', usersRouter);
app.use('/api/folders', foldersRouter);
app.use('/api/folders/:folder_id/cards', cardRouter);

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server started on port ${process.env.PORT || 3000}`);
});  

module.exports = app;
