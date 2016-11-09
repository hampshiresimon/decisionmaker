import {expect} from 'chai';
import { givenAsync } from 'mocha-testdata';
var userService = require('../../../../../controllers/api/services/userService')
var userValidation = require('../../../../../controllers/api/validators/userValidator')
var hasher = require('../../../../../helpers/hasher')
var dataCollections = require('../../../../../helpers/dataCollections')
var sinon = require('sinon')

describe('userService', () => {

  describe('createNewUser', () => {

    it('is BadRequest if invalid request', sinon.test(function(done) {

      var userValidationMock = this.mock(userValidation)

      userValidationMock.expects('validate').once().returns( { isValid : false, error : 'There is an error' })

      userService.createNewUser({ firstName : 'Bob', lastName : 'Harris' }, function(response) {
        expect(response.statusCode).to.equal(400)
        expect(response.payload).to.equal('There is an error')
        done()
      })
    }))

    it('is InternalServerError if hasher fails', sinon.test(function(done) {

      var userValidationMock = this.mock(userValidation)
      var hasherMock = this.mock(hasher)

      userValidationMock.expects('validate').once().returns( { isValid : true, error : null })
      hasherMock.expects('hash').once().yields({ error : 'The hasher has a big error'}, null)

      userService.createNewUser({ firstName : 'Bob', lastName : 'Harris' }, function(response) {
        expect(response.statusCode).to.equal(500)
        expect(response.payload.error).to.equal('The hasher has a big error')
        done()
      })
    }))

    it('is sent to the database if hasher succeeds', sinon.test(function(done)
    {
      var userValidationMock = this.mock(userValidation)
      var hasherMock = this.mock(hasher)
      var dataCollectionsMock = this.mock(dataCollections)

      var collectionInsertStub = this.stub()
      var databaseCloseStub = this.stub()

      userValidationMock.expects('validate').once().returns( { isValid : true, error : null })
      hasherMock.expects('hash').once().yields(null, 'hashedPassword')
      dataCollectionsMock.expects('getUsers').once().returns( { collection : { insert : collectionInsertStub }, database : { close : databaseCloseStub } })
      collectionInsertStub.yields({ error : 'error inserting records' }, null)

      var user = createTestUser()
      var expectedUser = createTestUser()
      expectedUser.password = 'hashedPassword'

      userService.createNewUser(user, function(response) {
        expect(collectionInsertStub.calledWith(sinon.match( function( calledUser ) { return  JSON.stringify(calledUser) == JSON.stringify(expectedUser) }, 'Not the expected user for insertion'), sinon.match.any)).is.true
        done()
      })
    }))

    givenAsync({ error : 'error inserting records' }, null).it('is closes database after inserting user', sinon.test( function (done, err)
    {
      var userValidationMock = this.mock(userValidation)
      var hasherMock = this.mock(hasher)
      var dataCollectionsMock = this.mock(dataCollections)

      var collectionInsertStub = this.stub()
      var databaseCloseStub = this.stub()

      userValidationMock.expects('validate').once().returns( { isValid : true, error : null })
      hasherMock.expects('hash').once().yields(null, 'hashedPassword')
      dataCollectionsMock.expects('getUsers').once().returns( { collection : { insert : collectionInsertStub }, database : { close : databaseCloseStub } })
      collectionInsertStub.yields(err, null)

      var user = createTestUser()

      userService.createNewUser(user, function(response) {
        expect(databaseCloseStub.called).is.true
        done()
      })
    }))

    it('is InternalServerError if user insertion fails', sinon.test(function(done)
    {
      var userValidationMock = this.mock(userValidation)
      var hasherMock = this.mock(hasher)
      var dataCollectionsMock = this.mock(dataCollections)

      var collectionInsertStub = this.stub()
      var databaseCloseStub = this.stub()

      userValidationMock.expects('validate').once().returns( { isValid : true, error : null })
      hasherMock.expects('hash').once().yields(null, 'hashedPassword')
      dataCollectionsMock.expects('getUsers').once().returns( { collection : { insert : collectionInsertStub }, database : { close : databaseCloseStub } })
      collectionInsertStub.yields({ error : 'error inserting records' }, null)

      var user = createTestUser()

      userService.createNewUser(user, function(response) {
        expect(response.statusCode).to.equal(500)
        expect(response.payload.error).to.equal('error inserting records')
        done()
      })
    }))

    it('is Created if user insertion succeeds', sinon.test(function(done)
    {
      var userValidationMock = this.mock(userValidation)
      var hasherMock = this.mock(hasher)
      var dataCollectionsMock = this.mock(dataCollections)

      var collectionInsertStub = this.stub()
      var databaseCloseStub = this.stub()

      userValidationMock.expects('validate').once().returns( { isValid : true, error : null })
      hasherMock.expects('hash').once().yields(null, 'hashedPassword')
      dataCollectionsMock.expects('getUsers').once().returns( { collection : { insert : collectionInsertStub }, database : { close : databaseCloseStub } })
      collectionInsertStub.yields(null, null)

      var user = createTestUser()
      var expectedUser = createTestUser()
      expectedUser.password = 'hashedPassword'

      userService.createNewUser(user, function(response) {
        expect(response.statusCode).to.equal(201)
        expect( JSON.stringify(response.payload) == JSON.stringify(expectedUser)).is.true
        done()
      })
    }))

    function createTestUser()
    {
      return {
        firstName : 'firstName1',
        lastName : 'lastName1',
        username : 'username1',
        password : 'password1',
        email : 'email'
      }
    }
  })

  describe('listAllUsers', () => {

    it('is BadRequest if invalid request', sinon.test(function(done) {

/*
      var userValidationMock = this.mock(userValidation)

      userValidationMock.expects('validate').once().returns( { isValid : false, error : 'There is an error' })

      userService.createNewUser({ firstName : 'Bob', lastName : 'Harris' }, function(response) {
        expect(response.statusCode).to.equal(400)
        expect(response.payload).to.equal('There is an error')
        done()
      })
      */
    }))
  })
})
