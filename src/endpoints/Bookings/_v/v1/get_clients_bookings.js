const
    ClientBooking = require('../../../../models/client_bookings'),
    {
        sendError,
        sendSuccess,
        sendResponse,
        generateKeyPairs,
    } = require('../../../../utils/helper_utils');


module.exports = (req, res, next) => {

    const
        getAllBookings = () => {
            return ClientBooking.find().
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
            var bookings = await getAllBookings(),
                msg = 'Bookings retrieved';
            console.log(bookings)
            sendSuccess(res,bookings, msg);

        } catch (e) {
            console.log(e);
            sendError(res, e, "An error hapened while fetching the bookings data");
        }
    }

    main();
};