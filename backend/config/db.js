/**
 * @file This file sets up the database by defining a function which will be called upon server start.
 */

 /**
  *  Makes mongoose available for the application.
  *  Mongoose is a ODM - object data modelling library that helps to establish
  *  relationships between data and querying the database
  */
 const mongoose = require('mongoose');

 /**
  * connectDB - connects the application to the database having access to .env file 
  * where a port number, and uri are set
  */
 const connectDB = async () => {
   const conn = await mongoose.connect(process.env.MONGO_URI, {
     useNewUrlParser: true,
     useCreateIndex: true,
     useFindAndModify: false,
     useUnifiedTopology: true,
   });
 
   console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold
   );
 };
 
 module.exports = connectDB;