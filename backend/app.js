const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors');


dotenv.config({ path: './config/.env' })


const connectDB = require('./config/db');
connectDB();

const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/admin', require('./src/Admin/Routes/adminRoutes'));
app.use('/vol', require('./src/Volunteer/Routes/volRoutes'));
app.use('/ngo',require('./src/NGO/Routes/ngoRoutes'));
app.use('/common', require('./src/Utils/Routes/commonRoute'));

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)