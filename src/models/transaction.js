const
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    {
        typeGen,
        refGen,
        defaultDateNow,
        multipleTypeString,
        assignEnum
    } = require('../utils/database_utils');

//Schema

//vehicle
//date_created
//service

const transaction_schema = {
    client: refGen('Client'),
    vehicle: refGen('Vehicle'),
    date_created: defaultDateNow(),
    service: typeGen(Schema.Types.String)
};


const transaction = new Schema(transaction_schema);

module.exports = mongoose.model('Transaction', transaction);

