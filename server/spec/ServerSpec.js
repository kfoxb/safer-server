// //this block is for testing setup
// // process.env.CLEARDB_DATABASE_URL = 'mysql://root@localhost/saferDbTesting';
// const expect = require('chai').expect;
// const httpMocks = require('node-mocks-http');
// const chai = require('chai');
// const sinon = require('sinon');
// const sinonChai = require('sinon-chai');
// chai.should();
// chai.use(sinonChai);

// // require any files containing functions that need to be unit tested here
// const authorization = require('../Authorization/Authorization.js');
  
// describe('Authorization Middleware', function() {

//   it('Should call next when provided with a valid token', async () => {
//     let req = httpMocks.createRequest({
//       headers: {
//         Authorization: JSON.stringify({
//           email: 'johnsmith@email.com',
//           name: 'John Smith'
//         }),
//         Accept: 'application/json',
//         'Content-Type': 'application/json'
//       }
//     });
//     let res = httpMocks.createResponse();
//     let next = sinon.spy();
//     console.log('getting ready to run Authorization');
//     await authorization(req, res, next);
//     console.log('ran Authorization');
//     next.should.have.been.called();
//   });

//   xit('Should respond with a 401 status code when provided with an invalid token', function() {
//     let req = httpMocks.createRequest();
//     let res = httpMocks.createResponse();
//     expect(res._responseCode).to.equal(401);
//     expect(res._ended).to.equal(true);
//   });
// });






















