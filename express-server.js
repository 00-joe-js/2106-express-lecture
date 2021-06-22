const express = require('express');

const app = express();

app.get("/", (req, res) => {
    res.send(`<h1>Hello there!</h1>`);
});

app.use((req, res) => {
    res.status(404);
    res.send("Sorry, don't know that location");
});

const port = 8080;
app.listen(port, () => {
    console.log(`Well looky here, the server is listening on ${port}`);
});