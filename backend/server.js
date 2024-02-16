const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const bodypasrser = require('body-parser');
const cookieparser = require('cookie-parser')
const app = express();


app.use(express.json())
app.use(cookieparser());
app.use(bodypasrser.json());
app.use(bodypasrser.urlencoded({ extended: true }))
app.use(cors(
    { credentials: true,origin:true},
));
const router = require('./router/routes')
const url = "mongodb://127.0.0.1/miniproject";

app.use("/user", router)
mongoose.connect(url, { useNewUrlParser: true }).then(() => {
    console.log("Successfully Connected!")
}).catch(() => {
    console.log("Not Connected To Databse")
})

const port = 3000
app.listen(port, () => {
    console.log(`The server is running on port ${port}`)
})