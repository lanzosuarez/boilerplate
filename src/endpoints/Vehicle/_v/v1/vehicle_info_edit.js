const
    Vehicle = require('../../../../models/client_vehicle'),
    {
        sendError,
        sendSuccess,
        sendResponse,
        generateKeyPairs,
        updateEntity,
    } = require('../../../../utils/helper_utils'),
    { decodeToken } = require('../../../../utils/security_utils');


module.exports = (req, res, next) => {
    const { _id } = decodeToken(req.headers['x-access-token']),
    { vehicleID } = req.body;

    const
        //check kung may ganung record talaga for vehicle
        findVehicle = () => {
            return Vehicle.findOne({
                $and: [
                    { owner: _id },
                    { _id: vehicleID }
                ]
            }).
                then(data => {
                    return data;
                }).catch(err => {
                    throw err;
                });
        },

        // update Record
        updateVehicle = (vehicle) => {
            Object.keys(req.body).
                forEach(key => {
                    vehicle[key] = req.body[key];
                });
            return vehicle;
        },

        //save changes
        saveVehicle = (vehicle) => {
            return vehicle.save().
                then(data => {
                    return data;
                }).catch(err => {
                    throw err;
                });
        };

        async function main() {
            try {
                var vehicle = await findVehicle();
                if (vehicle !== null) {
                    var updatedVehicle = updateVehicle(vehicle);
                    await saveVehicle(updatedVehicle);
                    sendSuccess(res, {}, "Vehicle Information successfully updated");
                } else {
                    sendResponse(
                        res,
                        404,
                        CODE_NOT_FOUND,
                        "Vehicle information not found"
                    );
                }
            } catch (e) {
                sendError(res, e, "An error happened while processing vehicle information")
            }
        }

    main();
};