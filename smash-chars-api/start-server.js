const characterData = require("./character-data.json");

const http = require("http");
const server = http.createServer();

server.on("request", (req, res) => {
    
    if (req.url === "/just-the-data") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(JSON.stringify(characterData));
        res.end();
    } else if (req.url === "/characters-page" || req.url === "/") {
        res.writeHead(404, { "Content-Type": "text/html" });
        const liArray = characterData.map(char => {
            return `<li><h3>${char.id}:</h3><h2>${char.name}</h2></li>`;
        });
        res.write(`
            <!DOCTYPE html>
            <html>
                <head><title>Smash Characters!</title></head>
                <body>
                    <h1>Here are all the Smash Ultimate characters in order!</h1>
                    <ul>
                        ${liArray.join("")}
                    </ul>
                </body>
            </html>
        `);
        res.end();  
    } else if (req.url.includes("/specific-character/") && req.url.split("/").length === 3) {
        const urlParts = req.url.split("/");
        const characterId = urlParts[2];
        
        const foundCharacter = characterData.find(char => char.id === characterId);

        if (foundCharacter) {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.write(`
                <!DOCTYPE html>
                <html>
                    <head><title>Info for ${foundCharacter.name}</title></head>
                    <body>
                        <h1>${foundCharacter.name} is ready for battle!</h1>
                    </body>
                </html>
            `);
            res.end();
        } else {
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.write(`Character with id ${characterId} not found. :(`);
            res.end();
        }

    } else {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.write(`
            <!DOCTYPE html>
            <html>
                <head><title>404 | Where are you???</title></head>
                <body>
                    <h1>This URL ${req.url} does not exist!</h1>
                    <img src="https://media.giphy.com/media/7FfNlZey0F2nLQSPKU/giphy.gif" />
                </body>
            </html>
        `);
        res.end();
    }

});

const port = 8080;
server.listen(port, () => {
    console.log(`Well looky here, the server is listening on ${port}`);
});