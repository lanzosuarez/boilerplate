const
    Subscription = require('../../../../models/subscription'),
    {
        sendError,
        sendSuccess,
    } = require('../../../../utils/helper_utils');


module.exports = (req, res, next) => {

    const services = [
        'ceramicpro',
        'autovault'
    ];

    const

        makeSubscription = () => {
            var newSubscription = Object.assign({}, req.body);
            newSubscription.service = services[newSubscription.service];
            return newSubscription;
        },

        saveSubscription = (subscription) => {
            var newSubscription = new Subscription(subscription);
            return newSubscription.save().
                then(data => {
                    return data;
                }).catch(err => {
                    throw err;
                })
        };

    async function main() {
        try {

            var newSubscription = makeSubscription(),
                subscription = await saveSubscription(newSubscription);
                console.log(subscription);

            sendSuccess(res, saveSubscription, "New subscription");

        } catch (e) {
            console.log(e);
            sendError(res, e, "Somethin went wrong");
        }
    }

    main();

};