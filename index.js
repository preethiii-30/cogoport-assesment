const express = require('express');
const bodyParser = require('body-parser');
const configRoutes = require('./routes/config');
const { initializeDatabase } = require('./models');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api', configRoutes);

initializeDatabase().then(() => {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
});
