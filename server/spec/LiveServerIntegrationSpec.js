require('dotenv').config({path: './config.env'});
process.env.PORT = 3000;
const app = require('../index.js');
const request = require('supertest');
const chai = require('chai');
const expect = require('chai').expect;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.should();
chai.use(sinonChai);
const Users = require('../../db/Users/Users.js');

let user1 = {
  headers: [
    'Authorization',
    JSON.stringify({
      email: 'johnsmith@email.com',
      name: 'John Smith'
    })],
  phoneNumber: '8017564738',
  create: function() {
    request(app)
    .put('/api/user')
    .set(...this.headers)
    .send({phoneNumber: '8017564738'})
    .end(function(err, res) {});
  }
};

describe('Sign up process', function() {
  before(function() {
    //clear database of any existing data from development
    Users.truncate();
  });
  afterEach(function() {
    //clear database of anything inserted from test
    Users.truncate();
  });
  it('should create an account when given a new email address', function(done) {
    request(app)
    .put('/api/user')
    .set(...user1.headers)
    .send({phoneNumber: '8017564738'})
    .end(function(err, res) {
      expect(res.statusCode).to.equal(201);
      expect(res.body.created).to.equal(true);
      done();
    });
  });
  it('should create an account when given the longest email address possible (254 characters)', function(done) {
    request(app)
    .put('/api/user')
    .set('Authorization', JSON.stringify({
      email: 'kURNNuQSfJBzwDQWboVwsZv9rxW4RJDMK1b5j2eRrREy2WYcXeyDKrr4zumfEp7Hyi1HQ8FenjexsDvzwWPvgnBsUNWeu69T4n6FmipfCbzbtqG3xnEoN7lLkpY33nWUijvLHGunaOGNzmIgo31FwK4hZXtAArzKkJprhAT1pDKKCTFFYXclxI59H8raGsZkW190lbzrQkNm6WquwBTtayjFCcNFBxCwMfv5zikFMaQNhml0GFqo@email.com',
      name: 'Tester McTestFace'
    }))
    .send({phoneNumber: '8017348203'})
    .end(function(err, res) {
      expect(res.statusCode).to.equal(201);
      expect(res.body.created).to.equal(true);
      done();
    });
  });
  it('should not create an account if that account already exists', function(done) {
    user1.create();
    request(app)
    .put('/api/user')
    .set(...user1.headers)
    .send({phoneNumber: '8017564738'})
    .end(function(err, res) {
      expect(res.statusCode).to.equal(201);
      expect(res.body.created).to.equal(false);
      done();
    });
  });
  it('should create an account if that account doesn\'t already exists', function(done) {
    request(app)
    .put('/api/user')
    .set('Authorization', JSON.stringify({
      email: 'decaf@coffee.jquery.com',
      name: 'Mocha Chaierson'
    }))
    .send({phoneNumber: '8016948343'})
    .end(function(err, res) {
      expect(res.statusCode).to.equal(201);
      expect(res.body.created).to.equal(true);
      done();
    });
  });
  it('should respond with an error if no Authorization header is present', function(done) {
    request(app)
    .put('/api/user')
    .end(function(err, res) {
      expect(res.statusCode).to.equal(401);
      done();
    });
  });
  it('should respond with an error if the Authorization header is an empty object', function(done) {
    request(app)
    .put('/api/user')
    .set('Authorization', JSON.stringify({}))
    .end(function(err, res) {
      expect(res.statusCode).to.equal(401);
      done();
    });
  });
});

describe('Posting fences to the users', function () {
  xit('Should post a fence to the database', function(done) {
  });
  it('Should not set a fence if the address is blank', function(done) {
    request(app)
    .post('/api/labels')
    .set('Authorization', JSON.stringify({
      email: 'decaf@coffee.jquery.com',
      name: 'Mocha Chaierson'
    }))
    .send({
      coordinates: '',
      address: '',
      label: 'School'
    })
    .end(function (err, res) {
      expect(res.statusCode).to.equal(418);
      done();
    });
  });
  it('Should not set a fence for an invalid location', function (done) {
    request(app)
    .post('/api/labels')
    .set('Authorization', JSON.stringify({
      email: 'decaf@coffee.jquery.com',
      name: 'Mocha Chaierson'
    }))
    .send({
      label: 'Bar'
    })
    .end(function (err, res) {
      expect(res.statusCode).to.equal(418);
      done();
    });
  });
  it('Should set a fence for a valid location', function (done) {
    request(app)
    .post('/api/labels')
    .set('Authorization', JSON.stringify({
      email: 'decaf@coffee.jquery.com',
      name: 'Mocha Chaierson',
    }))
    .send({
      coordinates: {
        lat: 10.041167,
        lng: -69.251438
      },
      address: 'Urb. Valle Hondo, Cabudare, Lara, Venezuela',
      label: 'Home'
    })
    .end(function (err, res) {
      expect(res.statusCode).to.equal(201);
      done();
    });
  });
});

describe('Getting all of the user\'s fences', function () {
  xit('Should return an empty array when the user has no fences', function(done) {
    expect(res.statusCode).to.equal(201);
    expect(res.body).to.deep.equal([]);
    done();
  });
  xit('Should return a fence when the user has only one fence', function(done) {
    expect(res.statusCode).to.equal(201);
    done();
    //expect(res.body).to.deep.equal(fence)
  });
  xit('Should return an array of fences if the user has them', function(done) {
    expect(res.statusCode).to.equal(201);
    //expect(res.body).to.deep.equal(fence)
    done();
  });
  xit('Should return a high number of fences if the users has them', function (done) {
    expect(res.statusCode).to.equal(201);
    //expect(res.body).to.deep.equal(fence)
    done();
  });
});

describe('Updating a user\'s information', function() {
  // xbeforeEach(function() {});
  // xafterEach(function() {});
  xit('', function(done) {
    request(app)
    .put()
    .set()
    .send({})
    .end(function (err, res) {
      done();
    });
  });
});
