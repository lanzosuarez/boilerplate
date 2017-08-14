// exports.sendEmailToEmployee = (visitor, to, from = "Visitors Login", subject = "Visitor") => {
//     var { html, text } = employeeEmailTemplate(visitor)();
//     transporter = createTransport({
//         host: 'smtp.gmail.com',
//         port: 465,
//         secure: true,
//         auth: {
//             user: process.env.SMTP_EMAIL,
//             pass: process.env.SMTP_EMAIL_PASSWORD
//         },
//         tls: {
//             // do not fail on invalid certs
//             rejectUnauthorized: false
//         }
//     });

//     console.log(
//         process.env.SMTP_EMAIL, process.env.SMTP_EMAIL_PASSWORD
//     );

//     mailOptions = {
//         from, // sender address 
//         to, // list of receivers 
//         subject, // Subject line 
//         text,
//         html,
//     };
//     console.log(mailOptions);

//     return transporter.verify().
//         then(data => {
//             transporter.sendMail(mailOptions).
//                 then(data => {
//                     console.log("send mail success", data);
//                 }).catch(err => {
//                     console.log("sendmail err", err);
//                 });
//         }).catch(err => {
//             console.log("on verify error", err);
//             throw err;
//         });
// };

const
    sgHelper = require('sendgrid').mail,
    KEY = process.env.SENDGRID_API_KEY,
    sg = require('sendgrid')(process.env.SENDGRID_API_KEY);

exports.sendEmail = function (from, to, subject, body, callback) {
    let
        //configs
        sgFrom = new sgHelper.Email(from),
        sgTo = new sgHelper.Email(to),
        sgSubject = subject,
        sgContent = new sgHelper.Content('text/html', body),
        sgMail = new sgHelper.Mail(sgFrom, sgSubject, sgTo, sgContent),

        request = sg.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: sgMail.toJSON(),
        });

    return sg.API(request).
        then(data => {
            return data;
        }).catch(err => {
            return err;
        });
}

