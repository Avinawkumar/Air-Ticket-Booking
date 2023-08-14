const express=require("express")
const jwt=require("jsonwebtoken");
const flightModel = require("../models/flight.model");

const flightRouter = express.Router();

// post route for adding flights
flightRouter.post("/flights", async (req,res)=>{
    const payload=req.body
    try {
        const new_flight=new flightModel(req.body)
        await new_flight.save()
        res.status(201).send({"msg":"flight added"})
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
 });


 // get route for list of all available flights.
 flightRouter.get("/flights", async(req,res)=>{

    try {
            const flights = await flightModel.find();
            res.status(200).send(flights);
        
        } catch (error) {
        res.status(400).send({"msg":error.message})
        }
})

// get route for  the details of a specific flight identified by its ID.
flightRouter.get("/flights/:id", async(req,res)=>{
    const id = req.params.id
    try {
            const flights = await flightModel.find({_id:id});
            res.status(200).send(flights);
        
        } catch (error) {
        res.status(400).send({"msg":error.message})
        }
})

// route for update the details of a specific flight identified by its ID.
flightRouter.patch("/flights/:id", async(req,res)=>{
    const payload=req.body
    const id=req.params.id;
    try {
        await flightModel.findByIdAndUpdate({_id:id}, payload);
        
        res.status(204).send({"msg":"flight Updated"})
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})

// delete route for delete a specific flight identified by its ID.
flightRouter.delete("/flights/:id", async(req,res)=>{

    const id=req.params.id
    try {
        await flightModel.findByIdAndDelete({_id:id})
        res.status(202).send({"msg":"flight Deleted"})
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})






module.exports = flightRouter;