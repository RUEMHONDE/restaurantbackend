const mongoose = require("mongoose");
const schema = new mongoose.Schema({

   
        username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },

        Email: {
            type: String,
            required: true,
        },
        
        MobileNr: {
            type: String,
            required: true,
        },
        
    }
)
const USER_SCHEMA = mongoose.model("USER", schema);
module.exports = USER_SCHEMA;