const
    ClientSubscription = require('../../../../models/client_subscription'),
    {
        sendError,
        sendSuccess,
        sendResponse,
        generateKeyPairs,
    } = require('../../../../utils/helper_utils');


module.exports = (req, res, next) => {

    const { _id } = req.params;

    const

        getAllSubscriptions = () => {
            return ClientSubscription.findById(_id).
                populate({
                    path: 'client',
                    select: 'firstname lastname'
                }).
                exec().then(data => {
                    return data;
                }).catch(err => {
                    throw err;
                });
        };

    async function main() {
        try {
            var subscriptions = await getAllSubscriptions(),
                msg = 'Subscriptions retrieved';

            sendSuccess(res, subscriptions, msg);

        } catch (e) {
            console.log(e);
            sendError(res, e, "An error hapened while fetching the subscriptions data");
        }
    }

    main();
};