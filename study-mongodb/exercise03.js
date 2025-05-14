db.countries1.aggregate({
    $group: {
        "_id": "$continent",
        "count": {$sum: 1}
    }
})