const
    Transaction = require('../../../../models/transaction'),
    {
        sendError,
        sendSuccess,
        sendResponse,
        generateKeyPairs,
    } = require('../../../../utils/helper_utils'),
    {
        dateFilter,
    } = require('../../../../utils/datetime_utils');


module.exports = (req, res, next) => {
    const { _id } = req.params;
    const

        getVehicleTransaction = () => {
            return Transaction.find({
                $and : [
                    { vehicle : _id },
                    { date_created : dateFilter(req)} 
                ]}).
                then(data => {
                    return data;
                }).catch(err => {
                    throw err;
                });
        };

    async function main() {
        try {
            var transaction = await getVehicleTransaction(),
                msg = 'Vehicle Information found';
            sendSuccess(res, transaction, msg);

        } catch (e) {
            console.log(e);
            sendError(res, e, "An error happened while fetching the vehicle transaction");
        }
    }

    main();
};