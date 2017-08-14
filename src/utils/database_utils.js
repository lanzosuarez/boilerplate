const
    mongoose = require('mongoose'),
    Schema = require('mongoose').Schema;


const
    //on success
    onData = (data) => {
        return data;
    },

    //on error
    onError = (err) => {
        return err;
    },


    //mongoDB connect
    dbconn = (callback) => {
        var URI = process.env.MONGOLAB_URI;
        mongoose.connect(URI, { config: { autoIndex: false } }, function (err) {
            if (err) {
                callback(err);
            } else {
                callback(null);
            }
        });
    },

    typeGen = (type, required = true, def = undefined) => {
        if (def === undefined) {
            return {
                type,
                required
            };
        } else {
            return {
                type,
                required,
                default: def
            };
        }
    },

    refGen = (ref) => {
        return {
            type: Schema.Types.ObjectId,
            ref
        };
    },

    defaultDateNow = () => {
        return {
            type: Schema.Types.Date,
            default: new Date(Date.now())
        };
    },

    assignEnum = (schema, properties, values) => {
        properties.forEach((property, index) => {
            schema[property].enum = values[index];
        });
    },

    multipleTypeString = (properties) => {
        var schema = {}
        properties.forEach((property, index) => {
            schema[property] = typeGen(Schema.Types.String)
        });
        return schema;
    };

module.exports = {
    onData,
    onError,
    dbconn,
    typeGen,
    refGen,
    defaultDateNow,
    multipleTypeString,
    assignEnum
};





