const
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    {
        refGen,
        defaultDateNow,
        typeGen,
    } = require('../utils/database_utils');

var client_booking_schema = {
    client: refGen('Client'),
    vehicle: refGen('Vehicle'),
    service: typeGen(Schema.Types.String),
    status: typeGen(Schema.Types.Boolean, true, true),
    date_create: defaultDateNow()
};

var client_booking = new Schema(client_booking_schema);

module.exports = mongoose.model('ClientBooking', client_booking_schema);


