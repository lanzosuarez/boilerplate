const
    ClientSubscription = require('../../../../models/client_subscription'),
    { CODE_NOT_FOUND } = require('../../../../globals/globals'),
    {
        sendError,
        sendSuccess,
        sendResponse,
        generateKeyPairs,
} = require('../../../../utils/helper_utils');

module.exports = (req, res, next) => {

    const { _id } = req.params;

    const
    
        findSubscription = () => {
            ClientSubscription.findById(_id).
                then(data => {
                    return data;
                }).catch(err => {
                    throw err;
                });
        },

        updateSubscription = (subscription) => {
            Object.keys(req.body).
                forEach(key => {
                    subscription[key] = req.body[key];
                });

            return subscription;
        },

        saveSubscription = (subscription) => {
            return subscription.save()
                .then(data => {
                    return data;
                }).catch(err => {
                    throw err;
                });
        };

    async function main() {
        //kulang pa nung subscription deductables
        //and maybe validations
        try {
            var subscription = await findSubscription();
            if (subscription !== null) {

                updateSubscription = updateSubscription(subscription);

                await saveSubscription(updateSubscription);

                sendSuccess(res, {}, "Booking successfully updated");

            } else {

                sendResponse(
                    res,
                    404,
                    CODE_NOT_FOUND,
                    "Client not found"
                );

            }

        } catch (e) {
            sendError(res, e, "An error happened while processing the subscription")
        }
    }

    main();
};