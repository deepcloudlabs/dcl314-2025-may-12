const countries = require("../resources/countries.json")
// imperative programming: procedural programming, oop
// external loop
let totalPopulationOfAsia = 0;
for (let country of countries) {
    if (country.continent === "Asia") {
        totalPopulationOfAsia += country.population;
    }
}
console.log(totalPopulationOfAsia);
// declarative programming: functional programming, oop
let is_asian = country => country.continent === "Asia";
let to_population = country => country.population;
let add = (totalPopulation, population) => totalPopulation + population;
totalPopulationOfAsia = countries.filter(is_asian).map(to_population).reduce(add, 0)
console.log(totalPopulationOfAsia);

