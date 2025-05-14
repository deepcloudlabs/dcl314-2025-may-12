const {connect, Schema} = require("mongoose");
const mongoose = require("mongoose");
const OPTIONS = {
    socketTimeoutMS: 5_000
};

function countryCodeValidator(code) {
    return code.match(/^[A-Z]{3}$/);
}

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
        validate: [countryCodeValidator, "You must provide a valid country code with three letters."]
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
        enum: ['Africa', 'Antarctica', 'Asia', 'Europe', 'North America', 'Oceania', 'South America']
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

async function getCountryByCode(code, projection) {
    return Country.findOne({"_id": code}, projection);
}

async function getCountryByPage(pageNo = 0, pageSize = 10, projection = {}) {
    return Country.find({}, projection, {
        skip: pageNo * pageSize,
        limit: pageSize
    });
}

async function updateCountry(country) {
    return Country.updateOne({"_id": country._id}, country);
}

async function deleteCountry(code) {
    return Country.findOneAndDelete({"_id": code});
}

async function getContinentCountries(continent = "Asia", pageNo = 0, pageSize = 10, projection = {}) {
    return Country.find({continent}, projection, {
        skip: pageNo * pageSize,
        limit: pageSize
    });
}

async function createCountry(country) {
    const countryDocument = new Country(country);
    return countryDocument.save();
}

connect("mongodb://localhost:27017/world", OPTIONS)
    .then(async () => {
        console.log("Connected to MongoDB");
        const country = await getCountryByCode("TUR", {"cities": false});
        console.log(country);
        const countries = await getContinentCountries("Asia", 0, 10, {"cities": false});
        for (const _ of countries.sort((c1, c2) => c1.name.localeCompare(c2.name)))
            console.log(_.name);
        /*
        updateCountry({
            "_id": "FFF",
            "name": "FooCountry",
            continent: "Asia",
            population: 1_000,
            surfaceArea: 1,
            region: "FooRegion",
            localName: "FooLocalName",
            gnp: 1,
            headOfState: "FooHeadOfState",
            capital: null,
            governmentForm: "FooGovernmentForm",
            indepYear: 1,
            lifeExpectancy: 1,
            cities: []
        }).then(result => console.log(result));
         */
        deleteCountry("FFF").then(result => console.log(result))
                                 .catch(err => console.error(err));
    })
    .catch(err => console.error(err));
