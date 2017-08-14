const api = module.parent.exports.api;

const { validateAppToken } = require('../../utils/security_utils');

const
    registration_v1 = require('./_v/v1/registration'),
    get_user_v1 = require('./_v/v1/get_user'),
    update_user_v1 = require('./_v/v1/update_user');

api.post({ path: '/jrc/client_registration' },
    registration_v1
);

api.get({ path: '/jrc/user' },
    get_user_v1
);

api.post({ path: '/jrc/user' },
    update_user_v1
);




