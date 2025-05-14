const asian_countries = db.countries1.find({"continent": "Asia"},{"name": true, "_id": false});
for (const country of asian_countries){
    printjson(country)
}