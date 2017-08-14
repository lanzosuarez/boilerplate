const
    User = require('../../../../models/user'),
    {
        sendError,
        sendSuccess,
        sendResponse,
        generateKeyPairs,
    } = require('../../../../utils/helper_utils');


module.exports = (req, res, next) => {

    const { _id } = req.headers['x-access-token'];

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
            var user = await getUser(),
                msg = 'User found';
            sendSuccess(res, user, msg);

        } catch (e) {
            console.log(e);
            sendError(res, e, "An error hapened while fetching the user data");
        }
    }

    main();
};