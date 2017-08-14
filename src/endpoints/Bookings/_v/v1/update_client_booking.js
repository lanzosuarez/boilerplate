const
    ClientBooking = require('../../../../models/client_bookings'),
    {
        sendError,
        sendSuccess,
        sendResponse,
        generateKeyPairs,
    } = require('../../../../utils/helper_utils');

module.exports = (req, res, next) => {

    const { _id } = req.params

    const
        findBooking = () => {
            ClientBooking.findById(_id).
                then(data => {
                    return data;
                }).catch(err => {
                    throw err;
                });
        },

        updateBooking = (booking) => {
            Object.keys(req.body).
                forEach(key => {
                    booking[key] = req.body[key];
                });
            return booking;
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
            var booking = await findBooking(),
                updatedBooking = updateBooking(booking);
            await saveBooking(updatedBooking);
            
            sendSuccess(res, {}, "Booking successfully updated");

        } catch (e) {
            sendError(res, e, "An error happened while processing the booking")
        }
    }

    main();
};