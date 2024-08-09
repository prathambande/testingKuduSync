const http = require('http');

const host = '127.0.0.1';
const port = '8000';

const server = http.createServer((req,res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end("Hey There, No Express");
});

server.listen(port, host, () => {
    console.log(`Server is Listening at http://${host}:${port}`);
})