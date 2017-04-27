require('dotenv').config({path: './config.env'});
process.env.PORT = 3000;
const app = require('../index.js');
const request = require('supertest');
const chai = require('chai');
const expect = require('chai').expect;
// const httpMocks = require('node-mocks-http');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.should();
chai.use(sinonChai);

describe('Sign up process', function() {
  it('should create an account when given a new email address', function(done) {
    request(app)
    .put('/api/user')
    .set('Authorization', JSON.stringify({
      email: 'johnsmith@email.com',
      name: 'John Smith'
    }))
    .send({phoneNumber: '8017564738'})
    .end(function(err, res) {
      expect(res.statusCode).to.equal(201);
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
      done();
    });
  });
  it('should not create an account if that account already exists', function(done) {
    request(app)
    .put('/api/user')
    .set('Authorization', JSON.stringify({
      email: 'kURNNuQSfJBzwDQWboVwsZv9rxW4RJDMK1b5j2eRrREy2WYcXeyDKrr4zumfEp7Hyi1HQ8FenjexsDvzwWPvgnBsUNWeu69T4n6FmipfCbzbtqG3xnEoN7lLkpY33nWUijvLHGunaOGNzmIgo31FwK4hZXtAArzKkJprhAT1pDKKCTFFYXclxI59H8raGsZkW190lbzrQkNm6WquwBTtayjFCcNFBxCwMfv5zikFMaQNhml0GFqo@email.com',
      name: 'Tester McTestFace'
    }))
    .send({phoneNumber: '8017348203'})
    .end(function(err, res) {
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