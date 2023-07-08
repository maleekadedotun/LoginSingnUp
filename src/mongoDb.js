const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();


mongoose.connect(process.env.CONNECT_STRING)
.then(() => {
  console.log("dataBase working successful");
})
.catch((err) => {
    console.log(err);
});

const loginSchema = new mongoose.Schema({
  name : {
     type: String,
     required: true,    
    },
    email: {
    type: String,
     required: true, 
    },
    password: {
        type: String,
         required: true, 
    },
    phone: {
        type: String,
        required: true, 
    }
})

const collection = new mongoose.model("collection", loginSchema);

module.exports = collection
