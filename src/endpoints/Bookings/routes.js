const api = module.parent.exports.api;

const { validateAppToken } = require('../../utils/security_utils');

const get_client_bookings_v1 = require('./_v/v1/get_client_bookings'),
    get_clients_bookings_v1 = require('./_v/v1/get_clients_bookings'),
    update_clients_booking_v1 = require('./_v/v1/update_clients_booking'),
    create_client_booking_v1 = require('./_v/v1/create_booking');


api.get({ path: '/jrc/client_bookings/:_id' },
    get_client_bookings_v1
);

api.get({ path: '/jrc/clients_bookings' },
    get_clients_bookings_v1
);

api.post({ path: '/jrc/client_booking' },
    create_client_booking_v1
);

api.patch({ path: '/jrc/client_booking' },
    update_clients_booking_v1
);
