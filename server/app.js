import express from 'express';
import Stripe from 'stripe'
import mongoose from 'mongoose';
import User from './models/users.js';
import Menu from './models/menu.js';
import Printer from './models/printer.js'
import cors from 'cors'
import http from 'http'
import {Server} from "socket.io" 

const PORT = process.env.PORT || 4000

const app = express();
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ['GET', 'POST'],
        credentials: true
    }
})
app.use(cors({
    origin: 'http://localhost:3000',
}))
app.use(express.json())
 

const URI = "mongodb+srv://Mike:cciQ6jfqxjt6Yo7C@cluster0.du0vf.mongodb.net/pos-systemDB?retryWrites=true&w=majority";
const stripe = Stripe('sk_test_LmSrJNEvuxswULy5z2CFDcSe00jo5ryk69');
const SERVER_DOMAIN = 'http:localhost:4000'
const CLIENT_DOMAIN = 'http://localhost:3000'

mongoose.connect(URI)
.then((res) => console.log('database connected'))
.catch((err) => console.log(err));


io.on("connection", socket => {
    

    socket.on('join-room', (groupId) => {
        socket.join(groupId)
    })

    socket.on('added-menu-item', (data) => {
        socket.to(data.groupId).emit('display-item', data)
    })
    
})










//User Methods
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
    let data;

    if(req.body.role == "admin"){
        const {role, name, email, username, password, groupID, printers, subscriptionType, subscriptionStatus} = req.body

        data ={
            role,
            name,
            email,
            username,
            password,
            groupID,
            printers,
            subscriptionType,
            subscriptionStatus
        }

        
    }else{
        const {role, username, password, company, street, city, postalCode, state, phoneNumber, printers, groupID} = req.body

        data ={
            role,
            username,
            password,
            company,
            street,
            city,
            postalCode,
            state,
            phoneNumber,
            printers,
            groupID
        }
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

app.patch('/update-location/:id', (req,res) => {
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

app.patch('/update-user-printers/:id', (req,res) => {
   console.log(req.body.printer)
    if(req.body.action === "add"){
        User.findByIdAndUpdate(req.params.id,  { $push: { printers: req.body.printer} })
        .then((user) => {
            if(!user){
                res.status(404).send()
            }
            res.send(user)
        }).catch((err) => {
            res.status(500).send(err)
        })
    }else if(req.body.action === "delete"){
        
        User.updateOne({_id: req.params.id}, {$pull: {printers: {$elemMatch: req.body.printer}}})
        .then((user) => {
            if(!user){
                res.status(404).send()
            }
            res.send(user)
        }).catch((err) => {
            res.status(500).send(err)
        })
    }else{

    }
    
})

app.delete('/delete-user/:id', (req,res) => {
    User.findByIdAndRemove(req.params.id)
    .then((deleted) => {
        res.send(deleted)
    }).catch((err) => {
       res.send(err);
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


//Stripe Payments
app.post('/create-checkout-session', async (req, res) => {
    const price = {
        price: "price_1LakDAEZYI7NTN2hkdpQPkHu",
        quantity: 1,
    } 
    const session = await stripe.checkout.sessions.create({
        billing_address_collection: 'auto',
      line_items: [price],
      mode: 'subscription',
      success_url: `${CLIENT_DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${CLIENT_DOMAIN}/admin-dashboard/locations`,
    });
    res.json({url: session.url});
  });

  app.post('/customer-billing-info/:session_id', async (req, res) => {
    const session_id = req.params.session_id
    const checkoutSession = await stripe.checkout.sessions.retrieve(session_id)
    console.log(await stripe.subscriptions.retrieve(checkoutSession.subscription))
    
    const portalSession = await stripe.billingPortal.sessions.create({
        customer: checkoutSession.customer,
        return_url: `${CLIENT_DOMAIN}/admin-dashboard/locations`
    })

    res.json({url: portalSession.url})

    // res.send(`<html><body><h1>Thanks for our order, ${customer.name}!</h1></body></html>`);
  })

  app.get('/payment-success', async (req, res) => {
    const session_id = req.query.session_id;
    const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);
    const subscription = await stripe.subscriptions.retrieve(checkoutSession.subscription);

    return res.json(subscription.status)

  });

  app.get('/subscription-info/:session_id', async (req, res) => {
    const session_id = req.params.session_id;
    const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);
    const subscription = await stripe.subscriptions.retrieve(checkoutSession.subscription);

    const status = {
        status: subscription.status,
        cancel_at_period_end: subscription.cancel_at_period_end
    }
    
    return res.json(status)
  })

  //Printer Methods

  app.get('/printers', async (req, res) => {
    Printer.find()
    .exec()
    .then(doc => {
        res.status(200).json(doc)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
  })

  app.post('/add-printer', async (req, res) => {
    const {groupID, printerID, printerName, ssID, ipAddress, storeLocation} = req.body

    const printer = {
        groupID: groupID,
        printerID: printerID,
        printerName: printerName,
        ssID: ssID,
        ipAddress: ipAddress,
        storeLocation: storeLocation
    }

    const newPrinter = new Printer(printer)
    newPrinter.save()
    .then(()=>{
        res.status(200).send(newPrinter)
    })
    .catch((err) => {
    console.log(err);
    });
  })

  app.patch('/printer/:id', async (req, res) => {
    
    Printer.findByIdAndUpdate(req.params.id, req.body)
    .then((printer) => {
        if(!printer){
            res.status(404).send()
        }
        res.send(printer)
    }).catch((err) => {
        res.status(500).send(err)
    })
  })

  app.delete('/delete-printer/:id', async (req, res) => {
    
    Printer.findByIdAndRemove(req.params.id)
    .then((deleted) => {
        res.send(deleted)
    }).catch((err) => {
       res.send(err);
    })
  })



server.listen(PORT,()=>{
    console.log(`server is running on port 4000`)
})