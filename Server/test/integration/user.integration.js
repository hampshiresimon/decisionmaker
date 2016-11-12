var chai = require('chai');
var expect = chai.expect
var chaiHttp = require('chai-http');
chai.use(chaiHttp);

var server = require('../../server')
var dataCollections = require('../../helpers/dataCollections')

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
          .send( { firstName : 'firstName_test', lastName : 'lastName_test' })
          .end((err, res) => {

            expect(res).to.have.status(400);
            expect(res.text).to.contain('username cannot be an empty string')
            expect(res.text).to.contain('password cannot be an empty string')
            expect(res.text).to.contain('email cannot be an empty string')

            done();
          });
    })

    it('is Created when new a new user is created', function(done)
    {
      // drop the user collection
      var users = dataCollections.getUsers().collection;
      users.drop()

      chai.request(server.app)
          .post('/api/users')
          .send( createValidUser() )
          .end((err, res) => {

            expect(res).to.have.status(201);

            expect(res.body).to.not.be.empty
            expect(res.body.firstName).to.not.be.empty
            expect(res.body.lastName).to.not.be.empty
            expect(res.body.username).to.not.be.empty
            expect(res.body.password).to.not.be.empty
            expect(res.body.email).to.not.be.empty
            expect(res.body._id).to.not.be.empty

            done();
          });
    })

    function createValidUser()
    {
      return {
        firstName : 'firstName_test',
        lastName : 'lastName_test',
        username : 'username_test',
        password : 'password_test',
        email : 'email_test'
      }
    }

  })
})
