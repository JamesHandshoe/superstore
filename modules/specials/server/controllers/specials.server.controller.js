'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Special = mongoose.model('Special'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Special
 */
exports.create = function(req, res) {
  var special = new Special(req.body);
  special.user = req.user;

  special.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(special);
    }
  });
};

/**
 * Show the current Special
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var special = req.special ? req.special.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  special.isCurrentUserOwner = req.user && special.user && special.user._id.toString() === req.user._id.toString();

  res.jsonp(special);
};

/**
 * Update a Special
 */
exports.update = function(req, res) {
  var special = req.special;

  special = _.extend(special, req.body);

  special.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(special);
    }
  });
};

/**
 * Delete an Special
 */
exports.delete = function(req, res) {
  var special = req.special;

  special.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(special);
    }
  });
};

/**
 * List of Specials
 */
exports.list = function(req, res) {
  Special.find().sort('-created').populate('user', 'displayName').exec(function(err, specials) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(specials);
    }
  });
};

/**
 * Special middleware
 */
exports.specialByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Special is invalid'
    });
  }

  Special.findById(id).populate('user', 'displayName').exec(function (err, special) {
    if (err) {
      return next(err);
    } else if (!special) {
      return res.status(404).send({
        message: 'No Special with that identifier has been found'
      });
    }
    req.special = special;
    next();
  });
};
