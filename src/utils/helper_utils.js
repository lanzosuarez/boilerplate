const {
    CODE_SERVER_ERROR,
    MSG_SERVER_ERROR,
    CODE_SUCCESS,
    CODE_AUTH_ERROR,
    MSG_LOGIN_ERROR
} = require('../globals/globals');

const sendError = (res, error, msg) => {
    res.send(500, {
        code: CODE_SERVER_ERROR,
        msg,
        error
    })
};


const sendSuccess = (res, data, msg) => {
    res.send(200, {
        code: CODE_SUCCESS,
        data,
        msg,
    });
};


const sendResponse = (res, status, code, msg) => {
    res.send(status, {
        code,
        msg
    });
};

const generateKeyPairs = (keys, values) => {
    var obj = {};
    keys.forEach((key, index) => {
        obj[key] = values[index];
    });
    return obj;
};

const updateEntity = (toUpdate, updater) => {
    Object.keys(updater).
        forEach(key => {
            toUpdate[key] = updater[key];
        });

    return toUpdate;
};


const waitForPromiseArr = (promiseArr) => {
    return Promise.all(promiseArr).
        then(data => {
            return data;
        }).catch(err => {
            throw err;
        });
};

const saveDocument = (model, val) => {
    var doc = new Model(val);
    return doc.save().
        then(data => {
            return data;
        }).catch(err => {
            throw err;
        });
};


const userFields = () => {
    return [
        "username",
        "email",
        "firstname",
        "middlename",
        "lastname",
        "city",
        "province",
        "zip",
        "mobile",
        "govt_ids",
        "birthday",
        "gender",
        "img_url",
        "addresses",
        "documents",
        "cctv",
        "rfid",
        "user_permissions"
    ]
};


const vehicleFields = () => {
    return [
        "vin",
        "plate_number",
        "vehicle_maker",
        "vehicle_model",
        "model_year",
        "owner",
        "subscription"
    ];
};

const forgotPassTemplate = (name, password) => {
    return `
        <h3> Hello ${name}, because you requested for a new passsord, this is your new password!</h3> 
        <p>${password}<p/> <br><br>
        <b> Please login to https://kmc-visitors-login-cms.herokuapp.com and change you password</b>
    `;
};

const initialPassTemplate = (name, password) => {
    return `
        <h3> Hello ${name}, this is your password: </h3> 
        <p>${password}<p/> <br><br>
        <b> Please login to https://kmc-visitors-login-cms.herokuapp.com and change you password</b>
    `;
};


module.exports = {
    sendError,
    sendSuccess,
    sendResponse,
    generateKeyPairs,
    userFields,
    vehicleFields,
    forgotPassTemplate,
    updateEntity,
    waitForPromiseArr,
    initialPassTemplate
};
