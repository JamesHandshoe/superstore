'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Department Schema
 */
var DepartmentSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill in the department name',
    trim: true
  },
  description:{
      type: String,
      default: '',
      required: 'Please provide a department description',
      trim: true
  },
  sales: {
    type: Array,
    default: [],
    trim: true
  },
  employees: {
    type: Array,
    default: [],
    trim: true  
  },
  products: {
    type: Array,
    default: [],
    trim: true
  },

  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Department', DepartmentSchema);
