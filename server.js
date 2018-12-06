const express = require("express");
const hbs = require("hbs");

var app = express(); //initializing express


hbs.registerPartials(__dirname + "/views/partials");
hbs.registerHelper("getCurrentYear", () => new Date().getFullYear());

app.set("view engine", "hbs");
app.use(express.static(__dirname + "/public"));// we serve the ENTIRE public as static content.
/* MIDDLEWARE */
app.use((request, response, next) => {
    //Every request passes through this in the order it is done;
    let now = new Date().toString();
    console.log(`${now}: ${request.method} ${request.url}`)

    next(); // Only passes through next middlewere once this method is called successfully or the response is sent!
});


//Setting http handlers
app.get("/", (request, response) => {
    let params = {
        welcomeMessage: "Hello this is the homepage",
        pageTitle: "Home Page",
    };
    response.render("home.hbs", params);
});

app.get("/about", (request, response) => {
    response.render("about.hbs", {
        pageTitle: "About Page",
    }) // rendering the template and passing values to the template
});

app.get("/bad", (request, response) => {
    response.send({ errorMessage: "Page not found"}); //Express automatically adjust the content type and serve it
});

let port = process.env.PORT || 3000;
app.listen(process.env.PORT, () => {
    console.log("Server is up at port 3000");
}); // bind the app to a port and start to listen