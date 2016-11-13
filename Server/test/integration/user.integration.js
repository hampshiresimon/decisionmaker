var chai = require('chai');
var expect = chai.expect
var chaiHttp = require('chai-http');
chai.use(chaiHttp);

var server = require('../../server')
var dataCollections = require('../../helpers/dataCollections')
var userGenerator = require('../dataGenerators/userGenerator')

describe('user', () => {

  after(function() {
      server.server.close()
    });

  describe('/POST', () => {

    it('is BadRequest when new user validation fails', function(done)
    {
      // drop the user collection
      var users = dataCollections.getUsers().collection;
      users.drop()

      chai.request(server.app)
          .post('/api/users')
          .send(userGenerator.createInvalidUser())
          .end((err, res) => {

            expect(res).to.have.status(400);
            expect(res.text).to.contain('username cannot be an empty string')
            expect(res.text).to.contain('password cannot be an empty string')
            expect(res.text).to.contain('email cannot be an empty string')

            done()
          })
    })

    it('is Created when new a new user is created', function(done)
    {
      // drop the user collection
      var users = dataCollections.getUsers().collection;
      users.drop()

      chai.request(server.app)
          .post('/api/users')
          .send(userGenerator.createValidUser())
          .end((err, res) => {

            expect(res).to.have.status(201);

            expect(res.body).to.not.be.empty
            expect(res.body.firstName).to.not.be.empty
            expect(res.body.lastName).to.not.be.empty
            expect(res.body.username).to.not.be.empty
            expect(res.body.password).to.not.be.empty
            expect(res.body.email).to.not.be.empty
            expect(res.body._id).to.not.be.empty

            done()
          })
    })
  })

  describe('/GET', () => {

    it('is Forbidden if no auth token provided', function(done)
    {
      // drop the user collection
      var users = dataCollections.getUsers().collection;
      users.drop()

      var user = userGenerator.createValidUser()

      chai.request(server.app)
          .post('/api/users')
          .send(user)
          .end((err, res) => {

            expect(res).to.have.status(201);

            chai.request(server.app)
                .get('/api/users')
                .send(user)
                .end((userErr, userRes) => {
                  expect(userRes).to.have.status(403)
                  expect(userRes.text).to.equal('no x-auth token present')
                  done()
                })

          })
    })

    it('is Forbidden if invalid token used', function(done)
    {
      // drop the user collection
      var users = dataCollections.getUsers().collection;
      users.drop()

      var user = userGenerator.createValidUser()
      var userLogin = userGenerator.createValidLoginUser();

      chai.request(server.app)
          .post('/api/users')
          .send(user)
          .end((err, res) => {

            expect(res).to.have.status(201);

            chai.request(server.app)
                .post('/api/auth')
                .send(userLogin)
                .end((authErr, authRes) => {

                  expect(authRes).to.have.status(200)
                  expect(authRes.text).to.not.be.empty

                  chai.request(server.app)
                      .get('/api/users')
                      .set('x-auth', 'invalid_token')
                      .end((userErr, userRes) => {

                        expect(userRes).to.have.status(403)
                        expect(userRes.text).to.equal('invalid x-auth token')
                        done()
                      })
                })
          })
    })


    it('is Ok if valid token used', function(done)
    {
      // drop the user collection
      var users = dataCollections.getUsers().collection;
      users.drop()

      var user = userGenerator.createValidUser()
      var userLogin = userGenerator.createValidLoginUser();

      chai.request(server.app)
          .post('/api/users')
          .send(user)
          .end((err, res) => {

            expect(res).to.have.status(201);

            chai.request(server.app)
                .post('/api/auth')
                .send(userLogin)
                .end((authErr, authRes) => {

                  expect(authRes).to.have.status(200)
                  expect(authRes.text).to.not.be.empty

                  chai.request(server.app)
                      .get('/api/users')
                      .set('x-auth', authRes.body)
                      .end((userErr, userRes) => {

                        expect(userRes).to.have.status(200)
                        expect(userRes.body.username).to.equal(user.username)
                        done()
                      })
                })
          })
    })
  })
})
