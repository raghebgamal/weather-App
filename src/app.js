const path = require("path");
const express = require("express");
const hbs = require('hbs')
const app = express();
const forcast = require("./utils/forcast");
const geocode = require("./utils/geocode");
const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
app.set("view engine","hbs")
app.set("views", viewsPath);
hbs.registerPartials(partialsPath)
app.use(express.static(publicPath));

app.get("/", (req, res) => {
    res.render("index", {
        title: "weather",
        name:"Ragheb Gamal"
    })
    
})
app.get("/about", (req, res) => {
    res.render("about", {
        title: "about",
        name: "Ragheb Gamal"
    })
    
});

app.get("/help", (req, res) => {
    res.render("help", {
        helpText: 'This is some helpful text.',
        title: "help",
        name: "Ragheb Gamal"
    })
    
});
app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send("you must provide an address")
    }
    geocode(req.query.address, (error, { lantitude, langtiude, location } = {}) => {
        if (error) {
            return res.send({
                error
            })
        }
        
        forcast(lantitude, langtiude, (error, dataforecast) => {
            if (error) {
                return res.send({
                    error
                })
            }
            res.send({
                location,
                dataforecast
            })
        })
    })
});
app.get("/help/*", (req, res) => {
    res.render("help", {
        helpText: 'page not found.',
        title: "help",
        name: "Ragheb Gamal"
    })
    
});
app.get("*", (req, res) => {
    res.render("404", {
        errorMessage: 'page not found.',
        title: "error",
        name: "Ragheb Gamal"
    })
    
});
app.listen(3000, () => {
    console.log("server listening....")
});

    console.log("server listening....")
