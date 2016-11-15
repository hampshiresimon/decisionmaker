chai = require('chai')
var expect = chai.expect
var errorMiddleware = require('../../../middleware/error')
var logger = require('../../../helpers/logger')
var config = require('../../../config')
var sinon = require('sinon')


describe('errorMiddleware', () =>
{
  describe('always', () => {

    it('is NotFound server error with correct response if development env and error contains status', sinon.test( function()
    {
      var loggerMock = this.mock(logger)
      var configMock = this.mock(config)

      var requestStub = this.stub()
      var responseStub = this.stub()
      var responseStatusStub = this.stub()
      var responseJsonParentStub = this.stub()
      var responseJsonStub = this.stub()
      var nextStub = this.stub()

      var error = { message : 'ooh - error', id : 44, status : 404 }

      responseStub.status = responseStatusStub
      responseStatusStub.returns(responseJsonParentStub)
      responseJsonParentStub.json = responseJsonStub

      loggerMock.expects('error').once()
      configMock.expects('getConfig').once().returns({environment : 'development'})

      errorMiddleware(error, requestStub, responseStub, nextStub)

      loggerMock.verify()

      expect(responseStatusStub.calledWith(404)).is.true
      expect(responseJsonStub.calledWith(sinon.match( function(returnedError) { return  returnedError.message == error.message && JSON.stringify(returnedError.error) == JSON.stringify(error)}, 'Not the expected error details'))).is.true
    }))

    it('is InternalServerError with correct response if development env and error does not contain status', sinon.test( function()
    {
      var loggerMock = this.mock(logger)
      var configMock = this.mock(config)

      var requestStub = this.stub()
      var responseStub = this.stub()
      var responseStatusStub = this.stub()
      var responseJsonParentStub = this.stub()
      var responseJsonStub = this.stub()
      var nextStub = this.stub()

      var error = { message : 'ooh - another bad error', id : 44 }

      responseStub.status = responseStatusStub
      responseStatusStub.returns(responseJsonParentStub)
      responseJsonParentStub.json = responseJsonStub

      loggerMock.expects('error').once()
      configMock.expects('getConfig').once().returns({environment : 'development'})

      errorMiddleware(error, requestStub, responseStub, nextStub)

      loggerMock.verify()

      expect(responseStatusStub.calledWith(500)).is.true
      expect(responseJsonStub.calledWith(sinon.match( function(returnedError) { return  returnedError.message == error.message && JSON.stringify(returnedError.error) == JSON.stringify(error)}, 'Not the expected error details'))).is.true
    }))



    it('is NotFound server error with correct response if production env and error contains status', sinon.test( function()
    {
      var loggerMock = this.mock(logger)
      var configMock = this.mock(config)

      var requestStub = this.stub()
      var responseStub = this.stub()
      var responseStatusStub = this.stub()
      var responseJsonParentStub = this.stub()
      var responseJsonStub = this.stub()
      var nextStub = this.stub()

      var error = { message : 'ooh - error', id : 44, status : 404 }

      responseStub.status = responseStatusStub
      responseStatusStub.returns(responseJsonParentStub)
      responseJsonParentStub.json = responseJsonStub

      loggerMock.expects('error').once()
      configMock.expects('getConfig').once().returns({environment : 'production'})

      errorMiddleware(error, requestStub, responseStub, nextStub)

      loggerMock.verify()

      expect(responseStatusStub.calledWith(404)).is.true
      expect(responseJsonStub.calledWith(sinon.match( function(returnedError) { return  returnedError.message == error.message && !returnedError.error}, 'Not the expected error details'))).is.true
    }))

    it('is InternalServerError with correct response if production env and error does not contain status', sinon.test( function()
    {
      var loggerMock = this.mock(logger)
      var configMock = this.mock(config)

      var requestStub = this.stub()
      var responseStub = this.stub()
      var responseStatusStub = this.stub()
      var responseJsonParentStub = this.stub()
      var responseJsonStub = this.stub()
      var nextStub = this.stub()

      var error = { message : 'ooh - another bad error', id : 44 }

      responseStub.status = responseStatusStub
      responseStatusStub.returns(responseJsonParentStub)
      responseJsonParentStub.json = responseJsonStub

      loggerMock.expects('error').once()
      configMock.expects('getConfig').once().returns({environment : 'production'})

      errorMiddleware(error, requestStub, responseStub, nextStub)

      loggerMock.verify()

      expect(responseStatusStub.calledWith(500)).is.true
      expect(responseJsonStub.calledWith(sinon.match( function(returnedError) { return  returnedError.message == error.message && !returnedError.error}, 'Not the expected error details'))).is.true
    }))
  })
})
