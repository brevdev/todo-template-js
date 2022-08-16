const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
var cors = require('cors')

const app = express();


let items = [
    {
        id: 0,
        title: "buy food",
        isComplete: false,
    },
    {
        id: 1,
        title: "eat food",
        isComplete: false,
    },
]

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());

app.get("/", function (req, res) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    let day = date.getDate();
    res.json(items);

});


app.options('/', cors()) // enable pre-flight request for DELETE request
app.post("/", cors(), function (req, res) {
    // res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    console.log(req.body)

    let item = {
        id: items.length + 1,
        title: req.body.title,
        isComplete: false,
    }
    items.push(item);

    res.json(items)

});

app.put("/", cors(), function (req, res) {

    console.log(req.query)
    console.log(parseInt(req.query.id))
    console.log(items[parseInt(req.query.id) - 1])

    try {
        items[parseInt(req.query.id) - 1].isComplete = true
    } catch (error) {
        console.log(error)
    }

    res.json(items)

});

app.listen(8080, function () {
    console.log("Server started on port 8080");
})