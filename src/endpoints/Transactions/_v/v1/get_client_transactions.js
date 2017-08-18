const
    Transaction = require('../../../../models/transaction'),
    {
    sendError,
        sendSuccess,
        sendResponse,
        generateKeyPairs,
    } = require('../../../../utils/helper_utils');


module.exports = (req, res, next) => {

    const { _id } = req.params;

    const

        getAllTransactions = () => {
            return Transaction.find({ client: _id })
                .populate({
                    path: 'client',
                    select: 'firstname lastname'
                }).populate({
                    path: 'clientvehicle',
                    select: 'vehicle_model'
                }).exec()
                .then(data => {
                    return data;
                }).catch(err => {
                    throw err;
                });
        };

    async function main() {
        try {
            var transactions = await getAllTransactions(),
                msg = 'Transactions retrieved';

            sendSuccess(res, transactions, msg);

        } catch (e) {
            console.log(e);``
            sendError(res, e, "An error hapened while fetching the transactions data");
        }
    }

    main();
};