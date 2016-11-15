chai = require('chai')
var expect = chai.expect
var authMiddleware = require('../../../middleware/auth')
var userService = require('../../../controllers/api/services/userService')
var dataGenerator = require('../../dataGenerators/userGenerator')
var sinon = require('sinon')
var jwt = require('jwt-simple')
var moment = require('moment')

describe('authMiddleware', () =>
{
  describe('always', () => {

    it('is Next called if auth request', sinon.test( function()
    {
      var requestStub = this.stub()
      var responseStub = this.stub()
      var nextStub = this.stub()

      requestStub.path = '/api/auth'

      authMiddleware(requestStub, responseStub, nextStub)

      expect(nextStub.called).is.true
    }))

    it('is Forbidden if token not present', sinon.test( function()
    {
      var requestStub = this.stub()
      var responseStub = this.stub()
      var responseStatusStub = this.stub()
      var responseSendParentStub = this.stub()
      var responseSendStub = this.stub()
      var nextStub = this.stub()

      responseStub.status = responseStatusStub
      responseStatusStub.returns(responseSendParentStub)
      responseSendParentStub.send = responseSendStub

      requestStub.headers = []
      requestStub.headers['x-auth'] = null

      authMiddleware(requestStub, responseStub, nextStub)

      expect(responseStatusStub.calledWith(403)).is.true
      expect(responseSendStub.calledWith('no x-auth token present')).is.true
    }))

    it('is Forbidden if token expired', sinon.test( function()
    {
      var jwtMock = this.mock(jwt)

      var requestStub = this.stub()
      var responseStub = this.stub()
      var responseStatusStub = this.stub()
      var responseSendParentStub = this.stub()
      var responseSendStub = this.stub()
      var nextStub = this.stub()

      responseStub.status = responseStatusStub
      responseStatusStub.returns(responseSendParentStub)
      responseSendParentStub.send = responseSendStub

      requestStub.headers = []
      requestStub.headers['x-auth'] = 'this_is_a_token'

      jwtMock.expects('decode').once().returns( { expires : Date.now()})

      authMiddleware(requestStub, responseStub, nextStub)

      expect(responseStatusStub.calledWith(403)).is.true
      expect(responseSendStub.calledWith('Access token has expired')).is.true
    }))

    it('is Forbidden if error retrieving user', sinon.test( function()
    {
      var jwtMock = this.mock(jwt)
      var userServiceMock = this.mock(userService)

      var requestStub = this.stub()
      var responseStub = this.stub()
      var responseStatusStub = this.stub()
      var responseSendParentStub = this.stub()
      var responseSendStub = this.stub()
      var nextStub = this.stub()

      responseStub.status = responseStatusStub
      responseStatusStub.returns(responseSendParentStub)
      responseSendParentStub.send = responseSendStub

      requestStub.headers = []
      requestStub.headers['x-auth'] = 'this_is_a_token'

      jwtMock.expects('decode').once().returns( { expires : moment().add(1, 'days') })
      userServiceMock.expects('getUserByUsername').once().yields( { statusCode : 500, payload : 'There was a big error' })

      authMiddleware(requestStub, responseStub, nextStub)

      expect(responseStatusStub.calledWith(403)).is.true
      expect(responseSendStub.calledWith('There was a big error')).is.true
    }))

    it('is Next called and user set in session if user located', sinon.test( function()
    {
      var jwtMock = this.mock(jwt)
      var userServiceMock = this.mock(userService)

      var requestStub = this.stub()
      var responseStub = this.stub()
      var responseStatusStub = this.stub()
      var responseSendParentStub = this.stub()
      var responseSendStub = this.stub()
      var nextStub = this.stub()

      responseStub.status = responseStatusStub
      responseStatusStub.returns(responseSendParentStub)
      responseSendParentStub.send = responseSendStub

      requestStub.headers = []
      requestStub.headers['x-auth'] = 'this_is_a_token'

      var expectedUser = dataGenerator.createValidUser()

      jwtMock.expects('decode').once().returns( { expires : moment().add(1, 'days') })
      userServiceMock.expects('getUserByUsername').once().yields( { statusCode : 200, payload : expectedUser })

      authMiddleware(requestStub, responseStub, nextStub)

      expect(nextStub.called).is.true
      expect(JSON.stringify(requestStub.user)).to.equal(JSON.stringify(expectedUser))
    }))
  })
})
