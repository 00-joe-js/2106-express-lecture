const http = require("http");

const server = http.createServer();

server.on("request", (req, res) => {
    if (req.url === "/") {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(`
            <h1>Hello there!</h1>
        `);
        
        res.end();
    } else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.write("Sorry, don't know that location ....");
        res.end();
    }
});

const port = 8080;
server.listen(port, () => {
    console.log(`Well looky here, the server is listening on ${port}`);
});