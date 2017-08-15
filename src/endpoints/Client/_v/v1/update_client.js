const
    Client = require('../../../../models/client'),
    { decodeToken } = require('../../../../utils/security_utils'),
    { CODE_NOT_FOUND } = require('../../../../globals/globals'),
    {
        sendError,
        sendSuccess,
        sendResponse,
        generateKeyPairs,
    } = require('../../../../utils/helper_utils');

module.exports = (req, res, next) => {

    const { _id } = decode(req.headers['x-access-token']);

    const
        findClient = () => {
            User.findById(_id).
                then(data => {
                    return data;
                }).catch(err => {
                    throw err;
                });
        },
        updateClient = (client) => {
            Object.keys(req.body).
                forEach(key => {
                    client[key] = req.body[key];
                });
            return client;
        },

        saveClient = (client) => {
            return client.save().
                then(data => {
                    return data;
                }).catch(err => {
                    throw err;
                });
        };

    async function main() {
        //kulang pa nung client deductables
        //and maybe validations
        try {
            var client = await findClient();
            if (client !== null) {

                updatedClient = updateClient(client);
            
                await saveClient(updatedClient);
               
                sendSuccess(res, {}, "Booking successfully updated");
            } else {
                sendResponse(
                    res,
                    404,
                    CODE_NOT_FOUND,
                    "Client not found"
                );
            }

        } catch (e) {
            sendError(res, e, "An error happened while processing the client")
        }
    }

    main();
};