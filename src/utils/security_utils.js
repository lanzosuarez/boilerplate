const jwt = require('jsonwebtoken'),
    passwordGenerator = require('generate-password'),
    bcrypt = require('bcrypt'),
    { CODE_FORBIDDEN } = require('../globals/globals'),
    User = require('../models/user'),
    Client = require('../models/client'),
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
        then(data => data).catch(err => err);
};

//generate JWT access token
exports.generateAppAccessToken = (payload) => {
    let key = "dsds";
    return jwt.sign(payload, key, { expiresIn: '365d' });
};

const
    findUser = (_id) => {
        return User.findById(_id).
            then(data => {
                return data;
            }).catch(err => {
                console.log(err);
            });
    },

    findClient = (_id) => {
        return Client.findById(_id).
            then(data => {
                return data;
            }).catch(err => {
                console.log(err);
            });
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

                const { permission_level, _id } = tokenData;

                if (permission_level) {
                    findUser(_id).
                        then(data => {
                            if (data !== null) {
                                return next();
                            } else {
                                sendResponse(
                                    res,
                                    403,
                                    "",
                                    "Invalid User"
                                );
                            }
                        }).catch(err => {
                            console.log(err);
                        });
                } else {
                    findClient(_id).
                        then(data => {
                            if (data !== null) {
                                return next();
                            } else {
                                sendResponse(
                                    res,
                                    403,
                                    "",
                                    "Invalid User"
                                );
                            }
                        }).catch(err => {
                            console.log(err);
                        });
                }
            }
            else {
                sendResponse(
                    res,
                    403,
                    "",
                    "Invalid token"
                );
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