const api = module.parent.exports.api;

const get_client_transactions_v1 = require('./_v/v1/get_client_transactions'),
    get_clients_transactions_v1 = require('./_v/v1/get_clients_transactions'),
    // update_clients_transactions_v1 = require('./_v/v1/get_clients_transactions'),
    create_client_transaction_v1 = require('./_v/v1/create_transaction');

api.get({ path: '/jrc/client_transactions/:_id' },
    get_client_transactions_v1
);

api.get({ path: '/jrc/clients_transactions' },
    get_clients_transactions_v1
);

api.post({ path: '/jrc/client_transaction' },
    create_client_transaction_v1
);

// api.patch({ path: '/jrc/client_transaction' },
//     update_clients_transactions_v1
// );

