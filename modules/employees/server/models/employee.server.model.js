'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Employee Schema
 */
var EmployeeSchema = new Schema({
  firstName: {
    type: String,
    default: '',
    required: 'Please fill in employee first name',
    trim: true
  },
  lastName: {
    type: String,
    default: '',
    required: 'Please fill in employee last name',
    trim: true
  },
  address: {
    type: String,
    default: '',
    required: 'Please fill in employee address',
    trim: true
  },
  phoneNum: {
    type: String,
    default: '',
    required: 'Please fill in employee phone number',
    trim: true
  },
  email: {
    type: String,
    default: '',
    required: 'Please fill in employee email address',
    trim: true
  },
  dateHired: {
    type: Date,
    default: Date.now,
    required: 'Please fill in employee hire date',
    trim: true
  },
  department: {
    type: String,
    default: '',
    required: 'Please fill in employee department',
    trim: true
  },
  dob: {
    type: Date,
    default: Date.now
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

mongoose.model('Employee', EmployeeSchema);
