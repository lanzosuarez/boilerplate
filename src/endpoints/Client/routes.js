const api = module.parent.exports.api;

const { validateAppToken } = require('../../utils/security_utils');

const get_client_v1 = require('./_v/v1/get_client'),
    change_pass_client_v1 = require('./_v/v1/change_password');


api.patch({ path: '/jrc/change_pass/client' },
    change_pass_client_v1
);

// api.use(validateAppToken);

api.get({ path: '/jrc/get_client/:id' },
    get_client_v1
);





