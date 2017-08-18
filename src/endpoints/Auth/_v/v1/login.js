
const
    User = require('../../../../models/user'),
    Client = require('../../../../models/client'),
    {
        generateAppAccessToken,
        comparePasswords
    } = require('../../../../utils/security_utils'),
    {
        CODE_AUTH_ERROR,
        MSG_CONFLICT_ERROR
    } = require('../../../../globals/globals'),
    {
        sendError,
        sendSuccess,
        sendResponse
    } = require('../../../../utils/helper_utils');

module.exports = (req, res, next) => {

    //object destructure
    const { username, password, flag } = req.body,

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

            const {
                username,
                _id,
                firstname,
                lastname,
                email,
                permission_level,
                user_permissions
            } = user;

            var payload = {
                _id,
                username,
                firstname,
                email,
                user_permissions
            };

            if (permission_level !== undefined) {
                payload.permission_level = permission_level;
            }

            return payload;
        },

        //login
        login = () => {
            console.log(username, password);
            if (flag === undefined) {
                return User.findOne({ username: username }).
                    then(user => {
                        return user;
                    }).catch(err => {
                        throw err;
                    });

            } else {
                return Client.findOne({ username: username }).
                    then(user => {
                        return user;
                    }).catch(err => {
                        throw err;
                    });
            }
        };

    //invoke all your process here
    async function main() {
        try {
            var user = await login();
            console.log(user);
            if (user !== null) {
                var authenticate = await comparePws(user.password);
                if (authenticate === true) {
                    var token = generateToken(user);
                        // payload = getPayload(user);

                    sendData({
                        token
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
            console.log(err);
            sendError(res, err);
        }
    };

    //run main function 
    main();
}