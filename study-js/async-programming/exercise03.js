fetch("https://api.binance.com/api/v3/ticker/price",{
    method: "GET",
    headers: {
        "Accept": "application/json"
    }
}).then((response) => response.json())
.then(tickers => {
    console.log(`There are ${tickers.length} markets in the Binance.`);
    for (let ticker of tickers) {
        fetch(`https://api.binance.com/api/v3/ticker?symbol=${ticker.symbol}`)
            .then(response => response.json())
            .then(ticker => {
                console.log(`[${ticker.symbol}] Open Time: ${new Date(ticker.openTime)}, Close Time: ${new Date(ticker.openTime)}, Low Price: ${ticker.lowPrice}, High Price: ${ticker.highPrice}`);
            })
    }
    console.log("DONE")
})
