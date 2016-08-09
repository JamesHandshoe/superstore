'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Customer Schema
 */
var CustomerSchema = new Schema({
  firstName: {
    type: String,
    default: '',
    required: "Please fill out customer's first name",
    trim: true
  },

  lastName: {
    type: String,
    default: '',
    required: "Please fill out customer's last name",
    trim: true
  },

  address: {
    type: String,
    default: '',
    required: "Please fill out customer address",
    trim: true
  },

  phoneNum: {
    type: String,
    default: '',
    required: "Please fill out customer phone number",
    trim: true
  },

  email: {
    type: String,
    default: '',
    required: "Please fill out customer email",
    trim: true
  },

  dob: {
    type: String,
    default: '',
    required: "Please fill out customer DOB",
    trim: true
  },

  lastPurchaseDate: {
    type: Date,
    deafult: Date.now
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

mongoose.model('Customer', CustomerSchema);
