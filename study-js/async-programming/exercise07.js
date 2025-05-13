fetch("https://api.binance.com/api/v3/ticker/price",{
    method: "GET",
    headers: {
        "Accept": "application/json"
    }
}).then((response) => response.json())
    .then(tickers => {
        console.log(`There are ${tickers.length} markets in the Binance.`);
        let allTickers = [];
        for (let ticker of tickers.slice(0,300)) {
            allTickers.push(fetch(`https://api.binance.com/api/v3/ticker?symbol=${ticker.symbol}`));
        }
        Promise.all(allTickers).then(async (results) => {
            for (let result of results) {
                console.log(await((await result).json()));
            }
        });
    })
