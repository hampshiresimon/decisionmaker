var chai = require('chai');
var expect = chai.expect
var chaiHttp = require('chai-http');
chai.use(chaiHttp);

var server = require('../../server')
var dataCollections = require('../../helpers/dataCollections')
var userGenerator = require('../dataGenerators/userGenerator')

describe('auth', () => {

  after(function() {
      server.server.close()
    });

  describe('/POST', () => {

    it('is BadRequest when new login validation fails', function(done)
    {
      // drop the user collection
      var users = dataCollections.getUsers().collection;
      users.drop()

      chai.request(server.app)
          .post('/api/auth')
          .send(userGenerator.createInvalidLoginUser())
          .end((err, res) => {

            expect(res).to.have.status(400)
            expect(res.text).to.contain('password cannot be an empty string')

            done()
          })
    })

    it('is NotFound when incorrect username used', function(done)
    {
      var validUser = userGenerator.createValidUser()
      var validLoginUser = userGenerator.createValidLoginUser()

      // drop the user collection
      var users = dataCollections.getUsers().collection;
      users.drop()

      chai.request(server.app)
          .post('/api/users')
          .send(validUser)
          .end((err, res) => {

            expect(res).to.have.status(201)

            // update the username so the user can't be located
            validLoginUser.username = 'invalid_username'

            chai.request(server.app)
              .post('/api/auth')
              .send(validLoginUser)
              .end((authErr, authRes) => {

                expect(authRes).to.have.status(404);
                expect(authRes.text).to.contain('no user found with username ' + validLoginUser.username)

                done();
              })
          })
    })

    it('is NotFound when incorrect password used', function(done)
    {
      var validUser = userGenerator.createValidUser()
      var validLoginUser = userGenerator.createValidLoginUser()

      // drop the user collection
      var users = dataCollections.getUsers().collection;
      users.drop()

      chai.request(server.app)
          .post('/api/users')
          .send(validUser)
          .end((err, res) => {

            expect(res).to.have.status(201)

            // update the password so the user login is invalid
            validLoginUser.password = 'invalid_password'

            chai.request(server.app)
              .post('/api/auth')
              .send(validLoginUser)
              .end((authErr, authRes) => {

                expect(authRes).to.have.status(400);
                expect(authRes.text).to.contain('incorrect password supplied for username ' + validLoginUser.username)

                done();
              })
          })
    })

    it('is Ok and returns token when login details correct', function(done)
    {
      var validUser = userGenerator.createValidUser()
      var validLoginUser = userGenerator.createValidLoginUser()

      // drop the user collection
      var users = dataCollections.getUsers().collection;
      users.drop()

      chai.request(server.app)
          .post('/api/users')
          .send(validUser)
          .end((err, res) => {

            expect(res).to.have.status(201)

            chai.request(server.app)
              .post('/api/auth')
              .send(validLoginUser)
              .end((authErr, authRes) => {

                expect(authRes).to.have.status(200);
                expect(authRes.text).to.not.be.empty
                done(); 
              })
          })
    })
  })
})
