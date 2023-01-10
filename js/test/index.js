const express = require("express");
const app = express();

const slash = require("./slash");
const about = require("./about");

// Middleware
app.use(
    "/",
    (req, res, next) => {
        console.log("This is a middleware");
        next();
    },
    (req, res, next) => {
        console.log("This is a middleware 2");
        next();
    },
    (req, res, next) => {
        console.log("This is a middleware 3");
        next();
    }
);

//route
app.use("/home", slash);
app.use("/about", about);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
