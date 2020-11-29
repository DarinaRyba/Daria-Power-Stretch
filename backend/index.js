const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const { connect } = require('mongoose');

const app = express();

const port = process.env.PORT || 2050;

const dbURL = process.env.DBURL || 'mongodb://localhost/workoutdb';

connect(dbURL);

app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('It works');
});

app.listen(port, () => {
  debug(`Server is running on port ${chalk.blue(port)}`);
});
