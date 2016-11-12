var chai = require('chai')
var expect = chai.expect
var authService = require('../../../../../controllers/api/services/authService')
var userValidation = require('../../../../../controllers/api/validators/userValidator')
var userService = require('../../../../../controllers/api/services/userService')
var hasher = require('../../../../../helpers/hasher')
var jwt = require('jwt-simple')
var moment = require('moment')
var sinon = require('sinon')

describe('authService', () => {

  describe('createToken', () => {

    it('is BadRequest if invalid request', sinon.test(function(done) {

      var userValidationMock = this.mock(userValidation)

      userValidationMock.expects('validateAuth').once().returns( { isValid : false, error : 'There is an error' })

      authService.createToken({}, function(response) {
        expect(response.statusCode).to.equal(400)
        expect(response.payload).to.equal('There is an error')
        done()
      })
    }))

    it('is InternalServerError if GetUserByUsername fails', sinon.test(function(done)
    {
      var userValidationMock = this.mock(userValidation)
      var userServiceMock = this.mock(userService)

      userValidationMock.expects('validateAuth').once().returns( { isValid : true, error : '' })
      userServiceMock.expects('getUserByUsername').once().yields({ statusCode : 500, payload : 'Error when retrieving user'})

      authService.createToken({ username : 'username', password : 'password'}, function(response) {
        expect(response.statusCode).to.equal(500)
        expect(response.payload).to.equal('Error when retrieving user')
        done()
      })
    }))

    it('is InternalServerError if hasher fails', sinon.test(function(done)
    {
      var userValidationMock = this.mock(userValidation)
      var userServiceMock = this.mock(userService)
      var hasherMock = this.mock(hasher)

      userValidationMock.expects('validateAuth').once().returns( { isValid : true, error : '' })
      userServiceMock.expects('getUserByUsername').once().yields({ statusCode : 200, payload : ''})
      hasherMock.expects('compare').once().yields({ error : 'The hasher failed badly!'}, null)

      authService.createToken({ username : 'username', password : 'password'}, function(response) {
        expect(response.statusCode).to.equal(500)
        expect(response.payload.error).to.equal('The hasher failed badly!')
        done()
      })
    }))

    it('is BadRequest if password incorrect', sinon.test(function(done)
    {
      var userValidationMock = this.mock(userValidation)
      var userServiceMock = this.mock(userService)
      var hasherMock = this.mock(hasher)

      userValidationMock.expects('validateAuth').once().returns( { isValid : true, error : '' })
      userServiceMock.expects('getUserByUsername').once().yields({ statusCode : 200, payload : ''})
      hasherMock.expects('compare').once().yields(null, false)

      authService.createToken({ username : 'username', password : 'password'}, function(response) {
        expect(response.statusCode).to.equal(400)
        expect(response.payload).to.equal('incorrect password supplied for username username')
        done()
      })
    }))

    it('is correct token expiration date passed to token generator', sinon.test(function(done)
    {
      var userValidationMock = this.mock(userValidation)
      var userServiceMock = this.mock(userService)
      var hasherMock = this.mock(hasher)
      var jwtMock = this.mock(jwt)

      userValidationMock.expects('validateAuth').once().returns( { isValid : true, error : '' })
      userServiceMock.expects('getUserByUsername').once().yields({ statusCode : 200, payload : ''})
      hasherMock.expects('compare').once().yields(null, true)
      jwtMock.expects('encode').once().withArgs(matchesExpirationExpectation, sinon.match.any).returns( { token : 'nice_token'})

      authService.createToken({ username : 'username', password : 'password'}, function(response) {
        jwtMock.verify()
        done()
      })
    }))


    it('is OK when password valid', sinon.test(function(done)
    {
      var userValidationMock = this.mock(userValidation)
      var userServiceMock = this.mock(userService)
      var hasherMock = this.mock(hasher)
      var jwtMock = this.mock(jwt)

      userValidationMock.expects('validateAuth').once().returns( { isValid : true, error : '' })
      userServiceMock.expects('getUserByUsername').once().yields({ statusCode : 200, payload : ''})
      hasherMock.expects('compare').once().yields(null, true)
      jwtMock.expects('encode').once().returns( { token : 'nice_token'})

      authService.createToken({ username : 'username', password : 'password'}, function(response) {
        expect(response.statusCode).to.equal(200)
        expect(response.payload.token).to.equal('nice_token')
        done()
      })
    }))


    it('is internalServerError on error', sinon.test(function(done)
    {
      var userValidationMock = this.mock(userValidation)
      var userServiceMock = this.mock(userService)
      var hasherMock = this.mock(hasher)
      var jwtMock = this.mock(jwt)

      userValidationMock.expects('validateAuth').once().returns( { isValid : true, error : '' })
      userServiceMock.expects('getUserByUsername').once().yields({ statusCode : 200, payload : ''})
      hasherMock.expects('compare').once().yields(null, true)
      jwtMock.expects('encode').once().throws({ error : 'a very large error' })

      authService.createToken({ username : 'username', password : 'password'}, function(response) {
        expect(response.statusCode).to.equal(500)
        expect(response.payload.error).to.equal('a very large error')
        done()
      })
    }))


    var matchesExpirationExpectation = sinon.match(function (value) {
        var actualDays = moment(value.expires).date()
        var expectedDays = moment().add(7, 'days').date()

        return actualDays == expectedDays
    }, "Expecting 7 days expiration");

  })
})
