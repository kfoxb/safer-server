//this block is for testing setup
console.log(process.env.PWD + '/' + '../Authorization/Authorization.js');
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

describe('Authorization Middleware', function() {
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






















