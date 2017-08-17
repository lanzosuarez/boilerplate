const
    ClientBooking = require('../../../../models/client_bookings'),
    Notification = require('../../../../models/notifications'),
    { decodeToken } = require('../../../../utils/security_utils'),
    {
        sendError,
        sendSuccess,
        sendResponse,
        generateKeyPairs,
    } = require('../../../../utils/helper_utils');

module.exports = (req, res, next) => {

    const { _id } = decodeToken(req.headers['x-access']);

    const
        createBooking = () => {
            var booking = Object.assign({}, req.body);
            return newBooking = new ClientBooking(booking);
        },

        createNotifs = (booking) => {
            var notification = new Notification({
                client: _id,
                booking
            });

            return notification;
        },

        saveNotifs = (notification) => {
            return booking.save().
                then(data => {
                    return data;
                }).catch(err => {
                    throw err;
                });
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
            var booking = await createBooking(),
                booking = await saveBooking(booking);

            await saveNotifs(createNotifs(booking._id));

            sendSuccess(res, {}, "Booking successfully created");

        } catch (e) {
            sendError(res, e, "An error happened while processing the booking")
        }
    }

    main();
};