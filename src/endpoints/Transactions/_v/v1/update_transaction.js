const
    Transaction = require('../../../../models/transaction'),
    {
        sendError,
        sendSuccess,
        sendResponse,
        generateKeyPairs,
    } = require('../../../../utils/helper_utils');

module.exports = (req, res, next) => {

    const { _id } = req.params

    const
        findTranscations = () => {
            Transaction.findById(_id).
                then(data => {
                    return data;
                }).catch(err => {
                    throw err;
                });
        },

        updateTransaction = (transaction) => {
            Object.keys(req.body).
                forEach(key => {
                    transaction[key] = req.body[key];
                });
            return transaction;
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
        try {
            var transaction = await findTranscations(),
                updatedTransaction = updateTransaction(transaction);
            await saveTransaction(updateTransaction);
            
            sendSuccess(res, {}, "Transaction successfully updated");

        } catch (e) {
            sendError(res, e, "An error happened while processing the transaction")
        }
    }

    main();
};