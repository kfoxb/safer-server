//this block is for testing setup
process.env.CLEARDB_DATABASE_URL = 'mysql://root@localhost/saferDbTesting';
const db = require('../../db/config.js');
const expect = require('chai').expect;
const httpMocks = require('node-mocks-http');
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.should();
chai.use(sinonChai);


// require any files containing functions that need to be unit tested here
const authorization = require('../Authorization/Authorization.js');

// beforeEach(function() {
//   return db.clear()
//     .then(function() {
//       return db.save([tobi, loki, jane]);
//     });
// });

describe('Authorization Middleware', function() {
  before('Create database if it does not exist', function(done) {
    db.query('CREATE DATABASE IF NOT EXISTS saferDbTesting').spread(function(results, metadata) {
      console.log('creating DATABASE saferDbTesting, if it does not exist');
    })
    .then(() => {
      done();
    })
    .catch((err) => {
      done(err);
    });
  });
  beforeEach('Set up new database connection', function() {
    // runs before each test in this block
  });

  afterEach('Delete all information from database', function() {
    // runs after each test in this block
  });

  it('Should call next when provided with a valid token', function(done) {
    let req = httpMocks.createRequest({
      headers: {
        Authorization: JSON.stringify({
          email: 'johnsmith@email.com',
          name: 'John Smith'
        })
      }
    });
    let res = httpMocks.createResponse();
    let next = sinon.spy();
    authorization(req, res, function() {
      next();
      done();
    });

    next.should.have.been.called();
    // done();
  });

  xit('Should respond with a 401 status code when provided with an invalid token', function() {
    let req = httpMocks.createRequest();
    let res = httpMocks.createResponse();
    expect(res._responseCode).to.equal(401);
    expect(res._ended).to.equal(true);
  });
});






















