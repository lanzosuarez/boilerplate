const api = module.parent.exports.api;

const { validateAppToken } = require('../../utils/security_utils');

const registration_v1 = require('./_v/v1/registration');

api.post({ path: '/jrc/client_registration' },
    registration_v1
);




