var chai = require('chai')
var expect = chai.expect

//import { givenAsync } from 'mocha-testdata';
var testdata = require('mocha-testdata')
var givenAsync = testdata.givenAsync
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

    givenAsync({ error : 'error inserting records' }, null).it('is closes database after selecting all users', sinon.test( function (done, err)
    {
      var dataCollectionsMock = this.mock(dataCollections)

      var collectionFindStub = this.stub()
      var databaseCloseStub = this.stub()

      dataCollectionsMock.expects('getUsers').once().returns( { collection : { find : collectionFindStub }, database : { close : databaseCloseStub } })
      collectionFindStub.yields(err, null)

      userService.listAllUsers(function(response) {
        expect(databaseCloseStub.called).is.true
        done()
      })
    }))

    it('is InternalServerError when selecting all users fails', sinon.test( function (done)
    {
      var dataCollectionsMock = this.mock(dataCollections)

      var collectionFindStub = this.stub()
      var databaseCloseStub = this.stub()

      dataCollectionsMock.expects('getUsers').once().returns( { collection : { find : collectionFindStub }, database : { close : databaseCloseStub } })
      collectionFindStub.yields({ error : 'Problems retrieving those pesky users'}, null)

      userService.listAllUsers(function(response) {
        expect(response.statusCode).to.equal(500)
        expect(response.payload.error).to.equal('Problems retrieving those pesky users')
        done()
      })
    }))

    it('is OK when selecting all users succeeds', sinon.test( function (done)
    {
      var dataCollectionsMock = this.mock(dataCollections)

      var collectionFindStub = this.stub()
      var databaseCloseStub = this.stub()

      var docs = { docName : 'my doc', data : 'some very important document data'}

      dataCollectionsMock.expects('getUsers').once().returns( { collection : { find : collectionFindStub }, database : { close : databaseCloseStub } })
      collectionFindStub.yields(null, docs)

      userService.listAllUsers(function(response) {
        expect(response.statusCode).to.equal(200)
        expect(JSON.stringify(response.payload) == JSON.stringify(docs)).is.true
        done()
      })
    }))
  })

  describe('getUserByUsername', () => {

    givenAsync(null, '').it('is BadRequest if username is null or empty', sinon.test( function (done, username)
    {
      userService.getUserByUsername(username, function(response) {
        expect(response.statusCode).to.equal(400)
        expect(response.payload).to.equal('username cannot be an empty string')
        done()
      })
    }))

    it('is passes correct username to database search', sinon.test( function(done)
    {
      var dataCollectionsMock = this.mock(dataCollections)

      var collectionFindOneStub = this.stub()
      var databaseCloseStub = this.stub()

      dataCollectionsMock.expects('getUsers').once().returns( { collection : { findOne : collectionFindOneStub }, database : { close : databaseCloseStub } })
      collectionFindOneStub.yields(null, null)

      var username = 'user_one'
      userService.getUserByUsername(username, function(response) {
        expect(collectionFindOneStub.calledWith(sinon.match( function( filter ) { return  filter.username == username }, 'Not the expected username for filtering'), sinon.match.any)).is.true
        done()
      })
    }))

    givenAsync({ error : 'error selecting records' }, null).it('is closes database after selecting user', sinon.test( function (done, err)
    {
      var dataCollectionsMock = this.mock(dataCollections)

      var collectionFindOneStub = this.stub()
      var databaseCloseStub = this.stub()

      dataCollectionsMock.expects('getUsers').once().returns( { collection : { findOne : collectionFindOneStub }, database : { close : databaseCloseStub } })
      collectionFindOneStub.yields(err, null)

      var username = 'user_one'
      userService.getUserByUsername(username, function(response) {
        expect(databaseCloseStub.called).is.true
        done()
      })
    }))

    it('is InternalServerError when selecting user fails', sinon.test( function(done)
    {
      var dataCollectionsMock = this.mock(dataCollections)

      var collectionFindOneStub = this.stub()
      var databaseCloseStub = this.stub()

      dataCollectionsMock.expects('getUsers').once().returns( { collection : { findOne : collectionFindOneStub }, database : { close : databaseCloseStub } })
      collectionFindOneStub.yields({ error : 'Oh dear - errors with finding one!'}, null)

      var username = 'user_one'
      userService.getUserByUsername(username, function(response) {
        expect(response.statusCode).to.equal(500)
        expect(response.payload.error).to.equal('Oh dear - errors with finding one!')
        done()
      })
    }))

    it('is NotFound when no user found', sinon.test( function(done)
    {
      var dataCollectionsMock = this.mock(dataCollections)

      var collectionFindOneStub = this.stub()
      var databaseCloseStub = this.stub()

      dataCollectionsMock.expects('getUsers').once().returns( { collection : { findOne : collectionFindOneStub }, database : { close : databaseCloseStub } })
      collectionFindOneStub.yields(null, null)

      var username = 'user_one'
      userService.getUserByUsername(username, function(response) {
        expect(response.statusCode).to.equal(404)
        expect(response.payload).to.equal('no user found with username ' + username)
        done()
      })
    }))

    it('is OK when user found', sinon.test( function(done)
    {
      var userDoc = { name : 'user', details : 'some user details'}
      var dataCollectionsMock = this.mock(dataCollections)

      var collectionFindOneStub = this.stub()
      var databaseCloseStub = this.stub()

      dataCollectionsMock.expects('getUsers').once().returns( { collection : { findOne : collectionFindOneStub }, database : { close : databaseCloseStub } })
      collectionFindOneStub.yields(null, userDoc)

      var username = 'user_one'
      userService.getUserByUsername(username, function(response) {
        expect(response.statusCode).to.equal(200)
        expect(JSON.stringify(response.payload) == JSON.stringify(userDoc)).is.true
        done()
      })
    }))
  })
})
