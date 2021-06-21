const http = require("http");

const server = http.createServer();

server.on("request", (req, res) => {
    
});

const port = 8080;
server.listen(port, () => {
    console.log(`Well looky here, the server is listening on ${port}`);
});