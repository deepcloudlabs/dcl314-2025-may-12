db.movies1.aggregate([
    {
        $set: {
            "numberOfDirectors": {$size: "$directors"}
        }
    }
])