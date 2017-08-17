

const
    moment = require('moment'),
    Client = require('../../../../models/client'),
    Client_Subscription = require('../../../../models/client_subscription'),
    Client_Vehicle = require('../../../../models/client_vehicle'),
    {
        CODE_CONFLICT,
        MSG_CONFLICT_ERROR,
        CODE_RESOURCE_CREATED,
        COMPANY_EMAIL
    } = require('../../../../globals/globals'),
    {
        sendError,
        sendSuccess,
        sendResponse,
        generateKeyPairs,
        userFields,
        vehicleFields,
        initialPassTemplate
    } = require('../../../../utils/helper_utils'),
    {
        sendEmail
    } = require('../../../../utils/email_utils'),
    {
        hashPassword,
        generateRandomPassword
    } = require('../../../../utils/security_utils');

module.exports = (req, res, next) => {

    const {
        username,
        email,
        firstname,
        middlename,
        lastname,
        city,
        province,
        zip,
        mobile,
        govt_ids,
        birthday,
        gender,
        img_url,
        addresses,
        documents,
        user_permissions,
        subscription,
        vehicles,
        expiry
    } = req.body,

        cctv = 'http://dummy.com/192.32.1.1',
        rfid = '312312312321312';

    const

        getServiceOptions = () => {
            const
                product_type = ['ceramicpro', 'autovault'],
                package = ['gold', 'silver', 'bronze'],
                term_of_payment = ['monthly', 'annual'],
                service_option = ["small", "medium", "large"],
                mode_of_payment = ['cash', 'credit'];

            return {
                product_type,
                package,
                term_of_payment,
                service_option,
                mode_of_payment
            };
        },

        getSubscription = () => {
            return {
                inclusions: subscription.inclusions,
                addons: subscription.addons
            };
        },

        makeNewUser = () => {
            var new_client = generateKeyPairs(
                userFields(),
                [
                    username,
                    email,
                    firstname,
                    middlename,
                    lastname,
                    city,
                    province,
                    zip,
                    mobile,
                    govt_ids,
                    birthday,
                    gender,
                    img_url,
                    addresses,
                    documents,
                    cctv,
                    rfid,
                    user_permissions
                ]
            );

            console.log("NEW CLIENT");
            console.log(new_client);

            return generatePassword(new_client).
                then(data => {
                    return data;
                }).catch(err => {
                    throw err;
                })
        },

        generatePassword = (new_client) => {
            const generatedPassword = generateRandomPassword(6);

            return hashPassword(generatedPassword).
                then(data => {
                    new_client.password = data;

                    return saveClient(new_client).
                        then(data => {

                            const { firstname, email } = new_client;
                            sendPasswordToEmail(generatedPassword, firstname, email);

                            return data;
                        }).catch(err => {
                            throw err;
                        });

                }).catch(err => {
                    throw err;
                });
        },

        makeNewSubscription = (client) => {
            var new_subscription = {
                client,
                subscription: getSubscription()
            };

            var serviceOptions = getServiceOptions();
            Object.keys(serviceOptions).forEach(option => {
                var val = subscription[option];
                console.log(val);
                new_subscription[option] = serviceOptions[option][val]
            });

            console.log("NEW SUBSCRIPTION");
            console.log(new_subscription);

            return saveSubscription(new_subscription).
                then(data => {
                    return data;
                }).catch(err => {
                    throw err;
                })
        },

        makeNewVehicle = (client, subscription) => {
            var client_vehicles = vehicles.map(vehicle => {
                vehicle.owner = client;
                vehicle.subscription = subscription;
                return generateKeyPairs(vehicleFields(), Object.values(vehicle));
            });

            console.log("CLIENT VEHICLES");
            console.log(client_vehicles);

            return saveVehicles(client_vehicles).
                then(data => {
                    return data;
                }).catch(err => {
                    throw err;
                });
        },

        saveClient = (new_client) => {
            var client = new Client(new_client);
            return saveEnity(client).
                then(data => {
                    return data;
                }).catch(err => {
                    throw err;
                });

        },


        saveSubscription = (new_subscription) => {
            new_subscription.endDate = setExpirationDate();
            console.log(new_subscription);
            var client_subscription = new Client_Subscription(new_subscription);
            return saveEnity(client_subscription).
                then(data => {
                    return data;
                }).catch(err => {
                    throw err;
                });
        },


        saveVehicles = (vehicles) => {
            var toSaves = vehicles.map(vehicle => {
                var client_vehicle = new Client_Vehicle(vehicle);
                return saveEnity(client_vehicle);
            });

            return Promise.all(toSaves).
                then(data => {
                    return data;
                }).catch(err => {
                    throw err;
                });
        },

        sendPasswordToEmail = (password, firstname, email) => {
            sendEmail(
                COMPANY_EMAIL,
                email,
                "Membership Password",
                initialPassTemplate(firstname, password)
            );
        },

        setExpirationDate = () => {
            return moment().add(expiry, 'M').toDate();
        },

        saveEnity = (document) => {
            return document.save().
                then(data => {
                    return data;
                }).catch(err => {
                    throw err;
                });
        };

    async function main() {
        try {
            var user = await makeNewUser(),
                subscription = await makeNewSubscription(user),
                vehicle = await makeNewVehicle(user, subscription);
            sendResponse(
                res,
                201,
                CODE_RESOURCE_CREATED,
                "Client has been successfully registered"
            );
        } catch (e) {
            console.log(e);
            sendError(res, e, "There's a problem while creating a new account");
        }
    }

    main();
}

//create client
//create subscription