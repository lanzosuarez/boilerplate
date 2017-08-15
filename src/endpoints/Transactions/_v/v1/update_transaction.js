const
    Transaction = require('../../../../models/transaction'),
    { CODE_NOT_FOUND } = require('../../../../globals/globals'),
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
            return Transaction.findById(_id).
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
            var transaction = await findTranscations();
            if (transaction !== null) {
                updatedTransaction = updateTransaction(transaction);

                await saveTransaction(updatedTransaction);

                sendSuccess(res, {}, "Transaction successfully updated");
            } else {
                sendResponse(
                    res,
                    404,
                    CODE_NOT_FOUND,
                    "Transaction not found"
                );
            }

        } catch (e) {
            sendError(res, e, "An error happened while processing the transaction")
        }
    }

    main();
};