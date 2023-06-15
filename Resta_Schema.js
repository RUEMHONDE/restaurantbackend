const mongoose = require("mongoose");
const schema = new mongoose.Schema({
    LoginCreds:{
        username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
},
           
        Product: {
            type: String,
            required: true,
        },
        
        Quantity: {
            type: Number,
            required: true,
        },
        
        Price: {
            type: Number,
            required: true,
        },
        
        Description: {
            type: String,
            required: true,
        },
        
        Picture: {
            type: String,
            required: true,
        }
        
})
const Resta_SCHEMA = mongoose.model("Resta", schema);
module.exports = Resta_SCHEMA;