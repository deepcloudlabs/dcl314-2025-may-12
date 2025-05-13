const movies = require("../resources/movies_v1.json")
let dramaMovies70s =
movies.filter(movie => movie.year < 1980)
      .filter(movie => movie.year >= 1970)
      .filter(movie => movie.genres.map(genre => genre.name).includes("Drama"));
dramaMovies70s.sort((movie1, movie2) => movie1.year - movie2.year);
dramaMovies70s.forEach( movie => console.log(`${movie.title}, ${movie.year}, http://www.imdb.com/title/${movie.imdb}`));

