db.movies1.find(
    {
        $and: [
            {"year": {$gte: 1970, $lt: 1980}},
            {"genres.name": {$in: ["Drama"]}}
        ]
    }
).sort({"year": 1})