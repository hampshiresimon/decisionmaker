var bcrypt = require('bcrypt')

var hasher = {

    hash: function (toHash, onComplete) {

        bcrypt.hash(toHash, 10, onComplete);
    },

    compare: function (suppliedPassword, actualPassword, callback) {

        bcrypt.compare(suppliedPassword, actualPassword, callback);
    }
}

module.exports = hasher