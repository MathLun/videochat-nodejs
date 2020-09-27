const path = require('path');
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const { router } = require('./routes');
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('./src/public'));
app.use(expressLayouts);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));

app.use('/', router);

module.exports = { app };
