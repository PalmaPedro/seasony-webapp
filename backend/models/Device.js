/**
 * @file This file will create the 'device' Schema. It will map * to the MongoDB collection 'devices' and 
 * defines the shape of the documents within that collection
 */

 /**
  * Bring in mongoose ODM library to define the schema.
  */
 const mongoose = require('mongoose');
 const slugify = require('slugify');
 
 /**
  *  Creates a device Schema. Includes fields necessary to define
  *  the 'device' object as well as how it relates to a 'task'
  */
 const DeviceSchema = new mongoose.Schema(
     {
         title: {
             type: String,
             required: [true, 'Please add a title'],
             unique: true,
             trim: true,
             maxlength: [50, 'Name can not be more than 50 characters']
         },
         slug: String,
         description: {
             type: String,
             required: [false, 'Please add a description'],
             maxlength: [500, 'Description can not be more than 500 characters']
         },
         status: {
             type: String
         },
         socketID: {
             type: String
         },
         user: {
             type: mongoose.Schema.ObjectId,
             ref: 'User',
             required: false
         }
     },
     {
         toJSON: { virtuals: true },
         toObjects: { virtuals: true }
     }
     );
 
 // Create device slug from the name
 DeviceSchema.pre('save', function (next) {
     this.slug = slugify(this.title, { lower: true });
     next();
     
 });
 
 // Reverse populate with virtuals - This will populate the task associated with a device with its different fields
 DeviceSchema.virtual('tasks', {
     ref: 'Task',
     localField: '_id',
     foreignField: 'device',
     justOne: false
 });
 
 /**
  *  It defines the model, by passing in the schema and exports *  it, making it available to be used in the 
  * 'controller' functions regarding the 'devices' resource
  */
 module.exports = mongoose.model('Device', DeviceSchema);