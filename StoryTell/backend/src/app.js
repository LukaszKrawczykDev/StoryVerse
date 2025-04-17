const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();
const cors = require('cors');
app.use(cors());

app.use(express.json());
app.use('/auth', authRoutes);

module.exports = app;