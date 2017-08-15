const
    User = require('../../../../models/client'),
    {
        generateRandomPassword,
        hashPassword,
        decodeToken
    } = require('../../../../utils/security_utils'),
    {
        forgotPassTemplate,
        sendSuccess,
    } = require('../../../../utils/helper_utils');



module.exports = (req, res, next) => {

    const { password } = req.body,
        { _id } = decodeToken(req.headers['x-access-token']);

    const
        getClient = () => {
            return User.findById({ _id }).
                then(data => {
                    return data;
                }).catch(err => {
                    throw err;
                });
        },

        updateClient = (client, new_password) => {
            client.password = new_password;
            return client;
        },

        saveEntity = (document) => {
            return document.save().
                then(data => {
                    return data;
                }).catch(err => {
                    throw err;
                });
        };


    async function main() {
        try {
            var client = await getClient(),
                generatedPass = generateRandomPassword(6),
                newPass = await hashPassword(generatedPass);

            await saveEntity(updateClient(client, newPass));

            sendSuccess(res, {}, "Youre password has been changed");
        } catch (e) {
            console.log(e);
        }
    };

    main();

};