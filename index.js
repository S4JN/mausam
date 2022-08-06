const express = require("express");
const { rmSync } = require("fs");
const app = express();
const path = require("path");
const axios = require("axios");

///console.log(path.join(__dirname+"../public"));

const staticPath = path.join(__dirname, "./public");


console.log(staticPath);

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')



// app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, staticPath)));

app.post("/loc", async (req, res) => {

    try {
        console.log("gj");
        const location = req.body.location;
        console.log(location);
        const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=d7d863b6da1ba9f8d6246f511238105b`)
        const data = result.data;
        console.log(data);
        res.send(data);

    } catch (error) {
        console.log("err")
        res.send(error);
        
    }







});

app.get("/", (req, res) => {
    res.render("index");
    // res.end("request accepted");
});


app.get("*", (req, res) => {
    res.writeHead(404);
    res.end("404 error page not found");
})

app.listen("3000", () => {
    console.log("server online");
});
