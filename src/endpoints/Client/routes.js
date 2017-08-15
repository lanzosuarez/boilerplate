const api = module.parent.exports.api;

const { validateAppToken } = require('../../utils/security_utils');

const get_client_v1 = require('./_v/v1/get_client'),
    update_client_v1 = require('./_v/v1/update_client'),
    change_pass_v1 = require('./_v/v1/change_password'),
    forgot_pass_client_v1 = require('./_v/v1/forgot_password');


api.patch({ path: '/jrc/forgot_pass/client' },
    forgot_pass_client_v1
);

api.use(validateAppToken);

api.patch({ path: '/jrc/change_pass/client' },
    change_pass_v1
);

api.get({ path: '/jrc/client/:id' },
    get_client_v1
);

api.patch({ path: '/jrc/client' },
    update_client_v1
);





