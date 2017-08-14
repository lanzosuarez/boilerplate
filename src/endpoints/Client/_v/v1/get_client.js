const
    Client = require('../../../../models/client'),
    Notifications = require('../../../../models/notification'),
    { } = require('../../../../globals/globals'),
    {
        sendError,
        sendSuccess,
        generateKeyPairs,
    } = require('../../../../utils/helper_utils');

module.exports = (req, res, next) => {

    const { _id } = req.params;

    const

        findUser = (_id) => {
            return Client.findOne({ _id }).
                then(data => {
                    return data;
                }).catch(err => {
                    throw err;
                });
        };

    async function main() {
        try {
            const user = await findUser(_id);
            sendSuccess(res, user, "User retrieved");
        } catch (e) {
            console.log(e);
            sendError(res, e, "An error hapened while fetching the client's data");
        }
    }

    main();
}