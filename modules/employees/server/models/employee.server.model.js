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
    required: "Please fill in employee's first name",
    trim: true
  },
  lastName: {
    type: String,
    default: '',
    required: "Please fill in employee's last name",
    trim: true
  },
  address: {
    type: String,
    default: '',
    required: "Please fill in employee's address",
    trim: true
  },
  phoneNum: {
    type: String,
    default: '',
    required: "Please fill in employee's phone number",
    trim: true
  },
  email: {
    type: String,
    default: '',
    required: "Please fill in employee's email address",
    trim: true
  },
  dateHired: {
    type: Date,
    default: Date.now,
    required: "Please fill in employee's hire date",
    trim: true
  },
  department: {
    type: String,
    default: '',
    required: "Please fill in employee's department",
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
