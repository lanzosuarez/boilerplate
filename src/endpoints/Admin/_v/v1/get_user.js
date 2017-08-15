const
    User = require('../../../../models/user'),
    { decodeToken } = require('../../../../utils/security_utils'),
    { CODE_NOT_FOUND } = require('../../../../globals/globals'),
    {
        sendError,
        sendSuccess,
        sendResponse,
        generateKeyPairs,
    } = require('../../../../utils/helper_utils');


module.exports = (req, res, next) => {

    const { _id } = decodeToken(req.headers['x-access-token']);

    const

        getUser = () => {
            return User.findById(_id).
                then(data => {
                    return data;
                }).catch(err => {
                    throw err;
                });
        };

    async function main() {
        try {
            var user = await getUser();
            if (user !== null) {
                var msg = 'User found';
                sendSuccess(res, user, msg);
            } else {
                sendResponse(
                    res,
                    404,
                    CODE_NOT_FOUND,
                    "User not found"
                );
            }

        } catch (e) {
            console.log(e);
            sendError(res, e, "An error hapened while fetching the user data");
        }
    }

    main();
};