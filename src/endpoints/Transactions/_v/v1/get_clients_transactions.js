const
    Transaction = require('../../../../models/transaction'),
    {
        sendError,
        sendSuccess,
        sendResponse,
        generateKeyPairs,
    } = require('../../../../utils/helper_utils');


module.exports = (req, res, next) => {

    const

        getAllTransactions = () => {
            return Transaction.find().
                populate('Client', 'firstname lastname').
                populate('Vehicle', 'vehicle_model').
                exec().
                then(data => {
                    return data;
                }).catch(err => {
                    throw err;
                });
        };

    async function main() {
        try {
            var transactions = await getAllTransactions(),
                msg = 'Transactions retrieved';
            sendSuccess(res, transactions, msg)

        } catch (e) {
            console.log(e);
            sendError(res, e, "An error hapened while fetching the transactions data");
        }
    }

    main();
};