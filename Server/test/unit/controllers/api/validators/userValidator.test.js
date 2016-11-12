var chai = require('chai')
var expect = chai.expect
var validator = require('../../../../../controllers/api/validators/userValidator')

describe('userValidation', () => {

  describe('validate', () => {

    function validUser() {
      return {
        username : 'user1',
        password : 'password1',
        firstName : 'first',
        lastName : 'last',
        email : 'name@email.com'
      };
    }

    it('accepts valid', () => {
      var response = validator.validate(validUser());

      expect(response.isValid).to.equal(true)
    });

    it('validates username when missing', () => {
      var user = validUser();
      delete user.username;

      var response = validator.validate(user);
      expect(response.isValid).to.equal(false)
      expect(response.error).to.contain('username cannot be an empty string\n')
    })

    it('validates username when empty', () => {
      var user = validUser();
      user.username = '';

      var response = validator.validate(user);
      expect(response.isValid).to.equal(false)
      expect(response.error).to.contain('username cannot be an empty string\n')
    })

    it('validates password when missing', () => {
      var user = validUser();
      delete user.password;

      var response = validator.validate(user);
      expect(response.isValid).to.equal(false)
      expect(response.error).to.contain('password cannot be an empty string\n')
    })

    it('validates password when empty', () => {
      var user = validUser();
      user.password = '';

      var response = validator.validate(user);
      expect(response.isValid).to.equal(false)
      expect(response.error).to.contain('password cannot be an empty string\n')
    })

    it('validates firstName when missing', () => {
      var user = validUser();
      delete user.firstName;

      var response = validator.validate(user);
      expect(response.isValid).to.equal(false)
      expect(response.error).to.contain('firstName cannot be an empty string\n')
    })

    it('validates firstName when empty', () => {
      var user = validUser();
      user.firstName = '';

      var response = validator.validate(user);
      expect(response.isValid).to.equal(false)
      expect(response.error).to.contain('firstName cannot be an empty string\n')
    })

    it('validates lastName when missing', () => {
      var user = validUser();
      delete user.lastName;

      var response = validator.validate(user);
      expect(response.isValid).to.equal(false)
      expect(response.error).to.contain('lastName cannot be an empty string\n')
    })

    it('validates lastName when empty', () => {
      var user = validUser();
      user.lastName = '';

      var response = validator.validate(user);
      expect(response.isValid).to.equal(false)
      expect(response.error).to.contain('lastName cannot be an empty string\n')
    })

    it('validates email when missing', () => {
      var user = validUser();
      delete user.email;

      var response = validator.validate(user);
      expect(response.isValid).to.equal(false)
      expect(response.error).to.contain('email cannot be an empty string\n')
    })

    it('validates email when empty', () => {
      var user = validUser();
      user.email = '';

      var response = validator.validate(user);
      expect(response.isValid).to.equal(false)
      expect(response.error).to.contain('email cannot be an empty string\n')
    })
  })

  describe('validateAuth', () => {

    function validAuth() {
      return {
        username : 'user1',
        password : 'password1',
      };
    }



    it('accepts valid', () => {
      var response = validator.validateAuth(validAuth());

      expect(response.isValid).to.equal(true)
    });

    it('validates username when missing', () => {
      var auth = validAuth();
      delete auth.username;

      var response = validator.validateAuth(auth);
      expect(response.isValid).to.equal(false)
      expect(response.error).to.contain('username cannot be an empty string\n')
    })

    it('validates username when empty', () => {
      var auth = validAuth();
      auth.username = '';

      var response = validator.validate(auth);
      expect(response.isValid).to.equal(false)
      expect(response.error).to.contain('username cannot be an empty string\n')
    })

    it('validates password when missing', () => {
      var auth = validAuth();
      delete auth.password;

      var response = validator.validate(auth);
      expect(response.isValid).to.equal(false)
      expect(response.error).to.contain('password cannot be an empty string\n')
    })

    it('validates password when empty', () => {
      var auth = validAuth();
      auth.password = '';

      var response = validator.validate(auth);
      expect(response.isValid).to.equal(false)
      expect(response.error).to.contain('password cannot be an empty string\n')
    })
  })
});
