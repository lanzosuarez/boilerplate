const api = module.parent.exports.api;

const { validateAppToken } = require('../../utils/security_utils');

const get_vehicle_info_v1 = require('./_v/v1/vehicle_info');
const get_vehicle_transaction_history_v1 = require('./_v/v1/vehicle_transaction_history');

api.get({ path: '/jrc/vehicle_information' },
    get_vehicle_info_v1
);

api.get({ path: '/jrc/vehicle_transaction_history' },
    get_vehicle_transaction_history_v1
);