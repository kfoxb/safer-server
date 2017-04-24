require('dotenv').config({path: './config.env'});
process.env.PORT = 3000;
const app = require('../index.js');
const request = require('supertest');
const chai = require('chai');
const expect = require('chai').expect;
const httpMocks = require('node-mocks-http');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.should();
chai.use(sinonChai);

// describe('Registration Tests', function() {
//     it('should return the user if the name is valid', function(done) {
//       request(app)
//       .post('/api/register')
//       .send({name: 'JoshMatz'})
//       .end(function(err, res) {
//         expect(res.body.name).to.be.equal('JoshMatz');
//         expect(res.statusCode).to.be.equal(200);
//         done();
//       });
//     });
//   });
  
//   describe('Login Tests', function() {
//     it('should return the user if valid', function(done) {
//       request(app)
//       .post('/api/login')
//       .send({userID: 0})
//       .end(function(err, res) {
//         expect(res.body.name).to.be.equal('JoshMatz');
//         expect(res.statusCode).to.be.equal(200);
//         done();
//       });
//     });
//   });

  // xit('should create an account when given a new email address', function(done) {
  //   request(app)
  //   .put('/api/user')
  //   .end(function(err, res) {

  //   });
  // });
  // xit('should create an account when given the longest email address possible (254 characters)', function(done) {
  //   request(app)
  //   .put('/api/user')
  //   .end(function(err, res) {
      
  //   });
  // });
  // xit('should not create an account if that account already exists', function(done) {
  //   request(app)
  //   .put('/api/user')
  //   .end(function(err, res) {
      
  //   });
  // });
  // xit('should add account_created set to true to req.user if the account was created', function(done) {
  //   request(app)
  //   .put('/api/user')
  //   .end(function(err, res) {
      
  //   });
  // });
  // xit('should add account_created set to false to req.user if the account was not created', function(done) {
  //   request(app)
  //   .put('/api/user')
  //   .end(function(err, res) {
      
  //   });
  // });
  // xit('should add a user object to req when successfully finding or creating an account', function(done) {
  //   request(app)
  //   .put('/api/user')
  //   .end(function(err, res) {
      
  //   });
  // });
  // xit('should add a user object to req with all of the properties of a user record in the Users table', function(done) {
  //   request(app)
  //   .put('/api/user')
  //   .end(function(err, res) {
      
  //   });
  // });
  // xit('should respond with an error if no Authorization header is present', function(done) {
  //   request(app)
  //   .put('/api/user')
  //   .end(function(err, res) {
      
  //   });
  // });
  // xit('should respond with an error if the Authorization header is an empty object', function(done) {
  //   request(app)
  //   .put('/api/user')
  //   .end(function(err, res) {
      
  //   });
  // });