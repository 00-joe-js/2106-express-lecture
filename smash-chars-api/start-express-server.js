const characterData = require("./character-data.json");

const express = require("express");
const morgan = require('morgan');
const app = express();

app.listen(8081, () => {
    console.log("Server listening on 8080!");
});

// Pipeline that HTTP requests "flows" through

app.use(morgan("dev")); // 1

app.use(express.static(__dirname + "/images")); // 2

// 3
app.get(["/", "/characters-page"], (req, res) => {
    console.log("hello", req.peter);
    const liArray = characterData.map(char => {
        return `<li><h3>${char.id}:</h3><h2>${char.name}</h2></li>`;
    });
    res.send(`
        <!DOCTYPE html>
        <html>
            <head><title>Smash Characters!</title></head>
            <body>
                <img src="/characterbanner.jpeg" />
                <h1>Here are all the Smash Ultimate characters in order!</h1>
                <ul>
                    ${liArray.join("")}
                </ul>
            </body>
        </html>
    `);
});

// 4
app.get("/just-the-data", (req, res) => {
    res.json(characterData);
});

// 5
app.get(
    "/specific-character/:characterId",
    (req, res) => {
        const characterId = req.params.characterId;
        const foundCharacter = characterData.find(char => char.id === characterId);

        if (foundCharacter) {
            res.send(`
            <!DOCTYPE html>
            <html>
                <head><title>Info for ${foundCharacter.name}</title></head>
                <body>
                    <h1>${foundCharacter.name} is ready for battle!</h1>
                </body>
            </html>
        `);
        }

    }
);

// 6
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
