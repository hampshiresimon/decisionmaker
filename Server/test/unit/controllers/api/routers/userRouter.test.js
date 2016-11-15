chai = require('chai')
var expect = chai.expect
var userService = require('../../../../../controllers/api/services/userService')
var userRouter = require('../../../../../controllers/api/routers/userRouter')
var dataGenerator = require('../../../../dataGenerators/userGenerator')
var sinon = require('sinon')

describe('userRouter', () =>
{
  describe('postRoute', () => {

    it('is BadRequest if request invalid', sinon.test( function()
    {
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

      userServiceMock.expects('createNewUser').once().yields( { statusCode : 400, payload : 'Completely invalid request'})

      userRouter.postRoute(requestStub, responseStub, nextStub)

      expect(responseStatusStub.calledWith(400)).is.true
      expect(responseSendStub.calledWith('Completely invalid request')).is.true
    }))

    it('is InternalServerError if request fails', sinon.test( function()
    {
      var userServiceMock = this.mock(userService)

      var requestStub = this.stub()
      var responseStub = this.stub()
      var nextStub = this.stub()

      userServiceMock.expects('createNewUser').once().yields( { statusCode : 500, payload : 'A very important error occurred'})

      userRouter.postRoute(requestStub, responseStub, nextStub)

      expect(nextStub.called).is.true
    }))

    it('is Created if request is valid', sinon.test( function()
    {
      var userServiceMock = this.mock(userService)

      var requestStub = this.stub()
      var responseStub = this.stub()
      var responseStatusStub = this.stub()
      var responseJsonParentStub = this.stub()
      var responseJsonStub = this.stub()
      var nextStub = this.stub()

      responseStub.status = responseStatusStub
      responseStatusStub.returns(responseJsonParentStub)
      responseJsonParentStub.json = responseJsonStub

      var expectedUser = dataGenerator.createValidUser()
      userServiceMock.expects('createNewUser').once().yields( { statusCode : 200, payload : expectedUser})

      userRouter.postRoute(requestStub, responseStub, nextStub)

      expect(responseStatusStub.calledWith(201)).is.true
      expect(responseJsonStub.calledWith(sinon.match( function( returnedUser ) { return  JSON.stringify(returnedUser) == JSON.stringify(expectedUser) }, 'Not the expected user details'))).is.true
    }))
  })


  describe('getRoute', () => {

    it('is Ok and returns user', sinon.test( function()
    {
      var expectedUser = dataGenerator.createValidUser()

      var requestStub = this.stub()
      var responseStub = this.stub()
      var responseStatusStub = this.stub()
      var responseJsonParentStub = this.stub()
      var responseJsonStub = this.stub()
      var nextStub = this.stub()

      requestStub.user = expectedUser
      responseStub.status = responseStatusStub
      responseStatusStub.returns(responseJsonParentStub)
      responseJsonParentStub.json = responseJsonStub

      userRouter.getRoute(requestStub, responseStub, nextStub)

      expect(responseStatusStub.calledWith(200)).is.true
      expect(responseJsonStub.calledWith(sinon.match( function( returnedUser ) { return  JSON.stringify(returnedUser) == JSON.stringify(expectedUser) }, 'Not the expected user details'))).is.true
    }))
  })
})
