/**
 * @file This file will create the 'task' Schema. It will map
 * to the MongoDB collection 'tasks' and defines the shape of
 * the documents within that collection
 */

/**
  * Bring in mongoose ODM library to define the schema.
  */
 const mongoose = require('mongoose');
 const slugify = require('slugify');
 
 /**
  *  Creates a task Schema. Includes fields necessary to define
  *  the 'task' object as well as how it relates to a 'device'
  */
 const TaskSchema = new mongoose.Schema({
   title: {
     type: String,
     required: [true, 'Please add a task title'],
     //unique: true,
     trim: true,
   },
   //slug: String,
   description: {
     type: String,
     required: [true, 'Please add a description'],
   },
   device: {
     type: mongoose.Schema.ObjectId,
     ref: 'Device'
     //required: true,
   },
   user: {
     type: mongoose.Schema.ObjectId,
     ref: 'User'
     //required: true,
   },
 });
 
 /**
  *It defines the model, by passing in the schema and exports
  *it, making it available to be used in the 
  *'controller' functions regarding the 'devices' resource
  */
 module.exports = mongoose.model('Task', TaskSchema);