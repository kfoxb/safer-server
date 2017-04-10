//this block is for testing setup
const expect = require('chai').expect;
const stubs = require('./Stubs');
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.should();
chai.use(sinonChai);

//require any files containing functions that need to be tested here
const authorization = require('../Authorization/Authorization.js');

// Conditional async testing, akin to Jasmine's waitsFor()
// Will wait for test to be truthy before executing callback
let waitForThen = function (test, cb) {
  setTimeout(function() {
    test() ? cb.apply(this) : waitForThen(test, cb);
  }, 5);
};

describe('Authorization Middleware', function() {

  xit('Should respond with a 401 status code when provided with an invalid token', function() {

    expect(res._responseCode).to.equal(401);
    expect(res._ended).to.equal(true);
  });

  xit('Should call next function passing in req and res when provided with a valid token', function() {
    let req = new stubs.request('/api/friends', 'GET');
    let res = new stubs.response();
    let next = sinon.spy();

    authorization(req, res, next);

    next.should.have.been.calledWith(req, res);
  });
});