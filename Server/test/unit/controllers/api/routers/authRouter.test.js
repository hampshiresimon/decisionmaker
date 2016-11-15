chai = require('chai')
var expect = chai.expect
var authService = require('../../../../../controllers/api/services/authService')
var authRouter = require('../../../../../controllers/api/routers/authRouter')
var sinon = require('sinon')

describe('authRouter', () =>
{
  describe('postRoute', () => {

    it('is BadRequest if request invalid', sinon.test( function()
    {
      var authServiceMock = this.mock(authService)

      var requestStub = this.stub()
      var responseStub = this.stub()
      var responseStatusStub = this.stub()
      var responseSendParentStub = this.stub()
      var responseSendStub = this.stub()
      var nextStub = this.stub()

      responseStub.status = responseStatusStub
      responseStatusStub.returns(responseSendParentStub)
      responseSendParentStub.send = responseSendStub

      authServiceMock.expects('createToken').once().yields( { statusCode : 400, payload : 'Completely invalid request'})

      authRouter.postRoute(requestStub, responseStub, nextStub)

      expect(responseStatusStub.calledWith(400)).is.true
      expect(responseSendStub.calledWith('Completely invalid request')).is.true
    }))

    it('is InternalServerError if request fails', sinon.test( function()
    {
      var authServiceMock = this.mock(authService)

      var requestStub = this.stub()
      var responseStub = this.stub()
      var nextStub = this.stub()

      authServiceMock.expects('createToken').once().yields( { statusCode : 500, payload : 'A very important error occurred'})

      authRouter.postRoute(requestStub, responseStub, nextStub)

      expect(nextStub.called).is.true
    }))

    it('is NotFound if request username is not found', sinon.test( function()
    {
      var authServiceMock = this.mock(authService)

      var requestStub = this.stub()
      var responseStub = this.stub()
      var responseStatusStub = this.stub()
      var responseSendParentStub = this.stub()
      var responseSendStub = this.stub()
      var nextStub = this.stub()

      responseStub.status = responseStatusStub
      responseStatusStub.returns(responseSendParentStub)
      responseSendParentStub.send = responseSendStub

      authServiceMock.expects('createToken').once().yields( { statusCode : 404, payload : 'Username not found'})

      authRouter.postRoute(requestStub, responseStub, nextStub)

      expect(responseStatusStub.calledWith(404)).is.true
      expect(responseSendStub.calledWith('Username not found')).is.true
    }))

    it('is Ok if request is valid', sinon.test( function()
    {
      var authServiceMock = this.mock(authService)

      var requestStub = this.stub()
      var responseStub = this.stub()
      var responseStatusStub = this.stub()
      var responseJsonParentStub = this.stub()
      var responseJsonStub = this.stub()
      var nextStub = this.stub()

      responseStub.status = responseStatusStub
      responseStatusStub.returns(responseJsonParentStub)
      responseJsonParentStub.json = responseJsonStub

      authServiceMock.expects('createToken').once().yields( { statusCode : 200, payload : 'this_is_a_token'})

      authRouter.postRoute(requestStub, responseStub, nextStub)

      expect(responseStatusStub.calledWith(200)).is.true
      expect(responseJsonStub.calledWith('this_is_a_token')).is.true
    }))
  })
})
