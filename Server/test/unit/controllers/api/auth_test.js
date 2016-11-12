//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

import {expect} from 'chai';
var chaiHttp = require('chai-http');
var chai = require('chai');
var userValidation = require('../../../../controllers/api/auth')
var server = require('../../../../server')
var sinon = require('sinon')
var authService = require('../../../../controllers/api/services/authService')

describe('auth', () => {

  describe('/POST', () => {

    it('is a test', sinon.test( function(done)
    {
      var authServiceMock = this.mock(authService)
      authServiceMock.expects('createToken').once().returns( { statusCode : 400, payload : { error : 'incorrect data'} })

      chai.request(server)
          .post('/api/auth')
          .end((err, res) => {
              res.should.have.status(400);
              //res.body.should.be.a('array');
              //res.body.length.should.be.eql(0);
            done();
          });
    }))
  })
})
