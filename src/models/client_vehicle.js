const
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    {
        typeGen,
        refGen,
        defaultDateNow,
    } = require('../utils/database_utils');

//SCHEMA

//owner
//vehicle_maker
//vehicle model
//model_year
//vehicle
//date_created

const client_vehicle = new Schema({
    owner: refGen('Client'),
    subscription: refGen('ClientSubscription'),
    vin: typeGen(Schema.Types.String),
    plate_number: typeGen(Schema.Types.String),
    vehicle_maker: typeGen(Schema.Types.String),
    vehicle_model: typeGen(Schema.Types.String),
    model_year: typeGen(Schema.Types.String),
    date_created: defaultDateNow()
});

module.exports = mongoose.model('ClientVehicle', client_vehicle);