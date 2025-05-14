db.countries1.aggregate({
    $group: {
        "_id": "$continent",
        "countries": {$push: "$name"}
    }
})