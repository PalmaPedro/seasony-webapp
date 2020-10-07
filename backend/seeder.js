/**
 * This file is used to populate the database with dummy data. Loads json files from _data folder
 */ 

const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

/**
 * Load env variables
 */
dotenv.config({ path: './config/config.env' });

/**
 * Load models
 */
const Device = require('./models/Device.js');
const Task = require('./models/Task.js');

/**
 * Connect to database
 */
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

/**
 * Read JSON files
 */
const devices = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/devices.json`, 'utf-8')
);

const tasks = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/tasks.json`, 'utf-8')
);

/**
 * Import data to database
 */
const importData = async () => {
  try {
    await Device.create(devices);
    await Task.create(tasks);
    console.log('Data Imported...'.green.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

/**
 * Delete data from database
 */
const deleteData = async () => {
  try {
    await Device.deleteMany();
    await Task.deleteMany();
    console.log('Data Deleted...'.red.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

/**
 * Define flags to use in command line
 */
if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}