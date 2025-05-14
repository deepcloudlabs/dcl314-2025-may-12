db.movies1.aggregate([
    {
        $match: {
            "year": {$gte: 1970, $lt: 1980},
            "genres.name": {$in: ["Drama"]}
        }
    },
    {
        $sort: {year: 1, title: 1}
    }
])