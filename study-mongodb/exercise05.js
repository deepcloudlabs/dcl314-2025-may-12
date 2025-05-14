db.countries1.aggregate([
    {
        $group: {
            "_id": "$continent",
            "numberOfCountries": {$sum: 1},
            "numberOfCities": {$sum: {$size: "$cities"}}
        }
    },
    {
        $sort: {numberOfCities: -1}
    }
])