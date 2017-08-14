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
        createTransaction = () => {
            var transaction = Object.assign({}, req.body);
            return newTransaction = new Transaction(transaction);
        },

        saveTransaction = (transaction) => {
            return transaction.save().
                then(data => {
                    return data;
                }).catch(err => {
                    throw err;
                });
        };

    async function main() {
        //kulang pa nung user deductables
        try {
            var transaction = await createTransaction();
            await saveTransaction(transaction);

            sendSuccess(res, {}, "Transaction successfully created");

        } catch (e) {
            sendError(res, e, "An error happened while processing the transaction")
        }
    }

    main();
};