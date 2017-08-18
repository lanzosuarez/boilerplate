const
    Client = require('../../../../models/client'),
    ClientBooking = require('../../../../models/client_bookings'),
    ClientVehicle = require('../../../../models/client_vehicle'),
    ClientSubscription = require('../../../../models/client_subscription'),
    { CODE_NOT_FOUND } = require('../../../../globals/globals'),
    { decodeToken } = require('../../../../utils/security_utils'),
    _ = require('lodash'),
    {
        sendError,
        sendSuccess,
        sendResponse,
        generateKeyPairs,
        waitForPromiseArr
    } = require('../../../../utils/helper_utils');

module.exports = (req, res, next) => {


    const { _id } = decodeToken(req.headers['x-access-token']);

    const

        findUser = (_id) => {
            return Client.findOne({ _id }).
                then(data => {
                    return data;
                }).catch(err => {
                    throw err;
                });
        },


        findBookings = () => {
            return ClientBooking.find({
                $and: [
                    {
                        client: _id
                    },
                    {
                        scheduled_date: {
                            $lte: new Date(Date.now())
                        }
                    }
                ]
            }).then(data => {
                return data;
            }).catch(err => {
                throw err
            });
        },

        findVehicle = (_id) => {
            return ClientVehicle.findOne({ owner: _id })
                .then(data => {
                    return data.vehicle_model;
                }).catch(err => {
                    throw err;
                });
        },

        findSubscription = () => {
            return ClientSubscription.findOne({ client: _id })
                .then(data => {
                    return data;
                }).catch(err => {
                    throw err;
                })
        },

        waitForFinds = (arr) => {
            return waitForPromiseArr(arr)
                .then(data => {
                    return data;
                }).catch(err => {
                    throw err;
                });
        },

        createNotifications = (bookings) => {
            return bookings.map(({ client }) => {
                return findVehicle(client);
            });
        },

        formatNotifications = (bookings, vehicles) => {
            return bookings.map((booking, index) => {
                const vehicle = vehicles[index];
                if (vehicle) {
                    const { service, date_create } = booking,
                        date = new Date(date_create);

                    return {
                        message: `${vehicle} ${service} at ${date.getHours()}:00 on ${date.toDateString()}`
                    };
                }
            });
        },

        formatSubscriptionInfo = (client_subscription) => {
            const {
                subscription,
                endDate,
                product_type
            } = client_subscription;

            return {
                subscription,
                endDate,
                product_type
            };
        },

        formatClientInfo = (user) => {
            const { cctv, rfid, username, firstname, lastname, img_url } = user;
            return {
                cctv,
                rfid,
                username,
                lastname,
                firstname,
                img_url
            };
        };

    async function main() {
        try {
            const user = await findUser(_id);

            if (user !== null) {
                var
                    bookings = await findBookings(),

                    subscription = await findSubscription(),

                    vehicles = await createNotifications(_.take(bookings, 10)),

                    vehicles = await waitForFinds(vehicles),

                    notifications = formatNotifications(bookings, vehicles);

                console.log(notifications);

                sendSuccess(
                    res,
                    {
                        user: formatClientInfo(user),
                        notifications,
                        subscription: formatSubscriptionInfo(subscription)
                    },

                    "User retrieved");

            } else {
                sendResponse(
                    res,
                    404,
                    CODE_NOT_FOUND,
                    "Client not found"
                );
            }
        } catch (e) {
            console.log(e);
            sendError(res, e, "An error hapened while fetching the client's data");
        }
    }

    main();
}