const api = module.parent.exports.api;

const
    create_subscription_v1 = require('./_v/v1/create_subscription'),
    get_subscription_v1 = require('./_v/v1/get_subscriptions');


api.post({ path: '/jrc/create_subscription' },
    create_subscription_v1
);

api.get({ path: '/jrc/get_subscriptions' },
    get_subscription_v1
);