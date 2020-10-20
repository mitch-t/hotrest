const express = require("express");
const app = express();
const path = require("path");

const PORT = process.env.PORT || 3000; 

let tables = [];
let waitlist = [];


//sets up express to handle data parsing
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/reserve", function(req, res){
    res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/tables", function(req, res){
    res.sendFile(path.join(__dirname, "tables.html"));
})

app.get("/api/tables", function (req, res) {
    return res.json(tables);
});

app.get("/api/waitlist", function (req, res) {
    return res.json(waitlist);
});

app.post("/api/tables", function (req, res){
    const data = req.body;
    if(tables.length > 3) {
        waitlist.push(data);
    } else {
        tables.push(data);
    }
    console.log ("Tables:", tables);
    console.log ("Wait List: ", waitlist);
})

app.post("/api/clear", function (req, res) {
    tables =[];
    waitlist =[];

    console.log("Tables:", tables);
    console.log("Wait List: ",waitlist)
});

app.listen(PORT, function() {
console.log("App Running");
});
