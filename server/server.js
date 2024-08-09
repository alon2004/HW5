const express = require('express');
const port = 8080;
const app = express();
const cors = require('cors');
require('dotenv').config();
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.use(express.json());
app.use(cors({
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'X-Requested-With', 'Accept'],
  origin: ['http://127.0.0.1:5500','https://hw5-nf8c.onrender.com','http://localhost:5500','http://localhost:8080','http://127.0.0.1:5502','http://se.shenkar.ac.il'],
  credentials: true
}));

const {wishRouter} = require('./routers/wishRouter');
app.use('/api/wishes', wishRouter);
