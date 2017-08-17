const
    User = require('../../../../models/user'),
    { CODE_NOT_FOUND } = require('../../../../globals/globals'),
    { hashPassword } = require('../../../../utils/security_utils'),
    {
        sendError,
        sendSuccess,
    } = require('../../../../utils/helper_utils');

module.exports = (req, res, next) => {

    const
        createUser = () => {
            const newUser = new User(req.body);
            return newUser;
        },

        saveUser = (user) => {
            return hashPassword(user.password).
                then(data => {
                    user.password = data;
                    return user.save().
                        then(data => {
                            return data;
                        }).catch(err => {
                            throw err;
                        });
                        
                }).catch(err => {
                    throw err;
                })
        };

    async function main() {
        try {
            var user = createUser(),
                newUser = await saveUser(user);

            sendSuccess(
                res,
                newUser,
                "User successfully created"
            );

        } catch (e) {
            console.log(e);
            sendError(res, e, "Error creaing user");
        }
    }

    main();

};