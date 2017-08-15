const
    User = require('../../../../models/user'),
    { decodeToken } = require('../../../../utils/security_utils'),
    { CODE_NOT_FOUND } = require('../../../../globals/globals'),
    {
        sendError,
        sendSuccess,
        sendResponse,
        generateKeyPairs,
        updateEntity
    } = require('../../../../utils/helper_utils');

module.exports = (req, res, next) => {

    const { _id } = decode(req.headers['x-access-token']);

    const
        findUser = () => {
            User.findById(_id).
                then(data => {
                    return data;
                }).catch(err => {
                    throw err;
                });
        },


        updateUser = (user) => {
            Object.keys(req.body).
                forEach(key => {
                    if (key === 'user_permissions') {
                        user.user_permissions = updateEntity(user.user_permissions, req.body.user_permissions);
                    } else {
                        user[key] = req.body[key];
                    }
                });
            return user;
        },

        saveUser = (user) => {
            return user.save().
                then(data => {
                    return data;
                }).catch(err => {
                    throw err;
                });
        };

    async function main() {
        //kulang pa nung user deductables
        //and maybe validations
        try {
            var user = await findUser();
            if (user !== null) {
                var updatedUser = updateUser(user);
                await saveUser(updatedUser);
                sendSuccess(res, {}, "User successfully updated");
            } else {
                sendResponse(
                    res,
                    404,
                    CODE_NOT_FOUND,
                    "User not found"
                );
            }
        } catch (e) {
            sendError(res, e, "An error happened while processing the user")
        }
    }

    main();
};