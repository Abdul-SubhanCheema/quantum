const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");


const app = express();


require('dotenv').config();

const managementRouter = require('./Router/ManagementRouter');



app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,  
})); 

app.use(express.json());

const PORT = process.env.PORT || 4000;
const MONGO_URL = process.env.MONGO_URL;


mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });


app.use('/quantumronics-api/management', managementRouter);



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
