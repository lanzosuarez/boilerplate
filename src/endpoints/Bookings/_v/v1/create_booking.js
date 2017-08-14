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
        createBooking = () => {
            var booking = Object.assign({}, req.body);
            return newBooking = new ClientBooking(booking);
        },

        saveBooking = (booking) => {
            return booking.save().
                then(data => {
                    return data;
                }).catch(err => {
                    throw err;
                });
        };

    async function main() {
        //kulang pa nung user deductables
        //and maybe validations
        try {
            var booking = await createBooking();
                await saveBooking(booking);

            sendSuccess(res, {}, "Booking successfully created");

        } catch (e) {
            sendError(res, e, "An error happened while processing the booking")
        }
    }

    main();
};