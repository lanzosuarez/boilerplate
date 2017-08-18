const
    ClientBooking = require('../../../../models/client_bookings'),
    {
        sendError,
        sendSuccess,
        sendResponse,
        generateKeyPairs,
        waitForPromiseArr,
    } = require('../../../../utils/helper_utils');

module.exports = (req, res, next) => {

    const { bookingsParam } = req.params

    const

        mapToBookingItems = () => {
            return waitForPromiseArr(findBookings()).
                then(data => {
                    return data;
                }).catch(err => {
                    throw err;
                })
        },

        mapToSaveItems = (bookings) => {
            return waitForPromiseArr(fireMapSave(bookings)).
                then(data => {
                    return data;
                }).catch(err => {
                    throw err;
                });
        },

        mapToUpdateBookings = (bookings) => {
            return bookings.map((booking, index) => {
                return updateBooking(booking, bookingsParam[index]);
            });
        },

        fireMapSave = (bookings) => {
            return bookings.map(booking => {
                return saveBookings(booking);
            });
        },

        findBookings = () => {
            return bookingsParam.map(({ _id }) => {
                return findBooking(_id);
            });
        },

        updateBooking = (booking, updater) => {
            Object.keys(updater).
                forEach(key => {
                    booking[key] = updater[key];
                });
                console.log(booking);
            return booking;
        },

        findBooking = (_id) => {
            return ClientBooking.findById(_id).
                then(data => {
                    return data;
                }).catch(err => {
                    throw err;
                });
        },

        saveBookings = (booking) => {
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
            var bookings = await mapToBookingItems(), //findbookins
                updatedBookings = mapToUpdateBookings(bookings), //update bookings
                updatedBookings = await mapToSaveItems(updatedBookings); //re assign updatedBookings

            sendSuccess(res, updatedBookings, "Bookings successfully updated")

        } catch (e) {
            console.log(e);
            sendError(res, e, "An error happened while processing the booking")
        }
    }

    main();
};