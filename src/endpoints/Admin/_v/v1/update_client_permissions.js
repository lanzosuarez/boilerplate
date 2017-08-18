const
    Client = require('../../../../models/client'),
    { CODE_NOT_FOUND } = require('../../../../globals/globals'),
    {
        sendError,
        sendSuccess,
        sendResponse,
    } = require('../../../../utils/helper_utils');

module.exports = (req, res, next) => {

    const { _id } = req.params;

    const
        findClient = () => {
            return Client.findById(_id).
                then(data => {
                    return data;
                }).catch(err => {
                    throw err;
                });
        },

        updateClient = (client) => {
            client.user_permissions = Object.assign(client.user_permissions, req.body);
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
            console.log(e);
            sendError(res, e, "An error happened while processing the client")
        }
    }

    main();
};