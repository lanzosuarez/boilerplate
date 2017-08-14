const jwt = require('jsonwebtoken'),
    passwordGenerator = require('generate-password'),
    bcrypt = require('bcrypt'),
    { CODE_FORBIDDEN } = require('../globals/globals'),
    { sendResponse } = require('./helper_utils');


//for hashing password
exports.hashPassword = (password) => {
    saltRounds = 10;
    return bcrypt.hash(password, saltRounds).
        then(data => data).catch(err => {
            throw err
        });
};

//for comparing passwords

exports.comparePasswords = (passedPassword, storedPassword) => {
    console.log(passedPassword, storedPassword);
    return bcrypt.compare(passedPassword, storedPassword).
        then(onData).catch(onError);
};

//generate JWT access token
exports.generateAppAccessToken = (payload) => {
    let key = "dsds";
    return jwt.sign(payload, key, { expiresIn: '365d' });
};

//validate JWT access token
exports.validateAppToken = (req, res, next) => {
    // console.log(req.headers);
    var
        token = req.headers['x-access-token'] || undefined,


        key = "dsds",
        //jwt verify callback
        verifyCb = (err, tokenData) => {
            if (!err) {
                req.token_info = tokenData;
                return next();
            }
            else {
                sendForbidden(res);
            }
        };

    // console.log(token)
    if (token) {
        jwt.verify(token, key, verifyCb);
    }
    else {
        sendResponse(
            res,
            403,
            CODE_FORBIDDEN,
            "Invalid access token"
        );
    }
};

exports.decodeToken = (token) => {
    return jwt.decode(token);
}

//generate random password
exports.generateRandomPassword = function (strLength) {
    let password = passwordGenerator.generate({ length: strLength, numbers: true });
    return password;
};