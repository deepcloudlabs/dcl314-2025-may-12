const movies = require("../resources/movies_v1.json")
let historgramOfGenres =
movies.flatMap( ({genres}) => genres)
    .map(({name}) => name)
    .reduce((h, _) => (h[_] = (h[_] || 0) + 1, h), {})
console.log(historgramOfGenres);
