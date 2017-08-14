const
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    {
        refGen,
        defaultDateNow,
        typeGen,
    } = require('../utils/database_utils');


const service = [
    'ceramicpro',
    'autovault'
];

const string = Schema.Types.String;

const subscription_schema = {
    service: typeGen(string),
    packages: [
        {
            package: typeGen(string),
            inclusions: [{
                name: typeGen(string)
            }],
            service_options: [
                {
                    size: typeGen(string),
                    price: typeGen(string)
                }
            ]
        }
    ],
    addons: [{
        products: [{
            name: typeGen(string),
            service_options: [
                {
                    size: typeGen(string),
                    price: typeGen(string),
                    notes: [{
                        note: typeGen(string)
                    }]
                }
            ]
        }]
    }]
}

subscription_schema.service.enum = service;

const subscription = new Schema(subscription_schema);

module.exports = mongoose.model('Subscription', subscription);

//  messages: [{type: Schema.Types.ObjectId, ref: 'Message'}]