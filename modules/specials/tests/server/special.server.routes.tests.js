'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Special = mongoose.model('Special'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  special;

/**
 * Special routes tests
 */
describe('Special CRUD tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new Special
    user.save(function () {
      special = {
        name: 'Special name'
      };

      done();
    });
  });

  it('should be able to save a Special if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Special
        agent.post('/api/specials')
          .send(special)
          .expect(200)
          .end(function (specialSaveErr, specialSaveRes) {
            // Handle Special save error
            if (specialSaveErr) {
              return done(specialSaveErr);
            }

            // Get a list of Specials
            agent.get('/api/specials')
              .end(function (specialsGetErr, specialsGetRes) {
                // Handle Specials save error
                if (specialsGetErr) {
                  return done(specialsGetErr);
                }

                // Get Specials list
                var specials = specialsGetRes.body;

                // Set assertions
                (specials[0].user._id).should.equal(userId);
                (specials[0].name).should.match('Special name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Special if not logged in', function (done) {
    agent.post('/api/specials')
      .send(special)
      .expect(403)
      .end(function (specialSaveErr, specialSaveRes) {
        // Call the assertion callback
        done(specialSaveErr);
      });
  });

  it('should not be able to save an Special if no name is provided', function (done) {
    // Invalidate name field
    special.name = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Special
        agent.post('/api/specials')
          .send(special)
          .expect(400)
          .end(function (specialSaveErr, specialSaveRes) {
            // Set message assertion
            (specialSaveRes.body.message).should.match('Please fill Special name');

            // Handle Special save error
            done(specialSaveErr);
          });
      });
  });

  it('should be able to update an Special if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Special
        agent.post('/api/specials')
          .send(special)
          .expect(200)
          .end(function (specialSaveErr, specialSaveRes) {
            // Handle Special save error
            if (specialSaveErr) {
              return done(specialSaveErr);
            }

            // Update Special name
            special.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Special
            agent.put('/api/specials/' + specialSaveRes.body._id)
              .send(special)
              .expect(200)
              .end(function (specialUpdateErr, specialUpdateRes) {
                // Handle Special update error
                if (specialUpdateErr) {
                  return done(specialUpdateErr);
                }

                // Set assertions
                (specialUpdateRes.body._id).should.equal(specialSaveRes.body._id);
                (specialUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Specials if not signed in', function (done) {
    // Create new Special model instance
    var specialObj = new Special(special);

    // Save the special
    specialObj.save(function () {
      // Request Specials
      request(app).get('/api/specials')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Special if not signed in', function (done) {
    // Create new Special model instance
    var specialObj = new Special(special);

    // Save the Special
    specialObj.save(function () {
      request(app).get('/api/specials/' + specialObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', special.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Special with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/specials/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Special is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Special which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Special
    request(app).get('/api/specials/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Special with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Special if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Special
        agent.post('/api/specials')
          .send(special)
          .expect(200)
          .end(function (specialSaveErr, specialSaveRes) {
            // Handle Special save error
            if (specialSaveErr) {
              return done(specialSaveErr);
            }

            // Delete an existing Special
            agent.delete('/api/specials/' + specialSaveRes.body._id)
              .send(special)
              .expect(200)
              .end(function (specialDeleteErr, specialDeleteRes) {
                // Handle special error error
                if (specialDeleteErr) {
                  return done(specialDeleteErr);
                }

                // Set assertions
                (specialDeleteRes.body._id).should.equal(specialSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Special if not signed in', function (done) {
    // Set Special user
    special.user = user;

    // Create new Special model instance
    var specialObj = new Special(special);

    // Save the Special
    specialObj.save(function () {
      // Try deleting Special
      request(app).delete('/api/specials/' + specialObj._id)
        .expect(403)
        .end(function (specialDeleteErr, specialDeleteRes) {
          // Set message assertion
          (specialDeleteRes.body.message).should.match('User is not authorized');

          // Handle Special error error
          done(specialDeleteErr);
        });

    });
  });

  it('should be able to get a single Special that has an orphaned user reference', function (done) {
    // Create orphan user creds
    var _creds = {
      username: 'orphan',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create orphan user
    var _orphan = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'orphan@test.com',
      username: _creds.username,
      password: _creds.password,
      provider: 'local'
    });

    _orphan.save(function (err, orphan) {
      // Handle save error
      if (err) {
        return done(err);
      }

      agent.post('/api/auth/signin')
        .send(_creds)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var orphanId = orphan._id;

          // Save a new Special
          agent.post('/api/specials')
            .send(special)
            .expect(200)
            .end(function (specialSaveErr, specialSaveRes) {
              // Handle Special save error
              if (specialSaveErr) {
                return done(specialSaveErr);
              }

              // Set assertions on new Special
              (specialSaveRes.body.name).should.equal(special.name);
              should.exist(specialSaveRes.body.user);
              should.equal(specialSaveRes.body.user._id, orphanId);

              // force the Special to have an orphaned user reference
              orphan.remove(function () {
                // now signin with valid user
                agent.post('/api/auth/signin')
                  .send(credentials)
                  .expect(200)
                  .end(function (err, res) {
                    // Handle signin error
                    if (err) {
                      return done(err);
                    }

                    // Get the Special
                    agent.get('/api/specials/' + specialSaveRes.body._id)
                      .expect(200)
                      .end(function (specialInfoErr, specialInfoRes) {
                        // Handle Special error
                        if (specialInfoErr) {
                          return done(specialInfoErr);
                        }

                        // Set assertions
                        (specialInfoRes.body._id).should.equal(specialSaveRes.body._id);
                        (specialInfoRes.body.name).should.equal(special.name);
                        should.equal(specialInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Special.remove().exec(done);
    });
  });
});
