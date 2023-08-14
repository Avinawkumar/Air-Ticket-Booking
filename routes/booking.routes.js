const express=require("express")
const jwt=require("jsonwebtoken");
const bookingModel = require("../models/booking.model");
const userModel = require("../models/user.model");
const flightModel = require("../models/flight.model");


const bookingRouter = express.Router();

bookingRouter.post("/booking", async(req,res) =>{
    try {
        const {user, flight} = req.body;

        const booking = new bookingModel({user:user, flight: flight});
        await booking.save();
        res.status(201).send({"msg":"booking created"})
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})

bookingRouter.get("/dashboard", async(req,res) =>{
    try {
        

        const booking = await bookingModel.find({})
        .populate({
            path: "user",
            model: userModel,
            select: "_id name email",
        })
        .populate({
            path: "flight",
            model: flightModel,
            select: "_id airline flightNo departure arrival departureTime arrivalTime seats price",
        })
        
        res.status(200).send(booking)
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})



bookingRouter.delete("/dashboard/:id", async(req,res)=>{

    const id=req.params.id
    try {
        await bookingModel.findByIdAndDelete({_id:id})
        res.status(202).send({"msg":"booking Deleted successfully"})
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})





module.exports = bookingRouter;