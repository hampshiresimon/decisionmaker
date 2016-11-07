
var validator = {

    validate : function (body)
    {
        var isValid = true;
        var validationError = ''
        if (!body.username || body.username == '') {
            isValid = false
            validationError = 'username cannot be an empty string\n'
        }

        if (!body.password || body.password == '') {
            isValid = false;
            validationError = validationError.concat('password cannot be an empty string\n')
        }

        if (!body.firstName || body.firstName == '') {
            isValid = false;
            validationError = validationError.concat('firstName cannot be an empty string\n')
        }

        if (!body.lastName || body.lastName == '') {
            isValid = false;
            validationError = validationError.concat('lastName cannot be an empty string\n')
        }

        if (!body.email || body.email == '') {
            isValid = false;
            validationError = validationError.concat('email cannot be an empty string\n')
        }

        return {
            isValid: isValid,
            error: validationError
        }
    },
    validateAuth : function(body)
    {
        var isValid = true;
        var validationError = ''
        if (!body.username || body.username == '') {
            isValid = false
            validationError = 'username cannot be an empty string\n'
        }

        if (!body.password || body.password == '') {
            isValid = false;
            validationError = validationError.concat('password cannot be an empty string\n')
        }

        return {
            isValid: isValid,
            error: validationError
        }
    }
}

module.exports = validator
