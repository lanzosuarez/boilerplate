const
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    {
        refGen,
        defaultDateNow,
        typeGen,
    } = require('../utils/database_utils');

//SCHEMA

//client
//package,
//term_of_payment,
//mode_of_payment,
//date_created,
//inclusions

const

    product_type = ['ceramicpro', 'autovault'],
    packages = ['gold', 'silver', 'bronze', 'platiunum', 'diamond'],
    terms_of_payment = ['monthly', 'annual'],
    service_options = ["small", "medium", "large"],
    modes_of_payment = ['cash', 'credit'];

const client_subscription_schema = {
    product_type: typeGen(Schema.Types.String),
    package: typeGen(Schema.Types.String),
    term_of_payment: typeGen(Schema.Types.String),
    service_option: typeGen(Schema.Types.String),
    mode_of_payment: typeGen(Schema.Types.String),
    date_created: defaultDateNow(),
    endDate: typeGen(Schema.Types.Date),
    status: typeGen(Schema.Types.Boolean, true, true),
    subscription: {},
    client: refGen('Client')
};


client_subscription_schema.product_type.enum = product_type;
client_subscription_schema.package.enum = packages;
client_subscription_schema.term_of_payment.enum = terms_of_payment;
client_subscription_schema.service_option.enum = service_options;
client_subscription_schema.mode_of_payment.enum = modes_of_payment;

const client_subscription = new Schema(client_subscription_schema);

module.exports = mongoose.model('ClientSubscription', client_subscription);