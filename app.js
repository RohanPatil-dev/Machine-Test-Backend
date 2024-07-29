const express = require('express');
const app = express();
const port = 8081;

const path = require("path")

const bodyParser = require('body-parser');
const cors = require('cors');

// middleware for data fetch with frontend to backend
app.use(bodyParser.json());
app.use(cors());

// database connectivity
const {connection} = require("./DB Configuration/connection");

// import routes
const userRoute = require("./routes/user");
const empRoute = require("./routes/emp");

//middleware
app.use(express.urlencoded({extended : false}));
app.use(express.urlencoded({extended : true}));
app.use(express.json())

// public file
app.use(express.static(path.resolve("./public")))

connection("mongodb://127.0.0.1:27017/assignment").then(()=>{
    console.log("Mongodb is connected sucessfully...........");
}).catch((err)=>{
    console.log(err);
});

// routes
app.use("/",userRoute);
app.use("/employee",empRoute);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));