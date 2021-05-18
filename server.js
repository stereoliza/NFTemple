const express = require("express");
const fetch = require("node-fetch");

const app = express();
// make all the files in 'public' available
app.use(express.static('public'));

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
    response.sendFile(__dirname + "/index.html");
});

// send the default array of links to the webpage
app.get("/links", (request, response) => {
    // express helps us take JS objects and send them as JSON
    response.json(links);
});

app.get("/room.html", (request, response) => {
    response.sendFile(__dirname + "/room.html");
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
    console.log("Your app is listening on port " + listener.address().port);
});

