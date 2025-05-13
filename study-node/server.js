const http = require('http');
const countries = require('./resources/countries.json');
const PORT = process.env.PORT || 7100;

const handleRequest = (req, res) => {
    if(req.method === 'GET') {
        res.end(JSON.stringify(countries));
    }
}

const server = http.createServer(handleRequest);

console.log(`Node PID: ${process.pid}`);
console.log(`Version: ${process.version}`);
console.log(`Version: ${process.platform}`);

server.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
    console.log(`UV_THREADPOOL_SIZE: ${process.env.UV_THREADPOOL_SIZE}`);

});
