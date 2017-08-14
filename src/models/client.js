const
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    {
        refGen,
        defaultDateNow,
        typeGen
    } = require('../utils/database_utils');

//SCHEMA

//username
//password,
//email,
//firstname,
//middlename,
//lastname
//city
//province
//zip
//mobile
//govt_id
//birthday
//gender
//address
//date created//username
//password,
//email,
//firstname,
//middlename,
//lastname
//city
//province
//zip
//mobile
//govt_id
//birthday
//gender
//address
//date created

var
    string = Schema.Types.String,
    number = Schema.Types.Number;

const client = new Schema({
    username: typeGen(string),
    password: typeGen(string),
    email: typeGen(string),
    firstname: typeGen(string),
    middlename: typeGen(string),
    lastname: typeGen(string),
    city: typeGen(string),
    province: typeGen(string),
    zip: typeGen(string),
    mobile: typeGen(string),
    govt_ids: [{
        agency: typeGen(string),
        id: typeGen(string)
    }],
    birthday: typeGen(string),
    gender: typeGen(string),
    img_url: typeGen(string),
    addresses: [{
        address: typeGen(string)
    }],
    date_created: defaultDateNow(),
    user_permissions: {
        vault: typeGen(number),
        carwash: typeGen(number),
        locker: typeGen(number),
        bar: typeGen(number)
    },
    rfid: typeGen(string),
    cctv: typeGen(string),
    documents: [{
        name: typeGen(string),
        url: typeGen(string)
    }]
});

module.exports = mongoose.model('Client', client);