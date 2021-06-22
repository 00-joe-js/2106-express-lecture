const characterData = require("./character-data.json");

const express = require("express");
const app = express();

app.listen(8080, () => {
    console.log("Server listening on 8080!");
});

app.get(["/", "/characters-page"], (req, res) => {
    const liArray = characterData.map(char => {
        return `<li><h3>${char.id}:</h3><h2>${char.name}</h2></li>`;
    });
    res.send(`
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
});

app.get("/just-the-data", (req, res) => {
    res.json(characterData);
});

app.use((req, res) => {
    res.status(404);
    res.send(`
        <!DOCTYPE html>
        <html>
            <head><title>404 | Where are you???</title></head>
            <body>
                <h1>This URL ${req.url} does not exist!</h1>
                <img src="https://media.giphy.com/media/7FfNlZey0F2nLQSPKU/giphy.gif" />
            </body>
        </html>
    `);
});
