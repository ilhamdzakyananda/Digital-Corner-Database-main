const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb+srv://LoneSheep:lone_sheep10@ls.aumbq.mongodb.net/Users',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"))

app.post("/sign_up",(req,res)=>{
    var name = req.body.name;
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;

    var data = {
        "name": name,
        "email" : email,
        "username": username,
        "password" : password
    }

    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    });

    return res.redirect('signup_success.html')
})

app.post("/login",(req,res)=>{
    
    var username = req.body.username;
    var password = req.body.password;
    var pass;
    
    db.collection('users').findOne(
        {
        "username": username
        } 
        ,(err,collection)=>{
        if(err){
            throw err;
        }
        pass = collection.password;
        console.log(pass);
        console.log(password);
        console.log("Record found Successfully");
        if(pass==password)
    {
        return res.redirect('login_success.html')
    }
        else
    {
        errors.push({msg : 'ERROR : No Record Found'})
    }
    });
   
})

app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('index.html');
})

app.listen(process.env.PORT || 3000)
