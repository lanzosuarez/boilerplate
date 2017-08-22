const api = module.parent.exports.api;

const
    create_subscription_v1 = require('./_v/v1/create_subscription'),
    get_clients_subsriptions_v1 = require('./_v/v1/get_clients_subscriptions'),
    get_client_subsriptions_v1 = require('./_v/v1/get_client_subscriptions'),
    update_client_subsription_v1 = require('./_v/v1/update_client_subscription'),
    get_subscription_v1 = require('./_v/v1/get_subscriptions');


api.post({ path: '/jrc/create_subscription' },
    create_subscription_v1
);

api.get({ path: '/jrc/get_subscriptions' },
    get_subscription_v1
);

api.get({ path: '/jrc/get_clients_subscriptions' },
    get_clients_subsriptions_v1
);

api.get({ path: '/jrc/get_client_subscriptions/:_id' },
    get_client_subsriptions_v1
);

api.patch({ path: '/jrc/get_client_subscriptions/:_id' },
    update_client_subsription_v1
);
