const
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    {
        typeGen,
        defaultDateNow,
    } = require('../utils/database_utils');


const vehicle_schema = {
    Brand: typeGen(Schema.Types.String),
    brand: [{
        model: typeGen(Schema.Types.String),
        features: {}
    }]
};

module.exports = mongoose.model('Vehicle', vehicle_schema);