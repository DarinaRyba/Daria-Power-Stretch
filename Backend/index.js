const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const chalk = require('chalk');
const { connect } = require('mongoose');
const debug = require('debug')('app');

const app = express();
const port = process.env.PORT || 2050;
const dbUrl = process.env.DBURL || 'mongodb://localhost/workoutdb';

connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(morgan('dev'));
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('It works');
});

app.listen(port, () => {
  debug(`Server listening on port ${chalk.blueBright(port)}...`);
});
