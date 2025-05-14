const {connect, Schema} = require("mongoose");
const mongoose = require("mongoose");
const OPTIONS = {
    socketTimeoutMS: 5_000
};

const CitySchema = new Schema({
    _id: Number,
    name: String,
    district: String,
    population: Number
});
const CountrySchema = new Schema({
    _id: {
        type: String,
        required: true,
        unique: true,
        index: true,
        regex: /^[A-Z]{3}$/
    },
    name: {
        type: String,
        required: true,
    },
    capital: {
        type: Number,
        required: false
    },
    cities: [CitySchema],
    continent: {
        type: String,
        required: true,
        enums: [ 'Africa', 'Antarctica', 'Asia', 'Europe', 'North America', 'Oceania', 'South America']
    },
    gnp: {
        type: Number,
        min: 0,
        required: false
    },
    governmentForm: {
        type: String,
        required: false
    },
    headOfState: String,
    indepYear: Number,
    lifeExpectancy: {
        type: Number,
        min: 0,
        required: false
    },
    localName: String,
    population: {
        type: Number,
        min: 0,
        required: false
    },
    region: String,
    surfaceArea: {
        type: Number,
        min: 0,
        required: false
    }
});

const Country = mongoose.model("countries1", CountrySchema);




connect("mongodb://localhost:27017/world", OPTIONS)
    .then(() => {
        console.log("Connected to MongoDB")
    })
    .catch(err => console.error(err));
