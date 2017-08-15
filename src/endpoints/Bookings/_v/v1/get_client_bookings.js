const
    ClientBooking = require('../../../../models/client_bookings'),
    {
        sendError,
        sendSuccess,
        sendResponse,
        generateKeyPairs,
    } = require('../../../../utils/helper_utils');


module.exports = (req, res, next) => {

    const { _id } = req.params;

    const

        getAllBookings = () => {
            return ClientBooking.findById(_id).
                populate({ 
                    path: 'client',
                    select: 'firstname lastname' 
                }).
                populate({
                    path: 'vehicle',
                    select: 'vehicle_model', 
                }).
                exec().then(data => {
                    return data;
                }).catch(err => {
                    throw err;
                });
        };

    async function main() {
        try {
            var bookings = await getAllBookings(),
                msg = 'Bookings retrieved';

            sendSuccess(res, bookings, msg);

        } catch (e) {
            console.log(e);
            sendError(res, e, "An error hapened while fetching the bookings data");
        }
    }

    main();
};