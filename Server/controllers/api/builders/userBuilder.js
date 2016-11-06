var User = require('../../../models/user')
var hasher = require('../../../helpers/hasher')


var userBuilder = {

    build: function (body, callback) {

        var user = User(
        {
            username: body.username,
            email: body.email,
            firstName: body.firstName,
            lastName: body.lastName
        })

        hasher.hash(body.password, function (err, password) {
            user.password = password
            callback(err, user)
        });
    }
}

module.exports = userBuilder
