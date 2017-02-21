'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Special Schema
 */
var SpecialSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Special name',
    trim: true
  },
  discountAmount: {
    type: Number,
    default: '',
    required: 'Please fill in discount amount',
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

mongoose.model('Special', SpecialSchema);
