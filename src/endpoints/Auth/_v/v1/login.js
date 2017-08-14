
const
    User = require('../../../../models/user'),
    { generateAppAccessToken } = require('../../../../utils/security_utils'),
    { CODE_AUTH_ERROR, MSG_CONFLICT_ERROR } = require('../../../../globals/globals'),
    { sendError, sendSuccess, sendResponse } = require('../../../../utils/helper_utils');

module.exports = (req, res, next) => {

    //object destructure
    const { username, password } = req.body,

        comparePws = (storedPassword) => {
            console.log("password");
            return comparePasswords(password, storedPassword).
                then(data => {
                    return data;
                }).catch(err => {
                    throw err;
                });
        },

        generateToken = (user) => {
            return generateAppAccessToken(getPayload(user));
        },

        sendData = (data) => {
            sendSuccess(res, data, "Login Succesfull");
        },

        getPayload = (user) => {
            const { username, _id, permission_level, firstname, lastname, email } = user;
            return {
                username,
                _id,
                permission_level,
                firstname,
                lastname,
                email
            };
        },

        //login
        login = () => {
            return User.findOne({ username: username }).
                then(user => {
                    return user;
                }).catch(err => {
                    throw err;
                });
        };

    //invoke all your process here
    async function main() {
        try {
            var user = await login();
            if (user !== null) {
                var authenticate = await comparePws(user.password);
                if (authenticate === true) {
                    var token = generateToken(user),
                        payload = getPayload(user);

                    sendData({
                        token,
                        payload
                    });

                } else {
                    sendResponse(
                        res,
                        401,
                        CODE_AUTH_ERROR,
                        "Invalid username/password"
                    );
                }
            } else {
                sendResponse(
                    res,
                    401,
                    CODE_AUTH_ERROR,
                    "Invalid username/password"
                );
            }
        } catch (err) {
            console.log("async error");
            sendError(res, err);
        }
    };

    //run main function 
    main();
}