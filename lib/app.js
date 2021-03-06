const express = require('express');
const app = express();

app.use(express.json());

app.use('/api/v1/plants', require('./controllers/plants'));
app.use('/api/v1/animals', require('./controllers/animals'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
