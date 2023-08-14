const express = require("express");
const mongoose= require("mongoose");
const connectedToDb = require("./configs/db");
const usersRouter = require("./routes/user.routes");
const flightRouter = require("./routes/flight.routes");
const bookingRouter = require("./routes/booking.routes");





require("dotenv").config(); // important

const app = express();
app.use(express.json());

// app.use("/", (req,res) =>{
//     res.send({msg:"welcome to air ticket booking system"})
// })

app.use("/api", usersRouter);

app.use("/api", flightRouter);

app.use("/api", bookingRouter);









app.listen(process.env.port, async() =>{
    try {
        await connectedToDb
        console.log("connected to mongoAtlas")
    } catch (error) {
        console.log(" not connected to mongoAtlas")
        console.log(error);
    }
    console.log(`server is running on port ${process.env.port}`)
 })



 module.exports = app;