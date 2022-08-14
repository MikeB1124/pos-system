import express from 'express';
import mongoose from 'mongoose';
import User from './models/users.js';
import Menu from './models/menu.js';
import cors from 'cors'
const app = express();

app.use(express.json())
app.use(cors())

const URI = "mongodb+srv://Mike:cciQ6jfqxjt6Yo7C@cluster0.du0vf.mongodb.net/pos-systemDB?retryWrites=true&w=majority";

mongoose.connect(URI)
.then((res) => console.log('database connected'))
.catch((err) => console.log(err));



app.get('/users',(req,res)=>{
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

    const {role, firstName, lastName, username, password, companyName, groupID, printerIP} = req.body

    const data ={
        role,
        firstName,
        lastName,
        username,
        password,
        companyName,
        groupID,
        printerIP,
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

app.patch('/user/:id', (req,res) => {
    User.findByIdAndUpdate(req.params.id, req.body)
    .then((user) => {
        if(!user){
            res.status(404).send()
        }
        res.send(user)
    }).catch((err) => {
        res.status(500).send(err)
    })
})



//Menu Items
app.get('/menu-items',(req,res)=>{
    Menu.find()
    .exec()
    .then(doc => {
        res.status(200).json(doc)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
    
    
})

app.post('/add-menu-item', (req, res) => {

    const {groupId, menuId, meal, title, description, addOn, image, price} = req.body

    const data ={
        groupId,
        menuId,
        meal,
        title,
        description,
        addOn,
        image,
        price,
    }

    const newMenuItem = new Menu(data)
    newMenuItem.save()
    .then(()=>{
        res.status(200).send(newMenuItem)
    })
    .catch((err) => {
    console.log(err);
    });
});

app.patch('/menu-item/:id', (req,res) => {
    Menu.findByIdAndUpdate(req.params.id, req.body)
    .then((menu) => {
        if(!menu){
            res.status(404).send()
        }
        res.send(menu)
    }).catch((err) => {
        res.status(500).send(err)
    })
})

app.delete('/delete-menu-item/:id', (req,res) => {
    Menu.findByIdAndRemove(req.params.id)
    .then((deleted) => {
        res.send(deleted)
    }).catch((err) => {
       res.send(err);
    })
})



app.listen(4000,()=>{
    console.log(`server is running on port 4000`)
})