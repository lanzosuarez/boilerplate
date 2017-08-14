const
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    {
        typeGen,
        defaultDateNow,
    } = require('../utils/database_utils');


const vehicle_schema = {
    Brand: typeGen(Schema.Types.String),
    models: [{ name: typeGen(Schema.Types.String) }]
};

module.exports = mongoose.model('Vehicle', vehicle_schema);