const
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    {
        typeGen,
        refGen,
        defaultDateNow,
    } = require('../utils/database_utils');


var
    string = Schema.Types.String,
    number = Schema.Types.Number;

const user = new Schema({
    username: typeGen(string),
    password: typeGen(string),
    firstname: typeGen(string),
    lastname: typeGen(string),
    email: typeGen(string),
    permission_level: typeGen(number),
    user_permissions: {
        vault: typeGen(number, true, 1),
        carwash: typeGen(number, true, 1),
        locker: typeGen(number, true, 1),
        bar: typeGen(number)
    }
});

user.index({ username: 1 });

module.exports = mongoose.model('User', user);