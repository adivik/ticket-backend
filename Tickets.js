const mongoose = require('mongoose');
const Ticket= new mongoose.Schema({
    number:Number,
    state:Number
})
module.exports=mongoose.model("tickets",Ticket);