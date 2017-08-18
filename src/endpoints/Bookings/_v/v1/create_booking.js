const
    ClientBooking = require('../../../../models/client_bookings'),
    { decodeToken } = require('../../../../utils/security_utils'),
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
            console.log(booking);
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
            var booking = await createBooking(),
                booking = await saveBooking(booking);

            sendSuccess(res, {}, "Booking successfully created");

        } catch (e) {
            console.log(e);
            sendError(res, e, "An error happened while processing the booking")
        }
    }

    main();
};