require('dotenv').config()
const express  = require('express');
const cors = require('cors');
const routers = require('./src/routers/index.js')
const app = express()
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Welcome to our authentication template');
  });

  const port = process.env.PORT || 8888;
app.use('/api', routers)
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
