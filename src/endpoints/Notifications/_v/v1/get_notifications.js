const
    Notification = require('../../../../models/notification'),
    { decodeToken } = require('../../../../utils/security_utils'),
    {
        sendError,
        sendSuccess,
        sendResponse,
        generateKeyPairs,
    } = require('../../../../utils/helper_utils');


module.exports = (req, res, next) => {

    const { _id } = decode(req.headers['x-access-token']);

    const

        getNotifications = () => {
            return Notification.findOne({ owner: _id }).
                then(data => {
                    return data;
                }).catch(err => {
                    throw err;
                });
        };

    async function main() {
        try {
            var notifications = await getNotifications(),
                msg = 'User found';
            sendSuccess(res, notifications, msg);

        } catch (e) {
            console.log(e);
            sendError(res, e, "An error hapened while fetching the notifications");
        }
    }

    main();
};