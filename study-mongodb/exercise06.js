db.movies1.aggregate([
    {
        $set: {
            "url": {$concat: ["https://www.imdb.com/title/", "$imdb"]}
        }
    }
])