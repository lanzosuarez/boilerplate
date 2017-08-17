const
    Vehicle = require('../../../../models/client_vehicle'),
    {
        sendError,
        sendSuccess,
        sendResponse,
        generateKeyPairs,
    } = require('../../../../utils/helper_utils'),
    { decodeToken } = require('../../../../utils/security_utils');


module.exports = (req, res, next) => {
    const { _id } = decodeToken(req.headers['x-access-token']);

    const

        getVehicleInformation = () => {
            return Vehicle.find({owner : _id}).
                then(data => {
                    return data;
                }).catch(err => {
                    throw err;
                });
        };

    async function main() {
        try {
            var vehicle = await getVehicleInformation(),
                msg = 'Vehicle Information found';
            sendSuccess(res, vehicle, msg);

        } catch (e) {
            console.log(e);
            sendError(res, e, "An error happened while fetching the vehicle information");
        }
    }

    main();
};