const
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    {
        typeGen,
        refGen,
        defaultDateNow,
        multipleTypeString,
    } = require('../utils/database_utils');

//SCHEMA

//name
//owner
//date_created

const notification = new Schema({
    content: typeGen(Schema.Types.String),
    client: refGen('Client'),
    status: typeGen(Schema.Types.Boolean),
    date_created: defaultDateNow()
});

module.exports = mongoose.model('Notification', notification);