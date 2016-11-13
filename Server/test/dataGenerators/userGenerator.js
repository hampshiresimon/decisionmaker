
var userGenerator = {

  createValidUser : function()
  {
    return {
      firstName : 'firstName_test',
      lastName : 'lastName_test',
      username : 'username_test',
      password : 'password_test',
      email : 'email_test'
    }
  },

  createInvalidUser : function()
  {
    return {
      firstName : 'firstName_test',
      lastName : 'lastName_test'
    }
  },

  createValidLoginUser : function()
  {
    return {
      username : 'username_test',
      password : 'password_test'
    }
  },

  createInvalidLoginUser : function()
  {
    return {
      username : 'username_test',
      password : null
    }
  },
}

module.exports = userGenerator
