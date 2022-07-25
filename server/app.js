import express from 'express';
import mongoose from 'mongoose';
import User from './models/users.js';
import cors from 'cors'
const app = express();

app.use(express.json())
app.use(cors())

const URI = "mongodb+srv://Mike:cciQ6jfqxjt6Yo7C@cluster0.du0vf.mongodb.net/pos-systemDB?retryWrites=true&w=majority";

mongoose.connect(URI)
.then((res) => console.log('database connected'))
.catch((err) => console.log(err));



app.get('/users',(req,res)=>{
    // const user = {
    //     firstName: `${req.params.firstName}`,
    //     lastName: `${req.params.lastName}`
    // }
    // console.log(user);
    User.find()
    .exec()
    .then(doc => {
        res.status(200).json(doc)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
    
    
})


    app.post('/add-user', (req, res) => {

        console.log(req.body)

        const {role, firstName,lastName,username,password,companyName,Street,City,postalCode,phoneNumber} = req.body

        const data ={
            role,
            firstName,
            lastName,
            username,
            password,
            companyName,
            Street,
            City,
            postalCode,
            phoneNumber
        }

        const newUser = new User(data)
        newUser.save()
        .then(()=>{
            res.status(200).send(newUser)
        })
        .catch((err) => {
        console.log(err);
        });
    });



app.listen(4000,()=>{
    console.log(`server is runiing on port 4000`)
})