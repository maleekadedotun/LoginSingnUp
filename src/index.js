const express = require("express");
const app = express();
const path = require("path");
const collection = require("./mongoDb");

const templatepath = path.join(__dirname, "../templates");
app.use(express.json());
app.set("view engine", "hbs");
app.set("views", templatepath);

app.use(express.urlencoded({extended: false}))

app.get("/login",(req, res) =>{
    res.render("login")
});

app.get("/signup",(req, res) =>{
    res.render("signup")
});

app.post("/signup", async(req, res) =>{
    const data = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,

    }
    await collection.insertMany([data]);
    console.log(data);

    res.render("login")
});

app.post("/login", async(req, res) =>{
try {
    const check = await collection.findOne({password: req.body.password, email: req.body.email})
    console.log(check);
    if(check.password === req.body.password && check.email === req.body.email){
        
        res.render("home")
    }
    else{
     res.send("Wrong Email and Passowrd")   
    }
    
} catch (error) {
    res.send("Invalid Credentials")
}

   
});


// app.get("/home",(req, res) =>{
//     res.render("home")
// });





app.listen(3000, () => {
    console.log("server connected");
});