const countries = require("../resources/countries.json")
numberOfContinentCountries =
countries.reduce((h,{continent}) => (h[continent] = (h[continent] || 0) + 1 , h), {})
console.log(numberOfContinentCountries);
