const
    Client = require('../../../../models/client'),
    { sendEmail } = require('../../../../utils/email_utils'),
    { COMPANY_EMAIL } = require('../../../../globals/globals'),
    {
        generateRandomPassword,
        hashPassword
    } = require('../../../../utils/security_utils'),
    {
        forgotPassTemplate,
        sendSuccess,
    } = require('../../../../utils/helper_utils');



module.exports = (req, res, next) => {

    const { email } = req.body;

    const
        getClient = () => {
            return Client.findOne({ email }).
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

        sendNewPassEmail = (firstname, newPassword) => {
            sendEmail(
                COMPANY_EMAIL,
                email,
                "New Password",
                forgotPassTemplate(firstname, newPassword)
            );
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
            await sendNewPassEmail(client.firstname, generatedPass);

            sendSuccess(res, {}, "Youre new password has been sent to your email");
        } catch (e) {
            console.log(e);
        }
    };

    main();

};