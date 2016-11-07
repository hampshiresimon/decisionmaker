import {expect} from 'chai';
var authService = require('../../../../../controllers/api/services/authService')
var userValidation = require('../../../../../controllers/api/validators/userValidator')
var userService = require('../../../../../controllers/api/services/userService')
var sinon = require('sinon')
var userValidationMock = sinon.mock(userValidation)
var userServiceMock = sinon.mock(userService)

describe('authService', () => {

  before(function(){
    //sinon
     // .stub(userValidation, 'validateAuth', function() {return {isValid: "dfdffalse" }})
  })

  after(function(){
      userValidation.validateAuth.restore()
      userService.getUserByUsername.restore()
  })

  describe('createToken', () => {

    it('is BadRequest if invalid request', function(done) {

      userValidationMock.expects('validateAuth').once().returns( { isValid : false, error : 'There is an error' })

      authService.createToken({}, function(response) {
        expect(response.statusCode).to.equal(400)
        expect(response.payload).to.equal('There is an error')
        done()
      })

    })

    it('is InternalServerError if GetUserByUsername fails', function(done)
    {

      userValidationMock.expects('validateAuth').once().returns( { isValid : true, error : '' })
      userServiceMock.expects('getUserByUsername').once().yields({ statusCode : 500, payload : 'Error when retrieving user'})

      authService.createToken({ username : 'username', password : 'password'}, function(response) {
        expect(response.statusCode).to.equal(500)
        expect(response.payload).to.equal('Error when retrieving user')
        done()
      })

    })

  })
})
