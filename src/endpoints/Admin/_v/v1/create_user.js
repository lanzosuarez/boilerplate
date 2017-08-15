const
    User = require('../../../../models/user'),
    { CODE_NOT_FOUND } = require('../../../../globals/globals'),
    { hashPassword } = require('../../../../utils/security_utils'),
    {
        sendError,
        sendSuccess,
    } = require('../../../../utils/helper_utils');

module.exports = () => {

    const
        newUser = () => {
            const newUser = new User(req.body);
            return newUser;
        },

        saveUser = (user) => {
            user.password = hashPassword(user.password);
            return user.save().
                then(data => {
                    return data;
                }).catch(err => {
                    throw err;
                });
        };

    async function main() {
        try {
            const user = newUser(),
                newUser = await saveUser(user);

            sendSuccess(
                res,
                newUser,
                "User successfully created"
            );

        } catch (e) {
            sendError(res, e, "Error creaing user");
        }
    }

    main();

};