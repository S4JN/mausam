const express = require("express");
const { rmSync } = require("fs");
const app = express();
const path = require("path");
const axios = require("axios");
const bodyParser =require("body-parser");
const moment =require("moment");
///console.log(path.join(__dirname+"../public"));
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname +"/public"));
app.use(express.static('views/images')); 







app.post("/", async (req, res) => {

    // try {
    //     console.log("gj");
    //     const location = req.body.location;
    //     console.log(location);
    //     const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=d7d863b6da1ba9f8d6246f511238105b`)
    //     const data = result.data;
    //     console.log(data);
    //     res.send(data);

    // } catch (error) {
    //     console.log("err")
    //     res.send(error);
        
    // }


    try {
        const myCity =req.body.location;
        const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${myCity}&appid=d7d863b6da1ba9f8d6246f511238105b`);
        const data = result.data;





        // assigning values

            var temperature =parseFloat(((data ['main'] ['temp'] ) - 273)).toFixed(2) ;
            var weaDesp = (data ['weather'] [0] ['main']);
            var humidity = (data ['main'] ['humidity']);
            var country = (data ['sys'] ['country'] );
            var city = (data ['name']);
            //console.log(data);
            console.log(temperature);
            console.log(weaDesp);
            console.log(humidity);
            console.log(country);
            console.log(city);

            var isSunny = false;
            var isRain =false;
            if (weaDesp =="Sunny") {
                isSunny=true;
            } else if (weaDesp=="Rain") {
                isRain=true;
            }
            

            res.render('index',{temperature,isSunny,isRain,weaDesp,humidity,country,city,"date":moment(Date.now()).format('DD-MM-YYYY')});
            
    
    } catch (error) {
        res.render("index",{"msg":"enter a valid location"})
    }
    


});

app.get("/", (req, res) => {
    res.render("index");
    // res.end("request accepted");
});


app.get("*", (req, res) => {
    res.writeHead(404);
    res.end("404 error page not found");
    //render 404 page

})

app.listen("3000", () => {
    console.log("server online");
});
