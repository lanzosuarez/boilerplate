const
    Subscription = require('../../../../models/subscription'),
    {
        sendError,
        sendSuccess,
    } = require('../../../../utils/helper_utils');


module.exports = (req, res, next) => {

    const

        findSubscriptions = () => {
            return Subscription.find().
                then(data => {
                    return data;
                }).catch(err => {
                    throw err;
                });
        };


    async function main() {
        try {
            var subscriptions = await findSubscriptions();
            sendSuccess(res, subscriptions, "Subscriptions Retrieved");
        } catch (e) {
            console.log(e);
            sendError(res, e, "Somethin went wrong");
        }
    }

    main();

};